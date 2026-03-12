/**
 * Serie de Podcasts: "Os Sete Veus — Conversas com o Espelho"
 *
 * 14 episodios narrados pela voz da Vivianne (ElevenLabs)
 * - 7 publicos: "O Veu de..." (introdutorios, ~8 min, ~7200 chars cada)
 * - 7 exclusivos: "Por Tras do Veu" (reflexao profunda, ~5 min, ~4500 chars cada)
 *
 * Budget: 100.000 caracteres ElevenLabs
 * Intro + Outro reutilizavel: ~1500 chars
 * Episodios publicos: ~50.400 chars
 * Episodios exclusivos: ~31.500 chars
 * Total estimado: ~83.400 chars (margem: ~16.600)
 *
 * Tom: Guia Voz Vivianne
 * — Presenca compassiva, nao dissecacao
 * — Cena reconhecivel + convite + porta aberta
 * — Sensorial, nao clinico
 */

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
  audioUrl?: string;
  color: string;
};

export type PodcastMeta = {
  title: string;
  subtitle: string;
  description: string;
  author: string;
  introScript: string;
  outroScript: string;
};

export const PODCAST_META: PodcastMeta = {
  title: "Os Sete Veus — Conversas com o Espelho",
  subtitle: "Uma serie sobre os veus que vestimos sem saber",
  description:
    "Sete veus. Sete formas de te esconderes de ti mesma. Nesta serie, a Vivianne dos Santos convida-te a olhar para cada um deles — devagar, sem pressa, ao ritmo de quem comeca a perguntar. Cada episodio e um espelho. E cada espelho e um convite.",
  author: "Vivianne dos Santos",
  introScript: `Ola. Eu sou a Vivianne. E este e o podcast Os Sete Veus — Conversas com o Espelho. Aqui falamos sobre as camadas invisiveis que vestimos sem saber. Devagar. Sem pressa. Ao ritmo de quem comeca a perguntar.`,
  outroScript: `Obrigada por ficares ate aqui. Se alguma coisa ressoou, nao a largues. Guarda-a. Leva-a contigo. E se quiseres ir mais fundo, os Espelhos estao a tua espera em osseteveusdespertar.com. Ate ao proximo veu.`,
};

// ─────────────────────────────────────────────
// EPISODIOS PUBLICOS: "O Veu de..."
// Objectivo: atrair, criar reconhecimento, gerar curiosidade
// ─────────────────────────────────────────────

const EP01_PUBLIC = `Ha uma cena que quase toda a gente conhece. Acordas de manha. Levantas-te. Fazes o cafe. Vestes-te. Sais de casa. E tudo funciona. Os prazos cumprem-se. Os parabensvem nas alturas certas. A vida faz sentido — para toda a gente.

Menos para ti.

E nao e que algo esteja partido. Nao e uma crise. E mais subtil do que isso. E como usar um casaco que te serve perfeitamente mas que nunca escolheste. Serve, sim. Mas nao e teu.

A Sara — a personagem do primeiro Espelho — acordou tres minutos antes do despertador, como fazia sempre. E nessa manha, uma pergunta absurda mudou tudo: quando foi que eu escolhi tomar cafe em vez de cha?

Parece ridiculo, nao e? Mas pensa nisso um momento. Quantas das tuas escolhas diarias sao realmente tuas? E quantas sao habitos herdados, expectativas absorvidas, caminhos que alguem tracou antes de tu chegares?

O veu da ilusao e isto. Nao e mentira. Nao e engano. E algo mais suave e por isso mais dificil de ver. E a vida que construiste sem perceber que estavas a construir a vida de outra pessoa. Ou melhor — a vida que achavam que devias ter.

E funciona. Esse e o problema. Funciona tao bem que so percebes quando algo muda. Quando o corpo da um sinal. Quando o cansaco nao passa com ferias. Quando o exito chega e tu nao sentes nada.

Eu sei do que falo. Porque eu tambem vivi isto. Durante anos, a minha vida fazia sentido no papel. Economista. Organizada. Capaz. Mas por dentro, havia uma inquietacao que nao tinha nome. Uma sensacao de que eu estava a viver a vida de alguem — so nao sabia de quem.

E quando comecei a perguntar — nao grandes perguntas filosoficas, mas perguntas pequenas, como a do cafe — tudo comecou a mexer. Devagar. Sem drama. Mas com uma honestidade que me assustou.

O primeiro veu nao cai com forca. Cai com uma pergunta. Uma pergunta que parece simples demais para mudar alguma coisa. Mas muda.

Entao, deixo-te com isto: ha alguma coisa na tua vida que funciona perfeitamente mas que nunca escolheste? Nao tens de responder agora. Alias, nao tens de responder de todo. So nota. Nota e deixa ficar.

Porque e assim que comeca. Nao com uma explosao. Com uma nota. Um reconhecimento quieto. Um "espera — isto sou eu?"

E se essa pergunta te tocar, o Espelho da Ilusao esta a tua espera. Sete capitulos. Sem pressa. Ao teu ritmo. Porque isto nao e uma corrida. E um regresso.`;

const EP02_PUBLIC = `Ha uma palavra que usamos para nos proteger e que, com o tempo, nos aprisiona. Essa palavra e "cuidado".

Cuidado com o que dizes. Cuidado com o que sentes. Cuidado com o que queres. Parece sabedoria, nao e? Parece bom senso. Mas e se for outra coisa?

O Rui — a personagem do segundo Espelho — olhava para o telefone antes de falar. Nao para organizar as palavras. Para ter a certeza de que eram as certas. As que nao incomodavam. As que nao revelavam demais. As que mantinham tudo no lugar.

E tu? Ja mediste as palavras antes de as dizer? Ja sentiste o estomago apertar antes de fazeres algo que querias fazer? Ja evitaste uma conversa porque o resultado podia ser imprevisivel?

O medo nao aparece sempre como panico. Alias, quase nunca aparece assim. O medo mais comum e discreto. E o adiamento cronico. E a indecisao que parece ponderacao. E a prudencia que, vista de perto, e paralisia bonita.

Ha medos que nao reconhecemos como medos. O medo de incomodar. O medo de parecer demasiado. O medo de querer algo e nao conseguir. O medo de querer algo e conseguir — e depois nao saber o que fazer com isso.

Eu cresci numa cultura onde a cautela era virtude. Onde nao se fala antes de pensar muito. Onde sentir demais e sinal de fraqueza. E durante anos, confundi medo com maturidade. Confundi silencio com respeito. Confundi ficar quieta com estar em paz.

Mas o corpo sabe. Sempre sabe. E quando o corpo comeca a pedir atencao — com tensao, com insonia, com um nozinho no peito que nao passa — e porque algo precisa de ser ouvido.

Neste episodio nao te peco que sejas corajosa. Nao te peco que saltes. Peco-te apenas que notes. Nota onde o medo mora no teu dia. Nota o que evitas. Nota o que adias. E em vez de te julgares por isso, olha com curiosidade.

Porque o medo nao e o inimigo. E um mensageiro. E quando aprendes a ouvi-lo — nao a obedece-lo, mas a ouvi-lo — ele deixa de precisar de gritar.

O Espelho do Medo e sobre isso. Sobre iluminar o que esta escondido no obvio. Sem bisturi. Sem pressa. Devagar.`;

const EP03_PUBLIC = `Queres ouvir algo que talvez ninguem te tenha dito? Tu nao es egoista por quereres mais. Nao es ingrata. Nao es demasiado.

Mas eu sei que ha uma voz dentro de ti que diz o contrario. Uma voz que aparece cada vez que pensas em ti. Cada vez que fazes algo so para ti. Cada vez que dizes nao.

Essa voz tem um nome. Chama-se culpa.

O Filipe — a personagem do terceiro Espelho — dizia sempre que estava bem. E acreditava nisso. Tinha uma vida organizada, um trabalho estavel, relacoes que funcionavam. Mas havia qualquer coisa que nao encaixava. Uma sensacao de que merecia menos do que tinha. Ou de que so merecia o que tinha se continuasse a dar.

A culpa e uma das camadas mais dificeis de ver porque se disfarca de virtude. Parece generosidade. Parece dedicacao. Parece amor. Mas quando olhas de perto, percebes que nao e dar por amor — e dar para nao sentir que estas a falhar.

Conheces isto? Aquela sensacao de que se parares, alguem sofre? De que se pensares em ti, estas a tirar algo a alguem? De que descansar e so permitido quando ja nao ha mais nada para fazer — e nunca ha?

A culpa ensina-nos cedo. Ensina que o nosso valor esta no que fazemos pelos outros. Que pedir e fraqueza. Que receber e divida. E com o tempo, esquecemos que merecer nao e algo que se conquista. E algo que ja somos.

Neste episodio, nao te peco que deixes de sentir culpa. Isso seria mais uma exigencia. Peco-te apenas que notes quando ela aparece. E que, em vez de obedeceres automaticamente, perguntes: isto e meu? Ou e algo que aprendi?

Porque a maior parte da culpa que carregamos nao e nossa. E herdada. E absorvida. E repetida ate parecer verdade.

O Espelho da Culpa e um convite a desmontar essa heranca. Devagar. Com ternura. Sem te castigares mais uma vez por quereres ser livre.`;

const EP04_PUBLIC = `Quem es quando ninguem te esta a ver?

Nao e uma pergunta filosofica. E pratica. Quando chegas a casa e fechas a porta. Quando os papeis caem. Quando nao precisas de ser mae, filha, mulher, profissional, amiga, forte, disponivel. Quando tiras tudo isso — o que sobra?

Se a resposta e "nao sei", nao estas sozinha. Se a resposta e um vazio que assusta, tambem nao.

O Vitor — a personagem do quarto Espelho — viveu anos a ser exactamente o que esperavam dele. Competente. Seguro. Racional. E quando um dia alguem lhe perguntou "mas o que e que tu queres?", ele nao soube responder. Nao porque nao tivesse desejos. Mas porque tinha passado tanto tempo a corresponder a expectativas que ja nao distinguia as suas vozes das dos outros.

A identidade e o veu mais confuso. Porque nao e sobre nao saber quem es. E sobre saber demais — saber exactamente quem deves ser, como deves agir, o que devem pensar de ti. E essa certeza, que parece forca, e na verdade uma armadura.

Todos temos mascaras. Isso nao e problema. O problema e quando a mascara cola a pele. Quando ja nao sabes onde termina o papel e onde comecas tu.

Ha sinais. Quando dizes "eu sou assim" e sentes um aperto. Quando alguem te descreve e tu pensas "isso nao sou eu — mas tambem nao sei o que e". Quando mudas de comportamento dependendo de quem esta na sala — nao por educacao, mas por sobrevivencia.

Neste episodio convido-te a uma coisa simples: nota os papeis que desempenhas hoje. Nao para os julgares. Nao para os largares. Apenas para os veres. Porque so quando ves a mascara e que podes escolher quando a usas — e quando a poisas.

O Espelho da Identidade nao te diz quem es. Ajuda-te a perguntar. E as vezes, a pergunta ja e a resposta.`;

const EP05_PUBLIC = `Cuidas de tudo. Cuidas de todos. E se alguem te perguntar como estas, dizes "bem, obrigada" — e continuas.

Ha uma forma de amar que parece forca mas que e controlo. Uma forma de cuidar que parece entrega mas que e medo de largar. Uma forma de organizar a vida que parece eficiencia mas que e panico disfarçado.

A Isabel — a personagem do quinto Espelho — era a pessoa a quem todos recorriam. Organizada. Fiavel. Sempre disponivel. Mas havia um custo que ninguem via: ela nao conseguia nao controlar. Nao porque fosse autoritaria. Mas porque largar significava confiar — e confiar significava poder perder.

Reconheces isto? Aquela necessidade de verificar. De confirmar. De fazer tu mesma porque "assim fica bem feito". Aquela incapacidade de delegar nao por perfeccionismo mas por medo de que, se soltas, tudo desmorona.

O controlo e o veu mais invisivel porque a sociedade recompensa-o. Es produtiva? Otimo. Es organizada? Perfeito. Tens tudo sob controlo? Parabens. Ninguem te diz que essa necessidade de segurar tudo e, na verdade, uma forma de nao sentir o caos que esta por baixo.

E o corpo sabe. Sabe quando estas a segurar demais. Manifesta-se na tensao dos ombros, na mandibula cerrada, na insonia das tres da manha quando repassas tudo o que pode correr mal amanha.

Nao te peco que largues tudo. Isso seria cruel — e impossivel. Peco-te que experimentes uma coisa: hoje, escolhe uma coisa que controlas e pergunta-te "o que e que tenho medo que aconteca se eu largar isto?" A resposta pode surpreender-te.

Porque quase sempre, o que tememos perder ja nao depende de nos. E segurar e apenas a ilusao de que depende.`;

const EP06_PUBLIC = `Ha desejos que nunca disseste em voz alta. Nao por vergonha. Por habito.

Habito de te tornares mais pequena. De quereres menos para nao incomodares. De preencheres o tempo com coisas que nao te preenchem — porque pelo menos assim nao tens de olhar para o vazio.

A Lena — a personagem do sexto Espelho — queria coisas que nunca disse. Nao coisas materiais. Coisas mais profundas. Queria ser vista. Queria ter espaco. Queria poder dizer "isto nao me basta" sem que isso significasse ingratidao.

Vivemos numa cultura de excesso. Temos acesso a tudo e mesmo assim sentimos falta de algo. E quando alguem nos pergunta "mas o que e que te falta?", nao sabemos responder. Porque o que nos falta nao se compra. Nao se agenda. Nao se resolve com mais.

O desejo verdadeiro nao e querer mais. E querer o que e certo. E parar tempo suficiente para ouvir o que a tua vida esta a pedir — nao o que a tua cabeca acha que devias querer.

Ha um momento em que a Lena para de preencher e comeca a esvaziar. Nao por disciplina. Por cansaco de fingir que esta cheia quando esta oca. E nesse esvaziamento, algo aparece. Algo que sempre la esteve mas que o ruido escondia.

Se sentes que andas a procurar algo sem saber o que — este veu e para ti. Se preencheste a agenda, a casa, as relacoes, e mesmo assim ha um buraco — para. Nao para o tapar. Para o ouvir.

Porque o vazio nao e ausencia. E espaco. E no espaco, o desejo verdadeiro finalmente tem onde morar.`;

const EP07_PUBLIC = `Este e o ultimo veu. E talvez o mais estranho. Porque fala de separacao — mas nao da forma que esperas.

Nao e sobre divorcio. Nao e sobre perda. E sobre algo mais subtil: a separacao de ti mesma. O momento em que te afastaste tanto de quem es para pertencer que ja nao sabes como voltar.

A Helena e o Miguel — as personagens do setimo Espelho — separaram-se. E foi nessa separacao que cada um respirou pela primeira vez de outra forma. Nao porque o outro fosse mau. Mas porque juntos tinham construido algo que ja nao cabia em nenhum dos dois.

Todos nos fazemos isto. Encolhemos para caber. Adaptamos. Moldamos. E com o tempo, a forma original perde-se. Nao por maldade. Por amor. Por medo. Por habito.

A separacao e o veu mais corajoso porque nos obriga a olhar para a pergunta que evitamos: se eu fosse so eu, sem ninguem a definir-me, quem seria?

E essa pergunta assusta. Porque a resposta pode significar mudanca. Pode significar solidao temporaria. Pode significar perder o que conhecemos para encontrar o que somos.

Mas ha algo bonito nisto: separar nao e perder. Separar e criar espaco. E no espaco, as coisas verdadeiras ficam. So sai o que ja nao servia — mesmo que nos tivessemos agarrado a isso como se fosse vital.

Se chegaste ate aqui — ate ao setimo veu — ja nao es a mesma pessoa que comecou. E nao porque mudaste. Porque te permitiste ver. E ver muda tudo, mesmo quando nao mudas nada.

Esta serie foi um convite. Sete veus. Sete camadas. Sete formas de te esconderes de ti mesma. E em cada uma, uma porta. Nao empurro ninguem. So mostro que a porta existe.

O resto e contigo.`;

// ─────────────────────────────────────────────
// EPISODIOS EXCLUSIVOS: "Por Tras do Veu"
// Objectivo: aprofundar, reflectir, acompanhar a leitora
// ─────────────────────────────────────────────

const EP01_EXCLUSIVE = `Leste o Espelho da Ilusao. E se estas aqui, algo ressoou. Algo naquelas paginas tocou num sitio que ja conhecias mas que tinhas deixado de visitar.

Quero falar-te sobre o que fica depois. Depois de veres o veu. Depois de reconheceres que a vida que tinhas nao era inteiramente tua. O que vem a seguir?

A verdade e que nao ha um "a seguir" dramatico. Nao acordas transformada. Nao mudas de vida de um dia para o outro. O que acontece e mais subtil: comecas a notar. A notar os automatismos. A notar as escolhas que nao sao escolhas. A notar o momento exacto em que dizes sim quando querias dizer "preciso de pensar".

E isso e desconfortavel. Porque e mais facil nao ver. E mais facil seguir a rotina, cumprir o esperado, manter tudo no lugar. Ver da trabalho. Ver exige honestidade. E a honestidade, quando e contigo mesma, e a mais difícil de todas.

Mas ha algo que quero que saibas: nao precisas de fazer nada com o que viste. Nao ha pressao. Nao ha prazo. Ver ja e suficiente. O reconhecimento ja e o movimento.

Uma leitora escreveu-me: "Li o primeiro capitulo e nao mudei nada na minha vida. Mas comecei a sentir as coisas de outra forma." E isso. E exactamente isso. Nao se trata de mudar. Trata-se de sentir de novo.

Entao, uma reflexao para levares contigo: qual foi o momento do Espelho da Ilusao que mais te tocou? Nao o que achaste mais bonito ou mais bem escrito. O que te fez parar. O que te fez engolir em seco. Guarda esse momento. Ele tem algo para te dizer.`;

const EP02_EXCLUSIVE = `O Espelho do Medo revela algo que muitas de nos nao queremos admitir: o medo nao e o obstaculo. E o arquitecto.

Foi o medo que desenhou a tua rotina. Que escolheu as tuas palavras. Que decidiu quando falavas e quando calavas. Nao como um tirano — como um protector. Um protector exausto que ja nao sabe a diferenca entre perigo real e desconforto.

Ha uma passagem no Espelho do Medo em que o Rui percebe que o silencio dele nao era paz — era estrategia. Silencio como forma de nao ser rejeitado. Silencio como forma de controlar o que os outros pensam. Silencio como armadura transparente.

E tu? Qual e o teu silencio? Onde e que o medo fala por ti sem tu perceberes?

Nao te peco que respondas agora. Peco-te que vivas com a pergunta durante uns dias. Que a deixes morar em ti. Porque as respostas que vem depressa sao as da cabeca. As que demoram sao as verdadeiras.

Uma coisa que aprendi com este veu: o medo nao passa. Nao desaparece. Mas muda de forma. Quando o reconheces, ele perde o poder do invisivel. Ja nao decide por ti no escuro. Esta ali, visivel, e tu podes escolher: ouço-te, mas hoje vou na mesma.

Isso nao e coragem heroica. E coragem quotidiana. E a mais difícil. E a que importa.`;

const EP03_EXCLUSIVE = `A culpa tem uma textura. Se prestares atencao, sentes-a no corpo. Um peso nos ombros. Um apertar no peito. Uma voz baixa que diz "devias estar a fazer outra coisa".

Depois de ler o Espelho da Culpa, muitas leitoras dizem-me a mesma coisa: "Nao sabia que isto era culpa. Pensava que era so responsabilidade."

E essa confusao e intencional. A culpa sobrevive porque se disfarca. Disfarca-se de dever. De dedicacao. De amor. E enquanto a confundes com virtude, ela continua a dirigir a tua vida.

Ha um exercicio que te proponho. Durante uma semana, cada vez que fizeres algo pelos outros, nota o que sentes. Se for alegria — e genuino. Se for alivio — provavelmente e culpa. Alegria e "quero". Alivio e "devo".

A diferenca e enorme. E quando comecas a nota-la, tudo muda. Nao porque deixes de dar. Mas porque comecas a dar por escolha — nao por obrigacao invisivel.

O Filipe, no Espelho, demorou tempo a entender isto. E tu tambem podes demorar. Nao ha pressa. A culpa que carregas ha anos nao se desfaz numa semana. Mas comeca a soltar-se no momento em que dizes: "Isto nao e meu. Posso pousa-lo."

E podes. Eu prometo que podes.`;

const EP04_EXCLUSIVE = `Ha uma pergunta que o Espelho da Identidade te faz e que e quase impossivel de responder: quem es sem os teus papeis?

Nao e uma pergunta teorica. E a pergunta mais pratica que existe. Porque tudo o que fazes — as tuas decisoes, as tuas relacoes, os teus limites ou a falta deles — nasce da resposta a essa pergunta.

Se es "a que cuida", vais cuidar ate te esvaziares. Se es "a forte", nunca vais pedir ajuda. Se es "a que resolve", nunca vais permitir que os outros resolvam por ti.

E nenhum destes papeis e mau. O problema e quando te defines por eles. Quando se tornam a unica coisa que es. Quando tira-los significa nao sobrar nada.

Uma leitora disse-me: "Li o Espelho da Identidade e pela primeira vez percebi que nao sei quem sou fora do trabalho." E chorou. Nao de tristeza. De reconhecimento. Porque ver a armadura ja e comeca a solta-la.

O convite deste episodio e simples: escreve cinco coisas que dizes que es. Depois, para cada uma, pergunta: "E se eu nao fosse isto, quem seria?" Nao para te assustares. Para te conheceres. Porque por baixo de todos os papeis, ha alguem que nunca precisou de justificacao para existir. E essa es tu.`;

const EP05_EXCLUSIVE = `Largar e a coisa mais difícil que existe. Nao porque nao saibamos que devemos. Mas porque largar significa confiar. E confiar significa aceitar que nao controlamos o resultado.

No Espelho do Controlo, a Isabel aprende isto da forma mais dolorosa: ao perceber que tudo o que segurava com tanta forca ja nao precisava de ser segurado. Que as pessoas que protegia sabiam cuidar de si. Que os cenarios catastroficos que imaginava quase nunca aconteciam. E que os que aconteciam nao eram os que esperava.

Ha uma ilusao no controlo: a ilusao de seguranca. Se eu controlo, nada de mau acontece. Mas a verdade e outra: se eu controlo, nada acontece. Nem o mau nem o bom. Porque o bom tambem precisa de espaco para chegar. E o espaco so existe quando largas.

Experimenta uma coisa esta semana: escolhe uma situacao que controlas habitualmente e nao intervenhas. Nao corrijas. Nao reorganizes. Nao sugirasque. Apenas observa o que acontece. Pode ser uma tarefa domestica. Uma conversa. Uma decisao de alguem proximo.

Nota o que sentes. O desconforto. A comichao de querer fazer. E depois nota o que realmente acontece quando nao fazes.

Quase sempre, o mundo continua. E tu respiras. E nessa respiracao, ha liberdade.`;

const EP06_EXCLUSIVE = `Depois de ler o Espelho do Desejo, muitas leitoras ficam com uma sensacao estranha: sabem que lhes falta algo, mas nao sabem o que.

E isso e normal. Mais do que normal — e o ponto.

Passamos tanto tempo a preencher que esquecemos como e estar vazias. E o vazio assusta. Assusta porque a cultura nos ensinou que vazio e mau. Que e falta. Que e fracasso. Mas o vazio e espaco. E no espaco, o desejo verdadeiro aparece.

Ha uma pratica que te proponho. Chama-se "a hora vazia". Uma vez por semana, reserva uma hora sem nada. Sem telefone. Sem livro. Sem musica. Sem lista de tarefas. So tu e o espaco. No inicio, o desconforto vai ser grande. A cabeca vai gritar que devias estar a fazer algo produtivo. Mas fica. Fica com o vazio.

E nota o que aparece. Pode ser um desejo antigo. Uma memoria. Uma vontade que enterdaste ha anos. Pode ser nada — e tudo bem. Porque a pratica nao e encontrar. E criar as condicoes para que o que precisa de aparecer apareca.

A Lena, no Espelho, descobriu que o seu desejo mais profundo nao era ter mais. Era ter menos — menos ruido, menos obrigacao, menos pressa — para finalmente ouvir-se.

Talvez o teu desejo tambem nao seja o que pensas. Talvez nao seja algo a acrescentar. Talvez seja algo a retirar. E nesse retirar, encontrares o que sempre procuraste.`;

const EP07_EXCLUSIVE = `Chegaste ao fim. E eu quero dizer-te algo que talvez ninguem te diga: parabens. Nao pelo feito. Mas pela coragem de teres ficado.

Porque nao e facil olhar para sete espelhos. Nao e facil reconhecer o que veste sem saber. Nao e facil ficar quando cada veu te mostra algo desconfortavel.

A separacao — o ultimo veu — e sobre o regresso. Nao o regresso a um lugar. O regresso a ti. Aquela versao de ti que existia antes dos papeis. Antes do medo. Antes da culpa. Antes do controlo. Uma versao que nao precisa de ser nada para ser tudo.

A Helena e o Miguel separaram-se — e nessa separacao, cada um encontrou-se. Nao porque o outro fosse o problema. Mas porque juntos tinham construido algo que escondia o essencial.

Todos temos relacoes assim. Com pessoas. Com trabalhos. Com habitos. Com versoes de nos. Relacoes que funcionam por fora e sufocam por dentro. E separarmo-nos nao e destruir. E libertar. E criar espaco para o que vem.

Se percorreste os sete veus, ja nao es a mesma. Nao porque mudaste — porque te viste. E quem se ve nao consegue voltar a fingir que nao viu.

A jornada nao termina aqui. Ha os Nos — as historias do que acontece entre duas pessoas quando um veu cai. Ha a comunidade. Ha o espaco de continuar a perguntar.

Mas neste momento, para. Respira. Olha para tras e reconhece o caminho. Sete veus. Sete camadas. Sete formas de te esconderes. E em cada uma, uma parte de ti que voltou para casa.

Obrigada por esta jornada. De coracao. Ate ja.`;

// ─────────────────────────────────────────────
// ARRAY PRINCIPAL
// ─────────────────────────────────────────────

export const PODCAST_EPISODES: PodcastEpisode[] = [
  // --- PUBLICOS ---
  {
    id: "ep01-veu-ilusao",
    number: 1,
    veu: 1,
    title: "O Espelho da Ilusao",
    subtitle: "Quando a vida que tens nao foi a que escolheste",
    description:
      "A Sara acordou e fez uma pergunta absurda que mudou tudo. Neste episodio, exploramos o primeiro veu — a vida que construiste sem saber que estavas a construir.",
    script: EP01_PUBLIC,
    type: "public",
    durationEstimate: "~8 min",
    charCount: EP01_PUBLIC.length,
    color: "#c9b896",
  },
  {
    id: "ep02-veu-medo",
    number: 2,
    veu: 2,
    title: "O Espelho do Medo",
    subtitle: "Quando o medo decide por ti",
    description:
      "O Rui media as palavras antes de falar. Nao por cuidado — por medo. Neste episodio, olhamos para as formas invisiveis que o medo usa para nos proteger e nos aprisionar.",
    script: EP02_PUBLIC,
    type: "public",
    durationEstimate: "~8 min",
    charCount: EP02_PUBLIC.length,
    color: "#8b9b8e",
  },
  {
    id: "ep03-veu-culpa",
    number: 3,
    veu: 3,
    title: "O Espelho da Culpa",
    subtitle: "Quando te castigas por querer mais",
    description:
      "O Filipe dizia sempre que estava bem. Ate ao dia em que nao soube dizer porque. Neste episodio, desmontamos a culpa que se disfarca de virtude.",
    script: EP03_PUBLIC,
    type: "public",
    durationEstimate: "~8 min",
    charCount: EP03_PUBLIC.length,
    color: "#b07a7a",
  },
  {
    id: "ep04-veu-identidade",
    number: 4,
    veu: 4,
    title: "O Espelho da Identidade",
    subtitle: "Quando ja nao sabes quem es sem os outros",
    description:
      "Quem es quando ninguem te esta a ver? O Vitor nao sabia responder. Neste episodio, exploramos a mascara que cola a pele.",
    script: EP04_PUBLIC,
    type: "public",
    durationEstimate: "~8 min",
    charCount: EP04_PUBLIC.length,
    color: "#ab9375",
  },
  {
    id: "ep05-veu-controlo",
    number: 5,
    veu: 5,
    title: "O Espelho do Controlo",
    subtitle: "Quando segurar e a unica forma que conheces",
    description:
      "A Isabel cuidava de tudo e de todos. Mas havia um custo que ninguem via. Neste episodio, olhamos para o controlo que se disfarca de amor.",
    script: EP05_PUBLIC,
    type: "public",
    durationEstimate: "~8 min",
    charCount: EP05_PUBLIC.length,
    color: "#8aaaca",
  },
  {
    id: "ep06-veu-desejo",
    number: 6,
    veu: 6,
    title: "O Espelho do Desejo",
    subtitle: "Quando desejas tudo menos o que precisas",
    description:
      "A Lena queria coisas que nunca disse. Nao por vergonha — por habito. Neste episodio, damos nome ao que ficou em silencio.",
    script: EP06_PUBLIC,
    type: "public",
    durationEstimate: "~8 min",
    charCount: EP06_PUBLIC.length,
    color: "#c08aaa",
  },
  {
    id: "ep07-veu-separacao",
    number: 7,
    veu: 7,
    title: "O Espelho da Separacao",
    subtitle: "Quando te afastas de ti mesma para pertencer",
    description:
      "A Helena e o Miguel separaram-se — e foi nessa separacao que cada um respirou de outra forma. Neste episodio, exploramos o ultimo veu e o regresso a ti.",
    script: EP07_PUBLIC,
    type: "public",
    durationEstimate: "~8 min",
    charCount: EP07_PUBLIC.length,
    color: "#baaacc",
  },
  // --- EXCLUSIVOS ---
  {
    id: "ep08-por-tras-ilusao",
    number: 8,
    veu: 1,
    title: "Por Tras do Veu: Ilusao",
    subtitle: "O que fica depois de veres",
    description:
      "Episodio exclusivo para quem leu o Espelho da Ilusao. Uma reflexao sobre o que acontece quando o veu cai — e o desconforto de ver.",
    script: EP01_EXCLUSIVE,
    type: "exclusive",
    durationEstimate: "~5 min",
    charCount: EP01_EXCLUSIVE.length,
    color: "#c9b896",
  },
  {
    id: "ep09-por-tras-medo",
    number: 9,
    veu: 2,
    title: "Por Tras do Veu: Medo",
    subtitle: "O medo como arquitecto",
    description:
      "Episodio exclusivo para quem leu o Espelho do Medo. Uma reflexao sobre o silencio como estrategia e a coragem quotidiana.",
    script: EP02_EXCLUSIVE,
    type: "exclusive",
    durationEstimate: "~5 min",
    charCount: EP02_EXCLUSIVE.length,
    color: "#8b9b8e",
  },
  {
    id: "ep10-por-tras-culpa",
    number: 10,
    veu: 3,
    title: "Por Tras do Veu: Culpa",
    subtitle: "A textura da culpa",
    description:
      "Episodio exclusivo para quem leu o Espelho da Culpa. Como distinguir alegria de alivio — e porque isso muda tudo.",
    script: EP03_EXCLUSIVE,
    type: "exclusive",
    durationEstimate: "~5 min",
    charCount: EP03_EXCLUSIVE.length,
    color: "#b07a7a",
  },
  {
    id: "ep11-por-tras-identidade",
    number: 11,
    veu: 4,
    title: "Por Tras do Veu: Identidade",
    subtitle: "Quem es sem os papeis",
    description:
      "Episodio exclusivo para quem leu o Espelho da Identidade. Um exercicio para descobrir quem sobra quando os papeis caem.",
    script: EP04_EXCLUSIVE,
    type: "exclusive",
    durationEstimate: "~5 min",
    charCount: EP04_EXCLUSIVE.length,
    color: "#ab9375",
  },
  {
    id: "ep12-por-tras-controlo",
    number: 12,
    veu: 5,
    title: "Por Tras do Veu: Controlo",
    subtitle: "A ilusao de seguranca",
    description:
      "Episodio exclusivo para quem leu o Espelho do Controlo. Experimenta nao intervir — e nota o que acontece.",
    script: EP05_EXCLUSIVE,
    type: "exclusive",
    durationEstimate: "~5 min",
    charCount: EP05_EXCLUSIVE.length,
    color: "#8aaaca",
  },
  {
    id: "ep13-por-tras-desejo",
    number: 13,
    veu: 6,
    title: "Por Tras do Veu: Desejo",
    subtitle: "A hora vazia",
    description:
      "Episodio exclusivo para quem leu o Espelho do Desejo. Uma pratica para ouvir o desejo que ficou soterrado pelo ruido.",
    script: EP06_EXCLUSIVE,
    type: "exclusive",
    durationEstimate: "~5 min",
    charCount: EP06_EXCLUSIVE.length,
    color: "#c08aaa",
  },
  {
    id: "ep14-por-tras-separacao",
    number: 14,
    veu: 7,
    title: "Por Tras do Veu: Separacao",
    subtitle: "O regresso a ti",
    description:
      "Episodio exclusivo para quem completou os sete veus. Uma reflexao final sobre o caminho percorrido e o que vem depois.",
    script: EP07_EXCLUSIVE,
    type: "exclusive",
    durationEstimate: "~5 min",
    charCount: EP07_EXCLUSIVE.length,
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
