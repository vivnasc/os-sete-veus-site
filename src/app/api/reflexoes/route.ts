import { NextResponse } from 'next/server'
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

export async function GET(req: Request) {
  const supabase = createRouteHandlerClient({ cookies })
  const { searchParams } = new URL(req.url)
  const veuNumero = searchParams.get('veu')
  const capitulo = searchParams.get('capitulo')

  const { data: { session } } = await supabase.auth.getSession()

  if (!session) {
    return NextResponse.json({ error: 'Não autenticado' }, { status: 401 })
  }

  let query = supabase
    .from('reflexoes')
    .select('*')
    .eq('user_id', session.user.id)
    .order('created_at', { ascending: false })

  if (veuNumero) {
    query = query.eq('veu_numero', parseInt(veuNumero))
  }

  if (capitulo) {
    query = query.eq('capitulo', parseInt(capitulo))
  }

  const { data, error } = await query

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ reflexoes: data })
}

export async function POST(req: Request) {
  const supabase = createRouteHandlerClient({ cookies })
  const { data: { session } } = await supabase.auth.getSession()

  if (!session) {
    return NextResponse.json({ error: 'Não autenticado' }, { status: 401 })
  }

  const { veuNumero, capitulo, conteudo } = await req.json()

  const { data, error } = await supabase
    .from('reflexoes')
    .insert({
      user_id: session.user.id,
      veu_numero: veuNumero,
      capitulo,
      conteudo,
    })
    .select()
    .single()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ reflexao: data })
}
