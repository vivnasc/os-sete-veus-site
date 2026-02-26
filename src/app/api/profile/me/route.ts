import { NextResponse } from "next/server";
import { createSupabaseServerClient, createSupabaseAdminClient } from "@/lib/supabase-server";

export const dynamic = "force-dynamic";

/**
 * GET /api/profile/me
 *
 * Retorna o perfil do utilizador autenticado.
 * Usa o admin client para contornar RLS — o browser client
 * nao consegue ler a tabela profiles directamente.
 */
export async function GET() {
  try {
    const supabase = await createSupabaseServerClient();
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
      return NextResponse.json({ error: "Nao autenticado" }, { status: 401 });
    }

    const supabaseAdmin = createSupabaseAdminClient();
    if (!supabaseAdmin) {
      return NextResponse.json(
        { error: "Serviço indisponível" },
        { status: 503 }
      );
    }

    const { data: profile, error } = await supabaseAdmin
      .from("profiles")
      .select("*")
      .eq("id", session.user.id)
      .single();

    if (error || !profile) {
      return NextResponse.json({ profile: null });
    }

    return NextResponse.json({ profile });
  } catch {
    return NextResponse.json({ error: "Erro interno" }, { status: 500 });
  }
}
