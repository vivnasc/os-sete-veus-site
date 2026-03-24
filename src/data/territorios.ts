export interface Territorio {
  numero: number;
  slug: string;
  nome: string;
  curso: string;
  corPrincipal: string;
  corSecundaria?: string;
  categoria: "materia" | "herancas" | "ciclos" | "fronteiras";
  transformacao: string;
}

export const TERRITORIOS: Territorio[] = [
  // ─── 10 Territorios Originais ───
  {
    numero: 1,
    slug: "ouro-proprio",
    nome: "A Casa dos Espelhos Dourados",
    curso: "Ouro Próprio",
    corPrincipal: "#D4A853",
    categoria: "herancas",
    transformacao: "Espelhos cobertos a descobertos, reflexos distorcidos a claros",
  },
  {
    numero: 2,
    slug: "sangue-e-seda",
    nome: "A Árvore das Raízes Visíveis",
    curso: "Sangue e Seda",
    corPrincipal: "#8B3A3A",
    categoria: "herancas",
    transformacao: "Raízes emaranhadas a reorganizadas, amanhecer atrás da árvore",
  },
  {
    numero: 3,
    slug: "a-arte-da-inteireza",
    nome: "A Ponte entre Duas Margens",
    curso: "A Arte da Inteireza",
    corPrincipal: "#7B68EE",
    categoria: "fronteiras",
    transformacao: "Rio sem ponte a ponte completa, duas silhuetas inteiras com espaço",
  },
  {
    numero: 4,
    slug: "depois-do-fogo",
    nome: "O Campo Queimado",
    curso: "Depois do Fogo",
    corPrincipal: "#4A4A4A",
    corSecundaria: "#E8651A",
    categoria: "ciclos",
    transformacao: "Destruição a vida nova, diferente do que era",
  },
  {
    numero: 5,
    slug: "olhos-abertos",
    nome: "A Encruzilhada Infinita",
    curso: "Olhos Abertos",
    corPrincipal: "#6B8CAE",
    categoria: "ciclos",
    transformacao: "Nevoeiro total a parcialmente claro, silhueta dá o primeiro passo",
  },
  {
    numero: 6,
    slug: "pele-nua",
    nome: "O Corpo-Paisagem",
    curso: "Pele Nua",
    corPrincipal: "#C4745A",
    categoria: "materia",
    transformacao: "Paisagem desconhecida a reconhecida e habitada",
  },
  {
    numero: 7,
    slug: "limite-sagrado",
    nome: "A Muralha que Nasce do Chão",
    curso: "Limite Sagrado",
    corPrincipal: "#D4A853",
    categoria: "fronteiras",
    transformacao: "Sem limite a muralha de luz, com porta que a silhueta abre",
  },
  {
    numero: 8,
    slug: "flores-no-escuro",
    nome: "O Jardim Subterrâneo",
    curso: "Flores no Escuro",
    corPrincipal: "#1A3A5C",
    corSecundaria: "#4AE8A0",
    categoria: "ciclos",
    transformacao: "Caverna escura a iluminada pela luz das próprias flores",
  },
  {
    numero: 9,
    slug: "o-peso-e-o-chao",
    nome: "O Caminho de Pedras",
    curso: "O Peso e o Chão",
    corPrincipal: "#808080",
    categoria: "materia",
    transformacao: "Curvada sob peso a de pé, leve, pedras no chão",
  },
  {
    numero: 10,
    slug: "voz-de-dentro",
    nome: "A Sala do Eco",
    curso: "Voz de Dentro",
    corPrincipal: "#4A0E6A",
    corSecundaria: "#C9A96E",
    categoria: "fronteiras",
    transformacao: "Silêncio/sombra a voz/luz",
  },

  // ─── 10 Territorios de Dualidade ───
  {
    numero: 11,
    slug: "o-fio-invisivel",
    nome: "O Tear Cósmico",
    curso: "O Fio Invisível",
    corPrincipal: "#B8860B",
    corSecundaria: "#F0E6D0",
    categoria: "herancas",
    transformacao: "Fios soltos a tear completo, cada fio conecta a silhueta ao todo",
  },
  {
    numero: 12,
    slug: "o-espelho-do-outro",
    nome: "O Lago dos Reflexos",
    curso: "O Espelho do Outro",
    corPrincipal: "#4682B4",
    corSecundaria: "#87CEEB",
    categoria: "fronteiras",
    transformacao: "Água turva a cristalina, dois reflexos que se reconhecem",
  },
  {
    numero: 13,
    slug: "o-silencio-que-grita",
    nome: "A Cripta dos Ecos",
    curso: "O Silêncio que Grita",
    corPrincipal: "#2F2F2F",
    corSecundaria: "#CD5C5C",
    categoria: "herancas",
    transformacao: "Paredes mudas a paredes que falam, ecos que se libertam",
  },
  {
    numero: 14,
    slug: "a-teia",
    nome: "A Teia Luminosa",
    curso: "A Teia",
    corPrincipal: "#9370DB",
    corSecundaria: "#E6E6FA",
    categoria: "fronteiras",
    transformacao: "Teia que prende a teia que sustenta, cada nó brilha",
  },
  {
    numero: 15,
    slug: "a-chama",
    nome: "O Vulcão Interior",
    curso: "Brasa Viva",
    corPrincipal: "#DC143C",
    corSecundaria: "#FF6347",
    categoria: "materia",
    transformacao: "Magma contido a erupção controlada, fogo que ilumina sem destruir",
  },
  {
    numero: 16,
    slug: "a-mulher-antes-de-mae",
    nome: "O Ninho Vazio",
    curso: "Antes do Ninho",
    corPrincipal: "#8B7355",
    corSecundaria: "#F5DEB3",
    categoria: "herancas",
    transformacao: "Ninho que sufoca a ninho que acolhe, a mulher sai e regressa inteira",
  },
  {
    numero: 17,
    slug: "o-oficio-de-ser",
    nome: "A Oficina Abandonada",
    curso: "Mãos Cansadas",
    corPrincipal: "#A0522D",
    corSecundaria: "#D2B48C",
    categoria: "ciclos",
    transformacao: "Ferramentas gastas a mãos que escolhem o que construir",
  },
  {
    numero: 18,
    slug: "o-relogio-partido",
    nome: "A Ampulheta Partida",
    curso: "Estações Partidas",
    corPrincipal: "#708090",
    corSecundaria: "#C0C0C0",
    categoria: "ciclos",
    transformacao: "Areia presa a areia que flui, tempo como aliado",
  },
  {
    numero: 19,
    slug: "a-coroa-escondida",
    nome: "O Trono Submerso",
    curso: "Ouro e Sombra",
    corPrincipal: "#DAA520",
    corSecundaria: "#4B0082",
    categoria: "materia",
    transformacao: "Coroa enterrada a coroa usada, poder aceite sem culpa",
  },
  {
    numero: 20,
    slug: "a-fome",
    nome: "A Mesa Vazia",
    curso: "Pão e Silêncio",
    corPrincipal: "#8B4513",
    corSecundaria: "#FAEBD7",
    categoria: "materia",
    transformacao: "Mesa vazia a mesa posta, fome nomeada e saciada",
  },
];

export const SILHUETA_POSES = [
  "presenca",        // De pé, imóvel
  "peso",            // Curvada
  "reflexao",        // Sentada
  "autoconexao",     // Mãos no peito
  "recepcao",        // Mãos abertas
  "avanco",          // A caminhar
  "contemplacao",    // De costas
  "coragem",         // Mão estendida
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
