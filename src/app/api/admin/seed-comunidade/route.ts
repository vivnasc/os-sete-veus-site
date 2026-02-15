import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://tdytdamtfillqyklgrmb.supabase.co'
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || ''
const ADMIN_SEED_KEY = process.env.ADMIN_SEED_KEY || 'seed-sete-veus-2025'

// =====================================================
// ECOS REALISTAS — reflexões anónimas por véu
// Escritos para soarem humanos, vulneráveis e autênticos
// =====================================================

// PRODUTOS DISPONÍVEIS: Livro Físico + Digital (7 véus) e Espelho da Ilusão (véu 1)
// Distribuição realista: funil de leitura — maioria fica no véu 1, poucos chegam ao fim
// Livro: véu 1 = 3 caps (1-3), véu 2 = 4 caps (4-7), véu 3 = 5 caps (8-12), etc.
// Espelho da Ilusão: 7 capítulos de ficção (véu 1)

const SEED_ECOS: { veu: number; capitulo: number; conteudo: string }[] = [
  // ============================================================
  // VÉU 1: PERMANÊNCIA — produto principal, mais actividade
  // Ecos do livro (caps 1–3, filosófico) + Espelho da Ilusão (ficção com Sara, caps 1–7)
  // ============================================================
  {
    veu: 1, capitulo: 1,
    conteudo: 'ok isto bateu forte. acordei hoje e fiz exactamente a mesma coisa que faço há 3 anos. o mesmo café, o mesmo caminho, a mesma cara no espelho. e pensei: quando foi a ultima vez que fiz algo diferente? tipo... realmente diferente?',
  },
  {
    veu: 1, capitulo: 2,
    conteudo: 'o meu marido perguntou-me ontem "estás bem?" e eu disse que sim. automaticamente. nem pensei. e depois fiquei a noite toda acordada a perguntar-me se estava mesmo',
  },
  {
    veu: 1, capitulo: 3,
    conteudo: 'a parte do Ubuntu fez-me chorar. "eu sou porque nós somos." sempre pensei que me conhecer era uma viagem solitária. mas este capítulo diz que a identidade nasce da relação, que ninguém se conhece fora da teia. nunca estive sozinha nisto.',
  },
  {
    veu: 1, capitulo: 1,
    conteudo: 'a minha mãe sempre disse que estabilidade é o mais importante. e eu acreditei. construí tudo à volta disso. casa, casamento, emprego. e agora olho para isto tudo e penso... ok mas eu? eu onde é que estou nisto?',
  },
  {
    veu: 1, capitulo: 2,
    conteudo: 'aquilo sobre a insatisfação silenciosa bateu forte. "não é abalo súbito, mas murmúrio constante." é exactamente isto. o peso ao fim do dia sem causa clara. tenho tudo e sinto falta de qualquer coisa que não sei nomear.',
  },
  {
    veu: 1, capitulo: 3,
    conteudo: 'tenho 34 anos e só agora percebi que nunca escolhi nada na minha vida. fui fazendo o que parecia certo. aquilo do Sartre bateu — "a existência precede a essência." se não nasci com destino traçado, ainda posso escolher. o medo é real. mas a possibilidade também.',
  },
  {
    veu: 1, capitulo: 5,
    conteudo: 'a Sara do Espelho fez-me sentir tanta raiva. raiva porque ela é eu. faz as mesmas coisas que eu. e nenhuma de nós tem coragem de parar.',
  },
  {
    veu: 1, capitulo: 4,
    conteudo: 'li o capítulo 4 do Espelho no chapa a caminho do trabalho e quase perdi a paragem. estava tão dentro da história da Sara que esqueci onde estava. já não me lembro da ultima vez que um livro fez isso.',
  },
  {
    veu: 1, capitulo: 6,
    conteudo: 'a minha amiga perguntou o que estou a ler e eu não soube explicar. disse "é sobre a Sara, uma mulher que vive a vida de toda a gente menos a dela". e ela ficou tipo... "ok isso somos nós".',
  },
  {
    veu: 1, capitulo: 7,
    conteudo: 'acabei o Espelho da Ilusão e não sei o que fazer comigo. tipo. estou a olhar para a minha sala e tudo parece igual mas eu não sou igual. que sensação estranha.',
  },
  {
    veu: 1, capitulo: 1,
    conteudo: 'só vim aqui dizer que às 6 da manhã a dar de mamar ao bebé li o primeiro capítulo e chorei. não sei se é o cansaço ou se é mesmo isto. mas algo mexeu.',
  },

  // ============================================================
  // VÉU 2: MEMÓRIA — leitoras do livro que avançaram
  // 4 capítulos no livro (caps 4-7)
  // ============================================================
  {
    veu: 2, capitulo: 4,
    conteudo: 'a minha avó morreu quando eu tinha 9 anos e acho que nunca processei isso. apareceu-me hoje durante a leitura do nada. 25 anos depois. fogo.',
  },
  {
    veu: 2, capitulo: 5,
    conteudo: 'a minha mãe nunca me disse que tinha orgulho de mim. e eu passo a vida a tentar ouvir isso de toda a gente. do chefe, das amigas, do meu namorado. é cansativo.',
  },
  {
    veu: 2, capitulo: 6,
    conteudo: 'o meu pai saiu de casa quando eu tinha 7 anos e eu AINDA fico ansiosa quando alguém demora a responder mensagens. tipo, 20 anos depois. que raiva.',
  },
  {
    veu: 2, capitulo: 7,
    conteudo: 'contei ao meu terapeuta sobre este capítulo e ele ficou em silêncio tipo 30 segundos. depois disse "o que seria soltar isso?" e eu não soube responder. ainda não sei.',
  },

  // ============================================================
  // VÉU 3: TURBILHÃO — poucas leitoras chegam aqui
  // 5 capítulos no livro (caps 8-12)
  // ============================================================
  {
    veu: 3, capitulo: 8,
    conteudo: 'a minha cabeça às 3 da manhã: e se perdes o emprego? e se ele te deixa? e se nunca fores suficiente? e se e se e se. estou tão cansada disto.',
  },
  {
    veu: 3, capitulo: 10,
    conteudo: 'fiz a prática de respiração e consegui ficar parada 2 minutos sem pegar no telemóvel. parece patético mas para mim foi ENORME. 2 minutos de silêncio. uau.',
  },

  // ============================================================
  // VÉU 4: ESFORÇO — muito poucas
  // 4 capítulos no livro (caps 13-16)
  // ============================================================
  {
    veu: 4, capitulo: 13,
    conteudo: 'contei quantas vezes disse "desculpa" ontem. 14 vezes. CATORZE. desculpa por existir, basicamente. quando é que isto começou?',
  },
  {
    veu: 4, capitulo: 15,
    conteudo: 'a minha filha de 6 anos disse-me "mamã tu nunca paras". e doeu mais do que qualquer crítica que já recebi.',
  },

  // ============================================================
  // VÉU 5: DESOLAÇÃO — raro, uma leitora dedicada
  // ============================================================
  {
    veu: 5, capitulo: 18,
    conteudo: 'está tudo bem na minha vida. objectivamente. marido bom. filhos saudáveis. emprego estável. e mesmo assim sinto um vazio enorme. que culpa é esta de sentir vazio quando "tens tudo"?',
  },
]

// Marcas no caminho — só para véus onde faz sentido haver alguém que terminou
const SEED_MARCAS: { veu: number; conteudo: string }[] = [
  { veu: 1, conteudo: 'saí do modo automático. não sei para onde vou mas pelo menos estou acordada.' },
  { veu: 1, conteudo: 'a vida que eu tinha não era minha. agora assusta mas é real.' },
  { veu: 1, conteudo: 'terminei o Espelho da Ilusão e sinto que algo se partiu. no bom sentido. tipo, uma casca.' },
  { veu: 2, conteudo: 'chorei tudo o que precisava. o passado ficou mais leve.' },
]

// Temas detectados manualmente (para garantir coerência visual)
function detectarTemasSimples(texto: string): string[] {
  const temas: string[] = []
  const checks: [string, RegExp[]][] = [
    ['automatismo', [/automátic/i, /rotina/i, /sem pensar/i, /piloto automático/i, /repetir/i, /funcionar/i]],
    ['vulnerabilidade', [/medo/i, /chorar/i, /lágrima/i, /dor/i, /frágil/i, /vergonha/i, /vulnerab/i]],
    ['desejo', [/desejo/i, /quero/i, /vontade/i, /busca/i, /mais/i, /procur/i]],
    ['relacoes', [/relação/i, /amor/i, /família/i, /marido/i, /mãe/i, /pai/i, /sozinha/i, /solidão/i]],
    ['despertar', [/despertar/i, /consciência/i, /perceb/i, /verdade/i, /libertar/i, /escolher/i, /clareza/i]],
    ['identidade', [/quem sou/i, /máscara/i, /versão/i, /espelho/i, /reflexo/i, /persona/i]],
    ['controlo', [/control/i, /segurar/i, /largar/i, /perder/i, /segurança/i, /manter/i]],
    ['culpa', [/culpa/i, /perdão/i, /perdoar/i, /errar/i, /merecer/i, /não devia/i]],
    ['presenca', [/presença/i, /presente/i, /agora/i, /momento/i, /silêncio/i, /respirar/i, /paz/i, /calma/i]],
    ['impermanencia', [/mudar/i, /mudança/i, /tempo/i, /passar/i, /transformar/i, /fluir/i]],
  ]

  for (const [tema, patterns] of checks) {
    const matches = patterns.filter((p) => p.test(texto)).length
    if (matches >= 2 || (texto.length < 100 && matches >= 1)) {
      temas.push(tema)
    }
  }

  return temas.length > 0 ? temas : ['presenca']
}

// =====================================================
// API ROUTE — POST /api/admin/seed-comunidade
// =====================================================
export async function POST(req: Request) {
  try {
    const { key } = await req.json()

    if (key !== ADMIN_SEED_KEY) {
      return NextResponse.json({ error: 'Chave inválida' }, { status: 403 })
    }

    if (!supabaseServiceKey) {
      return NextResponse.json(
        { error: 'SUPABASE_SERVICE_ROLE_KEY não configurada' },
        { status: 503 }
      )
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey, {
      auth: { autoRefreshToken: false, persistSession: false },
    })

    // 1. Create ghost users for seed data
    // Menos users = mais realista para produto recém-lançado
    const GHOST_COUNT = 12
    const ghostUserIds: string[] = []

    for (let i = 1; i <= GHOST_COUNT; i++) {
      const email = `eco-seed-${i}@ghost.local`

      // Check if ghost already exists
      const { data: existing } = await supabase.auth.admin.listUsers()
      const found = existing?.users?.find((u) => u.email === email)

      if (found) {
        ghostUserIds.push(found.id)
        continue
      }

      const { data: newUser, error } = await supabase.auth.admin.createUser({
        email,
        email_confirm: true,
        password: `ghost-seed-${i}-seteVeus2025!`,
      })

      if (error) {
        console.error(`Erro ao criar ghost user ${i}:`, error.message)
        continue
      }

      if (newUser.user) {
        ghostUserIds.push(newUser.user.id)
      }
    }

    if (ghostUserIds.length === 0) {
      return NextResponse.json({ error: 'Nenhum ghost user criado' }, { status: 500 })
    }

    // 2. Insert seed ecos (distributed across ghost users)
    const insertedEcoIds: string[] = []
    const ecoErrors: string[] = []
    const now = new Date()

    for (let i = 0; i < SEED_ECOS.length; i++) {
      const eco = SEED_ECOS[i]
      const userId = ghostUserIds[i % ghostUserIds.length]
      const temas = detectarTemasSimples(eco.conteudo)

      // Stagger created_at across last 20 days for natural feel
      const daysAgo = Math.floor(Math.random() * 20) + 1
      const hoursAgo = Math.floor(Math.random() * 24)
      const createdAt = new Date(now.getTime() - (daysAgo * 24 + hoursAgo) * 60 * 60 * 1000)
      const expiresAt = new Date(createdAt.getTime() + 30 * 24 * 60 * 60 * 1000)

      const { data, error } = await supabase
        .from('ecos')
        .insert({
          user_id: userId,
          veu_numero: eco.veu,
          capitulo: eco.capitulo,
          conteudo: eco.conteudo,
          temas,
          created_at: createdAt.toISOString(),
          expires_at: expiresAt.toISOString(),
        })
        .select('id')
        .single()

      if (data) {
        insertedEcoIds.push(data.id)
      }
      if (error) {
        const msg = `Eco ${i} (véu ${eco.veu}, cap ${eco.capitulo}): ${error.message} [code: ${error.code}, details: ${error.details}, hint: ${error.hint}]`
        console.error(msg)
        ecoErrors.push(msg)
      }
    }

    // 3. Add reconhecimentos (each ghost user recognizes 3-8 random ecos)
    let reconhecimentosCount = 0
    const reconhecimentoErrors: string[] = []
    for (const userId of ghostUserIds) {
      const numReconhecimentos = 3 + Math.floor(Math.random() * 6)
      const shuffled = [...insertedEcoIds].sort(() => Math.random() - 0.5)
      const selected = shuffled.slice(0, numReconhecimentos)

      for (const ecoId of selected) {
        // Don't recognize own ecos
        const { error } = await supabase
          .from('reconhecimentos')
          .insert({ eco_id: ecoId, user_id: userId })

        if (!error) {
          reconhecimentosCount++
        } else {
          reconhecimentoErrors.push(`${error.message} [code: ${error.code}]`)
        }
      }
    }

    // 4. Insert marcas no caminho
    let marcasCount = 0
    const marcaErrors: string[] = []
    for (let i = 0; i < SEED_MARCAS.length; i++) {
      const marca = SEED_MARCAS[i]
      const userId = ghostUserIds[i % ghostUserIds.length]

      const daysAgo = Math.floor(Math.random() * 30) + 5
      const createdAt = new Date(now.getTime() - daysAgo * 24 * 60 * 60 * 1000)
      const expiresAt = new Date(createdAt.getTime() + 90 * 24 * 60 * 60 * 1000)

      const { error } = await supabase
        .from('marcas')
        .upsert({
          user_id: userId,
          veu_numero: marca.veu,
          conteudo: marca.conteudo,
          created_at: createdAt.toISOString(),
          expires_at: expiresAt.toISOString(),
        }, { onConflict: 'user_id,veu_numero' })

      if (!error) {
        marcasCount++
      } else {
        marcaErrors.push(`Marca véu ${marca.veu}: ${error.message} [code: ${error.code}]`)
      }
    }

    return NextResponse.json({
      ok: true,
      summary: {
        ghostUsers: ghostUserIds.length,
        ecos: insertedEcoIds.length,
        reconhecimentos: reconhecimentosCount,
        marcas: marcasCount,
      },
      errors: {
        ecos: ecoErrors,
        reconhecimentos: reconhecimentoErrors.slice(0, 5),
        marcas: marcaErrors,
      },
    })
  } catch (err) {
    console.error('Seed error:', err)
    return NextResponse.json({ error: 'Erro interno' }, { status: 500 })
  }
}

// GET: Check seed status
export async function GET() {
  if (!supabaseServiceKey) {
    return NextResponse.json({ error: 'Service key missing' }, { status: 503 })
  }

  const supabase = createClient(supabaseUrl, supabaseServiceKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  })

  const { count: ecosCount } = await supabase
    .from('ecos')
    .select('*', { count: 'exact', head: true })
    .gt('expires_at', new Date().toISOString())

  const { data: ghostUsers } = await supabase.auth.admin.listUsers()
  const ghosts = ghostUsers?.users?.filter((u) => u.email?.endsWith('@ghost.local')).length || 0

  return NextResponse.json({
    ecosActivos: ecosCount || 0,
    ghostUsers: ghosts,
  })
}
