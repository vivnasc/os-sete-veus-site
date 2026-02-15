import { NextResponse } from 'next/server'
import { createSupabaseServerClient } from '@/lib/supabase-server'

// GET: Collective consciousness data (no personal data)
export async function GET() {
  const supabase = await createSupabaseServerClient()
  const { data: { session } } = await supabase.auth.getSession()

  if (!session) {
    return NextResponse.json({ error: 'Não autenticado' }, { status: 401 })
  }

  // Get theme distribution from active ecos
  const { data: ecos } = await supabase
    .from('ecos')
    .select('temas, veu_numero, created_at')
    .gt('expires_at', new Date().toISOString())

  if (!ecos) {
    return NextResponse.json({ mare: { temas: {}, veus: {}, total: 0 } })
  }

  // Aggregate themes
  const temaCount: Record<string, number> = {}
  const veuCount: Record<number, number> = {}
  const recentTemas: Record<string, number> = {}

  const oneDayAgo = Date.now() - 24 * 60 * 60 * 1000

  for (const eco of ecos) {
    // Count per veil
    veuCount[eco.veu_numero] = (veuCount[eco.veu_numero] || 0) + 1

    // Count themes
    for (const tema of (eco.temas || [])) {
      temaCount[tema] = (temaCount[tema] || 0) + 1

      // Recent themes (last 24h)
      if (new Date(eco.created_at).getTime() > oneDayAgo) {
        recentTemas[tema] = (recentTemas[tema] || 0) + 1
      }
    }
  }

  // Get total active readers (unique users with ecos)
  const { count: activeReaders } = await supabase
    .from('ecos')
    .select('user_id', { count: 'exact', head: true })
    .gt('expires_at', new Date().toISOString())

  return NextResponse.json({
    mare: {
      temas: temaCount,
      recentTemas,
      veus: veuCount,
      total: ecos.length,
      leitoras: activeReaders || 0,
    },
  })
}
