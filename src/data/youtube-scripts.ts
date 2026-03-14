/**
 * YouTube Hook Scripts — Escola dos Véus
 *
 * Scripts completos para os vídeos YouTube de entrada gratuita.
 * Cada curso tem 2-3 hooks. Cada hook segue a estrutura:
 *   1. Abertura visual (sem voz)
 *   2. Pergunta inicial (gancho)
 *   3. Situação humana (reconhecimento)
 *   4. Revelação do padrão (o que está por baixo)
 *   5. Gesto de consciência (algo pequeno para fazer)
 *   6. Frase final + CTA
 *   7. Fecho visual (sem voz)
 *
 * Os textos são para narração com a voz clonada (ElevenLabs).
 * Indicações visuais [entre colchetes] não são narradas — são para montagem.
 */

export type SceneType =
  | "abertura"
  | "pergunta"
  | "situacao"
  | "revelacao"
  | "gesto"
  | "frase_final"
  | "cta"
  | "fecho";

export type VideoScene = {
  type: SceneType;
  /** Texto narrado (vazio = cena sem voz) */
  narration: string;
  /** Texto para sobrepor no ecrã */
  overlayText: string;
  /** Duração estimada em segundos */
  durationSec: number;
  /** Nota de direcção visual */
  visualNote: string;
};

export type YouTubeScript = {
  courseSlug: string;
  hookIndex: number;
  title: string;
  durationMin: number;
  thumbnail: {
    mainText: string;
    subText: string;
  };
  scenes: VideoScene[];
};

// ─── OURO PRÓPRIO — HOOK 1 ───────────────────────────────────────────────

const ouroProprioHook1: YouTubeScript = {
  courseSlug: "ouro-proprio",
  hookIndex: 0,
  title: "Porque sentes culpa quando gastas dinheiro em ti mesma?",
  durationMin: 6,
  thumbnail: {
    mainText: "A culpa de gastar em ti",
    subText: "O que o dinheiro revela",
  },
  scenes: [
    {
      type: "abertura",
      narration: "",
      overlayText: "Porque sentes culpa quando gastas dinheiro em ti mesma?",
      durationSec: 12,
      visualNote:
        "Céu azul-marinho (#1A1A2E). Fade in lento do título em creme. Território da Casa dos Espelhos Dourados ao longe, desfocado.",
    },
    {
      type: "pergunta",
      narration:
        "Quando foi a última vez que compraste algo só para ti — sem ser comida, sem ser para a casa, sem ser para os filhos — e não sentiste nada? Sem aquele aperto. Sem aquela voz que diz: precisavas mesmo disto?",
      overlayText: "Quando foi a última vez?",
      durationSec: 25,
      visualNote:
        "Silhueta de pé, imóvel, mãos ao longo do corpo. Fundo escuro com brilho dourado suave.",
    },
    {
      type: "situacao",
      narration:
        "Imagina esta cena. É sábado. Estás no centro comercial. Vês uma peça de roupa que te fica bem. Experimentas. Olhas-te ao espelho e pensas: isto fica-me mesmo bem. Tiras o telemóvel, vês o preço. E aí começa.\n\nNão é o valor. Podes até ter o dinheiro. O que aparece é outra coisa. Uma espécie de tribunal interno que te pergunta: e a conta da luz? E o lanche das crianças? E se acontece alguma coisa no fim do mês?\n\nEntão pousas a peça. Dizes para ti mesma: não preciso disto agora. E sais da loja com uma coisa estranha no peito. Não é alívio. É resignação.\n\nOu então compras. Mas levas a culpa para casa junto com o saco. Vestes a peça e não consegues gostar dela completamente. Porque alguma parte de ti decidiu que não merecias.\n\nIsto acontece-te?",
      overlayText: "",
      durationSec: 120,
      visualNote:
        "Silhueta a caminhar, depois parada. Espelhos dourados ao fundo, cobertos. A silhueta vê o seu reflexo mas desvia o olhar. Ken Burns lento sobre paisagem do território.",
    },
    {
      type: "revelacao",
      narration:
        "Há um padrão aqui que quase ninguém vê. Quando sentes culpa por gastar dinheiro em ti, não é sobre dinheiro. É sobre uma hierarquia invisível que carregas há anos. Uma hierarquia que diz: tu vens por último.\n\nEsta hierarquia não nasceu contigo. Aprendeste-a. Talvez com uma mãe que nunca comprava nada para ela. Talvez com um pai que repetia: dinheiro não nasce em árvores. Talvez numa casa onde gastar era perigoso. Onde ter coisas bonitas era sinal de irresponsabilidade.\n\nE então cresceste. Começaste a ganhar o teu próprio dinheiro. Mas a regra ficou. Gastar nos outros é generosidade. Gastar em ti é egoísmo.\n\nE isto vai mais fundo do que imaginas. Porque quando não te permites gastar em ti, o que estás realmente a dizer é: o meu bem-estar não é prioridade. O meu conforto é dispensável. Eu sou dispensável.\n\nNão é sobre finanças. É sobre o lugar que te dás na tua própria vida.",
      overlayText: "Gastar nos outros é generosidade.\nGastar em ti é egoísmo.",
      durationSec: 130,
      visualNote:
        "Espelhos começam a descobrir-se. Reflexos distorcidos que lentamente ficam mais claros. Silhueta curvada que se endireita. Transição dissolve entre cenas.",
    },
    {
      type: "gesto",
      narration:
        "Quero propor-te uma coisa pequena. Esta semana, vai comprar algo só para ti. Pode ser um café, um livro, uma vela. Não importa o preço. O que importa é isto: quando fores pagar, pára. Sente o que aparece no corpo. O aperto, a voz, o desconforto — o que for. Não fujas disso. Fica com isso por três segundos.\n\nE depois paga. Conscientemente. E quando saíres da loja, repara: o mundo não acabou.",
      overlayText: "Pára. Sente. Paga.",
      durationSec: 55,
      visualNote:
        "Silhueta com mão estendida. Moedas douradas que flutuam. Gesto de receber.",
    },
    {
      type: "frase_final",
      narration:
        "O dinheiro que gastas em ti não é um luxo. É a primeira prova de que acreditas que mereces estar aqui.",
      overlayText:
        "O dinheiro que gastas em ti\nnão é um luxo.\nÉ a primeira prova de que acreditas\nque mereces estar aqui.",
      durationSec: 18,
      visualNote:
        "Ecrã escuro. Texto em creme, serifado, centrado. Pausa longa. Peso.",
    },
    {
      type: "cta",
      narration:
        "Se isto te tocou, o curso Ouro Próprio vai muito mais fundo. Oito módulos para desatar o nó entre o que sentes sobre dinheiro e quem realmente és. O primeiro módulo é gratuito. O link está na descrição.",
      overlayText: "Ouro Próprio\nO primeiro módulo é gratuito.\nseteveus.space",
      durationSec: 20,
      visualNote:
        "Casa dos Espelhos Dourados com espelhos descobertos. Luz dourada. URL no ecrã.",
    },
    {
      type: "fecho",
      narration: "",
      overlayText: "Sete Véus",
      durationSec: 8,
      visualNote:
        "Território dissolve no céu. Logo Sete Véus. Silêncio. Fade para negro.",
    },
  ],
};

// ─── OURO PRÓPRIO — HOOK 2 ───────────────────────────────────────────────

const ouroProprioHook2: YouTubeScript = {
  courseSlug: "ouro-proprio",
  hookIndex: 1,
  title: "3 frases sobre dinheiro que a tua mãe te ensinou sem saber",
  durationMin: 7,
  thumbnail: {
    mainText: "O que a tua mãe te ensinou\nsobre dinheiro",
    subText: "Sem nunca dizer uma palavra",
  },
  scenes: [
    {
      type: "abertura",
      narration: "",
      overlayText:
        "3 frases sobre dinheiro\nque a tua mãe te ensinou\nsem saber",
      durationSec: 12,
      visualNote:
        "Céu azul-marinho. Título em creme. Casa dos Espelhos Dourados.",
    },
    {
      type: "pergunta",
      narration:
        "Se eu te pedisse agora para me dizeres três coisas que a tua mãe te disse sobre dinheiro, provavelmente ias dizer: ela nunca me disse nada. E é exactamente aí que está o problema.",
      overlayText: "Ela nunca me disse nada.",
      durationSec: 22,
      visualNote:
        "Silhueta adulta e silhueta criança lado a lado. Sombras. Espelhos ao fundo.",
    },
    {
      type: "situacao",
      narration:
        "A primeira frase que nunca foi dita, mas que ouviste mil vezes: nós não somos dessa gente. Talvez não fosse sobre dinheiro directamente. Mas cada vez que passavam por uma loja e a tua mãe desviava o olhar. Cada vez que dizia: isso não é para nós. Cada vez que recusava um convite porque era caro demais — mesmo quando não era — estavas a aprender.\n\nA aprender que há pessoas que podem e pessoas que não podem. E que tu eras das que não podem.\n\nA segunda frase: olha para o teu pai. Se a tua mãe alguma vez disse isto quando o assunto era dinheiro, o que te estava a ensinar era: o dinheiro causa dor. O dinheiro causa conflito. É melhor não falar sobre ele. Então cresceste a evitar o assunto. A mudar de conversa. A fingir que não te importas. Mas importas.\n\nA terceira frase: eu não preciso de nada. Esta é talvez a mais poderosa. Porque parece generosidade. Parece força. Mas o que a tua mãe te mostrou foi: uma boa mulher não tem necessidades. Uma boa mãe não gasta em si. O sacrifício é a moeda de troca do amor.\n\nE tu, sem perceber, adoptaste exactamente a mesma regra.",
      overlayText: "",
      durationSec: 150,
      visualNote:
        "Três cenas separadas por dissolve. 1) Silhueta criança a olhar para um espelho coberto. 2) Duas silhuetas de costas uma para a outra. 3) Silhueta sentada, mãos no colo. Tons dourados e âmbar.",
    },
    {
      type: "revelacao",
      narration:
        "Ninguém te sentou e te deu uma aula sobre dinheiro. Mas aprendeste tudo. Aprendeste pelo corpo. Pelo tom de voz. Pelo que se dizia e pelo que se calava. E agora vives de acordo com um manual financeiro que nunca escolheste. Que nem sequer sabes que existe.\n\nO mais difícil disto não é percebê-lo. É aceitar que podes escrever um manual diferente. Que reescrever as regras não é trair a tua mãe. É honrar o que ela não teve: a possibilidade de escolher.",
      overlayText:
        "Reescrever as regras\nnão é trair a tua mãe.\nÉ honrar o que ela não teve.",
      durationSec: 75,
      visualNote:
        "Espelhos que se descobrem. Reflexos que mudam. Silhueta que se endireita lentamente.",
    },
    {
      type: "gesto",
      narration:
        "Pega num papel. Escreve três frases que nunca te disseram, mas que aprendeste, sobre dinheiro. Não penses demasiado — escreve o que vier. Depois olha para elas. E pergunta: isto ainda é meu? Ou posso devolver?",
      overlayText: "Três frases.\nIsto ainda é meu?",
      durationSec: 40,
      visualNote:
        "Silhueta com mãos abertas. Panos dourados que caem. Gesto de soltar.",
    },
    {
      type: "frase_final",
      narration:
        "A tua mãe ensinou-te o que sabia. Agora podes aprender o que ela não pôde.",
      overlayText:
        "A tua mãe ensinou-te o que sabia.\nAgora podes aprender\no que ela não pôde.",
      durationSec: 15,
      visualNote: "Ecrã escuro. Texto serifado centrado. Silêncio depois.",
    },
    {
      type: "cta",
      narration:
        "O curso Ouro Próprio começa exactamente aqui. Na arqueologia financeira da tua família. O primeiro módulo é gratuito. Está na descrição.",
      overlayText: "Ouro Próprio\nPrimeiro módulo gratuito\nseteveus.space",
      durationSec: 18,
      visualNote: "Casa dos Espelhos Dourados, espelhos limpos. URL no ecrã.",
    },
    {
      type: "fecho",
      narration: "",
      overlayText: "Sete Véus",
      durationSec: 8,
      visualNote: "Dissolve para céu. Logo. Silêncio.",
    },
  ],
};

// ─── OURO PRÓPRIO — HOOK 3 ───────────────────────────────────────────────

const ouroProprioHook3: YouTubeScript = {
  courseSlug: "ouro-proprio",
  hookIndex: 2,
  title: "O teste do preço: diz o teu valor em voz alta",
  durationMin: 5,
  thumbnail: {
    mainText: "Diz o teu valor\nem voz alta",
    subText: "O teste do preço",
  },
  scenes: [
    {
      type: "abertura",
      narration: "",
      overlayText: "O teste do preço\nDiz o teu valor em voz alta",
      durationSec: 12,
      visualNote:
        "Céu azul-marinho. Título. Casa dos Espelhos Dourados, close nos espelhos.",
    },
    {
      type: "pergunta",
      narration:
        "Se eu te pedisse agora para me dizeres em voz alta quanto cobras pelo teu trabalho — ou quanto achas que vale uma hora do teu tempo — conseguias? Sem baixar os olhos. Sem rir. Sem dizer: ah, depende.",
      overlayText: "Quanto vale uma hora do teu tempo?",
      durationSec: 25,
      visualNote:
        "Silhueta de frente. Espelho dourado à frente. Reflexo nítido.",
    },
    {
      type: "situacao",
      narration:
        "Há uma cena que se repete em versões diferentes. A freelancer que manda o orçamento e pede desculpa no email. A profissional que aceita o salário sem negociar. A dona do negócio que faz desconto antes de alguém pedir. A mulher que oferece o trabalho de graça porque sente que cobrar é rude.\n\nEm todos estes casos, há um momento invisível. O momento em que pensas num valor — o valor real — e depois baixas. Trinta por cento, às vezes mais. Não porque a outra pessoa pediu. Mas porque uma voz dentro de ti decidiu que esse valor é demasiado. Que quem és tu para cobrar isso.\n\nE depois aceitas. Trabalhas. Entregas. E no final sentes uma coisa que não sabes bem nomear. Não é raiva. É mais como traição. Como se tivesses vendido algo que era teu por menos do que vale.",
      overlayText: "",
      durationSec: 100,
      visualNote:
        "Silhueta sentada, curvada ligeiramente. Moedas douradas no chão. Espelhos com reflexos distorcidos — a silhueta parece mais pequena no reflexo.",
    },
    {
      type: "revelacao",
      narration:
        "O que está por baixo disto não é falta de jeito para negociar. É uma crença profunda de que o teu valor pessoal está ligado ao teu valor monetário. E como algures no caminho decidiste que não vales muito — cobrar pouco torna-se uma forma de te proteger. Porque se cobras pouco, ninguém te pode rejeitar. Ninguém pode dizer: isto é caro demais. E rejeição — essa palavra — é o que realmente estás a evitar.\n\nO preço não é um número. É uma declaração. E cada vez que o baixas sem motivo, estás a declarar: eu não mereço isto.",
      overlayText: "O preço não é um número.\nÉ uma declaração.",
      durationSec: 80,
      visualNote:
        "Espelhos que limpam. Reflexo da silhueta cresce — fica do tamanho real. Luz dourada.",
    },
    {
      type: "gesto",
      narration:
        "O exercício é simples e desconfortável. Escolhe o valor mais importante que cobras — o teu salário, o teu serviço, a tua hora. E diz em voz alta. Sozinha. No carro, no chuveiro, onde quiseres. Diz o número. Sem acrescentar nada. Sem justificar. Repara no que acontece no corpo quando o dizes.\n\nDepois, aumenta dez por cento. E diz outra vez.",
      overlayText: "Diz o número.\nSem justificar.",
      durationSec: 50,
      visualNote:
        "Silhueta de pé, postura aberta. Mãos ao lado do corpo. Brilho dourado no peito.",
    },
    {
      type: "frase_final",
      narration:
        "O preço que cobras é o espelho do lugar que te dás. Muda o preço — e olha o que muda em ti.",
      overlayText:
        "O preço que cobras\né o espelho do lugar\nque te dás.",
      durationSec: 14,
      visualNote: "Ecrã escuro. Texto serifado. Silêncio.",
    },
    {
      type: "cta",
      narration:
        "No curso Ouro Próprio, o módulo quatro chama-se Cobrar, Receber, Merecer. É exactamente sobre isto. O primeiro módulo é gratuito. Link na descrição.",
      overlayText: "Ouro Próprio\nPrimeiro módulo gratuito\nseteveus.space",
      durationSec: 16,
      visualNote: "Território final. URL. Logo.",
    },
    {
      type: "fecho",
      narration: "",
      overlayText: "Sete Véus",
      durationSec: 8,
      visualNote: "Dissolve. Logo. Silêncio.",
    },
  ],
};

// ─── EXPORTS ──────────────────────────────────────────────────────────────

export const YOUTUBE_SCRIPTS: YouTubeScript[] = [
  ouroProprioHook1,
  ouroProprioHook2,
  ouroProprioHook3,
];

export function getScriptsForCourse(courseSlug: string): YouTubeScript[] {
  return YOUTUBE_SCRIPTS.filter((s) => s.courseSlug === courseSlug);
}

export function getFullNarration(script: YouTubeScript): string {
  return script.scenes
    .filter((s) => s.narration.length > 0)
    .map((s) => s.narration)
    .join("\n\n---\n\n");
}

export function getTotalDuration(script: YouTubeScript): number {
  return script.scenes.reduce((sum, s) => sum + s.durationSec, 0);
}
