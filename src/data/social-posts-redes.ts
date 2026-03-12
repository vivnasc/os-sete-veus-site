// Banco de conteúdo para redes sociais — Os Sete Véus
// Estrutura: { hook, corpo, cta } em cada post
// Organizados por categoria temática para variedade no feed
// Todos assinados por Vivianne. Formato indicado por post.
//
// Como usar:
//   - Selecciona 1 post por dia, rotacionando categorias
//   - Adapta o formato ao dia da semana (ver sugestão em cada post)
//   - O hook vai como primeira linha / slide de capa no carrossel
//   - O corpo vai nos slides seguintes ou na legenda
//   - O cta é sempre a última linha

export type PostRedes = {
  id: string;
  categoria: PostCategoria;
  hook: string;
  corpo: string;
  cta: string;
  formato: "carousel" | "reel" | "single" | "story";
  hashtags: string[];
  // Sugestão de dia da semana: 0=Dom, 1=Seg, ... 6=Sab
  diaSugerido?: number;
};

export type PostCategoria =
  | "automatico"        // Viver no automático — escolhas não feitas
  | "permissao"         // Dar-se permissão para querer
  | "silencio"          // O que o silêncio revela
  | "reconhecimento"    // Reconhecer-se numa história de ficção
  | "perguntas"         // Perguntas directas que geram introspecção
  | "medo_veu"          // O véu do medo
  | "culpa_veu"         // O véu da culpa
  | "identidade_veu"    // O véu da identidade
  | "controlo_veu"      // O véu do controlo
  | "nos_relacional"    // A dimensão relacional — os Nós
  | "provocacao"        // Contra o wellness superficial
  | "voz_vivianne";     // A autora na primeira pessoa

const TAGS_BASE = [
  "#OsSetéVéus",
  "#VivianneDosSantos",
  "#FicçãoPsicológica",
  "#Autoconhecimento",
];

const TAGS_ILUSAO = [...TAGS_BASE, "#EspelhoDaIlusão", "#VéuDaIlusão"];
const TAGS_MEDO = [...TAGS_BASE, "#EspelhoDoMedo", "#VéuDoMedo"];
const TAGS_CULPA = [...TAGS_BASE, "#EspelhoDaCulpa", "#VéuDaCulpa"];
const TAGS_IDENTIDADE = [...TAGS_BASE, "#EspelhoDaIdentidade"];
const TAGS_CONTROLO = [...TAGS_BASE, "#EspelhoDoControlo"];
const TAGS_GERAL = [...TAGS_BASE, "#LiteraturaFeminina", "#MulheresQueDespertam"];

// ─── AUTOMÁTICO — viver no piloto automático ────────────────────────────────

export const postsAutomatico: PostRedes[] = [
  {
    id: "aut-01",
    categoria: "automatico",
    hook: "Quando foi a última vez que fizeste uma escolha — e soubeste, no momento em que a fizeste, que era tua?",
    corpo:
      "Não a escolha certa. Não a escolha prática. Não a que fazia sentido para todos. A que era tua.\n\nA maioria de nós aprende muito cedo que as escolhas se fazem por antecipação: o que vão achar, o que é esperado, o que não vai criar problemas. Com o tempo, isso torna-se tão automático que já nem parece escolha. Parece carácter.\n\nMas não é. É um hábito aprendido. E hábitos têm origem.",
    cta: "Fica com esta pergunta hoje. Não precisas de responder agora. — Vivianne",
    formato: "carousel",
    hashtags: TAGS_ILUSAO,
    diaSugerido: 0,
  },
  {
    id: "aut-02",
    categoria: "automatico",
    hook: "A Sara acordou três minutos antes do despertador. Como acontecia sempre.",
    corpo:
      "A vida funcionava. Os prazos cumpriam-se. Os parabéns chegavam nas alturas certas.\n\nE então, numa manhã igual a todas as outras, surgiu uma pergunta absurda: quando foi que escolhi tomar café em vez de chá?\n\nNão era sobre café. Era sobre tudo o resto.\n\nÉ assim que começa O Espelho da Ilusão — com uma pergunta pequena que abre algo muito maior.",
    cta: "Se a Sara te parece familiar, o Espelho da Ilusão está disponível. Link na bio. — Vivianne",
    formato: "single",
    hashtags: TAGS_ILUSAO,
    diaSugerido: 1,
  },
  {
    id: "aut-03",
    categoria: "automatico",
    hook: "Disseste 'tanto faz' hoje? Conta quantas vezes.",
    corpo:
      "Não é conformismo. É protecção.\n\nAprendemos que ter opinião é arriscar. Que preferir é expor-nos. Que 'tanto faz' é mais seguro do que querer algo — e não o conseguir, ou conseguir e não merecer, ou merecer e ter de defender.\n\nEntão vamos dizendo 'tanto faz' até já não sabermos se ainda temos opinião sobre alguma coisa.\n\nTer uma preferência não é exigência. É o mínimo de presença.",
    cta: "Responde honestamente: o que é que não é tanto faz para ti mas continuas a dizer que é? — Vivianne",
    formato: "reel",
    hashtags: TAGS_ILUSAO,
    diaSugerido: 3,
  },
  {
    id: "aut-04",
    categoria: "automatico",
    hook: "Quantas decisões tomaste hoje que foram realmente tuas?",
    corpo:
      "O que comeste ao pequeno-almoço, como respondeste àquela mensagem, o que disseste quando te perguntaram a tua opinião na reunião.\n\nAlgumas dessas escolhas foram tuas. Outras foram o que era mais fácil, mais rápido, menos conflituoso, mais esperado.\n\nNão há problema nisso. O problema é quando deixamos de saber qual é qual.",
    cta: "Esta semana, repara numa. Só uma. — Vivianne",
    formato: "story",
    hashtags: TAGS_GERAL,
    diaSugerido: 2,
  },
];

// ─── PERMISSÃO — dar-se permissão para querer ────────────────────────────────

export const postsPermissao: PostRedes[] = [
  {
    id: "per-01",
    categoria: "permissao",
    hook: "Querer mais não é ingratidão. Mas ninguém te disse isso.",
    corpo:
      "Disseram-te que devias ser grata pelo que tens. Que há quem tenha muito menos. Que não é altura. Que és ambiciosa demais, exigente demais, difícil demais.\n\nEntão aprendeste a qualificar o que queres antes de o dizer. 'Eu sei que já tenho muito, mas...' 'Não me estou a queixar, só...' 'Podia ser pior, só que...'\n\nA permissão de querer não se pede. Dá-se a si mesma. E isso é uma das coisas mais difíceis que existe.",
    cta: "Do que é que precisas de te dar permissão — hoje, agora? — Vivianne",
    formato: "carousel",
    hashtags: TAGS_CULPA,
    diaSugerido: 5,
  },
  {
    id: "per-02",
    categoria: "permissao",
    hook: "O medo de conseguir é mais real do que o medo de falhar.",
    corpo:
      "Falhar tem um script. Tens experiência com a dor de não chegar. Sabes como se recupera.\n\nMas conseguir? Conseguir e descobrir que ainda assim não és suficiente? Conseguir e que os outros mudem a forma como te vêem? Conseguir e deixar de pertencer ao grupo de quem 'ainda está a tentar'?\n\nEsse medo é mais raro de nomear — e por isso dura mais tempo.",
    cta: "Reconheces-te? — Vivianne",
    formato: "reel",
    hashtags: TAGS_MEDO,
    diaSugerido: 1,
  },
  {
    id: "per-03",
    categoria: "permissao",
    hook: "Cada vez que fazes algo só para ti, há uma voz que diz que não mereces.",
    corpo:
      "Não é a tua voz. É uma que aprendeste.\n\nAprendeste que o teu tempo pertence aos outros primeiro. Que o teu descanso tem de ser merecido. Que cuidar de ti é egoísmo se alguém ao redor ainda precisa de alguma coisa.\n\nEssa voz não é consciência. É herança. E heranças podem ser devolvidas.",
    cta: "O Espelho da Culpa chega em Abril. Para quem já sabe que esta voz não é sua — mas ainda não a conseguiu calar. — Vivianne",
    formato: "single",
    hashtags: TAGS_CULPA,
    diaSugerido: 4,
  },
  {
    id: "per-04",
    categoria: "permissao",
    hook: "Não te tornaste pequena por acidente.",
    corpo:
      "Em algum momento aprendeste que ser menos era mais seguro. Que não ocupar muito espaço era melhor. Que querer pouco era mais simpático.\n\nNão foi fraqueza. Foi adaptação. O problema é que o que foi útil a uma rapariga de 9 anos pode estar a custar muito caro a uma mulher de 35.",
    cta: "Quando foi que aprendeste a ser pequena? — Vivianne",
    formato: "carousel",
    hashtags: TAGS_GERAL,
    diaSugerido: 6,
  },
];

// ─── SILÊNCIO — o que o silêncio revela ─────────────────────────────────────

export const postsSilencio: PostRedes[] = [
  {
    id: "sil-01",
    categoria: "silencio",
    hook: "O que aparece quando finalmente paras?",
    corpo:
      "Não me refiro a um fim de semana de descanso. Refiro-me ao silêncio real — aquele em que não há tarefa, não há ecrã, não há razão para estar ocupada.\n\nMuitas de nós nunca chegamos aí. Preenchemos antes de chegarmos. Não porque sejamos preguiçosas — porque sabemos, instintivamente, o que está à espera no silêncio. E ainda não estamos prontas para o encontrar.\n\nMas ele está lá. E não desaparece.",
    cta: "O que é que evitas encontrar quando preenches o silêncio? — Vivianne",
    formato: "carousel",
    hashtags: TAGS_GERAL,
    diaSugerido: 0,
  },
  {
    id: "sil-02",
    categoria: "silencio",
    hook: "Há perguntas que só surgem quando tudo para.",
    corpo:
      "Durante o dia, geres. Respondes, decides, entregas. Não há espaço para o resto.\n\nMas à noite, quando a casa fica em silêncio, algo emerge. Não é queixa — é uma intuição suave. Uma pergunta que não tem lugar na agenda. Uma voz que não sabe como ser prática.\n\nEssa voz não está errada. Está apenas à espera de ser ouvida.",
    cta: "Os Espelhos foram escritos para esse momento — quando tudo para e algo começa. Link na bio. — Vivianne",
    formato: "single",
    hashtags: TAGS_ILUSAO,
    diaSugerido: 6,
  },
  {
    id: "sil-03",
    categoria: "silencio",
    hook: "A ocupação crónica é uma forma de não ter de te perguntar como estás.",
    corpo:
      "Não estás sempre ocupada porque és produtiva. Às vezes estás ocupada porque estar ocupada é mais fácil do que sentar e ouvir o que está por baixo.\n\nIsto não é crítica. É observação. Reconheço-me nisto também.\n\nO movimento cria ruído suficiente para não ouvires o que precisa de atenção. Mas o que precisa de atenção não desiste.",
    cta: "Quando foi a última vez que estiveste parada — sem um motivo? — Vivianne",
    formato: "reel",
    hashtags: TAGS_GERAL,
    diaSugerido: 3,
  },
];

// ─── RECONHECIMENTO — reconhecer-se numa história ───────────────────────────

export const postsReconhecimento: PostRedes[] = [
  {
    id: "rec-01",
    categoria: "reconhecimento",
    hook: "É ficção. Mas uma leitora disse que teve de pousar o livro a meio do primeiro capítulo.",
    corpo:
      "Não porque fosse difícil. Porque era demasiado verdadeiro para continuar sem parar.\n\nEsse é o momento que a ficção faz quando funciona: não te conta uma história. Mostra-te a tua.\n\nO Espelho da Ilusão não te vai ensinar nada que já não saibas. Vai nomear o que ainda não conseguiste articular.",
    cta: "Se nunca te reconheceste numa história de ficção, pode ser que ainda não encontraste a história certa. — Vivianne",
    formato: "single",
    hashtags: TAGS_ILUSAO,
    diaSugerido: 2,
  },
  {
    id: "rec-02",
    categoria: "reconhecimento",
    hook: "A diferença entre um livro de autoajuda e um Espelho.",
    corpo:
      "O livro de autoajuda diz-te o que fazer. Dá-te um sistema, uma lista, um framework.\n\nO Espelho não diz nada. Mostra-te uma personagem a fazer o que tu fazes — e espera que reconheças. Esse reconhecimento não precisa de ser ensinado. Acontece por si.\n\nE quando acontece, é diferente de qualquer instrução. Porque vem de dentro, não de fora.",
    cta: "Os Espelhos não são autoajuda. São ficção. E por isso chegam mais fundo. — Vivianne",
    formato: "carousel",
    hashtags: TAGS_GERAL,
    diaSugerido: 1,
  },
  {
    id: "rec-03",
    categoria: "reconhecimento",
    hook: "Nunca ninguém me tinha perguntado isto.",
    corpo:
      "Uma leitora escreveu-me depois de responder à primeira pergunta do diário de reflexão.\n\nA pergunta era simples: quando foi a última vez que escolheste algo só porque quiseste?\n\nFicou dois dias sem conseguir responder. Não por falta de palavras — porque nunca, em toda a vida adulta, ninguém lhe tinha feito essa pergunta. Nem ela própria.",
    cta: "Quando foi a última vez que te fizeste essa pergunta? — Vivianne",
    formato: "reel",
    hashtags: TAGS_ILUSAO,
    diaSugerido: 4,
  },
];

// ─── PERGUNTAS — hooks directos de introspecção ──────────────────────────────

export const postsPerguntas: PostRedes[] = [
  {
    id: "prg-01",
    categoria: "perguntas",
    hook: "Há quanto tempo procuras algo que não sabes nomear?",
    corpo:
      "Não é insatisfação. Não é ingratidão. É algo mais subtil — a sensação de que tens uma vida que funciona, mas que não te pertence totalmente.\n\nEssa sensação tem um nome. É o véu.",
    cta: "Faz o teste e descobre qual é o teu. Link na bio. — Vivianne",
    formato: "story",
    hashtags: TAGS_GERAL,
    diaSugerido: 3,
  },
  {
    id: "prg-02",
    categoria: "perguntas",
    hook: "Se tirasses todos os papéis, o que é que sobrava?",
    corpo:
      "Mãe. Filha. Profissional. Parceira. Amiga.\n\nSão papéis reais e importantes. Mas são papéis. Por baixo deles existe alguém que nunca precisou de justificação para existir.\n\nQuem é essa pessoa?",
    cta: "O Espelho da Identidade chega em Maio — para quem já não se lembra de quem é sem os outros. — Vivianne",
    formato: "single",
    hashtags: TAGS_IDENTIDADE,
    diaSugerido: 0,
  },
  {
    id: "prg-03",
    categoria: "perguntas",
    hook: "Quando foi a última vez que disseste não — sem te justificares?",
    corpo:
      "Não um 'não, porque tenho compromisso'. Não um 'não, mas posso noutro dia'.\n\nUm não simples. Porque não queres. Porque não te apetece. Porque decides assim.\n\nSe tiveste de pensar muito, já tens a resposta.",
    cta: "Pratica hoje. Um não. Sem explicação. — Vivianne",
    formato: "story",
    hashtags: TAGS_GERAL,
    diaSugerido: 2,
  },
  {
    id: "prg-04",
    categoria: "perguntas",
    hook: "De 0 a 10: quanto da tua vida actual escolherias de novo — sabendo o que sabes?",
    corpo:
      "Não há resposta certa. Há uma resposta honesta.\n\nE a resposta honesta é o ponto de partida para qualquer coisa que queiras que seja diferente.",
    cta: "Responde — mesmo que seja só para ti. — Vivianne",
    formato: "story",
    hashtags: TAGS_GERAL,
    diaSugerido: 5,
  },
  {
    id: "prg-05",
    categoria: "perguntas",
    hook: "Qual é a coisa que sabes sobre ti mesma e ainda não admitiste a ninguém?",
    corpo:
      "Não é necessariamente um segredo. É algo que sabes — que sentes como verdade — mas que ainda não ficou dito em voz alta.\n\nÀs vezes, a única coisa que separa uma percepção de uma mudança é tê-la dito.",
    cta: "Escreve-a. Só para ti. — Vivianne",
    formato: "reel",
    hashtags: TAGS_GERAL,
    diaSugerido: 4,
  },
];

// ─── VÉUS ESPECÍFICOS ────────────────────────────────────────────────────────

export const postsMedoVeu: PostRedes[] = [
  {
    id: "med-01",
    categoria: "medo_veu",
    hook: "O medo não te impede de saber o que queres. Impede-te de acreditar que tens permissão para o querer.",
    corpo:
      "É uma distinção importante.\n\nNão é que não saibas o que mudarias, o que escolherias, o que faria diferença. Sabes.\n\nO que não tens — ainda — é a certeza de que tens direito a isso. De que não é demasiado. De que não é tarde. De que não vais decepcionar alguém no processo.",
    cta: "O Espelho do Medo chega em Março. Para quem já sabe — mas ainda está à espera de permissão. — Vivianne",
    formato: "carousel",
    hashtags: TAGS_MEDO,
    diaSugerido: 1,
  },
  {
    id: "med-02",
    categoria: "medo_veu",
    hook: "Sabotagem não é preguiça. É protecção.",
    corpo:
      "Quando deixas para amanhã o que sabias que devias fazer hoje, não é falta de disciplina. É uma parte de ti a tentar manter-te segura.\n\nSegura do fracasso. Segura da mudança. Segura de te tornares alguém que já não pertence ao sítio onde cresceste.\n\nEssa parte de ti não está errada — está desactualizada.",
    cta: "Reconheces-te? O Espelho do Medo foi escrito para isto. — Vivianne",
    formato: "reel",
    hashtags: TAGS_MEDO,
    diaSugerido: 3,
  },
];

export const postsCulpaVeu: PostRedes[] = [
  {
    id: "cul-01",
    categoria: "culpa_veu",
    hook: "Culpa não é consciência. Culpa que se sente ao desfrutar de algo é uma herança.",
    corpo:
      "Consciência diz: 'O que fiz magoou alguém. Preciso de corrigir.'\n\nHerança diz: 'Estou a ser feliz enquanto há pessoas a sofrer. Não mereço isto. Preciso de compensar.'\n\nUma é útil. A outra é um mecanismo de controlo que aprendeste muito cedo — e que ainda pagas muito caro.",
    cta: "O Espelho da Culpa chega em Abril. — Vivianne",
    formato: "single",
    hashtags: TAGS_CULPA,
    diaSugerido: 5,
  },
];

export const postsIdentidadeVeu: PostRedes[] = [
  {
    id: "ide-01",
    categoria: "identidade_veu",
    hook: "Não é crise de identidade. É que nunca houve tempo para a pergunta.",
    corpo:
      "Foste mãe, filha, profissional, parceira, amiga — e fizeste tudo bem. Mas a pergunta 'quem sou eu quando não estou a servir nenhum destes papéis' nunca teve espaço na agenda.\n\nNão é que não tenhas identidade. É que nunca a tiveste como prioridade.",
    cta: "O Espelho da Identidade chega em Maio. — Vivianne",
    formato: "carousel",
    hashtags: TAGS_IDENTIDADE,
    diaSugerido: 0,
  },
];

export const postsControloVeu: PostRedes[] = [
  {
    id: "cnt-01",
    categoria: "controlo_veu",
    hook: "Seguras tudo no lugar. E estás exausta.",
    corpo:
      "Não porque sejam demasiadas coisas. Porque aprendeste que se largares — mesmo um pouco — tudo desmorona.\n\nMas essa crença foi formada numa altura em que talvez fosse verdade. Hoje, é uma ilusão que te custa muito caro.\n\nLargar não é desistir. É confiar que o mundo não desmorona quando respiras.",
    cta: "O Espelho do Controlo chega em Junho. — Vivianne",
    formato: "reel",
    hashtags: TAGS_CONTROLO,
    diaSugerido: 2,
  },
];

// ─── NÓS — a dimensão relacional ─────────────────────────────────────────────

export const postsNosRelacional: PostRedes[] = [
  {
    id: "nos-01",
    categoria: "nos_relacional",
    hook: "Há véus que não vês em ti — mas que a pessoa mais próxima de ti já viu há anos.",
    corpo:
      "Não porque te conheça melhor. Porque está do outro lado.\n\nOs Nós são histórias sobre o que acontece entre duas pessoas quando um véu começa a cair. O que se diz. O que fica por dizer. O que muda — e o que não volta ao mesmo.\n\nO Nó da Herança está disponível para quem completar o Espelho da Ilusão.",
    cta: "Os Espelhos mostram-te o véu. Os Nós mostram o que ele fez nas tuas relações. — Vivianne",
    formato: "carousel",
    hashtags: [...TAGS_BASE, "#NóDaHerança", "#FicçãoRelacional"],
    diaSugerido: 4,
  },
  {
    id: "nos-02",
    categoria: "nos_relacional",
    hook: "A mãe sempre viu. Esperou anos. Agora que Sara acordou, Helena tem algo para lhe dizer.",
    corpo:
      "O Nó da Herança não é uma continuação da história da Sara. É a mesma história — vista pelos olhos da mãe.\n\nO que se passa entre duas pessoas quando um véu cai não é simples. Não é 'agora que percebi, tudo fica bem'. É mais complicado e mais verdadeiro do que isso.",
    cta: "Disponível depois de completares o Espelho da Ilusão. Link na bio. — Vivianne",
    formato: "single",
    hashtags: [...TAGS_BASE, "#NóDaHerança"],
    diaSugerido: 6,
  },
];

// ─── PROVOCAÇÃO — contra o wellness superficial ──────────────────────────────

export const postsProvocacao: PostRedes[] = [
  {
    id: "prov-01",
    categoria: "provocacao",
    hook: "Não precisas de mais um método. Precisas de uma história onde te reconheças.",
    corpo:
      "Já leste os livros. Já fizeste os cursos. Já tentaste os sistemas.\n\nAlguns ajudaram. Mas nenhum chegou ao sítio onde a coisa está realmente. Porque informação não chega lá. Reconhecimento chega.\n\nA ficção faz o que os frameworks não conseguem: mostra-te a ti mesma, sem te dizer o que fazer com isso.",
    cta: "Os Espelhos não ensinam. Reconhecem. — Vivianne",
    formato: "carousel",
    hashtags: TAGS_GERAL,
    diaSugerido: 1,
  },
  {
    id: "prov-02",
    categoria: "provocacao",
    hook: "O wellness prometeu-te que ias melhorar. Eu não prometo isso.",
    corpo:
      "Não prometo que vais emagrecer, ganhar mais dinheiro, ter relações melhores ou dormir melhor.\n\nPrometo que, se leres com atenção, vais encontrar perguntas que já tinhas — mas que nunca tinham tido forma.\n\nE que fazer essas perguntas — mesmo que a resposta demore — é diferente de tudo o resto que experimentaste.",
    cta: "Os Sete Véus não foram criados para te melhorar. Foram criados para te reconhecer. — Vivianne",
    formato: "reel",
    hashtags: TAGS_GERAL,
    diaSugerido: 5,
  },
  {
    id: "prov-03",
    categoria: "provocacao",
    hook: "Há uma diferença entre transformação e reconhecimento. O mercado vende a primeira. Eu faço a segunda.",
    corpo:
      "Transformação implica que o que és agora está errado e precisa de ser corrigido.\n\nReconhecimento implica que o que és agora já está tudo lá — só ainda não foi visto.\n\nNão são a mesma coisa. E o ponto de partida de cada uma leva a sítios muito diferentes.",
    cta: "Os Espelhos partem do reconhecimento. Não da correcção. — Vivianne",
    formato: "single",
    hashtags: TAGS_GERAL,
    diaSugerido: 3,
  },
];

// ─── VOZ DA VIVIANNE — a autora na primeira pessoa ───────────────────────────

export const postsVozVivianne: PostRedes[] = [
  {
    id: "viv-01",
    categoria: "voz_vivianne",
    hook: "Passei anos a construir uma vida que fazia sentido para toda a gente — menos para mim.",
    corpo:
      "Não era uma vida má. Era uma vida correcta.\n\nOs prazos cumpriam-se. As expectativas também. Havia conforto, havia estabilidade, havia reconhecimento.\n\nE havia também, à noite, quando tudo parava, uma sensação que não sabia nomear. Não era ingratidão. Era algo mais honesto do que isso.\n\nFoi para essa sensação que escrevi o primeiro Espelho.",
    cta: "Escrevo para quem quer viver — não apenas funcionar. — Vivianne",
    formato: "carousel",
    hashtags: TAGS_GERAL,
    diaSugerido: 0,
  },
  {
    id: "viv-02",
    categoria: "voz_vivianne",
    hook: "Não criei os Espelhos para te ajudar a melhorar. Criei-os porque não encontrei o livro que precisava de ler.",
    corpo:
      "Não um manual. Não uma lista de hábitos. Não outra versão do mesmo.\n\nPrecisava de uma história onde me visse — não como devia ser, mas como era. Com as hesitações, com as escolhas não feitas, com os padrões que repetia sem perceber porquê.\n\nComo não encontrei, escrevi.",
    cta: "Talvez sejas tu que precisavas desta história. — Vivianne",
    formato: "single",
    hashtags: TAGS_GERAL,
    diaSugerido: 6,
  },
  {
    id: "viv-03",
    categoria: "voz_vivianne",
    hook: "Sou moçambicana. Cresci num contexto em que certas perguntas não se fazem.",
    corpo:
      "As perguntas sobre o que queres. Sobre o que sentes. Sobre quem és quando ninguém precisa de ti.\n\nEssas perguntas eram um luxo, uma frivolidade, uma falta de gratidão.\n\nMas as perguntas não desaparecem por não serem feitas. Acumulam. E um dia chegam — de uma forma ou de outra.\n\nPrefiro que chegues a elas com uma história nas mãos.",
    cta: "Os Espelhos foram escritos por e para quem cresceu sem espaço para estas perguntas. — Vivianne",
    formato: "carousel",
    hashtags: [...TAGS_BASE, "#Moçambique", "#ÁfricaLê"],
    diaSugerido: 4,
  },
  {
    id: "viv-04",
    categoria: "voz_vivianne",
    hook: "Escrever o Espelho da Ilusão custou-me mais do que pensei.",
    corpo:
      "Não pelo trabalho de escrever. Pelo que tive de olhar enquanto escrevia.\n\nQuando escreves uma personagem que vive no automático, és obrigada a perguntar: em que é que eu ainda vivo assim? Quando escreves sobre escolhas não feitas, tens de te perguntar: quais são as minhas?\n\nOs Espelhos foram escritos para ti. Mas começaram por ser escritos para mim.",
    cta: "Obrigada por leres. — Vivianne",
    formato: "single",
    hashtags: TAGS_GERAL,
    diaSugerido: 2,
  },
];

// ─── EXPORT TOTAL ────────────────────────────────────────────────────────────

export const todosBancoPosts: PostRedes[] = [
  ...postsAutomatico,
  ...postsPermissao,
  ...postsSilencio,
  ...postsReconhecimento,
  ...postsPerguntas,
  ...postsMedoVeu,
  ...postsCulpaVeu,
  ...postsIdentidadeVeu,
  ...postsControloVeu,
  ...postsNosRelacional,
  ...postsProvocacao,
  ...postsVozVivianne,
];

export function getPostsPorCategoria(cat: PostCategoria): PostRedes[] {
  return todosBancoPosts.filter((p) => p.categoria === cat);
}

export function getPostsPorFormato(
  formato: PostRedes["formato"]
): PostRedes[] {
  return todosBancoPosts.filter((p) => p.formato === formato);
}

// Calendário semanal sugerido — 1 post por dia, categorias rotativas
// Dom: voz_vivianne ou automatico    (gera proximidade)
// Seg: permissao ou medo_veu         (início de semana — acção)
// Ter: reconhecimento ou provocacao  (educação)
// Qua: perguntas ou silencio         (meio de semana — introspecção)
// Qui: nos_relacional ou identidade  (profundidade)
// Sex: culpa_veu ou controlo_veu     (fim de semana — reflexão)
// Sab: perguntas ou voz_vivianne     (leve, convite)
export const calendarioSemanal: Record<number, PostCategoria[]> = {
  0: ["voz_vivianne", "automatico"],
  1: ["permissao", "medo_veu"],
  2: ["reconhecimento", "provocacao"],
  3: ["perguntas", "silencio"],
  4: ["nos_relacional", "identidade_veu"],
  5: ["culpa_veu", "controlo_veu"],
  6: ["perguntas", "voz_vivianne"],
};
