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
  // Cursos
  "curso-corpo-que-guarda": "has_courses_access",
  "curso-arte-de-parar": "has_courses_access",
  "curso-habitar-o-vazio": "has_courses_access",
  "curso-fronteiras-vivas": "has_courses_access",
  "curso-voz-que-faltava": "has_courses_access",
  "pack-3-cursos": "has_courses_access",
  "todos-os-cursos": "has_courses_access",
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

// Todos os cursos
export const ALL_COURSES = [
  "curso-corpo-que-guarda",
  "curso-arte-de-parar",
  "curso-habitar-o-vazio",
  "curso-fronteiras-vivas",
  "curso-voz-que-faltava",
];
