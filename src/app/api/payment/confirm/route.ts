import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { cookies } from "next/headers";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "";
const ADMIN_EMAIL = "viv.saraiva@gmail.com";

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

    if (!supabaseServiceKey) {
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

    const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
      auth: { autoRefreshToken: false, persistSession: false },
    });

    // Verificar se é admin
    const { data: userData } = await supabaseAdmin.auth.getUser(accessToken);

    if (!userData.user || userData.user.email !== ADMIN_EMAIL) {
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
        // Não falhar a confirmação por causa disso
      }

      // Enviar email de boas-vindas ao cliente
      // TODO: Implementar envio de email + WhatsApp
    } else {
      // Enviar email de rejeição
      // TODO: Implementar envio de email
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
