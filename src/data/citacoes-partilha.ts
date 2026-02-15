// Curated shareable quotes from the book and Espelho da Ilusão
// Each quote is mapped to a chapter slug (for reading integration)
// and a veil number (for card design/hashtags)

export type CitacaoPartilha = {
  texto: string
  veu: number
  fonte: 'livro' | 'espelho'
  /** Chapter slug from ebook.ts (espelho) or chapter number (livro) */
  chapterSlug?: string
  contexto?: string
}

// ─── Espelho da Ilusão ──────────────────────────────────────
// Fiction with Sara — quotes from the reading experience

export const CITACOES_ESPELHO: CitacaoPartilha[] = [
  // Parte I — O café que nunca escolheu
  {
    texto: 'Quando foi que escolhi tomar café em vez de chá?',
    veu: 1, fonte: 'espelho', chapterSlug: 'parte-i',
    contexto: 'O Espelho da Ilusão',
  },
  {
    texto: 'Não lhe apetecia aquele café. Talvez nunca lhe tivesse apetecido verdadeiramente.',
    veu: 1, fonte: 'espelho', chapterSlug: 'parte-i',
    contexto: 'O Espelho da Ilusão',
  },

  // Parte II — Ser vista
  {
    texto: 'Quando foi a última vez que dei uma opinião sem calcular primeiro o que queriam ouvir?',
    veu: 1, fonte: 'espelho', chapterSlug: 'parte-ii',
    contexto: 'O Espelho da Ilusão',
  },
  {
    texto: 'Pareces que estás a viver uma vida que não é tua, como se fosses actriz competente num papel que decoraste na perfeição mas que nunca escolheste interpretar.',
    veu: 1, fonte: 'espelho', chapterSlug: 'parte-ii',
    contexto: 'O Espelho da Ilusão',
  },

  // Parte III — A decisão que não era dela
  {
    texto: 'Passaste tanto tempo a ir para onde era suposto ires que perdeste capacidade de distinguir o que queres do que deves.',
    veu: 1, fonte: 'espelho', chapterSlug: 'parte-iii',
    contexto: 'O Espelho da Ilusão',
  },

  // Parte IV — O sim que era vazio
  {
    texto: 'A ambiguidade era mais confortável do que a clareza, porque a clareza exigiria decisão e possivelmente dor.',
    veu: 1, fonte: 'espelho', chapterSlug: 'parte-iv',
    contexto: 'O Espelho da Ilusão',
  },

  // Parte V — O capuccino com canela
  {
    texto: 'Pela primeira vez, estava a caminhar em direcção a si mesma. Não sabia quem iria encontrar. Mas o não saber não a paralisava. Movia-a.',
    veu: 1, fonte: 'espelho', chapterSlug: 'parte-v',
    contexto: 'O Espelho da Ilusão',
  },
  {
    texto: 'O véu tinha caído. E debaixo dele não havia respostas claras, mas havia qualquer coisa que antes não existia: a sensação de estar a caminhar em direcção a si mesma.',
    veu: 1, fonte: 'espelho', chapterSlug: 'parte-v',
    contexto: 'O Espelho da Ilusão',
  },

  // Parte VI — O regresso a si
  {
    texto: 'Passei a vida a responder. Ao que os meus pais esperavam. Ao que o trabalho exigia. Ao que parecia sensato. Nunca parei para perguntar o que queria de facto.',
    veu: 1, fonte: 'espelho', chapterSlug: 'parte-vi',
    contexto: 'O Espelho da Ilusão',
  },
  {
    texto: 'Ausência de mim dentro da minha própria vida.',
    veu: 1, fonte: 'espelho', chapterSlug: 'parte-vi',
    contexto: 'O Espelho da Ilusão',
  },
  {
    texto: 'Como quem está a ler a palavra sol num livro em vez de o sentir na pele.',
    veu: 1, fonte: 'espelho', chapterSlug: 'parte-vi',
    contexto: 'O Espelho da Ilusão',
  },

  // Epílogo — O que encontramos quando o véu cai
  {
    texto: 'A ilusão não é o mundo, nem as circunstâncias, nem as pessoas. A ilusão é acreditar que não há escolha.',
    veu: 1, fonte: 'espelho', chapterSlug: 'epilogo',
    contexto: 'O Espelho da Ilusão',
  },
  {
    texto: 'Quando o véu cai, não encontramos vazio. Encontramo-nos.',
    veu: 1, fonte: 'espelho', chapterSlug: 'epilogo',
    contexto: 'O Espelho da Ilusão',
  },
  {
    texto: 'Escolher uma vida imperfeita e incerta, mas verdadeira, em vez de uma vida impecável e vazia.',
    veu: 1, fonte: 'espelho', chapterSlug: 'epilogo',
    contexto: 'O Espelho da Ilusão',
  },
  {
    texto: 'Há mais para ti do que aquilo que tens vivido.',
    veu: 1, fonte: 'espelho', chapterSlug: 'epilogo',
    contexto: 'O Espelho da Ilusão',
  },
]

// ─── Livro — Os Sete Véus do Despertar ──────────────────────
// Philosophical/spiritual quotes from the book chapters

export const CITACOES_LIVRO: CitacaoPartilha[] = [
  // Véu 1 — Permanência
  {
    texto: 'E se não precisássemos de um nome, de uma história ou de um rótulo para existir?',
    veu: 1, fonte: 'livro',
    contexto: 'Quando o Eu Começa a Vacilar',
  },
  {
    texto: 'A insatisfação não é erro. É sinal. Um sussurro que pede atenção.',
    veu: 1, fonte: 'livro',
    contexto: 'As Máscaras do Vazio',
  },
  {
    texto: 'O vazio não se anuncia com estrondo — cresce em silêncio, como corrente que desgasta a pedra sem pressa.',
    veu: 1, fonte: 'livro',
    contexto: 'As Máscaras do Vazio',
  },
  {
    texto: 'Ser autêntico não exige gestos dramáticos. É reencontro silencioso com o que sempre fomos antes de aprendermos a esconder-nos.',
    veu: 1, fonte: 'livro',
    contexto: 'As Máscaras do Vazio',
  },
  {
    texto: 'A identidade é reflexo da lua na água — real, mas intangível.',
    veu: 1, fonte: 'livro',
    contexto: 'Para Além do Eu',
  },
  {
    texto: 'O universal revela-se quando o eu se torna transparente o bastante para que a vida passe através de nós sem barreiras.',
    veu: 1, fonte: 'livro',
    contexto: 'Para Além do Eu',
  },

  // Véu 2 — Memória
  {
    texto: 'Não é o passado que nos molda, é a forma como o narramos.',
    veu: 2, fonte: 'livro',
    contexto: 'A Armadilha da Narrativa',
  },
  {
    texto: 'O presente não precisa de ser eco do ontem. É espaço aberto, livre do peso da continuidade.',
    veu: 2, fonte: 'livro',
    contexto: 'A Armadilha da Narrativa',
  },
  {
    texto: 'Soltar não é negar. É olhar de outro modo: a ferida torna-se experiência; o trauma, eco que perdeu autoridade.',
    veu: 2, fonte: 'livro',
    contexto: 'Soltar a Identidade Histórica',
  },

  // Introdução — universal
  {
    texto: 'O despertar não é uma chegada a um ponto fixo. É um processo gradual que vai moldando e desfazendo as camadas que cobrem o olhar da consciência.',
    veu: 1, fonte: 'livro',
    contexto: 'Os Sete Véus do Despertar',
  },
]

// ─── Helper: get quotes for a chapter slug ───────────────────

export function getCitacoesForChapter(slug: string): CitacaoPartilha[] {
  return CITACOES_ESPELHO.filter(c => c.chapterSlug === slug)
}

export function getCitacoesForVeu(veu: number): CitacaoPartilha[] {
  return [
    ...CITACOES_ESPELHO.filter(c => c.veu === veu),
    ...CITACOES_LIVRO.filter(c => c.veu === veu),
  ]
}

/** All shareable quotes */
export const ALL_CITACOES = [...CITACOES_ESPELHO, ...CITACOES_LIVRO]
