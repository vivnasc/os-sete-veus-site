// Cursos — Ensino e mentoria pela Vivianne
// Temas transversais que cruzam veus, espelhos e nos
// Produto separado dos Espelhos

export type CourseStatus = "available" | "coming_soon" | "draft";

export type Lesson = {
  slug: string;
  number: number;
  title: string;
  subtitle: string;
  duration: string; // "12 min", "25 min"
  type: "audio" | "video" | "text" | "exercise";
  content: string[]; // paragraphs (for text lessons)
  audioUrl?: string; // for audio/video lessons
  exercise?: {
    prompt: string;
    journalQuestion: string;
  };
  materials?: {
    title: string;
    description: string;
    url?: string;
  }[];
};

export type Course = {
  slug: string;
  accessTypeCode: string;
  title: string;
  subtitle: string;
  description: string;
  longDescription: string;
  image: string;
  color: string;
  colorBg: string;
  status: CourseStatus;
  launchDate: string | null;
  launchLabel: string | null;
  lessons: number;
  totalDuration: string; // "2h 30min"
  themes: string[]; // transversal themes / veus touched
  priceUSD: number;
  priceMT: number;
  priceBRL: number;
  priceEUR: number;
};

export const COURSE_PRICING = {
  individual: { usd: 39, mt: 2500, brl: 159, eur: 36 },
  pack3: { usd: 89, mt: 5700, brl: 359, eur: 82 },
  allCourses: { usd: 149, mt: 9500, brl: 599, eur: 138 },
  pack3Savings: 24, // percentage
  allSavings: 36, // percentage
} as const;

// Cursos com temas transversais
// Cada curso cruza multiplos veus/espelhos sem os explicar directamente
const _courses: Course[] = [
  {
    slug: "o-corpo-que-guarda",
    accessTypeCode: "curso-corpo-que-guarda",
    title: "O Corpo que Guarda",
    subtitle: "O que carregas sem saber que carregas",
    description:
      "O corpo guarda o que a mente esqueceu. Tensoes, posturas, padroes de respiracao — tudo conta uma historia que nunca contaste em voz alta.",
    longDescription:
      "Ha coisas que nao se pensam — sentem-se. Uma tensao no peito que aparece antes de uma conversa dificil. Ombros que sobem sem razao. Uma respiracao que nunca chega ao fundo. Este curso nao te vai ensinar anatomia. Vai ensinar-te a ouvir o que o teu corpo ja sabe. Atraves de exercicios guiados, reflexoes e praticas que podes fazer em cinco minutos, vais aprender a reconhecer o que carregas — e a escolher o que soltar.",
    image: "/images/curso-corpo.png",
    color: "#8b9b8e",
    colorBg: "#f5f7f5",
    status: "available",
    launchDate: null,
    launchLabel: null,
    lessons: 6,
    totalDuration: "2h 15min",
    themes: ["Permanencia", "Memoria", "Turbilhao"],
    priceUSD: 39,
    priceMT: 2500,
    priceBRL: 159,
    priceEUR: 36,
  },
  {
    slug: "a-arte-de-parar",
    accessTypeCode: "curso-arte-de-parar",
    title: "A Arte de Parar",
    subtitle: "Quando fazer menos e o acto mais corajoso",
    description:
      "Vivemos convencidas de que parar e perder tempo. Mas e se parar fosse a unica forma de te encontrares?",
    longDescription:
      "Ha uma ilusao persistente: a de que so somos valiosas enquanto produzimos, cuidamos, resolvemos, avancamos. Este curso desafia isso — com gentileza. Nao te vai dizer para largares tudo. Vai mostrar-te como encontrar micro-pausas no meio da vida real, como desacelerar sem culpa, e como descobrir que o repouso nao e o contrario da accao — e o seu fundamento.",
    image: "/images/curso-parar.png",
    color: "#ab9375",
    colorBg: "#faf7f3",
    status: "coming_soon",
    launchDate: "2026-05-01",
    launchLabel: "Maio 2026",
    lessons: 6,
    totalDuration: "2h",
    themes: ["Esforco", "Turbilhao", "Permanencia"],
    priceUSD: 39,
    priceMT: 2500,
    priceBRL: 159,
    priceEUR: 36,
  },
  {
    slug: "habitar-o-vazio",
    accessTypeCode: "curso-habitar-o-vazio",
    title: "Habitar o Vazio",
    subtitle: "Quando o vazio nao e ausencia — e espaco",
    description:
      "O vazio assusta porque aprendemos a fugir dele. Mas e dentro do vazio que nasce o que e verdadeiro.",
    longDescription:
      "Ha momentos em que tudo parece vazio — de sentido, de direcao, de presenca. A reaccao natural e preencher: com ruido, com ocupacao, com relacoes que nos distraiam. Este curso convida-te a ficar. A olhar para o vazio sem fugir dele. A descobrir que o que parece desolacao e, na verdade, o terreno mais fertil que existe. Atraves de reflexoes guiadas, exercicios de escrita e praticas de presenca, vais aprender a habitar o que esta vazio — e a encontrar ali o inicio de algo novo.",
    image: "/images/curso-vazio.png",
    color: "#c08aaa",
    colorBg: "#faf5f8",
    status: "coming_soon",
    launchDate: "2026-07-01",
    launchLabel: "Julho 2026",
    lessons: 6,
    totalDuration: "2h 30min",
    themes: ["Desolacao", "Horizonte", "Dualidade"],
    priceUSD: 39,
    priceMT: 2500,
    priceBRL: 159,
    priceEUR: 36,
  },
  {
    slug: "fronteiras-vivas",
    accessTypeCode: "curso-fronteiras-vivas",
    title: "Fronteiras Vivas",
    subtitle: "Onde terminas tu e onde comeca o outro",
    description:
      "Dizer nao sem culpa. Cuidar sem te perder. Amar sem te dissolver. As fronteiras nao separam — protegem o que e teu.",
    longDescription:
      "Ha uma linha invisivel entre cuidar dos outros e desaparecer dentro deles. Este curso ensina-te a ve-la. Nao com rigidez, mas com clareza. Vais aprender a reconhecer quando um sim e um sim verdadeiro e quando e uma rendição. A dizer nao sem sentir que estas a trair alguem. A perceber que as fronteiras nao sao muros — sao pontes com portao.",
    image: "/images/curso-fronteiras.png",
    color: "#8aaaca",
    colorBg: "#f3f6fa",
    status: "coming_soon",
    launchDate: "2026-09-01",
    launchLabel: "Setembro 2026",
    lessons: 6,
    totalDuration: "2h 15min",
    themes: ["Dualidade", "Esforco", "Desolacao"],
    priceUSD: 39,
    priceMT: 2500,
    priceBRL: 159,
    priceEUR: 36,
  },
  {
    slug: "a-voz-que-faltava",
    accessTypeCode: "curso-voz-que-faltava",
    title: "A Voz que Faltava",
    subtitle: "Falar de ti sem pedir licenca",
    description:
      "Quantas vezes calaste o que sentias para manter a paz? Este curso ensina-te a recuperar a tua voz — sem gritar.",
    longDescription:
      "A voz que faltava nao e a que grita — e a que diz com calma o que precisa de ser dito. Este curso e sobre isso: aprender a falar de ti sem pedir desculpa. A dizer o que sentes sem o transformar numa acusacao. A comunicar com verdade e com ternura, mesmo quando o assunto e desconfortavel. Nao e um curso de comunicacao — e um curso de presenca. Porque so fala verdade quem ja se ouviu por dentro.",
    image: "/images/curso-voz.png",
    color: "#baaacc",
    colorBg: "#f7f5fa",
    status: "coming_soon",
    launchDate: "2026-11-01",
    launchLabel: "Novembro 2026",
    lessons: 6,
    totalDuration: "2h",
    themes: ["Memoria", "Horizonte", "Permanencia"],
    priceUSD: 39,
    priceMT: 2500,
    priceBRL: 159,
    priceEUR: 36,
  },
];

// Status calculado dinamicamente por data
export const courses: Course[] = _courses.map((c) => {
  if (c.status === "available" || !c.launchDate) return c;
  const now = new Date();
  const launch = new Date(c.launchDate);
  if (now >= launch) return { ...c, status: "available" as CourseStatus };
  return c;
});

export function getCourse(slug: string) {
  return courses.find((c) => c.slug === slug);
}

export function getAvailableCourses() {
  return courses.filter((c) => c.status === "available");
}

export function getUpcomingCourses() {
  return courses.filter((c) => c.status !== "available");
}
