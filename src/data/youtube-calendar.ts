/**
 * Calendário YouTube — A Escola dos Véus
 * ────────────────────────────────────────
 * 4 semanas | 12 vídeos | 3 por semana (Terça, Quinta, Sábado)
 *
 * Horário: 18h Maputo / 15h Lisboa / 13h São Paulo
 * Duração: 5-7 minutos cada
 *
 * Estrutura de cada vídeo:
 *   0:00 - 0:15  Gancho forte
 *   0:15 - 1:30  Situação reconhecível
 *   1:30 - 3:30  O padrão por baixo
 *   3:30 - 5:00  Gesto de consciência
 *   5:00 - 5:30  Frase final + CTA
 *
 * CTA (primeiras 4 semanas):
 *   "Se isto te tocou, inscreve-te. A Escola dos Véus está a chegar
 *    — e o primeiro curso é sobre a tua relação com dinheiro."
 */

import type { CourseSlug } from "@/types/course";

// ─── Types ──────────────────────────────────────────────────────────────────────

export type YouTubeDay = "terca" | "quinta" | "sabado";

export type VideoStatus =
  | "draft"        // script por escrever
  | "script_ready" // script pronto, aguarda aprovação
  | "approved"     // script aprovado, pronto para produção
  | "producing"    // em produção (áudio + imagens + montagem)
  | "review"       // montagem feita, aguarda revisão final
  | "scheduled"    // agendado no YouTube
  | "published";   // publicado

export type VideoScene = {
  timestamp: string;
  section: "gancho" | "situacao" | "padrao" | "gesto" | "fecho";
  visual: string;
  narration: string;
};

export type YouTubeVideo = {
  number: number;
  title: string;
  courseOrigin: CourseSlug;
  secondaryCourse?: CourseSlug;
  territory: string;
  week: number;
  day: YouTubeDay;
  gancho: string;
  fraseFinal: string;
  description: string;
  status: VideoStatus;
  script: VideoScene[];
};

export type YouTubeWeek = {
  number: number;
  theme: string;
  objective: string;
  videos: YouTubeVideo[];
};

// ─── Publishing schedule ────────────────────────────────────────────────────────

export const YOUTUBE_SCHEDULE = {
  daysOfWeek: ["terca", "quinta", "sabado"] as YouTubeDay[],
  publishTime: "18:00",
  timezone: "Africa/Maputo",
  durationRange: { min: 5, max: 7 },
  ctaDefault:
    "Se isto te tocou, inscreve-te. A Escola dos Véus está a chegar — e o primeiro curso é sobre a tua relação com dinheiro.",
} as const;

export const YOUTUBE_DESCRIPTION_TEMPLATE = `[TITULO]

[DESCRICAO_VIDEO]

A Escola dos Véus é um lugar onde entras para ver o que estava invisível. Cursos sobre a vida real — dinheiro, relações, corpo, limites, luto, decisões — ensinados pela lente do corpo, não da mente.

O primeiro curso está a chegar.

Inscreve-te para não perderes.
seteveus.space

#autoconhecimento #desenvolvimentopessoal #escoladosveus #corpo #emoções`;

export const YOUTUBE_TAGS = [
  "autoconhecimento",
  "desenvolvimento pessoal",
  "escola dos véus",
  "corpo",
  "emoções",
  "mulheres",
  "sete véus",
];

// ─── Checklist de publicação ────────────────────────────────────────────────────

export const VIDEO_CHECKLIST = [
  "Título atractivo e emocional?",
  "Thumbnail com visual do Mundo dos Véus?",
  "Gancho nos primeiros 15 segundos?",
  "Duração 5-7 minutos?",
  "Voz natural, ritmo calmo?",
  "Visuais consistentes com a paleta Sete Véus?",
  "Texto animado com frases-chave?",
  "Frase final que fica?",
  "CTA: inscrição no canal + 'A Escola dos Véus está a chegar'?",
  "Legendas activas?",
  "Descrição com: resumo + link seteveus.space + 'curso a chegar'?",
  "Tags: autoconhecimento, desenvolvimento pessoal, mulheres, corpo, emoções?",
] as const;

// ─── Produção pipeline ──────────────────────────────────────────────────────────

export const PRODUCTION_STEPS = [
  { step: 1, label: "Script aprovado", responsible: "Claude Code" },
  { step: 2, label: "Gerar áudio (ElevenLabs — voz clonada)", responsible: "Vivianne" },
  { step: 3, label: "Gerar 4-6 imagens das cenas do território", responsible: "ElevenLabs" },
  { step: 4, label: "Transformar imagens em clips de vídeo", responsible: "ElevenLabs" },
  { step: 5, label: "Montar clips + áudio + texto + música + legendas", responsible: "ElevenLabs Studio" },
  { step: 6, label: "Export MP4", responsible: "Vivianne" },
  { step: 7, label: "Revisão final", responsible: "Vivianne" },
  { step: 8, label: "Upload YouTube (agendar para dia seguinte 18h)", responsible: "Vivianne" },
] as const;

// ─── The 12 videos ──────────────────────────────────────────────────────────────

export const YOUTUBE_WEEKS: YouTubeWeek[] = [
  // ━━━ SEMANA 1 — ENTRADA NO MUNDO ━━━
  {
    number: 1,
    theme: "Entrada no Mundo",
    objective:
      "Apresentar a voz, o estilo visual, e tocar nos temas mais universais. Ninguém te conhece ainda. Estes vídeos são a primeira impressão.",
    videos: [
      {
        number: 1,
        title: "Porque sentes culpa quando gastas dinheiro em ti mesma?",
        courseOrigin: "ouro-proprio",
        territory: "Casa dos Espelhos Dourados",
        week: 1,
        day: "terca",
        gancho:
          "Gastas nos filhos sem pensar. Gastas na casa sem pestanejar. Mas quando é para ti — um creme, um livro, um café a sós — aparece a culpa. Porquê?",
        fraseFinal:
          "A culpa não é tua. Foi ensinada. E o que foi ensinado pode ser desaprendido.",
        description:
          "É o tema mais universal e activador. Toda a mulher que comprou algo para si e sentiu culpa vai clicar. É emocional, é concreto, e abre a porta para tudo o resto.",
        status: "script_ready",
        script: [
          {
            timestamp: "0:00 - 0:15",
            section: "gancho",
            visual: "Céu azul-marinho profundo. Câmara desce lentamente para a Casa dos Espelhos Dourados. Silhueta terracota de pé, imóvel, frente a um espelho coberto.",
            narration: "Gastas nos filhos sem pensar. Gastas na casa sem pestanejar. Mas quando é para ti — um creme, um livro, um café a sós — aparece a culpa. Porquê?",
          },
          {
            timestamp: "0:15 - 1:30",
            section: "situacao",
            visual: "Silhueta sentada frente a vários espelhos. Cada espelho reflecte uma cena diferente: um carrinho de compras, uma factura, uma prateleira de loja. Tons dourados suaves.",
            narration: "Imagina isto. Estás numa loja. Vês algo bonito. Algo só para ti. Não é caro. Não é um luxo absurdo. Pegas. Olhas. E depois vem aquela voz. 'Precisas mesmo disto?' 'Há coisas mais importantes.' 'E se o dinheiro fizer falta?' Pousas. Sais. E no caminho para casa, sentes um alívio estranho — como se tivesses evitado um erro. Mas não evitaste nenhum erro. Evitaste-te a ti. Agora pensa na última vez que compraste algo para os teus filhos. Ou para a casa. Ou para alguém que amas. Houve hesitação? Houve culpa? Provavelmente não. Porque gastar nos outros sente-se certo. Gastar em ti sente-se egoísta. E esta diferença — esta diferença entre o que aceitas para os outros e o que te negas a ti — não é acidental. Foi construída.",
          },
          {
            timestamp: "1:30 - 3:30",
            section: "padrao",
            visual: "Silhueta de pé numa sala de espelhos. Nos reflexos, aparecem silhuetas mais pequenas — a mesma pessoa em criança. Os espelhos estão embaciados, com frases escritas na condensação. A luz dourada começa a entrar por uma fresta.",
            narration: "A culpa que sentes quando gastas em ti não nasceu contigo. Nasceu antes de ti. Nasceu na cozinha da tua mãe, quando ela dizia 'não precisamos disso' com a voz cansada. Nasceu no olhar do teu pai quando alguém falava de dinheiro e ele mudava de assunto. Nasceu nas vezes que viste a tua mãe negar-se tudo — o creme, o vestido, o descanso — e chamarem-lhe boa mulher por isso. Tu absorveste uma equação invisível: mulher boa igual a mulher que não gasta em si. Mulher egoísta igual a mulher que se coloca primeiro. E esta equação ficou gravada. Não no pensamento — no corpo. É por isso que a culpa não é uma ideia. É uma sensação. Um aperto. Um desconforto físico quando a caixa regista o valor. É por isso que não basta dizeres a ti mesma 'eu mereço'. O corpo não acredita em frases. O corpo acredita em padrões. E o padrão que aprendeste diz: tu és a última da fila. Sempre.",
          },
          {
            timestamp: "3:30 - 5:00",
            section: "gesto",
            visual: "Silhueta de pé, mãos no peito. A luz dourada cresce. Os espelhos começam a desembaciar. A silhueta dá um passo em frente, para mais perto de um espelho limpo.",
            narration: "Quero propor-te uma coisa pequena. Não uma revolução. Um gesto. Na próxima semana, compra uma coisa só para ti. Algo pequeno. Pode ser um café especial, uma vela, um caderno. Algo que não 'precisas'. Algo que existe só porque te dá prazer. E quando a culpa aparecer — porque vai aparecer — não a empurres. Não te julgues por a sentires. Para. Respira. E pergunta-lhe: de quem és tu? De quem é esta voz que me diz que não mereço? Não precisas de responder agora. Só precisas de ouvir a pergunta. Porque a culpa que não se questiona repete-se para sempre. A culpa que se olha de frente começa a perder força.",
          },
          {
            timestamp: "5:00 - 5:30",
            section: "fecho",
            visual: "Território dissolve-se no céu azul-marinho. Frase final em texto creme no ecrã. Fade para escuro. Logo Sete Véus. Silêncio.",
            narration: "A culpa não é tua. Foi ensinada. E o que foi ensinado pode ser desaprendido. Se isto te tocou, inscreve-te. A Escola dos Véus está a chegar — e o primeiro curso é sobre a tua relação com dinheiro.",
          },
        ],
      },
      {
        number: 2,
        title: "3 frases sobre dinheiro que a tua mãe te ensinou sem saber",
        courseOrigin: "ouro-proprio",
        secondaryCourse: "sangue-e-seda",
        territory: "Casa dos Espelhos Dourados + Árvore das Raízes",
        week: 1,
        day: "quinta",
        gancho:
          "'Dinheiro não cresce em árvores.' 'Nós não somos dessa gente.' 'Rico é tudo egoísta.' — Reconheces alguma?",
        fraseFinal:
          "Antes dos 12 anos, já tinhas um script completo sobre dinheiro. Não te foi ensinado. Foi absorvido.",
        description:
          "Mantém o tema dinheiro mas liga à família. As pessoas que viram o vídeo 1 reconhecem a continuidade. As que não viram entram por outro ângulo.",
        status: "script_ready",
        script: [
          {
            timestamp: "0:00 - 0:15",
            section: "gancho",
            visual: "Céu azul-marinho. Câmara desce para a Casa dos Espelhos Dourados, transita para a Árvore das Raízes Visíveis ao fundo. Silhueta terracota de pé entre os dois territórios.",
            narration: "'Dinheiro não cresce em árvores.' 'Nós não somos dessa gente.' 'Rico é tudo egoísta.' Reconheces alguma?",
          },
          {
            timestamp: "0:15 - 1:30",
            section: "situacao",
            visual: "Silhueta sentada junto à Árvore das Raízes. As raízes são visíveis, brilham em dourado. Nos ramos da árvore, aparecem silhuetas mais pequenas — figuras parentais. Tons quentes de terracota e âmbar.",
            narration: "Há frases que ninguém se senta a ensinar-te. Ninguém abre um livro e diz 'agora vou explicar-te o que o dinheiro significa'. Não funciona assim. Funciona no jantar, quando o teu pai suspira ao abrir uma carta do banco. Funciona na feira, quando a tua mãe pousa o vestido que gostava e diz 'não é para nós'. Funciona no tom de voz com que alguém dizia 'aquele lá tem dinheiro' — como se ter dinheiro fosse uma doença moral. Tu não aprendeste o que o dinheiro é. Aprendeste o que o dinheiro significa na tua família. E essas duas coisas são muito diferentes.",
          },
          {
            timestamp: "1:30 - 3:30",
            section: "padrao",
            visual: "Silhueta de pé frente à Árvore. As raízes envolvem-na suavemente. Em cada raiz, texto em creme com frases herdadas. A silhueta toca numa raiz e ela brilha — depois escurece. Alternância entre Casa dos Espelhos e Árvore.",
            narration: "Vou dar-te três frases. E quero que sintas — não que penses — sintas qual delas mora em ti. A primeira: 'Dinheiro não traz felicidade.' Parece sabedoria. Mas ouve o que está por baixo. O que está por baixo é: não queiras demasiado. Não ambiciones. Fica onde estás. Esta frase protege — mas também prende. A segunda: 'Nós não somos dessa gente.' Esta é sobre pertença. Sobre a ideia de que dinheiro é para outros. Que há um lugar onde tu cabes — e não é o lugar da abundância. Esta frase define o tecto do que te permites ter. A terceira: 'Cuidado com quem tem dinheiro.' Esta é mais subtil. Ensina que riqueza é suspeita. Que quem ganha bem deve ter feito algo errado. E então tu, inconscientemente, tratas o dinheiro como algo sujo. Algo de que te tens de manter longe para seres uma boa pessoa. Três frases. Nenhuma foi dita com maldade. Todas foram ditas com medo. E o medo dos teus pais tornou-se o teu tecto.",
          },
          {
            timestamp: "3:30 - 5:00",
            section: "gesto",
            visual: "Silhueta sentada, mãos abertas. A Árvore começa a mudar — as raízes reorganizam-se suavemente. Luz dourada entra por entre os ramos. Uma raiz nova, mais fina, brota com uma cor diferente — mais clara.",
            narration: "Pega num papel. Ou abre as notas do telemóvel. E escreve as frases sobre dinheiro que cresceram contigo. Não as que leste em livros. As que ouviste em casa. As que estavam no tom de voz, no suspiro, no olhar. Escreve-as como as ouviste. Depois, por baixo de cada uma, escreve: 'Isto não é meu. Isto é de quem veio antes de mim.' Não precisas de as apagar. Não precisas de as substituir por afirmações positivas. Só precisas de as devolver. De perceber que estás a viver com um mapa financeiro que foi desenhado por alguém que tinha medo. E o medo deles não tem de ser o teu.",
          },
          {
            timestamp: "5:00 - 5:30",
            section: "fecho",
            visual: "Território dissolve-se no céu. Frase final em texto creme. Fade para escuro. Logo Sete Véus. Silêncio.",
            narration: "Antes dos 12 anos, já tinhas um script completo sobre dinheiro. Não te foi ensinado. Foi absorvido. Se isto te tocou, inscreve-te. A Escola dos Véus está a chegar — e o primeiro curso é sobre a tua relação com dinheiro.",
          },
        ],
      },
      {
        number: 3,
        title: "A diferença entre ser amada e ser útil",
        courseOrigin: "limite-sagrado",
        territory: "Muralha que Nasce do Chão",
        week: 1,
        day: "sabado",
        gancho:
          "Se parasses de ajudar, de resolver, de estar disponível — continuariam a ligar-te? Ou só te procuram quando precisam?",
        fraseFinal:
          "Ser útil não é ser amada. E confundir as duas coisas custa-te mais do que imaginas.",
        description:
          "Mais reflexivo, mais pesado. O sábado dá espaço para sentar com isto. Muda de tema (sai do dinheiro, entra nos limites) para mostrar que o canal é mais do que um assunto.",
        status: "script_ready",
        script: [
          {
            timestamp: "0:00 - 0:15",
            section: "gancho",
            visual: "Céu azul-marinho. Câmara desce para a Muralha que Nasce do Chão. Silhueta terracota de pé, mão estendida para o lado — como se oferecesse algo. Não há muralha ainda. O chão está vazio.",
            narration: "Se parasses de ajudar, de resolver, de estar disponível — continuariam a ligar-te? Ou só te procuram quando precisam?",
          },
          {
            timestamp: "0:15 - 1:30",
            section: "situacao",
            visual: "Silhueta rodeada de outras figuras. Todas estendem as mãos para ela. A silhueta central dá, dá, dá — as mãos abertas, o corpo ligeiramente curvado. As outras figuras vão-se embora depois de receberem. A silhueta fica sozinha.",
            narration: "És a pessoa a quem toda a gente liga quando precisa de alguma coisa. A amiga que ouve. A irmã que resolve. A colega que fica até mais tarde. A filha que nunca diz que não. E sentes-te bem com isso. Ou pelo menos, dizias que sim. Porque ajudar dá-te um lugar. Um propósito. Uma certeza de que és necessária. Mas há uma pergunta que evitas. Uma que mora no fundo e que só aparece de noite, quando estás cansada demais para te distraíres: se eu parasse de dar — alguém ficava? Se eu não fosse útil — alguém me escolhia na mesma?",
          },
          {
            timestamp: "1:30 - 3:30",
            section: "padrao",
            visual: "Silhueta sentada no chão, sozinha. As outras figuras são sombras distantes. Do chão começa a nascer um brilho dourado — o início da muralha, mas ainda frágil, quase invisível. A silhueta olha para as mãos vazias.",
            narration: "Há uma confusão antiga entre ser amada e ser necessária. Aprendeste cedo que o amor se ganha. Que não é dado — é merecido. E a forma de o merecer era ser boa. Ser disponível. Ser aquela que nunca falha. Então construíste uma identidade inteira em cima disso. És a que ajuda. És a que resolve. És a que aguenta. E sim — as pessoas gostam de ti. Mas gostam de ti ou gostam do que fazes por elas? Esta pergunta dói. Eu sei. Mas é necessária. Porque o que acontece quando confundes utilidade com amor é isto: deixas de ter limites. Porque dizer não é arriscar perder o amor. E se o amor depende do que dás — então tens de dar sempre. Sem parar. Mesmo quando já não tens. E chamas isso de generosidade. Mas não é generosidade. É medo. Medo de descobrires que sem a tua função, não sobra razão para ficarem.",
          },
          {
            timestamp: "3:30 - 5:00",
            section: "gesto",
            visual: "Silhueta de pé. Do chão nasce uma linha de luz dourada — o início de um limite. A silhueta coloca a mão sobre o peito. As figuras ao longe continuam lá, mas a uma distância respeitosa. A muralha não é alta — é apenas uma linha de luz.",
            narration: "Esta semana, quero que faças uma coisa. Uma única coisa. Quando alguém te pedir algo — um favor, o teu tempo, a tua energia — antes de dizeres sim, para. Não digas nada durante cinco segundos. Cinco segundos de silêncio. E nesses cinco segundos, pergunta ao teu corpo: eu quero fazer isto? Ou estou a fazer isto para que me continuem a querer? Não tens de dizer não. Só tens de ouvir a diferença entre o sim genuíno e o sim por medo. Porque o dia em que começares a distinguir os dois é o dia em que começas a descobrir quem fica quando tu paras de dar.",
          },
          {
            timestamp: "5:00 - 5:30",
            section: "fecho",
            visual: "Território dissolve-se no céu. Frase final em texto creme. Fade para escuro. Logo Sete Véus. Silêncio.",
            narration: "Ser útil não é ser amada. E confundir as duas coisas custa-te mais do que imaginas. Se isto te tocou, inscreve-te. A Escola dos Véus está a chegar — e o primeiro curso é sobre a tua relação com dinheiro.",
          },
        ],
      },
    ],
  },

  // ━━━ SEMANA 2 — ALARGAR O TERRITÓRIO ━━━
  {
    number: 2,
    theme: "Alargar o Território",
    objective:
      "A audiência que ficou da semana 1 espera mais. Esta semana tocamos em 3 temas diferentes para mostrar a amplitude do universo.",
    videos: [
      {
        number: 4,
        title: "Porque estás sempre cansada e férias não resolvem",
        courseOrigin: "o-peso-e-o-chao",
        territory: "Caminho de Pedras",
        week: 2,
        day: "terca",
        gancho:
          "Dormiste 8 horas. Tiraste férias. Fizeste spa. E continuas exausta. E se o problema não for falta de descanso?",
        fraseFinal:
          "Não estás cansada porque descansas mal. Estás cansada porque carregas demais. A solução não é um banho de espuma — é pôr peso no chão.",
        description:
          "Tema do cansaço crónico — toca em muitas mulheres que se sentem exaustas apesar de descansarem.",
        status: "script_ready",
        script: [
          {
            timestamp: "0:00 - 0:15",
            section: "gancho",
            visual: "Céu azul-marinho. Câmara desce para o Caminho de Pedras. Silhueta terracota curvada, a carregar pedras invisíveis nos ombros. O caminho é longo, cinzento, sem fim à vista.",
            narration: "Dormiste 8 horas. Tiraste férias. Fizeste spa. E continuas exausta. E se o problema não for falta de descanso?",
          },
          {
            timestamp: "0:15 - 1:30",
            section: "situacao",
            visual: "Silhueta a caminhar pelo caminho de pedras. Cada passo é pesado. Atrás dela, o caminho está cheio de pedras já percorridas. À frente, mais pedras. Tons cinza-pedra com acentos terracota.",
            narration: "Conheces aquele cansaço que não sai? Acordas cansada. Trabalhas cansada. Chegas a casa cansada. Ao fim-de-semana, tentas descansar — mas até o descanso cansa, porque pensas em tudo o que devias estar a fazer. E então tentas soluções. Dormir mais. Chá. Meditação. Férias. E por uns dias parece melhor. Mas volta. Volta sempre. Porque o cansaço não é físico. Ou melhor — é físico, mas não começou no corpo. Começou no que carregas. E o que carregas não sai com férias. Porque tu nem sequer sabes o que estás a carregar.",
          },
          {
            timestamp: "1:30 - 3:30",
            section: "padrao",
            visual: "Silhueta parada no meio do caminho. As pedras tornam-se visíveis — cada uma tem uma palavra gravada em luz creme: 'expectativas', 'culpa', 'controlo', 'perfeição', 'agradar'. A silhueta olha para elas como se as visse pela primeira vez.",
            narration: "O cansaço que não passa com descanso tem um nome. Chama-se peso emocional. E são as coisas que carregas sem ninguém te pedir. A expectativa de ser perfeita no trabalho. A responsabilidade de manter toda a gente feliz. A culpa quando descansas porque 'há tanta coisa para fazer'. O controlo de tudo — porque se tu não fizeres, quem faz? A necessidade de provar que és capaz, que aguentas, que dás conta. Cada uma destas coisas é uma pedra. Pequena, invisível, mas real. E tu carregas-as todas ao mesmo tempo. Há anos. Sem parar. E o mais cruel é isto: ninguém te pediu para carregar a maior parte delas. Tu assumiste. Porque aprendeste que ser boa é carregar tudo sem te queixar. Que pedir ajuda é fraqueza. Que parar é luxo. Então não paras. E o corpo cobra. Cobra em exaustão. Em insónia. Em dores que não têm explicação médica. Em irritação com tudo e todos. O corpo está a gritar o que tu te recusas a dizer: estou cheia.",
          },
          {
            timestamp: "3:30 - 5:00",
            section: "gesto",
            visual: "Silhueta de pé, a segurar uma pedra. Lentamente, abre as mãos e deixa a pedra cair no chão. O som é suave. O corpo endireita-se ligeiramente. Mais luz dourada entra na cena.",
            narration: "Quero que faças uma lista. Não uma lista de tarefas — uma lista de peso. Escreve tudo o que carregas. Tudo. O trabalho. As expectativas. As pessoas que dependem de ti. As coisas que fazes por obrigação. As que fazes por culpa. As que fazes porque 'alguém tem de fazer'. Escreve tudo. E depois olha para essa lista e marca as que são realmente tuas. As que escolheste. As que queres. Vais notar uma coisa: metade do que carregas não é teu. É peso herdado. É expectativa alheia. É culpa que não te pertence. E não precisas de largar tudo de uma vez. Mas precisas de ver o que estás a carregar. Porque só se larga o que se vê.",
          },
          {
            timestamp: "5:00 - 5:30",
            section: "fecho",
            visual: "Território dissolve-se no céu. Frase final em texto creme. Fade para escuro. Logo Sete Véus. Silêncio.",
            narration: "Não estás cansada porque descansas mal. Estás cansada porque carregas demais. A solução não é um banho de espuma — é pôr peso no chão. Se isto te tocou, inscreve-te. A Escola dos Véus está a chegar — e o primeiro curso é sobre a tua relação com dinheiro.",
          },
        ],
      },
      {
        number: 5,
        title: "O teste do preço: diz o teu valor em voz alta",
        courseOrigin: "ouro-proprio",
        territory: "Casa dos Espelhos Dourados",
        week: 2,
        day: "quinta",
        gancho:
          "Vou pedir-te para fazeres uma coisa agora. Pensa no preço que cobras pelo teu trabalho. Ou no salário que achas que mereces. Agora diz esse número em voz alta. Alto. Onde é que a voz tremeu?",
        fraseFinal: "A voz treme onde o merecimento hesita.",
        description:
          "Vídeo interactivo — pede à pessoa para fazer algo enquanto vê. Gera engagement e comentários.",
        status: "script_ready",
        script: [
          {
            timestamp: "0:00 - 0:15",
            section: "gancho",
            visual: "Céu azul-marinho. Câmara desce para a Casa dos Espelhos Dourados. Silhueta terracota de pé frente a um espelho grande. No espelho, um reflexo ligeiramente diferente — mais pequeno, mais hesitante.",
            narration: "Vou pedir-te para fazeres uma coisa agora. Pensa no preço que cobras pelo teu trabalho. Ou no salário que achas que mereces. Agora diz esse número em voz alta. Alto. Onde é que a voz tremeu?",
          },
          {
            timestamp: "0:15 - 1:30",
            section: "situacao",
            visual: "Silhueta frente ao espelho. O reflexo mostra números dourados a flutuar — alguns brilham, outros apagam-se. A silhueta tenta tocar num número mais alto e a mão hesita.",
            narration: "Fizeste? Disseste o número em voz alta? Se disseste — repara no que aconteceu no corpo. Se a voz saiu firme, inteira, sem hesitação — provavelmente já fizeste um trabalho importante sobre o teu valor. Mas se tremeu. Se baixou. Se ficou presa na garganta. Se sentiste vergonha. Ou se nem conseguiste dizer — isso é informação. Não é fraqueza. É informação. Porque o preço que cobras é o reflexo directo do que acreditas merecer. E a maioria das mulheres cobra menos. Aceita menos. Pede menos. Não porque valha menos — mas porque dizer o seu valor em voz alta ativa qualquer coisa antiga. Qualquer coisa que diz: quem és tu para pedir tanto?",
          },
          {
            timestamp: "1:30 - 3:30",
            section: "padrao",
            visual: "Silhueta sentada. Os espelhos à volta mostram cenas: a criança na escola com a mão levantada que ninguém vê, a adolescente que pede e ouve 'não há', a mulher jovem que aceita o primeiro salário sem negociar. Cada espelho é um momento. Tons dourados com sombras.",
            narration: "O que acontece quando dizes o teu preço em voz alta é que o corpo activa uma memória. Não uma memória específica — uma acumulação. Todas as vezes que pediste e ouviste não. Todas as vezes que viste alguém olhar para ti como se estivesses a pedir demais. Todas as vezes que baixaste o preço antes de alguém sequer negociar — porque era mais seguro pedir menos do que arriscar a rejeição. Há um padrão aqui. E é este: tu negoceias contra ti mesma antes de o outro abrir a boca. O desconto já vem aplicado. Já decidiste que é demais. Já te convenceste de que ninguém vai pagar isso. E sabes porquê? Porque no fundo, não é sobre o preço. É sobre a crença de que tu — tu, não o teu trabalho, não o teu serviço — tu não vales aquilo. O preço é um espelho. E o que ele reflecte não é o mercado. É o que sentes sobre ti mesma quando ninguém está a ver.",
          },
          {
            timestamp: "3:30 - 5:00",
            section: "gesto",
            visual: "Silhueta de pé frente ao espelho. Desta vez, o reflexo é do mesmo tamanho. A silhueta coloca as mãos no peito. No espelho, os números reorganizam-se — o mais alto fica no centro, a brilhar em dourado quente.",
            narration: "Quero que faças este exercício esta semana. Escolhe um momento em que estejas sozinha. De pé. Olha para um espelho — pode ser o do quarto, o da casa-de-banho, qualquer um. E diz em voz alta: 'O meu trabalho vale' — e diz o número. O número real. Não o desconto. O número que sentirias se acreditasses em ti sem condições. Diz e observa. Observa o corpo. Onde trava? Onde a voz encolhe? Onde aparece o calor, ou a vergonha, ou a vontade de rir para desvalorizar? Não corrijas nada. Só observa. Repete no dia seguinte. E no outro. Cada dia que dizes o teu valor em voz alta, o corpo assusta-se menos. E o dia em que a voz sair inteira — sem tremer, sem pedir desculpa — nesse dia algo muda. Não lá fora. Cá dentro.",
          },
          {
            timestamp: "5:00 - 5:30",
            section: "fecho",
            visual: "Território dissolve-se no céu. Frase final em texto creme. Fade para escuro. Logo Sete Véus. Silêncio.",
            narration: "A voz treme onde o merecimento hesita. Se isto te tocou, inscreve-te. A Escola dos Véus está a chegar — e o primeiro curso é sobre a tua relação com dinheiro.",
          },
        ],
      },
      {
        number: 6,
        title: "A conversa que ensaias no chuveiro há meses",
        courseOrigin: "voz-de-dentro",
        territory: "Sala do Eco",
        week: 2,
        day: "sabado",
        gancho:
          "Há uma conversa que vive em ti. Ensaias no chuveiro. Reescreves às 3 da manhã. Mas nunca dizes. A quem é? E porque é que o silêncio te parece mais seguro do que a verdade?",
        fraseFinal:
          "O silêncio não protege. Corrói. E o corpo sabe — mesmo que tu finjas que não.",
        description:
          "Toca no tema da voz interior e do silêncio — forte para engagement ao fim de semana.",
        status: "script_ready",
        script: [
          {
            timestamp: "0:00 - 0:15",
            section: "gancho",
            visual: "Céu azul-marinho. Câmara desce para a Sala do Eco. Paredes de violeta escuro. Silhueta terracota de costas, a olhar para uma parede onde ecos de luz dourada pulsam suavemente — palavras que quase se ouvem.",
            narration: "Há uma conversa que vive em ti. Ensaias no chuveiro. Reescreves às 3 da manhã. Mas nunca dizes. A quem é? E porque é que o silêncio te parece mais seguro do que a verdade?",
          },
          {
            timestamp: "0:15 - 1:30",
            section: "situacao",
            visual: "Silhueta sentada no centro da Sala do Eco. As paredes reflectem fragmentos de frases em creme — todas incompletas, todas meio apagadas. A silhueta tem as mãos fechadas sobre os joelhos.",
            narration: "Tu sabes exactamente qual é a conversa. Sabes a quem é. Sabes o que dirias se tivesses coragem. Já a ensaiaste tantas vezes que conheces cada palavra, cada pausa, cada resposta possível. No chuveiro. No carro. Antes de adormecer. E há versões. A versão calma. A versão onde explodes. A versão onde choras. A versão onde finalmente dizes tudo o que engoliste. Mas nenhuma dessas versões sai. Porque entre o ensaio e a boca há um muro. E esse muro tem um nome: e se estrago tudo? E se depois não há volta atrás? E se me rejeitam? E se confirmo aquilo que tenho medo de saber — que esta pessoa não me ama o suficiente para ouvir a minha verdade?",
          },
          {
            timestamp: "1:30 - 3:30",
            section: "padrao",
            visual: "Silhueta de pe na Sala do Eco. As paredes comecam a aproximar-se lentamente. Os ecos ficam mais intensos, sobrepostos, confusos. A silhueta poem as maos sobre os ouvidos. Depois tira-as. Escuta.",
            narration: "O silencio parece proteccao. Parece a escolha segura. Parece que ao nao dizer, manténs a paz. Mas repara no que acontece no corpo quando engoles uma verdade. Ha um aperto. Uma tensao na garganta. Um peso no estomago. Uma irritacao que aparece do nada — com coisas pequenas, com pessoas que nao tem culpa. Isso nao e paz. Isso e pressao. O corpo esta a armazenar tudo o que a boca se recusa a dizer. E o corpo tem limites. Ha um padrao aqui que vale a pena ver. Tu aprendeste que falar e perigoso. Nao porque alguem te disse — mas porque viste. Viste o que aconteceu quando alguem disse a verdade na tua familia. Viste o silencio que se seguiu. Ou o grito. Ou o abandono. E decidiste, sem saber que decidias: e mais seguro calar. So que agora ja nao es crianca. E o preco de calar ja nao e seguranca. E corrosao. Corroi a relacao porque esta cheia de coisas nao ditas. Corroi-te a ti porque vives com uma versao editada de quem es. Corroi a confianca porque como pode alguem conhecer-te se nunca dizes o que sentes?",
          },
          {
            timestamp: "3:30 - 5:00",
            section: "gesto",
            visual: "Silhueta de pe, maos abertas. As paredes da Sala do Eco afastam-se. Os ecos acalmam-se. Uma unica frase de luz dourada flutua no ar a frente da silhueta. A silhueta da um passo na direccao dela.",
            narration: "Nao te vou pedir para teres a conversa. Ainda nao. Vou pedir-te algo mais pequeno. Pega no telemovel. Abre as notas. E escreve a conversa. Toda. Sem filtro. Sem te preocupares com o tom. Sem pensares na reaccao da outra pessoa. Escreve como se so tu fosses ler. O que dirias se nao tivesses medo? Que palavras escolherias? O que precisas que a outra pessoa saiba? Escreve tudo. E depois guarda. Nao mandes. Nao partilhes. Guarda. Porque o primeiro passo nao e dizer a verdade ao outro. E dize-la a ti mesma. Dar-lhe forma. Tira-la do corpo e po-la em palavras. Quando a verdade deixa de ser um eco dentro de ti e passa a ser uma frase escrita — ela fica mais pequena. Mais manejavel. Menos assustadora.",
          },
          {
            timestamp: "5:00 - 5:30",
            section: "fecho",
            visual: "Territorio dissolve-se no ceu. Frase final em texto creme. Fade para escuro. Logo Sete Veus. Silencio.",
            narration: "O silencio nao protege. Corroi. E o corpo sabe — mesmo que tu finjas que nao. Se isto te tocou, inscreve-te. A Escola dos Veus esta a chegar — e o primeiro curso e sobre a tua relacao com dinheiro.",
          },
        ],
      },
    ],
  },

  // ━━━ SEMANA 3 — PROFUNDIDADE ━━━
  {
    number: 3,
    theme: "Profundidade",
    objective:
      "A audiencia que esta ca na semana 3 ja confia na voz. Podemos ir mais fundo. Temas mais emocionais.",
    videos: [
      {
        number: 7,
        title: "5 sinais de que estas a desaparecer numa relacao",
        courseOrigin: "a-arte-da-inteireza",
        territory: "Ponte entre Duas Margens",
        week: 3,
        day: "terca",
        gancho:
          "1. Ja nao sabes o que queres para jantar. 2. Ris das piadas dele mesmo quando nao tem graca. 3. Dizes 'tanto faz' quando nao e tanto faz. 4. Os teus amigos dizem que mudaste. 5. Olhas para o espelho e nao te reconheces.",
        fraseFinal:
          "Desaparecer numa relacao nao acontece de repente. Acontece uma cedencia de cada vez.",
        description:
          "Lista concreta que gera identificacao imediata. Forte potencial de partilha.",
        status: "script_ready",
        script: [
          {
            timestamp: "0:00 - 0:15",
            section: "gancho",
            visual: "Ceu azul-marinho. Camara desce para a Ponte entre Duas Margens. Um rio violeta-agua separa duas margens. Na ponte, duas silhuetas — mas uma esta a desvanecer-se, a perder cor.",
            narration: "1. Ja nao sabes o que queres para jantar. 2. Ris das piadas dele mesmo quando nao tem graca. 3. Dizes 'tanto faz' quando nao e tanto faz. 4. Os teus amigos dizem que mudaste. 5. Olhas para o espelho e nao te reconheces.",
          },
          {
            timestamp: "0:15 - 1:30",
            section: "situacao",
            visual: "Duas silhuetas na ponte. Uma e solida, terracota. A outra esta translucida — quase transparente. A translucida move-se sempre na direcao da outra. Nunca ao contrario.",
            narration: "Aconteceu devagar. Tao devagar que nao deste por nada. Primeiro foram as preferencias pequenas. O restaurante que ele gostava passou a ser o que 'voces' gostavam. Depois foi o grupo de amigos. Os teus foram ficando para tras. Depois foram as opinioes. Passaste a concordar mais — nao porque concordavas, mas porque discordar dava trabalho. Dava conflito. E tu queres paz. Queres harmonia. Queres que funcione. Entao cedes. Uma vez. Outra. E outra. E cada cedencia e tao pequena que parece insignificante. Mas quando as juntas todas, o resultado e este: ja nao sabes onde ele acaba e tu comecas.",
          },
          {
            timestamp: "1:30 - 3:30",
            section: "padrao",
            visual: "A silhueta translucida olha para as proprias maos — quase invisiveis. A ponte comeca a inclinar-se para o lado da silhueta solida. O rio por baixo reflecte uma unica silhueta inteira — a que ja foi, antes da ponte.",
            narration: "Vamos olhar para os cinco sinais devagar. O primeiro: ja nao sabes o que queres. Nao so para jantar — para a vida. Se alguem te perguntasse agora 'o que queres?' a resposta mais honesta seria 'nao sei'. Porque passaste tanto tempo a adaptar-te ao que o outro quer que perdeste o acesso ao teu proprio desejo. O segundo: ris quando nao tem graca. Concordas quando nao concordas. Dizes 'esta bem' quando nao esta. Isto parece simpatia. Mas e apagamento. Cada vez que finges uma reaccao, uma parte de ti desliga. O terceiro: 'tanto faz' tornou-se a tua frase mais usada. Mas nao e indiferenca — e rendimento. Desististe de escolher porque escolher e arriscar o conflito. O quarto: as pessoas que te conhecem ha mais tempo — os amigos antigos, a familia — dizem que mudaste. E tu ficas irritada. Porque sabes que e verdade. Mas admitir isso e admitir o que perdeste. O quinto — e este e o mais dificil: olhas para o espelho e a pessoa que esta la ja nao e bem tu. Parece-se contigo. Mas falta algo. Falta intensidade. Falta presenca. Falta a mulher que eras antes de aprenderes a encolher para caber numa relacao.",
          },
          {
            timestamp: "3:30 - 5:00",
            section: "gesto",
            visual: "A silhueta translucida para de andar. Senta-se no meio da ponte. Sozinha. As maos no peito. Lentamente, a cor comeca a voltar — primeiro os contornos, depois o centro. A outra silhueta continua na sua margem.",
            narration: "Esta semana, faz uma coisa por dia que seja so tua. Uma coisa que nao tenha nada a ver com a relacao. Pode ser ouvir uma musica que ele nao gosta e tu adoras. Pode ser comer algo que so tu queres. Pode ser ligar a uma amiga antiga. Pode ser sentar-te em silencio durante dez minutos sem estar disponivel para ninguem. Uma coisa por dia. Pequena. Que te pertenca. Nao e egoismo. E resgate. Cada vez que fazes algo que e so teu, estas a dizer ao corpo: eu ainda estou aqui. E o corpo responde. Com alivio. Com uma faísca de reconhecimento. Com a sensacao, quase esquecida, de ser inteira.",
          },
          {
            timestamp: "5:00 - 5:30",
            section: "fecho",
            visual: "Territorio dissolve-se no ceu. Frase final em texto creme. Fade para escuro. Logo Sete Veus. Silencio.",
            narration: "Desaparecer numa relacao nao acontece de repente. Acontece uma cedencia de cada vez. Se isto te tocou, inscreve-te. A Escola dos Veus esta a chegar — e o primeiro curso e sobre a tua relacao com dinheiro.",
          },
        ],
      },
      {
        number: 8,
        title: "As perdas que ninguem te deixou chorar",
        courseOrigin: "flores-no-escuro",
        territory: "Jardim Subterraneo",
        week: 3,
        day: "quinta",
        gancho:
          "A amizade que acabou sem explicacao. O bebe que nao veio. A mudanca de pais que ninguem entendeu como perda. O casamento que nao aconteceu. A juventude. Ninguem morreu — mas doi como se.",
        fraseFinal:
          "Se ninguem te deu permissao para chorar isto — eu dou. E real. Merece nome.",
        description:
          "O mais emocional dos 12. Pode ser o que viraliza — porque toca numa dor que quase ninguem nomeia.",
        status: "script_ready",
        script: [
          {
            timestamp: "0:00 - 0:15",
            section: "gancho",
            visual: "Ceu azul-marinho. Camara desce para o Jardim Subterraneo. Uma caverna escura. Silhueta terracota de pe, a olhar para baixo. No chao, pequenas flores bioluminescentes — azul profundo, quase invisiveis.",
            narration: "A amizade que acabou sem explicacao. O bebe que nao veio. A mudanca de pais que ninguem entendeu como perda. O casamento que nao aconteceu. A juventude. Ninguem morreu — mas doi como se.",
          },
          {
            timestamp: "0:15 - 1:30",
            section: "situacao",
            visual: "Silhueta sentada na caverna. A volta, flores bioluminescentes brotam do chao — cada uma representa uma perda. Sao bonitas mas melancolicas. A silhueta toca numa flor e ela brilha mais forte por um instante.",
            narration: "Ha perdas que ninguem conta. Que nao tem funeral. Que nao tem cartao de condolencias. Que nao tem nome. A amiga que um dia deixou de responder — e nunca soubeste porque. O bebe que nao veio — e toda a gente disse 'ainda es nova' ou 'talvez nao fosse a altura'. A mudanca de pais, de cidade, de vida — que toda a gente celebrou como coragem, mas ninguem viu como perda. O casamento que nao aconteceu. O divorcio que ninguem lamentou contigo porque 'era o melhor'. A juventude que passou sem avisares. Tu carregas estas perdas. Todas. E carregas em silencio. Porque quando tentaste falar, ouviste: 'mas ninguem morreu'. 'Nao e para tanto.' 'Tens de seguir em frente.' E seguiste. Com a perda la dentro. Sem nome. Sem choro. Sem espaco.",
          },
          {
            timestamp: "1:30 - 3:30",
            section: "padrao",
            visual: "A caverna expande-se. Mais flores aparecem. A silhueta caminha entre elas, devagar. Cada flor que toca ilumina uma pequena area — como se cada perda, ao ser vista, criasse luz. As flores tem cores diferentes: azul, violeta, ambar. A caverna ja nao e tao escura.",
            narration: "Ha um tipo de perda que a sociedade nao reconhece. Os psicologos chamam-lhe luto nao reconhecido. E a perda que nao tem espaco social. Ninguem te da licenca para a chorar. Ninguem te pergunta como estas. Porque, oficialmente, nao aconteceu nada. Mas aconteceu. E o corpo sabe. O corpo guarda cada perda que a mente se recusou a processar. Guarda na tensao cronica. Na insonia. Na irritacao que explode sem razao. No choro que aparece a ver um filme e tu nao sabes explicar porque. O padrao e este: quando uma perda nao e nomeada, ela nao desaparece. Transforma-se. Transforma-se em ansiedade. Em raiva. Em adormecimento emocional. Em medo de amar de novo, de sonhar de novo, de querer de novo. Porque se da ultima vez doeu — e ninguem sequer reconheceu que doeu — porque e que te ias expor outra vez? E entao fechas-te. Nao completamente. Mas o suficiente para te sentires protegida. E chamas isso de maturidade. Mas nao e maturidade. E luto congelado.",
          },
          {
            timestamp: "3:30 - 5:00",
            section: "gesto",
            visual: "Silhueta sentada no centro do jardim. As flores bioluminescentes a volta brilham com intensidade suave. A silhueta tem as maos abertas, viradas para cima. Uma lagrima de luz dourada cai — e ao tocar no chao, nasce uma flor nova.",
            narration: "Quero fazer uma coisa contigo agora. Quero que penses na perda que nunca choraste. Nao na maior — na que ninguem viu. A que guardaste. A que engoliste. Quando a encontrares, para. Respira. E diz — em silencio ou em voz alta: 'eu perdi isto. E doeu.' So isto. Nao precisas de resolver. Nao precisas de encontrar o lado positivo. Nao precisas de aceitar. So precisas de nomear. Porque a perda sem nome ocupa mais espaco do que a perda nomeada. Quando dizes 'eu perdi isto e doeu', estas a dar a essa dor o que ela sempre precisou: reconhecimento. Nao e fraqueza. E a coisa mais corajosa que podes fazer. Olhar para o que perdeste e dizer: isto foi real. Isto importou. Eu tenho direito a sentir isto.",
          },
          {
            timestamp: "5:00 - 5:30",
            section: "fecho",
            visual: "Territorio dissolve-se no ceu. O jardim fica atras, iluminado. Frase final em texto creme. Fade para escuro. Logo Sete Veus. Silencio.",
            narration: "Se ninguem te deu permissao para chorar isto — eu dou. E real. Merece nome. Se isto te tocou, inscreve-te. A Escola dos Veus esta a chegar — e o primeiro curso e sobre a tua relacao com dinheiro.",
          },
        ],
      },
      {
        number: 9,
        title: "Porque discutir com a tua mae te faz sentir como se tivesses 12 anos",
        courseOrigin: "sangue-e-seda",
        territory: "Arvore das Raizes Visiveis",
        week: 3,
        day: "sabado",
        gancho:
          "Tens 35, 40, 50 anos. Mas basta a tua mae dizer uma frase — uma — e voltas a ter 12. A voz muda. O corpo encolhe. Porque?",
        fraseFinal:
          "Nao e fraqueza. E o corpo a lembrar quem eras quando aprendeste a funcionar com ela. Cresceste — mas o padrao ficou.",
        description:
          "Toca na relacao mae-filha adulta — tema profundo para reflexao de fim de semana.",
        status: "script_ready",
        script: [
          {
            timestamp: "0:00 - 0:15",
            section: "gancho",
            visual: "Ceu azul-marinho. Camara desce para a Arvore das Raizes Visiveis. Raizes enormes, emaranhadas, em vermelho escuro e seda. Duas silhuetas — uma adulta, uma mais velha — frente a frente, com raizes a liga-las pelo chao.",
            narration: "Tens 35, 40, 50 anos. Mas basta a tua mae dizer uma frase — uma — e voltas a ter 12. A voz muda. O corpo encolhe. Porque?",
          },
          {
            timestamp: "0:15 - 1:30",
            section: "situacao",
            visual: "Silhueta adulta ao telefone. A medida que ouve, o corpo comeca a encolher — fica mais pequeno, os ombros sobem, a cabeca baixa. Atras dela, a sombra de uma crianca aparece, sobreposta. As raizes da arvore pulsam.",
            narration: "Pensa na ultima discussao com a tua mae. Ou na ultima vez que ela disse algo que te magoou. Pode ter sido uma critica. Um comentario sobre o teu peso, a tua casa, as tuas escolhas. Pode ter sido o tom — aquele tom que so ela tem, que te atravessa o corpo como se tivesses feito algo errado. E o que aconteceu? Reagiste como adulta? Ou sentiste aquela coisa — aquela regressao instantanea — em que o teu corpo voltou a ter 12 anos? A voz ficou mais aguda. Ou mais calada. Os olhos encheram-se de agua. Ou fechaste-te completamente. E depois ficaste furiosa. Nao so com ela — contigo. Porque tens 40 anos. Porque devias saber lidar com isto. Porque ja leste livros, ja fizeste terapia, ja percebeste tudo. E mesmo assim — ela diz uma frase e tu desabas.",
          },
          {
            timestamp: "1:30 - 3:30",
            section: "padrao",
            visual: "A silhueta sentada junto as raizes da Arvore. As raizes contam historias — em cada uma, pequenas cenas de luz: uma crianca a ouvir, a obedecer, a chorar, a calar. A silhueta adulta ve estas cenas nas raizes. A arvore e enorme, antiga, impossivel de ignorar.",
            narration: "Isto nao e fraqueza. E neurologia. O teu sistema nervoso aprendeu a funcionar com a tua mae antes de teres palavras. Antes de teres logica. Antes de teres defesas. Quando eras crianca, o teu corpo mapeou tudo: o tom de voz que significava perigo, o silencio que significava desaprovacao, o olhar que significava 'desiludiste-me'. E criou respostas automaticas. Encolher. Calar. Agradar. Explodir. Estas respostas ficaram gravadas. Nao na mente — no corpo. E o corpo nao sabe que ja cresceste. O corpo reage ao mesmo estimulo da mesma forma. Sempre. Independentemente de teres 12 ou 45 anos. E por isso que podes estar perfeitamente funcional no trabalho, com amigos, em qualquer relacao — mas basta a tua mae usar aquele tom e todo o teu sistema adulto desliga. E activa a crianca. A crianca que aprendeu que a unica forma de sobreviver aquela relacao era adaptar-se. Ceder. Desaparecer. Ou lutar. O padrao nao e consciente. Nao e uma escolha. E um reflexo. E o reflexo mais antigo que tens.",
          },
          {
            timestamp: "3:30 - 5:00",
            section: "gesto",
            visual: "Silhueta de pe, de costas para a Arvore. Olha para a frente. As raizes continuam atras, mas ja nao a envolvem. A silhueta coloca uma mao sobre o proprio ombro — como se confortasse a versao mais nova de si mesma. Luz dourada suave.",
            narration: "Da proxima vez que isto acontecer — da proxima vez que a tua mae disser algo e o teu corpo reagir como se tivesses 12 anos — faz uma coisa. Para. Nao respondas imediatamente. Poe a mao no peito. E diz internamente: 'Eu ja nao sou crianca. O meu corpo lembra-se. Mas eu ja cresci.' Nao e para anular a emocao. E para criares um espaco — mesmo que seja de tres segundos — entre o estimulo e a reaccao. Nesses tres segundos, a adulta pode aparecer. Pode escolher responder em vez de reagir. Pode dizer 'mae, isso magoa-me' em vez de explodir ou calar. Nao e facil. Nao vai funcionar sempre. Mas cada vez que crias esse espaco, estas a ensinar ao teu corpo algo novo: que ha uma terceira opcao. Nao e lutar nem fugir. E ficar de pe. Inteira. Adulta. Com a crianca dentro de ti protegida — mas ja nao a comandar.",
          },
          {
            timestamp: "5:00 - 5:30",
            section: "fecho",
            visual: "Territorio dissolve-se no ceu. Frase final em texto creme. Fade para escuro. Logo Sete Veus. Silencio.",
            narration: "Nao e fraqueza. E o corpo a lembrar quem eras quando aprendeste a funcionar com ela. Cresceste — mas o padrao ficou. Se isto te tocou, inscreve-te. A Escola dos Veus esta a chegar — e o primeiro curso e sobre a tua relacao com dinheiro.",
          },
        ],
      },
    ],
  },

  // ━━━ SEMANA 4 — FECHO E PROMESSA ━━━
  {
    number: 4,
    theme: "Fecho e Promessa",
    objective:
      "Ultima semana antes do periodo de producao do curso acelerar. Estes videos fecham o ciclo e deixam a audiencia a querer mais.",
    videos: [
      {
        number: 10,
        title: "O teu corpo esta a tentar dizer-te algo — estas a ouvir?",
        courseOrigin: "a-pele-lembra",
        territory: "Corpo-Paisagem",
        week: 4,
        day: "terca",
        gancho:
          "A enxaqueca que aparece antes do Natal na casa da familia. A insonia na semana em que evitas uma conversa. A dor lombar que comecou quando disseste sim a algo que querias recusar. Coincidencia? O corpo nao acha.",
        fraseFinal:
          "O corpo nao mente. A mente sim. Aprende a ouvir quem nunca te enganou.",
        description:
          "Liga corpo e emocoes — tema que ressoa fortemente com o publico-alvo.",
        status: "script_ready",
        script: [
          {
            timestamp: "0:00 - 0:15",
            section: "gancho",
            visual: "Ceu azul-marinho. Camara desce para o Corpo-Paisagem. Uma paisagem que e ao mesmo tempo terreno e corpo — montanhas que parecem ombros, rios que parecem veias. Terracota rosado. Silhueta de pe, maos sobre o proprio corpo, a escutar.",
            narration: "A enxaqueca que aparece antes do Natal na casa da familia. A insonia na semana em que evitas uma conversa. A dor lombar que comecou quando disseste sim a algo que querias recusar. Coincidencia? O corpo nao acha.",
          },
          {
            timestamp: "0:15 - 1:30",
            section: "situacao",
            visual: "Silhueta no Corpo-Paisagem. Em zonas do corpo, pequenas luzes pulsam — vermelhas na garganta, amarelas no estomago, azuis na lombar. Cada luz e um sinal. A silhueta toca no estomago e a paisagem a volta treme.",
            narration: "Pensa nisto. Tens uma reuniao dificil na segunda. No domingo a noite, a insonia aparece. Ou aparece a dor de cabeca. Ou o estomago fecha. Tu tomas um comprimido. Segues. Ignoras. E na terca ja passou. Ate a proxima vez. Ou isto: toda a vez que vais a casa da tua familia, algo no corpo muda. Tensao nos ombros. Aperto no peito. Uma irritacao que aparece do nada, antes sequer de chegares. Tu dizes que e stresse. Que e cansaco. Que e normal. Mas nao e normal. E informacao. O teu corpo esta a falar contigo. Ha anos. E tu estas a tratar a mensagem como ruido.",
          },
          {
            timestamp: "1:30 - 3:30",
            section: "padrao",
            visual: "A paisagem-corpo expande-se. Vemos mais detalhes: cicatrizes no terreno que sao memorias, zonas secas que sao emocoes bloqueadas, um rio que corre mas esta represado numa zona. A silhueta caminha pela paisagem do proprio corpo, a descobri-la.",
            narration: "O corpo tem uma linguagem. Nao e poetica — e literal. Quando sentes medo, o corpo contrai. A garganta fecha, o estomago aperta, os ombros sobem. Nao e metafora — e fisiologia. O sistema nervoso reage antes da mente processar. E quando a mente decide ignorar — quando tu decides que nao e para tanto, que aguentas, que 'e so stresse' — o corpo nao para. Guarda. Acumula. E transforma. A raiva que nunca expressaste vive nos ombros. A tristeza que nunca choraste vive no peito. O medo que nunca enfrentaste vive no estomago. A culpa que nunca questionaste vive nas costas. Cada emocao que a mente rejeita, o corpo acolhe. E guarda ate nao poder mais. E quando o corpo nao pode mais, fala mais alto. A enxaqueca torna-se cronica. A insonia torna-se permanente. A dor que nao tem explicacao medica torna-se companhia. E tu vais ao medico. Fazes exames. Tudo normal. Porque nao e doenca — e acumulacao. O corpo esta cheio do que tu te recusaste a sentir.",
          },
          {
            timestamp: "3:30 - 5:00",
            section: "gesto",
            visual: "Silhueta sentada na paisagem-corpo. Maos no peito. Os olhos fechados. As luzes no corpo comecam a pulsar mais devagar, mais suaves. A paisagem a volta acalma-se. O rio represado comeca a fluir. Cores mais quentes.",
            narration: "Esta noite, antes de adormeceres, faz isto. Deita-te. Fecha os olhos. E faz um scan lento pelo teu corpo. Comeca pela cabeca. Desce pelo pescoco, ombros, peito, estomago, ancas, pernas, pes. Nao tentes mudar nada. Nao tentes relaxar. So observa. Onde ha tensao? Onde ha desconforto? Onde ha vazio? E quando encontrares uma zona que chama a atencao — para. Respira para essa zona. E pergunta, gentilmente: o que estas a guardar? Nao esperes uma resposta em palavras. Espera em sensacao. Espera em emocao. Espera em memoria. Pode vir agora. Pode vir amanha no chuveiro. Pode vir daqui a uma semana. Nao importa quando. Importa que perguntaste. Porque perguntar ao corpo e o primeiro acto de respeito. E ele tem esperado muito tempo por isso.",
          },
          {
            timestamp: "5:00 - 5:30",
            section: "fecho",
            visual: "Territorio dissolve-se no ceu. Frase final em texto creme. Fade para escuro. Logo Sete Veus. Silencio.",
            narration: "O corpo nao mente. A mente sim. Aprende a ouvir quem nunca te enganou. Se isto te tocou, inscreve-te. A Escola dos Veus esta a chegar — e o primeiro curso e sobre a tua relacao com dinheiro.",
          },
        ],
      },
      {
        number: 11,
        title: "O mito da decisao perfeita",
        courseOrigin: "olhos-abertos",
        territory: "Encruzilhada Infinita",
        week: 4,
        day: "quinta",
        gancho:
          "Estas parada ha meses. Nao porque nao sabes o que fazer — mas porque tens medo de escolher errado. E se eu te disser que a decisao perfeita nao existe? Que escolher imperfeito e melhor que nao escolher?",
        fraseFinal:
          "A paz nao vem de decidir certo. Vem de decidir. Ponto.",
        description:
          "Toca no tema da indecisao cronica — forte para engagement e comentarios.",
        status: "script_ready",
        script: [
          {
            timestamp: "0:00 - 0:15",
            section: "gancho",
            visual: "Ceu azul-marinho. Camara desce para a Encruzilhada Infinita. Nevoeiro azul e branco. Varios caminhos em todas as direcoes. Silhueta terracota no centro, imovel, a olhar para todos os lados sem dar um passo.",
            narration: "Estas parada ha meses. Nao porque nao sabes o que fazer — mas porque tens medo de escolher errado. E se eu te disser que a decisao perfeita nao existe? Que escolher imperfeito e melhor que nao escolher?",
          },
          {
            timestamp: "0:15 - 1:30",
            section: "situacao",
            visual: "Silhueta na encruzilhada. O nevoeiro move-se. Os caminhos aparecem e desaparecem — como se mudassem. Cada vez que a silhueta se inclina para um lado, outro caminho surge e ela hesita de novo. Paralisia.",
            narration: "Conheces a sensacao. Tens uma decisao para tomar. Pode ser grande — mudar de emprego, acabar uma relacao, mudar de pais. Ou pode ser media — comecar algo novo, dizer que sim a uma oportunidade, dizer que nao a uma obrigacao. E sabes o que queres. No fundo, sabes. Mas nao avanças. Porque e se e a decisao errada? E se daqui a um ano te arrependes? E se ha uma opcao melhor que ainda nao viste? Entao pesquisas mais. Pedes mais opinioes. Fazes listas de pros e contras. Meditas sobre o assunto. E continuas exactamente onde estavas. Parada. Com a ilusao de que estas a ser prudente. Mas nao es prudente. Estas com medo.",
          },
          {
            timestamp: "1:30 - 3:30",
            section: "padrao",
            visual: "A silhueta senta-se na encruzilhada. O nevoeiro comeca a levantar ligeiramente — nao desaparece, mas suaviza. Vemos que os caminhos, na verdade, nao sao tao diferentes quanto parecem no nevoeiro. Alguns ate se cruzam mais a frente.",
            narration: "O mito da decisao perfeita e isto: a crenca de que existe uma opcao certa e todas as outras sao erradas. E que se escolheres a errada, a tua vida estraga-se. Este mito e paralisante. E falso. Na realidade, a maioria das decisoes nao sao irreversiveis. Podes mudar de emprego e perceber que nao era — e mudar outra vez. Podes ir embora e voltar. Podes dizer sim e depois dizer nao. A vida nao e uma porta que se fecha para sempre. E uma serie de correcoes de rota. Mas o medo nao te deixa ver isso. O medo mostra-te um cenario catastrofico por cada opcao. E nao te mostra o custo de ficar parada. E o custo de ficar parada e enorme. E a vida a passar enquanto tu esperas pela certeza. E a energia gasta em analisar em vez de viver. E o ressentimento silencioso de saberes que podias ter ido — e nao foste. A inaccao nao e seguranca. E outra forma de escolha. E escolheres o medo.",
          },
          {
            timestamp: "3:30 - 5:00",
            section: "gesto",
            visual: "Silhueta de pe. O nevoeiro suaviza-se. A silhueta da o primeiro passo — nao com certeza, mas com intencao. O caminho por baixo dos pes ilumina-se com cada passo. Os outros caminhos nao desaparecem — ficam, mas ja nao paralisam.",
            narration: "Quero que facas uma coisa. Pensa na decisao que andas a adiar. E responde a esta pergunta — nao no papel, no corpo: se nao houvesse forma de errar, o que escolherias? Esquece as consequencias por um momento. Esquece o que os outros vao pensar. Esquece o 'e se'. O que sentes que e certo — nao na cabeca, no estomago? Agora — nao tens de agir amanha. Mas faz uma coisa: tira a decisao do abstracto. Da-lhe um primeiro passo concreto. Nao 'vou mudar de vida'. Mas 'vou ligar para saber como funciona'. Nao 'vou acabar tudo'. Mas 'vou ter a conversa esta semana'. Um passo. So um. Porque uma decisao imperfeita move-te. A espera pela perfeicao congela-te. E a vida nao acontece no congelador.",
          },
          {
            timestamp: "5:00 - 5:30",
            section: "fecho",
            visual: "Territorio dissolve-se no ceu. Frase final em texto creme. Fade para escuro. Logo Sete Veus. Silencio.",
            narration: "A paz nao vem de decidir certo. Vem de decidir. Ponto. Se isto te tocou, inscreve-te. A Escola dos Veus esta a chegar — e o primeiro curso e sobre a tua relacao com dinheiro.",
          },
        ],
      },
      {
        number: 12,
        title: "3 sinais de que estas a repetir a vida da tua mae sem saber",
        courseOrigin: "sangue-e-seda",
        territory: "Arvore das Raizes Visiveis",
        week: 4,
        day: "sabado",
        gancho:
          "Fazes exactamente como ela. Ou fazes exactamente o contrario. Ambas sao herancas. Nenhuma e escolha. Aqui estao 3 sinais de que ainda estas a reagir a tua mae em vez de viver a tua propria vida.",
        fraseFinal:
          "Repetir e hereditario. Escolher e liberdade. A Escola dos Veus abre em breve — e o primeiro curso ajuda-te a ver o que herdaste sem saber.",
        description:
          "O ultimo video fecha com o tema mais profundo — heranca. Deixa a audiencia a querer o curso.",
        status: "script_ready",
        script: [
          {
            timestamp: "0:00 - 0:15",
            section: "gancho",
            visual: "Ceu azul-marinho. Camara desce para a Arvore das Raizes Visiveis. A arvore e enorme, antiga. Duas silhuetas de pe — uma adulta, uma mais velha — em lados opostos da arvore, ligadas pelas mesmas raizes. As raizes pulsam em vermelho escuro e seda.",
            narration: "Fazes exactamente como ela. Ou fazes exactamente o contrario. Ambas sao herancas. Nenhuma e escolha. Aqui estao 3 sinais de que ainda estas a reagir a tua mae em vez de viver a tua propria vida.",
          },
          {
            timestamp: "0:15 - 1:30",
            section: "situacao",
            visual: "A silhueta adulta caminha. Atras dela, como uma sombra, a silhueta mais velha faz o mesmo movimento. Quando a adulta para, a sombra para. Quando muda de direcao, a sombra tambem muda — mas para o lado oposto. Espelho invertido.",
            narration: "Ha duas formas de herdar a vida da tua mae. A mais obvia: repetir. Casar com o mesmo tipo de pessoa. Reagir da mesma forma a conflitos. Carregar o mesmo peso. Sacrificar-te da mesma maneira. Olhar para ti aos 40 e reconhecer os gestos dela nas tuas maos. A outra forma e menos obvia mas igualmente poderosa: rejeitar tudo. Fazer exactamente o oposto. Ela era submissa — tu es controladora. Ela calava — tu explodes. Ela ficou — tu foges. Parece liberdade. Parece que te libertaste. Mas nao te libertaste. Estas a reagir a ela. Cada escolha que fazes 'para nao ser como ela' continua a ser sobre ela. A referencia continua a ser a tua mae. E enquanto ela for a referencia — a favor ou contra — tu nao es livre.",
          },
          {
            timestamp: "1:30 - 3:30",
            section: "padrao",
            visual: "A silhueta sentada entre as raizes da Arvore. Tres raizes maiores brilham — uma por sinal. A silhueta toca em cada uma e ve uma cena de luz. Na primeira raiz: a mae a sacrificar-se. Na segunda: a mae a calar. Na terceira: a mae a negar prazer. A silhueta reconhece-se em cada cena — como reflexo ou como oposto.",
            narration: "Os tres sinais. O primeiro: sacrificas-te sem ninguem pedir. Olhas para a tua vida e percebes que estas a dar mais do que recebes. Em todas as relacoes. E quando alguem te pergunta o que precisas, nao sabes responder. Isto nao e generosidade — e programacao. Aprendeste que o valor de uma mulher se mede pelo que sacrifica. Se a tua mae se anulou pelos outros, tu absorveste essa regra. E mesmo que racionalmente discordes — o corpo obedece. O segundo: tens dificuldade em receber prazer sem culpa. Descanso, dinheiro, sexo, elogios — qualquer forma de prazer vem com um 'mas'. 'Gostei, mas devia estar a fazer outra coisa.' 'Mereco, mas ha quem precise mais.' A tua mae provavelmente nao se permitia prazer. E ensinou-te, sem palavras, que prazer e egoismo. O terceiro — e este e o mais profundo: reages emocionalmente como ela. Ou exactamente ao contrario. A forma como lidas com raiva, com tristeza, com medo — nao e tua. E dela. Copiada ou invertida. Mas em ambos os casos, e uma resposta ao que viste. Nao ao que sentes.",
          },
          {
            timestamp: "3:30 - 5:00",
            section: "gesto",
            visual: "Silhueta de pe, frente a Arvore. Nao corta as raizes — mas planta algo novo ao lado. Uma raiz mais fina, de cor diferente — dourada — comeca a crescer. A raiz nova nao nega as antigas. Coexiste. A silhueta olha para cima, para os ramos, onde começa a entrar luz.",
            narration: "Nao te vou pedir para perdoar a tua mae. Nao e disso que se trata. Vou pedir-te algo diferente. Pega num papel e divide-o em duas colunas. Na esquerda, escreve: 'O que herdei dela'. Na direita: 'O que e meu'. Na coluna da esquerda, poe tudo. O bom e o mau. A forca e o medo. A generosidade e o sacrificio. O silencio e a resiliencia. Na coluna da direita, escreve o que escolheste. Nao o que reagiste — o que escolheste. As coisas que sao tuas, nao dela. Pode ser pouco. Pode ser uma lista curta. Nao faz mal. Porque o objectivo nao e apagar a heranca. E ver a heranca. E distinguir o que e raiz dela do que e raiz tua. E a partir dai, escolher conscientemente o que fica. O que queres manter — porque e bonito, porque e teu, porque faz sentido. E o que queres devolver — com gentileza, com respeito, mas com firmeza. Porque nao te pertence.",
          },
          {
            timestamp: "5:00 - 5:30",
            section: "fecho",
            visual: "Territorio dissolve-se no ceu. Frase final em texto creme. Fade para escuro. Logo Sete Veus. Silencio mais longo — este e o ultimo video.",
            narration: "Repetir e hereditario. Escolher e liberdade. A Escola dos Veus abre em breve — e o primeiro curso ajuda-te a ver o que herdaste sem saber. Se isto te tocou, inscreve-te. Ha mais para ti.",
          },
        ],
      },
    ],
  },
];

// ─── Helpers ────────────────────────────────────────────────────────────────────

export function getAllVideos(): YouTubeVideo[] {
  return YOUTUBE_WEEKS.flatMap((w) => w.videos);
}

export function getVideoByNumber(n: number): YouTubeVideo | undefined {
  return getAllVideos().find((v) => v.number === n);
}

export function getVideosByWeek(week: number): YouTubeVideo[] {
  return YOUTUBE_WEEKS.find((w) => w.number === week)?.videos ?? [];
}

export function getVideosByCourse(slug: CourseSlug): YouTubeVideo[] {
  return getAllVideos().filter(
    (v) => v.courseOrigin === slug || v.secondaryCourse === slug
  );
}

export function getWeekByNumber(week: number): YouTubeWeek | undefined {
  return YOUTUBE_WEEKS.find((w) => w.number === week);
}

const DAY_LABELS: Record<YouTubeDay, string> = {
  terca: "Terca-feira",
  quinta: "Quinta-feira",
  sabado: "Sabado",
};

export function getDayLabel(day: YouTubeDay): string {
  return DAY_LABELS[day];
}

const STATUS_LABELS: Record<VideoStatus, string> = {
  draft: "Rascunho",
  script_ready: "Script pronto",
  approved: "Aprovado",
  producing: "Em producao",
  review: "Em revisao",
  scheduled: "Agendado",
  published: "Publicado",
};

export function getStatusLabel(status: VideoStatus): string {
  return STATUS_LABELS[status];
}
