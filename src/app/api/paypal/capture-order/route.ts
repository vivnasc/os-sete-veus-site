import { NextResponse } from "next/server";
import { createSupabaseAdminClient } from "@/lib/supabase-server";
import { capturePayPalOrder } from "@/lib/paypal";
import { ACCESS_FLAG_MAP } from "@/lib/constants";
import { notifyAdmin } from "@/lib/notify-admin";

export async function POST(request: Request) {
  try {
    const { orderID, payment_id } = await request.json();

    if (!orderID || !payment_id) {
      return NextResponse.json(
        { error: "orderID e payment_id obrigatorios" },
        { status: 400 }
      );
    }

    const supabaseAdmin = createSupabaseAdminClient();
    if (!supabaseAdmin) {
      return NextResponse.json(
        { error: "Servico temporariamente indisponivel" },
        { status: 503 }
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
        { error: "Pagamento nao encontrado" },
        { status: 404 }
      );
    }

    // Capturar pagamento no PayPal
    const capture = await capturePayPalOrder(orderID);

    if (capture.status !== "COMPLETED") {
      return NextResponse.json(
        { error: "Pagamento PayPal nao foi completado" },
        { status: 400 }
      );
    }

    // Extrair dados da captura
    const captureData = capture.purchase_units?.[0]?.payments?.captures?.[0];
    const captureId = captureData?.id || orderID;

    // Actualizar pagamento como confirmado
    await supabaseAdmin
      .from("payments")
      .update({
        status: "confirmed",
        paypal_order_id: orderID,
        paypal_capture_id: captureId,
        transaction_id: captureId,
        confirmed_at: new Date().toISOString(),
      })
      .eq("id", payment_id);

    // Criar registo de compra
    const { error: purchaseError } = await supabaseAdmin
      .from("purchases")
      .insert({
        user_id: payment.user_id,
        product: payment.access_type_code,
        access_type_code: payment.access_type_code,
        granted_via: "paypal",
        granted_at: new Date().toISOString(),
      });

    if (purchaseError) {
      console.error("[paypal/capture] Purchase error:", purchaseError);
    }

    // Garantir que o perfil existe e actualizar flag de acesso
    const flagToUpdate = ACCESS_FLAG_MAP[payment.access_type_code];
    const newProduct = {
      type: payment.access_type_code,
      date: new Date().toISOString(),
      code: payment.access_type_code,
    };

    // Verificar se o perfil ja existe
    const { data: existingProfile } = await supabaseAdmin
      .from("profiles")
      .select("id, purchased_products")
      .eq("id", payment.user_id)
      .single();

    if (existingProfile) {
      // Perfil existe — update
      const updates: Record<string, unknown> = {};
      if (flagToUpdate) {
        updates[flagToUpdate] = true;
      }

      const currentProducts = existingProfile.purchased_products || [];
      const alreadyExists = currentProducts.some(
        (p: { type: string }) => p.type === newProduct.type
      );
      if (!alreadyExists) {
        updates.purchased_products = [...currentProducts, newProduct];
      }

      if (Object.keys(updates).length > 0) {
        const { error: updateError } = await supabaseAdmin
          .from("profiles")
          .update(updates)
          .eq("id", payment.user_id);

        if (updateError) {
          console.error("[paypal/capture] Profile update error:", updateError);
        }
      }
    } else {
      // Perfil nao existe — criar com acesso
      const profileData: Record<string, unknown> = {
        id: payment.user_id,
        email: payment.user_email,
        purchased_products: [newProduct],
      };
      if (flagToUpdate) {
        profileData[flagToUpdate] = true;
      }

      const { error: insertError } = await supabaseAdmin
        .from("profiles")
        .insert(profileData);

      if (insertError) {
        console.error("[paypal/capture] Profile insert error:", insertError);
      }
    }

    // Notificar admin
    await notifyAdmin({
      type: "payment_proof",
      title: "Pagamento PayPal confirmado",
      message: `${payment.user_email} pagou ${captureData?.amount?.value || payment.amount} USD via PayPal. Acesso concedido automaticamente.`,
      details: {
        Email: payment.user_email,
        Valor: `${captureData?.amount?.value || payment.amount} USD`,
        Metodo: "PayPal",
        Produto: payment.access_type_code,
        "PayPal Order": orderID,
        "PayPal Capture": captureId,
      },
    });

    // Gerar token de auto-login para o utilizador
    let tokenHash: string | null = null;
    try {
      const { data: linkData } = await supabaseAdmin.auth.admin.generateLink({
        type: "magiclink",
        email: payment.user_email,
      });
      tokenHash = linkData?.properties?.hashed_token || null;
    } catch (e) {
      console.error("[paypal/capture] generateLink error:", e);
    }

    return NextResponse.json({
      ok: true,
      message: "Pagamento confirmado! O teu acesso esta activo.",
      email: payment.user_email,
      token_hash: tokenHash,
    });
  } catch (error) {
    console.error("[paypal/capture] Error:", error);
    return NextResponse.json(
      { error: "Erro ao processar pagamento PayPal" },
      { status: 500 }
    );
  }
}
