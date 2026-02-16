// Colecção Nós — Metadados dos 7 livros
// Cada Nó é o par relacional de um Espelho.
// O Espelho mostra-te a ti. O Nó mostra-te a relação.

export type NosBook = {
  id: number;
  slug: string;
  title: string;
  subtitle: string;
  pairedEspelho: string;
  theme: string;
  accentColor: string;
  available: boolean;
};

export const nosCollectionMeta = {
  title: "Colecção Nós",
  subtitle: "O que se herda sem escritura",
  description:
    "Sete histórias sobre os fios invisíveis que nos ligam a quem amamos. Cada Nó é a continuação emocional de um Espelho — a mesma ferida, vista pela relação.",
};

export const nosBooks: NosBook[] = [
  {
    id: 1,
    slug: "no-heranca",
    title: "O Nó da Herança",
    subtitle: "O que a mãe guardou, a filha carregou",
    pairedEspelho: "Espelho da Ilusão",
    theme: "Herança e silêncio entre mãe e filha",
    accentColor: "#c9a87c",
    available: true,
  },
  {
    id: 2,
    slug: "no-silencio",
    title: "O Nó do Silêncio",
    subtitle: "Quando o amor se diz calando",
    pairedEspelho: "Espelho do Medo",
    theme: "O medo que se transmite entre quem se ama",
    accentColor: "#8b9b8e",
    available: false,
  },
  {
    id: 3,
    slug: "no-divida",
    title: "O Nó da Dívida",
    subtitle: "O que se deve a quem nunca pediu",
    pairedEspelho: "Espelho do Desejo",
    theme: "Desejo sacrificado em nome da relação",
    accentColor: "#c08aaa",
    available: false,
  },
  {
    id: 4,
    slug: "no-reflexo",
    title: "O Nó do Reflexo",
    subtitle: "Quando te vês no outro e não reconheces",
    pairedEspelho: "Espelho da Culpa",
    theme: "Culpa partilhada e projecções mútuas",
    accentColor: "#8aaaca",
    available: false,
  },
  {
    id: 5,
    slug: "no-distancia",
    title: "O Nó da Distância",
    subtitle: "Perto demais para ver, longe demais para sentir",
    pairedEspelho: "Espelho da Pressa",
    theme: "Relações que se perdem na velocidade de viver",
    accentColor: "#9aac8e",
    available: false,
  },
  {
    id: 6,
    slug: "no-comparacao",
    title: "O Nó da Comparação",
    subtitle: "Quando medes o amor pelo que os outros têm",
    pairedEspelho: "Espelho da Comparação",
    theme: "Relações deformadas pela comparação",
    accentColor: "#ab9375",
    available: false,
  },
  {
    id: 7,
    slug: "no-controlo",
    title: "O Nó do Controlo",
    subtitle: "Quando segurar é a única forma de amar que conheces",
    pairedEspelho: "Espelho do Controlo",
    theme: "O controlo como linguagem de amor",
    accentColor: "#baaacc",
    available: false,
  },
];
