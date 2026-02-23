import { NextResponse } from "next/server";
import { createSupabaseServerClient, createSupabaseAdminClient } from "@/lib/supabase-server";

export const dynamic = "force-dynamic";

const ADMIN_EMAILS = ["viv.saraiva@gmail.com"];

/**
 * Gera codigo unico LIVRO-XXXXX (sem depender de RPC do Supabase)
 */
function generateCode(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let code = "LIVRO-";
  for (let i = 0; i < 5; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

async function checkIsAdmin(supabase: Awaited<ReturnType<typeof createSupabaseServerClient>>) {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) return { session: null, isAdmin: false };

  const isAdminEmail = ADMIN_EMAILS.includes(session.user.email || "");
  if (isAdminEmail) return { session, isAdmin: true };

  const { data: userRole } = await supabase
    .from("user_roles")
    .select("role")
    .eq("user_id", session.user.id)
    .single();

  return { session, isAdmin: userRole?.role === "admin" };
}

/**
 * POST /api/codes/approve
 * Admin aprova pedido de codigo e gera codigo automaticamente
 */
export async function POST(request: Request) {
  try {
    const supabase = await createSupabaseServerClient();
    const { session, isAdmin } = await checkIsAdmin(supabase);

    if (!session) {
      return NextResponse.json({ error: "Nao autenticado" }, { status: 401 });
    }
    if (!isAdmin) {
      return NextResponse.json({ error: "Sem permissao" }, { status: 403 });
    }

    const body = await request.json();
    const { requestId } = body;

    if (!requestId) {
      return NextResponse.json(
        { error: "Request ID nao fornecido" },
        { status: 400 }
      );
    }

    // Usar admin client para bypass RLS
    const supabaseAdmin = createSupabaseAdminClient();
    if (!supabaseAdmin) {
      return NextResponse.json(
        { error: "Servico temporariamente indisponivel" },
        { status: 503 }
      );
    }

    // Busca o pedido
    const { data: requestData, error: requestError } = await supabaseAdmin
      .from("livro_code_requests")
      .select("*")
      .eq("id", requestId)
      .single();

    if (requestError || !requestData) {
      return NextResponse.json(
        { error: "Pedido nao encontrado" },
        { status: 404 }
      );
    }

    if (requestData.status === "approved") {
      return NextResponse.json(
        { error: "Este pedido ja foi aprovado" },
        { status: 400 }
      );
    }

    // Gerar codigo unico em JS (sem depender de RPC)
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

    // Inserir codigo na tabela
    const { data: insertedCode, error: insertError } = await supabaseAdmin
      .from("livro_codes")
      .insert({
        code,
        email: requestData.email,
        status: "unused",
        created_by: "admin",
        notes: `Gerado para pedido #${requestId} - ${requestData.full_name}`,
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

    // Atualizar pedido como aprovado
    const { error: updateError } = await supabaseAdmin
      .from("livro_code_requests")
      .update({
        status: "approved",
        generated_code_id: insertedCode.id,
        reviewed_at: new Date().toISOString(),
        reviewed_by: session.user.id,
      })
      .eq("id", requestId);

    if (updateError) {
      console.error("Erro ao atualizar pedido:", updateError);
      return NextResponse.json(
        { error: "Erro ao atualizar pedido" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      code: insertedCode,
      message: `Codigo ${code} gerado para ${requestData.email}`,
    });
  } catch (error) {
    console.error("Erro ao aprovar pedido:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/codes/approve
 * Admin rejeita pedido de codigo
 */
export async function DELETE(request: Request) {
  try {
    const supabase = await createSupabaseServerClient();
    const { session, isAdmin } = await checkIsAdmin(supabase);

    if (!session) {
      return NextResponse.json({ error: "Nao autenticado" }, { status: 401 });
    }
    if (!isAdmin) {
      return NextResponse.json({ error: "Sem permissao" }, { status: 403 });
    }

    const body = await request.json();
    const { requestId, reason } = body;

    if (!requestId) {
      return NextResponse.json(
        { error: "Request ID nao fornecido" },
        { status: 400 }
      );
    }

    const supabaseAdmin = createSupabaseAdminClient();
    if (!supabaseAdmin) {
      return NextResponse.json(
        { error: "Servico temporariamente indisponivel" },
        { status: 503 }
      );
    }

    const { error: updateError } = await supabaseAdmin
      .from("livro_code_requests")
      .update({
        status: "rejected",
        rejection_reason: reason || "Pedido rejeitado pelo administrador",
        reviewed_at: new Date().toISOString(),
        reviewed_by: session.user.id,
      })
      .eq("id", requestId);

    if (updateError) {
      console.error("Erro ao rejeitar pedido:", updateError);
      return NextResponse.json(
        { error: "Erro ao rejeitar pedido" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Pedido rejeitado",
    });
  } catch (error) {
    console.error("Erro ao rejeitar pedido:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}
