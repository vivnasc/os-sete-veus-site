import type { CourseData, CourseSlug } from "@/types/course";

const COURSES: CourseData[] = [
  // ─── CURSO 1 — Ouro Próprio ───
  {
    slug: "ouro-proprio",
    number: 1,
    title: "Ouro Próprio",
    subtitle: "A relação com dinheiro como espelho de ti",
    arcoEmocional:
      "Começa pelo desconforto de olhar para números. Passa pela descoberta dos padrões herdados. Atravessa a vergonha, a culpa de querer mais, o medo de perder. Chega a reconstrução: separar valor pessoal de valor monetário. Termina com direcção: o que quero que o dinheiro financie na minha vida?",
    diferencial:
      "Não é um curso de finanças pessoais. Ensina a desfazer o nó emocional que impede a mulher de ganhar, guardar e gastar de forma alinhada com quem ela realmente é.",
    modules: [
      {
        number: 1,
        title: "O Extracto como Espelho",
        description: "A relação com dinheiro começa por olhar.",
        isFree: false,
        subLessons: [
          { letter: "A", title: "O medo de olhar", description: "O primeiro passo é abrir o extracto sem desviar o olhar." },
          { letter: "B", title: "Ler o extracto como um diário", description: "Cada linha conta uma história sobre o que valorizas." },
          { letter: "C", title: "O corpo e o dinheiro", description: "Onde sentes o dinheiro no corpo? Tensão, vergonha, alívio." },
        ],
        workbook: "Mapa financeiro emocional",
      },
      {
        number: 2,
        title: "A Herança Financeira Emocional",
        description: "O dinheiro que herdaste sem saber.",
        isFree: false,
        subLessons: [
          { letter: "A", title: "Os scripts de infância", description: "As frases sobre dinheiro que absorveste antes dos 10 anos." },
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
          { letter: "A", title: "Vergonha de não ter", description: "A vergonha de não ter o suficiente e o que ela esconde." },
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
          { letter: "A", title: "O desconto automático", description: "Porque baixas o preço antes de alguém pedir." },
          { letter: "B", title: "A ligacao cobrar-merecer", description: "Cobrar o que vale é sentir que mereces receber." },
          { letter: "C", title: "Receber sem devolver imediatamente", description: "A dificuldade de receber sem compensar de volta." },
        ],
        workbook: "Exercício do preço justo",
      },
      {
        number: 5,
        title: "Gastar em Ti",
        description: "A hierarquia invisível dos teus gastos.",
        isFree: false,
        subLessons: [
          { letter: "A", title: "A hierarquia dos gastos", description: "Onde te colocas na lista de prioridades financeiras." },
          { letter: "B", title: "Culpa e prazer", description: "Gastar em ti sem a voz que diz que és egoísta." },
          { letter: "C", title: "O investimento em ti como acto político", description: "Investir em ti não é luxo — é posicionamento." },
        ],
        workbook: "Auditoria de gastos pessoais",
      },
      {
        number: 6,
        title: "Dinheiro e Relações",
        description: "O dinheiro como linguagem nas relações.",
        isFree: false,
        subLessons: [
          { letter: "A", title: "Quem paga, manda?", description: "A dinâmica de poder escondida nas contas partilhadas." },
          { letter: "B", title: "Dependência financeira e medo", description: "Quando a dependência financeira alimenta o medo de sair." },
          { letter: "C", title: "A conversa sobre dinheiro que evitas", description: "A conversa que precisas de ter com quem amas." },
        ],
        workbook: "Guia para a conversa financeira",
      },
      {
        number: 7,
        title: "Ganhar Mais Não Resolve",
        description: "O buraco que o dinheiro não enche.",
        isFree: false,
        subLessons: [
          { letter: "A", title: "O buraco que o dinheiro não enche", description: "Quando mais dinheiro não traz mais paz." },
          { letter: "B", title: "Sabotagem financeira", description: "Os padrões que te fazem perder o que ganhas." },
          { letter: "C", title: "Suficiente: quando é suficiente?", description: "Definir o teu suficiente sem comparação." },
        ],
        workbook: "Mapa da sabotagem financeira",
      },
      {
        number: 8,
        title: "Dinheiro como Liberdade",
        description: "De sobrevivência a direcção.",
        isFree: false,
        subLessons: [
          { letter: "A", title: "De sobrevivência a direcção", description: "Sair do modo sobrevivência e entrar no modo escolha." },
          { letter: "B", title: "O mapa do futuro que queres financiar", description: "Desenhar o futuro que queres e calcular o que custa." },
          { letter: "C", title: "Liberdade, não acumulacao", description: "Dinheiro como ferramenta de liberdade, não de segurança compulsiva." },
        ],
        workbook: "Mapa de liberdade financeira",
      },
    ],
    youtubeHooks: [
      { title: "Porque sentes culpa quando gastas dinheiro em ti mesma?", durationMin: 6 },
      { title: "3 frases sobre dinheiro que a tua mãe te ensinou sem saber", durationMin: 7 },
      { title: "O teste do preço: diz o teu valor em voz alta", durationMin: 5 },
    ],
  },

  // ─── CURSO 2 — Sangue e Seda ───
  {
    slug: "sangue-e-seda",
    number: 2,
    title: "Sangue e Seda",
    subtitle: "A herança invisível entre mães e filhas",
    arcoEmocional:
      "Começa na idealização ou na raiva. Passa pela diferenciação: onde acabo eu e começa ela? Atravessa a herança não-dita, a culpa de crescer, a lealdade que prende. Chega ao lugar mais livre: ver a mãe como mulher inteira e escolher o que levas.",
    diferencial:
      "Não é um curso sobre perdoar a tua mãe. É sobre ver a mulher antes de ti — e devolver-lhe o que é dela sem deixar de a amar.",
    modules: [
      {
        number: 1,
        title: "A Mãe que Carregas",
        description: "A mãe-personagem vs. a mãe-pessoa.",
        isFree: false,
        subLessons: [
          { letter: "A", title: "A mãe-personagem vs. a mãe-pessoa", description: "A distancia entre a mãe que construiste e a mulher que ela e." },
          { letter: "B", title: "Memória ou interpretacao?", description: "O que lembras e o que realmente aconteceu." },
        ],
        workbook: "Retrato da mãe interior",
      },
      {
        number: 2,
        title: "A Herança que Não Pediste",
        description: "O que herdaste sem saber.",
        isFree: false,
        subLessons: [
          { letter: "A", title: "O que herdaste sem saber", description: "Os padrões que passaram de mãe para filha sem palavras." },
          { letter: "B", title: "Repetição e oposição: ambas são herança", description: "Repetir a mãe ou fazer o oposto — ambas são respostas a ela." },
          { letter: "C", title: "Escolher o que mantens", description: "Separar conscientemente o que levas e o que devolves." },
        ],
        workbook: "Inventário da herança materna",
      },
      {
        number: 3,
        title: "A Culpa de Crescer",
        description: "Crescer como traição silenciosa.",
        isFree: false,
        subLessons: [
          { letter: "A", title: "Crescer como traição", description: "A sensação de que evoluir é abandonar a mãe." },
          { letter: "B", title: "A lealdade invisível", description: "Os compromissos inconscientes que te prendem ao passado." },
          { letter: "C", title: "Ser livre sem abandonar", description: "Crescer sem cortar — diferenciar sem destruir." },
        ],
        workbook: "Mapa da lealdade invisível",
      },
      {
        number: 4,
        title: "A Raiva Sagrada",
        description: "A raiva que nunca te permitiste.",
        isFree: false,
        subLessons: [
          { letter: "A", title: "A raiva que nunca te permitiste", description: "A raiva guardada que pesa mais do que a expressada." },
          { letter: "B", title: "Raiva vs. rejeição", description: "Sentir raiva da mãe não é rejeitá-la." },
          { letter: "C", title: "O que fazer com a raiva", description: "Canais saudáveis para a raiva que guardaste." },
        ],
        workbook: "Carta a raiva",
      },
      {
        number: 5,
        title: "O Silêncio entre Mãe e Filha",
        description: "O que nunca foi dito entre vos.",
        isFree: false,
        subLessons: [
          { letter: "A", title: "O que nunca foi dito", description: "As palavras que ficaram por dizer entre mãe e filha." },
          { letter: "B", title: "O silêncio como protecção", description: "O silêncio que protege mas também aprisiona." },
          { letter: "C", title: "Quebrar o silêncio sem destruir", description: "Dizer sem explodir. Falar sem ferir." },
        ],
        workbook: "A carta não enviada",
      },
      {
        number: 6,
        title: "O Corpo da Mãe, o Corpo da Filha",
        description: "O que a mãe te ensinou sobre o teu corpo.",
        isFree: false,
        subLessons: [
          { letter: "A", title: "O que a mãe te ensinou sobre o teu corpo", description: "As mensagens sobre o corpo feminino que absorveste." },
          { letter: "B", title: "O corpo como territorio herdado", description: "O teu corpo como extensao do corpo da tua mãe." },
        ],
        workbook: "Mapa corporal geracional",
      },
      {
        number: 7,
        title: "Quando a Mãe Não Foi Suficiente",
        description: "A mãe que não pode dar o que não tinha.",
        isFree: false,
        subLessons: [
          { letter: "A", title: "A mãe que não pode", description: "Distinguir entre não quis e não pôde." },
          { letter: "B", title: "Lamentar sem culpar", description: "Sentir a falta sem transformar em acusação." },
          { letter: "C", title: "A mãe interior", description: "Construir internamente o que não recebeste externamente." },
        ],
        workbook: "A mãe que precisavas vs. a mãe que tiveste",
      },
      {
        number: 8,
        title: "Ser Filha e Ser Mãe ao Mesmo Tempo",
        description: "O loop geracional e como interrompê-lo.",
        isFree: false,
        subLessons: [
          { letter: "A", title: "O loop geracional", description: "O que passas adiante sem querer." },
          { letter: "B", title: "Interromper o padrão", description: "Escolher conscientemente o que transmites." },
          { letter: "C", title: "A materia que passas adiante", description: "O que queres que a próxima geração receba de ti." },
        ],
        workbook: "Carta a próxima geração",
      },
      {
        number: 9,
        title: "Ver a Mulher, Não Só a Mãe",
        description: "A despedida da filha que precisava.",
        isFree: false,
        subLessons: [
          { letter: "A", title: "A mãe antes de ti", description: "A mulher que a tua mãe era antes de ser tua mãe." },
          { letter: "B", title: "Ver sem perdoar (se não quiseres)", description: "Compreender não exige perdao. Ver é suficiente." },
          { letter: "C", title: "A despedida da filha que precisava", description: "Despedir-te da filha que esperava e tornar-te a mulher que és." },
        ],
        workbook: "Ritual de encerramento",
      },
    ],
    youtubeHooks: [
      { title: "3 sinais de que estás a repetir a vida da tua mãe sem saber", durationMin: 8 },
      { title: "Porque discutir com a tua mãe te faz sentir como se tivesses 12 anos", durationMin: 6 },
      { title: "A diferença entre perdoar e compreender", durationMin: 7 },
    ],
  },

  // ─── CURSO 3 — A Arte da Inteireza ───
  {
    slug: "a-arte-da-inteireza",
    number: 3,
    title: "A Arte da Inteireza",
    subtitle: "Amar sem te perderes no outro",
    arcoEmocional:
      "Começa pelo reconhecimento: em que momento deixas de te sentir? Passa pelos padrões. Atravessa a dor de relações passadas onde te perdeste. Reconstroi a imagem do que é estar com alguém sem abandonar o centro. Termina com a prática diaria de presença relacional.",
    diferencial:
      "Não é um curso sobre relações. É sobre o momento exacto em que desapareces dentro de uma — e como voltar.",
    modules: [
      {
        number: 1,
        title: "O Momento em que Desapareces",
        description: "O ponto de mutação em que deixas de ser tu.",
        isFree: false,
        subLessons: [
          { letter: "A", title: "O ponto de mutação", description: "O momento exacto em que deixas de te sentir dentro da relação." },
          { letter: "B", title: "Os sinais no corpo", description: "O corpo avisa antes da mente perceber." },
          { letter: "C", title: "O tanto faz que não é tanto faz", description: "A indiferença como mecanismo de protecção." },
        ],
        workbook: "Mapa dos pontos de desaparecimento",
      },
      {
        number: 2,
        title: "O Modelo de Amor que Absorveste",
        description: "O modelo de amor que carregas sem saber.",
        isFree: false,
        subLessons: [
          { letter: "A", title: "Amor como sacrifício", description: "Quando aprendeste que amar é abdicar." },
          { letter: "B", title: "Amor como salvação", description: "Quando procuras no outro o que falta em ti." },
          { letter: "C", title: "Amor como fusão", description: "Quando amar significa fundir-se até desaparecer." },
        ],
        workbook: "Arqueologia do modelo de amor",
      },
      {
        number: 3,
        title: "Atrair o Mesmo Padrão",
        description: "A repetição não é azar.",
        isFree: false,
        subLessons: [
          { letter: "A", title: "A repetição não é azar", description: "Porque atrais o mesmo tipo de relação." },
          { letter: "B", title: "O familiar confundido com amor", description: "Quando o que doi é confundido com intimidade." },
          { letter: "C", title: "Interromper o ciclo", description: "Como quebrar o padrão sem esperar pela relação perfeita." },
        ],
        workbook: "Mapa de padrões relacionais",
      },
      {
        number: 4,
        title: "Ter Necessidades Não é Ser Carente",
        description: "Nomear o que precisas sem pedir desculpa.",
        isFree: false,
        subLessons: [
          { letter: "A", title: "A arma da palavra 'carente'", description: "Como a palavra 'carente' é usada para te silenciar." },
          { letter: "B", title: "Nomear o que precisas", description: "A diferença entre necessidade e dependência." },
          { letter: "C", title: "Pedir sem pedir desculpa", description: "Pedir o que precisas como acto de dignidade, não de fraqueza." },
        ],
        workbook: "Inventário de necessidades",
      },
      {
        number: 5,
        title: "Os Limites Dentro do Amor",
        description: "Limites não são muros.",
        isFree: false,
        subLessons: [
          { letter: "A", title: "Limites não são muros", description: "A diferença entre proteger-te e fechar-te." },
          { letter: "B", title: "O medo de perder ao limitar", description: "O medo de que limites afastem quem amas." },
          { letter: "C", title: "Limites práticos", description: "Frases, gestos e práticas concretas para o dia-a-dia." },
        ],
        workbook: "Guia prático de limites",
      },
      {
        number: 6,
        title: "Solidao vs. Solitude",
        description: "A diferença entre estar sozinha e estar contigo.",
        isFree: false,
        subLessons: [
          { letter: "A", title: "O medo de ficar sozinha", description: "O medo que te faz aceitar menos do que mereces." },
          { letter: "B", title: "Aprender a estar contigo", description: "A prática de solitude como fundação do amor." },
          { letter: "C", title: "A relação contigo como fundação", description: "A qualidade da relação contigo define a qualidade das outras." },
        ],
        workbook: "Práticas de solitude",
      },
      {
        number: 7,
        title: "O Sexo como Termometro",
        description: "O que o desejo revela sobre a relação.",
        isFree: false,
        subLessons: [
          { letter: "A", title: "Desejo autêntico vs. desejo performativo", description: "A diferença entre querer e achar que deves querer." },
          { letter: "B", title: "Prazer como direito", description: "O prazer não é bónus — é linguagem." },
          { letter: "C", title: "Falar sobre sexo sem vergonha", description: "A conversa sobre desejo como acto de intimidade." },
        ],
        workbook: "Mapa do desejo autêntico",
      },
      {
        number: 8,
        title: "Dois Corpos Inteiros",
        description: "Amor como proximidade entre corpos inteiros.",
        isFree: false,
        subLessons: [
          { letter: "A", title: "A imagem do amor saudável", description: "O que é realmente estar com alguém sem te perder." },
          { letter: "B", title: "O espaço entre os dois", description: "O espaço como sinal de saúde, não de distancia." },
          { letter: "C", title: "Ficar de forma diferente ou sair de forma inteira", description: "Quando mudar a relação é quando terminá-la." },
        ],
        workbook: "Visao da relação inteira",
      },
    ],
    youtubeHooks: [
      { title: "5 sinais de que estás a desaparecer numa relação", durationMin: 7 },
      { title: "Porque atrais sempre o mesmo tipo de pessoa", durationMin: 8 },
      { title: "A diferença entre estar disponivel e não ter vida própria", durationMin: 6 },
    ],
  },

  // ─── CURSO 4 — Depois do Fogo ───
  {
    slug: "depois-do-fogo",
    number: 4,
    title: "Depois do Fogo",
    subtitle: "Quando a vida te pede para começar de novo",
    arcoEmocional:
      "Começa no luto do que acabou. Passa pelo vazio entre o fim e o inicio. Reconstroi identidade fora dos papéis que desempenhaste. Atravessa o medo do desconhecido. Termina com os primeiros passos a partir de onde estas.",
    diferencial:
      "Não é um curso motivacional sobre recomeços. É sobre o espaço entre o fim e o inicio — e como habita-lo sem fugir.",
    modules: [
      {
        number: 1,
        title: "Chorar o que Acabou",
        description: "A permissao de acabar de acabar.",
        isFree: false,
        subLessons: [
          { letter: "A", title: "A permissao de acabar de acabar", description: "Dar tempo ao luto antes de correr para o novo." },
          { letter: "B", title: "O elogio fúnebre ao que foi", description: "Honrar o que existiu, mesmo que tenha doido." },
          { letter: "C", title: "O corpo no luto", description: "Onde mora o luto no teu corpo." },
        ],
        workbook: "Ritual de encerramento",
      },
      {
        number: 2,
        title: "O Vazio que Assusta",
        description: "O espaço entre o fim e o inicio.",
        isFree: false,
        subLessons: [
          { letter: "A", title: "O espaço entre o fim e o inicio", description: "O limbo onde já não es quem eras e ainda não es quem vais ser." },
          { letter: "B", title: "O vazio como solo", description: "O vazio não é ausência — é preparação." },
          { letter: "C", title: "A diferença entre pausa e paralisia", description: "Como distinguir repouso necessario de medo disfarçado." },
        ],
        workbook: "Mapa do vazio",
      },
      {
        number: 3,
        title: "Quem Sou Eu Sem Aquilo?",
        description: "Identidade além dos papéis.",
        isFree: false,
        subLessons: [
          { letter: "A", title: "Identidade ligada a papéis", description: "O que sobra quando tiras o título, a relação, o papel." },
          { letter: "B", title: "Os papéis que te definiram", description: "Mãe, esposa, profissional — quem es sem isso?" },
          { letter: "C", title: "Reconstruir identidade", description: "Construir a partir do que resta, não do que falta." },
        ],
        workbook: "Inventário de identidade",
      },
      {
        number: 4,
        title: "O Medo do Desconhecido",
        description: "Avancar com medo.",
        isFree: false,
        subLessons: [
          { letter: "A", title: "Porque o conhecido doi menos que o incerto", description: "A preferencia pelo sofrimento familiar." },
          { letter: "B", title: "O corpo no medo", description: "As respostas físicas ao desconhecido." },
          { letter: "C", title: "Avancar com medo", description: "Não esperar que o medo passe para começar a andar." },
        ],
        workbook: "Mapa do medo do desconhecido",
      },
      {
        number: 5,
        title: "O Peso das Opiniões",
        description: "Recomeçar em silêncio.",
        isFree: false,
        subLessons: [
          { letter: "A", title: "O que os outros esperam de ti", description: "As expectativas externas que pesam no recomeço." },
          { letter: "B", title: "A vergonha do 'falhanço'", description: "O estigma de recomeçar como se fosse fracasso." },
          { letter: "C", title: "Recomeçar em silêncio", description: "O direito de recomeçar sem anunciar." },
        ],
        workbook: "Filtro de opiniões",
      },
      {
        number: 6,
        title: "Recomeçar aos 30, 40, 50",
        description: "A mentira do tarde demais.",
        isFree: false,
        subLessons: [
          { letter: "A", title: "A mentira do 'tarde demais'", description: "Desmontar a narrativa do prazo de validade." },
          { letter: "B", title: "A sabedoria que a idade traz ao recomeço", description: "O que sabes agora que não sabias antes." },
          { letter: "C", title: "O corpo que já viveu", description: "Honrar o corpo como arquivo de experiência." },
        ],
        workbook: "Linha do tempo dos recomeços",
      },
      {
        number: 7,
        title: "O Dinheiro do Recomeco",
        description: "A insegurança financeira do recomeço.",
        isFree: false,
        subLessons: [
          { letter: "A", title: "A insegurança financeira", description: "O medo financeiro como barreira ao recomeço." },
          { letter: "B", title: "Começar com pouco", description: "O mínimo viável para dar o primeiro passo." },
          { letter: "C", title: "O mínimo viável emocional", description: "O que precisas emocionalmente para recomeçar." },
        ],
        workbook: "Plano mínimo viável",
      },
      {
        number: 8,
        title: "Começar a Partir de Aqui",
        description: "Não apagar — integrar.",
        isFree: false,
        subLessons: [
          { letter: "A", title: "Não apagar — integrar", description: "Recomeçar não é apagar. É construir com o que tens." },
          { letter: "B", title: "Os primeiros passos", description: "Acções pequenas que mudam a direcção." },
          { letter: "C", title: "A mulher que já recomecou", description: "Reconhecer que o recomeço já esta em curso." },
        ],
        workbook: "Os 7 primeiros passos",
      },
    ],
    youtubeHooks: [
      { title: "Porque recomeçar da mais medo do que ficar", durationMin: 7 },
      { title: "A mentira do 'voltar a estaca zero'", durationMin: 6 },
      { title: "Como saber se é cedo ou tarde demais", durationMin: 8 },
    ],
  },

  // ─── CURSO 5 — Olhos Abertos ───
  {
    slug: "olhos-abertos",
    number: 5,
    title: "Olhos Abertos",
    subtitle: "Decidir a partir de clareza, não de medo",
    arcoEmocional:
      "Começa na paralisia. Passa pelas vozes que não são tuas. Aprende a ouvir o corpo. Desmonta falsas dicotomias. Termina a viver com a escolha sem remorso.",
    diferencial:
      "Não ensina a tomar decisões melhores. Ensina a distinguir as decisões do medo das da clareza — e a confiar no processo, mesmo sem certezas.",
    modules: [
      {
        number: 1,
        title: "A Paralisia e o que Ela Protege",
        description: "Não decidir é decidir.",
        isFree: false,
        subLessons: [
          { letter: "A", title: "Não decidir é decidir", description: "A indecisao como decisão disfarçada." },
          { letter: "B", title: "A ilusao de manter todas as opções abertas", description: "O custo de não escolher." },
          { letter: "C", title: "O custo real da indecisao", description: "O que perdes enquanto não decides." },
        ],
        workbook: "Inventário das decisões adiadas",
      },
      {
        number: 2,
        title: "A Voz que Não é Tua",
        description: "Quem fala quando decides.",
        isFree: false,
        subLessons: [
          { letter: "A", title: "Quem fala quando 'decides'", description: "As vozes internas que se mascaram de tuas." },
          { letter: "B", title: "O 'devias' como alarme", description: "Cada 'devias' é sinal de uma voz que não é tua." },
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
          { letter: "A", title: "O corpo sabe primeiro", description: "A inteligencia somática na tomada de decisão." },
          { letter: "B", title: "Calibrar o sim e o não corporal", description: "Aprender a ler a expansao e a contratura." },
          { letter: "C", title: "Integrar corpo e mente", description: "Quando o corpo e a mente discordam." },
        ],
        workbook: "Exercícios de decisão somática",
      },
      {
        number: 4,
        title: "Falsas Dicotomias",
        description: "Ou isto ou aquilo — sera?",
        isFree: false,
        subLessons: [
          { letter: "A", title: "Ou isto ou aquilo", description: "A maioria das decisões não é binária." },
          { letter: "B", title: "A pressao de urgência artificial", description: "Nem tudo precisa de ser decidido agora." },
          { letter: "C", title: "Decidir por fases", description: "O direito de decidir aos poucos." },
        ],
        workbook: "Desconstrucao de dilemas",
      },
      {
        number: 5,
        title: "O Medo de Errar",
        description: "O erro como informação.",
        isFree: false,
        subLessons: [
          { letter: "A", title: "Errar é humano", description: "Retirar o peso catastrófico do erro." },
          { letter: "B", title: "O erro como informação", description: "Cada erro traz dados que a indecisao não traz." },
          { letter: "C", title: "A decisão imperfeita vs. a indecisao perfeita", description: "Uma decisão imperfeita move. A indecisao perfeita paralisa." },
        ],
        workbook: "Diário de erros uteis",
      },
      {
        number: 6,
        title: "Decidir por Ti (Não por Todos)",
        description: "A mulher que decide por todos e nada por si.",
        isFree: false,
        subLessons: [
          { letter: "A", title: "A mulher que decide por todos e nada por si", description: "O padrão de priorizar as decisões dos outros." },
          { letter: "B", title: "Culpa de priorizar", description: "A culpa de te colocares em primeiro." },
          { letter: "C", title: "O 'egoísmo' saudável", description: "Decidir por ti não é egoísmo — é sobrevivência." },
        ],
        workbook: "Mapa de decisões delegadas",
      },
      {
        number: 7,
        title: "Decisões Irrevogáveis e Revogáveis",
        description: "A maioria é revogável.",
        isFree: false,
        subLessons: [
          { letter: "A", title: "A maioria é revogável", description: "Quase tudo pode ser refeito, ajustado, redirecionado." },
          { letter: "B", title: "As poucas irrevogaveis", description: "Identificar as decisões que merecem mais tempo." },
          { letter: "C", title: "Decidir sem garantias", description: "A coragem de decidir sem saber o resultado." },
        ],
        workbook: "Classificacao de decisões",
      },
      {
        number: 8,
        title: "Viver com a Escolha",
        description: "A paz da decisão tomada.",
        isFree: false,
        subLessons: [
          { letter: "A", title: "O remorso como hábito", description: "Quando o remorso é padrão, não resposta a uma ma decisão." },
          { letter: "B", title: "Cada sim implica um não", description: "Aceitar o luto de cada escolha feita." },
          { letter: "C", title: "A paz da decisão tomada", description: "A liberdade que vem depois de decidir." },
        ],
        workbook: "Ritual de encerramento da decisão",
      },
    ],
    youtubeHooks: [
      { title: "Porque decides por todos e nada por ti", durationMin: 6 },
      { title: "O mito da decisão perfeita", durationMin: 7 },
      { title: "Exercício de 2 minutos para saber o que queres", durationMin: 5 },
    ],
  },

  // ─── CURSO 6 — A Pele Lembra ───
  {
    slug: "a-pele-lembra",
    number: 6,
    title: "A Pele Lembra",
    subtitle: "Aprender a ouvir o corpo antes de a mente racionalizar",
    arcoEmocional:
      "Começa pela desconexão. Aprende literacia corporal. Passa pelos sintomas como linguagem. Calibra o sim e o não do corpo. Aprende a habitar, não só usar. Termina com o corpo como primeiro conselheiro.",
    diferencial:
      "Não é um curso de wellness ou mindfulness. É sobre reconectar com a inteligencia do teu corpo — que sempre soube antes de ti.",
    modules: [
      {
        number: 1,
        title: "O Corpo que Ignoras",
        description: "Decadas a calar o corpo.",
        isFree: false,
        subLessons: [
          { letter: "A", title: "Decadas a calar o corpo", description: "O hábito de ignorar o que o corpo diz." },
          { letter: "B", title: "A desconexão como norma", description: "Quando não sentir se torna normal." },
          { letter: "C", title: "O body scan como primeiro passo", description: "A prática de voltar a habitar o corpo." },
        ],
        workbook: "Body scan guiado",
      },
      {
        number: 2,
        title: "Sintomas como Linguagem",
        description: "O corpo fala quando a boca se cala.",
        isFree: false,
        subLessons: [
          { letter: "A", title: "A enxaqueca antes do Natal", description: "Os padrões entre o corpo e os eventos da vida." },
          { letter: "B", title: "A insónia da conversa evitada", description: "Quando o corpo acorda o que a mente quer esquecer." },
          { letter: "C", title: "Ler sintomas como frases", description: "Traduzir a linguagem do corpo para palavras." },
        ],
        workbook: "Dicionário corporal pessoal",
      },
      {
        number: 3,
        title: "A Memória do Corpo",
        description: "O corpo guarda o que a mente esquece.",
        isFree: false,
        subLessons: [
          { letter: "A", title: "O corpo guarda o que a mente esquece", description: "A memória somática e como se manifesta." },
          { letter: "B", title: "Triggers corporais", description: "Reacções físicas a estimulos que a mente não reconhece." },
          { letter: "C", title: "Honrar sem reviver", description: "Reconhecer a memória sem retraumatizar." },
        ],
        workbook: "Mapa de memórias corporais",
      },
      {
        number: 4,
        title: "O Sim e o Não do Corpo",
        description: "Expansao vs. contratura.",
        isFree: false,
        subLessons: [
          { letter: "A", title: "Expansao vs. contratura", description: "As duas respostas básicas do corpo a qualquer estimulo." },
          { letter: "B", title: "Calibrar no quotidiano", description: "Praticar a leitura corporal nas decisões do dia-a-dia." },
          { letter: "C", title: "Confiar na bússola", description: "Confiar no corpo como instrumento de navegação." },
        ],
        workbook: "Exercícios de calibração corporal",
      },
      {
        number: 5,
        title: "O Corpo e as Emocoes",
        description: "Onde vivem as emoções no corpo.",
        isFree: false,
        subLessons: [
          { letter: "A", title: "Onde vivem as emoções no corpo", description: "Mapear onde cada emoção se aloja fisicamente." },
          { letter: "B", title: "Emocoes suprimidas", description: "O custo físico de emoções não expressadas." },
          { letter: "C", title: "Dar espaço sem explodir", description: "Criar espaço para a emoção sem ser engolida por ela." },
        ],
        workbook: "Mapa emocional corporal",
      },
      {
        number: 6,
        title: "O Corpo e a Alimentação",
        description: "Ouvir o corpo a mesa.",
        isFree: false,
        subLessons: [
          { letter: "A", title: "Comer para calar", description: "A alimentação como forma de silenciar emoções." },
          { letter: "B", title: "Fome fisica vs. fome emocional", description: "Distinguir as duas fomes." },
          { letter: "C", title: "Ouvir o corpo a mesa", description: "Comer como acto de presença, não de fuga." },
        ],
        workbook: "Diário alimentar emocional",
      },
      {
        number: 7,
        title: "O Corpo e o Descanso",
        description: "Descanso real vs. distracção.",
        isFree: false,
        subLessons: [
          { letter: "A", title: "Descanso real vs. distracção", description: "A diferença entre descansar e apenas parar de trabalhar." },
          { letter: "B", title: "O que o TEU corpo precisa para descansar", description: "O descanso personalizado — não existe receita universal." },
          { letter: "C", title: "Parar sem culpa", description: "A prática de parar sem justificar." },
        ],
        workbook: "Plano de descanso personalizado",
      },
      {
        number: 8,
        title: "Habitar (Não Só Usar) o Corpo",
        description: "O corpo como casa, não como ferramenta.",
        isFree: false,
        subLessons: [
          { letter: "A", title: "O corpo como ferramenta vs. o corpo como casa", description: "A diferença entre usar o corpo e habita-lo." },
          { letter: "B", title: "Presenca corporalizada", description: "Viver no corpo, não só na mente." },
          { letter: "C", title: "O corpo como conselheiro", description: "O corpo como o teu primeiro e mais fiel conselheiro." },
        ],
        workbook: "Práticas de presença corporal",
      },
    ],
    youtubeHooks: [
      { title: "O teu corpo esta a tentar dizer-te algo", durationMin: 7 },
      { title: "Porque ficas doente nas férias", durationMin: 6 },
      { title: "Reconectar com o corpo em 3 minutos", durationMin: 5 },
    ],
  },

  // ─── CURSO 7 — Limite Sagrado ───
  {
    slug: "limite-sagrado",
    number: 7,
    title: "Limite Sagrado",
    subtitle: "Limites, o preço de agradar, a culpa da recusa",
    arcoEmocional:
      "Começa pela arqueologia: de onde vem a incapacidade de recusar? Passa pelo custo real de dizer sim a tudo. Treina o não. Termina com o não como espaço para o sim.",
    diferencial:
      "Não é um curso sobre assertividade. É sobre a raiz da dificuldade em dizer não — e o preço que pagas por cada sim que não é teu.",
    modules: [
      {
        number: 1,
        title: "A Boa Menina que Cresceu",
        description: "O software de infância que ainda corre.",
        isFree: false,
        subLessons: [
          { letter: "A", title: "O software de infância", description: "Os programas de obediência que ainda correm em ti." },
          { letter: "B", title: "O preço de ser 'boa'", description: "O custo acumulado de agradar." },
          { letter: "C", title: "Actualizar o sistema", description: "Decidir conscientemente que regras ainda servem." },
        ],
        workbook: "Auditoria do software interno",
      },
      {
        number: 2,
        title: "O Preço do Sim Automatico",
        description: "Contabilizar o custo de dizer sim a tudo.",
        isFree: false,
        subLessons: [
          { letter: "A", title: "Contabilizar o custo", description: "Quanto te custa cada sim que não é teu." },
          { letter: "B", title: "Os últimos 7 dias", description: "Exercício: quantos sins automáticos nos últimos 7 dias?" },
          { letter: "C", title: "O corpo do sim falso", description: "Como o corpo reage quando dizes sim e sentes não." },
        ],
        workbook: "Diário dos sins automáticos",
      },
      {
        number: 3,
        title: "A Culpa de Recusar",
        description: "De onde vem a culpa de dizer não.",
        isFree: false,
        subLessons: [
          { letter: "A", title: "De onde vem a culpa", description: "A arqueologia da culpa: quando aprendeste que não = má pessoa." },
          { letter: "B", title: "Culpa vs. responsabilidade", description: "Separar culpa real de culpa herdada." },
          { letter: "C", title: "Atravessar a culpa", description: "Dizer não é sentir a culpa sem voltar atras." },
        ],
        workbook: "Mapa da culpa",
      },
      {
        number: 4,
        title: "A Diferença entre Ser Amada e Ser Útil",
        description: "Quando confundes ser útil com ser amada.",
        isFree: false,
        subLessons: [
          { letter: "A", title: "Quando confundes ser útil com ser amada", description: "A armadilha de pensar que so serves se serves." },
          { letter: "B", title: "O valor além da utilidade", description: "O que és quando não estás a fazer nada por ninguém." },
          { letter: "C", title: "Relações transaccionais", description: "Identificar relações onde o amor depende da tua utilidade." },
        ],
        workbook: "Teste das relações transaccionais",
      },
      {
        number: 5,
        title: "Não Sem Desculpa",
        description: "O não curto e sem justificação.",
        isFree: false,
        subLessons: [
          { letter: "A", title: "A anatomia da justificação", description: "Porque sentes necessidade de justificar cada não." },
          { letter: "B", title: "O não curto", description: "Prática: dizer não em menos de 10 palavras." },
          { letter: "C", title: "O desconforto do silêncio depois", description: "Sustentar o silêncio apos o não sem preencher." },
        ],
        workbook: "Treino do não",
      },
      {
        number: 6,
        title: "Limites no Trabalho",
        description: "Dizer não ao chefe, aos colegas, ao sistema.",
        isFree: false,
        subLessons: [
          { letter: "A", title: "A mulher que faz tudo no escritório", description: "O padrão de carregar o peso emocional e prático do trabalho." },
          { letter: "B", title: "Dizer não ao chefe", description: "Estratégias para limitar sem sabotar a carreira." },
          { letter: "C", title: "Promoção pelo sim vs. respeito pelo não", description: "O que ganha respeito a longo prazo." },
        ],
        workbook: "Guia de limites profissionais",
      },
      {
        number: 7,
        title: "Limites com Familia",
        description: "A família como teste máximo.",
        isFree: false,
        subLessons: [
          { letter: "A", title: "A família como teste máximo", description: "Porque é mais difícil dizer não a família." },
          { letter: "B", title: "A chantagem emocional", description: "Reconhecer e responder a chantagem emocional." },
          { letter: "C", title: "Amar com limites", description: "O amor não exige ausência de limites." },
        ],
        workbook: "Mapa de limites familiares",
      },
      {
        number: 8,
        title: "O Não como Espaco para o Sim",
        description: "O que cabe quando largas.",
        isFree: false,
        subLessons: [
          { letter: "A", title: "O que cabe quando largas", description: "O espaço que se abre quando dizes não ao que não é teu." },
          { letter: "B", title: "O sim autêntico", description: "Quando o sim nasce da liberdade, não da obrigação." },
          { letter: "C", title: "Celebrar o não", description: "Cada não é um sim a ti." },
        ],
        workbook: "Celebração dos não",
      },
    ],
    youtubeHooks: [
      { title: "Porque dizer não te faz sentir culpada", durationMin: 7 },
      { title: "A diferença entre ser amada e ser útil", durationMin: 8 },
      { title: "Treino de 7 dias para a mulher que diz sim a tudo", durationMin: 6 },
    ],
  },

  // ─── CURSO 8 — Flores no Escuro ───
  {
    slug: "flores-no-escuro",
    number: 8,
    title: "Flores no Escuro",
    subtitle: "As perdas que não são morte mas doem como se fossem",
    arcoEmocional:
      "Começa pelo reconhecimento. Passa pela permissao de chorar o que não tem funeral. Localiza o luto no corpo. Integra a perda na paisagem de quem es.",
    diferencial:
      "Não é um curso sobre superar perdas. É sobre fazer luto das perdas que ninguém valida — as que não tem funeral, flores ou condolencias.",
    modules: [
      {
        number: 1,
        title: "As Perdas que Não Tem Funeral",
        description: "Nomear o inomeável.",
        isFree: false,
        subLessons: [
          { letter: "A", title: "Nomear o inomeável", description: "Dar nome as perdas que o mundo não reconhece." },
          { letter: "B", title: "Porque ninguém valida", description: "A solidao de um luto sem testemunhas." },
          { letter: "C", title: "Dar peso ao que pesa", description: "Validar a dor sem comparar com a dor dos outros." },
        ],
        workbook: "Inventário das perdas silenciosas",
      },
      {
        number: 2,
        title: "A Permissao que Ninguem Te Deu",
        description: "A única permissao que precisas.",
        isFree: false,
        subLessons: [
          { letter: "A", title: "As frases que calam", description: "'Segue em frente', 'já passou', 'ha quem esteja pior'." },
          { letter: "B", title: "A única permissao que precisas", description: "A tua própria permissao para sentir." },
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
          { letter: "C", title: "Dar espaço ao que esta preso", description: "Práticas para libertar o que o corpo segura." },
        ],
        workbook: "Body scan do luto",
      },
      {
        number: 4,
        title: "Luto de Relações que Não Acabaram",
        description: "Chorar o que era enquanto estas no que e.",
        isFree: false,
        subLessons: [
          { letter: "A", title: "A relação que mudou", description: "Quando a relação não acabou mas já não e a mesma." },
          { letter: "B", title: "Chorar o que era enquanto estas no que e", description: "Fazer luto de uma versão da relação sem sair dela." },
          { letter: "C", title: "Aceitar a versão actual", description: "Receber o que existe em vez de chorar o que existia." },
        ],
        workbook: "Mapa relacional: antes e agora",
      },
      {
        number: 5,
        title: "Luto de Versoes de Ti",
        description: "A mulher que eras é a que nunca foste.",
        isFree: false,
        subLessons: [
          { letter: "A", title: "A mulher que eras", description: "Fazer luto de quem eras antes de tudo mudar." },
          { letter: "B", title: "A mulher que nunca foste", description: "Chorar a versão de ti que nunca chegou a existir." },
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
          { letter: "A", title: "A culpa do sobrevivente", description: "A culpa de continuar quando alguém ou algo ficou para tras." },
          { letter: "B", title: "A culpa de sentir alívio", description: "Quando o fim traz alívio e o alívio traz culpa." },
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
          { letter: "C", title: "O ritual como corpo em acção", description: "Quando o corpo faz o que as palavras não conseguem." },
        ],
        workbook: "Guia de rituais pessoais",
      },
      {
        number: 8,
        title: "Carregar Sem Ser Esmagada",
        description: "A perda como paisagem, não como destino.",
        isFree: false,
        subLessons: [
          { letter: "A", title: "Superar é violência", description: "'Superar' é uma palavra violenta para quem perdeu." },
          { letter: "B", title: "A perda como paisagem", description: "A perda não desaparece — integra-se na paisagem de quem es." },
          { letter: "C", title: "Viver com e não apesar de", description: "Viver com a perda, não apesar dela." },
        ],
        workbook: "Integracao da perda",
      },
    ],
    youtubeHooks: [
      { title: "As perdas que ninguém te deixou chorar", durationMin: 8 },
      { title: "Porque 'segue em frente' e o pior conselho", durationMin: 6 },
      { title: "Como honrar o que perdeste sem te afogares nele", durationMin: 7 },
    ],
  },

  // ─── CURSO 9 — O Peso e o Chão ───
  {
    slug: "o-peso-e-o-chao",
    number: 9,
    title: "O Peso e o Chão",
    subtitle: "Quando descansar não resolve",
    arcoEmocional:
      "Começa pelo inventário do peso. Passa pelo que carregas que não é teu. Distingue tipos de cansaco. Termina com a prática de largar.",
    diferencial:
      "Não é um curso sobre produtividade ou gestão de tempo. É sobre perceber que o que te falta não é férias — e pores coisas no chão.",
    modules: [
      {
        number: 1,
        title: "O Inventário do Peso",
        description: "O que carregas.",
        isFree: false,
        subLessons: [
          { letter: "A", title: "O que carregas", description: "Fazer o inventário honesto de tudo o que trazes as costas." },
          { letter: "B", title: "O que escolheste vs. o que te caiu em cima", description: "Separar o peso escolhido do peso imposto." },
          { letter: "C", title: "O peso normalizado", description: "O peso que carregas ha tanto tempo que já não sentes." },
        ],
        workbook: "Inventário do peso",
      },
      {
        number: 2,
        title: "A Carga Mental Invisível",
        description: "O trabalho que ninguém ve.",
        isFree: false,
        subLessons: [
          { letter: "A", title: "O trabalho que ninguém ve", description: "A carga mental que não aparece em nenhuma lista." },
          { letter: "B", title: "O CEO emocional da família", description: "Quando és a gestora emocional de toda a gente." },
          { letter: "C", title: "Tornar visível para negociar", description: "Nomear a carga invisível para poder partilha-la." },
        ],
        workbook: "Mapa da carga mental",
      },
      {
        number: 3,
        title: "A Mulher que Segura Tudo",
        description: "O mito da mulher forte.",
        isFree: false,
        subLessons: [
          { letter: "A", title: "Quem segura a mulher que segura tudo?", description: "A pergunta que ninguém faz." },
          { letter: "B", title: "O mito da mulher forte", description: "A armadilha de ser admirada pela resistência." },
          { letter: "C", title: "Pedir ajuda como acto de coragem", description: "Pedir ajuda não é fraqueza — é sabedoria." },
        ],
        workbook: "Rede de suporte",
      },
      {
        number: 4,
        title: "Tipos de Cansaco",
        description: "Nem todo o cansaco se resolve da mesma forma.",
        isFree: false,
        subLessons: [
          { letter: "A", title: "Cansaco físico", description: "O cansaco que o sono resolve." },
          { letter: "B", title: "Cansaco emocional", description: "O cansaco que o sono não resolve." },
          { letter: "C", title: "Cansaco existencial", description: "O cansaco que pede mudança, não descanso." },
        ],
        workbook: "Diagnóstico do cansaco",
      },
      {
        number: 5,
        title: "O Falso Descanso",
        description: "Scroll não é descanso.",
        isFree: false,
        subLessons: [
          { letter: "A", title: "Scroll não é descanso", description: "As actividades que parecem descanso mas esgotam." },
          { letter: "B", title: "Vinho não é descanso", description: "A diferença entre anestesiar e descansar." },
          { letter: "C", title: "Descanso real", description: "O que realmente regenera." },
        ],
        workbook: "Auditoria do descanso",
      },
      {
        number: 6,
        title: "A Exaustão como Mensagem",
        description: "O corpo em greve.",
        isFree: false,
        subLessons: [
          { letter: "A", title: "O corpo em greve", description: "Quando o corpo para porque tu não paras." },
          { letter: "B", title: "Burn-out não é fraqueza", description: "Burn-out e o resultado de um sistema, não de uma falha pessoal." },
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
          { letter: "B", title: "Largar não e abandonar", description: "A diferença entre largar e ser irresponsável." },
          { letter: "C", title: "O teste de largar", description: "Exercício: o que acontece se não fizeres isto durante uma semana?" },
        ],
        workbook: "O teste de largar",
      },
      {
        number: 8,
        title: "Pôr no Chão",
        description: "A arte de pôr no chão.",
        isFree: false,
        subLessons: [
          { letter: "A", title: "A arte de pôr no chão", description: "A prática de pousar o que não é teu." },
          { letter: "B", title: "O que fica e o que vai", description: "Escolher conscientemente o que continuas a carregar." },
          { letter: "C", title: "Viver mais leve", description: "A leveza como prática diaria, não como destino." },
        ],
        workbook: "Ritual de pousar",
      },
    ],
    youtubeHooks: [
      { title: "Porque estás sempre cansada e férias não resolvem", durationMin: 7 },
      { title: "A carga mental invisível", durationMin: 8 },
      { title: "Como largar sem culpa: o exercício do papel no chão", durationMin: 5 },
    ],
  },

  // ─── CURSO 10 — Voz de Dentro ───
  {
    slug: "voz-de-dentro",
    number: 10,
    title: "Voz de Dentro",
    subtitle: "Dizer o que precisas de dizer a quem mais importa",
    arcoEmocional:
      "Começa por identificar a conversa. Passa pela preparação. Aprende a começar. Aprende a sustentar. Prepara-te para o depois.",
    diferencial:
      "Não é um curso de comunicação. É sobre ter a conversa que adias ha meses — não como confronto, mas como verdade dita com cuidado.",
    modules: [
      {
        number: 1,
        title: "A Conversa que Vive em Ti",
        description: "O loop mental da conversa que adias.",
        isFree: false,
        subLessons: [
          { letter: "A", title: "O loop mental", description: "A conversa que ensaias no chuveiro, no carro, antes de dormir." },
          { letter: "B", title: "Porque evitas", description: "O que te impede de ter a conversa." },
          { letter: "C", title: "O custo do silêncio", description: "O que te custa não dizer o que precisas de dizer." },
        ],
        workbook: "Identificacao da conversa adiada",
      },
      {
        number: 2,
        title: "O que Queres Dizer vs. O que Queres que Aconteca",
        description: "Separar expressao de resultado.",
        isFree: false,
        subLessons: [
          { letter: "A", title: "Separar as duas coisas", description: "O que queres dizer e o que queres que mude são coisas diferentes." },
          { letter: "B", title: "Ter a conversa sem depender do resultado", description: "Falar para ti, não para controlar a resposta do outro." },
          { letter: "C", title: "Abdicar do controlo do desfecho", description: "A coragem de dizer sem saber o que vem depois." },
        ],
        workbook: "Exercício de separação intenção-resultado",
      },
      {
        number: 3,
        title: "As Palavras que Ajudam e as que Destroem",
        description: "A verdade dita com corpo.",
        isFree: false,
        subLessons: [
          { letter: "A", title: "'Tu sempre' e 'Tu nunca'", description: "As frases que activam defesa em vez de escuta." },
          { letter: "B", title: "O tom conta mais que as palavras", description: "O corpo fala mais alto que o vocabulário." },
          { letter: "C", title: "A verdade dita com corpo", description: "Dizer a verdade com presença, não com agressividade." },
        ],
        workbook: "Guia de linguagem não-violenta",
      },
      {
        number: 4,
        title: "Começar a Conversa",
        description: "A primeira frase.",
        isFree: false,
        subLessons: [
          { letter: "A", title: "A primeira frase", description: "A frase que abre a porta sem a partir." },
          { letter: "B", title: "Começar sem acusar", description: "Iniciar pela experiência, não pela acusação." },
          { letter: "C", title: "O timing", description: "Quando é o momento certo (e quando não e)." },
        ],
        workbook: "Treino de primeiras frases",
      },
      {
        number: 5,
        title: "Sustentar a Conversa",
        description: "Quando o outro reage mal.",
        isFree: false,
        subLessons: [
          { letter: "A", title: "Quando o outro reage mal", description: "O que fazer quando a reacção não é a que esperavas." },
          { letter: "B", title: "Ouvir sem desistir", description: "A capacidade de ouvir a resposta sem abandonar a tua verdade." },
          { letter: "C", title: "Pausar sem fugir", description: "A pausa como ferramenta, não como fuga." },
        ],
        workbook: "Estratégias de sustentação",
      },
      {
        number: 6,
        title: "Conversas com Parceiros",
        description: "O não-dito no casamento.",
        isFree: false,
        subLessons: [
          { letter: "A", title: "O não-dito no casamento", description: "As conversas que o casamento acumula em silêncio." },
          { letter: "B", title: "Intimidade e verdade", description: "A verdade como fundação da intimidade real." },
          { letter: "C", title: "Conversas sobre sexo, dinheiro, futuro", description: "Os três temas que a maioria dos casais evita." },
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
          { letter: "B", title: "Quando não vale a pena", description: "Quando a conversa é para ti, não para ele." },
          { letter: "C", title: "Falar para ti, não para ele", description: "Dizer a verdade mesmo que o outro não a ouca." },
        ],
        workbook: "Carta não enviada (exercício)",
      },
      {
        number: 8,
        title: "O Depois",
        description: "O silêncio pós-conversa.",
        isFree: false,
        subLessons: [
          { letter: "A", title: "O silêncio pós-conversa", description: "O espaço estranho depois de dizer o que precisavas." },
          { letter: "B", title: "O alívio inesperado", description: "O alívio que vem depois de teres sido verdadeira." },
          { letter: "C", title: "A relação depois da verdade", description: "O que muda na relação quando a verdade entra." },
        ],
        workbook: "Reflexao pós-conversa",
      },
    ],
    youtubeHooks: [
      { title: "A conversa que ensaias no chuveiro", durationMin: 7 },
      { title: "Porque o silêncio doi mais que a verdade", durationMin: 6 },
      { title: "Como começar sem as 3 palavras que arruinam tudo", durationMin: 8 },
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
