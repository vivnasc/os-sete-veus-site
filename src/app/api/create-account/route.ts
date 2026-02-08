import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://tdytdamtfillqyklgrmb.supabase.co";
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "";

// Author emails get full access to all experiences
const AUTHOR_EMAILS = ["viv.saraiva@gmail.com"];
const ALL_PRODUCTS = [
  "experiencia-veu-ilusao",
  "experiencia-veu-medo",
  "experiencia-veu-culpa",
  "experiencia-veu-identidade",
  "experiencia-veu-controlo",
  "experiencia-veu-desejo",
  "experiencia-veu-separacao",
];

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email || typeof email !== "string") {
      return NextResponse.json({ error: "Email inválido" }, { status: 400 });
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

    // Generate a random password
    const password =
      "Veu" +
      Math.random().toString(36).slice(2, 8) +
      Math.random().toString(36).slice(2, 4).toUpperCase() +
      "!";

    // Check if user already exists
    const { data: existingUsers } = await supabaseAdmin.auth.admin.listUsers();
    const existingUser = existingUsers?.users?.find(
      (u) => u.email === email.toLowerCase()
    );

    if (existingUser) {
      const isAuthor = AUTHOR_EMAILS.includes(email.toLowerCase());
      const products = isAuthor ? ALL_PRODUCTS : ["experiencia-veu-ilusao"];
      for (const product of products) {
        await supabaseAdmin.from("purchases").upsert(
          { user_id: existingUser.id, product },
          { onConflict: "user_id,product" }
        );
      }
      return NextResponse.json({
        ok: true,
        existing: true,
        message: "Já tens uma conta. Faz login com o teu email.",
      });
    }

    // Create new user
    const { data: newUser, error: createError } =
      await supabaseAdmin.auth.admin.createUser({
        email: email.toLowerCase(),
        password,
        email_confirm: true,
      });

    if (createError || !newUser.user) {
      return NextResponse.json(
        { error: "Erro ao criar conta" },
        { status: 500 }
      );
    }

    // Create purchase record(s)
    const isAuthor = AUTHOR_EMAILS.includes(email.toLowerCase());
    const products = isAuthor ? ALL_PRODUCTS : ["experiencia-veu-ilusao"];
    for (const product of products) {
      await supabaseAdmin.from("purchases").insert({
        user_id: newUser.user.id,
        product,
      });
    }

    return NextResponse.json({
      ok: true,
      existing: false,
      password,
      message: "Conta criada com sucesso!",
    });
  } catch {
    return NextResponse.json({ error: "Erro interno" }, { status: 500 });
  }
}
