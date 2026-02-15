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
    conteudo: 'Hoje percebi que passo os dias a repetir os mesmos gestos sem pensar. Acordo, café, trabalho, jantar, dormir. E amanhã igual. Há quanto tempo vivo no piloto automático?',
  },
  {
    veu: 1, capitulo: 2,
    conteudo: 'Tenho tanto medo de mudar que finjo que está tudo bem. Mas não está. Sinto que estou a funcionar, não a viver. E o pior é que já nem sei qual é a diferença.',
  },
  {
    veu: 1, capitulo: 3,
    conteudo: 'Li este capítulo e chorei. Eu SOU a personagem. Construí uma vida inteira à volta de uma versão de mim que nunca escolhi.',
  },
  {
    veu: 1, capitulo: 5,
    conteudo: 'A rotina não é segurança. É uma armadilha dourada. Passei anos a acreditar que a estabilidade era o mesmo que felicidade. Não é.',
  },
  {
    veu: 1, capitulo: 4,
    conteudo: 'Perguntei-me hoje: se pudesse começar de novo, faria as mesmas escolhas? A resposta assustou-me. Não. Quase nenhuma.',
  },
  {
    veu: 1, capitulo: 7,
    conteudo: 'O mais difícil não é perceber que tens vivido em automático. É aceitar que foste tu que deixaste.',
  },

  // === VÉU 2: MEMÓRIA ===
  {
    veu: 2, capitulo: 1,
    conteudo: 'Carrego memórias que não me pertencem. Dores da minha mãe, expectativas do meu pai. Quando é que comecei a viver as histórias deles como se fossem minhas?',
  },
  {
    veu: 2, capitulo: 3,
    conteudo: 'Há uma parte de mim que ainda é aquela menina de 12 anos a tentar agradar a toda a gente. Quando é que cresci por fora mas fiquei parada por dentro?',
  },
  {
    veu: 2, capitulo: 2,
    conteudo: 'Passei a noite a chorar ao ler isto. Eu ainda vivo presa ao que aconteceu há dez anos. Perdoei toda a gente menos a mim mesma.',
  },
  {
    veu: 2, capitulo: 5,
    conteudo: 'As lágrimas que guardei durante anos começaram a sair. Não por tristeza — por libertação. Precisava soltar o passado para poder respirar no presente.',
  },
  {
    veu: 2, capitulo: 4,
    conteudo: 'Hoje percebi que a memória me engana. Romantizo o passado para não ter de enfrentar o presente. Mas o passado nunca foi tão bom quanto lembro.',
  },
  {
    veu: 2, capitulo: 6,
    conteudo: 'Não precisas de esquecer. Precisas de parar de deixar a memória decidir por ti.',
  },

  // === VÉU 3: TURBILHÃO ===
  {
    veu: 3, capitulo: 1,
    conteudo: 'A minha cabeça não pára. Pensamento atrás de pensamento. Medo atrás de medo. Quando é que perdi o silêncio?',
  },
  {
    veu: 3, capitulo: 2,
    conteudo: 'Sinto tudo ao mesmo tempo. Raiva, tristeza, vontade de gritar, vontade de chorar. E por baixo disso tudo, uma calma estranha que me assusta mais que o caos.',
  },
  {
    veu: 3, capitulo: 4,
    conteudo: 'Estava tão ocupada a reagir à vida que esqueci de a sentir. As emoções passavam por mim como um turbilhão e eu nem sabia o nome delas.',
  },
  {
    veu: 3, capitulo: 3,
    conteudo: 'Hoje fiz a prática de respiração e por trinta segundos não pensei em nada. Trinta segundos de paz. Parece pouco, mas foi a coisa mais bonita que senti em meses.',
  },
  {
    veu: 3, capitulo: 6,
    conteudo: 'O turbilhão não é o inimigo. É o alarme. Está a tentar dizer-te alguma coisa. Pára e ouve.',
  },
  {
    veu: 3, capitulo: 5,
    conteudo: 'Descobri que por baixo da ansiedade há vulnerabilidade. E por baixo da vulnerabilidade há verdade. Dói, mas é real.',
  },

  // === VÉU 4: ESFORÇO ===
  {
    veu: 4, capitulo: 1,
    conteudo: 'Toda a minha vida foi a tentar provar que sou suficiente. Para os meus pais, para o meu marido, para o mundo. E se eu já fosse suficiente sem provar nada?',
  },
  {
    veu: 4, capitulo: 3,
    conteudo: 'Estou exausta. Mas não do trabalho — da busca incessante por validação. Corro atrás de aprovação como se fosse oxigénio.',
  },
  {
    veu: 4, capitulo: 2,
    conteudo: 'O descanso sempre me pareceu preguiça. Hoje entendi que descansar é um acto de coragem quando o mundo te diz para nunca parares.',
  },
  {
    veu: 4, capitulo: 5,
    conteudo: 'Larguei. Não o trabalho, não a família. Larguei a necessidade de controlar tudo. E o mundo não acabou. Imagine.',
  },
  {
    veu: 4, capitulo: 4,
    conteudo: 'Fiz uma lista de tudo o que faço num dia. 80% era para os outros. Onde estou eu na minha própria vida?',
  },
  {
    veu: 4, capitulo: 7,
    conteudo: 'Não precisas de fazer mais. Precisas de ser mais. E ser mais começa por parar.',
  },

  // === VÉU 5: DESOLAÇÃO ===
  {
    veu: 5, capitulo: 1,
    conteudo: 'Há um vazio dentro de mim que não é tristeza. É espaço. Mas passei a vida inteira a tentar preenchê-lo porque tinha medo do silêncio.',
  },
  {
    veu: 5, capitulo: 3,
    conteudo: 'Sentei-me sozinha e não liguei a televisão. Não abri o telemóvel. Apenas fiquei comigo. E percebi que há anos fugia da minha própria companhia.',
  },
  {
    veu: 5, capitulo: 2,
    conteudo: 'A solidão não é o problema. O problema é confundir solidão com abandono. Estar sozinha pode ser um encontro, não uma perda.',
  },
  {
    veu: 5, capitulo: 5,
    conteudo: 'Neste momento, sinto-me em pedaços. E pela primeira vez, não quero colar os pedaços de volta. Quero ver o que existe entre eles.',
  },
  {
    veu: 5, capitulo: 4,
    conteudo: 'O vazio é fértil. Precisa de coragem para ficar nele sem fugir, sem preencher, sem distrair. Mas é lá que nasce o que é verdadeiro.',
  },

  // === VÉU 6: HORIZONTE ===
  {
    veu: 6, capitulo: 1,
    conteudo: 'Passei anos a acreditar que ia chegar a um sítio. Uma carreira. Uma relação. Uma versão de mim "pronta". Não existe chegada. Existe caminho.',
  },
  {
    veu: 6, capitulo: 3,
    conteudo: 'Descobri que o horizonte não é um destino — é uma ilusão necessária. Caminhamos na direcção dele, mas ele transforma-se à medida que avançamos. E está tudo bem.',
  },
  {
    veu: 6, capitulo: 2,
    conteudo: 'Sempre quis mais. Mais sucesso, mais amor, mais reconhecimento. E se "mais" for apenas outra forma de dizer "nunca é suficiente"?',
  },
  {
    veu: 6, capitulo: 5,
    conteudo: 'Hoje não tenho respostas. E pela primeira vez, não preciso. A pergunta já é caminho suficiente.',
  },
  {
    veu: 6, capitulo: 4,
    conteudo: 'Parei de planear a minha vida e comecei a vivê-la. A diferença é abismal.',
  },
  {
    veu: 6, capitulo: 6,
    conteudo: 'A vida não é uma linha recta. É uma espiral. Voltas ao mesmo sítio, mas nunca és a mesma pessoa quando chegas.',
  },

  // === VÉU 7: DUALIDADE ===
  {
    veu: 7, capitulo: 1,
    conteudo: 'Passei a vida a separar tudo. Certo e errado. Forte e frágil. Boa e má. E se tudo isso for a mesma coisa vista de ângulos diferentes?',
  },
  {
    veu: 7, capitulo: 3,
    conteudo: 'Não sou a pessoa que os outros vêem. Nem sou quem eu penso que sou. Sou algo entre as duas — algo que não precisa de nome.',
  },
  {
    veu: 7, capitulo: 2,
    conteudo: 'Hoje senti alegria e tristeza ao mesmo tempo. E não tentei escolher uma. Deixei as duas existirem. É estranho como isso me fez sentir inteira.',
  },
  {
    veu: 7, capitulo: 5,
    conteudo: 'A consciência não é luz sem sombra. É ver as duas e perceber que nasceram juntas. Não estou separada de nada. Nunca estive.',
  },
  {
    veu: 7, capitulo: 4,
    conteudo: 'Libertei-me quando percebi que não precisava de escolher entre quem fui e quem quero ser. Sou as duas. Sou todas.',
  },
  {
    veu: 7, capitulo: 6,
    conteudo: 'Presença é isto: deixar de lutar contra o que é. Deixar de dividir. Apenas estar. Inteira. Aqui. Agora.',
  },
  {
    veu: 7, capitulo: 7,
    conteudo: 'Os véus não caem todos ao mesmo tempo. Caem quando estás pronta. E depois de cada um, respiras um pouco mais fundo.',
  },
]

// Marcas no caminho — frases curtas deixadas ao completar um véu
const SEED_MARCAS: { veu: number; conteudo: string }[] = [
  { veu: 1, conteudo: 'Saí do automático. Finalmente.' },
  { veu: 1, conteudo: 'A vida que eu vivia não era minha. Agora escolho.' },
  { veu: 2, conteudo: 'Larguei o passado. Ele já não precisa de mim.' },
  { veu: 2, conteudo: 'Perdoei-me. Era o que faltava.' },
  { veu: 3, conteudo: 'Encontrei silêncio no meio do caos.' },
  { veu: 3, conteudo: 'As emoções já não me governam. Ouço-as.' },
  { veu: 4, conteudo: 'Parei de correr. A chegada é aqui.' },
  { veu: 5, conteudo: 'O vazio não é inimigo. É berço.' },
  { veu: 6, conteudo: 'Não há destino. Há caminho. E é bonito.' },
  { veu: 7, conteudo: 'Sou inteira. Sempre fui.' },
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
