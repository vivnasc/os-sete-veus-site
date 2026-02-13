import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET(req: Request) {
  const { data: { session } } = await supabase.auth.getSession()

  if (!session) {
    return NextResponse.json({ error: 'Não autenticado' }, { status: 401 })
  }

  const { data, error } = await supabase
    .from('progresso')
    .select('*')
    .eq('user_id', session.user.id)
    .order('veu_numero', { ascending: true })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ progresso: data })
}

export async function POST(req: Request) {
  const { data: { session } } = await supabase.auth.getSession()

  if (!session) {
    return NextResponse.json({ error: 'Não autenticado' }, { status: 401 })
  }

  const { veuNumero, capituloNumero, completado } = await req.json()

  // Verificar se já existe
  const { data: existing } = await supabase
    .from('progresso')
    .select('*')
    .eq('user_id', session.user.id)
    .eq('veu_numero', veuNumero)
    .eq('capitulo_numero', capituloNumero)
    .single()

  if (existing) {
    // Atualizar
    const { data, error } = await supabase
      .from('progresso')
      .update({
        completado,
        last_read_at: new Date().toISOString(),
      })
      .eq('id', existing.id)
      .select()
      .single()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ progresso: data })
  } else {
    // Criar novo
    const { data, error } = await supabase
      .from('progresso')
      .insert({
        user_id: session.user.id,
        veu_numero: veuNumero,
        capitulo_numero: capituloNumero,
        completado,
      })
      .select()
      .single()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ progresso: data })
  }
}
