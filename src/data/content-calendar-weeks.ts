// ─── TYPES ───────────────────────────────────────────────────────────────────

export type Platform = "instagram" | "whatsapp" | "ambos";

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
            footer: "seteecos.com",
            highlight: "Os Sete V\u00e9us",
          },
          caption: "A plataforma Os Sete V\u00e9us foi completamente redesenhada.\n\nNovo visual. Nova experi\u00eancia de leitura integrada. Chatbot de apoio. Comunidade.\n\nTudo novo. A mesma ess\u00eancia.\n\nDescobre em seteecos.com\n\n#OsSeteV\u00e9us #Autoconhecimento #PlataformaDigital",
        },
        {
          platform: "whatsapp",
          type: "Status",
          visual: {
            bg: "#3d3630", text: "#f7f5f0", accent: "#c9b896", format: "vertical",
            title: "H\u00e1 algo novo\na acontecer.",
            body: "A plataforma Os Sete V\u00e9us foi completamente redesenhada.\n\nNovo visual. Nova experi\u00eancia.\nA mesma profundidade.",
            footer: "seteecos.com",
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
          notes: "Faz screenshot destas p\u00e1ginas no telem\u00f3vel e usa como slides do carrossel:\n\n1. seteecos.com/membro (dashboard)\n2. seteecos.com/membro/leitura (leitor)\n3. seteecos.com/membro/leitura/1 (cap\u00edtulo aberto)\n4. seteecos.com/comunidade (comunidade)\n5. seteecos.com/recursos/teste (quiz)\n\nLegenda: \u201cN\u00e3o \u00e9 um livro. \u00c9 uma experi\u00eancia. Swipe para ver por dentro.\u201d",
          caption: "N\u00e3o \u00e9 um livro. \u00c9 uma experi\u00eancia.\n\n\u27a1\ufe0f Leitura integrada com pausas de reflex\u00e3o\n\u27a1\ufe0f Di\u00e1rio pessoal auto-guardado\n\u27a1\ufe0f Respira\u00e7\u00e3o guiada entre cap\u00edtulos\n\u27a1\ufe0f Comunidade an\u00f3nima\n\u27a1\ufe0f Chatbot para todas as d\u00favidas\n\nSwipe para ver por dentro \u2192\n\nseteecos.com\n\n#OsSeteV\u00e9us #LeituraIntegrada #Autoconhecimento",
        },
        {
          platform: "whatsapp",
          type: "Broadcast",
          broadcast: "Ol\u00e1! Tenho uma novidade para ti.\n\nA plataforma Os Sete V\u00e9us foi completamente redesenhada. Novo visual, nova experi\u00eancia de leitura, novo chatbot de apoio.\n\nSe j\u00e1 tens conta, entra e explora. Se ainda n\u00e3o conheces, come\u00e7a pelo teste gratuito:\nseteecos.com/recursos/teste\n\nAo teu ritmo. Sem pressa.\n~ Vivianne",
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
            footer: "seteecos.com/recursos",
            highlight: "Gratuito",
          },
          caption: "Sabes que na plataforma Os Sete V\u00e9us h\u00e1 v\u00e1rios recursos completamente gratuitos?\n\nTeste de autoconhecimento (3 min)\nDi\u00e1rio de 7 dias\nArtigos sobre os v\u00e9us\nMini-guia\nWallpapers\n\nCome\u00e7a sem pagar nada: seteecos.com/recursos\n\n#OsSeteV\u00e9us #Gratuito #TesteDeAutoconhecimento",
        },
        {
          platform: "whatsapp",
          type: "Status",
          visual: {
            bg: "#f7f5f0", text: "#3d3630", accent: "#c9b896", format: "vertical",
            title: "Descobre qual v\u00e9u\nte esconde.",
            body: "Teste de autoconhecimento gratuito.\n3 minutos.\nSem compromisso.",
            footer: "seteecos.com/recursos/teste",
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
            footer: "seteecos.com",
          },
          caption: "A plataforma Os Sete V\u00e9us tem agora:\n\nLeitura integrada com pausas de reflex\u00e3o\nDi\u00e1rio pessoal auto-guardado\nRespira\u00e7\u00e3o guiada entre cap\u00edtulos\nChatbot de apoio 24/7\nComunidade an\u00f3nima\n\nTudo pensado para ti, ao teu ritmo.\n\nseteecos.com\n\n#OsSeteV\u00e9us #PlataformaDigital #LeituraIntegrada",
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
            footer: "seteecos.com/acesso-digital",
            highlight: "Leitores do livro",
          },
          caption: "Se tens o livro f\u00edsico Os 7 V\u00e9us do Despertar, tens direito a uma experi\u00eancia digital completa.\n\nLeitura integrada, di\u00e1rio de reflex\u00e3o, comunidade e muito mais.\n\nRegista o teu interesse: seteecos.com/acesso-digital\n\n#OsSeteV\u00e9us #LivroF\u00edsico #AcessoDigital",
        },
        {
          platform: "whatsapp",
          type: "Broadcast",
          broadcast: "Ol\u00e1! Se tens o livro f\u00edsico Os 7 V\u00e9us do Despertar, tenho uma novidade:\n\nA plataforma digital foi redesenhada e tens direito a acesso gratuito. Leitura integrada, di\u00e1rio de reflex\u00e3o, comunidade e muito mais.\n\nRegista o teu interesse aqui e envio-te o c\u00f3digo:\nseteecos.com/acesso-digital\n\nDemora menos de 1 minuto. Sem compromisso.\n\n~ Vivianne",
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
            footer: "O Espelho da Ilus\u00e3o ~ seteecos.com",
            highlight: "Espelho da Ilus\u00e3o",
          },
          caption: "\"Quando foi que escolhi tomar caf\u00e9 em vez de ch\u00e1?\"\n\nUma pergunta absurda que muda tudo.\n\nO Espelho da Ilus\u00e3o come\u00e7a assim \u2014 com uma manh\u00e3 igual a todas as outras e uma mulher que, pela primeira vez, pergunta.\n\nFaz o quiz gratuito e descobre o teu espelho:\nseteecos.com/recursos/teste\n\n#OsSeteV\u00e9us #EspelhoDaIlus\u00e3o #Autoconhecimento",
        },
        {
          platform: "whatsapp",
          type: "Status",
          visual: {
            bg: "#f7f5f0", text: "#3d3630", accent: "#c9b896", format: "vertical",
            title: "H\u00e1 mais para ti\ndo que aquilo que\ntens vivido.",
            body: "O Espelho da Ilus\u00e3o.\nUma experi\u00eancia de leitura integrada.",
            footer: "seteecos.com",
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
            footer: "seteecos.com/experiencias",
          },
          caption: "N\u00e3o \u00e9 um livro que se l\u00ea. \u00c9 uma experi\u00eancia que se vive.\n\n7 cap\u00edtulos de fic\u00e7\u00e3o\nRespira\u00e7\u00e3o guiada\nDi\u00e1rio de reflex\u00e3o\nO teu Espelho pessoal\n\n$29 USD / 1.885 MZN\nAcesso vital\u00edcio.\n\nseteecos.com/comprar/espelhos\n\n#OsSeteV\u00e9us #ExperienciaImersiva #LeituraIntegrada",
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
            footer: "O Espelho da Ilus\u00e3o ~ seteecos.com",
          },
          caption: "\"Via, mas n\u00e3o sentia. Registava, mas n\u00e3o participava. Como quem assiste a um espect\u00e1culo por tr\u00e1s de uma janela fechada.\"\n\n\u2014 O Espelho da Ilus\u00e3o\n\nseteecos.com/comprar/espelhos\n\n#OsSeteV\u00e9us #EspelhoDaIlus\u00e3o #Fic\u00e7\u00e3oPsicol\u00f3gica",
        },
        {
          platform: "whatsapp",
          type: "Broadcast",
          broadcast: "J\u00e1 alguma vez sentiste que a vida que constru\u00edste n\u00e3o foi bem escolhida por ti?\n\nEscrevi uma hist\u00f3ria sobre isso. Chama-se O Espelho da Ilus\u00e3o.\n\nN\u00e3o \u00e9 um livro que se l\u00ea. \u00c9 uma experi\u00eancia que se vive: 7 cap\u00edtulos, respira\u00e7\u00e3o guiada, di\u00e1rio de reflex\u00e3o e o teu Espelho pessoal.\n\nCome\u00e7a pelo teste gratuito:\nseteecos.com/recursos/teste\n\n~ Vivianne",
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
            footer: "seteecos.com/comprar",
          },
          caption: "Quanto custa escolher-te?\n\nEspelho da Ilus\u00e3o: $29 USD (1.885 MZN)\nN\u00f3 da Heran\u00e7a: $12 USD (780 MZN)\nLivro f\u00edsico: $23 USD (1.495 MZN)\n\nAcesso vital\u00edcio. Sem subscri\u00e7\u00f5es.\nPayPal, Millenium BIM ou M-Pesa.\n\nseteecos.com/comprar\n\n#OsSeteV\u00e9us #Autoconhecimento",
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
            footer: "O Espelho da Ilus\u00e3o ~ seteecos.com",
          },
          caption: "\"Perguntar, mesmo tarde, \u00e9 o primeiro gesto de se escolher.\"\n\n\u2014 O Espelho da Ilus\u00e3o\n\nseteecos.com\n\n#OsSeteV\u00e9us #EspelhoDaIlus\u00e3o #DesenvolvimentoPessoal",
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
            footer: "O N\u00f3 da Heran\u00e7a ~ seteecos.com",
            highlight: "Colec\u00e7\u00e3o N\u00f3s",
          },
          caption: "Os Espelhos olham para dentro.\nOs N\u00f3s olham para a rela\u00e7\u00e3o.\n\nO N\u00f3 da Heran\u00e7a \u00e9 a hist\u00f3ria de Sara e Helena \u2014 m\u00e3e e filha \u2014 e o sil\u00eancio herdado entre elas.\n\nS\u00f3 se desbloqueia ao completar o Espelho da Ilus\u00e3o.\n\nseteecos.com/coleccao-nos\n\n#OsSeteV\u00e9us #N\u00f3DaHeran\u00e7a #Fic\u00e7\u00e3oRelacional",
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
            footer: "Comunidade Ecos ~ seteecos.com",
            highlight: "Comunidade",
          },
          caption: "A comunidade Ecos \u00e9 o espa\u00e7o onde as vozes se encontram.\n\nQuatro salas:\nEcos \u2014 reflex\u00f5es an\u00f3nimas\nMar\u00e9 \u2014 consci\u00eancia colectiva\nC\u00edrculo \u2014 espelho partilhado\nFogueira \u2014 contempla\u00e7\u00e3o silenciosa\n\nTudo an\u00f3nimo. Tudo impermanente.\nInclu\u00edda com qualquer experi\u00eancia de leitura.\n\nseteecos.com/comunidade\n\n#OsSeteV\u00e9us #ComunidadeEcos",
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
            footer: "$12 USD ~ seteecos.com",
            highlight: "Novo",
          },
        },
        {
          platform: "whatsapp",
          type: "Broadcast",
          broadcast: "Se j\u00e1 leste o Espelho da Ilus\u00e3o, h\u00e1 uma continua\u00e7\u00e3o que quero partilhar contigo.\n\nO N\u00f3 da Heran\u00e7a \u00e9 a hist\u00f3ria de Sara e Helena (m\u00e3e e filha). O que se passa entre duas pessoas quando o v\u00e9u da ilus\u00e3o cai.\n\nS\u00f3 se desbloqueia depois de completares o Espelho. \u00c9 a continua\u00e7\u00e3o emocional, n\u00e3o um upsell.\n\nseteecos.com/coleccao-nos\n\n~ Vivianne",
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
          caption: "\"N\u00e3o \u00e9 um livro que se l\u00ea \u2014 \u00e9 um livro que se vive.\"\n\u2014 Carla S., Lisboa\n\nseteecos.com\n\n#OsSeteV\u00e9us #Testemunho",
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
          broadcast: "Sabes que na plataforma Os Sete V\u00e9us h\u00e1 v\u00e1rios recursos completamente gratuitos?\n\n- Teste de autoconhecimento (3 min)\n- Di\u00e1rio de 7 dias\n- Artigos sobre os v\u00e9us\n- Mini-guia\n- Wallpapers\n\nCome\u00e7a sem pagar nada:\nseteecos.com/recursos\n\n~ Vivianne",
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
          caption: "O segundo espelho est\u00e1 quase a chegar.\n\n\"Sabes o que queres. Mas o medo decide antes de ti.\"\n\nO Espelho do Medo \u2014 Mar\u00e7o 2026.\n\nseteecos.com/experiencias\n\n#OsSeteV\u00e9us #EspelhoDoMedo #EmBreve",
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
          broadcast: "O segundo espelho est\u00e1 quase a chegar.\n\nSabes o que queres. Mas o medo decide antes de ti.\n\nO Espelho do Medo chega em Mar\u00e7o de 2026.\n\nSe quiseres ser a primeira a saber:\nseteecos.com/experiencias\n\n~ Vivianne",
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
            footer: "seteecos.com/acesso-digital",
            highlight: "Gratuito",
          },
          caption: "Tens o livro f\u00edsico? Regista o teu interesse e recebe acesso gratuito \u00e0 plataforma digital.\n\nseteecos.com/acesso-digital\n\n#OsSeteV\u00e9us #AcessoDigital",
        },
        {
          platform: "whatsapp",
          type: "Broadcast",
          broadcast: "Tens o livro Os 7 V\u00e9us do Despertar?\n\nA plataforma digital est\u00e1 completamente nova. E tens acesso gratuito.\n\nseteecos.com/acesso-digital",
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
            footer: "O Espelho da Ilus\u00e3o ~ seteecos.com",
          },
          caption: "\"Uma mulher descobre, no meio de uma manh\u00e3 igual a todas as outras, que construiu uma vida inteira sem nunca ter perguntado o que queria.\"\n\n\u2014 O Espelho da Ilus\u00e3o, Pref\u00e1cio\n\nseteecos.com\n\n#OsSeteV\u00e9us #EspelhoDaIlus\u00e3o",
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
            footer: "seteecos.com/recursos/teste",
            highlight: "Gratuito",
          },
          caption: "Qual v\u00e9u te esconde?\n\nTeste gratuito de autoconhecimento.\n3 minutos. 7 perguntas.\nO resultado pode surpreender-te.\n\nseteecos.com/recursos/teste\n\n#OsSeteV\u00e9us #TesteGratuito #Autoconhecimento",
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

export const allWeeks: WeekPlan[] = [week1, week2, week3, week4];
