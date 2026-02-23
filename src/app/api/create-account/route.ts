import { NextResponse } from "next/server";
import { createSupabaseAdminClient } from "@/lib/supabase-server";
import { ADMIN_EMAILS, ALL_PRODUCTS } from "@/lib/constants";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email || typeof email !== "string") {
      return NextResponse.json({ error: "Email inválido" }, { status: 400 });
    }

    if (password && password.length < 8) {
      return NextResponse.json(
        { error: "Password deve ter pelo menos 8 caracteres" },
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

    // Check if user already exists
    const { data: existingUsers } = await supabaseAdmin.auth.admin.listUsers();
    const existingUser = existingUsers?.users?.find(
      (u) => u.email === email.toLowerCase()
    );

    if (existingUser) {
      const isAuthor = ADMIN_EMAILS.includes(email.toLowerCase());
      const products = isAuthor ? ALL_PRODUCTS : ["experiencia-veu-ilusao"];
      for (const product of products) {
        await supabaseAdmin.from("purchases").upsert(
          { user_id: existingUser.id, product },
          { onConflict: "user_id,product" }
        );
      }

      // Send magic link to existing user
      await supabaseAdmin.auth.admin.generateLink({
        type: "magiclink",
        email: email.toLowerCase(),
      });

      return NextResponse.json({
        ok: true,
        existing: true,
        message: "Já tens uma conta. Enviámos um link para o teu email.",
      });
    }

    // Create new user (with optional password)
    const { data: newUser, error: createError } =
      await supabaseAdmin.auth.admin.createUser({
        email: email.toLowerCase(),
        email_confirm: true,
        password: password || undefined,
      });

    if (createError || !newUser.user) {
      return NextResponse.json(
        { error: "Erro ao criar conta" },
        { status: 500 }
      );
    }

    // Create purchase record(s)
    const isAuthor = ADMIN_EMAILS.includes(email.toLowerCase());
    const products = isAuthor ? ALL_PRODUCTS : ["experiencia-veu-ilusao"];
    for (const product of products) {
      await supabaseAdmin.from("purchases").insert({
        user_id: newUser.user.id,
        product,
      });
    }

    // Send magic link to new user
    await supabaseAdmin.auth.admin.generateLink({
      type: "magiclink",
      email: email.toLowerCase(),
    });

    return NextResponse.json({
      ok: true,
      existing: false,
      message: "Link enviado para o teu email",
    });
  } catch {
    return NextResponse.json({ error: "Erro interno" }, { status: 500 });
  }
}
