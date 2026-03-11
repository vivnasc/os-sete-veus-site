/**
 * Conteúdo áudio para marketing — Os Sete Espelhos
 * Gerado via /admin/voz
 */

// ── Teasers de Espelho (~30s, para anúncios Instagram/TikTok) ────────────

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
    texto: "Há uma versão de ti que construíste para sobreviver. Sorri nas horas certas. Diz que está bem quando não está. Sabe exactamente o que os outros precisam de ouvir. E algures, muito lá dentro, existe outra — que ainda não teve espaço para falar. O Espelho da Ilusão é para ela. Para a que ficou à espera.",
  },
  {
    veu: 2,
    espelho: "Medo",
    ficheiro: "teaser-espelho-2-medo.mp3",
    texto: "O medo não grita. Sussurra. Diz-te que não és suficiente, que é melhor não arriscar, que se ficares quieta ninguém te vê falhar. O Rui viveu assim durante anos. Talvez tu também. O Espelho do Medo não promete coragem. Promete algo mais raro — clareza sobre o que o medo tem estado a proteger.",
  },
  {
    veu: 3,
    espelho: "Culpa",
    ficheiro: "teaser-espelho-3-culpa.mp3",
    texto: "Já te aconteceu sacrificares algo teu e chamares a isso amor? O Filipe fazia-o todos os dias. Até que um dia olhou e já não sabia onde ele acabava e onde o sacrifício começava. A culpa tem essa magia — transforma-se em virtude tão depressa que nunca a apanhamos em flagrante. O Espelho da Culpa apanha.",
  },
  {
    veu: 4,
    espelho: "Identidade",
    ficheiro: "teaser-espelho-4-identidade.mp3",
    texto: "Quem és tu quando não tens nenhum papel a desempenhar? Não mãe, não filha, não profissional, não parceira. Apenas tu, sozinha, sem plateia. O Vítor nunca soube responder a essa pergunta. Usou máscaras tão antigas que se tornaram rosto. O Espelho da Identidade é sobre tirar a máscara — com cuidado, com tempo, sem pressa.",
  },
  {
    veu: 5,
    espelho: "Controlo",
    ficheiro: "teaser-espelho-5-controlo.mp3",
    texto: "A Isabel amava de forma absoluta. Organizava, protegia, antecipava tudo. E foi afastando, sem perceber, as mesmas pessoas que tentava segurar. O controlo nasce do amor — e pode destruí-lo. O Espelho do Controlo é para quem ama demais e aperta demasiado. Para quem sabe que há outra forma mas ainda não sabe qual é.",
  },
  {
    veu: 6,
    espelho: "Desejo",
    ficheiro: "teaser-espelho-6-desejo.mp3",
    texto: "Há coisas que queres e nunca disseste a ninguém. Coisas que diminuíste antes que alguém o fizesse por ti. A Lena e a Sofia eram amigas de anos — até que o desejo não dito de uma começou a envenenar o que havia entre elas. O Espelho do Desejo é sobre o que guardas em silêncio. E sobre o que acontece quando esse silêncio parte.",
  },
  {
    veu: 7,
    espelho: "Separação",
    ficheiro: "teaser-espelho-7-separacao.mp3",
    texto: "Às vezes a coisa mais corajosa que podes fazer é deixar ir. Uma pessoa. Um lugar. Uma versão de ti que já não cabe. A Helena e o Miguel separaram-se — e foi nessa separação que cada um encontrou, pela primeira vez, quem realmente era. O Espelho da Separação é o último. E talvez o mais libertador de todos.",
  },
];

// ── Trailer da Jornada (~60s, para o topo do site ou anúncio maior) ──────

export const TRAILER_JORNADA = {
  ficheiro: "trailer-jornada-completa.mp3",
  texto: "Existe uma versão de ti que ainda não conheceste. Não porque não esteja lá — mas porque nunca houve espaço suficientemente silencioso para ela aparecer. Os Sete Espelhos são sete histórias. Sete personagens que vivem o que muitas de nós sentimos mas raramente dizemos. A ilusão de quem pensávamos ser. O medo que nos manteve quietas. A culpa que chamámos de amor. A identidade que construímos para sobreviver. O controlo que usámos para não sentir. O desejo que sufocámos antes que alguém o visse. E a separação — de pessoas, de versões, de vidas — que nos devolveu a nós mesmas. Não é um livro. É um espelho. E mostra apenas o que já está lá. Começa com o primeiro. O resto acontece naturalmente.",
};

// ── Stories (1 frase de impacto por espelho, 10-15s) ─────────────────────

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
    texto: "Quantos anos levaste a construir uma versão de ti que não escolheste?",
  },
  {
    veu: 2,
    espelho: "Medo",
    ficheiro: "story-espelho-2-medo.mp3",
    texto: "O medo não é o teu inimigo. É o guarda do que mais te importa.",
  },
  {
    veu: 3,
    espelho: "Culpa",
    ficheiro: "story-espelho-3-culpa.mp3",
    texto: "Quando foi a última vez que te entregaste sem perder nada de ti?",
  },
  {
    veu: 4,
    espelho: "Identidade",
    ficheiro: "story-espelho-4-identidade.mp3",
    texto: "A máscara que usas há tanto tempo — ainda sabes a diferença entre ela e o teu rosto?",
  },
  {
    veu: 5,
    espelho: "Controlo",
    ficheiro: "story-espelho-5-controlo.mp3",
    texto: "Controlamos o que tememos perder. E perdemos o que tentamos controlar.",
  },
  {
    veu: 6,
    espelho: "Desejo",
    ficheiro: "story-espelho-6-desejo.mp3",
    texto: "Há algo que queres e ainda não disseste em voz alta. Este espelho é para isso.",
  },
  {
    veu: 7,
    espelho: "Separação",
    ficheiro: "story-espelho-7-separacao.mp3",
    texto: "Separar não é falhar. É por vezes o acto de amor mais honesto que existe.",
  },
];

// ── Teasers dos Nós (misteriosos, para depois de completar o Espelho) ────

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
    texto: "A Sara viu o véu. Mas há um nó que ficou por desatar. A mãe sempre soube. Esperou anos pelo momento em que a filha estivesse pronta para ouvir. O Nó da Herança é o que se passa entre duas mulheres quando o silêncio finalmente parte.",
  },
  {
    veu: 2,
    no: "Silêncio",
    personagens: "Rui + Ana",
    ficheiro: "teaser-no-2-silencio.mp3",
    texto: "O Rui enfrentou o medo. Mas entre ele e a Ana existe um silêncio com anos de idade. O Nó do Silêncio é sobre o que o medo calou — e sobre o que acontece quando dois pessoas decidem, finalmente, falar.",
  },
  {
    veu: 3,
    no: "Sacrifício",
    personagens: "Filipe + Luísa",
    ficheiro: "teaser-no-3-sacrificio.mp3",
    texto: "O Filipe percebeu onde a culpa termina e ele começa. Mas a Luísa ainda não sabe. O Nó do Sacrifício é sobre dois lados de uma entrega que nenhum dos dois pediu — e o que resta quando essa entrega cessa.",
  },
  {
    veu: 4,
    no: "Vergonha",
    personagens: "Vítor + Mariana",
    ficheiro: "teaser-no-4-vergonha.mp3",
    texto: "O Vítor tirou a máscara. E encontrou a Mariana — que nunca tinha posto nenhuma. O Nó da Vergonha é sobre dois estranhos que se vêem com clareza pela primeira vez. E sobre o terror e a beleza disso.",
  },
  {
    veu: 5,
    no: "Solidão",
    personagens: "Isabel + Pedro",
    ficheiro: "teaser-no-5-solidao.mp3",
    texto: "A Isabel largou o controlo. O Pedro ainda sente os anos em que ela o apertou. O Nó da Solidão é sobre o que sobra entre duas pessoas quando o padrão que as definia finalmente para. E sobre se ainda há algo que valha.",
  },
  {
    veu: 6,
    no: "Vazio",
    personagens: "Lena + Sofia",
    ficheiro: "teaser-no-6-vazio.mp3",
    texto: "A Lena disse o que desejava. A Sofia ouviu. O Nó do Vazio é sobre o que uma amizade tem de atravessar quando a honestidade chega tarde demais — e sobre se o que resta ainda pode chamar-se amor.",
  },
  {
    veu: 7,
    no: "Pertença",
    personagens: "Helena T. + Miguel C.",
    ficheiro: "teaser-no-7-pertenca.mp3",
    texto: "A Helena e o Miguel separaram-se. E foi precisamente nessa separação que perceberam o que pertença realmente significa. O Nó da Pertença é o último. Não é um fim — é a pergunta que fica depois de tudo o resto se resolver.",
  },
];

// ── Chamadas à Acção (3 variações para o fim de anúncios) ───────────────

export type ChamadaAccao = {
  id: string;
  nome: string;
  ficheiro: string;
  texto: string;
};

export const CHAMADAS_ACCAO: ChamadaAccao[] = [
  {
    id: "cta-1",
    nome: "Começa hoje",
    ficheiro: "cta-comeca-hoje.mp3",
    texto: "O primeiro espelho está à tua espera. Começa hoje.",
  },
  {
    id: "cta-2",
    nome: "Jornada completa",
    ficheiro: "cta-jornada-completa.mp3",
    texto: "Sete espelhos. Sete verdades. Uma jornada que só tu podes fazer. Entra em Os Sete Véus.",
  },
  {
    id: "cta-3",
    nome: "Convite gentil",
    ficheiro: "cta-convite-gentil.mp3",
    texto: "Não precisas de estar pronta. Precisas apenas de estar disposta a olhar. O espelho faz o resto.",
  },
];
