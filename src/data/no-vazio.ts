// O Nó do Vazio
// Lena + Sofia — O desejo que esvaziou a amizade
// Véu 6: Desejo
// Regra: Só lês este Nó depois de completares o Espelho do Desejo

import type { Chapter } from "./ebook";

export const bookMeta = {
  title: "O Nó do Vazio",
  subtitle: "O desejo que esvaziou a amizade",
  author: "Vivianne dos Santos",
  dedication:
    "Para quem amou uma amiga com fome. E para quem foi amada até ficar vazia.",
  intro: [
    "Há amizades que parecem inquebraveis. Amizades que sobrevivem a mudanças de cidade, a casamentos, a anos sem se verem. Amizades que são o chão quando tudo o resto treme. Lena e Sofia tinham esse tipo de amizade — ou pensavam que tinham, até que o desejo de uma começou a consumir o que a outra tinha para dar.",
    "Não foi um desejo romântico. Não foi um desejo sexual. Foi algo mais subtil e por isso mais difícil de nomear: o desejo de ter o que a outra tem. O desejo de viver a vida da outra. O desejo disfarçado de admiração que é, no fundo, fome — a fome de quem sente que a própria vida não é suficiente e procura nos outros o que não encontra em si.",
    "Lena admirava Sofia. Admirava a sua leveza, a sua capacidade de ser feliz com pouco, a forma como entrava numa sala e as pessoas gravitavam à volta dela sem esforço. E essa admiração, que durante anos pareceu saudável e bonita, foi-se transformando em algo mais escuro: numa necessidade de absorver, de imitar, de preencher com a presença de Sofia o vazio que existia dentro de Lena e que nenhuma conquista pessoal conseguia encher.",
    "Este livro é sobre o fio invisível entre admirar e consumir. Sobre o que acontece quando uma amizade se torna um espelho onde uma pessoa procura ver-se e a outra começa a desaparecer. E sobre a possibilidade, dolorosa mas necessária, de amar sem devorar.",
  ],
};

export const chapters: Chapter[] = [
  {
    slug: "parte-i",
    number: 1,
    title: "Parte I",
    subtitle: "A amiga que brilhava",
    accentColor: "#c4905a",
    accentBg: "#faf5ef",
    content: [
      "Sofia era o tipo de pessoa que as pessoas descrevem dizendo que tem luz. Não era bonita no sentido convencional — tinha um rosto irregular, olhos demasiado grandes para a cara, cabelo que fazia o que queria independentemente do que ela quisesse — mas havia nela uma qualidade que atraía, uma forma de estar no mundo que parecia natural e que custava a todos os outros um esforço imenso para imitar.",
      "Sofia ria com facilidade. Falava com estranhos. Dançava mal e sem vergonha. Chegava atrasada a tudo mas ninguém se importava porque quando chegava, a sala ficava melhor. Tinha o dom de fazer as pessoas sentirem-se vistas — não com elogios ou atenção performativa, mas com uma presença genuína, um interesse real pelo que cada pessoa tinha dentro de si. Quando Sofia perguntava como estás, esperava pela resposta. Quando alguém lhe contava algo, ouvia com o corpo inteiro.",
      "Lena conhecia-a desde os dezasseis anos. Tinham-se sentado lado a lado numa aula de Filosofia no liceu, e a amizade nascera com a velocidade e intensidade que só as amizades de adolescência têm — em duas semanas eram inseparáveis, em dois meses conheciam os segredos uma da outra, em dois anos tinham construído uma língua própria feita de referências e piadas que mais ninguém compreendia.",
      "Durante o liceu e a faculdade, a amizade funcionava. Eram diferentes — Lena era estudiosa, ambiciosa, planeava o futuro com gráficos mentais; Sofia vivia ao dia, seguia impulsos, mudava de curso duas vezes e acabou por não acabar nenhum. Mas as diferenças complementavam-se. Lena dava a Sofia estrutura e Sofia dava a Lena leveza. Era um equilíbrio que ambas sentiam como natural e que nenhuma das duas questionava.",
      "O desequilíbrio começou devagar. Tão devagar que nenhuma notou. Começou quando Lena terminou o curso, arranjou emprego, subiu na carreira, comprou apartamento, casou, fez tudo o que a sociedade define como sucesso — e sentiu que nada disso a preenchia. E quando olhava para Sofia — Sofia que não tinha carreira, que vivia num T1 alugado, que não poupava, que não planeava, que estava sempre bem — sentia uma inveja que se recusava a chamar inveja e a que chamava admiração.",
      "***",
      "A admiração é perigosa quando é fome disfarçada. Lena admirava a leveza de Sofia. Admirava a sua capacidade de estar presente, de rir, de não precisar de validação externa para se sentir suficiente. Mas a admiração não era contemplativa — era voraz. Lena não queria apenas observar a leveza de Sofia. Queria absorvê-la. Queria ser Sofia. E como não podia ser Sofia, fazia a segunda melhor coisa: estar permanentemente perto dela.",
      "Ligava todos os dias. Às vezes duas, três vezes. Combinava programas todas as semanas. Quando Sofia cancelava — porque tinha outros planos, outros amigos, outras coisas na vida — Lena sentia uma dor desproporcional que disfarçava de compreensão mas que era, na verdade, rejeição. E quando estavam juntas, Lena absorvia. Absorvia as opiniões de Sofia, as recomendações de Sofia, a forma como Sofia se vestia e falava e existia. Começou a usar expressões que eram de Sofia. A gostar de músicas que Sofia gostava. A opinar sobre coisas usando as palavras de Sofia como se fossem suas.",
      "Sofia não percebia o que estava a acontecer. Via em Lena uma amiga dedicada, presente, fiel. Sentia-se grata pela constância de Lena, pela forma como ela estava sempre ali, sempre disponível, sempre a querer vê-la. Não percebia que a presença de Lena tinha mudado de qualidade — que já não era a presença de alguém que quer estar, mas a presença de alguém que precisa de estar. Que a amizade se transformara, para Lena, numa fonte de abastecimento. E que Sofia, sem saber, estava a ser consumida.",
    ],
    reflection: {
      prompt:
        "Há alguém na tua vida que admiras de uma forma que se parece mais com fome do que com contemplação?",
      journalQuestion:
        "Quando admiras alguém intensamente, o que sentes no corpo? É um sentimento que te expande ou que te diminui? O que diz isso sobre a origem dessa admiração?",
    },
    checklist: [
      "Li esta parte reconhecendo a diferença entre admirar e absorver",
      "Identifiquei relações na minha vida onde a admiração pode ser fome",
      "Permiti-me questionar se há alguma pessoa que uso para me preencher",
    ],
  },
  {
    slug: "parte-ii",
    number: 2,
    title: "Parte II",
    subtitle: "O vazio por baixo do sucesso",
    accentColor: "#b58050",
    accentBg: "#f8f2ea",
    content: [
      "Lena tinha trinta e seis anos, um cargo de directora numa consultora, um apartamento com vista para o rio, um marido que era bom e que a amava de uma forma estável e previsível que ela apreciava sem nunca ter sentido que era suficiente. Na superfície, a vida de Lena era invejável. No fundo — no fundo que ela visitava apenas nas insónias das três da manhã e nos intervalos entre uma reunião e outra — havia um vazio que nada do que conquistara conseguia preencher.",
      "O vazio não era novo. Estava lá desde que se lembrava — uma sensação de incompletude, como um quarto a que falta uma parede, uma frase a que falta o verbo. Lena tentara preenchê-lo com tudo o que a sociedade sugere: trabalho, dinheiro, reconhecimento, relações, objectos, viagens. Cada nova conquista oferecia um alívio temporário — o prazer breve de preencher o espaço — seguido pelo regresso inevitável do vazio, que voltava sempre, intacto, como maré que recua e retorna.",
      "Sofia não tinha esse vazio. Ou se tinha, não o sentia da mesma forma. Sofia vivia com pouco e parecia cheia. Ria com pouco e parecia satisfeita. Existia com uma completude que Lena não compreendia e que por isso desejava com uma intensidade que confundia com amizade.",
      "— Como é que fazes? — perguntou Lena a Sofia uma vez, num jantar em que beberam vinho a mais e a conversa desceu para sítios que normalmente evitavam. — Como é que estás sempre bem? Eu tenho tudo o que supostamente se deve ter e sinto que me falta qualquer coisa. Tu não tens quase nada e pareces completa.",
      "Sofia olhou para ela com aquela atenção atenta que era a sua marca.",
      "— Não tenho quase nada? — repetiu, sem acusação, apenas com curiosidade.",
      "— Não quis dizer isso. Quis dizer — materialmente. Carreira. Estabilidade.",
      "— Eu sei o que quiseste dizer. E a resposta é: não sei. Não sei como é que faço. Simplesmente estou. Não penso muito nisso.",
      "Não penso muito nisso. A frase que Lena ouviu como prova de que havia em Sofia algo especial, algo que ela não tinha e precisava de ter. Não penso muito nisso — a frase de quem vive em vez de analisar, de quem é em vez de tentar ser, de quem existe no presente enquanto Lena existia permanentemente no futuro ou no passado, nunca no agora, nunca no suficiente.",
      "***",
      "O desejo de Lena não era mau. Não era manipulador. Não era consciente. Era a manifestação de um vazio que ela não sabia como preencher a partir de dentro e que por isso tentava preencher a partir de fora — e Sofia era a fonte mais acessível, mais constante, mais generosa. Sofia dava sem medir, sem cobrar, sem se proteger. Dava presença, atenção, riso, tempo. E Lena recebia tudo, e nada era suficiente, e quanto mais recebia mais precisava, como quem bebe água salgada e sente cada vez mais sede.",
      "O problema de preencher um vazio interno com alguém externo é que o vazio não se enche — expande-se. Cada vez que Lena estava com Sofia e se sentia bem, e depois voltava para casa e se sentia vazia de novo, o contraste tornava o vazio mais insuportável. Sofia era a prova de que era possível sentir-se cheia. E a sua ausência era a prova de que Lena não conseguia sentir isso sozinha. E essa dependência — silenciosa, não nomeada, disfarçada de amizade intensa — ia, aos poucos, desgastando a única coisa verdadeira que existia entre elas.",
    ],
    reflection: {
      prompt:
        "Já tentaste preencher um vazio teu com a presença de alguém?",
      journalQuestion:
        "O que é que o sucesso não te deu que pensavas que ia dar? Onde é que o vazio ainda existe, apesar de tudo o que conquistaste?",
    },
    checklist: [
      "Li esta parte sentindo o vazio que nenhuma conquista preenche",
      "Reconheci momentos em que usei alguém como fonte de preenchimento",
      "Permiti-me questionar se a minha admiração por alguém é fome disfarçada",
    ],
  },
  {
    slug: "parte-iii",
    number: 3,
    title: "Parte III",
    subtitle: "O dia em que Sofia disse não",
    accentColor: "#a07040",
    accentBg: "#f5efe5",
    content: [
      "Começou com um cancelamento. Sofia cancelou um jantar que tinham combinado há uma semana — um jantar que para Lena era o ponto alto da semana e para Sofia era um de vários compromissos possíveis. Sofia mandou mensagem a dizer que uma amiga do trabalho estava em crise e precisava dela, e Lena respondeu claro, vai, com a compreensão automática que usava para esconder a dor que sentia cada vez que Sofia escolhia outra pessoa.",
      "Mas alguma coisa mudou nessa noite. Lena ficou em casa, sozinha — o marido estava numa viagem de trabalho — e sentiu o vazio com uma intensidade que a assustou. Não era tristeza. Não era raiva. Era fome. Uma fome de presença tão forte que lhe doía no corpo, que a fazia andar de divisão em divisão do apartamento à procura de algo que a ancorasse, que a fizesse sentir que existia, que tinha substância, que não era apenas um contorno vazio a flutuar num espaço demasiado grande.",
      "Pegou no telemóvel. Quase ligou a Sofia. Não ligou — não porque não quisesse, mas porque uma parte de si, a parte que ainda conseguia ver com clareza, percebeu que ligar naquele momento seria o equivalente emocional de pedir esmola. E a vergonha dessa percepção foi tão intensa que pousou o telefone e se sentou no chão da cozinha e ficou ali, no mosaico frio, a respirar, a tentar compreender o que se passava dentro de si.",
      "O que se passava era isto: Lena precisava de Sofia de uma forma que não era saudável. Precisava dela como se precisa de oxigénio, de alimento, de algo essencial à sobrevivência. E essa necessidade, que ela chamava de amizade profunda, era na verdade o sintoma de um vazio que existia muito antes de Sofia aparecer e que continuaria a existir depois de Sofia, porque não era sobre Sofia. Era sobre Lena. Sobre o que faltava dentro de Lena. Sobre o buraco que nenhuma pessoa, por mais luminosa que fosse, poderia tapar.",
      "***",
      "Na semana seguinte, Sofia disse não de novo. Desta vez não era um cancelamento — era um limite. Lena propusera que fossem juntas a um retiro de fim-de-semana, e Sofia disse que precisava desse fim-de-semana para estar sozinha. Não deu explicações elaboradas. Não pediu desculpa. Simplesmente disse: preciso de estar comigo.",
      "Lena recebeu a mensagem como um murro. Não pelo que Sofia disse, mas pelo que significava: que Sofia podia estar sem ela. Que Sofia não precisava dela da mesma forma. Que a amizade, para Sofia, era uma parte da vida e não a vida inteira. Que Sofia tinha um interior habitado, cheio, suficiente, e que Lena era bem-vinda nesse interior mas não era essencial.",
      "E essa não-essencialidade doeu mais do que qualquer rejeição romântica, mais do que qualquer fracasso profissional, mais do que qualquer das feridas que Lena carregava. Porque confirmava o que ela sempre temera: que o seu amor — o seu amor intenso, voraz, desesperado — não era retribuído na mesma medida. Não porque Sofia não a amasse. Mas porque Sofia se amava o suficiente para não precisar de Lena da forma que Lena precisava dela.",
      "Nessa noite, Lena chorou. Não pela rejeição. Pelo vazio. Pela percepção, finalmente nítida, de que tinha passado vinte anos a usar uma amizade como penso rápido para uma ferida que precisava de sutura. E de que, ao fazê-lo, não estava a amar Sofia. Estava a consumir Sofia.",
    ],
    reflection: {
      prompt:
        "Já sentiste a dor de perceber que alguém que amas não precisa de ti da mesma forma?",
      journalQuestion:
        "Quando alguém que amas te diz não, o que ouves? Ouves o não, ou ouves não és suficiente? De onde vem essa tradução?",
    },
    checklist: [
      "Li esta parte reconhecendo a diferença entre amar e precisar",
      "Identifiquei momentos em que um não me doeu mais do que devia",
      "Permiti-me ver a fome por baixo da amizade intensa",
    ],
  },
  {
    slug: "parte-iv",
    number: 4,
    title: "Parte IV",
    subtitle: "O que Sofia carregava em silêncio",
    accentColor: "#8a6030",
    accentBg: "#f2ebe0",
    content: [
      "Sofia não era tão leve quanto parecia. Ninguém é. Mas a imagem que Lena fizera dela — a mulher completa, a mulher luminosa, a mulher que não tem vazio — era uma projecção, e como todas as projecções, dizia mais sobre quem projectava do que sobre quem recebia a projecção.",
      "Sofia tinha os seus próprios buracos. Tinha crescido com um pai alcoólico que entre a sobriedade e a embriaguez era duas pessoas diferentes, e que lhe ensinara, sem querer, que o amor é imprevisível e que a única forma de sobreviver à imprevisibilidade é não depender de ninguém. A leveza de Sofia — aquela leveza que Lena tanto admirava — não era ausência de peso. Era a forma que Sofia encontrara de se mover apesar do peso. Não apesar de — por cima de, ao lado de, à volta de. Sofia não transcendia a dor. Dançava com ela.",
      "E a amizade com Lena, nos últimos anos, tinha-se tornado mais um peso que Sofia carregava sem dizer. Sentia a intensidade de Lena. Sentia o olhar de Lena sobre ela — um olhar que começara como admiração e se transformara em algo que Sofia não sabia nomear mas que reconhecia no corpo: a sensação de ser consumida. De que cada encontro com Lena a deixava mais vazia em vez de mais cheia. De que estava a dar algo que não podia dar — não atenção, não tempo, mas algo mais essencial: a própria substância.",
      "— Quando estou com a Lena, sinto que ela me bebe — disse Sofia a uma amiga, e imediatamente sentiu culpa pela frase, porque parecia cruel e ingrata, e Lena era tudo menos cruel. — Não sei explicar. É como se ela quisesse entrar dentro de mim e ser eu. E eu fico cada vez mais vazia.",
      "A amiga olhou para ela.",
      "— Já lhe disseste?",
      "— Como é que se diz uma coisa destas? Como é que dizes a alguém que te ama que o amor dela te esgota?",
      "***",
      "Sofia começou a proteger-se. Não com hostilidade — nunca seria hostil com Lena — mas com distância. Os intervalos entre respostas às mensagens foram ficando maiores. Os programas tornaram-se menos frequentes. Sofia começou a dizer não com mais facilidade, e cada não era um acto de sobrevivência que Lena interpretava como abandono.",
      "O ciclo era perverso na sua simetria: quanto mais Sofia se protegia, mais Lena se agarrava. Quanto mais Lena se agarrava, mais Sofia se protegia. E entre elas, no espaço que antes fora preenchido por riso e cumplicidade e a linguagem privada de vinte anos de amizade, crescia algo que nenhuma das duas queria mas que ambas alimentavam: ressentimento. O ressentimento de Lena por se sentir rejeitada. O ressentimento de Sofia por se sentir sugada. Dois ressentimentos legítimos, dois sofrimentos reais, e nenhuma forma de os resolver sem primeiro olhar para o nó que os prendia.",
      "O nó era este: Lena amava Sofia com fome. Sofia amava Lena com culpa. A fome de uma e a culpa da outra alimentavam-se mutuamente, e nenhuma das duas conseguia sair do ciclo porque sair significava olhar para o que existia por baixo — o vazio de Lena, a exaustão de Sofia — e nenhuma das duas estava pronta para isso.",
      "Até que estiveram.",
    ],
    reflection: {
      prompt:
        "Alguma vez sentiste que alguém te consumia com amor? Ou que o teu amor consumia alguém?",
      journalQuestion:
        "Há alguma relação na tua vida onde te sentes mais vazia depois de estar com a pessoa do que antes? O que estás a dar que não é teu para dar?",
    },
    checklist: [
      "Li esta parte reconhecendo a perspectiva de quem é consumido",
      "Identifiquei relações que me esgotam em vez de me alimentar",
      "Permiti-me ver que a culpa de dizer não é tão real quanto a fome de quem ouve não",
    ],
  },
  {
    slug: "parte-v",
    number: 5,
    title: "Parte V",
    subtitle: "A conversa no jardim",
    accentColor: "#755020",
    accentBg: "#eee6db",
    content: [
      "Encontraram-se num jardim público, num banco debaixo de uma árvore que conheciam desde os tempos do liceu. Era Primavera, e o jardim tinha aquela energia de renovação que parece promessa mas que pode ser, também, despedida.",
      "Sofia marcara o encontro. Dissera a Lena que precisava de lhe dizer uma coisa, e Lena viera com o medo de quem pressente que vai ouvir algo que vai doer. Sentaram-se no banco, lado a lado, como tinham sentado centenas de vezes, e durante alguns minutos nenhuma disse nada. O silêncio era estranho. O silêncio entre elas nunca fora estranho — fora confortável, cúmplice, o silêncio de duas pessoas que não precisam de palavras para estar juntas. Mas este era um silêncio de véspera. O silêncio antes de algo se partir.",
      "— Preciso de espaço — disse Sofia.",
      "Três palavras. Lena ouviu-as e sentiu o chão desaparecer debaixo do banco, como se as três palavras tivessem removido a superfície onde estava sentada e ela estivesse agora a flutuar sobre um vazio que era o mesmo vazio de sempre mas que naquele momento parecia infinito.",
      "— Espaço de mim? — A voz saiu pequena.",
      "— Não de ti. De nós. Da intensidade. Do que se tornou entre nós.",
      "— O que é que se tornou?",
      "Sofia respirou fundo. Olhou para a árvore, para as folhas novas que tremiam com o vento de Abril, e disse a coisa que guardava há meses:",
      "— Sinto que me consomes, Lena. Não de propósito. Não com maldade. Mas sinto que cada vez que estamos juntas, tu precisas de algo de mim que eu não consigo dar. Algo que não é atenção nem tempo. É — eu. Precisas de mim para te sentires cheia. E isso está a esvaziar-me.",
      "Lena não respondeu. Ficou sentada no banco com as mãos no colo e os olhos húmidos e uma dor no peito que não era surpresa — porque ela sabia. No fundo, sabia. Sabia que a intensidade da sua necessidade não era normal. Sabia que o que sentia por Sofia tinha ultrapassado há muito a fronteira da amizade e entrado no território da dependência. Sabia tudo isto, e ao mesmo tempo nunca o soubera, porque saber e sentir são coisas diferentes, e sentir o que Sofia acabara de dizer era como ter um osso partido que se julgava curado e descobrir que nunca soldou.",
      "— Eu sei — disse Lena, finalmente. — Sei que tenho um vazio. E sei que te usei para o preencher. Não porque não te ame. Amo-te. Mas o meu amor é — faminto. E não sei como amar de outra forma.",
      "Sofia olhou para ela. E nos olhos de Sofia, Lena viu algo que não esperava: tristeza. Não a tristeza de quem se vai embora. A tristeza de quem ama e não pode ajudar. A tristeza de quem sabe que o que a amiga precisa não é dela — é de si mesma — e que dar mais de si não vai resolver, vai agravar.",
      "— Eu também te amo — disse Sofia. — Mas preciso que aprendas a estar cheia sem mim. Porque enquanto precisares de mim para estar cheia, nunca vais estar. E eu vou ficar cada vez mais vazia.",
    ],
    reflection: {
      prompt:
        "Já ouviste alguém dizer-te que o teu amor era demais? O que sentiste?",
      journalQuestion:
        "Se a pessoa que mais amas te dissesse preciso de espaço, o que ouvirias? O que a criança dentro de ti ouviria?",
    },
    checklist: [
      "Li esta parte sentindo a dor de ambos os lados",
      "Reconheci a diferença entre amor e dependência",
      "Permiti-me ouvir as palavras de Sofia sem me defender",
    ],
  },
  {
    slug: "parte-vi",
    number: 6,
    title: "Parte VI",
    subtitle: "O vazio habitado",
    accentColor: "#604010",
    accentBg: "#ebe2d6",
    content: [
      "Lena passou as semanas seguintes sozinha. Não completamente — tinha o marido, tinha o trabalho, tinha a vida que continuava a funcionar como funcionam as vidas quando a estrutura é sólida e a rotina está instalada. Mas sem Sofia. Sem as chamadas, sem os jantares, sem a presença que durante vinte anos fora a âncora da sua existência emocional.",
      "O vazio voltou. Voltou com uma força que a surpreendeu, como tempestade que se esperava mas cuja intensidade nunca se consegue prever. Acordava de manhã e sentia-o. Ia trabalhar e sentia-o. Voltava para casa e sentia-o. O vazio estava em todo o lado — no apartamento demasiado grande, no sucesso que não significava nada, no casamento estável que não preenchia, na vida inteira que construíra sem nunca ter parado para se perguntar: o que é que eu quero? O que é que me preenche? Quem sou eu quando não estou a tentar ser outra pessoa?",
      "Pela primeira vez na vida, Lena ficou com o vazio. Não tentou preenchê-lo. Não ligou a Sofia. Não se atirou para um projecto novo no trabalho. Não comprou nada. Não viajou. Ficou. Sentou-se no sofá da sala e ficou com o vazio como se fica com uma pessoa doente — não para curar, mas para acompanhar.",
      "E o vazio, quando não se tenta preencher, muda de forma. Não desaparece — seria ingénuo dizer que desaparece. Mas transforma-se. Deixa de ser um buraco que precisa de ser tapado e torna-se um espaço que pode ser habitado. Lena descobriu isto aos poucos, nos dias silenciosos sem Sofia, quando começou a fazer coisas que nunca fizera porque estava sempre ocupada a admirar os outros em vez de se conhecer a si mesma.",
      "Começou a caminhar. Sozinha, sem destino, sem podcast, sem música. Apenas o barulho dos seus próprios passos e dos seus próprios pensamentos. Descobriu que gostava de andar junto ao rio ao fim da tarde, quando a luz ficava dourada e a cidade desacelerava. Descobriu que gostava de se sentar em cafés a observar pessoas, não para absorver a energia delas mas para simplesmente estar presente. Descobriu que gostava de cozinhar — não por necessidade, mas pelo acto em si, pelo prazer de transformar ingredientes em algo comestível com as próprias mãos.",
      "***",
      "Descobertas pequenas. Insignificantes, vistas de fora. Mas para Lena, que passara trinta e seis anos a procurar nos outros o que não encontrava em si, cada descoberta era uma revelação: eu existo. Eu tenho gostos. Eu tenho substância. Eu sou alguém, mesmo quando não estou a imitar alguém.",
      "O vazio continuava lá. Mas já não era ameaçador. Era companhia. Era o espaço onde Lena começava, devagar, a encontrar-se. Não a versão de si mesma que construíra a partir de pedaços de outras pessoas — a versão original, imperfeita, incompleta, mas sua. Genuinamente sua.",
    ],
    reflection: {
      prompt:
        "O que acontece quando ficas com o teu vazio em vez de o preencheres?",
      journalQuestion:
        "Se passasses uma semana inteira sem a pessoa que mais admiras, quem serias? O que farias? O que descobririas?",
    },
    checklist: [
      "Li esta parte reconhecendo o vazio como espaço e não como falha",
      "Identifiquei coisas que me preenchem a partir de dentro",
      "Permiti-me imaginar que o vazio pode ser habitado em vez de tapado",
    ],
  },
  {
    slug: "parte-vii",
    number: 7,
    title: "Parte VII",
    subtitle: "A amizade que voltou diferente",
    accentColor: "#c49a6a",
    accentBg: "#faf6f0",
    content: [
      "Lena ligou a Sofia dois meses depois. Não porque o vazio tivesse desaparecido. Porque já não precisava que desaparecesse. Porque aprendera, naqueles dois meses de silêncio e solidão e caminhadas junto ao rio, que o vazio não era o problema. O problema era a fome. E a fome, ao contrário do vazio, podia ser transformada.",
      "— Olá — disse, e a voz era diferente. Mais calma. Menos urgente. A voz de alguém que liga porque quer, não porque precisa.",
      "— Olá — disse Sofia, e ouviu a diferença.",
      "Encontraram-se no mesmo jardim, no mesmo banco, debaixo da mesma árvore. Mas a conversa foi diferente. Não houve a intensidade frenética dos encontros antigos, em que Lena absorvia cada palavra de Sofia como esponja seca. Houve algo mais raro: equilíbrio. Duas mulheres sentadas num banco, a partilhar o que viveram durante dois meses de separação, cada uma com a sua história, cada uma com o seu peso, nenhuma a tentar ser a outra.",
      "Lena falou do vazio. Falou dele com a honestidade de quem finalmente olhou para algo que evitou a vida inteira. Disse a Sofia que percebera que a admiração que sentia por ela era fome. Que a fome não era sobre Sofia — era sobre o que faltava dentro de Lena. Que usara a amizade como fonte de preenchimento e que isso não era amor — era dependência. E que pedia desculpa. Não pela amizade. Pela forma como a vivera.",
      "Sofia ouviu. E quando Lena terminou, disse:",
      "— Eu também preciso de te pedir desculpa. Por não ter falado mais cedo. Por ter deixado acumular até não aguentar. Por me ter protegido em silêncio em vez de te dizer o que sentia.",
      "— Não tinhas de dizer. Era a minha responsabilidade ver.",
      "— Era. Mas a amizade é de duas. E eu escolhi o silêncio quando devia ter escolhido a verdade.",
      "***",
      "A amizade não voltou a ser o que era. Não podia — e essa era, talvez, a parte mais dolorosa e mais bonita da transformação. A amizade dos vinte anos, a amizade simbiótica e intensa e totalizante, morrera. O que nasceu no seu lugar era outra coisa: mais leve, mais espaçada, mais adulta. Uma amizade em que Lena não ligava todos os dias, e Sofia não sentia culpa por não atender. Em que se viam quando queriam e não quando precisavam. Em que o silêncio entre os encontros não era vazio — era espaço. O espaço que ambas precisavam para ser quem eram, separadamente, antes de se encontrarem juntas.",
      "Lena continuou a admirar Sofia. Mas a admiração mudou de natureza. Já não era fome — era reconhecimento. O reconhecimento de que Sofia era uma pessoa com a sua própria luz, a sua própria dor, a sua própria complexidade, e que essa pessoa merecia ser vista como era e não como projecção dos desejos de Lena. E Lena começou, devagar, a encontrar a sua própria luz — mais fraca, mais hesitante, diferente da de Sofia, mas sua. Genuinamente sua.",
      "O vazio ficou. Lena aprendeu a conviver com ele como se convive com uma cicatriz — sabe-se que está ali, sente-se de vez em quando, mas já não se tem medo de olhar. O vazio não era ausência de algo. Era o espaço de onde tudo nasce. O espaço onde Lena, finalmente, começava a crescer a partir de si mesma.",
      "Num dia de verão, Lena e Sofia sentaram-se no banco do jardim a comer gelados. Não disseram nada de especial. Riram de uma coisa pequena. Ficaram em silêncio. E o silêncio entre elas era, pela primeira vez em anos, um silêncio cheio. Cheio não da presença de uma na outra, mas da presença de cada uma em si mesma. Duas mulheres inteiras, sentadas lado a lado, a escolher estar ali. Não por fome. Por amor.",
    ],
    reflection: {
      prompt:
        "Qual é a diferença entre uma amizade que preenche e uma amizade que consome?",
      journalQuestion:
        "Pensa na amizade mais importante da tua vida. É uma amizade de escolha ou de necessidade? O que mudaria se a vivesses a partir da tua plenitude em vez da tua fome?",
    },
    checklist: [
      "Li este nó até ao fim",
      "Senti a diferença entre amor-fome e amor-escolha",
      "Reconheci que o vazio não é o inimigo — a fome é",
      "Permiti-me imaginar relações onde estar cheia é condição para amar, não consequência",
    ],
  },
];
