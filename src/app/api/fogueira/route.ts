import { NextResponse } from 'next/server'
import { createSupabaseServerClient } from '@/lib/supabase-server'

// GET: Get current or next fogueira
export async function GET() {
  const supabase = await createSupabaseServerClient()
  const { data: { session } } = await supabase.auth.getSession()

  if (!session) {
    return NextResponse.json({ error: 'Não autenticado' }, { status: 401 })
  }

  const now = new Date().toISOString()

  // Check for active fogueira
  const { data: activa } = await supabase
    .from('fogueiras')
    .select(`
      id, titulo, descricao, starts_at, ends_at, activa,
      frase_abertura, frase_fecho,
      fogueira_faiscas(id, conteudo, created_at)
    `)
    .eq('activa', true)
    .lte('starts_at', now)
    .gte('ends_at', now)
    .order('starts_at', { ascending: false })
    .limit(1)
    .single()

  if (activa) {
    return NextResponse.json({ fogueira: activa, estado: 'activa' })
  }

  // Check for upcoming fogueira
  const { data: proxima } = await supabase
    .from('fogueiras')
    .select('id, titulo, descricao, starts_at, ends_at')
    .gt('starts_at', now)
    .order('starts_at', { ascending: true })
    .limit(1)
    .single()

  if (proxima) {
    return NextResponse.json({ fogueira: proxima, estado: 'agendada' })
  }

  return NextResponse.json({ fogueira: null, estado: 'nenhuma' })
}

// POST: Add a spark to the bonfire
export async function POST(req: Request) {
  const supabase = await createSupabaseServerClient()
  const { data: { session } } = await supabase.auth.getSession()

  if (!session) {
    return NextResponse.json({ error: 'Não autenticado' }, { status: 401 })
  }

  const { fogueiraId, conteudo } = await req.json()

  if (!fogueiraId || !conteudo?.trim()) {
    return NextResponse.json({ error: 'Fogueira e conteúdo são obrigatórios' }, { status: 400 })
  }

  if (conteudo.length > 200) {
    return NextResponse.json({ error: 'Faísca demasiado longa (máx. 200 caracteres)' }, { status: 400 })
  }

  // Verify fogueira is active
  const { data: fogueira } = await supabase
    .from('fogueiras')
    .select('activa, starts_at, ends_at')
    .eq('id', fogueiraId)
    .single()

  if (!fogueira?.activa) {
    return NextResponse.json({ error: 'Fogueira não está activa' }, { status: 400 })
  }

  const now = new Date()
  if (now < new Date(fogueira.starts_at) || now > new Date(fogueira.ends_at)) {
    return NextResponse.json({ error: 'Fogueira fora do horário' }, { status: 400 })
  }

  const { data, error } = await supabase
    .from('fogueira_faiscas')
    .insert({
      fogueira_id: fogueiraId,
      user_id: session.user.id,
      conteudo: conteudo.trim(),
    })
    .select('id, conteudo, created_at')
    .single()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ faisca: data })
}
