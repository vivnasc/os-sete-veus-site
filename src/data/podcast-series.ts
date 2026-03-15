/**
 * Série de Podcasts: "Os Sete Véus — Conversas com o Espelho"
 *
 * 14 episódios narrados pela voz da Vivianne (ElevenLabs)
 * - 7 públicos: "O Véu de..." (introdutórios, ~8 min, ~7200 chars cada)
 * - 7 exclusivos: "Por Trás do Véu" (reflexão profunda, ~5 min, ~4500 chars cada)
 *
 * Budget: 100.000 caracteres ElevenLabs
 * Intro + Outro reutilizável: ~1500 chars
 * Episódios públicos: ~50.400 chars
 * Episódios exclusivos: ~31.500 chars
 * Total estimado: ~83.400 chars (margem: ~16.600)
 *
 * Tom: Guia Voz Vivianne
 * — Presença compassiva, não dissecação
 * — Cena reconhecível + convite + porta aberta
 * — Sensorial, não clínico
 */

const AUDIO_BASE = "https://tdytdamtfillqyklgrmb.supabase.co/storage/v1/object/public/audios";

function audioUrl(filename: string) {
  return `${AUDIO_BASE}/${encodeURIComponent(filename)}`;
}

export type PodcastEpisode = {
  id: string;
  number: number;
  veu: number;
  title: string;
  subtitle: string;
  description: string;
  script: string;
  type: "public" | "exclusive";
  durationEstimate: string;
  charCount: number;
  audioUrl: string;
  color: string;
};

export type PodcastMeta = {
  title: string;
  subtitle: string;
  description: string;
  author: string;
  introScript: string;
  outroScript: string;
  introAudioUrl: string;
  outroAudioUrl: string;
};

export const PODCAST_META: PodcastMeta = {
  title: "Os Sete Véus — Conversas com o Espelho",
  subtitle: "Uma série sobre os véus que vestimos sem saber",
  description:
    "Sete véus. Sete formas de te esconderes de ti mesma. Nesta série, a Vivianne dos Santos convida-te a olhar para cada um deles — devagar, sem pressa, ao ritmo de quem começa a perguntar. Cada episódio é um espelho. E cada espelho é um convite.",
  author: "Vivianne dos Santos",
  introScript: `Olá. Eu sou a Vivianne. E este é o podcast Os Sete Véus — Conversas com o Espelho. Aqui falamos sobre as camadas invisíveis que vestimos sem saber. Devagar. Sem pressa. Ao ritmo de quem começa a perguntar.`,
  outroScript: `Obrigada por ficares até aqui. Se alguma coisa ressoou, não a largues. Guarda-a. Leva-a contigo. E se quiseres ir mais fundo, os Espelhos estão à tua espera em osseteveusdespertar.com. Até ao próximo véu.`,
  introAudioUrl: audioUrl("podcast-intro.mp3"),
  outroAudioUrl: audioUrl("podcast-outro.mp3"),
};

// ─────────────────────────────────────────────
// EPISÓDIOS PÚBLICOS: "O Véu de..."
// Objectivo: atrair, criar reconhecimento, gerar curiosidade
// ─────────────────────────────────────────────

const EP01_PUBLIC = `Há uma cena que quase toda a gente conhece. Acordas de manhã. Levantas-te. Fazes o café. Vestes-te. Sais de casa. E tudo funciona. Os prazos cumprem-se. Os parabéns vêm nas alturas certas. A vida faz sentido — para toda a gente.

Menos para ti.

E não é que algo esteja partido. Não é uma crise. É mais subtil do que isso. É como usar um casaco que te serve perfeitamente mas que nunca escolheste. Serve, sim. Mas não é teu.

A Sara — a personagem do primeiro Espelho — acordou três minutos antes do despertador, como fazia sempre. E nessa manhã, uma pergunta absurda mudou tudo: quando foi que eu escolhi tomar café em vez de chá?

Parece ridículo, não é? Mas pensa nisso um momento. Quantas das tuas escolhas diárias são realmente tuas? E quantas são hábitos herdados, expectativas absorvidas, caminhos que alguém traçou antes de tu chegares?

O véu da ilusão é isto. Não é mentira. Não é engano. É algo mais suave e por isso mais difícil de ver. É a vida que construíste sem perceber que estavas a construir a vida de outra pessoa. Ou melhor — a vida que achavam que devias ter.

E funciona. Esse é o problema. Funciona tão bem que só percebes quando algo muda. Quando o corpo dá um sinal. Quando o cansaço não passa com férias. Quando o êxito chega e tu não sentes nada.

Eu sei do que falo. Porque eu também vivi isto. Durante anos, a minha vida fazia sentido no papel. Economista. Organizada. Capaz. Mas por dentro, havia uma inquietação que não tinha nome. Uma sensação de que eu estava a viver a vida de alguém — só não sabia de quem.

E quando comecei a perguntar — não grandes perguntas filosóficas, mas perguntas pequenas, como a do café — tudo começou a mexer. Devagar. Sem drama. Mas com uma honestidade que me assustou.

O primeiro véu não cai com força. Cai com uma pergunta. Uma pergunta que parece simples demais para mudar alguma coisa. Mas muda.

Então, deixo-te com isto: há alguma coisa na tua vida que funciona perfeitamente mas que nunca escolheste? Não tens de responder agora. Aliás, não tens de responder de todo. Só nota. Nota e deixa ficar.

Porque é assim que começa. Não com uma explosão. Com uma nota. Um reconhecimento quieto. Um "espera — isto sou eu?"

E se essa pergunta te tocar, o Espelho da Ilusão está à tua espera. Sete capítulos. Sem pressa. Ao teu ritmo. Porque isto não é uma corrida. É um regresso.`;

const EP02_PUBLIC = `Há uma palavra que usamos para nos proteger e que, com o tempo, nos aprisiona. Essa palavra é "cuidado".

Cuidado com o que dizes. Cuidado com o que sentes. Cuidado com o que queres. Parece sabedoria, não é? Parece bom senso. Mas e se for outra coisa?

O Rui — a personagem do segundo Espelho — olhava para o telefone antes de falar. Não para organizar as palavras. Para ter a certeza de que eram as certas. As que não incomodavam. As que não revelavam demais. As que mantinham tudo no lugar.

E tu? Já mediste as palavras antes de as dizer? Já sentiste o estômago apertar antes de fazeres algo que querias fazer? Já evitaste uma conversa porque o resultado podia ser imprevisível?

O medo não aparece sempre como pânico. Aliás, quase nunca aparece assim. O medo mais comum é discreto. É o adiamento crónico. É a indecisão que parece ponderação. É a prudência que, vista de perto, é paralisia bonita.

Há medos que não reconhecemos como medos. O medo de incomodar. O medo de parecer demasiado. O medo de querer algo e não conseguir. O medo de querer algo e conseguir — e depois não saber o que fazer com isso.

Eu cresci numa cultura onde a cautela era virtude. Onde não se fala antes de pensar muito. Onde sentir demais é sinal de fraqueza. E durante anos, confundi medo com maturidade. Confundi silêncio com respeito. Confundi ficar quieta com estar em paz.

Mas o corpo sabe. Sempre sabe. E quando o corpo começa a pedir atenção — com tensão, com insónia, com um nozinho no peito que não passa — é porque algo precisa de ser ouvido.

Neste episódio não te peço que sejas corajosa. Não te peço que saltes. Peço-te apenas que notes. Nota onde o medo mora no teu dia. Nota o que evitas. Nota o que adias. E em vez de te julgares por isso, olha com curiosidade.

Porque o medo não é o inimigo. É um mensageiro. E quando aprendes a ouvi-lo — não a obedecê-lo, mas a ouvi-lo — ele deixa de precisar de gritar.

O Espelho do Medo é sobre isso. Sobre iluminar o que está escondido no óbvio. Sem bisturi. Sem pressa. Devagar.`;

const EP03_PUBLIC = `Queres ouvir algo que talvez ninguém te tenha dito? Tu não és egoísta por quereres mais. Não és ingrata. Não és demasiado.

Mas eu sei que há uma voz dentro de ti que diz o contrário. Uma voz que aparece cada vez que pensas em ti. Cada vez que fazes algo só para ti. Cada vez que dizes não.

Essa voz tem um nome. Chama-se culpa.

O Filipe — a personagem do terceiro Espelho — dizia sempre que estava bem. E acreditava nisso. Tinha uma vida organizada, um trabalho estável, relações que funcionavam. Mas havia qualquer coisa que não encaixava. Uma sensação de que merecia menos do que tinha. Ou de que só merecia o que tinha se continuasse a dar.

A culpa é uma das camadas mais difíceis de ver porque se disfarça de virtude. Parece generosidade. Parece dedicação. Parece amor. Mas quando olhas de perto, percebes que não é dar por amor — é dar para não sentir que estás a falhar.

Conheces isto? Aquela sensação de que se parares, alguém sofre? De que se pensares em ti, estás a tirar algo a alguém? De que descansar é só permitido quando já não há mais nada para fazer — e nunca há?

A culpa ensina-nos cedo. Ensina que o nosso valor está no que fazemos pelos outros. Que pedir é fraqueza. Que receber é dívida. E com o tempo, esquecemos que merecer não é algo que se conquista. É algo que já somos.

Neste episódio, não te peço que deixes de sentir culpa. Isso seria mais uma exigência. Peço-te apenas que notes quando ela aparece. E que, em vez de obedeceres automaticamente, perguntes: isto é meu? Ou é algo que aprendi?

Porque a maior parte da culpa que carregamos não é nossa. É herdada. É absorvida. É repetida até parecer verdade.

O Espelho da Culpa é um convite a desmontar essa herança. Devagar. Com ternura. Sem te castigares mais uma vez por quereres ser livre.`;

const EP04_PUBLIC = `Quem és quando ninguém te está a ver?

Não é uma pergunta filosófica. É prática. Quando chegas a casa e fechas a porta. Quando os papéis caem. Quando não precisas de ser mãe, filha, mulher, profissional, amiga, forte, disponível. Quando tiras tudo isso — o que sobra?

Se a resposta é "não sei", não estás sozinha. Se a resposta é um vazio que assusta, também não.

O Vítor — a personagem do quarto Espelho — viveu anos a ser exactamente o que esperavam dele. Competente. Seguro. Racional. E quando um dia alguém lhe perguntou "mas o que é que tu queres?", ele não soube responder. Não porque não tivesse desejos. Mas porque tinha passado tanto tempo a corresponder a expectativas que já não distinguia as suas vozes das dos outros.

A identidade é o véu mais confuso. Porque não é sobre não saber quem és. É sobre saber demais — saber exactamente quem deves ser, como deves agir, o que devem pensar de ti. E essa certeza, que parece força, é na verdade uma armadura.

Todos temos máscaras. Isso não é problema. O problema é quando a máscara cola à pele. Quando já não sabes onde termina o papel e onde começas tu.

Há sinais. Quando dizes "eu sou assim" e sentes um aperto. Quando alguém te descreve e tu pensas "isso não sou eu — mas também não sei o que é". Quando mudas de comportamento dependendo de quem está na sala — não por educação, mas por sobrevivência.

Neste episódio convido-te a uma coisa simples: nota os papéis que desempenhas hoje. Não para os julgares. Não para os largares. Apenas para os veres. Porque só quando vês a máscara é que podes escolher quando a usas — e quando a poisas.

O Espelho da Identidade não te diz quem és. Ajuda-te a perguntar. E às vezes, a pergunta já é a resposta.`;

const EP05_PUBLIC = `Cuidas de tudo. Cuidas de todos. E se alguém te perguntar como estás, dizes "bem, obrigada" — e continuas.

Há uma forma de amar que parece força mas que é controlo. Uma forma de cuidar que parece entrega mas que é medo de largar. Uma forma de organizar a vida que parece eficiência mas que é pânico disfarçado.

A Isabel — a personagem do quinto Espelho — era a pessoa a quem todos recorriam. Organizada. Fiável. Sempre disponível. Mas havia um custo que ninguém via: ela não conseguia não controlar. Não porque fosse autoritária. Mas porque largar significava confiar — e confiar significava poder perder.

Reconheces isto? Aquela necessidade de verificar. De confirmar. De fazer tu mesma porque "assim fica bem feito". Aquela incapacidade de delegar não por perfeccionismo mas por medo de que, se soltas, tudo desmorona.

O controlo é o véu mais invisível porque a sociedade recompensa-o. És produtiva? Ótimo. És organizada? Perfeito. Tens tudo sob controlo? Parabéns. Ninguém te diz que essa necessidade de segurar tudo é, na verdade, uma forma de não sentir o caos que está por baixo.

E o corpo sabe. Sabe quando estás a segurar demais. Manifesta-se na tensão dos ombros, na mandíbula cerrada, na insónia das três da manhã quando repassas tudo o que pode correr mal amanhã.

Não te peço que largues tudo. Isso seria cruel — e impossível. Peço-te que experimentes uma coisa: hoje, escolhe uma coisa que controlas e pergunta-te "o que é que tenho medo que aconteça se eu largar isto?" A resposta pode surpreender-te.

Porque quase sempre, o que tememos perder já não depende de nós. E segurar é apenas a ilusão de que depende.`;

const EP06_PUBLIC = `Há desejos que nunca disseste em voz alta. Não por vergonha. Por hábito.

Hábito de te tornares mais pequena. De quereres menos para não incomodares. De preencheres o tempo com coisas que não te preenchem — porque pelo menos assim não tens de olhar para o vazio.

A Lena — a personagem do sexto Espelho — queria coisas que nunca disse. Não coisas materiais. Coisas mais profundas. Queria ser vista. Queria ter espaço. Queria poder dizer "isto não me basta" sem que isso significasse ingratidão.

Vivemos numa cultura de excesso. Temos acesso a tudo e mesmo assim sentimos falta de algo. E quando alguém nos pergunta "mas o que é que te falta?", não sabemos responder. Porque o que nos falta não se compra. Não se agenda. Não se resolve com mais.

O desejo verdadeiro não é querer mais. É querer o que é certo. É parar tempo suficiente para ouvir o que a tua vida está a pedir — não o que a tua cabeça acha que devias querer.

Há um momento em que a Lena para de preencher e começa a esvaziar. Não por disciplina. Por cansaço de fingir que está cheia quando está oca. E nesse esvaziamento, algo aparece. Algo que sempre lá esteve mas que o ruído escondia.

Se sentes que andas a procurar algo sem saber o quê — este véu é para ti. Se preencheste a agenda, a casa, as relações, e mesmo assim há um buraco — para. Não para o tapar. Para o ouvir.

Porque o vazio não é ausência. É espaço. E no espaço, o desejo verdadeiro finalmente tem onde morar.`;

const EP07_PUBLIC = `Este é o último véu. E talvez o mais estranho. Porque fala de separação — mas não da forma que esperas.

Não é sobre divórcio. Não é sobre perda. É sobre algo mais subtil: a separação de ti mesma. O momento em que te afastaste tanto de quem és para pertencer que já não sabes como voltar.

A Helena e o Miguel — as personagens do sétimo Espelho — separaram-se. E foi nessa separação que cada um respirou pela primeira vez de outra forma. Não porque o outro fosse mau. Mas porque juntos tinham construído algo que já não cabia em nenhum dos dois.

Todos nós fazemos isto. Encolhemos para caber. Adaptamos. Moldamos. E com o tempo, a forma original perde-se. Não por maldade. Por amor. Por medo. Por hábito.

A separação é o véu mais corajoso porque nos obriga a olhar para a pergunta que evitamos: se eu fosse só eu, sem ninguém a definir-me, quem seria?

E essa pergunta assusta. Porque a resposta pode significar mudança. Pode significar solidão temporária. Pode significar perder o que conhecemos para encontrar o que somos.

Mas há algo bonito nisto: separar não é perder. Separar é criar espaço. E no espaço, as coisas verdadeiras ficam. Só sai o que já não servia — mesmo que nos tivéssemos agarrado a isso como se fosse vital.

Se chegaste até aqui — até ao sétimo véu — já não és a mesma pessoa que começou. E não porque mudaste. Porque te permitiste ver. E ver muda tudo, mesmo quando não mudas nada.

Esta série foi um convite. Sete véus. Sete camadas. Sete formas de te esconderes de ti mesma. E em cada uma, uma porta. Não empurro ninguém. Só mostro que a porta existe.

O resto é contigo.`;

// ─────────────────────────────────────────────
// EPISÓDIOS EXCLUSIVOS: "Por Trás do Véu"
// Objectivo: aprofundar, reflectir, acompanhar a leitora
// ─────────────────────────────────────────────

const EP01_EXCLUSIVE = `Leste o Espelho da Ilusão. E se estás aqui, algo ressoou. Algo naquelas páginas tocou num sítio que já conhecias mas que tinhas deixado de visitar.

Quero falar-te sobre o que fica depois. Depois de veres o véu. Depois de reconheceres que a vida que tinhas não era inteiramente tua. O que vem a seguir?

A verdade é que não há um "a seguir" dramático. Não acordas transformada. Não mudas de vida de um dia para o outro. O que acontece é mais subtil: começas a notar. A notar os automatismos. A notar as escolhas que não são escolhas. A notar o momento exacto em que dizes sim quando querias dizer "preciso de pensar".

E isso é desconfortável. Porque é mais fácil não ver. É mais fácil seguir a rotina, cumprir o esperado, manter tudo no lugar. Ver dá trabalho. Ver exige honestidade. E a honestidade, quando é contigo mesma, é a mais difícil de todas.

Mas há algo que quero que saibas: não precisas de fazer nada com o que viste. Não há pressão. Não há prazo. Ver já é suficiente. O reconhecimento já é o movimento.

Uma leitora escreveu-me: "Li o primeiro capítulo e não mudei nada na minha vida. Mas comecei a sentir as coisas de outra forma." É isso. É exactamente isso. Não se trata de mudar. Trata-se de sentir de novo.

Então, uma reflexão para levares contigo: qual foi o momento do Espelho da Ilusão que mais te tocou? Não o que achaste mais bonito ou mais bem escrito. O que te fez parar. O que te fez engolir em seco. Guarda esse momento. Ele tem algo para te dizer.`;

const EP02_EXCLUSIVE = `O Espelho do Medo revela algo que muitas de nós não queremos admitir: o medo não é o obstáculo. É o arquitecto.

Foi o medo que desenhou a tua rotina. Que escolheu as tuas palavras. Que decidiu quando falavas e quando calavas. Não como um tirano — como um protector. Um protector exausto que já não sabe a diferença entre perigo real e desconforto.

Há uma passagem no Espelho do Medo em que o Rui percebe que o silêncio dele não era paz — era estratégia. Silêncio como forma de não ser rejeitado. Silêncio como forma de controlar o que os outros pensam. Silêncio como armadura transparente.

E tu? Qual é o teu silêncio? Onde é que o medo fala por ti sem tu perceberes?

Não te peço que respondas agora. Peço-te que vivas com a pergunta durante uns dias. Que a deixes morar em ti. Porque as respostas que vêm depressa são as da cabeça. As que demoram são as verdadeiras.

Uma coisa que aprendi com este véu: o medo não passa. Não desaparece. Mas muda de forma. Quando o reconheces, ele perde o poder do invisível. Já não decide por ti no escuro. Está ali, visível, e tu podes escolher: ouço-te, mas hoje vou na mesma.

Isso não é coragem heróica. É coragem quotidiana. É a mais difícil. É a que importa.`;

const EP03_EXCLUSIVE = `A culpa tem uma textura. Se prestares atenção, sentes-a no corpo. Um peso nos ombros. Um apertar no peito. Uma voz baixa que diz "devias estar a fazer outra coisa".

Depois de ler o Espelho da Culpa, muitas leitoras dizem-me a mesma coisa: "Não sabia que isto era culpa. Pensava que era só responsabilidade."

E essa confusão é intencional. A culpa sobrevive porque se disfarça. Disfarça-se de dever. De dedicação. De amor. E enquanto a confundes com virtude, ela continua a dirigir a tua vida.

Há um exercício que te proponho. Durante uma semana, cada vez que fizeres algo pelos outros, nota o que sentes. Se for alegria — é genuíno. Se for alívio — provavelmente é culpa. Alegria é "quero". Alívio é "devo".

A diferença é enorme. E quando começas a notá-la, tudo muda. Não porque deixes de dar. Mas porque começas a dar por escolha — não por obrigação invisível.

O Filipe, no Espelho, demorou tempo a entender isto. E tu também podes demorar. Não há pressa. A culpa que carregas há anos não se desfaz numa semana. Mas começa a soltar-se no momento em que dizes: "Isto não é meu. Posso pousá-lo."

E podes. Eu prometo que podes.`;

const EP04_EXCLUSIVE = `Há uma pergunta que o Espelho da Identidade te faz e que é quase impossível de responder: quem és sem os teus papéis?

Não é uma pergunta teórica. É a pergunta mais prática que existe. Porque tudo o que fazes — as tuas decisões, as tuas relações, os teus limites ou a falta deles — nasce da resposta a essa pergunta.

Se és "a que cuida", vais cuidar até te esvaziares. Se és "a forte", nunca vais pedir ajuda. Se és "a que resolve", nunca vais permitir que os outros resolvam por ti.

E nenhum destes papéis é mau. O problema é quando te defines por eles. Quando se tornam a única coisa que és. Quando tirá-los significa não sobrar nada.

Uma leitora disse-me: "Li o Espelho da Identidade e pela primeira vez percebi que não sei quem sou fora do trabalho." E chorou. Não de tristeza. De reconhecimento. Porque ver a armadura já é começar a soltá-la.

O convite deste episódio é simples: escreve cinco coisas que dizes que és. Depois, para cada uma, pergunta: "E se eu não fosse isto, quem seria?" Não para te assustares. Para te conheceres. Porque por baixo de todos os papéis, há alguém que nunca precisou de justificação para existir. E essa és tu.`;

const EP05_EXCLUSIVE = `Largar é a coisa mais difícil que existe. Não porque não saibamos que devemos. Mas porque largar significa confiar. E confiar significa aceitar que não controlamos o resultado.

No Espelho do Controlo, a Isabel aprende isto da forma mais dolorosa: ao perceber que tudo o que segurava com tanta força já não precisava de ser segurado. Que as pessoas que protegia sabiam cuidar de si. Que os cenários catastróficos que imaginava quase nunca aconteciam. E que os que aconteciam não eram os que esperava.

Há uma ilusão no controlo: a ilusão de segurança. Se eu controlo, nada de mau acontece. Mas a verdade é outra: se eu controlo, nada acontece. Nem o mau nem o bom. Porque o bom também precisa de espaço para chegar. E o espaço só existe quando largas.

Experimenta uma coisa esta semana: escolhe uma situação que controlas habitualmente e não intervenhas. Não corrijas. Não reorganizes. Não sugiras. Apenas observa o que acontece. Pode ser uma tarefa doméstica. Uma conversa. Uma decisão de alguém próximo.

Nota o que sentes. O desconforto. A comichão de querer fazer. E depois nota o que realmente acontece quando não fazes.

Quase sempre, o mundo continua. E tu respiras. E nessa respiração, há liberdade.`;

const EP06_EXCLUSIVE = `Depois de ler o Espelho do Desejo, muitas leitoras ficam com uma sensação estranha: sabem que lhes falta algo, mas não sabem o quê.

E isso é normal. Mais do que normal — é o ponto.

Passamos tanto tempo a preencher que esquecemos como é estar vazias. E o vazio assusta. Assusta porque a cultura nos ensinou que vazio é mau. Que é falta. Que é fracasso. Mas o vazio é espaço. E no espaço, o desejo verdadeiro aparece.

Há uma prática que te proponho. Chama-se "a hora vazia". Uma vez por semana, reserva uma hora sem nada. Sem telefone. Sem livro. Sem música. Sem lista de tarefas. Só tu e o espaço. No início, o desconforto vai ser grande. A cabeça vai gritar que devias estar a fazer algo produtivo. Mas fica. Fica com o vazio.

E nota o que aparece. Pode ser um desejo antigo. Uma memória. Uma vontade que enterraste há anos. Pode ser nada — e tudo bem. Porque a prática não é encontrar. É criar as condições para que o que precisa de aparecer apareça.

A Lena, no Espelho, descobriu que o seu desejo mais profundo não era ter mais. Era ter menos — menos ruído, menos obrigação, menos pressa — para finalmente ouvir-se.

Talvez o teu desejo também não seja o que pensas. Talvez não seja algo a acrescentar. Talvez seja algo a retirar. E nesse retirar, encontrares o que sempre procuraste.`;

const EP07_EXCLUSIVE = `Chegaste ao fim. E eu quero dizer-te algo que talvez ninguém te diga: parabéns. Não pelo feito. Mas pela coragem de teres ficado.

Porque não é fácil olhar para sete espelhos. Não é fácil reconhecer o que veste sem saber. Não é fácil ficar quando cada véu te mostra algo desconfortável.

A separação — o último véu — é sobre o regresso. Não o regresso a um lugar. O regresso a ti. Aquela versão de ti que existia antes dos papéis. Antes do medo. Antes da culpa. Antes do controlo. Uma versão que não precisa de ser nada para ser tudo.

A Helena e o Miguel separaram-se — e nessa separação, cada um encontrou-se. Não porque o outro fosse o problema. Mas porque juntos tinham construído algo que escondia o essencial.

Todos temos relações assim. Com pessoas. Com trabalhos. Com hábitos. Com versões de nós. Relações que funcionam por fora e sufocam por dentro. E separarmo-nos não é destruir. É libertar. É criar espaço para o que vem.

Se percorreste os sete véus, já não és a mesma. Não porque mudaste — porque te viste. E quem se vê não consegue voltar a fingir que não viu.

A jornada não termina aqui. Há os Nós — as histórias do que acontece entre duas pessoas quando um véu cai. Há a comunidade. Há o espaço de continuar a perguntar.

Mas neste momento, para. Respira. Olha para trás e reconhece o caminho. Sete véus. Sete camadas. Sete formas de te esconderes. E em cada uma, uma parte de ti que voltou para casa.

Obrigada por esta jornada. De coração. Até já.`;

// ─────────────────────────────────────────────
// ARRAY PRINCIPAL
// ─────────────────────────────────────────────

export const PODCAST_EPISODES: PodcastEpisode[] = [
  // --- PÚBLICOS ---
  {
    id: "ep01-veu-ilusao",
    number: 1,
    veu: 1,
    title: "O Espelho da Ilusão",
    subtitle: "Quando a vida que tens não foi a que escolheste",
    description:
      "A Sara acordou e fez uma pergunta absurda que mudou tudo. Neste episódio, exploramos o primeiro véu — a vida que construíste sem saber que estavas a construir.",
    script: EP01_PUBLIC,
    type: "public",
    durationEstimate: "~8 min",
    charCount: EP01_PUBLIC.length,
    audioUrl: audioUrl("podcast-ep01-veu-ilusao.mp3"),
    color: "#c9b896",
  },
  {
    id: "ep02-veu-medo",
    number: 2,
    veu: 2,
    title: "O Espelho do Medo",
    subtitle: "Quando o medo decide por ti",
    description:
      "O Rui media as palavras antes de falar. Não por cuidado — por medo. Neste episódio, olhamos para as formas invisíveis que o medo usa para nos proteger e nos aprisionar.",
    script: EP02_PUBLIC,
    type: "public",
    durationEstimate: "~8 min",
    charCount: EP02_PUBLIC.length,
    audioUrl: audioUrl("podcast-ep02-veu-medo.mp3"),
    color: "#8b9b8e",
  },
  {
    id: "ep03-veu-culpa",
    number: 3,
    veu: 3,
    title: "O Espelho da Culpa",
    subtitle: "Quando te castigas por querer mais",
    description:
      "O Filipe dizia sempre que estava bem. Até ao dia em que não soube dizer porquê. Neste episódio, desmontamos a culpa que se disfarça de virtude.",
    script: EP03_PUBLIC,
    type: "public",
    durationEstimate: "~8 min",
    charCount: EP03_PUBLIC.length,
    audioUrl: audioUrl("podcast-ep03-veu-culpa.mp3"),
    color: "#b07a7a",
  },
  {
    id: "ep04-veu-identidade",
    number: 4,
    veu: 4,
    title: "O Espelho da Identidade",
    subtitle: "Quando já não sabes quem és sem os outros",
    description:
      "Quem és quando ninguém te está a ver? O Vítor não sabia responder. Neste episódio, exploramos a máscara que cola à pele.",
    script: EP04_PUBLIC,
    type: "public",
    durationEstimate: "~8 min",
    charCount: EP04_PUBLIC.length,
    audioUrl: audioUrl("podcast-ep04-veu-identidade.mp3"),
    color: "#ab9375",
  },
  {
    id: "ep05-veu-controlo",
    number: 5,
    veu: 5,
    title: "O Espelho do Controlo",
    subtitle: "Quando segurar é a única forma que conheces",
    description:
      "A Isabel cuidava de tudo e de todos. Mas havia um custo que ninguém via. Neste episódio, olhamos para o controlo que se disfarça de amor.",
    script: EP05_PUBLIC,
    type: "public",
    durationEstimate: "~8 min",
    charCount: EP05_PUBLIC.length,
    audioUrl: audioUrl("podcast-ep05-veu-controlo.mp3"),
    color: "#8aaaca",
  },
  {
    id: "ep06-veu-desejo",
    number: 6,
    veu: 6,
    title: "O Espelho do Desejo",
    subtitle: "Quando desejas tudo menos o que precisas",
    description:
      "A Lena queria coisas que nunca disse. Não por vergonha — por hábito. Neste episódio, damos nome ao que ficou em silêncio.",
    script: EP06_PUBLIC,
    type: "public",
    durationEstimate: "~8 min",
    charCount: EP06_PUBLIC.length,
    audioUrl: audioUrl("podcast-ep06-veu-desejo.mp3"),
    color: "#c08aaa",
  },
  {
    id: "ep07-veu-separacao",
    number: 7,
    veu: 7,
    title: "O Espelho da Separação",
    subtitle: "Quando te afastas de ti mesma para pertencer",
    description:
      "A Helena e o Miguel separaram-se — e foi nessa separação que cada um respirou de outra forma. Neste episódio, exploramos o último véu e o regresso a ti.",
    script: EP07_PUBLIC,
    type: "public",
    durationEstimate: "~8 min",
    charCount: EP07_PUBLIC.length,
    audioUrl: audioUrl("podcast-ep07-veu-separacao.mp3"),
    color: "#baaacc",
  },
  // --- EXCLUSIVOS ---
  {
    id: "ep08-por-tras-ilusao",
    number: 8,
    veu: 1,
    title: "Por Trás do Véu: Ilusão",
    subtitle: "O que fica depois de veres",
    description:
      "Episódio exclusivo para quem leu o Espelho da Ilusão. Uma reflexão sobre o que acontece quando o véu cai — e o desconforto de ver.",
    script: EP01_EXCLUSIVE,
    type: "exclusive",
    durationEstimate: "~5 min",
    charCount: EP01_EXCLUSIVE.length,
    audioUrl: audioUrl("podcast-ep08-por-tras-ilusao.mp3"),
    color: "#c9b896",
  },
  {
    id: "ep09-por-tras-medo",
    number: 9,
    veu: 2,
    title: "Por Trás do Véu: Medo",
    subtitle: "O medo como arquitecto",
    description:
      "Episódio exclusivo para quem leu o Espelho do Medo. Uma reflexão sobre o silêncio como estratégia e a coragem quotidiana.",
    script: EP02_EXCLUSIVE,
    type: "exclusive",
    durationEstimate: "~5 min",
    charCount: EP02_EXCLUSIVE.length,
    audioUrl: audioUrl("podcast-ep09-por-tras-medo.mp3"),
    color: "#8b9b8e",
  },
  {
    id: "ep10-por-tras-culpa",
    number: 10,
    veu: 3,
    title: "Por Trás do Véu: Culpa",
    subtitle: "A textura da culpa",
    description:
      "Episódio exclusivo para quem leu o Espelho da Culpa. Como distinguir alegria de alívio — e porque isso muda tudo.",
    script: EP03_EXCLUSIVE,
    type: "exclusive",
    durationEstimate: "~5 min",
    charCount: EP03_EXCLUSIVE.length,
    audioUrl: audioUrl("podcast-ep10-por-tras-culpa.mp3"),
    color: "#b07a7a",
  },
  {
    id: "ep11-por-tras-identidade",
    number: 11,
    veu: 4,
    title: "Por Trás do Véu: Identidade",
    subtitle: "Quem és sem os papéis",
    description:
      "Episódio exclusivo para quem leu o Espelho da Identidade. Um exercício para descobrir quem sobra quando os papéis caem.",
    script: EP04_EXCLUSIVE,
    type: "exclusive",
    durationEstimate: "~5 min",
    charCount: EP04_EXCLUSIVE.length,
    audioUrl: audioUrl("podcast-ep11-por-tras-identidade.mp3"),
    color: "#ab9375",
  },
  {
    id: "ep12-por-tras-controlo",
    number: 12,
    veu: 5,
    title: "Por Trás do Véu: Controlo",
    subtitle: "A ilusão de segurança",
    description:
      "Episódio exclusivo para quem leu o Espelho do Controlo. Experimenta não intervir — e nota o que acontece.",
    script: EP05_EXCLUSIVE,
    type: "exclusive",
    durationEstimate: "~5 min",
    charCount: EP05_EXCLUSIVE.length,
    audioUrl: audioUrl("podcast-ep12-por-tras-controlo.mp3"),
    color: "#8aaaca",
  },
  {
    id: "ep13-por-tras-desejo",
    number: 13,
    veu: 6,
    title: "Por Trás do Véu: Desejo",
    subtitle: "A hora vazia",
    description:
      "Episódio exclusivo para quem leu o Espelho do Desejo. Uma prática para ouvir o desejo que ficou soterrado pelo ruído.",
    script: EP06_EXCLUSIVE,
    type: "exclusive",
    durationEstimate: "~5 min",
    charCount: EP06_EXCLUSIVE.length,
    audioUrl: audioUrl("podcast-ep13-por-tras-desejo.mp3"),
    color: "#c08aaa",
  },
  {
    id: "ep14-por-tras-separacao",
    number: 14,
    veu: 7,
    title: "Por Trás do Véu: Separação",
    subtitle: "O regresso a ti",
    description:
      "Episódio exclusivo para quem completou os sete véus. Uma reflexão final sobre o caminho percorrido e o que vem depois.",
    script: EP07_EXCLUSIVE,
    type: "exclusive",
    durationEstimate: "~5 min",
    charCount: EP07_EXCLUSIVE.length,
    audioUrl: audioUrl("podcast-ep14-por-tras-separacao.mp3"),
    color: "#baaacc",
  },
];

// Helpers
export function getPublicEpisodes() {
  return PODCAST_EPISODES.filter((ep) => ep.type === "public");
}

export function getExclusiveEpisodes() {
  return PODCAST_EPISODES.filter((ep) => ep.type === "exclusive");
}

export function getEpisodeById(id: string) {
  return PODCAST_EPISODES.find((ep) => ep.id === id);
}

export function getEpisodesByVeu(veu: number) {
  return PODCAST_EPISODES.filter((ep) => ep.veu === veu);
}

export function getTotalCharCount() {
  const episodes = PODCAST_EPISODES.reduce((sum, ep) => sum + ep.charCount, 0);
  const intro = PODCAST_META.introScript.length;
  const outro = PODCAST_META.outroScript.length;
  return { episodes, intro, outro, total: episodes + intro + outro };
}
