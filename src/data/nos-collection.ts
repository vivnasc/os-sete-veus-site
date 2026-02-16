// Colecção Nós — Metadados dos 7 livros relacionais
// Cada Nó é o par relacional de um Espelho
// Quem tem acesso a um Espelho, tem acesso ao Nó correspondente

export type NosBook = {
  slug: string;
  number: number;
  title: string;
  subtitle: string;
  espelhoSlug: string; // liga ao Espelho correspondente
  description: string;
  color: string;
  colorBg: string;
  status: "available" | "coming_soon";
  dataFile: string | null; // ficheiro de dados (null = ainda não escrito)
};

export const nosCollection: NosBook[] = [
  {
    slug: "no-da-heranca",
    number: 1,
    title: "O Nó da Herança",
    subtitle: "O que a mãe guardou, a filha carregou",
    espelhoSlug: "veu-da-ilusao",
    description:
      "Sara vai à casa de Helena. Não para visitar — para perguntar. O que a mãe viu durante anos e nunca disse? O que se herda sem inventário? Este nó puxa o fio entre mãe e filha.",
    color: "#c9a87c",
    colorBg: "#faf7f2",
    status: "available",
    dataFile: "no-heranca",
  },
  {
    slug: "no-do-silencio",
    number: 2,
    title: "O Nó do Silêncio",
    subtitle: "O que não se diz também se transmite",
    espelhoSlug: "veu-do-medo",
    description:
      "Rui e Ana amam-se. Mas há algo entre eles que nenhum dos dois nomeia. O medo transformou-se em silêncio — e o silêncio, em distância. Este nó puxa o fio entre quem ama e quem cala.",
    color: "#8b9b8e",
    colorBg: "#f5f7f5",
    status: "coming_soon",
    dataFile: null,
  },
  {
    slug: "no-da-divida",
    number: 3,
    title: "O Nó da Dívida",
    subtitle: "Quem te disse que devias tanto?",
    espelhoSlug: "veu-da-culpa",
    description:
      "Marta carrega uma dívida que ninguém lhe cobrou. A culpa de querer mais, de precisar de espaço, de não ser suficiente para todos. Este nó puxa o fio entre dar e perder-se.",
    color: "#b07a7a",
    colorBg: "#faf5f5",
    status: "coming_soon",
    dataFile: null,
  },
  {
    slug: "no-do-reflexo",
    number: 4,
    title: "O Nó do Reflexo",
    subtitle: "Quem és quando ninguém espera nada?",
    espelhoSlug: "veu-da-identidade",
    description:
      "Inês sempre soube quem era — até ao dia em que os outros pararam de lhe dizer. Sem papel para desempenhar, o que sobra? Este nó puxa o fio entre ser e parecer.",
    color: "#ab9375",
    colorBg: "#faf7f3",
    status: "coming_soon",
    dataFile: null,
  },
  {
    slug: "no-da-corda",
    number: 5,
    title: "O Nó da Corda",
    subtitle: "Segurar não é o mesmo que cuidar",
    espelhoSlug: "veu-do-controlo",
    description:
      "Teresa segura tudo. A família, o trabalho, as emoções dos outros. Mas a corda está a partir. Este nó puxa o fio entre proteger e sufocar.",
    color: "#8aaaca",
    colorBg: "#f3f6fa",
    status: "coming_soon",
    dataFile: null,
  },
  {
    slug: "no-da-fome",
    number: 6,
    title: "O Nó da Fome",
    subtitle: "O vazio que nenhuma coisa preenche",
    espelhoSlug: "veu-do-desejo",
    description:
      "Carla compra, acumula, preenche. Mas a fome continua. Talvez porque não é fome de coisas. Este nó puxa o fio entre ter e ser.",
    color: "#c08aaa",
    colorBg: "#faf5f8",
    status: "coming_soon",
    dataFile: null,
  },
  {
    slug: "no-da-raiz",
    number: 7,
    title: "O Nó da Raiz",
    subtitle: "Para pertencer, primeiro tens de te ter",
    espelhoSlug: "veu-da-separacao",
    description:
      "Lúcia fugiu de si mesma para caber no mundo dos outros. Agora, finalmente, volta. Este nó puxa o fio entre pertencer e existir.",
    color: "#baaacc",
    colorBg: "#f7f5fa",
    status: "coming_soon",
    dataFile: null,
  },
];

export function getNosBook(slug: string) {
  return nosCollection.find((n) => n.slug === slug);
}

export function getNosForEspelho(espelhoSlug: string) {
  return nosCollection.find((n) => n.espelhoSlug === espelhoSlug);
}

export function getAvailableNos() {
  return nosCollection.filter((n) => n.status === "available");
}
