import type { CourseData, CourseSlug } from "@/types/course";

const COURSES: CourseData[] = [
  // ─── CURSO 1 — Ouro Proprio ───
  {
    slug: "ouro-proprio",
    number: 1,
    title: "Ouro Proprio",
    subtitle: "A relacao com dinheiro como espelho de ti",
    arcoEmocional:
      "Comeca pelo desconforto de olhar para numeros. Passa pela descoberta dos padroes herdados. Atravessa a vergonha, a culpa de querer mais, o medo de perder. Chega a reconstrucao: separar valor pessoal de valor monetario. Termina com direccao: o que quero que o dinheiro financie na minha vida?",
    diferencial:
      "Nao e um curso de financas pessoais. Ensina a desfazer o no emocional que impede a mulher de ganhar, guardar e gastar de forma alinhada com quem ela realmente e.",
    modules: [
      {
        number: 1,
        title: "O Extracto como Espelho",
        description: "A relacao com dinheiro comeca por olhar.",
        isFree: true,
        subLessons: [
          { letter: "A", title: "O medo de olhar", description: "O primeiro passo e abrir o extracto sem desviar o olhar." },
          { letter: "B", title: "Ler o extracto como um diario", description: "Cada linha conta uma historia sobre o que valorizas." },
          { letter: "C", title: "O corpo e o dinheiro", description: "Onde sentes o dinheiro no corpo? Tensao, vergonha, alivio." },
        ],
        workbook: "Mapa financeiro emocional",
      },
      {
        number: 2,
        title: "A Heranca Financeira Emocional",
        description: "O dinheiro que herdaste sem saber.",
        isFree: false,
        subLessons: [
          { letter: "A", title: "Os scripts de infancia", description: "As frases sobre dinheiro que absorveste antes dos 10 anos." },
          { letter: "B", title: "O que viste vs. o que ouviste", description: "O que os teus pais faziam com dinheiro vs. o que diziam." },
          { letter: "C", title: "Reescrever os scripts", description: "Escolher conscientemente o que mantes e o que largas." },
        ],
        workbook: "Arqueologia financeira familiar",
      },
      {
        number: 3,
        title: "A Vergonha do Dinheiro",
        description: "A vergonha que silencia a conversa sobre dinheiro.",
        isFree: false,
        subLessons: [
          { letter: "A", title: "Vergonha de nao ter", description: "A vergonha de nao ter o suficiente e o que ela esconde." },
          { letter: "B", title: "Vergonha de querer mais", description: "A vergonha de ambicionar e o que ela protege." },
          { letter: "C", title: "Dinheiro e dignidade", description: "Separar o que tens do que vales." },
        ],
        workbook: "Mapa da vergonha financeira",
      },
      {
        number: 4,
        title: "Cobrar, Receber, Merecer",
        description: "O no entre o que cobras e o que acreditas merecer.",
        isFree: false,
        subLessons: [
          { letter: "A", title: "O desconto automatico", description: "Porque baixas o preco antes de alguem pedir." },
          { letter: "B", title: "A ligacao cobrar-merecer", description: "Cobrar o que vale e sentir que mereces receber." },
          { letter: "C", title: "Receber sem devolver imediatamente", description: "A dificuldade de receber sem compensar de volta." },
        ],
        workbook: "Exercicio do preco justo",
      },
      {
        number: 5,
        title: "Gastar em Ti",
        description: "A hierarquia invisivel dos teus gastos.",
        isFree: false,
        subLessons: [
          { letter: "A", title: "A hierarquia dos gastos", description: "Onde te colocas na lista de prioridades financeiras." },
          { letter: "B", title: "Culpa e prazer", description: "Gastar em ti sem a voz que diz que es egoista." },
          { letter: "C", title: "O investimento em ti como acto politico", description: "Investir em ti nao e luxo — e posicionamento." },
        ],
        workbook: "Auditoria de gastos pessoais",
      },
      {
        number: 6,
        title: "Dinheiro e Relacoes",
        description: "O dinheiro como linguagem nas relacoes.",
        isFree: false,
        subLessons: [
          { letter: "A", title: "Quem paga, manda?", description: "A dinamica de poder escondida nas contas partilhadas." },
          { letter: "B", title: "Dependencia financeira e medo", description: "Quando a dependencia financeira alimenta o medo de sair." },
          { letter: "C", title: "A conversa sobre dinheiro que evitas", description: "A conversa que precisas de ter com quem amas." },
        ],
        workbook: "Guia para a conversa financeira",
      },
      {
        number: 7,
        title: "Ganhar Mais Nao Resolve",
        description: "O buraco que o dinheiro nao enche.",
        isFree: false,
        subLessons: [
          { letter: "A", title: "O buraco que o dinheiro nao enche", description: "Quando mais dinheiro nao traz mais paz." },
          { letter: "B", title: "Sabotagem financeira", description: "Os padroes que te fazem perder o que ganhas." },
          { letter: "C", title: "Suficiente: quando e suficiente?", description: "Definir o teu suficiente sem comparacao." },
        ],
        workbook: "Mapa da sabotagem financeira",
      },
      {
        number: 8,
        title: "Dinheiro como Liberdade",
        description: "De sobrevivencia a direccao.",
        isFree: false,
        subLessons: [
          { letter: "A", title: "De sobrevivencia a direccao", description: "Sair do modo sobrevivencia e entrar no modo escolha." },
          { letter: "B", title: "O mapa do futuro que queres financiar", description: "Desenhar o futuro que queres e calcular o que custa." },
          { letter: "C", title: "Liberdade, nao acumulacao", description: "Dinheiro como ferramenta de liberdade, nao de seguranca compulsiva." },
        ],
        workbook: "Mapa de liberdade financeira",
      },
    ],
    youtubeHooks: [
      { title: "Porque sentes culpa quando gastas dinheiro em ti mesma?", durationMin: 6 },
      { title: "3 frases sobre dinheiro que a tua mae te ensinou sem saber", durationMin: 7 },
      { title: "O teste do preco: diz o teu valor em voz alta", durationMin: 5 },
    ],
  },

  // ─── CURSO 2 — Sangue e Seda ───
  {
    slug: "sangue-e-seda",
    number: 2,
    title: "Sangue e Seda",
    subtitle: "A heranca invisivel entre maes e filhas",
    arcoEmocional:
      "Comeca na idealizacao ou na raiva. Passa pela diferenciacao: onde acabo eu e comeca ela? Atravessa a heranca nao-dita, a culpa de crescer, a lealdade que prende. Chega ao lugar mais livre: ver a mae como mulher inteira e escolher o que levas.",
    diferencial:
      "Nao e um curso sobre perdoar a tua mae. E sobre ver a mulher antes de ti — e devolver-lhe o que e dela sem deixar de a amar.",
    modules: [
      {
        number: 1,
        title: "A Mae que Carregas",
        description: "A mae-personagem vs. a mae-pessoa.",
        isFree: true,
        subLessons: [
          { letter: "A", title: "A mae-personagem vs. a mae-pessoa", description: "A distancia entre a mae que construiste e a mulher que ela e." },
          { letter: "B", title: "Memoria ou interpretacao?", description: "O que lembras e o que realmente aconteceu." },
        ],
        workbook: "Retrato da mae interior",
      },
      {
        number: 2,
        title: "A Heranca que Nao Pediste",
        description: "O que herdaste sem saber.",
        isFree: false,
        subLessons: [
          { letter: "A", title: "O que herdaste sem saber", description: "Os padroes que passaram de mae para filha sem palavras." },
          { letter: "B", title: "Repeticao e oposicao: ambas sao heranca", description: "Repetir a mae ou fazer o oposto — ambas sao respostas a ela." },
          { letter: "C", title: "Escolher o que mantens", description: "Separar conscientemente o que levas e o que devolves." },
        ],
        workbook: "Inventario da heranca materna",
      },
      {
        number: 3,
        title: "A Culpa de Crescer",
        description: "Crescer como traicao silenciosa.",
        isFree: false,
        subLessons: [
          { letter: "A", title: "Crescer como traicao", description: "A sensacao de que evoluir e abandonar a mae." },
          { letter: "B", title: "A lealdade invisivel", description: "Os compromissos inconscientes que te prendem ao passado." },
          { letter: "C", title: "Ser livre sem abandonar", description: "Crescer sem cortar — diferenciar sem destruir." },
        ],
        workbook: "Mapa da lealdade invisivel",
      },
      {
        number: 4,
        title: "A Raiva Sagrada",
        description: "A raiva que nunca te permitiste.",
        isFree: false,
        subLessons: [
          { letter: "A", title: "A raiva que nunca te permitiste", description: "A raiva guardada que pesa mais do que a expressada." },
          { letter: "B", title: "Raiva vs. rejeicao", description: "Sentir raiva da mae nao e rejeita-la." },
          { letter: "C", title: "O que fazer com a raiva", description: "Canais saudaveis para a raiva que guardaste." },
        ],
        workbook: "Carta a raiva",
      },
      {
        number: 5,
        title: "O Silencio entre Mae e Filha",
        description: "O que nunca foi dito entre vos.",
        isFree: false,
        subLessons: [
          { letter: "A", title: "O que nunca foi dito", description: "As palavras que ficaram por dizer entre mae e filha." },
          { letter: "B", title: "O silencio como proteccao", description: "O silencio que protege mas tambem aprisiona." },
          { letter: "C", title: "Quebrar o silencio sem destruir", description: "Dizer sem explodir. Falar sem ferir." },
        ],
        workbook: "A carta nao enviada",
      },
      {
        number: 6,
        title: "O Corpo da Mae, o Corpo da Filha",
        description: "O que a mae te ensinou sobre o teu corpo.",
        isFree: false,
        subLessons: [
          { letter: "A", title: "O que a mae te ensinou sobre o teu corpo", description: "As mensagens sobre o corpo feminino que absorveste." },
          { letter: "B", title: "O corpo como territorio herdado", description: "O teu corpo como extensao do corpo da tua mae." },
        ],
        workbook: "Mapa corporal geracional",
      },
      {
        number: 7,
        title: "Quando a Mae Nao Foi Suficiente",
        description: "A mae que nao pode dar o que nao tinha.",
        isFree: false,
        subLessons: [
          { letter: "A", title: "A mae que nao pode", description: "Distinguir entre nao quis e nao pode." },
          { letter: "B", title: "Lamentar sem culpar", description: "Sentir a falta sem transformar em acusacao." },
          { letter: "C", title: "A mae interior", description: "Construir internamente o que nao recebeste externamente." },
        ],
        workbook: "A mae que precisavas vs. a mae que tiveste",
      },
      {
        number: 8,
        title: "Ser Filha e Ser Mae ao Mesmo Tempo",
        description: "O loop geracional e como interrompe-lo.",
        isFree: false,
        subLessons: [
          { letter: "A", title: "O loop geracional", description: "O que passas adiante sem querer." },
          { letter: "B", title: "Interromper o padrao", description: "Escolher conscientemente o que transmites." },
          { letter: "C", title: "A materia que passas adiante", description: "O que queres que a proxima geracao receba de ti." },
        ],
        workbook: "Carta a proxima geracao",
      },
      {
        number: 9,
        title: "Ver a Mulher, Nao So a Mae",
        description: "A despedida da filha que precisava.",
        isFree: false,
        subLessons: [
          { letter: "A", title: "A mae antes de ti", description: "A mulher que a tua mae era antes de ser tua mae." },
          { letter: "B", title: "Ver sem perdoar (se nao quiseres)", description: "Compreender nao exige perdao. Ver e suficiente." },
          { letter: "C", title: "A despedida da filha que precisava", description: "Despedir-te da filha que esperava e tornar-te a mulher que es." },
        ],
        workbook: "Ritual de encerramento",
      },
    ],
    youtubeHooks: [
      { title: "3 sinais de que estas a repetir a vida da tua mae sem saber", durationMin: 8 },
      { title: "Porque discutir com a tua mae te faz sentir como se tivesses 12 anos", durationMin: 6 },
      { title: "A diferenca entre perdoar e compreender", durationMin: 7 },
    ],
  },

  // ─── CURSO 3 — A Arte da Inteireza ───
  {
    slug: "a-arte-da-inteireza",
    number: 3,
    title: "A Arte da Inteireza",
    subtitle: "Amar sem te perderes no outro",
    arcoEmocional:
      "Comeca pelo reconhecimento: em que momento deixas de te sentir? Passa pelos padroes. Atravessa a dor de relacoes passadas onde te perdeste. Reconstroi a imagem do que e estar com alguem sem abandonar o centro. Termina com a pratica diaria de presenca relacional.",
    diferencial:
      "Nao e um curso sobre relacoes. E sobre o momento exacto em que desapareces dentro de uma — e como voltar.",
    modules: [
      {
        number: 1,
        title: "O Momento em que Desapareces",
        description: "O ponto de mutacao em que deixas de ser tu.",
        isFree: true,
        subLessons: [
          { letter: "A", title: "O ponto de mutacao", description: "O momento exacto em que deixas de te sentir dentro da relacao." },
          { letter: "B", title: "Os sinais no corpo", description: "O corpo avisa antes da mente perceber." },
          { letter: "C", title: "O tanto faz que nao e tanto faz", description: "A indiferenca como mecanismo de proteccao." },
        ],
        workbook: "Mapa dos pontos de desaparecimento",
      },
      {
        number: 2,
        title: "O Modelo de Amor que Absorveste",
        description: "O modelo de amor que carregas sem saber.",
        isFree: false,
        subLessons: [
          { letter: "A", title: "Amor como sacrificio", description: "Quando aprendeste que amar e abdicar." },
          { letter: "B", title: "Amor como salvacao", description: "Quando procuras no outro o que falta em ti." },
          { letter: "C", title: "Amor como fusao", description: "Quando amar significa fundir-se ate desaparecer." },
        ],
        workbook: "Arqueologia do modelo de amor",
      },
      {
        number: 3,
        title: "Atrair o Mesmo Padrao",
        description: "A repeticao nao e azar.",
        isFree: false,
        subLessons: [
          { letter: "A", title: "A repeticao nao e azar", description: "Porque atrais o mesmo tipo de relacao." },
          { letter: "B", title: "O familiar confundido com amor", description: "Quando o que doi e confundido com intimidade." },
          { letter: "C", title: "Interromper o ciclo", description: "Como quebrar o padrao sem esperar pela relacao perfeita." },
        ],
        workbook: "Mapa de padroes relacionais",
      },
      {
        number: 4,
        title: "Ter Necessidades Nao e Ser Carente",
        description: "Nomear o que precisas sem pedir desculpa.",
        isFree: false,
        subLessons: [
          { letter: "A", title: "A arma da palavra 'carente'", description: "Como a palavra 'carente' e usada para te silenciar." },
          { letter: "B", title: "Nomear o que precisas", description: "A diferenca entre necessidade e dependencia." },
          { letter: "C", title: "Pedir sem pedir desculpa", description: "Pedir o que precisas como acto de dignidade, nao de fraqueza." },
        ],
        workbook: "Inventario de necessidades",
      },
      {
        number: 5,
        title: "Os Limites Dentro do Amor",
        description: "Limites nao sao muros.",
        isFree: false,
        subLessons: [
          { letter: "A", title: "Limites nao sao muros", description: "A diferenca entre proteger-te e fechar-te." },
          { letter: "B", title: "O medo de perder ao limitar", description: "O medo de que limites afastem quem amas." },
          { letter: "C", title: "Limites praticos", description: "Frases, gestos e praticas concretas para o dia-a-dia." },
        ],
        workbook: "Guia pratico de limites",
      },
      {
        number: 6,
        title: "Solidao vs. Solitude",
        description: "A diferenca entre estar sozinha e estar contigo.",
        isFree: false,
        subLessons: [
          { letter: "A", title: "O medo de ficar sozinha", description: "O medo que te faz aceitar menos do que mereces." },
          { letter: "B", title: "Aprender a estar contigo", description: "A pratica de solitude como fundacao do amor." },
          { letter: "C", title: "A relacao contigo como fundacao", description: "A qualidade da relacao contigo define a qualidade das outras." },
        ],
        workbook: "Praticas de solitude",
      },
      {
        number: 7,
        title: "O Sexo como Termometro",
        description: "O que o desejo revela sobre a relacao.",
        isFree: false,
        subLessons: [
          { letter: "A", title: "Desejo autentico vs. desejo performativo", description: "A diferenca entre querer e achar que deves querer." },
          { letter: "B", title: "Prazer como direito", description: "O prazer nao e bonus — e linguagem." },
          { letter: "C", title: "Falar sobre sexo sem vergonha", description: "A conversa sobre desejo como acto de intimidade." },
        ],
        workbook: "Mapa do desejo autentico",
      },
      {
        number: 8,
        title: "Dois Corpos Inteiros",
        description: "Amor como proximidade entre corpos inteiros.",
        isFree: false,
        subLessons: [
          { letter: "A", title: "A imagem do amor saudavel", description: "O que e realmente estar com alguem sem te perder." },
          { letter: "B", title: "O espaco entre os dois", description: "O espaco como sinal de saude, nao de distancia." },
          { letter: "C", title: "Ficar de forma diferente ou sair de forma inteira", description: "Quando mudar a relacao e quando termina-la." },
        ],
        workbook: "Visao da relacao inteira",
      },
    ],
    youtubeHooks: [
      { title: "5 sinais de que estas a desaparecer numa relacao", durationMin: 7 },
      { title: "Porque atrais sempre o mesmo tipo de pessoa", durationMin: 8 },
      { title: "A diferenca entre estar disponivel e nao ter vida propria", durationMin: 6 },
    ],
  },

  // ─── CURSO 4 — Depois do Fogo ───
  {
    slug: "depois-do-fogo",
    number: 4,
    title: "Depois do Fogo",
    subtitle: "Quando a vida te pede para comecar de novo",
    arcoEmocional:
      "Comeca no luto do que acabou. Passa pelo vazio entre o fim e o inicio. Reconstroi identidade fora dos papeis que desempenhaste. Atravessa o medo do desconhecido. Termina com os primeiros passos a partir de onde estas.",
    diferencial:
      "Nao e um curso motivacional sobre recomecos. E sobre o espaco entre o fim e o inicio — e como habita-lo sem fugir.",
    modules: [
      {
        number: 1,
        title: "Chorar o que Acabou",
        description: "A permissao de acabar de acabar.",
        isFree: true,
        subLessons: [
          { letter: "A", title: "A permissao de acabar de acabar", description: "Dar tempo ao luto antes de correr para o novo." },
          { letter: "B", title: "O elogio funebre ao que foi", description: "Honrar o que existiu, mesmo que tenha doido." },
          { letter: "C", title: "O corpo no luto", description: "Onde mora o luto no teu corpo." },
        ],
        workbook: "Ritual de encerramento",
      },
      {
        number: 2,
        title: "O Vazio que Assusta",
        description: "O espaco entre o fim e o inicio.",
        isFree: false,
        subLessons: [
          { letter: "A", title: "O espaco entre o fim e o inicio", description: "O limbo onde ja nao es quem eras e ainda nao es quem vais ser." },
          { letter: "B", title: "O vazio como solo", description: "O vazio nao e ausencia — e preparacao." },
          { letter: "C", title: "A diferenca entre pausa e paralisia", description: "Como distinguir repouso necessario de medo disfarçado." },
        ],
        workbook: "Mapa do vazio",
      },
      {
        number: 3,
        title: "Quem Sou Eu Sem Aquilo?",
        description: "Identidade alem dos papeis.",
        isFree: false,
        subLessons: [
          { letter: "A", title: "Identidade ligada a papeis", description: "O que sobra quando tiras o titulo, a relacao, o papel." },
          { letter: "B", title: "Os papeis que te definiram", description: "Mae, esposa, profissional — quem es sem isso?" },
          { letter: "C", title: "Reconstruir identidade", description: "Construir a partir do que resta, nao do que falta." },
        ],
        workbook: "Inventario de identidade",
      },
      {
        number: 4,
        title: "O Medo do Desconhecido",
        description: "Avancar com medo.",
        isFree: false,
        subLessons: [
          { letter: "A", title: "Porque o conhecido doi menos que o incerto", description: "A preferencia pelo sofrimento familiar." },
          { letter: "B", title: "O corpo no medo", description: "As respostas fisicas ao desconhecido." },
          { letter: "C", title: "Avancar com medo", description: "Nao esperar que o medo passe para comecar a andar." },
        ],
        workbook: "Mapa do medo do desconhecido",
      },
      {
        number: 5,
        title: "O Peso das Opinioes",
        description: "Recomecar em silencio.",
        isFree: false,
        subLessons: [
          { letter: "A", title: "O que os outros esperam de ti", description: "As expectativas externas que pesam no recomeco." },
          { letter: "B", title: "A vergonha do 'falhanho'", description: "O estigma de recomecar como se fosse fracasso." },
          { letter: "C", title: "Recomecar em silencio", description: "O direito de recomecar sem anunciar." },
        ],
        workbook: "Filtro de opinioes",
      },
      {
        number: 6,
        title: "Recomecar aos 30, 40, 50",
        description: "A mentira do tarde demais.",
        isFree: false,
        subLessons: [
          { letter: "A", title: "A mentira do 'tarde demais'", description: "Desmontar a narrativa do prazo de validade." },
          { letter: "B", title: "A sabedoria que a idade traz ao recomeco", description: "O que sabes agora que nao sabias antes." },
          { letter: "C", title: "O corpo que ja viveu", description: "Honrar o corpo como arquivo de experiencia." },
        ],
        workbook: "Linha do tempo dos recomecos",
      },
      {
        number: 7,
        title: "O Dinheiro do Recomeco",
        description: "A inseguranca financeira do recomeco.",
        isFree: false,
        subLessons: [
          { letter: "A", title: "A inseguranca financeira", description: "O medo financeiro como barreira ao recomeco." },
          { letter: "B", title: "Comecar com pouco", description: "O minimo viavel para dar o primeiro passo." },
          { letter: "C", title: "O minimo viavel emocional", description: "O que precisas emocionalmente para recomecar." },
        ],
        workbook: "Plano minimo viavel",
      },
      {
        number: 8,
        title: "Comecar a Partir de Aqui",
        description: "Nao apagar — integrar.",
        isFree: false,
        subLessons: [
          { letter: "A", title: "Nao apagar — integrar", description: "Recomecar nao e apagar. E construir com o que tens." },
          { letter: "B", title: "Os primeiros passos", description: "Accoes pequenas que mudam a direccao." },
          { letter: "C", title: "A mulher que ja recomecou", description: "Reconhecer que o recomeco ja esta em curso." },
        ],
        workbook: "Os 7 primeiros passos",
      },
    ],
    youtubeHooks: [
      { title: "Porque recomecar da mais medo do que ficar", durationMin: 7 },
      { title: "A mentira do 'voltar a estaca zero'", durationMin: 6 },
      { title: "Como saber se e cedo ou tarde demais", durationMin: 8 },
    ],
  },

  // ─── CURSO 5 — Olhos Abertos ───
  {
    slug: "olhos-abertos",
    number: 5,
    title: "Olhos Abertos",
    subtitle: "Decidir a partir de clareza, nao de medo",
    arcoEmocional:
      "Comeca na paralisia. Passa pelas vozes que nao sao tuas. Aprende a ouvir o corpo. Desmonta falsas dicotomias. Termina a viver com a escolha sem remorso.",
    diferencial:
      "Nao ensina a tomar decisoes melhores. Ensina a distinguir as decisoes do medo das da clareza — e a confiar no processo, mesmo sem certezas.",
    modules: [
      {
        number: 1,
        title: "A Paralisia e o que Ela Protege",
        description: "Nao decidir e decidir.",
        isFree: true,
        subLessons: [
          { letter: "A", title: "Nao decidir e decidir", description: "A indecisao como decisao disfarçada." },
          { letter: "B", title: "A ilusao de manter todas as opcoes abertas", description: "O custo de nao escolher." },
          { letter: "C", title: "O custo real da indecisao", description: "O que perdes enquanto nao decides." },
        ],
        workbook: "Inventario das decisoes adiadas",
      },
      {
        number: 2,
        title: "A Voz que Nao e Tua",
        description: "Quem fala quando decides.",
        isFree: false,
        subLessons: [
          { letter: "A", title: "Quem fala quando 'decides'", description: "As vozes internas que se mascaram de tuas." },
          { letter: "B", title: "O 'devias' como alarme", description: "Cada 'devias' e sinal de uma voz que nao e tua." },
          { letter: "C", title: "Encontrar a tua voz no ruido", description: "Distinguir a tua voz das vozes herdadas." },
        ],
        workbook: "Mapa das vozes internas",
      },
      {
        number: 3,
        title: "Decidir com o Corpo",
        description: "O corpo sabe primeiro.",
        isFree: false,
        subLessons: [
          { letter: "A", title: "O corpo sabe primeiro", description: "A inteligencia somatica na tomada de decisao." },
          { letter: "B", title: "Calibrar o sim e o nao corporal", description: "Aprender a ler a expansao e a contratura." },
          { letter: "C", title: "Integrar corpo e mente", description: "Quando o corpo e a mente discordam." },
        ],
        workbook: "Exercicios de decisao somatica",
      },
      {
        number: 4,
        title: "Falsas Dicotomias",
        description: "Ou isto ou aquilo — sera?",
        isFree: false,
        subLessons: [
          { letter: "A", title: "Ou isto ou aquilo", description: "A maioria das decisoes nao e binaria." },
          { letter: "B", title: "A pressao de urgencia artificial", description: "Nem tudo precisa de ser decidido agora." },
          { letter: "C", title: "Decidir por fases", description: "O direito de decidir aos poucos." },
        ],
        workbook: "Desconstrucao de dilemas",
      },
      {
        number: 5,
        title: "O Medo de Errar",
        description: "O erro como informacao.",
        isFree: false,
        subLessons: [
          { letter: "A", title: "Errar e humano", description: "Retirar o peso catastrofico do erro." },
          { letter: "B", title: "O erro como informacao", description: "Cada erro traz dados que a indecisao nao traz." },
          { letter: "C", title: "A decisao imperfeita vs. a indecisao perfeita", description: "Uma decisao imperfeita move. A indecisao perfeita paralisa." },
        ],
        workbook: "Diario de erros uteis",
      },
      {
        number: 6,
        title: "Decidir por Ti (Nao por Todos)",
        description: "A mulher que decide por todos e nada por si.",
        isFree: false,
        subLessons: [
          { letter: "A", title: "A mulher que decide por todos e nada por si", description: "O padrao de priorizar as decisoes dos outros." },
          { letter: "B", title: "Culpa de priorizar", description: "A culpa de te colocares em primeiro." },
          { letter: "C", title: "O 'egoismo' saudavel", description: "Decidir por ti nao e egoismo — e sobrevivencia." },
        ],
        workbook: "Mapa de decisoes delegadas",
      },
      {
        number: 7,
        title: "Decisoes Irrevogaveis e Revogaveis",
        description: "A maioria e revogavel.",
        isFree: false,
        subLessons: [
          { letter: "A", title: "A maioria e revogavel", description: "Quase tudo pode ser refeito, ajustado, redirecionado." },
          { letter: "B", title: "As poucas irrevogaveis", description: "Identificar as decisoes que merecem mais tempo." },
          { letter: "C", title: "Decidir sem garantias", description: "A coragem de decidir sem saber o resultado." },
        ],
        workbook: "Classificacao de decisoes",
      },
      {
        number: 8,
        title: "Viver com a Escolha",
        description: "A paz da decisao tomada.",
        isFree: false,
        subLessons: [
          { letter: "A", title: "O remorso como habito", description: "Quando o remorso e padrao, nao resposta a uma ma decisao." },
          { letter: "B", title: "Cada sim implica um nao", description: "Aceitar o luto de cada escolha feita." },
          { letter: "C", title: "A paz da decisao tomada", description: "A liberdade que vem depois de decidir." },
        ],
        workbook: "Ritual de encerramento da decisao",
      },
    ],
    youtubeHooks: [
      { title: "Porque decides por todos e nada por ti", durationMin: 6 },
      { title: "O mito da decisao perfeita", durationMin: 7 },
      { title: "Exercicio de 2 minutos para saber o que queres", durationMin: 5 },
    ],
  },

  // ─── CURSO 6 — A Pele Lembra ───
  {
    slug: "a-pele-lembra",
    number: 6,
    title: "A Pele Lembra",
    subtitle: "Aprender a ouvir o corpo antes de a mente racionalizar",
    arcoEmocional:
      "Comeca pela desconexao. Aprende literacia corporal. Passa pelos sintomas como linguagem. Calibra o sim e o nao do corpo. Aprende a habitar, nao so usar. Termina com o corpo como primeiro conselheiro.",
    diferencial:
      "Nao e um curso de wellness ou mindfulness. E sobre reconectar com a inteligencia do teu corpo — que sempre soube antes de ti.",
    modules: [
      {
        number: 1,
        title: "O Corpo que Ignoras",
        description: "Decadas a calar o corpo.",
        isFree: true,
        subLessons: [
          { letter: "A", title: "Decadas a calar o corpo", description: "O habito de ignorar o que o corpo diz." },
          { letter: "B", title: "A desconexao como norma", description: "Quando nao sentir se torna normal." },
          { letter: "C", title: "O body scan como primeiro passo", description: "A pratica de voltar a habitar o corpo." },
        ],
        workbook: "Body scan guiado",
      },
      {
        number: 2,
        title: "Sintomas como Linguagem",
        description: "O corpo fala quando a boca se cala.",
        isFree: false,
        subLessons: [
          { letter: "A", title: "A enxaqueca antes do Natal", description: "Os padroes entre o corpo e os eventos da vida." },
          { letter: "B", title: "A insonia da conversa evitada", description: "Quando o corpo acorda o que a mente quer esquecer." },
          { letter: "C", title: "Ler sintomas como frases", description: "Traduzir a linguagem do corpo para palavras." },
        ],
        workbook: "Dicionario corporal pessoal",
      },
      {
        number: 3,
        title: "A Memoria do Corpo",
        description: "O corpo guarda o que a mente esquece.",
        isFree: false,
        subLessons: [
          { letter: "A", title: "O corpo guarda o que a mente esquece", description: "A memoria somatica e como se manifesta." },
          { letter: "B", title: "Triggers corporais", description: "Reaccoes fisicas a estimulos que a mente nao reconhece." },
          { letter: "C", title: "Honrar sem reviver", description: "Reconhecer a memoria sem retraumatizar." },
        ],
        workbook: "Mapa de memorias corporais",
      },
      {
        number: 4,
        title: "O Sim e o Nao do Corpo",
        description: "Expansao vs. contratura.",
        isFree: false,
        subLessons: [
          { letter: "A", title: "Expansao vs. contratura", description: "As duas respostas basicas do corpo a qualquer estimulo." },
          { letter: "B", title: "Calibrar no quotidiano", description: "Praticar a leitura corporal nas decisoes do dia-a-dia." },
          { letter: "C", title: "Confiar na bussola", description: "Confiar no corpo como instrumento de navegacao." },
        ],
        workbook: "Exercicios de calibracao corporal",
      },
      {
        number: 5,
        title: "O Corpo e as Emocoes",
        description: "Onde vivem as emocoes no corpo.",
        isFree: false,
        subLessons: [
          { letter: "A", title: "Onde vivem as emocoes no corpo", description: "Mapear onde cada emocao se aloja fisicamente." },
          { letter: "B", title: "Emocoes suprimidas", description: "O custo fisico de emocoes nao expressadas." },
          { letter: "C", title: "Dar espaco sem explodir", description: "Criar espaco para a emocao sem ser engolida por ela." },
        ],
        workbook: "Mapa emocional corporal",
      },
      {
        number: 6,
        title: "O Corpo e a Alimentacao",
        description: "Ouvir o corpo a mesa.",
        isFree: false,
        subLessons: [
          { letter: "A", title: "Comer para calar", description: "A alimentacao como forma de silenciar emocoes." },
          { letter: "B", title: "Fome fisica vs. fome emocional", description: "Distinguir as duas fomes." },
          { letter: "C", title: "Ouvir o corpo a mesa", description: "Comer como acto de presenca, nao de fuga." },
        ],
        workbook: "Diario alimentar emocional",
      },
      {
        number: 7,
        title: "O Corpo e o Descanso",
        description: "Descanso real vs. distraccao.",
        isFree: false,
        subLessons: [
          { letter: "A", title: "Descanso real vs. distraccao", description: "A diferenca entre descansar e apenas parar de trabalhar." },
          { letter: "B", title: "O que o TEU corpo precisa para descansar", description: "O descanso personalizado — nao existe receita universal." },
          { letter: "C", title: "Parar sem culpa", description: "A pratica de parar sem justificar." },
        ],
        workbook: "Plano de descanso personalizado",
      },
      {
        number: 8,
        title: "Habitar (Nao So Usar) o Corpo",
        description: "O corpo como casa, nao como ferramenta.",
        isFree: false,
        subLessons: [
          { letter: "A", title: "O corpo como ferramenta vs. o corpo como casa", description: "A diferenca entre usar o corpo e habita-lo." },
          { letter: "B", title: "Presenca corporalizada", description: "Viver no corpo, nao so na mente." },
          { letter: "C", title: "O corpo como conselheiro", description: "O corpo como o teu primeiro e mais fiel conselheiro." },
        ],
        workbook: "Praticas de presenca corporal",
      },
    ],
    youtubeHooks: [
      { title: "O teu corpo esta a tentar dizer-te algo", durationMin: 7 },
      { title: "Porque ficas doente nas ferias", durationMin: 6 },
      { title: "Reconectar com o corpo em 3 minutos", durationMin: 5 },
    ],
  },

  // ─── CURSO 7 — Limite Sagrado ───
  {
    slug: "limite-sagrado",
    number: 7,
    title: "Limite Sagrado",
    subtitle: "Limites, o preco de agradar, a culpa da recusa",
    arcoEmocional:
      "Comeca pela arqueologia: de onde vem a incapacidade de recusar? Passa pelo custo real de dizer sim a tudo. Treina o nao. Termina com o nao como espaco para o sim.",
    diferencial:
      "Nao e um curso sobre assertividade. E sobre a raiz da dificuldade em dizer nao — e o preco que pagas por cada sim que nao e teu.",
    modules: [
      {
        number: 1,
        title: "A Boa Menina que Cresceu",
        description: "O software de infancia que ainda corre.",
        isFree: true,
        subLessons: [
          { letter: "A", title: "O software de infancia", description: "Os programas de obediencia que ainda correm em ti." },
          { letter: "B", title: "O preco de ser 'boa'", description: "O custo acumulado de agradar." },
          { letter: "C", title: "Actualizar o sistema", description: "Decidir conscientemente que regras ainda servem." },
        ],
        workbook: "Auditoria do software interno",
      },
      {
        number: 2,
        title: "O Preco do Sim Automatico",
        description: "Contabilizar o custo de dizer sim a tudo.",
        isFree: false,
        subLessons: [
          { letter: "A", title: "Contabilizar o custo", description: "Quanto te custa cada sim que nao e teu." },
          { letter: "B", title: "Os ultimos 7 dias", description: "Exercicio: quantos sins automaticos nos ultimos 7 dias?" },
          { letter: "C", title: "O corpo do sim falso", description: "Como o corpo reage quando dizes sim e sentes nao." },
        ],
        workbook: "Diario dos sins automaticos",
      },
      {
        number: 3,
        title: "A Culpa de Recusar",
        description: "De onde vem a culpa de dizer nao.",
        isFree: false,
        subLessons: [
          { letter: "A", title: "De onde vem a culpa", description: "A arqueologia da culpa: quando aprendeste que nao = ma pessoa." },
          { letter: "B", title: "Culpa vs. responsabilidade", description: "Separar culpa real de culpa herdada." },
          { letter: "C", title: "Atravessar a culpa", description: "Dizer nao e sentir a culpa sem voltar atras." },
        ],
        workbook: "Mapa da culpa",
      },
      {
        number: 4,
        title: "A Diferenca entre Ser Amada e Ser Util",
        description: "Quando confundes ser util com ser amada.",
        isFree: false,
        subLessons: [
          { letter: "A", title: "Quando confundes ser util com ser amada", description: "A armadilha de pensar que so serves se serves." },
          { letter: "B", title: "O valor alem da utilidade", description: "O que es quando nao estas a fazer nada por ninguem." },
          { letter: "C", title: "Relacoes transaccionais", description: "Identificar relacoes onde o amor depende da tua utilidade." },
        ],
        workbook: "Teste das relacoes transaccionais",
      },
      {
        number: 5,
        title: "Nao Sem Desculpa",
        description: "O nao curto e sem justificacao.",
        isFree: false,
        subLessons: [
          { letter: "A", title: "A anatomia da justificacao", description: "Porque sentes necessidade de justificar cada nao." },
          { letter: "B", title: "O nao curto", description: "Pratica: dizer nao em menos de 10 palavras." },
          { letter: "C", title: "O desconforto do silencio depois", description: "Sustentar o silencio apos o nao sem preencher." },
        ],
        workbook: "Treino do nao",
      },
      {
        number: 6,
        title: "Limites no Trabalho",
        description: "Dizer nao ao chefe, aos colegas, ao sistema.",
        isFree: false,
        subLessons: [
          { letter: "A", title: "A mulher que faz tudo no escritorio", description: "O padrao de carregar o peso emocional e pratico do trabalho." },
          { letter: "B", title: "Dizer nao ao chefe", description: "Estrategias para limitar sem sabotar a carreira." },
          { letter: "C", title: "Promocao pelo sim vs. respeito pelo nao", description: "O que ganha respeito a longo prazo." },
        ],
        workbook: "Guia de limites profissionais",
      },
      {
        number: 7,
        title: "Limites com Familia",
        description: "A familia como teste maximo.",
        isFree: false,
        subLessons: [
          { letter: "A", title: "A familia como teste maximo", description: "Porque e mais dificil dizer nao a familia." },
          { letter: "B", title: "A chantagem emocional", description: "Reconhecer e responder a chantagem emocional." },
          { letter: "C", title: "Amar com limites", description: "O amor nao exige ausencia de limites." },
        ],
        workbook: "Mapa de limites familiares",
      },
      {
        number: 8,
        title: "O Nao como Espaco para o Sim",
        description: "O que cabe quando largas.",
        isFree: false,
        subLessons: [
          { letter: "A", title: "O que cabe quando largas", description: "O espaco que se abre quando dizes nao ao que nao e teu." },
          { letter: "B", title: "O sim autentico", description: "Quando o sim nasce da liberdade, nao da obrigacao." },
          { letter: "C", title: "Celebrar o nao", description: "Cada nao e um sim a ti." },
        ],
        workbook: "Celebracao dos nao",
      },
    ],
    youtubeHooks: [
      { title: "Porque dizer nao te faz sentir culpada", durationMin: 7 },
      { title: "A diferenca entre ser amada e ser util", durationMin: 8 },
      { title: "Treino de 7 dias para a mulher que diz sim a tudo", durationMin: 6 },
    ],
  },

  // ─── CURSO 8 — Flores no Escuro ───
  {
    slug: "flores-no-escuro",
    number: 8,
    title: "Flores no Escuro",
    subtitle: "As perdas que nao sao morte mas doem como se fossem",
    arcoEmocional:
      "Comeca pelo reconhecimento. Passa pela permissao de chorar o que nao tem funeral. Localiza o luto no corpo. Integra a perda na paisagem de quem es.",
    diferencial:
      "Nao e um curso sobre superar perdas. E sobre fazer luto das perdas que ninguem valida — as que nao tem funeral, flores ou condolencias.",
    modules: [
      {
        number: 1,
        title: "As Perdas que Nao Tem Funeral",
        description: "Nomear o inomeavel.",
        isFree: true,
        subLessons: [
          { letter: "A", title: "Nomear o inomeavel", description: "Dar nome as perdas que o mundo nao reconhece." },
          { letter: "B", title: "Porque ninguem valida", description: "A solidao de um luto sem testemunhas." },
          { letter: "C", title: "Dar peso ao que pesa", description: "Validar a dor sem comparar com a dor dos outros." },
        ],
        workbook: "Inventario das perdas silenciosas",
      },
      {
        number: 2,
        title: "A Permissao que Ninguem Te Deu",
        description: "A unica permissao que precisas.",
        isFree: false,
        subLessons: [
          { letter: "A", title: "As frases que calam", description: "'Segue em frente', 'ja passou', 'ha quem esteja pior'." },
          { letter: "B", title: "A unica permissao que precisas", description: "A tua propria permissao para sentir." },
          { letter: "C", title: "Chorar sem horario", description: "A liberdade de chorar quando o corpo pede." },
        ],
        workbook: "Carta de permissao",
      },
      {
        number: 3,
        title: "O Luto que Vive no Corpo",
        description: "Localizar a perda no corpo.",
        isFree: false,
        subLessons: [
          { letter: "A", title: "Garganta fechada, peito apertado", description: "Os locais fisicos onde o luto se instala." },
          { letter: "B", title: "Localizar a perda", description: "Mapear onde a perda vive no teu corpo." },
          { letter: "C", title: "Dar espaco ao que esta preso", description: "Praticas para libertar o que o corpo segura." },
        ],
        workbook: "Body scan do luto",
      },
      {
        number: 4,
        title: "Luto de Relacoes que Nao Acabaram",
        description: "Chorar o que era enquanto estas no que e.",
        isFree: false,
        subLessons: [
          { letter: "A", title: "A relacao que mudou", description: "Quando a relacao nao acabou mas ja nao e a mesma." },
          { letter: "B", title: "Chorar o que era enquanto estas no que e", description: "Fazer luto de uma versao da relacao sem sair dela." },
          { letter: "C", title: "Aceitar a versao actual", description: "Receber o que existe em vez de chorar o que existia." },
        ],
        workbook: "Mapa relacional: antes e agora",
      },
      {
        number: 5,
        title: "Luto de Versoes de Ti",
        description: "A mulher que eras e a que nunca foste.",
        isFree: false,
        subLessons: [
          { letter: "A", title: "A mulher que eras", description: "Fazer luto de quem eras antes de tudo mudar." },
          { letter: "B", title: "A mulher que nunca foste", description: "Chorar a versao de ti que nunca chegou a existir." },
          { letter: "C", title: "Honrar sem prender", description: "Guardar sem agarrar. Lembrar sem paralisar." },
        ],
        workbook: "Carta as versoes de ti",
      },
      {
        number: 6,
        title: "Luto e Culpa",
        description: "A culpa como companheira do luto.",
        isFree: false,
        subLessons: [
          { letter: "A", title: "A culpa do sobrevivente", description: "A culpa de continuar quando alguem ou algo ficou para tras." },
          { letter: "B", title: "A culpa de sentir alivio", description: "Quando o fim traz alivio e o alivio traz culpa." },
          { letter: "C", title: "Libertar a culpa sem negar a perda", description: "Largar a culpa sem minimizar o que perdeste." },
        ],
        workbook: "Separacao luto-culpa",
      },
      {
        number: 7,
        title: "Rituais de Encerramento",
        description: "Porque os rituais importam.",
        isFree: false,
        subLessons: [
          { letter: "A", title: "Porque os rituais importam", description: "O ritual como ponte entre o dentro e o fora." },
          { letter: "B", title: "Rituais simples", description: "Rituais que podes fazer sozinha, hoje, sem nada especial." },
          { letter: "C", title: "O ritual como corpo em accao", description: "Quando o corpo faz o que as palavras nao conseguem." },
        ],
        workbook: "Guia de rituais pessoais",
      },
      {
        number: 8,
        title: "Carregar Sem Ser Esmagada",
        description: "A perda como paisagem, nao como destino.",
        isFree: false,
        subLessons: [
          { letter: "A", title: "Superar e violencia", description: "'Superar' e uma palavra violenta para quem perdeu." },
          { letter: "B", title: "A perda como paisagem", description: "A perda nao desaparece — integra-se na paisagem de quem es." },
          { letter: "C", title: "Viver com e nao apesar de", description: "Viver com a perda, nao apesar dela." },
        ],
        workbook: "Integracao da perda",
      },
    ],
    youtubeHooks: [
      { title: "As perdas que ninguem te deixou chorar", durationMin: 8 },
      { title: "Porque 'segue em frente' e o pior conselho", durationMin: 6 },
      { title: "Como honrar o que perdeste sem te afogares nele", durationMin: 7 },
    ],
  },

  // ─── CURSO 9 — O Peso e o Chao ───
  {
    slug: "o-peso-e-o-chao",
    number: 9,
    title: "O Peso e o Chao",
    subtitle: "Quando descansar nao resolve",
    arcoEmocional:
      "Comeca pelo inventario do peso. Passa pelo que carregas que nao e teu. Distingue tipos de cansaco. Termina com a pratica de largar.",
    diferencial:
      "Nao e um curso sobre produtividade ou gestao de tempo. E sobre perceber que o que te falta nao e ferias — e pores coisas no chao.",
    modules: [
      {
        number: 1,
        title: "O Inventario do Peso",
        description: "O que carregas.",
        isFree: true,
        subLessons: [
          { letter: "A", title: "O que carregas", description: "Fazer o inventario honesto de tudo o que trazes as costas." },
          { letter: "B", title: "O que escolheste vs. o que te caiu em cima", description: "Separar o peso escolhido do peso imposto." },
          { letter: "C", title: "O peso normalizado", description: "O peso que carregas ha tanto tempo que ja nao sentes." },
        ],
        workbook: "Inventario do peso",
      },
      {
        number: 2,
        title: "A Carga Mental Invisivel",
        description: "O trabalho que ninguem ve.",
        isFree: false,
        subLessons: [
          { letter: "A", title: "O trabalho que ninguem ve", description: "A carga mental que nao aparece em nenhuma lista." },
          { letter: "B", title: "O CEO emocional da familia", description: "Quando es a gestora emocional de toda a gente." },
          { letter: "C", title: "Tornar visivel para negociar", description: "Nomear a carga invisivel para poder partilha-la." },
        ],
        workbook: "Mapa da carga mental",
      },
      {
        number: 3,
        title: "A Mulher que Segura Tudo",
        description: "O mito da mulher forte.",
        isFree: false,
        subLessons: [
          { letter: "A", title: "Quem segura a mulher que segura tudo?", description: "A pergunta que ninguem faz." },
          { letter: "B", title: "O mito da mulher forte", description: "A armadilha de ser admirada pela resistencia." },
          { letter: "C", title: "Pedir ajuda como acto de coragem", description: "Pedir ajuda nao e fraqueza — e sabedoria." },
        ],
        workbook: "Rede de suporte",
      },
      {
        number: 4,
        title: "Tipos de Cansaco",
        description: "Nem todo o cansaco se resolve da mesma forma.",
        isFree: false,
        subLessons: [
          { letter: "A", title: "Cansaco fisico", description: "O cansaco que o sono resolve." },
          { letter: "B", title: "Cansaco emocional", description: "O cansaco que o sono nao resolve." },
          { letter: "C", title: "Cansaco existencial", description: "O cansaco que pede mudanca, nao descanso." },
        ],
        workbook: "Diagnostico do cansaco",
      },
      {
        number: 5,
        title: "O Falso Descanso",
        description: "Scroll nao e descanso.",
        isFree: false,
        subLessons: [
          { letter: "A", title: "Scroll nao e descanso", description: "As actividades que parecem descanso mas esgotam." },
          { letter: "B", title: "Vinho nao e descanso", description: "A diferenca entre anestesiar e descansar." },
          { letter: "C", title: "Descanso real", description: "O que realmente regenera." },
        ],
        workbook: "Auditoria do descanso",
      },
      {
        number: 6,
        title: "A Exaustao como Mensagem",
        description: "O corpo em greve.",
        isFree: false,
        subLessons: [
          { letter: "A", title: "O corpo em greve", description: "Quando o corpo para porque tu nao paras." },
          { letter: "B", title: "Burn-out nao e fraqueza", description: "Burn-out e o resultado de um sistema, nao de uma falha pessoal." },
          { letter: "C", title: "Ouvir antes de colapsar", description: "Os sinais de aviso que antecedem o colapso." },
        ],
        workbook: "Sinais de alarme pessoais",
      },
      {
        number: 7,
        title: "Largar Sem Culpa",
        description: "O medo de que tudo desmorone.",
        isFree: false,
        subLessons: [
          { letter: "A", title: "O medo de que tudo desmorone", description: "O medo de que se largares, tudo cai." },
          { letter: "B", title: "Largar nao e abandonar", description: "A diferenca entre largar e ser irresponsavel." },
          { letter: "C", title: "O teste de largar", description: "Exercicio: o que acontece se nao fizeres isto durante uma semana?" },
        ],
        workbook: "O teste de largar",
      },
      {
        number: 8,
        title: "Por no Chao",
        description: "A arte de por no chao.",
        isFree: false,
        subLessons: [
          { letter: "A", title: "A arte de por no chao", description: "A pratica de pousar o que nao e teu." },
          { letter: "B", title: "O que fica e o que vai", description: "Escolher conscientemente o que continuas a carregar." },
          { letter: "C", title: "Viver mais leve", description: "A leveza como pratica diaria, nao como destino." },
        ],
        workbook: "Ritual de pousar",
      },
    ],
    youtubeHooks: [
      { title: "Porque estas sempre cansada e ferias nao resolvem", durationMin: 7 },
      { title: "A carga mental invisivel", durationMin: 8 },
      { title: "Como largar sem culpa: o exercicio do papel no chao", durationMin: 5 },
    ],
  },

  // ─── CURSO 10 — Voz de Dentro ───
  {
    slug: "voz-de-dentro",
    number: 10,
    title: "Voz de Dentro",
    subtitle: "Dizer o que precisas de dizer a quem mais importa",
    arcoEmocional:
      "Comeca por identificar a conversa. Passa pela preparacao. Aprende a comecar. Aprende a sustentar. Prepara-te para o depois.",
    diferencial:
      "Nao e um curso de comunicacao. E sobre ter a conversa que adias ha meses — nao como confronto, mas como verdade dita com cuidado.",
    modules: [
      {
        number: 1,
        title: "A Conversa que Vive em Ti",
        description: "O loop mental da conversa que adias.",
        isFree: true,
        subLessons: [
          { letter: "A", title: "O loop mental", description: "A conversa que ensaias no chuveiro, no carro, antes de dormir." },
          { letter: "B", title: "Porque evitas", description: "O que te impede de ter a conversa." },
          { letter: "C", title: "O custo do silencio", description: "O que te custa nao dizer o que precisas de dizer." },
        ],
        workbook: "Identificacao da conversa adiada",
      },
      {
        number: 2,
        title: "O que Queres Dizer vs. O que Queres que Aconteca",
        description: "Separar expressao de resultado.",
        isFree: false,
        subLessons: [
          { letter: "A", title: "Separar as duas coisas", description: "O que queres dizer e o que queres que mude sao coisas diferentes." },
          { letter: "B", title: "Ter a conversa sem depender do resultado", description: "Falar para ti, nao para controlar a resposta do outro." },
          { letter: "C", title: "Abdicar do controlo do desfecho", description: "A coragem de dizer sem saber o que vem depois." },
        ],
        workbook: "Exercicio de separacao intencao-resultado",
      },
      {
        number: 3,
        title: "As Palavras que Ajudam e as que Destroem",
        description: "A verdade dita com corpo.",
        isFree: false,
        subLessons: [
          { letter: "A", title: "'Tu sempre' e 'Tu nunca'", description: "As frases que activam defesa em vez de escuta." },
          { letter: "B", title: "O tom conta mais que as palavras", description: "O corpo fala mais alto que o vocabulario." },
          { letter: "C", title: "A verdade dita com corpo", description: "Dizer a verdade com presenca, nao com agressividade." },
        ],
        workbook: "Guia de linguagem nao-violenta",
      },
      {
        number: 4,
        title: "Comecar a Conversa",
        description: "A primeira frase.",
        isFree: false,
        subLessons: [
          { letter: "A", title: "A primeira frase", description: "A frase que abre a porta sem a partir." },
          { letter: "B", title: "Comecar sem acusar", description: "Iniciar pela experiencia, nao pela acusacao." },
          { letter: "C", title: "O timing", description: "Quando e o momento certo (e quando nao e)." },
        ],
        workbook: "Treino de primeiras frases",
      },
      {
        number: 5,
        title: "Sustentar a Conversa",
        description: "Quando o outro reage mal.",
        isFree: false,
        subLessons: [
          { letter: "A", title: "Quando o outro reage mal", description: "O que fazer quando a reaccao nao e a que esperavas." },
          { letter: "B", title: "Ouvir sem desistir", description: "A capacidade de ouvir a resposta sem abandonar a tua verdade." },
          { letter: "C", title: "Pausar sem fugir", description: "A pausa como ferramenta, nao como fuga." },
        ],
        workbook: "Estrategias de sustentacao",
      },
      {
        number: 6,
        title: "Conversas com Parceiros",
        description: "O nao-dito no casamento.",
        isFree: false,
        subLessons: [
          { letter: "A", title: "O nao-dito no casamento", description: "As conversas que o casamento acumula em silencio." },
          { letter: "B", title: "Intimidade e verdade", description: "A verdade como fundacao da intimidade real." },
          { letter: "C", title: "Conversas sobre sexo, dinheiro, futuro", description: "Os tres temas que a maioria dos casais evita." },
        ],
        workbook: "Guia de conversas de casal",
      },
      {
        number: 7,
        title: "Conversas com Pais",
        description: "Falar com quem te criou.",
        isFree: false,
        subLessons: [
          { letter: "A", title: "Falar com quem te criou", description: "A complexidade de dizer a verdade a quem te deu a vida." },
          { letter: "B", title: "Quando nao vale a pena", description: "Quando a conversa e para ti, nao para ele." },
          { letter: "C", title: "Falar para ti, nao para ele", description: "Dizer a verdade mesmo que o outro nao a ouca." },
        ],
        workbook: "Carta nao enviada (exercicio)",
      },
      {
        number: 8,
        title: "O Depois",
        description: "O silencio pos-conversa.",
        isFree: false,
        subLessons: [
          { letter: "A", title: "O silencio pos-conversa", description: "O espaco estranho depois de dizer o que precisavas." },
          { letter: "B", title: "O alivio inesperado", description: "O alivio que vem depois de teres sido verdadeira." },
          { letter: "C", title: "A relacao depois da verdade", description: "O que muda na relacao quando a verdade entra." },
        ],
        workbook: "Reflexao pos-conversa",
      },
    ],
    youtubeHooks: [
      { title: "A conversa que ensaias no chuveiro", durationMin: 7 },
      { title: "Porque o silencio doi mais que a verdade", durationMin: 6 },
      { title: "Como comecar sem as 3 palavras que arruinam tudo", durationMin: 8 },
    ],
  },
];

export function getCourseBySlug(slug: string): CourseData | undefined {
  return COURSES.find((c) => c.slug === slug);
}

export function getAllCourses(): CourseData[] {
  return COURSES;
}

export function getAllCourseSlugs(): CourseSlug[] {
  return COURSES.map((c) => c.slug);
}

export default COURSES;
