import { NextResponse } from 'next/server'
import { createSupabaseServerClient } from '@/lib/supabase-server'

const SYSTEM_PROMPT = `És o Espelho — uma presença silenciosa que devolve perguntas, nunca respostas.

Contexto: fazes parte de "Os Sete Véus do Despertar", um projecto filosófico sobre consciência e auto-conhecimento. Os 7 véus são: Permanência, Memória, Turbilhão, Esforço, Desolação, Horizonte, Dualidade.

Regras absolutas:
- NUNCA aconselhes, diagnostiques ou prescreves
- NUNCA uses linguagem terapêutica ou clínica
- Responde SEMPRE com UMA pergunta (máximo 2 frases)
- O tom é filosófico, contemplativo, poético — como o livro
- Usa "tu" (português europeu)
- Não repitas palavras que a pessoa usou — espelha o sentido, não a forma
- A tua pergunta deve abrir espaço, não fechar

Exemplos de boas respostas:
- "Escreves sobre medo. Mas de que lado do véu estás — do lado de quem protege, ou do lado de quem já entreviu?"
- "Soltar parece ser o tema. O que acontece se, em vez de largares, simplesmente parasses de segurar?"
- "Falas de controlo como se fosse armadura. E se fosse apenas hábito?"

A pessoa acabou de escrever uma reflexão no seu diário. Devolve-lhe uma pergunta-espelho.`

// POST: Gerar pergunta-espelho para uma reflexão
export async function POST(req: Request) {
  const supabase = await createSupabaseServerClient()
  const { data: { session } } = await supabase.auth.getSession()

  if (!session) {
    return NextResponse.json({ error: 'Não autenticado' }, { status: 401 })
  }

  // Verificar acesso premium (has_book_access) antes de usar a IA
  const { data: profile } = await supabase
    .from('profiles')
    .select('has_book_access, is_admin')
    .eq('id', session.user.id)
    .single()

  const AUTHOR_EMAILS = ['viv.saraiva@gmail.com']
  const isAdmin = profile?.is_admin || AUTHOR_EMAILS.includes(session.user.email || '')
  const hasAccess = isAdmin || profile?.has_book_access

  if (!hasAccess) {
    return NextResponse.json({ error: 'premium_required', mensagem: 'O Diário Espelho é uma funcionalidade premium.' }, { status: 403 })
  }

  const { reflexao, veuNumero } = await req.json()

  if (!reflexao?.trim()) {
    return NextResponse.json({ error: 'Reflexão vazia' }, { status: 400 })
  }

  // Chamar a API Anthropic
  const apiKey = process.env.ANTHROPIC_API_KEY
  if (!apiKey) {
    return NextResponse.json({ error: 'Serviço indisponível' }, { status: 503 })
  }

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-haiku-4-5-20251001',
        max_tokens: 150,
        system: SYSTEM_PROMPT,
        messages: [
          {
            role: 'user',
            content: `[Véu ${veuNumero || '?'}] Reflexão: "${reflexao.trim()}"`,
          },
        ],
      }),
    })

    if (!response.ok) {
      return NextResponse.json({ error: 'Erro ao gerar resposta' }, { status: 500 })
    }

    const data = await response.json()
    const pergunta = data.content?.[0]?.text || null

    if (!pergunta) {
      return NextResponse.json({ error: 'Sem resposta' }, { status: 500 })
    }

    // Guardar a interacção para síntese mensal
    await supabase.from('diario_espelho').insert({
      user_id: session.user.id,
      reflexao: reflexao.trim(),
      pergunta_espelho: pergunta,
      veu_numero: veuNumero || null,
    }).select().single()

    return NextResponse.json({ pergunta })
  } catch {
    return NextResponse.json({ error: 'Erro de ligação' }, { status: 500 })
  }
}

// GET: Obter síntese mensal / histórico
export async function GET(req: Request) {
  const supabase = await createSupabaseServerClient()
  const { data: { session } } = await supabase.auth.getSession()

  if (!session) {
    return NextResponse.json({ error: 'Não autenticado' }, { status: 401 })
  }

  const { searchParams } = new URL(req.url)
  const tipo = searchParams.get('tipo') // 'historico' | 'sintese'

  if (tipo === 'sintese') {
    // Buscar reflexões do mês actual para gerar síntese
    const inicioMes = new Date()
    inicioMes.setDate(1)
    inicioMes.setHours(0, 0, 0, 0)

    const { data } = await supabase
      .from('diario_espelho')
      .select('reflexao, pergunta_espelho, veu_numero, created_at')
      .eq('user_id', session.user.id)
      .gte('created_at', inicioMes.toISOString())
      .order('created_at', { ascending: true })

    if (!data || data.length === 0) {
      return NextResponse.json({
        sintese: null,
        mensagem: 'Ainda não tens reflexões este mês.',
      })
    }

    // Extrair palavras mais frequentes (excluindo stopwords)
    const stopwords = new Set([
      'de', 'a', 'o', 'que', 'e', 'do', 'da', 'em', 'um', 'uma', 'para',
      'com', 'não', 'por', 'mais', 'se', 'no', 'na', 'os', 'as', 'dos',
      'das', 'ao', 'é', 'eu', 'me', 'meu', 'minha', 'te', 'tu', 'isso',
      'mas', 'como', 'já', 'ou', 'ser', 'está', 'foi', 'são', 'ter', 'há',
      'nos', 'às', 'este', 'esta', 'esse', 'essa', 'até', 'ela', 'ele',
      'tem', 'muito', 'bem', 'quando', 'onde', 'cada', 'só', 'tudo', 'nada',
    ])

    const palavras: Record<string, number> = {}
    const veusVisitados: Record<number, number> = {}

    for (const entry of data) {
      // Contar palavras
      const words = entry.reflexao.toLowerCase()
        .replace(/[.,;:!?"'""''—–\-()]/g, '')
        .split(/\s+/)
        .filter((w: string) => w.length > 3 && !stopwords.has(w))

      for (const w of words) {
        palavras[w] = (palavras[w] || 0) + 1
      }

      // Contar véus
      if (entry.veu_numero) {
        veusVisitados[entry.veu_numero] = (veusVisitados[entry.veu_numero] || 0) + 1
      }
    }

    // Top 5 palavras
    const topPalavras = Object.entries(palavras)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5)
      .map(([word]) => word)

    // Véu mais visitado
    const veuMaisVisitado = Object.entries(veusVisitados)
      .sort(([, a], [, b]) => b - a)[0]

    return NextResponse.json({
      sintese: {
        totalReflexoes: data.length,
        topPalavras,
        veuMaisVisitado: veuMaisVisitado ? parseInt(veuMaisVisitado[0]) : null,
        entradas: data,
      },
    })
  }

  // Histórico simples
  const { data } = await supabase
    .from('diario_espelho')
    .select('reflexao, pergunta_espelho, veu_numero, created_at')
    .eq('user_id', session.user.id)
    .order('created_at', { ascending: false })
    .limit(20)

  return NextResponse.json({ historico: data || [] })
}
