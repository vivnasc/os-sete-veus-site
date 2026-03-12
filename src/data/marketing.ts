// Marketing content library — extracted from real book material + templates for future veils
// Used by the admin dashboard for content planning and social media scheduling

export type MarketingQuote = {
  text: string;
  source: string; // which veil/chapter
  formats: ("instagram" | "story" | "reel" | "email" | "article")[];
};

export type EmailSequence = {
  day: number;
  subject: string;
  preview: string;
  type: "welcome" | "nurture" | "launch" | "post-purchase";
};

export type SocialPost = {
  content: string;
  hashtags: string[];
  format: "carousel" | "single" | "reel" | "story";
  veilSlug: string;
  scheduledWeek: number; // weeks from launch
};

export type VeilMarketing = {
  slug: string;
  quotes: MarketingQuote[];
  emailSequence: EmailSequence[];
  socialPosts: SocialPost[];
  launchPlan: string[];
};

const CORE_HASHTAGS = [
  "#OsSetVéus",
  "#VivianneDosSantos",
  "#FicçãoPsicológica",
  "#Autoconhecimento",
  "#MulheresQueDespertam",
  "#LiteraturaFeminina",
  "#TransformaçãoPessoal",
];

// ─── O ESPELHO DA ILUSÃO — real quotes from the book ────────────────────────────

const ilusaoQuotes: MarketingQuote[] = [
  {
    text: "Quando foi que escolhi tomar café em vez de chá?",
    source: "O Espelho da Ilusão, Parte I",
    formats: ["instagram", "story", "reel"],
  },
  {
    text: "Via, mas não sentia. Registava, mas não participava. Como quem assiste a um espectáculo por trás de uma janela fechada.",
    source: "O Espelho da Ilusão, Parte I",
    formats: ["instagram", "story"],
  },
  {
    text: "Responder implica haver alguém dentro das palavras, implica posição, implica presença. Tu apenas cumpriste protocolo.",
    source: "O Espelho da Ilusão, Parte II",
    formats: ["instagram", "reel"],
  },
  {
    text: "Quando foi a última vez que escolhi uma rua diferente?",
    source: "O Espelho da Ilusão, Parte I",
    formats: ["instagram", "story", "reel"],
  },
  {
    text: "Quantas pessoas vivem no automático. Quantas respondiam a perguntas importantes com variações sofisticadas de 'tanto faz'.",
    source: "O Espelho da Ilusão, Parte II",
    formats: ["instagram", "reel"],
  },
  {
    text: "Há vidas que funcionam. Cumprem os prazos, pagam as contas, recebem os parabéns nas alturas certas. E no entanto, quando a casa fica em silêncio, há algo que não é queixa nem ingratidão. É uma pergunta que nunca foi feita.",
    source: "O Espelho da Ilusão, Epílogo",
    formats: ["instagram", "story", "reel", "email"],
  },
  {
    text: "Perguntar, mesmo tarde, é o primeiro gesto de se escolher.",
    source: "O Espelho da Ilusão, Prefácio",
    formats: ["instagram", "story", "email"],
  },
  {
    text: "Uma mulher descobre, no meio de uma manhã igual a todas as outras, que construiu uma vida inteira sem nunca ter perguntado o que queria.",
    source: "O Espelho da Ilusão, Prefácio",
    formats: ["instagram", "email", "article"],
  },
  {
    text: "Não era que não tivesse opinião. Era que a sua primeira reacção nunca era o que verdadeiramente pensava.",
    source: "O Espelho da Ilusão, Parte II",
    formats: ["instagram", "reel"],
  },
  {
    text: "O que fizer sentido para a equipa.",
    source: "O Espelho da Ilusão, Parte II",
    formats: ["story", "reel"],
  },
];

const ilusaoSocial: SocialPost[] = [
  {
    content:
      "Há vidas que funcionam.\nCumprem os prazos. Pagam as contas. Recebem os parabéns nas alturas certas.\n\nE no entanto, quando a casa fica em silêncio, surge algo que não é queixa nem ingratidão.\n\nÉ uma intuição suave: há mais.",
    hashtags: [...CORE_HASHTAGS, "#EspelhoDaIlusão"],
    format: "carousel",
    veilSlug: "veu-da-ilusao",
    scheduledWeek: 1,
  },
  {
    content:
      "\"Quando foi que escolhi tomar café em vez de chá?\"\n\nUma pergunta absurda que muda tudo.\n\nO Espelho da Ilusão começa assim — com uma manhã igual a todas as outras e uma mulher que, pela primeira vez, pergunta.",
    hashtags: [...CORE_HASHTAGS, "#EspelhoDaIlusão"],
    format: "single",
    veilSlug: "veu-da-ilusao",
    scheduledWeek: 2,
  },
  {
    content:
      "O que dizes quando alguém te pergunta o que achas?\n\n\"O que fizer sentido para a equipa.\"\n\"Tanto faz.\"\n\"Está bem para mim.\"\n\nE se, por uma vez, respondesses o que realmente pensas?",
    hashtags: [...CORE_HASHTAGS, "#EspelhoDaIlusão", "#OpiniãoPrópria"],
    format: "reel",
    veilSlug: "veu-da-ilusao",
    scheduledWeek: 3,
  },
  {
    content:
      "A primeira pergunta do diário é: quando foi a última vez que escolheste algo só porque quiseste?\n\nNão o que era prático. Não o que os outros esperavam. O que tu queriasde verdade.\n\nAlgumas leitoras ficam dias sem conseguir responder. Não por falta de palavras — porque nunca ninguém lhes tinha perguntado isto.\n\nEssa pausa é o começo. — Vivianne",
    hashtags: [...CORE_HASHTAGS, "#EspelhoDaIlusão"],
    format: "carousel",
    veilSlug: "veu-da-ilusao",
    scheduledWeek: 4,
  },
];

const ilusaoEmail: EmailSequence[] = [
  {
    day: 0,
    subject: "O teu espelho é a Ilusão — o que isso significa",
    preview: "Não é um rótulo. É um convite para olhares.",
    type: "welcome",
  },
  {
    day: 2,
    subject: "Quando foi que escolheste café em vez de chá?",
    preview: "Uma pergunta pequena que muda tudo.",
    type: "nurture",
  },
  {
    day: 5,
    subject: "Quantas vezes disseste 'tanto faz' esta semana?",
    preview: "Não é conformismo. É um padrão aprendido.",
    type: "nurture",
  },
  {
    day: 7,
    subject: "A Sara começou a perguntar. E tu?",
    preview: "O Espelho da Ilusão está disponível.",
    type: "launch",
  },
];

// ─── O ESPELHO DO MEDO — templates (book written, quotes to extract) ────────────

const medoQuotes: MarketingQuote[] = [
  {
    text: "Sabes o que queres. O medo sabe-o também — e decide antes de ti.",
    source: "O Espelho do Medo",
    formats: ["instagram", "story", "reel"],
  },
  {
    text: "Não é covardia. É um mecanismo antigo, treinado ao longo de anos de cautela disfarçada de bom senso.",
    source: "O Espelho do Medo",
    formats: ["instagram", "story", "reel", "email"],
  },
  {
    text: "Cada vez que estás prestes a dar um passo, algo te puxa para trás. Esse algo tem um nome. Tem uma história. E essa história começa muito antes de ti.",
    source: "O Espelho do Medo, Descrição",
    formats: ["instagram", "reel"],
  },
  {
    text: "O medo não te impede de saber o que queres. Impede-te de acreditar que tens permissão para o querer.",
    source: "O Espelho do Medo",
    formats: ["story", "reel", "email"],
  },
];

const medoSocial: SocialPost[] = [
  {
    content:
      "O medo não é o oposto da coragem. É o oposto da permissão.\n\nNão é que não saibas o que queres. É que algures ao longo do caminho aprendeste que querer é perigoso. Que avançar é arriscar. Que ficar no sítio é mais seguro do que a dor de chegar e não ser suficiente.\n\nEssa aprendizagem foi útil um dia. Já não é.\n\nPergunta para hoje: o que é que deixarias de evitar se soubesses que ias ser suficiente de qualquer maneira? — Vivianne",
    hashtags: [...CORE_HASHTAGS, "#EspelhoDoMedo"],
    format: "carousel",
    veilSlug: "veu-do-medo",
    scheduledWeek: 1,
  },
  {
    content:
      "Há uma diferença entre não querer e não se permitir querer.\n\nA segunda parece-se muito com a primeira — mas quando a espreitas de perto, não há indiferença. Há medo. Medo de querer e não conseguir. Medo de conseguir e não merecer. Medo de mudar e deixar de pertencer.\n\nO Espelho do Medo chega em Março. Para quem já sabe o que quer — mas ainda não se deu permissão. — Vivianne",
    hashtags: [...CORE_HASHTAGS, "#EspelhoDoMedo"],
    format: "single",
    veilSlug: "veu-do-medo",
    scheduledWeek: 2,
  },
];

const medoEmail: EmailSequence[] = [
  {
    day: -21,
    subject: "O que está por trás da procrastinação (não é o que pensas)",
    preview: "Não é preguiça. É protecção. E tem raízes muito mais antigas.",
    type: "nurture",
  },
  {
    day: -14,
    subject: "Quando a cautela se disfarça de bom senso",
    preview: "Há uma diferença entre não querer e não se permitir querer.",
    type: "nurture",
  },
  {
    day: -7,
    subject: "O Espelho do Medo chega em Março — para quem já está na lista",
    preview: "Sabes o que queres. O que ainda não tens é permissão.",
    type: "launch",
  },
  {
    day: 0,
    subject: "O Espelho do Medo está disponível",
    preview: "Não é covardia. É um mecanismo antigo. E tem nome.",
    type: "launch",
  },
];

// ─── VÉUS FUTUROS — templates de marketing (conteúdo ainda a produzir) ──────

function generateFutureVeilMarketing(
  slug: string,
  title: string,
  subtitle: string,
  tagline: string,
  launchMonth: string,
  // Parágrafo de contexto do véu — o que a leitora já sente, nomeado com precisão
  painObservation: string,
): VeilMarketing {
  return {
    slug,
    quotes: [
      {
        text: tagline,
        source: title,
        formats: ["instagram", "story", "reel", "email"],
      },
      {
        text: subtitle,
        source: title,
        formats: ["instagram", "story"],
      },
    ],
    emailSequence: [
      // Princípio 6: educa antes de vender
      {
        day: -21,
        subject: `Uma observação sobre ${subtitle.toLowerCase().replace("quando ", "")}`,
        preview: painObservation.split(".")[0],
        type: "nurture",
      },
      {
        day: -14,
        subject: `O véu que não sabias que usavas`,
        preview: subtitle,
        type: "nurture",
      },
      {
        day: -7,
        subject: `${title} chega em ${launchMonth} — já estás na lista`,
        preview: tagline,
        type: "launch",
      },
      {
        day: 0,
        subject: `${title} está disponível`,
        preview: painObservation.split(".")[0] + ". Há uma história sobre isso.",
        type: "launch",
      },
      {
        day: 3,
        subject: `Já abriste ${title}?`,
        preview: "Sem pressa. O teu ritmo é o ritmo certo.",
        type: "post-purchase",
      },
    ],
    socialPosts: [
      // Princípio 1 + 3: observação inteligente com estrutura {hook, corpo, cta}
      {
        content: `${painObservation}\n\n${title} chega em ${launchMonth}. — Vivianne`,
        hashtags: [...CORE_HASHTAGS],
        format: "single",
        veilSlug: slug,
        scheduledWeek: -2,
      },
      {
        content: `${tagline}\n\nÉ ficção. Mas é ficção onde te reconheces — não porque a personagem é perfeita, mas porque hesita, erra e se perde como tu.\n\n${title} — ${launchMonth}. — Vivianne`,
        hashtags: [...CORE_HASHTAGS],
        format: "carousel",
        veilSlug: slug,
        scheduledWeek: -1,
      },
      {
        content: `${title} está disponível.\n\n${painObservation}\n\nSe o quiz te indicou este véu, já sabes o que isto nomeia. — Vivianne`,
        hashtags: [...CORE_HASHTAGS],
        format: "single",
        veilSlug: slug,
        scheduledWeek: 0,
      },
    ],
    launchPlan: [
      `Semana -4: Teaser — observação sobre o véu sem revelar o título`,
      `Semana -3: Abrir waitlist — "Algo novo está a chegar"`,
      `Semana -2: Revelar título e imagem — post + story`,
      `Semana -1: Email à lista com contexto educativo + aviso de lançamento`,
      `Dia 0: Lançamento — post, story, email, actualizar /experiencias`,
      `Semana +1: Post de bastidores — "o que me fez escrever este espelho"`,
      `Semana +2: Espelhos de leitoras — fragmentos anónimos de reconhecimento`,
      `Semana +3: "Se fizeste o quiz e o teu espelho era este…" — retargeting`,
    ],
  };
}

// ─── ALL MARKETING DATA ─────────────────────────────────────────────────────

export const allMarketing: VeilMarketing[] = [
  {
    slug: "veu-da-ilusao",
    quotes: ilusaoQuotes,
    emailSequence: ilusaoEmail,
    socialPosts: ilusaoSocial,
    launchPlan: [
      "JÁ LANÇADO — em promoção contínua",
      "Publicar 1 quote por semana no Instagram",
      "Email semanal à lista com conteúdo do espelho",
      "Reel mensal com pergunta do livro",
    ],
  },
  {
    slug: "veu-do-medo",
    quotes: medoQuotes,
    emailSequence: medoEmail,
    socialPosts: medoSocial,
    launchPlan: [
      "Semana -2 (15 Fev): Teaser — 'O segundo espelho está a chegar'",
      "Semana -1 (22 Fev): Waitlist aberta + early bird 20%",
      "Dia 0 (1 Mar): Lançamento oficial",
      "Semana +1: Conteúdo de bastidores",
      "Semana +2: Primeiros testemunhos",
    ],
  },
  generateFutureVeilMarketing(
    "veu-da-culpa",
    "O Espelho da Culpa",
    "Quando te castigas por querer mais",
    "Querer para ti não é tirar dos outros. Mas ninguém te ensinou isso.",
    "Abril 2026",
    "Cada vez que fazes algo só para ti, uma voz interior sussurra que devias estar a fazer outra coisa. Que não mereces. Que é egoísmo. Essa voz não é a tua consciência — é uma herança que não pediste.",
  ),
  generateFutureVeilMarketing(
    "veu-da-identidade",
    "O Espelho da Identidade",
    "Quando já não sabes quem és sem os outros",
    "Quem és quando ninguém te está a ver?",
    "Maio 2026",
    "Mãe, filha, colega, parceira — és tão boa a desempenhar os papéis que já não sabes o que sobra quando os tiras. Não é crise de identidade. É que nunca houve espaço para a pergunta.",
  ),
  generateFutureVeilMarketing(
    "veu-do-controlo",
    "O Espelho do Controlo",
    "Quando segurar é a única forma que conheces",
    "Largar não é desistir. É confiar que não tudo desmorona quando soltares.",
    "Junho 2026",
    "A tua vida funciona porque tu seguras tudo no lugar. As decisões, os planos, as pessoas. Mas o peso acumula-se. E a ilusão de que se largares tudo desmorona é exactamente isso — uma ilusão construída para te manter em segurança num custo muito alto.",
  ),
  generateFutureVeilMarketing(
    "veu-do-desejo",
    "O Espelho do Desejo",
    "Quando desejas tudo menos o que precisas",
    "O vazio não se preenche com mais. Preenche-se com o certo.",
    "Julho 2026",
    "Compras, preenches, buscas, acumulas — e mesmo assim, o vazio continua ali. Talvez porque o desejo que sentes não é pelo que pensas. Talvez estejas a procurar fora o que só podes encontrar dentro.",
  ),
  generateFutureVeilMarketing(
    "veu-da-separacao",
    "O Espelho da Separação",
    "Quando te afastas de ti mesma para pertencer",
    "A separação que sentes do mundo começa com a separação de ti mesma.",
    "Agosto 2026",
    "Dás tanto para pertencer que te perdeste no processo. Ajustas a voz, ajustas as opiniões, ajustas o que mostrares de ti — e um dia olhas e já não reconheces a pessoa que adaptou tudo para caber.",
  ),
];

export function getMarketingForVeil(slug: string) {
  return allMarketing.find((m) => m.slug === slug);
}
