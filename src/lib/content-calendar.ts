/**
 * Estratégia de Marketing "Os Sete Véus"
 * ────────────────────────────────────────
 *
 * PRINCÍPIO: O marketing deve sentir-se como o produto — íntimo, reflectivo, nunca apressado.
 *
 * RITMO SEMANAL (3 publicações feed + stories + WhatsApp):
 *
 *   Seg  →  REEL (alcance/descoberta) + WA Status
 *   Ter  →  STORIES apenas (poll/pergunta/interacção)
 *   Qua  →  CARROSSEL (valor/educação/saves) + WA Broadcast
 *   Qui  →  STORIES apenas (testemunho/eco/bastidores)
 *   Sex  →  POST SINGLE (profundidade/conversão) + WA Status
 *   Sáb  →  Engagement (responder DMs) ou descanso
 *   Dom  →  Descanso / planeamento
 *
 * ARCO MENSAL (4 semanas):
 *   Sem 1: DESPERTAR  — "Reconheces-te?" — ganchos emocionais, perguntas
 *   Sem 2: EXPLORAR   — "Há algo para ti" — valor, educação, excertos
 *   Sem 3: SENTIR     — "Não estás sozinha" — comunidade, testemunhos
 *   Sem 4: ESCOLHER   — "Quando estiveres pronta" — convite, recursos, CTA
 *
 * FORMATOS ROTATIVOS (nunca o mesmo formato 2 semanas seguidas):
 *   Reel:      talking head / texto+música / screen recording / storytelling
 *   Carrossel: educativo / citações / comparação / passo-a-passo
 *   Post:      citação longa / reflexão pessoal / testemunho / pergunta aberta
 *
 * WHATSAPP (canal separado — íntimo e pessoal):
 *   Status:    Seg + Sex (reutilizar frame do reel ou imagem do post)
 *   Broadcast: Qua (1x/semana, mensagem pessoal + link, max 4 frases)
 *   Regra:     Nunca copiar Instagram. Tom pessoal, como se fosse DM.
 */

export type ContentType =
  | "reel"
  | "carrossel"
  | "post-single"
  | "stories-poll"
  | "stories-testemunho"
  | "stories-bastidores"
  | "broadcast"
  | "status-whatsapp"
  | "engagement"
  | "descanso";

export type DayOfWeek = "seg" | "ter" | "qua" | "qui" | "sex" | "sab" | "dom";

export type MonthArc = "despertar" | "explorar" | "sentir" | "escolher";

export type ReelStyle = "talking-head" | "texto-musica" | "screen-recording" | "storytelling";
export type CarouselStyle = "educativo" | "citacoes" | "comparacao" | "passo-a-passo";
export type PostStyle = "citacao" | "reflexao" | "testemunho" | "pergunta";

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
  formatVariant?: string;
};

export type WeekPlan = {
  weekNumber: number;
  theme: string;
  arc: MonthArc;
  startDate: string;
  templates: ContentTemplate[];
  totalMinutes: number;
};

// ─── CONTENT POOLS ──────────────────────────────────────────────────────────

const arcThemes: Record<MonthArc, string[]> = {
  despertar: [
    "A vida que não escolheste",
    "O automático confortável",
    "Quando tudo parece bem mas não está",
    "O vazio que ninguém vê",
  ],
  explorar: [
    "O poder de parar e escrever",
    "Um espelho de cada vez",
    "A leitura que te faz perguntas",
    "Cada capítulo é uma camada que soltas",
  ],
  sentir: [
    "As vozes encontram-se aqui",
    "Não estás sozinha nisto",
    "O que dizem quem já começou",
    "Ecos de quem se reconheceu",
  ],
  escolher: [
    "Quando estiveres pronta",
    "Começa sem pagar nada",
    "A tua jornada ao teu ritmo",
    "Sem pressa. Sem fórmula. Sem prazo.",
  ],
};

const reelHooks: Record<MonthArc, string[]> = {
  despertar: [
    "Quantas vezes fizeste algo só porque era esperado?",
    "A vida que funciona nem sempre é a vida que te preenche.",
    "Se tudo na tua vida está \"bem\"... porque sentes que falta algo?",
    "Há uma diferença entre viver e funcionar.",
    "Quando foi a última vez que paraste para te ouvir?",
    "E se o que chamas de \"a tua vida\" não foi escolhido por ti?",
    "O automático é confortável — até deixar de ser.",
    "Já tentaste explicar um vazio que ninguém vê?",
  ],
  explorar: [
    "Um espelho de cada vez. Sem pressa.",
    "A leitura que te muda não é a que te dá respostas.",
    "Reflectir é um acto de coragem silencioso.",
    "Há verdades que só se revelam quando paramos para escrever.",
    "Cada capítulo é uma camada que soltas.",
    "As palavras que escreves sobre ti mesma são as mais importantes.",
    "Autoconhecimento não é teoria — é prática diária.",
    "O espelho mais honesto é o que construímos com as nossas palavras.",
  ],
  sentir: [
    "\"Chorei no capítulo 5. Não de tristeza. De reconhecimento.\"",
    "\"Nunca pensei que um livro me fizesse parar e escrever sobre mim.\"",
    "\"Comecei pelo teste gratuito. Acabei por comprar nesse dia.\"",
    "\"As pausas entre capítulos são tão importantes quanto as palavras.\"",
    "Uma leitora disse-me algo que me parou.",
    "Não sou a única a sentir isto. E tu também não.",
    "Quando partilhamos o que sentimos, algo muda.",
    "O eco mais forte é o que vem de quem se reconheceu.",
  ],
  escolher: [
    "Há um teste gratuito que te mostra qual espelho te esconde.",
    "7 recursos gratuitos para quem quer começar a escolher-se.",
    "Começa sem pagar nada. O primeiro passo é sempre grátis.",
    "O teste leva 3 minutos. O que descobres pode mudar a tua semana.",
    "Experimenta antes de te comprometeres. O teste é gratuito.",
    "Não precisas de justificar a tua vontade de mudar.",
    "Podes querer mais. Não é ingratidão — é honestidade.",
    "Dar-te permissão é o primeiro acto de coragem.",
  ],
};

const reelCaptions: Record<ReelStyle, string[]> = {
  "talking-head": [
    "Construí uma vida que fazia sentido para toda a gente — menos para mim.\n\nFoi quando percebi que não era ingratidão. Era intuição.\n\n{cta}",
    "Não é sobre mudar tudo de um dia para o outro.\nÉ sobre parar e perguntar: isto é meu?\n\n{cta}",
    "Há uma diferença entre a vida que construíste e a vida que escolheste.\n\nEsta pergunta mudou tudo para mim.\n\n{cta}",
  ],
  "texto-musica": [
    "As palavras aparecem. O silêncio fala.\n\nSe isto te tocou, guarda e partilha com quem precisa de ouvir.\n\n{cta}",
    "Não precisa de voz. As letras bastam.\n\nGuarda este reel. Volta a ele quando precisares.\n\n{cta}",
  ],
  "screen-recording": [
    "Por dentro da experiência Os Sete Véus.\n\nNão é um livro que se lê. É uma experiência que se vive.\n\nLeitura integrada. Respiração guiada. Diário pessoal.\n\n{cta}",
    "Mostra-te por dentro como funciona.\n\nUma experiência de leitura diferente de tudo o que já viste.\n\n{cta}",
  ],
  storytelling: [
    "Sara acordou numa manhã igual a todas as outras. Mas desta vez, perguntou.\n\n\"Quando foi que escolhi esta vida?\"\n\n{cta}",
    "A mãe sempre viu. Esperou anos.\nAgora que Sara acordou, Helena tem algo para lhe dizer.\n\n{cta}",
  ],
};

const carouselTopics: Record<CarouselStyle, string[]> = {
  educativo: [
    "5 sinais de que vives no piloto automático",
    "7 verdades sobre autoconhecimento que ninguém te diz",
    "O que acontece quando paras para te ouvir",
    "3 perguntas que mudam a forma como te vês",
  ],
  citacoes: [
    "5 frases do Espelho da Ilusão que te vão parar",
    "O que Sara descobriu em 7 capítulos",
    "Palavras que ficam depois de ler",
    "Frases que as leitoras mais sublinharam",
  ],
  comparacao: [
    "Livro físico vs Experiência digital",
    "Espelhos vs Nós — duas colecções, uma jornada",
    "Antes vs Depois de tirar o espelho",
    "Ler sozinha vs Ler em comunidade",
  ],
  "passo-a-passo": [
    "Como funciona a experiência de leitura (passo a passo)",
    "3 formas de começar a tua jornada",
    "O caminho de Sara — do capítulo 1 ao espelho",
    "Do teste gratuito à jornada completa",
  ],
};

const postFormats: Record<PostStyle, { titleTemplate: string; bodyTemplate: string }[]> = {
  citacao: [
    {
      titleTemplate: "Uma mulher descobre, no meio de uma manhã igual a todas as outras, que construiu uma vida inteira sem nunca ter perguntado o que queria.",
      bodyTemplate: "— O Espelho da Ilusão, Prefácio\n\nseteveus.space\n\n#OsSeteVéus #EspelhoDaIlusão",
    },
    {
      titleTemplate: "A ilusão mais perigosa é acreditar que escolheste quando apenas repetiste.",
      bodyTemplate: "— O Espelho da Ilusão\n\nUma experiência de leitura que te convida a parar. E a perguntar.\n\nseteveus.space",
    },
    {
      titleTemplate: "Sabes o que queres. Mas o medo decide antes de ti.",
      bodyTemplate: "— O Espelho do Medo (Março 2026)\n\nseteveus.space/experiencias",
    },
  ],
  reflexao: [
    {
      titleTemplate: "Escrevi o Espelho da Ilusão num período em que eu própria vivia no automático.",
      bodyTemplate: "Não sabia que estava a escrever sobre mim. Pensava que era ficção.\n\nMas a Sara e eu temos mais em comum do que eu queria admitir.\n\nseteveus.space",
    },
    {
      titleTemplate: "Quando comecei a escrever, não sabia que estava a despir-me.",
      bodyTemplate: "Cada capítulo que escrevi revelou algo que eu não queria ver.\n\nAgora é a tua vez de olhar.\n\nseteveus.space",
    },
  ],
  testemunho: [
    {
      titleTemplate: "\"Não é um livro que se lê — é um livro que se vive.\"",
      bodyTemplate: "— Carla S., Lisboa\n\nseteveus.space/experiencias",
    },
    {
      titleTemplate: "\"O diário de reflexão mudou a forma como leio.\"",
      bodyTemplate: "— Ana M., Maputo\n\nseteveus.space/experiencias",
    },
    {
      titleTemplate: "\"Comecei pelo teste gratuito. Acabei por comprar nesse dia.\"",
      bodyTemplate: "— Beatriz L., São Paulo\n\nseteveus.space/recursos/teste",
    },
  ],
  pergunta: [
    {
      titleTemplate: "Se pudesses mudar uma coisa na tua vida, mudarias?",
      bodyTemplate: "Responde nos comentários. Sem julgamento. Só honestidade.\n\nseteveus.space",
    },
    {
      titleTemplate: "Quando foi a última vez que fizeste algo só para ti?",
      bodyTemplate: "Sem justificação. Sem culpa. Só para ti.\n\nseteveus.space",
    },
  ],
};

const polls = [
  { question: "Já te sentiste a viver no automático?", options: ["Sim, muitas vezes", "Não, nunca"] },
  { question: "Se pudesses mudar uma coisa na tua vida, mudarias?", options: ["Sim", "Estou bem assim"] },
  { question: "Já tentaste explicar um vazio que ninguém vê?", options: ["Sim", "Não me identifico"] },
  { question: "O que te faz mais falta?", options: ["Tempo para mim", "Clareza interior"] },
  { question: "Já escreveste sobre ti mesma esta semana?", options: ["Sim", "Não, mas quero"] },
  { question: "Preferes reflexões guiadas ou livres?", options: ["Guiadas", "Livres"] },
  { question: "Qual destas te descreve melhor agora?", options: ["Cansada", "À procura"] },
  { question: "Acreditas que podes mudar?", options: ["Sim, mas tenho medo", "Já estou a mudar"] },
];

const storiesTestemunhos = [
  "\"Não é um livro que se lê — é um livro que se vive.\" — Carla S., Lisboa",
  "\"O diário de reflexão mudou a forma como leio.\" — Ana M., Maputo",
  "\"Comecei pelo teste gratuito. Acabei por comprar nesse dia.\" — Beatriz L., São Paulo",
  "\"As pausas entre capítulos são tão importantes quanto as palavras.\" — Carla S.",
  "\"Nunca pensei que um livro me fizesse parar e escrever sobre mim mesma.\" — Ana M.",
  "\"Chorei no capítulo 5. Não de tristeza. De reconhecimento.\" — Ana M., Maputo",
];

const ctas = [
  "Teste gratuito na bio — descobre qual espelho te esconde",
  "Link na bio — recursos gratuitos para ti",
  "seteveus.space — começa a tua jornada",
  "Testa qual espelho te esconde — link na bio",
  "Descarrega o diário de 7 dias — link na bio",
];

const hashtags = [
  "#autoconhecimento", "#ossetevéus", "#ficçãopsicológica",
  "#desenvolvimentopessoal", "#mulheresqueseescolhem", "#vivercomverdade",
  "#reflexão", "#leituraquetransforma", "#moçambique",
  "#viviannesantos", "#crescimentopessoal", "#bookstagram",
];

const broadcastTemplates: Record<MonthArc, string[]> = {
  despertar: [
    "Olá! Preparei um conteúdo novo esta semana sobre os sinais de que vivemos no automático.\n\nSe te identificas, há um teste gratuito que pode revelar algo importante:\nseteveus.space/recursos/teste\n\n~ Vivianne",
    "Queria partilhar algo contigo.\n\nÀs vezes a vida que temos não é a vida que escolhemos. E tudo bem admitir isso.\n\nHá recursos gratuitos para ti:\nseteveus.space/recursos\n\n~ Vivianne",
  ],
  explorar: [
    "Esta semana partilhei um excerto do Espelho da Ilusão no Instagram.\n\nSe queres saber mais sobre a experiência de leitura:\nseteveus.space/experiencias\n\n~ Vivianne",
    "Escrevi sobre o poder de parar e escrever sobre nós mesmas.\n\nO diário de 7 dias é gratuito:\nseteveus.space/recursos\n\n~ Vivianne",
  ],
  sentir: [
    "Uma leitora disse-me algo que me parou:\n\"Chorei no capítulo 5. Não de tristeza. De reconhecimento.\"\n\nSe queres saber o que ela encontrou:\nseteveus.space/experiencias\n\n~ Vivianne",
    "As vozes da comunidade Ecos estão a crescer. E cada vez mais íntimas.\n\nSe quiseres juntar-te:\nseteveus.space/comunidade\n\n~ Vivianne",
  ],
  escolher: [
    "Lembrete gentil: o teste de autoconhecimento é gratuito e leva 3 minutos.\n\nseteveus.space/recursos/teste\n\nSem compromisso. Só curiosidade.\n\n~ Vivianne",
    "Se tens o livro físico, sabes que tens acesso gratuito à plataforma digital?\n\nRegista-te aqui:\nseteveus.space/acesso-digital\n\n~ Vivianne",
  ],
};

// ─── VISUAL GUIDES ──────────────────────────────────────────────────────────

const visualGuides: Record<string, VisualGuide> = {
  reel: {
    background: "#3d3630 (brown-900) ou #f7f5f0 (cream) — alternar",
    textColor: "#f7f5f0 (cream) em fundo escuro / #3d3630 em fundo claro",
    accentColor: "#7a8c6e (sage) para CTA, #c9b896 (gold) para separadores",
    font: "Playfair Display para frase, Inter uppercase para CTA",
    dimensions: "1080 x 1920 px (9:16)",
    layout: "Logo top-left (40px, 60% opacity). Frase centrada. CTA em baixo.",
  },
  carrossel: {
    background: "Slide 1: #3d3630. Intermédios: #f7f5f0. Último: #ebe7df",
    textColor: "Slide 1: #f7f5f0. Intermédios: #3d3630. Último: #7a8c6e",
    accentColor: "#c9b896 para numeração, #7a8c6e para CTA final",
    font: "Playfair Display para títulos, Inter para corpo",
    dimensions: "1080 x 1080 px (1:1)",
    layout: "Slide 1: gancho. 3-5 slides: conteúdo. Último: CTA sage.",
  },
  "post-single": {
    background: "#3d3630 (citação escura) ou #ebe7df (reflexão quente)",
    textColor: "#f7f5f0 ou #4a433b conforme fundo",
    accentColor: "#c9b896 (gold) para aspas e separadores",
    font: "Playfair Display para frase principal, Inter para contexto",
    dimensions: "1080 x 1080 px (1:1)",
    layout: "Frase centrada. Fonte grande. Espaço a respirar. Logo discreto.",
  },
  "stories-poll": {
    background: "#f7f5f0 (cream) — fundo claro para legibilidade",
    textColor: "#3d3630 (brown-900)",
    accentColor: "#7a8c6e (sage) para botões",
    font: "Inter para pergunta, Playfair Display para contexto",
    dimensions: "1080 x 1920 px (9:16)",
    layout: "Pergunta centrada. Poll nativa. Sticker de link em baixo.",
  },
  "stories-testemunho": {
    background: "#ebe7df (cream-dark) — fundo quente",
    textColor: "#4a433b (brown-800)",
    accentColor: "#c9b896 (gold) para aspas",
    font: "Playfair Display italic para citação, Inter para nome",
    dimensions: "1080 x 1920 px (9:16)",
    layout: "Aspas douradas. Citação centrada. Nome em baixo. Link sticker.",
  },
  "stories-bastidores": {
    background: "Foto real ou vídeo — sem template",
    textColor: "Branco com sombra para legibilidade",
    accentColor: "N/A — autenticidade",
    font: "Texto nativo do Instagram Stories",
    dimensions: "1080 x 1920 px (9:16)",
    layout: "Foto/video real + texto overlay simples. Sem overdesign.",
  },
  broadcast: {
    background: "N/A — texto simples WhatsApp",
    textColor: "N/A",
    accentColor: "N/A",
    font: "Texto simples — sem formatação",
    dimensions: "N/A",
    layout: "Max 4 frases. Link no final. Tom pessoal.",
  },
  "status-whatsapp": {
    background: "Reutilizar frame do reel ou imagem do post",
    textColor: "Mesmo que Instagram ou texto nativo",
    accentColor: "N/A",
    font: "Texto nativo WhatsApp ou imagem Instagram",
    dimensions: "1080 x 1920 px ou texto",
    layout: "Preferir texto simples — é mais íntimo.",
  },
  engagement: {
    background: "N/A",
    textColor: "N/A",
    accentColor: "N/A",
    font: "N/A",
    dimensions: "N/A",
    layout: "Responder DMs, comentar em posts, agradecer partilhas.",
  },
  descanso: {
    background: "N/A",
    textColor: "N/A",
    accentColor: "N/A",
    font: "N/A",
    dimensions: "N/A",
    layout: "Descanso. Nada de publicar.",
  },
};

// ─── HELPERS ────────────────────────────────────────────────────────────────

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

function getArc(weekInMonth: number): MonthArc {
  const arcs: MonthArc[] = ["despertar", "explorar", "sentir", "escolher"];
  return arcs[weekInMonth % 4];
}

const reelStyles: ReelStyle[] = ["talking-head", "texto-musica", "screen-recording", "storytelling"];
const carouselStyles: CarouselStyle[] = ["educativo", "citacoes", "comparacao", "passo-a-passo"];
const postStyles: PostStyle[] = ["citacao", "reflexao", "testemunho", "pergunta"];

// ─── GENERATOR ──────────────────────────────────────────────────────────────

export function generateWeekPlan(weekOffset: number = 0): WeekPlan {
  const now = new Date();
  now.setDate(now.getDate() + weekOffset * 7);

  const dayOfWeek = now.getDay();
  const mondayOffset = dayOfWeek === 0 ? 1 : dayOfWeek === 1 ? 0 : 8 - dayOfWeek;
  const monday = new Date(now);
  monday.setDate(monday.getDate() + mondayOffset);

  const weekNum = getWeekNumber(monday);
  const seed = weekNum + monday.getFullYear() * 100;
  const weekInMonth = (weekNum - 1) % 4;
  const arc = getArc(weekInMonth);

  const theme = pick(arcThemes[arc], seed);

  // Rotate format variants per week
  const reelStyle = pick(reelStyles, seed);
  const carouselStyle = pick(carouselStyles, seed + 1);
  const postStyle = pick(postStyles, seed + 2);

  const weekCta = pick(ctas, seed);
  const weekHook = pick(reelHooks[arc], seed);
  const weekPoll = pick(polls, seed + 1);
  const weekTestemunho = pick(storiesTestemunhos, seed + 2);

  const carouselTopic = pick(carouselTopics[carouselStyle], seed + 3);
  const postContent = pick(postFormats[postStyle], seed + 4);

  const reelCaption = pick(reelCaptions[reelStyle], seed + 5).replace("{cta}", weekCta);
  const broadcastMsg = pick(broadcastTemplates[arc], seed + 6);

  const reelStyleLabels: Record<ReelStyle, string> = {
    "talking-head": "Falar para câmara, 15-30s. Olhar directo, tom íntimo.",
    "texto-musica": "Texto animado sobre fundo. Piano/lo-fi. Sem aparecer.",
    "screen-recording": "Gravar ecrã do telemóvel mostrando a plataforma.",
    storytelling: "Narrar uma história (Sara, Helena). Voz off ou texto.",
  };

  const carouselStyleLabels: Record<CarouselStyle, string> = {
    educativo: "5-7 slides numerados. Gancho forte no 1o. CTA no último.",
    citacoes: "5 slides com excertos do livro. Fundo alternado claro/escuro.",
    comparacao: "5 slides antes/depois ou lado-a-lado. Visual contrastante.",
    "passo-a-passo": "5-7 slides guia. Prints reais da plataforma.",
  };

  const templates: ContentTemplate[] = [
    // ── SEGUNDA: REEL ──
    {
      id: `${formatDate(monday)}-seg-reel`,
      day: "seg",
      dayLabel: "Segunda-feira",
      type: "reel",
      typeLabel: `Reel (${reelStyle})`,
      platform: "ambos",
      duration: "30 min",
      title: `Reel: ${theme}`,
      hook: weekHook,
      caption: reelCaption,
      hashtags: pickN(hashtags, 6, seed),
      cta: weekCta,
      pillar: arc,
      notes: `FORMATO: ${reelStyle}\n${reelStyleLabels[reelStyle]}\n\nHOOK (3 primeiros segundos): "${weekHook}"\n\nWA STATUS: Reutilizar frame do reel ou criar imagem com a frase do hook.`,
      visual: visualGuides.reel,
      formatVariant: reelStyle,
    },
    // ── TERCA: STORIES ──
    {
      id: `${formatDate(monday)}-ter-stories`,
      day: "ter",
      dayLabel: "Terça-feira",
      type: "stories-poll",
      typeLabel: "Stories (poll + interacção)",
      platform: "instagram",
      duration: "10 min",
      title: `Stories: ${weekPoll.question}`,
      hook: weekPoll.question,
      caption: "",
      hashtags: [],
      cta: `Opções: ${weekPoll.options.join(" vs ")}`,
      pillar: "comunidade",
      notes: `STORY 1: Pergunta com Poll nativa\n"${weekPoll.question}"\nOpções: ${weekPoll.options.join(" | ")}\n\nSTORY 2: Frase de contexto ou excerto curto do livro\n\nSTORY 3 (após resultado): "X% disse [opção]. E tu?"\nCom sticker de link para o teste gratuito.\n\nSEM publicação de feed hoje. Só stories.`,
      visual: visualGuides["stories-poll"],
    },
    // ── QUARTA: CARROSSEL ──
    {
      id: `${formatDate(monday)}-qua-carrossel`,
      day: "qua",
      dayLabel: "Quarta-feira",
      type: "carrossel",
      typeLabel: `Carrossel (${carouselStyle})`,
      platform: "ambos",
      duration: "30 min",
      title: `Carrossel: ${carouselTopic}`,
      hook: carouselTopic,
      caption: `${carouselTopic}\n\nSwipe para ler.\n\n${weekCta}\n\n${pickN(hashtags, 8, seed + 10).join(" ")}`,
      hashtags: pickN(hashtags, 8, seed + 10),
      cta: weekCta,
      pillar: arc,
      notes: `FORMATO: ${carouselStyle}\n${carouselStyleLabels[carouselStyle]}\n\nTEMA: "${carouselTopic}"\n\nWA BROADCAST:\n${broadcastMsg}`,
      visual: visualGuides.carrossel,
      formatVariant: carouselStyle,
    },
    // ── QUINTA: STORIES ──
    {
      id: `${formatDate(monday)}-qui-stories`,
      day: "qui",
      dayLabel: "Quinta-feira",
      type: "stories-testemunho",
      typeLabel: "Stories (testemunho + bastidores)",
      platform: "instagram",
      duration: "10 min",
      title: "Stories: Testemunho + bastidores",
      hook: weekTestemunho,
      caption: "",
      hashtags: [],
      cta: weekCta,
      pillar: "comunidade",
      notes: `STORY 1: Testemunho de leitora\n${weekTestemunho}\nFundo quente (#ebe7df). Fonte serif. Aspas douradas.\n\nSTORY 2: Bastidores (foto real)\nMostrar o espaço de escrita, o computador, um chá, o caderno.\nTexto simples: "A escrever..." ou "A preparar o próximo espelho."\n\nSTORY 3 (opcional): Sticker link para teste gratuito.\n\nSEM publicação de feed hoje. Só stories.`,
      visual: visualGuides["stories-testemunho"],
    },
    // ── SEXTA: POST SINGLE ──
    {
      id: `${formatDate(monday)}-sex-post`,
      day: "sex",
      dayLabel: "Sexta-feira",
      type: "post-single",
      typeLabel: `Post (${postStyle})`,
      platform: "ambos",
      duration: "20 min",
      title: postContent.titleTemplate.substring(0, 60) + (postContent.titleTemplate.length > 60 ? "..." : ""),
      hook: postContent.titleTemplate,
      caption: `${postContent.titleTemplate}\n\n${postContent.bodyTemplate}`,
      hashtags: pickN(hashtags, 6, seed + 20),
      cta: weekCta,
      pillar: arc,
      notes: `FORMATO: ${postStyle}\nImagem single com frase forte.\n\nTÍTULO na imagem: "${postContent.titleTemplate}"\n\nLEGENDA: Texto longo na legenda, não na imagem.\n\nWA STATUS: Reutilizar a imagem do post.`,
      visual: visualGuides["post-single"],
      formatVariant: postStyle,
    },
    // ── SABADO: ENGAGEMENT ──
    {
      id: `${formatDate(monday)}-sab-engagement`,
      day: "sab",
      dayLabel: "Sábado",
      type: "engagement",
      typeLabel: "Engagement (sem feed)",
      platform: "ambos",
      duration: "15 min",
      title: "Responder e interagir",
      hook: "",
      caption: "",
      hashtags: [],
      cta: "",
      pillar: "comunidade",
      notes: "Responder DMs Instagram.\nResponder mensagens WhatsApp.\nComentar em 5-10 posts de seguidoras.\nAgradecer quem partilhou conteúdo.\n\nSEM publicação de feed. Opcional: 1 story pessoal.",
      visual: visualGuides.engagement,
    },
    // ── DOMINGO: DESCANSO ──
    {
      id: `${formatDate(monday)}-dom-descanso`,
      day: "dom",
      dayLabel: "Domingo",
      type: "descanso",
      typeLabel: "Descanso + planeamento",
      platform: "ambos",
      duration: "15 min",
      title: "Planear próxima semana",
      hook: "",
      caption: "",
      hashtags: [],
      cta: "",
      pillar: "planeamento",
      notes: "Rever métricas da semana (Instagram Insights).\nAnotar o que funcionou.\nPreparar legendas e stories da próxima semana.\nPré-gravar reel se possível.\n\nDescanso. Nada de publicar.",
      visual: visualGuides.descanso,
    },
  ];

  return {
    weekNumber: weekNum,
    theme: `${arc.toUpperCase()} — ${theme}`,
    arc,
    startDate: formatDate(monday),
    templates,
    totalMinutes: 130,
  };
}

export function generateMonthPlan(monthOffset: number = 0): WeekPlan[] {
  return Array.from({ length: 4 }, (_, i) =>
    generateWeekPlan(monthOffset * 4 + i)
  );
}
