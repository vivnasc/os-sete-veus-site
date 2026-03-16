// O Nó da Solidão
// Isabel + Pedro — O controlo que isolou quem mais amava
// Véu 5: Controlo
// Regra: Só lês este Nó depois de completares o Espelho do Controlo

export type Chapter = {
  slug: string;
  number: number;
  title: string;
  subtitle: string;
  accentColor: string;
  accentBg: string;
  content: string[];
  reflection: {
    prompt: string;
    journalQuestion: string;
  };
  checklist: string[];
};

export const bookMeta = {
  title: "O Nó da Solidão",
  subtitle: "O controlo que isolou quem mais amava",
  author: "Vivianne dos Santos",
  dedication:
    "Para quem controlou por amor. E para quem amou apesar do controlo.",
  intro: [
    "Há uma solidão que não se vê de fora. A solidão de quem vive acompanhado mas isolado — não porque ninguém esteja ali, mas porque quem está ali foi sendo afastado, devagar, gesto a gesto, decisão a decisão, até ficar a uma distância que parece segura mas é, na verdade, intransponível.",
    "Isabel e Pedro amavam-se. Não é preciso duvidar disso para compreender o que aconteceu entre eles. O amor existia — forte, antigo, real. Mas o amor não é imune ao controlo. E o controlo de Isabel — subtil, justificado, sempre disfarçado de cuidado — foi criando à volta de Pedro uma cerca invisível que ele só percebeu quando já não sabia como sair.",
    "Este livro começa depois do Espelho do Controlo, quando Isabel finalmente olhou para o que fazia e viu que o que chamava de organização era, na verdade, medo. Medo de perder. Medo do caos. Medo de que, se largasse as rédeas, tudo desmoronasse. E começa também com Pedro, que ficou durante anos porque amava, e que agora precisa de decidir se o amor é suficiente para ficar num lugar onde mal consegue respirar.",
    "O nó da solidão é o nó entre controlar e amar. Porque quem controla pensa que protege. E quem é controlado pensa que é amado. E os dois podem ter razão — e ainda assim, estar completamente sozinhos.",
  ],
};

export const chapters: Chapter[] = [
  {
    slug: "parte-i",
    number: 1,
    title: "Parte I",
    subtitle: "A casa perfeita",
    accentColor: "#6a9e9e",
    accentBg: "#f2f7f7",
    content: [
      "A casa de Isabel e Pedro era impecável. Não impecável no sentido de luxuosa ou decorada com gosto — impecável no sentido de controlada. Cada objecto tinha o seu lugar, cada rotina tinha o seu horário, cada decisão tinha sido tomada por Isabel com a precisão de quem planeia uma operação militar e a gentileza de quem acredita genuinamente que está a fazer o melhor para todos.",
      "Os sapatos ficavam alinhados no móvel da entrada, organizados por cor e estação. A cozinha tinha etiquetas nos frascos — farinha, açúcar, arroz, massa — escritas à mão com a caligrafia redonda e firme de Isabel, como se os ingredientes pudessem esquecer o que eram sem essa indicação. As toalhas da casa de banho eram substituídas às terças e sextas. O lixo saía todas as noites às dez e meia. O jantar era às oito, nunca às oito e cinco.",
      "Pedro vivia nesta casa há nove anos. Conhecia cada regra, cada procedimento, cada expectativa. Sabia que os copos se punham na prateleira de cima com a boca virada para baixo. Sabia que as chaves ficavam no gancho da esquerda, nunca no da direita. Sabia que quando chegava a casa devia tirar os sapatos antes de pisar o soalho da sala, pendurar o casaco no cabide e não na cadeira, e lavar as mãos antes de tocar em qualquer coisa na cozinha.",
      "Não eram regras absurdas. Cada uma, isoladamente, fazia sentido. Era a acumulação que as tornava sufocantes — a sensação de viver dentro de um sistema tão organizado que não sobrava espaço para o imprevisto, para o erro, para o humano. Pedro sentia-se, muitas vezes, como um hóspede na própria casa — bem tratado, bem alimentado, com as toalhas limpas e o jantar à hora, mas sem a permissão tácita de bagunçar, de existir com a desordem natural de quem é pessoa e não peça de mobília.",
      "— Podes deixar os sapatos onde quiseres — disse Isabel uma vez, quando Pedro mencionou que se sentia condicionado. Disse-o com sinceridade, e Pedro acreditou na sinceridade. Mas quando na manhã seguinte deixou os sapatos junto ao sofá em vez de no móvel da entrada, viu o olhar de Isabel — rápido, quase imperceptível, mas ali — e viu as mãos dela moverem-se para os sapatos com a naturalidade de quem corrige algo que está fora do sítio. Não disse nada. Não reclamou. Simplesmente corrigiu. E Pedro aprendeu, nesse silêncio educado, que a permissão era teórica.",
      "***",
      "Isabel não se via como controladora. Via-se como organizada, responsável, atenta. Via-se como a pessoa que mantinha a casa a funcionar, que se lembrava das consultas médicas e dos aniversários e das datas de pagamento, que garantia que a vida doméstica corria sem sobressaltos. E era verdade — fazia tudo isso, e fazia bem. O problema não era o que fazia. Era o que acontecia a Pedro enquanto ela fazia.",
      "Pedro foi-se apagando. Não de uma vez — ninguém se apaga de uma vez. Foi-se apagando como uma vela que arde numa sala com pouco oxigénio: a chama diminui tão devagar que quem olha não nota, e quando finalmente repara, já quase não há chama. Deixou de opinar sobre o que jantavam. Deixou de sugerir programas para o fim-de-semana. Deixou de convidar amigos para casa porque os jantares com amigos geravam em Isabel uma ansiedade que se manifestava em dias de preparação frenética e noites de exaustão, e Pedro aprendeu que era mais fácil não convidar do que lidar com o processo.",
      "Aprendeu a ocupar menos espaço. A fazer menos barulho. A ter menos necessidades. A ser, em suma, menos — menos presente, menos visível, menos ele. E Isabel, sem se aperceber, interpretava essa diminuição como harmonia. A casa funcionava. Não havia conflitos. As coisas estavam nos sítios certos. Tudo estava bem.",
      "Tudo estava perfeito. E a perfeição era a coisa mais solitária do mundo.",
    ],
    reflection: {
      prompt:
        "Já viveste ou vives num espaço onde tudo funciona perfeitamente mas algo essencial falta?",
      journalQuestion:
        "Na tua casa, nas tuas relações, na tua vida — onde é que a ordem substituiu a vida? Onde é que o controlo ocupou o lugar da presença?",
    },
    checklist: [
      "Li esta parte reconhecendo o controlo disfarçado de cuidado",
      "Identifiquei espaços na minha vida onde a perfeição sufoca",
      "Permiti-me ver a solidão que existe dentro da ordem",
    ],
  },
  {
    slug: "parte-ii",
    number: 2,
    title: "Parte II",
    subtitle: "O dia em que Pedro saiu de casa",
    accentColor: "#5a8e8e",
    accentBg: "#eff5f5",
    content: [
      "Pedro não saiu de casa no sentido dramático da expressão. Não fez malas, não bateu com a porta, não houve gritos nem ultimatos. Pedro saiu de casa num Sábado de manhã para ir comprar pão e não voltou durante seis horas.",
      "Não planeou. Não decidiu. Simplesmente caminhou até à padaria, comprou o pão que Isabel lhe pedira — integral, fatiado, da marca que ela preferia — e em vez de voltar, continuou a andar. Passou pela padaria, pela praça, pelo jardim, pela avenida, e continuou a andar com o saco de pão na mão e uma sensação no peito que demorou quase uma hora a identificar como alívio.",
      "Alívio de estar fora. De estar num espaço que não tinha regras. Onde podia andar ao ritmo que quisesse, parar onde quisesse, sentar-se num banco sujo sem que ninguém levantasse uma sobrancelha. Alívio de estar sozinho de verdade — não a solidão acompanhada da casa, mas a solidão limpa de quem está consigo mesmo num espaço aberto.",
      "Sentou-se num café que não conhecia, num bairro que não era o seu, e pediu uma cerveja às onze da manhã porque podia. Porque ninguém ia olhar para ele com aquele olhar. Bebeu devagar, olhando para a rua, e pensou no que se tornara. No homem que ele era aos vinte e cinco, quando conhecera Isabel — um homem que tinha amigos, que fazia coisas por impulso, que sabia o que queria e o dizia sem medir cada palavra. E no homem que era agora, aos trinta e quatro — um homem que pedia permissão com os olhos antes de se sentar no sofá de outra forma, que verificava o humor de Isabel antes de sugerir qualquer coisa, que se tornara tão pequeno dentro da relação que por vezes não se encontrava.",
      "O telemóvel tocou às onze e meia. Isabel. Não atendeu. Tocou de novo às onze e trinta e cinco. E às onze e quarenta. E às onze e quarenta e dois. Cada chamada não atendida era um acto de rebelião tão pequeno que ninguém no mundo o reconheceria como tal — mas para Pedro, que há nove anos atendia ao primeiro toque, era uma revolução.",
      "***",
      "Quando voltou, às quatro da tarde, Isabel estava sentada à mesa da cozinha com uma expressão que Pedro conhecia bem: a expressão de quem esteve a conter pânico durante horas e agora precisa de o expressar de forma controlada, porque expressar pânico de forma descontrolada seria perder o controlo, e perder o controlo era impensável.",
      "— Onde estiveste? — A voz era calma. Demasiado calma.",
      "— A andar.",
      "— Seis horas a andar.",
      "— Sim.",
      "— Sem atender o telefone.",
      "— Sim.",
      "Isabel olhou para ele com uma mistura de alívio e fúria que não conseguiu separar. E Pedro viu, naquele olhar, as duas coisas que sempre existiram lado a lado no amor de Isabel: o medo genuíno de o perder e a necessidade de o ter dentro do perímetro onde podia controlá-lo. Ambos reais. Ambos legítimos. E ambos, juntos, impossíveis de viver.",
      "— Estavas preocupada — disse Pedro, não como pergunta.",
      "— Claro que estava preocupada. Saíste para comprar pão e desapareceste seis horas. Pensei que te tinha acontecido alguma coisa.",
      "— Eu sei. E lamento. Mas precisava de respirar.",
      "A palavra ficou no ar. Respirar. Uma palavra simples, inofensiva, que naquele contexto era uma acusação que Pedro não pretendia mas que Isabel ouviu com a clareza de quem reconhece a verdade antes de estar preparada para a enfrentar: precisava de respirar. Fora de casa. Longe de ti. Porque aqui dentro não consigo.",
      "Isabel não respondeu. Levantou-se, abriu a torneira, começou a lavar pratos que já estavam limpos. Era o que fazia quando não sabia como processar o que sentia — ocupava as mãos, organizava o espaço, retomava o controlo através dos gestos que conhecia. Pedro ficou sentado à mesa com o saco de pão ao lado — o pão que já não estava fresco, que já não servia para nada, que fora o pretexto para a saída que mudara alguma coisa entre eles que talvez já não pudesse ser mudada de volta.",
    ],
    reflection: {
      prompt:
        "Já precisaste de sair — de um espaço, de uma relação, de ti mesmo — só para respirar?",
      journalQuestion:
        "Quando alguém que amas desaparece sem aviso, o que sentes primeiro: preocupação ou raiva? O que esse sentimento te diz sobre o teu padrão de controlo?",
    },
    checklist: [
      "Li esta parte sentindo a necessidade de Pedro de respirar",
      "Reconheci a diferença entre preocupação genuína e necessidade de controlo",
      "Permiti-me questionar onde acabo eu e começa o outro nas minhas relações",
    ],
  },
  {
    slug: "parte-iii",
    number: 3,
    title: "Parte III",
    subtitle: "A menina que arrumava o caos",
    accentColor: "#4a8585",
    accentBg: "#ecf3f3",
    content: [
      "Isabel tinha sete anos quando a mãe saiu de casa. Não saiu como nos filmes — com malas e chuva e despedidas na porta. Saiu aos poucos, como quem se dissolve. Primeiro foram as noites em que não vinha jantar. Depois os fins-de-semana em que ficava na casa de uma amiga. Depois semanas inteiras em que Isabel acordava e a cama dos pais estava feita só de um lado, e o pai preparava o pequeno-almoço com uma competência excessiva que era, Isabel perceberia mais tarde, desespero disfarçado de normalidade.",
      "A mãe não era má. Não era cruel. Era caótica — uma mulher que vivia ao sabor do que sentia, que tomava decisões por impulso, que amava com intensidade quando estava presente e desaparecia sem aviso quando alguma coisa dentro dela a chamava para outro lugar. Para Isabel, que era criança e precisava do que todas as crianças precisam — previsibilidade, rotina, a certeza de que amanhã o mundo estará no mesmo sítio que hoje — a mãe era a prova viva de que o caos destrói.",
      "E então Isabel decidiu, com a determinação silenciosa de uma criança que ainda não sabe que está a tomar uma decisão que vai definir o resto da sua vida: nunca mais. Nunca mais o caos. Nunca mais a surpresa. Nunca mais acordar sem saber o que o dia traz. Se o mundo à sua volta se recusava a ser previsível, ela tornaria previsível tudo o que pudesse controlar.",
      "Começou pelo quarto. Aos oito anos, o quarto de Isabel era o mais arrumado da casa — cama feita com esquinas hospitalares, livros organizados por tamanho, roupa dobrada com a precisão de quem já não confia no mundo para ser ordenado e assume a tarefa. O pai olhava para o quarto e via uma filha responsável. Não via o que o quarto realmente era: uma trincheira. Um perímetro de segurança. O primeiro território que Isabel controlou para não sentir o medo que a mãe lhe deixara — o medo de que tudo pode desaparecer a qualquer momento se não estivermos atentos.",
      "Aos doze já organizava a casa inteira. Aos quinze geria o orçamento doméstico porque o pai era mau com dinheiro. Aos dezoito saiu de casa com um plano de cinco anos que cumpriu em quatro. Cada ano, cada objectivo alcançado, cada espaço controlado era uma vitória sobre o caos. Uma prova de que ela era diferente da mãe. De que o mundo podia ser seguro se se trabalhasse o suficiente para o tornar seguro.",
      "***",
      "Quando conheceu Pedro, Isabel sentiu algo que nunca sentira: vontade de partilhar o espaço. Pedro era calmo, descontraído, o tipo de pessoa que deixa a loiça para depois e sai para passear sem destino. Era tudo o que ela não era. E nos primeiros meses, essa diferença foi excitante — o caos controlado de Pedro, a sua espontaneidade, a forma como ele existia sem planos e sem angústia. Isabel sentia-se leve perto dele. Sentia que podia, talvez, largar um pouco do controlo.",
      "Mas o controlo não se larga. O controlo é um músculo que se contraiu durante décadas e que não relaxa por decisão. Aos poucos, sem que nenhum dos dois percebesse como, Isabel começou a organizar a vida de Pedro. Primeiro pequenas coisas — sugerir horários para o jantar, propor formas de arrumar as gavetas, optimizar a rotina matinal. Depois coisas maiores — gerir as finanças do casal, decidir onde iriam de férias, escolher que amigos convidar e quando. Tudo feito com competência e afecto, tudo apresentado como sugestão e aceite por Pedro com a boa vontade de quem ama e não quer conflito.",
      "E assim, gesto a gesto, decisão a decisão, a vida de Pedro foi sendo absorvida pela organização de Isabel até que um dia ele olhou à volta e percebeu que nada naquela casa era dele. Nenhuma decisão, nenhuma escolha, nenhum objecto fora do sítio. Tudo pertencia ao sistema de Isabel. E ele — ele era apenas uma peça do sistema. Arrumada, previsível, no sítio certo. Exactamente como Isabel precisava que tudo estivesse para não sentir o medo da menina de sete anos que acordou um dia e a mãe não estava.",
    ],
    reflection: {
      prompt:
        "De onde vem a tua necessidade de controlo? Que caos estás a tentar evitar?",
      journalQuestion:
        "Há alguma experiência na tua infância que te ensinou que o caos é perigoso? Como é que essa experiência moldou a forma como vives e amas hoje?",
    },
    checklist: [
      "Li esta parte reconhecendo a origem infantil do padrão de controlo",
      "Identifiquei o medo que vive debaixo da minha necessidade de ordem",
      "Permiti-me sentir compaixão pela criança que aprendeu a controlar para sobreviver",
    ],
  },
  {
    slug: "parte-iv",
    number: 4,
    title: "Parte IV",
    subtitle: "A conversa na cozinha",
    accentColor: "#3a7575",
    accentBg: "#e8f0f0",
    content: [
      "Passaram dois dias desde que Pedro saíra para comprar pão e voltara seis horas depois. Dois dias de normalidade forçada — jantares à hora, toalhas substituídas, rotinas cumpridas — e por baixo da normalidade, um silêncio diferente. Não o silêncio habitual da casa de Isabel, que era um silêncio de ordem e eficiência. Um silêncio de espera. O silêncio de duas pessoas que sabem que há uma conversa por ter e que adiam essa conversa porque ambas pressentem que vai mudar alguma coisa que não pode ser desmudada.",
      "Foi Isabel quem começou. Uma noite, depois do jantar, enquanto Pedro se levantava para ir para a sala, ela disse:",
      "— Espera.",
      "Pedro parou. Olhou para ela. Isabel estava sentada à mesa com as mãos à volta da chávena de chá, e os dedos apertavam a porcelana com mais força do que o necessário.",
      "— Preciso de te perguntar uma coisa. E preciso que sejas honesto.",
      "— Está bem.",
      "— Estás infeliz comigo?",
      "A pergunta saiu directa, sem rodeios, sem a preparação que Isabel normalmente dava a todas as conversas importantes. E Pedro percebeu, pela forma como ela a fez — sem ensaio, sem controlo — que lhe custara. Que era uma pergunta que ela se fizera a si mesma muitas vezes antes de encontrar coragem para a fazer em voz alta.",
      "Pedro sentou-se. Olhou para Isabel — para o rosto que amava, para os olhos que conhecia há nove anos, para as mãos que controlavam tudo e que agora, naquele momento, tremiam ligeiramente à volta da chávena.",
      "— Não estou infeliz contigo — disse, porque era verdade. — Estou infeliz dentro da vida que construímos. Que é diferente.",
      "— Qual é a diferença?",
      "— A diferença é que te amo. Mas não consigo respirar. Não consigo existir aqui como eu sou. Sinto que vivo na tua casa, não na nossa. Que sigo as tuas regras, não as nossas. Que me tornei tão pequeno para caber no teu sistema que já não me encontro.",
      "Isabel ouviu cada palavra como quem leva um murro educado. Não porque as palavras fossem cruéis. Mas porque eram verdadeiras, e a verdade é sempre mais violenta quando chega depois de anos de silêncio.",
      "— Eu não queria — disse, e a voz partiu-se a meio. — Eu não queria que te sentisses assim. Eu só queria que as coisas funcionassem. Que estivéssemos bem.",
      "— Eu sei. E é por isso que é difícil. Porque sei que fazes por amor. Mas o resultado é que me sinto sozinho. Sozinho dentro de casa. Sozinho contigo. E essa é a pior solidão que existe.",
      "Isabel largou a chávena. As mãos ficaram pousadas sobre a mesa, abertas, vazias, e naquele gesto — naquela abertura involuntária — Pedro viu algo que raramente via: Isabel sem controlo. Isabel vulnerável. Isabel a menina de sete anos que arrumava o quarto para não sentir o medo de que tudo podia desaparecer.",
      "— Tenho tanto medo de te perder — disse ela, quase em sussurro. — E quanto mais medo tenho, mais aperto. E quanto mais aperto, mais te perco. Sei disso. Vejo-me a fazer isso. E não consigo parar.",
      "Pedro estendeu a mão sobre a mesa e tocou-lhe os dedos. Ela olhou para a mão dele sobre a sua e chorou. Não o choro controlado que Isabel se permitia em ocasiões específicas — um choro descontrolado, feio, com soluços que lhe abanavam os ombros e ruídos que ela normalmente nunca deixaria escapar. Chorou como a menina de sete anos que nunca chorara pela mãe que partiu, porque chorar era caos e caos era inaceitável.",
      "Pedro não disse nada. Ficou com a mão sobre a dela e deixou-a chorar.",
    ],
    reflection: {
      prompt:
        "Já disseste a alguém que te sentias sozinho/a na presença dela? O que aconteceu?",
      journalQuestion:
        "Quando apertas por medo de perder, o que perdeste? E se em vez de apertar, abrísses — o que seria diferente?",
    },
    checklist: [
      "Li esta parte sentindo a dor de ambos os lados",
      "Reconheci o ciclo medo-controlo-distância na minha vida",
      "Permiti-me sentir que o controlo é medo disfarçado de competência",
    ],
  },
  {
    slug: "parte-v",
    number: 5,
    title: "Parte V",
    subtitle: "Largar sem soltar",
    accentColor: "#2a6565",
    accentBg: "#e4eeee",
    content: [
      "O que se seguiu à conversa na cozinha não foi uma transformação. Foi uma negociação — lenta, desconfortável, cheia de recuos e avanços. Isabel não podia deixar de ser quem era de um dia para o outro. O controlo não era um hábito que se troca como se troca de camisa. Era a estrutura inteira da sua personalidade, a armadura que a protegera desde os sete anos, e pedir-lhe que a largasse era pedir-lhe que ficasse nua no meio do mundo sem garantia de que o mundo seria gentil.",
      "Mas tentou. Tentou da forma que podia, que era imperfeita e por vezes dolorosa. Deixou de reorganizar as gavetas de Pedro. Deixou os sapatos dele onde ele os punha — junto ao sofá, debaixo da mesa, no corredor — e cada par de sapatos fora do sítio era uma pequena agonia que ela aprendeu a respirar em vez de resolver.",
      "— Parece que estou a arrancar algo de dentro de mim — disse a Pedro uma noite. — Cada vez que vejo algo fora do sítio e não o arrumo, sinto uma ansiedade física. No peito. Nas mãos.",
      "— Eu sei — disse Pedro. — E sei que é difícil. E não te peço que deixes de ser organizada. Peço-te que deixes espaço para eu existir dentro dessa organização. Que haja partes da casa que sejam minhas. Que haja decisões que eu tome sem precisar da tua aprovação.",
      "Dividiram a casa. Não formalmente, não com linhas no chão, mas com um acordo tácito que foi sendo construído ao longo de semanas. A sala era de ambos. A cozinha era de Isabel — o território onde ela precisava de ordem para funcionar e onde Pedro aceitava as regras. O escritório era de Pedro — e Isabel comprometeu-se a não entrar para arrumar, mesmo quando via pela porta entreaberta os livros empilhados no chão e os papéis espalhados sobre a secretária.",
      "Foi mais difícil do que parecia. Não pela divisão em si, mas pelo que a divisão representava: Isabel a ceder controlo. A permitir que algo no seu mundo existisse fora da sua gestão. A confiar que o caos do escritório de Pedro não se espalharia para o resto da casa, que o descontrolo numa área não significava o desmoronamento de tudo, que o mundo aguentava um pouco de desordem sem se desfazer.",
      "***",
      "Pedro, por seu lado, aprendeu a falar. Não a reclamar — reclamar seria o extremo oposto do silêncio, e nenhum extremo era o que precisavam. Aprendeu a dizer o que queria antes de Isabel decidir por ele. Quero cozinhar hoje. Quero convidar amigos Sábado. Quero passar o Domingo sem planos. Frases simples que antes não conseguia dizer porque o espaço para as dizer não existia — e que agora, com o espaço que Isabel dolorosamente abria, começavam a caber.",
      "Houve conflitos. Conflitos pequenos, silenciosos, o tipo de conflito que acontece quando duas pessoas reorganizam uma dança que dançaram durante nove anos. Isabel arrumava os sapatos de Pedro por reflexo e depois pedia desculpa com os olhos. Pedro tomava uma decisão sem a consultar e via no rosto dela o esforço de não reagir. Não era perfeito. Não era suave. Era humano, com toda a aspereza que o humano implica.",
      "Mas havia algo novo entre eles que antes não existia: espaço. O espaço mínimo mas essencial entre dois corpos que se amam — o espaço que permite a cada um respirar, existir, ser alguém para além da relação. Isabel aprendeu que esse espaço não era perda — era a condição para que o amor existisse como escolha e não como prisão. E Pedro aprendeu que ocupar espaço não era egoísmo — era a condição para que ele pudesse estar ali inteiro, presente, e não como sombra.",
    ],
    reflection: {
      prompt:
        "Onde na tua vida precisas de criar espaço para que o outro exista?",
      journalQuestion:
        "O que sentes quando largas o controlo sobre algo que é importante para ti? Alívio? Pânico? Vazio? O que esse sentimento te diz?",
    },
    checklist: [
      "Li esta parte reconhecendo a dificuldade de ceder controlo",
      "Identifiquei áreas na minha vida onde não deixo espaço para o outro",
      "Permiti-me sentir que largar o controlo não é perder — é confiar",
    ],
  },
  {
    slug: "parte-vi",
    number: 6,
    title: "Parte VI",
    subtitle: "A visita da mãe",
    accentColor: "#1a5555",
    accentBg: "#e0eaea",
    content: [
      "A mãe de Isabel apareceu num Sábado sem avisar. Tocou à campainha às onze da manhã com um saco de pastéis na mão e aquele sorriso largo que Isabel associava à imprevisibilidade desde que tinha memória. Teresa — esse era o nome dela — tinha sessenta e dois anos, cabelo pintado de ruivo, brincos grandes, e a energia de quem nunca aprendeu a estar quieta porque estar quieta significava pensar e pensar significava sentir e sentir era algo que Teresa preferia evitar.",
      "— Surpresa — disse, e entrou antes que Isabel pudesse reagir.",
      "Pedro estava no escritório. Ouviu a voz de Teresa e saiu, porque gostava dela apesar de tudo — havia em Teresa uma vitalidade que ele compreendia, uma recusa de ser contida que ele secretamente admirava, talvez porque era o oposto exacto da contenção que a filha praticava.",
      "Isabel ficou rígida. A presença da mãe na casa — sem aviso, sem hora marcada, sem que Isabel pudesse preparar a sala e preparar-se — activou cada alarme que tinha no corpo. Sentiu as mãos quererem arrumar, limpar, organizar, como se a simples presença de Teresa trouxesse o caos consigo e fosse preciso contê-lo antes que se espalhasse.",
      "Teresa sentou-se na cozinha, comeu pastéis, falou sem parar sobre uma viagem que estava a planear, sobre uma amiga que tinha adoecido, sobre um programa de televisão que a fizera chorar. Falava com a abundância de quem não filtra e o calor de quem genuinamente gosta de estar com as pessoas, e Isabel ouvia com aquela atenção tensa que reservava para tudo o que não controlava.",
      "— Estás tensa, filha — disse Teresa, com a observação casual de quem diz que está a chover.",
      "— Não estou.",
      "— Estás. Estás sempre tensa quando eu venho. Como se eu fosse partir alguma coisa.",
      "A frase atingiu Isabel num sítio que ela não esperava. Não pela acusação — era uma observação, não uma acusação. Mas pela precisão. Pela forma como Teresa, apesar de todos os seus defeitos, via a filha com uma clareza que ninguém mais tinha. Porque Teresa conhecia a origem do controlo de Isabel. Sabia que era ela — a mãe caótica, a mãe imprevisível, a mãe que saía e entrava e saía — que tinha plantado a semente do medo que agora governava a vida da filha.",
      "***",
      "Depois de Teresa sair, Isabel sentou-se na cozinha e ficou parada durante muito tempo. Pedro sentou-se à frente dela, esperou, e finalmente Isabel disse:",
      "— Ela tem razão. Fico tensa quando ela vem. Fico tensa porque quando ela aparece, eu volto a ter sete anos. Volto a ser a menina que acorda e a mãe não está. E o controlo — tudo isto, a casa, as regras, a ordem — é a forma que encontrei de garantir que mais ninguém desaparece.",
      "Pedro ouviu.",
      "— Mas tu desapareceste na mesma — continuou Isabel, e a voz tremia. — Estavas aqui todos os dias e desapareceste. Porque eu apertei tanto que não te deixei espaço para ficar. Fiz exactamente o que a minha mãe fez — afastei quem amava. Só que ela afastou pelo caos e eu afasto pelo controlo. O resultado é o mesmo.",
      "Era a primeira vez que Isabel via o padrão com essa clareza. A primeira vez que ligava a menina de sete anos à mulher de trinta e sete. A primeira vez que compreendia que o controlo não era o oposto do caos — era a outra face da mesma moeda. Que controlar e abandonar são ambas formas de não estar presente. Que a mãe e a filha, apesar de serem tão diferentes quanto duas pessoas podem ser, faziam exactamente a mesma coisa: fugiam da intimidade. Teresa fugia saindo. Isabel fugia controlando. E em ambos os casos, quem amavam ficava sozinho.",
    ],
    reflection: {
      prompt:
        "Há algum padrão na tua vida que é a versão invertida de algo que um dos teus pais fazia?",
      journalQuestion:
        "Quando vês os teus pais em ti — nos teus gestos, nos teus medos, na forma como amas — o que sentes? Raiva? Compaixão? Reconhecimento? As três coisas ao mesmo tempo?",
    },
    checklist: [
      "Li esta parte reconhecendo que controlo e caos podem ter a mesma raiz",
      "Identifiquei padrões herdados que repito de forma invertida",
      "Permiti-me ver a ligação entre o meu passado e a forma como me relaciono hoje",
    ],
  },
  {
    slug: "parte-vii",
    number: 7,
    title: "Parte VII",
    subtitle: "A casa com espaço",
    accentColor: "#5aaa9a",
    accentBg: "#f0f7f5",
    content: [
      "A mudança não aconteceu de uma vez. Aconteceu como acontecem todas as mudanças verdadeiras: devagar, com tropeços, com dias em que parecia que nada tinha mudado e noites em que Isabel arrumava os sapatos de Pedro por instinto e depois os tirava do sítio onde os pusera e os deixava onde ele os deixara, e ficava a olhar para eles com o coração a bater depressa como quem pratica uma coragem pequena e invisível.",
      "Pedro começou a cozinhar aos Sábados. Não com a mestria de quem domina a cozinha — cozinhava de forma imperfeita, experimental, com panelas erradas e temperos a mais e o fogão sujo no final. E Isabel aprendeu a sentar-se à mesa enquanto ele cozinhava, a não se levantar para limpar, a não sugerir que usasse outra panela, a não olhar para o fogão sujo. Aprendeu a estar ali sentada com as mãos no colo e a ansiedade no peito e a confiar que o mundo não acabava porque o azeite respingara para o chão.",
      "Convidaram amigos. Não com a produção que Isabel costumava fazer — sem menus planeados com uma semana de antecedência, sem toalhas engomadas, sem a preparação frenética que transformava cada jantar social numa operação de guerra. Pedro convidou dois amigos para uma sexta-feira, Isabel preparou o que havia no frigorífico, e a noite foi imperfeita e viva de uma forma que os jantares perfeitos de Isabel nunca tinham sido.",
      "— Foi bom — disse Isabel depois, com surpresa genuína.",
      "— Foi — disse Pedro, e sorriu.",
      "***",
      "O nó da solidão não desapareceu. Há dias em que Isabel sente o puxão do controlo com a mesma força de sempre — dias de stress, dias de medo, dias em que o mundo parece demasiado imprevisível para ser suportado sem a armadura da ordem. Nesses dias, as mãos voltam a querer arrumar, organizar, gerir. E Isabel deixa-as. Deixa-as fazer o que precisam de fazer — arrumar uma gaveta, limpar uma prateleira, reorganizar os frascos da cozinha — porque aprendeu que o controlo não é o inimigo. O inimigo é o controlo sobre as pessoas. Os objectos podem ser arrumados. As pessoas, não.",
      "Pedro ficou. Não porque o controlo de Isabel tenha desaparecido — não desapareceu, e talvez nunca desapareça completamente. Ficou porque viu que ela estava a tentar. Porque viu o esforço que lhe custava cada par de sapatos fora do sítio, cada jantar sem plano, cada Sábado sem lista. Viu que o amor de Isabel era real, mesmo quando se manifestava de formas que o sufocavam. E viu que ela estava, dia a dia, a aprender a amar sem apertar.",
      "Numa tarde de Domingo, Isabel estava sentada na sala a ler e Pedro estava no escritório com a porta aberta — coisa que antes não acontecia, porque a visão da desordem do escritório perturbava Isabel a ponto de não conseguir concentrar-se. Mas naquela tarde, a porta estava aberta, e Isabel podia ver pelo canto do olho os livros empilhados e os papéis espalhados e um copo de café esquecido sobre uma pilha de revistas, e não se levantou. Ficou sentada. Leu. Ouviu Pedro a trabalhar — o som do teclado, uma música baixa que ele punha quando estava concentrado — e sentiu algo que não esperava sentir.",
      "Sentiu companhia. Não a companhia controlada de quem vive no mesmo espaço segundo as mesmas regras. A companhia real de duas pessoas que existem lado a lado, cada uma com o seu espaço, cada uma com a sua forma de estar, ligadas não pela ordem mas pela escolha de estar ali.",
      "Isabel pousou o livro e olhou para a porta aberta do escritório. Para a desordem de Pedro. Para a vida imperfeita que estava a aprender a partilhar sem gerir. E pensou na menina de sete anos que arrumava o quarto para não sentir medo. Pensou nela com ternura. E disse-lhe, em silêncio, a coisa que ninguém lhe dissera quando mais precisava de ouvir: não precisas de arrumar o mundo para merecer que as pessoas fiquem. Às vezes ficam mesmo com a desordem. Às vezes ficam por causa da desordem. Às vezes ficam simplesmente porque te amam, e o amor não precisa de etiquetas nem de horários nem de sapatos no sítio certo.",
      "Precisa apenas de espaço. E o espaço, Isabel estava a aprender, não é vazio. É o lugar onde o amor respira.",
    ],
    reflection: {
      prompt:
        "O que significaria, na tua vida, deixar a porta do escritório aberta?",
      journalQuestion:
        "Pensa na tua relação mais próxima. Há espaço para a imperfeição? Há espaço para o outro existir sem a tua gestão? O que precisas de largar para que esse espaço exista?",
    },
    checklist: [
      "Li este nó até ao fim",
      "Senti a diferença entre solidão acompanhada e companhia verdadeira",
      "Reconheci que o controlo não é amor — é medo de perder",
      "Permiti-me imaginar uma relação onde o espaço é amor, não abandono",
    ],
  },
];
