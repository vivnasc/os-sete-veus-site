// O Nó do Silêncio
// Rui + Ana — O que o medo calou entre eles
// Véu 2: Medo
// Regra: Só lês este Nó depois de completares o Espelho do Medo

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
  title: "O Nó do Silêncio",
  subtitle: "O que o medo calou entre eles",
  author: "Vivianne dos Santos",
  dedication:
    "Para quem amou em silêncio durante demasiado tempo. E para quem finalmente disse.",
  intro: [
    "Há um tipo de distância que não se mede em quilómetros. Cresce dentro de casa, entre dois corpos que partilham cama e rotina e os mesmos copos na mesma prateleira. É uma distância feita de palavras não ditas, de gestos que foram sendo adiados até deixarem de fazer sentido, de conversas que começaram e não chegaram ao fim porque um dos dois recuou antes do ponto em que a verdade teria de ser dita.",
    "Rui e Ana não se odiavam. Nunca se odiaram. O problema não era o desamor — era algo mais subtil e por isso mais difícil de ver. Era o medo que Rui carregava sem saber nomear, e o silêncio que Ana construiu à volta desse medo para não o assustar. Dois sistemas de protecção perfeitos que se encaixaram tão bem que pareciam amor. Durante anos, pareceram.",
    "Este livro começa onde o Espelho do Medo termina: com Rui a acordar para aquilo que a sua vida se tornara. Mas acordar é apenas o princípio. O nó verdadeiro está entre dois — e para o desatar é preciso que dois estejam dispostos a puxar o fio. Mesmo que doa. Especialmente quando dói.",
    "O que o medo cala entre duas pessoas não é apenas palavras. É a possibilidade de ser completamente visto. E ser completamente visto é o único lugar onde o amor verdadeiro pode existir.",
  ],
};

export const chapters: Chapter[] = [
  {
    slug: "parte-i",
    number: 1,
    title: "Parte I",
    subtitle: "A noite como todas as outras",
    accentColor: "#6a9dbe",
    accentBg: "#f2f7fb",
    content: [
      "Era uma quarta-feira. Rui lembrou-se disso mais tarde, quando tentou reconstruir o momento com exactidão — como se o dia da semana pudesse explicar alguma coisa, ou pelo menos dar ao que aconteceu uma moldura que o tornasse mais legível. Uma quarta-feira de Novembro. Ana estava na cozinha quando ele chegou, e o apartamento cheirava a cebola refogada e a sabonete de lavanda, o mesmo cheiro de sempre, um cheiro que durante anos Rui atravessara sem registar e que nessa noite o deteve à entrada como se fosse novo.",
      "Ele ficou parado no corredor por um momento. Não muito — apenas o tempo suficiente para que Ana não notasse, ocupada a mexer qualquer coisa num tacho, de costas para ele, os ombros levemente inclinados para a frente na posição que adoptava quando cozinhava concentrada. Rui pousou a pasta no chão devagar, sem o ruído habitual, e observou-a como se a estivesse a ver pela primeira vez. Não era verdade, claro. Via-a todos os dias. Mas há uma diferença entre olhar e ver, e Rui levara quarenta e dois anos a começar a aprender essa diferença.",
      "— Estás aí? — disse Ana sem se virar. Tinha uma capacidade estranha para sentir a sua presença mesmo quando ele não fazia barulho. Era uma das coisas que Rui nunca soubera se lhe agradava ou inquietava — essa forma como ela o detectava sem esforço, como se existisse entre os dois uma frequência que ela lia com facilidade e ele só vagamente percebia existir.",
      "— Estou, — respondeu ele. Entrou na cozinha. Abriu o frigorífico, como sempre, pegou numa garrafa de água, bebeu diretamente da garrafa, como sempre. Ana não disse nada sobre isso porque deixara de dizer há anos. — Como foi o dia?,  perguntou ele, mas já com a cabeça inclinada para o telemóvel que tirara do bolso, os olhos a varrer as mensagens que tinham chegado durante o trânsito.",
      "— Normal, — disse ela. — O jantar fica pronto em vinte minutos.",
      "Era assim que as noites começavam. Com essa brevidade funcional que durante muito tempo Rui interpretara como conforto — a eficiência de dois adultos que já não precisavam de explicar cada coisa, que tinham construído uma linguagem reduzida ao essencial. Só que naquela noite, enquanto Ana colocava os pratos na mesa e ele dobrava o jornal que nem chegara a ler, Rui sentiu pela primeira vez o peso exacto daquilo que chamava conforto. Era silêncio. Era apenas silêncio, muito bem organizado.",
      "Jantaram com a televisão ligada no canal de notícias, como era hábito nas noites de semana. Ana serviu-se primeiro, Rui serviu-se a seguir. Ela bebeu água, ele bebeu o copo de vinho que se servia invariavelmente ao jantar. Falaram do apartamento do piso de baixo que estava outra vez com barulho, de um colega de Ana que estava de baixa médica, de nada que importasse. Rui respondeu com monossílabos e meia atenção, e Ana deixou de falar ao fim de pouco tempo, não com ressentimento visível, apenas com a resignação tranquila de quem já aprendeu a não esperar diferente.",
      "Depois do jantar, ela lavou os pratos. Ele ficou na sala com o telemóvel. Mais tarde, ela foi ler para o quarto. Ele ficou na sala com a televisão ligada em algo que nem estava a ver. Por volta das onze e meia, apagou a televisão e foi para o quarto. Ana já dormia, ou parecia dormir — às vezes Rui não conseguia distinguir, e nunca soubera se a diferença importava. Deitou-se com cuidado para não a acordar, ficou de costas com os olhos no tecto, e pensou no que vinha pensando há semanas, desde que algo começara a deslocar-se dentro dele como pedra que cede.",
      "Pensou: é isto. Esta é a vida que construí. E disse-o em silêncio como se fosse uma descoberta, embora soubesse que não era — que sempre estivera ali, que era ele que não estivera a olhar. A diferença é que agora olhava. E olhar mudava tudo mesmo que não mudasse ainda nada.",
      "Ana respirava ao seu lado com aquela regularidade que sempre o acalmara. Rui ficou acordado durante muito tempo. A pensar não no que havia de fazer, mas no que havia deixado de fazer durante tanto tempo que já não sabia contar os anos. Havia uma mulher a dormir a trinta centímetros de si que ele não conhecia tão bem quanto devia conhecer. Que ela não o conhecia tão bem quanto devia conhecer. E que ambos tinham aceitado isso com a naturalidade de quem aceita o tempo que faz — como algo que existe fora da vontade, como condição e não como escolha.",
      "Mas era uma escolha. Tinha sido sempre uma escolha. O medo é sempre uma escolha, mesmo quando não parece.",
    ],
    reflection: {
      prompt:
        "Há uma noite comum que guardas na memória. O que estaria por baixo da superfície?",
      journalQuestion:
        "Na tua relação mais próxima, o que é que chamas de conforto que pode ser silêncio bem organizado? Há algo que deixaste de dizer porque a outra pessoa deixou de perguntar?",
    },
    checklist: [
      "Li esta parte com atenção ao que não é dito",
      "Reconheci um padrão de silêncio na minha vida",
      "Permiti-me sentir o que esta noite comum revelou",
    ],
  },
  {
    slug: "parte-ii",
    number: 2,
    title: "Parte II",
    subtitle: "O que foi ficando",
    accentColor: "#5a8eae",
    accentBg: "#f0f5f9",
    content: [
      "Tinham-se conhecido numa conferência de trabalho em Coimbra, há doze anos. Rui lembrava-se com uma precisão que o surpreendia — a sala tinha demasiada luz artificial, as cadeiras eram desconfortáveis, e Ana estava sentada três lugares à sua direita com um caderno de argolas onde escrevia com a letra redonda e regular que ele mais tarde aprenderia a reconhecer em listas de supermercado e notas deixadas no frigorífico. Ela ria-se de algo que uma colega dizia ao ouvido, e o riso tinha uma qualidade que Rui nunca soubera descrever com precisão — não era alto nem performativo, era genuíno de um modo que parecia quase inadequado para aquele ambiente de apresentações em PowerPoint e coffee breaks com bolinhos de nata.",
      "Falaram pela primeira vez nesse coffee break. Rui aproximou-se porque sim, porque ela estava perto da mesa dos bolinhos, porque havia de haver uma primeira razão que não fosse a verdadeira razão. A verdadeira razão era que queria ouvir o riso de perto. Descobriu que ela trabalhava em recursos humanos numa empresa de engenharia, que era de Braga mas vivia há cinco anos em Lisboa, que tinha uma gata chamada Odete que mordera três veterinários distintos e não mostrava sinais de remorso. Rui riu-se e pensou que era a primeira vez em muito tempo que se ria de algo que não fosse de cortesia.",
      "Os primeiros meses foram o tipo de meses que a memória engrandece inevitavelmente, mas Rui sabia que não estaria a inventar se dissesse que algo era diferente. Havia uma leveza que ele não encontrara antes em relações — uma ausência de esforço que, ao contrário do que costumava acontecer, não o inquietava. Ana fazia-o sentir-se à vontade de um modo que ele não soube apreciar enquanto durou, porque apreciar requereria parar e olhar, e Rui não parava.",
      "O problema com Rui — ou um dos problemas, o mais antigo deles — era que nunca ficava. Não no sentido físico. Ficava sempre, chegava a horas, dormia na mesma cama, pagava metade das contas, aparecia nos jantares de família com o sorriso certo. Mas havia uma parte sua que nunca chegava completamente a nenhum sítio. Uma reserva que mantinha, não por malícia mas por hábito — pelo hábito construído em anos de aprender que estar completamente presente era perigoso de formas que não sabia articular mas que sentia como verdade no corpo.",
      "O pai de Rui era um homem que amava de formas que machucavam. Não com violência — nunca houvera violência na casa onde Rui cresceu. Mas havia uma irregularidade que era a sua própria espécie de violência: semanas de presença plena, intensa, em que o pai chegava a casa e enchia o espaço com a sua energia e os seus planos e o seu riso alto, seguidas de períodos de ausência que podiam durar dias. Não ausência física — o pai estava lá, jantava com eles, dormia na mesma casa — mas uma ausência interior que o tornava opaco e distante como vidro fosco. Rui aprendera cedo que o amor podia ser retirado sem aviso. Aprendera a não depender demasiado de ninguém para não ser apanhado desprevenido quando o amor recuasse.",
      "Ana não o sabia. Rui nunca lhe contara isso com aquelas palavras, com aquela clareza. Tinha dito o suficiente para que ela tivesse uma imagem do pai — difícil, imprevisível, mais fácil agora que era velho e a imprevisibilidade se tornara apenas excentric — mas não o suficiente para ela perceber o que aquilo lhe tinha feito. Porque Rui também não percebia completamente. Sabia apenas que havia uma parte sua que nunca baixava completamente a guarda, que mantinha sempre um milímetro de distância, que se tornava subtilmente mais difícil de alcançar quanto mais alguém se aproximava.",
      "Com Ana, ao princípio, aquilo que noutros o afastava chegou a funcionar como protecção mútua — ela tinha as suas próprias formas de reserva, as suas próprias distâncias educadas, e os dois encontraram-se num registo que parecia equilibrado. Mas os equilíbrios mudam. As pessoas mudam. E o que aconteceu nos anos que se seguiram foi que Ana foi crescendo para dentro da relação — foi abrindo, pedindo, esperando — e Rui foi ficando exactamente onde estava. Não por má vontade. Por medo. Sempre por medo, mesmo que nenhuma das palavras que usava internamente para descrever o que sentia fosse aquela.",
      "Havia coisas que Rui nunca dissera a Ana que deveria ter dito. Não declarações dramáticas — essas ele conseguia, em aniversários e momentos marcados, encontrava as palavras certas com a facilidade de quem sabe como soa o que é esperado. O que nunca conseguia dizer eram as coisas pequenas, as do dia a dia, as que requeriam estar completamente presente em vez de apenas presente em aparência. Nunca dissera: estou com medo. Nunca dissera: não sei como ficar da forma que precisas. Nunca dissera: quando te aproximas de determinada forma, algo em mim recua antes de eu decidir recuar, e odeio isso, mas não sei como parar.",
      "Em vez disso, ficara. E ficar, durante anos, pareceu suficiente. Até deixar de parecer.",
    ],
    reflection: {
      prompt: "O que aprendeste sobre amor antes de aprenderes a amar?",
      journalQuestion:
        "Que padrão de relação viste em casa quando crescias que influencia o modo como amas hoje? Onde é que isso aparece, mesmo quando não queres?",
    },
    checklist: [
      "Li com atenção a origem dos padrões de Rui",
      "Reconheci de onde vêm os meus próprios padrões relacionais",
      "Permiti-me não julgar o que foi aprendido antes de haver escolha",
    ],
  },
  {
    slug: "parte-iii",
    number: 3,
    title: "Parte III",
    subtitle: "Ana antes de desistir de pedir",
    accentColor: "#4a7e9e",
    accentBg: "#eef3f8",
    content: [
      "Houve uma altura em que Ana pedia. Não com insistência, não com drama — mas com a regularidade honesta de quem acredita que pedir é o que se faz quando se precisa de algo. Pedia conversas. Pedia que ele desligasse o telemóvel durante o jantar. Pedia que planeassem uma viagem, não necessariamente longa, apenas que planeassem alguma coisa em conjunto como dois adultos que escolhem partilhar um futuro. Pedia que ele falasse do que sentia. Não tudo — Ana era realista — mas alguma coisa, o suficiente para ela saber que havia ali um interior a que tinha acesso.",
      "Rui ouvia os pedidos. Concordava com a maior parte deles. E depois não fazia, ou fazia durante pouco tempo antes de voltar ao padrão. O telemóvel regressava à mesa ao fim de três jantares. A viagem ficava em investigação indefinida nos separadores do browser. As conversas sobre o que ele sentia terminavam depressa, não com hostilidade, mas com aquela habilidade específica que Rui tinha de dizer o suficiente para que o assunto parecesse resolvido sem que nada tivesse de facto mudado.",
      "O que Ana foi percebendo, ao longo dos anos, não foi que Rui não a amava. Era que o amor dele tinha uma forma que ela não conseguia alcançar completamente. Como uma água que enche sempre o mesmo nível num copo — podia tentar tirar água, podia tentar acrescentar, mas o nível regressava sempre ao mesmo ponto. E durante muito tempo ela tentou perceber se o problema estava no copo ou na água ou em si própria.",
      "A mãe de Ana dissera-lhe uma vez — numa conversa de fim de tarde que aconteceu sem intenção, dessas que ficam — que os homens da sua geração não tinham sido ensinados a estar presentes de certas formas. Que havia que ter paciência. Que o amor se media em actos e não em palavras e Rui era um homem de actos — estava lá, trabalhava, contribuía, não desaparecia. A mãe dizia isto com a convicção tranquila de quem passou cinquenta anos a ajustar as suas expectativas e chegou à conclusão de que o ajuste era sabedoria. Ana ouvira e sorrira e não dissera o que pensava, que era: mas eu não quero ajustar. Quero que ele chegue até mim.",
      "Havia uma noite que Ana guardava, não com amargura mas com uma espécie de clareza melancólica que a visitava às vezes. Tinham estado no Algarve — uma semana que Rui organizara para o aniversário dela, uma daquelas semanas que ele sabia fazer muito bem, a logística impecável, o hotel certo, os restaurantes reservados. Na última noite, tinham ficado na varanda depois do jantar, com o mar abaixo e o céu muito escuro e cheio, e Ana sentira que havia alguma coisa naquele momento que pedia para ser dita. Não sabia bem o quê. Apenas que havia espaço e silêncio e beleza suficiente para que a verdade pudesse sair sem assustar ninguém.",
      "Ficara à espera. Rui ficara na cadeira com o copo de vinho a olhar para o mar, o rosto relaxado, e Ana pensara: agora. Mas ele não dissera nada de particular. Dissera que o hotel era bom, que devia ter reservado para mais uma noite, que no próximo ano podiam experimentar a Croácia. Palavras correctas, gentis, que não eram as palavras. E Ana percebera nessa noite, com uma nitidez que até então não tivera, que Rui não estava a guardar coisas para dizer — que não havia reserva secreta de intimidade que ele revelaria quando o momento fosse suficientemente certo. O que via era o que havia. E o que havia era bom em muitas dimensões e incompleto naquela que mais lhe importava.",
      "Parou de pedir. Não de uma vez, não com decisão consciente — foi um processo lento como o de uma planta que para de crescer na direcção de uma luz que não chega. Continuou a amá-lo. Mas construiu um espaço seu dentro da relação — livros, a amiga Margarida com quem jantava às quartas-feiras, o curso de fotografia que fizera e que nunca mencionara a Rui com muito entusiasmo porque entusiasmo requereria que ele perguntasse mais e ela já sabia que não perguntaria. Construiu uma vida interior rica e separada, e disse a si própria que era independência. Era, em parte. Mas era também adaptação ao medo de alguém, e adaptar-se ao medo de outro é sempre uma forma de o carregar.",
      "O que Rui não sabia — o que Rui nunca soubera porque nunca perguntara de verdade — era que Ana tinha uma caixa debaixo da cama. Não metafórica: uma caixa de cartão com a tampa meio dobrada, cheia de postais e bilhetes e fotografias e um diário que ela escrevera entre os vinte e cinco e os trinta anos e abandonara sem razão aparente. Havia um postal do Algarve que ela comprara nessa última noite, na loja do hotel, e nunca enviara a ninguém. Escrevera no verso apenas: o mar estava ali e eu estava ali e foi suficiente. Não era suficiente. Mas foi o que teve.",
    ],
    reflection: {
      prompt: "O que deixaste de pedir para não te magoares de novo?",
      journalQuestion:
        "Há algum pedido que paraste de fazer numa relação importante? O que te levou a parar? E o que custou parar?",
    },
    checklist: [
      "Li com atenção o que Ana foi adaptando",
      "Reconheci uma forma de adaptação que eu própria faço",
      "Permiti-me ver o custo de ajustar expectativas em vez de pedir",
    ],
  },
  {
    slug: "parte-iv",
    number: 4,
    title: "Parte IV",
    subtitle: "A conversa que começou sem querer",
    accentColor: "#5a8aaa",
    accentBg: "#edf2f7",
    content: [
      "Aconteceu num sábado de manhã. Não havia marcação, não havia preparação — foi a espécie de conversa que começa de modo completamente oblíquo e que de repente está no centro de tudo sem que nenhum dos dois tenha escolhido exactamente esse momento. Rui estava a fazer café e Ana entrou na cozinha com o casaco já vestido, a carteira na mão, a dizer que ia ao mercado do bairro se ele precisava de alguma coisa.",
      "Ele disse que não, e depois: — Vou contigo.",
      "Ana ficou parada um momento. Não muito — um segundo, talvez dois — mas Rui notou a pausa porque estava a olhar para ela de uma forma nova, com aquela atenção que vinha desenvolvendo desde que algo se deslocara dentro dele. Ela disse — Está bem, — com um tom que era neutro mas que tinha qualquer coisa lá dentro, uma hesitação muito pequena, e saíram.",
      "O mercado ficava a dez minutos a pé. Fizeram o caminho com o tipo de conversa que era habitual entre eles — quem precisava de qualquer coisa, que barulho continuava a vir do apartamento debaixo, se tinham sabão da loiça. Rui segurava a sacola. Ana parava nas bancas com a atenção selectiva de quem sabe o que procura. Era normal. Era completamente normal. E foi porque era completamente normal que Rui disse o que disse.",
      "— Vens ao mercado todos os sábados. — Disse. Não como pergunta.",
      "— Quase todos, sim.",
      "— E eu nunca venho contigo.",
      "Ana não respondeu de imediato. Estava a escolher tomates, e continuou a escolher tomates, mas Rui sentiu que a resposta estava a ser pesada antes de ser dita. — Não, — disse ela por fim. — Não costumas vir.",
      "— Porquê?, — disse Rui. E depois, antes que ela pudesse responder com alguma coisa gentil e não comprometedora, acrescentou: — Não me perguntes porquê eu não venho. Pergunto-me porquê tu nunca me pedes para vir.",
      "Esta foi a frase. Rui não a tinha planeado e surpreendeu-se ao ouvi-la sair. Ana poisou os tomates muito devagar. Havia uma mulher mais velha a dois metros deles a inspecionar pimentos, e uma criança que corria com um balão, e o mercado continuava com o seu ruído habitual completamente indiferente ao que estava a acontecer entre aquelas duas pessoas junto às hortaliças.",
      "— Porque aprendi que não adiantava, — disse Ana. Disse em voz baixa, sem crueldade, mas com uma precisão que era mais difícil de suportar do que crueldade alguma teria sido.",
      "Rui ficou com aquilo. Ficaram em silêncio durante um momento que seria difícil de medir. Ana pegou nos tomates e continuou pelo mercado, e ele foi atrás, a segurar a sacola, e nenhum dos dois disse nada por um tempo que pareceu longo. Mas a frase estava no ar entre eles como algo com peso físico. Não podia ser desfeita. Tinha sido dita no tom de quem não está a atacar — no tom de quem descreve um facto com a cansada exactidão de quem o conhece há muito.",
      "— Desde quando, — disse Rui, mais tarde, quando estavam a caminho de casa. Não precisou de especificar.",
      "Ana pensou. — Há muitos anos. Não consigo dizer exactamente quando. Foi gradual.",
      "— Gradual como.",
      "— Como quando deixas de regar uma planta. Não decides matá-la. Só vai acontecendo.",
      "Chegaram ao apartamento. Ana arrumou o que comprara em silêncio, com os movimentos eficientes de sempre, e Rui ficou encostado ao balcão da cozinha a olhar para ela como olhara na semana anterior quando chegara a casa e ela estava de costas para ele. Excepto que agora havia qualquer coisa diferente no ar — uma fisga, como se algo que estivera muito tenso durante muito tempo tivesse cedido apenas um milímetro, o suficiente para toda a gente sentir.",
      "— Tenho de te dizer uma coisa, — disse Rui.",
      "Ana não se virou. Continuou a arrumar. — Diz.",
      "— Não sei como começar.",
      "Ela virou-se então. Ficou a olhá-lo com um olhar que ele não sabia bem ler — não era esperança, não era ceticismo, era qualquer coisa mais cautelosa do que qualquer uma das duas. — Começa pelo princípio, — disse. — Ou por qualquer sítio. Mas começa.",
    ],
    reflection: {
      prompt:
        "Há uma frase que alguém te disse que mudou o peso do ar entre vocês. Qual foi?",
      journalQuestion:
        "Há algo que aprendeste que não adiantava pedir ou dizer numa relação importante? O que aconteceria se voltasses a tentar?",
    },
    checklist: [
      "Li com atenção o momento em que a verdade escorregou para fora",
      "Reconheci uma conversa que deveria ter acontecido há mais tempo",
      "Permiti-me sentir o peso de um facto dito com precisão e sem crueldade",
    ],
  },
  {
    slug: "parte-v",
    number: 5,
    title: "Parte V",
    subtitle: "O que o medo cala",
    accentColor: "#4a7a9a",
    accentBg: "#ebf1f6",
    content: [
      "Sentaram-se na mesa da cozinha. Não foi uma decisão — aconteceu como acontecem as coisas importantes, com a inevitabilidade das que tinham de acontecer. Ana preparou dois cafés. Rui ficou com os cotovelos na mesa, as mãos à frente, a olhar para o padrão da toalha. Havia luz de tarde a entrar pela janela e um pombo em cima do telhado do edifício em frente que se movia de quando em quando com aquela agitação sem propósito dos pombos.",
      "— Tenho medo, — disse Rui. Disse sem preâmbulo, sem elaboração, apenas as duas palavras no ar entre eles. Ana não respondeu imediatamente. Ficou com o copo de café nas mãos e esperou. — Não sei se é a palavra certa. Tenho medo de uma forma que nunca soube nomear. De ficar preso. De decepcionar. De que o que está bem agora deixe de estar bem e eu não ter como evitar. Tenho medo de que se eu der tudo o que tenho isso me torne dependente de um modo que não sei gerir se as coisas mudarem.",
      "Parou. Havia mais, mas parar aqui era já mais do que dissera em anos e havia uma parte sua que queria verificar se o tecto caía. O tecto não caiu. Ana ficou exactamente onde estava, a olhá-lo com aquela expressão cautelosa, e Rui continuou.",
      "— O meu pai era assim. Ou talvez não fosse assim — talvez eu tenha aprendido coisas erradas com ele. Mas aprendi que o amor chega e vai embora sem avisar. Aprendi a não estar completamente lá para não ser apanhado quando for embora. E fiz isso contigo durante anos e só agora estou a perceber o que custou. O que te custou.",
      "— Rui, — disse Ana. Era a primeira vez que falava desde que ele começara, e havia qualquer coisa na forma como disse o nome — não com ternura excessiva nem com ressentimento — que o fez levantar os olhos dela.",
      "— Eu sei, — disse ela. — Eu vi. Não tudo — não percebia onde vinha. Mas via o recuo. Via quando chegavas a um ponto e voltavas atrás. E durante muito tempo pensei que era eu. Que havia algo em mim que te fazia recuar. Que se fosse diferente, menos intensa, mais fácil, tu ficarias completamente.",
      "— Não és tu, — disse Rui imediatamente.",
      "— Eu sei que não sou eu. Agora sei. — Ana pousou o copo. — Mas o que também sei é que eu parei de tentar alcançar-te. E também não é uma coisa pequena de dizer. Parei de te convidar para vir ao mercado. Parei de te pedir que desligasses o telemóvel. Parei de marcar viagens porque ficava à espera que tu marcasses e tu não marcavas e a viagem ficava por marcar. E disse a mim própria que era independência. Que não precisava que tu fizesses essas coisas. Mas a verdade é que precisava. E parei de dizer porque cansou-me não ser ouvida.",
      "A palavra caiu sobre a mesa com um peso silencioso. Cansou. Rui ficou com ela, não tentou afastá-la nem minimizá-la. Era isso. Era exactamente isso. Havia uma mulher à sua frente que o amava e que estava cansada de um amor que ela própria tinha aprendido a fazer funcionar com menos do que precisava.",
      "— Que mais?, — disse ele. — Que mais eu não ouvi.",
      "Ana respirou fundo. Havia coisas que não dissera há muito tempo e que agora que a porta se abrira encontravam o caminho por si próprias, com aquela urgência das coisas que esperam. — Que tenho saudade de ti mesmo quando estás aqui. Que às vezes olho para ti ao jantar e sinto que estás a pensar em quinhentas coisas que não têm nada a ver comigo e que se te perguntasse o que estás a pensar dirias que é trabalho ou nada, e eu ficaria com isso. Que a semana do Algarve foi das mais bonitas da minha vida mas que naquela última noite estava à espera que dissesses alguma coisa que nunca disseste e fui dormir com aquilo. Que há doze anos que não sei bem o que sentes, o que queres, o que temes. Que às vezes fico a pensar se me conheces de verdade ou se apenas te habituaste a mim.",
      "Rui ficou em silêncio. Havia um tipo de silêncio que era fuga e um tipo de silêncio que era absorção, e este era o segundo — estava a ouvir cada palavra com uma atenção que lhe doía um pouco, não porque as palavras fossem injustas mas porque eram exactas. Porque reconhecia em cada uma delas a prova de anos de distância que nunca chamara por esse nome.",
      "— Conheço-te, — disse por fim. — Conheço-te de formas que não sei articular. Mas tens razão que nunca te pedi para me contares o que estava na caixa debaixo da cama.",
      "Ana levantou os olhos para ele de forma súbita. — Qual caixa.",
      "— Não sei que caixa. Mas há uma, não há? Há sempre uma caixa nas pessoas. E eu nunca perguntei pela tua.",
      "Ana ficou em silêncio. Depois os olhos encheram-se — não de choro imediato, mas dessa forma em que os olhos ficam de repente brilhantes quando alguma coisa é dita que era verdade e estava à espera de ser reconhecida. — Há uma caixa, — disse ela. E foi a primeira vez em doze anos que disse isso.",
    ],
    reflection: {
      prompt: "O que disseste que devias ter dito há muito? O que ainda não disseste?",
      journalQuestion:
        "Há uma verdade que guardas sobre uma relação importante que nunca disseste completamente? O que tem impedido essa verdade de sair?",
    },
    checklist: [
      "Li com atenção o que ficou por dizer durante anos",
      "Reconheci algo que eu própria guardo sem ter dito",
      "Permiti-me sentir o peso de ser finalmente ouvida — ou de não o ser ainda",
    ],
  },
  {
    slug: "parte-vi",
    number: 6,
    title: "Parte VI",
    subtitle: "Gestos pequenos, mudanças reais",
    accentColor: "#5a8aaa",
    accentBg: "#edf2f7",
    content: [
      "As coisas não se resolveram nessa tarde. Rui e Ana sabiam melhor do que iludir-se de que uma conversa desfaz doze anos de padrões — Ana porque era realista por natureza e porque já tinha o historial para o saber, Rui porque era uma das primeiras coisas que aprendera no processo lento de olhar para si próprio: que perceber não é o mesmo que mudar, e que mudar é um trabalho que acontece não em revelações mas em repetições, em gestos que se fazem de novo e de novo até se tornarem novos.",
      "Mas algo mudara. Havia uma diferença entre ter dito e não ter dito, e essa diferença era real mesmo que nenhum dos dois soubesse ainda exactamente o que fazer com ela.",
      "Nos dias seguintes, Rui foi ao mercado no sábado seguinte. Chegou à cozinha com o casaco já vestido antes de Ana se preparar para sair e ela virou-se para ele com aquela hesitação breve que ele agora reconhecia — verificando se era real, se havia outra razão, se havia o catch que o tornava não no que parecia. Não havia. — Pronta?, — disse ele, e ela disse que sim, e saíram.",
      "Não conversaram sobre nada de especial no mercado. Escolheram frutas, discutiram brevemente sobre um tipo de queijo, pararam para tomar um café num café pequeno que Rui nunca entrara porque nunca passava por ali. Ana pediu a mesma coisa que pedia sempre — uma bica e um copo de água — e Rui reparou que sabia isso, que havia muitas coisas destas que sabia sobre ela sem as ter registado conscientemente, e que havia muitas outras que não sabia porque nunca perguntara.",
      "— Conta-me sobre a caixa, — disse ele. Sem preâmbulo, como a semana anterior na cozinha.",
      "Ana olhou para ele. — Aqui?",
      "— Ou onde quiseres. Mas conta.",
      "E ela contou. Não tudo de uma vez — a caixa era grande para uma única conversa num café pequeno num sábado de manhã. Mas contou o diário que deixara de escrever aos trinta anos sem razão aparente, e o postal do Algarve, e o curso de fotografia que fizera e que guardara para ela como se fosse uma coisa demasiado sua para partilhar. E Rui ouviu. Ouviu sem o telemóvel em cima da mesa, sem a atenção dividida, com aquela presença que Ana deixara de esperar e que agora estava ali, imperfeita e real.",
      "Havia coisas que Rui fez naquelas semanas que eram pequenas em escala e significativas em intenção. Mandou uma mensagem de tarde a perguntar como estava o dia — não no fim do dia quando já estavam os dois em casa, mas de tarde, sem razão funcional, apenas porque lembrou. Propôs que na semana seguinte fossem ao cinema ver um filme que Ana mencionara há meses numa conversa que ele evidentemente guardara mesmo sem o saber. Numa noite, deitado, virou-se para ela antes de adormecer e disse: — Conta-me uma coisa que nunca me contaste. Ana ficou em silêncio durante um momento que Rui aguentou sem tentar preencher, e depois ela disse-lhe sobre a avó paterna, que morrera quando Ana tinha sete anos e de quem raramente falava, e que lhe ensinara a fazer pão e que ficara com o avental dela guardado num saco de plástico até ao dia em que o saco se rompeu e o avental ficou com cheiro a plástico em vez de cheiro a avó. Rui ficou a ouvir até ao fim. Depois disse — Tenho pena de nunca ter conhecido esse avental. — E Ana riu-se no escuro com aquele riso que ele ouvira pela primeira vez numa sala com demasiada luz artificial em Coimbra, e que durante doze anos não ouvira com suficiente frequência.",
      "Não era fácil. Havia noites em que Rui recuava — em que o telemóvel voltava à mesa, em que chegava a casa e atravessava o corredor sem se deter, em que a conversa ficava superficial não por má vontade mas porque o hábito é uma corrente muito forte. Nesses momentos, às vezes Ana dizia qualquer coisa, um simples — estás?, — que era código para onde foste. E Rui aprendia a reconhecer o código e a responder com honestidade: — Fui. Mas estou aqui.",
      "A caixa debaixo da cama foi parar a cima da cama uma tarde em que choveu muito e nenhum dos dois tinha planos. Ana abriu-a e foram os dois, sentados com as costas encostadas à cabeceira, a olhar os postais e as fotografias e o diário com a capa desgastada. Rui leu algumas páginas em voz alta, com a permissão de Ana, e parou numa passagem em que ela escrevera, aos vinte e oito anos: quero alguém que me faça sentir que o que penso importa não apenas porque sou eu que penso mas porque eles querem mesmo saber. Rui ficou com aquilo. — Ainda queres isso?,  perguntou. Ana disse que sim. — Então eu quero aprender a dar isso, — disse ele. Era uma das frases mais honestas que dissera na vida, porque não dizia que já sabia — dizia que queria aprender.",
      "Ana pousou o diário e ficou em silêncio durante um momento. Depois disse: — Isso chega. Que queiras aprender chega.",
    ],
    reflection: {
      prompt: "Qual é o gesto pequeno que demonstraria que estás realmente presente?",
      journalQuestion:
        "Há uma pessoa na tua vida a quem podes fazer uma pergunta hoje que nunca fizeste? Uma pergunta que diz: quero mesmo saber. O que te impede?",
    },
    checklist: [
      "Li com atenção os gestos que começam a mudar um padrão",
      "Identifiquei um gesto pequeno que posso fazer diferente",
      "Permiti-me acreditar que querer aprender é suficiente para começar",
    ],
  },
  {
    slug: "epilogo",
    number: 7,
    title: "Epílogo",
    subtitle: "O que fica depois do silêncio",
    accentColor: "#6a9dbe",
    accentBg: "#f2f7fb",
    content: [
      "O nó não desapareceu. Rui e Ana sabiam isso — sabiam-no com a maturidade de duas pessoas que tinham vivido o suficiente para desconfiar das resoluções demasiado limpas. O medo de Rui não se foi embora numa tarde de sábado na cozinha. A distância que Ana construíra para se proteger não se desmantelou de um dia para o outro só porque ele apareceu no mercado e perguntou pela caixa. Os padrões têm raízes longas. As mudanças reais são lentas e repetitivas e às vezes retrocedem antes de avançar.",
      "Mas havia uma diferença entre o nó que existia antes e o nó que existia agora. Antes, o nó estava escondido debaixo da superfície de uma vida funcional, a puxar no escuro, a criar tensão que nenhum dos dois nomeava. Agora estava visível. Tinham olhado para ele. Tinham dito as palavras que o descreviam — não todas, mas as essenciais, as que precisavam de sair para que os dois soubessem que falavam da mesma coisa.",
      "Há uma diferença entre guardar silêncio porque não há nada a dizer e guardar silêncio depois de ter dito. O segundo silêncio é diferente. É mais leve. Não está cheio de palavras retidas — está cheio de espaço, que é uma coisa completamente diferente e muito mais habitável.",
      "Rui aprendera que o medo que carregava não era sobre Ana — era anterior a ela, anterior à relação, era algo que trouxera consigo do sítio onde crescera e que depositara no espaço entre os dois sem o saber. Não era culpa sua no sentido de ter feito algo de mal — mas era responsabilidade sua no sentido de que só ele podia trabalhar nele. E trabalhar nele era o que estava a fazer, um sábado de cada vez, uma conversa de cada vez, uma pergunta de cada vez sobre a caixa e o diário e o avental que cheirava a avó.",
      "Ana aprendera que os ajustes que fizera não eram fraqueza — eram inteligência, uma forma de continuar a amar num espaço que não tinha a forma que precisava. Mas também aprendera que havia uma diferença entre adaptar-se e aceitar. Adaptar-se é gerir o que existe. Aceitar é dizer: isto é o suficiente para mim. Ana não estava disposta a dizer que era suficiente. E dizer isso — mesmo sem saber completamente o que viria a seguir — era a coisa mais honesta que fizera nos últimos anos.",
      "Houve um momento, meses depois daquele sábado no mercado, que Rui guardou com o tipo de atenção que se dá às coisas que importam. Estavam a jantar — uma sexta-feira, não um dia especial — e ele desligou a televisão a meio do jantar sem que ninguém o pedisse. Ana olhou para ele. Ele disse apenas: — Estava a impedir-me de te ouvir. — E ela disse: — Que queres ouvir? — E ele disse: — O que quiseres contar. — E ela contou qualquer coisa — não lembrava o quê, mais tarde, o conteúdo não era o que importava — e Rui ouviu com toda a atenção que tinha.",
      "Não era a vida que tinham imaginado. Era melhor em alguns aspectos e mais difícil noutros. Era real de uma forma que a anterior não era — e real, descobriram, era mais sustentável do que perfeito, mais habitável do que funcional, mais próximo do amor verdadeiro do que os doze anos de superfície bem organizada que os tinham precedido.",
      "O nó do silêncio não desatou. Transformou-se. De coisa que puxava no escuro para coisa que reconheciam à luz. E reconhecer à luz é o único lugar onde dois podem realmente trabalhar juntos no que os une e no que os separa.",
      "Rui e Ana continuaram. Com o medo, com os padrões, com os recuos e os avanços. Continuaram com mais palavras do que antes. E as palavras, mesmo imperfeitas, mesmo lentas, eram o fio que os dois tinham decidido segurar — não para puxar um ao outro para sítio nenhum, mas para não se perderem na mesma casa.",
    ],
    reflection: {
      prompt:
        "O nó não desaparece. O que muda é se o vês ou não. O que estás a começar a ver?",
      journalQuestion:
        "Depois de leres este Nó, o que mudou na forma como vês o silêncio nas tuas relações? Há algo que queres começar a dizer?",
    },
    checklist: [
      "Li o epílogo com atenção ao que permanece e ao que se transforma",
      "Reconheci um nó na minha vida que precisa de ser visto, não resolvido",
      "Permiti-me terminar este livro com uma pergunta em vez de uma resposta",
    ],
  },
];

export default { bookMeta, chapters };
