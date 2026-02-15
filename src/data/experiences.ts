// Master data for all 7 veil experiences
// Pricing, launch calendar, and metadata

export type ExperienceStatus = "available" | "coming_soon" | "waitlist";

export type Experience = {
  slug: string;
  number: number;
  title: string;
  subtitle: string;
  description: string;
  longDescription: string;
  image: string;
  color: string;
  colorBg: string;
  status: ExperienceStatus;
  launchDate: string | null; // ISO date string
  launchLabel: string | null; // "Março 2026"
  chapters: number;
  practices: number;
  priceUSD: number;
  priceMT: number;
  priceBRL: number;
  priceEUR: number;
};

export const PRICING = {
  individual: { usd: 29, mt: 1885, brl: 119, eur: 27 },
  pack3: { usd: 69, mt: 4485, brl: 279, eur: 64 },
  journey: { usd: 149, mt: 9685, brl: 597, eur: 137 },
  // Savings
  pack3Savings: 18, // percentage
  journeySavings: 27, // percentage
} as const;

export const experiences: Experience[] = [
  {
    slug: "veu-da-ilusao",
    number: 1,
    title: "O Espelho da Ilusão",
    subtitle: "Quando a vida que tens não foi a que escolheste",
    description:
      "Sentes que foste construindo uma vida que faz sentido para toda a gente — menos para ti. Há uma inquietação gentil que te diz: há mais.",
    longDescription:
      "Sara acordou três minutos antes do despertador, como acontecia sempre. A vida funcionava. Os prazos cumpriam-se. Os parabéns vinham nas alturas certas. Mas uma manhã, uma pergunta absurda mudou tudo: quando foi que escolhi tomar café em vez de chá? Acompanha Sara numa jornada de reconhecimento — devagar, sem pressa, ao ritmo de quem começa a perguntar.",
    image: "/images/espelho-ilusao.png",
    color: "#c9b896",
    colorBg: "#faf8f4",
    status: "available",
    launchDate: null,
    launchLabel: null,
    chapters: 7,
    practices: 4,
    priceUSD: 29,
    priceMT: 1885,
    priceBRL: 119,
    priceEUR: 27,
  },
  {
    slug: "veu-do-medo",
    number: 2,
    title: "O Espelho do Medo",
    subtitle: "Quando o medo decide por ti",
    description:
      "Sabes o que queres, mas o medo decide antes de ti. E se pudesses ver o que há do outro lado?",
    longDescription:
      "Cada vez que estás prestes a dar um passo, algo te puxa para trás. Não é covardia — é um mecanismo antigo, treinado ao longo de anos de cautela disfarçada de bom senso. Esta experiência convida-te a olhar para o medo de frente, com gentileza, e a descobrir o que está do outro lado dele.",
    image: "/images/espelho-medo.png",
    color: "#8b9b8e",
    colorBg: "#f5f7f5",
    status: "available",
    launchDate: "2026-03-01",
    launchLabel: "Março 2026",
    chapters: 7,
    practices: 4,
    priceUSD: 29,
    priceMT: 1885,
    priceBRL: 119,
    priceEUR: 27,
  },
  {
    slug: "veu-da-culpa",
    number: 3,
    title: "O Espelho da Culpa",
    subtitle: "Quando te castigas por querer mais",
    description:
      "Querer mais parece-te egoísmo. Mas e se fosse vida? A permissão que procuras só tu te podes dar.",
    longDescription:
      "Cada vez que fazes algo só para ti, uma voz interior sussurra que devias estar a fazer outra coisa. Que não mereces. Que é egoísmo. Esta experiência desafia essa voz — com ternura — e mostra-te que merecer não é algo que se conquista. É algo que já és.",
    image: "/images/espelho-culpa.png",
    color: "#b07a7a",
    colorBg: "#faf5f5",
    status: "coming_soon",
    launchDate: "2026-04-15",
    launchLabel: "Abril 2026",
    chapters: 7,
    practices: 4,
    priceUSD: 29,
    priceMT: 1885,
    priceBRL: 119,
    priceEUR: 27,
  },
  {
    slug: "veu-da-identidade",
    number: 4,
    title: "O Espelho da Identidade",
    subtitle: "Quando já não sabes quem és sem os outros",
    description:
      "Mãe, filha, mulher, profissional — são tantos os papéis que já não sabes o que sobra quando os tiras.",
    longDescription:
      "Quem és quando ninguém te está a ver? Quando tiras o papel de mãe, de filha, de profissional — o que sobra? Este véu convida-te a descobrir que por baixo de todos os papéis que desempenhas existe alguém que nunca precisou de justificação para existir.",
    image: "/images/espelho-identidade.png",
    color: "#ab9375",
    colorBg: "#faf7f3",
    status: "coming_soon",
    launchDate: "2026-06-01",
    launchLabel: "Junho 2026",
    chapters: 7,
    practices: 4,
    priceUSD: 29,
    priceMT: 1885,
    priceBRL: 119,
    priceEUR: 27,
  },
  {
    slug: "veu-do-controlo",
    number: 5,
    title: "O Espelho do Controlo",
    subtitle: "Quando segurar é a única forma que conheces",
    description:
      "Cuidas de tudo e de todos. Mas por vezes, cuidar é outra forma de segurar.",
    longDescription:
      "A tua vida funciona porque tu seguras tudo no lugar. Mas o peso acumula-se. E a ilusão de que se largares tudo desmorona é exactamente isso — uma ilusão. Esta experiência convida-te a descobrir o que acontece quando soltas — não tudo, mas o suficiente para respirar.",
    image: "/images/espelho-controlo.png",
    color: "#8aaaca",
    colorBg: "#f3f6fa",
    status: "coming_soon",
    launchDate: "2026-08-01",
    launchLabel: "Agosto 2026",
    chapters: 7,
    practices: 4,
    priceUSD: 29,
    priceMT: 1885,
    priceBRL: 119,
    priceEUR: 27,
  },
  {
    slug: "veu-do-desejo",
    number: 6,
    title: "O Espelho do Desejo",
    subtitle: "Quando desejas tudo menos o que precisas",
    description:
      "Preenches o tempo e o espaço com coisas que não te preenchem. E se parasses para perguntar: o que quero, de verdade?",
    longDescription:
      "Compras, preenches, buscas, acumulas — e mesmo assim, o vazio continua ali. Talvez estejas a procurar fora o que só podes encontrar dentro. Esta experiência é um convite a parar, a largar o excesso, e a ouvir o desejo que ficou soterrado por baixo de todos os outros.",
    image: "/images/espelho-desejo.png",
    color: "#c08aaa",
    colorBg: "#faf5f8",
    status: "coming_soon",
    launchDate: "2026-10-01",
    launchLabel: "Outubro 2026",
    chapters: 7,
    practices: 4,
    priceUSD: 29,
    priceMT: 1885,
    priceBRL: 119,
    priceEUR: 27,
  },
  {
    slug: "veu-da-separacao",
    number: 7,
    title: "O Espelho da Separação",
    subtitle: "Quando te afastas de ti mesma para pertencer",
    description:
      "Dás tanto para pertencer que te perdeste no processo. O caminho de volta começa por ti.",
    longDescription:
      "A experiência mais profunda da colecção. Só para quem já percorreu pelo menos dois véus. Porque antes de compreender a separação que sentes do mundo, é preciso reconhecer a separação que criaste de ti mesma. Este é o véu final — e o começo de tudo.",
    image: "/images/espelho-separacao.png",
    color: "#baaacc",
    colorBg: "#f7f5fa",
    status: "coming_soon",
    launchDate: "2026-12-01",
    launchLabel: "Dezembro 2026",
    chapters: 7,
    practices: 4,
    priceUSD: 29,
    priceMT: 1885,
    priceBRL: 119,
    priceEUR: 27,
  },
];

// Map quiz veil index to experience slug
export const quizVeilToExperience: Record<number, string> = {
  0: "veu-da-ilusao",
  1: "veu-do-medo",
  2: "veu-do-desejo",
  3: "veu-do-controlo",
  4: "veu-da-culpa",
  5: "veu-da-identidade",
  6: "veu-da-separacao",
};

export function getExperience(slug: string) {
  return experiences.find((e) => e.slug === slug);
}

export function getAvailableExperiences() {
  return experiences.filter((e) => e.status === "available");
}

export function getUpcomingExperiences() {
  return experiences.filter((e) => e.status !== "available");
}

// Calculate upgrade price: what you already paid is deducted
export function getUpgradePrice(
  purchasedCount: number,
  target: "pack3" | "journey"
) {
  const alreadyPaid = purchasedCount * PRICING.individual.usd;
  const targetPrice =
    target === "pack3" ? PRICING.pack3.usd : PRICING.journey.usd;
  return Math.max(0, targetPrice - alreadyPaid);
}
