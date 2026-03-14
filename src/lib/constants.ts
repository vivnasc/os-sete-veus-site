/**
 * Constantes centralizadas do projecto Os Sete Veus
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

// Slugs dos 10 cursos
export const COURSE_SLUGS = [
  "ouro-proprio",
  "sangue-e-seda",
  "a-arte-da-inteireza",
  "depois-do-fogo",
  "olhos-abertos",
  "a-pele-lembra",
  "limite-sagrado",
  "flores-no-escuro",
  "o-peso-e-o-chao",
  "voz-de-dentro",
] as const;

// Precos dos cursos (USD como base, Stripe nao suporta MZN)
export const COURSE_PRICING = {
  individual: { usd: 49, mzn: 3100, brl: 199, eur: 46 },
} as const;
