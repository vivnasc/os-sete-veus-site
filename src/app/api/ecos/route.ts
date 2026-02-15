import { NextResponse } from 'next/server'
import { createSupabaseServerClient } from '@/lib/supabase-server'
import { detectarTemas } from '@/lib/temas'

// GET: Fetch anonymous ecos (never reveals user identity)
export async function GET(req: Request) {
  const supabase = await createSupabaseServerClient()
  const { searchParams } = new URL(req.url)
  const veu = searchParams.get('veu')

  const { data: { session } } = await supabase.auth.getSession()
  if (!session) {
    return NextResponse.json({ error: 'Não autenticado' }, { status: 401 })
  }

  let query = supabase
    .from('ecos')
    .select(`
      id,
      veu_numero,
      capitulo,
      conteudo,
      temas,
      created_at,
      reconhecimentos(count)
    `)
    .gt('expires_at', new Date().toISOString())
    .order('created_at', { ascending: false })
    .limit(30)

  if (veu) {
    query = query.eq('veu_numero', parseInt(veu))
  }

  const { data, error } = await query

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  // Check which ecos the current user has recognized
  const ecoIds = (data || []).map((e) => e.id)
  const { data: userReconhecimentos } = await supabase
    .from('reconhecimentos')
    .select('eco_id')
    .eq('user_id', session.user.id)
    .in('eco_id', ecoIds)

  const reconhecidosSet = new Set((userReconhecimentos || []).map((r) => r.eco_id))

  // Check which ecos belong to the current user (so they can see their own)
  const { data: userEcos } = await supabase
    .from('ecos')
    .select('id')
    .eq('user_id', session.user.id)

  const mineSet = new Set((userEcos || []).map((e) => e.id))

  // Strip user identity — ecos are anonymous
  const ecosAnonimos = (data || []).map((eco) => ({
    id: eco.id,
    veu_numero: eco.veu_numero,
    capitulo: eco.capitulo,
    conteudo: eco.conteudo,
    temas: eco.temas,
    created_at: eco.created_at,
    reconhecimentos_count: (eco.reconhecimentos as unknown as { count: number }[])?.[0]?.count || 0,
    reconhecido_por_mim: reconhecidosSet.has(eco.id),
    is_mine: mineSet.has(eco.id),
  }))

  return NextResponse.json({ ecos: ecosAnonimos })
}

// POST: Release a reflection as an anonymous echo
export async function POST(req: Request) {
  const supabase = await createSupabaseServerClient()
  const { data: { session } } = await supabase.auth.getSession()

  if (!session) {
    return NextResponse.json({ error: 'Não autenticado' }, { status: 401 })
  }

  const { veuNumero, capitulo, conteudo, reflexaoId } = await req.json()

  if (!conteudo?.trim() || !veuNumero) {
    return NextResponse.json({ error: 'Conteúdo e véu são obrigatórios' }, { status: 400 })
  }

  // Detect themes automatically
  const temas = detectarTemas(conteudo)

  const { data, error } = await supabase
    .from('ecos')
    .insert({
      user_id: session.user.id,
      reflexao_id: reflexaoId || null,
      veu_numero: veuNumero,
      capitulo: capitulo || null,
      conteudo: conteudo.trim(),
      temas,
    })
    .select()
    .single()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ eco: { id: data.id, temas } })
}

// DELETE: Remove own eco
export async function DELETE(req: Request) {
  const supabase = await createSupabaseServerClient()
  const { data: { session } } = await supabase.auth.getSession()

  if (!session) {
    return NextResponse.json({ error: 'Não autenticado' }, { status: 401 })
  }

  const { searchParams } = new URL(req.url)
  const ecoId = searchParams.get('id')

  if (!ecoId) {
    return NextResponse.json({ error: 'ID do eco é obrigatório' }, { status: 400 })
  }

  const { error } = await supabase
    .from('ecos')
    .delete()
    .eq('id', ecoId)
    .eq('user_id', session.user.id)

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ ok: true })
}
