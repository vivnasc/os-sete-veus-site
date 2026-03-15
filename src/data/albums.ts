/**
 * Albums de Musica — Sete Veus
 *
 * Estilo: Contemporaneo organico-electronico (AwakeSoul / Aruna Serena / Vozes da Nova Terra)
 * — Producao: electronica organica, pads, synths quentes, piano, cordas, percussao suave
 * — Voz: feminina, com letra, poetica, intima
 * — Lingua: PT e EN (indicado por faixa)
 * — Universal: sem caixa etnica, instrumentacao varia conforme o tema
 * — Tom: intimo, transformativo, poetico, contemplativo
 *
 * 25 albums:
 * - 7 Espelhos (1 por veu)
 * - 7 Nos (1 por veu)
 * - 1 Livro filosofico
 * - 10 Cursos (1 por curso)
 */

export type AlbumTrack = {
  number: number;
  title: string;
  description: string;
  lang: "PT" | "EN";
  prompt: string;
  durationSeconds: number;
  audioUrl: string | null;
};

export type Album = {
  slug: string;
  title: string;
  subtitle: string;
  product: "espelho" | "no" | "livro" | "curso";
  veu?: number;
  courseSlug?: string;
  color: string;
  tracks: AlbumTrack[];
};

// ─────────────────────────────────────────────
// Paleta por veu
// ─────────────────────────────────────────────

const VEU_COLORS: Record<number, string> = {
  1: "#c9b896", // Ilusao — dourado
  2: "#8b9b8e", // Medo — verde sage
  3: "#b07a7a", // Culpa — rosa antigo
  4: "#ab9375", // Identidade — terra
  5: "#8aaaca", // Controlo — azul
  6: "#c08aaa", // Desejo — violeta rosa
  7: "#baaacc", // Separacao — lavanda
};

// ─────────────────────────────────────────────
// Helpers para prompts Suno AI
// ─────────────────────────────────────────────

const BASE_STYLE = "Contemporary organic-electronic, AwakeSoul. Warm female vocals with poetic lyrics. Soft synth pads, piano, subtle percussion, strings. Intimate, contemplative, transformative. No autotune. Clean vocal production.";

function espelhoPrompt(theme: string, emotion: string, production: string, lang: "PT" | "EN"): string {
  const langNote = lang === "PT" ? "Lyrics in Portuguese." : "Lyrics in English.";
  return `${BASE_STYLE} ${langNote} ${emotion}. ${production}. Theme: ${theme}.`;
}

function noPrompt(theme: string, emotion: string, production: string, lang: "PT" | "EN"): string {
  const langNote = lang === "PT" ? "Lyrics in Portuguese." : "Lyrics in English.";
  return `${BASE_STYLE} ${langNote} Duet energy, two vocal textures in dialogue. ${emotion}. ${production}. Theme: ${theme}.`;
}

function cursoPrompt(theme: string, emotion: string, production: string, lang: "PT" | "EN"): string {
  const langNote = lang === "PT" ? "Lyrics in Portuguese." : "Lyrics in English.";
  return `${BASE_STYLE} ${langNote} Evolving, grounded, building. ${emotion}. ${production}. Theme: ${theme}.`;
}

// ─────────────────────────────────────────────
// ESPELHOS (7 albums)
// ─────────────────────────────────────────────

const ESPELHO_ILUSAO: Album = {
  slug: "espelho-ilusao",
  title: "O Espelho da Ilusao",
  subtitle: "Quando a vida que tens nao foi a que escolheste",
  product: "espelho",
  veu: 1,
  color: VEU_COLORS[1],
  tracks: [
    { number: 1, title: "Despertar", description: "O momento antes da pergunta", lang: "PT", prompt: espelhoPrompt("awakening, first question", "dreamy, ethereal, slowly waking", "soft piano, reverb pads, whispering layers, slow build", "PT"), durationSeconds: 240, audioUrl: null },
    { number: 2, title: "The Coat I Never Chose", description: "A vida construida por outros", lang: "EN", prompt: espelhoPrompt("inherited life, wearing someone else's choices", "melancholic, gentle tension, realization", "piano arpeggios, warm synth bass, subtle strings, breath textures", "EN"), durationSeconds: 240, audioUrl: null },
    { number: 3, title: "Automatismos", description: "Os gestos que se repetem sem pensar", lang: "PT", prompt: espelhoPrompt("autopilot, repetition, mechanical living", "hypnotic, circular, slowly awakening", "looping piano motif, electronic pulse, vocal layers building awareness", "PT"), durationSeconds: 240, audioUrl: null },
    { number: 4, title: "A Pergunta do Cafe", description: "Quando foi que eu escolhi isto?", lang: "PT", prompt: espelhoPrompt("small question over morning coffee that changes everything", "curious, tender, dawning realization", "acoustic guitar, soft pad, intimate vocal close-mic, minimal percussion", "PT"), durationSeconds: 240, audioUrl: null },
    { number: 5, title: "The Body Knows", description: "O corpo ja sabia antes da mente", lang: "EN", prompt: espelhoPrompt("body wisdom, somatic truth, the body knew first", "grounding, warm, pulsing with life", "heartbeat rhythm, warm bass, organic percussion, breath sounds woven in", "EN"), durationSeconds: 240, audioUrl: null },
    { number: 6, title: "Honestidade Quieta", description: "Ver sem dramatizar", lang: "PT", prompt: espelhoPrompt("quiet honesty, seeing without drama, soft truth", "peaceful, still, accepting", "solo piano, distant choir pad, water-like textures, spacious", "PT"), durationSeconds: 240, audioUrl: null },
    { number: 7, title: "O Veu Cai", description: "O primeiro reconhecimento", lang: "PT", prompt: espelhoPrompt("the veil falls, first sight of truth, liberation", "liberating, tender, spacious, cathartic", "full arrangement, rising strings, vocal crescendo, open resolution, emotional release", "PT"), durationSeconds: 300, audioUrl: null },
  ],
};

const ESPELHO_MEDO: Album = {
  slug: "espelho-medo",
  title: "O Espelho do Medo",
  subtitle: "Quando o medo decide por ti",
  product: "espelho",
  veu: 2,
  color: VEU_COLORS[2],
  tracks: [
    { number: 1, title: "Cuidado", description: "A palavra que protege e aprisiona", lang: "PT", prompt: espelhoPrompt("caution, the word that protects and imprisons", "tense, careful, restrained, whispered", "muted piano, low synth drone, sparse percussion, silence as instrument", "PT"), durationSeconds: 240, audioUrl: null },
    { number: 2, title: "Measured Words", description: "Medir cada silaba antes de falar", lang: "EN", prompt: espelhoPrompt("measuring every word, self-censorship, walking on glass", "contained, precise, anxious undertone", "plucked strings, soft electronic pulse, gaps of silence, tension building", "EN"), durationSeconds: 240, audioUrl: null },
    { number: 3, title: "Paralisia Bonita", description: "A indecisao que parece prudencia", lang: "PT", prompt: espelhoPrompt("beautiful paralysis, indecision disguised as wisdom", "frozen, elegant stillness, aching beauty", "sustained synth drone, single piano notes dropping, wind textures", "PT"), durationSeconds: 240, audioUrl: null },
    { number: 4, title: "O Estomago Sabe", description: "Quando o corpo fala primeiro", lang: "PT", prompt: espelhoPrompt("gut feeling, body alarm, visceral knowledge", "visceral, uneasy then softening into acceptance", "low bass pulse, organic percussion building, rising warmth, body-felt", "PT"), durationSeconds: 240, audioUrl: null },
    { number: 5, title: "Messenger", description: "O medo como guia, nao inimigo", lang: "EN", prompt: espelhoPrompt("fear as messenger not enemy, reframing fear", "compassionate, understanding, spacious, wise", "warm melody over pad, gentle choir texture, earth-like grounding", "EN"), durationSeconds: 240, audioUrl: null },
    { number: 6, title: "Ouco-te Mas Vou", description: "Coragem quotidiana", lang: "PT", prompt: espelhoPrompt("I hear you but I'm going, daily courage, moving forward", "brave, warm, determined, empowering", "full rhythm emerging, rising vocal melody, strength in production", "PT"), durationSeconds: 240, audioUrl: null },
    { number: 7, title: "Devagar", description: "Iluminar sem pressa", lang: "PT", prompt: espelhoPrompt("slowly, illuminating without rush, gentle seeing", "patient, luminous, at peace, resolution", "open harmonics, warm pad fading into light, peaceful vocal", "PT"), durationSeconds: 300, audioUrl: null },
  ],
};

const ESPELHO_CULPA: Album = {
  slug: "espelho-culpa",
  title: "O Espelho da Culpa",
  subtitle: "Quando te castigas por querer mais",
  product: "espelho",
  veu: 3,
  color: VEU_COLORS[3],
  tracks: [
    { number: 1, title: "A Voz Baixa", description: "Devias estar a fazer outra coisa", lang: "PT", prompt: espelhoPrompt("the quiet voice saying you should be doing something else", "heavy, subdued, whispering inner critic", "low piano, muted synth, breath-like textures, minimal", "PT"), durationSeconds: 240, audioUrl: null },
    { number: 2, title: "Disguised Virtue", description: "Quando dar e obrigacao invisivel", lang: "EN", prompt: espelhoPrompt("giving as invisible obligation, false virtue, duty as love", "burdened, noble sadness, heaviness disguised as goodness", "slow strings, weighted bass, sighing pad textures", "EN"), durationSeconds: 240, audioUrl: null },
    { number: 3, title: "Alivio ou Alegria", description: "A diferenca entre querer e dever", lang: "PT", prompt: espelhoPrompt("relief vs joy, duty vs desire, learning the difference", "contrasting, questioning, tender discovery", "two melodic lines interweaving, piano and vocal, dialogue between duty and want", "PT"), durationSeconds: 240, audioUrl: null },
    { number: 4, title: "Heranca", description: "A culpa que nao e tua", lang: "PT", prompt: espelhoPrompt("inherited guilt, ancestral weight, not yours to carry", "ancient, heavy then slowly releasing", "deep pad, ancestral-feeling vocal, gradual lightening of texture", "PT"), durationSeconds: 240, audioUrl: null },
    { number: 5, title: "Deserve", description: "Merecer nao se conquista", lang: "EN", prompt: espelhoPrompt("deserving is not earned, inherent worth, you already deserve", "warm, affirming, gentle, like an embrace", "warm strings, soft heartbeat rhythm, comforting vocal", "EN"), durationSeconds: 240, audioUrl: null },
    { number: 6, title: "Pousar", description: "Posso pousar isto", lang: "PT", prompt: espelhoPrompt("laying it down, I can put this down, permission to release", "liberating, exhaling, lighter with each note", "descending melody, opening space, bird-like synth textures", "PT"), durationSeconds: 240, audioUrl: null },
    { number: 7, title: "Ternura", description: "Desmontar sem te castigar", lang: "PT", prompt: espelhoPrompt("tenderness, dismantling without punishment, self-compassion", "gentle, loving, free, final resolution", "full warm arrangement, vocal harmonics, resolution into peace", "PT"), durationSeconds: 300, audioUrl: null },
  ],
};

const ESPELHO_IDENTIDADE: Album = {
  slug: "espelho-identidade",
  title: "O Espelho da Identidade",
  subtitle: "Quando ja nao sabes quem es sem os outros",
  product: "espelho",
  veu: 4,
  color: VEU_COLORS[4],
  tracks: [
    { number: 1, title: "Mascaras", description: "Os papeis que vestem a pele", lang: "PT", prompt: espelhoPrompt("masks, roles, personas, wearing different skins", "layered, complex, shifting textures", "morphing synth textures, multiple vocal layers, shape-shifting production", "PT"), durationSeconds: 240, audioUrl: null },
    { number: 2, title: "Who Are You", description: "Quando ninguem te esta a ver", lang: "EN", prompt: espelhoPrompt("who are you when nobody is watching, unmasked and raw", "vulnerable, bare, honest, intimate", "solo vocal with minimal piano, silence, breath, raw", "EN"), durationSeconds: 240, audioUrl: null },
    { number: 3, title: "Armadura", description: "A certeza que parece forca", lang: "PT", prompt: espelhoPrompt("armor, certainty that looks like strength, false protection", "rigid then slowly softening, melting", "crystalline synth slowly melting into warm pad, tension to release", "PT"), durationSeconds: 240, audioUrl: null },
    { number: 4, title: "Espelho Interior", description: "Olhar sem julgar", lang: "PT", prompt: espelhoPrompt("inner mirror, looking without judging, self-seeing", "reflective, still water, contemplative", "water-like textures, reflective piano, gentle harmonics", "PT"), durationSeconds: 240, audioUrl: null },
    { number: 5, title: "Nameless", description: "O que sobra quando tiras tudo", lang: "EN", prompt: espelhoPrompt("what remains when you strip everything away, nameless essence", "minimal, essential, spacious, pure being", "single sustained note, silence, breath, then gentle emergence", "EN"), durationSeconds: 240, audioUrl: null },
    { number: 6, title: "Escolher a Mascara", description: "Usar sem colar a pele", lang: "PT", prompt: espelhoPrompt("choosing the mask consciously, wearing without fusing", "playful, light, aware, free", "rhythmic piano, dancing melody, lightness and joy", "PT"), durationSeconds: 240, audioUrl: null },
    { number: 7, title: "Eu Sem Justificacao", description: "Existir sem provar nada", lang: "PT", prompt: espelhoPrompt("existing without justification, being without proving", "peaceful, whole, complete, sovereign", "open harmonics, grounding bass, vocal peace, full resolution", "PT"), durationSeconds: 300, audioUrl: null },
  ],
};

const ESPELHO_CONTROLO: Album = {
  slug: "espelho-controlo",
  title: "O Espelho do Controlo",
  subtitle: "Quando segurar e a unica forma que conheces",
  product: "espelho",
  veu: 5,
  color: VEU_COLORS[5],
  tracks: [
    { number: 1, title: "Segurar", description: "A necessidade de ter tudo no lugar", lang: "PT", prompt: espelhoPrompt("holding tight, needing everything in place, control", "tense, ordered, gripping, mechanical precision", "tight electronic rhythm, precise synth, contained energy", "PT"), durationSeconds: 240, audioUrl: null },
    { number: 2, title: "Reliable", description: "A pessoa a quem todos recorrem", lang: "EN", prompt: espelhoPrompt("the reliable one, always available, the cost of being needed", "noble but exhausted, carrying the world", "steady rhythm carrying a heavy melody, weighted strings", "EN"), durationSeconds: 240, audioUrl: null },
    { number: 3, title: "Tres da Manha", description: "A insonia de repassar tudo", lang: "PT", prompt: espelhoPrompt("3am insomnia, replaying everything, mental loops", "restless, circular, dark, nocturnal", "night textures, repetitive piano motif, uneasy electronic pulse", "PT"), durationSeconds: 240, audioUrl: null },
    { number: 4, title: "Ilusao de Seguranca", description: "Se eu controlo, nada de mau acontece", lang: "PT", prompt: espelhoPrompt("illusion of safety, if I control nothing bad happens", "fragile certainty, glass-like, about to crack", "crystalline sounds, building tension, moment before breaking", "PT"), durationSeconds: 240, audioUrl: null },
    { number: 5, title: "Trust", description: "Aceitar que nao controlamos o resultado", lang: "EN", prompt: espelhoPrompt("trust, accepting we don't control the outcome, surrender", "opening, releasing, flowing like water", "flowing piano melody, loosening rhythm, water textures", "EN"), durationSeconds: 240, audioUrl: null },
    { number: 6, title: "Largar", description: "O mundo continua quando nao fazes", lang: "PT", prompt: espelhoPrompt("letting go, the world continues when you stop doing", "relief, surprise, lightness, wonder", "open spacious mix, bright textures, free vocal melody", "PT"), durationSeconds: 240, audioUrl: null },
    { number: 7, title: "Respirar", description: "Na respiracao, ha liberdade", lang: "PT", prompt: espelhoPrompt("breathing, in breath there is freedom", "free, expansive, peaceful, infinite", "breath-synced rhythm, open harmonics, vast warm soundscape", "PT"), durationSeconds: 300, audioUrl: null },
  ],
};

const ESPELHO_DESEJO: Album = {
  slug: "espelho-desejo",
  title: "O Espelho do Desejo",
  subtitle: "Quando desejas tudo menos o que precisas",
  product: "espelho",
  veu: 6,
  color: VEU_COLORS[6],
  tracks: [
    { number: 1, title: "Preencher", description: "Encher o tempo para nao ouvir o vazio", lang: "PT", prompt: espelhoPrompt("filling time to avoid hearing the void, busy emptiness", "busy, scattered, anxious, fragmented", "fast light electronic textures, fragmented melody, restless production", "PT"), durationSeconds: 240, audioUrl: null },
    { number: 2, title: "What's Missing", description: "O que nao se compra nem se agenda", lang: "EN", prompt: espelhoPrompt("what's missing, what you can't buy or schedule, unnamed longing", "yearning, deep, searching, aching beauty", "searching vocal melody, deep pad, longing strings", "EN"), durationSeconds: 240, audioUrl: null },
    { number: 3, title: "Mais Pequena", description: "Querer menos para nao incomodar", lang: "PT", prompt: espelhoPrompt("making yourself smaller, wanting less to not bother anyone", "diminished, quiet, hidden, barely there", "very soft production, contained vocal, small intimate sounds", "PT"), durationSeconds: 240, audioUrl: null },
    { number: 4, title: "A Hora Vazia", description: "Uma hora sem nada", lang: "PT", prompt: espelhoPrompt("the empty hour, sitting with nothing, no agenda", "spacious, uncomfortable then gradually peaceful", "silence, then slow emergence of piano, minimal, space as music", "PT"), durationSeconds: 240, audioUrl: null },
    { number: 5, title: "Empty", description: "Parar de fingir que esta cheia", lang: "EN", prompt: espelhoPrompt("stop pretending you're full, honest emptying", "releasing, honest, raw, courageous vulnerability", "descending melody, stripping layers, raw vocal", "EN"), durationSeconds: 240, audioUrl: null },
    { number: 6, title: "Desejo Verdadeiro", description: "O que a tua vida esta a pedir", lang: "PT", prompt: espelhoPrompt("true desire, what your life is asking of you", "warm, deep, knowing, embodied wanting", "rich warm synth tones, grounding bass, gentle warmth building", "PT"), durationSeconds: 240, audioUrl: null },
    { number: 7, title: "Espaco", description: "O vazio nao e ausencia — e espaco", lang: "PT", prompt: espelhoPrompt("space, emptiness is not absence, it is room", "open, vast, potential, full of possibility", "vast soundscape, open harmonics, voice floating in space, possibility", "PT"), durationSeconds: 300, audioUrl: null },
  ],
};

const ESPELHO_SEPARACAO: Album = {
  slug: "espelho-separacao",
  title: "O Espelho da Separacao",
  subtitle: "Quando te afastas de ti mesma para pertencer",
  product: "espelho",
  veu: 7,
  color: VEU_COLORS[7],
  tracks: [
    { number: 1, title: "Encolher para Caber", description: "Adaptar, moldar, perder a forma", lang: "PT", prompt: espelhoPrompt("shrinking to fit, adapting, losing your own shape", "constrained, adapting, diminishing, compressed", "compressed synth, constrained vocal, tight production, limited range", "PT"), durationSeconds: 240, audioUrl: null },
    { number: 2, title: "Together but Alone", description: "A solidao dentro da relacao", lang: "EN", prompt: espelhoPrompt("loneliness inside the relationship, together but alone", "lonely, disconnected, aching, two separate worlds", "two separate melodic lines not meeting, sadness in the gap", "EN"), durationSeconds: 240, audioUrl: null },
    { number: 3, title: "A Pergunta Evitada", description: "Se eu fosse so eu, quem seria?", lang: "PT", prompt: espelhoPrompt("the avoided question: who would I be if I were just me?", "brave, trembling, honest, raw courage", "single voice rising from silence, tentative piano, courage building", "PT"), durationSeconds: 240, audioUrl: null },
    { number: 4, title: "Separar", description: "Criar espaco, nao destruir", lang: "PT", prompt: espelhoPrompt("separating to create space, not to destroy", "bittersweet, necessary, tender, growth through distance", "melody splitting gracefully into two lines, both beautiful", "PT"), durationSeconds: 240, audioUrl: null },
    { number: 5, title: "What Remains", description: "So sai o que ja nao servia", lang: "EN", prompt: espelhoPrompt("what remains after letting go, only what no longer served leaves", "clear, pure, distilled, essential", "minimal clear tones, essential beauty, purified sound", "EN"), durationSeconds: 240, audioUrl: null },
    { number: 6, title: "Regresso", description: "O regresso a ti mesma", lang: "PT", prompt: espelhoPrompt("homecoming, the return to yourself", "warm, arriving, recognition, coming home", "returning melody, warmth rising, recognition in the voice", "PT"), durationSeconds: 240, audioUrl: null },
    { number: 7, title: "Sete Veus", description: "Sete camadas, sete regressos", lang: "PT", prompt: espelhoPrompt("seven veils, seven layers, seven returns, completion", "complete, whole, celebratory, at peace, full circle", "full arrangement, all emotional themes woven, vocal crescendo, peaceful resolution", "PT"), durationSeconds: 300, audioUrl: null },
  ],
};

// ─────────────────────────────────────────────
// NOS (7 albums)
// ─────────────────────────────────────────────

function noAlbum(
  veu: number,
  slug: string,
  title: string,
  subtitle: string,
  tracks: Omit<AlbumTrack, "audioUrl">[]
): Album {
  return {
    slug,
    title,
    subtitle,
    product: "no",
    veu,
    color: VEU_COLORS[veu],
    tracks: tracks.map((t) => ({ ...t, audioUrl: null })),
  };
}

const NO_HERANCA = noAlbum(1, "no-heranca", "O No da Heranca", "O silencio herdado entre mae e filha", [
  { number: 1, title: "A Mae que Viu", description: "Helena sempre soube", lang: "PT", prompt: noPrompt("mother who always saw, patient knowing", "patient, aching, maternal, waiting love", "warm cello-like synth, maternal vocal texture, gentle humming layer", "PT"), durationSeconds: 240 },
  { number: 2, title: "Years of Waiting", description: "Esperar que a filha veja", lang: "EN", prompt: noPrompt("years of waiting for your daughter to see, patient love", "slow, patient, enduring, time stretching", "sustained pad, patient piano, sense of time passing gently", "EN"), durationSeconds: 240 },
  { number: 3, title: "Duas Mulheres", description: "Mae e filha, frente a frente", lang: "PT", prompt: noPrompt("two women face to face, mother and daughter, raw meeting", "raw, vulnerable, brave, tender confrontation", "two vocal textures meeting, tentative harmony building", "PT"), durationSeconds: 240 },
  { number: 4, title: "O Que Nunca Foi Dito", description: "Palavras guardadas uma vida", lang: "PT", prompt: noPrompt("words kept a lifetime, what was never said, breaking silence", "heavy, breaking open, cathartic release", "silence breaking into melody, words becoming music, emotional release", "PT"), durationSeconds: 240 },
  { number: 5, title: "Desatar", description: "O no que se solta", lang: "PT", prompt: noPrompt("untying the knot, the bond that loosens, freedom together", "freeing, tender, relieved, resolution", "loosening rhythm, opening melody, relief washing through, warm ending", "PT"), durationSeconds: 300 },
]);

const NO_SILENCIO = noAlbum(2, "no-silencio", "O No do Silencio", "O que o medo calou entre eles", [
  { number: 1, title: "O Que Nao Disse", description: "Rui e Ana e o silencio entre eles", lang: "PT", prompt: noPrompt("what was never said between lovers, loaded silence", "tense, loaded silence, aching with unsaid words", "two melodic lines in silence, tension in the gaps, longing", "PT"), durationSeconds: 240 },
  { number: 2, title: "Protect or Hide", description: "Quando proteger e esconder", lang: "EN", prompt: noPrompt("protecting as hiding, love expressed as silence", "conflicted, protective, lonely in togetherness", "guarded vocal melody, restrained production, emotional walls", "EN"), durationSeconds: 240 },
  { number: 3, title: "A Primeira Palavra", description: "Quebrar o silencio", lang: "PT", prompt: noPrompt("the first word that breaks the silence, brave beginning", "brave, trembling, hopeful, cracking open", "first note breaking silence, tentative vocal dialogue emerging", "PT"), durationSeconds: 240 },
  { number: 4, title: "Ouvir de Verdade", description: "Quando ouvir e mais que escutar", lang: "PT", prompt: noPrompt("truly hearing, listening deeper than words", "open, receptive, present, understanding dawning", "call and response vocal, deepening harmony, understanding growing", "PT"), durationSeconds: 240 },
  { number: 5, title: "Voice", description: "Encontrar a voz que calaste", lang: "EN", prompt: noPrompt("finding the voice you silenced, speaking truth at last", "empowered, clear, connected, liberated", "two voices in full harmony, strength and clarity, liberation", "EN"), durationSeconds: 300 },
]);

const NO_SACRIFICIO = noAlbum(3, "no-sacrificio", "O No do Sacrificio", "A culpa disfarcada de entrega", [
  { number: 1, title: "Dar Ate Esvaziar", description: "Filipe e Luisa e a entrega sem retorno", lang: "PT", prompt: noPrompt("giving until empty, sacrifice without return", "depleted, noble, exhausted, hollow generosity", "diminishing melody, notes being given away, fading production", "PT"), durationSeconds: 240 },
  { number: 2, title: "Love or Debt", description: "Quando amar parece pagar", lang: "EN", prompt: noPrompt("love as debt, paying off guilt through giving", "transactional, weighted, sad realization", "counting rhythmic pattern, weighted bass, heaviness", "EN"), durationSeconds: 240 },
  { number: 3, title: "Receber", description: "Aprender a receber sem culpa", lang: "PT", prompt: noPrompt("learning to receive without guilt, accepting grace", "opening, softening, grateful, permission", "warmth flowing in, receiving melody, gratitude in voice", "PT"), durationSeconds: 240 },
  { number: 4, title: "Dois Inteiros", description: "Dois que dao por escolha", lang: "PT", prompt: noPrompt("two whole people giving by choice, not obligation", "balanced, mutual, joyful, equal", "balanced duet, mutual rhythm, wholeness in harmony", "PT"), durationSeconds: 240 },
  { number: 5, title: "True Giving", description: "Dar sem se perder", lang: "EN", prompt: noPrompt("true giving without losing yourself, generous freedom", "generous, free, loving, complete", "generous flowing melody, love without cost, free vocal", "EN"), durationSeconds: 300 },
]);

const NO_VERGONHA = noAlbum(4, "no-vergonha", "O No da Vergonha", "A mascara que caiu entre dois estranhos", [
  { number: 1, title: "Dois Estranhos", description: "Vitor e Mariana e o encontro sem mascara", lang: "PT", prompt: noPrompt("two strangers meeting unmasked, raw encounter", "raw, exposed, curious, electric honesty", "two unfamiliar melodic textures meeting, curiosity in the mix", "PT"), durationSeconds: 240 },
  { number: 2, title: "Seen", description: "A vergonha de ser reconhecido", lang: "EN", prompt: noPrompt("being truly seen, the shame of being recognized", "vulnerable, exposed, trembling, naked beauty", "exposed solo vocal, stripped production, trembling beauty", "EN"), durationSeconds: 240 },
  { number: 3, title: "Sem Papeis", description: "Quando os papeis caem entre dois", lang: "PT", prompt: noPrompt("roles falling away between two people, authenticity emerging", "liberating, honest, brave, truth surfacing", "layers dropping away in production, simplifying to truth", "PT"), durationSeconds: 240 },
  { number: 4, title: "Reconhecimento", description: "Eu vejo-te. E tu a mim.", lang: "PT", prompt: noPrompt("I see you and you see me, mutual recognition", "connecting, warm, deep, profound meeting", "two melodies finding harmony, recognition, warmth building", "PT"), durationSeconds: 240 },
  { number: 5, title: "Unapologetic", description: "Existir sem pedir desculpa", lang: "EN", prompt: noPrompt("existing without apology, unapologetic being", "free, proud, tender strength, sovereign", "proud melody standing tall, tender vocal strength, resolution", "EN"), durationSeconds: 300 },
]);

const NO_SOLIDAO = noAlbum(5, "no-solidao", "O No da Solidao", "O controlo que isolou quem mais amava", [
  { number: 1, title: "Ilha", description: "Isabel e Pedro e o isolamento do controlo", lang: "PT", prompt: noPrompt("island, isolation through control, surrounded but alone", "isolated, surrounded by silence, lonely in control", "solo vocal surrounded by empty space, island of sound", "PT"), durationSeconds: 240 },
  { number: 2, title: "Holding Too Tight", description: "Quando cuidar e aprisionar", lang: "EN", prompt: noPrompt("holding too tight, when caring becomes a cage", "gripping, suffocating love, well-meaning imprisonment", "tight rhythmic pattern around a trapped melody, tension", "EN"), durationSeconds: 240 },
  { number: 3, title: "Soltar", description: "Abrir as maos", lang: "PT", prompt: noPrompt("releasing, opening hands, letting go of grip", "releasing, letting flow, exhaling control", "opening rhythm, releasing notes into space, breathing room", "PT"), durationSeconds: 240 },
  { number: 4, title: "Lado a Lado", description: "Estar junto sem segurar", lang: "PT", prompt: noPrompt("side by side, together without holding, respectful closeness", "parallel, peaceful, trusting, mature love", "two parallel melodies with respectful space between, trust", "PT"), durationSeconds: 240 },
  { number: 5, title: "Bridge", description: "A solidao que se transforma em ponte", lang: "EN", prompt: noPrompt("solitude becoming a bridge, loneliness transformed to connection", "connecting, transforming, hopeful, beautiful evolution", "bridge melody connecting two voices, meeting in the middle, hope", "EN"), durationSeconds: 300 },
]);

const NO_VAZIO = noAlbum(6, "no-vazio", "O No do Vazio", "O desejo que esvaziou a amizade", [
  { number: 1, title: "Amigas", description: "Lena e Sofia e o que o desejo fez entre elas", lang: "PT", prompt: noPrompt("friends, what desire did to the friendship", "nostalgic, aching, lost, bittersweet memory", "nostalgic melody, fading harmony, sense of loss", "PT"), durationSeconds: 240 },
  { number: 2, title: "The Hole", description: "O vazio que nenhuma relacao preenche", lang: "EN", prompt: noPrompt("the void no relationship fills, inner emptiness", "empty, echoing, honest, unflinching truth", "hollow reverb textures, echo, vast empty sonic space", "EN"), durationSeconds: 240 },
  { number: 3, title: "Sem Preencher", description: "Estar no vazio sem fugir", lang: "PT", prompt: noPrompt("sitting with emptiness without fleeing, staying present", "still, present, brave, courageous stillness", "minimal production, still vocal, courageous silence", "PT"), durationSeconds: 240 },
  { number: 4, title: "Reencontro", description: "Reencontrar sem exigir", lang: "PT", prompt: noPrompt("reunion without demands, meeting again freely", "reconnecting, open, mature, wiser", "two melodies reconnecting wiser and freer, maturity", "PT"), durationSeconds: 240 },
  { number: 5, title: "True Friendship", description: "O espaco onde o desejo verdadeiro mora", lang: "EN", prompt: noPrompt("true friendship, the space where authentic desire lives", "genuine, warm, complete, satisfied peace", "warm duet, complete and satisfied, peaceful resolution", "EN"), durationSeconds: 300 },
]);

const NO_PERTENCA = noAlbum(7, "no-pertenca", "O No da Pertenca", "A separacao que reinventou o lar", [
  { number: 1, title: "O Lar que Sufocava", description: "Helena T. e Miguel C. e o lar que ja nao cabia", lang: "PT", prompt: noPrompt("the home that suffocated, outgrown space", "claustrophobic, heavy, outgrown, needing air", "compressed production, heavy textures, need for space audible", "PT"), durationSeconds: 240 },
  { number: 2, title: "Leaving", description: "A coragem de sair para encontrar", lang: "EN", prompt: noPrompt("courage to leave in order to find, necessary departure", "brave, sad, necessary, bittersweet courage", "departure melody, brave vocal steps forward, bittersweet beauty", "EN"), durationSeconds: 240 },
  { number: 3, title: "Sozinho", description: "O vazio fertil da solidao", lang: "PT", prompt: noPrompt("fertile solitude, alone but growing, discovering self", "solitary, growing, spacious, self-discovery", "solo vocal growing and expanding, discovering new range", "PT"), durationSeconds: 240 },
  { number: 4, title: "Reinventar", description: "Construir de novo, diferente", lang: "PT", prompt: noPrompt("rebuilding different this time, reinvention", "creative, hopeful, new, fresh foundation", "new melodic construction, different rhythm, hope in newness", "PT"), durationSeconds: 240 },
  { number: 5, title: "Belonging", description: "Pertencer comeca por dentro", lang: "EN", prompt: noPrompt("belonging starts within, self-belonging is home", "whole, home, complete, deep peace", "coming home melody, complete vocal, peaceful and whole, final resolution", "EN"), durationSeconds: 300 },
]);

// ─────────────────────────────────────────────
// LIVRO FILOSOFICO (1 album)
// ─────────────────────────────────────────────

const LIVRO_FILOSOFICO: Album = {
  slug: "livro-filosofico",
  title: "Os Sete Temas do Despertar",
  subtitle: "Sete camadas de consciencia — uma cartografia interior para quem esta pronta a dissolver o que ja nao serve",
  product: "livro",
  color: "#8B5CF6",
  tracks: [
    { number: 1, title: "O Convite", description: "O inicio da travessia interior", lang: "PT", prompt: `${BASE_STYLE} Lyrics in Portuguese. Opening, solemn yet warm, philosophical invitation. Piano, soft strings, spacious reverb. Beginning of a deep journey inward. A cartography of consciousness.`, durationSeconds: 300, audioUrl: null },
    { number: 2, title: "Permanence", description: "Encobre a impermanencia da vida, fazendo-nos acreditar num eu fixo e imutavel", lang: "EN", prompt: `${BASE_STYLE} Lyrics in English. Theme: permanence as illusion, the fixed self dissolving. Ethereal pads, soft vocal questioning what we cling to. Gentle dissolution of certainty. Tender, not dramatic.`, durationSeconds: 240, audioUrl: null },
    { number: 3, title: "Memoria", description: "Encobre a liberdade do presente, mantendo-nos presos as historias do passado", lang: "PT", prompt: `${BASE_STYLE} Lyrics in Portuguese. Theme: memory as prison, stories of the past holding us captive. Nostalgic melody slowly loosening, freeing from old narratives. Piano with reverb-heavy textures, time stretching.`, durationSeconds: 240, audioUrl: null },
    { number: 4, title: "Whirlwind", description: "Encobre o silencio do ser, confundindo-nos com pensamentos e emocoes que se agitam sem cessar", lang: "EN", prompt: `${BASE_STYLE} Lyrics in English. Theme: the whirlwind of thoughts and emotions hiding inner silence. Agitated textures gradually stilling. Building electronic layers that strip back to reveal quiet. Contemplative resolution.`, durationSeconds: 240, audioUrl: null },
    { number: 5, title: "Esforco", description: "Encobre o repouso interior, fazendo-nos acreditar que a plenitude depende da busca incessante", lang: "PT", prompt: `${BASE_STYLE} Lyrics in Portuguese. Theme: effort as veil, the belief that fullness requires endless striving. Busy, driven rhythm slowly releasing into rest. The beauty of stopping. Piano dissolving into silence.`, durationSeconds: 240, audioUrl: null },
    { number: 6, title: "Desolation", description: "Encobre a fertilidade do vazio, fazendo-o parecer abandono e ameaca", lang: "EN", prompt: `${BASE_STYLE} Lyrics in English. Theme: desolation hiding fertile emptiness, void that appears as threat but holds possibility. Deep, spacious, transforming emptiness into openness. Minimal then blooming.`, durationSeconds: 240, audioUrl: null },
    { number: 7, title: "Horizonte", description: "Encobre a infinitude da consciencia, sugerindo um destino final, uma chegada definitiva", lang: "PT", prompt: `${BASE_STYLE} Lyrics in Portuguese. Theme: the horizon as illusion of a final destination, when consciousness is infinite. Expansive, dissolving edges, no arrival only deepening. Vast warm soundscape, vocal reaching beyond.`, durationSeconds: 240, audioUrl: null },
    { number: 8, title: "Duality", description: "Encobre a unidade do real, mantendo a ilusao de que estamos separados", lang: "EN", prompt: `${BASE_STYLE} Lyrics in English. Theme: duality veiling unity, the illusion that we are separate. Two melodic lines merging into one. Separation dissolving. Resolution into oneness. Warm, complete.`, durationSeconds: 240, audioUrl: null },
    { number: 9, title: "O Espelho", description: "O olhar final — tudo o que atravessaste ja la estava", lang: "PT", prompt: `${BASE_STYLE} Lyrics in Portuguese. Closing. All seven themes woven together. Full arrangement, vocal crescendo. The mirror reflects wholeness that was always there. Peaceful, triumphant, complete resolution.`, durationSeconds: 300, audioUrl: null },
  ],
};

// ─────────────────────────────────────────────
// CURSOS (10 albums)
// ─────────────────────────────────────────────

function cursoAlbum(
  slug: string,
  courseSlug: string,
  title: string,
  subtitle: string,
  territory: string,
  tracks: Omit<AlbumTrack, "audioUrl">[]
): Album {
  return {
    slug,
    title,
    subtitle,
    product: "curso",
    courseSlug,
    color: "#8B5CF6",
    tracks: tracks.map((t) => ({ ...t, audioUrl: null })),
  };
}

const CURSO_OURO_PROPRIO = cursoAlbum("curso-ouro-proprio", "ouro-proprio", "Ouro Proprio", "A tua relacao com dinheiro", "Casa dos Espelhos Dourados", [
  { number: 1, title: "Espelhos Dourados", description: "O territorio onde o dinheiro mora", lang: "PT", prompt: cursoPrompt("golden mirrors, the territory where money lives", "amber, reflective, honest confrontation", "golden piano tones, mirror-like reverb, warm amber pads", "PT"), durationSeconds: 240 },
  { number: 2, title: "The Statement", description: "Olhar para os numeros sem desviar", lang: "EN", prompt: cursoPrompt("looking at the numbers without flinching, honest accounting", "confronting, grounding, brave, unflinching", "grounding bass, honest vocal melody, precise rhythm", "EN"), durationSeconds: 240 },
  { number: 3, title: "Heranca Financeira", description: "O dinheiro da tua familia", lang: "PT", prompt: cursoPrompt("family money story, inherited beliefs about wealth", "ancestral, complex, untangling patterns", "deep pad, ancestral vocal texture, untangling melodic lines", "PT"), durationSeconds: 240 },
  { number: 4, title: "Abundance", description: "Receber sem culpa", lang: "EN", prompt: cursoPrompt("deserving abundance, receiving without guilt", "opening, generous, golden, permission", "opening warm melody, flowing golden textures, abundance feeling", "EN"), durationSeconds: 240 },
  { number: 5, title: "Novo Espelho", description: "O reflexo que escolhes", lang: "PT", prompt: cursoPrompt("new mirror, the reflection you choose", "clear, chosen, golden peace, resolution", "clear golden tones, chosen vocal melody, peaceful resolution", "PT"), durationSeconds: 300 },
]);

const CURSO_SANGUE_SEDA = cursoAlbum("curso-sangue-seda", "sangue-e-seda", "Sangue e Seda", "A tua mae, a tua historia", "Arvore das Raizes Visiveis", [
  { number: 1, title: "Raizes", description: "O que veio antes de ti", lang: "PT", prompt: cursoPrompt("roots, what came before you, ancestral ground", "deep red, ancient, grounding", "deep bass, rich strings, root-like grounding sounds", "PT"), durationSeconds: 240 },
  { number: 2, title: "The Inner Mother", description: "A mae que carregas dentro", lang: "EN", prompt: cursoPrompt("the inner mother, the one you carry within", "maternal, complex, tender, layered", "maternal vocal humming, complex layered harmony, tenderness", "EN"), durationSeconds: 240 },
  { number: 3, title: "Sangue", description: "O que herdaste no sangue", lang: "PT", prompt: cursoPrompt("blood inheritance, what runs deep in your veins", "visceral, pulsing, deep connection", "heartbeat rhythm, deep organic percussion, blood-pulse bass", "PT"), durationSeconds: 240 },
  { number: 4, title: "Silk", description: "A suavidade que repara", lang: "EN", prompt: cursoPrompt("silk, the softness that heals, tenderness as medicine", "gentle, silk-like, healing, soft touch", "silky strings, gentle flowing melody, healing vocal texture", "EN"), durationSeconds: 240 },
  { number: 5, title: "Amanhecer", description: "A arvore com raizes reorganizadas", lang: "PT", prompt: cursoPrompt("dawn, reorganized roots, new growth from old ground", "dawn, growing, reorganized, fresh start", "dawn-like rising melody, new growth textures, reorganized beauty", "PT"), durationSeconds: 300 },
]);

const CURSO_ARTE_INTEIREZA = cursoAlbum("curso-arte-inteireza", "a-arte-da-inteireza", "A Arte da Inteireza", "Amar sem te perderes", "Ponte entre Duas Margens", [
  { number: 1, title: "Desaparecer", description: "O momento em que te perdes no outro", lang: "PT", prompt: cursoPrompt("disappearing in the other, losing yourself in love", "dissolving, losing shape, merging", "dissolving melody, water-like textures, losing form beautifully", "PT"), durationSeconds: 240 },
  { number: 2, title: "Two Shores", description: "Tu e o outro, separados mas ligados", lang: "EN", prompt: cursoPrompt("two shores, connected yet separate, space between", "bridging, respectful space, seeing across", "two melodic lines across sonic space, bridge slowly forming", "EN"), durationSeconds: 240 },
  { number: 3, title: "Inteira", description: "Estar completa antes de estar com alguem", lang: "PT", prompt: cursoPrompt("whole before together, complete in yourself first", "whole, complete, self-possessed, sovereign", "complete self-contained melody, beautiful alone, full vocal", "PT"), durationSeconds: 240 },
  { number: 4, title: "The Bridge", description: "Encontrar sem se perder", lang: "EN", prompt: cursoPrompt("the bridge, meeting without losing yourself", "connected, balanced, harmonious, mature love", "balanced duet over bridge of sound, meeting in wholeness", "EN"), durationSeconds: 300 },
]);

const CURSO_DEPOIS_FOGO = cursoAlbum("curso-depois-fogo", "depois-do-fogo", "Depois do Fogo", "Recomecar apos a destruicao", "Campo Queimado", [
  { number: 1, title: "Cinzas", description: "O que sobrou depois do fogo", lang: "PT", prompt: cursoPrompt("ashes, what remains after fire, aftermath", "charcoal grey, devastated, still, quiet devastation", "ash-like textures, silence after destruction, still production", "PT"), durationSeconds: 240 },
  { number: 2, title: "Ember", description: "O que ainda arde por dentro", lang: "EN", prompt: cursoPrompt("ember still burning inside, inner fire surviving", "glowing, alive beneath ashes, stubborn warmth", "glowing warm synth, ember-like pulsing, inner fire texture", "EN"), durationSeconds: 240 },
  { number: 3, title: "Broto", description: "A primeira vida nova", lang: "PT", prompt: cursoPrompt("first sprout, new life after devastation, fragile hope", "green, fragile, hopeful, tender emergence", "tender new melody, fragile beautiful vocal, green growth sounds", "PT"), durationSeconds: 240 },
  { number: 4, title: "Different", description: "O novo nao e o antigo — e outra coisa", lang: "EN", prompt: cursoPrompt("the new is not the old, it is something else entirely", "transformed, different, evolved, acceptance of change", "transformed melody, new form, evolved beauty, resolution", "EN"), durationSeconds: 300 },
]);

const CURSO_OLHOS_ABERTOS = cursoAlbum("curso-olhos-abertos", "olhos-abertos", "Olhos Abertos", "Decidir com clareza", "Encruzilhada Infinita", [
  { number: 1, title: "Nevoeiro", description: "Quando nao se ve o caminho", lang: "PT", prompt: cursoPrompt("fog, when you can't see the path ahead", "foggy, confused, searching, disoriented", "foggy reverb textures, searching melody, unclear direction", "PT"), durationSeconds: 240 },
  { number: 2, title: "Crossroads", description: "Muitos caminhos, nenhuma certeza", lang: "EN", prompt: cursoPrompt("crossroads, many paths, no certainty, standing still", "multiplicity, indecision, paralysis of choice", "multiple melodic fragments competing, indecision in rhythm", "EN"), durationSeconds: 240 },
  { number: 3, title: "Clareza", description: "O nevoeiro que comeca a levantar", lang: "PT", prompt: cursoPrompt("clarity, fog beginning to lift, seeing through", "clearing, emerging vision, light coming through", "clearing textures, emerging vocal melody, light building", "PT"), durationSeconds: 240 },
  { number: 4, title: "First Step", description: "A silhueta da o primeiro passo", lang: "EN", prompt: cursoPrompt("the first step, choosing a direction, walking forward", "decisive, brave, clear, momentum", "decisive rhythm beginning, first clear step, direction found", "EN"), durationSeconds: 300 },
]);

const CURSO_PELE_LEMBRA = cursoAlbum("curso-pele-lembra", "a-pele-lembra", "A Pele Lembra", "O corpo como territorio", "Corpo-Paisagem", [
  { number: 1, title: "Mapa do Corpo", description: "O corpo como paisagem desconhecida", lang: "PT", prompt: cursoPrompt("body map, the body as unknown landscape to explore", "exploratory, somatic, discovering, curious", "body-percussion-like textures, exploring melody, somatic awareness", "PT"), durationSeconds: 240 },
  { number: 2, title: "Skin Memory", description: "O que a pele guardou", lang: "EN", prompt: cursoPrompt("skin memory, what the body stored and kept", "tactile, remembered, stored sensations surfacing", "textural intimate sounds, memory-like melody, touch and warmth", "EN"), durationSeconds: 240 },
  { number: 3, title: "Habitar", description: "Voltar a viver no corpo", lang: "PT", prompt: cursoPrompt("inhabiting, returning to live in the body again", "embodied, present, grounded, arrived", "grounded rhythm, inhabited vocal, fully present production", "PT"), durationSeconds: 240 },
  { number: 4, title: "Home Body", description: "O corpo como lar", lang: "EN", prompt: cursoPrompt("body as home, lived in and loved, flesh as belonging", "home, warm, belonging, complete embodiment", "warm home-like melody, belonging vocal, body as sanctuary", "EN"), durationSeconds: 300 },
]);

const CURSO_LIMITE_SAGRADO = cursoAlbum("curso-limite-sagrado", "limite-sagrado", "Limite Sagrado", "Dizer nao sem culpa", "Muralha que Nasce do Chao", [
  { number: 1, title: "Sem Muralha", description: "Viver sem limites, sem proteccao", lang: "PT", prompt: cursoPrompt("no walls, living unprotected, without boundaries", "exposed, vulnerable, boundaryless, overwhelmed", "exposed vocal melody, no sonic boundaries, open vulnerability", "PT"), durationSeconds: 240 },
  { number: 2, title: "Wall of Light", description: "O limite que nasce de dentro", lang: "EN", prompt: cursoPrompt("wall of light, the boundary that grows from within", "luminous, strong, protecting, inner golden strength", "luminous golden synth, strength in vocal, inner wall of sound", "EN"), durationSeconds: 240 },
  { number: 3, title: "A Porta", description: "O limite tem porta — tu decides quem entra", lang: "PT", prompt: cursoPrompt("the door, the boundary has a door, you decide who enters", "discerning, powerful, chosen, sovereign choice", "door-opening texture, selective melody, power of conscious choice", "PT"), durationSeconds: 240 },
  { number: 4, title: "Sacred", description: "O limite como acto de amor", lang: "EN", prompt: cursoPrompt("sacred boundary, limit as an act of love", "sacred, loving, complete, holy protection", "sacred vocal melody, loving boundary in production, golden peace", "EN"), durationSeconds: 300 },
]);

const CURSO_FLORES_ESCURO = cursoAlbum("curso-flores-escuro", "flores-no-escuro", "Flores no Escuro", "Atravessar o luto", "Jardim Subterraneo", [
  { number: 1, title: "Caverna", description: "O escuro total do luto", lang: "PT", prompt: cursoPrompt("cave, total darkness of grief, underground", "deep, dark, underground, grief's depth", "deep underground textures, darkness in production, cave-like reverb", "PT"), durationSeconds: 240 },
  { number: 2, title: "Glow", description: "A luz que nasce do escuro", lang: "EN", prompt: cursoPrompt("bioluminescence, light born from darkness itself", "magical, emerging, glowing from within", "glowing synth textures, emerging light, magical organic growth", "EN"), durationSeconds: 240 },
  { number: 3, title: "Flores", description: "A beleza que cresce no luto", lang: "PT", prompt: cursoPrompt("flowers growing in grief, beauty from darkness", "delicate, beautiful, resilient, life despite", "delicate melody, beautiful despite darkness, resilient vocal", "PT"), durationSeconds: 240 },
  { number: 4, title: "Garden", description: "O jardim subterraneo iluminado", lang: "EN", prompt: cursoPrompt("underground garden illuminated, grief transformed to beauty", "luminous, transformed, alive, grief become garden", "full luminous production, alive with light, transformed grief into beauty", "EN"), durationSeconds: 300 },
]);

const CURSO_PESO_CHAO = cursoAlbum("curso-peso-chao", "o-peso-e-o-chao", "O Peso e o Chao", "Largar o que carregas", "Caminho de Pedras", [
  { number: 1, title: "Pedras", description: "O peso que carregas", lang: "PT", prompt: cursoPrompt("stones, the weight you carry, burden on shoulders", "heavy, burdened, carrying, weighed down", "heavy deep bass, weighted melody, carrying burden in rhythm", "PT"), durationSeconds: 240 },
  { number: 2, title: "Bent", description: "O corpo sob o peso", lang: "EN", prompt: cursoPrompt("bent under weight, body burdened, compressed by carrying", "bent, compressed, aching, physical weight", "compressed production, bent vocal melody, aching body awareness", "EN"), durationSeconds: 240 },
  { number: 3, title: "Pousar", description: "Largar as pedras no chao", lang: "PT", prompt: cursoPrompt("laying stones down, releasing weight, permission to put it down", "releasing, lighter, exhaling, relief", "stones dropping away in production, lightening melody, exhale vocal", "PT"), durationSeconds: 240 },
  { number: 4, title: "Standing", description: "Erguida, leve, as pedras no chao", lang: "EN", prompt: cursoPrompt("standing tall, light, stones on the ground, unburdened", "light, upright, free, weightless joy", "light free melody, standing tall vocal, liberated movement in rhythm", "EN"), durationSeconds: 300 },
]);

const CURSO_VOZ_DENTRO = cursoAlbum("curso-voz-dentro", "voz-de-dentro", "Voz de Dentro", "Encontrar a tua voz", "Sala do Eco", [
  { number: 1, title: "Silencio", description: "A sala vazia antes da voz", lang: "PT", prompt: cursoPrompt("silence, the empty room before the voice comes", "silent, waiting, dark violet, anticipation", "silence, waiting sonic space, violet darkness, anticipation", "PT"), durationSeconds: 240 },
  { number: 2, title: "Echo", description: "O primeiro som que volta", lang: "EN", prompt: cursoPrompt("first echo, the sound that comes back, hearing yourself", "resonant, discovering, golden echo, wonder", "echo textures, resonant return of voice, discovering self-sound", "EN"), durationSeconds: 240 },
  { number: 3, title: "Voz", description: "A voz que sempre esteve la", lang: "PT", prompt: cursoPrompt("the voice that was always there, finding it at last", "clear, strong, authentic, recognition", "clear vocal emerging strong, authentic melody, self-recognition", "PT"), durationSeconds: 240 },
  { number: 4, title: "Sing", description: "A voz que canta por fim", lang: "EN", prompt: cursoPrompt("singing at last, voice freed, the full expression", "singing, free, joyful, complete, triumphant", "full voice singing free, joyful vocal resolution, complete expression", "EN"), durationSeconds: 300 },
]);

// ─────────────────────────────────────────────
// EXPORT
// ─────────────────────────────────────────────

export const ALL_ALBUMS: Album[] = [
  // Espelhos
  ESPELHO_ILUSAO,
  ESPELHO_MEDO,
  ESPELHO_CULPA,
  ESPELHO_IDENTIDADE,
  ESPELHO_CONTROLO,
  ESPELHO_DESEJO,
  ESPELHO_SEPARACAO,
  // Nos
  NO_HERANCA,
  NO_SILENCIO,
  NO_SACRIFICIO,
  NO_VERGONHA,
  NO_SOLIDAO,
  NO_VAZIO,
  NO_PERTENCA,
  // Livro
  LIVRO_FILOSOFICO,
  // Cursos
  CURSO_OURO_PROPRIO,
  CURSO_SANGUE_SEDA,
  CURSO_ARTE_INTEIREZA,
  CURSO_DEPOIS_FOGO,
  CURSO_OLHOS_ABERTOS,
  CURSO_PELE_LEMBRA,
  CURSO_LIMITE_SAGRADO,
  CURSO_FLORES_ESCURO,
  CURSO_PESO_CHAO,
  CURSO_VOZ_DENTRO,
];

// Helpers
export function getAlbumsByProduct(product: Album["product"]) {
  return ALL_ALBUMS.filter((a) => a.product === product);
}

export function getAlbumBySlug(slug: string) {
  return ALL_ALBUMS.find((a) => a.slug === slug);
}

export function getAlbumsByVeu(veu: number) {
  return ALL_ALBUMS.filter((a) => a.veu === veu);
}

export function getTotalTracks() {
  return ALL_ALBUMS.reduce((sum, a) => sum + a.tracks.length, 0);
}
