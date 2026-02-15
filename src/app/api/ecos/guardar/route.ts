import { NextResponse } from 'next/server'
import { createSupabaseServerClient } from '@/lib/supabase-server'

// POST: Guardar um eco na colecção pessoal
export async function POST(req: Request) {
  const supabase = await createSupabaseServerClient()
  const { data: { session } } = await supabase.auth.getSession()

  if (!session) {
    return NextResponse.json({ error: 'Não autenticado' }, { status: 401 })
  }

  const { ecoId } = await req.json()

  if (!ecoId) {
    return NextResponse.json({ error: 'ID do eco é obrigatório' }, { status: 400 })
  }

  // Verificar se já guardou
  const { data: existente } = await supabase
    .from('ecos_guardados')
    .select('id')
    .eq('user_id', session.user.id)
    .eq('eco_id', ecoId)
    .maybeSingle()

  if (existente) {
    return NextResponse.json({ ok: true, ja_guardado: true })
  }

  const { error } = await supabase
    .from('ecos_guardados')
    .insert({
      user_id: session.user.id,
      eco_id: ecoId,
    })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ ok: true })
}

// DELETE: Remover eco da colecção
export async function DELETE(req: Request) {
  const supabase = await createSupabaseServerClient()
  const { data: { session } } = await supabase.auth.getSession()

  if (!session) {
    return NextResponse.json({ error: 'Não autenticado' }, { status: 401 })
  }

  const { searchParams } = new URL(req.url)
  const ecoId = searchParams.get('ecoId')

  if (!ecoId) {
    return NextResponse.json({ error: 'ID do eco é obrigatório' }, { status: 400 })
  }

  await supabase
    .from('ecos_guardados')
    .delete()
    .eq('user_id', session.user.id)
    .eq('eco_id', ecoId)

  return NextResponse.json({ ok: true })
}

// GET: Listar ecos guardados
export async function GET(req: Request) {
  const supabase = await createSupabaseServerClient()
  const { data: { session } } = await supabase.auth.getSession()

  if (!session) {
    return NextResponse.json({ error: 'Não autenticado' }, { status: 401 })
  }

  const { searchParams } = new URL(req.url)
  const ids = searchParams.get('ids') // Comma-separated eco IDs to check

  if (ids) {
    // Check which of these eco IDs are saved
    const idList = ids.split(',')
    const { data } = await supabase
      .from('ecos_guardados')
      .select('eco_id')
      .eq('user_id', session.user.id)
      .in('eco_id', idList)

    const savedSet = (data || []).map((d) => d.eco_id)
    return NextResponse.json({ guardados: savedSet })
  }

  // List all saved ecos with their content
  const { data } = await supabase
    .from('ecos_guardados')
    .select(`
      eco_id,
      created_at,
      ecos (
        id,
        veu_numero,
        conteudo,
        temas,
        created_at
      )
    `)
    .eq('user_id', session.user.id)
    .order('created_at', { ascending: false })

  return NextResponse.json({ ecos_guardados: data || [] })
}
