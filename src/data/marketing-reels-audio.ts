/**
 * Narração de voz para Reels e Carrosséis de marketing — Os Sete Espelhos
 *
 * Tom: Voz da Vivianne — calma, sensorial, nunca clínica
 * Todos os textos são versões em voz corrida (sem indicações de cena)
 * prontos para gerar via ElevenLabs e usar como áudio no CapCut
 */

// ── Reels (narração corrida, 25-35s) ─────────────────────────────────────────

export type ReelVoz = {
  id: string;
  nome: string;
  ficheiro: string;
  texto: string;
};

export const REELS_VOZ: ReelVoz[] = [
  {
    id: "reel-ilusao-automatico",
    nome: "Construíste a tua vida inteira...",
    ficheiro: "reel-ilusao-automatico.mp3",
    texto:
      "Construíste a tua vida inteira... sem nunca ter perguntado o que querias. Quando foi que escolhi tomar café em vez de chá? Uma pergunta absurda. Mas foi a pergunta que mudou tudo. O Espelho da Ilusão é a história de uma mulher que, pela primeira vez, pergunta. Não é um livro. É uma experiência. Há mais para ti. Teste gratuito em seteveus.space.",
  },
  {
    id: "reel-3-sinais-automatico",
    nome: "3 sinais de que vives no automático",
    ficheiro: "reel-3-sinais-automatico.mp3",
    texto:
      "Três sinais de que vives no automático. Um: respondes tanto faz a perguntas importantes. Dois: não te lembras da última vez que escolheste uma rua diferente. Três: a tua primeira reacção nunca é o que verdadeiramente pensas. Se te reconheces... não és a única. Escrevi uma história sobre isso. O Espelho da Ilusão. Teste gratuito em seteveus.space.",
  },
  {
    id: "reel-no-heranca-mae-filha",
    nome: "O Nó da Herança — mãe e filha",
    ficheiro: "reel-no-heranca-mae-filha.mp3",
    texto:
      "O que acontece quando uma mãe e uma filha dizem o que sempre calaram? Sara viu o véu. Mas há um nó que ficou por desatar. O Nó da Herança é a história de Sara e Helena — mãe e filha — e o silêncio herdado entre elas. Não é um upsell. É uma continuação emocional. Só se desbloqueia depois de completares o Espelho da Ilusão. Começa pelo Espelho. O Nó espera por ti.",
  },
  {
    id: "reel-livro-fisico-codigo",
    nome: "Tens o livro físico?",
    ficheiro: "reel-livro-fisico-codigo.mp3",
    texto:
      "Tens o livro físico Os 7 Véus do Despertar? Há algo que ainda não sabes sobre ele. O livro abre portas que ainda não conheces. Leitura integrada. Diário pessoal. Comunidade anónima. E se já compraste o livro, o acesso é gratuito. Pede o teu código em menos de um minuto em seteveus.space.",
  },
  {
    id: "reel-medo-voz-interior",
    nome: "Há uma voz que diz não antes de pensares",
    ficheiro: "reel-medo-voz-interior.mp3",
    texto:
      "Há uma voz que diz não... antes de pensares. Não é covardia. É um mecanismo antigo — treinado ao longo de anos de cautela disfarçada de bom senso. E se falhar? E se me arrepender? Reconheces estas vozes? O Espelho do Medo é uma história sobre o Rui — e sobre o que o medo calou durante anos. Março 2026. seteveus.space.",
  },
  {
    id: "reel-nao-livro-espelho",
    nome: "Isto não é um livro. É um espelho.",
    ficheiro: "reel-nao-livro-espelho.mp3",
    texto:
      "Isto não é um livro. É um espelho. Lês. Respiras. Escreves. Sentes. Sete histórias. Sete véus. Cada um esconde algo que já sabes mas nunca disseste. Três minutos. Sete perguntas. Qual Espelho combina contigo? Teste gratuito em seteveus.space.",
  },
  {
    id: "reel-diario-escrita",
    nome: "Não escreveste nada sobre ti em anos",
    ficheiro: "reel-diario-escrita.mp3",
    texto:
      "Não escreveste nada sobre ti em anos. E isso pesa. Na experiência digital, cada capítulo tem um espaço para escreveres o que sentiste. Só tu lês. Não vai a lado nenhum. Só fica. E se quiseres partilhar algo, há uma comunidade anónima. Sem nomes. Tudo desaparece em trinta dias. seteveus.space.",
  },
  {
    id: "reel-reconhecimento-leste-fim",
    nome: "Se leste isto até ao fim...",
    ficheiro: "reel-reconhecimento-leste-fim.mp3",
    texto:
      "Se leste isto até ao fim... este livro é para ti. Via, mas não sentia. Registava, mas não participava. Como quem assiste a um espectáculo por trás de uma janela fechada. Reconheces-te? Então não és a única. O Espelho da Ilusão. Uma história sobre despertar do automático. Disponível agora em seteveus.space.",
  },
  {
    id: "reel-livro-estante-extensao",
    nome: "Tens este livro na estante?",
    ficheiro: "reel-livro-estante-extensao.mp3",
    texto:
      "Tens este livro na estante? Há algo que não sabes sobre ele. O livro físico tem uma extensão digital. Não é uma cópia — é uma experiência diferente. Diário reflexivo. Comunidade anónima. Respiração guiada. E se já compraste o livro, o acesso é gratuito. Pede o teu código em dois minutos em seteveus.space.",
  },
  {
    id: "reel-ler-sem-escrever",
    nome: "Ler sem escrever é como olhar para um espelho de olhos fechados",
    ficheiro: "reel-ler-sem-escrever.mp3",
    texto:
      "Ler sem escrever é como olhar para um espelho de olhos fechados. Na experiência digital, cada capítulo tem um espaço para escreveres o que sentiste. Só tu lês. Só tu decides o que guardas. E na comunidade, descobres que não estás sozinha. Acesso digital gratuito para quem tem o livro físico. seteveus.space.",
  },
  {
    id: "reel-pergunta-que-ninguem-faz",
    nome: "Há uma pergunta que ninguém te faz",
    ficheiro: "reel-pergunta-que-ninguem-faz.mp3",
    texto:
      "Há uma pergunta que ninguém te faz. E que talvez precises de te fazer a ti mesma. Quando foi a última vez que fizeste algo só porque quiseste? Sem explicar. Sem pedir licença. Só porque quiseste. Há mais para ti. Descobre em seteveus.space.",
  },
];

// ── Carrosséis (narração corrida dos slides, ~45-60s) ────────────────────────

export type CarrosselVoz = {
  id: string;
  /** ID do carrossel em professionalCarousels para fazer match */
  carouselId: string;
  nome: string;
  ficheiro: string;
  texto: string;
};

export const CARROSSEIS_VOZ: CarrosselVoz[] = [
  {
    id: "carousel-voz-cansaco-automatico",
    carouselId: "carousel-cansaco-automatico",
    nome: "Há um tipo de cansaço que não é sono",
    ficheiro: "carousel-voz-cansaco-automatico.mp3",
    texto:
      "Há um tipo de cansaço que não é sono. Acordas. Fazes o que tens de fazer. As coisas funcionam. És competente. Eficiente. E sentes-te a assistir. Não é depressão. Não é ingratidão. É algo mais subtil: a sensação de que a vida é quase tua. Como se um dia, sem aviso, tivesses parado de escolher. E continuado a funcionar. Reconheces-te? Há uma história sobre isto. E sobre a mulher que, numa manhã comum, decidiu perguntar. O Espelho da Ilusão — em seteveus.space.",
  },
  {
    id: "carousel-voz-sara-pergunta",
    carouselId: "carousel-sara-pergunta",
    nome: "Sara fez uma pergunta absurda",
    ficheiro: "carousel-voz-sara-pergunta.mp3",
    texto:
      "Quando foi que escolhi tomar café em vez de chá? Era uma pergunta sem importância. Sara sabia isso. E não conseguia deixar de a fazer. Porque depois de café versus chá, vinha a roupa que usava. O trabalho que tinha. A vida que levava. E se tudo tinha sido assim — recebido, não escolhido? Isto não é uma crise. É um acordar. Devagar. Ao ritmo de quem primeiro tem de notar. A história de Sara é um espelho. O que ela vê, talvez vejas. O que ela pergunta, talvez precises de perguntar. O Espelho da Ilusão — seteveus.space.",
  },
  {
    id: "carousel-voz-o-que-sao-espelhos",
    carouselId: "carousel-o-que-sao-espelhos",
    nome: "O que são os Espelhos",
    ficheiro: "carousel-voz-o-que-sao-espelhos.mp3",
    texto:
      "Às vezes precisas de ver a tua vida noutros olhos para reconhecer os teus. Os Espelhos são histórias. Ficção. Mas a personagem vive o que tu calavas. Não te dizem o que fazer. Não te ensinam nada. Deixam-te reconhecer o que já sabes. São sete histórias. Cada uma revela um véu: Ilusão, Medo, Culpa, Identidade, Controlo, Desejo, Separação. Lês ao teu ritmo. Capítulo a capítulo. Com um diário pessoal. E uma comunidade que desaparece. Começa pelo Espelho da Ilusão. seteveus.space.",
  },
  {
    id: "carousel-voz-no-heranca-historia",
    carouselId: "carousel-no-depois-do-espelho",
    nome: "O Nó — a história que só existe depois",
    ficheiro: "carousel-voz-no-heranca-historia.mp3",
    texto:
      "Há uma segunda história. Mas só existe depois da primeira. Quando Sara completou o Espelho da Ilusão, um texto novo abriu. A história de Helena. A mãe. Helena sempre soube. Viu os mesmos sinais que Sara não via. Calou os mesmos medos. Esperou anos. Agora que Sara acordou, Helena tem algo para lhe dizer. O Nó não é uma continuação. É o que estava a acontecer do outro lado. Só se vê depois de ver o espelho. O Nó da Herança. Disponível para quem completou o Espelho da Ilusão. seteveus.space.",
  },
  {
    id: "carousel-voz-5-citacoes-ilusao",
    carouselId: "carousel-5-citacoes-ilusao",
    nome: "5 frases do Espelho da Ilusão",
    ficheiro: "carousel-voz-5-citacoes-ilusao.mp3",
    texto:
      "Cinco frases que mudam a forma como te vês. Quando foi que escolhi tomar café em vez de chá? Via, mas não sentia. Registava, mas não participava. Como quem assiste a um espectáculo por trás de uma janela fechada. Não era que não tivesse opinião. Era que a sua primeira reacção nunca era o que verdadeiramente pensava. Perguntar, mesmo tarde, é o primeiro gesto de se escolher. O Espelho da Ilusão — seteveus.space.",
  },
  {
    id: "carousel-voz-ecos-efemeros",
    carouselId: "carousel-ecos-efemeros",
    nome: "A única comunidade onde tudo desaparece",
    ficheiro: "carousel-voz-ecos-efemeros.mp3",
    texto:
      "O que escreveres aqui desaparece em trinta dias. Não há histórico. Não há perfil. Ninguém sabe quem és. E isso muda o que dizes. Há coisas que só se consegue dizer quando não ficam para sempre. Não há likes. Há reconhecimentos. Um toque silencioso que diz: eu também. E há sussurros. Mensagens de uma só via. Cem caracteres. Expiram em sete dias. É o único sítio onde a honestidade não tem consequências permanentes. Comunidade Ecos — incluída em qualquer acesso. seteveus.space.",
  },
  {
    id: "carousel-voz-antes-depois-ver",
    carouselId: "carousel-antes-depois-ver",
    nome: "Não muda o que fizeste — muda a forma como te vês",
    ficheiro: "carousel-voz-antes-depois-ver.mp3",
    texto:
      "Não muda o que fizeste. Muda a forma como te vês a fazê-lo. Antes: sabia exactamente quem era. Depois: sei cada vez menos. Mas o que sei é meu. Não herdado. Antes: chorava só quando ninguém via. Depois: deixei as lágrimas virem à mesa. Alguém perguntou. Disse que não estava bem. O mundo não acabou. Antes: dizia estou bem antes de verificar o que sentia. Depois: faço uma pausa. Ainda pequena. Mas minha. Não é uma transformação. É um desfazer lento e suave do que não era teu. O Espelho da Ilusão — ao teu ritmo. seteveus.space.",
  },
  {
    id: "carousel-voz-7-espelhos-resumo",
    carouselId: "carousel-7-espelhos-resumo",
    nome: "Os 7 Espelhos — um por um",
    ficheiro: "carousel-voz-7-espelhos-resumo.mp3",
    texto:
      "Sete espelhos. Sete véus. Sete histórias que te devolvem ao que já sabes. O Espelho da Ilusão — a vida que nunca escolheste. O Espelho do Medo — a voz que diz não antes de pensares. O Espelho da Culpa — o amor que se esqueceu de te incluir. O Espelho da Identidade — a máscara que aprendeste a usar. O Espelho do Controlo — o amor que, sem querer, apertou. O Espelho do Desejo — o que guardas sem nome. O Espelho da Separação — o que deixar ir para crescer. Não são diagnósticos. São companhia. Começa pelo que ressoa. Ao teu ritmo. seteveus.space.",
  },
];
