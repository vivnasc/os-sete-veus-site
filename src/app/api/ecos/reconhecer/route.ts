import { NextResponse } from 'next/server'
import { createSupabaseServerClient } from '@/lib/supabase-server'

// POST: "Reconheço-me" — silent acknowledgment
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

  // Check that user is not recognizing their own eco
  const { data: eco } = await supabase
    .from('ecos')
    .select('user_id')
    .eq('id', ecoId)
    .single()

  if (eco?.user_id === session.user.id) {
    return NextResponse.json({ error: 'Não podes reconhecer-te no teu próprio eco' }, { status: 400 })
  }

  const { error } = await supabase
    .from('reconhecimentos')
    .insert({
      eco_id: ecoId,
      user_id: session.user.id,
    })

  if (error) {
    // If already recognized, that's fine
    if (error.code === '23505') {
      return NextResponse.json({ ok: true, already: true })
    }
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ ok: true })
}

// DELETE: Remove recognition
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

  const { error } = await supabase
    .from('reconhecimentos')
    .delete()
    .eq('eco_id', ecoId)
    .eq('user_id', session.user.id)

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ ok: true })
}
