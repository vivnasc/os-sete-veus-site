// Colecção Nós — Metadados dos 7 livros relacionais
// Cada Nó é o par relacional de um Espelho
// Regra: Só lês o Nó se viveste o Espelho correspondente
//
// Modelo de venda:
//   Espelho individual ($29) + Nó individual ($12) = $41
//   Pack 3 Espelhos ($69) → 3 Nós incluídos
//   Jornada Completa 7 Espelhos ($149) → Nós completo incluído
//
// O Nó desbloqueia ao completar o Espelho correspondente.
// Não é upsell — é continuação emocional.

export const NOS_PRICING = {
  individual: { usd: 12, mt: 780, brl: 49, eur: 11 },
  // Pack 3 e Jornada Completa: Nós incluído gratuitamente
} as const;

export type NosBook = {
  slug: string;
  number: number;
  title: string;
  subtitle: string;
  characters: string; // personagens do Nó (ex: "Sara + Helena (mãe)")
  espelhoSlug: string; // liga ao Espelho correspondente
  description: string;
  color: string;
  colorBg: string;
  status: "available" | "coming_soon";
  dataFile: string | null; // ficheiro de dados (null = ainda não escrito)
  priceUSD: number;
  priceMT: number;
  priceBRL: number;
  priceEUR: number;
};

export const nosCollection: NosBook[] = [
  {
    slug: "no-da-heranca",
    number: 1,
    title: "O Nó da Herança",
    subtitle: "O silêncio herdado entre mãe e filha",
    characters: "Sara + Helena (mãe)",
    espelhoSlug: "veu-da-ilusao",
    description:
      "Sara vai à casa de Helena. Não para visitar — para perguntar. O que a mãe viu durante anos e nunca disse? O que se herda sem inventário? Este nó puxa o fio entre mãe e filha.",
    color: "#c9956a",
    colorBg: "#2e1a0e",
    status: "available",
    dataFile: "no-heranca",
    priceUSD: 12,
    priceMT: 780,
    priceBRL: 49,
    priceEUR: 11,
  },
  {
    slug: "no-do-silencio",
    number: 2,
    title: "O Nó do Silêncio",
    subtitle: "O que o medo calou entre eles",
    characters: "Rui + Ana",
    espelhoSlug: "veu-do-medo",
    description:
      "Rui e Ana amam-se. Mas há algo entre eles que nenhum dos dois nomeia. O medo transformou-se em silêncio — e o silêncio, em distância. Este nó puxa o fio entre quem ama e quem cala.",
    color: "#6a9dbe",
    colorBg: "#142838",
    status: "coming_soon",
    dataFile: null,
    priceUSD: 12,
    priceMT: 780,
    priceBRL: 49,
    priceEUR: 11,
  },
  {
    slug: "no-do-sacrificio",
    number: 3,
    title: "O Nó do Sacrifício",
    subtitle: "A culpa disfarçada de entrega",
    characters: "Filipe + Luísa",
    espelhoSlug: "veu-da-culpa",
    description:
      "Filipe e Luísa amam-se — mas entre eles há uma dívida invisível. Ele dá tudo, ela sente que nunca é suficiente. A culpa disfarçou-se de entrega. Este nó puxa o fio entre sacrificar-se e amar.",
    color: "#d06a6a",
    colorBg: "#2e1015",
    status: "coming_soon",
    dataFile: null,
    priceUSD: 12,
    priceMT: 780,
    priceBRL: 49,
    priceEUR: 11,
  },
  {
    slug: "no-da-vergonha",
    number: 4,
    title: "O Nó da Vergonha",
    subtitle: "A máscara que caiu entre dois estranhos",
    characters: "Vítor + Mariana",
    espelhoSlug: "veu-da-identidade",
    description:
      "Vítor e Mariana cruzaram-se quando já não tinham máscaras para vestir. Ele fingia força, ela fingia indiferença. A vergonha de ser visto como se é — esse é o nó. Este nó puxa o fio entre a identidade e a nudez.",
    color: "#aa7abb",
    colorBg: "#22102e",
    status: "coming_soon",
    dataFile: null,
    priceUSD: 12,
    priceMT: 780,
    priceBRL: 49,
    priceEUR: 11,
  },
  {
    slug: "no-da-solidao",
    number: 5,
    title: "O Nó da Solidão",
    subtitle: "O controlo que isolou quem mais amava",
    characters: "Isabel + Pedro",
    espelhoSlug: "veu-do-controlo",
    description:
      "Isabel controlava tudo — os horários, as decisões, o silêncio. Pedro foi ficando cada vez mais longe. Não por falta de amor, mas por excesso de rédea. Este nó puxa o fio entre controlar e perder.",
    color: "#6a9e9e",
    colorBg: "#10222a",
    status: "coming_soon",
    dataFile: null,
    priceUSD: 12,
    priceMT: 780,
    priceBRL: 49,
    priceEUR: 11,
  },
  {
    slug: "no-do-vazio",
    number: 6,
    title: "O Nó do Vazio",
    subtitle: "O desejo que esvaziou a amizade",
    characters: "Lena + Sofia",
    espelhoSlug: "veu-do-desejo",
    description:
      "Lena e Sofia foram inseparáveis — até que o desejo de uma esvaziou o que a outra tinha para dar. Não foi traição. Foi fome disfarçada de presença. Este nó puxa o fio entre desejar e consumir.",
    color: "#c4905a",
    colorBg: "#261808",
    status: "coming_soon",
    dataFile: null,
    priceUSD: 12,
    priceMT: 780,
    priceBRL: 49,
    priceEUR: 11,
  },
  {
    slug: "no-da-pertenca",
    number: 7,
    title: "O Nó da Pertença",
    subtitle: "A separação que reinventou o lar",
    characters: "Helena T. + Miguel C.",
    espelhoSlug: "veu-da-separacao",
    description:
      "Helena T. e Miguel C. separaram-se — não por desamor, mas por excesso de distância dentro da mesma casa. Quando saíram, descobriram que pertencer não é ficar. É escolher voltar. Este nó puxa o fio entre separar-se e reencontrar-se.",
    color: "#5aaa7a",
    colorBg: "#0e2216",
    status: "coming_soon",
    dataFile: null,
    priceUSD: 12,
    priceMT: 780,
    priceBRL: 49,
    priceEUR: 11,
  },
];

export function getNosBook(slug: string) {
  return nosCollection.find((n) => n.slug === slug);
}

export function getNosForEspelho(espelhoSlug: string) {
  return nosCollection.find((n) => n.espelhoSlug === espelhoSlug);
}

/**
 * Retorna Nós disponíveis, com verificação de data automática.
 * Um Nó fica disponível quando:
 * 1. O Espelho correspondente já foi publicado (por data)
 * 2. O dataFile existe (o Nó foi escrito)
 */
export function getAvailableNos(hasEarlyAccess = false) {
  const now = new Date();

  return nosCollection.filter((n) => {
    if (n.status === "available") return true;
    if (!n.dataFile) return false; // Nó não escrito

    // Verificar se o Espelho correspondente já foi publicado
    const { getExperience } = require("@/data/experiences");
    const espelho = getExperience(n.espelhoSlug);
    if (!espelho || !espelho.launchDate) return false;

    const launch = new Date(espelho.launchDate);
    if (hasEarlyAccess) {
      const earlyDate = new Date(launch);
      earlyDate.setDate(earlyDate.getDate() - 7);
      return now >= earlyDate;
    }
    return now >= launch;
  });
}
