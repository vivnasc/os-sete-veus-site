// Curated shareable quotes from all Espelhos, Nós and the philosophical book.
// Each quote is mapped to a chapter slug (for reading integration)
// and a veil number (for card design/hashtags).

export type CitacaoPartilha = {
  texto: string
  veu: number
  fonte: 'livro' | 'espelho' | 'no'
  /** Chapter slug */
  chapterSlug?: string
  contexto?: string
}

// ─── Espelho da Ilusão — Véu 1 ──────────────────────────────

export const CITACOES_ESPELHO: CitacaoPartilha[] = [
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
  {
    texto: 'Passaste tanto tempo a ir para onde era suposto ires que perdeste capacidade de distinguir o que queres do que deves.',
    veu: 1, fonte: 'espelho', chapterSlug: 'parte-iii',
    contexto: 'O Espelho da Ilusão',
  },
  {
    texto: 'A ambiguidade era mais confortável do que a clareza, porque a clareza exigiria decisão e possivelmente dor.',
    veu: 1, fonte: 'espelho', chapterSlug: 'parte-iv',
    contexto: 'O Espelho da Ilusão',
  },
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

  // ─── Espelho do Medo — Véu 2 ────────────────────────────────
  {
    texto: 'Um homem vive tecnicamente. Existencialmente, permanece imóvel.',
    veu: 2, fonte: 'espelho', chapterSlug: 'parte-i',
    contexto: 'O Espelho do Medo',
  },
  {
    texto: 'Parara de correr, parara de desenhar por prazer, parara de tocar no ombro de Ana. A mente, essa, continuava em movimento perpétuo, girando em vazio.',
    veu: 2, fonte: 'espelho', chapterSlug: 'parte-i',
    contexto: 'O Espelho do Medo',
  },
  {
    texto: 'O meu pai está sempre em casa mas às vezes parece que não está.',
    veu: 2, fonte: 'espelho', chapterSlug: 'parte-iii',
    contexto: 'O Espelho do Medo',
  },
  {
    texto: 'Não havia erro no que fazia. Havia apenas continuidade.',
    veu: 2, fonte: 'espelho', chapterSlug: 'parte-ii',
    contexto: 'O Espelho do Medo',
  },
  {
    texto: 'Até as relações que importaram tinham agora de competir com um critério simples e implacável: o que ainda tinha energia para atravessar.',
    veu: 2, fonte: 'espelho', chapterSlug: 'parte-iv',
    contexto: 'O Espelho do Medo',
  },
  {
    texto: 'O gato simplesmente estava. E isso bastava.',
    veu: 2, fonte: 'espelho', chapterSlug: 'parte-i',
    contexto: 'O Espelho do Medo',
  },

  // ─── Espelho da Culpa — Véu 3 ───────────────────────────────
  {
    texto: 'Quando foi que "responsabilidade" deixou de ser escolha e virou identidade?',
    veu: 3, fonte: 'espelho', chapterSlug: 'parte-i',
    contexto: 'O Espelho da Culpa',
  },
  {
    texto: 'Trabalho doze horas por dia. Para quem?',
    veu: 3, fonte: 'espelho', chapterSlug: 'parte-i',
    contexto: 'O Espelho da Culpa',
  },
  {
    texto: 'Filipe continuava a pagar dívidas que o pai deixara. Porque era o filho mais velho. Porque era o responsável. Porque alguém tinha de fazer.',
    veu: 3, fonte: 'espelho', chapterSlug: 'parte-i',
    contexto: 'O Espelho da Culpa',
  },
  {
    texto: 'Este livro é sobre a prisão que construímos quando chamamos culpa de responsabilidade.',
    veu: 3, fonte: 'espelho', chapterSlug: 'parte-i',
    contexto: 'O Espelho da Culpa',
  },
  {
    texto: 'Ninguém te pediu isto.',
    veu: 3, fonte: 'espelho', chapterSlug: 'parte-i',
    contexto: 'O Espelho da Culpa',
  },

  // ─── Espelho da Identidade — Véu 4 ─────────────────────────
  {
    texto: 'Se me tirassem o cargo, o casamento, a reputação — sobraria alguém?',
    veu: 4, fonte: 'espelho', chapterSlug: 'parte-i',
    contexto: 'O Espelho da Identidade',
  },
  {
    texto: 'Estou a performar. Mesmo sozinho nas escadas, estou a performar.',
    veu: 4, fonte: 'espelho', chapterSlug: 'parte-i',
    contexto: 'O Espelho da Identidade',
  },
  {
    texto: 'Quando foi a última vez que me apresentei só como "Vítor"? Sem título, sem cargo, sem contexto.',
    veu: 4, fonte: 'espelho', chapterSlug: 'parte-i',
    contexto: 'O Espelho da Identidade',
  },
  {
    texto: 'Se eu fosse só Vítor, sem título, ele falaria comigo de todo?',
    veu: 4, fonte: 'espelho', chapterSlug: 'parte-i',
    contexto: 'O Espelho da Identidade',
  },

  // ─── Espelho do Controlo — Véu 5 ────────────────────────────
  {
    texto: 'Se eu parasse de segurar, quanto tempo até tudo desmoronar?',
    veu: 5, fonte: 'espelho', chapterSlug: 'parte-i',
    contexto: 'O Espelho do Controlo',
  },
  {
    texto: 'Quando foi que "responsabilidade" virou "prisão"?',
    veu: 5, fonte: 'espelho', chapterSlug: 'parte-i',
    contexto: 'O Espelho do Controlo',
  },
  {
    texto: 'Segurar tudo sozinha nunca foi força. Foi medo disfarçado de competência.',
    veu: 5, fonte: 'espelho', chapterSlug: 'parte-i',
    contexto: 'O Espelho do Controlo',
  },
  {
    texto: 'Os ombros doíam. Sempre doíam. Uma tensão que se instalava entre as omoplatas e que ela já nem notava realmente, apenas carregava.',
    veu: 5, fonte: 'espelho', chapterSlug: 'parte-i',
    contexto: 'O Espelho do Controlo',
  },

  // ─── Espelho do Desejo — Véu 6 ──────────────────────────────
  {
    texto: 'Se parasse de desejar, sobrava alguma coisa dentro de mim?',
    veu: 6, fonte: 'espelho', chapterSlug: 'parte-i',
    contexto: 'O Espelho do Desejo',
  },
  {
    texto: 'Vendo desejo profissionalmente. Consumo-o pessoalmente. Qual é a diferença?',
    veu: 6, fonte: 'espelho', chapterSlug: 'parte-i',
    contexto: 'O Espelho do Desejo',
  },
  {
    texto: 'Tens muita energia. Mas para quê?',
    veu: 6, fonte: 'espelho', chapterSlug: 'parte-i',
    contexto: 'O Espelho do Desejo',
  },
  {
    texto: 'Nunca parou para perguntar o que queria verdadeiramente. Porque responder ao que o mundo oferecia se tornara tão automático que deixou de distinguir desejo genuíno de resposta condicionada.',
    veu: 6, fonte: 'espelho', chapterSlug: 'parte-i',
    contexto: 'O Espelho do Desejo',
  },

  // ─── Espelho da Separação — Véu 7 ───────────────────────────
  {
    texto: 'Ele não entende. A frase formou-se automaticamente, eco de pensamento que tivera tantas vezes que deixara de notar quando pensava.',
    veu: 7, fonte: 'espelho', chapterSlug: 'parte-i',
    contexto: 'O Espelho da Separação',
  },
  {
    texto: 'O que exactamente ele não entendia? Talvez perspectivas diferentes vejam diferentes fragmentos da mesma realidade.',
    veu: 7, fonte: 'espelho', chapterSlug: 'parte-i',
    contexto: 'O Espelho da Separação',
  },
  {
    texto: 'Talvez a separação fundamental não seja entre quem entende e quem não entende — mas entre quem reconhece as próprias limitações e quem não as reconhece.',
    veu: 7, fonte: 'espelho', chapterSlug: 'parte-i',
    contexto: 'O Espelho da Separação',
  },
  {
    texto: 'Quando o véu da separação cai, todos os outros tremem.',
    veu: 7, fonte: 'espelho', chapterSlug: 'epilogo',
    contexto: 'O Espelho da Separação',
  },
]

// ─── Nó da Herança — Véu 1 ──────────────────────────────────

export const CITACOES_NO: CitacaoPartilha[] = [
  {
    texto: 'Há coisas que se herdam sem escritura. Herdam-se no silêncio de uma cozinha, no gesto repetido de uma mãe que arruma a loiça sem dizer o que sente.',
    veu: 1, fonte: 'no', chapterSlug: 'parte-i',
    contexto: 'O Nó da Herança',
  },
  {
    texto: 'Sara cresceu a observar a mãe. Aprendeu com Helena a arte de não perguntar, de não incomodar, de manter a superfície intacta mesmo quando por baixo tudo racha.',
    veu: 1, fonte: 'no', chapterSlug: 'parte-i',
    contexto: 'O Nó da Herança',
  },
  {
    texto: 'Porque é que Helena viu tudo durante anos e não disse nada? O que é que a mãe guardou que a filha acabou por carregar?',
    veu: 1, fonte: 'no', chapterSlug: 'parte-ii',
    contexto: 'O Nó da Herança',
  },
  {
    texto: 'O que se transmite sem palavras. E sobre o momento em que duas mulheres decidem, finalmente, falar.',
    veu: 1, fonte: 'no', chapterSlug: 'parte-iii',
    contexto: 'O Nó da Herança',
  },
  {
    texto: 'Durante anos, pareceu-me que não tinha o direito de contar a ninguém o que realmente sentia.',
    veu: 1, fonte: 'no', chapterSlug: 'parte-v',
    contexto: 'O Nó da Herança',
  },

  // ─── Nó do Silêncio — Véu 2 ─────────────────────────────────
  {
    texto: 'Há um tipo de distância que não se mede em quilómetros. Cresce dentro de casa, entre dois corpos que partilham cama e rotina e os mesmos copos na mesma prateleira.',
    veu: 2, fonte: 'no', chapterSlug: 'parte-i',
    contexto: 'O Nó do Silêncio',
  },
  {
    texto: 'O problema não era o desamor — era algo mais subtil e por isso mais difícil de ver. Era o medo que Rui carregava sem saber nomear.',
    veu: 2, fonte: 'no', chapterSlug: 'parte-i',
    contexto: 'O Nó do Silêncio',
  },
  {
    texto: 'Rui sentiu pela primeira vez o peso exacto daquilo que chamava conforto.',
    veu: 2, fonte: 'no', chapterSlug: 'parte-ii',
    contexto: 'O Nó do Silêncio',
  },
  {
    texto: 'Há uma caixa, — disse ela. E foi a primeira vez em doze anos que disse isso.',
    veu: 2, fonte: 'no', chapterSlug: 'parte-iv',
    contexto: 'O Nó do Silêncio',
  },
  {
    texto: 'Sinto que se ficar completamente, dou um poder que não sei gerir quando for retirado. Como se me tornasse refém de algo que não controlo.',
    veu: 2, fonte: 'no', chapterSlug: 'parte-v',
    contexto: 'O Nó do Silêncio',
  },
  {
    texto: 'Há algo naquele gesto — pôr as chaves, sentar, ficar — que Rui reconheceu como uma forma de dizer: estou aqui. Podes continuar.',
    veu: 2, fonte: 'no', chapterSlug: 'parte-vi',
    contexto: 'O Nó do Silêncio',
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

// ─── Helpers ─────────────────────────────────────────────────

export function getCitacoesForChapter(slug: string): CitacaoPartilha[] {
  return [...CITACOES_ESPELHO, ...CITACOES_NO].filter(c => c.chapterSlug === slug)
}

export function getCitacoesForVeu(veu: number): CitacaoPartilha[] {
  return [
    ...CITACOES_ESPELHO.filter(c => c.veu === veu),
    ...CITACOES_NO.filter(c => c.veu === veu),
    ...CITACOES_LIVRO.filter(c => c.veu === veu),
  ]
}

/** All shareable quotes */
export const ALL_CITACOES = [...CITACOES_ESPELHO, ...CITACOES_NO, ...CITACOES_LIVRO]
