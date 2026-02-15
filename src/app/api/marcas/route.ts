import { NextResponse } from 'next/server'
import { createSupabaseServerClient } from '@/lib/supabase-server'

// GET: Fetch marks for a veil (anonymous)
export async function GET(req: Request) {
  const supabase = await createSupabaseServerClient()
  const { searchParams } = new URL(req.url)
  const veu = searchParams.get('veu')

  const { data: { session } } = await supabase.auth.getSession()
  if (!session) {
    return NextResponse.json({ error: 'Não autenticado' }, { status: 401 })
  }

  let query = supabase
    .from('marcas')
    .select('id, veu_numero, conteudo, created_at')
    .gt('expires_at', new Date().toISOString())
    .order('created_at', { ascending: false })
    .limit(5) // Show only the most recent marks

  if (veu) {
    query = query.eq('veu_numero', parseInt(veu))
  }

  const { data, error } = await query

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ marcas: data })
}

// POST: Leave a mark when completing a veil
export async function POST(req: Request) {
  const supabase = await createSupabaseServerClient()
  const { data: { session } } = await supabase.auth.getSession()

  if (!session) {
    return NextResponse.json({ error: 'Não autenticado' }, { status: 401 })
  }

  const { veuNumero, conteudo } = await req.json()

  if (!conteudo?.trim() || !veuNumero) {
    return NextResponse.json({ error: 'Véu e conteúdo são obrigatórios' }, { status: 400 })
  }

  if (conteudo.length > 200) {
    return NextResponse.json({ error: 'Marca demasiado longa (máx. 200 caracteres)' }, { status: 400 })
  }

  // Upsert: one mark per veil per person
  const { data, error } = await supabase
    .from('marcas')
    .upsert(
      {
        user_id: session.user.id,
        veu_numero: veuNumero,
        conteudo: conteudo.trim(),
        expires_at: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString(),
      },
      { onConflict: 'user_id,veu_numero' }
    )
    .select()
    .single()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ marca: data })
}
