/**
 * Content Calendar Engine — Auto-generates weekly marketing templates
 * for Instagram Reels, WhatsApp Status, Stories, and Carousels.
 *
 * Based on the Sete Ecos editorial pillars:
 * 1. Recognition (reconhecimento)
 * 2. Permission (permissão)
 * 3. Depth (profundidade)
 * 4. Community (comunidade)
 * 5. Invitation (convite)
 */

export type ContentType =
  | "reel"
  | "stories-poll"
  | "stories-testemunho"
  | "carrossel"
  | "broadcast"
  | "status-whatsapp";

export type DayOfWeek = "seg" | "ter" | "qua" | "qui" | "sex" | "sab" | "dom";

export type VisualGuide = {
  background: string;
  textColor: string;
  accentColor: string;
  font: string;
  dimensions: string;
  layout: string;
};

export type ContentTemplate = {
  id: string;
  day: DayOfWeek;
  dayLabel: string;
  type: ContentType;
  typeLabel: string;
  platform: "instagram" | "whatsapp" | "ambos";
  duration: string;
  title: string;
  hook: string;
  caption: string;
  hashtags: string[];
  cta: string;
  pillar: string;
  notes: string;
  visual: VisualGuide;
};

export type WeekPlan = {
  weekNumber: number;
  theme: string;
  startDate: string;
  templates: ContentTemplate[];
  totalMinutes: number;
};

// --- Content pools for auto-generation ---

const hooks = {
  reconhecimento: [
    "Quantas vezes fizeste algo só porque era esperado?",
    "A vida que funciona nem sempre é a vida que te preenche.",
    "Se tudo na tua vida está \"bem\"… porque sentes que falta algo?",
    "Já tentaste explicar um vazio que ninguém vê?",
    "O automático é confortável — até deixar de ser.",
    "E se o que chamas de \"a tua vida\" não foi escolhido por ti?",
    "Há uma diferença entre viver e funcionar.",
    "Quando foi a última vez que paraste para te ouvir?",
  ],
  permissao: [
    "Podes querer mais. Não é ingratidão — é honestidade.",
    "Não precisas de justificar a tua vontade de mudar.",
    "Dar-te permissão é o primeiro acto de coragem.",
    "E se não precisasses de provar nada a ninguém?",
    "A tua transformação não precisa de aplausos para ser real.",
    "Tens direito a um recomeço silencioso.",
    "Não há hora certa para começar a escolher-te.",
    "Ninguém precisa de entender para que tu avances.",
  ],
  profundidade: [
    "Um espelho de cada vez. Sem pressa.",
    "A leitura que te muda não é a que te dá respostas — é a que te faz perguntas.",
    "Reflectir é um acto de coragem silencioso.",
    "As palavras que escreves sobre ti mesma são as mais importantes.",
    "Cada capítulo é uma camada que soltas.",
    "O espelho mais honesto é o que construímos com as nossas próprias palavras.",
    "Autoconhecimento não é teoria — é prática diária.",
    "Há verdades que só se revelam quando paramos para escrever.",
  ],
  convite: [
    "Há um teste gratuito que te mostra qual espelho te esconde — link na bio.",
    "7 recursos gratuitos para quem quer começar a escolher-se.",
    "Descarrega o diário de 7 dias — sem compromisso, é teu.",
    "Começa sem pagar nada. O primeiro passo é sempre grátis.",
    "O teste leva 3 minutos. O que descobres pode mudar a tua semana.",
    "Recursos gratuitos na bio — porque transformação não precisa de preço.",
    "Experimenta antes de te comprometeres. O teste é gratuito.",
    "Se isto ressoa contigo, os recursos gratuitos são um bom começo.",
  ],
};

const captionTemplates = {
  reel: [
    "Construí uma vida que fazia sentido para toda a gente — menos para mim.\n\nFoi quando percebi que não era ingratidão. Era intuição.\n\n{cta}",
    "Não é sobre mudar tudo de um dia para o outro.\nÉ sobre parar e perguntar: isto é meu?\n\nSem pressa. Sem fórmulas.\n\n{cta}",
    "O espelho da ilusão é o mais difícil de ver — porque parece a realidade.\n\n{cta}",
    "Há uma diferença entre a vida que construíste e a vida que escolheste.\n\nEsta pergunta mudou tudo para mim.\n\n{cta}",
  ],
  "stories-poll": [
    "Pergunta honesta do dia:",
    "Diz-me com sinceridade:",
    "Só para ti:",
    "Se pudesses responder sem medo:",
  ],
  carrossel: [
    "5 sinais de que estás a viver no automático\n(e o que podes fazer)\n\nSwipe para ler →",
    "O que ninguém te diz sobre autoconhecimento\n\n7 verdades que aprendi a escrever este livro\n\nSwipe →",
    "Antes vs Depois de tirar o espelho\n\nNão é sobre ser diferente.\nÉ sobre ser honesta.\n\nSwipe →",
  ],
};

const polls = [
  { question: "Já te sentiste a viver no automático?", options: ["Sim, muitas vezes", "Não, nunca"] },
  { question: "Se pudesses mudar uma coisa na tua vida, mudarias?", options: ["Sim", "Estou bem assim"] },
  { question: "Já tentaste explicar um vazio que ninguém vê?", options: ["Sim 🥺", "Não me identifico"] },
  { question: "O que te faz mais falta?", options: ["Tempo para mim", "Clareza interior"] },
  { question: "Já escreveste sobre ti mesma esta semana?", options: ["Sim ✍️", "Não, mas quero"] },
  { question: "Preferes reflexões guiadas ou livres?", options: ["Guiadas", "Livres"] },
];

const testimonials = [
  "\"Não é um livro que se lê — é um livro que se vive.\" — Carla S., Lisboa",
  "\"O diário de reflexão mudou a forma como leio.\" — Ana M., Maputo",
  "\"Comecei pelo teste gratuito. Acabei por comprar nesse dia.\" — Beatriz L., São Paulo",
  "\"As pausas entre capítulos são tão importantes quanto as palavras.\" — Carla S.",
  "\"Nunca pensei que um livro me fizesse parar e escrever sobre mim mesma.\" — Ana M.",
];

const ctas = [
  "🔗 Teste gratuito na bio — descobre qual espelho te esconde",
  "🔗 Link na bio — recursos gratuitos para ti",
  "🔗 seteveus.space — começa a tua jornada",
  "🔗 Testa qual espelho te esconde — link na bio",
  "🔗 Descarrega o diário de 7 dias — link na bio",
];

const hashtags = [
  "#autoconhecimento", "#seteecos", "#osseteveus", "#ficçãopsicológica",
  "#desenvolvimentopessoal", "#mulheresqueseescolhem", "#vivercomverdade",
  "#reflexão", "#diáriodereflexão", "#leituraquetransforma",
  "#moçambique", "#viviannesantos", "#psicologiapositiva",
  "#saudementalfeminina", "#crescimentopessoal",
];

// --- Visual identity per content type ---

const visualGuides: Record<ContentType, VisualGuide> = {
  reel: {
    background: "#3d3630 (brown-900) ou #f7f5f0 (cream) — alternar semana a semana",
    textColor: "#f7f5f0 (cream) em fundo escuro / #3d3630 (brown-900) em fundo claro",
    accentColor: "#7a8c6e (sage) para CTA, #c9b896 (gold) para separadores",
    font: "Playfair Display para frase principal, Inter uppercase para CTA",
    dimensions: "1080 × 1920 px (9:16)",
    layout: "Logo espiral top-left (40px, 60% opacity). Frase centrada. CTA em baixo.",
  },
  "stories-poll": {
    background: "#f7f5f0 (cream) — fundo claro para legibilidade da poll",
    textColor: "#3d3630 (brown-900)",
    accentColor: "#7a8c6e (sage) para botões de poll",
    font: "Inter para pergunta, Playfair Display para contexto",
    dimensions: "1080 × 1920 px (9:16)",
    layout: "Pergunta centrada. Poll nativa do Instagram. Sticker de link em baixo.",
  },
  "stories-testemunho": {
    background: "#ebe7df (cream-dark) — fundo quente para testemunho",
    textColor: "#4a433b (brown-800)",
    accentColor: "#c9b896 (gold) para aspas",
    font: "Playfair Display italic para citação, Inter para nome/local",
    dimensions: "1080 × 1920 px (9:16)",
    layout: "Aspas douradas grandes. Citação centrada. Nome + local em baixo. Link sticker.",
  },
  carrossel: {
    background: "Slide 1: #3d3630 (escuro). Intermédios: #f7f5f0 (claro). Último: #ebe7df",
    textColor: "Slide 1: #f7f5f0. Intermédios: #3d3630. Último: #7a8c6e",
    accentColor: "#c9b896 (gold) para numeração, #7a8c6e (sage) para CTA final",
    font: "Playfair Display para títulos, Inter para corpo",
    dimensions: "1080 × 1080 px (1:1)",
    layout: "Slide 1: gancho. 3-5 slides: conteúdo numerado. Último: CTA com sage.",
  },
  broadcast: {
    background: "N/A — texto simples no WhatsApp",
    textColor: "N/A",
    accentColor: "N/A",
    font: "Texto simples — sem formatação especial",
    dimensions: "N/A",
    layout: "Máximo 3-4 frases. Link no final. Tom pessoal e directo.",
  },
  "status-whatsapp": {
    background: "Mesmo template que Stories Instagram OU texto simples",
    textColor: "Mesmo que Stories",
    accentColor: "Mesmo que Stories",
    font: "Mesmo que Stories OU texto nativo do WhatsApp",
    dimensions: "1080 × 1920 px ou texto",
    layout: "Preferir texto simples no WhatsApp — é mais íntimo. Imagem só se for forte.",
  },
};

// --- Helper functions ---

function pick<T>(arr: T[], seed: number): T {
  return arr[Math.abs(seed) % arr.length];
}

function pickN<T>(arr: T[], n: number, seed: number): T[] {
  const shuffled = [...arr].sort((a, b) => {
    const ha = ((seed * 31 + arr.indexOf(a)) % 1000) / 1000;
    const hb = ((seed * 31 + arr.indexOf(b)) % 1000) / 1000;
    return ha - hb;
  });
  return shuffled.slice(0, n);
}

function getWeekNumber(date: Date): number {
  const start = new Date(date.getFullYear(), 0, 1);
  const diff = date.getTime() - start.getTime();
  return Math.ceil((diff / 86400000 + start.getDay() + 1) / 7);
}

function formatDate(date: Date): string {
  return date.toISOString().split("T")[0];
}

// --- Generator ---

const weekThemes = [
  "Reconhecimento — a vida que não escolheste",
  "Permissão — o direito de querer mais",
  "O Espelho da Ilusão — quando tudo parece bem",
  "Reflexão — o poder de parar e escrever",
  "Coragem silenciosa — dar o primeiro passo",
  "Autenticidade — viver sem máscara",
  "O Espelho — as tuas palavras dizem quem és",
  "Transformação — sem pressa, sem fórmula",
];

export function generateWeekPlan(weekOffset: number = 0): WeekPlan {
  const now = new Date();
  now.setDate(now.getDate() + weekOffset * 7);

  // Find next Monday
  const dayOfWeek = now.getDay();
  const mondayOffset = dayOfWeek === 0 ? 1 : dayOfWeek === 1 ? 0 : 8 - dayOfWeek;
  const monday = new Date(now);
  monday.setDate(monday.getDate() + mondayOffset);

  const weekNum = getWeekNumber(monday);
  const seed = weekNum + monday.getFullYear() * 100;

  const theme = pick(weekThemes, seed);
  const pillarKeys = Object.keys(hooks) as (keyof typeof hooks)[];
  const weekPillar = pick(pillarKeys, seed);

  const templates: Omit<ContentTemplate, "visual">[] = [
    // Segunda — Reel Instagram + Status WhatsApp
    {
      id: `${formatDate(monday)}-seg-reel`,
      day: "seg",
      dayLabel: "Segunda-feira",
      type: "reel",
      typeLabel: "Reel Instagram + Status WhatsApp",
      platform: "ambos",
      duration: "30 min",
      title: `Reel: ${theme.split("—")[0].trim()}`,
      hook: pick(hooks[weekPillar], seed),
      caption: pick(captionTemplates.reel, seed).replace("{cta}", pick(ctas, seed)),
      hashtags: pickN(hashtags, 8, seed),
      cta: pick(ctas, seed),
      pillar: weekPillar,
      notes: "Filmar a falar directamente para a câmara. 15-30 segundos. Música suave de fundo.",
    },
    // Terça — Stories com poll/pergunta
    {
      id: `${formatDate(monday)}-ter-stories`,
      day: "ter",
      dayLabel: "Terça-feira",
      type: "stories-poll",
      typeLabel: "Stories com Poll/Pergunta",
      platform: "instagram",
      duration: "15 min",
      title: `Stories: ${pick(polls, seed + 1).question}`,
      hook: pick(captionTemplates["stories-poll"], seed + 1),
      caption: pick(polls, seed + 1).question,
      hashtags: [],
      cta: `Opções: ${pick(polls, seed + 1).options.join(" vs ")}`,
      pillar: "comunidade",
      notes: `Poll: "${pick(polls, seed + 1).question}" — ${pick(polls, seed + 1).options.join(" | ")}. Seguir com story de resposta ao resultado.`,
    },
    // Quarta — Reel Instagram + Broadcast WhatsApp
    {
      id: `${formatDate(monday)}-qua-reel`,
      day: "qua",
      dayLabel: "Quarta-feira",
      type: "reel",
      typeLabel: "Reel Instagram + Broadcast WhatsApp",
      platform: "ambos",
      duration: "30 min",
      title: `Reel: ${pick(hooks.profundidade, seed + 2).substring(0, 40)}...`,
      hook: pick(hooks.profundidade, seed + 2),
      caption: pick(captionTemplates.reel, seed + 2).replace("{cta}", pick(ctas, seed + 2)),
      hashtags: pickN(hashtags, 8, seed + 2),
      cta: pick(ctas, seed + 2),
      pillar: "profundidade",
      notes: "Broadcast WhatsApp: enviar link do reel + mensagem pessoal curta. Máx. 3 frases.",
    },
    // Quinta — Stories com testemunho
    {
      id: `${formatDate(monday)}-qui-testemunho`,
      day: "qui",
      dayLabel: "Quinta-feira",
      type: "stories-testemunho",
      typeLabel: "Stories com Testemunho",
      platform: "instagram",
      duration: "15 min",
      title: "Story: Testemunho real",
      hook: "O que dizem quem já começou:",
      caption: pick(testimonials, seed + 3),
      hashtags: [],
      cta: pick(ctas, seed + 3),
      pillar: "comunidade",
      notes: "Screenshot de testemunho com fundo de cor sage. Adicionar sticker de link para o teste gratuito.",
    },
    // Sexta — Carrossel educativo + Status WhatsApp
    {
      id: `${formatDate(monday)}-sex-carrossel`,
      day: "sex",
      dayLabel: "Sexta-feira",
      type: "carrossel",
      typeLabel: "Carrossel Educativo + Status WhatsApp",
      platform: "ambos",
      duration: "30 min",
      title: `Carrossel: ${pick(captionTemplates.carrossel, seed + 4).split("\n")[0]}`,
      hook: pick(hooks.convite, seed + 4),
      caption: pick(captionTemplates.carrossel, seed + 4),
      hashtags: pickN(hashtags, 10, seed + 4),
      cta: pick(ctas, seed + 4),
      pillar: "convite",
      notes: "5-7 slides. Primeiro slide com gancho forte. Último slide com CTA claro.",
    },
    // Sábado — Responder DMs e mensagens
    {
      id: `${formatDate(monday)}-sab-engagement`,
      day: "sab",
      dayLabel: "Sábado",
      type: "broadcast",
      typeLabel: "Responder DMs e Mensagens",
      platform: "ambos",
      duration: "20 min",
      title: "Engagement: Responder e interagir",
      hook: "",
      caption: "",
      hashtags: [],
      cta: "",
      pillar: "comunidade",
      notes: "Responder todas as DMs do Instagram. Responder mensagens WhatsApp. Comentar em 5-10 posts de seguidoras. Enviar mensagem de agradecimento a quem partilhou conteúdo.",
    },
    // Domingo — Planear conteúdo
    {
      id: `${formatDate(monday)}-dom-planeamento`,
      day: "dom",
      dayLabel: "Domingo",
      type: "broadcast",
      typeLabel: "Planeamento da Semana",
      platform: "ambos",
      duration: "30 min",
      title: "Planear conteúdo da próxima semana",
      hook: "",
      caption: "",
      hashtags: [],
      cta: "",
      pillar: "planeamento",
      notes: "Rever métricas da semana. Anotar o que funcionou. Preparar legendas e stories da semana seguinte. Pré-gravar 1-2 reels se possível.",
    },
  ];

  // Inject visual identity guide into each template
  const templatesWithVisual = templates.map((t) => ({
    ...t,
    visual: visualGuides[t.type],
  }));

  return {
    weekNumber: weekNum,
    theme,
    startDate: formatDate(monday),
    templates: templatesWithVisual,
    totalMinutes: 170,
  };
}

export function generateMonthPlan(monthOffset: number = 0): WeekPlan[] {
  const plans: WeekPlan[] = [];
  for (let i = 0; i < 4; i++) {
    plans.push(generateWeekPlan(monthOffset * 4 + i));
  }
  return plans;
}
