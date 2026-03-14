/**
 * Calendario YouTube — A Escola dos Veus
 * ────────────────────────────────────────
 * 4 semanas | 12 videos | 3 por semana (Terca, Quinta, Sabado)
 *
 * Horario: 18h Maputo / 15h Lisboa / 13h Sao Paulo
 * Duracao: 5-7 minutos cada
 *
 * Estrutura de cada video:
 *   0:00 - 0:15  Gancho forte
 *   0:15 - 1:30  Situacao reconhecivel
 *   1:30 - 3:30  O padrao por baixo
 *   3:30 - 5:00  Gesto de consciencia
 *   5:00 - 5:30  Frase final + CTA
 *
 * CTA (primeiras 4 semanas):
 *   "Se isto te tocou, inscreve-te. A Escola dos Veus esta a chegar
 *    — e o primeiro curso e sobre a tua relacao com dinheiro."
 */

import type { CourseSlug } from "@/types/course";

// ─── Types ──────────────────────────────────────────────────────────────────────

export type YouTubeDay = "terca" | "quinta" | "sabado";

export type VideoStatus =
  | "draft"        // script por escrever
  | "script_ready" // script pronto, aguarda aprovacao
  | "approved"     // script aprovado, pronto para producao
  | "producing"    // em producao (audio + imagens + montagem)
  | "review"       // montagem feita, aguarda revisao final
  | "scheduled"    // agendado no YouTube
  | "published";   // publicado

export type YouTubeVideo = {
  number: number;
  title: string;
  courseOrigin: CourseSlug;
  secondaryCourse?: CourseSlug;
  territory: string;
  week: number;
  day: YouTubeDay;
  gancho: string;
  fraseFinal: string;
  description: string;
  status: VideoStatus;
};

export type YouTubeWeek = {
  number: number;
  theme: string;
  objective: string;
  videos: YouTubeVideo[];
};

// ─── Publishing schedule ────────────────────────────────────────────────────────

export const YOUTUBE_SCHEDULE = {
  daysOfWeek: ["terca", "quinta", "sabado"] as YouTubeDay[],
  publishTime: "18:00",
  timezone: "Africa/Maputo",
  durationRange: { min: 5, max: 7 },
  ctaDefault:
    "Se isto te tocou, inscreve-te. A Escola dos Veus esta a chegar — e o primeiro curso e sobre a tua relacao com dinheiro.",
} as const;

export const YOUTUBE_DESCRIPTION_TEMPLATE = `[TITULO]

[DESCRICAO_VIDEO]

A Escola dos Veus e um lugar onde entras para ver o que estava invisivel. Cursos sobre a vida real — dinheiro, relacoes, corpo, limites, luto, decisoes — ensinados pela lente do corpo, nao da mente.

O primeiro curso esta a chegar.

Inscreve-te para nao perderes.
seteveus.space

#autoconhecimento #desenvolvimentopessoal #escoladosveus #corpo #emocoes`;

export const YOUTUBE_TAGS = [
  "autoconhecimento",
  "desenvolvimento pessoal",
  "escola dos veus",
  "corpo",
  "emocoes",
  "mulheres",
  "sete veus",
];

// ─── Checklist de publicacao ────────────────────────────────────────────────────

export const VIDEO_CHECKLIST = [
  "Titulo atractivo e emocional?",
  "Thumbnail com visual do Mundo dos Veus?",
  "Gancho nos primeiros 15 segundos?",
  "Duracao 5-7 minutos?",
  "Voz natural, ritmo calmo?",
  "Visuais consistentes com a paleta Sete Veus?",
  "Texto animado com frases-chave?",
  "Frase final que fica?",
  "CTA: inscricao no canal + 'A Escola dos Veus esta a chegar'?",
  "Legendas activas?",
  "Descricao com: resumo + link seteveus.space + 'curso a chegar'?",
  "Tags: autoconhecimento, desenvolvimento pessoal, mulheres, corpo, emocoes?",
] as const;

// ─── Producao pipeline ──────────────────────────────────────────────────────────

export const PRODUCTION_STEPS = [
  { step: 1, label: "Script aprovado", responsible: "Claude Code" },
  { step: 2, label: "Gerar audio (ElevenLabs — voz clonada)", responsible: "Vivianne" },
  { step: 3, label: "Gerar 4-6 imagens das cenas do territorio", responsible: "ElevenLabs" },
  { step: 4, label: "Transformar imagens em clips de video", responsible: "ElevenLabs" },
  { step: 5, label: "Montar clips + audio + texto + musica + legendas", responsible: "ElevenLabs Studio" },
  { step: 6, label: "Export MP4", responsible: "Vivianne" },
  { step: 7, label: "Revisao final", responsible: "Vivianne" },
  { step: 8, label: "Upload YouTube (agendar para dia seguinte 18h)", responsible: "Vivianne" },
] as const;

// ─── The 12 videos ──────────────────────────────────────────────────────────────

export const YOUTUBE_WEEKS: YouTubeWeek[] = [
  // ━━━ SEMANA 1 — ENTRADA NO MUNDO ━━━
  {
    number: 1,
    theme: "Entrada no Mundo",
    objective:
      "Apresentar a voz, o estilo visual, e tocar nos temas mais universais. Ninguem te conhece ainda. Estes videos sao a primeira impressao.",
    videos: [
      {
        number: 1,
        title: "Porque sentes culpa quando gastas dinheiro em ti mesma?",
        courseOrigin: "ouro-proprio",
        territory: "Casa dos Espelhos Dourados",
        week: 1,
        day: "terca",
        gancho:
          "Gastas nos filhos sem pensar. Gastas na casa sem pestanejar. Mas quando e para ti — um creme, um livro, um cafe a sos — aparece a culpa. Porque?",
        fraseFinal:
          "A culpa nao e tua. Foi ensinada. E o que foi ensinado pode ser desaprendido.",
        description:
          "E o tema mais universal e activador. Toda a mulher que comprou algo para si e sentiu culpa vai clicar. E emocional, e concreto, e abre a porta para tudo o resto.",
        status: "draft",
      },
      {
        number: 2,
        title: "3 frases sobre dinheiro que a tua mae te ensinou sem saber",
        courseOrigin: "ouro-proprio",
        secondaryCourse: "sangue-e-seda",
        territory: "Casa dos Espelhos Dourados + Arvore das Raizes",
        week: 1,
        day: "quinta",
        gancho:
          "'Dinheiro nao cresce em arvores.' 'Nos nao somos dessa gente.' 'Rico e tudo egoista.' — Reconheces alguma?",
        fraseFinal:
          "Antes dos 12 anos, ja tinhas um script completo sobre dinheiro. Nao te foi ensinado. Foi absorvido.",
        description:
          "Mantem o tema dinheiro mas liga a familia. As pessoas que viram o video 1 reconhecem a continuidade. As que nao viram entram por outro angulo.",
        status: "draft",
      },
      {
        number: 3,
        title: "A diferenca entre ser amada e ser util",
        courseOrigin: "limite-sagrado",
        territory: "Muralha que Nasce do Chao",
        week: 1,
        day: "sabado",
        gancho:
          "Se parasses de ajudar, de resolver, de estar disponivel — continuariam a ligar-te? Ou so te procuram quando precisam?",
        fraseFinal:
          "Ser util nao e ser amada. E confundir as duas coisas custa-te mais do que imaginas.",
        description:
          "Mais reflexivo, mais pesado. O sabado da espaco para sentar com isto. Muda de tema (sai do dinheiro, entra nos limites) para mostrar que o canal e mais do que um assunto.",
        status: "draft",
      },
    ],
  },

  // ━━━ SEMANA 2 — ALARGAR O TERRITORIO ━━━
  {
    number: 2,
    theme: "Alargar o Territorio",
    objective:
      "A audiencia que ficou da semana 1 espera mais. Esta semana tocamos em 3 temas diferentes para mostrar a amplitude do universo.",
    videos: [
      {
        number: 4,
        title: "Porque estas sempre cansada e ferias nao resolvem",
        courseOrigin: "o-peso-e-o-chao",
        territory: "Caminho de Pedras",
        week: 2,
        day: "terca",
        gancho:
          "Dormiste 8 horas. Tiraste ferias. Fizeste spa. E continuas exausta. E se o problema nao for falta de descanso?",
        fraseFinal:
          "Nao estas cansada porque descansas mal. Estas cansada porque carregas demais. A solucao nao e um banho de espuma — e por peso no chao.",
        description:
          "Tema do cansaco cronico — toca em muitas mulheres que se sentem exaustas apesar de descansarem.",
        status: "draft",
      },
      {
        number: 5,
        title: "O teste do preco: diz o teu valor em voz alta",
        courseOrigin: "ouro-proprio",
        territory: "Casa dos Espelhos Dourados",
        week: 2,
        day: "quinta",
        gancho:
          "Vou pedir-te para fazeres uma coisa agora. Pensa no preco que cobras pelo teu trabalho. Ou no salario que achas que mereces. Agora diz esse numero em voz alta. Alto. Onde e que a voz tremeu?",
        fraseFinal: "A voz treme onde o merecimento hesita.",
        description:
          "Video interactivo — pede a pessoa para fazer algo enquanto ve. Gera engagement e comentarios.",
        status: "draft",
      },
      {
        number: 6,
        title: "A conversa que ensaias no chuveiro ha meses",
        courseOrigin: "voz-de-dentro",
        territory: "Sala do Eco",
        week: 2,
        day: "sabado",
        gancho:
          "Ha uma conversa que vive em ti. Ensaias no chuveiro. Reescreves as 3 da manha. Mas nunca dizes. A quem e? E porque e que o silencio te parece mais seguro do que a verdade?",
        fraseFinal:
          "O silencio nao protege. Corroi. E o corpo sabe — mesmo que tu finjas que nao.",
        description:
          "Toca no tema da voz interior e do silencio — forte para engagement ao fim de semana.",
        status: "draft",
      },
    ],
  },

  // ━━━ SEMANA 3 — PROFUNDIDADE ━━━
  {
    number: 3,
    theme: "Profundidade",
    objective:
      "A audiencia que esta ca na semana 3 ja confia na voz. Podemos ir mais fundo. Temas mais emocionais.",
    videos: [
      {
        number: 7,
        title: "5 sinais de que estas a desaparecer numa relacao",
        courseOrigin: "a-arte-da-inteireza",
        territory: "Ponte entre Duas Margens",
        week: 3,
        day: "terca",
        gancho:
          "1. Ja nao sabes o que queres para jantar. 2. Ris das piadas dele mesmo quando nao tem graca. 3. Dizes 'tanto faz' quando nao e tanto faz. 4. Os teus amigos dizem que mudaste. 5. Olhas para o espelho e nao te reconheces.",
        fraseFinal:
          "Desaparecer numa relacao nao acontece de repente. Acontece uma cedencia de cada vez.",
        description:
          "Lista concreta que gera identificacao imediata. Forte potencial de partilha.",
        status: "draft",
      },
      {
        number: 8,
        title: "As perdas que ninguem te deixou chorar",
        courseOrigin: "flores-no-escuro",
        territory: "Jardim Subterraneo",
        week: 3,
        day: "quinta",
        gancho:
          "A amizade que acabou sem explicacao. O bebe que nao veio. A mudanca de pais que ninguem entendeu como perda. O casamento que nao aconteceu. A juventude. Ninguem morreu — mas doi como se.",
        fraseFinal:
          "Se ninguem te deu permissao para chorar isto — eu dou. E real. Merece nome.",
        description:
          "O mais emocional dos 12. Pode ser o que viraliza — porque toca numa dor que quase ninguem nomeia.",
        status: "draft",
      },
      {
        number: 9,
        title: "Porque discutir com a tua mae te faz sentir como se tivesses 12 anos",
        courseOrigin: "sangue-e-seda",
        territory: "Arvore das Raizes Visiveis",
        week: 3,
        day: "sabado",
        gancho:
          "Tens 35, 40, 50 anos. Mas basta a tua mae dizer uma frase — uma — e voltas a ter 12. A voz muda. O corpo encolhe. Porque?",
        fraseFinal:
          "Nao e fraqueza. E o corpo a lembrar quem eras quando aprendeste a funcionar com ela. Cresceste — mas o padrao ficou.",
        description:
          "Toca na relacao mae-filha adulta — tema profundo para reflexao de fim de semana.",
        status: "draft",
      },
    ],
  },

  // ━━━ SEMANA 4 — FECHO E PROMESSA ━━━
  {
    number: 4,
    theme: "Fecho e Promessa",
    objective:
      "Ultima semana antes do periodo de producao do curso acelerar. Estes videos fecham o ciclo e deixam a audiencia a querer mais.",
    videos: [
      {
        number: 10,
        title: "O teu corpo esta a tentar dizer-te algo — estas a ouvir?",
        courseOrigin: "a-pele-lembra",
        territory: "Corpo-Paisagem",
        week: 4,
        day: "terca",
        gancho:
          "A enxaqueca que aparece antes do Natal na casa da familia. A insonia na semana em que evitas uma conversa. A dor lombar que comecou quando disseste sim a algo que querias recusar. Coincidencia? O corpo nao acha.",
        fraseFinal:
          "O corpo nao mente. A mente sim. Aprende a ouvir quem nunca te enganou.",
        description:
          "Liga corpo e emocoes — tema que ressoa fortemente com o publico-alvo.",
        status: "draft",
      },
      {
        number: 11,
        title: "O mito da decisao perfeita",
        courseOrigin: "olhos-abertos",
        territory: "Encruzilhada Infinita",
        week: 4,
        day: "quinta",
        gancho:
          "Estas parada ha meses. Nao porque nao sabes o que fazer — mas porque tens medo de escolher errado. E se eu te disser que a decisao perfeita nao existe? Que escolher imperfeito e melhor que nao escolher?",
        fraseFinal:
          "A paz nao vem de decidir certo. Vem de decidir. Ponto.",
        description:
          "Toca no tema da indecisao cronica — forte para engagement e comentarios.",
        status: "draft",
      },
      {
        number: 12,
        title: "3 sinais de que estas a repetir a vida da tua mae sem saber",
        courseOrigin: "sangue-e-seda",
        territory: "Arvore das Raizes Visiveis",
        week: 4,
        day: "sabado",
        gancho:
          "Fazes exactamente como ela. Ou fazes exactamente o contrario. Ambas sao herancas. Nenhuma e escolha. Aqui estao 3 sinais de que ainda estas a reagir a tua mae em vez de viver a tua propria vida.",
        fraseFinal:
          "Repetir e hereditario. Escolher e liberdade. A Escola dos Veus abre em breve — e o primeiro curso ajuda-te a ver o que herdaste sem saber.",
        description:
          "O ultimo video fecha com o tema mais profundo — heranca. Deixa a audiencia a querer o curso.",
        status: "draft",
      },
    ],
  },
];

// ─── Helpers ────────────────────────────────────────────────────────────────────

export function getAllVideos(): YouTubeVideo[] {
  return YOUTUBE_WEEKS.flatMap((w) => w.videos);
}

export function getVideoByNumber(n: number): YouTubeVideo | undefined {
  return getAllVideos().find((v) => v.number === n);
}

export function getVideosByWeek(week: number): YouTubeVideo[] {
  return YOUTUBE_WEEKS.find((w) => w.number === week)?.videos ?? [];
}

export function getVideosByCourse(slug: CourseSlug): YouTubeVideo[] {
  return getAllVideos().filter(
    (v) => v.courseOrigin === slug || v.secondaryCourse === slug
  );
}

export function getWeekByNumber(week: number): YouTubeWeek | undefined {
  return YOUTUBE_WEEKS.find((w) => w.number === week);
}

const DAY_LABELS: Record<YouTubeDay, string> = {
  terca: "Terca-feira",
  quinta: "Quinta-feira",
  sabado: "Sabado",
};

export function getDayLabel(day: YouTubeDay): string {
  return DAY_LABELS[day];
}

const STATUS_LABELS: Record<VideoStatus, string> = {
  draft: "Rascunho",
  script_ready: "Script pronto",
  approved: "Aprovado",
  producing: "Em producao",
  review: "Em revisao",
  scheduled: "Agendado",
  published: "Publicado",
};

export function getStatusLabel(status: VideoStatus): string {
  return STATUS_LABELS[status];
}
