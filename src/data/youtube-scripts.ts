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

// ─── O FIO INVISÍVEL — HOOK 1 ─────────────────────────────────────────────

const fioInvisivelHook1: YouTubeScript = {
  courseSlug: "o-fio-invisivel",
  hookIndex: 0,
  title: "Porque choras sem razão aparente",
  durationMin: 7,
  thumbnail: {
    mainText: "Porque choras\nsem razão aparente",
    subText: "Talvez não seja só teu",
  },
  scenes: [
    {
      type: "abertura",
      narration: "",
      overlayText: "Porque choras sem razão aparente",
      durationSec: 12,
      visualNote:
        "Céu azul-marinho (#1A1A2E). Fade in lento do título em creme. Território do Lago dos Reflexos Partilhados ao longe — superfície opaca, prata.",
    },
    {
      type: "pergunta",
      narration:
        "Já te aconteceu chorares sem saber porquê? Não é tristeza. Não é cansaço. É uma coisa que sobe do fundo e que não tem nome. E quando alguém te pergunta o que se passa, dizes: nada. Porque realmente não sabes.",
      overlayText: "Nada. Porque realmente não sabes.",
      durationSec: 30,
      visualNote:
        "Silhueta de pé, mãos no peito. Lago opaco ao fundo. Reflexos indistintos na superfície.",
    },
    {
      type: "situacao",
      narration:
        "Imagina esta cena. Estás na cozinha. Acabaste de por as crianças a dormir. A casa está em silêncio. Sentas-te. E de repente — sem aviso — os olhos enchem-se de água.\n\nNão aconteceu nada. O dia foi normal. Ninguém te magoou. Mas algo pesa. Algo aperta. Algo quer sair e tu não sabes o que é.\n\nOu então estás a ver um filme. Uma cena qualquer — uma mãe que abraça uma filha, duas amigas que se reencontram — e começas a chorar de uma forma que não corresponde ao que estás a ver. Não é o filme. É outra coisa.\n\nE se eu te dissesse que talvez esse choro não seja só teu?",
      overlayText: "",
      durationSec: 100,
      visualNote:
        "Silhueta sentada, reflexiva. Lago com superfície que começa a ter ondulações suaves. Outros reflexos aparecem vagamente — silhuetas de outras figuras que não estão presentes.",
    },
    {
      type: "revelacao",
      narration:
        "Há uma ideia que a ciência está cada vez mais a confirmar: nós não somos tão separados como pensamos. O que a tua mãe sentiu e não disse, o teu corpo ouviu. O que a tua avó viveu e engoliu, ficou registado. A ansiedade da tua melhor amiga que nunca te contou — tu sentiste-a na última vez que estiveram juntas.\n\nNão é magia. Não é energia. É biologia. O sistema nervoso humano foi feito para se ligar. Para sentir o outro. Para carregar o que não é nomeado.\n\nE quando choras sem razão, pode ser que estejas a chorar por muitas. Pela tua mãe que nunca chorou. Pela tua avó que não podia. Pela tua filha que ainda não sabe que vai precisar.\n\nEsse choro não é fraqueza. É a prova de que estás ligada a algo maior do que tu.",
      overlayText: "Quando choras sem razão,\npode ser que estejas\na chorar por muitas.",
      durationSec: 120,
      visualNote:
        "Lago a tornar-se transparente. Reflexos de várias silhuetas visíveis na água — gerações. Fios dourados a conectar os reflexos. Luz a crescer.",
    },
    {
      type: "gesto",
      narration:
        "A próxima vez que chorares sem razão, não limpes as lágrimas logo. Fica. Põe a mão no peito. E pergunta em silêncio: isto é meu ou é de alguém que veio antes de mim? Não precisas de resposta. Só de pergunta. O corpo sabe o que fazer com a pergunta certa.",
      overlayText: "Isto é meu\nou é de alguém\nque veio antes de mim?",
      durationSec: 45,
      visualNote:
        "Silhueta com mãos no peito. Lago calmo. Reflexos que se fundem suavemente.",
    },
    {
      type: "frase_final",
      narration:
        "Não estás sozinha no que sentes. Nunca estiveste. Há um fio invisível que te liga a todas as que vieram antes — e a todas as que vêm depois.",
      overlayText:
        "Não estás sozinha no que sentes.\nNunca estiveste.\nHá um fio invisível.",
      durationSec: 18,
      visualNote:
        "Ecrã escuro. Texto em creme, serifado, centrado. Pausa longa.",
    },
    {
      type: "cta",
      narration:
        "Se isto te tocou, o curso O Fio Invisível vai muito mais fundo. Oito módulos sobre a ligação entre todos nós — e como a tua cura toca o todo. O link está na descrição.",
      overlayText: "O Fio Invisível\nseteveus.space",
      durationSec: 18,
      visualNote:
        "Lago dos Reflexos Partilhados com superfície transparente. Fios dourados visíveis. URL no ecrã.",
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

// ─── O ESPELHO DO OUTRO — HOOK 1 ─────────────────────────────────────────

const espelhoOutroHook1: YouTubeScript = {
  courseSlug: "o-espelho-do-outro",
  hookIndex: 0,
  title: "Porque aquela pessoa te irrita tanto",
  durationMin: 7,
  thumbnail: {
    mainText: "Porque aquela pessoa\nte irrita tanto",
    subText: "O que o outro te mostra sobre ti",
  },
  scenes: [
    {
      type: "abertura",
      narration: "",
      overlayText: "Porque aquela pessoa te irrita tanto",
      durationSec: 12,
      visualNote:
        "Céu azul-marinho. Título em creme. Território da Galeria dos Reflexos Vivos ao longe.",
    },
    {
      type: "pergunta",
      narration:
        "Há alguém na tua vida — pode ser uma colega, uma cunhada, uma amiga de uma amiga — que te irrita de uma forma que não faz sentido. Não te fez nada de grave. Mas cada vez que fala, algo dentro de ti contrai. Já te perguntaste porquê?",
      overlayText: "Cada vez que fala,\nalgo dentro de ti contrai.",
      durationSec: 28,
      visualNote:
        "Duas silhuetas frente a frente. Uma tensa, outra relaxada. Galeria com espelhos vivos ao fundo.",
    },
    {
      type: "situacao",
      narration:
        "Imagina. Estás num jantar. Ela está lá. Fala alto. Ocupa espaço. Diz o que pensa sem pedir licença. E tu, que passas a vida a medir palavras, a ponderar, a ter cuidado com o que dizes — sentes um calor a subir.\n\nNão é raiva exactamente. É irritação. Uma irritação que parece desproporcionada. Porque ela não te fez nada. Não te insultou. Não te traiu.\n\nMas irrita-te.\n\nE quando contas a alguém, dizes: não sei, há qualquer coisa nela que me incomoda. E essa qualquer coisa — essa coisa que não sabes nomear — é a pista mais importante que vais receber hoje.",
      overlayText: "",
      durationSec: 100,
      visualNote:
        "Silhueta sentada a observar outra silhueta que gesticula livremente. Espelhos na galeria que reflectem não a cena mas emoções — distorções cromáticas.",
    },
    {
      type: "revelacao",
      narration:
        "O que te irrita no outro é quase sempre algo que vive em ti e que não te permites. Ela fala alto — e tu calaste-te a vida inteira. Ela ocupa espaço — e tu aprendeste a encolher. Ela diz o que pensa — e tu medes cada palavra com medo de incomodar.\n\nA irritação não é sobre ela. É sobre a parte de ti que gostava de ser assim mas que decidiu, há muito tempo, que isso não era permitido.\n\nIsto não significa que ela tem razão ou que é melhor. Significa que o teu corpo está a reagir a algo que reconhece — algo que é teu e que escondeste.\n\nO outro é um espelho. E quando o espelho te incomoda, raramente é por causa do espelho.",
      overlayText: "Quando o espelho te incomoda,\nraramente é por causa\ndo espelho.",
      durationSec: 110,
      visualNote:
        "Espelhos da galeria que se tornam mais claros. A silhueta vê o seu próprio reflexo no lugar da outra pessoa. Momento de reconhecimento.",
    },
    {
      type: "gesto",
      narration:
        "Esta semana, quando alguém te irritar, pára. Não rejas logo. Pergunta-te: o que é que esta pessoa está a fazer que eu gostava de fazer e não me permito? Escreve a resposta. Não para ela. Para ti.",
      overlayText: "O que é que eu gostava de fazer\ne não me permito?",
      durationSec: 40,
      visualNote:
        "Silhueta com mão no peito, olhando para o próprio reflexo no espelho. Luz dourada.",
    },
    {
      type: "frase_final",
      narration:
        "As pessoas que mais te incomodam são as que mais te ensinam. Não porque tenham razão — mas porque te mostram o que ainda está escondido.",
      overlayText:
        "As pessoas que mais te incomodam\nsão as que mais te ensinam.",
      durationSec: 16,
      visualNote:
        "Ecrã escuro. Texto em creme, serifado. Pausa longa.",
    },
    {
      type: "cta",
      narration:
        "Se isto te tocou, o curso O Espelho do Outro vai muito mais fundo. Oito módulos para aprenderes a ver-te através de cada relação. O link está na descrição.",
      overlayText: "O Espelho do Outro\nseteveus.space",
      durationSec: 18,
      visualNote:
        "Galeria dos Reflexos Vivos com espelhos claros. URL no ecrã.",
    },
    {
      type: "fecho",
      narration: "",
      overlayText: "Sete Véus",
      durationSec: 8,
      visualNote:
        "Território dissolve no céu. Logo Sete Véus. Silêncio.",
    },
  ],
};

// ─── O SILÊNCIO QUE GRITA — HOOK 1 ───────────────────────────────────────

const silencioGritaHook1: YouTubeScript = {
  courseSlug: "o-silencio-que-grita",
  hookIndex: 0,
  title: "O segredo que toda a tua família sabe mas ninguém diz",
  durationMin: 7,
  thumbnail: {
    mainText: "O segredo que toda a família\nsabe mas ninguém diz",
    subText: "O silêncio que vive no teu corpo",
  },
  scenes: [
    {
      type: "abertura",
      narration: "",
      overlayText: "O segredo que toda a tua família sabe\nmas ninguém diz",
      durationSec: 12,
      visualNote:
        "Céu azul-marinho. Título em creme. Caverna dos Ecos Mudos ao longe — escura, silenciosa.",
    },
    {
      type: "pergunta",
      narration:
        "Na tua família, há alguma coisa de que ninguém fala? Um assunto que todos evitam? Uma pessoa que desapareceu da conversa? Uma história que muda de versão cada vez que alguém a conta?",
      overlayText: "Uma história que muda de versão\ncada vez que alguém a conta.",
      durationSec: 25,
      visualNote:
        "Silhueta de pé numa caverna escura. Paredes que parecem absorver o som. Silêncio visual.",
    },
    {
      type: "situacao",
      narration:
        "Todas as famílias têm segredos. Não precisa de ser um drama. Às vezes é um divórcio que foi tratado como se nunca tivesse existido. Uma doença mental que se chamava 'nervos'. Uma gravidez que se escondeu. Um avô que ninguém menciona.\n\nE tu cresceste nesse silêncio. Não te disseram para não falar — simplesmente percebeste. Pelo olhar da tua mãe quando o assunto se aproximava. Pela mudança de conversa. Pela tensão que entrava na sala quando alguém tocava no tema.\n\nE aprendeste: há coisas de que não se fala.\n\nO problema é que o corpo não aprendeu. O corpo guarda tudo. O que foi dito e o que foi calado. E o que foi calado pesa mais.",
      overlayText: "",
      durationSec: 110,
      visualNote:
        "Várias silhuetas numa sala — família. Algumas viradas de costas umas para as outras. Sombras de palavras não ditas flutuam como ecos escuros nas paredes.",
    },
    {
      type: "revelacao",
      narration:
        "Os segredos familiares não desaparecem quando ninguém fala deles. Passam para o corpo. Para a geração seguinte. Para ti.\n\nA ansiedade que sentes e não sabes explicar. A vergonha que aparece sem razão. O medo de certas conversas. O aperto na garganta quando alguém se aproxima de um tema proibido.\n\nNão é teu. Ou melhor — tornou-se teu porque ninguém lhe deu nome antes de ti.\n\nE o mais estranho é isto: quando uma pessoa na família finalmente fala, algo muda no sistema inteiro. Como se o silêncio fosse uma represa — e uma única palavra bastasse para a água voltar a correr.",
      overlayText: "Quando uma pessoa fala,\nalgo muda\nno sistema inteiro.",
      durationSec: 100,
      visualNote:
        "Caverna que começa a ter ecos visíveis — ondas de luz nas paredes. Silhueta que abre a boca. Primeiro som visual.",
    },
    {
      type: "gesto",
      narration:
        "Não precisas de confrontar ninguém. Pega num papel. Escreve uma frase que começa assim: na minha família, nunca se fala sobre... Não penses. Escreve. Depois lê o que escreveste. E repara no que sentes no corpo ao ler.",
      overlayText: "Na minha família,\nnunca se fala sobre...",
      durationSec: 40,
      visualNote:
        "Silhueta com mão estendida. Eco dourado a sair. Paredes da caverna a vibrar.",
    },
    {
      type: "frase_final",
      narration:
        "O que a tua família nunca disse não desapareceu. Vive no teu corpo. E talvez seja a tua vez de dar voz ao que foi calado.",
      overlayText:
        "O que a tua família nunca disse\nnão desapareceu.\nVive no teu corpo.",
      durationSec: 16,
      visualNote:
        "Ecrã escuro. Texto em creme. Pausa longa. Peso.",
    },
    {
      type: "cta",
      narration:
        "Se isto te tocou, o curso O Silêncio que Grita vai muito mais fundo. Oito módulos para ouvir o que nunca foi dito — e começar a libertar o que já não te pertence. O link está na descrição.",
      overlayText: "O Silêncio que Grita\nseteveus.space",
      durationSec: 18,
      visualNote:
        "Caverna dos Ecos Mudos com ondas de luz dourada. URL no ecrã.",
    },
    {
      type: "fecho",
      narration: "",
      overlayText: "Sete Véus",
      durationSec: 8,
      visualNote:
        "Território dissolve no céu. Logo Sete Véus. Silêncio.",
    },
  ],
};

// ─── A TEIA — HOOK 1 ─────────────────────────────────────────────────────

const teiaHook1: YouTubeScript = {
  courseSlug: "a-teia",
  hookIndex: 0,
  title: "O que calaste para ser aceite",
  durationMin: 7,
  thumbnail: {
    mainText: "O que calaste\npara ser aceite",
    subText: "O preço da pertença",
  },
  scenes: [
    {
      type: "abertura",
      narration: "",
      overlayText: "O que calaste para ser aceite",
      durationSec: 12,
      visualNote:
        "Céu azul-marinho. Título em creme. Bosque dos Fios Entrelaçados ao longe — fios verde-musgo e dourado.",
    },
    {
      type: "pergunta",
      narration:
        "Quando foi a última vez que disseste o que realmente pensavas num grupo? Não a versão educada. Não a versão aceite. A versão verdadeira. A que guardas para ti no caminho de volta para casa.",
      overlayText: "A versão que guardas\npara o caminho de volta.",
      durationSec: 25,
      visualNote:
        "Silhueta rodeada por outras silhuetas — em grupo. A silhueta central ligeiramente mais pequena, encolhida.",
    },
    {
      type: "situacao",
      narration:
        "Estás num almoço com amigas. Alguém diz algo com que não concordas. Sobre educação dos filhos. Sobre politica. Sobre a forma como outra amiga foi tratada.\n\nE sentes aquilo dentro de ti — a vontade de dizer. A tua versão. A tua verdade. Mas olhas à volta. E decides que não vale a pena. Que vai criar atrito. Que vão olhar para ti de lado.\n\nEntão sorris. Acenas. Mudas de assunto. E no caminho de volta para casa, no carro, sozinha — dizes tudo o que devias ter dito. Mas já não conta.\n\nIsto não acontece uma vez. Acontece sempre. Em cada grupo, em cada relação, em cada contexto onde sentes que a tua verdade pode custar-te o lugar.\n\nE a pergunta é: que lugar é esse, se para lá estar tens de desaparecer?",
      overlayText: "",
      durationSec: 110,
      visualNote:
        "Silhueta em grupo — sorri mas o corpo está tenso. Fios entrelaçados que a prendem subtilmente. Depois: silhueta sozinha no carro, boca aberta, finalmente a falar — mas sem ninguém a ouvir.",
    },
    {
      type: "revelacao",
      narration:
        "Pertencer é a necessidade humana mais antiga. O cérebro trata a rejeição como uma ameaça de morte — literalmente. As mesmas zonas do cérebro que se activam com dor física activam-se quando és excluída.\n\nPor isso aprendeste cedo a adaptar-te. A ler a sala. A perceber o que é aceite e o que não é. A moldar-te ao formato do grupo.\n\nMas há um preço. E o preço é este: cada vez que te moldas, perdes um pedaço de contorno. E ao fim de anos, olhas para ti e não sabes quem és sem o grupo. Sem a aprovação. Sem o sorriso do outro.\n\nA boa notícia é que podes pertencer sem desaparecer. Mas primeiro precisas de perceber o que abdicaste para caber.",
      overlayText: "Cada vez que te moldas,\nperdes um pedaço de contorno.",
      durationSec: 100,
      visualNote:
        "Fios que se afrouxam gradualmente. Silhueta que recupera o contorno. Bosque que se torna mais luminoso — verde e dourado.",
    },
    {
      type: "gesto",
      narration:
        "Esta semana, numa conversa em grupo, diz uma coisa verdadeira. Não precisa de ser polémica. Não precisa de ser grande. Pode ser: eu não concordo. Ou: eu penso diferente. Ou simplesmente: não. E repara no que acontece no teu corpo quando dizes.",
      overlayText: "Eu penso diferente.",
      durationSec: 40,
      visualNote:
        "Silhueta no grupo, agora de pé, com contorno definido. Fios que a ligam sem a prender. Equilíbrio.",
    },
    {
      type: "frase_final",
      narration:
        "Pertencer não é desaparecer. Pertencer de verdade é ser vista como és — e ainda assim ter lugar.",
      overlayText:
        "Pertencer não é desaparecer.\nÉ ser vista como és\ne ainda assim ter lugar.",
      durationSec: 16,
      visualNote:
        "Ecrã escuro. Texto em creme, serifado. Pausa.",
    },
    {
      type: "cta",
      narration:
        "Se isto te tocou, o curso A Teia vai muito mais fundo. Oito módulos para aprenderes a pertencer sem desaparecer. O link está na descrição.",
      overlayText: "A Teia\nseteveus.space",
      durationSec: 18,
      visualNote:
        "Bosque dos Fios Entrelaçados com fios dourados equilibrados. URL no ecrã.",
    },
    {
      type: "fecho",
      narration: "",
      overlayText: "Sete Véus",
      durationSec: 8,
      visualNote:
        "Território dissolve no céu. Logo Sete Véus. Silêncio.",
    },
  ],
};

// ─── EXPORTS ──────────────────────────────────────────────────────────────

export const YOUTUBE_SCRIPTS: YouTubeScript[] = [
  ouroProprioHook1,
  ouroProprioHook2,
  ouroProprioHook3,
  fioInvisivelHook1,
  espelhoOutroHook1,
  silencioGritaHook1,
  teiaHook1,
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
