// ─── TYPES ───────────────────────────────────────────────────────────────────

export type Platform = "instagram" | "whatsapp" | "ambos";

export type CarouselSlide = {
  bg: string;
  text: string;
  accent: string;
  title: string;
  body: string;
  footer?: string;
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
            footer: "seteveus.space/acesso-digital",
            highlight: "Leitores do livro",
          },
          caption: "Se tens o livro f\u00edsico Os 7 V\u00e9us do Despertar, tens direito a uma experi\u00eancia digital completa.\n\nLeitura integrada, di\u00e1rio de reflex\u00e3o, comunidade e muito mais.\n\nRegista o teu interesse: seteveus.space/acesso-digital\n\n#OsSeteV\u00e9us #LivroF\u00edsico #AcessoDigital",
        },
        {
          platform: "whatsapp",
          type: "Broadcast",
          broadcast: "Ol\u00e1! Se tens o livro f\u00edsico Os 7 V\u00e9us do Despertar, tenho uma novidade:\n\nA plataforma digital foi redesenhada e tens direito a acesso gratuito. Leitura integrada, di\u00e1rio de reflex\u00e3o, comunidade e muito mais.\n\nRegista o teu interesse aqui e envio-te o c\u00f3digo:\nseteveus.space/acesso-digital\n\nDemora menos de 1 minuto. Sem compromisso.\n\n~ Vivianne",
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

// ─── SEMANA 2: ESPELHO DA ILUSAO ─────────────────────────────────────────────

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
          broadcast: "J\u00e1 alguma vez sentiste que a vida que constru\u00edste n\u00e3o foi bem escolhida por ti?\n\nEscrevi uma hist\u00f3ria sobre isso. Chama-se O Espelho da Ilus\u00e3o.\n\nN\u00e3o \u00e9 um livro que se l\u00ea. \u00c9 uma experi\u00eancia que se vive: 7 cap\u00edtulos, respira\u00e7\u00e3o guiada, di\u00e1rio de reflex\u00e3o e o teu Espelho pessoal.\n\nCome\u00e7a pelo teste gratuito:\nseteveus.space/recursos/teste\n\n~ Vivianne",
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
          caption: "Os Espelhos olham para dentro.\nOs N\u00f3s olham para a rela\u00e7\u00e3o.\n\nO N\u00f3 da Heran\u00e7a \u00e9 a hist\u00f3ria de Sara e Helena \u2014 m\u00e3e e filha \u2014 e o sil\u00eancio herdado entre elas.\n\nS\u00f3 se desbloqueia ao completar o Espelho da Ilus\u00e3o.\n\nseteveus.space/coleccao-nos\n\n#OsSeteV\u00e9us #N\u00f3DaHeran\u00e7a #Fic\u00e7\u00e3oRelacional",
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
            footer: "seteveus.space/acesso-digital",
            highlight: "Gratuito",
          },
          caption: "Tens o livro f\u00edsico? Regista o teu interesse e recebe acesso gratuito \u00e0 plataforma digital.\n\nseteveus.space/acesso-digital\n\n#OsSeteV\u00e9us #AcessoDigital",
        },
        {
          platform: "whatsapp",
          type: "Broadcast",
          broadcast: "Tens o livro Os 7 V\u00e9us do Despertar?\n\nA plataforma digital est\u00e1 completamente nova. E tens acesso gratuito.\n\nseteveus.space/acesso-digital",
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
            footer: "O Espelho da Ilusao ~ seteveus.space",
          },
          notes: "ROTEIRO DO REEL:\n\nCena 1 (0-3s): Ecra preto. Texto aparece letra a letra: \"Aquele momento...\"\nCena 2 (3-8s): Print da pagina seteveus.space/experiencias no telemovel, scroll lento\nCena 3 (8-15s): Print do leitor aberto (capitulo 1), zoom suave\nCena 4 (15-20s): Print da respiracao guiada entre capitulos\nCena 5 (20-25s): Texto: \"Nao e um livro. E uma experiencia.\"\nCena 6 (25-30s): Logo + seteveus.space\n\nMUSICA: Ambiente calmo, piano suave\nTRANSICOES: Fade lento entre cenas\n\nPRINTS NECESSARIOS:\n- seteveus.space/experiencias (pagina de compra)\n- seteveus.space/membro/leitura/1 (capitulo aberto)\n- seteveus.space/membro/leitura (lista de capitulos com respiracao)",
          caption: "Aquele momento em que percebes que a vida que tens nao foi escolhida por ti.\n\nO Espelho da Ilusao e uma experiencia de leitura imersiva:\n7 capitulos + respiracao guiada + diario de reflexao\n\nseteveus.space/experiencias\n\n#OsSeteVeus #Reel #Autoconhecimento #EspelhoDaIlusao #FiccaoPsicologica",
        },
        {
          platform: "whatsapp",
          type: "Status (video)",
          visual: {
            bg: "#3d3630", text: "#f7f5f0", accent: "#c9b896", format: "vertical",
            title: "Novo reel\nno Instagram.",
            body: "Uma experiencia de leitura\nque muda a forma\ncomo te ves.",
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
          notes: "SLIDES DO CARROSSEL:\n\nSlide 1 (capa): Fundo #f7f5f0, texto #3d3630\n\"7 sinais de que vives no piloto automatico\"\nSubtitulo: \"Quantos reconheces?\"\n\nSlide 2: Fundo #ebe7df\n\"1. Fazes as mesmas coisas todos os dias sem questionar porque.\"\n\nSlide 3: Fundo #f7f5f0\n\"2. Quando alguem te pergunta o que queres, nao tens resposta.\"\n\nSlide 4: Fundo #ebe7df\n\"3. Sentes que a vida passa mas nao estas realmente presente.\"\n\nSlide 5: Fundo #f7f5f0\n\"4. As tuas decisoes sao baseadas no que os outros esperam de ti.\"\n\nSlide 6: Fundo #ebe7df\n\"5. Ha algo dentro de ti que quer mais, mas nao sabes o que.\"\n\nSlide 7: Fundo #f7f5f0\n\"6. Tens medo de parar porque nao sabes o que vais encontrar.\"\n\nSlide 8 (CTA): Fundo #3d3630, texto #c9b896\n\"7. Leste isto tudo e reconheceste-te.\"\n\"Descobre qual veu te esconde:\"\n\"seteveus.space/recursos/teste\"\n\nFONTE: Serif elegante para titulos, sans-serif para corpo\nTODOS os slides devem ter o logo discreto no canto inferior",
          caption: "7 sinais de que vives no piloto automatico.\n\nQuantos reconheces? Conta nos comentarios.\n\nSe reconheceste mais de 3, o teste gratuito pode revelar algo importante:\nseteveus.space/recursos/teste\n\n#OsSeteVeus #PilotoAutomatico #Autoconhecimento #Despertar #Carrossel",
        },
        {
          platform: "whatsapp",
          type: "Broadcast",
          broadcast: "Preparei um conteudo novo no Instagram sobre os 7 sinais de que vives no piloto automatico.\n\nQuantos reconheces?\n\nVe o post completo: instagram.com/os7veus\n\nOu faz o teste gratuito directamente:\nseteveus.space/recursos/teste\n\n~ Vivianne",
        },
      ],
    },
    {
      day: "Quarta-feira",
      dayShort: "Qua",
      theme: "Post visual — Citacao com imagem",
      slots: [
        {
          platform: "instagram",
          type: "Post Feed (imagem com citacao)",
          visual: {
            bg: "#3d3630", text: "#f7f5f0", accent: "#c9b896", format: "square",
            title: "A ilusao mais perigosa\ne acreditar que\nescolheste\nquando apenas\nrepetiste.",
            body: "",
            footer: "O Espelho da Ilusao",
            highlight: "~ seteveus.space",
          },
          caption: "\"A ilusao mais perigosa e acreditar que escolheste quando apenas repetiste.\"\n\n-- O Espelho da Ilusao\n\nUma experiencia de leitura que te convida a parar. E a perguntar.\n\nseteveus.space\n\n#OsSeteVeus #EspelhoDaIlusao #Citacao #FiccaoPsicologica #Autoconhecimento",
        },
        {
          platform: "whatsapp",
          type: "Status",
          visual: {
            bg: "#3d3630", text: "#f7f5f0", accent: "#c9b896", format: "vertical",
            title: "A ilusao mais perigosa\ne acreditar que\nescolheste\nquando apenas\nrepetiste.",
            body: "",
            footer: "O Espelho da Ilusao",
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
            title: "Por dentro\nda experiencia",
            body: "Leitura integrada\nRespiracao guiada\nDiario pessoal\nComunidade anonima",
            footer: "seteveus.space",
          },
          notes: "ROTEIRO DO REEL (screen recording do telemovel):\n\nGravar screen recording no telemovel mostrando:\n1. (0-5s) Abrir seteveus.space/membro — dashboard com progresso\n2. (5-10s) Clicar em \"Continuar leitura\" — abre capitulo\n3. (10-15s) Scroll pelo texto do capitulo — mostrar tipografia bonita\n4. (15-20s) Chegar a pausa de reflexao — mostrar a caixa do diario\n5. (20-25s) Mostrar respiracao guiada entre capitulos\n6. (25-30s) Final: texto overlay \"Nao e um livro. E uma experiencia.\"\n\nMUSICA: Lo-fi calmo ou piano ambiente\nTEXTO OVERLAY: Adicionar legendas em cada transicao\n\nPRINTS/GRAVACAO NECESSARIA:\n- Screen recording completo no telemovel (Safari ou Chrome)\n- Comecar em seteveus.space/membro\n- Navegar ate um capitulo e fazer scroll",
          caption: "Por dentro da experiencia Os Sete Veus.\n\nNao e um livro que se le. E uma experiencia que se vive.\n\nLeitura integrada. Respiracao guiada. Diario pessoal. Comunidade anonima.\n\nseteveus.space\n\n#OsSeteVeus #PlataformaDigital #LeituraImersiva #Reel #Bookstagram",
        },
      ],
    },
    {
      day: "Sexta-feira",
      dayShort: "Sex",
      theme: "Carrossel — O que e a coleccao Espelhos",
      slots: [
        {
          platform: "instagram",
          type: "Carrossel (5 slides)",
          visual: {
            bg: "#ebe7df", text: "#3d3630", accent: "#c9b896", format: "square",
            title: "O que e a coleccao\nEspelhos?",
            body: "",
            footer: "Swipe para descobrir ~",
          },
          notes: "SLIDES DO CARROSSEL:\n\nSlide 1 (capa): Fundo #ebe7df\n\"O que e a coleccao Espelhos?\"\nImagem: Print da pagina seteveus.space/experiencias\n\nSlide 2: Fundo #f7f5f0\n\"7 experiencias de leitura imersiva.\nCada uma revela um veu diferente.\nIlusao. Medo. Culpa. Identidade.\nControlo. Desejo. Separacao.\"\n\nSlide 3: Fundo #ebe7df\n\"Cada experiencia inclui:\n7 capitulos de ficcao\nRespiracao guiada\nDiario de reflexao\nO teu Espelho pessoal\"\nImagem: Print do leitor com capitulos\n\nSlide 4: Fundo #f7f5f0\n\"Disponivel agora:\nO Espelho da Ilusao — $29 USD\n\nEm breve:\nO Espelho do Medo — Marco 2026\"\nImagem: Print da pagina de compra\n\nSlide 5 (CTA): Fundo #3d3630, texto #c9b896\n\"Comeca pelo teste gratuito.\nDescobre qual veu te esconde.\nseteveus.space/recursos/teste\"",
          caption: "A coleccao Espelhos sao 7 experiencias de leitura imersiva.\n\nCada uma revela um veu diferente. Cada veu esconde algo que precisas de ver.\n\nDisponivel agora: O Espelho da Ilusao\nEm breve: O Espelho do Medo (Marco 2026)\n\nComeca pelo teste gratuito:\nseteveus.space/recursos/teste\n\n#OsSeteVeus #ColeccaoEspelhos #Autoconhecimento #LeituraImersiva",
        },
        {
          platform: "whatsapp",
          type: "Status",
          visual: {
            bg: "#ebe7df", text: "#3d3630", accent: "#c9b896", format: "vertical",
            title: "7 veus.\n7 espelhos.\n7 experiencias.",
            body: "Descobre qual veu te esconde.",
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
            body: "A) Faco tudo pelos outros e esqueco-me de mim\nB) Tenho medo de mudar\nC) Nao sei quem sou sem a mascara\nD) Controlo tudo para nao sofrer",
            footer: "Responde no poll",
          },
          notes: "Criar Story com a funcionalidade de Poll do Instagram.\nOpcoes:\nA) Faco tudo pelos outros\nB) Tenho medo de mudar\nC) Nao sei quem sou\nD) Controlo tudo\n\nDepois do resultado, publicar segundo Story com:\n\"Cada resposta corresponde a um veu.\nDescobre o teu: seteveus.space/recursos/teste\"",
          caption: "Qual veu te esconde? Responde no story e descobre.",
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
      theme: "Preparacao + conteudo extra",
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
          notes: "Story informal: foto do espaco de escrita, computador, caderno, cha.\nTexto overlay: \"A escrever o proximo espelho. O Medo chega em Marco.\"\nSticker: countdown para Marco 2026",
        },
        {
          platform: "ambos",
          type: "Planear semana 6",
          notes: "Rever metricas da semana. Anotar quais reels/carrosseis tiveram melhor performance. Preparar conteudo da semana 6.",
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
      theme: "Reel — A historia de Sara (teaser)",
      slots: [
        {
          platform: "instagram",
          type: "Reel (texto animado 20s)",
          visual: {
            bg: "#ebe7df", text: "#3d3630", accent: "#c9b896", format: "vertical",
            title: "Sara acordou\nnuma manha igual\na todas as outras.",
            body: "Mas desta vez\nperguntou.",
            footer: "O Espelho da Ilusao",
          },
          notes: "ROTEIRO DO REEL (texto animado sobre fundo):\n\nFundo: Cores quentes, #ebe7df ou gradiente suave\n\n(0-3s) \"Sara acordou numa manha igual a todas as outras.\"\n(3-6s) \"Fez cafe. Vestiu-se. Saiu.\"\n(6-9s) \"Mas desta vez...\"\n(9-12s) \"...perguntou.\"\n(12-15s) Pausa. Ecra quase vazio.\n(15-18s) \"Quando foi que escolhi esta vida?\"\n(18-20s) Logo + \"O Espelho da Ilusao\" + seteveus.space\n\nMUSICA: Piano suave, algo melancolico mas esperancoso\nFONTE: Serif elegante, letras grandes centralizadas\nTRANSICOES: Fade lento, cada frase aparece sozinha",
          caption: "Sara acordou numa manha igual a todas as outras. Mas desta vez, perguntou.\n\n\"Quando foi que escolhi esta vida?\"\n\nO Espelho da Ilusao. Uma experiencia de leitura imersiva.\n\nseteveus.space/experiencias\n\n#OsSeteVeus #EspelhoDaIlusao #Reel #FiccaoPsicologica #Sara",
        },
        {
          platform: "whatsapp",
          type: "Status",
          visual: {
            bg: "#ebe7df", text: "#3d3630", accent: "#c9b896", format: "vertical",
            title: "Sara acordou\ne perguntou.",
            body: "Novo reel no Instagram.\nUma historia que muda tudo.",
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
          notes: "SLIDES DO CARROSSEL:\n\nSlide 1 (capa): Fundo #f7f5f0\n\"Espelhos e Nos. Duas coleccoes. Uma jornada.\"\n\nSlide 2: Fundo #ebe7df\n\"Os Espelhos olham para dentro.\nSao 7 experiencias de ficcao.\nCada uma revela um veu.\nLes. Respiras. Escreves. E ves-te.\"\nImagem: Print da pagina /experiencias\n\nSlide 3: Fundo #f7f5f0\n\"Os Nos olham para a relacao.\nO que acontece entre duas pessoas\nquando o veu cai.\"\nImagem: Print da pagina /coleccao-nos\n\nSlide 4: Fundo #ebe7df\n\"O No so se desbloqueia\nao completar o Espelho.\nNao e upsell.\nE continuacao emocional.\"\n\nSlide 5: Fundo #f7f5f0\nTabela visual:\n\"Espelho da Ilusao → No da Heranca\n(Sara sozinha) → (Sara + Helena, mae)\nO despertar → O silencio herdado\"\n\nSlide 6 (CTA): Fundo #3d3630, texto #c9b896\n\"Comeca pelo Espelho.\nO No espera por ti.\nseteveus.space/experiencias\"",
          caption: "Os Espelhos olham para dentro. Os Nos olham para a relacao.\n\nDuas coleccoes. Uma jornada.\n\nO No da Heranca e a historia de Sara e Helena — mae e filha. So se desbloqueia ao completar o Espelho da Ilusao.\n\nseteveus.space/experiencias\n\n#OsSeteVeus #Espelhos #Nos #ColeccaoCompleta #Autoconhecimento",
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
            title: "\"Chorei no capitulo 5.\nNao de tristeza.\nDe reconhecimento.\"",
            body: "",
            footer: "Ana M., Maputo",
          },
          notes: "DESIGN: Fundo texturizado cor creme. Citacao centrada em fonte serif grande. Nome e cidade em fonte menor abaixo. Logo discreto no canto inferior direito.\n\nSe nao tiver testemunho real, usar variacao do existente ou pedir a leitoras.",
          caption: "\"Chorei no capitulo 5. Nao de tristeza. De reconhecimento.\"\n-- Ana M., Maputo\n\nO Espelho da Ilusao.\n\nseteveus.space/experiencias\n\n#OsSeteVeus #Testemunho #EspelhoDaIlusao #Maputo",
        },
        {
          platform: "whatsapp",
          type: "Broadcast",
          broadcast: "Uma leitora disse-me isto:\n\n\"Chorei no capitulo 5. Nao de tristeza. De reconhecimento.\"\n\nSe queres saber o que ela encontrou:\nseteveus.space/experiencias\n\nOu comeca pelo teste gratuito:\nseteveus.space/recursos/teste\n\n~ Vivianne",
        },
      ],
    },
    {
      day: "Quinta-feira",
      dayShort: "Qui",
      theme: "Reel — No da Heranca (mae e filha)",
      slots: [
        {
          platform: "instagram",
          type: "Reel (texto emocional 20s)",
          visual: {
            bg: "#c9b896", text: "#3d3630", accent: "#f7f5f0", format: "vertical",
            title: "A mae sempre viu.\nEsperou anos.",
            body: "Agora que Sara acordou,\nHelena tem algo\npara lhe dizer.",
            footer: "O No da Heranca",
          },
          notes: "ROTEIRO DO REEL:\n\n(0-3s) Fundo quente, dourado. \"A mae sempre viu.\"\n(3-6s) \"Esperou anos.\"\n(6-9s) Pausa dramatica. Ecra quase vazio.\n(9-12s) \"Agora que Sara acordou...\"\n(12-16s) \"...Helena tem algo para lhe dizer.\"\n(16-18s) \"O No da Heranca.\"\n(18-20s) \"A continuacao emocional do Espelho da Ilusao.\"\n+ seteveus.space/coleccao-nos\n\nMUSICA: Algo emocional mas contido. Violino suave ou piano.\nFONTE: Serif grande, centralizadas",
          caption: "A mae sempre viu. Esperou anos.\n\nO No da Heranca e a historia de Sara e Helena — mae e filha — e o silencio herdado entre elas.\n\nSo se desbloqueia ao completar o Espelho da Ilusao.\n\nseteveus.space/coleccao-nos\n\n#OsSeteVeus #NoDaHeranca #Reel #MaeEFilha",
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
          notes: "SLIDES DO CARROSSEL:\n\nSlide 1 (capa): Fundo escuro #3d3630, texto dourado #c9b896\n\"Quanto custa escolher-te?\"\n\nSlide 2: Fundo #f7f5f0\n\"Espelho da Ilusao\n$29 USD / 1.885 MZN / R$119 / 27EUR\nAcesso vitalicio\n7 capitulos + respiracao + diario + espelho pessoal\"\n\nSlide 3: Fundo #ebe7df\n\"No da Heranca\n$12 USD / 780 MZN / R$49 / 11EUR\nSo desbloqueia ao completar o Espelho\nA continuacao emocional\"\n\nSlide 4: Fundo #f7f5f0\n\"Pack 3 Espelhos: $69 (18% desconto)\n→ 3 Nos incluidos!\n\nJornada Completa: $149 (27% desconto)\n→ Todos os Nos incluidos!\"\n\nSlide 5 (CTA): Fundo #3d3630, texto #c9b896\n\"Comeca pelo teste gratuito.\nOu pelo Espelho da Ilusao.\nPayPal, M-Pesa ou Millenium BIM.\nseteveus.space/comprar\"",
          caption: "Quanto custa escolher-te?\n\nEspelho da Ilusao: $29 USD (1.885 MZN)\nNo da Heranca: $12 USD (780 MZN)\nPack 3 Espelhos: $69 (Nos incluidos!)\nJornada Completa: $149\n\nAcesso vitalicio. Sem subscricoes.\nPayPal, M-Pesa ou Millenium BIM.\n\nseteveus.space/comprar\n\n#OsSeteVeus #Precos #Autoconhecimento",
        },
        {
          platform: "whatsapp",
          type: "Status + Broadcast",
          visual: {
            bg: "#3d3630", text: "#c9b896", accent: "#f7f5f0", format: "vertical",
            title: "Espelho da Ilusao\n$29 USD\n1.885 MZN",
            body: "Acesso vitalicio.\nSem subscricoes.",
            footer: "seteveus.space/comprar",
          },
          broadcast: "Sabes quanto custa escolher-te?\n\nEspelho da Ilusao: $29 USD (1.885 MZN)\nNo da Heranca: $12 USD (780 MZN)\n\nAcesso vitalicio. Sem subscricoes.\nPayPal, M-Pesa ou Millenium BIM.\n\nComeca por aqui:\nseteveus.space/comprar\n\n~ Vivianne",
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
            title: "Sabias que\na comunidade Ecos\ne completamente\nanonima?",
            body: "Quatro salas. Tudo impermanente.\nIncluida com qualquer experiencia.",
            footer: "seteveus.space/comunidade",
          },
          notes: "Story 1: \"Sabias que a comunidade Ecos e completamente anonima?\"\nStory 2: Print de seteveus.space/comunidade\nStory 3: \"Incluida com qualquer experiencia de leitura. seteveus.space\"",
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
      theme: "Reflexao + preparacao",
      slots: [
        {
          platform: "instagram",
          type: "Post Feed (citacao dominical)",
          visual: {
            bg: "#f7f5f0", text: "#3d3630", accent: "#7a8c6e", format: "square",
            title: "Nao precisas\nde estar pronta.\nPrecisas apenas\nde estar disposta.",
            body: "",
            footer: "Os Sete Veus ~ seteveus.space",
          },
          caption: "Nao precisas de estar pronta. Precisas apenas de estar disposta.\n\nseteveus.space\n\n#OsSeteVeus #Reflexao #Domingo #Autoconhecimento",
        },
        {
          platform: "ambos",
          type: "Planear semana 7",
          notes: "Rever metricas. Preparar conteudo da campanha Medo. Gravar reels se possivel.",
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
          notes: "ROTEIRO DO REEL:\n\n(0-3s) Ecra escuro. Texto branco aparece: \"Sabes o que queres.\"\n(3-5s) \"Mas o medo...\"\n(5-8s) \"...decide antes de ti.\"\n(8-10s) Pausa. Cor muda para #8b9b8e (verde-acinzentado do veu do Medo)\n(10-13s) \"O Espelho do Medo.\"\n(13-15s) \"Marco 2026. seteveus.space\"\n\nMUSICA: Tensao subtil que resolve em calma\nEFEITO: Texto aparece com glitch suave ou typewriter",
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
          broadcast: "Tenho uma novidade para ti.\n\nO segundo espelho esta quase pronto.\n\nO Espelho do Medo chega em Marco de 2026. A historia de quem sabe o que quer mas deixa o medo decidir por si.\n\nSe quiseres ser das primeiras a ler:\nseteveus.space/experiencias\n\n~ Vivianne",
        },
      ],
    },
    {
      day: "Terca-feira",
      dayShort: "Ter",
      theme: "Carrossel — Os 7 veus explicados",
      slots: [
        {
          platform: "instagram",
          type: "Carrossel (9 slides)",
          visual: {
            bg: "#f7f5f0", text: "#3d3630", accent: "#c9b896", format: "square",
            title: "Os 7 Veus\ndo Despertar",
            body: "Cada veu esconde algo.\nQual e o teu?",
            footer: "Swipe ~",
          },
          notes: "SLIDES DO CARROSSEL (um veu por slide):\n\nSlide 1 (capa): Fundo #f7f5f0\n\"Os 7 Veus do Despertar. Qual e o teu?\"\n\nSlide 2: Fundo #c9b896 (dourado)\n\"1. Ilusao\nA vida que tens foi escolhida por ti?\nEspelho da Ilusao — Disponivel agora\"\n\nSlide 3: Fundo #8b9b8e (verde-cinza)\n\"2. Medo\nSabes o que queres mas o medo decide.\nEspelho do Medo — Marco 2026\"\n\nSlide 4: Fundo #b39b7d (terra)\n\"3. Culpa\nA culpa que te prende a escolhas que nao sao tuas.\nEspelho da Culpa — Abril 2026\"\n\nSlide 5: Fundo #a09088 (rosa-terra)\n\"4. Identidade\nQuem es tu sem a mascara?\nEspelho da Identidade — Maio 2026\"\n\nSlide 6: Fundo #7a8c6e (verde-musgo)\n\"5. Controlo\nO controlo que isola quem mais amas.\nEspelho do Controlo — Junho 2026\"\n\nSlide 7: Fundo #b08d8d (rosa-antigo)\n\"6. Desejo\nO desejo que esvazia em vez de preencher.\nEspelho do Desejo — Julho 2026\"\n\nSlide 8: Fundo #8c9bab (azul-acinzentado)\n\"7. Separacao\nA separacao que reinventa o lar.\nEspelho da Separacao — Agosto 2026\"\n\nSlide 9 (CTA): Fundo #3d3630, texto #c9b896\n\"Descobre qual veu te esconde.\nTeste gratuito: seteveus.space/recursos/teste\"",
          caption: "Os 7 Veus do Despertar:\n\n1. Ilusao — Disponivel agora\n2. Medo — Marco 2026\n3. Culpa — Abril 2026\n4. Identidade — Maio 2026\n5. Controlo — Junho 2026\n6. Desejo — Julho 2026\n7. Separacao — Agosto 2026\n\nQual e o teu? Descobre:\nseteveus.space/recursos/teste\n\n#OsSeteVeus #7Veus #Autoconhecimento #Carrossel",
        },
      ],
    },
    {
      day: "Quarta-feira",
      dayShort: "Qua",
      theme: "Post visual — Citacao do Medo",
      slots: [
        {
          platform: "instagram",
          type: "Post Feed (imagem com citacao)",
          visual: {
            bg: "#8b9b8e", text: "#f7f5f0", accent: "#ebe7df", format: "square",
            title: "O primeiro passo\nnao precisa\nde ser grande.\n\nPrecisa apenas\nde ser teu.",
            body: "",
            footer: "O Espelho do Medo ~ seteveus.space",
          },
          caption: "\"O primeiro passo nao precisa de ser grande. Precisa apenas de ser teu.\"\n\n-- O Espelho do Medo (Marco 2026)\n\nseteveus.space/experiencias\n\n#OsSeteVeus #EspelhoDoMedo #Citacao #Medo #Coragem",
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
            title: "Antes de ler:\n\"Esta tudo bem.\"\n\nDepois de ler:\n\"Estava tudo\na fingir.\"",
            body: "",
            footer: "O Espelho da Ilusao",
          },
          notes: "ROTEIRO DO REEL:\n\n(0-5s) Split screen ou transicao:\nLADO ESQUERDO / ANTES: Texto cinza sobre fundo claro\n\"Antes de ler o Espelho da Ilusao:\"\n\"Esta tudo bem comigo.\"\n\n(5-10s) Transicao dramatica (zoom ou glitch)\n\n(10-15s) LADO DIREITO / DEPOIS: Texto dourado sobre fundo escuro\n\"Depois de ler:\"\n\"Estava tudo a fingir.\"\n\n(15-20s) Logo + \"O Espelho da Ilusao. Uma experiencia que muda a forma como te ves.\"\nseteveus.space\n\nMUSICA: Transicao de algo casual para algo profundo\nEFEITO: Mudanca de cor/humor dramatica",
          caption: "Antes: \"Esta tudo bem.\"\nDepois: \"Estava tudo a fingir.\"\n\nO Espelho da Ilusao muda a forma como te ves.\n\nseteveus.space/experiencias\n\n#OsSeteVeus #AntesEDepois #Reel #Transformacao #EspelhoDaIlusao",
        },
      ],
    },
    {
      day: "Sexta-feira",
      dayShort: "Sex",
      theme: "Post visual — Livro fisico + digital",
      slots: [
        {
          platform: "instagram",
          type: "Post Feed (composicao visual)",
          visual: {
            bg: "#ebe7df", text: "#3d3630", accent: "#c9b896", format: "square",
            title: "Dois caminhos.\nA mesma jornada.",
            body: "Livro fisico: Os 7 Veus do Despertar\n232 paginas — $23 USD\n\nPlataforma digital: Espelho da Ilusao\n7 capitulos imersivos — $29 USD\n\nLeitores do livro fisico\ntem acesso digital gratuito.",
            footer: "seteveus.space/comprar",
            highlight: "Fisico + Digital",
          },
          notes: "DESIGN: Composicao com foto do livro fisico ao lado de print do telemovel com a plataforma. Se nao tiver foto profissional, usar mockup.\n\nFOTO NECESSARIA: Livro fisico numa mesa bonita (ou mockup)",
          caption: "Dois caminhos. A mesma jornada.\n\nLivro fisico: Os 7 Veus do Despertar (232 paginas, $23 USD)\nPlataforma digital: Espelho da Ilusao (7 capitulos imersivos, $29 USD)\n\nLeitores do livro fisico tem acesso digital gratuito.\n\nseteveus.space/comprar\n\n#OsSeteVeus #LivroFisico #PlataformaDigital #Autoconhecimento",
        },
        {
          platform: "whatsapp",
          type: "Broadcast",
          broadcast: "Sabias que se tens o livro fisico Os 7 Veus do Despertar, tens acesso gratuito a plataforma digital?\n\nRegistar: seteveus.space/acesso-digital\n\n~ Vivianne",
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
          notes: "Story com sticker de Quiz:\n\"O que te impede mais?\"\nA) O medo do que vao pensar\nB) A culpa de querer mais\nC) Nao saber quem sou\nD) O habito de controlar tudo\n\nSegundo story: \"Cada resposta e um veu. Descobre o teu: seteveus.space/recursos/teste\"",
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
          notes: "Story de bastidores: partilhar algo sobre a escrita do novo espelho. Foto do caderno, notas, ou simplesmente texto bonito sobre fundo.\n\"O Espelho do Medo ja tem nome e rosto. Rui e Ana. O que o medo calou entre eles.\"",
        },
        {
          platform: "ambos",
          type: "Planear semana 8",
          notes: "Rever metricas. Identificar top posts. Preparar conteudo da semana 8.",
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
          type: "Reel (texto + musica 15s)",
          visual: {
            bg: "#f7f5f0", text: "#3d3630", accent: "#c9b896", format: "vertical",
            title: "E se tudo o que\nacreditas sobre ti\nfoi escolhido\npor outra pessoa?",
            body: "",
            footer: "seteveus.space",
          },
          notes: "ROTEIRO DO REEL:\n\n(0-5s) Fundo claro. Pergunta aparece palavra a palavra:\n\"E se tudo o que acreditas sobre ti...\"\n(5-8s) \"...foi escolhido por outra pessoa?\"\n(8-12s) Pausa. Depois: \"Ha 7 veus entre ti e a verdade.\"\n(12-15s) Logo + seteveus.space/recursos/teste\n\nMUSICA: Algo que cresce em intensidade\nEFEITO: Texto em typewriter ou kinetic typography",
          caption: "E se tudo o que acreditas sobre ti foi escolhido por outra pessoa?\n\nHa 7 veus entre ti e a verdade.\n\nDescobre qual te esconde:\nseteveus.space/recursos/teste\n\n#OsSeteVeus #Reel #Pergunta #Autoconhecimento #Despertar",
        },
        {
          platform: "whatsapp",
          type: "Status",
          visual: {
            bg: "#f7f5f0", text: "#3d3630", accent: "#c9b896", format: "vertical",
            title: "E se tudo o que\nacreditas sobre ti\nfoi escolhido\npor outra pessoa?",
            body: "Ha 7 veus entre ti\ne a verdade.",
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
          notes: "SLIDES DO CARROSSEL:\n\nSlide 1 (capa): Fundo #3d3630, texto #c9b896\n\"5 coisas que ninguem te diz sobre autoconhecimento\"\n\nSlide 2: Fundo #f7f5f0\n\"1. Nao e um destino. E um processo que nunca acaba.\"\n\nSlide 3: Fundo #ebe7df\n\"2. Vai doer. E isso e sinal de que esta a funcionar.\"\n\nSlide 4: Fundo #f7f5f0\n\"3. Nao precisas de um retiro de 10 dias. Precisas de 10 minutos honestos.\"\n\nSlide 5: Fundo #ebe7df\n\"4. O que descobres sobre ti pode assustar-te. E esta tudo bem.\"\n\nSlide 6: Fundo #f7f5f0\n\"5. A maioria das pessoas desiste no momento em que finalmente ia mudar.\"\n\nSlide 7 (CTA): Fundo #3d3630, texto #c9b896\n\"Nao desistas de ti.\nComeca aqui: seteveus.space/recursos/teste\"",
          caption: "5 coisas que ninguem te diz sobre autoconhecimento:\n\n1. Nao e um destino\n2. Vai doer\n3. 10 minutos honestos bastam\n4. Pode assustar-te\n5. A maioria desiste antes de mudar\n\nNao desistas de ti.\nseteveus.space/recursos/teste\n\n#OsSeteVeus #Autoconhecimento #Carrossel #DesenvolvimentoPessoal",
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
      theme: "Post visual — Citacao forte",
      slots: [
        {
          platform: "instagram",
          type: "Post Feed (citacao)",
          visual: {
            bg: "#3d3630", text: "#c9b896", accent: "#f7f5f0", format: "square",
            title: "O veu nao cai.\nTu e que\ndecides tira-lo.",
            body: "",
            footer: "Os Sete Veus ~ seteveus.space",
          },
          caption: "\"O veu nao cai. Tu e que decides tira-lo.\"\n\nseteveus.space\n\n#OsSeteVeus #Citacao #Despertar #Coragem #Autoconhecimento",
        },
        {
          platform: "whatsapp",
          type: "Status",
          visual: {
            bg: "#3d3630", text: "#c9b896", accent: "#f7f5f0", format: "vertical",
            title: "O veu nao cai.\nTu e que\ndecides tira-lo.",
            body: "",
            footer: "Os Sete Veus",
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
          notes: "ROTEIRO DO REEL (screen recording):\n\n(0-3s) Texto: \"Ha um espaco onde as vozes se encontram.\"\n(3-8s) Screen recording: abrir seteveus.space/comunidade no telemovel\n(8-12s) Mostrar as 4 salas: Ecos, Mare, Circulo, Fogueira\n(12-16s) Clicar numa sala, mostrar os posts anonimos\n(16-18s) Texto overlay: \"Tudo anonimo. Tudo impermanente.\"\n(18-20s) \"Incluida com qualquer experiencia.\" + seteveus.space\n\nPRINTS/GRAVACAO NECESSARIA:\n- Screen recording de seteveus.space/comunidade no telemovel\n- Mostrar navegacao entre salas",
          caption: "Onde as vozes se encontram.\n\nA comunidade Ecos: 4 salas, tudo anonimo, tudo impermanente.\n\nIncluida com qualquer experiencia de leitura.\n\nseteveus.space/comunidade\n\n#OsSeteVeus #ComunidadeEcos #Reel #Anonimato",
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
          notes: "SLIDES DO CARROSSEL:\n\nSlide 1 (capa): \"Perguntas que nos fazem sempre\"\n\nSlide 2: \"E um livro?\"\n\"Nao. E uma experiencia de leitura imersiva com ficcao, respiracao guiada, diario e espelho pessoal.\"\n\nSlide 3: \"Preciso ler por ordem?\"\n\"Sim. Os capitulos desbloqueiam sequencialmente. Cada um prepara o proximo.\"\n\nSlide 4: \"Como pago em Mocambique?\"\n\"M-Pesa ou Millenium BIM. Envias o comprovativo e confirmamos em 24h.\"\n\nSlide 5: \"Tenho o livro fisico. Tenho acesso?\"\n\"Sim! Regista em seteveus.space/acesso-digital e recebe o codigo.\"\n\nSlide 6 (CTA): Fundo #3d3630\n\"Mais perguntas? Fala connosco no chatbot da plataforma.\nseteveus.space\"",
          caption: "As perguntas que nos fazem sempre:\n\nE um livro? Nao, e uma experiencia.\nPreciso ler por ordem? Sim.\nComo pago em Mocambique? M-Pesa ou BIM.\nTenho o livro fisico, tenho acesso? Sim!\n\nMais perguntas? seteveus.space\n\n#OsSeteVeus #FAQ #Perguntas #Autoconhecimento",
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
            title: "Faz-me uma pergunta\nsobre Os Sete Veus.",
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
            title: "Ha um espaco\nonde podes\nser quem es.\n\nSem pressa.\nSem mascara.\nSem julgamento.",
            body: "",
            footer: "Os Sete Veus ~ seteveus.space",
          },
          caption: "Ha um espaco onde podes ser quem es.\n\nSem pressa. Sem mascara. Sem julgamento.\n\nseteveus.space\n\n#OsSeteVeus #EspacoSeguro #Autoconhecimento #Domingo",
        },
        {
          platform: "ambos",
          type: "Planear proximo ciclo",
          notes: "Rever todas as metricas das 8 semanas.\nIdentificar top 5 posts por engagement.\nReciclar conteudos que funcionaram com variacoes.\nPreparar conteudo para lancamento do Espelho do Medo.",
        },
      ],
    },
  ],
};

// ─── SEMANA ESPECIAL: CAMPANHA ONBOARDING — PEDE O TEU CODIGO ────────────────

const weekOnboarding: WeekPlan = {
  weekNumber: 9,
  title: "Campanha Onboarding ~ Pede o teu codigo",
  subtitle: "Para quem ja tem o livro fisico: pedir o codigo digital gratuito",
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
            title: "Ja tens o livro fisico?",
            body: "Agora existe uma\nexperiencia digital\nque complementa\na tua leitura.\n\nO acesso e gratuito.\nPede o teu codigo.",
            footer: "seteveus.space/pedir-codigo",
          },
          caption: "O livro que tens nas maos agora tem uma dimensao digital.\n\nSe ja compraste \"Os 7 Veus do Despertar\", tens direito a acesso gratuito a experiencia digital — leitura interactiva, diario reflexivo e comunidade.\n\nLink na bio para pedires o teu codigo.\n\n#OsSeteVeus #AcessoDigital #LivroFisico #Autoconhecimento",
          broadcast: "Ja tens o livro fisico \"Os 7 Veus do Despertar\"?\n\nAgora existe uma experiencia digital que complementa a tua leitura — com diario reflexivo, comunidade anonima e conteudo exclusivo.\n\nE o melhor: se ja compraste o livro, o acesso e gratuito.\n\nPede o teu codigo aqui: seteveus.space/pedir-codigo\n\nDemora menos de 2 minutos. Recebes o codigo em ate 24h.\n\n— Vivianne",
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
            { bg: "#3d3630", text: "#f7f5f0", accent: "#c9b896", title: "Compraste\no livro fisico?", body: "", footer: "Os Sete Veus do Despertar" },
            { bg: "#f7f5f0", text: "#3d3630", accent: "#c9b896", title: "Tens direito\nao acesso digital\ngratuito.", body: "Tudo o que o livro\nte deu no papel,\nagora vives no ecra.", footer: "" },
            { bg: "#3d3630", text: "#f7f5f0", accent: "#7a8c6e", title: "Preenche o formulario.", body: "2 minutos.\nNome, email e\n(se quiseres)\numa foto do livro.", footer: "seteveus.space/pedir-codigo" },
            { bg: "#f7f5f0", text: "#3d3630", accent: "#c9b896", title: "Recebes o codigo\nem ate 24h.", body: "No teu email.\nPessoal. Intransmissivel.", footer: "" },
            { bg: "#7a8c6e", text: "#f7f5f0", accent: "#ebe7df", title: "O que ganhas:", body: "Leitura interactiva\nDiario reflexivo\nRespiracao guiada\nComunidade anonima\nChatbot de apoio 24/7", footer: "seteveus.space/pedir-codigo" },
          ],
          caption: "5 passos simples. Se ja tens o livro fisico, o acesso digital e teu por direito.\n\n1. Compraste o livro? Tens direito ao acesso digital gratuito.\n2. Preenche o formulario (2 minutos).\n3. Recebes o codigo em ate 24h.\n4. O que ganhas: leitura interactiva, diario reflexivo, comunidade.\n\nLink na bio.\n\n#OsSeteVeus #AcessoDigital #LivroFisico #Autoconhecimento",
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
          broadcast: "Uma coisa que talvez nao saibas:\n\nO livro fisico \"Os 7 Veus do Despertar\" tem uma extensao digital.\n\nNao e uma copia — e uma experiencia diferente. Podes escrever reflexoes a medida que les, guardar pensamentos por capitulo, e participar numa comunidade anonima de leitoras que tambem estao a atravessar os veus.\n\nSe tens o livro, pede o teu codigo: seteveus.space/pedir-codigo\n\nE gratuito. E pessoal. E teu.\n\n— Vivianne",
        },
      ],
    },
    {
      day: "Sexta-feira",
      dayShort: "Sex",
      theme: "Visual — papel ao ecra",
      slots: [
        {
          platform: "instagram",
          type: "Post Feed / Story",
          visual: {
            bg: "#ebe7df", text: "#3d3630", accent: "#c9b896", format: "square",
            title: "Do papel ao ecra.",
            body: "A mesma essencia,\numa nova forma\nde viver.",
            footer: "seteveus.space/pedir-codigo",
            highlight: "Livro fisico + digital",
          },
          caption: "Cada veu que cai no papel pode agora ecoar no digital.\n\nSe ja tens o livro, pede o teu acesso gratuito. Link na bio.\n\n#OsSeteVeus #DoPapelAoDigital #LeituraTransformadora #Autoconhecimento",
          notes: "Conceito visual: foto do livro fisico lado a lado com ecra do telemovel mostrando a versao digital.\nSe nao tiveres foto profissional, usa o Gerador Livre com o print 'livro fisico' como fundo.",
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
          broadcast: "Antes do fim de semana:\n\nSe compraste \"Os 7 Veus do Despertar\" e ainda nao pediste o teu codigo digital — este e o momento.\n\nSo precisas de nome, email e (se quiseres) uma foto do livro.\n\nseteveus.space/pedir-codigo\n\nBom fim de semana. Que o silencio te encontre.\n\n— Vivianne",
        },
        {
          platform: "instagram",
          type: "Story",
          visual: {
            bg: "#3d3630", text: "#f7f5f0", accent: "#c9b896", format: "vertical",
            title: "Ultimo lembrete\ndesta semana.",
            body: "Se tens o livro fisico\ne ainda nao pediste\no teu codigo digital:\n\neste e o momento.",
            footer: "seteveus.space/pedir-codigo",
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
          notes: "Responder a todas as mensagens recebidas durante a semana.\nSe alguem perguntou como pedir o codigo, enviar link directo: seteveus.space/pedir-codigo\nSe alguem enviou comprovativo, aprovar o codigo no painel admin.",
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
    title: "O que sao Os Sete Veus?",
    description: "Carrossel educativo para quem nao conhece o projecto. Ideal para primeiro contacto.",
    slides: [
      { bg: "#3d3630", text: "#f7f5f0", accent: "#c9b896", title: "Ja sentiste que a vida\nque tens nao foi\na que escolheste?", body: "", footer: "" },
      { bg: "#f7f5f0", text: "#3d3630", accent: "#c9b896", title: "Os Sete Veus\ndo Despertar", body: "Sao 7 historias de ficcao\nonde te reconheces.\n\nCada historia revela\num veu que usas\nsem saber.", footer: "" },
      { bg: "#3d3630", text: "#f7f5f0", accent: "#7a8c6e", title: "Nao e um livro.\nE uma experiencia.", body: "Les. Respiras.\nReflectes. Escreves.\n\nCada capitulo tem pausas\nde respiracao guiada\ne um diario pessoal.", footer: "" },
      { bg: "#f7f5f0", text: "#3d3630", accent: "#c9b896", title: "Os 7 Veus:", body: "1. Ilusao — a vida que nao escolheste\n2. Medo — o que nao fazes por medo\n3. Culpa — o castigo de quereres mais\n4. Identidade — a mascara que usas\n5. Controlo — o que seguras a mais\n6. Desejo — o que procuras fora\n7. Separacao — o que separa de ti", footer: "" },
      { bg: "#7a8c6e", text: "#f7f5f0", accent: "#ebe7df", title: "Comeca pelo teste\ngratuito.", body: "3 minutos.\n7 perguntas.\nDescobre qual veu\nte esconde.", footer: "seteveus.space/recursos/teste" },
    ],
    caption: "Ja sentiste que a vida que tens nao foi a que escolheste?\n\nOs Sete Veus do Despertar sao 7 historias de ficcao onde te reconheces. Cada historia revela um veu que usas sem saber.\n\nNao e um livro. E uma experiencia: les, respiras, reflectes, escreves.\n\nComeca pelo teste gratuito (3 min):\nseteveus.space/recursos/teste\n\n#OsSeteVeus #Autoconhecimento #FiccaoPsicologica #DesenvolvimentoPessoal #LeituraTransformadora",
    canvaSpecs: {
      dimensions: "1080x1080px (quadrado)",
      fonts: "Titulo: Playfair Display / Corpo: Inter ou Lato",
      colorPalette: ["#3d3630", "#f7f5f0", "#c9b896", "#7a8c6e", "#ebe7df"],
    },
  },
  {
    id: "carousel-espelho-ilusao",
    title: "O Espelho da Ilusao — 5 citacoes",
    description: "Carrossel de citacoes reais do livro. Cada slide e uma citacao que para o scroll.",
    slides: [
      { bg: "#3d3630", text: "#c9b896", accent: "#f7f5f0", title: "5 frases que mudam\na forma como te ves.", body: "", footer: "O Espelho da Ilusao" },
      { bg: "#f7f5f0", text: "#3d3630", accent: "#c9b896", title: "\"Quando foi que\nescolhi tomar cafe\nem vez de cha?\"", body: "Uma pergunta absurda\nque muda tudo.", footer: "" },
      { bg: "#3d3630", text: "#f7f5f0", accent: "#c9b896", title: "\"Via, mas nao sentia.\nRegistava, mas nao\nparticipava.\"", body: "Como quem assiste\na um espectaculo\npor tras de uma\njanela fechada.", footer: "" },
      { bg: "#ebe7df", text: "#3d3630", accent: "#c9b896", title: "\"Nao era que nao\ntivesse opiniao.\nEra que a sua primeira\nreaccao nunca era\no que verdadeiramente\npensava.\"", body: "", footer: "" },
      { bg: "#3d3630", text: "#f7f5f0", accent: "#c9b896", title: "\"Perguntar,\nmesmo tarde,\ne o primeiro gesto\nde se escolher.\"", body: "", footer: "seteveus.space" },
    ],
    caption: "5 frases d'O Espelho da Ilusao que mudam a forma como te ves.\n\nGuarda esta publicacao. Volta quando precisares.\n\nseteveus.space/comprar/espelhos\n\n#OsSeteVeus #EspelhoDaIlusao #CitacoesLiterarias #FiccaoPsicologica #Autoconhecimento",
    canvaSpecs: {
      dimensions: "1080x1080px (quadrado)",
      fonts: "Citacoes: Playfair Display Italic / Fonte: Inter Light",
      colorPalette: ["#3d3630", "#f7f5f0", "#c9b896", "#ebe7df"],
    },
  },
  {
    id: "carousel-experiencia-vs-livro",
    title: "Livro vs Experiencia — o que nos somos",
    description: "Carrossel comparativo que mostra a diferenca entre um livro normal e a experiencia imersiva.",
    slides: [
      { bg: "#3d3630", text: "#f7f5f0", accent: "#c9b896", title: "Isto nao e um livro.", body: "", footer: "" },
      { bg: "#f7f5f0", text: "#3d3630", accent: "#7a8c6e", title: "Um livro normal:", body: "Les do inicio ao fim.\nFechas.\nPassas ao proximo.", footer: "" },
      { bg: "#3d3630", text: "#f7f5f0", accent: "#c9b896", title: "A nossa experiencia:", body: "Les um capitulo.\nRespiras.\nEscreves no teu diario.\nSentes.\nSo depois avanças.", footer: "" },
      { bg: "#f7f5f0", text: "#3d3630", accent: "#7a8c6e", title: "Incluido:", body: "7 capitulos de ficcao\nRespiração guiada\nDiario de reflexao\nComunidade anonima\nChatbot de apoio 24/7", footer: "" },
      { bg: "#7a8c6e", text: "#f7f5f0", accent: "#ebe7df", title: "$29 USD / 1.885 MZN\nAcesso vitalicio.", body: "Comeca hoje.", footer: "seteveus.space/comprar/espelhos" },
    ],
    caption: "Isto nao e um livro. E uma experiencia.\n\nA diferenca? Num livro les e fechas. Na nossa experiencia, les, respiras, escreves, sentes — e so depois avancas.\n\nInclui:\n— 7 capitulos de ficcao\n— Respiracao guiada\n— Diario de reflexao\n— Comunidade anonima\n— Chatbot de apoio\n\n$29 USD / 1.885 MZN. Acesso vitalicio.\n\nseteveus.space/comprar/espelhos\n\n#OsSeteVeus #ExperienciaImersiva #LeituraTransformadora",
    canvaSpecs: {
      dimensions: "1080x1080px (quadrado)",
      fonts: "Titulo: Playfair Display Bold / Corpo: Inter",
      colorPalette: ["#3d3630", "#f7f5f0", "#c9b896", "#7a8c6e"],
    },
  },
  {
    id: "carousel-funil-livro-fisico",
    title: "Tens o livro fisico? Descobre o que mais te espera",
    description: "Carrossel para o funil do livro fisico. Mostra o valor do acesso digital gratuito.",
    slides: [
      { bg: "#ebe7df", text: "#3d3630", accent: "#c9b896", title: "Tens Os 7 Veus\ndo Despertar?", body: "O teu livro\nabre portas\nque ainda nao conheces.", footer: "" },
      { bg: "#3d3630", text: "#f7f5f0", accent: "#c9b896", title: "O que ganhas\ncom o acesso digital:", body: "", footer: "" },
      { bg: "#f7f5f0", text: "#3d3630", accent: "#7a8c6e", title: "1. Leitura integrada", body: "O Espelho da Ilusao com\npausas de reflexao,\nrespiracao guiada e\ndiario pessoal.\n\nUma experiencia diferente\nde ler um livro.", footer: "" },
      { bg: "#f7f5f0", text: "#3d3630", accent: "#c9b896", title: "2. Comunidade anonima", body: "Ecos: um espaco onde\nas vozes se encontram.\nReflex\u00f5es partilhadas.\nTudo impermanente.", footer: "" },
      { bg: "#f7f5f0", text: "#3d3630", accent: "#c9b896", title: "3. Novos espelhos\na precos exclusivos", body: "A medida que novos\nEspelhos sao publicados,\nrecebes acesso prioritario\ne desconto como leitor.", footer: "" },
      { bg: "#c9b896", text: "#3d3630", accent: "#f7f5f0", title: "Gratuito.\nSem compromisso.", body: "Pede o teu codigo\nem menos de 1 minuto.", footer: "seteveus.space/acesso-digital" },
    ],
    caption: "Tens o livro fisico Os 7 Veus do Despertar?\n\nO teu livro abre portas que ainda nao conheces:\n\n— Leitura integrada com pausas de reflexao\n— Diario pessoal e respiracao guiada\n— Comunidade anonima\n— Acesso prioritario a novos Espelhos\n\nTudo gratuito. Sem compromisso.\nPede o teu codigo em menos de 1 minuto:\nseteveus.space/acesso-digital\n\n#OsSeteVeus #LivroFisico #AcessoDigital #Autoconhecimento",
    canvaSpecs: {
      dimensions: "1080x1080px (quadrado)",
      fonts: "Titulo: Playfair Display / Corpo: Inter",
      colorPalette: ["#ebe7df", "#3d3630", "#c9b896", "#7a8c6e", "#f7f5f0"],
    },
  },
  {
    id: "carousel-7-veus-resumo",
    title: "Os 7 Veus — um por um",
    description: "Carrossel educativo. Cada slide apresenta um veu com frase-chave. Altamente guardavel.",
    slides: [
      { bg: "#3d3630", text: "#c9b896", accent: "#f7f5f0", title: "Os 7 Veus\nque te escondem\nde ti mesma.", body: "", footer: "Guarda esta publicacao." },
      { bg: "#c9b896", text: "#3d3630", accent: "#f7f5f0", title: "1. Ilusao", body: "A vida que construiste\nsem perguntar\nse era a que querias.", footer: "" },
      { bg: "#8b9b8e", text: "#f7f5f0", accent: "#ebe7df", title: "2. Medo", body: "Sabes o que queres.\nMas o medo\ndecide antes de ti.", footer: "" },
      { bg: "#c97070", text: "#f7f5f0", accent: "#ebe7df", title: "3. Culpa", body: "Castigas-te\npor quereres mais.\nComo se merecesses\nmenos.", footer: "" },
      { bg: "#7a7a9e", text: "#f7f5f0", accent: "#ebe7df", title: "4. Identidade", body: "Usas uma mascara\nha tanto tempo\nque esqueceste\no rosto.", footer: "" },
      { bg: "#5a7a8a", text: "#f7f5f0", accent: "#ebe7df", title: "5. Controlo", body: "Seguras tudo.\nControlas tudo.\nE perdes tudo\no que nao se deixa\nprender.", footer: "" },
      { bg: "#8a6a7a", text: "#f7f5f0", accent: "#ebe7df", title: "6. Desejo", body: "Procuras fora\no que so existe\ndentro.", footer: "" },
      { bg: "#6a6a6a", text: "#f7f5f0", accent: "#c9b896", title: "7. Separacao", body: "Separas-te de ti\npara pertencer\nao mundo.", footer: "" },
      { bg: "#3d3630", text: "#f7f5f0", accent: "#c9b896", title: "Qual veu\nte esconde?", body: "Descobre em 3 minutos.", footer: "seteveus.space/recursos/teste" },
    ],
    caption: "Os 7 veus que te escondem de ti mesma:\n\n1. Ilusao — a vida que nao escolheste\n2. Medo — o que nao fazes por medo\n3. Culpa — o castigo de quereres mais\n4. Identidade — a mascara que usas\n5. Controlo — o que seguras a mais\n6. Desejo — o que procuras fora\n7. Separacao — o que te separa de ti\n\nQual veu te esconde? Descobre em 3 min:\nseteveus.space/recursos/teste\n\nGuarda esta publicacao para voltares quando precisares.\n\n#OsSeteVeus #Os7Veus #Autoconhecimento #DesenvolvimentoPessoal #TransformacaoPessoal",
    canvaSpecs: {
      dimensions: "1080x1080px (quadrado)",
      fonts: "Titulo: Playfair Display Bold / Subtitulo: Inter Light",
      colorPalette: ["#3d3630", "#c9b896", "#8b9b8e", "#c97070", "#7a7a9e", "#5a7a8a", "#8a6a7a"],
    },
  },
  {
    id: "carousel-como-funciona",
    title: "Como funciona a experiencia digital",
    description: "Passo a passo visual. Ideal para quem nao percebe o que e a plataforma.",
    slides: [
      { bg: "#3d3630", text: "#f7f5f0", accent: "#c9b896", title: "Como funciona\na experiencia?", body: "3 passos simples.\nLes. Sentes. Avanças.", footer: "seteveus.space" },
      { bg: "#f7f5f0", text: "#3d3630", accent: "#7a8c6e", title: "1. Escolhe o teu\nprimeiro Espelho", body: "O Espelho da Ilusao\nja esta disponivel.\n\n7 capitulos de ficcao\nonde a Sara descobre\nque a vida que tem\nnao e a que escolheu.", footer: "" },
      { bg: "#3d3630", text: "#f7f5f0", accent: "#c9b896", title: "2. Le ao teu ritmo", body: "Cada capitulo tem:\n\n~ Narrativa imersiva\n~ Pausa de respiracao\n~ Reflexao guiada\n~ Diario pessoal\n~ Checklist de despertar", footer: "" },
      { bg: "#f7f5f0", text: "#3d3630", accent: "#7a8c6e", title: "3. Desbloqueia\no que vem a seguir", body: "Ao completar o Espelho,\ndesbloqueias o No:\numa segunda historia\nque so faz sentido\ndepois de viveres a primeira.", footer: "" },
      { bg: "#ebe7df", text: "#3d3630", accent: "#c9b896", title: "Bonus:", body: "Comunidade anonima\nonde partilhas reflexoes\nsem julgamento.\n\nChatbot de apoio 24/7\ncom a voz da autora.", footer: "" },
      { bg: "#7a8c6e", text: "#f7f5f0", accent: "#ebe7df", title: "Comeca hoje.\n$29 USD / 1.885 MZN", body: "Acesso vitalicio.\nSem pressa. Sem prazos.", footer: "seteveus.space/comprar/espelhos" },
    ],
    caption: "Como funciona a experiencia Os Sete Veus?\n\n1. Escolhe o teu primeiro Espelho (ja disponivel)\n2. Le ao teu ritmo — cada capitulo tem reflexao, respiracao e diario\n3. Desbloqueia o que vem a seguir — historias que so fazem sentido depois de viveres a primeira\n\nBonus: comunidade anonima + chatbot de apoio 24/7\n\n$29 USD / 1.885 MZN. Acesso vitalicio.\n\nseteveus.space/comprar/espelhos\n\n#OsSeteVeus #ExperienciaDigital #LeituraTransformadora #Autoconhecimento",
    canvaSpecs: {
      dimensions: "1080x1080px (quadrado)",
      fonts: "Titulo: Playfair Display / Corpo: Inter",
      colorPalette: ["#3d3630", "#f7f5f0", "#c9b896", "#7a8c6e", "#ebe7df"],
    },
  },
  {
    id: "carousel-testemunhos",
    title: "O que dizem as leitoras",
    description: "Testemunhos reais (anonimos) da comunidade. Social proof poderoso.",
    slides: [
      { bg: "#3d3630", text: "#c9b896", accent: "#f7f5f0", title: "O que dizem\nas leitoras.", body: "", footer: "Testemunhos reais. Nomes guardados." },
      { bg: "#f7f5f0", text: "#3d3630", accent: "#c9b896", title: "\"Sai do modo\nautomatico.\nNao sei para onde vou\nmas pelo menos\nestou acordada.\"", body: "", footer: "~ leitora anonima, Veu 1" },
      { bg: "#3d3630", text: "#f7f5f0", accent: "#c9b896", title: "\"Chorei no banho.\nOutra vez.\nMas desta vez\nnao foi por tristeza.\nFoi por reconhecimento.\"", body: "", footer: "~ leitora anonima, Veu 1" },
      { bg: "#ebe7df", text: "#3d3630", accent: "#c9b896", title: "\"O meu marido\nperguntou: estas bem?\nE eu disse que sim.\nAutomaticamente.\"", body: "", footer: "~ leitora anonima, Veu 1" },
      { bg: "#f7f5f0", text: "#3d3630", accent: "#7a8c6e", title: "\"Este livro nao te\nda respostas.\nDa-te as perguntas\nque nunca fizeste.\"", body: "", footer: "~ leitora anonima" },
      { bg: "#3d3630", text: "#f7f5f0", accent: "#c9b896", title: "Reconheces-te?", body: "O Espelho da Ilusao\nesta disponivel.\n\nDescobre qual veu\nte esconde.", footer: "seteveus.space/recursos/teste" },
    ],
    caption: "O que dizem as leitoras d'Os Sete Veus.\n\nTestemunhos reais. Nomes guardados.\n\n\"Sai do modo automatico. Nao sei para onde vou mas pelo menos estou acordada.\"\n\n\"Chorei no banho. Outra vez. Mas desta vez nao foi por tristeza. Foi por reconhecimento.\"\n\nReconheces-te? Descobre qual veu te esconde:\nseteveus.space/recursos/teste\n\n#OsSeteVeus #TestemunhosReais #Autoconhecimento #FiccaoPsicologica",
    canvaSpecs: {
      dimensions: "1080x1080px (quadrado)",
      fonts: "Citacoes: Playfair Display Italic / Fonte: Inter Light",
      colorPalette: ["#3d3630", "#f7f5f0", "#c9b896", "#ebe7df"],
    },
  },
  {
    id: "carousel-mae-filha",
    title: "Sara e Helena — O No da Heranca",
    description: "Carrossel emocional sobre a relacao mae-filha. Para promover o No (readers que completaram o Espelho).",
    slides: [
      { bg: "#3d3630", text: "#c9b896", accent: "#f7f5f0", title: "Ha coisas que\numa mae nunca diz.", body: "", footer: "" },
      { bg: "#f7f5f0", text: "#3d3630", accent: "#c9b896", title: "Sara viu o veu.", body: "Percebeu que a vida\nque tinha nao era\na que tinha escolhido.\n\nMas ha um silencio\nque vem de antes dela.", footer: "" },
      { bg: "#3d3630", text: "#f7f5f0", accent: "#c9b896", title: "Helena sabia.", body: "A mae sempre soube.\nViu os mesmos sinais.\nCalou os mesmos medos.\nEsperou anos.", footer: "" },
      { bg: "#ebe7df", text: "#3d3630", accent: "#c9b896", title: "\"Agora que Sara\nacordou,\nHelena tem algo\npara lhe dizer.\"", body: "", footer: "" },
      { bg: "#3d3630", text: "#f7f5f0", accent: "#c9b896", title: "O No da Heranca", body: "A segunda historia.\nSo se desbloqueia\ndepois de completares\no Espelho da Ilusao.\n\nNao e um upsell.\nE uma continuacao\nemocional.", footer: "seteveus.space" },
    ],
    caption: "Ha coisas que uma mae nunca diz.\n\nSara viu o veu. Percebeu que a vida que tinha nao era a que tinha escolhido. Mas ha um silencio que vem de antes dela.\n\nHelena — a mae — sempre soube. Viu os mesmos sinais. Calou os mesmos medos. Esperou anos.\n\nO No da Heranca e a segunda historia. So se desbloqueia depois de completares o Espelho da Ilusao.\n\nNao e um upsell. E uma continuacao emocional.\n\nseteveus.space\n\n#OsSeteVeus #NoDaHeranca #MaeEFilha #FiccaoRelacional #Autoconhecimento",
    canvaSpecs: {
      dimensions: "1080x1080px (quadrado)",
      fonts: "Titulo: Playfair Display Italic / Corpo: Inter Light",
      colorPalette: ["#3d3630", "#f7f5f0", "#c9b896", "#ebe7df"],
    },
  },
  {
    id: "carousel-recursos-gratis",
    title: "5 recursos gratuitos para comecar",
    description: "Carrossel de valor. Mostra todos os recursos gratis disponiveis (PDFs, teste, audios).",
    slides: [
      { bg: "#7a8c6e", text: "#f7f5f0", accent: "#ebe7df", title: "5 recursos gratuitos\npara comecar\na tua jornada.", body: "", footer: "Sem compromisso. Sem email." },
      { bg: "#f7f5f0", text: "#3d3630", accent: "#7a8c6e", title: "1. Teste:\nQual veu te esconde?", body: "3 minutos. 7 perguntas.\nDescobre o veu que mais\nte influencia agora.\n\nNao da respostas —\nda perguntas.", footer: "seteveus.space/recursos/teste" },
      { bg: "#3d3630", text: "#f7f5f0", accent: "#c9b896", title: "2. As 7 Perguntas\ndo Despertar", body: "Uma pergunta por veu.\nImprime. Cola no espelho.\nLe todos os dias.", footer: "PDF gratuito" },
      { bg: "#f7f5f0", text: "#3d3630", accent: "#7a8c6e", title: "3. Diario de 7 Dias", body: "Um exercicio por dia.\nEscrito pela autora.\nPara quem quer comecar\nsem saber por onde.", footer: "PDF gratuito" },
      { bg: "#3d3630", text: "#f7f5f0", accent: "#c9b896", title: "4. Checklist\ndo Despertar", body: "Uma lista visual\ndos sinais de cada veu.\n\nReconhece onde estas.\nVe ate onde podes ir.", footer: "PDF gratuito" },
      { bg: "#ebe7df", text: "#3d3630", accent: "#7a8c6e", title: "5. Mini-guia:\nO que sao os 7 Veus?", body: "16 paginas.\nExplicacao simples.\nPara quem quer perceber\nantes de comecar.", footer: "PDF gratuito" },
      { bg: "#7a8c6e", text: "#f7f5f0", accent: "#ebe7df", title: "Tudo em\nseteveus.space/recursos", body: "Gratuito.\nSem email obrigatorio.\nSem compromisso.", footer: "seteveus.space/recursos" },
    ],
    caption: "5 recursos gratuitos para comecar a tua jornada interior:\n\n1. Teste: Qual veu te esconde? (3 min)\n2. As 7 Perguntas do Despertar (PDF)\n3. Diario de 7 Dias (PDF)\n4. Checklist do Despertar (PDF)\n5. Mini-guia: O que sao os 7 Veus? (PDF)\n\nTudo gratuito. Sem email. Sem compromisso.\n\nseteveus.space/recursos\n\nGuarda esta publicacao para quando precisares.\n\n#OsSeteVeus #RecursosGratuitos #Autoconhecimento #DesenvolvimentoPessoal #PDFGratis",
    canvaSpecs: {
      dimensions: "1080x1080px (quadrado)",
      fonts: "Titulo: Playfair Display / Corpo: Inter",
      colorPalette: ["#7a8c6e", "#f7f5f0", "#3d3630", "#c9b896", "#ebe7df"],
    },
  },
  {
    id: "carousel-comunidade-ecos",
    title: "Comunidade Ecos — o que e?",
    description: "Apresentar a comunidade anonima. Diferencial unico da plataforma.",
    slides: [
      { bg: "#3d3630", text: "#f7f5f0", accent: "#c9b896", title: "E se pudesses\npartilhar o que sentes\nsem ninguem\nsaber quem es?", body: "", footer: "" },
      { bg: "#f7f5f0", text: "#3d3630", accent: "#c9b896", title: "Comunidade Ecos", body: "Um espaco onde as vozes\nse encontram.\n\nAnonimo.\nImpermanente.\nReal.", footer: "" },
      { bg: "#3d3630", text: "#f7f5f0", accent: "#c9b896", title: "Ecos", body: "Reflexoes partilhadas\nanonimamente.\n\nNinguem sabe quem escreveu.\nTodos se reconhecem.", footer: "Expiram em 30 dias." },
      { bg: "#ebe7df", text: "#3d3630", accent: "#7a8c6e", title: "Reconhecimentos", body: "Nao ha likes.\nHa \"reconheco-me\".\n\nUm toque silencioso\nque diz:\n\"Eu tambem.\"", footer: "" },
      { bg: "#3d3630", text: "#f7f5f0", accent: "#c9b896", title: "Sussurros", body: "Mensagens de uma so via.\nMax 100 caracteres.\nExpiram em 7 dias.\n\nUm sussurro.\nNao uma conversa.", footer: "" },
      { bg: "#f7f5f0", text: "#3d3630", accent: "#c9b896", title: "Sem nomes.\nSem fotos.\nSem historico.", body: "Tudo desaparece.\nComo as folhas\nnuma corrente.", footer: "" },
      { bg: "#7a8c6e", text: "#f7f5f0", accent: "#ebe7df", title: "Entra na comunidade.", body: "Incluida com qualquer\nacesso a plataforma.", footer: "seteveus.space" },
    ],
    caption: "E se pudesses partilhar o que sentes sem ninguem saber quem es?\n\nComunidade Ecos:\n\n~ Ecos: reflexoes anonimas (expiram em 30 dias)\n~ Reconhecimentos: nao ha likes, ha \"reconheco-me\"\n~ Sussurros: mensagens de uma so via (expiram em 7 dias)\n\nSem nomes. Sem fotos. Sem historico.\nTudo desaparece. Como as folhas numa corrente.\n\nIncluida com qualquer acesso a plataforma.\nseteveus.space\n\n#OsSeteVeus #ComunidadeEcos #Anonimato #ReflexaoColectiva #Autoconhecimento",
    canvaSpecs: {
      dimensions: "1080x1080px (quadrado)",
      fonts: "Titulo: Playfair Display / Corpo: Inter",
      colorPalette: ["#3d3630", "#f7f5f0", "#c9b896", "#7a8c6e", "#ebe7df"],
    },
  },
  {
    id: "carousel-espelho-medo-coming",
    title: "O Espelho do Medo — em breve (Marco 2026)",
    description: "Teaser para o proximo lancamento. Gerar antecipacao e waitlist.",
    slides: [
      { bg: "#8b9b8e", text: "#f7f5f0", accent: "#ebe7df", title: "O segundo veu\nesta quase\na cair.", body: "", footer: "" },
      { bg: "#3d3630", text: "#f7f5f0", accent: "#8b9b8e", title: "Sabes o que queres.", body: "Mas o medo\ndecide antes de ti.\n\nSempre decidiu.", footer: "" },
      { bg: "#f7f5f0", text: "#3d3630", accent: "#8b9b8e", title: "O Espelho do Medo", body: "A historia de quem\nsabe o caminho\nmas nao da o passo.\n\nPorque o medo\ne mais rapido\nque a vontade.", footer: "Marco 2026" },
      { bg: "#8b9b8e", text: "#f7f5f0", accent: "#ebe7df", title: "\"E se falhar?\"\n\"E se me arrepender?\"\n\"E se nao resultar?\"", body: "Reconheces estas vozes?", footer: "" },
      { bg: "#3d3630", text: "#8b9b8e", accent: "#f7f5f0", title: "Marco 2026.", body: "Sai primeiro para\nquem ja esta dentro.\n\nEntra na lista de espera\ne recebe antes de todos.", footer: "seteveus.space" },
    ],
    caption: "O segundo veu esta quase a cair.\n\nO Espelho do Medo — Marco 2026.\n\nSabes o que queres. Mas o medo decide antes de ti. Sempre decidiu.\n\n\"E se falhar?\" \"E se me arrepender?\" \"E se nao resultar?\"\n\nReconheces estas vozes?\n\nSai primeiro para quem ja esta dentro da plataforma.\n\nseteveus.space\n\n#OsSeteVeus #EspelhoDoMedo #Marco2026 #ProximoLancamento #Autoconhecimento",
    canvaSpecs: {
      dimensions: "1080x1080px (quadrado)",
      fonts: "Titulo: Playfair Display / Corpo: Inter",
      colorPalette: ["#8b9b8e", "#3d3630", "#f7f5f0", "#ebe7df"],
    },
  },

  // ─── CAMPANHA: EXPERIENCIA DIGITAL — PEDE O TEU CODIGO ──────────────────────

  {
    id: "carousel-pede-codigo",
    title: "Compraste o livro? Pede o teu codigo digital",
    description: "Campanha onboarding. Para quem tem o livro fisico e quer o acesso digital gratuito.",
    slides: [
      { bg: "#3d3630", text: "#f7f5f0", accent: "#c9b896", title: "Compraste\no livro fisico?", body: "", footer: "Os 7 Veus do Despertar" },
      { bg: "#f7f5f0", text: "#3d3630", accent: "#c9b896", title: "Tens direito\nao acesso digital\ngratuito.", body: "Tudo o que o livro\nte deu no papel,\nagora vives no ecra.", footer: "" },
      { bg: "#3d3630", text: "#f7f5f0", accent: "#7a8c6e", title: "Preenche o formulario.", body: "2 minutos.\nNome, email e\n(se quiseres)\numa foto do livro.", footer: "seteveus.space/pedir-codigo" },
      { bg: "#f7f5f0", text: "#3d3630", accent: "#c9b896", title: "Recebes o codigo\nem ate 24h.", body: "No teu email.\nPessoal. Intransmissivel.", footer: "" },
      { bg: "#7a8c6e", text: "#f7f5f0", accent: "#ebe7df", title: "O que ganhas:", body: "Leitura interactiva\nDiario reflexivo\nRespiracao guiada\nComunidade anonima\nChatbot de apoio 24/7", footer: "seteveus.space/pedir-codigo" },
    ],
    caption: "5 passos simples. Se ja tens o livro fisico, o acesso digital e teu por direito.\n\n1. Compraste o livro? Tens direito ao acesso digital gratuito.\n2. Preenche o formulario (2 minutos).\n3. Recebes o codigo em ate 24h.\n4. O que ganhas: leitura interactiva, diario reflexivo, comunidade.\n\nPede aqui: seteveus.space/pedir-codigo\n\n#OsSeteVeus #AcessoDigital #LivroFisico #PedeOTeuCodigo #Autoconhecimento",
    canvaSpecs: {
      dimensions: "1080x1080px (quadrado)",
      fonts: "Titulo: Playfair Display / Corpo: Inter",
      colorPalette: ["#3d3630", "#f7f5f0", "#c9b896", "#7a8c6e", "#ebe7df"],
    },
  },
  {
    id: "carousel-do-papel-ao-digital",
    title: "Do papel ao ecra — o que muda",
    description: "Mostra as diferencas entre ter so o livro fisico e ter o acesso digital. Valor concreto.",
    slides: [
      { bg: "#ebe7df", text: "#3d3630", accent: "#c9b896", title: "Do papel ao ecra.", body: "A mesma essencia.\nUma nova forma\nde viver os veus.", footer: "" },
      { bg: "#3d3630", text: "#f7f5f0", accent: "#c9b896", title: "So o livro fisico:", body: "Les.\nFechas.\nGuardas na estante.\n\nA experiencia fica\nno papel.", footer: "" },
      { bg: "#f7f5f0", text: "#3d3630", accent: "#7a8c6e", title: "Com o acesso digital:", body: "Les.\nRespiras.\nEscreves no diario.\nPartilhas na comunidade.\n\nA experiencia fica\nem ti.", footer: "" },
      { bg: "#3d3630", text: "#f7f5f0", accent: "#c9b896", title: "Diario reflexivo", body: "Cada capitulo tem\num espaco para escreveres\no que sentiste.\n\nSo tu les.\nSo tu decides.", footer: "" },
      { bg: "#f7f5f0", text: "#3d3630", accent: "#7a8c6e", title: "Comunidade anonima", body: "Ecos: reflexoes partilhadas\nsem nome, sem foto.\n\nReconheces-te nas palavras\nde quem nunca viste.", footer: "" },
      { bg: "#3d3630", text: "#f7f5f0", accent: "#c9b896", title: "Respiracao guiada", body: "Entre capitulos,\numa pausa.\n\nNao para descansar.\nPara sentir.", footer: "" },
      { bg: "#7a8c6e", text: "#f7f5f0", accent: "#ebe7df", title: "Gratuito para quem\nja tem o livro.", body: "Pede o teu codigo\nem 2 minutos.", footer: "seteveus.space/pedir-codigo" },
    ],
    caption: "Do papel ao ecra. A mesma essencia, uma nova forma de viver.\n\nSo o livro fisico: les, fechas, guardas.\nCom o acesso digital: les, respiras, escreves, partilhas.\n\n+ Diario reflexivo por capitulo\n+ Comunidade anonima (Ecos)\n+ Respiracao guiada entre capitulos\n+ Chatbot de apoio 24/7\n\nGratuito para quem ja tem o livro fisico.\nPede o teu codigo: seteveus.space/pedir-codigo\n\n#OsSeteVeus #DoPapelAoDigital #ExperienciaDigital #Autoconhecimento",
    canvaSpecs: {
      dimensions: "1080x1080px (quadrado)",
      fonts: "Titulo: Playfair Display / Corpo: Inter",
      colorPalette: ["#ebe7df", "#3d3630", "#f7f5f0", "#c9b896", "#7a8c6e"],
    },
  },
  {
    id: "carousel-experiencia-digital-completa",
    title: "A experiencia digital por dentro",
    description: "Tour visual: o que inclui o acesso digital. Cada slide mostra uma funcionalidade.",
    slides: [
      { bg: "#3d3630", text: "#c9b896", accent: "#f7f5f0", title: "O que esta dentro\nda experiencia digital?", body: "", footer: "Os 7 Veus do Despertar" },
      { bg: "#f7f5f0", text: "#3d3630", accent: "#c9b896", title: "Leitura interactiva", body: "O livro filosofico completo\ncom pausas integradas.\n\nNao e uma copia digital —\ne uma experiencia\ndiferente de ler.", footer: "" },
      { bg: "#3d3630", text: "#f7f5f0", accent: "#7a8c6e", title: "Diario reflexivo", body: "Em cada capitulo,\num espaco para ti.\n\nEscreve o que sentes.\nGuarda o que descobres.\nSo tu tens acesso.", footer: "" },
      { bg: "#f7f5f0", text: "#3d3630", accent: "#c9b896", title: "Respiracao guiada", body: "Entre capitulos,\no ecra escurece.\nUm convite a parar.\n\nInspira. Expira.\nSo depois avancas.", footer: "" },
      { bg: "#3d3630", text: "#f7f5f0", accent: "#c9b896", title: "Comunidade Ecos", body: "Reflexoes anonimas.\nImpermanentes.\n\nNinguem sabe quem es.\nTodos se reconhecem.", footer: "" },
      { bg: "#f7f5f0", text: "#3d3630", accent: "#7a8c6e", title: "Chatbot de apoio", body: "Duvidas sobre os veus?\nSobre a plataforma?\nSobre ti?\n\nUma voz disponivel\n24 horas por dia.", footer: "" },
      { bg: "#ebe7df", text: "#3d3630", accent: "#c9b896", title: "Recursos gratuitos", body: "Teste: Qual veu te esconde?\nDiario de 7 dias\nChecklist do despertar\nMini-guia\nWallpapers", footer: "" },
      { bg: "#7a8c6e", text: "#f7f5f0", accent: "#ebe7df", title: "Tudo isto e teu.", body: "Se ja tens o livro fisico:\ngratuito.\n\nSe queres comecar agora:\nseteveus.space", footer: "seteveus.space/pedir-codigo" },
    ],
    caption: "O que esta dentro da experiencia digital Os 7 Veus do Despertar?\n\n1. Leitura interactiva (nao e uma copia — e outra forma de viver o livro)\n2. Diario reflexivo por capitulo (so tu les)\n3. Respiracao guiada entre capitulos\n4. Comunidade anonima (Ecos)\n5. Chatbot de apoio 24/7\n6. Recursos gratuitos (teste, diario, checklist, mini-guia, wallpapers)\n\nTens o livro fisico? O acesso e gratuito.\nPede o teu codigo: seteveus.space/pedir-codigo\n\n#OsSeteVeus #ExperienciaDigital #Autoconhecimento #LeituraTransformadora",
    canvaSpecs: {
      dimensions: "1080x1080px (quadrado)",
      fonts: "Titulo: Playfair Display / Corpo: Inter",
      colorPalette: ["#3d3630", "#f7f5f0", "#c9b896", "#7a8c6e", "#ebe7df"],
    },
  },
  {
    id: "carousel-3-razoes-digital",
    title: "3 razoes para activar o acesso digital",
    description: "Carrossel curto e directo. 3 razoes concretas para pedir o codigo.",
    slides: [
      { bg: "#3d3630", text: "#f7f5f0", accent: "#c9b896", title: "3 razoes para\nactivar o teu\nacesso digital.", body: "", footer: "" },
      { bg: "#f7f5f0", text: "#3d3630", accent: "#c9b896", title: "1. O diario\nmuda tudo.", body: "Ler sem escrever\ne como olhar\npara um espelho\nde olhos fechados.", footer: "" },
      { bg: "#3d3630", text: "#f7f5f0", accent: "#7a8c6e", title: "2. Nao estas\nsozinha.", body: "Na comunidade Ecos,\noutras mulheres\nestao a atravessar\nos mesmos veus.\n\nAnonimamente.", footer: "" },
      { bg: "#f7f5f0", text: "#3d3630", accent: "#c9b896", title: "3. Ha mais\npor descobrir.", body: "Os Espelhos e os Nos\nsao historias exclusivas\nda plataforma.\n\nO livro fisico e a porta.\nO digital e o caminho.", footer: "" },
      { bg: "#c9b896", text: "#3d3630", accent: "#f7f5f0", title: "Ja tens o livro?\nO acesso e gratuito.", body: "2 minutos.\nUm formulario.\nUm codigo.", footer: "seteveus.space/pedir-codigo" },
    ],
    caption: "3 razoes para activar o teu acesso digital:\n\n1. O diario reflexivo muda a forma como les — ler sem escrever e como olhar para um espelho de olhos fechados.\n\n2. Na comunidade Ecos, nao estas sozinha — outras mulheres estao a atravessar os mesmos veus, anonimamente.\n\n3. Ha mais por descobrir — os Espelhos e os Nos sao historias exclusivas da plataforma.\n\nJa tens o livro? O acesso e gratuito.\nseteveus.space/pedir-codigo\n\n#OsSeteVeus #AcessoDigital #ExperienciaDigital #Autoconhecimento",
    canvaSpecs: {
      dimensions: "1080x1080px (quadrado)",
      fonts: "Titulo: Playfair Display / Corpo: Inter",
      colorPalette: ["#3d3630", "#f7f5f0", "#c9b896", "#7a8c6e"],
    },
  },
  {
    id: "carousel-tom-intimo",
    title: "Uma coisa que talvez nao saibas",
    description: "Tom pessoal, como se fosse uma conversa intima. Para WhatsApp status ou Instagram story.",
    slides: [
      { bg: "#3d3630", text: "#c9b896", accent: "#f7f5f0", title: "Uma coisa que talvez\nnao saibas.", body: "", footer: "" },
      { bg: "#ebe7df", text: "#3d3630", accent: "#c9b896", title: "O livro que tens\nna estante...", body: "...tem uma extensao\ndigital.", footer: "" },
      { bg: "#3d3630", text: "#f7f5f0", accent: "#c9b896", title: "Nao e uma copia.", body: "E uma experiencia\ndiferente.\n\nPodes escrever reflexoes\na medida que les.\nGuardar pensamentos\npor capitulo.", footer: "" },
      { bg: "#f7f5f0", text: "#3d3630", accent: "#7a8c6e", title: "E participar\nnuma comunidade\nanonima", body: "de leitoras que tambem\nestao a atravessar\nos veus.", footer: "" },
      { bg: "#3d3630", text: "#f7f5f0", accent: "#c9b896", title: "E gratuito.\nE pessoal.\nE teu.", body: "", footer: "seteveus.space/pedir-codigo" },
    ],
    caption: "Uma coisa que talvez nao saibas:\n\nO livro fisico \"Os 7 Veus do Despertar\" tem uma extensao digital.\n\nNao e uma copia — e uma experiencia diferente. Podes escrever reflexoes a medida que les, guardar pensamentos por capitulo, e participar numa comunidade anonima de leitoras.\n\nE gratuito. E pessoal. E teu.\n\nseteveus.space/pedir-codigo\n\n#OsSeteVeus #ExperienciaDigital #Autoconhecimento",
    canvaSpecs: {
      dimensions: "1080x1080px (quadrado)",
      fonts: "Titulo: Playfair Display Italic / Corpo: Inter Light",
      colorPalette: ["#3d3630", "#ebe7df", "#f7f5f0", "#c9b896"],
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
      "CENA 3 (6-12s): Imagem atmosferica — mulher de costas a olhar pela janela, ou maos a segurar uma chavena. Voz-off ou texto: \"Quando foi que escolhi tomar cafe em vez de cha? Uma pergunta absurda. Mas foi a pergunta que mudou tudo.\"",
      "CENA 4 (12-20s): Transicao suave. Texto: \"O Espelho da Ilusao e a historia de uma mulher que, pela primeira vez, pergunta.\"",
      "CENA 5 (20-25s): Preview da plataforma (screenshot do leitor) com texto: \"Nao e um livro. E uma experiencia.\"",
      "CENA 6 (25-30s): CTA final sobre fundo escuro: \"Descobre qual veu te esconde. Link na bio.\"",
    ],
    cta: "Descobre qual veu te esconde. Teste gratuito na bio.",
    music: "Musica ambiente calma, piano suave ou sons de natureza. Sugestoes no Canva/CapCut: 'Contemplative', 'Reflective Piano', 'Soft Ambient'",
    duration: "25-30s",
    canvaTemplate: "Procura 'book reveal' ou 'quote animation' nos templates do CapCut",
  },
  {
    hook: "3 sinais de que vives no automatico:",
    scenes: [
      "CENA 1 (0-3s): Texto grande e directo: \"3 sinais de que vives no automatico\" [prender atencao]",
      "CENA 2 (3-8s): \"1. Respondes 'tanto faz' a perguntas importantes.\" [texto aparece com transicao]",
      "CENA 3 (8-13s): \"2. Nao te lembras da ultima vez que escolheste uma rua diferente.\" [transicao]",
      "CENA 4 (13-18s): \"3. A tua primeira reaccao nunca e o que verdadeiramente pensas.\" [transicao]",
      "CENA 5 (18-23s): \"Se te reconheces... nao es a unica.\" [pausa] \"Escrevi uma historia sobre isso.\"",
      "CENA 6 (23-30s): Capa do Espelho da Ilusao ou preview da plataforma. \"O Espelho da Ilusao. Teste gratuito na bio.\"",
    ],
    cta: "Comeca pelo teste gratuito — link na bio.",
    music: "Ritmo suave mas presente. Tipo lo-fi ou ambient electr\u00f3nico. No CapCut: 'Chill Lo-fi' ou 'Minimal Beat'",
    duration: "25-30s",
    canvaTemplate: "Procura 'list reveal' ou 'text animation' nos templates do CapCut",
  },
  {
    hook: "O que acontece quando uma mae e uma filha dizem o que sempre calaram?",
    scenes: [
      "CENA 1 (0-3s): \"O que acontece quando uma mae e uma filha dizem o que sempre calaram?\" [texto dramatico]",
      "CENA 2 (3-8s): Imagem: maos de duas geracoes diferentes. Texto: \"Sara viu o veu. Mas ha um no que ficou por desatar.\"",
      "CENA 3 (8-15s): \"O No da Heranca e a historia de Sara e Helena — mae e filha — e o silencio herdado entre elas.\"",
      "CENA 4 (15-22s): \"Nao e um upsell. E uma continuacao emocional. So se desbloqueia depois de completares o Espelho da Ilusao.\"",
      "CENA 5 (22-30s): Preview da plataforma com o card do No desbloqueado. CTA: \"Comeca pelo Espelho. O No espera por ti.\"",
    ],
    cta: "Comeca pelo Espelho. O No espera por ti.",
    music: "Emocional e intima. Piano + cordas suaves. No CapCut: 'Emotional Piano' ou 'Cinematic Gentle'",
    duration: "25-30s",
    canvaTemplate: "Procura 'emotional story' ou 'book trailer' nos templates do CapCut",
  },
  {
    hook: "Tens o livro fisico? Ha algo que ainda nao sabes.",
    scenes: [
      "CENA 1 (0-3s): Mostrar o livro fisico (foto real se possivel). \"Tens este livro?\"",
      "CENA 2 (3-8s): \"Ha algo que ainda nao sabes sobre ele.\"",
      "CENA 3 (8-15s): \"O livro abre portas que ainda nao conheces.\" [transicao para screenshots da plataforma]",
      "CENA 4 (15-22s): Mostrar a experiencia digital: leitor, diario, comunidade. \"Leitura integrada. Diario pessoal. Comunidade anonima.\"",
      "CENA 5 (22-28s): \"Acesso gratuito para quem tem o livro fisico.\"",
      "CENA 6 (28-35s): \"Pede o teu codigo em menos de 1 minuto.\" + CTA",
    ],
    cta: "Link na bio para pedires o teu codigo gratuito.",
    music: "Suave e convidativa. No CapCut: 'Warm Acoustic' ou 'Gentle Inspiration'",
    duration: "30-35s",
    canvaTemplate: "Procura 'product reveal' ou 'unboxing' nos templates do CapCut",
  },
  {
    hook: "Nao sabes para onde vais? Optimo.",
    scenes: [
      "CENA 1 (0-3s): \"Nao sabes para onde vais?\" [pausa dramatica]",
      "CENA 2 (3-5s): \"Optimo.\" [texto grande, impacto]",
      "CENA 3 (5-12s): \"Nao precisas de saber para onde vais. Precisas apenas de dar o primeiro passo.\"",
      "CENA 4 (12-18s): \"Os Sete Veus do Despertar sao 7 experiencias que te devolvem a ti mesma.\"",
      "CENA 5 (18-25s): \"Sem pressa. Sem formulas. Apenas verdade.\"",
      "CENA 6 (25-30s): \"Comeca pelo teste gratuito. 3 minutos. 7 perguntas.\" + CTA",
    ],
    cta: "Teste gratuito na bio. 3 minutos.",
    music: "Inspiracional mas contida. No CapCut: 'Inspiring Minimal' ou 'Hope'",
    duration: "25-30s",
  },
  {
    hook: "Isto nao e um livro. E um espelho.",
    scenes: [
      "CENA 1 (0-3s): Ecra escuro. Texto aparece devagar: \"Isto nao e um livro.\" [pausa]",
      "CENA 2 (3-5s): \"E um espelho.\" [impacto visual — flash suave]",
      "CENA 3 (5-10s): Screenshots rapidos da plataforma: leitor, diario, checklist, comunidade. Texto: \"Les. Respiras. Escreves. Sentes.\"",
      "CENA 4 (10-18s): \"7 historias. 7 veus. Cada um esconde algo que ja sabes mas nunca disseste.\"",
      "CENA 5 (18-22s): Print do quiz com texto: \"3 minutos. 7 perguntas. Qual veu te esconde?\"",
      "CENA 6 (22-28s): \"Teste gratuito. Link na bio.\" [fundo escuro, dourado]",
    ],
    cta: "Teste gratuito na bio.",
    music: "Ambiente cinematografico suave. No CapCut: 'Cinematic Soft' ou 'Atmospheric Piano'",
    duration: "25-28s",
  },
  {
    hook: "5 coisas que esta plataforma tem que nenhum livro te da.",
    scenes: [
      "CENA 1 (0-3s): \"5 coisas que esta plataforma tem que nenhum livro te da.\" [texto directo, fundo escuro]",
      "CENA 2 (3-8s): \"1. Pausas de respiracao entre capitulos.\" [screenshot da pausa]",
      "CENA 3 (8-13s): \"2. Um diario pessoal que so tu les.\" [screenshot do diario]",
      "CENA 4 (13-18s): \"3. Uma comunidade anonima onde ninguem te conhece mas todos se reconhecem.\" [screenshot Ecos]",
      "CENA 5 (18-23s): \"4. Historias que se desbloqueiam ao teu ritmo.\" [screenshot do leitor]",
      "CENA 6 (23-28s): \"5. Um chatbot de apoio com a voz da autora.\" [screenshot do chat]",
      "CENA 7 (28-33s): \"$29 USD. Acesso vitalicio. Link na bio.\" [CTA]",
    ],
    cta: "Link na bio. $29 USD. Acesso vitalicio.",
    music: "Ritmo suave e moderno. No CapCut: 'Soft Pop' ou 'Modern Minimal'",
    duration: "30-33s",
  },
  {
    hook: "Se leste isto ate ao fim, este livro e para ti.",
    scenes: [
      "CENA 1 (0-3s): Ecra preto. Texto: \"Se leste isto ate ao fim...\" [suspense]",
      "CENA 2 (3-5s): \"...este livro e para ti.\" [transicao suave]",
      "CENA 3 (5-12s): Citacao do livro em texto: \"Via, mas nao sentia. Registava, mas nao participava. Como quem assiste a um espectaculo por tras de uma janela fechada.\"",
      "CENA 4 (12-18s): \"Reconheces-te?\" [pausa longa] \"Entao nao es a unica.\"",
      "CENA 5 (18-25s): \"O Espelho da Ilusao. Uma historia sobre despertar do automatico.\"",
      "CENA 6 (25-30s): \"Disponivel agora. Link na bio.\" [imagem do espelho]",
    ],
    cta: "Link na bio. Disponivel agora.",
    music: "Muito calma, quase silenciosa. No CapCut: 'Ambient Silence' ou 'Slow Piano'",
    duration: "25-30s",
  },

  // ─── REELS: CAMPANHA EXPERIENCIA DIGITAL ──────────────────────────────────

  {
    hook: "Tens este livro na estante? Ha algo que nao sabes sobre ele.",
    scenes: [
      "CENA 1 (0-3s): Mostrar foto do livro fisico. Texto: \"Tens este livro?\" [curiosidade]",
      "CENA 2 (3-6s): \"Ha algo que nao sabes sobre ele.\" [pausa dramatica]",
      "CENA 3 (6-12s): \"O livro fisico tem uma extensao digital. Nao e uma copia — e uma experiencia diferente.\"",
      "CENA 4 (12-18s): Screenshots rapidos da plataforma: diario, comunidade, respiracao. Texto: \"Diario reflexivo. Comunidade anonima. Respiracao guiada.\"",
      "CENA 5 (18-24s): \"E se ja compraste o livro, o acesso e gratuito.\"",
      "CENA 6 (24-30s): \"Pede o teu codigo em 2 minutos. Link na bio.\" [CTA]",
    ],
    cta: "Pede o teu codigo gratuito. Link na bio.",
    music: "Suave e convidativa. No CapCut: 'Warm Acoustic' ou 'Gentle Inspiration'",
    duration: "25-30s",
  },
  {
    hook: "Ler sem escrever e como olhar para um espelho de olhos fechados.",
    scenes: [
      "CENA 1 (0-3s): Texto sobre ecra escuro: \"Ler sem escrever...\" [suspense]",
      "CENA 2 (3-5s): \"...e como olhar para um espelho de olhos fechados.\" [impacto]",
      "CENA 3 (5-12s): Screenshot do diario reflexivo na plataforma. Texto: \"Na experiencia digital, cada capitulo tem um espaco para escreveres o que sentiste.\"",
      "CENA 4 (12-18s): \"So tu les. So tu decides o que guardas.\"",
      "CENA 5 (18-24s): Screenshot da comunidade Ecos. \"E na comunidade, descobres que nao estas sozinha.\"",
      "CENA 6 (24-30s): \"Se ja tens o livro fisico, o acesso digital e gratuito. Link na bio.\" [CTA]",
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
    category: "Paleta de Cores — Os Sete Veus",
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
      { title: "WhatsApp Business", detail: "Para Status diarios, broadcasts segmentados e catalogo dos livros. Gratuito." },
      { title: "Manychat Free", detail: "Automacao de DMs no Instagram. Alguem comenta 'VEU' no post e recebe DM automatica com link." },
      { title: "Kit (ConvertKit) Free", detail: "Email marketing ate 10.000 subscritores. Landing pages e broadcasts gratuitos." },
    ],
  },
  {
    category: "Screenshots para Conteudo",
    items: [
      { title: "Dashboard do membro", detail: "/membro — mostra a experiencia completa por dentro" },
      { title: "Leitor de capitulo", detail: "/membro/leitura/1 — mostra como e a leitura integrada" },
      { title: "Respiracao guiada", detail: "Screenshot durante a pausa de respiracao entre capitulos" },
      { title: "Diario pessoal", detail: "Screenshot da area de reflexao (sem texto pessoal)" },
      { title: "Comunidade Ecos", detail: "/comunidade — mostra as 4 salas" },
      { title: "Quiz resultado", detail: "/recursos/teste — mostra o resultado do teste com o veu revelado" },
      { title: "Card do No desbloqueado", detail: "/membro/leitura — mostra o teaser do No da Heranca apos completar Espelho" },
      { title: "Pagina de compra", detail: "/comprar/espelhos — mostra precos e opcoes" },
    ],
  },
  {
    category: "Automacao Manychat (Instagram DMs)",
    items: [
      { title: "Trigger: comentario 'VEU'", detail: "Quando alguem comenta VEU num post, enviar DM: \"Obrigada pelo teu interesse! Descobre qual veu te esconde com o nosso teste gratuito de 3 minutos: seteveus.space/recursos/teste — Vivianne\"" },
      { title: "Trigger: comentario 'LIVRO'", detail: "Quando alguem comenta LIVRO, enviar DM: \"Tens o livro fisico? Pede o teu codigo de acesso digital gratuito aqui: seteveus.space/acesso-digital — Vivianne\"" },
      { title: "Trigger: comentario 'QUERO'", detail: "Quando alguem comenta QUERO, enviar DM: \"O Espelho da Ilusao esta disponivel por $29 USD / 1.885 MZN. Acesso vitalicio. Comeca aqui: seteveus.space/comprar/espelhos — Vivianne\"" },
      { title: "Story reply automation", detail: "Quando alguem responde a um Story, enviar agradecimento + link para o teste gratuito automaticamente." },
    ],
  },
];
