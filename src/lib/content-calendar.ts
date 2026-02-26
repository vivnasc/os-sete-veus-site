/**
 * Estrategia de Marketing "Os Sete Veus"
 * ────────────────────────────────────────
 *
 * PRINCIPIO: O marketing deve sentir-se como o produto — intimo, reflectivo, nunca apressado.
 *
 * RITMO SEMANAL (3 publicacoes feed + stories + WhatsApp):
 *
 *   Seg  →  REEL (alcance/descoberta) + WA Status
 *   Ter  →  STORIES apenas (poll/pergunta/interaccao)
 *   Qua  →  CARROSSEL (valor/educacao/saves) + WA Broadcast
 *   Qui  →  STORIES apenas (testemunho/eco/bastidores)
 *   Sex  →  POST SINGLE (profundidade/conversao) + WA Status
 *   Sab  →  Engagement (responder DMs) ou descanso
 *   Dom  →  Descanso / planeamento
 *
 * ARCO MENSAL (4 semanas):
 *   Sem 1: DESPERTAR  — "Reconheces-te?" — ganchos emocionais, perguntas
 *   Sem 2: EXPLORAR   — "Ha algo para ti" — valor, educacao, excertos
 *   Sem 3: SENTIR     — "Nao estas sozinha" — comunidade, testemunhos
 *   Sem 4: ESCOLHER   — "Quando estiveres pronta" — convite, recursos, CTA
 *
 * FORMATOS ROTATIVOS (nunca o mesmo formato 2 semanas seguidas):
 *   Reel:      talking head / texto+musica / screen recording / storytelling
 *   Carrossel: educativo / citacoes / comparacao / passo-a-passo
 *   Post:      citacao longa / reflexao pessoal / testemunho / pergunta aberta
 *
 * WHATSAPP (canal separado — intimo e pessoal):
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
    "A vida que nao escolheste",
    "O automatico confortavel",
    "Quando tudo parece bem mas nao esta",
    "O vazio que ninguem ve",
  ],
  explorar: [
    "O poder de parar e escrever",
    "Um espelho de cada vez",
    "A leitura que te faz perguntas",
    "Cada capitulo e uma camada que soltas",
  ],
  sentir: [
    "As vozes encontram-se aqui",
    "Nao estas sozinha nisto",
    "O que dizem quem ja comecou",
    "Ecos de quem se reconheceu",
  ],
  escolher: [
    "Quando estiveres pronta",
    "Comeca sem pagar nada",
    "A tua jornada ao teu ritmo",
    "Sem pressa. Sem formula. Sem prazo.",
  ],
};

const reelHooks: Record<MonthArc, string[]> = {
  despertar: [
    "Quantas vezes fizeste algo so porque era esperado?",
    "A vida que funciona nem sempre e a vida que te preenche.",
    "Se tudo na tua vida esta \"bem\"... porque sentes que falta algo?",
    "Ha uma diferenca entre viver e funcionar.",
    "Quando foi a ultima vez que paraste para te ouvir?",
    "E se o que chamas de \"a tua vida\" nao foi escolhido por ti?",
    "O automatico e confortavel — ate deixar de ser.",
    "Ja tentaste explicar um vazio que ninguem ve?",
  ],
  explorar: [
    "Um espelho de cada vez. Sem pressa.",
    "A leitura que te muda nao e a que te da respostas.",
    "Reflectir e um acto de coragem silencioso.",
    "Ha verdades que so se revelam quando paramos para escrever.",
    "Cada capitulo e uma camada que soltas.",
    "As palavras que escreves sobre ti mesma sao as mais importantes.",
    "Autoconhecimento nao e teoria — e pratica diaria.",
    "O espelho mais honesto e o que construimos com as nossas palavras.",
  ],
  sentir: [
    "\"Chorei no capitulo 5. Nao de tristeza. De reconhecimento.\"",
    "\"Nunca pensei que um livro me fizesse parar e escrever sobre mim.\"",
    "\"Comecei pelo teste gratuito. Acabei por comprar nesse dia.\"",
    "\"As pausas entre capitulos sao tao importantes quanto as palavras.\"",
    "Uma leitora disse-me algo que me parou.",
    "Nao sou a unica a sentir isto. E tu tambem nao.",
    "Quando partilhamos o que sentimos, algo muda.",
    "O eco mais forte e o que vem de quem se reconheceu.",
  ],
  escolher: [
    "Ha um teste gratuito que te mostra qual espelho te esconde.",
    "7 recursos gratuitos para quem quer comecar a escolher-se.",
    "Comeca sem pagar nada. O primeiro passo e sempre gratis.",
    "O teste leva 3 minutos. O que descobres pode mudar a tua semana.",
    "Experimenta antes de te comprometeres. O teste e gratuito.",
    "Nao precisas de justificar a tua vontade de mudar.",
    "Podes querer mais. Nao e ingratidao — e honestidade.",
    "Dar-te permissao e o primeiro acto de coragem.",
  ],
};

const reelCaptions: Record<ReelStyle, string[]> = {
  "talking-head": [
    "Construi uma vida que fazia sentido para toda a gente — menos para mim.\n\nFoi quando percebi que nao era ingratidao. Era intuicao.\n\n{cta}",
    "Nao e sobre mudar tudo de um dia para o outro.\nE sobre parar e perguntar: isto e meu?\n\n{cta}",
    "Ha uma diferenca entre a vida que construiste e a vida que escolheste.\n\nEsta pergunta mudou tudo para mim.\n\n{cta}",
  ],
  "texto-musica": [
    "As palavras aparecem. O silencio fala.\n\nSe isto te tocou, guarda e partilha com quem precisa de ouvir.\n\n{cta}",
    "Nao precisa de voz. As letras bastam.\n\nGuarda este reel. Volta a ele quando precisares.\n\n{cta}",
  ],
  "screen-recording": [
    "Por dentro da experiencia Os Sete Veus.\n\nNao e um livro que se le. E uma experiencia que se vive.\n\nLeitura integrada. Respiracao guiada. Diario pessoal.\n\n{cta}",
    "Mostra-te por dentro como funciona.\n\nUma experiencia de leitura diferente de tudo o que ja viste.\n\n{cta}",
  ],
  storytelling: [
    "Sara acordou numa manha igual a todas as outras. Mas desta vez, perguntou.\n\n\"Quando foi que escolhi esta vida?\"\n\n{cta}",
    "A mae sempre viu. Esperou anos.\nAgora que Sara acordou, Helena tem algo para lhe dizer.\n\n{cta}",
  ],
};

const carouselTopics: Record<CarouselStyle, string[]> = {
  educativo: [
    "5 sinais de que vives no piloto automatico",
    "7 verdades sobre autoconhecimento que ninguem te diz",
    "O que acontece quando paras para te ouvir",
    "3 perguntas que mudam a forma como te ves",
  ],
  citacoes: [
    "5 frases do Espelho da Ilusao que te vao parar",
    "O que Sara descobriu em 7 capitulos",
    "Palavras que ficam depois de ler",
    "Frases que as leitoras mais sublinharam",
  ],
  comparacao: [
    "Livro fisico vs Experiencia digital",
    "Espelhos vs Nos — duas coleccoes, uma jornada",
    "Antes vs Depois de tirar o espelho",
    "Ler sozinha vs Ler em comunidade",
  ],
  "passo-a-passo": [
    "Como funciona a experiencia de leitura (passo a passo)",
    "3 formas de comecar a tua jornada",
    "O caminho de Sara — do capitulo 1 ao espelho",
    "Do teste gratuito a jornada completa",
  ],
};

const postFormats: Record<PostStyle, { titleTemplate: string; bodyTemplate: string }[]> = {
  citacao: [
    {
      titleTemplate: "Uma mulher descobre, no meio de uma manha igual a todas as outras, que construiu uma vida inteira sem nunca ter perguntado o que queria.",
      bodyTemplate: "— O Espelho da Ilusao, Prefacio\n\nseteveus.space\n\n#OsSeteVeus #EspelhoDaIlusao",
    },
    {
      titleTemplate: "A ilusao mais perigosa e acreditar que escolheste quando apenas repetiste.",
      bodyTemplate: "— O Espelho da Ilusao\n\nUma experiencia de leitura que te convida a parar. E a perguntar.\n\nseteveus.space",
    },
    {
      titleTemplate: "Sabes o que queres. Mas o medo decide antes de ti.",
      bodyTemplate: "— O Espelho do Medo (Marco 2026)\n\nseteveus.space/experiencias",
    },
  ],
  reflexao: [
    {
      titleTemplate: "Escrevi o Espelho da Ilusao num periodo em que eu propria vivia no automatico.",
      bodyTemplate: "Nao sabia que estava a escrever sobre mim. Pensava que era ficcao.\n\nMas a Sara e eu temos mais em comum do que eu queria admitir.\n\nseteveus.space",
    },
    {
      titleTemplate: "Quando comecei a escrever, nao sabia que estava a despir-me.",
      bodyTemplate: "Cada capitulo que escrevi revelou algo que eu nao queria ver.\n\nAgora e a tua vez de olhar.\n\nseteveus.space",
    },
  ],
  testemunho: [
    {
      titleTemplate: "\"Nao e um livro que se le — e um livro que se vive.\"",
      bodyTemplate: "— Carla S., Lisboa\n\nseteveus.space/experiencias",
    },
    {
      titleTemplate: "\"O diario de reflexao mudou a forma como leio.\"",
      bodyTemplate: "— Ana M., Maputo\n\nseteveus.space/experiencias",
    },
    {
      titleTemplate: "\"Comecei pelo teste gratuito. Acabei por comprar nesse dia.\"",
      bodyTemplate: "— Beatriz L., Sao Paulo\n\nseteveus.space/recursos/teste",
    },
  ],
  pergunta: [
    {
      titleTemplate: "Se pudesses mudar uma coisa na tua vida, mudarias?",
      bodyTemplate: "Responde nos comentarios. Sem julgamento. So honestidade.\n\nseteveus.space",
    },
    {
      titleTemplate: "Quando foi a ultima vez que fizeste algo so para ti?",
      bodyTemplate: "Sem justificacao. Sem culpa. So para ti.\n\nseteveus.space",
    },
  ],
};

const polls = [
  { question: "Ja te sentiste a viver no automatico?", options: ["Sim, muitas vezes", "Nao, nunca"] },
  { question: "Se pudesses mudar uma coisa na tua vida, mudarias?", options: ["Sim", "Estou bem assim"] },
  { question: "Ja tentaste explicar um vazio que ninguem ve?", options: ["Sim", "Nao me identifico"] },
  { question: "O que te faz mais falta?", options: ["Tempo para mim", "Clareza interior"] },
  { question: "Ja escreveste sobre ti mesma esta semana?", options: ["Sim", "Nao, mas quero"] },
  { question: "Preferes reflexoes guiadas ou livres?", options: ["Guiadas", "Livres"] },
  { question: "Qual destas te descreve melhor agora?", options: ["Cansada", "A procura"] },
  { question: "Acreditas que podes mudar?", options: ["Sim, mas tenho medo", "Ja estou a mudar"] },
];

const storiesTestemunhos = [
  "\"Nao e um livro que se le — e um livro que se vive.\" — Carla S., Lisboa",
  "\"O diario de reflexao mudou a forma como leio.\" — Ana M., Maputo",
  "\"Comecei pelo teste gratuito. Acabei por comprar nesse dia.\" — Beatriz L., Sao Paulo",
  "\"As pausas entre capitulos sao tao importantes quanto as palavras.\" — Carla S.",
  "\"Nunca pensei que um livro me fizesse parar e escrever sobre mim mesma.\" — Ana M.",
  "\"Chorei no capitulo 5. Nao de tristeza. De reconhecimento.\" — Ana M., Maputo",
];

const ctas = [
  "Teste gratuito na bio — descobre qual espelho te esconde",
  "Link na bio — recursos gratuitos para ti",
  "seteveus.space — comeca a tua jornada",
  "Testa qual espelho te esconde — link na bio",
  "Descarrega o diario de 7 dias — link na bio",
];

const hashtags = [
  "#autoconhecimento", "#osseteveus", "#ficcaopsicologica",
  "#desenvolvimentopessoal", "#mulheresqueseescolhem", "#vivercomverdade",
  "#reflexao", "#leituraquetransforma", "#mocambique",
  "#viviannesantos", "#crescimentopessoal", "#bookstagram",
];

const broadcastTemplates: Record<MonthArc, string[]> = {
  despertar: [
    "Ola! Preparei um conteudo novo esta semana sobre os sinais de que vivemos no automatico.\n\nSe te identificas, ha um teste gratuito que pode revelar algo importante:\nseteveus.space/recursos/teste\n\n~ Vivianne",
    "Queria partilhar algo contigo.\n\nAs vezes a vida que temos nao e a vida que escolhemos. E tudo bem admitir isso.\n\nHa recursos gratuitos para ti:\nseteveus.space/recursos\n\n~ Vivianne",
  ],
  explorar: [
    "Esta semana partilhei um excerto do Espelho da Ilusao no Instagram.\n\nSe queres saber mais sobre a experiencia de leitura:\nseteveus.space/experiencias\n\n~ Vivianne",
    "Escrevi sobre o poder de parar e escrever sobre nos mesmas.\n\nO diario de 7 dias e gratuito:\nseteveus.space/recursos\n\n~ Vivianne",
  ],
  sentir: [
    "Uma leitora disse-me algo que me parou:\n\"Chorei no capitulo 5. Nao de tristeza. De reconhecimento.\"\n\nSe queres saber o que ela encontrou:\nseteveus.space/experiencias\n\n~ Vivianne",
    "As vozes da comunidade Ecos estao a crescer. E cada vez mais intimas.\n\nSe quiseres juntar-te:\nseteveus.space/comunidade\n\n~ Vivianne",
  ],
  escolher: [
    "Lembrete gentil: o teste de autoconhecimento e gratuito e leva 3 minutos.\n\nseteveus.space/recursos/teste\n\nSem compromisso. So curiosidade.\n\n~ Vivianne",
    "Se tens o livro fisico, sabes que tens acesso gratuito a plataforma digital?\n\nRegista-te aqui:\nseteveus.space/acesso-digital\n\n~ Vivianne",
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
    background: "Slide 1: #3d3630. Intermedios: #f7f5f0. Ultimo: #ebe7df",
    textColor: "Slide 1: #f7f5f0. Intermedios: #3d3630. Ultimo: #7a8c6e",
    accentColor: "#c9b896 para numeracao, #7a8c6e para CTA final",
    font: "Playfair Display para titulos, Inter para corpo",
    dimensions: "1080 x 1080 px (1:1)",
    layout: "Slide 1: gancho. 3-5 slides: conteudo. Ultimo: CTA sage.",
  },
  "post-single": {
    background: "#3d3630 (citacao escura) ou #ebe7df (reflexao quente)",
    textColor: "#f7f5f0 ou #4a433b conforme fundo",
    accentColor: "#c9b896 (gold) para aspas e separadores",
    font: "Playfair Display para frase principal, Inter para contexto",
    dimensions: "1080 x 1080 px (1:1)",
    layout: "Frase centrada. Fonte grande. Espaco a respirar. Logo discreto.",
  },
  "stories-poll": {
    background: "#f7f5f0 (cream) — fundo claro para legibilidade",
    textColor: "#3d3630 (brown-900)",
    accentColor: "#7a8c6e (sage) para botoes",
    font: "Inter para pergunta, Playfair Display para contexto",
    dimensions: "1080 x 1920 px (9:16)",
    layout: "Pergunta centrada. Poll nativa. Sticker de link em baixo.",
  },
  "stories-testemunho": {
    background: "#ebe7df (cream-dark) — fundo quente",
    textColor: "#4a433b (brown-800)",
    accentColor: "#c9b896 (gold) para aspas",
    font: "Playfair Display italic para citacao, Inter para nome",
    dimensions: "1080 x 1920 px (9:16)",
    layout: "Aspas douradas. Citacao centrada. Nome em baixo. Link sticker.",
  },
  "stories-bastidores": {
    background: "Foto real ou video — sem template",
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
    font: "Texto simples — sem formatacao",
    dimensions: "N/A",
    layout: "Max 4 frases. Link no final. Tom pessoal.",
  },
  "status-whatsapp": {
    background: "Reutilizar frame do reel ou imagem do post",
    textColor: "Mesmo que Instagram ou texto nativo",
    accentColor: "N/A",
    font: "Texto nativo WhatsApp ou imagem Instagram",
    dimensions: "1080 x 1920 px ou texto",
    layout: "Preferir texto simples — e mais intimo.",
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
    "talking-head": "Falar para camara, 15-30s. Olhar directo, tom intimo.",
    "texto-musica": "Texto animado sobre fundo. Piano/lo-fi. Sem aparecer.",
    "screen-recording": "Gravar ecra do telemovel mostrando a plataforma.",
    storytelling: "Narrar uma historia (Sara, Helena). Voz off ou texto.",
  };

  const carouselStyleLabels: Record<CarouselStyle, string> = {
    educativo: "5-7 slides numerados. Gancho forte no 1o. CTA no ultimo.",
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
      dayLabel: "Terca-feira",
      type: "stories-poll",
      typeLabel: "Stories (poll + interaccao)",
      platform: "instagram",
      duration: "10 min",
      title: `Stories: ${weekPoll.question}`,
      hook: weekPoll.question,
      caption: "",
      hashtags: [],
      cta: `Opcoes: ${weekPoll.options.join(" vs ")}`,
      pillar: "comunidade",
      notes: `STORY 1: Pergunta com Poll nativa\n"${weekPoll.question}"\nOpcoes: ${weekPoll.options.join(" | ")}\n\nSTORY 2: Frase de contexto ou excerto curto do livro\n\nSTORY 3 (apos resultado): "X% disse [opcao]. E tu?"\nCom sticker de link para o teste gratuito.\n\nSEM publicacao de feed hoje. So stories.`,
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
      notes: `STORY 1: Testemunho de leitora\n${weekTestemunho}\nFundo quente (#ebe7df). Fonte serif. Aspas douradas.\n\nSTORY 2: Bastidores (foto real)\nMostrar o espaco de escrita, o computador, um cha, o caderno.\nTexto simples: "A escrever..." ou "A preparar o proximo espelho."\n\nSTORY 3 (opcional): Sticker link para teste gratuito.\n\nSEM publicacao de feed hoje. So stories.`,
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
      notes: `FORMATO: ${postStyle}\nImagem single com frase forte.\n\nTITULO na imagem: "${postContent.titleTemplate}"\n\nLEGENDA: Texto longo na legenda, nao na imagem.\n\nWA STATUS: Reutilizar a imagem do post.`,
      visual: visualGuides["post-single"],
      formatVariant: postStyle,
    },
    // ── SABADO: ENGAGEMENT ──
    {
      id: `${formatDate(monday)}-sab-engagement`,
      day: "sab",
      dayLabel: "Sabado",
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
      notes: "Responder DMs Instagram.\nResponder mensagens WhatsApp.\nComentar em 5-10 posts de seguidoras.\nAgradecer quem partilhou conteudo.\n\nSEM publicacao de feed. Opcional: 1 story pessoal.",
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
      title: "Planear proxima semana",
      hook: "",
      caption: "",
      hashtags: [],
      cta: "",
      pillar: "planeamento",
      notes: "Rever metricas da semana (Instagram Insights).\nAnotar o que funcionou.\nPreparar legendas e stories da proxima semana.\nPre-gravar reel se possivel.\n\nDescanso. Nada de publicar.",
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
