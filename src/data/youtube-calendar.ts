/**
 * Calendario YouTube — A Escola dos Veus
 * ────────────────────────────────────────
 * 4 semanas | 12 videos | 3 por semana (Terca, Quinta, Sabado)
 *
 * Horario: 18h Maputo / 15h Lisboa / 13h Sao Paulo
 * Duracao: 5-7 minutos cada
 *
 * Estrutura de cada video:
 *   0:00 - 0:15  Gancho forte
 *   0:15 - 1:30  Situacao reconhecivel
 *   1:30 - 3:30  O padrao por baixo
 *   3:30 - 5:00  Gesto de consciencia
 *   5:00 - 5:30  Frase final + CTA
 *
 * CTA (primeiras 4 semanas):
 *   "Se isto te tocou, inscreve-te. A Escola dos Veus esta a chegar
 *    — e o primeiro curso e sobre a tua relacao com dinheiro."
 */

import type { CourseSlug } from "@/types/course";

// ─── Types ──────────────────────────────────────────────────────────────────────

export type YouTubeDay = "terca" | "quinta" | "sabado";

export type VideoStatus =
  | "draft"        // script por escrever
  | "script_ready" // script pronto, aguarda aprovacao
  | "approved"     // script aprovado, pronto para producao
  | "producing"    // em producao (audio + imagens + montagem)
  | "review"       // montagem feita, aguarda revisao final
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
    "Se isto te tocou, inscreve-te. A Escola dos Veus esta a chegar — e o primeiro curso e sobre a tua relacao com dinheiro.",
} as const;

export const YOUTUBE_DESCRIPTION_TEMPLATE = `[TITULO]

[DESCRICAO_VIDEO]

A Escola dos Veus e um lugar onde entras para ver o que estava invisivel. Cursos sobre a vida real — dinheiro, relacoes, corpo, limites, luto, decisoes — ensinados pela lente do corpo, nao da mente.

O primeiro curso esta a chegar.

Inscreve-te para nao perderes.
seteveus.space

#autoconhecimento #desenvolvimentopessoal #escoladosveus #corpo #emocoes`;

export const YOUTUBE_TAGS = [
  "autoconhecimento",
  "desenvolvimento pessoal",
  "escola dos veus",
  "corpo",
  "emocoes",
  "mulheres",
  "sete veus",
];

// ─── Checklist de publicacao ────────────────────────────────────────────────────

export const VIDEO_CHECKLIST = [
  "Titulo atractivo e emocional?",
  "Thumbnail com visual do Mundo dos Veus?",
  "Gancho nos primeiros 15 segundos?",
  "Duracao 5-7 minutos?",
  "Voz natural, ritmo calmo?",
  "Visuais consistentes com a paleta Sete Veus?",
  "Texto animado com frases-chave?",
  "Frase final que fica?",
  "CTA: inscricao no canal + 'A Escola dos Veus esta a chegar'?",
  "Legendas activas?",
  "Descricao com: resumo + link seteveus.space + 'curso a chegar'?",
  "Tags: autoconhecimento, desenvolvimento pessoal, mulheres, corpo, emocoes?",
] as const;

// ─── Producao pipeline ──────────────────────────────────────────────────────────

export const PRODUCTION_STEPS = [
  { step: 1, label: "Script aprovado", responsible: "Claude Code" },
  { step: 2, label: "Gerar audio (ElevenLabs — voz clonada)", responsible: "Vivianne" },
  { step: 3, label: "Gerar 4-6 imagens das cenas do territorio", responsible: "ElevenLabs" },
  { step: 4, label: "Transformar imagens em clips de video", responsible: "ElevenLabs" },
  { step: 5, label: "Montar clips + audio + texto + musica + legendas", responsible: "ElevenLabs Studio" },
  { step: 6, label: "Export MP4", responsible: "Vivianne" },
  { step: 7, label: "Revisao final", responsible: "Vivianne" },
  { step: 8, label: "Upload YouTube (agendar para dia seguinte 18h)", responsible: "Vivianne" },
] as const;

// ─── The 12 videos ──────────────────────────────────────────────────────────────

export const YOUTUBE_WEEKS: YouTubeWeek[] = [
  // ━━━ SEMANA 1 — ENTRADA NO MUNDO ━━━
  {
    number: 1,
    theme: "Entrada no Mundo",
    objective:
      "Apresentar a voz, o estilo visual, e tocar nos temas mais universais. Ninguem te conhece ainda. Estes videos sao a primeira impressao.",
    videos: [
      {
        number: 1,
        title: "Porque sentes culpa quando gastas dinheiro em ti mesma?",
        courseOrigin: "ouro-proprio",
        territory: "Casa dos Espelhos Dourados",
        week: 1,
        day: "terca",
        gancho:
          "Gastas nos filhos sem pensar. Gastas na casa sem pestanejar. Mas quando e para ti — um creme, um livro, um cafe a sos — aparece a culpa. Porque?",
        fraseFinal:
          "A culpa nao e tua. Foi ensinada. E o que foi ensinado pode ser desaprendido.",
        description:
          "E o tema mais universal e activador. Toda a mulher que comprou algo para si e sentiu culpa vai clicar. E emocional, e concreto, e abre a porta para tudo o resto.",
        status: "script_ready",
        script: [
          {
            timestamp: "0:00 - 0:15",
            section: "gancho",
            visual: "Ceu azul-marinho profundo. Camara desce lentamente para a Casa dos Espelhos Dourados. Silhueta terracota de pe, imovel, frente a um espelho coberto.",
            narration: "Gastas nos filhos sem pensar. Gastas na casa sem pestanejar. Mas quando e para ti — um creme, um livro, um cafe a sos — aparece a culpa. Porque?",
          },
          {
            timestamp: "0:15 - 1:30",
            section: "situacao",
            visual: "Silhueta sentada frente a varios espelhos. Cada espelho reflecte uma cena diferente: um carrinho de compras, uma factura, uma prateleira de loja. Tons dourados suaves.",
            narration: "Imagina isto. Estas numa loja. Ves algo bonito. Algo so para ti. Nao e caro. Nao e um luxo absurdo. Pegas. Olhas. E depois vem aquela voz. 'Precisas mesmo disto?' 'Ha coisas mais importantes.' 'E se o dinheiro fizer falta?' Pousas. Sais. E no caminho para casa, sentes um alivio estranho — como se tivesses evitado um erro. Mas nao evitaste nenhum erro. Evitaste-te a ti. Agora pensa na ultima vez que compraste algo para os teus filhos. Ou para a casa. Ou para alguem que amas. Houve hesitacao? Houve culpa? Provavelmente nao. Porque gastar nos outros sente-se certo. Gastar em ti sente-se egoista. E esta diferenca — esta diferenca entre o que aceitas para os outros e o que te negas a ti — nao e acidental. Foi construida.",
          },
          {
            timestamp: "1:30 - 3:30",
            section: "padrao",
            visual: "Silhueta de pe numa sala de espelhos. Nos reflexos, aparecem silhuetas mais pequenas — a mesma pessoa em crianca. Os espelhos estao embaciados, com frases escritas na condensacao. A luz dourada comeca a entrar por uma fresta.",
            narration: "A culpa que sentes quando gastas em ti nao nasceu contigo. Nasceu antes de ti. Nasceu na cozinha da tua mae, quando ela dizia 'nao precisamos disso' com a voz cansada. Nasceu no olhar do teu pai quando alguem falava de dinheiro e ele mudava de assunto. Nasceu nas vezes que viste a tua mae negar-se tudo — o creme, o vestido, o descanso — e chamarem-lhe boa mulher por isso. Tu absorveste uma equacao invisivel: mulher boa igual a mulher que nao gasta em si. Mulher egoista igual a mulher que se coloca primeiro. E esta equacao ficou gravada. Nao no pensamento — no corpo. E por isso que a culpa nao e uma ideia. E uma sensacao. Um aperto. Um desconforto fisico quando a caixa regista o valor. E por isso que nao basta dizeres a ti mesma 'eu mereco'. O corpo nao acredita em frases. O corpo acredita em padroes. E o padrao que aprendeste diz: tu es a ultima da fila. Sempre.",
          },
          {
            timestamp: "3:30 - 5:00",
            section: "gesto",
            visual: "Silhueta de pe, maos no peito. A luz dourada cresce. Os espelhos comecam a desembaciar. A silhueta da um passo em frente, para mais perto de um espelho limpo.",
            narration: "Quero propor-te uma coisa pequena. Nao uma revolucao. Um gesto. Na proxima semana, compra uma coisa so para ti. Algo pequeno. Pode ser um cafe especial, uma vela, um caderno. Algo que nao 'precisas'. Algo que existe so porque te da prazer. E quando a culpa aparecer — porque vai aparecer — nao a empurres. Nao te julgues por a sentires. Para. Respira. E pergunta-lhe: de quem es tu? De quem e esta voz que me diz que nao mereco? Nao precisas de responder agora. So precisas de ouvir a pergunta. Porque a culpa que nao se questiona repete-se para sempre. A culpa que se olha de frente comeca a perder forca.",
          },
          {
            timestamp: "5:00 - 5:30",
            section: "fecho",
            visual: "Territorio dissolve-se no ceu azul-marinho. Frase final em texto creme no ecra. Fade para escuro. Logo Sete Veus. Silencio.",
            narration: "A culpa nao e tua. Foi ensinada. E o que foi ensinado pode ser desaprendido. Se isto te tocou, inscreve-te. A Escola dos Veus esta a chegar — e o primeiro curso e sobre a tua relacao com dinheiro.",
          },
        ],
      },
      {
        number: 2,
        title: "3 frases sobre dinheiro que a tua mae te ensinou sem saber",
        courseOrigin: "ouro-proprio",
        secondaryCourse: "sangue-e-seda",
        territory: "Casa dos Espelhos Dourados + Arvore das Raizes",
        week: 1,
        day: "quinta",
        gancho:
          "'Dinheiro nao cresce em arvores.' 'Nos nao somos dessa gente.' 'Rico e tudo egoista.' — Reconheces alguma?",
        fraseFinal:
          "Antes dos 12 anos, ja tinhas um script completo sobre dinheiro. Nao te foi ensinado. Foi absorvido.",
        description:
          "Mantem o tema dinheiro mas liga a familia. As pessoas que viram o video 1 reconhecem a continuidade. As que nao viram entram por outro angulo.",
        status: "script_ready",
        script: [
          {
            timestamp: "0:00 - 0:15",
            section: "gancho",
            visual: "Ceu azul-marinho. Camara desce para a Casa dos Espelhos Dourados, transita para a Arvore das Raizes Visiveis ao fundo. Silhueta terracota de pe entre os dois territorios.",
            narration: "'Dinheiro nao cresce em arvores.' 'Nos nao somos dessa gente.' 'Rico e tudo egoista.' Reconheces alguma?",
          },
          {
            timestamp: "0:15 - 1:30",
            section: "situacao",
            visual: "Silhueta sentada junto a Arvore das Raizes. As raizes sao visiveis, brilham em dourado. Nos ramos da arvore, aparecem silhuetas mais pequenas — figuras parentais. Tons quentes de terracota e ambar.",
            narration: "Ha frases que ninguem se senta a ensinar-te. Ninguem abre um livro e diz 'agora vou explicar-te o que o dinheiro significa'. Nao funciona assim. Funciona no jantar, quando o teu pai suspira ao abrir uma carta do banco. Funciona na feira, quando a tua mae pousa o vestido que gostava e diz 'nao e para nos'. Funciona no tom de voz com que alguem dizia 'aquele la tem dinheiro' — como se ter dinheiro fosse uma doenca moral. Tu nao aprendeste o que o dinheiro e. Aprendeste o que o dinheiro significa na tua familia. E essas duas coisas sao muito diferentes.",
          },
          {
            timestamp: "1:30 - 3:30",
            section: "padrao",
            visual: "Silhueta de pe frente a Arvore. As raizes envolvem-na suavemente. Em cada raiz, texto em creme com frases herdadas. A silhueta toca numa raiz e ela brilha — depois escurece. Alternancia entre Casa dos Espelhos e Arvore.",
            narration: "Vou dar-te tres frases. E quero que sintas — nao que penses — sintas qual delas mora em ti. A primeira: 'Dinheiro nao traz felicidade.' Parece sabedoria. Mas ouve o que esta por baixo. O que esta por baixo e: nao queiras demasiado. Nao ambiciones. Fica onde estas. Esta frase protege — mas tambem prende. A segunda: 'Nos nao somos dessa gente.' Esta e sobre pertenca. Sobre a ideia de que dinheiro e para outros. Que ha um lugar onde tu cabes — e nao e o lugar da abundancia. Esta frase define o tecto do que te permites ter. A terceira: 'Cuidado com quem tem dinheiro.' Esta e mais subtil. Ensina que riqueza e suspeita. Que quem ganha bem deve ter feito algo errado. E entao tu, inconscientemente, tratas o dinheiro como algo sujo. Algo de que te tens de manter longe para seres uma boa pessoa. Tres frases. Nenhuma foi dita com maldade. Todas foram ditas com medo. E o medo dos teus pais tornou-se o teu tecto.",
          },
          {
            timestamp: "3:30 - 5:00",
            section: "gesto",
            visual: "Silhueta sentada, maos abertas. A Arvore comeca a mudar — as raizes reorganizam-se suavemente. Luz dourada entra por entre os ramos. Uma raiz nova, mais fina, brota com uma cor diferente — mais clara.",
            narration: "Pega num papel. Ou abre as notas do telemovel. E escreve as frases sobre dinheiro que cresceram contigo. Nao as que leste em livros. As que ouviste em casa. As que estavam no tom de voz, no suspiro, no olhar. Escreve-as como as ouviste. Depois, por baixo de cada uma, escreve: 'Isto nao e meu. Isto e de quem veio antes de mim.' Nao precisas de as apagar. Nao precisas de as substituir por afirmacoes positivas. So precisas de as devolver. De perceber que estas a viver com um mapa financeiro que foi desenhado por alguem que tinha medo. E o medo deles nao tem de ser o teu.",
          },
          {
            timestamp: "5:00 - 5:30",
            section: "fecho",
            visual: "Territorio dissolve-se no ceu. Frase final em texto creme. Fade para escuro. Logo Sete Veus. Silencio.",
            narration: "Antes dos 12 anos, ja tinhas um script completo sobre dinheiro. Nao te foi ensinado. Foi absorvido. Se isto te tocou, inscreve-te. A Escola dos Veus esta a chegar — e o primeiro curso e sobre a tua relacao com dinheiro.",
          },
        ],
      },
      {
        number: 3,
        title: "A diferenca entre ser amada e ser util",
        courseOrigin: "limite-sagrado",
        territory: "Muralha que Nasce do Chao",
        week: 1,
        day: "sabado",
        gancho:
          "Se parasses de ajudar, de resolver, de estar disponivel — continuariam a ligar-te? Ou so te procuram quando precisam?",
        fraseFinal:
          "Ser util nao e ser amada. E confundir as duas coisas custa-te mais do que imaginas.",
        description:
          "Mais reflexivo, mais pesado. O sabado da espaco para sentar com isto. Muda de tema (sai do dinheiro, entra nos limites) para mostrar que o canal e mais do que um assunto.",
        status: "script_ready",
        script: [
          {
            timestamp: "0:00 - 0:15",
            section: "gancho",
            visual: "Ceu azul-marinho. Camara desce para a Muralha que Nasce do Chao. Silhueta terracota de pe, mao estendida para o lado — como se oferecesse algo. Nao ha muralha ainda. O chao esta vazio.",
            narration: "Se parasses de ajudar, de resolver, de estar disponivel — continuariam a ligar-te? Ou so te procuram quando precisam?",
          },
          {
            timestamp: "0:15 - 1:30",
            section: "situacao",
            visual: "Silhueta rodeada de outras figuras. Todas estendem as maos para ela. A silhueta central da, da, da — as maos abertas, o corpo ligeiramente curvado. As outras figuras vao-se embora depois de receberem. A silhueta fica sozinha.",
            narration: "Es a pessoa a quem toda a gente liga quando precisa de alguma coisa. A amiga que ouve. A irma que resolve. A colega que fica ate mais tarde. A filha que nunca diz que nao. E sentes-te bem com isso. Ou pelo menos, dizias que sim. Porque ajudar da-te um lugar. Um proposito. Uma certeza de que es necessaria. Mas ha uma pergunta que evitas. Uma que mora no fundo e que so aparece de noite, quando estas cansada demais para te distraires: se eu parasse de dar — alguem ficava? Se eu nao fosse util — alguem me escolhia na mesma?",
          },
          {
            timestamp: "1:30 - 3:30",
            section: "padrao",
            visual: "Silhueta sentada no chao, sozinha. As outras figuras sao sombras distantes. Do chao comeca a nascer um brilho dourado — o inicio da muralha, mas ainda fragil, quase invisivel. A silhueta olha para as maos vazias.",
            narration: "Ha uma confusao antiga entre ser amada e ser necessaria. Aprendeste cedo que o amor se ganha. Que nao e dado — e merecido. E a forma de o merecer era ser boa. Ser disponivel. Ser aquela que nunca falha. Entao construiste uma identidade inteira em cima disso. Es a que ajuda. Es a que resolve. Es a que aguenta. E sim — as pessoas gostam de ti. Mas gostam de ti ou gostam do que fazes por elas? Esta pergunta doi. Eu sei. Mas e necessaria. Porque o que acontece quando confundes utilidade com amor e isto: deixas de ter limites. Porque dizer nao e arriscar perder o amor. E se o amor depende do que das — entao tens de dar sempre. Sem parar. Mesmo quando ja nao tens. E chamas isso de generosidade. Mas nao e generosidade. E medo. Medo de descobrires que sem a tua funcao, nao sobra razao para ficarem.",
          },
          {
            timestamp: "3:30 - 5:00",
            section: "gesto",
            visual: "Silhueta de pe. Do chao nasce uma linha de luz dourada — o inicio de um limite. A silhueta coloca a mao sobre o peito. As figuras ao longe continuam la, mas a uma distancia respeitosa. A muralha nao e alta — e apenas uma linha de luz.",
            narration: "Esta semana, quero que facas uma coisa. Uma unica coisa. Quando alguem te pedir algo — um favor, o teu tempo, a tua energia — antes de dizeres sim, para. Nao digas nada durante cinco segundos. Cinco segundos de silencio. E nesses cinco segundos, pergunta ao teu corpo: eu quero fazer isto? Ou estou a fazer isto para que me continuem a querer? Nao tens de dizer nao. So tens de ouvir a diferenca entre o sim genuino e o sim por medo. Porque o dia em que comecares a distinguir os dois e o dia em que comecas a descobrir quem fica quando tu paras de dar.",
          },
          {
            timestamp: "5:00 - 5:30",
            section: "fecho",
            visual: "Territorio dissolve-se no ceu. Frase final em texto creme. Fade para escuro. Logo Sete Veus. Silencio.",
            narration: "Ser util nao e ser amada. E confundir as duas coisas custa-te mais do que imaginas. Se isto te tocou, inscreve-te. A Escola dos Veus esta a chegar — e o primeiro curso e sobre a tua relacao com dinheiro.",
          },
        ],
      },
    ],
  },

  // ━━━ SEMANA 2 — ALARGAR O TERRITORIO ━━━
  {
    number: 2,
    theme: "Alargar o Territorio",
    objective:
      "A audiencia que ficou da semana 1 espera mais. Esta semana tocamos em 3 temas diferentes para mostrar a amplitude do universo.",
    videos: [
      {
        number: 4,
        title: "Porque estas sempre cansada e ferias nao resolvem",
        courseOrigin: "o-peso-e-o-chao",
        territory: "Caminho de Pedras",
        week: 2,
        day: "terca",
        gancho:
          "Dormiste 8 horas. Tiraste ferias. Fizeste spa. E continuas exausta. E se o problema nao for falta de descanso?",
        fraseFinal:
          "Nao estas cansada porque descansas mal. Estas cansada porque carregas demais. A solucao nao e um banho de espuma — e por peso no chao.",
        description:
          "Tema do cansaco cronico — toca em muitas mulheres que se sentem exaustas apesar de descansarem.",
        status: "script_ready",
        script: [
          {
            timestamp: "0:00 - 0:15",
            section: "gancho",
            visual: "Ceu azul-marinho. Camara desce para o Caminho de Pedras. Silhueta terracota curvada, a carregar pedras invisiveis nos ombros. O caminho e longo, cinzento, sem fim a vista.",
            narration: "Dormiste 8 horas. Tiraste ferias. Fizeste spa. E continuas exausta. E se o problema nao for falta de descanso?",
          },
          {
            timestamp: "0:15 - 1:30",
            section: "situacao",
            visual: "Silhueta a caminhar pelo caminho de pedras. Cada passo e pesado. Atras dela, o caminho esta cheio de pedras ja percorridas. A frente, mais pedras. Tons cinza-pedra com acentos terracota.",
            narration: "Conheces aquele cansaco que nao sai? Acordas cansada. Trabalhas cansada. Chegas a casa cansada. Ao fim-de-semana, tentas descansar — mas ate o descanso cansa, porque pensas em tudo o que devias estar a fazer. E entao tentas solucoes. Dormir mais. Chá. Meditacao. Ferias. E por uns dias parece melhor. Mas volta. Volta sempre. Porque o cansaco nao e fisico. Ou melhor — e fisico, mas nao comecou no corpo. Comecou no que carregas. E o que carregas nao sai com ferias. Porque tu nem sequer sabes o que estas a carregar.",
          },
          {
            timestamp: "1:30 - 3:30",
            section: "padrao",
            visual: "Silhueta parada no meio do caminho. As pedras tornam-se visiveis — cada uma tem uma palavra gravada em luz creme: 'expectativas', 'culpa', 'controlo', 'perfeccao', 'agradar'. A silhueta olha para elas como se as visse pela primeira vez.",
            narration: "O cansaco que nao passa com descanso tem um nome. Chama-se peso emocional. E sao as coisas que carregas sem ninguem te pedir. A expectativa de ser perfeita no trabalho. A responsabilidade de manter toda a gente feliz. A culpa quando descansas porque 'ha tanta coisa para fazer'. O controlo de tudo — porque se tu nao fizeres, quem faz? A necessidade de provar que es capaz, que aguentas, que das conta. Cada uma destas coisas e uma pedra. Pequena, invisivel, mas real. E tu carregas-as todas ao mesmo tempo. Ha anos. Sem parar. E o mais cruel e isto: ninguem te pediu para carregar a maior parte delas. Tu assumiste. Porque aprendeste que ser boa e carregar tudo sem te queixar. Que pedir ajuda e fraqueza. Que parar e luxo. Entao nao paras. E o corpo cobra. Cobra em exaustao. Em insonia. Em dores que nao tem explicacao medica. Em irritacao com tudo e todos. O corpo esta a gritar o que tu te recusas a dizer: estou cheia.",
          },
          {
            timestamp: "3:30 - 5:00",
            section: "gesto",
            visual: "Silhueta de pe, a segurar uma pedra. Lentamente, abre as maos e deixa a pedra cair no chao. O som e suave. O corpo endireita-se ligeiramente. Mais luz dourada entra na cena.",
            narration: "Quero que facas uma lista. Nao uma lista de tarefas — uma lista de peso. Escreve tudo o que carregas. Tudo. O trabalho. As expectativas. As pessoas que dependem de ti. As coisas que fazes por obrigacao. As que fazes por culpa. As que fazes porque 'alguem tem de fazer'. Escreve tudo. E depois olha para essa lista e marca as que sao realmente tuas. As que escolheste. As que queres. Vais notar uma coisa: metade do que carregas nao e teu. E peso herdado. E expectativa alheia. E culpa que nao te pertence. E nao precisas de largar tudo de uma vez. Mas precisas de ver o que estas a carregar. Porque so se larga o que se ve.",
          },
          {
            timestamp: "5:00 - 5:30",
            section: "fecho",
            visual: "Territorio dissolve-se no ceu. Frase final em texto creme. Fade para escuro. Logo Sete Veus. Silencio.",
            narration: "Nao estas cansada porque descansas mal. Estas cansada porque carregas demais. A solucao nao e um banho de espuma — e por peso no chao. Se isto te tocou, inscreve-te. A Escola dos Veus esta a chegar — e o primeiro curso e sobre a tua relacao com dinheiro.",
          },
        ],
      },
      {
        number: 5,
        title: "O teste do preco: diz o teu valor em voz alta",
        courseOrigin: "ouro-proprio",
        territory: "Casa dos Espelhos Dourados",
        week: 2,
        day: "quinta",
        gancho:
          "Vou pedir-te para fazeres uma coisa agora. Pensa no preco que cobras pelo teu trabalho. Ou no salario que achas que mereces. Agora diz esse numero em voz alta. Alto. Onde e que a voz tremeu?",
        fraseFinal: "A voz treme onde o merecimento hesita.",
        description:
          "Video interactivo — pede a pessoa para fazer algo enquanto ve. Gera engagement e comentarios.",
        status: "script_ready",
        script: [
          {
            timestamp: "0:00 - 0:15",
            section: "gancho",
            visual: "Ceu azul-marinho. Camara desce para a Casa dos Espelhos Dourados. Silhueta terracota de pe frente a um espelho grande. No espelho, um reflexo ligeiramente diferente — mais pequeno, mais hesitante.",
            narration: "Vou pedir-te para fazeres uma coisa agora. Pensa no preco que cobras pelo teu trabalho. Ou no salario que achas que mereces. Agora diz esse numero em voz alta. Alto. Onde e que a voz tremeu?",
          },
          {
            timestamp: "0:15 - 1:30",
            section: "situacao",
            visual: "Silhueta frente ao espelho. O reflexo mostra numeros dourados a flutuar — alguns brilham, outros apagam-se. A silhueta tenta tocar num numero mais alto e a mao hesita.",
            narration: "Fizeste? Disseste o numero em voz alta? Se disseste — repara no que aconteceu no corpo. Se a voz saiu firme, inteira, sem hesitacao — provavelmente ja fizeste um trabalho importante sobre o teu valor. Mas se tremeu. Se baixou. Se ficou presa na garganta. Se sentiste vergonha. Ou se nem conseguiste dizer — isso e informacao. Nao e fraqueza. E informacao. Porque o preco que cobras e o reflexo directo do que acreditas merecer. E a maioria das mulheres cobra menos. Aceita menos. Pede menos. Nao porque valha menos — mas porque dizer o seu valor em voz alta ativa qualquer coisa antiga. Qualquer coisa que diz: quem es tu para pedir tanto?",
          },
          {
            timestamp: "1:30 - 3:30",
            section: "padrao",
            visual: "Silhueta sentada. Os espelhos a volta mostram cenas: a crianca na escola com a mao levantada que ninguem ve, a adolescente que pede e ouve 'nao ha', a mulher jovem que aceita o primeiro salario sem negociar. Cada espelho e um momento. Tons dourados com sombras.",
            narration: "O que acontece quando dizes o teu preco em voz alta e que o corpo activa uma memoria. Nao uma memoria especifica — uma acumulacao. Todas as vezes que pediste e ouviste nao. Todas as vezes que viste alguem olhar para ti como se estivesses a pedir demais. Todas as vezes que baixaste o preco antes de alguem sequer negociar — porque era mais seguro pedir menos do que arriscar a rejeicao. Ha um padrao aqui. E este: tu negoceias contra ti mesma antes de o outro abrir a boca. O desconto ja vem aplicado. Ja decidiste que e demais. Ja te convenceste de que ninguem vai pagar isso. E sabes porque? Porque no fundo, nao e sobre o preco. E sobre a crenca de que tu — tu, nao o teu trabalho, nao o teu servico — tu nao vales aquilo. O preco e um espelho. E o que ele reflecte nao e o mercado. E o que sentes sobre ti mesma quando ninguem esta a ver.",
          },
          {
            timestamp: "3:30 - 5:00",
            section: "gesto",
            visual: "Silhueta de pe frente ao espelho. Desta vez, o reflexo e do mesmo tamanho. A silhueta coloca as maos no peito. No espelho, os numeros reorganizam-se — o mais alto fica no centro, a brilhar em dourado quente.",
            narration: "Quero que facas este exercicio esta semana. Escolhe um momento em que estejas sozinha. De pe. Olha para um espelho — pode ser o do quarto, o da casa-de-banho, qualquer um. E diz em voz alta: 'O meu trabalho vale' — e diz o numero. O numero real. Nao o desconto. O numero que sentirias se acreditasses em ti sem condicoes. Diz e observa. Observa o corpo. Onde trava? Onde a voz encolhe? Onde aparece o calor, ou a vergonha, ou a vontade de rir para desvalorizar? Nao corrijas nada. So observa. Repete no dia seguinte. E no outro. Cada dia que dizes o teu valor em voz alta, o corpo assusta-se menos. E o dia em que a voz sair inteira — sem tremer, sem pedir desculpa — nesse dia algo muda. Nao la fora. Ca dentro.",
          },
          {
            timestamp: "5:00 - 5:30",
            section: "fecho",
            visual: "Territorio dissolve-se no ceu. Frase final em texto creme. Fade para escuro. Logo Sete Veus. Silencio.",
            narration: "A voz treme onde o merecimento hesita. Se isto te tocou, inscreve-te. A Escola dos Veus esta a chegar — e o primeiro curso e sobre a tua relacao com dinheiro.",
          },
        ],
      },
      {
        number: 6,
        title: "A conversa que ensaias no chuveiro ha meses",
        courseOrigin: "voz-de-dentro",
        territory: "Sala do Eco",
        week: 2,
        day: "sabado",
        gancho:
          "Ha uma conversa que vive em ti. Ensaias no chuveiro. Reescreves as 3 da manha. Mas nunca dizes. A quem e? E porque e que o silencio te parece mais seguro do que a verdade?",
        fraseFinal:
          "O silencio nao protege. Corroi. E o corpo sabe — mesmo que tu finjas que nao.",
        description:
          "Toca no tema da voz interior e do silencio — forte para engagement ao fim de semana.",
        status: "script_ready",
        script: [
          {
            timestamp: "0:00 - 0:15",
            section: "gancho",
            visual: "Ceu azul-marinho. Camara desce para a Sala do Eco. Paredes de violeta escuro. Silhueta terracota de costas, a olhar para uma parede onde ecos de luz dourada pulsam suavemente — palavras que quase se ouvem.",
            narration: "Ha uma conversa que vive em ti. Ensaias no chuveiro. Reescreves as 3 da manha. Mas nunca dizes. A quem e? E porque e que o silencio te parece mais seguro do que a verdade?",
          },
          {
            timestamp: "0:15 - 1:30",
            section: "situacao",
            visual: "Silhueta sentada no centro da Sala do Eco. As paredes reflectem fragmentos de frases em creme — todas incompletas, todas meio apagadas. A silhueta tem as maos fechadas sobre os joelhos.",
            narration: "Tu sabes exactamente qual e a conversa. Sabes a quem e. Sabes o que dirias se tivesses coragem. Ja a ensaiaste tantas vezes que conheces cada palavra, cada pausa, cada resposta possivel. No chuveiro. No carro. Antes de adormecer. E ha versoes. A versao calma. A versao onde explodes. A versao onde choras. A versao onde finalmente dizes tudo o que engoliste. Mas nenhuma dessas versoes sai. Porque entre o ensaio e a boca ha um muro. E esse muro tem um nome: e se estrago tudo? E se depois nao ha volta atras? E se me rejeitam? E se confirmo aquilo que tenho medo de saber — que esta pessoa nao me ama o suficiente para ouvir a minha verdade?",
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
