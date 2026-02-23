import { NextResponse } from "next/server";
import { createSupabaseServerClient, createSupabaseAdminClient } from "@/lib/supabase-server";

export const dynamic = "force-dynamic";

const ADMIN_EMAILS = ["viv.saraiva@gmail.com"];

/**
 * POST /api/codes/reset
 * Reseta um codigo usado para poder ser re-testado.
 * Apenas admins podem resetar codigos.
 * Body: { code }
 */
export async function POST(request: Request) {
  try {
    const supabase = await createSupabaseServerClient();
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
      return NextResponse.json({ error: "Nao autenticado" }, { status: 401 });
    }

    if (!ADMIN_EMAILS.includes(session.user.email || "")) {
      return NextResponse.json({ error: "Sem permissao" }, { status: 403 });
    }

    const { code } = await request.json();
    if (!code) {
      return NextResponse.json({ error: "Codigo obrigatorio" }, { status: 400 });
    }

    const supabaseAdmin = createSupabaseAdminClient();
    if (!supabaseAdmin) {
      return NextResponse.json(
        { error: "Servico temporariamente indisponivel" },
        { status: 503 }
      );
    }

    // Resetar o codigo
    const { error, data } = await supabaseAdmin
      .from("livro_codes")
      .update({
        status: "active",
        used_at: null,
        used_by: null,
      })
      .eq("code", code.toUpperCase().trim())
      .select();

    if (error) {
      return NextResponse.json(
        { error: "Erro ao resetar: " + error.message },
        { status: 500 }
      );
    }

    if (!data || data.length === 0) {
      return NextResponse.json(
        { error: "Codigo nao encontrado" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      ok: true,
      message: `Codigo ${code.toUpperCase()} resetado com sucesso. Pode ser usado novamente.`,
    });
  } catch (error) {
    console.error("Code reset error:", error);
    return NextResponse.json({ error: "Erro interno" }, { status: 500 });
  }
}
