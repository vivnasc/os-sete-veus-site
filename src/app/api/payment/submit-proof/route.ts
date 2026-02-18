import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { notifyPaymentProof } from "@/lib/notify-admin";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "";

export async function POST(request: Request) {
  try {
    const { payment_id, transaction_id, mpesa_reference, notes } =
      await request.json();

    if (!payment_id) {
      return NextResponse.json(
        { error: "ID de pagamento não fornecido" },
        { status: 400 }
      );
    }

    if (!transaction_id && !mpesa_reference) {
      return NextResponse.json(
        { error: "Número de transação ou referência MPesa é obrigatório" },
        { status: 400 }
      );
    }

    if (!supabaseServiceKey) {
      return NextResponse.json(
        { error: "Serviço temporariamente indisponível" },
        { status: 503 }
      );
    }

    const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
      auth: { autoRefreshToken: false, persistSession: false },
    });

    // Atualizar pagamento com comprovativo
    const { data: payment, error: updateError } = await supabaseAdmin
      .from("payments")
      .update({
        transaction_id: transaction_id || null,
        mpesa_reference: mpesa_reference || null,
        notes: notes || null,
        status: "pending", // Aguardando confirmação admin
      })
      .eq("id", payment_id)
      .select()
      .single();

    if (updateError || !payment) {
      console.error("Payment update error:", updateError);
      return NextResponse.json(
        { error: "Erro ao atualizar pagamento" },
        { status: 500 }
      );
    }

    // Notificar admin via WhatsApp + dashboard
    await notifyPaymentProof({
      user_email: payment.user_email,
      amount: payment.amount,
      currency: payment.currency,
      payment_method: payment.payment_method,
      access_type_code: payment.access_type_code,
      transaction_id: transaction_id || null,
      mpesa_reference: mpesa_reference || null,
    });

    return NextResponse.json({
      ok: true,
      message:
        "Comprovativo enviado! Aguarda confirmação da administração. Receberás um email assim que for confirmado.",
    });
  } catch (error) {
    console.error("Payment proof submission error:", error);
    return NextResponse.json({ error: "Erro interno" }, { status: 500 });
  }
}
