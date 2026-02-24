import { NextResponse } from "next/server";
import { createSupabaseAdminClient } from "@/lib/supabase-server";
import { notifyPaymentCreated } from "@/lib/notify-admin";

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

    const supabaseAdmin = createSupabaseAdminClient();
    if (!supabaseAdmin) {
      return NextResponse.json(
        { error: "Serviço temporariamente indisponível" },
        { status: 503 }
      );
    }

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
    const normalizedEmail = email.toLowerCase();

    // Tentar criar primeiro — se ja existe, o erro diz-nos
    const { data: newUser, error: createError } =
      await supabaseAdmin.auth.admin.createUser({
        email: normalizedEmail,
        email_confirm: true,
      });

    if (newUser?.user) {
      userId = newUser.user.id;
    } else if (
      createError?.message?.includes("already been registered") ||
      createError?.message?.includes("already exists")
    ) {
      // Utilizador ja existe — procurar na tabela profiles por email
      const { data: profile } = await supabaseAdmin
        .from("profiles")
        .select("id")
        .eq("email", normalizedEmail)
        .single();

      if (profile) {
        userId = profile.id;
      } else {
        // Fallback: listUsers com paginacao
        let page = 1;
        const perPage = 100;
        while (!userId) {
          const { data: listed } = await supabaseAdmin.auth.admin.listUsers({
            page,
            perPage,
          });
          const found = listed?.users?.find((u) => u.email === normalizedEmail);
          if (found) {
            userId = found.id;
            break;
          }
          if (!listed?.users?.length || listed.users.length < perPage) break;
          page++;
        }
      }

      if (!userId) {
        return NextResponse.json(
          { error: "Erro ao encontrar conta existente" },
          { status: 500 }
        );
      }
    } else {
      console.error("[payment/create] createUser error:", createError);
      return NextResponse.json(
        { error: "Erro ao criar conta" },
        { status: 500 }
      );
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
