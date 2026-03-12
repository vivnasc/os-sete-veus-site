/**
 * Conteúdo áudio para marketing — Os Sete Espelhos
 * Gerado via /admin/voz
 *
 * Tom: Da Confrontação ao Convite (GUIA VOZ VIVIANNE)
 * — Acompanhar, não diagnosticar
 * — Terminar com fissura/porta aberta, nunca no peso
 * — Sensorial, não clínico
 * — "Há mais para ti" / "Talvez" / "E se..." / "Reconheces?"
 */

// ── Teasers de Espelho (~30s, para anúncios Instagram/TikTok) ────────────
// Estrutura: cena reconhecível → o que está por trás → fissura/porta aberta

export type TeaserEspelho = {
  veu: number;
  espelho: string;
  ficheiro: string;
  texto: string;
};

export const TEASERS_ESPELHOS: TeaserEspelho[] = [
  {
    veu: 1,
    espelho: "Ilusão",
    ficheiro: "teaser-espelho-1-ilusao.mp3",
    texto: "Há manhãs em que fazes tudo certo — o café, as mensagens, o sorriso. E mesmo assim há qualquer coisa que não encaixa. Como se estivesses a viver uma versão de ti que alguém escreveu antes de teres tido voto na matéria. O Espelho da Ilusão é para esse momento. Não para te dizer o que está errado. Para te perguntar: e se houvesse mais para ti?",
  },
  {
    veu: 2,
    espelho: "Medo",
    ficheiro: "teaser-espelho-2-medo.mp3",
    texto: "O Rui sabia o que queria dizer. Mas antes de falar, contava. Pesava. Escolhia as palavras que não ocupassem demasiado espaço. Reconheces esse peso? O medo é humano. Viver uma vida inteira organizada à volta dele — é outra coisa. E essa outra coisa pode mudar. Talvez já estejas a começar.",
  },
  {
    veu: 3,
    espelho: "Culpa",
    ficheiro: "teaser-espelho-3-culpa.mp3",
    texto: "O Filipe entregava-se sem reservas. E chamava a isso amor. Até que um dia olhou para si e não encontrou nada que fosse apenas seu. O corpo lembra esse momento — quando o amor próprio cedeu tão devagar que não deste conta. O Espelho da Culpa não te pede que pares de amar. Pede-te que te incluas.",
  },
  {
    veu: 4,
    espelho: "Identidade",
    ficheiro: "teaser-espelho-4-identidade.mp3",
    texto: "Há uma versão de ti que é eficiente, disponível, que sabe o que os outros precisam antes de eles saberem. E depois, quando a porta fecha — quem fica? O Vítor viveu anos sem saber responder a isso. O Espelho da Identidade senta-se com essa pergunta. Devagar. Sem pressa. Há mais para ti do outro lado dela.",
  },
  {
    veu: 5,
    espelho: "Controlo",
    ficheiro: "teaser-espelho-5-controlo.mp3",
    texto: "A Isabel organizava tudo porque amava tudo. Antecipava, protegia, segurava com força o que era precioso. E foi, sem se aperceber, criando distância em vez de proximidade. O corpo lembra quando o amor começou a apertar. O Espelho do Controlo é para esse momento. Olhamos para ele juntas — com calma.",
  },
  {
    veu: 6,
    espelho: "Desejo",
    ficheiro: "teaser-espelho-6-desejo.mp3",
    texto: "A Lena e a Sofia partilhavam tudo — até que a Lena deixou de partilhar o que mais queria. Por hábito de se tornar mais pequena. O silêncio foi crescendo entre elas. Reconheces esse hábito? O Espelho do Desejo é para o que guardas sem nome. Talvez já seja tempo de lhe dar um.",
  },
  {
    veu: 7,
    espelho: "Separação",
    ficheiro: "teaser-espelho-7-separacao.mp3",
    texto: "A Helena e o Miguel separaram-se. E foi a coisa mais difícil — e a mais honesta — que cada um alguma vez fez. O Espelho da Separação é sobre deixar ir o que já não cabe. Não por desistência. Por amor ao que ainda pode crescer. Talvez haja algo em ti que também está à espera de espaço.",
  },
];

// ── Trailer da Jornada (~60s, para o topo do site ou anúncio maior) ──────

export const TRAILER_JORNADA = {
  ficheiro: "trailer-jornada-completa.mp3",
  texto: "A manhã estava bonita de uma forma que não pedia esforço para ser notada. E mesmo assim ela não conseguia ainda aceitar essa beleza — havia qualquer coisa entre ela e a vida que se oferecia. Reconheces isso? Os Sete Espelhos são sete histórias. Sete personagens que vivem o que muitas de nós sentimos mas raramente dizemos em voz alta. Não são diagnósticos. São companhia. A ilusão de quem fomos ensinadas a ser. O medo que nos manteve no sítio mais seguro. A culpa que chamámos de amor. A identidade que construímos para sobreviver. O controlo que nos isolou de quem mais amávamos. O desejo que ficou guardado sem nome. E a separação — de pessoas, de versões, de vidas — que fez espaço para algo novo. Não precisas de estar pronta. Precisas apenas de estar disposta a olhar. E se começasses por aqui?",
};

// ── Stories (1 frase de convite por espelho, 10-15s) ─────────────────────
// Tom: convite, não confronto — deixar espaço, não fechar

export type StoryClip = {
  veu: number;
  espelho: string;
  ficheiro: string;
  texto: string;
};

export const STORIES_ESPELHOS: StoryClip[] = [
  {
    veu: 1,
    espelho: "Ilusão",
    ficheiro: "story-espelho-1-ilusao.mp3",
    texto: "E se a versão de ti que conheces não fosse a única?",
  },
  {
    veu: 2,
    espelho: "Medo",
    ficheiro: "story-espelho-2-medo.mp3",
    texto: "O medo é humano. Há mais para ti do outro lado dele.",
  },
  {
    veu: 3,
    espelho: "Culpa",
    ficheiro: "story-espelho-3-culpa.mp3",
    texto: "Há uma diferença entre amar e desaparecer no amor. Reconheces isso?",
  },
  {
    veu: 4,
    espelho: "Identidade",
    ficheiro: "story-espelho-4-identidade.mp3",
    texto: "Há mais para ti do que os papéis que aprendeste a desempenhar.",
  },
  {
    veu: 5,
    espelho: "Controlo",
    ficheiro: "story-espelho-5-controlo.mp3",
    texto: "O corpo lembra quando o amor começou a apertar. Talvez seja tempo de abrir a mão.",
  },
  {
    veu: 6,
    espelho: "Desejo",
    ficheiro: "story-espelho-6-desejo.mp3",
    texto: "Há algo que queres e ainda não disseste. Começa por aqui.",
  },
  {
    veu: 7,
    espelho: "Separação",
    ficheiro: "story-espelho-7-separacao.mp3",
    texto: "Talvez separar não seja perder. Talvez seja o início de algo que ainda não tem nome.",
  },
];

// ── Teasers dos Nós (após completar o Espelho — porta que se abre) ────────
// Tom: misterioso mas com luz — sempre terminar com possibilidade

export type TeaserNo = {
  veu: number;
  no: string;
  personagens: string;
  ficheiro: string;
  texto: string;
};

export const TEASERS_NOS: TeaserNo[] = [
  {
    veu: 1,
    no: "Herança",
    personagens: "Sara + Helena",
    ficheiro: "teaser-no-1-heranca.mp3",
    texto: "A Sara viu o espelho. Mas a Helena — a mãe — sempre soube. Guardou durante anos o que tinha para dizer, à espera do momento em que a filha estivesse pronta para ouvir. O Nó da Herança é essa conversa. A que ficou guardada. Talvez ainda seja possível tê-la.",
  },
  {
    veu: 2,
    no: "Silêncio",
    personagens: "Rui + Ana",
    ficheiro: "teaser-no-2-silencio.mp3",
    texto: "O Rui e a Ana aprenderam a viver lado a lado sem se encontrar de frente. É um hábito que o corpo aprende e a mente justifica. O Nó do Silêncio é sobre o que fica por dizer entre duas pessoas que se importam. E sobre se ainda há tempo para o dizer. Talvez haja.",
  },
  {
    veu: 3,
    no: "Sacrifício",
    personagens: "Filipe + Luísa",
    ficheiro: "teaser-no-3-sacrificio.mp3",
    texto: "O Filipe encontrou-se. A Luísa ainda não sabe o que fazer com isso. O Nó do Sacrifício é sobre dois lados de uma entrega que cresceu entre eles sem que nenhum o tivesse pedido. Há algo ali que pode recomeçar — de outra forma.",
  },
  {
    veu: 4,
    no: "Vergonha",
    personagens: "Vítor + Mariana",
    ficheiro: "teaser-no-4-vergonha.mp3",
    texto: "O Vítor tirou a máscara. E encontrou a Mariana — que nunca tinha posto nenhuma. O Nó da Vergonha é sobre ver e ser visto sem filtro. É raro. É desconfortável. E às vezes é exactamente o que o corpo precisava sem saber.",
  },
  {
    veu: 5,
    no: "Solidão",
    personagens: "Isabel + Pedro",
    ficheiro: "teaser-no-5-solidao.mp3",
    texto: "A Isabel largou o controlo. O Pedro ainda carrega os anos em que ela o apertou sem o saber. O Nó da Solidão é sobre o que sobra entre duas pessoas quando o padrão que as definia muda. E sobre o que pode crescer nesse espaço novo.",
  },
  {
    veu: 6,
    no: "Vazio",
    personagens: "Lena + Sofia",
    ficheiro: "teaser-no-6-vazio.mp3",
    texto: "A Lena disse o que desejava. A Sofia ouviu de uma forma que a Lena não esperava. O Nó do Vazio é sobre o que uma amizade atravessa quando a honestidade finalmente chega. E sobre o que pode crescer nesse espaço — se ambas deixarem.",
  },
  {
    veu: 7,
    no: "Pertença",
    personagens: "Helena T. + Miguel C.",
    ficheiro: "teaser-no-7-pertenca.mp3",
    texto: "A Helena e o Miguel separaram-se. E foi nessa separação que cada um percebeu, pela primeira vez, o que pertença realmente significa para si. O Nó da Pertença é a última pergunta. Fica aberta. Há mais para ti do outro lado dela.",
  },
];

// ── Chamadas à Acção (3 variações — convite, não imperativa) ────────────

export type ChamadaAccao = {
  id: string;
  nome: string;
  ficheiro: string;
  texto: string;
};

export const CHAMADAS_ACCAO: ChamadaAccao[] = [
  {
    id: "cta-1",
    nome: "Começa por aqui",
    ficheiro: "cta-comeca-por-aqui.mp3",
    texto: "O primeiro espelho está à tua espera. Ao teu ritmo. Começa por aqui.",
  },
  {
    id: "cta-2",
    nome: "Há mais para ti",
    ficheiro: "cta-ha-mais-para-ti.mp3",
    texto: "Sete espelhos. Sete histórias. Uma jornada ao teu ritmo. Há mais para ti.",
  },
  {
    id: "cta-3",
    nome: "E se começasses",
    ficheiro: "cta-e-se-comecasses.mp3",
    texto: "Não precisas de estar pronta. Precisas apenas de estar disposta. E se começasses por aqui?",
  },
];
