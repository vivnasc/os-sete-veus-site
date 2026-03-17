import { NextRequest, NextResponse } from "next/server";
import { createSupabaseServerClient, createSupabaseAdminClient } from "@/lib/supabase-server";
import { ADMIN_EMAILS } from "@/lib/constants";

// GET — lista propostas (opcionalmente filtradas por status e book_slug)
export async function GET(request: NextRequest) {
  const supabase = await createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Não autenticado" }, { status: 401 });

  // Verificar admin
  const { data: profile } = await supabase
    .from("profiles")
    .select("is_admin")
    .eq("id", user.id)
    .single();

  if (!profile?.is_admin && !ADMIN_EMAILS.includes(user.email || "")) {
    return NextResponse.json({ error: "Sem permissão" }, { status: 403 });
  }

  const { searchParams } = new URL(request.url);
  const status = searchParams.get("status") || "pending";
  const bookSlug = searchParams.get("book_slug");

  let query = supabase
    .from("revision_proposals")
    .select("*")
    .eq("status", status)
    .order("created_at", { ascending: true });

  if (bookSlug) {
    query = query.eq("book_slug", bookSlug);
  }

  const { data, error } = await query;
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ proposals: data });
}

// POST — criar nova proposta
export async function POST(request: NextRequest) {
  const supabase = await createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Não autenticado" }, { status: 401 });

  // Verificar admin
  const { data: profile } = await supabase
    .from("profiles")
    .select("is_admin")
    .eq("id", user.id)
    .single();

  if (!profile?.is_admin && !ADMIN_EMAILS.includes(user.email || "")) {
    return NextResponse.json({ error: "Sem permissão" }, { status: 403 });
  }

  const body = await request.json();
  const { book_slug, book_title, chapter_slug, chapter_title, paragraph_index, original_text, proposed_text, note } = body;

  if (!book_slug || !chapter_slug || original_text === undefined || proposed_text === undefined) {
    return NextResponse.json({ error: "Campos obrigatórios em falta" }, { status: 400 });
  }

  const { data, error } = await supabase
    .from("revision_proposals")
    .insert({
      book_slug,
      book_title: book_title || book_slug,
      chapter_slug,
      chapter_title: chapter_title || chapter_slug,
      paragraph_index,
      original_text,
      proposed_text,
      note: note || "",
      created_by: user.id,
    })
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ proposal: data });
}

// PATCH — actualizar status de propostas (aplicar/rejeitar)
export async function PATCH(request: NextRequest) {
  const admin = createSupabaseAdminClient();
  if (!admin) {
    // Fallback ao server client
    const supabase = await createSupabaseServerClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: "Não autenticado" }, { status: 401 });

    const body = await request.json();
    const { ids, status } = body;

    if (!ids?.length || !status) {
      return NextResponse.json({ error: "ids e status obrigatórios" }, { status: 400 });
    }

    const { error } = await supabase
      .from("revision_proposals")
      .update({
        status,
        applied_at: status === "applied" ? new Date().toISOString() : null,
      })
      .in("id", ids);

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ updated: ids.length });
  }

  const body = await request.json();
  const { ids, status } = body;

  if (!ids?.length || !status) {
    return NextResponse.json({ error: "ids e status obrigatórios" }, { status: 400 });
  }

  const { error } = await admin
    .from("revision_proposals")
    .update({
      status,
      applied_at: status === "applied" ? new Date().toISOString() : null,
    })
    .in("id", ids);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ updated: ids.length });
}
