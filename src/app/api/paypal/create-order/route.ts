import { NextResponse } from "next/server";
import { createSupabaseAdminClient } from "@/lib/supabase-server";
import { createPayPalOrder } from "@/lib/paypal";

export async function POST(request: Request) {
  try {
    const { payment_id } = await request.json();

    if (!payment_id) {
      return NextResponse.json(
        { error: "payment_id obrigatorio" },
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

    // Buscar pagamento para obter detalhes
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

    // Usar o valor USD do pagamento (enviado pelo checkout)
    const amountUSD = payment.currency === "USD"
      ? payment.amount
      : payment.amount_usd || payment.amount;

    const order = await createPayPalOrder({
      amountUSD: Number(amountUSD),
      description: payment.access_type_code,
      paymentId: payment_id,
    });

    // Guardar o PayPal order ID no pagamento
    await supabaseAdmin
      .from("payments")
      .update({ paypal_order_id: order.id })
      .eq("id", payment_id);

    return NextResponse.json({ orderID: order.id });
  } catch (error) {
    console.error("[paypal/create-order] Error:", error);
    return NextResponse.json(
      { error: "Erro ao criar ordem PayPal" },
      { status: 500 }
    );
  }
}
