import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { notifyPaymentCreated } from "@/lib/notify-admin";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "";

export async function POST(request: Request) {
  try {
    const { email, phone, access_type_code, payment_method, amount, currency } =
      await request.json();

    // Validação
    if (!email || !access_type_code || !payment_method || !amount) {
      return NextResponse.json(
        { error: "Dados incompletos" },
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

    // Verificar se o tipo de acesso existe e é pago
    const { data: accessType } = await supabaseAdmin
      .from("access_types")
      .select("*")
      .eq("code", access_type_code)
      .single();

    if (!accessType) {
      return NextResponse.json(
        { error: "Tipo de acesso inválido" },
        { status: 400 }
      );
    }

    if (!accessType.is_paid) {
      return NextResponse.json(
        { error: "Este acesso não requer pagamento" },
        { status: 400 }
      );
    }

    // Verificar se o usuário existe, se não, criar
    let userId: string | null = null;

    const { data: existingUsers } = await supabaseAdmin.auth.admin.listUsers();
    const existingUser = existingUsers?.users?.find(
      (u) => u.email === email.toLowerCase()
    );

    if (existingUser) {
      userId = existingUser.id;
    } else {
      // Criar novo usuário
      const { data: newUser, error: createError } =
        await supabaseAdmin.auth.admin.createUser({
          email: email.toLowerCase(),
          email_confirm: true,
        });

      if (createError || !newUser.user) {
        return NextResponse.json(
          { error: "Erro ao criar conta" },
          { status: 500 }
        );
      }

      userId = newUser.user.id;
    }

    // Criar registo de pagamento
    const { data: payment, error: paymentError } = await supabaseAdmin
      .from("payments")
      .insert({
        user_id: userId,
        access_type_code,
        payment_method,
        amount,
        currency: currency || "MZN",
        status: "pending",
        user_email: email.toLowerCase(),
        user_phone: phone || null,
      })
      .select()
      .single();

    if (paymentError || !payment) {
      console.error("Payment creation error:", paymentError);
      return NextResponse.json(
        { error: "Erro ao criar pagamento" },
        { status: 500 }
      );
    }

    // Notificar admin
    await notifyPaymentCreated({
      user_email: email,
      amount,
      currency: currency || "MZN",
      payment_method,
      access_type_code,
    });

    return NextResponse.json({
      ok: true,
      payment_id: payment.id,
      status: payment.status,
      message:
        payment_method === "bank_transfer" || payment_method === "mpesa"
          ? "Pagamento criado. Aguarda confirmação após envio do comprovativo."
          : "Pagamento criado. Prossegue para o pagamento.",
    });
  } catch (error) {
    console.error("Payment creation error:", error);
    return NextResponse.json({ error: "Erro interno" }, { status: 500 });
  }
}
