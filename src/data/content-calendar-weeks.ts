// ─── TYPES ───────────────────────────────────────────────────────────────────

export type Platform = "instagram" | "whatsapp" | "ambos";

export type CarouselSlide = {
  bg: string;
  text: string;
  accent: string;
  title: string;
  body: string;
  footer?: string;
  /** Background image path (from /public). Rendered blurred behind the color overlay. */
  bgImage?: string;
};

export type ReelScript = {
  hook: string;         // first 3 seconds — must stop the scroll
  scenes: string[];     // scene-by-scene description / voiceover
  cta: string;          // call to action at the end
  music: string;        // suggested music/mood
  duration: string;     // e.g. "30-45s"
  canvaTemplate?: string; // Canva template suggestion
};

export type ContentSlot = {
  platform: Platform;
  type: string;
  visual?: {
    bg: string;
    text: string;
    accent: string;
    format: "square" | "vertical";
    title: string;
    body: string;
    footer?: string;
    highlight?: string;
  };
  carousel?: CarouselSlide[];
  reelScript?: ReelScript;
  caption?: string;
  broadcast?: string;
  notes?: string;
};

export type DayPlan = {
  day: string;
  dayShort: string;
  theme: string;
  slots: ContentSlot[];
};

export type WeekPlan = {
  weekNumber: number;
  title: string;
  subtitle: string;
  days: DayPlan[];
};

// ─── SEMANA 1: LAN\u00c7AMENTO DA PLATAFORMA ──────────────────────────────────────

const week1: WeekPlan = {
  weekNumber: 1,
  title: "Lan\u00e7amento da nova plataforma",
  subtitle: "Anunciar o revamp, mostrar novidades, convidar a explorar",
  days: [
    {
      day: "Segunda-feira",
      dayShort: "Seg",
      theme: "An\u00fancio principal",
      slots: [
        {
          platform: "instagram",
          type: "Post Feed",
          visual: {
            bg: "#3d3630", text: "#f7f5f0", accent: "#c9b896", format: "square",
            title: "A plataforma mudou.",
            body: "Novo design.\nNova experi\u00eancia de leitura.\nNovo chatbot de apoio.\nNova comunidade.\n\nTudo pensado para ti.\nAo teu ritmo.",
            footer: "seteveus.space",
            highlight: "Os Sete V\u00e9us",
          },
          caption: "A plataforma Os Sete V\u00e9us foi completamente redesenhada.\n\nNovo visual. Nova experi\u00eancia de leitura integrada. Chatbot de apoio. Comunidade.\n\nTudo novo. A mesma ess\u00eancia.\n\nDescobre em seteveus.space\n\n#OsSeteV\u00e9us #Autoconhecimento #PlataformaDigital",
        },
        {
          platform: "whatsapp",
          type: "Status",
          visual: {
            bg: "#3d3630", text: "#f7f5f0", accent: "#c9b896", format: "vertical",
            title: "H\u00e1 algo novo\na acontecer.",
            body: "A plataforma Os Sete V\u00e9us foi completamente redesenhada.\n\nNovo visual. Nova experi\u00eancia.\nA mesma profundidade.",
            footer: "seteveus.space",
          },
        },
      ],
    },
    {
      day: "Ter\u00e7a-feira",
      dayShort: "Ter",
      theme: "Mostrar o interior da plataforma",
      slots: [
        {
          platform: "instagram",
          type: "Carrossel (prints reais)",
          notes: "Faz screenshot destas p\u00e1ginas no telem\u00f3vel e usa como slides do carrossel:\n\n1. seteveus.space/membro (dashboard)\n2. seteveus.space/membro/leitura (leitor)\n3. seteveus.space/membro/leitura/1 (cap\u00edtulo aberto)\n4. seteveus.space/comunidade (comunidade)\n5. seteveus.space/recursos/teste (quiz)\n\nLegenda: \u201cN\u00e3o \u00e9 um livro. \u00c9 uma experi\u00eancia. Swipe para ver por dentro.\u201d",
          caption: "N\u00e3o \u00e9 um livro. \u00c9 uma experi\u00eancia.\n\n\u27a1\ufe0f Leitura integrada com pausas de reflex\u00e3o\n\u27a1\ufe0f Di\u00e1rio pessoal auto-guardado\n\u27a1\ufe0f Respira\u00e7\u00e3o guiada entre cap\u00edtulos\n\u27a1\ufe0f Comunidade an\u00f3nima\n\u27a1\ufe0f Chatbot para todas as d\u00favidas\n\nSwipe para ver por dentro \u2192\n\nseteveus.space\n\n#OsSeteV\u00e9us #LeituraIntegrada #Autoconhecimento",
        },
        {
          platform: "whatsapp",
          type: "Broadcast",
          broadcast: "Ol\u00e1! Tenho uma novidade para ti.\n\nA plataforma Os Sete V\u00e9us foi completamente redesenhada. Novo visual, nova experi\u00eancia de leitura, novo chatbot de apoio.\n\nSe j\u00e1 tens conta, entra e explora. Se ainda n\u00e3o conheces, come\u00e7a pelo teste gratuito:\nseteveus.space/recursos/teste\n\nAo teu ritmo. Sem pressa.\n~ Vivianne",
        },
      ],
    },
    {
      day: "Quarta-feira",
      dayShort: "Qua",
      theme: "Recurso gratuito",
      slots: [
        {
          platform: "instagram",
          type: "Post Feed",
          visual: {
            bg: "#f7f5f0", text: "#3d3630", accent: "#7a8c6e", format: "square",
            title: "Come\u00e7a sem pagar nada.",
            body: "Teste de autoconhecimento\nDi\u00e1rio de 7 dias\nArtigos\nMini-guia\nWallpapers\nGloss\u00e1rio\n\nTudo gratuito.",
            footer: "seteveus.space/recursos",
            highlight: "Gratuito",
          },
          caption: "Sabes que na plataforma Os Sete V\u00e9us h\u00e1 v\u00e1rios recursos completamente gratuitos?\n\nTeste de autoconhecimento (3 min)\nDi\u00e1rio de 7 dias\nArtigos sobre os v\u00e9us\nMini-guia\nWallpapers\n\nCome\u00e7a sem pagar nada: seteveus.space/recursos\n\n#OsSeteV\u00e9us #Gratuito #TesteDeAutoconhecimento",
        },
        {
          platform: "whatsapp",
          type: "Status",
          visual: {
            bg: "#f7f5f0", text: "#3d3630", accent: "#c9b896", format: "vertical",
            title: "Descobre qual v\u00e9u\nte esconde.",
            body: "Teste de autoconhecimento gratuito.\n3 minutos.\nSem compromisso.",
            footer: "seteveus.space/recursos/teste",
          },
        },
      ],
    },
    {
      day: "Quinta-feira",
      dayShort: "Qui",
      theme: "Novidades da plataforma",
      slots: [
        {
          platform: "instagram",
          type: "Post Feed",
          visual: {
            bg: "#f7f5f0", text: "#3d3630", accent: "#7a8c6e", format: "square",
            title: "O que h\u00e1 de novo?",
            body: "Leitura integrada com pausas de reflex\u00e3o\n\nDi\u00e1rio pessoal dentro da experi\u00eancia\n\nRespira\u00e7\u00e3o guiada entre cap\u00edtulos\n\nChatbot para todas as tuas d\u00favidas\n\nComunidade an\u00f3nima e impermanente",
            footer: "seteveus.space",
          },
          caption: "A plataforma Os Sete V\u00e9us tem agora:\n\nLeitura integrada com pausas de reflex\u00e3o\nDi\u00e1rio pessoal auto-guardado\nRespira\u00e7\u00e3o guiada entre cap\u00edtulos\nChatbot de apoio 24/7\nComunidade an\u00f3nima\n\nTudo pensado para ti, ao teu ritmo.\n\nseteveus.space\n\n#OsSeteV\u00e9us #PlataformaDigital #LeituraIntegrada",
        },
      ],
    },
    {
      day: "Sexta-feira",
      dayShort: "Sex",
      theme: "Convite leitores livro f\u00edsico",
      slots: [
        {
          platform: "instagram",
          type: "Post Feed",
          visual: {
            bg: "#ebe7df", text: "#3d3630", accent: "#c9b896", format: "square",
            title: "O teu livro\nabre portas que ainda\nn\u00e3o conheces.",
            body: "Tens Os 7 V\u00e9us do Despertar?\n\nRegista o teu interesse\ne recebe acesso \u00e0\nplataforma digital completa.\n\nGratuito.",
            footer: "seteveus.space/pedir-código",
            highlight: "Leitores do livro",
          },
          caption: "Se tens o livro f\u00edsico Os 7 V\u00e9us do Despertar, tens direito a uma experi\u00eancia digital completa.\n\nLeitura integrada, di\u00e1rio de reflex\u00e3o, comunidade e muito mais.\n\nRegista o teu interesse: seteveus.space/pedir-código\n\n#OsSeteV\u00e9us #LivroF\u00edsico #AcessoDigital",
        },
        {
          platform: "whatsapp",
          type: "Broadcast",
          broadcast: "Ol\u00e1! Se tens o livro f\u00edsico Os 7 V\u00e9us do Despertar, tenho uma novidade:\n\nA plataforma digital foi redesenhada e tens direito a acesso gratuito. Leitura integrada, di\u00e1rio de reflex\u00e3o, comunidade e muito mais.\n\nRegista o teu interesse aqui e envio-te o c\u00f3digo:\nseteveus.space/pedir-código\n\nDemora menos de 1 minuto. Sem compromisso.\n\n~ Vivianne",
        },
      ],
    },
    {
      day: "S\u00e1bado",
      dayShort: "S\u00e1b",
      theme: "Engagement",
      slots: [
        {
          platform: "ambos",
          type: "Responder DMs e mensagens",
          notes: "Responder todas as DMs do Instagram.\nResponder mensagens WhatsApp.\nComentar em 5-10 posts de seguidoras.\nEnviar mensagem de obrigada a quem partilhou conte\u00fado.",
        },
      ],
    },
    {
      day: "Domingo",
      dayShort: "Dom",
      theme: "Descanso + prepara\u00e7\u00e3o",
      slots: [
        {
          platform: "ambos",
          type: "Planear semana seguinte",
          notes: "Rever m\u00e9tricas da semana.\nAnotar o que funcionou.\nPreparar screenshots para a pr\u00f3xima semana.\nPr\u00e9-gravar 1-2 reels se poss\u00edvel.",
        },
      ],
    },
  ],
};

// ─── SEMANA 2: ESPELHO DA Ilusão ─────────────────────────────────────────────

const week2: WeekPlan = {
  weekNumber: 2,
  title: "O Espelho da Ilus\u00e3o",
  subtitle: "Promover a experi\u00eancia de leitura principal",
  days: [
    {
      day: "Segunda-feira",
      dayShort: "Seg",
      theme: "Cita\u00e7\u00e3o impactante",
      slots: [
        {
          platform: "instagram",
          type: "Post Feed",
          visual: {
            bg: "#f7f5f0", text: "#3d3630", accent: "#c9b896", format: "square",
            title: "Quando foi que escolhi\ntomar caf\u00e9\nem vez de ch\u00e1?",
            body: "Uma pergunta absurda\nque muda tudo.",
            footer: "O Espelho da Ilus\u00e3o ~ seteveus.space",
            highlight: "Espelho da Ilus\u00e3o",
          },
          caption: "\"Quando foi que escolhi tomar caf\u00e9 em vez de ch\u00e1?\"\n\nUma pergunta absurda que muda tudo.\n\nO Espelho da Ilus\u00e3o come\u00e7a assim \u2014 com uma manh\u00e3 igual a todas as outras é uma mulher que, pela primeira vez, pergunta.\n\nFaz o quiz gratuito e descobre o teu espelho:\nseteveus.space/recursos/teste\n\n#OsSeteV\u00e9us #EspelhoDaIlus\u00e3o #Autoconhecimento",
        },
        {
          platform: "whatsapp",
          type: "Status",
          visual: {
            bg: "#f7f5f0", text: "#3d3630", accent: "#c9b896", format: "vertical",
            title: "H\u00e1 mais para ti\ndo que aquilo que\ntens vivido.",
            body: "O Espelho da Ilus\u00e3o.\nUma experi\u00eancia de leitura integrada.",
            footer: "seteveus.space",
          },
        },
      ],
    },
    {
      day: "Ter\u00e7a-feira",
      dayShort: "Ter",
      theme: "O que inclui a experi\u00eancia",
      slots: [
        {
          platform: "instagram",
          type: "Post Feed",
          visual: {
            bg: "#f7f5f0", text: "#3d3630", accent: "#7a8c6e", format: "square",
            title: "N\u00e3o \u00e9 um livro.\n\u00c9 uma experi\u00eancia.",
            body: "7 cap\u00edtulos de fic\u00e7\u00e3o\n+ respira\u00e7\u00e3o guiada\n+ di\u00e1rio de reflex\u00e3o\n+ o teu Espelho pessoal\n\nL\u00eas. Respiras. Escreves.\nE no final, v\u00eas-te.",
            footer: "seteveus.space/experiencias",
          },
          caption: "N\u00e3o \u00e9 um livro que se l\u00ea. \u00c9 uma experi\u00eancia que se vive.\n\n7 cap\u00edtulos de fic\u00e7\u00e3o\nRespira\u00e7\u00e3o guiada\nDi\u00e1rio de reflex\u00e3o\nO teu Espelho pessoal\n\n$29 USD / 1.885 MZN\nAcesso vital\u00edcio.\n\nseteveus.space/comprar/espelhos\n\n#OsSeteV\u00e9us #ExperienciaImersiva #LeituraIntegrada",
        },
      ],
    },
    {
      day: "Quarta-feira",
      dayShort: "Qua",
      theme: "Cita\u00e7\u00e3o profunda",
      slots: [
        {
          platform: "instagram",
          type: "Post Feed",
          visual: {
            bg: "#3d3630", text: "#f7f5f0", accent: "#c9b896", format: "square",
            title: "Via, mas n\u00e3o sentia.",
            body: "Registava, mas n\u00e3o participava.\nComo quem assiste a um\nespect\u00e1culo por tr\u00e1s de uma\njanela fechada.",
            footer: "O Espelho da Ilus\u00e3o ~ seteveus.space",
          },
          caption: "\"Via, mas n\u00e3o sentia. Registava, mas n\u00e3o participava. Como quem assiste a um espect\u00e1culo por tr\u00e1s de uma janela fechada.\"\n\n\u2014 O Espelho da Ilus\u00e3o\n\nseteveus.space/comprar/espelhos\n\n#OsSeteV\u00e9us #EspelhoDaIlus\u00e3o #Fic\u00e7\u00e3oPsicol\u00f3gica",
        },
        {
          platform: "whatsapp",
          type: "Broadcast",
          broadcast: "J\u00e1 alguma vez sentiste que a vida que constru\u00edste n\u00e3o foi bem escolhida por ti?\n\nEscrevi uma hist\u00f3ria sobre isso. Chama-se O Espelho da Ilus\u00e3o.\n\nN\u00e3o \u00e9 um livro que se l\u00ea. \u00c9 uma experi\u00eancia que se vive: 7 cap\u00edtulos, respira\u00e7\u00e3o guiada, di\u00e1rio de reflex\u00e3o é o teu Espelho pessoal.\n\nCome\u00e7a pelo teste gratuito:\nseteveus.space/recursos/teste\n\n~ Vivianne",
        },
      ],
    },
    {
      day: "Quinta-feira",
      dayShort: "Qui",
      theme: "Pre\u00e7os",
      slots: [
        {
          platform: "instagram",
          type: "Post Feed",
          visual: {
            bg: "#3d3630", text: "#f7f5f0", accent: "#c9b896", format: "square",
            title: "Quanto custa\nescolher-te?",
            body: "Espelho da Ilus\u00e3o\n$29 USD / 1.885 MZN\n\nN\u00f3 da Heran\u00e7a\n$12 USD / 780 MZN\n\nLivro f\u00edsico\n$23 USD / 1.495 MZN\n\nAcesso vital\u00edcio.",
            footer: "seteveus.space/comprar",
          },
          caption: "Quanto custa escolher-te?\n\nEspelho da Ilus\u00e3o: $29 USD (1.885 MZN)\nN\u00f3 da Heran\u00e7a: $12 USD (780 MZN)\nLivro f\u00edsico: $23 USD (1.495 MZN)\n\nAcesso vital\u00edcio. Sem subscri\u00e7\u00f5es.\nPayPal, Millenium BIM ou M-Pesa.\n\nseteveus.space/comprar\n\n#OsSeteV\u00e9us #Autoconhecimento",
        },
      ],
    },
    {
      day: "Sexta-feira",
      dayShort: "Sex",
      theme: "Cita\u00e7\u00e3o final",
      slots: [
        {
          platform: "instagram",
          type: "Post Feed",
          visual: {
            bg: "#3d3630", text: "#c9b896", accent: "#f7f5f0", format: "square",
            title: "Perguntar,\nmesmo tarde,\n\u00e9 o primeiro gesto\nde se escolher.",
            body: "",
            footer: "O Espelho da Ilus\u00e3o ~ seteveus.space",
          },
          caption: "\"Perguntar, mesmo tarde, \u00e9 o primeiro gesto de se escolher.\"\n\n\u2014 O Espelho da Ilus\u00e3o\n\nseteveus.space\n\n#OsSeteV\u00e9us #EspelhoDaIlus\u00e3o #DesenvolvimentoPessoal",
        },
        {
          platform: "whatsapp",
          type: "Status",
          visual: {
            bg: "#3d3630", text: "#c9b896", accent: "#f7f5f0", format: "vertical",
            title: "Perguntar,\nmesmo tarde,\n\u00e9 o primeiro gesto\nde se escolher.",
            body: "",
            footer: "O Espelho da Ilus\u00e3o",
          },
        },
      ],
    },
    {
      day: "S\u00e1bado",
      dayShort: "S\u00e1b",
      theme: "Engagement",
      slots: [{ platform: "ambos", type: "Responder DMs e mensagens", notes: "Responder todas as DMs. Comentar em posts de seguidoras. Agradecer partilhas." }],
    },
    {
      day: "Domingo",
      dayShort: "Dom",
      theme: "Prepara\u00e7\u00e3o",
      slots: [{ platform: "ambos", type: "Planear semana 3", notes: "Rever m\u00e9tricas. Preparar conte\u00fado do N\u00f3 da Heran\u00e7a e Comunidade." }],
    },
  ],
};

// ─── SEMANA 3: NO DA HERANCA + COMUNIDADE ────────────────────────────────────

const week3: WeekPlan = {
  weekNumber: 3,
  title: "N\u00f3 da Heran\u00e7a + Comunidade",
  subtitle: "Apresentar a segunda colec\u00e7\u00e3o e a comunidade Ecos",
  days: [
    {
      day: "Segunda-feira",
      dayShort: "Seg",
      theme: "N\u00f3 da Heran\u00e7a",
      slots: [
        {
          platform: "instagram",
          type: "Post Feed",
          visual: {
            bg: "#ebe7df", text: "#3d3630", accent: "#c9b896", format: "square",
            title: "A m\u00e3e sempre viu.\nEsperou anos.",
            body: "Agora que Sara acordou,\nHelena tem algo\npara lhe dizer.",
            footer: "O N\u00f3 da Heran\u00e7a ~ seteveus.space",
            highlight: "Colec\u00e7\u00e3o N\u00f3s",
          },
          caption: "Os Espelhos olham para dentro.\nOs N\u00f3s olham para a rela\u00e7\u00e3o.\n\nO N\u00f3 da Heran\u00e7a \u00e9 a hist\u00f3ria de Sara e Helena \u2014 m\u00e3e e filha \u2014 é o sil\u00eancio herdado entre elas.\n\nS\u00f3 se desbloqueia ao completar o Espelho da Ilus\u00e3o.\n\nseteveus.space/coleccao-nos\n\n#OsSeteV\u00e9us #N\u00f3DaHeran\u00e7a #Fic\u00e7\u00e3oRelacional",
        },
      ],
    },
    {
      day: "Ter\u00e7a-feira",
      dayShort: "Ter",
      theme: "Comunidade Ecos",
      slots: [
        {
          platform: "instagram",
          type: "Post Feed",
          visual: {
            bg: "#7a8c6e", text: "#f7f5f0", accent: "#ebe7df", format: "square",
            title: "Onde as vozes\nse encontram.",
            body: "Ecos. Mar\u00e9. C\u00edrculo. Fogueira.\n\nQuatro salas.\nTudo an\u00f3nimo.\nTudo impermanente.",
            footer: "Comunidade Ecos ~ seteveus.space",
            highlight: "Comunidade",
          },
          caption: "A comunidade Ecos \u00e9 o espa\u00e7o onde as vozes se encontram.\n\nQuatro salas:\nEcos \u2014 reflex\u00f5es an\u00f3nimas\nMar\u00e9 \u2014 consci\u00eancia colectiva\nC\u00edrculo \u2014 espelho partilhado\nFogueira \u2014 contempla\u00e7\u00e3o silenciosa\n\nTudo an\u00f3nimo. Tudo impermanente.\nInclu\u00edda com qualquer experi\u00eancia de leitura.\n\nseteveus.space/comunidade\n\n#OsSeteV\u00e9us #ComunidadeEcos",
        },
      ],
    },
    {
      day: "Quarta-feira",
      dayShort: "Qua",
      theme: "N\u00f3 da Heran\u00e7a broadcast",
      slots: [
        {
          platform: "instagram",
          type: "Story",
          visual: {
            bg: "#3d3630", text: "#f7f5f0", accent: "#c9b896", format: "vertical",
            title: "O N\u00f3\nda Heran\u00e7a",
            body: "O que se passa entre\nm\u00e3e e filha quando\no v\u00e9u cai.\n\nSara e Helena.\nO sil\u00eancio herdado.",
            footer: "$12 USD ~ seteveus.space",
            highlight: "Novo",
          },
        },
        {
          platform: "whatsapp",
          type: "Broadcast",
          broadcast: "Se j\u00e1 leste o Espelho da Ilus\u00e3o, h\u00e1 uma continua\u00e7\u00e3o que quero partilhar contigo.\n\nO N\u00f3 da Heran\u00e7a \u00e9 a hist\u00f3ria de Sara e Helena (m\u00e3e e filha). O que se passa entre duas pessoas quando o v\u00e9u da ilus\u00e3o cai.\n\nS\u00f3 se desbloqueia depois de completares o Espelho. \u00c9 a continua\u00e7\u00e3o emocional, n\u00e3o um upsell.\n\nseteveus.space/coleccao-nos\n\n~ Vivianne",
        },
      ],
    },
    {
      day: "Quinta-feira",
      dayShort: "Qui",
      theme: "Testemunho",
      slots: [
        {
          platform: "instagram",
          type: "Post Feed",
          visual: {
            bg: "#ebe7df", text: "#4a433b", accent: "#c9b896", format: "square",
            title: "\"N\u00e3o \u00e9 um livro que\nse l\u00ea \u2014 \u00e9 um livro\nque se vive.\"",
            body: "",
            footer: "Carla S., Lisboa",
          },
          caption: "\"N\u00e3o \u00e9 um livro que se l\u00ea \u2014 \u00e9 um livro que se vive.\"\n\u2014 Carla S., Lisboa\n\nseteveus.space\n\n#OsSeteV\u00e9us #Testemunho",
        },
      ],
    },
    {
      day: "Sexta-feira",
      dayShort: "Sex",
      theme: "Recursos gratuitos",
      slots: [
        {
          platform: "ambos",
          type: "Broadcast + Status",
          broadcast: "Sabes que na plataforma Os Sete V\u00e9us h\u00e1 v\u00e1rios recursos completamente gratuitos?\n\n- Teste de autoconhecimento (3 min)\n- Di\u00e1rio de 7 dias\n- Artigos sobre os v\u00e9us\n- Mini-guia\n- Wallpapers\n\nCome\u00e7a sem pagar nada:\nseteveus.space/recursos\n\n~ Vivianne",
        },
      ],
    },
    {
      day: "S\u00e1bado",
      dayShort: "S\u00e1b",
      theme: "Engagement",
      slots: [{ platform: "ambos", type: "Responder DMs e mensagens", notes: "Engagement habitual." }],
    },
    {
      day: "Domingo",
      dayShort: "Dom",
      theme: "Prepara\u00e7\u00e3o",
      slots: [{ platform: "ambos", type: "Planear semana 4", notes: "Preparar teasers do Espelho do Medo." }],
    },
  ],
};

// ─── SEMANA 4: TEASER MEDO + REFORCO ────────────────────────────────────────

const week4: WeekPlan = {
  weekNumber: 4,
  title: "Teaser Espelho do Medo + Refor\u00e7o",
  subtitle: "Criar antecipa\u00e7\u00e3o para Mar\u00e7o + refor\u00e7ar produtos actuais",
  days: [
    {
      day: "Segunda-feira",
      dayShort: "Seg",
      theme: "Teaser do Medo",
      slots: [
        {
          platform: "instagram",
          type: "Post Feed",
          visual: {
            bg: "#8b9b8e", text: "#f7f5f0", accent: "#ebe7df", format: "square",
            title: "Sabes o que queres.\nMas o medo decide\nantes de ti.",
            body: "O segundo espelho\nest\u00e1 quase a chegar.",
            footer: "O Espelho do Medo ~ Mar\u00e7o 2026",
            highlight: "Mar\u00e7o 2026",
          },
          caption: "O segundo espelho est\u00e1 quase a chegar.\n\n\"Sabes o que queres. Mas o medo decide antes de ti.\"\n\nO Espelho do Medo \u2014 Mar\u00e7o 2026.\n\nseteveus.space/experiencias\n\n#OsSeteV\u00e9us #EspelhoDoMedo #EmBreve",
        },
        {
          platform: "whatsapp",
          type: "Status + Broadcast",
          visual: {
            bg: "#8b9b8e", text: "#f7f5f0", accent: "#ebe7df", format: "vertical",
            title: "O primeiro passo\nn\u00e3o precisa\nde ser grande.",
            body: "Precisa apenas\nde ser teu.",
            footer: "O Espelho do Medo ~ Mar\u00e7o 2026",
          },
          broadcast: "O segundo espelho est\u00e1 quase a chegar.\n\nSabes o que queres. Mas o medo decide antes de ti.\n\nO Espelho do Medo chega em Mar\u00e7o de 2026.\n\nSe quiseres ser a primeira a saber:\nseteveus.space/experiencias\n\n~ Vivianne",
        },
      ],
    },
    {
      day: "Ter\u00e7a-feira",
      dayShort: "Ter",
      theme: "Livro f\u00edsico",
      slots: [
        {
          platform: "instagram",
          type: "Story",
          visual: {
            bg: "#ebe7df", text: "#3d3630", accent: "#c9b896", format: "vertical",
            title: "Os 7 V\u00e9us\ndo Despertar",
            body: "O ensaio filos\u00f3fico\nque deu origem a tudo.\n\n$23 USD / 1.495 MZN\nEnvio para Mo\u00e7ambique\ne outros pa\u00edses.",
            footer: "Encomendar via WhatsApp",
            highlight: "232 p\u00e1ginas",
          },
        },
      ],
    },
    {
      day: "Quarta-feira",
      dayShort: "Qua",
      theme: "Livro f\u00edsico \u2192 digital",
      slots: [
        {
          platform: "instagram",
          type: "Post Feed",
          visual: {
            bg: "#c9b896", text: "#3d3630", accent: "#f7f5f0", format: "square",
            title: "Do livro f\u00edsico\n\u00e0 experi\u00eancia digital.",
            body: "Se j\u00e1 tens\nOs 7 V\u00e9us do Despertar,\nregista o teu interesse\ne recebe o c\u00f3digo de acesso\n\u00e0 plataforma completa.",
            footer: "seteveus.space/pedir-código",
            highlight: "Gratuito",
          },
          caption: "Tens o livro f\u00edsico? Regista o teu interesse e recebe acesso gratuito \u00e0 plataforma digital.\n\nseteveus.space/pedir-código\n\n#OsSeteV\u00e9us #AcessoDigital",
        },
        {
          platform: "whatsapp",
          type: "Broadcast",
          broadcast: "Tens o livro Os 7 V\u00e9us do Despertar?\n\nA plataforma digital est\u00e1 completamente nova. E tens acesso gratuito.\n\nseteveus.space/pedir-código",
        },
      ],
    },
    {
      day: "Quinta-feira",
      dayShort: "Qui",
      theme: "Cita\u00e7\u00e3o",
      slots: [
        {
          platform: "instagram",
          type: "Post Feed",
          visual: {
            bg: "#3d3630", text: "#f7f5f0", accent: "#c9b896", format: "square",
            title: "Uma mulher descobre,\nno meio de uma manh\u00e3\nigual a todas as outras,\nque construiu uma vida\ninteira sem nunca ter\nperguntado o que queria.",
            body: "",
            footer: "O Espelho da Ilus\u00e3o ~ seteveus.space",
          },
          caption: "\"Uma mulher descobre, no meio de uma manh\u00e3 igual a todas as outras, que construiu uma vida inteira sem nunca ter perguntado o que queria.\"\n\n\u2014 O Espelho da Ilus\u00e3o, Pref\u00e1cio\n\nseteveus.space\n\n#OsSeteV\u00e9us #EspelhoDaIlus\u00e3o",
        },
      ],
    },
    {
      day: "Sexta-feira",
      dayShort: "Sex",
      theme: "Quiz gratuito",
      slots: [
        {
          platform: "ambos",
          type: "Status + Post",
          visual: {
            bg: "#f7f5f0", text: "#3d3630", accent: "#c9b896", format: "square",
            title: "Descobre qual v\u00e9u\nte esconde.",
            body: "Teste gratuito.\n3 minutos.\n7 perguntas.\nO resultado pode\nsurpreender-te.",
            footer: "seteveus.space/recursos/teste",
            highlight: "Gratuito",
          },
          caption: "Qual v\u00e9u te esconde?\n\nTeste gratuito de autoconhecimento.\n3 minutos. 7 perguntas.\nO resultado pode surpreender-te.\n\nseteveus.space/recursos/teste\n\n#OsSeteV\u00e9us #TesteGratuito #Autoconhecimento",
        },
      ],
    },
    {
      day: "S\u00e1bado",
      dayShort: "S\u00e1b",
      theme: "Engagement",
      slots: [{ platform: "ambos", type: "Responder DMs e mensagens", notes: "Engagement habitual." }],
    },
    {
      day: "Domingo",
      dayShort: "Dom",
      theme: "Reciclar",
      slots: [{ platform: "ambos", type: "Reciclar semana 1", notes: "Voltar ao calend\u00e1rio da semana 1 com varia\u00e7\u00f5es. Manter o ritmo." }],
    },
  ],
};

// ─── SEMANA 5: CAMPANHA REEL + CARROSSEL PROFISSIONAL ─────────────────────────

const week5: WeekPlan = {
  weekNumber: 5,
  title: "Campanha visual: Reels + Carrosseis",
  subtitle: "Conteudo visual forte para crescer alcance e engagement",
  days: [
    {
      day: "Segunda-feira",
      dayShort: "Seg",
      theme: "Reel — O momento do despertar",
      slots: [
        {
          platform: "instagram",
          type: "Reel (micro-video 15-30s)",
          visual: {
            bg: "#3d3630", text: "#f7f5f0", accent: "#c9b896", format: "vertical",
            title: "Aquele momento\nem que percebes\nque a vida que tens\nnao foi escolhida\npor ti.",
            body: "",
            footer: "O Espelho da Ilusão ~ seteveus.space",
          },
          notes: "ROTEIRO DO REEL:\n\nCena 1 (0-3s): Ecra preto. Texto aparece letra a letra: \"Aquele momento...\"\nCena 2 (3-8s): Print da pagina seteveus.space/experiencias no telemovel, scroll lento\nCena 3 (8-15s): Print do leitor aberto (capítulo 1), zoom suave\nCena 4 (15-20s): Print da respiração guiada entre capítulos\nCena 5 (20-25s): Texto: \"Não é um livro. É uma experiência.\"\nCena 6 (25-30s): Logo + seteveus.space\n\nMUSICA: Ambiente calmo, piano suave\nTRANSICOES: Fade lento entre cenas\n\nPRINTS NECESSARIOS:\n- seteveus.space/experiencias (pagina de compra)\n- seteveus.space/membro/leitura/1 (capítulo aberto)\n- seteveus.space/membro/leitura (lista de capítulos com respiração)",
          caption: "Aquele momento em que percebes que a vida que tens não foi escolhida por ti.\n\nO Espelho da Ilusão é uma experiência de leitura imersiva:\n7 capítulos + respiração guiada + diário de reflexão\n\nseteveus.space/experiencias\n\n#OsSeteVeus #Reel #Autoconhecimento #EspelhoDaIlusão #FicçãoPsicológica",
        },
        {
          platform: "whatsapp",
          type: "Status (video)",
          visual: {
            bg: "#3d3630", text: "#f7f5f0", accent: "#c9b896", format: "vertical",
            title: "Novo reel\nno Instagram.",
            body: "Uma experiência de leitura\nque muda a forma\ncomo te vês.",
            footer: "@os7veus",
          },
        },
      ],
    },
    {
      day: "Terca-feira",
      dayShort: "Ter",
      theme: "Carrossel — 7 sinais de que vives no piloto automatico",
      slots: [
        {
          platform: "instagram",
          type: "Carrossel (7 slides)",
          visual: {
            bg: "#f7f5f0", text: "#3d3630", accent: "#c9b896", format: "square",
            title: "7 sinais de que vives\nno piloto automatico",
            body: "",
            footer: "Swipe ~",
          },
          notes: "SLIDES DO CARROSSEL:\n\nSlide 1 (capa): Fundo #f7f5f0, texto #3d3630\n\"7 sinais de que vives no piloto automatico\"\nSubtitulo: \"Quantos reconheces?\"\n\nSlide 2: Fundo #ebe7df\n\"1. Fazes as mesmas coisas todos os dias sem questionar porque.\"\n\nSlide 3: Fundo #f7f5f0\n\"2. Quando alguem te pergunta o que queres, não tens resposta.\"\n\nSlide 4: Fundo #ebe7df\n\"3. Sentes que a vida passa mas não estas realmente presente.\"\n\nSlide 5: Fundo #f7f5f0\n\"4. As tuas decisoes são baseadas no que os outros esperam de ti.\"\n\nSlide 6: Fundo #ebe7df\n\"5. Há algo dentro de ti que quer mais, mas não sabes o que.\"\n\nSlide 7: Fundo #f7f5f0\n\"6. Tens medo de parar porque não sabes o que vais encontrar.\"\n\nSlide 8 (CTA): Fundo #3d3630, texto #c9b896\n\"7. Leste isto tudo é reconheceste-te.\"\n\"Descobre qual véu te esconde:\"\n\"seteveus.space/recursos/teste\"\n\nFONTE: Serif elegante para titulos, sans-serif para corpo\nTODOS os slides devem ter o logo discreto no canto inferior",
          caption: "7 sinais de que vives no piloto automatico.\n\nQuantos reconheces? Conta nos comentarios.\n\nSe reconheceste mais de 3, o teste gratuito pode revelar algo importante:\nseteveus.space/recursos/teste\n\n#OsSeteVeus #PilotoAutomatico #Autoconhecimento #Despertar #Carrossel",
        },
        {
          platform: "whatsapp",
          type: "Broadcast",
          broadcast: "Preparei um conteúdo novo no Instagram sobre os 7 sinais de que vives no piloto automatico.\n\nQuantos reconheces?\n\nVe o post completo: instagram.com/os7veus\n\nOu faz o teste gratuito directamente:\nseteveus.space/recursos/teste\n\n~ Vivianne",
        },
      ],
    },
    {
      day: "Quarta-feira",
      dayShort: "Qua",
      theme: "Post visual — Citação com imagem",
      slots: [
        {
          platform: "instagram",
          type: "Post Feed (imagem com citação)",
          visual: {
            bg: "#3d3630", text: "#f7f5f0", accent: "#c9b896", format: "square",
            title: "A ilusão mais perigosa\ne acreditar que\nescolheste\nquando apenas\nrepetiste.",
            body: "",
            footer: "O Espelho da Ilusão",
            highlight: "~ seteveus.space",
          },
          caption: "\"A ilusão mais perigosa é acreditar que escolheste quando apenas repetiste.\"\n\n-- O Espelho da Ilusão\n\nUma experiência de leitura que te convida a parar. E a perguntar.\n\nseteveus.space\n\n#OsSeteVeus #EspelhoDaIlusão #Citação #FicçãoPsicológica #Autoconhecimento",
        },
        {
          platform: "whatsapp",
          type: "Status",
          visual: {
            bg: "#3d3630", text: "#f7f5f0", accent: "#c9b896", format: "vertical",
            title: "A ilusão mais perigosa\ne acreditar que\nescolheste\nquando apenas\nrepetiste.",
            body: "",
            footer: "O Espelho da Ilusão",
          },
        },
      ],
    },
    {
      day: "Quinta-feira",
      dayShort: "Qui",
      theme: "Reel — Por dentro da plataforma",
      slots: [
        {
          platform: "instagram",
          type: "Reel (screen recording 20-30s)",
          visual: {
            bg: "#f7f5f0", text: "#3d3630", accent: "#7a8c6e", format: "vertical",
            title: "Por dentro\nda experiência",
            body: "Leitura integrada\nRespiracao guiada\nDiario pessoal\nComunidade anónima",
            footer: "seteveus.space",
          },
          notes: "ROTEIRO DO REEL (screen recording do telemovel):\n\nGravar screen recording no telemovel mostrando:\n1. (0-5s) Abrir seteveus.space/membro — dashboard com progresso\n2. (5-10s) Clicar em \"Continuar leitura\" — abre capítulo\n3. (10-15s) Scroll pelo texto do capítulo — mostrar tipografia bonita\n4. (15-20s) Chegar a pausa de reflexão — mostrar a caixa do diário\n5. (20-25s) Mostrar respiração guiada entre capítulos\n6. (25-30s) Final: texto overlay \"Não é um livro. É uma experiência.\"\n\nMUSICA: Lo-fi calmo ou piano ambiente\nTEXTO OVERLAY: Adicionar legendas em cada transicao\n\nPRINTS/GRAVACAO NECESSARIA:\n- Screen recording completo no telemovel (Safari ou Chrome)\n- Comecar em seteveus.space/membro\n- Navegar até um capítulo e fazer scroll",
          caption: "Por dentro da experiência Os Sete Véus.\n\nNão é um livro que se le. É uma experiência que se vive.\n\nLeitura integrada. Respiração guiada. Diario pessoal. Comunidade anónima.\n\nseteveus.space\n\n#OsSeteVeus #PlataformaDigital #LeituraImersiva #Reel #Bookstagram",
        },
      ],
    },
    {
      day: "Sexta-feira",
      dayShort: "Sex",
      theme: "Carrossel — O que é a coleccao Espelhos",
      slots: [
        {
          platform: "instagram",
          type: "Carrossel (5 slides)",
          visual: {
            bg: "#ebe7df", text: "#3d3630", accent: "#c9b896", format: "square",
            title: "O que é a coleccao\nEspelhos?",
            body: "",
            footer: "Swipe para descobrir ~",
          },
          notes: "SLIDES DO CARROSSEL:\n\nSlide 1 (capa): Fundo #ebe7df\n\"O que é a coleccao Espelhos?\"\nImagem: Print da pagina seteveus.space/experiencias\n\nSlide 2: Fundo #f7f5f0\n\"7 experiências de leitura imersiva.\nCada uma revela um véu diferente.\nIlusao. Medo. Culpa. Identidade.\nControlo. Desejo. Separação.\"\n\nSlide 3: Fundo #ebe7df\n\"Cada experiência inclui:\n7 capítulos de ficção\nRespiracao guiada\nDiario de reflexão\nO teu Espelho pessoal\"\nImagem: Print do leitor com capítulos\n\nSlide 4: Fundo #f7f5f0\n\"Disponivel agora:\nO Espelho da Ilusão — $29 USD\n\nEm breve:\nO Espelho do Medo — Marco 2026\"\nImagem: Print da pagina de compra\n\nSlide 5 (CTA): Fundo #3d3630, texto #c9b896\n\"Começa pelo teste gratuito.\nDescobre qual véu te esconde.\nseteveus.space/recursos/teste\"",
          caption: "A coleccao Espelhos são 7 experiências de leitura imersiva.\n\nCada uma revela um véu diferente. Cada véu esconde algo que precisas de ver.\n\nDisponivel agora: O Espelho da Ilusão\nEm breve: O Espelho do Medo (Marco 2026)\n\nComeca pelo teste gratuito:\nseteveus.space/recursos/teste\n\n#OsSeteVeus #ColeccaoEspelhos #Autoconhecimento #LeituraImersiva",
        },
        {
          platform: "whatsapp",
          type: "Status",
          visual: {
            bg: "#ebe7df", text: "#3d3630", accent: "#c9b896", format: "vertical",
            title: "7 véus.\n7 espelhos.\n7 experiências.",
            body: "Descobre qual véu te esconde.",
            footer: "seteveus.space/recursos/teste",
          },
        },
      ],
    },
    {
      day: "Sabado",
      dayShort: "Sab",
      theme: "Engagement + Story interactivo",
      slots: [
        {
          platform: "instagram",
          type: "Story interactivo (enquete)",
          visual: {
            bg: "#f7f5f0", text: "#3d3630", accent: "#c9b896", format: "vertical",
            title: "Qual destes\nte descreve melhor?",
            body: "A) Faço tudo pelos outros e esqueço-me de mim\nB) Tenho medo de mudar\nC) Não sei quem sou sem a máscara\nD) Controlo tudo para não sofrer",
            footer: "Responde no poll",
          },
          notes: "Criar Story com a funcionalidade de Poll do Instagram.\nOpcoes:\nA) Faço tudo pelos outros\nB) Tenho medo de mudar\nC) Não sei quem sou\nD) Controlo tudo\n\nDepois do resultado, publicar segundo Story com:\n\"Cada resposta corresponde a um véu.\nDescobre o teu: seteveus.space/recursos/teste\"",
          caption: "Qual véu te esconde? Responde no story e descobre.",
        },
        {
          platform: "ambos",
          type: "Responder DMs e mensagens",
          notes: "Responder TODAS as DMs. Comentar em 10 posts de seguidoras. Agradecer quem partilhou.",
        },
      ],
    },
    {
      day: "Domingo",
      dayShort: "Dom",
      theme: "Preparacao + conteúdo extra",
      slots: [
        {
          platform: "instagram",
          type: "Story (bastidores)",
          visual: {
            bg: "#ebe7df", text: "#3d3630", accent: "#c9b896", format: "vertical",
            title: "A escrever\no proximo espelho.",
            body: "O Espelho do Medo\nchega em Marco.",
            footer: "~ Vivianne",
          },
          notes: "Story informal: foto do espaco de escrita, computador, caderno, chá.\nTexto overlay: \"A escrever o proximo espelho. O Medo chega em Marco.\"\nSticker: countdown para Marco 2026",
        },
        {
          platform: "ambos",
          type: "Planear semana 6",
          notes: "Rever metricas da semana. Anotar quais reels/carrosseis tiveram melhor performance. Preparar conteúdo da semana 6.",
        },
      ],
    },
  ],
};

// ─── SEMANA 6: PROFUNDIDADE + TESTEMUNHOS + CAMPANHA NON ─────────────────────

const week6: WeekPlan = {
  weekNumber: 6,
  title: "Profundidade + Testemunhos + No da Heranca",
  subtitle: "Conteudo emocional profundo com provas sociais e campanha do No",
  days: [
    {
      day: "Segunda-feira",
      dayShort: "Seg",
      theme: "Reel — A históriade Sara (teaser)",
      slots: [
        {
          platform: "instagram",
          type: "Reel (texto animado 20s)",
          visual: {
            bg: "#ebe7df", text: "#3d3630", accent: "#c9b896", format: "vertical",
            title: "Sara acordou\nnuma manha igual\na todas as outras.",
            body: "Mas desta vez\nperguntou.",
            footer: "O Espelho da Ilusão",
          },
          notes: "ROTEIRO DO REEL (texto animado sobre fundo):\n\nFundo: Cores quentes, #ebe7df ou gradiente suave\n\n(0-3s) \"Sara acordou numa manha igual a todas as outras.\"\n(3-6s) \"Fez café. Vestiu-se. Saiu.\"\n(6-9s) \"Mas desta vez...\"\n(9-12s) \"...perguntou.\"\n(12-15s) Pausa. Ecra quase vazio.\n(15-18s) \"Quando foi que escolhi está vida?\"\n(18-20s) Logo + \"O Espelho da Ilusão\" + seteveus.space\n\nMUSICA: Piano suave, algo melancolico mas esperancoso\nFONTE: Serif elegante, letras grandes centralizadas\nTRANSICOES: Fade lento, cada frase aparece sozinha",
          caption: "Sara acordou numa manha igual a todas as outras. Mas desta vez, perguntou.\n\n\"Quando foi que escolhi está vida?\"\n\nO Espelho da Ilusão. Uma experiência de leitura imersiva.\n\nseteveus.space/experiencias\n\n#OsSeteVeus #EspelhoDaIlusão #Reel #FicçãoPsicológica #Sara",
        },
        {
          platform: "whatsapp",
          type: "Status",
          visual: {
            bg: "#ebe7df", text: "#3d3630", accent: "#c9b896", format: "vertical",
            title: "Sara acordou\ne perguntou.",
            body: "Novo reel no Instagram.\nUma históriaque muda tudo.",
            footer: "@os7veus",
          },
        },
      ],
    },
    {
      day: "Terca-feira",
      dayShort: "Ter",
      theme: "Carrossel — Espelhos vs Nos (explicar as duas coleccoes)",
      slots: [
        {
          platform: "instagram",
          type: "Carrossel (6 slides)",
          visual: {
            bg: "#f7f5f0", text: "#3d3630", accent: "#c9b896", format: "square",
            title: "Espelhos e Nos.\nDuas coleccoes.\nUma jornada.",
            body: "",
            footer: "Swipe ~",
          },
          notes: "SLIDES DO CARROSSEL:\n\nSlide 1 (capa): Fundo #f7f5f0\n\"Espelhos e Nos. Duas coleccoes. Uma jornada.\"\n\nSlide 2: Fundo #ebe7df\n\"Os Espelhos olham para dentro.\nSao 7 experiências de ficção.\nCada uma revela um véu.\nLes. Respiras. Escreves. É vês-te.\"\nImagem: Print da pagina /experiências\n\nSlide 3: Fundo #f7f5f0\n\"Os Nos olham para a relacao.\nO que acontece entre duas pessoas\nquando o véu cai.\"\nImagem: Print da pagina /coleccao-nos\n\nSlide 4: Fundo #ebe7df\n\"O No só se desbloqueia\não completar o Espelho.\nNao e upsell.\nE continuacao emocional.\"\n\nSlide 5: Fundo #f7f5f0\nTabela visual:\n\"Espelho da Ilusão → No da Heranca\n(Sara sozinha) → (Sara + Helena, mãe)\nO despertar → O silêncio herdado\"\n\nSlide 6 (CTA): Fundo #3d3630, texto #c9b896\n\"Começa pelo Espelho.\nO No espera por ti.\nseteveus.space/experiencias\"",
          caption: "Os Espelhos olham para dentro. Os Nos olham para a relacao.\n\nDuas coleccoes. Uma jornada.\n\nO No da Heranca e a históriade Sara e Helena — mãe e filha. So se desbloqueia ao completar o Espelho da Ilusão.\n\nseteveus.space/experiencias\n\n#OsSeteVeus #Espelhos #Nos #ColeccaoCompleta #Autoconhecimento",
        },
      ],
    },
    {
      day: "Quarta-feira",
      dayShort: "Qua",
      theme: "Post visual — Testemunho real",
      slots: [
        {
          platform: "instagram",
          type: "Post Feed (testemunho com design)",
          visual: {
            bg: "#ebe7df", text: "#4a433b", accent: "#c9b896", format: "square",
            title: "\"Chorei no capítulo 5.\nNao de tristeza.\nDe reconhecimento.\"",
            body: "",
            footer: "Ana M., Maputo",
          },
          notes: "DESIGN: Fundo texturizado cor creme. Citação centrada em fonte serif grande. Nome e cidade em fonte menor abaixo. Logo discreto no canto inferior direito.\n\nSe não tiver testemunho real, usar variacao do existente ou pedir a leitoras.",
          caption: "\"Chorei no capítulo 5. Não de tristeza. De reconhecimento.\"\n-- Ana M., Maputo\n\nO Espelho da Ilusão.\n\nseteveus.space/experiencias\n\n#OsSeteVeus #Testemunho #EspelhoDaIlusão #Maputo",
        },
        {
          platform: "whatsapp",
          type: "Broadcast",
          broadcast: "Uma leitora disse-me isto:\n\n\"Chorei no capítulo 5. Não de tristeza. De reconhecimento.\"\n\nSe queres saber o que ela encontrou:\nseteveus.space/experiencias\n\nOu começa pelo teste gratuito:\nseteveus.space/recursos/teste\n\n~ Vivianne",
        },
      ],
    },
    {
      day: "Quinta-feira",
      dayShort: "Qui",
      theme: "Reel — No da Heranca (mãe e filha)",
      slots: [
        {
          platform: "instagram",
          type: "Reel (texto emocional 20s)",
          visual: {
            bg: "#c9b896", text: "#3d3630", accent: "#f7f5f0", format: "vertical",
            title: "A mãe sempre viu.\nEsperou anos.",
            body: "Agora que Sara acordou,\nHelena tem algo\npara lhe dizer.",
            footer: "O No da Heranca",
          },
          notes: "ROTEIRO DO REEL:\n\n(0-3s) Fundo quente, dourado. \"A mãe sempre viu.\"\n(3-6s) \"Esperou anos.\"\n(6-9s) Pausa dramatica. Ecra quase vazio.\n(9-12s) \"Agora que Sara acordou...\"\n(12-16s) \"...Helena tem algo para lhe dizer.\"\n(16-18s) \"O No da Heranca.\"\n(18-20s) \"A continuacao emocional do Espelho da Ilusão.\"\n+ seteveus.space/coleccao-nos\n\nMUSICA: Algo emocional mas contido. Violino suave ou piano.\nFONTE: Serif grande, centralizadas",
          caption: "A mãe sempre viu. Esperou anos.\n\nO No da Heranca e a históriade Sara e Helena — mãe e filha — é o silêncio herdado entre elas.\n\nSo se desbloqueia ao completar o Espelho da Ilusão.\n\nseteveus.space/coleccao-nos\n\n#OsSeteVeus #NoDaHeranca #Reel #MaeEFilha",
        },
      ],
    },
    {
      day: "Sexta-feira",
      dayShort: "Sex",
      theme: "Carrossel — Precos e packs",
      slots: [
        {
          platform: "instagram",
          type: "Carrossel (5 slides)",
          visual: {
            bg: "#3d3630", text: "#f7f5f0", accent: "#c9b896", format: "square",
            title: "Quanto custa\nescolher-te?",
            body: "",
            footer: "Swipe para ver precos ~",
          },
          notes: "SLIDES DO CARROSSEL:\n\nSlide 1 (capa): Fundo escuro #3d3630, texto dourado #c9b896\n\"Quanto custa escolher-te?\"\n\nSlide 2: Fundo #f7f5f0\n\"Espelho da Ilusão\n$29 USD / 1.885 MZN / R$119 / 27EUR\nAcesso vitalicio\n7 capítulos + respiração + diário + espelho pessoal\"\n\nSlide 3: Fundo #ebe7df\n\"No da Heranca\n$12 USD / 780 MZN / R$49 / 11EUR\nSo desbloqueia ao completar o Espelho\nA continuacao emocional\"\n\nSlide 4: Fundo #f7f5f0\n\"Pack 3 Espelhos: $69 (18% desconto)\n→ 3 Nos incluidos!\n\nJornada Completa: $149 (27% desconto)\n→ Todos os Nos incluidos!\"\n\nSlide 5 (CTA): Fundo #3d3630, texto #c9b896\n\"Começa pelo teste gratuito.\nOu pelo Espelho da Ilusão.\nPayPal, M-Pesa ou Millenium BIM.\nseteveus.space/comprar\"",
          caption: "Quanto custa escolher-te?\n\nEspelho da Ilusão: $29 USD (1.885 MZN)\nNo da Heranca: $12 USD (780 MZN)\nPack 3 Espelhos: $69 (Nos incluidos!)\nJornada Completa: $149\n\nAcesso vitalicio. Sem subscricoes.\nPayPal, M-Pesa ou Millenium BIM.\n\nseteveus.space/comprar\n\n#OsSeteVeus #Precos #Autoconhecimento",
        },
        {
          platform: "whatsapp",
          type: "Status + Broadcast",
          visual: {
            bg: "#3d3630", text: "#c9b896", accent: "#f7f5f0", format: "vertical",
            title: "Espelho da Ilusão\n$29 USD\n1.885 MZN",
            body: "Acesso vitalicio.\nSem subscricoes.",
            footer: "seteveus.space/comprar",
          },
          broadcast: "Sabes quanto custa escolher-te?\n\nEspelho da Ilusão: $29 USD (1.885 MZN)\nNo da Heranca: $12 USD (780 MZN)\n\nAcesso vitalicio. Sem subscricoes.\nPayPal, M-Pesa ou Millenium BIM.\n\nComeca por aqui:\nseteveus.space/comprar\n\n~ Vivianne",
        },
      ],
    },
    {
      day: "Sabado",
      dayShort: "Sab",
      theme: "Story bastidores + engagement",
      slots: [
        {
          platform: "instagram",
          type: "Story (3 frames)",
          visual: {
            bg: "#f7f5f0", text: "#3d3630", accent: "#c9b896", format: "vertical",
            title: "Sabias que\na comunidade Ecos\ne completamente\nanónima?",
            body: "Quatro salas. Tudo impermanente.\nIncluida com qualquer experiência.",
            footer: "seteveus.space/comunidade",
          },
          notes: "Story 1: \"Sabias que a comunidade Ecos e completamente anónima?\"\nStory 2: Print de seteveus.space/comunidade\nStory 3: \"Incluida com qualquer experiência de leitura. seteveus.space\"",
        },
        {
          platform: "ambos",
          type: "Responder DMs e mensagens",
          notes: "Engagement profundo: responder DMs, agradecer partilhas, comentar em posts de seguidoras.",
        },
      ],
    },
    {
      day: "Domingo",
      dayShort: "Dom",
      theme: "Reflexão + preparacao",
      slots: [
        {
          platform: "instagram",
          type: "Post Feed (citação dominical)",
          visual: {
            bg: "#f7f5f0", text: "#3d3630", accent: "#7a8c6e", format: "square",
            title: "Não precisas\nde estar pronta.\nPrecisas apenas\nde estar disposta.",
            body: "",
            footer: "Os Sete Véus ~ seteveus.space",
          },
          caption: "Não precisas de estar pronta. Precisas apenas de estar disposta.\n\nseteveus.space\n\n#OsSeteVeus #Reflexão #Domingo #Autoconhecimento",
        },
        {
          platform: "ambos",
          type: "Planear semana 7",
          notes: "Rever metricas. Preparar conteúdo da campanha Medo. Gravar reels se possivel.",
        },
      ],
    },
  ],
};

// ─── SEMANA 7: CAMPANHA ESPELHO DO MEDO (LANCAMENTO MARCO) ──────────────────

const week7: WeekPlan = {
  weekNumber: 7,
  title: "Campanha: Espelho do Medo (Marco 2026)",
  subtitle: "Lancamento do segundo espelho com campanha visual forte",
  days: [
    {
      day: "Segunda-feira",
      dayShort: "Seg",
      theme: "Reel — Teaser do Medo",
      slots: [
        {
          platform: "instagram",
          type: "Reel (teaser cinematico 15s)",
          visual: {
            bg: "#8b9b8e", text: "#f7f5f0", accent: "#ebe7df", format: "vertical",
            title: "Sabes o que queres.\nMas o medo\ndecide antes de ti.",
            body: "",
            footer: "O Espelho do Medo ~ Marco 2026",
            highlight: "Em breve",
          },
          notes: "ROTEIRO DO REEL:\n\n(0-3s) Ecra escuro. Texto branco aparece: \"Sabes o que queres.\"\n(3-5s) \"Mas o medo...\"\n(5-8s) \"...decide antes de ti.\"\n(8-10s) Pausa. Cor muda para #8b9b8e (verde-acinzentado do véu do Medo)\n(10-13s) \"O Espelho do Medo.\"\n(13-15s) \"Marco 2026. seteveus.space\"\n\nMUSICA: Tensao subtil que resolve em calma\nEFEITO: Texto aparece com glitch suave ou typewriter",
          caption: "Sabes o que queres. Mas o medo decide antes de ti.\n\nO Espelho do Medo. O segundo espelho da coleccao.\nMarco 2026.\n\nseteveus.space/experiencias\n\n#OsSeteVeus #EspelhoDoMedo #EmBreve #Marco2026 #Reel",
        },
        {
          platform: "whatsapp",
          type: "Status + Broadcast",
          visual: {
            bg: "#8b9b8e", text: "#f7f5f0", accent: "#ebe7df", format: "vertical",
            title: "O segundo espelho\nesta quase a chegar.",
            body: "O Espelho do Medo.\nMarco 2026.",
            footer: "seteveus.space",
          },
          broadcast: "Tenho uma novidade para ti.\n\nO segundo espelho está quase pronto.\n\nO Espelho do Medo chega em Marco de 2026. A históriade quem sabe o que quer mas deixa o medo decidir por si.\n\nSe quiseres ser das primeiras a ler:\nseteveus.space/experiencias\n\n~ Vivianne",
        },
      ],
    },
    {
      day: "Terca-feira",
      dayShort: "Ter",
      theme: "Carrossel — Os 7 véus explicados",
      slots: [
        {
          platform: "instagram",
          type: "Carrossel (9 slides)",
          visual: {
            bg: "#f7f5f0", text: "#3d3630", accent: "#c9b896", format: "square",
            title: "Os 7 Véus\ndo Despertar",
            body: "Cada véu esconde algo.\nQual é o teu?",
            footer: "Swipe ~",
          },
          notes: "SLIDES DO CARROSSEL (um véu por slide):\n\nSlide 1 (capa): Fundo #f7f5f0\n\"Os 7 Véus do Despertar. Qual é o teu?\"\n\nSlide 2: Fundo #c9b896 (dourado)\n\"1. Ilusão\nA vida que tens foi escolhida por ti?\nEspelho da Ilusão — Disponivel agora\"\n\nSlide 3: Fundo #8b9b8e (verde-cinza)\n\"2. Medo\nSabes o que queres mas o medo decide.\nEspelho do Medo — Marco 2026\"\n\nSlide 4: Fundo #b39b7d (terra)\n\"3. Culpa\nA culpa que te prende a escolhas que não são tuas.\nEspelho da Culpa — Abril 2026\"\n\nSlide 5: Fundo #a09088 (rosa-terra)\n\"4. Identidade\nQuem es tu sem a máscara?\nEspelho da Identidade — Maio 2026\"\n\nSlide 6: Fundo #7a8c6e (verde-musgo)\n\"5. Controlo\nO controlo que isola quem mais amas.\nEspelho do Controlo — Junho 2026\"\n\nSlide 7: Fundo #b08d8d (rosa-antigo)\n\"6. Desejo\nO desejo que esvazia em vez de preencher.\nEspelho do Desejo — Julho 2026\"\n\nSlide 8: Fundo #8c9bab (azul-acinzentado)\n\"7. Separação\nA separacao que reinventa o lar.\nEspelho da Separação — Agosto 2026\"\n\nSlide 9 (CTA): Fundo #3d3630, texto #c9b896\n\"Descobre qual véu te esconde.\nTeste gratuito: seteveus.space/recursos/teste\"",
          caption: "Os 7 Véus do Despertar:\n\n1. Ilusão — Disponivel agora\n2. Medo — Marco 2026\n3. Culpa — Abril 2026\n4. Identidade — Maio 2026\n5. Controlo — Junho 2026\n6. Desejo — Julho 2026\n7. Separação — Agosto 2026\n\nQual é o teu? Descobre:\nseteveus.space/recursos/teste\n\n#OsSeteVeus #7Veus #Autoconhecimento #Carrossel",
        },
      ],
    },
    {
      day: "Quarta-feira",
      dayShort: "Qua",
      theme: "Post visual — Citação do Medo",
      slots: [
        {
          platform: "instagram",
          type: "Post Feed (imagem com citação)",
          visual: {
            bg: "#8b9b8e", text: "#f7f5f0", accent: "#ebe7df", format: "square",
            title: "O primeiro passo\nnao precisa\nde ser grande.\n\nPrecisa apenas\nde ser teu.",
            body: "",
            footer: "O Espelho do Medo ~ seteveus.space",
          },
          caption: "\"O primeiro passo não precisa de ser grande. Precisa apenas de ser teu.\"\n\n-- O Espelho do Medo (Marco 2026)\n\nseteveus.space/experiencias\n\n#OsSeteVeus #EspelhoDoMedo #Citação #Medo #Coragem",
        },
        {
          platform: "whatsapp",
          type: "Status",
          visual: {
            bg: "#8b9b8e", text: "#f7f5f0", accent: "#ebe7df", format: "vertical",
            title: "O primeiro passo\nnao precisa\nde ser grande.",
            body: "Precisa apenas\nde ser teu.",
            footer: "O Espelho do Medo",
          },
        },
      ],
    },
    {
      day: "Quinta-feira",
      dayShort: "Qui",
      theme: "Reel — Antes e depois (leitora)",
      slots: [
        {
          platform: "instagram",
          type: "Reel (antes/depois emocional 20s)",
          visual: {
            bg: "#ebe7df", text: "#3d3630", accent: "#c9b896", format: "vertical",
            title: "Antes de ler:\n\"Está tudo bem.\"\n\nDepois de ler:\n\"Estava tudo\na fingir.\"",
            body: "",
            footer: "O Espelho da Ilusão",
          },
          notes: "ROTEIRO DO REEL:\n\n(0-5s) Split screen ou transicao:\nLADO ESQUERDO / ANTES: Texto cinza sobre fundo claro\n\"Antes de ler o Espelho da Ilusão:\"\n\"Está tudo bem comigo.\"\n\n(5-10s) Transicao dramatica (zoom ou glitch)\n\n(10-15s) LADO DIREITO / DEPOIS: Texto dourado sobre fundo escuro\n\"Depois de ler:\"\n\"Estava tudo a fingir.\"\n\n(15-20s) Logo + \"O Espelho da Ilusão. Uma experiência que muda a forma como te vês.\"\nseteveus.space\n\nMUSICA: Transicao de algo casual para algo profundo\nEFEITO: Mudanca de cor/humor dramatica",
          caption: "Antes: \"Está tudo bem.\"\nDepois: \"Estava tudo a fingir.\"\n\nO Espelho da Ilusão muda a forma como te vês.\n\nseteveus.space/experiencias\n\n#OsSeteVeus #AntesEDepois #Reel #Transformação #EspelhoDaIlusão",
        },
      ],
    },
    {
      day: "Sexta-feira",
      dayShort: "Sex",
      theme: "Post visual — Livro físico + digital",
      slots: [
        {
          platform: "instagram",
          type: "Post Feed (composicao visual)",
          visual: {
            bg: "#ebe7df", text: "#3d3630", accent: "#c9b896", format: "square",
            title: "Dois caminhos.\nA mesma jornada.",
            body: "Livro físico: Os 7 Véus do Despertar\n232 paginas — $23 USD\n\nPlataforma digital: Espelho da Ilusão\n7 capítulos imersivos — $29 USD\n\nLeitores do livro físico\ntem acesso digital gratuito.",
            footer: "seteveus.space/comprar",
            highlight: "Fisico + Digital",
          },
          notes: "DESIGN: Composicao com foto do livro físico ao lado de print do telemovel com a plataforma. Se não tiver foto profissional, usar mockup.\n\nFOTO NECESSARIA: Livro físico numa mesa bonita (ou mockup)",
          caption: "Dois caminhos. A mesma jornada.\n\nLivro físico: Os 7 Véus do Despertar (232 paginas, $23 USD)\nPlataforma digital: Espelho da Ilusão (7 capítulos imersivos, $29 USD)\n\nLeitores do livro físico tem acesso digital gratuito.\n\nseteveus.space/comprar\n\n#OsSeteVeus #LivroFisico #PlataformaDigital #Autoconhecimento",
        },
        {
          platform: "whatsapp",
          type: "Broadcast",
          broadcast: "Sabias que se tens o livro físico Os 7 Véus do Despertar, tens acesso gratuito a plataforma digital?\n\nRegistar: seteveus.space/pedir-código\n\n~ Vivianne",
        },
      ],
    },
    {
      day: "Sabado",
      dayShort: "Sab",
      theme: "Story interactivo + engagement",
      slots: [
        {
          platform: "instagram",
          type: "Story (quiz interactivo)",
          visual: {
            bg: "#3d3630", text: "#f7f5f0", accent: "#c9b896", format: "vertical",
            title: "Quiz rapido:",
            body: "O que te impede mais\nde ser quem realmente es?",
            footer: "Responde",
          },
          notes: "Story com sticker de Quiz:\n\"O que te impede mais?\"\nA) O medo do que vao pensar\nB) A culpa de querer mais\nC) Não saber quem sou\nD) O habito de controlar tudo\n\nSegundo story: \"Cada resposta é um véu. Descobre o teu: seteveus.space/recursos/teste\"",
        },
        {
          platform: "ambos",
          type: "Responder DMs e mensagens",
          notes: "Engagement profundo. Responder quem participou nos quizzes e polls.",
        },
      ],
    },
    {
      day: "Domingo",
      dayShort: "Dom",
      theme: "Conteudo leve + preparacao",
      slots: [
        {
          platform: "instagram",
          type: "Story (bastidores)",
          visual: {
            bg: "#f7f5f0", text: "#3d3630", accent: "#7a8c6e", format: "vertical",
            title: "O Espelho do Medo\njá tem nome\ne rosto.",
            body: "Rui e Ana.\nO que o medo calou\nentre eles.",
            footer: "~ Em breve",
          },
          notes: "Story de bastidores: partilhar algo sobre a escrita do novo espelho. Foto do caderno, notas, ou simplesmente texto bonito sobre fundo.\n\"O Espelho do Medo já tem nome e rosto. Rui e Ana. O que o medo calou entre eles.\"",
        },
        {
          platform: "ambos",
          type: "Planear semana 8",
          notes: "Rever metricas. Identificar top posts. Preparar conteúdo da semana 8.",
        },
      ],
    },
  ],
};

// ─── SEMANA 8: CONSOLIDACAO + CRESCIMENTO ─────────────────────────────────────

const week8: WeekPlan = {
  weekNumber: 8,
  title: "Consolidacao + Crescimento organico",
  subtitle: "Reciclar melhores conteudos + novos formatos para crescer",
  days: [
    {
      day: "Segunda-feira",
      dayShort: "Seg",
      theme: "Reel — Pergunta provocadora",
      slots: [
        {
          platform: "instagram",
          type: "Reel (texto + música 15s)",
          visual: {
            bg: "#f7f5f0", text: "#3d3630", accent: "#c9b896", format: "vertical",
            title: "É se tudo o que\nacreditas sobre ti\nfoi escolhido\npor outra pessoa?",
            body: "",
            footer: "seteveus.space",
          },
          notes: "ROTEIRO DO REEL:\n\n(0-5s) Fundo claro. Pergunta aparece palavra a palavra:\n\"É se tudo o que acreditas sobre ti...\"\n(5-8s) \"...foi escolhido por outra pessoa?\"\n(8-12s) Pausa. Depois: \"Há 7 véus entre ti e a verdade.\"\n(12-15s) Logo + seteveus.space/recursos/teste\n\nMUSICA: Algo que cresce em intensidade\nEFEITO: Texto em typewriter ou kinetic typography",
          caption: "É se tudo o que acreditas sobre ti foi escolhido por outra pessoa?\n\nHa 7 véus entre ti e a verdade.\n\nDescobre qual te esconde:\nseteveus.space/recursos/teste\n\n#OsSeteVeus #Reel #Pergunta #Autoconhecimento #Despertar",
        },
        {
          platform: "whatsapp",
          type: "Status",
          visual: {
            bg: "#f7f5f0", text: "#3d3630", accent: "#c9b896", format: "vertical",
            title: "É se tudo o que\nacreditas sobre ti\nfoi escolhido\npor outra pessoa?",
            body: "Há 7 véus entre ti\ne a verdade.",
            footer: "seteveus.space/recursos/teste",
          },
        },
      ],
    },
    {
      day: "Terca-feira",
      dayShort: "Ter",
      theme: "Carrossel — 5 coisas que ninguem te diz sobre autoconhecimento",
      slots: [
        {
          platform: "instagram",
          type: "Carrossel (7 slides)",
          visual: {
            bg: "#3d3630", text: "#f7f5f0", accent: "#c9b896", format: "square",
            title: "5 coisas que ninguem\nte diz sobre\nautoconhecimento",
            body: "",
            footer: "Swipe ~",
          },
          notes: "SLIDES DO CARROSSEL:\n\nSlide 1 (capa): Fundo #3d3630, texto #c9b896\n\"5 coisas que ninguem te diz sobre autoconhecimento\"\n\nSlide 2: Fundo #f7f5f0\n\"1. Não e um destino. É um processo que nunca acaba.\"\n\nSlide 3: Fundo #ebe7df\n\"2. Vai doer. É isso é sinal de que está a funcionar.\"\n\nSlide 4: Fundo #f7f5f0\n\"3. Não precisas de um retiro de 10 dias. Precisas de 10 minutos honestos.\"\n\nSlide 5: Fundo #ebe7df\n\"4. O que descobres sobre ti pode assustar-te. É está tudo bem.\"\n\nSlide 6: Fundo #f7f5f0\n\"5. A maioria das pessoas desiste no momento em que finalmente ia mudar.\"\n\nSlide 7 (CTA): Fundo #3d3630, texto #c9b896\n\"Não desistas de ti.\nComeca aqui: seteveus.space/recursos/teste\"",
          caption: "5 coisas que ninguem te diz sobre autoconhecimento:\n\n1. Não e um destino\n2. Vai doer\n3. 10 minutos honestos bastam\n4. Pode assustar-te\n5. A maioria desiste antes de mudar\n\nNao desistas de ti.\nseteveus.space/recursos/teste\n\n#OsSeteVeus #Autoconhecimento #Carrossel #DesenvolvimentoPessoal",
        },
        {
          platform: "whatsapp",
          type: "Broadcast",
          broadcast: "Novo post no Instagram: 5 coisas que ninguem te diz sobre autoconhecimento.\n\nA numero 5 e a mais importante.\n\nVe: instagram.com/os7veus\n\nOu faz o teste gratuito:\nseteveus.space/recursos/teste\n\n~ Vivianne",
        },
      ],
    },
    {
      day: "Quarta-feira",
      dayShort: "Qua",
      theme: "Post visual — Citação forte",
      slots: [
        {
          platform: "instagram",
          type: "Post Feed (citação)",
          visual: {
            bg: "#3d3630", text: "#c9b896", accent: "#f7f5f0", format: "square",
            title: "O véu não cai.\nTu e que\ndecides tira-lo.",
            body: "",
            footer: "Os Sete Véus ~ seteveus.space",
          },
          caption: "\"O véu não cai. Tu e que decides tira-lo.\"\n\nseteveus.space\n\n#OsSeteVeus #Citação #Despertar #Coragem #Autoconhecimento",
        },
        {
          platform: "whatsapp",
          type: "Status",
          visual: {
            bg: "#3d3630", text: "#c9b896", accent: "#f7f5f0", format: "vertical",
            title: "O véu não cai.\nTu e que\ndecides tira-lo.",
            body: "",
            footer: "Os Sete Véus",
          },
        },
      ],
    },
    {
      day: "Quinta-feira",
      dayShort: "Qui",
      theme: "Reel — Comunidade Ecos",
      slots: [
        {
          platform: "instagram",
          type: "Reel (screen recording 20s)",
          visual: {
            bg: "#7a8c6e", text: "#f7f5f0", accent: "#ebe7df", format: "vertical",
            title: "Onde as vozes\nse encontram.",
            body: "Ecos. Mare. Circulo. Fogueira.\nTudo anonimo.\nTudo impermanente.",
            footer: "Comunidade Ecos",
          },
          notes: "ROTEIRO DO REEL (screen recording):\n\n(0-3s) Texto: \"Há um espaco onde as vozes se encontram.\"\n(3-8s) Screen recording: abrir seteveus.space/comunidade no telemovel\n(8-12s) Mostrar as 4 salas: Ecos, Mare, Circulo, Fogueira\n(12-16s) Clicar numa sala, mostrar os posts anonimos\n(16-18s) Texto overlay: \"Tudo anonimo. Tudo impermanente.\"\n(18-20s) \"Incluida com qualquer experiência.\" + seteveus.space\n\nPRINTS/GRAVACAO NECESSARIA:\n- Screen recording de seteveus.space/comunidade no telemovel\n- Mostrar navegacao entre salas",
          caption: "Onde as vozes se encontram.\n\nA comunidade Ecos: 4 salas, tudo anonimo, tudo impermanente.\n\nIncluida com qualquer experiência de leitura.\n\nseteveus.space/comunidade\n\n#OsSeteVeus #ComunidadeEcos #Reel #Anonimato",
        },
      ],
    },
    {
      day: "Sexta-feira",
      dayShort: "Sex",
      theme: "Carrossel — FAQ visual",
      slots: [
        {
          platform: "instagram",
          type: "Carrossel (6 slides)",
          visual: {
            bg: "#ebe7df", text: "#3d3630", accent: "#c9b896", format: "square",
            title: "Perguntas\nque nos fazem\nsempre",
            body: "",
            footer: "Swipe ~",
          },
          notes: "SLIDES DO CARROSSEL:\n\nSlide 1 (capa): \"Perguntas que nos fazem sempre\"\n\nSlide 2: \"É um livro?\"\n\"Não. É uma experiência de leitura imersiva com ficção, respiração guiada, diário e espelho pessoal.\"\n\nSlide 3: \"Preciso ler por ordem?\"\n\"Sim. Os capítulos desbloqueiam sequencialmente. Cada um prepara o proximo.\"\n\nSlide 4: \"Como pago em Mocambique?\"\n\"M-Pesa ou Millenium BIM. Envias o comprovativo e confirmamos em 24h.\"\n\nSlide 5: \"Tenho o livro físico. Tenho acesso?\"\n\"Sim! Regista em seteveus.space/pedir-código e recebe o código.\"\n\nSlide 6 (CTA): Fundo #3d3630\n\"Mais perguntas? Fala connosco no chatbot da plataforma.\nseteveus.space\"",
          caption: "As perguntas que nos fazem sempre:\n\nE um livro? Não, é uma experiência.\nPreciso ler por ordem? Sim.\nComo pago em Mocambique? M-Pesa ou BIM.\nTenho o livro físico, tenho acesso? Sim!\n\nMais perguntas? seteveus.space\n\n#OsSeteVeus #FAQ #Perguntas #Autoconhecimento",
        },
        {
          platform: "whatsapp",
          type: "Status",
          visual: {
            bg: "#ebe7df", text: "#3d3630", accent: "#c9b896", format: "vertical",
            title: "Tens duvidas\nsobre a plataforma?",
            body: "Ve o novo post\nno Instagram\ncom respostas\nas perguntas mais comuns.",
            footer: "@os7veus",
          },
        },
      ],
    },
    {
      day: "Sabado",
      dayShort: "Sab",
      theme: "Story + engagement profundo",
      slots: [
        {
          platform: "instagram",
          type: "Story (caixa de perguntas)",
          visual: {
            bg: "#f7f5f0", text: "#3d3630", accent: "#c9b896", format: "vertical",
            title: "Faz-me uma pergunta\nsobre Os Sete Véus.",
            body: "Respondo a tudo.\nSem filtro.",
            footer: "Sticker de pergunta",
          },
          notes: "Usar sticker de pergunta do Instagram.\nResponder as perguntas nos stories seguintes ao longo do dia.\nGuardar as melhores respostas em destaque \"FAQ\".",
        },
        {
          platform: "ambos",
          type: "Responder DMs e mensagens",
          notes: "Dia de engagement profundo. Responder todas as DMs, comentarios e perguntas. Comentar em posts de seguidoras.",
        },
      ],
    },
    {
      day: "Domingo",
      dayShort: "Dom",
      theme: "Reciclar + planear ciclo seguinte",
      slots: [
        {
          platform: "instagram",
          type: "Post Feed (resumo visual)",
          visual: {
            bg: "#3d3630", text: "#f7f5f0", accent: "#c9b896", format: "square",
            title: "Há um espaco\nonde podes\nser quem es.\n\nSem pressa.\nSem máscara.\nSem julgamento.",
            body: "",
            footer: "Os Sete Véus ~ seteveus.space",
          },
          caption: "Há um espaco onde podes ser quem es.\n\nSem pressa. Sem máscara. Sem julgamento.\n\nseteveus.space\n\n#OsSeteVeus #EspacoSeguro #Autoconhecimento #Domingo",
        },
        {
          platform: "ambos",
          type: "Planear proximo ciclo",
          notes: "Rever todas as metricas das 8 semanas.\nIdentificar top 5 posts por engagement.\nReciclar conteudos que funcionaram com variacoes.\nPreparar conteúdo para lançamento do Espelho do Medo.",
        },
      ],
    },
  ],
};

// ─── SEMANA ESPECIAL: CAMPANHA ONBOARDING — PEDE O TEU CODIGO ────────────────

const weekOnboarding: WeekPlan = {
  weekNumber: 9,
  title: "Campanha Onboarding ~ Pede o teu código",
  subtitle: "Para quem já tem o livro físico: pedir o código digital gratuito",
  days: [
    {
      day: "Terca-feira",
      dayShort: "Ter",
      theme: "Anuncio principal",
      slots: [
        {
          platform: "ambos",
          type: "WhatsApp + Instagram Story",
          visual: {
            bg: "#3d3630", text: "#f7f5f0", accent: "#c9b896", format: "vertical",
            title: "Já tens o livro físico?",
            body: "Agora existe uma\nexperiência digital\nque complementa\na tua leitura.\n\nO acesso é gratuito.\nPede o teu código.",
            footer: "seteveus.space/pedir-código",
          },
          caption: "O livro que tens nas maos agora tem uma dimensao digital.\n\nSe já compraste \"Os 7 Véus do Despertar\", tens direito a acesso gratuito a experiência digital — leitura interactiva, diário reflexivo e comunidade.\n\nLink na bio para pedires o teu código.\n\n#OsSeteVeus #AcessoDigital #LivroFisico #Autoconhecimento",
          broadcast: "Já tens o livro físico \"Os 7 Véus do Despertar\"?\n\nAgora existe uma experiência digital que complementa a tua leitura — com diário reflexivo, comunidade anónima e conteúdo exclusivo.\n\nE o melhor: se já compraste o livro, o acesso é gratuito.\n\nPede o teu código aqui: seteveus.space/pedir-código\n\nDemora menos de 2 minutos. Recebes o código em até 24h.\n\n— Vivianne",
        },
      ],
    },
    {
      day: "Quarta-feira",
      dayShort: "Qua",
      theme: "Carrossel — 5 passos",
      slots: [
        {
          platform: "instagram",
          type: "Carrossel",
          carousel: [
            { bg: "#3d3630", text: "#f7f5f0", accent: "#c9b896", title: "Compraste\no livro físico?", body: "", footer: "Os Sete Véus do Despertar" },
            { bg: "#f7f5f0", text: "#3d3630", accent: "#c9b896", title: "Tens direito\não acesso digital\ngratuito.", body: "Tudo o que o livro\nte deu no papel,\nagora vives no ecrã.", footer: "" },
            { bg: "#3d3630", text: "#f7f5f0", accent: "#7a8c6e", title: "Preenche o formulário.", body: "2 minutos.\nNome, email e\n(se quiseres)\numa foto do livro.", footer: "seteveus.space/pedir-código" },
            { bg: "#f7f5f0", text: "#3d3630", accent: "#c9b896", title: "Recebes o código\nem até 24h.", body: "No teu email.\nPessoal. Intransmissivel.", footer: "" },
            { bg: "#7a8c6e", text: "#f7f5f0", accent: "#ebe7df", title: "O que ganhas:", body: "Leitura interactiva\nDiario reflexivo\nRespiracao guiada\nComunidade anónima\nChatbot de apoio 24/7", footer: "seteveus.space/pedir-código" },
          ],
          caption: "5 passos simples. Se já tens o livro físico, o acesso digital e teu por direito.\n\n1. Compraste o livro? Tens direito ao acesso digital gratuito.\n2. Preenche o formulário (2 minutos).\n3. Recebes o código em até 24h.\n4. O que ganhas: leitura interactiva, diário reflexivo, comunidade.\n\nLink na bio.\n\n#OsSeteVeus #AcessoDigital #LivroFisico #Autoconhecimento",
        },
      ],
    },
    {
      day: "Quinta-feira",
      dayShort: "Qui",
      theme: "Tom intimo — WhatsApp",
      slots: [
        {
          platform: "whatsapp",
          type: "Broadcast (tom pessoal)",
          broadcast: "Uma coisa que talvez não saibas:\n\nO livro físico \"Os 7 Véus do Despertar\" tem uma extensão digital.\n\nNao é uma cópia — é uma experiência diferente. Podes escrever reflexões a medida que lês, guardar pensamentos por capítulo, e participar numa comunidade anónima de leitoras que também estão a atravessar os véus.\n\nSe tens o livro, pede o teu código: seteveus.space/pedir-código\n\nE gratuito. É pessoal. É teu.\n\n— Vivianne",
        },
      ],
    },
    {
      day: "Sexta-feira",
      dayShort: "Sex",
      theme: "Visual — papel ao ecrã",
      slots: [
        {
          platform: "instagram",
          type: "Post Feed / Story",
          visual: {
            bg: "#ebe7df", text: "#3d3630", accent: "#c9b896", format: "square",
            title: "Do papel ao ecrã.",
            body: "A mesma essência,\numa nova forma\nde viver.",
            footer: "seteveus.space/pedir-código",
            highlight: "Livro físico + digital",
          },
          caption: "Cada véu que cai no papel pode agora ecoar no digital.\n\nSe já tens o livro, pede o teu acesso gratuito. Link na bio.\n\n#OsSeteVeus #DoPapelAoDigital #LeituraTransformadora #Autoconhecimento",
          notes: "Conceito visual: foto do livro físico lado a lado com ecrã do telemovel mostrando a versao digital.\nSe não tiveres foto profissional, usa o Gerador Livre com o print 'livro físico' como fundo.",
        },
      ],
    },
    {
      day: "Sabado",
      dayShort: "Sab",
      theme: "Ultimo lembrete da semana",
      slots: [
        {
          platform: "whatsapp",
          type: "Broadcast (lembrete final)",
          broadcast: "Antes do fim de semana:\n\nSe compraste \"Os 7 Véus do Despertar\" e ainda não pediste o teu código digital — este é o momento.\n\nSo precisas de nome, email e (se quiseres) uma foto do livro.\n\nseteveus.space/pedir-código\n\nBom fim de semana. Que o silêncio te encontre.\n\n— Vivianne",
        },
        {
          platform: "instagram",
          type: "Story",
          visual: {
            bg: "#3d3630", text: "#f7f5f0", accent: "#c9b896", format: "vertical",
            title: "Ultimo lembrete\ndesta semana.",
            body: "Se tens o livro físico\ne ainda não pediste\no teu código digital:\n\neste é o momento.",
            footer: "seteveus.space/pedir-código",
          },
        },
      ],
    },
    {
      day: "Domingo",
      dayShort: "Dom",
      theme: "Descanso + responder mensagens",
      slots: [
        {
          platform: "whatsapp",
          type: "Responder DMs",
          notes: "Responder a todas as mensagens recebidas durante a semana.\nSe alguem perguntou como pedir o código, enviar link directo: seteveus.space/pedir-código\nSe alguem enviou comprovativo, aprovar o código no painel admin.",
        },
      ],
    },
  ],
};

export const allWeeks: WeekPlan[] = [week1, week2, week3, week4, week5, week6, week7, week8, weekOnboarding];

// ─── CARROSSEIS PROFISSIONAIS (slide a slide) ────────────────────────────────

export type ProfessionalCarousel = {
  id: string;
  title: string;
  description: string;
  slides: CarouselSlide[];
  caption: string;
  canvaSpecs: {
    dimensions: string;
    fonts: string;
    colorPalette: string[];
  };
};

export const professionalCarousels: ProfessionalCarousel[] = [
  {
    id: "carousel-o-que-e",
    title: "O que são Os Sete Véus?",
    description: "Carrossel educativo sobre o livro filosófico. Para quem não conhece o projecto.",
    slides: [
      { bg: "#3d3630", text: "#f7f5f0", accent: "#c9b896", title: "Já sentiste que a vida\nque tens não foi\na que escolheste?", body: "", footer: "", bgImage: "/images/mandala-7veus.png" },
      { bg: "#f7f5f0", text: "#3d3630", accent: "#c9b896", title: "Os Sete Véus\ndo Despertar", body: "Um ensaio filosófico\nsobre despertar\nde consciência.\n\n232 páginas.\n7 véus que te escondem\nde ti mesma.", footer: "" },
      { bg: "#3d3630", text: "#f7f5f0", accent: "#7a8c6e", title: "Na plataforma digital,\nnão é só ler.", body: "Lês. Respiras.\nReflectes. Escreves.\n\nCada capítulo tem pausas\nde respiração guiada\ne um diário pessoal.", footer: "", bgImage: "/prints/leitura-capitulo.jpeg" },
      { bg: "#f7f5f0", text: "#3d3630", accent: "#c9b896", title: "Os 7 Véus:", body: "1. Permanência — a crença num eu fixo\n2. Memória — as histórias do passado\n3. Turbilhão — a identificação com pensamentos\n4. Esforço — a busca incessante\n5. Desolação — o medo do vazio\n6. Horizonte — a ilusão dos finais\n7. Dualidade — a separação eu/mundo", footer: "" },
      { bg: "#7a8c6e", text: "#f7f5f0", accent: "#ebe7df", title: "Já tens o livro físico?\nO acesso digital\né gratuito.", body: "Pede o teu código\nem menos de 2 minutos.", footer: "seteveus.space/pedir-codigo", bgImage: "/prints/7veuspedircod-portrait.png" },
    ],
    caption: "Já sentiste que a vida que tens não foi a que escolheste?\n\nOs Sete Véus do Despertar é um ensaio filosófico sobre despertar de consciência. 232 páginas. 7 véus que te escondem de ti mesma.\n\nNa plataforma digital, não é só ler — é uma experiência: lês, respiras, reflectes, escreves.\n\nJá tens o livro físico? O acesso digital é gratuito.\nPede o teu código: seteveus.space/pedir-codigo\n\n#OsSeteVeus #Autoconhecimento #DespertarDeConsciencia #LivroFilosofico #ExperienciaDigital",
    canvaSpecs: {
      dimensions: "1080x1080px (quadrado)",
      fonts: "Título: Playfair Display / Corpo: Inter ou Lato",
      colorPalette: ["#3d3630", "#f7f5f0", "#c9b896", "#7a8c6e", "#ebe7df"],
    },
  },
  {
    id: "carousel-espelho-ilusão",
    title: "O Espelho da Ilusão — 5 citações",
    description: "Carrossel de citações reais do livro. Cada slide é uma citação que para o scroll.",
    slides: [
      { bg: "#3d3630", text: "#c9b896", accent: "#f7f5f0", title: "5 frases que mudam\na forma como te vês.", body: "", footer: "O Espelho da Ilusão", bgImage: "/images/espelho-ilusao.png" },
      { bg: "#f7f5f0", text: "#3d3630", accent: "#c9b896", title: "\"Quando foi que\nescolhi tomar café\nem vez de chá?\"", body: "Uma pergunta absurda\nque muda tudo.", footer: "" },
      { bg: "#3d3630", text: "#f7f5f0", accent: "#c9b896", title: "\"Via, mas não sentia.\nRegistava, mas não\nparticipava.\"", body: "Como quem assiste\na um espectáculo\npor tras de uma\njanela fechada.", footer: "" },
      { bg: "#ebe7df", text: "#3d3630", accent: "#c9b896", title: "\"Não era que não\ntivesse opinião.\nEra que a sua primeira\nreaccao nunca era\no que verdadeiramente\npensava.\"", body: "", footer: "" },
      { bg: "#3d3630", text: "#f7f5f0", accent: "#c9b896", title: "\"Perguntar,\nmesmo tarde,\ne o primeiro gesto\nde se escolher.\"", body: "", footer: "seteveus.space", bgImage: "/images/mandala-7veus.png" },
    ],
    caption: "5 frases d'O Espelho da Ilusão que mudam a forma como te vês.\n\nGuarda está publicacao. Volta quando precisares.\n\nseteveus.space/comprar/espelhos\n\n#OsSeteVeus #EspelhoDaIlusão #CitacoesLiterarias #FicçãoPsicológica #Autoconhecimento",
    canvaSpecs: {
      dimensions: "1080x1080px (quadrado)",
      fonts: "Citacoes: Playfair Display Italic / Fonte: Inter Light",
      colorPalette: ["#3d3630", "#f7f5f0", "#c9b896", "#ebe7df"],
    },
  },
  {
    id: "carousel-experiência-vs-livro",
    title: "Papel vs Digital — o que muda na experiência",
    description: "Carrossel comparativo entre ter só o livro físico e ter o acesso digital. Para campanha Pede o teu código.",
    slides: [
      { bg: "#3d3630", text: "#f7f5f0", accent: "#c9b896", title: "O livro físico\né só o início.", body: "", footer: "", bgImage: "/images/mandala-7veus.png" },
      { bg: "#f7f5f0", text: "#3d3630", accent: "#7a8c6e", title: "Só com o livro físico:", body: "Lês.\nFechas.\nGuardas na estante.\n\nA experiência fica\nno papel.", footer: "" },
      { bg: "#3d3630", text: "#f7f5f0", accent: "#c9b896", title: "Com o acesso digital:", body: "Lês cada véu\nem 3 níveis de profundidade.\nEscreves no teu diário.\nPráticas guiadas.\nComunidade anónima.", footer: "", bgImage: "/prints/leitura-capitulo.jpeg" },
      { bg: "#f7f5f0", text: "#3d3630", accent: "#7a8c6e", title: "3 níveis de leitura:", body: "Semente — guia acessível\nRaiz — notas filosóficas\nÁrvore — texto original, puro", footer: "", bgImage: "/prints/7veus-3niveis-portrait.png" },
      { bg: "#7a8c6e", text: "#f7f5f0", accent: "#ebe7df", title: "Já tens o livro?\nO acesso digital\né gratuito.", body: "Pede o teu código\nem menos de 2 minutos.", footer: "seteveus.space/pedir-codigo" },
    ],
    caption: "O livro físico é só o início.\n\nSó com o papel: lês, fechas, guardas. Com o acesso digital: lês em 3 níveis de profundidade, escreves no diário, práticas guiadas, comunidade anónima.\n\nOs 3 níveis:\n— Semente: guia acessível com exemplos\n— Raiz: texto com notas de contexto filosófico\n— Árvore: texto original, puro, sem interrupções\n\nJá tens o livro? O acesso digital é gratuito.\nPede o teu código: seteveus.space/pedir-codigo\n\n#OsSeteVeus #ExperienciaDigital #LivroFilosofico #Autoconhecimento #PedeOTeuCodigo",
    canvaSpecs: {
      dimensions: "1080x1080px (quadrado)",
      fonts: "Título: Playfair Display Bold / Corpo: Inter",
      colorPalette: ["#3d3630", "#f7f5f0", "#c9b896", "#7a8c6e"],
    },
  },
  {
    id: "carousel-funil-livro-físico",
    title: "Tens o livro físico? Descobre o que mais te espera",
    description: "Carrossel para o funil do livro físico. Mostra o valor do acesso digital gratuito.",
    slides: [
      { bg: "#ebe7df", text: "#3d3630", accent: "#c9b896", title: "Tens Os 7 Véus\ndo Despertar?", body: "O teu livro\nabre portas\nque ainda não conheces.", footer: "", bgImage: "/images/mandala-7veus.png" },
      { bg: "#3d3630", text: "#f7f5f0", accent: "#c9b896", title: "O que ganhas\ncom o acesso digital:", body: "", footer: "" },
      { bg: "#f7f5f0", text: "#3d3630", accent: "#7a8c6e", title: "1. Leitura em\n3 níveis", body: "Cada véu pode ser lido\nem 3 profundidades:\nSemente, Raiz e Árvore.\n\nDo guia acessível\nao texto original, puro.", footer: "", bgImage: "/prints/7veus-3niveis-portrait.png" },
      { bg: "#f7f5f0", text: "#3d3630", accent: "#c9b896", title: "2. Diário + Práticas", body: "Diário reflexivo pessoal.\nPráticas guiadas por véu.\nRespiração entre capítulos.\n\nNão é só ler —\né viver o que leste.", footer: "" },
      { bg: "#f7f5f0", text: "#3d3630", accent: "#c9b896", title: "3. Comunidade anónima", body: "Ecos: um espaço onde\nas vozes se encontram.\nReflexões partilhadas.\nTudo impermanente.", footer: "" },
      { bg: "#c9b896", text: "#3d3630", accent: "#f7f5f0", title: "Gratuito.\nSem compromisso.", body: "Pede o teu código\nem menos de 2 minutos.", footer: "seteveus.space/pedir-codigo" },
    ],
    caption: "Tens o livro físico Os 7 Véus do Despertar?\n\nO teu livro abre portas que ainda não conheces:\n\n— Leitura em 3 níveis (Semente, Raiz, Árvore)\n— Diário reflexivo pessoal\n— Práticas guiadas e respiração entre capítulos\n— Comunidade anónima (Ecos)\n\nTudo gratuito. Sem compromisso.\nPede o teu código em menos de 2 minutos:\nseteveus.space/pedir-codigo\n\n#OsSeteVeus #LivroFisico #AcessoDigital #PedeOTeuCodigo #Autoconhecimento",
    canvaSpecs: {
      dimensions: "1080x1080px (quadrado)",
      fonts: "Título: Playfair Display / Corpo: Inter",
      colorPalette: ["#ebe7df", "#3d3630", "#c9b896", "#7a8c6e", "#f7f5f0"],
    },
  },
  {
    id: "carousel-7-véus-resumo",
    title: "Os 7 Véus — um por um",
    description: "Carrossel educativo. Cada slide apresenta um véu com frase-chave. Altamente guardavel.",
    slides: [
      { bg: "#3d3630", text: "#c9b896", accent: "#f7f5f0", title: "Os 7 Véus\nque te escondem\nde ti mesma.", body: "", footer: "Guarda está publicacao.", bgImage: "/images/mandala-7veus.png" },
      { bg: "#c9b896", text: "#3d3630", accent: "#f7f5f0", title: "1. Ilusão", body: "A vida que construiste\nsem perguntar\nse era a que querias.", footer: "" },
      { bg: "#8b9b8e", text: "#f7f5f0", accent: "#ebe7df", title: "2. Medo", body: "Sabes o que queres.\nMas o medo\ndecide antes de ti.", footer: "" },
      { bg: "#c97070", text: "#f7f5f0", accent: "#ebe7df", title: "3. Culpa", body: "Castigas-te\npor quereres mais.\nComo se merecesses\nmenos.", footer: "" },
      { bg: "#7a7a9e", text: "#f7f5f0", accent: "#ebe7df", title: "4. Identidade", body: "Usas uma máscara\nha tanto tempo\nque esqueceste\no rosto.", footer: "" },
      { bg: "#5a7a8a", text: "#f7f5f0", accent: "#ebe7df", title: "5. Controlo", body: "Seguras tudo.\nControlas tudo.\nE perdes tudo\no que não se deixa\nprender.", footer: "" },
      { bg: "#8a6a7a", text: "#f7f5f0", accent: "#ebe7df", title: "6. Desejo", body: "Procuras fora\no que só existe\ndentro.", footer: "" },
      { bg: "#6a6a6a", text: "#f7f5f0", accent: "#c9b896", title: "7. Separação", body: "Separas-te de ti\npara pertencer\não mundo.", footer: "" },
      { bg: "#3d3630", text: "#f7f5f0", accent: "#c9b896", title: "Qual véu\nte esconde?", body: "Descobre em 3 minutos.", footer: "seteveus.space/recursos/teste" },
    ],
    caption: "Os 7 véus que te escondem de ti mesma:\n\n1. Ilusão — a vida que não escolheste\n2. Medo — o que não fazes por medo\n3. Culpa — o castigo de quereres mais\n4. Identidade — a máscara que usas\n5. Controlo — o que seguras a mais\n6. Desejo — o que procuras fora\n7. Separação — o que te separa de ti\n\nQual véu te esconde? Descobre em 3 min:\nseteveus.space/recursos/teste\n\nGuarda está publicacao para voltares quando precisares.\n\n#OsSeteVeus #Os7Veus #Autoconhecimento #DesenvolvimentoPessoal #TransformacaoPessoal",
    canvaSpecs: {
      dimensions: "1080x1080px (quadrado)",
      fonts: "Título: Playfair Display Bold / Subtitulo: Inter Light",
      colorPalette: ["#3d3630", "#c9b896", "#8b9b8e", "#c97070", "#7a7a9e", "#5a7a8a", "#8a6a7a"],
    },
  },
  {
    id: "carousel-como-funciona",
    title: "Como funciona a experiência digital do livro",
    description: "Passo a passo da experiência digital do livro filosófico. Para campanha Pede o teu código.",
    slides: [
      { bg: "#3d3630", text: "#f7f5f0", accent: "#c9b896", title: "Como funciona\na experiência digital?", body: "3 passos simples.", footer: "seteveus.space", bgImage: "/images/mandala-7veus.png" },
      { bg: "#f7f5f0", text: "#3d3630", accent: "#7a8c6e", title: "1. Pede o teu código", body: "Se já tens o livro físico,\no acesso é gratuito.\n\nPreenche o formulário\nem seteveus.space/pedir-codigo\n\nRecebes o código em 24h.", footer: "", bgImage: "/prints/7veuspedircod-portrait.png" },
      { bg: "#3d3630", text: "#f7f5f0", accent: "#c9b896", title: "2. Lê ao teu ritmo", body: "Cada véu tem\n3 níveis de leitura:\n\n~ Semente (guia acessível)\n~ Raiz (notas filosóficas)\n~ Árvore (texto original, puro)", footer: "" },
      { bg: "#f7f5f0", text: "#3d3630", accent: "#7a8c6e", title: "3. Escreve, respira,\npartilha", body: "Diário reflexivo pessoal.\nPráticas guiadas por véu.\nRespiração entre capítulos.\nComunidade anónima.", footer: "" },
      { bg: "#ebe7df", text: "#3d3630", accent: "#c9b896", title: "Incluído:", body: "O livro completo em digital\n3 níveis de leitura por véu\nDiário de reflexão\nPráticas guiadas\nRespiração entre capítulos\nComunidade Ecos\nChatbot de apoio 24/7", footer: "" },
      { bg: "#7a8c6e", text: "#f7f5f0", accent: "#ebe7df", title: "Já tens o livro?\nO acesso é gratuito.", body: "Sem pressa. Sem prazos.\nAcesso vitalício.", footer: "seteveus.space/pedir-codigo" },
    ],
    caption: "Como funciona a experiência digital d'Os 7 Véus do Despertar?\n\n1. Pede o teu código (gratuito para quem tem o livro físico)\n2. Lê ao teu ritmo — cada véu tem 3 níveis de leitura (Semente, Raiz, Árvore)\n3. Escreve, respira, partilha — diário pessoal, práticas guiadas, comunidade anónima\n\nInclui: livro completo em digital, 3 níveis de leitura, diário, práticas, respiração, comunidade Ecos, chatbot 24/7.\n\nJá tens o livro? O acesso é gratuito.\nseteveus.space/pedir-codigo\n\n#OsSeteVeus #ExperienciaDigital #LivroFilosofico #PedeOTeuCodigo #Autoconhecimento",
    canvaSpecs: {
      dimensions: "1080x1080px (quadrado)",
      fonts: "Título: Playfair Display / Corpo: Inter",
      colorPalette: ["#3d3630", "#f7f5f0", "#c9b896", "#7a8c6e", "#ebe7df"],
    },
  },
  {
    id: "carousel-testemunhos",
    title: "O que dizem as leitoras",
    description: "Testemunhos reais (anonimos) da comunidade. Social proof poderoso.",
    slides: [
      { bg: "#3d3630", text: "#c9b896", accent: "#f7f5f0", title: "O que dizem\nas leitoras.", body: "", footer: "Testemunhos reais. Nomes guardados.", bgImage: "/prints/comunidade-marcas-caminho.jpeg" },
      { bg: "#f7f5f0", text: "#3d3630", accent: "#c9b896", title: "\"Sai do modo\nautomatico.\nNao sei para onde vou\nmas pelo menos\nestou acordada.\"", body: "", footer: "~ leitora anónima, Veu 1" },
      { bg: "#3d3630", text: "#f7f5f0", accent: "#c9b896", title: "\"Chorei no banho.\nOutra vez.\nMas desta vez\nnao foi por tristeza.\nFoi por reconhecimento.\"", body: "", footer: "~ leitora anónima, Veu 1" },
      { bg: "#ebe7df", text: "#3d3630", accent: "#c9b896", title: "\"O meu marido\nperguntou: estas bem?\nE eu disse que sim.\nAutomaticamente.\"", body: "", footer: "~ leitora anónima, Veu 1" },
      { bg: "#f7f5f0", text: "#3d3630", accent: "#7a8c6e", title: "\"Este livro não te\nda respostas.\nDa-te as perguntas\nque nunca fizeste.\"", body: "", footer: "~ leitora anónima" },
      { bg: "#3d3630", text: "#f7f5f0", accent: "#c9b896", title: "Reconheces-te?", body: "O Espelho da Ilusão\nesta disponivel.\n\nDescobre qual véu\nte esconde.", footer: "seteveus.space/recursos/teste" },
    ],
    caption: "O que dizem as leitoras d'Os Sete Véus.\n\nTestemunhos reais. Nomes guardados.\n\n\"Sai do modo automatico. Não sei para onde vou mas pelo menos estou acordada.\"\n\n\"Chorei no banho. Outra vez. Mas desta vez não foi por tristeza. Foi por reconhecimento.\"\n\nReconheces-te? Descobre qual véu te esconde:\nseteveus.space/recursos/teste\n\n#OsSeteVeus #TestemunhosReais #Autoconhecimento #FicçãoPsicológica",
    canvaSpecs: {
      dimensions: "1080x1080px (quadrado)",
      fonts: "Citacoes: Playfair Display Italic / Fonte: Inter Light",
      colorPalette: ["#3d3630", "#f7f5f0", "#c9b896", "#ebe7df"],
    },
  },
  {
    id: "carousel-mãe-filha",
    title: "Sara e Helena — O No da Heranca",
    description: "Carrossel emocional sobre a relacao mãe-filha. Para promover o No (readers que completaram o Espelho).",
    slides: [
      { bg: "#3d3630", text: "#c9b896", accent: "#f7f5f0", title: "Há coisas que\numa mãe nunca diz.", body: "", footer: "", bgImage: "/images/capa-no-heran\u00e7a2.png" },
      { bg: "#f7f5f0", text: "#3d3630", accent: "#c9b896", title: "Sara viu o véu.", body: "Percebeu que a vida\nque tinha não era\na que tinha escolhido.\n\nMas há um silêncio\nque vem de antes dela.", footer: "" },
      { bg: "#3d3630", text: "#f7f5f0", accent: "#c9b896", title: "Helena sabia.", body: "A mãe sempre soube.\nViu os mesmos sinais.\nCalou os mesmos medos.\nEsperou anos.", footer: "" },
      { bg: "#ebe7df", text: "#3d3630", accent: "#c9b896", title: "\"Agora que Sara\nacordou,\nHelena tem algo\npara lhe dizer.\"", body: "", footer: "" },
      { bg: "#3d3630", text: "#f7f5f0", accent: "#c9b896", title: "O No da Heranca", body: "A segunda historia.\nSo se desbloqueia\ndepois de completares\no Espelho da Ilusão.\n\nNão é um upsell.\nE uma continuacao\nemocional.", footer: "seteveus.space" },
    ],
    caption: "Há coisas que uma mãe nunca diz.\n\nSara viu o véu. Percebeu que a vida que tinha não era a que tinha escolhido. Mas há um silêncio que vem de antes dela.\n\nHelena — a mãe — sempre soube. Viu os mesmos sinais. Calou os mesmos medos. Esperou anos.\n\nO No da Heranca e a segunda historia. So se desbloqueia depois de completares o Espelho da Ilusão.\n\nNão é um upsell. É uma continuacao emocional.\n\nseteveus.space\n\n#OsSeteVeus #NoDaHeranca #MaeEFilha #FiccaoRelacional #Autoconhecimento",
    canvaSpecs: {
      dimensions: "1080x1080px (quadrado)",
      fonts: "Título: Playfair Display Italic / Corpo: Inter Light",
      colorPalette: ["#3d3630", "#f7f5f0", "#c9b896", "#ebe7df"],
    },
  },
  {
    id: "carousel-recursos-gratis",
    title: "5 recursos gratuitos para comecar",
    description: "Carrossel de valor. Mostra todos os recursos gratis disponiveis (PDFs, teste, audios).",
    slides: [
      { bg: "#7a8c6e", text: "#f7f5f0", accent: "#ebe7df", title: "5 recursos gratuitos\npara comecar\na tua jornada.", body: "", footer: "Sem compromisso. Sem email.", bgImage: "/images/mandala-7veus.png" },
      { bg: "#f7f5f0", text: "#3d3630", accent: "#7a8c6e", title: "1. Teste:\nQual véu te esconde?", body: "3 minutos. 7 perguntas.\nDescobre o véu que mais\nte influencia agora.\n\nNao da respostas —\nda perguntas.", footer: "seteveus.space/recursos/teste" },
      { bg: "#3d3630", text: "#f7f5f0", accent: "#c9b896", title: "2. As 7 Perguntas\ndo Despertar", body: "Uma pergunta por véu.\nImprime. Cola no espelho.\nLe todos os dias.", footer: "PDF gratuito" },
      { bg: "#f7f5f0", text: "#3d3630", accent: "#7a8c6e", title: "3. Diario de 7 Dias", body: "Um exercicio por dia.\nEscrito pela autora.\nPara quem quer comecar\nsem saber por onde.", footer: "PDF gratuito" },
      { bg: "#3d3630", text: "#f7f5f0", accent: "#c9b896", title: "4. Checklist\ndo Despertar", body: "Uma lista visual\ndos sinais de cada véu.\n\nReconhece onde estas.\nVe até onde podes ir.", footer: "PDF gratuito" },
      { bg: "#ebe7df", text: "#3d3630", accent: "#7a8c6e", title: "5. Mini-guia:\nO que são os 7 Veus?", body: "16 paginas.\nExplicacao simples.\nPara quem quer perceber\nantes de comecar.", footer: "PDF gratuito" },
      { bg: "#7a8c6e", text: "#f7f5f0", accent: "#ebe7df", title: "Tudo em\nseteveus.space/recursos", body: "Gratuito.\nSem email obrigatorio.\nSem compromisso.", footer: "seteveus.space/recursos" },
    ],
    caption: "5 recursos gratuitos para comecar a tua jornada interior:\n\n1. Teste: Qual véu te esconde? (3 min)\n2. As 7 Perguntas do Despertar (PDF)\n3. Diario de 7 Dias (PDF)\n4. Checklist do Despertar (PDF)\n5. Mini-guia: O que são os 7 Veus? (PDF)\n\nTudo gratuito. Sem email. Sem compromisso.\n\nseteveus.space/recursos\n\nGuarda está publicacao para quando precisares.\n\n#OsSeteVeus #RecursosGratuitos #Autoconhecimento #DesenvolvimentoPessoal #PDFGratis",
    canvaSpecs: {
      dimensions: "1080x1080px (quadrado)",
      fonts: "Título: Playfair Display / Corpo: Inter",
      colorPalette: ["#7a8c6e", "#f7f5f0", "#3d3630", "#c9b896", "#ebe7df"],
    },
  },
  {
    id: "carousel-comunidade-ecos",
    title: "Comunidade Ecos — o que e?",
    description: "Apresentar a comunidade anónima. Diferencial único da plataforma.",
    slides: [
      { bg: "#3d3630", text: "#f7f5f0", accent: "#c9b896", title: "É se pudesses\npartilhar o que sentes\nsem ninguem\nsaber quem es?", body: "", footer: "", bgImage: "/prints/comunidade-ecos-tabs.jpeg" },
      { bg: "#f7f5f0", text: "#3d3630", accent: "#c9b896", title: "Comunidade Ecos", body: "Um espaco onde as vozes\nse encontram.\n\nAnonimo.\nImpermanente.\nReal.", footer: "" },
      { bg: "#3d3630", text: "#f7f5f0", accent: "#c9b896", title: "Ecos", body: "Reflexões partilhadas\nanónimamente.\n\nNinguem sabe quem escreveu.\nTodos se reconhecem.", footer: "Expiram em 30 dias." },
      { bg: "#ebe7df", text: "#3d3630", accent: "#7a8c6e", title: "Reconhecimentos", body: "Não há likes.\nHa \"reconheco-me\".\n\nUm toque silencioso\nque diz:\n\"Eu também.\"", footer: "" },
      { bg: "#3d3630", text: "#f7f5f0", accent: "#c9b896", title: "Sussurros", body: "Mensagens de uma só via.\nMax 100 caracteres.\nExpiram em 7 dias.\n\nUm sussurro.\nNao uma conversa.", footer: "" },
      { bg: "#f7f5f0", text: "#3d3630", accent: "#c9b896", title: "Sem nomes.\nSem fotos.\nSem historico.", body: "Tudo desaparece.\nComo as folhas\nnuma corrente.", footer: "" },
      { bg: "#7a8c6e", text: "#f7f5f0", accent: "#ebe7df", title: "Entra na comunidade.", body: "Incluida com qualquer\nacesso a plataforma.", footer: "seteveus.space" },
    ],
    caption: "É se pudesses partilhar o que sentes sem ninguem saber quem es?\n\nComunidade Ecos:\n\n~ Ecos: reflexões anónimas (expiram em 30 dias)\n~ Reconhecimentos: não há likes, há \"reconheco-me\"\n~ Sussurros: mensagens de uma só via (expiram em 7 dias)\n\nSem nomes. Sem fotos. Sem historico.\nTudo desaparece. Como as folhas numa corrente.\n\nIncluida com qualquer acesso a plataforma.\nseteveus.space\n\n#OsSeteVeus #ComunidadeEcos #Anonimato #ReflexaoColectiva #Autoconhecimento",
    canvaSpecs: {
      dimensions: "1080x1080px (quadrado)",
      fonts: "Título: Playfair Display / Corpo: Inter",
      colorPalette: ["#3d3630", "#f7f5f0", "#c9b896", "#7a8c6e", "#ebe7df"],
    },
  },
  {
    id: "carousel-espelho-medo-coming",
    title: "O Espelho do Medo — em breve (Marco 2026)",
    description: "Teaser para o proximo lançamento. Gerar antecipacao e waitlist.",
    slides: [
      { bg: "#8b9b8e", text: "#f7f5f0", accent: "#ebe7df", title: "O segundo véu\nesta quase\na cair.", body: "", footer: "", bgImage: "/images/espelho-medo.png" },
      { bg: "#3d3630", text: "#f7f5f0", accent: "#8b9b8e", title: "Sabes o que queres.", body: "Mas o medo\ndecide antes de ti.\n\nSempre decidiu.", footer: "" },
      { bg: "#f7f5f0", text: "#3d3630", accent: "#8b9b8e", title: "O Espelho do Medo", body: "A históriade quem\nsabe o caminho\nmas não da o passo.\n\nPorque o medo\ne mais rapido\nque a vontade.", footer: "Marco 2026" },
      { bg: "#8b9b8e", text: "#f7f5f0", accent: "#ebe7df", title: "\"É se falhar?\"\n\"É se me arrepender?\"\n\"É se não resultar?\"", body: "Reconheces estas vozes?", footer: "" },
      { bg: "#3d3630", text: "#8b9b8e", accent: "#f7f5f0", title: "Marco 2026.", body: "Sai primeiro para\nquem já está dentro.\n\nEntra na lista de espera\ne recebe antes de todos.", footer: "seteveus.space" },
    ],
    caption: "O segundo véu está quase a cair.\n\nO Espelho do Medo — Marco 2026.\n\nSabes o que queres. Mas o medo decide antes de ti. Sempre decidiu.\n\n\"É se falhar?\" \"É se me arrepender?\" \"É se não resultar?\"\n\nReconheces estas vozes?\n\nSai primeiro para quem já está dentro da plataforma.\n\nseteveus.space\n\n#OsSeteVeus #EspelhoDoMedo #Marco2026 #ProximoLancamento #Autoconhecimento",
    canvaSpecs: {
      dimensions: "1080x1080px (quadrado)",
      fonts: "Título: Playfair Display / Corpo: Inter",
      colorPalette: ["#8b9b8e", "#3d3630", "#f7f5f0", "#ebe7df"],
    },
  },

  // ─── CAMPANHA: EXPERIENCIA DIGITAL — PEDE O TEU CODIGO ──────────────────────

  {
    id: "carousel-pede-código",
    title: "Compraste o livro? Pede o teu código digital",
    description: "Campanha onboarding. Para quem tem o livro físico e quer o acesso digital gratuito.",
    slides: [
      { bg: "#3d3630", text: "#f7f5f0", accent: "#c9b896", title: "Compraste\no livro físico?", body: "", footer: "Os 7 Véus do Despertar", bgImage: "/images/mandala-7veus.png" },
      { bg: "#f7f5f0", text: "#3d3630", accent: "#c9b896", title: "Tens direito\não acesso digital\ngratuito.", body: "Tudo o que o livro\nte deu no papel,\nagora vives no ecrã.\n\n3 níveis de leitura.\nDiário reflexivo.\nPráticas guiadas.", footer: "" },
      { bg: "#3d3630", text: "#f7f5f0", accent: "#7a8c6e", title: "Preenche o formulário.", body: "2 minutos.\nNome, email e\n(se quiseres)\numa foto do livro.", footer: "seteveus.space/pedir-codigo" },
      { bg: "#f7f5f0", text: "#3d3630", accent: "#c9b896", title: "Recebes o código\nem até 24h.", body: "No teu email.\nPessoal. Intransmissível.", footer: "" },
      { bg: "#7a8c6e", text: "#f7f5f0", accent: "#ebe7df", title: "O que ganhas:", body: "Leitura em 3 níveis\nDiário reflexivo\nRespiração guiada\nPráticas por véu\nComunidade anónima\nChatbot de apoio 24/7", footer: "seteveus.space/pedir-codigo" },
    ],
    caption: "Compraste o livro físico Os 7 Véus do Despertar? Tens direito ao acesso digital gratuito.\n\n1. Preenche o formulário (2 minutos)\n2. Recebes o código em até 24h no teu email\n3. Activa e começa a experiência\n\nO que ganhas: leitura em 3 níveis (Semente, Raiz, Árvore), diário reflexivo, respiração guiada, práticas por véu, comunidade anónima, chatbot 24/7.\n\nPede aqui: seteveus.space/pedir-codigo\n\n#OsSeteVeus #AcessoDigital #LivroFisico #PedeOTeuCodigo #Autoconhecimento",
    canvaSpecs: {
      dimensions: "1080x1080px (quadrado)",
      fonts: "Título: Playfair Display / Corpo: Inter",
      colorPalette: ["#3d3630", "#f7f5f0", "#c9b896", "#7a8c6e", "#ebe7df"],
    },
  },
  {
    id: "carousel-do-papel-ao-digital",
    title: "Do papel ao ecrã — o que muda",
    description: "Mostra as diferencas entre ter só o livro físico e ter o acesso digital. Valor concreto.",
    slides: [
      { bg: "#ebe7df", text: "#3d3630", accent: "#c9b896", title: "Do papel ao ecrã.", body: "A mesma essência.\nUma nova forma\nde viver os véus.", footer: "", bgImage: "/prints/livro-fisico-preco-whatsapp.jpeg" },
      { bg: "#3d3630", text: "#f7f5f0", accent: "#c9b896", title: "So o livro físico:", body: "Lês.\nFechas.\nGuardas na estante.\n\nA experiência fica\nno papel.", footer: "" },
      { bg: "#f7f5f0", text: "#3d3630", accent: "#7a8c6e", title: "Com o acesso digital:", body: "Lês.\nRespiras.\nEscreves no diário.\nPartilhas na comunidade.\n\nA experiência fica\nem ti.", footer: "" },
      { bg: "#3d3630", text: "#f7f5f0", accent: "#c9b896", title: "Diario reflexivo", body: "Cada capítulo tem\num espaco para escreveres\no que sentiste.\n\nSo tu lês.\nSo tu decides.", footer: "" },
      { bg: "#f7f5f0", text: "#3d3630", accent: "#7a8c6e", title: "Comunidade anónima", body: "Ecos: reflexões partilhadas\nsem nome, sem foto.\n\nReconheces-te nas palavras\nde quem nunca viste.", footer: "" },
      { bg: "#3d3630", text: "#f7f5f0", accent: "#c9b896", title: "Respiração guiada", body: "Entre capítulos,\numa pausa.\n\nNao para descansar.\nPara sentir.", footer: "" },
      { bg: "#7a8c6e", text: "#f7f5f0", accent: "#ebe7df", title: "Gratuito para quem\nja tem o livro.", body: "Pede o teu código\nem 2 minutos.", footer: "seteveus.space/pedir-código" },
    ],
    caption: "Do papel ao ecrã. A mesma essência, uma nova forma de viver.\n\nSo o livro físico: lês, fechas, guardas.\nCom o acesso digital: lês, respiras, escreves, partilhas.\n\n+ Diario reflexivo por capítulo\n+ Comunidade anónima (Ecos)\n+ Respiração guiada entre capítulos\n+ Chatbot de apoio 24/7\n\nGratuito para quem já tem o livro físico.\nPede o teu código: seteveus.space/pedir-código\n\n#OsSeteVeus #DoPapelAoDigital #ExperienciaDigital #Autoconhecimento",
    canvaSpecs: {
      dimensions: "1080x1080px (quadrado)",
      fonts: "Título: Playfair Display / Corpo: Inter",
      colorPalette: ["#ebe7df", "#3d3630", "#f7f5f0", "#c9b896", "#7a8c6e"],
    },
  },
  {
    id: "carousel-experiência-digital-completa",
    title: "A experiência digital por dentro",
    description: "Tour visual: o que inclui o acesso digital. Cada slide mostra uma funcionalidade.",
    slides: [
      { bg: "#3d3630", text: "#c9b896", accent: "#f7f5f0", title: "O que está dentro\nda experiência digital?", body: "", footer: "Os 7 Véus do Despertar", bgImage: "/prints/homepage-hero-mandala.jpeg" },
      { bg: "#f7f5f0", text: "#3d3630", accent: "#c9b896", title: "Leitura interactiva", body: "O livro filosofico completo\ncom pausas integradas.\n\nNao é uma cópia digital —\ne uma experiência\ndiferente de ler.", footer: "", bgImage: "/prints/leitura-capitulo.jpeg" },
      { bg: "#3d3630", text: "#f7f5f0", accent: "#7a8c6e", title: "Diario reflexivo", body: "Em cada capítulo,\num espaco para ti.\n\nEscreve o que sentes.\nGuarda o que descobres.\nSo tu tens acesso.", footer: "" },
      { bg: "#f7f5f0", text: "#3d3630", accent: "#c9b896", title: "Respiração guiada", body: "Entre capítulos,\no ecrã escurece.\nUm convite a parar.\n\nInspira. Expira.\nSo depois avancas.", footer: "" },
      { bg: "#3d3630", text: "#f7f5f0", accent: "#c9b896", title: "Comunidade Ecos", body: "Reflexões anónimas.\nImpermanentes.\n\nNinguem sabe quem es.\nTodos se reconhecem.", footer: "", bgImage: "/prints/comunidade-ecos-tabs.jpeg" },
      { bg: "#f7f5f0", text: "#3d3630", accent: "#7a8c6e", title: "Chatbot de apoio", body: "Duvidas sobre os véus?\nSobre a plataforma?\nSobre ti?\n\nUma voz disponivel\n24 horas por dia.", footer: "" },
      { bg: "#ebe7df", text: "#3d3630", accent: "#c9b896", title: "Recursos gratuitos", body: "Teste: Qual véu te esconde?\nDiario de 7 dias\nChecklist do despertar\nMini-guia\nWallpapers", footer: "" },
      { bg: "#7a8c6e", text: "#f7f5f0", accent: "#ebe7df", title: "Tudo isto é teu.", body: "Se já tens o livro físico:\ngratuito.\n\nPede o teu código\nem 2 minutos.", footer: "seteveus.space/pedir-codigo" },
    ],
    caption: "O que está dentro da experiência digital Os 7 Véus do Despertar?\n\n1. Leitura interactiva (não é uma cópia — é outra forma de viver o livro)\n2. Diário reflexivo por capítulo (só tu lês)\n3. Respiração guiada entre capítulos\n4. Comunidade anónima (Ecos)\n5. Chatbot de apoio 24/7\n6. Recursos gratuitos (teste, diário, checklist, mini-guia, wallpapers)\n\nTens o livro físico? O acesso é gratuito.\nPede o teu código: seteveus.space/pedir-codigo\n\n#OsSeteVeus #ExperienciaDigital #PedeOTeuCodigo #Autoconhecimento #LeituraTransformadora",
    canvaSpecs: {
      dimensions: "1080x1080px (quadrado)",
      fonts: "Título: Playfair Display / Corpo: Inter",
      colorPalette: ["#3d3630", "#f7f5f0", "#c9b896", "#7a8c6e", "#ebe7df"],
    },
  },
  {
    id: "carousel-3-razões-digital",
    title: "3 razões para activar o acesso digital",
    description: "Carrossel curto e directo. 3 razões concretas para pedir o código.",
    slides: [
      { bg: "#3d3630", text: "#f7f5f0", accent: "#c9b896", title: "3 razões para\nactivar o teu\nacesso digital.", body: "", footer: "" },
      { bg: "#f7f5f0", text: "#3d3630", accent: "#c9b896", title: "1. O diário\nmuda tudo.", body: "Ler sem escrever\ne como olhar\npara um espelho\nde olhos fechados.", footer: "" },
      { bg: "#3d3630", text: "#f7f5f0", accent: "#7a8c6e", title: "2. Não estas\nsozinha.", body: "Na comunidade Ecos,\noutras mulheres\nestao a atravessar\nos mesmos véus.\n\nAnonimamente.", footer: "" },
      { bg: "#f7f5f0", text: "#3d3630", accent: "#c9b896", title: "3. 3 níveis\nde leitura.", body: "Semente — guia acessível\nRaiz — notas filosóficas\nÁrvore — texto original, puro\n\nO livro físico é a porta.\nO digital é o caminho.", footer: "" },
      { bg: "#c9b896", text: "#3d3630", accent: "#f7f5f0", title: "Já tens o livro?\nO acesso é gratuito.", body: "2 minutos.\nUm formulário.\nUm código.", footer: "seteveus.space/pedir-codigo" },
    ],
    caption: "3 razões para activar o teu acesso digital:\n\n1. O diário reflexivo muda a forma como lês — ler sem escrever é como olhar para um espelho de olhos fechados.\n\n2. Na comunidade Ecos, não estás sozinha — outras mulheres estão a atravessar os mesmos véus, anonimamente.\n\n3. 3 níveis de leitura por véu — Semente (guia acessível), Raiz (notas filosóficas), Árvore (texto original, puro).\n\nJá tens o livro? O acesso é gratuito.\nseteveus.space/pedir-codigo\n\n#OsSeteVeus #AcessoDigital #ExperienciaDigital #PedeOTeuCodigo #Autoconhecimento",
    canvaSpecs: {
      dimensions: "1080x1080px (quadrado)",
      fonts: "Título: Playfair Display / Corpo: Inter",
      colorPalette: ["#3d3630", "#f7f5f0", "#c9b896", "#7a8c6e"],
    },
  },
  {
    id: "carousel-tom-intimo",
    title: "Uma coisa que talvez não saibas",
    description: "Tom pessoal, como se fosse uma conversa intima. Para WhatsApp status ou Instagram story.",
    slides: [
      { bg: "#3d3630", text: "#c9b896", accent: "#f7f5f0", title: "Uma coisa que talvez\nnao saibas.", body: "", footer: "", bgImage: "/images/mandala-7veus.png" },
      { bg: "#ebe7df", text: "#3d3630", accent: "#c9b896", title: "O livro que tens\nna estante...", body: "...tem uma extensão\ndigital.", footer: "" },
      { bg: "#3d3630", text: "#f7f5f0", accent: "#c9b896", title: "Não é uma cópia.", body: "É uma experiência\ndiferente.\n\nPodes escrever reflexões\na medida que lês.\nGuardar pensamentos\npor capítulo.", footer: "" },
      { bg: "#f7f5f0", text: "#3d3630", accent: "#7a8c6e", title: "É participar\nnuma comunidade\nanónima", body: "de leitoras que também\nestao a atravessar\nos véus.", footer: "" },
      { bg: "#3d3630", text: "#f7f5f0", accent: "#c9b896", title: "É gratuito.\nE pessoal.\nE teu.", body: "", footer: "seteveus.space/pedir-código" },
    ],
    caption: "Uma coisa que talvez não saibas:\n\nO livro físico \"Os 7 Véus do Despertar\" tem uma extensão digital.\n\nNao é uma cópia — é uma experiência diferente. Podes escrever reflexões a medida que lês, guardar pensamentos por capítulo, e participar numa comunidade anónima de leitoras.\n\nE gratuito. É pessoal. É teu.\n\nseteveus.space/pedir-código\n\n#OsSeteVeus #ExperienciaDigital #Autoconhecimento",
    canvaSpecs: {
      dimensions: "1080x1080px (quadrado)",
      fonts: "Título: Playfair Display Italic / Corpo: Inter Light",
      colorPalette: ["#3d3630", "#ebe7df", "#f7f5f0", "#c9b896"],
    },
  },

  // ─── CAMPANHA PEDE O TEU CÓDIGO — NOVOS CARROSSEIS ───────────────────────────

  {
    id: "carousel-leitura-3-niveis",
    title: "Um livro que se lê de 3 formas diferentes",
    description: "Carrossel sobre os 3 níveis de leitura da experiência digital. Diferencial único.",
    slides: [
      { bg: "#3d3630", text: "#f7f5f0", accent: "#c9b896", title: "Um livro que se lê\nde 3 formas diferentes.", body: "", footer: "Os 7 Véus do Despertar", bgImage: "/images/mandala-7veus.png" },
      { bg: "#f7f5f0", text: "#3d3630", accent: "#c9b896", title: "Nível 1: Semente ○", body: "Guia acessível.\nResumida em linguagem clara.\nPerguntas de orientação.\nExemplos concretos.\n\nPara quem quer começar\ndevagar.", footer: "" },
      { bg: "#3d3630", text: "#f7f5f0", accent: "#7a8c6e", title: "Nível 2: Raiz ◎", body: "Texto com notas\nde contexto filosófico.\nConceitos como Ubuntu,\nanattā, fanā.\n\nLigações a tradições\nbudistas, africanas, sufis.", footer: "" },
      { bg: "#f7f5f0", text: "#3d3630", accent: "#c9b896", title: "Nível 3: Árvore ●", body: "O texto original,\npuro, sem interrupções.\n\nA escrita da Vivianne\ncomo foi concebida.\nSem guias. Sem notas.\nSó tu e as palavras.", footer: "" },
      { bg: "#7a8c6e", text: "#f7f5f0", accent: "#ebe7df", title: "Já tens o livro físico?\nEstes 3 níveis esperam-te\nno digital.", body: "Gratuito. 2 minutos.", footer: "seteveus.space/pedir-codigo" },
    ],
    caption: "Sabias que Os 7 Véus do Despertar pode ser lido de 3 formas diferentes na plataforma digital?\n\nNível 1 — Semente ○: guia acessível, exemplos concretos\nNível 2 — Raiz ◎: texto com notas de contexto filosófico (Ubuntu, anattā, fanā)\nNível 3 — Árvore ●: texto original, puro, sem interrupções\n\nJá tens o livro físico? Estes 3 níveis esperam-te no digital. Gratuito.\nseteveus.space/pedir-codigo\n\n#OsSeteVeus #3Niveis #ExperienciaDigital #LivroFilosofico #PedeOTeuCodigo #Autoconhecimento",
    canvaSpecs: {
      dimensions: "1080x1080px (quadrado)",
      fonts: "Título: Playfair Display / Corpo: Inter",
      colorPalette: ["#3d3630", "#f7f5f0", "#c9b896", "#7a8c6e", "#ebe7df"],
    },
  },
  {
    id: "carousel-praticas-guiadas",
    title: "Não é só ler. É parar, respirar, escrever.",
    description: "Carrossel sobre as práticas guiadas, respiração e diário. O que diferencia a experiência digital do livro físico.",
    slides: [
      { bg: "#3d3630", text: "#c9b896", accent: "#f7f5f0", title: "Não é só ler.", body: "", footer: "", bgImage: "/images/mandala-7veus.png" },
      { bg: "#f7f5f0", text: "#3d3630", accent: "#c9b896", title: "Entre capítulos,\no ecrã escurece.", body: "Um convite a parar.\n\nInspira. Expira.\nSó depois avanças.", footer: "Respiração guiada" },
      { bg: "#3d3630", text: "#f7f5f0", accent: "#7a8c6e", title: "Cada véu tem\numa prática guiada.", body: "Exercícios de reflexão\nescritos pela autora.\n\nCom sugestão de tempo.\nCom processo claro.\nPara fazer ao teu ritmo.", footer: "" },
      { bg: "#f7f5f0", text: "#3d3630", accent: "#c9b896", title: "O diário reflexivo\né só teu.", body: "Escreve o que sentes\ndepois de cada capítulo.\n\nNinguém lê.\nNinguém julga.\nSó tu decides\no que guardas.", footer: "" },
      { bg: "#ebe7df", text: "#3d3630", accent: "#c9b896", title: "Ler sem escrever\né como olhar\npara um espelho\nde olhos fechados.", body: "", footer: "" },
      { bg: "#7a8c6e", text: "#f7f5f0", accent: "#ebe7df", title: "Tudo isto está\nna experiência digital.", body: "Gratuito para quem\njá tem o livro físico.", footer: "seteveus.space/pedir-codigo" },
    ],
    caption: "Não é só ler. É parar, respirar, escrever.\n\nNa experiência digital d'Os 7 Véus do Despertar:\n\n— Respiração guiada entre capítulos\n— Práticas guiadas por véu, escritas pela autora\n— Diário reflexivo pessoal — só tu lês\n\n\"Ler sem escrever é como olhar para um espelho de olhos fechados.\"\n\nGratuito para quem já tem o livro físico.\nseteveus.space/pedir-codigo\n\n#OsSeteVeus #PraticasGuiadas #DiarioReflexivo #ExperienciaDigital #PedeOTeuCodigo",
    canvaSpecs: {
      dimensions: "1080x1080px (quadrado)",
      fonts: "Título: Playfair Display / Corpo: Inter",
      colorPalette: ["#3d3630", "#f7f5f0", "#c9b896", "#7a8c6e", "#ebe7df"],
    },
  },
  {
    id: "carousel-carta-autora",
    title: "Uma carta da autora sobre a experiência digital",
    description: "Tom pessoal. Vivianne explica porque criou a experiência digital e o que ela representa.",
    slides: [
      { bg: "#3d3630", text: "#c9b896", accent: "#f7f5f0", title: "Uma carta\nda autora.", body: "", footer: "", bgImage: "/images/mandala-7veus.png" },
      { bg: "#f7f5f0", text: "#3d3630", accent: "#c9b896", title: "Quando escrevi\nOs 7 Véus,", body: "sabia que o livro\nera apenas o início.\n\nAs palavras no papel\nsão uma semente.\nMas precisam de espaço\npara crescer.", footer: "Vivianne dos Santos" },
      { bg: "#3d3630", text: "#f7f5f0", accent: "#c9b896", title: "A experiência digital\nnasceu para isso.", body: "Para que não leias sozinha.\n\nPara que tenhas\num lugar onde escrever\no que o livro te fez sentir.\n\nPara que respires\nentre capítulos.", footer: "" },
      { bg: "#ebe7df", text: "#3d3630", accent: "#c9b896", title: "Há um diário\nonde só tu escreves.\nHá práticas guiadas.\nHá uma comunidade\nanónima.", body: "E há 3 formas diferentes\nde ler cada véu.", footer: "" },
      { bg: "#3d3630", text: "#f7f5f0", accent: "#c9b896", title: "Se já tens o livro,\no acesso é gratuito.", body: "Porque quem já\ndeu o primeiro passo\nmerece continuar\nsem barreiras.", footer: "" },
      { bg: "#c9b896", text: "#3d3630", accent: "#f7f5f0", title: "Pede o teu código.\nÉ pessoal. É teu.", body: "2 minutos.\nUm formulário.\nUm código no teu email.", footer: "seteveus.space/pedir-codigo" },
    ],
    caption: "Uma carta da autora:\n\nQuando escrevi Os 7 Véus do Despertar, sabia que o livro era apenas o início. As palavras no papel são uma semente. Mas precisam de espaço para crescer.\n\nA experiência digital nasceu para que não leias sozinha. Para que tenhas um lugar onde escrever o que o livro te fez sentir. Para que respires entre capítulos.\n\nSe já tens o livro, o acesso é gratuito. Porque quem já deu o primeiro passo merece continuar sem barreiras.\n\nPede o teu código: seteveus.space/pedir-codigo\n\n— Vivianne dos Santos\n\n#OsSeteVeus #CartaDaAutora #ExperienciaDigital #PedeOTeuCodigo #Autoconhecimento",
    canvaSpecs: {
      dimensions: "1080x1080px (quadrado)",
      fonts: "Título: Playfair Display Italic / Corpo: Inter Light",
      colorPalette: ["#3d3630", "#f7f5f0", "#c9b896", "#ebe7df"],
    },
  },
];

// ─── SCRIPTS DE REELS ────────────────────────────────────────────────────────

export const reelScripts: ReelScript[] = [
  {
    hook: "Construiste a tua vida inteira sem nunca ter perguntado o que querias.",
    scenes: [
      "CENA 1 (0-3s): Texto aparece letra a letra sobre fundo escuro: \"Construiste a tua vida inteira...\" [pausa dramatica]",
      "CENA 2 (3-6s): \"...sem nunca ter perguntado o que querias.\" [texto completo]",
      "CENA 3 (6-12s): Imagem atmosferica — mulher de costas a olhar pela janela, ou maos a segurar uma chavena. Voz-off ou texto: \"Quando foi que escolhi tomar café em vez de chá? Uma pergunta absurda. Mas foi a pergunta que mudou tudo.\"",
      "CENA 4 (12-20s): Transicao suave. Texto: \"O Espelho da Ilusão e a históriade uma mulher que, pela primeira vez, pergunta.\"",
      "CENA 5 (20-25s): Preview da plataforma (screenshot do leitor) com texto: \"Não é um livro. É uma experiência.\"",
      "CENA 6 (25-30s): CTA final sobre fundo escuro: \"Descobre qual véu te esconde. Link na bio.\"",
    ],
    cta: "Descobre qual véu te esconde. Teste gratuito na bio.",
    music: "Musica ambiente calma, piano suave ou sons de natureza. Sugestoes no Canva/CapCut: 'Contemplative', 'Reflective Piano', 'Soft Ambient'",
    duration: "25-30s",
    canvaTemplate: "Procura 'book reveal' ou 'quote animation' nos templates do CapCut",
  },
  {
    hook: "3 sinais de que vives no automatico:",
    scenes: [
      "CENA 1 (0-3s): Texto grande e directo: \"3 sinais de que vives no automatico\" [prender atencao]",
      "CENA 2 (3-8s): \"1. Respondes 'tanto faz' a perguntas importantes.\" [texto aparece com transicao]",
      "CENA 3 (8-13s): \"2. Não te lembras da ultima vez que escolheste uma rua diferente.\" [transicao]",
      "CENA 4 (13-18s): \"3. A tua primeira reacção nunca é o que verdadeiramente pensas.\" [transicao]",
      "CENA 5 (18-23s): \"Se te reconheces... não es a unica.\" [pausa] \"Escrevi uma históriasobre isso.\"",
      "CENA 6 (23-30s): Capa do Espelho da Ilusão ou preview da plataforma. \"O Espelho da Ilusão. Teste gratuito na bio.\"",
    ],
    cta: "Começa pelo teste gratuito — link na bio.",
    music: "Ritmo suave mas presente. Tipo lo-fi ou ambient electr\u00f3nico. No CapCut: 'Chill Lo-fi' ou 'Minimal Beat'",
    duration: "25-30s",
    canvaTemplate: "Procura 'list reveal' ou 'text animation' nos templates do CapCut",
  },
  {
    hook: "O que acontece quando uma mãe é uma filha dizem o que sempre calaram?",
    scenes: [
      "CENA 1 (0-3s): \"O que acontece quando uma mãe é uma filha dizem o que sempre calaram?\" [texto dramatico]",
      "CENA 2 (3-8s): Imagem: maos de duas geracoes diferentes. Texto: \"Sara viu o véu. Mas há um no que ficou por desatar.\"",
      "CENA 3 (8-15s): \"O No da Heranca e a históriade Sara e Helena — mãe e filha — é o silêncio herdado entre elas.\"",
      "CENA 4 (15-22s): \"Não e um upsell. É uma continuacao emocional. So se desbloqueia depois de completares o Espelho da Ilusão.\"",
      "CENA 5 (22-30s): Preview da plataforma com o card do No desbloqueado. CTA: \"Começa pelo Espelho. O No espera por ti.\"",
    ],
    cta: "Começa pelo Espelho. O No espera por ti.",
    music: "Emocional e intima. Piano + cordas suaves. No CapCut: 'Emotional Piano' ou 'Cinematic Gentle'",
    duration: "25-30s",
    canvaTemplate: "Procura 'emotional story' ou 'book trailer' nos templates do CapCut",
  },
  {
    hook: "Tens o livro físico? Há algo que ainda não sabes.",
    scenes: [
      "CENA 1 (0-3s): Mostrar o livro físico (foto real se possivel). \"Tens este livro?\"",
      "CENA 2 (3-8s): \"Há algo que ainda não sabes sobre ele.\"",
      "CENA 3 (8-15s): \"O livro abre portas que ainda não conheces.\" [transicao para screenshots da plataforma]",
      "CENA 4 (15-22s): Mostrar a experiência digital: leitor, diário, comunidade. \"Leitura integrada. Diario pessoal. Comunidade anónima.\"",
      "CENA 5 (22-28s): \"Acesso gratuito para quem tem o livro físico.\"",
      "CENA 6 (28-35s): \"Pede o teu código em menos de 1 minuto.\" + CTA",
    ],
    cta: "Link na bio para pedires o teu código gratuito.",
    music: "Suave e convidativa. No CapCut: 'Warm Acoustic' ou 'Gentle Inspiration'",
    duration: "30-35s",
    canvaTemplate: "Procura 'product reveal' ou 'unboxing' nos templates do CapCut",
  },
  {
    hook: "Não sabes para onde vais? Optimo.",
    scenes: [
      "CENA 1 (0-3s): \"Não sabes para onde vais?\" [pausa dramatica]",
      "CENA 2 (3-5s): \"Optimo.\" [texto grande, impacto]",
      "CENA 3 (5-12s): \"Não precisas de saber para onde vais. Precisas apenas de dar o primeiro passo.\"",
      "CENA 4 (12-18s): \"Os Sete Véus do Despertar são 7 experiências que te devolvem a ti mesma.\"",
      "CENA 5 (18-25s): \"Sem pressa. Sem formulas. Apenas verdade.\"",
      "CENA 6 (25-30s): \"Começa pelo teste gratuito. 3 minutos. 7 perguntas.\" + CTA",
    ],
    cta: "Teste gratuito na bio. 3 minutos.",
    music: "Inspiracional mas contida. No CapCut: 'Inspiring Minimal' ou 'Hope'",
    duration: "25-30s",
  },
  {
    hook: "Isto não é um livro. É um espelho.",
    scenes: [
      "CENA 1 (0-3s): Ecra escuro. Texto aparece devagar: \"Isto não é um livro.\" [pausa]",
      "CENA 2 (3-5s): \"É um espelho.\" [impacto visual — flash suave]",
      "CENA 3 (5-10s): Screenshots rapidos da plataforma: leitor, diário, checklist, comunidade. Texto: \"Lês. Respiras. Escreves. Sentes.\"",
      "CENA 4 (10-18s): \"7 histórias. 7 véus. Cada um esconde algo que já sabes mas nunca disseste.\"",
      "CENA 5 (18-22s): Print do quiz com texto: \"3 minutos. 7 perguntas. Qual véu te esconde?\"",
      "CENA 6 (22-28s): \"Teste gratuito. Link na bio.\" [fundo escuro, dourado]",
    ],
    cta: "Teste gratuito na bio.",
    music: "Ambiente cinematografico suave. No CapCut: 'Cinematic Soft' ou 'Atmospheric Piano'",
    duration: "25-28s",
  },
  {
    hook: "5 coisas que está plataforma tem que nenhum livro te da.",
    scenes: [
      "CENA 1 (0-3s): \"5 coisas que está plataforma tem que nenhum livro te da.\" [texto directo, fundo escuro]",
      "CENA 2 (3-8s): \"1. Pausas de respiração entre capítulos.\" [screenshot da pausa]",
      "CENA 3 (8-13s): \"2. Um diário pessoal que só tu lês.\" [screenshot do diário]",
      "CENA 4 (13-18s): \"3. Uma comunidade anónima onde ninguem te conhece mas todos se reconhecem.\" [screenshot Ecos]",
      "CENA 5 (18-23s): \"4. Historias que se desbloqueiam ao teu ritmo.\" [screenshot do leitor]",
      "CENA 6 (23-28s): \"5. Um chatbot de apoio com a voz da autora.\" [screenshot do chat]",
      "CENA 7 (28-33s): \"$29 USD. Acesso vitalicio. Link na bio.\" [CTA]",
    ],
    cta: "Link na bio. $29 USD. Acesso vitalicio.",
    music: "Ritmo suave e moderno. No CapCut: 'Soft Pop' ou 'Modern Minimal'",
    duration: "30-33s",
  },
  {
    hook: "Se leste isto até ao fim, este livro e para ti.",
    scenes: [
      "CENA 1 (0-3s): Ecra preto. Texto: \"Se leste isto até ao fim...\" [suspense]",
      "CENA 2 (3-5s): \"...este livro e para ti.\" [transicao suave]",
      "CENA 3 (5-12s): Citação do livro em texto: \"Via, mas não sentia. Registava, mas não participava. Como quem assiste a um espectáculo por tras de uma janela fechada.\"",
      "CENA 4 (12-18s): \"Reconheces-te?\" [pausa longa] \"Entao não es a unica.\"",
      "CENA 5 (18-25s): \"O Espelho da Ilusão. Uma históriasobre despertar do automatico.\"",
      "CENA 6 (25-30s): \"Disponivel agora. Link na bio.\" [imagem do espelho]",
    ],
    cta: "Link na bio. Disponivel agora.",
    music: "Muito calma, quase silenciosa. No CapCut: 'Ambient Silence' ou 'Slow Piano'",
    duration: "25-30s",
  },

  // ─── REELS: CAMPANHA EXPERIENCIA DIGITAL ──────────────────────────────────

  {
    hook: "Tens este livro na estante? Há algo que não sabes sobre ele.",
    scenes: [
      "CENA 1 (0-3s): Mostrar foto do livro físico. Texto: \"Tens este livro?\" [curiosidade]",
      "CENA 2 (3-6s): \"Há algo que não sabes sobre ele.\" [pausa dramatica]",
      "CENA 3 (6-12s): \"O livro físico tem uma extensão digital. Não é uma cópia — é uma experiência diferente.\"",
      "CENA 4 (12-18s): Screenshots rapidos da plataforma: diário, comunidade, respiração. Texto: \"Diario reflexivo. Comunidade anónima. Respiração guiada.\"",
      "CENA 5 (18-24s): \"É se já compraste o livro, o acesso é gratuito.\"",
      "CENA 6 (24-30s): \"Pede o teu código em 2 minutos. Link na bio.\" [CTA]",
    ],
    cta: "Pede o teu código gratuito. Link na bio.",
    music: "Suave e convidativa. No CapCut: 'Warm Acoustic' ou 'Gentle Inspiration'",
    duration: "25-30s",
  },
  {
    hook: "Ler sem escrever e como olhar para um espelho de olhos fechados.",
    scenes: [
      "CENA 1 (0-3s): Texto sobre ecrã escuro: \"Ler sem escrever...\" [suspense]",
      "CENA 2 (3-5s): \"...e como olhar para um espelho de olhos fechados.\" [impacto]",
      "CENA 3 (5-12s): Screenshot do diário reflexivo na plataforma. Texto: \"Na experiência digital, cada capítulo tem um espaco para escreveres o que sentiste.\"",
      "CENA 4 (12-18s): \"So tu lês. So tu decides o que guardas.\"",
      "CENA 5 (18-24s): Screenshot da comunidade Ecos. \"É na comunidade, descobres que não estas sozinha.\"",
      "CENA 6 (24-30s): \"Se já tens o livro físico, o acesso digital e gratuito. Link na bio.\" [CTA]",
    ],
    cta: "Acesso digital gratuito para quem tem o livro. Link na bio.",
    music: "Piano suave e contemplativo. No CapCut: 'Reflective Piano' ou 'Contemplative'",
    duration: "25-30s",
  },
];

// ─── GUIA DE PRODUCAO ────────────────────────────────────────────────────────

export type ProductionGuide = {
  category: string;
  items: { title: string; detail: string }[];
};

export const productionGuide: ProductionGuide[] = [
  {
    category: "Dimensoes e Formatos",
    items: [
      { title: "Post Feed (quadrado)", detail: "1080 x 1080px — para carrosseis e posts estaticos" },
      { title: "Story / Status WhatsApp", detail: "1080 x 1920px (9:16) — para stories e status" },
      { title: "Reel / Cover", detail: "1080 x 1920px (9:16) — capa do reel: 1080x1080 recomendado" },
      { title: "Carrossel", detail: "1080 x 1080px cada slide, maximo 10 slides. Gerados directamente no /painel/marketing — descarrega todos os slides de uma vez." },
    ],
  },
  {
    category: "Paleta de Cores — Os Sete Véus",
    items: [
      { title: "Fundo escuro principal", detail: "#3d3630 — castanho escuro quente" },
      { title: "Fundo claro (cream)", detail: "#f7f5f0 — branco quente" },
      { title: "Dourado (accent)", detail: "#c9b896 — dourado suave" },
      { title: "Verde sage", detail: "#7a8c6e — verde terroso" },
      { title: "Bege medio", detail: "#ebe7df — entre cream e dourado" },
      { title: "Veu do Medo", detail: "#8b9b8e — verde acinzentado" },
      { title: "Veu da Culpa", detail: "#c97070 — vermelho suave" },
    ],
  },
  {
    category: "Tipografia",
    items: [
      { title: "Titulos / Citacoes", detail: "Playfair Display — serif, elegante, literario. Usada automaticamente nos carrosseis gerados." },
      { title: "Corpo de texto", detail: "Inter ou system font — sans-serif, limpo, legivel" },
      { title: "Tamanho titulos", detail: "48-72pt em 1080x1080 — deve ser legivel no telemovel" },
      { title: "Tamanho corpo", detail: "22-32pt em 1080x1080" },
      { title: "Espaco entre linhas", detail: "1.4-1.6 — generoso, para respirar" },
    ],
  },
  {
    category: "Ferramentas Recomendadas (Custo Zero)",
    items: [
      { title: "Gerador integrado (seteveus.space)", detail: "Carrosseis e imagens para redes sociais gerados directamente na plataforma em /painel/marketing. Descarrega PNG pronto para publicar — sem Canva." },
      { title: "CapCut Free", detail: "Para Reels e videos. Templates prontos, legendas automaticas em Portugues, transicoes suaves." },
      { title: "Meta Business Suite", detail: "Para agendar posts no Instagram e Facebook. Gratuito. Mostra melhores horarios para publicar." },
      { title: "WhatsApp Business", detail: "Para Status diários, broadcasts segmentados e catalogo dos livros. Gratuito." },
      { title: "Manychat Free", detail: "Automacao de DMs no Instagram. Alguem comenta 'VEU' no post e recebe DM automatica com link." },
      { title: "Kit (ConvertKit) Free", detail: "Email marketing até 10.000 subscritores. Landing pages e broadcasts gratuitos." },
    ],
  },
  {
    category: "Screenshots para Conteudo",
    items: [
      { title: "Dashboard do membro", detail: "/membro — mostra a experiência completa por dentro" },
      { title: "Leitor de capítulo", detail: "/membro/leitura/1 — mostra como e a leitura integrada" },
      { title: "Respiração guiada", detail: "Screenshot durante a pausa de respiração entre capítulos" },
      { title: "Diario pessoal", detail: "Screenshot da area de reflexão (sem texto pessoal)" },
      { title: "Comunidade Ecos", detail: "/comunidade — mostra as 4 salas" },
      { title: "Quiz resultado", detail: "/recursos/teste — mostra o resultado do teste com o véu revelado" },
      { title: "Card do No desbloqueado", detail: "/membro/leitura — mostra o teaser do No da Heranca apos completar Espelho" },
      { title: "Pagina de compra", detail: "/comprar/espelhos — mostra precos e opcoes" },
    ],
  },
  {
    category: "Automacao Manychat (Instagram DMs)",
    items: [
      { title: "Trigger: comentario 'VEU'", detail: "Quando alguem comenta VEU num post, enviar DM: \"Obrigada pelo teu interesse! Descobre qual véu te esconde com o nosso teste gratuito de 3 minutos: seteveus.space/recursos/teste — Vivianne\"" },
      { title: "Trigger: comentario 'LIVRO'", detail: "Quando alguem comenta LIVRO, enviar DM: \"Tens o livro físico? Pede o teu código de acesso digital gratuito aqui: seteveus.space/pedir-código — Vivianne\"" },
      { title: "Trigger: comentario 'QUERO'", detail: "Quando alguem comenta QUERO, enviar DM: \"O Espelho da Ilusão está disponivel por $29 USD / 1.885 MZN. Acesso vitalicio. Começa aqui: seteveus.space/comprar/espelhos — Vivianne\"" },
      { title: "Story reply automation", detail: "Quando alguem responde a um Story, enviar agradecimento + link para o teste gratuito automaticamente." },
    ],
  },
];
