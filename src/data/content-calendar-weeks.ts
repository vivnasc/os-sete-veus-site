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
          caption: "\"Quando foi que escolhi tomar caf\u00e9 em vez de ch\u00e1?\"\n\nUma pergunta absurda que muda tudo.\n\nO Espelho da Ilus\u00e3o come\u00e7a assim \u2014 com uma manh\u00e3 igual a todas as outras e uma mulher que, pela primeira vez, pergunta.\n\nFaz o quiz gratuito e descobre o teu espelho:\nseteveus.space/recursos/teste\n\n#OsSeteV\u00e9us #EspelhoDaIlus\u00e3o #Autoconhecimento",
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
          caption: "Os Espelhos olham para dentro.\nOs N\u00f3s olham para a rela\u00e7\u00e3o.\n\nO N\u00f3 da Heran\u00e7a \u00e9 a hist\u00f3ria de Sara e Helena \u2014 m\u00e3e e filha \u2014 é o sil\u00eancio herdado entre elas.\n\nS\u00f3 se desbloqueia ao completar o Espelho da Ilus\u00e3o.\n\nseteveus.space/colecção-nos\n\n#OsSeteV\u00e9us #N\u00f3DaHeran\u00e7a #Fic\u00e7\u00e3oRelacional",
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
          broadcast: "Se j\u00e1 leste o Espelho da Ilus\u00e3o, h\u00e1 uma continua\u00e7\u00e3o que quero partilhar contigo.\n\nO N\u00f3 da Heran\u00e7a \u00e9 a hist\u00f3ria de Sara e Helena (m\u00e3e e filha). O que se passa entre duas pessoas quando o v\u00e9u da ilus\u00e3o cai.\n\nS\u00f3 se desbloqueia depois de completares o Espelho. \u00c9 a continua\u00e7\u00e3o emocional, n\u00e3o um upsell.\n\nseteveus.space/colecção-nos\n\n~ Vivianne",
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
  title: "Campanha visual: Reels + Carrosséis",
  subtitle: "Conteúdo visual forte para crescer alcance e engagement",
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
            title: "Aquele momento\nem que percebes\nque a vida que tens\nnão foi escolhida\npor ti.",
            body: "",
            footer: "O Espelho da Ilusão ~ seteveus.space",
          },
          notes: "ROTEIRO DO REEL:\n\nCena 1 (0-3s): Ecrã preto. Texto aparece letra a letra: \"Aquele momento...\"\nCena 2 (3-8s): Print da página seteveus.space/experiencias no telemóvel, scroll lento\nCena 3 (8-15s): Print do leitor aberto (capítulo 1), zoom suave\nCena 4 (15-20s): Print da respiração guiada entre capítulos\nCena 5 (20-25s): Texto: \"Não é um livro. É uma experiência.\"\nCena 6 (25-30s): Logo + seteveus.space\n\nMÚSICA: Ambiente calmo, piano suave\nTRANSIÇÕES: Fade lento entre cenas\n\nPRINTS NECESSÁRIOS:\n- seteveus.space/experiencias (página de compra)\n- seteveus.space/membro/leitura/1 (capítulo aberto)\n- seteveus.space/membro/leitura (lista de capítulos com respiração)",
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
      day: "Terça-feira",
      dayShort: "Ter",
      theme: "Carrossel — 7 sinais de que vives no piloto automático",
      slots: [
        {
          platform: "instagram",
          type: "Carrossel (7 slides)",
          visual: {
            bg: "#f7f5f0", text: "#3d3630", accent: "#c9b896", format: "square",
            title: "7 sinais de que vives\nno piloto automático",
            body: "",
            footer: "Swipe ~",
          },
          notes: "SLIDES DO CARROSSEL:\n\nSlide 1 (capa): Fundo #f7f5f0, texto #3d3630\n\"7 sinais de que vives no piloto automático\"\nSubtitulo: \"Quantos reconheces?\"\n\nSlide 2: Fundo #ebe7df\n\"1. Fazes as mesmas coisas todos os dias sem questionar porque.\"\n\nSlide 3: Fundo #f7f5f0\n\"2. Quando alguém te pergunta o que queres, não tens resposta.\"\n\nSlide 4: Fundo #ebe7df\n\"3. Sentes que a vida passa mas não estás realmente presente.\"\n\nSlide 5: Fundo #f7f5f0\n\"4. As tuas decisões são baseadas no que os outros esperam de ti.\"\n\nSlide 6: Fundo #ebe7df\n\"5. Há algo dentro de ti que quer mais, mas não sabes o que.\"\n\nSlide 7: Fundo #f7f5f0\n\"6. Tens medo de parar porque não sabes o que vais encontrar.\"\n\nSlide 8 (CTA): Fundo #3d3630, texto #c9b896\n\"7. Leste isto tudo e reconheceste-te.\"\n\"Descobre qual véu te esconde:\"\n\"seteveus.space/recursos/teste\"\n\nFONTE: Serif elegante para títulos, sans-serif para corpo\nTODOS os slides devem ter o logo discreto no canto inferior",
          caption: "7 sinais de que vives no piloto automático.\n\nQuantos reconheces? Conta nos comentários.\n\nSe reconheceste mais de 3, o teste gratuito pode revelar algo importante:\nseteveus.space/recursos/teste\n\n#OsSeteVeus #PilotoAutomatico #Autoconhecimento #Despertar #Carrossel",
        },
        {
          platform: "whatsapp",
          type: "Broadcast",
          broadcast: "Preparei um conteúdo novo no Instagram sobre os 7 sinais de que vives no piloto automático.\n\nQuantos reconheces?\n\nVê o post completo: instagram.com/os7veus\n\nOu faz o teste gratuito directamente:\nseteveus.space/recursos/teste\n\n~ Vivianne",
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
            title: "A ilusão mais perigosa\né acreditar que\nescolheste\nquando apenas\nrepetiste.",
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
            title: "A ilusão mais perigosa\né acreditar que\nescolheste\nquando apenas\nrepetiste.",
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
            body: "Leitura integrada\nRespiração guiada\nDiário pessoal\nComunidade anónima",
            footer: "seteveus.space",
          },
          notes: "ROTEIRO DO REEL (screen recording do telemóvel):\n\nGravar screen recording no telemóvel mostrando:\n1. (0-5s) Abrir seteveus.space/membro — dashboard com progresso\n2. (5-10s) Clicar em \"Continuar leitura\" — abre capítulo\n3. (10-15s) Scroll pelo texto do capítulo — mostrar tipografia bonita\n4. (15-20s) Chegar a pausa de reflexão — mostrar a caixa do diário\n5. (20-25s) Mostrar respiração guiada entre capítulos\n6. (25-30s) Final: texto overlay \"Não é um livro. É uma experiência.\"\n\nMÚSICA: Lo-fi calmo ou piano ambiente\nTEXTO OVERLAY: Adicionar legendas em cada transição\n\nPRINTS/GRAVAÇÃO NECESSÁRIA:\n- Screen recording completo no telemóvel (Safari ou Chrome)\n- Começar em seteveus.space/membro\n- Navegar até um capítulo e fazer scroll",
          caption: "Por dentro da experiência Os Sete Véus.\n\nNão é um livro que se lê. É uma experiência que se vive.\n\nLeitura integrada. Respiração guiada. Diário pessoal. Comunidade anónima.\n\nseteveus.space\n\n#OsSeteVeus #PlataformaDigital #LeituraImersiva #Reel #Bookstagram",
        },
      ],
    },
    {
      day: "Sexta-feira",
      dayShort: "Sex",
      theme: "Carrossel — O que é a colecção Espelhos",
      slots: [
        {
          platform: "instagram",
          type: "Carrossel (5 slides)",
          visual: {
            bg: "#ebe7df", text: "#3d3630", accent: "#c9b896", format: "square",
            title: "O que é a colecção\nEspelhos?",
            body: "",
            footer: "Swipe para descobrir ~",
          },
          notes: "SLIDES DO CARROSSEL:\n\nSlide 1 (capa): Fundo #ebe7df\n\"O que é a colecção Espelhos?\"\nImagem: Print da página seteveus.space/experiencias\n\nSlide 2: Fundo #f7f5f0\n\"7 experiências de leitura imersiva.\nCada uma revela um véu diferente.\nIlusão. Medo. Culpa. Identidade.\nControlo. Desejo. Separação.\"\n\nSlide 3: Fundo #ebe7df\n\"Cada experiência inclui:\n7 capítulos de ficção\nRespiração guiada\nDiário de reflexão\nO teu Espelho pessoal\"\nImagem: Print do leitor com capítulos\n\nSlide 4: Fundo #f7f5f0\n\"Disponível agora:\nO Espelho da Ilusão — $29 USD\n\nEm breve:\nO Espelho do Medo — Março 2026\"\nImagem: Print da página de compra\n\nSlide 5 (CTA): Fundo #3d3630, texto #c9b896\n\"Começa pelo teste gratuito.\nDescobre qual véu te esconde.\nseteveus.space/recursos/teste\"",
          caption: "A colecção Espelhos são 7 experiências de leitura imersiva.\n\nCada uma revela um véu diferente. Cada véu esconde algo que precisas de ver.\n\nDisponível agora: O Espelho da Ilusão\nEm breve: O Espelho do Medo (Março 2026)\n\nComeça pelo teste gratuito:\nseteveus.space/recursos/teste\n\n#OsSeteVeus #ColeccaoEspelhos #Autoconhecimento #LeituraImersiva",
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
      day: "Sábado",
      dayShort: "Sáb",
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
          notes: "Criar Story com a funcionalidade de Poll do Instagram.\nOpções:\nA) Faço tudo pelos outros\nB) Tenho medo de mudar\nC) Não sei quem sou\nD) Controlo tudo\n\nDepois do resultado, publicar segundo Story com:\n\"Cada resposta corresponde a um véu.\nDescobre o teu: seteveus.space/recursos/teste\"",
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
      theme: "Preparação + conteúdo extra",
      slots: [
        {
          platform: "instagram",
          type: "Story (bastidores)",
          visual: {
            bg: "#ebe7df", text: "#3d3630", accent: "#c9b896", format: "vertical",
            title: "A escrever\no próximo espelho.",
            body: "O Espelho do Medo\nchega em Março.",
            footer: "~ Vivianne",
          },
          notes: "Story informal: foto do espaço de escrita, computador, caderno, chá.\nTexto overlay: \"A escrever o próximo espelho. O Medo chega em Março.\"\nSticker: countdown para Março 2026",
        },
        {
          platform: "ambos",
          type: "Planear semana 6",
          notes: "Rever métricas da semana. Anotar quais reels/carrosséis tiveram melhor performance. Preparar conteúdo da semana 6.",
        },
      ],
    },
  ],
};

// ─── SEMANA 6: PROFUNDIDADE + TESTEMUNHOS + CAMPANHA NON ─────────────────────

const week6: WeekPlan = {
  weekNumber: 6,
  title: "Profundidade + Testemunhos + Nó da Herança",
  subtitle: "Conteúdo emocional profundo com provas sociais e campanha do Nó",
  days: [
    {
      day: "Segunda-feira",
      dayShort: "Seg",
      theme: "Reel — A história de Sara (teaser)",
      slots: [
        {
          platform: "instagram",
          type: "Reel (texto animado 20s)",
          visual: {
            bg: "#ebe7df", text: "#3d3630", accent: "#c9b896", format: "vertical",
            title: "Sara acordou\nnuma manhã igual\na todas as outras.",
            body: "Mas desta vez\nperguntou.",
            footer: "O Espelho da Ilusão",
          },
          notes: "ROTEIRO DO REEL (texto animado sobre fundo):\n\nFundo: Cores quentes, #ebe7df ou gradiente suave\n\n(0-3s) \"Sara acordou numa manhã igual a todas as outras.\"\n(3-6s) \"Fez café. Vestiu-se. Saiu.\"\n(6-9s) \"Mas desta vez...\"\n(9-12s) \"...perguntou.\"\n(12-15s) Pausa. Ecrã quase vazio.\n(15-18s) \"Quando foi que escolhi esta vida?\"\n(18-20s) Logo + \"O Espelho da Ilusão\" + seteveus.space\n\nMÚSICA: Piano suave, algo melancólico mas esperançoso\nFONTE: Serif elegante, letras grandes centralizadas\nTRANSIÇÕES: Fade lento, cada frase aparece sozinha",
          caption: "Sara acordou numa manhã igual a todas as outras. Mas desta vez, perguntou.\n\n\"Quando foi que escolhi esta vida?\"\n\nO Espelho da Ilusão. Uma experiência de leitura imersiva.\n\nseteveus.space/experiencias\n\n#OsSeteVeus #EspelhoDaIlusão #Reel #FicçãoPsicológica #Sara",
        },
        {
          platform: "whatsapp",
          type: "Status",
          visual: {
            bg: "#ebe7df", text: "#3d3630", accent: "#c9b896", format: "vertical",
            title: "Sara acordou\ne perguntou.",
            body: "Novo reel no Instagram.\nUma história que muda tudo.",
            footer: "@os7veus",
          },
        },
      ],
    },
    {
      day: "Terça-feira",
      dayShort: "Ter",
      theme: "Carrossel — Espelhos vs Nós (explicar as duas colecções)",
      slots: [
        {
          platform: "instagram",
          type: "Carrossel (6 slides)",
          visual: {
            bg: "#f7f5f0", text: "#3d3630", accent: "#c9b896", format: "square",
            title: "Espelhos e Nós.\nDuas colecções.\nUma jornada.",
            body: "",
            footer: "Swipe ~",
          },
          notes: "SLIDES DO CARROSSEL:\n\nSlide 1 (capa): Fundo #f7f5f0\n\"Espelhos e Nós. Duas colecções. Uma jornada.\"\n\nSlide 2: Fundo #ebe7df\n\"Os Espelhos olham para dentro.\nSão 7 experiências de ficção.\nCada uma revela um véu.\nLês. Respiras. Escreves. E vês-te.\"\nImagem: Print da página /experiências\n\nSlide 3: Fundo #f7f5f0\n\"Os Nós olham para a relação.\nO que acontece entre duas pessoas\nquando o véu cai.\"\nImagem: Print da página /colecção-nos\n\nSlide 4: Fundo #ebe7df\n\"O Nó só se desbloqueia\não completar o Espelho.\nNão é upsell.\nÉ continuação emocional.\"\n\nSlide 5: Fundo #f7f5f0\nTabela visual:\n\"Espelho da Ilusão → Nó da Herança\n(Sara sozinha) → (Sara + Helena, mãe)\nO despertar → O silêncio herdado\"\n\nSlide 6 (CTA): Fundo #3d3630, texto #c9b896\n\"Começa pelo Espelho.\nO Nó espera por ti.\nseteveus.space/experiencias\"",
          caption: "Os Espelhos olham para dentro. Os Nós olham para a relação.\n\nDuas colecções. Uma jornada.\n\nO Nó da Herança é a história de Sara e Helena — mãe e filha. Só se desbloqueia ao completar o Espelho da Ilusão.\n\nseteveus.space/experiencias\n\n#OsSeteVeus #Espelhos #Nos #ColecçãoCompleta #Autoconhecimento",
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
            title: "\"Chorei no capítulo 5.\nNão de tristeza.\nDe reconhecimento.\"",
            body: "",
            footer: "Ana M., Maputo",
          },
          notes: "DESIGN: Fundo texturizado cor creme. Citação centrada em fonte serif grande. Nome e cidade em fonte menor abaixo. Logo discreto no canto inferior direito.\n\nSe não tiver testemunho real, usar variação do existente ou pedir a leitoras.",
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
      theme: "Reel — Nó da Herança (mãe e filha)",
      slots: [
        {
          platform: "instagram",
          type: "Reel (texto emocional 20s)",
          visual: {
            bg: "#c9b896", text: "#3d3630", accent: "#f7f5f0", format: "vertical",
            title: "A mãe sempre viu.\nEsperou anos.",
            body: "Agora que Sara acordou,\nHelena tem algo\npara lhe dizer.",
            footer: "O Nó da Herança",
          },
          notes: "ROTEIRO DO REEL:\n\n(0-3s) Fundo quente, dourado. \"A mãe sempre viu.\"\n(3-6s) \"Esperou anos.\"\n(6-9s) Pausa dramática. Ecrã quase vazio.\n(9-12s) \"Agora que Sara acordou...\"\n(12-16s) \"...Helena tem algo para lhe dizer.\"\n(16-18s) \"O Nó da Herança.\"\n(18-20s) \"A continuação emocional do Espelho da Ilusão.\"\n+ seteveus.space/colecção-nos\n\nMÚSICA: Algo emocional mas contido. Violino suave ou piano.\nFONTE: Serif grande, centralizadas",
          caption: "A mãe sempre viu. Esperou anos.\n\nO Nó da Herança é a história de Sara e Helena — mãe e filha — e o silêncio herdado entre elas.\n\nSó se desbloqueia ao completar o Espelho da Ilusão.\n\nseteveus.space/colecção-nos\n\n#OsSeteVeus #NoDaHerança #Reel #MãeEFilha",
        },
      ],
    },
    {
      day: "Sexta-feira",
      dayShort: "Sex",
      theme: "Carrossel — Preços e packs",
      slots: [
        {
          platform: "instagram",
          type: "Carrossel (5 slides)",
          visual: {
            bg: "#3d3630", text: "#f7f5f0", accent: "#c9b896", format: "square",
            title: "Quanto custa\nescolher-te?",
            body: "",
            footer: "Swipe para ver preços ~",
          },
          notes: "SLIDES DO CARROSSEL:\n\nSlide 1 (capa): Fundo escuro #3d3630, texto dourado #c9b896\n\"Quanto custa escolher-te?\"\n\nSlide 2: Fundo #f7f5f0\n\"Espelho da Ilusão\n$29 USD / 1.885 MZN / R$119 / 27EUR\nAcesso vitalício\n7 capítulos + respiração + diário + espelho pessoal\"\n\nSlide 3: Fundo #ebe7df\n\"Nó da Herança\n$12 USD / 780 MZN / R$49 / 11EUR\nSó desbloqueia ao completar o Espelho\nA continuação emocional\"\n\nSlide 4: Fundo #f7f5f0\n\"Pack 3 Espelhos: $69 (18% desconto)\n→ 3 Nós incluídos!\n\nJornada Completa: $149 (27% desconto)\n→ Todos os Nós incluídos!\"\n\nSlide 5 (CTA): Fundo #3d3630, texto #c9b896\n\"Começa pelo teste gratuito.\nOu pelo Espelho da Ilusão.\nPayPal, M-Pesa ou Millenium BIM.\nseteveus.space/comprar\"",
          caption: "Quanto custa escolher-te?\n\nEspelho da Ilusão: $29 USD (1.885 MZN)\nNó da Herança: $12 USD (780 MZN)\nPack 3 Espelhos: $69 (Nós incluídos!)\nJornada Completa: $149\n\nAcesso vitalício. Sem subscrições.\nPayPal, M-Pesa ou Millenium BIM.\n\nseteveus.space/comprar\n\n#OsSeteVeus #Preços #Autoconhecimento",
        },
        {
          platform: "whatsapp",
          type: "Status + Broadcast",
          visual: {
            bg: "#3d3630", text: "#c9b896", accent: "#f7f5f0", format: "vertical",
            title: "Espelho da Ilusão\n$29 USD\n1.885 MZN",
            body: "Acesso vitalício.\nSem subscrições.",
            footer: "seteveus.space/comprar",
          },
          broadcast: "Sabes quanto custa escolher-te?\n\nEspelho da Ilusão: $29 USD (1.885 MZN)\nNó da Herança: $12 USD (780 MZN)\n\nAcesso vitalício. Sem subscrições.\nPayPal, M-Pesa ou Millenium BIM.\n\nComeça por aqui:\nseteveus.space/comprar\n\n~ Vivianne",
        },
      ],
    },
    {
      day: "Sábado",
      dayShort: "Sáb",
      theme: "Story bastidores + engagement",
      slots: [
        {
          platform: "instagram",
          type: "Story (3 frames)",
          visual: {
            bg: "#f7f5f0", text: "#3d3630", accent: "#c9b896", format: "vertical",
            title: "Sabias que\na comunidade Ecos\né completamente\nanónima?",
            body: "Quatro salas. Tudo impermanente.\nIncluída com qualquer experiência.",
            footer: "seteveus.space/comunidade",
          },
          notes: "Story 1: \"Sabias que a comunidade Ecos é completamente anónima?\"\nStory 2: Print de seteveus.space/comunidade\nStory 3: \"Incluída com qualquer experiência de leitura. seteveus.space\"",
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
      theme: "Reflexão + preparação",
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
          notes: "Rever métricas. Preparar conteúdo da campanha Medo. Gravar reels se possível.",
        },
      ],
    },
  ],
};

// ─── SEMANA 7: CAMPANHA ESPELHO DO MEDO (LANCAMENTO MARCO) ──────────────────

const week7: WeekPlan = {
  weekNumber: 7,
  title: "Campanha: Espelho do Medo (Março 2026)",
  subtitle: "Lançamento do segundo espelho com campanha visual forte",
  days: [
    {
      day: "Segunda-feira",
      dayShort: "Seg",
      theme: "Reel — Teaser do Medo",
      slots: [
        {
          platform: "instagram",
          type: "Reel (teaser cinemático 15s)",
          visual: {
            bg: "#8b9b8e", text: "#f7f5f0", accent: "#ebe7df", format: "vertical",
            title: "Sabes o que queres.\nMas o medo\ndecide antes de ti.",
            body: "",
            footer: "O Espelho do Medo ~ Março 2026",
            highlight: "Em breve",
          },
          notes: "ROTEIRO DO REEL:\n\n(0-3s) Ecrã escuro. Texto branco aparece: \"Sabes o que queres.\"\n(3-5s) \"Mas o medo...\"\n(5-8s) \"...decide antes de ti.\"\n(8-10s) Pausa. Cor muda para #8b9b8e (verde-acinzentado do véu do Medo)\n(10-13s) \"O Espelho do Medo.\"\n(13-15s) \"Março 2026. seteveus.space\"\n\nMÚSICA: Tensão subtil que resolve em calma\nEFEITO: Texto aparece com glitch suave ou typewriter",
          caption: "Sabes o que queres. Mas o medo decide antes de ti.\n\nO Espelho do Medo. O segundo espelho da colecção.\nMarço 2026.\n\nseteveus.space/experiencias\n\n#OsSeteVeus #EspelhoDoMedo #EmBreve #Marco2026 #Reel",
        },
        {
          platform: "whatsapp",
          type: "Status + Broadcast",
          visual: {
            bg: "#8b9b8e", text: "#f7f5f0", accent: "#ebe7df", format: "vertical",
            title: "O segundo espelho\nestá quase a chegar.",
            body: "O Espelho do Medo.\nMarço 2026.",
            footer: "seteveus.space",
          },
          broadcast: "Tenho uma novidade para ti.\n\nO segundo espelho está quase pronto.\n\nO Espelho do Medo chega em Março de 2026. A história de quem sabe o que quer mas deixa o medo decidir por si.\n\nSe quiseres ser das primeiras a ler:\nseteveus.space/experiencias\n\n~ Vivianne",
        },
      ],
    },
    {
      day: "Terça-feira",
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
          notes: "SLIDES DO CARROSSEL (um véu por slide):\n\nSlide 1 (capa): Fundo #f7f5f0\n\"Os 7 Véus do Despertar. Qual é o teu?\"\n\nSlide 2: Fundo #c9b896 (dourado)\n\"1. Ilusão\nA vida que tens foi escolhida por ti?\nEspelho da Ilusão — Disponível agora\"\n\nSlide 3: Fundo #8b9b8e (verde-cinza)\n\"2. Medo\nSabes o que queres mas o medo decide.\nEspelho do Medo — Março 2026\"\n\nSlide 4: Fundo #b39b7d (terra)\n\"3. Culpa\nA culpa que te prende a escolhas que não são tuas.\nEspelho da Culpa — Abril 2026\"\n\nSlide 5: Fundo #a09088 (rosa-terra)\n\"4. Identidade\nQuem és tu sem a máscara?\nEspelho da Identidade — Maio 2026\"\n\nSlide 6: Fundo #7a8c6e (verde-musgo)\n\"5. Controlo\nO controlo que isola quem mais amas.\nEspelho do Controlo — Junho 2026\"\n\nSlide 7: Fundo #b08d8d (rosa-antigo)\n\"6. Desejo\nO desejo que esvazia em vez de preencher.\nEspelho do Desejo — Julho 2026\"\n\nSlide 8: Fundo #8c9bab (azul-acinzentado)\n\"7. Separação\nA separação que reinventa o lar.\nEspelho da Separação — Agosto 2026\"\n\nSlide 9 (CTA): Fundo #3d3630, texto #c9b896\n\"Descobre qual véu te esconde.\nTeste gratuito: seteveus.space/recursos/teste\"",
          caption: "Os 7 Véus do Despertar:\n\n1. Ilusão — Disponível agora\n2. Medo — Março 2026\n3. Culpa — Abril 2026\n4. Identidade — Maio 2026\n5. Controlo — Junho 2026\n6. Desejo — Julho 2026\n7. Separação — Agosto 2026\n\nQual é o teu? Descobre:\nseteveus.space/recursos/teste\n\n#OsSeteVeus #7Veus #Autoconhecimento #Carrossel",
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
            title: "O primeiro passo\nnão precisa\nde ser grande.\n\nPrecisa apenas\nde ser teu.",
            body: "",
            footer: "O Espelho do Medo ~ seteveus.space",
          },
          caption: "\"O primeiro passo não precisa de ser grande. Precisa apenas de ser teu.\"\n\n-- O Espelho do Medo (Março 2026)\n\nseteveus.space/experiencias\n\n#OsSeteVeus #EspelhoDoMedo #Citação #Medo #Coragem",
        },
        {
          platform: "whatsapp",
          type: "Status",
          visual: {
            bg: "#8b9b8e", text: "#f7f5f0", accent: "#ebe7df", format: "vertical",
            title: "O primeiro passo\nnão precisa\nde ser grande.",
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
          notes: "ROTEIRO DO REEL:\n\n(0-5s) Split screen ou transição:\nLADO ESQUERDO / ANTES: Texto cinza sobre fundo claro\n\"Antes de ler o Espelho da Ilusão:\"\n\"Está tudo bem comigo.\"\n\n(5-10s) Transição dramática (zoom ou glitch)\n\n(10-15s) LADO DIREITO / DEPOIS: Texto dourado sobre fundo escuro\n\"Depois de ler:\"\n\"Estava tudo a fingir.\"\n\n(15-20s) Logo + \"O Espelho da Ilusão. Uma experiência que muda a forma como te vês.\"\nseteveus.space\n\nMÚSICA: Transição de algo casual para algo profundo\nEFEITO: Mudança de cor/humor dramática",
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
            body: "Livro físico: Os 7 Véus do Despertar\n232 páginas — $23 USD\n\nPlataforma digital: Espelho da Ilusão\n7 capítulos imersivos — $29 USD\n\nLeitores do livro físico\ntem acesso digital gratuito.",
            footer: "seteveus.space/comprar",
            highlight: "Físico + Digital",
          },
          notes: "DESIGN: Composição com foto do livro físico ao lado de print do telemóvel com a plataforma. Se não tiver foto profissional, usar mockup.\n\nFOTO NECESSÁRIA: Livro físico numa mesa bonita (ou mockup)",
          caption: "Dois caminhos. A mesma jornada.\n\nLivro físico: Os 7 Véus do Despertar (232 páginas, $23 USD)\nPlataforma digital: Espelho da Ilusão (7 capítulos imersivos, $29 USD)\n\nLeitores do livro físico tem acesso digital gratuito.\n\nseteveus.space/comprar\n\n#OsSeteVeus #LivroFísico #PlataformaDigital #Autoconhecimento",
        },
        {
          platform: "whatsapp",
          type: "Broadcast",
          broadcast: "Sabias que se tens o livro físico Os 7 Véus do Despertar, tens acesso gratuito a plataforma digital?\n\nRegistar: seteveus.space/pedir-código\n\n~ Vivianne",
        },
      ],
    },
    {
      day: "Sábado",
      dayShort: "Sáb",
      theme: "Story interactivo + engagement",
      slots: [
        {
          platform: "instagram",
          type: "Story (quiz interactivo)",
          visual: {
            bg: "#3d3630", text: "#f7f5f0", accent: "#c9b896", format: "vertical",
            title: "Quiz rápido:",
            body: "O que te impede mais\nde ser quem realmente és?",
            footer: "Responde",
          },
          notes: "Story com sticker de Quiz:\n\"O que te impede mais?\"\nA) O medo do que vão pensar\nB) A culpa de querer mais\nC) Não saber quem sou\nD) O hábito de controlar tudo\n\nSegundo story: \"Cada resposta é um véu. Descobre o teu: seteveus.space/recursos/teste\"",
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
      theme: "Conteúdo leve + preparação",
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
          notes: "Rever métricas. Identificar top posts. Preparar conteúdo da semana 8.",
        },
      ],
    },
  ],
};

// ─── SEMANA 8: CONSOLIDACAO + CRESCIMENTO ─────────────────────────────────────

const week8: WeekPlan = {
  weekNumber: 8,
  title: "Consolidação + Crescimento orgânico",
  subtitle: "Reciclar melhores conteúdos + novos formatos para crescer",
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
            title: "E se tudo o que\nacreditas sobre ti\nfoi escolhido\npor outra pessoa?",
            body: "",
            footer: "seteveus.space",
          },
          notes: "ROTEIRO DO REEL:\n\n(0-5s) Fundo claro. Pergunta aparece palavra a palavra:\n\"E se tudo o que acreditas sobre ti...\"\n(5-8s) \"...foi escolhido por outra pessoa?\"\n(8-12s) Pausa. Depois: \"Há 7 véus entre ti e a verdade.\"\n(12-15s) Logo + seteveus.space/recursos/teste\n\nMÚSICA: Algo que cresce em intensidade\nEFEITO: Texto em typewriter ou kinetic typography",
          caption: "E se tudo o que acreditas sobre ti foi escolhido por outra pessoa?\n\nHá 7 véus entre ti e a verdade.\n\nDescobre qual te esconde:\nseteveus.space/recursos/teste\n\n#OsSeteVeus #Reel #Pergunta #Autoconhecimento #Despertar",
        },
        {
          platform: "whatsapp",
          type: "Status",
          visual: {
            bg: "#f7f5f0", text: "#3d3630", accent: "#c9b896", format: "vertical",
            title: "E se tudo o que\nacreditas sobre ti\nfoi escolhido\npor outra pessoa?",
            body: "Há 7 véus entre ti\ne a verdade.",
            footer: "seteveus.space/recursos/teste",
          },
        },
      ],
    },
    {
      day: "Terça-feira",
      dayShort: "Ter",
      theme: "Carrossel — 5 coisas que ninguém te diz sobre autoconhecimento",
      slots: [
        {
          platform: "instagram",
          type: "Carrossel (7 slides)",
          visual: {
            bg: "#3d3630", text: "#f7f5f0", accent: "#c9b896", format: "square",
            title: "5 coisas que ninguém\nte diz sobre\nautoconhecimento",
            body: "",
            footer: "Swipe ~",
          },
          notes: "SLIDES DO CARROSSEL:\n\nSlide 1 (capa): Fundo #3d3630, texto #c9b896\n\"5 coisas que ninguém te diz sobre autoconhecimento\"\n\nSlide 2: Fundo #f7f5f0\n\"1. Não é um destino. É um processo que nunca acaba.\"\n\nSlide 3: Fundo #ebe7df\n\"2. Vai doer. E isso é sinal de que está a funcionar.\"\n\nSlide 4: Fundo #f7f5f0\n\"3. Não precisas de um retiro de 10 dias. Precisas de 10 minutos honestos.\"\n\nSlide 5: Fundo #ebe7df\n\"4. O que descobres sobre ti pode assustar-te. E está tudo bem.\"\n\nSlide 6: Fundo #f7f5f0\n\"5. A maioria das pessoas desiste no momento em que finalmente ia mudar.\"\n\nSlide 7 (CTA): Fundo #3d3630, texto #c9b896\n\"Não desistas de ti.\nComeça aqui: seteveus.space/recursos/teste\"",
          caption: "5 coisas que ninguém te diz sobre autoconhecimento:\n\n1. Não é um destino\n2. Vai doer\n3. 10 minutos honestos bastam\n4. Pode assustar-te\n5. A maioria desiste antes de mudar\n\nNão desistas de ti.\nseteveus.space/recursos/teste\n\n#OsSeteVeus #Autoconhecimento #Carrossel #DesenvolvimentoPessoal",
        },
        {
          platform: "whatsapp",
          type: "Broadcast",
          broadcast: "Novo post no Instagram: 5 coisas que ninguém te diz sobre autoconhecimento.\n\nA número 5 é a mais importante.\n\nVê: instagram.com/os7veus\n\nOu faz o teste gratuito:\nseteveus.space/recursos/teste\n\n~ Vivianne",
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
            title: "O véu não cai.\nTu é que\ndecides tirá-lo.",
            body: "",
            footer: "Os Sete Véus ~ seteveus.space",
          },
          caption: "\"O véu não cai. Tu é que decides tirá-lo.\"\n\nseteveus.space\n\n#OsSeteVeus #Citação #Despertar #Coragem #Autoconhecimento",
        },
        {
          platform: "whatsapp",
          type: "Status",
          visual: {
            bg: "#3d3630", text: "#c9b896", accent: "#f7f5f0", format: "vertical",
            title: "O véu não cai.\nTu é que\ndecides tirá-lo.",
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
            body: "Ecos. Maré. Círculo. Fogueira.\nTudo anónimo.\nTudo impermanente.",
            footer: "Comunidade Ecos",
          },
          notes: "ROTEIRO DO REEL (screen recording):\n\n(0-3s) Texto: \"Há um espaço onde as vozes se encontram.\"\n(3-8s) Screen recording: abrir seteveus.space/comunidade no telemóvel\n(8-12s) Mostrar as 4 salas: Ecos, Maré, Círculo, Fogueira\n(12-16s) Clicar numa sala, mostrar os posts anónimos\n(16-18s) Texto overlay: \"Tudo anónimo. Tudo impermanente.\"\n(18-20s) \"Incluída com qualquer experiência.\" + seteveus.space\n\nPRINTS/GRAVAÇÃO NECESSÁRIA:\n- Screen recording de seteveus.space/comunidade no telemóvel\n- Mostrar navegação entre salas",
          caption: "Onde as vozes se encontram.\n\nA comunidade Ecos: 4 salas, tudo anónimo, tudo impermanente.\n\nIncluída com qualquer experiência de leitura.\n\nseteveus.space/comunidade\n\n#OsSeteVeus #ComunidadeEcos #Reel #Anonimato",
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
          notes: "SLIDES DO CARROSSEL:\n\nSlide 1 (capa): \"Perguntas que nos fazem sempre\"\n\nSlide 2: \"É um livro?\"\n\"Não. É uma experiência de leitura imersiva com ficção, respiração guiada, diário e espelho pessoal.\"\n\nSlide 3: \"Preciso ler por ordem?\"\n\"Sim. Os capítulos desbloqueiam sequencialmente. Cada um prepara o próximo.\"\n\nSlide 4: \"Como pago em Moçambique?\"\n\"M-Pesa ou Millenium BIM. Envias o comprovativo e confirmamos em 24h.\"\n\nSlide 5: \"Tenho o livro físico. Tenho acesso?\"\n\"Sim! Regista em seteveus.space/pedir-código e recebe o código.\"\n\nSlide 6 (CTA): Fundo #3d3630\n\"Mais perguntas? Fala connosco no chatbot da plataforma.\nseteveus.space\"",
          caption: "As perguntas que nos fazem sempre:\n\nÉ um livro? Não, é uma experiência.\nPreciso ler por ordem? Sim.\nComo pago em Moçambique? M-Pesa ou BIM.\nTenho o livro físico, tenho acesso? Sim!\n\nMais perguntas? seteveus.space\n\n#OsSeteVeus #FAQ #Perguntas #Autoconhecimento",
        },
        {
          platform: "whatsapp",
          type: "Status",
          visual: {
            bg: "#ebe7df", text: "#3d3630", accent: "#c9b896", format: "vertical",
            title: "Tens dúvidas\nsobre a plataforma?",
            body: "Ve o novo post\nno Instagram\ncom respostas\nàs perguntas mais comuns.",
            footer: "@os7veus",
          },
        },
      ],
    },
    {
      day: "Sábado",
      dayShort: "Sáb",
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
          notes: "Dia de engagement profundo. Responder todas as DMs, comentários e perguntas. Comentar em posts de seguidoras.",
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
            title: "Há um espaço\nonde podes\nser quem és.\n\nSem pressa.\nSem máscara.\nSem julgamento.",
            body: "",
            footer: "Os Sete Véus ~ seteveus.space",
          },
          caption: "Há um espaço onde podes ser quem és.\n\nSem pressa. Sem máscara. Sem julgamento.\n\nseteveus.space\n\n#OsSeteVeus #EspaçoSeguro #Autoconhecimento #Domingo",
        },
        {
          platform: "ambos",
          type: "Planear próximo ciclo",
          notes: "Rever todas as métricas das 8 semanas.\nIdentificar top 5 posts por engagement.\nReciclar conteúdos que funcionaram com variações.\nPreparar conteúdo para lançamento do Espelho do Medo.",
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
      day: "Terça-feira",
      dayShort: "Ter",
      theme: "Anúncio principal",
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
          caption: "O livro que tens nas mãos agora tem uma dimensão digital.\n\nSe já compraste \"Os 7 Véus do Despertar\", tens direito a acesso gratuito à experiência digital — leitura interactiva, diário reflexivo e comunidade.\n\nLink na bio para pedires o teu código.\n\n#OsSeteVeus #AcessoDigital #LivroFísico #Autoconhecimento",
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
            { bg: "#f7f5f0", text: "#3d3630", accent: "#c9b896", title: "Recebes o código\nem até 24h.", body: "No teu email.\nPessoal. Intransmissível.", footer: "" },
            { bg: "#7a8c6e", text: "#f7f5f0", accent: "#ebe7df", title: "O que ganhas:", body: "Leitura interactiva\nDiário reflexivo\nRespiração guiada\nComunidade anónima\nChatbot de apoio 24/7", footer: "seteveus.space/pedir-código" },
          ],
          caption: "5 passos simples. Se já tens o livro físico, o acesso digital é teu por direito.\n\n1. Compraste o livro? Tens direito ao acesso digital gratuito.\n2. Preenche o formulário (2 minutos).\n3. Recebes o código em até 24h.\n4. O que ganhas: leitura interactiva, diário reflexivo, comunidade.\n\nLink na bio.\n\n#OsSeteVeus #AcessoDigital #LivroFísico #Autoconhecimento",
        },
      ],
    },
    {
      day: "Quinta-feira",
      dayShort: "Qui",
      theme: "Tom íntimo — WhatsApp",
      slots: [
        {
          platform: "whatsapp",
          type: "Broadcast (tom pessoal)",
          broadcast: "Uma coisa que talvez não saibas:\n\nO livro físico \"Os 7 Véus do Despertar\" tem uma extensão digital.\n\nNão é uma cópia — é uma experiência diferente. Podes escrever reflexões à medida que lês, guardar pensamentos por capítulo, e participar numa comunidade anónima de leitoras que também estão a atravessar os véus.\n\nSe tens o livro, pede o teu código: seteveus.space/pedir-código\n\nÉ gratuito. É pessoal. É teu.\n\n— Vivianne",
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
          notes: "Conceito visual: foto do livro físico lado a lado com ecrã do telemóvel mostrando a versão digital.\nSe não tiveres foto profissional, usa o Gerador Livre com o print 'livro físico' como fundo.",
        },
      ],
    },
    {
      day: "Sábado",
      dayShort: "Sáb",
      theme: "Último lembrete da semana",
      slots: [
        {
          platform: "whatsapp",
          type: "Broadcast (lembrete final)",
          broadcast: "Antes do fim de semana:\n\nSe compraste \"Os 7 Véus do Despertar\" e ainda não pediste o teu código digital — este é o momento.\n\nSó precisas de nome, email e (se quiseres) uma foto do livro.\n\nseteveus.space/pedir-código\n\nBom fim de semana. Que o silêncio te encontre.\n\n— Vivianne",
        },
        {
          platform: "instagram",
          type: "Story",
          visual: {
            bg: "#3d3630", text: "#f7f5f0", accent: "#c9b896", format: "vertical",
            title: "Último lembrete\ndesta semana.",
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
          notes: "Responder a todas as mensagens recebidas durante a semana.\nSe alguém perguntou como pedir o código, enviar link directo: seteveus.space/pedir-código\nSe alguém enviou comprovativo, aprovar o código no painel admin.",
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
      { bg: "#3d3630", text: "#f7f5f0", accent: "#7a8c6e", title: "Na plataforma digital,\nnão é só ler.", body: "Lês. Respiras.\nReflectes. Escreves.\n\nCada capítulo tem pausas\nde respiração guiada\ne um diário pessoal.", footer: "" },
      { bg: "#f7f5f0", text: "#3d3630", accent: "#c9b896", title: "Os 7 Véus:", body: "1. Permanência — a crença num eu fixo\n2. Memória — as histórias do passado\n3. Turbilhão — a identificação com pensamentos\n4. Esforço — a busca incessante\n5. Desolação — o medo do vazio\n6. Horizonte — a ilusão dos finais\n7. Dualidade — a separação eu/mundo", footer: "" },
      { bg: "#7a8c6e", text: "#f7f5f0", accent: "#ebe7df", title: "Já tens o livro físico?\nO acesso digital\né gratuito.", body: "Pede o teu código\nem menos de 2 minutos.", footer: "seteveus.space/pedir-codigo" },
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
      { bg: "#3d3630", text: "#f7f5f0", accent: "#c9b896", title: "\"Via, mas não sentia.\nRegistava, mas não\nparticipava.\"", body: "Como quem assiste\na um espectáculo\npor trás de uma\njanela fechada.", footer: "" },
      { bg: "#ebe7df", text: "#3d3630", accent: "#c9b896", title: "\"Não era que não\ntivesse opinião.\nEra que a sua primeira\nreacção nunca era\no que verdadeiramente\npensava.\"", body: "", footer: "" },
      { bg: "#3d3630", text: "#f7f5f0", accent: "#c9b896", title: "\"Perguntar,\nmesmo tarde,\né o primeiro gesto\nde se escolher.\"", body: "", footer: "seteveus.space", bgImage: "/images/mandala-7veus.png" },
    ],
    caption: "5 frases d'O Espelho da Ilusão que mudam a forma como te vês.\n\nGuarda esta publicação. Volta quando precisares.\n\nseteveus.space/comprar/espelhos\n\n#OsSeteVeus #EspelhoDaIlusão #CitaçõesLiterarias #FicçãoPsicológica #Autoconhecimento",
    canvaSpecs: {
      dimensions: "1080x1080px (quadrado)",
      fonts: "Citações: Playfair Display Italic / Fonte: Inter Light",
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
      { bg: "#3d3630", text: "#f7f5f0", accent: "#c9b896", title: "Com o acesso digital:", body: "Lês cada véu\nem 3 níveis de profundidade.\nEscreves no teu diário.\nPráticas guiadas.\nComunidade anónima.", footer: "" },
      { bg: "#f7f5f0", text: "#3d3630", accent: "#7a8c6e", title: "3 níveis de leitura:", body: "Semente — guia acessível\nRaiz — notas filosóficas\nÁrvore — texto original, puro", footer: "" },
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
      { bg: "#f7f5f0", text: "#3d3630", accent: "#7a8c6e", title: "1. Leitura em\n3 níveis", body: "Cada véu pode ser lido\nem 3 profundidades:\nSemente, Raiz e Árvore.\n\nDo guia acessível\nao texto original, puro.", footer: "" },
      { bg: "#f7f5f0", text: "#3d3630", accent: "#c9b896", title: "2. Diário + Práticas", body: "Diário reflexivo pessoal.\nPráticas guiadas por véu.\nRespiração entre capítulos.\n\nNão é só ler —\né viver o que leste.", footer: "" },
      { bg: "#f7f5f0", text: "#3d3630", accent: "#c9b896", title: "3. Comunidade anónima", body: "Ecos: um espaço onde\nas vozes se encontram.\nReflexões partilhadas.\nTudo impermanente.", footer: "" },
      { bg: "#c9b896", text: "#3d3630", accent: "#f7f5f0", title: "Gratuito.\nSem compromisso.", body: "Pede o teu código\nem menos de 2 minutos.", footer: "seteveus.space/pedir-codigo" },
    ],
    caption: "Tens o livro físico Os 7 Véus do Despertar?\n\nO teu livro abre portas que ainda não conheces:\n\n— Leitura em 3 níveis (Semente, Raiz, Árvore)\n— Diário reflexivo pessoal\n— Práticas guiadas e respiração entre capítulos\n— Comunidade anónima (Ecos)\n\nTudo gratuito. Sem compromisso.\nPede o teu código em menos de 2 minutos:\nseteveus.space/pedir-codigo\n\n#OsSeteVeus #LivroFísico #AcessoDigital #PedeOTeuCodigo #Autoconhecimento",
    canvaSpecs: {
      dimensions: "1080x1080px (quadrado)",
      fonts: "Título: Playfair Display / Corpo: Inter",
      colorPalette: ["#ebe7df", "#3d3630", "#c9b896", "#7a8c6e", "#f7f5f0"],
    },
  },
  {
    id: "carousel-7-véus-resumo",
    title: "Os 7 Véus — um por um",
    description: "Carrossel educativo. Cada slide apresenta um véu com frase-chave. Altamente guardável.",
    slides: [
      { bg: "#3d3630", text: "#c9b896", accent: "#f7f5f0", title: "Os 7 Véus\nque te escondem\nde ti mesma.", body: "", footer: "Guarda esta publicação.", bgImage: "/images/mandala-7veus.png" },
      { bg: "#c9b896", text: "#3d3630", accent: "#f7f5f0", title: "1. Ilusão", body: "A vida que construíste\nsem perguntar\nse era a que querias.", footer: "" },
      { bg: "#8b9b8e", text: "#f7f5f0", accent: "#ebe7df", title: "2. Medo", body: "Sabes o que queres.\nMas o medo\ndecide antes de ti.", footer: "" },
      { bg: "#c97070", text: "#f7f5f0", accent: "#ebe7df", title: "3. Culpa", body: "Castigas-te\npor quereres mais.\nComo se merecesses\nmenos.", footer: "" },
      { bg: "#7a7a9e", text: "#f7f5f0", accent: "#ebe7df", title: "4. Identidade", body: "Usas uma máscara\nhá tanto tempo\nque esqueceste\no rosto.", footer: "" },
      { bg: "#5a7a8a", text: "#f7f5f0", accent: "#ebe7df", title: "5. Controlo", body: "Seguras tudo.\nControlas tudo.\nE perdes tudo\no que não se deixa\nprender.", footer: "" },
      { bg: "#8a6a7a", text: "#f7f5f0", accent: "#ebe7df", title: "6. Desejo", body: "Procuras fora\no que só existe\ndentro.", footer: "" },
      { bg: "#6a6a6a", text: "#f7f5f0", accent: "#c9b896", title: "7. Separação", body: "Separas-te de ti\npara pertencer\não mundo.", footer: "" },
      { bg: "#3d3630", text: "#f7f5f0", accent: "#c9b896", title: "Qual véu\nte esconde?", body: "Descobre em 3 minutos.", footer: "seteveus.space/recursos/teste" },
    ],
    caption: "Os 7 véus que te escondem de ti mesma:\n\n1. Ilusão — a vida que não escolheste\n2. Medo — o que não fazes por medo\n3. Culpa — o castigo de quereres mais\n4. Identidade — a máscara que usas\n5. Controlo — o que seguras a mais\n6. Desejo — o que procuras fora\n7. Separação — o que te separa de ti\n\nQual véu te esconde? Descobre em 3 min:\nseteveus.space/recursos/teste\n\nGuarda esta publicação para voltares quando precisares.\n\n#OsSeteVeus #Os7Veus #Autoconhecimento #DesenvolvimentoPessoal #TransformaçãoPessoal",
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
      { bg: "#f7f5f0", text: "#3d3630", accent: "#7a8c6e", title: "1. Pede o teu código", body: "Se já tens o livro físico,\no acesso é gratuito.\n\nPreenche o formulário\nem seteveus.space/pedir-codigo\n\nRecebes o código em 24h.", footer: "" },
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
    description: "Testemunhos reais (anónimos) da comunidade. Social proof poderoso.",
    slides: [
      { bg: "#3d3630", text: "#c9b896", accent: "#f7f5f0", title: "O que dizem\nas leitoras.", body: "", footer: "Testemunhos reais. Nomes guardados." },
      { bg: "#f7f5f0", text: "#3d3630", accent: "#c9b896", title: "\"Sai do modo\nautomático.\nNão sei para onde vou\nmas pelo menos\nestou acordada.\"", body: "", footer: "~ leitora anónima, Véu 1" },
      { bg: "#3d3630", text: "#f7f5f0", accent: "#c9b896", title: "\"Chorei no banho.\nOutra vez.\nMas desta vez\nnão foi por tristeza.\nFoi por reconhecimento.\"", body: "", footer: "~ leitora anónima, Véu 1" },
      { bg: "#ebe7df", text: "#3d3630", accent: "#c9b896", title: "\"O meu marido\nperguntou: estás bem?\nE eu disse que sim.\nAutomaticamente.\"", body: "", footer: "~ leitora anónima, Véu 1" },
      { bg: "#f7f5f0", text: "#3d3630", accent: "#7a8c6e", title: "\"Este livro não te\ndá respostas.\nDá-te as perguntas\nque nunca fizeste.\"", body: "", footer: "~ leitora anónima" },
      { bg: "#3d3630", text: "#f7f5f0", accent: "#c9b896", title: "Reconheces-te?", body: "O Espelho da Ilusão\nestá disponível.\n\nDescobre qual véu\nte esconde.", footer: "seteveus.space/recursos/teste" },
    ],
    caption: "O que dizem as leitoras d'Os Sete Véus.\n\nTestemunhos reais. Nomes guardados.\n\n\"Sai do modo automático. Não sei para onde vou mas pelo menos estou acordada.\"\n\n\"Chorei no banho. Outra vez. Mas desta vez não foi por tristeza. Foi por reconhecimento.\"\n\nReconheces-te? Descobre qual véu te esconde:\nseteveus.space/recursos/teste\n\n#OsSeteVeus #TestemunhosReais #Autoconhecimento #FicçãoPsicológica",
    canvaSpecs: {
      dimensions: "1080x1080px (quadrado)",
      fonts: "Citações: Playfair Display Italic / Fonte: Inter Light",
      colorPalette: ["#3d3630", "#f7f5f0", "#c9b896", "#ebe7df"],
    },
  },
  {
    id: "carousel-mãe-filha",
    title: "Sara e Helena — O Nó da Herança",
    description: "Carrossel emocional sobre a relação mãe-filha. Para promover o Nó (readers que completaram o Espelho).",
    slides: [
      { bg: "#3d3630", text: "#c9b896", accent: "#f7f5f0", title: "Há coisas que\numa mãe nunca diz.", body: "", footer: "", bgImage: "/images/capa-no-heran\u00e7a2.png" },
      { bg: "#f7f5f0", text: "#3d3630", accent: "#c9b896", title: "Sara viu o véu.", body: "Percebeu que a vida\nque tinha não era\na que tinha escolhido.\n\nMas há um silêncio\nque vem de antes dela.", footer: "" },
      { bg: "#3d3630", text: "#f7f5f0", accent: "#c9b896", title: "Helena sabia.", body: "A mãe sempre soube.\nViu os mesmos sinais.\nCalou os mesmos medos.\nEsperou anos.", footer: "" },
      { bg: "#ebe7df", text: "#3d3630", accent: "#c9b896", title: "\"Agora que Sara\nacordou,\nHelena tem algo\npara lhe dizer.\"", body: "", footer: "" },
      { bg: "#3d3630", text: "#f7f5f0", accent: "#c9b896", title: "O Nó da Herança", body: "A segunda história.\nSó se desbloqueia\ndepois de completares\no Espelho da Ilusão.\n\nNão é um upsell.\nÉ uma continuação\nemocional.", footer: "seteveus.space" },
    ],
    caption: "Há coisas que uma mãe nunca diz.\n\nSara viu o véu. Percebeu que a vida que tinha não era a que tinha escolhido. Mas há um silêncio que vem de antes dela.\n\nHelena — a mãe — sempre soube. Viu os mesmos sinais. Calou os mesmos medos. Esperou anos.\n\nO Nó da Herança é a segunda história. Só se desbloqueia depois de completares o Espelho da Ilusão.\n\nNão é um upsell. É uma continuação emocional.\n\nseteveus.space\n\n#OsSeteVeus #NoDaHerança #MãeEFilha #FicçãoRelacional #Autoconhecimento",
    canvaSpecs: {
      dimensions: "1080x1080px (quadrado)",
      fonts: "Título: Playfair Display Italic / Corpo: Inter Light",
      colorPalette: ["#3d3630", "#f7f5f0", "#c9b896", "#ebe7df"],
    },
  },
  {
    id: "carousel-recursos-gratis",
    title: "5 recursos gratuitos para começar",
    description: "Carrossel de valor. Mostra todos os recursos grátis disponíveis (PDFs, teste, áudios).",
    slides: [
      { bg: "#7a8c6e", text: "#f7f5f0", accent: "#ebe7df", title: "5 recursos gratuitos\npara começar\na tua jornada.", body: "", footer: "Sem compromisso. Sem email.", bgImage: "/images/mandala-7veus.png" },
      { bg: "#f7f5f0", text: "#3d3630", accent: "#7a8c6e", title: "1. Teste:\nQual véu te esconde?", body: "3 minutos. 7 perguntas.\nDescobre o véu que mais\nte influencia agora.\n\nNão dá respostas —\ndá perguntas.", footer: "seteveus.space/recursos/teste" },
      { bg: "#3d3630", text: "#f7f5f0", accent: "#c9b896", title: "2. As 7 Perguntas\ndo Despertar", body: "Uma pergunta por véu.\nImprime. Cola no espelho.\nLê todos os dias.", footer: "PDF gratuito" },
      { bg: "#f7f5f0", text: "#3d3630", accent: "#7a8c6e", title: "3. Diário de 7 Dias", body: "Um exercício por dia.\nEscrito pela autora.\nPara quem quer começar\nsem saber por onde.", footer: "PDF gratuito" },
      { bg: "#3d3630", text: "#f7f5f0", accent: "#c9b896", title: "4. Checklist\ndo Despertar", body: "Uma lista visual\ndos sinais de cada véu.\n\nReconhece onde estás.\nVê até onde podes ir.", footer: "PDF gratuito" },
      { bg: "#ebe7df", text: "#3d3630", accent: "#7a8c6e", title: "5. Mini-guia:\nO que são os 7 Véus?", body: "16 páginas.\nExplicação simples.\nPara quem quer perceber\nantes de começar.", footer: "PDF gratuito" },
      { bg: "#7a8c6e", text: "#f7f5f0", accent: "#ebe7df", title: "Tudo em\nseteveus.space/recursos", body: "Gratuito.\nSem email obrigatório.\nSem compromisso.", footer: "seteveus.space/recursos" },
    ],
    caption: "5 recursos gratuitos para começar a tua jornada interior:\n\n1. Teste: Qual véu te esconde? (3 min)\n2. As 7 Perguntas do Despertar (PDF)\n3. Diário de 7 Dias (PDF)\n4. Checklist do Despertar (PDF)\n5. Mini-guia: O que são os 7 Véus? (PDF)\n\nTudo gratuito. Sem email. Sem compromisso.\n\nseteveus.space/recursos\n\nGuarda esta publicação para quando precisares.\n\n#OsSeteVeus #RecursosGratuitos #Autoconhecimento #DesenvolvimentoPessoal #PDFGrátis",
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
      { bg: "#3d3630", text: "#f7f5f0", accent: "#c9b896", title: "E se pudesses\npartilhar o que sentes\nsem ninguém\nsaber quem és?", body: "", footer: "" },
      { bg: "#f7f5f0", text: "#3d3630", accent: "#c9b896", title: "Comunidade Ecos", body: "Um espaço onde as vozes\nse encontram.\n\nAnónimo.\nImpermanente.\nReal.", footer: "" },
      { bg: "#3d3630", text: "#f7f5f0", accent: "#c9b896", title: "Ecos", body: "Reflexões partilhadas\nanónimamente.\n\nNinguém sabe quem escreveu.\nTodos se reconhecem.", footer: "Expiram em 30 dias." },
      { bg: "#ebe7df", text: "#3d3630", accent: "#7a8c6e", title: "Reconhecimentos", body: "Não há likes.\nHá \"reconheço-me\".\n\nUm toque silencioso\nque diz:\n\"Eu também.\"", footer: "" },
      { bg: "#3d3630", text: "#f7f5f0", accent: "#c9b896", title: "Sussurros", body: "Mensagens de uma só via.\nMax 100 caracteres.\nExpiram em 7 dias.\n\nUm sussurro.\nNão uma conversa.", footer: "" },
      { bg: "#f7f5f0", text: "#3d3630", accent: "#c9b896", title: "Sem nomes.\nSem fotos.\nSem histórico.", body: "Tudo desaparece.\nComo as folhas\nnuma corrente.", footer: "" },
      { bg: "#7a8c6e", text: "#f7f5f0", accent: "#ebe7df", title: "Entra na comunidade.", body: "Incluída com qualquer\nacesso à plataforma.", footer: "seteveus.space" },
    ],
    caption: "E se pudesses partilhar o que sentes sem ninguém saber quem és?\n\nComunidade Ecos:\n\n~ Ecos: reflexões anónimas (expiram em 30 dias)\n~ Reconhecimentos: não há likes, há \"reconheço-me\"\n~ Sussurros: mensagens de uma só via (expiram em 7 dias)\n\nSem nomes. Sem fotos. Sem histórico.\nTudo desaparece. Como as folhas numa corrente.\n\nIncluída com qualquer acesso à plataforma.\nseteveus.space\n\n#OsSeteVeus #ComunidadeEcos #Anonimato #ReflexãoColectiva #Autoconhecimento",
    canvaSpecs: {
      dimensions: "1080x1080px (quadrado)",
      fonts: "Título: Playfair Display / Corpo: Inter",
      colorPalette: ["#3d3630", "#f7f5f0", "#c9b896", "#7a8c6e", "#ebe7df"],
    },
  },
  {
    id: "carousel-espelho-medo-coming",
    title: "O Espelho do Medo — em breve (Março 2026)",
    description: "Teaser para o próximo lançamento. Gerar antecipação e waitlist.",
    slides: [
      { bg: "#8b9b8e", text: "#f7f5f0", accent: "#ebe7df", title: "O segundo véu\nestá quase\na cair.", body: "", footer: "", bgImage: "/images/espelho-medo.png" },
      { bg: "#3d3630", text: "#f7f5f0", accent: "#8b9b8e", title: "Sabes o que queres.", body: "Mas o medo\ndecide antes de ti.\n\nSempre decidiu.", footer: "" },
      { bg: "#f7f5f0", text: "#3d3630", accent: "#8b9b8e", title: "O Espelho do Medo", body: "A história de quem\nsabe o caminho\nmas não dá o passo.\n\nPorque o medo\né mais rápido\nque a vontade.", footer: "Março 2026" },
      { bg: "#8b9b8e", text: "#f7f5f0", accent: "#ebe7df", title: "\"E se falhar?\"\n\"E se me arrepender?\"\n\"E se não resultar?\"", body: "Reconheces estas vozes?", footer: "" },
      { bg: "#3d3630", text: "#8b9b8e", accent: "#f7f5f0", title: "Março 2026.", body: "Sai primeiro para\nquem já está dentro.\n\nEntra na lista de espera\ne recebe antes de todos.", footer: "seteveus.space" },
    ],
    caption: "O segundo véu está quase a cair.\n\nO Espelho do Medo — Março 2026.\n\nSabes o que queres. Mas o medo decide antes de ti. Sempre decidiu.\n\n\"E se falhar?\" \"E se me arrepender?\" \"E se não resultar?\"\n\nReconheces estas vozes?\n\nSai primeiro para quem já está dentro da plataforma.\n\nseteveus.space\n\n#OsSeteVeus #EspelhoDoMedo #Marco2026 #PróximoLançamento #Autoconhecimento",
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
    caption: "Compraste o livro físico Os 7 Véus do Despertar? Tens direito ao acesso digital gratuito.\n\n1. Preenche o formulário (2 minutos)\n2. Recebes o código em até 24h no teu email\n3. Activa e começa a experiência\n\nO que ganhas: leitura em 3 níveis (Semente, Raiz, Árvore), diário reflexivo, respiração guiada, práticas por véu, comunidade anónima, chatbot 24/7.\n\nPede aqui: seteveus.space/pedir-codigo\n\n#OsSeteVeus #AcessoDigital #LivroFísico #PedeOTeuCodigo #Autoconhecimento",
    canvaSpecs: {
      dimensions: "1080x1080px (quadrado)",
      fonts: "Título: Playfair Display / Corpo: Inter",
      colorPalette: ["#3d3630", "#f7f5f0", "#c9b896", "#7a8c6e", "#ebe7df"],
    },
  },
  {
    id: "carousel-do-papel-ao-digital",
    title: "Do papel ao ecrã — o que muda",
    description: "Mostra as diferenças entre ter só o livro físico e ter o acesso digital. Valor concreto.",
    slides: [
      { bg: "#ebe7df", text: "#3d3630", accent: "#c9b896", title: "Do papel ao ecrã.", body: "A mesma essência.\nUma nova forma\nde viver os véus.", footer: "" },
      { bg: "#3d3630", text: "#f7f5f0", accent: "#c9b896", title: "Só o livro físico:", body: "Lês.\nFechas.\nGuardas na estante.\n\nA experiência fica\nno papel.", footer: "" },
      { bg: "#f7f5f0", text: "#3d3630", accent: "#7a8c6e", title: "Com o acesso digital:", body: "Lês.\nRespiras.\nEscreves no diário.\nPartilhas na comunidade.\n\nA experiência fica\nem ti.", footer: "" },
      { bg: "#3d3630", text: "#f7f5f0", accent: "#c9b896", title: "Diário reflexivo", body: "Cada capítulo tem\num espaço para escreveres\no que sentiste.\n\nSó tu lês.\nSó tu decides.", footer: "" },
      { bg: "#f7f5f0", text: "#3d3630", accent: "#7a8c6e", title: "Comunidade anónima", body: "Ecos: reflexões partilhadas\nsem nome, sem foto.\n\nReconheces-te nas palavras\nde quem nunca viste.", footer: "" },
      { bg: "#3d3630", text: "#f7f5f0", accent: "#c9b896", title: "Respiração guiada", body: "Entre capítulos,\numa pausa.\n\nNão para descansar.\nPara sentir.", footer: "" },
      { bg: "#7a8c6e", text: "#f7f5f0", accent: "#ebe7df", title: "Gratuito para quem\nja tem o livro.", body: "Pede o teu código\nem 2 minutos.", footer: "seteveus.space/pedir-código" },
    ],
    caption: "Do papel ao ecrã. A mesma essência, uma nova forma de viver.\n\nSó o livro físico: lês, fechas, guardas.\nCom o acesso digital: lês, respiras, escreves, partilhas.\n\n+ Diário reflexivo por capítulo\n+ Comunidade anónima (Ecos)\n+ Respiração guiada entre capítulos\n+ Chatbot de apoio 24/7\n\nGratuito para quem já tem o livro físico.\nPede o teu código: seteveus.space/pedir-código\n\n#OsSeteVeus #DoPapelAoDigital #ExperienciaDigital #Autoconhecimento",
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
      { bg: "#3d3630", text: "#c9b896", accent: "#f7f5f0", title: "O que está dentro\nda experiência digital?", body: "", footer: "Os 7 Véus do Despertar" },
      { bg: "#f7f5f0", text: "#3d3630", accent: "#c9b896", title: "Leitura interactiva", body: "O livro filosófico completo\ncom pausas integradas.\n\nNão é uma cópia digital —\né uma experiência\ndiferente de ler.", footer: "" },
      { bg: "#3d3630", text: "#f7f5f0", accent: "#7a8c6e", title: "Diário reflexivo", body: "Em cada capítulo,\num espaço para ti.\n\nEscreve o que sentes.\nGuarda o que descobres.\nSó tu tens acesso.", footer: "" },
      { bg: "#f7f5f0", text: "#3d3630", accent: "#c9b896", title: "Respiração guiada", body: "Entre capítulos,\no ecrã escurece.\nUm convite a parar.\n\nInspira. Expira.\nSó depois avanças.", footer: "" },
      { bg: "#3d3630", text: "#f7f5f0", accent: "#c9b896", title: "Comunidade Ecos", body: "Reflexões anónimas.\nImpermanentes.\n\nNinguém sabe quem és.\nTodos se reconhecem.", footer: "" },
      { bg: "#f7f5f0", text: "#3d3630", accent: "#7a8c6e", title: "Chatbot de apoio", body: "Dúvidas sobre os véus?\nSobre a plataforma?\nSobre ti?\n\nUma voz disponível\n24 horas por dia.", footer: "" },
      { bg: "#ebe7df", text: "#3d3630", accent: "#c9b896", title: "Recursos gratuitos", body: "Teste: Qual véu te esconde?\nDiário de 7 dias\nChecklist do despertar\nMini-guia\nWallpapers", footer: "" },
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
      { bg: "#f7f5f0", text: "#3d3630", accent: "#c9b896", title: "1. O diário\nmuda tudo.", body: "Ler sem escrever\né como olhar\npara um espelho\nde olhos fechados.", footer: "" },
      { bg: "#3d3630", text: "#f7f5f0", accent: "#7a8c6e", title: "2. Não estás\nsozinha.", body: "Na comunidade Ecos,\noutras mulheres\nestão a atravessar\nos mesmos véus.\n\nAnonimamente.", footer: "" },
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
    description: "Tom pessoal, como se fosse uma conversa íntima. Para WhatsApp status ou Instagram story.",
    slides: [
      { bg: "#3d3630", text: "#c9b896", accent: "#f7f5f0", title: "Uma coisa que talvez\nnão saibas.", body: "", footer: "", bgImage: "/images/mandala-7veus.png" },
      { bg: "#ebe7df", text: "#3d3630", accent: "#c9b896", title: "O livro que tens\nna estante...", body: "...tem uma extensão\ndigital.", footer: "" },
      { bg: "#3d3630", text: "#f7f5f0", accent: "#c9b896", title: "Não é uma cópia.", body: "É uma experiência\ndiferente.\n\nPodes escrever reflexões\nà medida que lês.\nGuardar pensamentos\npor capítulo.", footer: "" },
      { bg: "#f7f5f0", text: "#3d3630", accent: "#7a8c6e", title: "É participar\nnuma comunidade\nanónima", body: "de leitoras que também\nestão a atravessar\nos véus.", footer: "" },
      { bg: "#3d3630", text: "#f7f5f0", accent: "#c9b896", title: "É gratuito.\nE pessoal.\nE teu.", body: "", footer: "seteveus.space/pedir-código" },
    ],
    caption: "Uma coisa que talvez não saibas:\n\nO livro físico \"Os 7 Véus do Despertar\" tem uma extensão digital.\n\nNão é uma cópia — é uma experiência diferente. Podes escrever reflexões à medida que lês, guardar pensamentos por capítulo, e participar numa comunidade anónima de leitoras.\n\nÉ gratuito. É pessoal. É teu.\n\nseteveus.space/pedir-código\n\n#OsSeteVeus #ExperienciaDigital #Autoconhecimento",
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
    caption: "Não é só ler. É parar, respirar, escrever.\n\nNa experiência digital d'Os 7 Véus do Despertar:\n\n— Respiração guiada entre capítulos\n— Práticas guiadas por véu, escritas pela autora\n— Diário reflexivo pessoal — só tu lês\n\n\"Ler sem escrever é como olhar para um espelho de olhos fechados.\"\n\nGratuito para quem já tem o livro físico.\nseteveus.space/pedir-codigo\n\n#OsSeteVeus #PraticasGuiadas #DiárioReflexivo #ExperienciaDigital #PedeOTeuCodigo",
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

  // ─── CARROSSEIS FILOSOFICOS E INTIMISTAS ────────────────────────────────────

  {
    id: "carousel-o-que-te-esconde",
    title: "O que te esconde de ti mesma?",
    description: "Carrossel filosofico de paragem obrigatoria. Cada slide e uma pergunta provocadora que obriga a leitora a confrontar-se. Nao e sobre o livro. E sobre quem esta a ler. Desenhado para guardar e partilhar.",
    slides: [
      { bg: "#2a2420", text: "#c9b896", accent: "#f7f5f0", title: "O que te esconde\nde ti mesma?", body: "", footer: "", bgImage: "/images/mandala-7veus.png" },
      { bg: "#f7f5f0", text: "#3d3630", accent: "#c9b896", title: "Quando foi a ultima vez\nque fizeste algo\nso porque querias?", body: "Sem justificacao.\nSem pedir licenca.\nSem calcular\no que iam pensar.", footer: "" },
      { bg: "#2a2420", text: "#f7f5f0", accent: "#c9b896", title: "Quantas vezes disseste\n\"esta tudo bem\" hoje?", body: "E em quantas dessas vezes\nmentiste\nsem sequer reparar\nque estavas a mentir?", footer: "" },
      { bg: "#ebe7df", text: "#3d3630", accent: "#c9b896", title: "O que farias\nse ninguem\nestivesse a ver?", body: "Nao o que farias de mau.\nO que farias de verdadeiro.", footer: "" },
      { bg: "#3d3630", text: "#f7f5f0", accent: "#c9b896", title: "Ha quanto tempo\nnao choras\nsem motivo aceitavel?", body: "Ha quanto tempo\nso te permites chorar\nquando o mundo concorda\nque tens razao?", footer: "" },
      { bg: "#f7f5f0", text: "#3d3630", accent: "#c9b896", title: "Se te sentasses\nna frente de ti mesma\ne olhasses\nnos teus proprios olhos,", body: "o que verias\nque ninguem mais ve?", footer: "" },
      { bg: "#2a2420", text: "#f7f5f0", accent: "#c9b896", title: "A resposta que tiveste\na estas perguntas\nnao e a verdadeira.", body: "A verdadeira\ne a que apareceu primeiro.\nAntes de a censurares.", footer: "" },
      { bg: "#3d3630", text: "#c9b896", accent: "#f7f5f0", title: "Ha um teste\nque demora 3 minutos.\nNao te da respostas.\nDa-te o inicio\nde uma conversa\ncontigo.", body: "", footer: "seteveus.space/teste", bgImage: "/images/mandala-7veus.png" },
    ],
    caption: "O que te esconde de ti mesma?\n\nQuando foi a ultima vez que fizeste algo so porque querias?\n\nQuantas vezes disseste \"esta tudo bem\" hoje? E em quantas dessas vezes mentiste sem sequer reparar?\n\nO que farias se ninguem estivesse a ver? Nao o que farias de mau. O que farias de verdadeiro.\n\nHa quanto tempo nao choras sem motivo aceitavel?\n\nA resposta que tiveste a estas perguntas nao e a verdadeira. A verdadeira e a que apareceu primeiro. Antes de a censurares.\n\nGuarda. Volta. Le devagar.\n\nseteveus.space/teste\n\n#OsSeteVeus #Autoconhecimento #FilosofiaDeVida #PerguntasQueNinguemFaz #DespertarInterior #ReflexaoSilenciosa #VerdadeInterior",
    canvaSpecs: {
      dimensions: "1080x1080px (quadrado)",
      fonts: "Titulo: Playfair Display Italic / Corpo: Inter Light",
      colorPalette: ["#2a2420", "#f7f5f0", "#c9b896", "#3d3630", "#ebe7df"],
    },
  },
  {
    id: "carousel-vozes-ecos",
    title: "Vozes que se reconhecem",
    description: "Reflexoes anonimas simuladas da comunidade. Cada slide e um eco: intimo, cru, honesto. Parece um fragmento de diario de alguem que podias ser tu. Desenhado para provocar o 'eu tambem'.",
    slides: [
      { bg: "#2a2420", text: "#f7f5f0", accent: "#7a8c6e", title: "Vozes que\nse reconhecem.", body: "", footer: "Ecos anonimos. Nomes guardados.", bgImage: "/images/mandala-7veus.png" },
      { bg: "#f7f5f0", text: "#2a2420", accent: "#7a8c6e", title: "\"Hoje percebi que\na pessoa que mais\nme assusta\nsou eu sem mascara.\"", body: "Nao por ser ma.\nPor ser desconhecida.", footer: "~ eco anonimo" },
      { bg: "#2a2420", text: "#f7f5f0", accent: "#c9b896", title: "\"Passei a vida inteira\na construir uma mulher\nque toda a gente\nadmirasse.\"", body: "\"Quando ela ficou pronta,\npercebi que nao era eu.\"", footer: "~ eco anonimo" },
      { bg: "#ebe7df", text: "#3d3630", accent: "#7a8c6e", title: "\"A minha mae nunca\nme ensinou a chorar.\nEnsinou-me a aguentar.\nE eu aguentei.\nAte ao dia em que\no corpo disse basta.\"", body: "", footer: "~ eco anonimo" },
      { bg: "#3d3630", text: "#f7f5f0", accent: "#c9b896", title: "\"Descobri que o medo\nnao e de falhar.\nE de conseguir.\nE depois nao saber\nquem sou sem a luta.\"", body: "", footer: "~ eco anonimo" },
      { bg: "#f7f5f0", text: "#2a2420", accent: "#7a8c6e", title: "\"Li uma frase\nque dizia:\n'O que te protege\ntambem te aprisiona.'\nFechei o livro.\nChorei meia hora.\"", body: "", footer: "~ eco anonimo" },
      { bg: "#2a2420", text: "#f7f5f0", accent: "#c9b896", title: "\"O mais estranho\nde acordar\ne perceber\nque acordar doi.\nE que mesmo assim\nprefiro a dor\nao entorpecimento.\"", body: "", footer: "~ eco anonimo" },
      { bg: "#7a8c6e", text: "#f7f5f0", accent: "#ebe7df", title: "Estas vozes existem\nnum espaco onde\nninguem se conhece\nmas todos se reconhecem.", body: "Chama-se comunidade.\nE talvez estejas\npronta para entrar.", footer: "seteveus.space/comunidade", bgImage: "/images/mandala-7veus.png" },
    ],
    caption: "Vozes que se reconhecem.\n\nEcos anonimos. Nomes guardados.\n\n\"Hoje percebi que a pessoa que mais me assusta sou eu sem mascara. Nao por ser ma. Por ser desconhecida.\"\n\n\"Passei a vida inteira a construir uma mulher que toda a gente admirasse. Quando ela ficou pronta, percebi que nao era eu.\"\n\n\"A minha mae nunca me ensinou a chorar. Ensinou-me a aguentar. E eu aguentei. Ate ao dia em que o corpo disse basta.\"\n\n\"Descobri que o medo nao e de falhar. E de conseguir. E depois nao saber quem sou sem a luta.\"\n\nEstas vozes existem num espaco onde ninguem se conhece mas todos se reconhecem.\n\nseteveus.space/comunidade\n\n#OsSeteVeus #VozesQueSeReconhecem #ComunidadeAnonima #EcosDeConsciencia #ReflexaoInterior #Autoconhecimento #DespertarSilencioso",
    canvaSpecs: {
      dimensions: "1080x1080px (quadrado)",
      fonts: "Citacoes: Playfair Display Italic / Rodape: Inter Light",
      colorPalette: ["#2a2420", "#f7f5f0", "#7a8c6e", "#c9b896", "#ebe7df", "#3d3630"],
    },
  },
  {
    id: "carousel-7-perguntas",
    title: "7 perguntas que ninguem te faz",
    description: "Uma pergunta por veu, sem nomear o veu. Cada slide e uma pergunta profundamente pessoal que espelha a essencia de cada veu. Desenhado para ser guardado e partilhado. Silencio entre slides.",
    slides: [
      { bg: "#3d3630", text: "#c9b896", accent: "#f7f5f0", title: "7 perguntas\nque ninguem\nte faz.", body: "", footer: "Guarda isto. Le devagar.", bgImage: "/images/mandala-7veus.png" },
      { bg: "#c9b896", text: "#3d3630", accent: "#f7f5f0", title: "", body: "Que versao de ti\nestarias a viver agora\nse nunca tivesses ouvido\n\"tu devias ser assim\"?", footer: "I" },
      { bg: "#2a2420", text: "#f7f5f0", accent: "#c9b896", title: "", body: "O que e que evitas sentir\ncom tanta disciplina\nque ja nem percebes\nque o estas a evitar?", footer: "II" },
      { bg: "#ebe7df", text: "#3d3630", accent: "#c9b896", title: "", body: "De que te sentes culpada\nque nunca disseste\nem voz alta?\nE se nao fosse culpa?\nSe fosse so dor\nmal nomeada?", footer: "III" },
      { bg: "#3d3630", text: "#f7f5f0", accent: "#c9b896", title: "", body: "Quem serias\nse deixasses de provar\nque mereces\nestar aqui?", footer: "IV" },
      { bg: "#7a8c6e", text: "#f7f5f0", accent: "#ebe7df", title: "", body: "O que aconteceria\nse largasses\no que seguras\ncom tanta forca\nque ja te esqueceste\nde que o podes largar?", footer: "V" },
      { bg: "#c9b896", text: "#3d3630", accent: "#f7f5f0", title: "", body: "Quando foi a ultima vez\nque desejaste algo\nsem imediatamente\ncalcular\nse o mereciaas?", footer: "VI" },
      { bg: "#2a2420", text: "#f7f5f0", accent: "#c9b896", title: "", body: "Se tudo o que\nconstruiste\ndesaparecesse amanha,\no que em ti\ncontinuaria de pe?", footer: "VII" },
      { bg: "#3d3630", text: "#f7f5f0", accent: "#c9b896", title: "Nao precisas\nde responder agora.", body: "A pergunta que te ficou\ne o veu que te espera.", footer: "seteveus.space/teste", bgImage: "/images/mandala-7veus.png" },
    ],
    caption: "7 perguntas que ninguem te faz.\n\nI. Que versao de ti estarias a viver agora se nunca tivesses ouvido \"tu devias ser assim\"?\n\nII. O que e que evitas sentir com tanta disciplina que ja nem percebes que o estas a evitar?\n\nIII. De que te sentes culpada que nunca disseste em voz alta?\n\nIV. Quem serias se deixasses de provar que mereces estar aqui?\n\nV. O que aconteceria se largasses o que seguras com tanta forca?\n\nVI. Quando foi a ultima vez que desejaste algo sem calcular se o mereciaas?\n\nVII. Se tudo desaparecesse amanha, o que em ti continuaria de pe?\n\nA pergunta que te ficou e o veu que te espera.\n\nseteveus.space/teste\n\n#OsSeteVeus #7Perguntas #PerguntasProfundas #Autoconhecimento #DespertarDeConsciencia #FilosofiaDeVida #ReflexaoInterior #GuardaIsto",
    canvaSpecs: {
      dimensions: "1080x1080px (quadrado)",
      fonts: "Pergunta: Playfair Display Italic / Numero: Inter Light",
      colorPalette: ["#3d3630", "#c9b896", "#2a2420", "#ebe7df", "#7a8c6e", "#f7f5f0"],
    },
  },
  {
    id: "carousel-nao-e-autoajuda",
    title: "Isto nao e autoajuda.",
    description: "Carrossel provocador de posicionamento. Contrasta frontalmente o que este livro NAO e com o que ele realmente e. Anti-autoajuda. Desconfortavel. Honesto. Para quem ja esta farta de promessas vazias.",
    slides: [
      { bg: "#2a2420", text: "#f7f5f0", accent: "#c9b896", title: "Isto nao e\nautoajuda.", body: "", footer: "", bgImage: "/images/mandala-7veus.png" },
      { bg: "#f7f5f0", text: "#3d3630", accent: "#c9b896", title: "Nao te vai dizer\no que fazer.", body: "Vai perguntar-te\nporque fazes\no que fazes.", footer: "" },
      { bg: "#3d3630", text: "#f7f5f0", accent: "#c9b896", title: "Nao te vai dar\num plano de 7 passos\npara a felicidade.", body: "Vai tirar-te\no chao debaixo dos pes.\nDevagar.\nCom cuidado.\nMas vai.", footer: "" },
      { bg: "#ebe7df", text: "#3d3630", accent: "#c9b896", title: "Nao te vai prometer\nque vais ficar bem.", body: "Vai mostrar-te\nque \"ficar bem\"\ntalvez seja o veu\nmais espesso de todos.", footer: "" },
      { bg: "#2a2420", text: "#f7f5f0", accent: "#c9b896", title: "Nao ha mantras.\nNao ha afirmacoes\npositivas.\nNao ha gratidao\nforcada.", body: "Ha silencio.\nHa perguntas.\nHa verdade\nque incomoda.", footer: "" },
      { bg: "#c9b896", text: "#3d3630", accent: "#f7f5f0", title: "Se queres\nque alguem te diga\nque es suficiente,\nha milhares de livros\npara isso.", body: "Este pergunta-te:\nsuficiente para quem?", footer: "" },
      { bg: "#3d3630", text: "#f7f5f0", accent: "#c9b896", title: "Se procuras conforto,\neste livro\nnao e para ti.", body: "Se procuras verdade\nque arda devagar\nmas nao se apague,\ntalvez seja.", footer: "" },
      { bg: "#2a2420", text: "#c9b896", accent: "#f7f5f0", title: "Os 7 Veus\ndo Despertar.", body: "Nao e autoajuda.\nE um espelho\nque nao te deixa\ndesviar o olhar.", footer: "seteveus.space", bgImage: "/images/mandala-7veus.png" },
    ],
    caption: "Isto nao e autoajuda.\n\nNao te vai dizer o que fazer. Vai perguntar-te porque fazes o que fazes.\n\nNao te vai dar um plano de 7 passos para a felicidade. Vai tirar-te o chao debaixo dos pes. Devagar. Com cuidado. Mas vai.\n\nNao te vai prometer que vais ficar bem. Vai mostrar-te que \"ficar bem\" talvez seja o veu mais espesso de todos.\n\nNao ha mantras. Nao ha afirmacoes positivas. Ha silencio. Ha perguntas. Ha verdade que incomoda.\n\nSe queres que alguem te diga que es suficiente, ha milhares de livros para isso. Este pergunta-te: suficiente para quem?\n\nSe procuras conforto, este livro nao e para ti. Se procuras verdade que arda devagar mas nao se apague, talvez seja.\n\nseteveus.space\n\n#OsSeteVeus #NaoEAutoajuda #AntiAutoajuda #FilosofiaDeVida #VerdadeIncomoda #Autoconhecimento #DespertarDeConsciencia #LivroFilosofico",
    canvaSpecs: {
      dimensions: "1080x1080px (quadrado)",
      fonts: "Titulo: Playfair Display Bold / Corpo: Inter",
      colorPalette: ["#2a2420", "#f7f5f0", "#c9b896", "#3d3630", "#ebe7df"],
    },
  },
  {
    id: "carousel-antes-depois",
    title: "Antes e depois de ler o primeiro veu",
    description: "Transformacao interior subtil e honesta. Nada de antes/depois motivacional. Mudancas pequenas, reais, desconfortaveis. O tipo de mudanca que ninguem ve de fora mas que muda tudo por dentro.",
    slides: [
      { bg: "#3d3630", text: "#c9b896", accent: "#f7f5f0", title: "Antes e depois\nde ler\no primeiro veu.", body: "", footer: "Nao sao conquistas.\nSao feridas que\ndeixaram de doer\nem silencio.", bgImage: "/images/mandala-7veus.png" },
      { bg: "#f7f5f0", text: "#3d3630", accent: "#c9b896", title: "Antes:", body: "\"Esta tudo bem.\"", footer: "" },
      { bg: "#ebe7df", text: "#3d3630", accent: "#c9b896", title: "Depois:", body: "\"Nao esta.\nE nao precisa\nde estar.\"", footer: "" },
      { bg: "#f7f5f0", text: "#3d3630", accent: "#c9b896", title: "Antes:", body: "Chorava so quando\nninguem via.\nE limpava a cara\nantes de sair\nda casa de banho.", footer: "" },
      { bg: "#ebe7df", text: "#3d3630", accent: "#c9b896", title: "Depois:", body: "Deixei as lagrimas\nescorrerem a mesa.\nAlguem perguntou\nse estava bem.\nDisse que nao.\nE o mundo nao acabou.", footer: "" },
      { bg: "#f7f5f0", text: "#3d3630", accent: "#c9b896", title: "Antes:", body: "Sabia exactamente\nquem era.\nTinha respostas\npara tudo.", footer: "" },
      { bg: "#ebe7df", text: "#3d3630", accent: "#c9b896", title: "Depois:", body: "Sei cada vez menos.\nMas o que sei\nfinalmente e meu.\nNao herdado.\nNao decorado.\nVivido.", footer: "" },
      { bg: "#3d3630", text: "#f7f5f0", accent: "#c9b896", title: "O livro nao te melhora.\nNao te conserta.\nNao te transforma.", body: "Tira-te o disfarce.\nE isso muda tudo.", footer: "seteveus.space", bgImage: "/images/mandala-7veus.png" },
    ],
    caption: "Antes e depois de ler o primeiro veu.\n\nNao sao conquistas. Sao feridas que deixaram de doer em silencio.\n\nAntes: \"Esta tudo bem.\"\nDepois: \"Nao esta. E nao precisa de estar.\"\n\nAntes: chorava so quando ninguem via.\nDepois: deixei as lagrimas escorrerem a mesa. Alguem perguntou se estava bem. Disse que nao. E o mundo nao acabou.\n\nAntes: sabia exactamente quem era.\nDepois: sei cada vez menos. Mas o que sei finalmente e meu. Nao herdado. Nao decorado. Vivido.\n\nO livro nao te melhora. Nao te conserta. Tira-te o disfarce. E isso muda tudo.\n\nseteveus.space\n\n#OsSeteVeus #AntesEDepois #TransformacaoReal #Autoconhecimento #VerdadeInterior #DespertarDeConsciencia #FilosofiaDeVida #SemDisfarce",
    canvaSpecs: {
      dimensions: "1080x1080px (quadrado)",
      fonts: "Titulo: Playfair Display / Corpo: Inter Light",
      colorPalette: ["#3d3630", "#f7f5f0", "#ebe7df", "#c9b896"],
    },
  },
  {
    id: "carousel-vivianne-carta",
    title: "Eu nao escrevi este livro para te ajudar",
    description: "Carta pessoal da Vivianne com titulo provocador. Nao e generosidade — e necessidade. Ela escreveu porque precisava de se entender. A leitora nao e cliente — e reflexo. Tom visceral, vulneravel, sem filtro. Portugues de Mocambique.",
    slides: [
      { bg: "#ebe7df", text: "#3d3630", accent: "#c9b896", title: "Eu nao escrevi\neste livro\npara te ajudar.", body: "", footer: "Vivianne dos Santos", bgImage: "/images/mandala-7veus.png" },
      { bg: "#3d3630", text: "#f7f5f0", accent: "#c9b896", title: "Escrevi-o porque\nme estava a perder.", body: "Porque acordava todos os dias\ndentro de uma vida\nque tinha construido\ncom as maos de outra pessoa.\n\nAlguem que eu ja nao era.\nMas que todos esperavam\nque eu continuasse a ser.", footer: "" },
      { bg: "#ebe7df", text: "#3d3630", accent: "#c9b896", title: "Nao havia livro\nque dissesse\no que eu precisava\nde ouvir.", body: "Entao escrevi-o.\nNao como resposta.\nComo pergunta\nque me recusei\na calar.", footer: "" },
      { bg: "#2a2420", text: "#f7f5f0", accent: "#c9b896", title: "Tu nao es\nminha cliente.\nNao es minha aluna.\nNao es minha leitora.", body: "Es um reflexo.\nSe te reconheces\nnestas paginas,\nnao e porque eu\nte conhego.\nE porque nos vivemos\nas mesmas mentiras.", footer: "" },
      { bg: "#3d3630", text: "#f7f5f0", accent: "#c9b896", title: "Este livro nao e\num presente\nque te dou.", body: "E um espelho\nque parti.\nOs estilhacos\nsao as paginas.\nSe te cortares nalgum,\ne porque ja tinhas\nessa ferida.", footer: "" },
      { bg: "#ebe7df", text: "#3d3630", accent: "#c9b896", title: "Nao te prometo cura.\nNao te prometo paz.\nNao te prometo\nque vais gostar\ndo que encontras.", body: "Prometo-te\nque vai ser verdade.\nE talvez isso\nseja suficiente.", footer: "" },
      { bg: "#c9b896", text: "#3d3630", accent: "#f7f5f0", title: "Se te vires\nnestas paginas,\nnao foi por acaso.", body: "", footer: "Com tudo o que sou,\nVivianne\nseteveus.space", bgImage: "/images/mandala-7veus.png" },
    ],
    caption: "Eu nao escrevi este livro para te ajudar.\n\nEscrevi-o porque me estava a perder. Porque acordava todos os dias dentro de uma vida que tinha construido com as maos de outra pessoa.\n\nNao havia livro que dissesse o que eu precisava de ouvir. Entao escrevi-o. Nao como resposta. Como pergunta que me recusei a calar.\n\nTu nao es minha cliente. Nao es minha leitora. Es um reflexo. Se te reconheces nestas paginas, nao e porque eu te conhego. E porque nos vivemos as mesmas mentiras.\n\nEste livro nao e um presente que te dou. E um espelho que parti. Os estilhacos sao as paginas.\n\nNao te prometo cura. Nao te prometo paz. Prometo-te que vai ser verdade. E talvez isso seja suficiente.\n\nSe te vires nestas paginas, nao foi por acaso.\n\nCom tudo o que sou,\nVivianne\n\nseteveus.space\n\n#OsSeteVeus #CartaDaVivianne #VivianneDosSantos #VerdadeSemFiltro #Autoconhecimento #FilosofiaDeVida #DespertarDeConsciencia #EspelhoPartido",
    canvaSpecs: {
      dimensions: "1080x1080px (quadrado)",
      fonts: "Titulo: Playfair Display Italic / Corpo: Inter Light",
      colorPalette: ["#ebe7df", "#3d3630", "#c9b896", "#2a2420", "#f7f5f0"],
    },
  },
];

// ─── SCRIPTS DE REELS ────────────────────────────────────────────────────────

export const reelScripts: ReelScript[] = [
  {
    hook: "Construíste a tua vida inteira sem nunca ter perguntado o que querias.",
    scenes: [
      "CENA 1 (0-3s): Texto aparece letra a letra sobre fundo escuro: \"Construíste a tua vida inteira...\" [pausa dramática]",
      "CENA 2 (3-6s): \"...sem nunca ter perguntado o que querias.\" [texto completo]",
      "CENA 3 (6-12s): Imagem atmosférica — mulher de costas a olhar pela janela, ou mãos a segurar uma chávena. Voz-off ou texto: \"Quando foi que escolhi tomar café em vez de chá? Uma pergunta absurda. Mas foi a pergunta que mudou tudo.\"",
      "CENA 4 (12-20s): Transição suave. Texto: \"O Espelho da Ilusão é a história de uma mulher que, pela primeira vez, pergunta.\"",
      "CENA 5 (20-25s): Preview da plataforma (screenshot do leitor) com texto: \"Não é um livro. É uma experiência.\"",
      "CENA 6 (25-30s): CTA final sobre fundo escuro: \"Descobre qual véu te esconde. Link na bio.\"",
    ],
    cta: "Descobre qual véu te esconde. Teste gratuito na bio.",
    music: "Música ambiente calma, piano suave ou sons de natureza. Sugestões no Canva/CapCut: 'Contemplative', 'Reflective Piano', 'Soft Ambient'",
    duration: "25-30s",
    canvaTemplate: "Procura 'book reveal' ou 'quote animation' nos templates do CapCut",
  },
  {
    hook: "3 sinais de que vives no automático:",
    scenes: [
      "CENA 1 (0-3s): Texto grande e directo: \"3 sinais de que vives no automático\" [prender atenção]",
      "CENA 2 (3-8s): \"1. Respondes 'tanto faz' a perguntas importantes.\" [texto aparece com transição]",
      "CENA 3 (8-13s): \"2. Não te lembras da última vez que escolheste uma rua diferente.\" [transição]",
      "CENA 4 (13-18s): \"3. A tua primeira reacção nunca é o que verdadeiramente pensas.\" [transição]",
      "CENA 5 (18-23s): \"Se te reconheces... não és a única.\" [pausa] \"Escrevi uma história sobre isso.\"",
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
      "CENA 1 (0-3s): \"O que acontece quando uma mãe é uma filha dizem o que sempre calaram?\" [texto dramático]",
      "CENA 2 (3-8s): Imagem: mãos de duas gerações diferentes. Texto: \"Sara viu o véu. Mas há um nó que ficou por desatar.\"",
      "CENA 3 (8-15s): \"O Nó da Herança é a história de Sara e Helena — mãe e filha — e o silêncio herdado entre elas.\"",
      "CENA 4 (15-22s): \"Não é um upsell. É uma continuação emocional. Só se desbloqueia depois de completares o Espelho da Ilusão.\"",
      "CENA 5 (22-30s): Preview da plataforma com o card do Nó desbloqueado. CTA: \"Começa pelo Espelho. O Nó espera por ti.\"",
    ],
    cta: "Começa pelo Espelho. O Nó espera por ti.",
    music: "Emocional e íntima. Piano + cordas suaves. No CapCut: 'Emotional Piano' ou 'Cinematic Gentle'",
    duration: "25-30s",
    canvaTemplate: "Procura 'emotional story' ou 'book trailer' nos templates do CapCut",
  },
  {
    hook: "Tens o livro físico? Há algo que ainda não sabes.",
    scenes: [
      "CENA 1 (0-3s): Mostrar o livro físico (foto real se possível). \"Tens este livro?\"",
      "CENA 2 (3-8s): \"Há algo que ainda não sabes sobre ele.\"",
      "CENA 3 (8-15s): \"O livro abre portas que ainda não conheces.\" [transição para screenshots da plataforma]",
      "CENA 4 (15-22s): Mostrar a experiência digital: leitor, diário, comunidade. \"Leitura integrada. Diário pessoal. Comunidade anónima.\"",
      "CENA 5 (22-28s): \"Acesso gratuito para quem tem o livro físico.\"",
      "CENA 6 (28-35s): \"Pede o teu código em menos de 1 minuto.\" + CTA",
    ],
    cta: "Link na bio para pedires o teu código gratuito.",
    music: "Suave e convidativa. No CapCut: 'Warm Acoustic' ou 'Gentle Inspiration'",
    duration: "30-35s",
    canvaTemplate: "Procura 'product reveal' ou 'unboxing' nos templates do CapCut",
  },
  {
    hook: "Não sabes para onde vais? Óptimo.",
    scenes: [
      "CENA 1 (0-3s): \"Não sabes para onde vais?\" [pausa dramática]",
      "CENA 2 (3-5s): \"Óptimo.\" [texto grande, impacto]",
      "CENA 3 (5-12s): \"Não precisas de saber para onde vais. Precisas apenas de dar o primeiro passo.\"",
      "CENA 4 (12-18s): \"Os Sete Véus do Despertar são 7 experiências que te devolvem a ti mesma.\"",
      "CENA 5 (18-25s): \"Sem pressa. Sem fórmulas. Apenas verdade.\"",
      "CENA 6 (25-30s): \"Começa pelo teste gratuito. 3 minutos. 7 perguntas.\" + CTA",
    ],
    cta: "Teste gratuito na bio. 3 minutos.",
    music: "Inspiracional mas contida. No CapCut: 'Inspiring Minimal' ou 'Hope'",
    duration: "25-30s",
  },
  {
    hook: "Isto não é um livro. É um espelho.",
    scenes: [
      "CENA 1 (0-3s): Ecrã escuro. Texto aparece devagar: \"Isto não é um livro.\" [pausa]",
      "CENA 2 (3-5s): \"É um espelho.\" [impacto visual — flash suave]",
      "CENA 3 (5-10s): Screenshots rápidos da plataforma: leitor, diário, checklist, comunidade. Texto: \"Lês. Respiras. Escreves. Sentes.\"",
      "CENA 4 (10-18s): \"7 histórias. 7 véus. Cada um esconde algo que já sabes mas nunca disseste.\"",
      "CENA 5 (18-22s): Print do quiz com texto: \"3 minutos. 7 perguntas. Qual véu te esconde?\"",
      "CENA 6 (22-28s): \"Teste gratuito. Link na bio.\" [fundo escuro, dourado]",
    ],
    cta: "Teste gratuito na bio.",
    music: "Ambiente cinematográfico suave. No CapCut: 'Cinematic Soft' ou 'Atmospheric Piano'",
    duration: "25-28s",
  },
  {
    hook: "5 coisas que esta plataforma tem que nenhum livro te dá.",
    scenes: [
      "CENA 1 (0-3s): \"5 coisas que esta plataforma tem que nenhum livro te dá.\" [texto directo, fundo escuro]",
      "CENA 2 (3-8s): \"1. Pausas de respiração entre capítulos.\" [screenshot da pausa]",
      "CENA 3 (8-13s): \"2. Um diário pessoal que só tu lês.\" [screenshot do diário]",
      "CENA 4 (13-18s): \"3. Uma comunidade anónima onde ninguém te conhece mas todos se reconhecem.\" [screenshot Ecos]",
      "CENA 5 (18-23s): \"4. Histórias que se desbloqueiam ao teu ritmo.\" [screenshot do leitor]",
      "CENA 6 (23-28s): \"5. Um chatbot de apoio com a voz da autora.\" [screenshot do chat]",
      "CENA 7 (28-33s): \"$29 USD. Acesso vitalício. Link na bio.\" [CTA]",
    ],
    cta: "Link na bio. $29 USD. Acesso vitalício.",
    music: "Ritmo suave e moderno. No CapCut: 'Soft Pop' ou 'Modern Minimal'",
    duration: "30-33s",
  },
  {
    hook: "Se leste isto até ao fim, este livro é para ti.",
    scenes: [
      "CENA 1 (0-3s): Ecrã preto. Texto: \"Se leste isto até ao fim...\" [suspense]",
      "CENA 2 (3-5s): \"...este livro é para ti.\" [transição suave]",
      "CENA 3 (5-12s): Citação do livro em texto: \"Via, mas não sentia. Registava, mas não participava. Como quem assiste a um espectáculo por trás de uma janela fechada.\"",
      "CENA 4 (12-18s): \"Reconheces-te?\" [pausa longa] \"Então não és a única.\"",
      "CENA 5 (18-25s): \"O Espelho da Ilusão. Uma história sobre despertar do automático.\"",
      "CENA 6 (25-30s): \"Disponível agora. Link na bio.\" [imagem do espelho]",
    ],
    cta: "Link na bio. Disponível agora.",
    music: "Muito calma, quase silenciosa. No CapCut: 'Ambient Silence' ou 'Slow Piano'",
    duration: "25-30s",
  },

  // ─── REELS: CAMPANHA EXPERIENCIA DIGITAL ──────────────────────────────────

  {
    hook: "Tens este livro na estante? Há algo que não sabes sobre ele.",
    scenes: [
      "CENA 1 (0-3s): Mostrar foto do livro físico. Texto: \"Tens este livro?\" [curiosidade]",
      "CENA 2 (3-6s): \"Há algo que não sabes sobre ele.\" [pausa dramática]",
      "CENA 3 (6-12s): \"O livro físico tem uma extensão digital. Não é uma cópia — é uma experiência diferente.\"",
      "CENA 4 (12-18s): Screenshots rápidos da plataforma: diário, comunidade, respiração. Texto: \"Diário reflexivo. Comunidade anónima. Respiração guiada.\"",
      "CENA 5 (18-24s): \"E se já compraste o livro, o acesso é gratuito.\"",
      "CENA 6 (24-30s): \"Pede o teu código em 2 minutos. Link na bio.\" [CTA]",
    ],
    cta: "Pede o teu código gratuito. Link na bio.",
    music: "Suave e convidativa. No CapCut: 'Warm Acoustic' ou 'Gentle Inspiration'",
    duration: "25-30s",
  },
  {
    hook: "Ler sem escrever é como olhar para um espelho de olhos fechados.",
    scenes: [
      "CENA 1 (0-3s): Texto sobre ecrã escuro: \"Ler sem escrever...\" [suspense]",
      "CENA 2 (3-5s): \"...é como olhar para um espelho de olhos fechados.\" [impacto]",
      "CENA 3 (5-12s): Screenshot do diário reflexivo na plataforma. Texto: \"Na experiência digital, cada capítulo tem um espaço para escreveres o que sentiste.\"",
      "CENA 4 (12-18s): \"Só tu lês. Só tu decides o que guardas.\"",
      "CENA 5 (18-24s): Screenshot da comunidade Ecos. \"E na comunidade, descobres que não estás sozinha.\"",
      "CENA 6 (24-30s): \"Se já tens o livro físico, o acesso digital é gratuito. Link na bio.\" [CTA]",
    ],
    cta: "Acesso digital gratuito para quem tem o livro. Link na bio.",
    music: "Piano suave e contemplativo. No CapCut: 'Reflective Piano' ou 'Contemplative'",
    duration: "25-30s",
  },
];

// ─── CONJUNTOS DE HASHTAGS ───────────────────────────────────────────────────

export type HashtagSet = {
  name: string;
  description: string;
  tags: string[];
};

export const hashtagSets: HashtagSet[] = [
  {
    name: "Principal — Marca",
    description: "Usar em todos os posts. Hashtags da marca.",
    tags: [
      "#OsSeteVéus", "#SeteVéus", "#VivianneDosSantos", "#SetevéusSpace",
      "#OsSeteVéusDoDespertar", "#PedeOTeuCódigo",
    ],
  },
  {
    name: "Autoconhecimento",
    description: "Posts sobre despertar, reflexão, jornada interior.",
    tags: [
      "#Autoconhecimento", "#DesenvolvimentoPessoal", "#JornadaInterior",
      "#DespertarDeConsciência", "#Reflexão", "#ConheceTe",
      "#CrescimentoPessoal", "#Consciência", "#Introspecção",
      "#TransformaçãoPessoal",
    ],
  },
  {
    name: "Livros / Leitura",
    description: "Posts sobre o livro, citações, recomendações.",
    tags: [
      "#LivrosQueTransformam", "#DicaDeLeitura", "#BookstagramPortugal",
      "#LivrosEmPortuguês", "#LeituraConsciente", "#Bookstagram",
      "#BookTok", "#BooktokMoçambique", "#LivrosParaAlma",
      "#LiteraturaPortuguesa",
    ],
  },
  {
    name: "Moçambique / Lusófono",
    description: "Alcance regional — Moçambique, Brasil, Portugal.",
    tags: [
      "#Moçambique", "#AutorasMoçambicanas", "#LiteraturaMoçambicana",
      "#MaputoCity", "#EscritorasAfricanas", "#LivrosAfricanos",
      "#LiteraturaLusófona", "#LivrosBrasil", "#LivrosPortugal",
      "#EscritorasLusófonas",
    ],
  },
  {
    name: "Mulheres / Feminino",
    description: "Posts dirigidos ao público feminino.",
    tags: [
      "#MulheresQueDespertam", "#FemininoSagrado", "#MulheresFortes",
      "#Sororidade", "#MulheresConscientes", "#PoderFeminino",
      "#MulheresReais", "#ForçaFeminina", "#MulheresQueInspiram",
      "#JornadaFeminina",
    ],
  },
  {
    name: "Comunidade / Digital",
    description: "Posts sobre a plataforma e comunidade Ecos.",
    tags: [
      "#ComunidadeEcos", "#PlataformaDigital", "#LeituraIntegrada",
      "#DiárioReflexivo", "#ComunidadeAnónima", "#ExperiênciaDigital",
      "#LeituraDigital", "#AcessoGratuito", "#PlataformaDeAutoconhecimento",
      "#LeiturasInteractivas",
    ],
  },
  {
    name: "Engagement — Salvar/Partilhar",
    description: "CTAs para aumentar engagement.",
    tags: [
      "#GuardaEstaPub", "#PartilhaComAlguém", "#MarqueUmaAmiga",
      "#FrasesDoDia", "#ReflexãoDoDia", "#PensaNisto",
      "#CitaçõesDeLivros", "#FrasesQueTransformam", "#InspiraçãoDiária",
      "#PalavrasQueTocam",
    ],
  },
  {
    name: "Véu da Ilusão",
    description: "Posts específicos sobre o 1o véu.",
    tags: [
      "#VéuDaIlusão", "#EspelhoDaIlusão", "#NóDaHerança",
      "#PrimeiroVéu", "#Ilusão", "#VidaNoAutomático",
      "#DespertarDaIlusão", "#OQueÉReal", "#SairDoAutomático",
      "#PerguntasQueTransformam",
    ],
  },
  {
    name: "Véu do Medo",
    description: "Posts sobre o 2o véu (Março 2026).",
    tags: [
      "#VéuDoMedo", "#EspelhoDoMedo", "#SegundoVéu",
      "#Medo", "#Coragem", "#MedoDeViver",
      "#EnfrentarOMedo", "#CoragemDeSerQuemSou", "#SuperarOMedo",
      "#OQueMeTrava",
    ],
  },
];

// ─── GUIA DE PRODUCAO ────────────────────────────────────────────────────────

export type ProductionGuide = {
  category: string;
  items: { title: string; detail: string }[];
};

export const productionGuide: ProductionGuide[] = [
  {
    category: "Dimensões e Formatos",
    items: [
      { title: "Post Feed (quadrado)", detail: "1080 x 1080px — para carrosséis e posts estáticos" },
      { title: "Story / Status WhatsApp", detail: "1080 x 1920px (9:16) — para stories e status" },
      { title: "Reel / Cover", detail: "1080 x 1920px (9:16) — capa do reel: 1080x1080 recomendado" },
      { title: "Carrossel", detail: "1080 x 1080px cada slide, máximo 10 slides. Gerados directamente no /painel/marketing — descarrega todos os slides de uma vez." },
    ],
  },
  {
    category: "Paleta de Cores — Os Sete Véus",
    items: [
      { title: "Fundo escuro principal", detail: "#3d3630 — castanho escuro quente" },
      { title: "Fundo claro (cream)", detail: "#f7f5f0 — branco quente" },
      { title: "Dourado (accent)", detail: "#c9b896 — dourado suave" },
      { title: "Verde sage", detail: "#7a8c6e — verde terroso" },
      { title: "Bege médio", detail: "#ebe7df — entre cream e dourado" },
      { title: "Véu do Medo", detail: "#8b9b8e — verde acinzentado" },
      { title: "Véu da Culpa", detail: "#c97070 — vermelho suave" },
    ],
  },
  {
    category: "Tipografia",
    items: [
      { title: "Títulos / Citações", detail: "Playfair Display — serif, elegante, literário. Usada automaticamente nos carrosséis gerados." },
      { title: "Corpo de texto", detail: "Inter ou system font — sans-serif, limpo, legível" },
      { title: "Tamanho títulos", detail: "48-72pt em 1080x1080 — deve ser legível no telemóvel" },
      { title: "Tamanho corpo", detail: "22-32pt em 1080x1080" },
      { title: "Espaço entre linhas", detail: "1.4-1.6 — generoso, para respirar" },
    ],
  },
  {
    category: "Ferramentas Recomendadas (Custo Zero)",
    items: [
      { title: "Gerador integrado (seteveus.space)", detail: "Carrosséis e imagens para redes sociais gerados directamente na plataforma em /painel/marketing. Descarrega PNG pronto para publicar — sem Canva." },
      { title: "CapCut Free", detail: "Para Reels e vídeos. Templates prontos, legendas automáticas em Português, transições suaves." },
      { title: "Meta Business Suite", detail: "Para agendar posts no Instagram e Facebook. Gratuito. Mostra melhores horários para publicar." },
      { title: "WhatsApp Business", detail: "Para Status diários, broadcasts segmentados e catálogo dos livros. Gratuito." },
      { title: "Manychat Free", detail: "Automação de DMs no Instagram. Alguém comenta 'VEU' no post e recebe DM automática com link." },
      { title: "Kit (ConvertKit) Free", detail: "Email marketing até 10.000 subscritores. Landing pages e broadcasts gratuitos." },
    ],
  },
  {
    category: "Screenshots para Conteúdo",
    items: [
      { title: "Dashboard do membro", detail: "/membro — mostra a experiência completa por dentro" },
      { title: "Leitor de capítulo", detail: "/membro/leitura/1 — mostra como é a leitura integrada" },
      { title: "Respiração guiada", detail: "Screenshot durante a pausa de respiração entre capítulos" },
      { title: "Diário pessoal", detail: "Screenshot da área de reflexão (sem texto pessoal)" },
      { title: "Comunidade Ecos", detail: "/comunidade — mostra as 4 salas" },
      { title: "Quiz resultado", detail: "/recursos/teste — mostra o resultado do teste com o véu revelado" },
      { title: "Card do Nó desbloqueado", detail: "/membro/leitura — mostra o teaser do Nó da Herança após completar Espelho" },
      { title: "Página de compra", detail: "/comprar/espelhos — mostra preços e opções" },
    ],
  },
  {
    category: "Automação Manychat (Instagram DMs)",
    items: [
      { title: "Trigger: comentário 'VEU'", detail: "Quando alguém comenta VÉU num post, enviar DM: \"Obrigada pelo teu interesse! Descobre qual véu te esconde com o nosso teste gratuito de 3 minutos: seteveus.space/recursos/teste — Vivianne\"" },
      { title: "Trigger: comentário 'LIVRO'", detail: "Quando alguém comenta LIVRO, enviar DM: \"Tens o livro físico? Pede o teu código de acesso digital gratuito aqui: seteveus.space/pedir-código — Vivianne\"" },
      { title: "Trigger: comentário 'QUERO'", detail: "Quando alguém comenta QUERO, enviar DM: \"O Espelho da Ilusão está disponível por $29 USD / 1.885 MZN. Acesso vitalício. Começa aqui: seteveus.space/comprar/espelhos — Vivianne\"" },
      { title: "Story reply automation", detail: "Quando alguém responde a um Story, enviar agradecimento + link para o teste gratuito automaticamente." },
    ],
  },
];
