import { NextResponse } from "next/server";
import { createSupabaseServerClient, createSupabaseAdminClient } from "@/lib/supabase-server";
import { notifyAdmin } from "@/lib/notify-admin";

export const dynamic = "force-dynamic";

/**
 * Gera codigo unico LIVRO-XXXXX (sem depender de RPC do Supabase)
 */
function generateCode(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"; // sem I/O/0/1 para evitar confusao
  let code = "LIVRO-";
  for (let i = 0; i < 5; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

/**
 * POST /api/codes/generate
 * Gera um codigo unico de acesso ao livro digital
 * Apenas admins podem gerar codigos
 */
export async function POST(request: Request) {
  try {
    // Verificar autenticacao via cookies
    const supabase = await createSupabaseServerClient();

    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
      return NextResponse.json({ error: "Nao autenticado" }, { status: 401 });
    }

    // Verificar admin (via email directo ou role)
    const ADMIN_EMAILS = ["viv.saraiva@gmail.com"];
    const isAdminEmail = ADMIN_EMAILS.includes(session.user.email || "");

    if (!isAdminEmail) {
      const { data: userRole } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", session.user.id)
        .single();

      if (!userRole || userRole.role !== "admin") {
        return NextResponse.json(
          { error: "Sem permissao" },
          { status: 403 }
        );
      }
    }

    const supabaseAdmin = createSupabaseAdminClient();
    if (!supabaseAdmin) {
      return NextResponse.json(
        { error: "Servico temporariamente indisponivel" },
        { status: 503 }
      );
    }

    const body = await request.json();
    const { email, notes } = body;

    // Gerar codigo unico (tentar ate 10 vezes para evitar duplicados)
    let code = "";
    for (let attempt = 0; attempt < 10; attempt++) {
      const candidate = generateCode();
      const { data: existing } = await supabaseAdmin
        .from("livro_codes")
        .select("id")
        .eq("code", candidate)
        .maybeSingle();

      if (!existing) {
        code = candidate;
        break;
      }
    }

    if (!code) {
      return NextResponse.json(
        { error: "Erro ao gerar codigo unico. Tenta novamente." },
        { status: 500 }
      );
    }

    // Inserir codigo na tabela (service role bypassa RLS)
    const { data: insertedCode, error: insertError } = await supabaseAdmin
      .from("livro_codes")
      .insert({
        code,
        email: email || null,
        status: "unused",
        created_by: "admin",
        notes: notes || null,
      })
      .select()
      .single();

    if (insertError) {
      console.error("Erro ao inserir codigo:", insertError);
      return NextResponse.json(
        { error: `Erro ao salvar codigo: ${insertError.message}` },
        { status: 500 }
      );
    }

    // Notificar
    await notifyAdmin({
      type: "general",
      title: "Codigo gerado",
      message: `Codigo ${code} gerado${email ? ` para ${email}` : ""}.`,
      details: {
        Codigo: code,
        Email: email || "—",
        Notas: notes || "—",
      },
    });

    return NextResponse.json({
      success: true,
      code: insertedCode,
    });
  } catch (error) {
    console.error("Erro ao gerar codigo:", error);
    return NextResponse.json(
      {
        error: `Erro ao gerar codigo: ${error instanceof Error ? error.message : "Erro desconhecido"}`,
      },
      { status: 500 }
    );
  }
}
