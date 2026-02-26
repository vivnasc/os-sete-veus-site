import { NextResponse } from "next/server";
import { createSupabaseServerClient, createSupabaseAdminClient } from "@/lib/supabase-server";

export const dynamic = "force-dynamic";

const ADMIN_EMAILS = ["viv.saraiva@gmail.com"];

/**
 * POST /api/codes/reset
 * Reseta um codigo E o acesso do utilizador que o usou.
 * Permite re-testar o fluxo completo do zero.
 * Apenas admins podem resetar.
 * Body: { code, resetUserAccess? boolean }
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

    const { code, resetUserAccess = true } = await request.json();
    if (!code) {
      return NextResponse.json({ error: "Código obrigatório" }, { status: 400 });
    }

    const supabaseAdmin = createSupabaseAdminClient();
    if (!supabaseAdmin) {
      return NextResponse.json(
        { error: "Serviço temporariamente indisponível" },
        { status: 503 }
      );
    }

    // Buscar o codigo para saber quem o usou
    const { data: codeData } = await supabaseAdmin
      .from("livro_codes")
      .select("*")
      .eq("code", code.toUpperCase().trim())
      .single();

    if (!codeData) {
      return NextResponse.json(
        { error: "Código não encontrado" },
        { status: 404 }
      );
    }

    const actions: string[] = [];

    // Se o codigo foi usado e queremos resetar o acesso do utilizador
    if (codeData.used_by && resetUserAccess) {
      // Remover has_book_access do perfil
      await supabaseAdmin
        .from("profiles")
        .update({ has_book_access: false })
        .eq("id", codeData.used_by);
      actions.push("Acesso do utilizador removido");

      // Remover registo de compra associado
      await supabaseAdmin
        .from("purchases")
        .delete()
        .eq("user_id", codeData.used_by)
        .eq("granted_via", "livro_code");
      actions.push("Registo de compra removido");
    }

    // Resetar o codigo
    const { error } = await supabaseAdmin
      .from("livro_codes")
      .update({
        status: "unused",
        used_at: null,
        used_by: null,
      })
      .eq("code", code.toUpperCase().trim());

    if (error) {
      return NextResponse.json(
        { error: "Erro ao resetar código: " + error.message },
        { status: 500 }
      );
    }
    actions.push("Código resetado para unused");

    return NextResponse.json({
      ok: true,
      message: `${code.toUpperCase()} resetado. ${actions.join(". ")}.`,
    });
  } catch (error) {
    console.error("Code reset error:", error);
    return NextResponse.json({ error: "Erro interno" }, { status: 500 });
  }
}
