import { NextResponse } from "next/server";
import { createSupabaseAdminClient } from "@/lib/supabase-server";
import { cookies } from "next/headers";
import { ADMIN_EMAILS, ACCESS_FLAG_MAP } from "@/lib/constants";
import { notifyPaymentConfirmed, notifyPaymentRejected } from "@/lib/notify-admin";

export async function POST(request: Request) {
  try {
    const { payment_id, action, rejection_reason } = await request.json();

    if (!payment_id || !action) {
      return NextResponse.json(
        { error: "Dados incompletos" },
        { status: 400 }
      );
    }

    if (!["confirm", "reject"].includes(action)) {
      return NextResponse.json({ error: "Ação inválida" }, { status: 400 });
    }

    const supabaseAdmin = createSupabaseAdminClient();
    if (!supabaseAdmin) {
      return NextResponse.json(
        { error: "Serviço temporariamente indisponível" },
        { status: 503 }
      );
    }

    // Verificar autenticação do admin
    const cookieStore = await cookies();
    const accessToken =
      cookieStore.get("sb-access-token")?.value ||
      cookieStore.get("sb-tdytdamtfillqyklgrmb-auth-token")?.value;

    if (!accessToken) {
      return NextResponse.json({ error: "Não autenticado" }, { status: 401 });
    }

    // Verificar se é admin
    const { data: userData } = await supabaseAdmin.auth.getUser(accessToken);

    if (!userData.user || !ADMIN_EMAILS.includes(userData.user.email || "")) {
      return NextResponse.json(
        { error: "Acesso não autorizado" },
        { status: 403 }
      );
    }

    // Buscar pagamento
    const { data: payment, error: fetchError } = await supabaseAdmin
      .from("payments")
      .select("*")
      .eq("id", payment_id)
      .single();

    if (fetchError || !payment) {
      return NextResponse.json(
        { error: "Pagamento não encontrado" },
        { status: 404 }
      );
    }

    // Atualizar status do pagamento
    const newStatus = action === "confirm" ? "confirmed" : "rejected";

    const { error: updateError } = await supabaseAdmin
      .from("payments")
      .update({
        status: newStatus,
        confirmed_by: userData.user.id,
        confirmed_at: new Date().toISOString(),
        rejection_reason: action === "reject" ? rejection_reason : null,
      })
      .eq("id", payment_id);

    if (updateError) {
      console.error("Payment confirmation error:", updateError);
      return NextResponse.json(
        { error: "Erro ao atualizar pagamento" },
        { status: 500 }
      );
    }

    // Se confirmado, dar acesso ao usuário
    if (action === "confirm") {
      const { error: purchaseError } = await supabaseAdmin
        .from("purchases")
        .insert({
          user_id: payment.user_id,
          product: payment.access_type_code,
          access_type_code: payment.access_type_code,
          granted_via: "payment",
          granted_at: new Date().toISOString(),
        });

      if (purchaseError) {
        console.error("Purchase creation error:", purchaseError);
      }

      // Actualizar flag de acesso no perfil
      const flagToUpdate = ACCESS_FLAG_MAP[payment.access_type_code];
      if (flagToUpdate) {
        const { error: profileError } = await supabaseAdmin
          .from("profiles")
          .update({ [flagToUpdate]: true })
          .eq("id", payment.user_id);

        if (profileError) {
          console.error("Profile access update error:", profileError);
        }
      }

      // Actualizar purchased_products no perfil
      const { data: currentProfile } = await supabaseAdmin
        .from("profiles")
        .select("purchased_products")
        .eq("id", payment.user_id)
        .single();

      const currentProducts = currentProfile?.purchased_products || [];
      const newProduct = {
        type: payment.access_type_code,
        date: new Date().toISOString(),
        code: payment.access_type_code,
      };

      const alreadyExists = currentProducts.some(
        (p: { type: string }) => p.type === newProduct.type
      );

      if (!alreadyExists) {
        await supabaseAdmin
          .from("profiles")
          .update({
            purchased_products: [...currentProducts, newProduct],
          })
          .eq("id", payment.user_id);
      }

      // Notificar via Telegram
      await notifyPaymentConfirmed({
        user_email: payment.user_email,
        amount: payment.amount,
        currency: payment.currency || "MZN",
        access_type_code: payment.access_type_code,
      });
    } else {
      // Notificar rejeicao via Telegram
      await notifyPaymentRejected({
        user_email: payment.user_email,
        amount: payment.amount,
        currency: payment.currency || "MZN",
        reason: rejection_reason,
      });
    }

    return NextResponse.json({
      ok: true,
      message:
        action === "confirm"
          ? "Pagamento confirmado! Acesso concedido ao cliente."
          : "Pagamento rejeitado.",
    });
  } catch (error) {
    console.error("Payment confirmation error:", error);
    return NextResponse.json({ error: "Erro interno" }, { status: 500 });
  }
}
