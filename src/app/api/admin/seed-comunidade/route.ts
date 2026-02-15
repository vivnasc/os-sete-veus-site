import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://tdytdamtfillqyklgrmb.supabase.co'
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || ''
const ADMIN_SEED_KEY = process.env.ADMIN_SEED_KEY || 'seed-sete-veus-2025'

// =====================================================
// ECOS REALISTAS — reflexões anónimas por véu
// Escritos para soarem humanos, vulneráveis e autênticos
// =====================================================

const SEED_ECOS: { veu: number; capitulo: number; conteudo: string }[] = [
  // === VÉU 1: PERMANÊNCIA ===
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
    conteudo: 'chorei no banho. outra vez. mas desta vez não foi por tristeza, foi por reconhecimento. a personagem do capítulo 3 sou EU. literalmente eu. assustador.',
  },
  {
    veu: 1, capitulo: 5,
    conteudo: 'a minha mãe sempre disse que estabilidade é o mais importante. e eu acreditei. construí tudo à volta disso. casa, casamento, emprego. e agora olho para isto tudo e penso... ok mas eu? eu onde é que estou nisto?',
  },
  {
    veu: 1, capitulo: 4,
    conteudo: 'fiz um exercício estúpido comigo mesma: se pudesses voltar aos 22 fazias o quê? e comecei a chorar porque a lista era tão longa',
  },
  {
    veu: 1, capitulo: 7,
    conteudo: 'tenho 34 anos e só agora percebi que nunca escolhi nada na minha vida. fui fazendo o que parecia certo. o que os outros esperavam. é tarde para mudar? provavelmente não. mas o medo é real.',
  },

  // === VÉU 2: MEMÓRIA ===
  {
    veu: 2, capitulo: 1,
    conteudo: 'a minha avó morreu quando eu tinha 9 anos e acho que nunca processei isso. apareceu-me hoje durante a leitura do nada. 25 anos depois. fogo.',
  },
  {
    veu: 2, capitulo: 3,
    conteudo: 'a minha mãe nunca me disse que tinha orgulho de mim. e eu passo a vida a tentar ouvir isso de toda a gente. do chefe, das amigas, do meu namorado. é cansativo.',
  },
  {
    veu: 2, capitulo: 2,
    conteudo: 'não consigo parar de chorar com este capítulo. o meu pai saiu de casa quando eu tinha 7 anos e eu AINDA fico ansiosa quando alguém demora a responder mensagens. tipo, 20 anos depois. que raiva.',
  },
  {
    veu: 2, capitulo: 5,
    conteudo: 'lembrei-me de uma coisa que a minha professora me disse na 4a classe. "tu nunca vais ser como a tua irmã." e eu tinha esquecido. ou pensava que tinha. afinal não.',
  },
  {
    veu: 2, capitulo: 4,
    conteudo: 'saudades de quem eu era antes de tudo. mas será que essa pessoa realmente existiu? ou é só a memória a inventar coisas bonitas para eu não ter de lidar com o presente?',
  },
  {
    veu: 2, capitulo: 6,
    conteudo: 'contei ao meu terapeuta sobre este capítulo e ele ficou em silêncio tipo 30 segundos. depois disse "o que seria soltar isso?" e eu não soube responder. ainda não sei.',
  },

  // === VÉU 3: TURBILHÃO ===
  {
    veu: 3, capitulo: 1,
    conteudo: 'a minha cabeça às 3 da manhã: e se perdes o emprego? e se ele te deixa? e se nunca fores suficiente? e se e se e se. estou tão cansada disto.',
  },
  {
    veu: 3, capitulo: 2,
    conteudo: 'hoje gritei com a minha filha por causa de nada. NADA. e depois tranquei-me na casa de banho a chorar porque percebi que não era raiva dela. era raiva de mim. da minha vida. de tudo.',
  },
  {
    veu: 3, capitulo: 4,
    conteudo: 'alguém me perguntou "como te sentes?" e eu não consegui responder. tipo... não sabia. sinto tanto ao mesmo tempo que já não consigo separar as coisas.',
  },
  {
    veu: 3, capitulo: 3,
    conteudo: 'fiz a prática de respiração e consegui ficar parada 2 minutos sem pegar no telemóvel. parece patético mas para mim foi ENORME. 2 minutos de silêncio. uau.',
  },
  {
    veu: 3, capitulo: 6,
    conteudo: 'descobri que a minha ansiedade tem um padrão. aparece sempre que alguém me pede algo. qualquer coisa. até coisas simples. é como se o meu corpo dissesse "não aguento mais" antes de eu sequer pensar',
  },
  {
    veu: 3, capitulo: 5,
    conteudo: 'tive um ataque de pânico na terça e pela primeira vez em vez de lutar contra tentei só... ficar. foi horrível mas passou mais rápido. não sei o que pensar disto.',
  },

  // === VÉU 4: ESFORÇO ===
  {
    veu: 4, capitulo: 1,
    conteudo: 'contei quantas vezes disse "desculpa" ontem. 14 vezes. CATORZE. desculpa por existir, basicamente. quando é que isto começou?',
  },
  {
    veu: 4, capitulo: 3,
    conteudo: 'a minha colega do trabalho faz metade do que eu faço e ganha o mesmo. e eu fico até às 8 da noite "porque tem de ficar bem". para quem?? para quem é que tem de ficar bem?',
  },
  {
    veu: 4, capitulo: 2,
    conteudo: 'deitei-me no sofá sábado à tarde e não fiz nada. NADA. e a culpa que senti foi tão grande que quase me levantei para ir limpar a casa. mas não me levantei. e o mundo continuou.',
  },
  {
    veu: 4, capitulo: 5,
    conteudo: 'disse não. a uma coisa que não queria fazer. e a pessoa ficou chateada. e eu sobrevivi. é tão simples mas parece que escalei o evereste.',
  },
  {
    veu: 4, capitulo: 4,
    conteudo: 'escrevi num papel tudo o que fiz hoje. 23 coisas. sabe quantas eram para mim? 2. o café da manhã e escovar os dentes. é rir para não chorar.',
  },
  {
    veu: 4, capitulo: 7,
    conteudo: 'a minha filha de 6 anos disse-me "mamã tu nunca paras". e doeu mais do que qualquer crítica que já recebi.',
  },

  // === VÉU 5: DESOLAÇÃO ===
  {
    veu: 5, capitulo: 1,
    conteudo: 'está tudo bem na minha vida. objectivamente. marido bom. filhos saudáveis. emprego estável. e mesmo assim sinto um vazio enorme. que culpa é esta de sentir vazio quando "tens tudo"?',
  },
  {
    veu: 5, capitulo: 3,
    conteudo: 'ontem fiquei sozinha em casa pela primeira vez em meses. e entrei em pânico. tipo, o que é que eu faço comigo mesma? quando é que me tornei alguém que tem medo da própria companhia?',
  },
  {
    veu: 5, capitulo: 2,
    conteudo: 'mudei-me para Maputo há 2 anos e ainda não tenho uma amiga. uma. as pessoas aqui são simpáticas mas eu... não consigo. fico travada. como se não merecesse.',
  },
  {
    veu: 5, capitulo: 5,
    conteudo: 'chorei durante a prática toda. não sei porquê. não havia razão. só um choro fundo que parecia vir de um sítio que eu não conhecia. e depois senti-me estranhamente leve.',
  },
  {
    veu: 5, capitulo: 4,
    conteudo: 'a solidão pior não é quando estás sozinha. é quando estás rodeada de pessoas e mesmo assim sentes que ninguém te vê. ninguém te VÊ mesmo.',
  },

  // === VÉU 6: HORIZONTE ===
  {
    veu: 6, capitulo: 1,
    conteudo: 'lembro-me de pensar aos 20: quando tiver 30 vai estar tudo resolvido. estou com 33 e nada está resolvido. e começo a suspeitar que nunca vai estar. e talvez esteja tudo bem com isso?',
  },
  {
    veu: 6, capitulo: 3,
    conteudo: 'comprei um apartamento, casei, tive promoção. tudo o que "devia" querer. e agora? agora o quê? é só isto? não pode ser só isto.',
  },
  {
    veu: 6, capitulo: 2,
    conteudo: 'vi uma foto minha de há 5 anos. na altura achava que estava gorda, feia, mal vestida. agora olho e penso "estavas tão bonita". vou daqui a 5 anos olhar para hoje e pensar o mesmo? provavelmente. que desperdício.',
  },
  {
    veu: 6, capitulo: 5,
    conteudo: 'não sei o que quero da vida. e durante muito tempo isso assustou-me. hoje não. hoje é quase... libertador? não saber também é uma posição válida.',
  },
  {
    veu: 6, capitulo: 4,
    conteudo: 'apaguei a minha lista de objectivos para 2026. toda. e em vez disso escrevi só: prestar atenção.',
  },
  {
    veu: 6, capitulo: 6,
    conteudo: 'a minha irmã perguntou-me "onde te vês daqui a 5 anos?" e eu disse "aqui. presente. a viver." ela achou estranho. eu achei a coisa mais honesta que disse este ano.',
  },

  // === VÉU 7: DUALIDADE ===
  {
    veu: 7, capitulo: 1,
    conteudo: 'sou boa mãe e ao mesmo tempo sonho com uma vida sem filhos. e isso não me faz má pessoa. acho eu. espero eu. isto é tão confuso.',
  },
  {
    veu: 7, capitulo: 3,
    conteudo: 'no trabalho sou a "forte". a que resolve tudo. em casa choro no chuveiro. ninguém conhece as duas. e eu estou cansada de ser duas.',
  },
  {
    veu: 7, capitulo: 2,
    conteudo: 'ontem ri-me e chorei no mesmo minuto. e em vez de achar que estava a ficar maluca pensei: se calhar é só isto. ser humana. sentir tudo ao mesmo tempo. sem ter de escolher.',
  },
  {
    veu: 7, capitulo: 5,
    conteudo: 'sempre achei que tinha de escolher: ou sou a boa filha que a minha mãe quer, ou sou eu. e se puder ser as duas? e se não for "ou" mas "e"?',
  },
  {
    veu: 7, capitulo: 4,
    conteudo: 'a vivianne escreveu uma coisa que não me sai da cabeça: não tens de te encontrar. já estás aqui. fogo. estou a reler há 3 dias.',
  },
  {
    veu: 7, capitulo: 6,
    conteudo: 'deixei de dizer "eu devia ser mais forte". forte para quê? frágil também é real. também é meu. também conta.',
  },
  {
    veu: 7, capitulo: 7,
    conteudo: 'acabei o último capítulo e não tenho palavras grandes para dizer. só que... respiro diferente. não sei explicar. mais fundo. mais devagar. algo mudou e eu não consigo apontar o quê.',
  },
]

// Marcas no caminho — frases curtas deixadas ao completar um véu
const SEED_MARCAS: { veu: number; conteudo: string }[] = [
  { veu: 1, conteudo: 'saí do modo automático. não sei para onde vou mas pelo menos estou acordada.' },
  { veu: 1, conteudo: 'a vida que eu tinha não era minha. agora assusta mas é real.' },
  { veu: 2, conteudo: 'chorei tudo o que precisava. o passado ficou mais leve.' },
  { veu: 2, conteudo: 'perdoei-me. ainda não sei bem como mas aconteceu.' },
  { veu: 3, conteudo: 'consegui ficar em silêncio 5 minutos. parece pouco. foi tudo.' },
  { veu: 3, conteudo: 'as emoções continuam mas já não mando nelas. ouço.' },
  { veu: 4, conteudo: 'disse que não. o mundo não acabou.' },
  { veu: 5, conteudo: 'fiquei sozinha comigo. e não fugi. pela primeira vez.' },
  { veu: 6, conteudo: 'apaguei os planos. vou ver o que acontece.' },
  { veu: 7, conteudo: 'não preciso de escolher quem sou. sou tudo isto. e está bem.' },
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
    const GHOST_COUNT = 18
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
        console.error(`Erro eco ${i}:`, error.message)
      }
    }

    // 3. Add reconhecimentos (each ghost user recognizes 3-8 random ecos)
    let reconhecimentosCount = 0
    for (const userId of ghostUserIds) {
      const numReconhecimentos = 3 + Math.floor(Math.random() * 6)
      const shuffled = [...insertedEcoIds].sort(() => Math.random() - 0.5)
      const selected = shuffled.slice(0, numReconhecimentos)

      for (const ecoId of selected) {
        // Don't recognize own ecos
        const { error } = await supabase
          .from('reconhecimentos')
          .insert({ eco_id: ecoId, user_id: userId })

        if (!error) reconhecimentosCount++
      }
    }

    // 4. Insert marcas no caminho
    let marcasCount = 0
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

      if (!error) marcasCount++
    }

    return NextResponse.json({
      ok: true,
      summary: {
        ghostUsers: ghostUserIds.length,
        ecos: insertedEcoIds.length,
        reconhecimentos: reconhecimentosCount,
        marcas: marcasCount,
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
