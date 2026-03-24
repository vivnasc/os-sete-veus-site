/**
 * Scripts das aulas — Ouro Proprio
 *
 * Curso 1: A relacao com dinheiro como espelho de ti
 * Territorio: A Casa dos Espelhos Dourados
 *
 * INSTRUCOES PARA ESCRITA:
 * - Ler course-guidelines.ts para tom e estrutura
 * - Cada sub-aula tem 5 seccoes (pergunta, situacao, revelacao, gesto, frase)
 * - Tom: calmo, proximo, filosofico. Fala a "tu". Corpo como referencia.
 * - NUNCA usar: "veu", "espelho", "no" como conceito
 * - NUNCA usar frases listadas em TONE_GUIDELINES.forbidden
 * - Vida real, nao teoria. Terca-feira, nao transcendencia.
 *
 * STATUS: draft → approved → produced
 * Actualizar status apos revisao da Vivianne.
 */

export type ScriptStatus = "not_started" | "draft" | "approved" | "produced";

export type LessonScript = {
  moduleNumber: number;
  subLetter: string;
  title: string;
  perguntaInicial: string;
  situacaoHumana: string;
  revelacaoPadrao: string;
  gestoConsciencia: string;
  fraseFinal: string;
  status: ScriptStatus;
  notes?: string; // notas de revisao da Vivianne
};

export const OURO_PROPRIO_SCRIPTS: Record<string, LessonScript> = {
  // ─── MODULO 1: O Extracto como Espelho ──────────────────────────────────

  m1a: {
    moduleNumber: 1,
    subLetter: "A",
    title: "O medo de olhar",
    perguntaInicial: "",
    situacaoHumana: "",
    revelacaoPadrao: "",
    gestoConsciencia: "",
    fraseFinal: "",
    status: "not_started",
  },

  m1b: {
    moduleNumber: 1,
    subLetter: "B",
    title: "Ler o extracto como um diario",
    perguntaInicial: "",
    situacaoHumana: "",
    revelacaoPadrao: "",
    gestoConsciencia: "",
    fraseFinal: "",
    status: "not_started",
  },

  m1c: {
    moduleNumber: 1,
    subLetter: "C",
    title: "O corpo e o dinheiro",
    perguntaInicial: "",
    situacaoHumana: "",
    revelacaoPadrao: "",
    gestoConsciencia: "",
    fraseFinal: "",
    status: "not_started",
  },

  // ─── MODULO 2: A Heranca Financeira Emocional ───────────────────────────

  m2a: {
    moduleNumber: 2,
    subLetter: "A",
    title: "Os scripts de infancia",
    perguntaInicial: "",
    situacaoHumana: "",
    revelacaoPadrao: "",
    gestoConsciencia: "",
    fraseFinal: "",
    status: "not_started",
  },

  m2b: {
    moduleNumber: 2,
    subLetter: "B",
    title: "O que viste vs. o que ouviste",
    perguntaInicial: "",
    situacaoHumana: "",
    revelacaoPadrao: "",
    gestoConsciencia: "",
    fraseFinal: "",
    status: "not_started",
  },

  m2c: {
    moduleNumber: 2,
    subLetter: "C",
    title: "Reescrever os scripts",
    perguntaInicial: "",
    situacaoHumana: "",
    revelacaoPadrao: "",
    gestoConsciencia: "",
    fraseFinal: "",
    status: "not_started",
  },

  // ─── MODULO 3: A Vergonha do Dinheiro ───────────────────────────────────

  m3a: {
    moduleNumber: 3,
    subLetter: "A",
    title: "Vergonha de nao ter",
    perguntaInicial: "",
    situacaoHumana: "",
    revelacaoPadrao: "",
    gestoConsciencia: "",
    fraseFinal: "",
    status: "not_started",
  },

  m3b: {
    moduleNumber: 3,
    subLetter: "B",
    title: "Vergonha de querer mais",
    perguntaInicial: "",
    situacaoHumana: "",
    revelacaoPadrao: "",
    gestoConsciencia: "",
    fraseFinal: "",
    status: "not_started",
  },

  m3c: {
    moduleNumber: 3,
    subLetter: "C",
    title: "Dinheiro e dignidade",
    perguntaInicial: "",
    situacaoHumana: "",
    revelacaoPadrao: "",
    gestoConsciencia: "",
    fraseFinal: "",
    status: "not_started",
  },

  // ─── MODULO 4: Cobrar, Receber, Merecer ────────────────────────────────

  m4a: {
    moduleNumber: 4,
    subLetter: "A",
    title: "O desconto automatico",
    perguntaInicial: "",
    situacaoHumana: "",
    revelacaoPadrao: "",
    gestoConsciencia: "",
    fraseFinal: "",
    status: "not_started",
  },

  m4b: {
    moduleNumber: 4,
    subLetter: "B",
    title: "A ligacao cobrar-merecer",
    perguntaInicial: "",
    situacaoHumana: "",
    revelacaoPadrao: "",
    gestoConsciencia: "",
    fraseFinal: "",
    status: "not_started",
  },

  m4c: {
    moduleNumber: 4,
    subLetter: "C",
    title: "Receber sem devolver imediatamente",
    perguntaInicial: "",
    situacaoHumana: "",
    revelacaoPadrao: "",
    gestoConsciencia: "",
    fraseFinal: "",
    status: "not_started",
  },

  // ─── MODULO 5: Gastar em Ti ─────────────────────────────────────────────

  m5a: {
    moduleNumber: 5,
    subLetter: "A",
    title: "A hierarquia dos gastos",
    perguntaInicial: "",
    situacaoHumana: "",
    revelacaoPadrao: "",
    gestoConsciencia: "",
    fraseFinal: "",
    status: "not_started",
  },

  m5b: {
    moduleNumber: 5,
    subLetter: "B",
    title: "Culpa e prazer",
    perguntaInicial: "",
    situacaoHumana: "",
    revelacaoPadrao: "",
    gestoConsciencia: "",
    fraseFinal: "",
    status: "not_started",
  },

  m5c: {
    moduleNumber: 5,
    subLetter: "C",
    title: "O investimento em ti como acto politico",
    perguntaInicial: "",
    situacaoHumana: "",
    revelacaoPadrao: "",
    gestoConsciencia: "",
    fraseFinal: "",
    status: "not_started",
  },

  // ─── MODULO 6: Dinheiro e Relacoes ──────────────────────────────────────

  m6a: {
    moduleNumber: 6,
    subLetter: "A",
    title: "Quem paga, manda?",
    perguntaInicial: "",
    situacaoHumana: "",
    revelacaoPadrao: "",
    gestoConsciencia: "",
    fraseFinal: "",
    status: "not_started",
  },

  m6b: {
    moduleNumber: 6,
    subLetter: "B",
    title: "Dependencia financeira e medo",
    perguntaInicial: "",
    situacaoHumana: "",
    revelacaoPadrao: "",
    gestoConsciencia: "",
    fraseFinal: "",
    status: "not_started",
  },

  m6c: {
    moduleNumber: 6,
    subLetter: "C",
    title: "A conversa sobre dinheiro que evitas",
    perguntaInicial: "",
    situacaoHumana: "",
    revelacaoPadrao: "",
    gestoConsciencia: "",
    fraseFinal: "",
    status: "not_started",
  },

  // ─── MODULO 7: Ganhar Mais Nao Resolve ──────────────────────────────────

  m7a: {
    moduleNumber: 7,
    subLetter: "A",
    title: "O buraco que o dinheiro nao enche",
    perguntaInicial: "",
    situacaoHumana: "",
    revelacaoPadrao: "",
    gestoConsciencia: "",
    fraseFinal: "",
    status: "not_started",
  },

  m7b: {
    moduleNumber: 7,
    subLetter: "B",
    title: "Sabotagem financeira",
    perguntaInicial: "",
    situacaoHumana: "",
    revelacaoPadrao: "",
    gestoConsciencia: "",
    fraseFinal: "",
    status: "not_started",
  },

  m7c: {
    moduleNumber: 7,
    subLetter: "C",
    title: "Suficiente: quando e suficiente?",
    perguntaInicial: "",
    situacaoHumana: "",
    revelacaoPadrao: "",
    gestoConsciencia: "",
    fraseFinal: "",
    status: "not_started",
  },

  // ─── MODULO 8: Dinheiro como Liberdade ──────────────────────────────────

  m8a: {
    moduleNumber: 8,
    subLetter: "A",
    title: "De sobrevivencia a direccao",
    perguntaInicial: "",
    situacaoHumana: "",
    revelacaoPadrao: "",
    gestoConsciencia: "",
    fraseFinal: "",
    status: "not_started",
  },

  m8b: {
    moduleNumber: 8,
    subLetter: "B",
    title: "O mapa do futuro que queres financiar",
    perguntaInicial: "",
    situacaoHumana: "",
    revelacaoPadrao: "",
    gestoConsciencia: "",
    fraseFinal: "",
    status: "not_started",
  },

  m8c: {
    moduleNumber: 8,
    subLetter: "C",
    title: "Liberdade, nao acumulacao",
    perguntaInicial: "",
    situacaoHumana: "",
    revelacaoPadrao: "",
    gestoConsciencia: "",
    fraseFinal: "",
    status: "not_started",
  },
};
