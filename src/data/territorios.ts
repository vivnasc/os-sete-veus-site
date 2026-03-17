export interface Territorio {
  numero: number;
  nome: string;
  curso: string;
  corPrincipal: string;
  corSecundaria?: string;
  transformacao: string;
}

export const TERRITORIOS: Territorio[] = [
  {
    numero: 1,
    nome: "A Casa dos Espelhos Dourados",
    curso: "Ouro Proprio",
    corPrincipal: "#D4A853",
    transformacao: "Espelhos cobertos a descobertos, reflexos distorcidos a claros",
  },
  {
    numero: 2,
    nome: "A Arvore das Raizes Visiveis",
    curso: "Sangue e Seda",
    corPrincipal: "#8B3A3A",
    transformacao: "Raizes emaranhadas a reorganizadas, amanhecer atras da arvore",
  },
  {
    numero: 3,
    nome: "A Ponte entre Duas Margens",
    curso: "A Arte da Inteireza",
    corPrincipal: "#7B68EE",
    transformacao: "Rio sem ponte a ponte completa, duas silhuetas inteiras com espaco",
  },
  {
    numero: 4,
    nome: "O Campo Queimado",
    curso: "Depois do Fogo",
    corPrincipal: "#4A4A4A",
    corSecundaria: "#E8651A",
    transformacao: "Destruicao a vida nova, diferente do que era",
  },
  {
    numero: 5,
    nome: "A Encruzilhada Infinita",
    curso: "Olhos Abertos",
    corPrincipal: "#6B8CAE",
    transformacao: "Nevoeiro total a parcialmente claro, silhueta da o primeiro passo",
  },
  {
    numero: 6,
    nome: "O Corpo-Paisagem",
    curso: "A Pele Lembra",
    corPrincipal: "#C4745A",
    transformacao: "Paisagem desconhecida a reconhecida e habitada",
  },
  {
    numero: 7,
    nome: "A Muralha que Nasce do Chao",
    curso: "Limite Sagrado",
    corPrincipal: "#D4A853",
    transformacao: "Sem limite a muralha de luz, com porta que a silhueta abre",
  },
  {
    numero: 8,
    nome: "O Jardim Subterraneo",
    curso: "Flores no Escuro",
    corPrincipal: "#1A3A5C",
    corSecundaria: "#4AE8A0",
    transformacao: "Caverna escura a iluminada pela luz das proprias flores",
  },
  {
    numero: 9,
    nome: "O Caminho de Pedras",
    curso: "O Peso e o Chao",
    corPrincipal: "#808080",
    transformacao: "Curvada sob peso a de pe, leve, pedras no chao",
  },
  {
    numero: 10,
    nome: "A Sala do Eco",
    curso: "Voz de Dentro",
    corPrincipal: "#4A0E6A",
    corSecundaria: "#C9A96E",
    transformacao: "Silencio/sombra a voz/luz",
  },
];

export const SILHUETA_POSES = [
  "presenca",        // De pe, imovel
  "peso",            // Curvada
  "reflexao",        // Sentada
  "autoconexao",     // Maos no peito
  "recepcao",        // Maos abertas
  "avanco",          // A caminhar
  "contemplacao",    // De costas
  "coragem",         // Mao estendida
] as const;

export type SilhuetaPose = typeof SILHUETA_POSES[number];

export const PALETA_MESTRE = {
  fundo: "#1A1A2E",
  fundoClaro: "#232340",
  superficie: "#2A2A4A",
  terracota: "#C4745A",
  terracotaClaro: "#D4896F",
  dourado: "#C9A96E",
  douradoQuente: "#D4A853",
  douradoClaro: "#E0C48A",
  violeta: "#8B5CF6",
  violetaSuave: "#A78BFA",
  creme: "#F5F0E6",
  cremeSuave: "#E8E0D0",
} as const;
