import { NextResponse } from 'next/server'
import { createSupabaseServerClient } from '@/lib/supabase-server'

// POST: Share a fragment in the circle
export async function POST(req: Request) {
  const supabase = await createSupabaseServerClient()
  const { data: { session } } = await supabase.auth.getSession()

  if (!session) {
    return NextResponse.json({ error: 'Não autenticado' }, { status: 401 })
  }

  const { circuloId, conteudo } = await req.json()

  if (!circuloId || !conteudo?.trim()) {
    return NextResponse.json({ error: 'Círculo e conteúdo são obrigatórios' }, { status: 400 })
  }

  if (conteudo.length > 300) {
    return NextResponse.json({ error: 'Fragmento demasiado longo (máx. 300 caracteres)' }, { status: 400 })
  }

  // Verify user is member of circle
  const { data: membro } = await supabase
    .from('circulo_membros')
    .select('id')
    .eq('circulo_id', circuloId)
    .eq('user_id', session.user.id)
    .single()

  if (!membro) {
    return NextResponse.json({ error: 'Não és membro deste círculo' }, { status: 403 })
  }

  const { data, error } = await supabase
    .from('circulo_fragmentos')
    .insert({
      circulo_id: circuloId,
      user_id: session.user.id,
      conteudo: conteudo.trim(),
    })
    .select('id, conteudo, created_at')
    .single()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ fragmento: data })
}
