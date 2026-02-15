import { NextResponse } from 'next/server'
import { createSupabaseServerClient } from '@/lib/supabase-server'

const SUSSURRO_PRESETS = [
  'Ouvi-te.',
  'Também eu.',
  'Não estás sozinha.',
  'Obrigada.',
  'Reconheço-me.',
]

// GET: Fetch whispers sent to me
export async function GET() {
  const supabase = await createSupabaseServerClient()
  const { data: { session } } = await supabase.auth.getSession()

  if (!session) {
    return NextResponse.json({ error: 'Não autenticado' }, { status: 401 })
  }

  const { data, error } = await supabase
    .from('sussurros')
    .select('id, conteudo, lido, created_at')
    .eq('to_user_id', session.user.id)
    .eq('lido', false)
    .gt('expires_at', new Date().toISOString())
    .order('created_at', { ascending: false })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ sussurros: data, presets: SUSSURRO_PRESETS })
}

// POST: Send a whisper to the author of an eco
export async function POST(req: Request) {
  const supabase = await createSupabaseServerClient()
  const { data: { session } } = await supabase.auth.getSession()

  if (!session) {
    return NextResponse.json({ error: 'Não autenticado' }, { status: 401 })
  }

  const { ecoId, conteudo } = await req.json()

  if (!ecoId || !conteudo?.trim()) {
    return NextResponse.json({ error: 'Eco e conteúdo são obrigatórios' }, { status: 400 })
  }

  if (conteudo.length > 100) {
    return NextResponse.json({ error: 'Sussurro demasiado longo (máx. 100 caracteres)' }, { status: 400 })
  }

  // Find the eco author (without revealing identity)
  const { data: eco } = await supabase
    .from('ecos')
    .select('user_id')
    .eq('id', ecoId)
    .single()

  if (!eco) {
    return NextResponse.json({ error: 'Eco não encontrado' }, { status: 404 })
  }

  if (eco.user_id === session.user.id) {
    return NextResponse.json({ error: 'Não podes sussurrar a ti mesma' }, { status: 400 })
  }

  // Check if already sent a whisper to this eco
  const { data: existing } = await supabase
    .from('sussurros')
    .select('id')
    .eq('eco_id', ecoId)
    .eq('from_user_id', session.user.id)
    .limit(1)

  if (existing && existing.length > 0) {
    return NextResponse.json({ error: 'Já enviaste um sussurro para este eco' }, { status: 400 })
  }

  const { error } = await supabase
    .from('sussurros')
    .insert({
      eco_id: ecoId,
      from_user_id: session.user.id,
      to_user_id: eco.user_id,
      conteudo: conteudo.trim(),
    })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ ok: true })
}

// PATCH: Mark whisper as read (then it disappears)
export async function PATCH(req: Request) {
  const supabase = await createSupabaseServerClient()
  const { data: { session } } = await supabase.auth.getSession()

  if (!session) {
    return NextResponse.json({ error: 'Não autenticado' }, { status: 401 })
  }

  const { sussurroId } = await req.json()

  const { error } = await supabase
    .from('sussurros')
    .update({ lido: true })
    .eq('id', sussurroId)
    .eq('to_user_id', session.user.id)

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ ok: true })
}
