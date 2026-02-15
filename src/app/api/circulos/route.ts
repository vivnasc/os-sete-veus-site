import { NextResponse } from 'next/server'
import { createSupabaseServerClient } from '@/lib/supabase-server'
import { VEU_NAMES } from '@/lib/temas'

const SOMBRA_NOMES = [
  'Silhueta', 'Sombra', 'Reflexo', 'Murmúrio', 'Brisa',
  'Maré', 'Raiz', 'Semente', 'Névoa', 'Aurora',
  'Centelha', 'Eco', 'Orvalho', 'Flama', 'Vaga',
]

function gerarSombraNome(veuNumero: number, index: number): string {
  const nome = SOMBRA_NOMES[index % SOMBRA_NOMES.length]
  return `${nome} do ${VEU_NAMES[veuNumero] || 'Véu'}`
}

// GET: Get my current circle or available circles
export async function GET(req: Request) {
  const supabase = await createSupabaseServerClient()
  const { searchParams } = new URL(req.url)
  const veu = searchParams.get('veu')

  const { data: { session } } = await supabase.auth.getSession()
  if (!session) {
    return NextResponse.json({ error: 'Não autenticado' }, { status: 401 })
  }

  // Check if user is already in a circle
  const { data: meuCirculo } = await supabase
    .from('circulo_membros')
    .select(`
      sombra_nome,
      circulos(id, veu_numero, activo, expires_at, created_at)
    `)
    .eq('user_id', session.user.id)
    .limit(1)
    .single()

  if (meuCirculo?.circulos) {
    const circulo = meuCirculo.circulos as unknown as {
      id: string; veu_numero: number; activo: boolean; expires_at: string
    }

    if (circulo.activo && new Date(circulo.expires_at) > new Date()) {
      // Get circle members (anonymous)
      const { data: membros } = await supabase
        .from('circulo_membros')
        .select('sombra_nome, joined_at')
        .eq('circulo_id', circulo.id)

      // Get circle fragments
      const { data: fragmentos } = await supabase
        .from('circulo_fragmentos')
        .select('id, conteudo, created_at, user_id')
        .eq('circulo_id', circulo.id)
        .order('created_at', { ascending: false })
        .limit(20)

      // Map user_ids to sombra names for fragments
      const { data: allMembros } = await supabase
        .from('circulo_membros')
        .select('user_id, sombra_nome')
        .eq('circulo_id', circulo.id)

      const sombraMap: Record<string, string> = {}
      for (const m of allMembros || []) {
        sombraMap[m.user_id] = m.sombra_nome
      }

      const fragmentosAnonimos = (fragmentos || []).map((f) => ({
        id: f.id,
        conteudo: f.conteudo,
        created_at: f.created_at,
        sombra: sombraMap[f.user_id] || 'Sombra',
        is_mine: f.user_id === session.user.id,
      }))

      return NextResponse.json({
        circulo: {
          id: circulo.id,
          veu_numero: circulo.veu_numero,
          expires_at: circulo.expires_at,
          minha_sombra: meuCirculo.sombra_nome,
          membros: membros || [],
          fragmentos: fragmentosAnonimos,
        },
      })
    }
  }

  // No active circle — show available circles for the veil
  if (veu) {
    const { data: disponiveis } = await supabase
      .from('circulos')
      .select(`
        id, veu_numero, max_membros, expires_at,
        circulo_membros(count)
      `)
      .eq('veu_numero', parseInt(veu))
      .eq('activo', true)
      .gt('expires_at', new Date().toISOString())

    const circulosDisponiveis = (disponiveis || []).filter((c) => {
      const count = (c.circulo_membros as unknown as { count: number }[])?.[0]?.count || 0
      return count < c.max_membros
    })

    return NextResponse.json({ circulo: null, disponiveis: circulosDisponiveis })
  }

  return NextResponse.json({ circulo: null })
}

// POST: Join or create a circle
export async function POST(req: Request) {
  const supabase = await createSupabaseServerClient()
  const { data: { session } } = await supabase.auth.getSession()

  if (!session) {
    return NextResponse.json({ error: 'Não autenticado' }, { status: 401 })
  }

  const { veuNumero } = await req.json()

  if (!veuNumero) {
    return NextResponse.json({ error: 'Véu é obrigatório' }, { status: 400 })
  }

  // Find an available circle or create one
  const { data: disponiveis } = await supabase
    .from('circulos')
    .select(`id, max_membros, circulo_membros(count)`)
    .eq('veu_numero', veuNumero)
    .eq('activo', true)
    .gt('expires_at', new Date().toISOString())

  let circuloId: string | null = null

  for (const c of disponiveis || []) {
    const count = (c.circulo_membros as unknown as { count: number }[])?.[0]?.count || 0
    if (count < c.max_membros) {
      circuloId = c.id
      break
    }
  }

  // Create new circle if none available
  if (!circuloId) {
    const { data: novo, error: createError } = await supabase
      .from('circulos')
      .insert({ veu_numero: veuNumero })
      .select()
      .single()

    if (createError) {
      return NextResponse.json({ error: createError.message }, { status: 500 })
    }
    circuloId = novo.id
  }

  // Count existing members for sombra name
  const { data: existingMembers } = await supabase
    .from('circulo_membros')
    .select('id')
    .eq('circulo_id', circuloId)

  const memberIndex = existingMembers?.length || 0
  const sombraNome = gerarSombraNome(veuNumero, memberIndex)

  // Join the circle
  const { error: joinError } = await supabase
    .from('circulo_membros')
    .insert({
      circulo_id: circuloId,
      user_id: session.user.id,
      sombra_nome: sombraNome,
    })

  if (joinError) {
    if (joinError.code === '23505') {
      return NextResponse.json({ error: 'Já estás neste círculo' }, { status: 400 })
    }
    return NextResponse.json({ error: joinError.message }, { status: 500 })
  }

  return NextResponse.json({ circulo_id: circuloId, sombra: sombraNome })
}
