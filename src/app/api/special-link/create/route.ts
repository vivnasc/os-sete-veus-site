import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { cookies } from "next/headers";
import { nanoid } from "nanoid";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "";
const ADMIN_EMAIL = "viv.saraiva@gmail.com";

export async function POST(request: Request) {
  try {
    const {
      access_type_code = "livro-fisico",
      max_uses = 1,
      expires_in_days,
      notes,
    } = await request.json();

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

    // Gerar código único
    const code = nanoid(16); // Ex: "Kf9j2mN7pQr1sT3v"

    // Calcular data de expiração se fornecida
    let expiresAt = null;
    if (expires_in_days && expires_in_days > 0) {
      const expireDate = new Date();
      expireDate.setDate(expireDate.getDate() + expires_in_days);
      expiresAt = expireDate.toISOString();
    }

    // Criar link especial
    const { data: specialLink, error: createError } = await supabaseAdmin
      .from("special_links")
      .insert({
        code,
        access_type_code,
        max_uses,
        expires_at: expiresAt,
        created_by: userData.user.id,
        notes: notes || null,
      })
      .select()
      .single();

    if (createError || !specialLink) {
      console.error("Special link creation error:", createError);
      return NextResponse.json(
        { error: "Erro ao criar link especial" },
        { status: 500 }
      );
    }

    // Gerar URL completa
    const baseUrl =
      process.env.NEXT_PUBLIC_APP_URL || "https://seteveus.space";
    const linkUrl = `${baseUrl}/registar-livro?code=${code}`;

    return NextResponse.json({
      ok: true,
      link: linkUrl,
      code,
      expires_at: expiresAt,
      max_uses,
    });
  } catch (error) {
    console.error("Special link creation error:", error);
    return NextResponse.json({ error: "Erro interno" }, { status: 500 });
  }
}
