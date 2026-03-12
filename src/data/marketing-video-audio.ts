/**
 * Marketing Video + Audio — Os Sete Véus
 *
 * Para usar com:
 *   • ElevenLabs Image & Video (Veo 3.1 Fast) — prompts em INGLÊS, 4s cada, 720p 16:9
 *   • ElevenLabs Text-to-Speech — narração em português, voz da Vivianne
 *
 * Budget total: 78 clips de vídeo × 4s = 312s de footage
 *
 * Estrutura de cada clip:
 *   videoPrompt   → cola directamente em ElevenLabs Image & Vídeo
 *   narracao      → gera em /admin/voz, sobrepõe no CapCut
 *   duracao       → segundos de narração estimados (para sincronizar)
 *
 * Regras de prompt de vídeo:
 *   - Sempre cinematic, slow motion, moody lighting
 *   - Nunca rostos reconhecíveis (evita deepfake flags)
 *   - Paleta: warm shadows, candlelight, dawn light, dark earth tones
 *   - Sem texto no vídeo (o texto vai em overlay no CapCut)
 */

// ─── TIPOS ────────────────────────────────────────────────────────────────────

export type VideoClip = {
  id: string;
  videoPrompt: string;
  narracao: string;
  /** Duração estimada da narração em segundos */
  duracao: number;
  ficheiro: string;
};

export type VideoReel = {
  id: string;
  titulo: string;
  /** Descrição do reel para o CapCut / produção */
  descricao: string;
  /** Clips em ordem. Cada clip = 1 geração no ElevenLabs Vídeo */
  clips: VideoClip[];
  /** Narração corrida do reel inteiro (alternativa aos clips individuais) */
  narracaoCorrida: string;
  ficheiroCorrida: string;
  /** Legenda para Instagram/WhatsApp */
  caption: string;
  /** Clips totais usados */
  totalClips: number;
};

// ─── SÉRIE "VÉU A VÉU" — 7 REELS ─────────────────────────────────────────────
// 7 clips por reel × 7 reels = 49 clips
// Cada reel ~28s. Vivianne fala directamente à ouvinte. Tom: íntimo, lento, sem pressa.

export const REELS_VEU_A_VEU: VideoReel[] = [
  // ── VÉU 1 — ILUSÃO ──────────────────────────────────────────────────────────
  {
    id: "reel-veu-1-ilusao",
    titulo: "Véu 1 — Ilusão",
    descricao: "Mulher que vive a vida certa e não a sente. A pergunta do café. Para quem funciona mas não está.",
    totalClips: 7,
    clips: [
      {
        id: "v1-i1",
        videoPrompt: "Cinematic slow motion: a woman's hands wrapping around a warm coffee cup in soft morning light, steam rising slowly, blurred kitchen background, warm earth tones, intimate close-up, no face visible, 4K mood",
        narracao: "Há manhãs em que fazes tudo certo.",
        duracao: 3,
        ficheiro: "v1-i1-maos-cafe.mp3",
      },
      {
        id: "v1-i2",
        videoPrompt: "Cinematic slow motion: a woman sitting by a window, back to camera, watching rain on glass, grey morning light filtering through, contemplative mood, no face visible, soft focus foreground",
        narracao: "E mesmo assim há qualquer coisa que não encaixa.",
        duracao: 4,
        ficheiro: "v1-i2-janela-chuva.mp3",
      },
      {
        id: "v1-i3",
        videoPrompt: "Slow motion close-up: a clock hand moving, warm amber bokeh in background, shallow depth of field, metaphor for routine passing, cinematic grain, warm tones",
        narracao: "Como se estivesses a assistir à tua própria vida por trás de um vidro.",
        duracao: 4,
        ficheiro: "v1-i3-relogio.mp3",
      },
      {
        id: "v1-i4",
        videoPrompt: "Cinematic slow motion: woman's hand hesitating over a cup, then slowly pulling back, minimalist kitchen counter, natural side light, no face, intimate and quiet",
        narracao: "Quando foi que escolhi tomar café em vez de chá?",
        duracao: 4,
        ficheiro: "v1-i4-pausa-cafe.mp3",
      },
      {
        id: "v1-i5",
        videoPrompt: "Slow motion close-up: open journal with blank page, a pen resting on it, warm candlelight glow from side, wooden table, bokeh background, stillness",
        narracao: "Uma pergunta que não deveria importar. E mudou tudo.",
        duracao: 4,
        ficheiro: "v1-i5-diario-vazio.mp3",
      },
      {
        id: "v1-i6",
        videoPrompt: "Cinematic slow motion: woman sitting at kitchen table, cup in front, looking down in quiet contemplation, soft morning backlight through curtains, no face visible, very intimate",
        narracao: "O Espelho da Ilusão é a história dessa pergunta.",
        duracao: 3,
        ficheiro: "v1-i6-mesa-contempla.mp3",
      },
      {
        id: "v1-i7",
        videoPrompt: "Slow motion: a door opening to warm morning light flooding a dark hallway, symbolic and cinematic, dust particles in light beam, metaphor for awakening, no people",
        narracao: "Há mais para ti do que aquilo que tens vivido. seteveus.space",
        duracao: 4,
        ficheiro: "v1-i7-porta-luz.mp3",
      },
    ],
    narracaoCorrida: "Há manhãs em que fazes tudo certo. E mesmo assim há qualquer coisa que não encaixa. Como se estivesses a assistir à tua própria vida por trás de um vidro. Quando foi que escolhi tomar café em vez de chá? Uma pergunta que não deveria importar. E mudou tudo. O Espelho da Ilusão é a história dessa pergunta. Há mais para ti do que aquilo que tens vivido. seteveus.space",
    ficheiroCorrida: "reel-veu1-ilusao-corrida.mp3",
    caption: "Há manhãs em que fazes tudo certo. E não sentes nada.\n\nO Espelho da Ilusão é uma história sobre isso.\n\nEnvia a quem reconheces nesta frase.\n\nseteveus.space\n\n#OsSeteVeus #EspelhoDaIlusao #Autoconhecimento",
  },

  // ── VÉU 2 — MEDO ────────────────────────────────────────────────────────────
  {
    id: "reel-veu-2-medo",
    titulo: "Véu 2 — Medo",
    descricao: "A voz que diz não antes de pensares. O Rui e o que o medo calou. Lançamento Março 2026.",
    totalClips: 7,
    clips: [
      {
        id: "v2-m1",
        videoPrompt: "Cinematic close-up: a man's hand gripping the edge of a table, tension visible in the knuckles, dark moody background, single warm light source from the side, still and heavy atmosphere",
        narracao: "Há uma voz que diz não antes de pensares.",
        duracao: 4,
        ficheiro: "v2-m1-mao-tensao.mp3",
      },
      {
        id: "v2-m2",
        videoPrompt: "Slow motion: a man standing at a doorway, hand on the frame, hesitating to enter or leave, back to camera, dark interior, warm light from outside, metaphor for decision paralysis",
        narracao: "Não é covardia. É um mecanismo antigo.",
        duracao: 4,
        ficheiro: "v2-m2-limiar-porta.mp3",
      },
      {
        id: "v2-m3",
        videoPrompt: "Close-up slow motion: lips almost forming words but staying closed, shallow depth of field, very intimate, cinematic, dark warm tones, no full face visible",
        narracao: "Treinado ao longo de anos de cautela disfarçada de bom senso.",
        duracao: 4,
        ficheiro: "v2-m3-labios-silencio.mp3",
      },
      {
        id: "v2-m4",
        videoPrompt: "Cinematic slow motion: empty chair at a table set for two, one side untouched, window light, slightly melancholic but warm, metaphor for things unsaid",
        narracao: "O Rui sabia o que queria dizer. E nunca disse.",
        duracao: 4,
        ficheiro: "v2-m4-cadeira-vazia.mp3",
      },
      {
        id: "v2-m5",
        videoPrompt: "Slow motion: a phone on a table, screen showing a typed message but unsent, hand hovering near it, dramatic side light, intimate tension",
        narracao: "Reconheces esse peso?",
        duracao: 2,
        ficheiro: "v2-m5-mensagem-nao-enviada.mp3",
      },
      {
        id: "v2-m6",
        videoPrompt: "Cinematic: man walking alone at dusk on an empty street, back to camera, city lights blurred in background, solitude and quiet determination, slow and deliberate steps",
        narracao: "O Espelho do Medo chega em Março.",
        duracao: 3,
        ficheiro: "v2-m6-homem-rua.mp3",
      },
      {
        id: "v2-m7",
        videoPrompt: "Slow motion: a single candle flame in darkness, warm and steady, symbolic of courage emerging from fear, shallow depth of field, very cinematic grain",
        narracao: "O que o medo calou durante anos. Março 2026. seteveus.space",
        duracao: 4,
        ficheiro: "v2-m7-vela-escuridao.mp3",
      },
    ],
    narracaoCorrida: "Há uma voz que diz não antes de pensares. Não é covardia. É um mecanismo antigo, treinado ao longo de anos de cautela disfarçada de bom senso. O Rui sabia o que queria dizer. E nunca disse. Reconheces esse peso? O Espelho do Medo chega em Março. O que o medo calou durante anos. Março 2026. seteveus.space",
    ficheiroCorrida: "reel-veu2-medo-corrida.mp3",
    caption: "Há uma voz que diz não antes de pensares.\n\nNão é covardia — é um mecanismo antigo.\n\nO Espelho do Medo chega em Março. Envia a quem vives a dizer \"não posso\" antes de pensar se quer.\n\nseteveus.space\n\n#OsSeteVeus #EspelhoDoMedo #Marco2026",
  },

  // ── VÉU 3 — CULPA ────────────────────────────────────────────────────────────
  {
    id: "reel-veu-3-culpa",
    titulo: "Véu 3 — Culpa",
    descricao: "O amor que se esqueceu de te incluir. Filipe que se entregava sem reservas. Abril 2026.",
    totalClips: 7,
    clips: [
      {
        id: "v3-c1",
        videoPrompt: "Cinematic close-up: two hands, one placing something into the other — a small gift, a key — warm intimate light, metaphor for giving, soft focus, no faces",
        narracao: "Há pessoas que se entregam sem reservas.",
        duracao: 3,
        ficheiro: "v3-c1-maos-oferta.mp3",
      },
      {
        id: "v3-c2",
        videoPrompt: "Slow motion: a woman's hands cleaning up after a meal while others have left the table, still plates remaining, warm kitchen light, quiet sacrifice, no face visible",
        narracao: "E chamam a isso amor.",
        duracao: 3,
        ficheiro: "v3-c2-arrumar-sozinha.mp3",
      },
      {
        id: "v3-c3",
        videoPrompt: "Cinematic: empty mirror reflection showing a blurred, uncertain silhouette, warm light from the side, metaphor for lost self-identity, very artistic",
        narracao: "Até que um dia olham para si. E não encontram nada que seja apenas seu.",
        duracao: 5,
        ficheiro: "v3-c3-espelho-vazio.mp3",
      },
      {
        id: "v3-c4",
        videoPrompt: "Close-up slow motion: hands cradling a small plant or flower, protective gesture, warm earth tones, metaphor for nurturing others while neglecting self",
        narracao: "O corpo lembra esse momento.",
        duracao: 3,
        ficheiro: "v3-c4-maos-planta.mp3",
      },
      {
        id: "v3-c5",
        videoPrompt: "Slow motion: a chair pulled slightly back from a table, as if someone just left or was never included, morning light, single coffee cup only, quiet and telling",
        narracao: "Quando o amor próprio cedeu tão devagar que não deste conta.",
        duracao: 4,
        ficheiro: "v3-c5-cadeira-excluida.mp3",
      },
      {
        id: "v3-c6",
        videoPrompt: "Cinematic slow motion: woman gently touching her own hand, self-compassion gesture, soft warm light, intimate close-up, hopeful tone",
        narracao: "O Espelho da Culpa não te pede que pares de amar.",
        duracao: 4,
        ficheiro: "v3-c6-auto-compaixao.mp3",
      },
      {
        id: "v3-c7",
        videoPrompt: "Slow motion: sunlight breaking through curtains onto an open book and a cup of tea, peaceful morning scene, warmth returning, new beginning feeling",
        narracao: "Pede-te que te incluas. Abril 2026. seteveus.space",
        duracao: 4,
        ficheiro: "v3-c7-luz-incluida.mp3",
      },
    ],
    narracaoCorrida: "Há pessoas que se entregam sem reservas. E chamam a isso amor. Até que um dia olham para si. E não encontram nada que seja apenas seu. O corpo lembra esse momento — quando o amor próprio cedeu tão devagar que não deste conta. O Espelho da Culpa não te pede que pares de amar. Pede-te que te incluas. Abril 2026. seteveus.space",
    ficheiroCorrida: "reel-veu3-culpa-corrida.mp3",
    caption: "Entregaste-te tanto que esqueceste de te incluir.\n\nO Espelho da Culpa é para isso.\n\nEnvia a quem te diz sempre que está bem quando claramente não está.\n\nAbril 2026. seteveus.space\n\n#OsSeteVeus #EspelhoDaCulpa #Abril2026",
  },

  // ── VÉU 4 — IDENTIDADE ───────────────────────────────────────────────────────
  {
    id: "reel-veu-4-identidade",
    titulo: "Véu 4 — Identidade",
    descricao: "A máscara que aprendeste a usar. Vítor e a pergunta: quando a porta fecha, quem fica?",
    totalClips: 7,
    clips: [
      {
        id: "v4-id1",
        videoPrompt: "Cinematic slow motion: a theatrical mask resting on a vanity table, warm candlelight reflections, no person, elegant and slightly melancholic, cinematic grain",
        narracao: "Há uma versão de ti que é eficiente, disponível, que sabe o que os outros precisam.",
        duracao: 5,
        ficheiro: "v4-id1-mascara.mp3",
      },
      {
        id: "v4-id2",
        videoPrompt: "Slow motion: a person's hand closing a door from the inside, intimate moment, warm interior light, threshold between public and private self",
        narracao: "E depois, quando a porta fecha —",
        duracao: 3,
        ficheiro: "v4-id2-porta-fecha.mp3",
      },
      {
        id: "v4-id3",
        videoPrompt: "Cinematic: a person standing in a quiet, dimly lit room, back to camera, looking at their own blurred reflection in a dark window, contemplative and searching",
        narracao: "Quem fica?",
        duracao: 3,
        ficheiro: "v4-id3-quem-fica.mp3",
      },
      {
        id: "v4-id4",
        videoPrompt: "Close-up: hands slowly removing a watch or ring, small ritual of taking off the day's armour, warm side light, intimate and quiet, no face",
        narracao: "O Vítor viveu anos sem saber responder a isso.",
        duracao: 4,
        ficheiro: "v4-id4-tirar-armadura.mp3",
      },
      {
        id: "v4-id5",
        videoPrompt: "Slow motion: a mirror showing two slightly different reflections — artistic double exposure effect, metaphor for public versus true self, warm and cool tones contrasting",
        narracao: "A máscara que aprendeste a usar era necessária.",
        duracao: 4,
        ficheiro: "v4-id5-duplo-reflexo.mp3",
      },
      {
        id: "v4-id6",
        videoPrompt: "Cinematic: soft morning light illuminating a face partially, just the jawline and neck visible, calm and emerging from shadow, metaphor for identity surfacing",
        narracao: "O Espelho da Identidade senta-se com a pergunta de quem és quando não precisas de ser para ninguém.",
        duracao: 6,
        ficheiro: "v4-id6-emergir-sombra.mp3",
      },
      {
        id: "v4-id7",
        videoPrompt: "Slow motion: sunrise light slowly filling an empty room, golden hour, dust particles, peaceful revelation, wide shot, no people, feeling of space and freedom",
        narracao: "Maio 2026. seteveus.space",
        duracao: 3,
        ficheiro: "v4-id7-amanhecer-quarto.mp3",
      },
    ],
    narracaoCorrida: "Há uma versão de ti que é eficiente, disponível, que sabe o que os outros precisam. E depois, quando a porta fecha — quem fica? O Vítor viveu anos sem saber responder a isso. A máscara que aprendeste a usar era necessária. O Espelho da Identidade senta-se com a pergunta de quem és quando não precisas de ser para ninguém. Maio 2026. seteveus.space",
    ficheiroCorrida: "reel-veu4-identidade-corrida.mp3",
    caption: "Quando a porta fecha, quem fica?\n\nO Espelho da Identidade é sobre a máscara que usas tão bem que esqueceste o rosto.\n\nMaio 2026. Envia a quem sentes que nunca te mostra o que realmente sente.\n\nseteveus.space\n\n#OsSeteVeus #EspelhoDaIdentidade #Maio2026",
  },

  // ── VÉU 5 — CONTROLO ─────────────────────────────────────────────────────────
  {
    id: "reel-veu-5-controlo",
    titulo: "Véu 5 — Controlo",
    descricao: "O amor que, sem querer, apertou. Isabel e o controlo que isolou quem mais amava.",
    totalClips: 7,
    clips: [
      {
        id: "v5-co1",
        videoPrompt: "Cinematic close-up: hands arranging objects on a table with precise, controlled movements — cups, books, items in perfect order — warm side light, compulsive neatness",
        narracao: "Há um tipo de amor que organiza tudo.",
        duracao: 3,
        ficheiro: "v5-co1-organizar.mp3",
      },
      {
        id: "v5-co2",
        videoPrompt: "Slow motion: two silhouettes at a dinner table, one leaning forward animated, the other slightly withdrawn, warm restaurant light, distance despite proximity",
        narracao: "Que planeia, que antecipa, que resolve antes de ser pedido.",
        duracao: 4,
        ficheiro: "v5-co2-janta-distancia.mp3",
      },
      {
        id: "v5-co3",
        videoPrompt: "Close-up: a hand tightly gripping a phone, knuckles whitening slightly, then slowly releasing, metaphor for letting go of control, cinematic",
        narracao: "E não percebe que se foi tornando uma gaiola.",
        duracao: 4,
        ficheiro: "v5-co3-gaiola-mao.mp3",
      },
      {
        id: "v5-co4",
        videoPrompt: "Slow motion: an empty birdcage with the door open, soft natural light, no bird, metaphor for control and freedom, artistic and symbolic, warm tones",
        narracao: "Não por má vontade. Por amor mal distribuído.",
        duracao: 4,
        ficheiro: "v5-co4-gaiola-aberta.mp3",
      },
      {
        id: "v5-co5",
        videoPrompt: "Cinematic: a woman alone at a table set for many, looking at empty chairs, quiet and reflective, warm evening light, the irony of control creating solitude",
        narracao: "O controlo isolou quem mais amava.",
        duracao: 3,
        ficheiro: "v5-co5-mesa-sozinha.mp3",
      },
      {
        id: "v5-co6",
        videoPrompt: "Slow motion: hands slowly unclenching, palms opening upward, release gesture, soft light, metaphor for surrender and trust",
        narracao: "O Espelho do Controlo é sobre isso — o amor que, sem querer, apertou.",
        duracao: 5,
        ficheiro: "v5-co6-maos-soltar.mp3",
      },
      {
        id: "v5-co7",
        videoPrompt: "Cinematic wide shot: a woman walking away from camera into an open garden, arms slightly open, morning light, freedom and release, slow deliberate steps",
        narracao: "Junho 2026. seteveus.space",
        duracao: 3,
        ficheiro: "v5-co7-jardim-liberdade.mp3",
      },
    ],
    narracaoCorrida: "Há um tipo de amor que organiza tudo. Que planeia, que antecipa, que resolve antes de ser pedido. E não percebe que se foi tornando uma gaiola. Não por má vontade. Por amor mal distribuído. O controlo isolou quem mais amava. O Espelho do Controlo é sobre isso — o amor que, sem querer, apertou. Junho 2026. seteveus.space",
    ficheiroCorrida: "reel-veu5-controlo-corrida.mp3",
    caption: "Organizaste tudo. Planeaste tudo. Amaste à tua maneira.\n\nE não percebeste que isso os foi afastando.\n\nO Espelho do Controlo. Junho 2026.\n\nEnvia a quem ama tanto que sufoca.\n\nseteveus.space\n\n#OsSeteVeus #EspelhoDoControlo #Junho2026",
  },

  // ── VÉU 6 — DESEJO ───────────────────────────────────────────────────────────
  {
    id: "reel-veu-6-desejo",
    titulo: "Véu 6 — Desejo",
    descricao: "O que guardas sem nome. Lena e o desejo que esvaziou a amizade. Julho 2026.",
    totalClips: 7,
    clips: [
      {
        id: "v6-d1",
        videoPrompt: "Cinematic slow motion: a woman's gaze following something off-screen, longing in the eyes visible only through the softness of the expression, warm bokeh lights behind, no full face",
        narracao: "Há algo que queres.",
        duracao: 3,
        ficheiro: "v6-d1-olhar-longing.mp3",
      },
      {
        id: "v6-d2",
        videoPrompt: "Slow motion close-up: a hand reaching toward a window, almost touching the glass, the outside world blurred and luminous, metaphor for wanting what seems unreachable",
        narracao: "Mas não tens nome para isso.",
        duracao: 3,
        ficheiro: "v6-d2-mao-janela.mp3",
      },
      {
        id: "v6-d3",
        videoPrompt: "Cinematic: two women at a café table, one talking animatedly, the other listening but with a distant expression, warm light, the unspoken between friends",
        narracao: "Então procuras fora o que só existe dentro.",
        duracao: 4,
        ficheiro: "v6-d3-cafe-amiga.mp3",
      },
      {
        id: "v6-d4",
        videoPrompt: "Slow motion: beautiful food untouched on a plate, an empty glass, metaphor for desire without satisfaction, warm restaurant light, slightly melancholic",
        narracao: "E fica aquele vazio que nenhuma aquisição preenche.",
        duracao: 4,
        ficheiro: "v6-d4-prato-vazio.mp3",
      },
      {
        id: "v6-d5",
        videoPrompt: "Cinematic close-up: a woman's hand writing in a journal, pen moving slowly, she pauses and stares at the page, the act of beginning to name the unnamed",
        narracao: "O desejo só cresce quando não tem nome.",
        duracao: 4,
        ficheiro: "v6-d5-escrever-nomear.mp3",
      },
      {
        id: "v6-d6",
        videoPrompt: "Slow motion: sunrise over calm water, golden reflections, a boat in the distance, metaphor for desire as navigation not destination, wide cinematic shot",
        narracao: "O Espelho do Desejo é sobre aprender a nomear o que guardas.",
        duracao: 5,
        ficheiro: "v6-d6-amanhecer-agua.mp3",
      },
      {
        id: "v6-d7",
        videoPrompt: "Cinematic: a woman's hand resting open on a table, relaxed and receptive, warm soft light, metaphor for receiving what you've been denying yourself",
        narracao: "Julho 2026. seteveus.space",
        duracao: 3,
        ficheiro: "v6-d7-mao-aberta-receber.mp3",
      },
    ],
    narracaoCorrida: "Há algo que queres. Mas não tens nome para isso. Então procuras fora o que só existe dentro. E fica aquele vazio que nenhuma aquisição preenche. O desejo só cresce quando não tem nome. O Espelho do Desejo é sobre aprender a nomear o que guardas. Julho 2026. seteveus.space",
    ficheiroCorrida: "reel-veu6-desejo-corrida.mp3",
    caption: "Há algo que queres. E não tens nome para isso.\n\nEntão procuras fora. E fica aquele vazio.\n\nO Espelho do Desejo. Julho 2026.\n\nEnvia a quem compra, planeia, muda — e nunca chega.\n\nseteveus.space\n\n#OsSeteVeus #EspelhoDoDesejo #Julho2026",
  },

  // ── VÉU 7 — SEPARAÇÃO ────────────────────────────────────────────────────────
  {
    id: "reel-veu-7-separacao",
    titulo: "Véu 7 — Separação",
    descricao: "O que deixar ir para crescer. Helena e Miguel. A separação que reinventou o lar.",
    totalClips: 7,
    clips: [
      {
        id: "v7-s1",
        videoPrompt: "Cinematic slow motion: two chairs facing opposite directions in a warm empty room, metaphor for separation, late afternoon golden light, melancholic and beautiful",
        narracao: "Há perdas que não se explicam a ninguém.",
        duracao: 4,
        ficheiro: "v7-s1-cadeiras-opostas.mp3",
      },
      {
        id: "v7-s2",
        videoPrompt: "Slow motion close-up: a hand removing a photo from a shelf, the frame being gently placed face down, not with anger but with quiet grief, warm light",
        narracao: "Não são tragédias. São separações.",
        duracao: 3,
        ficheiro: "v7-s2-foto-guardada.mp3",
      },
      {
        id: "v7-s3",
        videoPrompt: "Cinematic: suitcase by a door, partially packed, the owner paused nearby looking at the room, back to camera, golden afternoon light, moment of reckoning",
        narracao: "De versões de ti que já não cabem.",
        duracao: 3,
        ficheiro: "v7-s3-mala-door.mp3",
      },
      {
        id: "v7-s4",
        videoPrompt: "Slow motion: autumn leaves falling from a tree in gentle wind, golden and amber tones, metaphor for natural letting go, cinematic wide shot",
        narracao: "De relações que precisavam de terminar para que ambos crescessem.",
        duracao: 5,
        ficheiro: "v7-s4-folhas-queda.mp3",
      },
      {
        id: "v7-s5",
        videoPrompt: "Cinematic close-up: a woman's hands holding an empty picture frame, looking through it at the world beyond, metaphor for reframing loss, warm light, hopeful",
        narracao: "A separação não é o fim. É o que torna o lar possível.",
        duracao: 4,
        ficheiro: "v7-s5-moldura-vazia.mp3",
      },
      {
        id: "v7-s6",
        videoPrompt: "Slow motion: a woman opening a window in a new room, fresh air coming in, light flooding the space, beginnings after endings, hopeful and quiet",
        narracao: "O Espelho da Separação acompanha esse território.",
        duracao: 4,
        ficheiro: "v7-s6-janela-nova.mp3",
      },
      {
        id: "v7-s7",
        videoPrompt: "Cinematic: a woman walking toward camera on a narrow street, early morning light, slight smile, alone but not lonely, quiet confidence emerging, soft focus background",
        narracao: "Agosto 2026. seteveus.space",
        duracao: 3,
        ficheiro: "v7-s7-mulher-caminha.mp3",
      },
    ],
    narracaoCorrida: "Há perdas que não se explicam a ninguém. Não são tragédias. São separações. De versões de ti que já não cabem. De relações que precisavam de terminar para que ambos crescessem. A separação não é o fim. É o que torna o lar possível. O Espelho da Separação acompanha esse território. Agosto 2026. seteveus.space",
    ficheiroCorrida: "reel-veu7-separacao-corrida.mp3",
    caption: "Há perdas que não se explicam a ninguém.\n\nNão são tragédias. São separações de versões de ti que já não cabem.\n\nO Espelho da Separação. Agosto 2026.\n\nEnvia a quem está a deixar ir algo que amou.\n\nseteveus.space\n\n#OsSeteVeus #EspelhoDaSeparacao #Agosto2026",
  },
];

// ─── TRAILER CINEMATOGRÁFICO — 12 CLIPS ───────────────────────────────────────
// ~48s. O mais épico. Para lançar a Jornada Completa e usar como bio link.

export const TRAILER_CINEMATOGRAFICO: VideoReel = {
  id: "trailer-jornada-completa",
  titulo: "Trailer — A Jornada Completa",
  descricao: "Trailer cinematográfico de 48s para os 7 Espelhos. Tom de filme. Para usar como vídeo de perfil, bio link, e campanha paga.",
  totalClips: 12,
  clips: [
    {
      id: "t1",
      videoPrompt: "Extreme close-up slow motion: a single drop of water falling into still water, perfect ripple expanding outward, black background, cinematic, metaphor for awakening",
      narracao: "Construíste uma vida inteira.",
      duracao: 3,
      ficheiro: "trailer-t1-gota.mp3",
    },
    {
      id: "t2",
      videoPrompt: "Cinematic slow motion: a woman's silhouette standing at a floor-to-ceiling window, city lights below, back to camera, alone at the top but something missing",
      narracao: "Tudo funciona. Tudo está no lugar certo.",
      duracao: 4,
      ficheiro: "trailer-t2-silhueta-cidade.mp3",
    },
    {
      id: "t3",
      videoPrompt: "Close-up: a hand pouring coffee, the steam rising, then hesitating — the cup not drunk. Metaphor for the moment of questioning automatic choices. Warm cinematic",
      narracao: "E há qualquer coisa que não encaixa.",
      duracao: 4,
      ficheiro: "trailer-t3-cafe-hesitacao.mp3",
    },
    {
      id: "t4",
      videoPrompt: "Cinematic montage: rapid slow-motion cuts — a mirror reflection, a closed door, a gripped table edge, an unsent message — all in dark warm tones, building tension",
      narracao: "Sete véus. Sete histórias.",
      duracao: 3,
      ficheiro: "trailer-t4-montagem.mp3",
    },
    {
      id: "t5",
      videoPrompt: "Cinematic: a series of faces in shadow — only jawlines and hands visible — each in their own quiet crisis, warm low light, intimate and universal",
      narracao: "Ilusão. Medo. Culpa. Identidade. Controlo. Desejo. Separação.",
      duracao: 5,
      ficheiro: "trailer-t5-sete-veus.mp3",
    },
    {
      id: "t6",
      videoPrompt: "Slow motion: a woman's hand pressing gently against a mirror, her reflection meeting her palm, the moment of recognition, warm amber light, very cinematic",
      narracao: "Cada um esconde algo que já sabes. Mas nunca disseste.",
      duracao: 5,
      ficheiro: "trailer-t6-espelho-mao.mp3",
    },
    {
      id: "t7",
      videoPrompt: "Cinematic: an open book on a table, pages turning slowly in a breeze, warm candle light, journal beside it, intimate reading atmosphere, metaphor for the experience",
      narracao: "Os Espelhos são histórias. Não te dizem o que fazer.",
      duracao: 4,
      ficheiro: "trailer-t7-livro-aberto.mp3",
    },
    {
      id: "t8",
      videoPrompt: "Close-up: a pen moving slowly across a journal page, writing that we cannot read, the act of reflection and writing, warm intimate light, personal and private",
      narracao: "Deixam-te reconhecer o que já sabes.",
      duracao: 4,
      ficheiro: "trailer-t8-escrever.mp3",
    },
    {
      id: "t9",
      videoPrompt: "Cinematic: abstract visualization of light breaking through — like dawn through clouds — gradual, inevitable, beautiful, metaphor for awakening consciousness",
      narracao: "Sete histórias. Ao teu ritmo. Com um diário. Com uma comunidade que desaparece.",
      duracao: 5,
      ficheiro: "trailer-t9-luz-amanhecer.mp3",
    },
    {
      id: "t10",
      videoPrompt: "Slow motion: a woman's hands holding a small light — a phone screen, a candle — in darkness, warmth in her palms, not alone, found something",
      narracao: "Há mais para ti do que aquilo que tens vivido.",
      duracao: 4,
      ficheiro: "trailer-t10-luz-maos.mp3",
    },
    {
      id: "t11",
      videoPrompt: "Cinematic: a door slowly opening to reveal warm golden morning light flooding a dark room, symbolic and powerful, no people, just light and possibility",
      narracao: "Os Sete Espelhos.",
      duracao: 3,
      ficheiro: "trailer-t11-porta-dourada.mp3",
    },
    {
      id: "t12",
      videoPrompt: "Wide cinematic shot: a woman walking into sunrise light, arms slightly open, pace slow and deliberate, completely alone but radiantly present, back to camera",
      narracao: "Uma jornada de autoconhecimento criada por Vivianne dos Santos. seteveus.space",
      duracao: 6,
      ficheiro: "trailer-t12-jornada-final.mp3",
    },
  ],
  narracaoCorrida: "Construíste uma vida inteira. Tudo funciona. Tudo está no lugar certo. E há qualquer coisa que não encaixa. Sete véus. Sete histórias. Ilusão. Medo. Culpa. Identidade. Controlo. Desejo. Separação. Cada um esconde algo que já sabes. Mas nunca disseste. Os Espelhos são histórias. Não te dizem o que fazer. Deixam-te reconhecer o que já sabes. Sete histórias. Ao teu ritmo. Com um diário. Com uma comunidade que desaparece. Há mais para ti do que aquilo que tens vivido. Os Sete Espelhos. Uma jornada de autoconhecimento criada por Vivianne dos Santos. seteveus.space",
  ficheiroCorrida: "trailer-jornada-completa-corrida.mp3",
  caption: "Sete véus. Sete histórias. Uma jornada.\n\nCada Espelho revela algo que já sabes mas nunca disseste.\n\nHá mais para ti.\n\nseteveus.space\n\n#OsSeteVeus #JornadaCompleta #Autoconhecimento",
};

// ─── CONTAGEM DECRESCENTE — ESPELHO DO MEDO (7 DIAS) ─────────────────────────
// 1 clip por dia. Para WhatsApp Status ou Stories. 12 clips no total (5 extras reutilizáveis).

export type ContagemdiaVideo = {
  dia: number;
  id: string;
  videoPrompt: string;
  narracao: string;
  duracao: number;
  ficheiro: string;
};

export const CONTAGEM_ESPELHO_MEDO: ContagemdiaVideo[] = [
  {
    dia: 7,
    id: "medo-d7",
    videoPrompt: "Cinematic slow motion: seven stones arranged in a row on a dark surface, one illuminated, warm candlelight from the side, countdown metaphor, artistic",
    narracao: "Faltam 7 dias para o Espelho do Medo. A história que não foi contada sobre o silêncio do Rui. seteveus.space",
    duracao: 5,
    ficheiro: "medo-contagem-dia7.mp3",
  },
  {
    dia: 6,
    id: "medo-d6",
    videoPrompt: "Cinematic: a clock face in close-up, second hand moving slowly, blurred warm bokeh background, anticipation and time, moody lighting",
    narracao: "6 dias. O Rui sabia o que queria dizer. E nunca disse. Reconheces esse peso?",
    duracao: 5,
    ficheiro: "medo-contagem-dia6.mp3",
  },
  {
    dia: 5,
    id: "medo-d5",
    videoPrompt: "Slow motion: autumn leaves on the ground, one being gently lifted by wind, metaphor for something stirring, dark earth tones with warm amber, cinematic",
    narracao: "5 dias. Há uma voz que diz não antes de pensares. Não é covardia. É um mecanismo antigo.",
    duracao: 6,
    ficheiro: "medo-contagem-dia5.mp3",
  },
  {
    dia: 4,
    id: "medo-d4",
    videoPrompt: "Cinematic close-up: a man's hand hesitating over a phone screen before making a call, tension in the fingers, moody side light, decision moment",
    narracao: "4 dias. O que guardas com o nome de bom senso pode ser apenas medo com boa apresentação.",
    duracao: 6,
    ficheiro: "medo-contagem-dia4.mp3",
  },
  {
    dia: 3,
    id: "medo-d5b",
    videoPrompt: "Slow motion: three candles, two lit, one unlit, warm intimate scene, progression and anticipation, dark background, cinematic",
    narracao: "3 dias. O Espelho do Medo chega em breve. E desta vez sai primeiro para quem já está dentro.",
    duracao: 5,
    ficheiro: "medo-contagem-dia3.mp3",
  },
  {
    dia: 2,
    id: "medo-d2",
    videoPrompt: "Close-up: a sunrise just beginning, the very first sliver of light at the horizon, dark above, warm below, metaphor for almost-there, cinematic",
    narracao: "Amanhã. O Espelho do Medo. A história do que o medo calou durante anos. Só para quem já está. seteveus.space",
    duracao: 6,
    ficheiro: "medo-contagem-dia2.mp3",
  },
  {
    dia: 1,
    id: "medo-d1",
    videoPrompt: "Cinematic: a door opening slowly to green morning light, fresh and alive, the threshold of something new beginning, symbolic and beautiful, no people",
    narracao: "Hoje. O Espelho do Medo está disponível. Para quem tem acesso. Começa aqui. seteveus.space",
    duracao: 5,
    ficheiro: "medo-contagem-dia1.mp3",
  },
];

// ─── CARTAS DE ÁUDIO — WHATSAPP (7 CARTAS, UMA POR VÉU) ──────────────────────
// Sem vídeo. Apenas áudio. Enviadas pelo WhatsApp pessoal da Vivianne ao grupo/lista.
// Tom: íntimo, pessoal, como se fosse uma nota de voz.
// ~45-60s cada. Vivianne fala na primeira pessoa.

export type CartaAudio = {
  id: string;
  veu: number;
  nome: string;
  ficheiro: string;
  texto: string;
};

export const CARTAS_AUDIO_WHATSAPP: CartaAudio[] = [
  {
    id: "carta-whatsapp-1-ilusao",
    veu: 1,
    nome: "A carta da Ilusão",
    ficheiro: "carta-wa-1-ilusao.mp3",
    texto: "Olá. Sou a Vivianne. Quero partilhar contigo algo que me passou pela cabeça esta manhã. Estava a fazer café — o mesmo que faço todos os dias — e perguntei-me: quando foi que escolhi isto? Não foi uma crise. Foi uma pergunta pequena. Mas ficou. E é exactamente esse o lugar onde tudo começa. Não na tragédia. Na rotina. Na chávena de café que nunca escolhemos verdadeiramente. Escrevi uma história sobre isso. Chama-se O Espelho da Ilusão. É para quem funciona bem e mesmo assim sente que há qualquer coisa a faltar. Se te reconheces — está em seteveus.space.",
  },
  {
    id: "carta-whatsapp-2-medo",
    veu: 2,
    nome: "A carta do Medo",
    ficheiro: "carta-wa-2-medo.mp3",
    texto: "Quero falar-te sobre o Rui. O Rui é uma personagem que criei para o segundo Espelho — o Espelho do Medo. O Rui sabe exactamente o que quer dizer. E antes de falar, conta. Pesa. Escolhe as palavras que não ocupem demasiado espaço. Conheces alguém assim? Conheces-te assim? O medo é humano. Mas viver uma vida inteira organizada à volta dele — isso é outra coisa. E essa outra coisa pode mudar. O Espelho do Medo sai em Março. Guarda o lugar. seteveus.space.",
  },
  {
    id: "carta-whatsapp-3-culpa",
    veu: 3,
    nome: "A carta da Culpa",
    ficheiro: "carta-wa-3-culpa.mp3",
    texto: "Há um erro de linguagem que muitas de nós cometemos. Chamamos amor ao que é na verdade culpa disfarçada de entrega. Entregamo-nos, servimos, antecipamos — e acreditamos que é amor. O Filipe no Espelho da Culpa fazia exactamente isso. Até que um dia olhou para si e não encontrou nada que fosse apenas seu. Não é falta de amor. É amor que se esqueceu de incluir a própria pessoa. O Espelho da Culpa é sobre isso. Sobre aprender a incluires-te. Abril 2026. seteveus.space.",
  },
  {
    id: "carta-whatsapp-4-identidade",
    veu: 4,
    nome: "A carta da Identidade",
    ficheiro: "carta-wa-4-identidade.mp3",
    texto: "Tenho uma pergunta para ti. Quando ninguém está a ver — quando a porta fecha e não precisas de ser para ninguém — quem és? Não a versão eficiente. Não a versão disponível. Quem és quando não tens papel a desempenhar? O Vítor no Espelho da Identidade viveu anos sem saber responder a isso. E a história dele é, de alguma forma, a de muitas de nós. O Espelho da Identidade chega em Maio. seteveus.space.",
  },
  {
    id: "carta-whatsapp-5-controlo",
    veu: 5,
    nome: "A carta do Controlo",
    ficheiro: "carta-wa-5-controlo.mp3",
    texto: "Escrevi o Espelho do Controlo para a Isabel — uma mulher que amava muito. Que organizava, planeava, antecipava. E que foi ficando cada vez mais sozinha enquanto tentava manter tudo no lugar. O controlo é, muitas vezes, medo com boa apresentação. Medo de que as pessoas que amamos nos deixem se não formos suficientemente necessárias. O Espelho do Controlo é sobre descobrir que podes ser amada sem seres imprescindível. Junho 2026. seteveus.space.",
  },
  {
    id: "carta-whatsapp-6-desejo",
    veu: 6,
    nome: "A carta do Desejo",
    ficheiro: "carta-wa-6-desejo.mp3",
    texto: "Há uma coisa que muitas vezes não nos ensinaram a fazer: querer. Querer genuinamente, sem desculpa, sem vergonha, sem imediatamente perguntar se merecemos. A Lena no Espelho do Desejo procurava fora o que só existia dentro. Comprava, planeava, mudava — e ficava com o mesmo vazio. O desejo não satisfeito não desaparece. Cresce. O Espelho do Desejo é sobre aprender a nomear o que guardas. Julho 2026. seteveus.space.",
  },
  {
    id: "carta-whatsapp-7-separacao",
    veu: 7,
    nome: "A carta da Separação",
    ficheiro: "carta-wa-7-separacao.mp3",
    texto: "O último Espelho é sobre separação. Não de pessoas, necessariamente. De versões de ti que já não cabem. De padrões que herdaste. De relações que precisavam de terminar para que ambos pudessem crescer. A Helena e o Miguel no Espelho da Separação não perdem um ao outro. Reinventam o que significa pertencer. É o mais difícil dos sete véus. E talvez o mais necessário. Agosto 2026. seteveus.space.",
  },
];

// ─── GUIAS DE RESPIRAÇÃO — ENTRE CAPÍTULOS ────────────────────────────────────
// Curtos. Usados na plataforma entre capítulos. ~30s cada.
// Tom: muito calmo, presente, sem dramatismo.

export type GuiaRespiracao = {
  id: string;
  nome: string;
  ficheiro: string;
  texto: string;
};

export const GUIAS_RESPIRACAO: GuiaRespiracao[] = [
  {
    id: "resp-pausa-suave",
    nome: "Pausa suave (universal)",
    ficheiro: "resp-pausa-suave.mp3",
    texto: "Faz uma pausa. Inspira devagar. Segura um momento. Expira. O que leste ainda está vivo em ti. Não tens de resolver nada agora. Não tens de perceber tudo. Deixa assentar. Quando estiveres pronta, continua.",
  },
  {
    id: "resp-antes-reflexao",
    nome: "Antes de escrever no diário",
    ficheiro: "resp-antes-reflexao.mp3",
    texto: "Antes de escreveres — respira. Não tens de encontrar as palavras certas. Não há resposta certa. Só o que é verdadeiro para ti, agora, neste momento. Escreve isso.",
  },
  {
    id: "resp-capitulo-pesado",
    nome: "Depois de um capítulo pesado",
    ficheiro: "resp-capitulo-pesado.mp3",
    texto: "Este capítulo pode ter tocado em algo que não esperavas. Isso é normal. Fecha os olhos. Três respirações. O que sentiste é informação — não é fraqueza. Estás bem. Podes continuar quando quiseres.",
  },
  {
    id: "resp-fim-espelho",
    nome: "Ao completar um Espelho",
    ficheiro: "resp-fim-espelho.mp3",
    texto: "Completaste este Espelho. Leva um momento para reconhecer isso. Não foi apenas leitura. Foi um trabalho interno. Respira. Algo em ti já é diferente — mesmo que ainda não saibas o quê.",
  },
  {
    id: "resp-boas-vindas",
    nome: "Boas-vindas ao novo membro",
    ficheiro: "resp-boas-vindas.mp3",
    texto: "Bem-vinda. Estou feliz por estares aqui. Esta plataforma foi criada para te acompanhar — não para te dizer o que fazer, não para te avaliar. Para estar contigo enquanto perguntas. Lê ao teu ritmo. Escreve o que sentires. E se quiser, partilha. Estamos aqui.",
  },
  {
    id: "resp-inicio-espelho-medo",
    nome: "Antes do Espelho do Medo",
    ficheiro: "resp-inicio-espelho-medo.mp3",
    texto: "O Espelho do Medo pode trazer à superfície coisas que guardaste há muito tempo. Isso é bom. Significa que estão prontas para ser vistas. Lê devagar. Podes parar quando precisares. Não há pressa aqui.",
  },
  {
    id: "resp-comunidade-ecos",
    nome: "Entrada na Comunidade Ecos",
    ficheiro: "resp-comunidade-ecos.mp3",
    texto: "O que escreves aqui desaparece em trinta dias. Ninguém sabe quem és. Não há histórico. Há apenas este momento, este texto, e a possibilidade de alguém em algum sítio reconhecer o que escreveste como seu. Isso é suficiente.",
  },
];

// ─── RESUMO DE USO DE CRÉDITOS ────────────────────────────────────────────────
/**
 * VÍDEO (78 créditos disponíveis):
 *   Série Véu a Véu:       7 reels × 7 clips = 49 clips
 *   Trailer cinematográfico:                   12 clips
 *   Contagem Espelho do Medo:                   7 clips
 *   Total:                                     68 clips  ← 10 créditos de reserva
 *
 * ÁUDIO — TTS (190.000 chars disponíveis, ~12.500 já usados):
 *   Narrações corridas dos 7 reels:      ~3.200 chars
 *   Narração corrida do trailer:           ~600 chars
 *   Contagems do Medo (7 × ~120):          ~840 chars
 *   Cartas WhatsApp (7 × ~600):          ~4.200 chars
 *   Guias de respiração (7 × ~220):      ~1.540 chars
 *   Subtotal novo conteúdo:             ~10.380 chars
 *   Total usado (com existente):        ~22.890 chars
 *   Restante para audiobook:           ~167.110 chars
 *
 * AUDIOBOOK RECOMENDADO com os ~167k restantes:
 *   Espelho da Ilusão (cap 1-7):        ~92.000 chars ✓
 *   Nó da Herança (cap 1-7):            ~70.000 chars ✓
 *   Total audiobooks:                  ~162.000 chars ✓
 *   MARGEM FINAL:                        ~5.000 chars
 */
