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

// ─── O VÉU DA ILUSÃO — real quotes from the book ────────────────────────────

const ilusaoQuotes: MarketingQuote[] = [
  {
    text: "Quando foi que escolhi tomar café em vez de chá?",
    source: "O Véu da Ilusão, Parte I",
    formats: ["instagram", "story", "reel"],
  },
  {
    text: "Via, mas não sentia. Registava, mas não participava. Como quem assiste a um espectáculo por trás de uma janela fechada.",
    source: "O Véu da Ilusão, Parte I",
    formats: ["instagram", "story"],
  },
  {
    text: "Responder implica haver alguém dentro das palavras, implica posição, implica presença. Tu apenas cumpriste protocolo.",
    source: "O Véu da Ilusão, Parte II",
    formats: ["instagram", "reel"],
  },
  {
    text: "Quando foi a última vez que escolhi uma rua diferente?",
    source: "O Véu da Ilusão, Parte I",
    formats: ["instagram", "story", "reel"],
  },
  {
    text: "Quantas pessoas vivem no automático. Quantas respondiam a perguntas importantes com variações sofisticadas de 'tanto faz'.",
    source: "O Véu da Ilusão, Parte II",
    formats: ["instagram", "reel"],
  },
  {
    text: "Há mais para ti do que aquilo que tens vivido.",
    source: "O Véu da Ilusão, Epílogo",
    formats: ["instagram", "story", "reel", "email"],
  },
  {
    text: "Perguntar, mesmo tarde, é o primeiro gesto de se escolher.",
    source: "O Véu da Ilusão, Prefácio",
    formats: ["instagram", "story", "email"],
  },
  {
    text: "Uma mulher descobre, no meio de uma manhã igual a todas as outras, que construiu uma vida inteira sem nunca ter perguntado o que queria.",
    source: "O Véu da Ilusão, Prefácio",
    formats: ["instagram", "email", "article"],
  },
  {
    text: "Não era que não tivesse opinião. Era que a sua primeira reacção nunca era o que verdadeiramente pensava.",
    source: "O Véu da Ilusão, Parte II",
    formats: ["instagram", "reel"],
  },
  {
    text: "O que fizer sentido para a equipa.",
    source: "O Véu da Ilusão, Parte II",
    formats: ["story", "reel"],
  },
];

const ilusaoSocial: SocialPost[] = [
  {
    content:
      "Há vidas que funcionam.\nCumprem os prazos. Pagam as contas. Recebem os parabéns nas alturas certas.\n\nE no entanto, quando a casa fica em silêncio, surge algo que não é queixa nem ingratidão.\n\nÉ uma intuição suave: há mais.\n\n→ Link na bio para descobrires o teu véu",
    hashtags: [...CORE_HASHTAGS, "#VéuDaIlusão"],
    format: "carousel",
    veilSlug: "veu-da-ilusao",
    scheduledWeek: 1,
  },
  {
    content:
      "\"Quando foi que escolhi tomar café em vez de chá?\"\n\nUma pergunta absurda que muda tudo.\n\nO Véu da Ilusão começa assim — com uma manhã igual a todas as outras e uma mulher que, pela primeira vez, pergunta.\n\n→ Faz o quiz gratuito e descobre o teu véu",
    hashtags: [...CORE_HASHTAGS, "#VéuDaIlusão"],
    format: "single",
    veilSlug: "veu-da-ilusao",
    scheduledWeek: 2,
  },
  {
    content:
      "O que dizes quando alguém te pergunta o que achas?\n\n\"O que fizer sentido para a equipa.\"\n\"Tanto faz.\"\n\"Está bem para mim.\"\n\nE se, por uma vez, respondesses o que realmente pensas?\n\n→ O Véu da Ilusão explora exactamente isto",
    hashtags: [...CORE_HASHTAGS, "#VéuDaIlusão", "#OpiniãoPrópria"],
    format: "reel",
    veilSlug: "veu-da-ilusao",
    scheduledWeek: 3,
  },
  {
    content:
      "Não é um livro.\nÉ uma experiência.\n\n7 capítulos de ficção\n+ respiração guiada\n+ diário de reflexão\n+ o teu Espelho pessoal\n\nLês. Respiras. Escreves. E no final, vês-te.\n\n→ seteecos.com/experiencias",
    hashtags: [...CORE_HASHTAGS, "#ExperiênciaImersiva"],
    format: "carousel",
    veilSlug: "veu-da-ilusao",
    scheduledWeek: 4,
  },
];

const ilusaoEmail: EmailSequence[] = [
  {
    day: 0,
    subject: "O teu véu é a Ilusão — o que isso significa",
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
    preview: "O Véu da Ilusão está disponível.",
    type: "launch",
  },
];

// ─── O VÉU DO MEDO — templates (book written, quotes to extract) ────────────

const medoQuotes: MarketingQuote[] = [
  {
    text: "Sabes o que queres. Mas o medo decide antes de ti.",
    source: "O Véu do Medo",
    formats: ["instagram", "story", "reel"],
  },
  {
    text: "O primeiro passo não precisa de ser grande. Precisa apenas de ser teu.",
    source: "O Véu do Medo",
    formats: ["instagram", "story", "reel", "email"],
  },
  {
    text: "Não é covardia. É um mecanismo antigo, treinado ao longo de anos de cautela disfarçada de bom senso.",
    source: "O Véu do Medo, Descrição",
    formats: ["instagram", "reel"],
  },
  {
    text: "E se pudesses ver o que há do outro lado?",
    source: "O Véu do Medo",
    formats: ["story", "reel"],
  },
];

const medoSocial: SocialPost[] = [
  {
    content:
      "Estás prestes a dar um passo.\nMas algo te puxa para trás.\n\nNão é covardia.\nÉ um mecanismo antigo — treinado ao longo de anos de cautela disfarçada de bom senso.\n\nO Véu do Medo chega em Março.\n→ Junta-te à waitlist e recebe 20% de desconto",
    hashtags: [...CORE_HASHTAGS, "#VéuDoMedo", "#Coragem"],
    format: "carousel",
    veilSlug: "veu-do-medo",
    scheduledWeek: 1,
  },
  {
    content:
      "\"O primeiro passo não precisa de ser grande.\nPrecisa apenas de ser teu.\"\n\n— O Véu do Medo, em breve\n\n→ seteecos.com/experiencias",
    hashtags: [...CORE_HASHTAGS, "#VéuDoMedo"],
    format: "single",
    veilSlug: "veu-do-medo",
    scheduledWeek: 2,
  },
];

const medoEmail: EmailSequence[] = [
  {
    day: -14,
    subject: "O segundo véu está quase a chegar",
    preview: "O Véu do Medo — para quem sabe o que quer mas não consegue dar o passo.",
    type: "launch",
  },
  {
    day: -7,
    subject: "20% de desconto se entrares na waitlist esta semana",
    preview: "O Véu do Medo chega dia 1 de Março.",
    type: "launch",
  },
  {
    day: 0,
    subject: "O Véu do Medo está disponível",
    preview: "Sabes o que queres. Mas o medo decide antes de ti.",
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
      {
        day: -14,
        subject: `${title} está quase a chegar`,
        preview: subtitle,
        type: "launch",
      },
      {
        day: -7,
        subject: `Waitlist aberta — 20% no ${title}`,
        preview: `Lançamento em ${launchMonth}. Sê a primeira.`,
        type: "launch",
      },
      {
        day: 0,
        subject: `${title} está disponível`,
        preview: tagline,
        type: "launch",
      },
      {
        day: 3,
        subject: `Já começaste ${title}?`,
        preview: "O teu ritmo. Sem pressa.",
        type: "post-purchase",
      },
    ],
    socialPosts: [
      {
        content: `"${tagline}"\n\n${title} chega em ${launchMonth}.\n→ Junta-te à waitlist: seteecos.com/experiencias`,
        hashtags: [...CORE_HASHTAGS],
        format: "single",
        veilSlug: slug,
        scheduledWeek: -2,
      },
      {
        content: `${subtitle}\n\nEsta é a próxima experiência dos Sete Véus.\n7 capítulos. Respiração guiada. Diário de reflexão. O Teu Espelho.\n\n→ Descobre o teu véu: seteecos.com/recursos/teste`,
        hashtags: [...CORE_HASHTAGS],
        format: "carousel",
        veilSlug: slug,
        scheduledWeek: -1,
      },
      {
        content: `${title} está disponível.\n\nSe o quiz te indicou este véu — é porque algo em ti já sabe.\n\n→ seteecos.com/experiencias`,
        hashtags: [...CORE_HASHTAGS],
        format: "single",
        veilSlug: slug,
        scheduledWeek: 0,
      },
    ],
    launchPlan: [
      `Semana -4: Teaser no Instagram — frase do véu sem revelar título`,
      `Semana -3: Abrir waitlist — "Algo novo está a chegar"`,
      `Semana -2: Revelar título e imagem — post + story`,
      `Semana -1: Email à lista — 20% early bird, countdown`,
      `Dia 0: Lançamento — post, story, email, actualizar /experiencias`,
      `Semana +1: Conteúdo de bastidores — processo de escrita`,
      `Semana +2: Primeiros testemunhos / screenshots do Espelho`,
      `Semana +3: "Se fizeste o quiz e o teu véu era este…" — retargeting`,
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
      "Email semanal à lista com conteúdo do véu",
      "Reel mensal com pergunta do livro",
    ],
  },
  {
    slug: "veu-do-medo",
    quotes: medoQuotes,
    emailSequence: medoEmail,
    socialPosts: medoSocial,
    launchPlan: [
      "Semana -2 (15 Fev): Teaser — 'O segundo véu está a chegar'",
      "Semana -1 (22 Fev): Waitlist aberta + early bird 20%",
      "Dia 0 (1 Mar): Lançamento oficial",
      "Semana +1: Conteúdo de bastidores",
      "Semana +2: Primeiros testemunhos",
    ],
  },
  generateFutureVeilMarketing(
    "veu-da-culpa",
    "O Véu da Culpa",
    "Quando te castigas por querer mais",
    "Querer mais não é egoísmo. É vida.",
    "Abril 2026",
  ),
  generateFutureVeilMarketing(
    "veu-da-identidade",
    "O Véu da Identidade",
    "Quando já não sabes quem és sem os outros",
    "Quem és quando ninguém te está a ver?",
    "Junho 2026",
  ),
  generateFutureVeilMarketing(
    "veu-do-controlo",
    "O Véu do Controlo",
    "Quando segurar é a única forma que conheces",
    "E se aprendesses a largar — não tudo, mas o suficiente para respirar?",
    "Agosto 2026",
  ),
  generateFutureVeilMarketing(
    "veu-do-desejo",
    "O Véu do Desejo",
    "Quando desejas tudo menos o que precisas",
    "O que queres, de verdade?",
    "Outubro 2026",
  ),
  generateFutureVeilMarketing(
    "veu-da-separacao",
    "O Véu da Separação",
    "Quando te afastas de ti mesma para pertencer",
    "O caminho de volta começa por ti.",
    "Dezembro 2026",
  ),
];

export function getMarketingForVeil(slug: string) {
  return allMarketing.find((m) => m.slug === slug);
}
