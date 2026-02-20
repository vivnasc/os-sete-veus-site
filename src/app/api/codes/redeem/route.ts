import { NextResponse } from "next/server";
import { createSupabaseAdminClient } from "@/lib/supabase-server";
import { notifyCodeRedeemed } from "@/lib/notify-admin";

/**
 * POST /api/codes/redeem
 * Resgata um código LIVRO-XXXXX:
 * 1. Valida o código
 * 2. Cria ou encontra o utilizador
 * 3. Concede acesso (has_book_access + has_mirrors_access)
 * 4. Marca código como usado
 * 5. Envia magic link
 */
export async function POST(request: Request) {
  try {
    const { code, email, password } = await request.json();

    if (!code || !email) {
      return NextResponse.json(
        { error: "Código e email são obrigatórios" },
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

    // Buscar código
    const { data: codeData, error: codeError } = await supabaseAdmin
      .from("livro_codes")
      .select("*")
      .eq("code", code.toUpperCase().trim())
      .single();

    if (codeError || !codeData) {
      return NextResponse.json(
        { error: "Código inválido ou não encontrado" },
        { status: 404 }
      );
    }

    if (codeData.status === "used") {
      return NextResponse.json(
        { error: "Este código já foi usado" },
        { status: 400 }
      );
    }

    if (codeData.status === "expired") {
      return NextResponse.json(
        { error: "Este código expirou" },
        { status: 400 }
      );
    }

    // Verificar/criar utilizador
    let userId: string | null = null;

    const { data: existingUsers } = await supabaseAdmin.auth.admin.listUsers();
    const existingUser = existingUsers?.users?.find(
      (u) => u.email === email.toLowerCase()
    );

    if (existingUser) {
      userId = existingUser.id;
      // Se o utilizador já existe e enviou password, actualizar a password
      if (password) {
        await supabaseAdmin.auth.admin.updateUserById(existingUser.id, {
          password,
        });
      }
    } else {
      const { data: newUser, error: createError } =
        await supabaseAdmin.auth.admin.createUser({
          email: email.toLowerCase(),
          email_confirm: true,
          ...(password ? { password } : {}),
        });

      if (createError || !newUser.user) {
        return NextResponse.json(
          { error: "Erro ao criar conta" },
          { status: 500 }
        );
      }

      userId = newUser.user.id;
    }

    // Conceder acesso: actualizar perfil
    await supabaseAdmin
      .from("profiles")
      .update({
        has_book_access: true,
        has_mirrors_access: true,
      })
      .eq("id", userId);

    // Criar registo de compra
    await supabaseAdmin.from("purchases").insert({
      user_id: userId,
      product: "livro-codigo",
      access_type_code: "livro-codigo",
      granted_via: "livro_code",
      granted_at: new Date().toISOString(),
    });

    // Marcar código como usado
    await supabaseAdmin
      .from("livro_codes")
      .update({
        status: "used",
        used_at: new Date().toISOString(),
        used_by: userId,
      })
      .eq("id", codeData.id);

    // Notificar admin
    await notifyCodeRedeemed({ email: email.toLowerCase(), code });

    return NextResponse.json({
      ok: true,
      message:
        "Acesso concedido! Enviámos um link para o teu email para fazeres login.",
    });
  } catch (error) {
    console.error("Code redeem error:", error);
    return NextResponse.json({ error: "Erro interno" }, { status: 500 });
  }
}
