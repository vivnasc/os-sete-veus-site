/**
 * Constantes centralizadas do projecto Os Sete Véus
 */

// Emails com acesso de admin/autora
export const ADMIN_EMAILS = ["viv.saraiva@gmail.com"];

// Mapeamento: access_type_code -> flag no perfil
export const ACCESS_FLAG_MAP: Record<string, string> = {
  "experiencia-veu-ilusao": "has_mirrors_access",
  "experiencia-veu-medo": "has_mirrors_access",
  "experiencia-veu-culpa": "has_mirrors_access",
  "experiencia-veu-identidade": "has_mirrors_access",
  "experiencia-veu-controlo": "has_mirrors_access",
  "experiencia-veu-desejo": "has_mirrors_access",
  "experiencia-veu-separacao": "has_mirrors_access",
  "pack-3-espelhos": "has_mirrors_access",
  "jornada-completa": "has_mirrors_access",
  "livro-codigo": "has_book_access",
};

// Todos os produtos (espelhos)
export const ALL_PRODUCTS = [
  "experiencia-veu-ilusao",
  "experiencia-veu-medo",
  "experiencia-veu-culpa",
  "experiencia-veu-identidade",
  "experiencia-veu-controlo",
  "experiencia-veu-desejo",
  "experiencia-veu-separacao",
];

// Slugs dos 20 cursos
export const COURSE_SLUGS = [
  "ouro-proprio",
  "sangue-e-seda",
  "a-arte-da-inteireza",
  "depois-do-fogo",
  "olhos-abertos",
  "pele-nua",
  "limite-sagrado",
  "flores-no-escuro",
  "o-peso-e-o-chao",
  "voz-de-dentro",
  "o-fio-invisivel",
  "o-espelho-do-outro",
  "o-silencio-que-grita",
  "a-teia",
  "a-chama",
  "a-mulher-antes-de-mae",
  "o-oficio-de-ser",
  "o-relogio-partido",
  "a-coroa-escondida",
  "a-fome",
] as const;

// Preços da subscrição (USD como base)
export const SUBSCRIPTION_PRICING = {
  monthly: { usd: 19, mzn: 1200, brl: 79, eur: 18 },
  annual: { usd: 149, mzn: 9500, brl: 599, eur: 139 },
  annualSavings: 35, // percentage
} as const;
