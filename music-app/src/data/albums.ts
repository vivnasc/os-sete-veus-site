/**
 * Albums de Musica — Sete Veus
 *
 * Estilo: Contemporaneo organico-electronico (AwakeSoul / Loranne / Vozes da Nova Terra)
 * — Producao: electronica organica, pads, synths quentes, piano, cordas, percussao suave
 * — Voz: feminina, com letra, poetica, intima
 * — Lingua: PT e EN (indicado por faixa)
 * — Universal: sem caixa etnica, instrumentacao varia conforme o tema
 * — Tom: intimo, transformativo, poetico, contemplativo
 *
 * 45 albums:
 * - 7 Espelhos (1 por veu)
 * - 7 Nos (1 por veu)
 * - 1 Livro filosofico
 * - 20 Cursos (1 por curso)
 * - 20 Espirituais (coleccao Espiritual — espiritualidade crua, corporal, sem religiao)
 */

export type AlbumTrack = {
  number: number;
  title: string;
  description: string;
  lang: "PT" | "EN";
  energy: TrackEnergy;
  flavor: TrackFlavor;
  prompt: string;
  lyrics: string;
  durationSeconds: number;
  audioUrl: string | null;
};

// Internal type for track definitions (lyrics applied at export via applyLyrics)
// energy defaults to "whisper" if omitted — retrocompativel com todas as faixas existentes
// flavor defaults to "organic" if omitted
type TrackDef = Omit<AlbumTrack, "lyrics" | "energy" | "flavor"> & { lyrics?: string; energy?: TrackEnergy; flavor?: TrackFlavor };
type AlbumDef = Omit<Album, "tracks"> & { tracks: TrackDef[] };

// Lyrics are stored in separate files to keep this file manageable
import { ESPELHO_LYRICS } from "./lyrics-espelhos";
import { NO_LYRICS } from "./lyrics-nos";
import { LIVRO_LYRICS, CURSO_LYRICS } from "./lyrics-livro-cursos";
import { ESPIRITUAL_LYRICS } from "./lyrics-espirituais";

const ALL_LYRICS: Record<string, string> = {
  ...ESPELHO_LYRICS,
  ...NO_LYRICS,
  ...LIVRO_LYRICS,
  ...CURSO_LYRICS,
  ...ESPIRITUAL_LYRICS,
};

function getLyrics(albumSlug: string, trackNumber: number): string {
  return ALL_LYRICS[`${albumSlug}/${trackNumber}`] || "";
}

export type Album = {
  slug: string;
  title: string;
  subtitle: string;
  product: "espelho" | "no" | "livro" | "curso" | "espiritual";
  veu?: number;
  courseSlug?: string;
  color: string;
  tracks: AlbumTrack[];
};

// ─────────────────────────────────────────────
// Paleta por veu
// ─────────────────────────────────────────────

const VEU_COLORS: Record<number, string> = {
  1: "#c9b896", // Ilusão — dourado
  2: "#8b9b8e", // Medo — verde sage
  3: "#b07a7a", // Culpa — rosa antigo
  4: "#ab9375", // Identidade — terra
  5: "#8aaaca", // Controlo — azul
  6: "#c08aaa", // Desejo — violeta rosa
  7: "#baaacc", // Separação — lavanda
};

// ─────────────────────────────────────────────
// Helpers para prompts Suno AI
// ─────────────────────────────────────────────

// Energia da faixa — define o registo musical
// whisper: intimo, contemplativo (o que já existia)
// steady: medio, grounded, walking pace
// pulse: energetico, ritmico, para correr/carro
// anthem: declarativo, forte, hino de afirmacao
// raw: cru, emocional, sem filtro
export type TrackEnergy = "whisper" | "steady" | "pulse" | "anthem" | "raw";

// Sabor musical — genero especifico (segunda dimensao alem da energia)
// organic: o som base Loranne (default)
// marrabenta: marrabenta mocambicana, estilo Neyma — ritmo especifico, não "africano" generico
// house: house/dance, four-on-the-floor, como "Nada Me Faltara"
// gospel: gospel/espiritual, coral, como um hino de igreja
export type TrackFlavor = "organic" | "marrabenta" | "house" | "gospel";

const ENERGY_STYLES: Record<TrackEnergy, string> = {
  whisper: "Contemporary organic-electronic, AwakeSoul. Warm female vocals with poetic lyrics. Soft synth pads, piano, subtle percussion, strings. Intimate, contemplative, transformative. No autotune. Clean vocal production.",
  steady: "Contemporary organic-electronic. Warm female vocals with poetic lyrics. Mid-tempo groove, grounded rhythm, acoustic guitar, warm bass, light percussion, piano accents. Walking pace, present, embodied. No autotune. Clean vocal production.",
  pulse: "Contemporary pop-electronic, empowering. Strong female vocals with conviction. Driving beat, rhythmic synths, bass-forward, claps, energy builds. Upbeat, momentum, forward motion. Great for running or driving. No autotune. Clean vocal production.",
  anthem: "Contemporary empowerment anthem. Powerful female vocals, declarative, full-chested. Big chorus, layered vocals, driving drums, rising strings, synth stabs. Bold, celebratory, unstoppable. Stadium energy meets intimacy. No autotune. Clean vocal production.",
  raw: "Stripped-back emotional. Raw female vocals, close-mic, imperfect beauty. Minimal production — solo piano or guitar, breath sounds, silence as instrument. Vulnerable, unpolished, real. No autotune. Clean vocal production.",
};

// Modificadores de sabor — só aplicados quando o sabor não é"organic"
const FLAVOR_MODIFIERS: Record<TrackFlavor, string> = {
  organic: "",
  marrabenta: "Marrabenta mocambicana, estilo Neyma. Guitar-driven groove, shaker percussion, warm bass rhythm, danceable Mozambican feel, joyful and grounded.",
  house: "House music influence, four-on-the-floor kick, deep bass, hi-hat groove, synth stabs, club warmth, dance-floor energy, infectious rhythmic drive.",
  gospel: "Gospel-inspired, choir harmonies, hand claps, organ warmth, uplifting spiritual energy, community singing feel, call-and-response vocals, celebratory, transcendent.",
};

function buildPromptWithFlavor(basePrompt: string, flavor: TrackFlavor): string {
  const mod = FLAVOR_MODIFIERS[flavor];
  return mod ? `${basePrompt} ${mod}` : basePrompt;
}

// Retrocompatibilidade: BASE_STYLE = whisper (o default anterior)
const BASE_STYLE = ENERGY_STYLES.whisper;

function espelhoPrompt(theme: string, emotion: string, production: string, lang: "PT" | "EN", energy: TrackEnergy = "whisper", flavor: TrackFlavor = "organic"): string {
  const langNote = lang === "PT" ? "Lyrics in Portuguese." : "Lyrics in English.";
  return buildPromptWithFlavor(`${ENERGY_STYLES[energy]} ${langNote} ${emotion}. ${production}. Theme: ${theme}.`, flavor);
}

function noPrompt(theme: string, emotion: string, production: string, lang: "PT" | "EN", energy: TrackEnergy = "whisper", flavor: TrackFlavor = "organic"): string {
  const langNote = lang === "PT" ? "Lyrics in Portuguese." : "Lyrics in English.";
  return buildPromptWithFlavor(`${ENERGY_STYLES[energy]} ${langNote} Duet energy, two vocal textures in dialogue. ${emotion}. ${production}. Theme: ${theme}.`, flavor);
}

function cursoPrompt(theme: string, emotion: string, production: string, lang: "PT" | "EN", energy: TrackEnergy = "whisper", flavor: TrackFlavor = "organic"): string {
  const langNote = lang === "PT" ? "Lyrics in Portuguese." : "Lyrics in English.";
  return buildPromptWithFlavor(`${ENERGY_STYLES[energy]} ${langNote} Evolving, grounded, building. ${emotion}. ${production}. Theme: ${theme}.`, flavor);
}

// ─────────────────────────────────────────────
// ESPELHOS (7 albums)
// ─────────────────────────────────────────────

const ESPELHO_ILUSAO: AlbumDef = {
  slug: "espelho-ilusao",
  title: "O Espelho da Ilusão",
  subtitle: "Quando a vida que tens não foi a que escolheste",
  product: "espelho",
  veu: 1,
  color: VEU_COLORS[1],
  tracks: [
    { number: 1, title: "Despertar", description: "O momento antes da pergunta", lang: "PT", energy: "whisper", prompt: espelhoPrompt("awakening, first question", "dreamy, ethereal, slowly waking", "soft piano, reverb pads, whispering layers, slow build", "PT", "whisper"), durationSeconds: 240, audioUrl: null },
    { number: 2, title: "The Coat I Never Chose", description: "A vida construida por outros", lang: "EN", energy: "steady", prompt: espelhoPrompt("inherited life, wearing someone else's choices", "melancholic, gentle tension, realization", "piano arpeggios, warm synth bass, subtle strings, walking rhythm", "EN", "steady"), durationSeconds: 240, audioUrl: null },
    { number: 3, title: "Automatismos", description: "Os gestos que se repetem sem pensar", lang: "PT", energy: "pulse", flavor: "house", prompt: espelhoPrompt("autopilot, repetition, mechanical living", "hypnotic, circular, building urgency", "looping piano motif, electronic pulse, driving beat, vocal layers building", "PT", "pulse", "house"), durationSeconds: 240, audioUrl: null },
    { number: 4, title: "A Pergunta do Café", description: "Quando foi que eu escolhi isto?", lang: "PT", energy: "raw", prompt: espelhoPrompt("small question over morning coffee that changes everything", "curious, tender, dawning realization", "acoustic guitar, intimate vocal close-mic, minimal, breath sounds", "PT", "raw"), durationSeconds: 240, audioUrl: null },
    { number: 5, title: "The Body Knows", description: "O corpo já sabia antes da mente", lang: "EN", energy: "steady", flavor: "marrabenta", prompt: espelhoPrompt("body wisdom, somatic truth, the body knew first", "grounding, warm, pulsing with life", "heartbeat rhythm, warm bass, organic percussion, breath sounds woven in", "EN", "steady", "marrabenta"), durationSeconds: 240, audioUrl: null },
    { number: 6, title: "Honestidade Quieta", description: "Ver sem dramatizar", lang: "PT", energy: "whisper", prompt: espelhoPrompt("quiet honesty, seeing without drama, soft truth", "peaceful, still, accepting", "solo piano, distant choir pad, water-like textures, spacious", "PT", "whisper"), durationSeconds: 240, audioUrl: null },
    { number: 7, title: "O Veu Cai", description: "O primeiro reconhecimento", lang: "PT", energy: "anthem", flavor: "gospel", prompt: espelhoPrompt("the veil falls, first sight of truth, liberation", "liberating, powerful, cathartic, declarative", "full arrangement, rising strings, driving drums, vocal crescendo, triumphant release", "PT", "anthem", "gospel"), durationSeconds: 300, audioUrl: null },
  ],
};

const ESPELHO_MEDO: AlbumDef = {
  slug: "espelho-medo",
  title: "O Espelho do Medo",
  subtitle: "Quando o medo decide por ti",
  product: "espelho",
  veu: 2,
  color: VEU_COLORS[2],
  tracks: [
    { number: 1, title: "Cuidado", description: "A palavra que protege e aprisiona", lang: "PT", energy: "whisper", prompt: espelhoPrompt("caution, the word that protects and imprisons", "tense, careful, restrained, whispered", "muted piano, low synth drone, sparse percussion, silence as instrument", "PT", "whisper"), durationSeconds: 240, audioUrl: null },
    { number: 2, title: "Measured Words", description: "Medir cada sílaba antes de falar", lang: "EN", energy: "steady", prompt: espelhoPrompt("measuring every word, self-censorship, walking on glass", "contained, precise, anxious undertone", "plucked strings, electronic pulse, walking tempo, tension building", "EN", "steady"), durationSeconds: 240, audioUrl: null },
    { number: 3, title: "Paralisia Bonita", description: "A indecisão que parece prudencia", lang: "PT", energy: "raw", prompt: espelhoPrompt("beautiful paralysis, indecision disguised as wisdom", "frozen, aching beauty, painfully honest", "solo piano, single notes dropping into silence, wind textures", "PT", "raw"), durationSeconds: 240, audioUrl: null },
    { number: 4, title: "O Estômago Sabe", description: "Quando o corpo fala primeiro", lang: "PT", energy: "pulse", flavor: "marrabenta", prompt: espelhoPrompt("gut feeling, body alarm, visceral knowledge", "visceral, urgent, body-driven", "low bass pulse, driving organic percussion, rising intensity, body-felt", "PT", "pulse", "marrabenta"), durationSeconds: 240, audioUrl: null },
    { number: 5, title: "Messenger", description: "O medo como guia, não inimigo", lang: "EN", energy: "steady", prompt: espelhoPrompt("fear as messenger not enemy, reframing fear", "compassionate, understanding, spacious, wise", "warm melody over pad, gentle choir texture, earth-like grounding", "EN", "steady"), durationSeconds: 240, audioUrl: null },
    { number: 6, title: "Ouco-te Mas Vou", description: "Coragem quotidiana", lang: "PT", energy: "anthem", flavor: "house", prompt: espelhoPrompt("I hear you but I'm going, daily courage, moving forward", "brave, determined, empowering, declarative", "full rhythm, driving drums, rising vocal melody, powerful chorus, strength", "PT", "anthem", "house"), durationSeconds: 240, audioUrl: null },
    { number: 7, title: "Devagar", description: "Iluminar sem pressa", lang: "PT", energy: "whisper", prompt: espelhoPrompt("slowly, illuminating without rush, gentle seeing", "patient, luminous, at peace, resolution", "open harmonics, warm pad fading into light, peaceful vocal", "PT", "whisper"), durationSeconds: 300, audioUrl: null },
  ],
};

const ESPELHO_CULPA: AlbumDef = {
  slug: "espelho-culpa",
  title: "O Espelho da Culpa",
  subtitle: "Quando te castigas por querer mais",
  product: "espelho",
  veu: 3,
  color: VEU_COLORS[3],
  tracks: [
    { number: 1, title: "A Voz Baixa", description: "Devias estar a fazer outra coisa", lang: "PT", energy: "raw", prompt: espelhoPrompt("the quiet voice saying you should be doing something else", "heavy, subdued, painfully honest", "solo voice, low piano, muted synth, breath-like textures, minimal", "PT", "raw"), durationSeconds: 240, audioUrl: null },
    { number: 2, title: "Disguised Virtue", description: "Quando dar e obrigação invisivel", lang: "EN", energy: "steady", prompt: espelhoPrompt("giving as invisible obligation, false virtue, duty as love", "burdened, building awareness", "slow strings, walking rhythm, weighted bass, sighing pad textures", "EN", "steady"), durationSeconds: 240, audioUrl: null },
    { number: 3, title: "Alivio ou Alegria", description: "A diferença entre querer e dever", lang: "PT", energy: "pulse", prompt: espelhoPrompt("relief vs joy, duty vs desire, learning the difference", "contrasting, energetic questioning", "two melodic lines competing, driving piano, rhythmic vocal, building momentum", "PT", "pulse"), durationSeconds: 240, audioUrl: null },
    { number: 4, title: "Herança", description: "A culpa que não étua", lang: "PT", energy: "whisper", prompt: espelhoPrompt("inherited guilt, ancestral weight, not yours to carry", "ancient, heavy then slowly releasing", "deep pad, ancestral-feeling vocal, gradual lightening of texture", "PT", "whisper"), durationSeconds: 240, audioUrl: null },
    { number: 5, title: "Deserve", description: "Merecer não se conquista", lang: "EN", energy: "anthem", prompt: espelhoPrompt("deserving is not earned, inherent worth, you already deserve", "warm, affirming, powerful, like a declaration", "warm strings, building drums, layered vocals, empowering chorus", "EN", "anthem"), durationSeconds: 240, audioUrl: null },
    { number: 6, title: "Pousar", description: "Posso pousar isto", lang: "PT", energy: "steady", prompt: espelhoPrompt("laying it down, I can put this down, permission to release", "liberating, exhaling, lighter with each note", "descending melody, opening space, walking rhythm, bird-like synth textures", "PT", "steady"), durationSeconds: 240, audioUrl: null },
    { number: 7, title: "Ternura", description: "Desmontar sem te castigar", lang: "PT", energy: "whisper", prompt: espelhoPrompt("tenderness, dismantling without punishment, self-compassion", "gentle, loving, free, final resolution", "full warm arrangement, vocal harmonics, resolution into peace", "PT", "whisper"), durationSeconds: 300, audioUrl: null },
  ],
};

const ESPELHO_IDENTIDADE: AlbumDef = {
  slug: "espelho-identidade",
  title: "O Espelho da Identidade",
  subtitle: "Quando já não sabes quem és sem os outros",
  product: "espelho",
  veu: 4,
  color: VEU_COLORS[4],
  tracks: [
    { number: 1, title: "Máscaras", description: "Os papeis que vestem a pele", lang: "PT", energy: "steady", prompt: espelhoPrompt("masks, roles, personas, wearing different skins", "layered, complex, shifting textures", "morphing synth textures, multiple vocal layers, walking rhythm", "PT", "steady"), durationSeconds: 240, audioUrl: null },
    { number: 2, title: "Who Are You", description: "Quando ninguem te esta a ver", lang: "EN", energy: "raw", prompt: espelhoPrompt("who are you when nobody is watching, unmasked and raw", "vulnerable, bare, honest, intimate", "solo vocal with minimal piano, silence, breath, raw", "EN", "raw"), durationSeconds: 240, audioUrl: null },
    { number: 3, title: "Armadura", description: "A certeza que parece forca", lang: "PT", energy: "pulse", flavor: "house", prompt: espelhoPrompt("armor, certainty that looks like strength, false protection", "rigid, building energy, breaking through", "crystalline synth, driving percussion, tension building to release", "PT", "pulse", "house"), durationSeconds: 240, audioUrl: null },
    { number: 4, title: "Espelho Interior", description: "Olhar sem julgar", lang: "PT", energy: "whisper", prompt: espelhoPrompt("inner mirror, looking without judging, self-seeing", "reflective, still water, contemplative", "water-like textures, reflective piano, gentle harmonics", "PT", "whisper"), durationSeconds: 240, audioUrl: null },
    { number: 5, title: "Nameless", description: "O que sobra quando tiras tudo", lang: "EN", energy: "raw", prompt: espelhoPrompt("what remains when you strip everything away, nameless essence", "minimal, essential, spacious, pure being", "single sustained note, silence, breath, then gentle emergence", "EN", "raw"), durationSeconds: 240, audioUrl: null },
    { number: 6, title: "Escolher a Mascara", description: "Usar sem colar a pele", lang: "PT", energy: "pulse", prompt: espelhoPrompt("choosing the mask consciously, wearing without fusing", "playful, energetic, free, joyful", "rhythmic piano, dancing melody, driving beat, lightness and joy", "PT", "pulse"), durationSeconds: 240, audioUrl: null },
    { number: 7, title: "Eu Sem Justificacao", description: "Existir sem provar nada", lang: "PT", energy: "anthem", flavor: "gospel", prompt: espelhoPrompt("existing without justification, being without proving", "sovereign, powerful, complete, declarative", "full arrangement, layered vocals, driving drums, grounding bass, triumphant", "PT", "anthem", "gospel"), durationSeconds: 300, audioUrl: null },
  ],
};

const ESPELHO_CONTROLO: AlbumDef = {
  slug: "espelho-controlo",
  title: "O Espelho do Controlo",
  subtitle: "Quando segurar é a única forma que conheces",
  product: "espelho",
  veu: 5,
  color: VEU_COLORS[5],
  tracks: [
    { number: 1, title: "Segurar", description: "A necessidade de ter tudo no lugar", lang: "PT", energy: "pulse", flavor: "house", prompt: espelhoPrompt("holding tight, needing everything in place, control", "tense, ordered, gripping, driving urgency", "tight electronic rhythm, precise synth, driving beat, contained energy", "PT", "pulse", "house"), durationSeconds: 240, audioUrl: null },
    { number: 2, title: "Reliable", description: "A pessoa a quem todos recorrem", lang: "EN", energy: "steady", prompt: espelhoPrompt("the reliable one, always available, the cost of being needed", "noble but exhausted, carrying the world", "steady rhythm carrying a heavy melody, weighted strings", "EN", "steady"), durationSeconds: 240, audioUrl: null },
    { number: 3, title: "Tres da Manha", description: "A insónia de repassar tudo", lang: "PT", energy: "raw", prompt: espelhoPrompt("3am insomnia, replaying everything, mental loops", "restless, circular, dark, painfully honest", "night textures, solo piano, repetitive motif, uneasy silence", "PT", "raw"), durationSeconds: 240, audioUrl: null },
    { number: 4, title: "Ilusão de Segurança", description: "Se eu controlo, nada de mau acontece", lang: "PT", energy: "whisper", prompt: espelhoPrompt("illusion of safety, if I control nothing bad happens", "fragile certainty, glass-like, about to crack", "crystalline sounds, building tension, moment before breaking", "PT", "whisper"), durationSeconds: 240, audioUrl: null },
    { number: 5, title: "Trust", description: "Aceitar que não controlamos o resultado", lang: "EN", energy: "steady", prompt: espelhoPrompt("trust, accepting we don't control the outcome, surrender", "opening, releasing, flowing like water", "flowing piano melody, loosening rhythm, water textures", "EN", "steady"), durationSeconds: 240, audioUrl: null },
    { number: 6, title: "Largar", description: "O mundo continua quando não fazes", lang: "PT", energy: "anthem", prompt: espelhoPrompt("letting go, the world continues when you stop doing", "relief, triumphant, lightness, liberation", "full arrangement, bright textures, driving chorus, free vocal melody", "PT", "anthem"), durationSeconds: 240, audioUrl: null },
    { number: 7, title: "Respirar", description: "Na respiração, ha liberdade", lang: "PT", energy: "whisper", prompt: espelhoPrompt("breathing, in breath there is freedom", "free, expansive, peaceful, infinite", "breath-synced rhythm, open harmonics, vast warm soundscape", "PT", "whisper"), durationSeconds: 300, audioUrl: null },
  ],
};

const ESPELHO_DESEJO: AlbumDef = {
  slug: "espelho-desejo",
  title: "O Espelho do Desejo",
  subtitle: "Quando desejas tudo menos o que precisas",
  product: "espelho",
  veu: 6,
  color: VEU_COLORS[6],
  tracks: [
    { number: 1, title: "Preencher", description: "Encher o tempo para não ouvir o vazio", lang: "PT", energy: "pulse", flavor: "house", prompt: espelhoPrompt("filling time to avoid hearing the void, busy emptiness", "busy, scattered, anxious, driving", "fast electronic textures, fragmented melody, driving restless beat", "PT", "pulse", "house"), durationSeconds: 240, audioUrl: null },
    { number: 2, title: "What's Missing", description: "O que não se compra nem se agenda", lang: "EN", energy: "raw", prompt: espelhoPrompt("what's missing, what you can't buy or schedule, unnamed longing", "yearning, deep, painfully honest", "solo vocal, searching melody, deep pad, longing strings", "EN", "raw"), durationSeconds: 240, audioUrl: null },
    { number: 3, title: "Mais Pequena", description: "Querer menos para não incomodar", lang: "PT", energy: "whisper", prompt: espelhoPrompt("making yourself smaller, wanting less to not bother anyone", "diminished, quiet, hidden, barely there", "very soft production, contained vocal, small intimate sounds", "PT", "whisper"), durationSeconds: 240, audioUrl: null },
    { number: 4, title: "A Hora Vazia", description: "Uma hora sem nada", lang: "PT", energy: "steady", prompt: espelhoPrompt("the empty hour, sitting with nothing, no agenda", "spacious, walking pace, gradually peaceful", "gentle walking rhythm, slow emergence of piano, space as music", "PT", "steady"), durationSeconds: 240, audioUrl: null },
    { number: 5, title: "Empty", description: "Parar de fingir que esta cheia", lang: "EN", energy: "raw", prompt: espelhoPrompt("stop pretending you're full, honest emptying", "releasing, honest, raw, courageous vulnerability", "descending melody, stripping layers, raw vocal", "EN", "raw"), durationSeconds: 240, audioUrl: null },
    { number: 6, title: "Desejo Verdadeiro", description: "O que a tua vida esta a pedir", lang: "PT", energy: "anthem", prompt: espelhoPrompt("true desire, what your life is asking of you", "warm, powerful, knowing, declarative", "rich warm synth, driving drums, layered vocals, empowering build", "PT", "anthem"), durationSeconds: 240, audioUrl: null },
    { number: 7, title: "Espaço", description: "O vazio não éausencia — e espaço", lang: "PT", energy: "whisper", prompt: espelhoPrompt("space, emptiness is not absence, it is room", "open, vast, potential, full of possibility", "vast soundscape, open harmonics, voice floating in space, possibility", "PT", "whisper"), durationSeconds: 300, audioUrl: null },
  ],
};

const ESPELHO_SEPARACAO: AlbumDef = {
  slug: "espelho-separacao",
  title: "O Espelho da Separação",
  subtitle: "Quando te afastas de ti mesma para pertenceres",
  product: "espelho",
  veu: 7,
  color: VEU_COLORS[7],
  tracks: [
    { number: 1, title: "Encolher para Caber", description: "Adaptar, moldar, perder a forma", lang: "PT", energy: "whisper", prompt: espelhoPrompt("shrinking to fit, adapting, losing your own shape", "constrained, adapting, diminishing, compressed", "compressed synth, constrained vocal, tight production, limited range", "PT", "whisper"), durationSeconds: 240, audioUrl: null },
    { number: 2, title: "Together but Alone", description: "A solidão dentro da relação", lang: "EN", energy: "raw", prompt: espelhoPrompt("loneliness inside the relationship, together but alone", "lonely, disconnected, painfully honest", "solo voice, two separate melodic lines not meeting, sadness in the gap", "EN", "raw"), durationSeconds: 240, audioUrl: null },
    { number: 3, title: "A Pergunta Evitada", description: "Se eu fosse só eu, quem seria?", lang: "PT", energy: "steady", prompt: espelhoPrompt("the avoided question: who would I be if I were just me?", "brave, building, honest, gathering courage", "single voice rising, tentative piano, walking rhythm, courage building", "PT", "steady"), durationSeconds: 240, audioUrl: null },
    { number: 4, title: "Separar", description: "Criar espaço, não destruir", lang: "PT", energy: "pulse", flavor: "house", prompt: espelhoPrompt("separating to create space, not to destroy", "bittersweet, determined, forward momentum", "driving rhythm, melody splitting into two lines, both beautiful, energy", "PT", "pulse", "house"), durationSeconds: 240, audioUrl: null },
    { number: 5, title: "What Remains", description: "Só sai o que já não servia", lang: "EN", energy: "whisper", prompt: espelhoPrompt("what remains after letting go, only what no longer served leaves", "clear, pure, distilled, essential", "minimal clear tones, essential beauty, purified sound", "EN", "whisper"), durationSeconds: 240, audioUrl: null },
    { number: 6, title: "Regresso", description: "O regresso a ti mesma", lang: "PT", energy: "steady", prompt: espelhoPrompt("homecoming, the return to yourself", "warm, arriving, recognition, coming home", "returning melody, warmth rising, walking rhythm, recognition in the voice", "PT", "steady"), durationSeconds: 240, audioUrl: null },
    { number: 7, title: "Sete Veus", description: "Sete camadas, sete regressos", lang: "PT", energy: "anthem", flavor: "gospel", prompt: espelhoPrompt("seven veils, seven layers, seven returns, completion", "complete, whole, celebratory, triumphant, full circle", "full arrangement, driving drums, layered vocals, all themes woven, triumphant crescendo", "PT", "anthem", "gospel"), durationSeconds: 300, audioUrl: null },
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
  tracks: Omit<TrackDef, "audioUrl" | "lyrics">[]
): AlbumDef {
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

const NO_HERANCA = noAlbum(1, "no-heranca", "O Nó da Herança", "O silêncio herdado entre mãe e filha", [
  { number: 1, title: "A Mae que Viu", description: "Helena sempre soube", lang: "PT", energy: "whisper", prompt: noPrompt("mother who always saw, patient knowing", "patient, aching, maternal, waiting love", "warm cello-like synth, maternal vocal texture, gentle humming layer", "PT", "whisper"), durationSeconds: 240 },
  { number: 2, title: "Years of Waiting", description: "Esperar que a filha veja", lang: "EN", energy: "steady", prompt: noPrompt("years of waiting for your daughter to see, patient love", "slow, patient, enduring, building", "sustained pad, patient piano, walking rhythm, time passing", "EN", "steady"), durationSeconds: 240 },
  { number: 3, title: "Duas Mulheres", description: "Mae e filha, frente a frente", lang: "PT", energy: "raw", flavor: "marrabenta", prompt: noPrompt("two women face to face, mother and daughter, raw meeting", "raw, vulnerable, brave, painfully honest", "two vocal textures meeting, tentative harmony, stripped production", "PT", "raw", "marrabenta"), durationSeconds: 240 },
  { number: 4, title: "O Que Nunca Foi Dito", description: "Palavras guardadas uma vida", lang: "PT", energy: "pulse", flavor: "house", prompt: noPrompt("words kept a lifetime, what was never said, breaking silence", "heavy, breaking open, cathartic, urgent", "silence breaking into driving melody, words as rhythm, emotional momentum", "PT", "pulse", "house"), durationSeconds: 240 },
  { number: 5, title: "Desatar", description: "O no que se solta", lang: "PT", energy: "anthem", flavor: "gospel", prompt: noPrompt("untying the knot, the bond that loosens, freedom together", "freeing, triumphant, relieved, declarative", "full arrangement, driving rhythm, layered vocals, triumphant release", "PT", "anthem", "gospel"), durationSeconds: 300 },
]);

const NO_SILENCIO = noAlbum(2, "no-silencio", "O Nó do Silêncio", "O que o medo calou entre eles", [
  { number: 1, title: "O Que Não Disse", description: "Rui e Ana e o silêncio entre eles", lang: "PT", energy: "raw", prompt: noPrompt("what was never said between lovers, loaded silence", "tense, painfully honest, aching", "solo voice, two melodic lines in silence, tension in gaps", "PT", "raw"), durationSeconds: 240 },
  { number: 2, title: "Protect or Hide", description: "Quando proteger e esconder", lang: "EN", energy: "steady", prompt: noPrompt("protecting as hiding, love expressed as silence", "conflicted, protective, walking pace", "guarded vocal melody, mid-tempo rhythm, emotional walls", "EN", "steady"), durationSeconds: 240 },
  { number: 3, title: "A Primeira Palavra", description: "Quebrar o silêncio", lang: "PT", energy: "whisper", prompt: noPrompt("the first word that breaks the silence, brave beginning", "brave, trembling, hopeful, cracking open", "first note breaking silence, tentative vocal dialogue emerging", "PT", "whisper"), durationSeconds: 240 },
  { number: 4, title: "Ouvir de Verdade", description: "Quando ouvir e mais que escutar", lang: "PT", energy: "pulse", prompt: noPrompt("truly hearing, listening deeper than words", "open, energetic, present, understanding building", "call and response vocal, driving rhythm, deepening harmony", "PT", "pulse"), durationSeconds: 240 },
  { number: 5, title: "Voice", description: "Encontrar a voz que calaste", lang: "EN", energy: "anthem", flavor: "gospel", prompt: noPrompt("finding the voice you silenced, speaking truth at last", "empowered, declarative, liberated, triumphant", "two voices in powerful harmony, driving drums, liberation", "EN", "anthem", "gospel"), durationSeconds: 300 },
]);

const NO_SACRIFICIO = noAlbum(3, "no-sacrificio", "O Nó do Sacrifício", "A culpa disfarçada de entrega", [
  { number: 1, title: "Dar Ate Esvaziar", description: "Filipe e Luísa e a entrega sem retorno", lang: "PT", energy: "steady", prompt: noPrompt("giving until empty, sacrifice without return", "depleted, noble, exhausted", "diminishing melody, walking rhythm, notes being given away", "PT", "steady"), durationSeconds: 240 },
  { number: 2, title: "Love or Debt", description: "Quando amar parece pagar", lang: "EN", energy: "pulse", prompt: noPrompt("love as debt, paying off guilt through giving", "transactional, driving, urgent realization", "counting rhythmic pattern, driving beat, weighted bass", "EN", "pulse"), durationSeconds: 240 },
  { number: 3, title: "Receber", description: "Aprender a receber sem culpa", lang: "PT", energy: "whisper", prompt: noPrompt("learning to receive without guilt, accepting grace", "opening, softening, grateful, permission", "warmth flowing in, receiving melody, gratitude in voice", "PT", "whisper"), durationSeconds: 240 },
  { number: 4, title: "Dois Inteiros", description: "Dois que dao por escolha", lang: "PT", energy: "pulse", prompt: noPrompt("two whole people giving by choice, not obligation", "balanced, joyful, energetic, equal", "balanced duet, driving mutual rhythm, wholeness in harmony", "PT", "pulse"), durationSeconds: 240 },
  { number: 5, title: "True Giving", description: "Dar sem se perder", lang: "EN", energy: "anthem", prompt: noPrompt("true giving without losing yourself, generous freedom", "generous, powerful, loving, declarative", "generous flowing melody, layered vocals, triumphant chorus", "EN", "anthem"), durationSeconds: 300 },
]);

const NO_VERGONHA = noAlbum(4, "no-vergonha", "O Nó da Vergonha", "A máscara que caiu entre dois estranhos", [
  { number: 1, title: "Dois Estranhos", description: "Vitor e Mariana e o encontro sem máscara", lang: "PT", energy: "steady", prompt: noPrompt("two strangers meeting unmasked, raw encounter", "raw, exposed, curious, electric", "two unfamiliar melodic textures meeting, walking rhythm, curiosity", "PT", "steady"), durationSeconds: 240 },
  { number: 2, title: "Seen", description: "A vergonha de ser reconhecido", lang: "EN", energy: "raw", prompt: noPrompt("being truly seen, the shame of being recognized", "vulnerable, exposed, trembling, naked beauty", "exposed solo vocal, stripped production, trembling beauty", "EN", "raw"), durationSeconds: 240 },
  { number: 3, title: "Sem Papeis", description: "Quando os papeis caem entre dois", lang: "PT", energy: "pulse", prompt: noPrompt("roles falling away between two people, authenticity emerging", "liberating, energetic, brave, momentum", "driving rhythm, layers dropping away, simplifying to truth", "PT", "pulse"), durationSeconds: 240 },
  { number: 4, title: "Reconhecimento", description: "Eu vejo-te. E tu a mim.", lang: "PT", energy: "whisper", prompt: noPrompt("I see you and you see me, mutual recognition", "connecting, warm, deep, intimate", "two melodies finding harmony, recognition, warmth building", "PT", "whisper"), durationSeconds: 240 },
  { number: 5, title: "Unapologetic", description: "Existir sem pedir desculpa", lang: "EN", energy: "anthem", prompt: noPrompt("existing without apology, unapologetic being", "free, proud, powerful, sovereign", "proud melody, driving drums, layered vocal strength, triumphant", "EN", "anthem"), durationSeconds: 300 },
]);

const NO_SOLIDAO = noAlbum(5, "no-solidao", "O Nó da Solidão", "O controlo que isolou quem mais amava", [
  { number: 1, title: "Ilha", description: "Isabel e Pedro e o isolamento do controlo", lang: "PT", energy: "raw", prompt: noPrompt("island, isolation through control, surrounded but alone", "isolated, painfully honest, lonely", "solo vocal surrounded by empty space, island of sound", "PT", "raw"), durationSeconds: 240 },
  { number: 2, title: "Holding Too Tight", description: "Quando cuidar e aprisionar", lang: "EN", energy: "pulse", flavor: "house", prompt: noPrompt("holding too tight, when caring becomes a cage", "gripping, urgent, suffocating energy", "tight driving rhythm around a trapped melody, tension", "EN", "pulse", "house"), durationSeconds: 240 },
  { number: 3, title: "Soltar", description: "Abrir as maos", lang: "PT", energy: "whisper", prompt: noPrompt("releasing, opening hands, letting go of grip", "releasing, letting flow, exhaling control", "opening rhythm, releasing notes into space, breathing room", "PT", "whisper"), durationSeconds: 240 },
  { number: 4, title: "Lado a Lado", description: "Estar junto sem segurar", lang: "PT", energy: "steady", prompt: noPrompt("side by side, together without holding, respectful closeness", "parallel, peaceful, trusting, walking together", "two parallel melodies, walking rhythm, respectful space, trust", "PT", "steady"), durationSeconds: 240 },
  { number: 5, title: "Bridge", description: "A solidao que se transforma em ponte", lang: "EN", energy: "anthem", prompt: noPrompt("solitude becoming a bridge, loneliness transformed to connection", "connecting, triumphant, hopeful, powerful", "bridge melody connecting voices, driving drums, triumphant hope", "EN", "anthem"), durationSeconds: 300 },
]);

const NO_VAZIO = noAlbum(6, "no-vazio", "O Nó do Vazio", "O desejo que esvaziou a amizade", [
  { number: 1, title: "Amigas", description: "Lena e Sofia e o que o desejo fez entre elas", lang: "PT", energy: "whisper", prompt: noPrompt("friends, what desire did to the friendship", "nostalgic, aching, lost, bittersweet", "nostalgic melody, fading harmony, sense of loss", "PT", "whisper"), durationSeconds: 240 },
  { number: 2, title: "The Hole", description: "O vazio que nenhuma relacao preenche", lang: "EN", energy: "raw", prompt: noPrompt("the void no relationship fills, inner emptiness", "empty, echoing, painfully honest", "solo vocal, hollow reverb textures, vast empty sonic space", "EN", "raw"), durationSeconds: 240 },
  { number: 3, title: "Sem Preencher", description: "Estar no vazio sem fugir", lang: "PT", energy: "steady", prompt: noPrompt("sitting with emptiness without fleeing, staying present", "still, present, building courage", "minimal but grounded production, walking rhythm, still vocal", "PT", "steady"), durationSeconds: 240 },
  { number: 4, title: "Reencontro", description: "Reencontrar sem exigir", lang: "PT", energy: "pulse", prompt: noPrompt("reunion without demands, meeting again freely", "reconnecting, energetic, joyful, wiser", "two driving melodies reconnecting, rhythmic joy, maturity", "PT", "pulse"), durationSeconds: 240 },
  { number: 5, title: "True Friendship", description: "O espaço onde o desejo verdadeiro mora", lang: "EN", energy: "anthem", prompt: noPrompt("true friendship, the space where authentic desire lives", "genuine, powerful, complete, celebratory", "warm duet, layered vocals, driving chorus, triumphant peace", "EN", "anthem"), durationSeconds: 300 },
]);

const NO_PERTENCA = noAlbum(7, "no-pertenca", "O Nó da Pertença", "A separação que reinventou o lar", [
  { number: 1, title: "O Lar que Sufocava", description: "Helena T. e Miguel C. e o lar que já não cabia", lang: "PT", energy: "pulse", flavor: "house", prompt: noPrompt("the home that suffocated, outgrown space", "claustrophobic, driving urgency, needing air", "compressed production, driving beat, heavy textures, need for space", "PT", "pulse", "house"), durationSeconds: 240 },
  { number: 2, title: "Leaving", description: "A coragem de sair para encontrar", lang: "EN", energy: "raw", prompt: noPrompt("courage to leave in order to find, necessary departure", "brave, painfully honest, bittersweet", "solo departure melody, brave vocal, stripped production", "EN", "raw"), durationSeconds: 240 },
  { number: 3, title: "Sozinho", description: "O vazio fertil da solidao", lang: "PT", energy: "whisper", prompt: noPrompt("fertile solitude, alone but growing, discovering self", "solitary, growing, spacious, self-discovery", "solo vocal growing and expanding, discovering new range", "PT", "whisper"), durationSeconds: 240 },
  { number: 4, title: "Reinventar", description: "Construir de novo, diferente", lang: "PT", energy: "steady", prompt: noPrompt("rebuilding different this time, reinvention", "creative, hopeful, new, building", "new melodic construction, walking rhythm, hope in newness", "PT", "steady"), durationSeconds: 240 },
  { number: 5, title: "Belonging", description: "Pertencer comeca por dentro", lang: "EN", energy: "anthem", prompt: noPrompt("belonging starts within, self-belonging is home", "whole, powerful, complete, triumphant peace", "coming home melody, layered vocals, driving drums, triumphant resolution", "EN", "anthem"), durationSeconds: 300 },
]);

// ─────────────────────────────────────────────
// LIVRO FILOSOFICO (1 album)
// ─────────────────────────────────────────────

const LIVRO_FILOSOFICO: AlbumDef = {
  slug: "livro-filosofico",
  title: "Os Sete Temas do Despertar",
  subtitle: "Sete camadas de consciência — uma cartografia interior para quem está pronta a dissolver o que já não serve",
  product: "livro",
  color: "#8B5CF6",
  tracks: [
    { number: 1, title: "O Convite", description: "O inicio da travessia interior", lang: "PT", prompt: `${BASE_STYLE} Lyrics in Portuguese. Opening, solemn yet warm, philosophical invitation. Piano, soft strings, spacious reverb. Beginning of a deep journey inward. A cartography of consciousness.`, durationSeconds: 300, audioUrl: null },
    { number: 2, title: "Permanence", description: "Encobre a impermanencia da vida, fazendo-nos acreditar num eu fixo e imutavel", lang: "EN", prompt: `${BASE_STYLE} Lyrics in English. Theme: permanence as illusion, the fixed self dissolving. Ethereal pads, soft vocal questioning what we cling to. Gentle dissolution of certainty. Tender, not dramatic.`, durationSeconds: 240, audioUrl: null },
    { number: 3, title: "Memoria", description: "Encobre a liberdade do presente, mantendo-nos presos as historias do passado", lang: "PT", prompt: `${BASE_STYLE} Lyrics in Portuguese. Theme: memory as prison, stories of the past holding us captive. Nostalgic melody slowly loosening, freeing from old narratives. Piano with reverb-heavy textures, time stretching.`, durationSeconds: 240, audioUrl: null },
    { number: 4, title: "Whirlwind", description: "Encobre o silencio do ser, confundindo-nos com pensamentos e emocoes que se agitam sem cessar", lang: "EN", prompt: `${BASE_STYLE} Lyrics in English. Theme: the whirlwind of thoughts and emotions hiding inner silence. Agitated textures gradually stilling. Building electronic layers that strip back to reveal quiet. Contemplative resolution.`, durationSeconds: 240, audioUrl: null },
    { number: 5, title: "Esforco", description: "Encobre o repouso interior, fazendo-nos acreditar que a plenitude depende da busca incessante", lang: "PT", energy: "pulse", prompt: `${ENERGY_STYLES.pulse} Lyrics in Portuguese. Theme: effort as veil, the belief that fullness requires endless striving. Busy, driven rhythm slowly releasing into rest. The beauty of stopping.`, durationSeconds: 240, audioUrl: null },
    { number: 6, title: "Desolation", description: "Encobre a fertilidade do vazio, fazendo-o parecer abandono e ameaca", lang: "EN", prompt: `${BASE_STYLE} Lyrics in English. Theme: desolation hiding fertile emptiness, void that appears as threat but holds possibility. Deep, spacious, transforming emptiness into openness. Minimal then blooming.`, durationSeconds: 240, audioUrl: null },
    { number: 7, title: "Horizonte", description: "Encobre a infinitude da consciencia, sugerindo um destino final, uma chegada definitiva", lang: "PT", prompt: `${BASE_STYLE} Lyrics in Portuguese. Theme: the horizon as illusion of a final destination, when consciousness is infinite. Expansive, dissolving edges, no arrival only deepening. Vast warm soundscape, vocal reaching beyond.`, durationSeconds: 240, audioUrl: null },
    { number: 8, title: "Duality", description: "Encobre a unidade do real, mantendo a ilusao de que estamos separados", lang: "EN", prompt: `${BASE_STYLE} Lyrics in English. Theme: duality veiling unity, the illusion that we are separate. Two melodic lines merging into one. Separation dissolving. Resolution into oneness. Warm, complete.`, durationSeconds: 240, audioUrl: null },
    { number: 9, title: "O Espelho", description: "O olhar final — tudo o que atravessaste já la estava", lang: "PT", energy: "anthem", prompt: `${ENERGY_STYLES.anthem} Lyrics in Portuguese. Closing. All seven themes woven together. Full arrangement, vocal crescendo. The mirror reflects wholeness that was always there. Peaceful, triumphant, complete resolution.`, durationSeconds: 300, audioUrl: null },
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
  _territory: string,
  tracks: Omit<TrackDef, "audioUrl" | "lyrics">[]
): AlbumDef {
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

const CURSO_OURO_PROPRIO = cursoAlbum("curso-ouro-proprio", "ouro-proprio", "Ouro Próprio", "A tua relação com dinheiro", "Casa dos Espelhos Dourados", [
  { number: 1, title: "Espelhos Dourados", description: "O territorio onde o dinheiro mora", lang: "PT", prompt: cursoPrompt("golden mirrors, the territory where money lives", "amber, reflective, honest confrontation", "golden piano tones, mirror-like reverb, warm amber pads", "PT"), durationSeconds: 240 },
  { number: 2, title: "The Statement", description: "Olhar para os numeros sem desviar", lang: "EN", prompt: cursoPrompt("looking at the numbers without flinching, honest accounting", "confronting, grounding, brave, unflinching", "grounding bass, honest vocal melody, precise rhythm", "EN"), durationSeconds: 240 },
  { number: 3, title: "Herança Financeira", description: "O dinheiro da tua familia", lang: "PT", energy: "steady", flavor: "marrabenta", prompt: cursoPrompt("family money story, inherited beliefs about wealth", "ancestral, complex, untangling patterns", "deep pad, ancestral vocal texture, untangling melodic lines", "PT", "steady", "marrabenta"), durationSeconds: 240 },
  { number: 4, title: "Abundance", description: "Receber sem culpa", lang: "EN", prompt: cursoPrompt("deserving abundance, receiving without guilt", "opening, generous, golden, permission", "opening warm melody, flowing golden textures, abundance feeling", "EN"), durationSeconds: 240 },
  { number: 5, title: "Novo Espelho", description: "O reflexo que escolhes", lang: "PT", energy: "anthem", prompt: cursoPrompt("new mirror, the reflection you choose", "clear, chosen, golden peace, resolution", "clear golden tones, chosen vocal melody, peaceful resolution", "PT", "anthem"), durationSeconds: 300 },
]);

const CURSO_SANGUE_SEDA = cursoAlbum("curso-sangue-seda", "sangue-e-seda", "Sangue e Seda", "A tua mãe, a tua história", "Árvore das Raízes Visíveis", [
  { number: 1, title: "Raizes", description: "O que veio antes de ti", lang: "PT", energy: "steady", flavor: "marrabenta", prompt: cursoPrompt("roots, what came before you, ancestral ground", "deep red, ancient, grounding", "deep bass, rich strings, root-like grounding sounds", "PT", "steady", "marrabenta"), durationSeconds: 240 },
  { number: 2, title: "The Inner Mother", description: "A mae que carregas dentro", lang: "EN", prompt: cursoPrompt("the inner mother, the one you carry within", "maternal, complex, tender, layered", "maternal vocal humming, complex layered harmony, tenderness", "EN"), durationSeconds: 240 },
  { number: 3, title: "Sangue", description: "O que herdaste no sangue", lang: "PT", energy: "pulse", flavor: "marrabenta", prompt: cursoPrompt("blood inheritance, what runs deep in your veins", "visceral, pulsing, deep connection", "heartbeat rhythm, deep organic percussion, blood-pulse bass", "PT", "pulse", "marrabenta"), durationSeconds: 240 },
  { number: 4, title: "Silk", description: "A suavidade que repara", lang: "EN", prompt: cursoPrompt("silk, the softness that heals, tenderness as medicine", "gentle, silk-like, healing, soft touch", "silky strings, gentle flowing melody, healing vocal texture", "EN"), durationSeconds: 240 },
  { number: 5, title: "Amanhecer", description: "A arvore com raizes reorganizadas", lang: "PT", energy: "anthem", prompt: cursoPrompt("dawn, reorganized roots, new growth from old ground", "dawn, growing, reorganized, fresh start", "dawn-like rising melody, new growth textures, reorganized beauty", "PT", "anthem"), durationSeconds: 300 },
]);

const CURSO_ARTE_INTEIREZA = cursoAlbum("curso-arte-inteireza", "a-arte-da-inteireza", "A Arte da Inteireza", "Amar sem te perderes", "Ponte entre Duas Margens", [
  { number: 1, title: "Desaparecer", description: "O momento em que te perdes no outro", lang: "PT", prompt: cursoPrompt("disappearing in the other, losing yourself in love", "dissolving, losing shape, merging", "dissolving melody, water-like textures, losing form beautifully", "PT"), durationSeconds: 240 },
  { number: 2, title: "Two Shores", description: "Tu e o outro, separados mas ligados", lang: "EN", prompt: cursoPrompt("two shores, connected yet separate, space between", "bridging, respectful space, seeing across", "two melodic lines across sonic space, bridge slowly forming", "EN"), durationSeconds: 240 },
  { number: 3, title: "Inteira", description: "Estar completa antes de estar com alguem", lang: "PT", prompt: cursoPrompt("whole before together, complete in yourself first", "whole, complete, self-possessed, sovereign", "complete self-contained melody, beautiful alone, full vocal", "PT"), durationSeconds: 240 },
  { number: 4, title: "The Bridge", description: "Encontrar sem se perder", lang: "EN", energy: "anthem", prompt: cursoPrompt("the bridge, meeting without losing yourself", "connected, balanced, harmonious, mature love", "balanced duet over bridge of sound, meeting in wholeness", "EN", "anthem"), durationSeconds: 300 },
]);

const CURSO_DEPOIS_FOGO = cursoAlbum("curso-depois-fogo", "depois-do-fogo", "Depois do Fogo", "Recomeçar após a destruição", "Campo Queimado", [
  { number: 1, title: "Cinzas", description: "O que sobrou depois do fogo", lang: "PT", prompt: cursoPrompt("ashes, what remains after fire, aftermath", "charcoal grey, devastated, still, quiet devastation", "ash-like textures, silence after destruction, still production", "PT"), durationSeconds: 240 },
  { number: 2, title: "Ember", description: "O que ainda arde por dentro", lang: "EN", prompt: cursoPrompt("ember still burning inside, inner fire surviving", "glowing, alive beneath ashes, stubborn warmth", "glowing warm synth, ember-like pulsing, inner fire texture", "EN"), durationSeconds: 240 },
  { number: 3, title: "Broto", description: "A primeira vida nova", lang: "PT", prompt: cursoPrompt("first sprout, new life after devastation, fragile hope", "green, fragile, hopeful, tender emergence", "tender new melody, fragile beautiful vocal, green growth sounds", "PT"), durationSeconds: 240 },
  { number: 4, title: "Different", description: "O novo não éo antigo — e outra coisa", lang: "EN", energy: "pulse", prompt: cursoPrompt("the new is not the old, it is something else entirely", "transformed, different, evolved, acceptance of change", "transformed melody, new form, evolved beauty, resolution", "EN", "pulse"), durationSeconds: 300 },
]);

const CURSO_OLHOS_ABERTOS = cursoAlbum("curso-olhos-abertos", "olhos-abertos", "Olhos Abertos", "Decidir com clareza", "Encruzilhada Infinita", [
  { number: 1, title: "Nevoeiro", description: "Quando não se ve o caminho", lang: "PT", prompt: cursoPrompt("fog, when you can't see the path ahead", "foggy, confused, searching, disoriented", "foggy reverb textures, searching melody, unclear direction", "PT"), durationSeconds: 240 },
  { number: 2, title: "Crossroads", description: "Muitos caminhos, nenhuma certeza", lang: "EN", prompt: cursoPrompt("crossroads, many paths, no certainty, standing still", "multiplicity, indecision, paralysis of choice", "multiple melodic fragments competing, indecision in rhythm", "EN"), durationSeconds: 240 },
  { number: 3, title: "Clareza", description: "O nevoeiro que comeca a levantar", lang: "PT", prompt: cursoPrompt("clarity, fog beginning to lift, seeing through", "clearing, emerging vision, light coming through", "clearing textures, emerging vocal melody, light building", "PT"), durationSeconds: 240 },
  { number: 4, title: "First Step", description: "A silhueta da o primeiro passo", lang: "EN", energy: "pulse", prompt: cursoPrompt("the first step, choosing a direction, walking forward", "decisive, brave, clear, momentum", "decisive rhythm beginning, first clear step, direction found", "EN", "pulse"), durationSeconds: 300 },
]);

const CURSO_PELE_NUA = cursoAlbum("curso-pele-nua", "pele-nua", "Pele Nua", "O corpo como território", "Corpo-Paisagem", [
  { number: 1, title: "Mapa do Corpo", description: "O corpo como paisagem desconhecida", lang: "PT", energy: "steady", flavor: "marrabenta", prompt: cursoPrompt("body map, the body as unknown landscape to explore", "exploratory, somatic, discovering, curious", "body-percussion-like textures, exploring melody, somatic awareness", "PT", "steady", "marrabenta"), durationSeconds: 240 },
  { number: 2, title: "Skin Memory", description: "O que a pele guardou", lang: "EN", prompt: cursoPrompt("skin memory, what the body stored and kept", "tactile, remembered, stored sensations surfacing", "textural intimate sounds, memory-like melody, touch and warmth", "EN"), durationSeconds: 240 },
  { number: 3, title: "Habitar", description: "Voltar a viver no corpo", lang: "PT", energy: "steady", flavor: "marrabenta", prompt: cursoPrompt("inhabiting, returning to live in the body again", "embodied, present, grounded, arrived", "grounded rhythm, inhabited vocal, fully present production", "PT", "steady", "marrabenta"), durationSeconds: 240 },
  { number: 4, title: "Home Body", description: "O corpo como lar", lang: "EN", prompt: cursoPrompt("body as home, lived in and loved, flesh as belonging", "home, warm, belonging, complete embodiment", "warm home-like melody, belonging vocal, body as sanctuary", "EN"), durationSeconds: 300 },
]);

const CURSO_LIMITE_SAGRADO = cursoAlbum("curso-limite-sagrado", "limite-sagrado", "Limite Sagrado", "Dizer não sem culpa", "Muralha que Nasce do Chão", [
  { number: 1, title: "Sem Muralha", description: "Viver sem limites, sem proteção", lang: "PT", prompt: cursoPrompt("no walls, living unprotected, without boundaries", "exposed, vulnerable, boundaryless, overwhelmed", "exposed vocal melody, no sonic boundaries, open vulnerability", "PT"), durationSeconds: 240 },
  { number: 2, title: "Wall of Light", description: "O limite que nasce de dentro", lang: "EN", prompt: cursoPrompt("wall of light, the boundary that grows from within", "luminous, strong, protecting, inner golden strength", "luminous golden synth, strength in vocal, inner wall of sound", "EN"), durationSeconds: 240 },
  { number: 3, title: "A Porta", description: "O limite tem porta — tu decides quem entra", lang: "PT", prompt: cursoPrompt("the door, the boundary has a door, you decide who enters", "discerning, powerful, chosen, sovereign choice", "door-opening texture, selective melody, power of conscious choice", "PT"), durationSeconds: 240 },
  { number: 4, title: "Sacred", description: "O limite como acto de amor", lang: "EN", energy: "anthem", prompt: cursoPrompt("sacred boundary, limit as an act of love", "sacred, loving, complete, holy protection", "sacred vocal melody, loving boundary in production, golden peace", "EN", "anthem"), durationSeconds: 300 },
]);

const CURSO_FLORES_ESCURO = cursoAlbum("curso-flores-escuro", "flores-no-escuro", "Flores no Escuro", "Atravessar o luto", "Jardim Subterrâneo", [
  { number: 1, title: "Caverna", description: "O escuro total do luto", lang: "PT", prompt: cursoPrompt("cave, total darkness of grief, underground", "deep, dark, underground, grief's depth", "deep underground textures, darkness in production, cave-like reverb", "PT"), durationSeconds: 240 },
  { number: 2, title: "Glow", description: "A luz que nasce do escuro", lang: "EN", prompt: cursoPrompt("bioluminescence, light born from darkness itself", "magical, emerging, glowing from within", "glowing synth textures, emerging light, magical organic growth", "EN"), durationSeconds: 240 },
  { number: 3, title: "Flores", description: "A beleza que cresce no luto", lang: "PT", prompt: cursoPrompt("flowers growing in grief, beauty from darkness", "delicate, beautiful, resilient, life despite", "delicate melody, beautiful despite darkness, resilient vocal", "PT"), durationSeconds: 240 },
  { number: 4, title: "Garden", description: "O jardim subterraneo iluminado", lang: "EN", prompt: cursoPrompt("underground garden illuminated, grief transformed to beauty", "luminous, transformed, alive, grief become garden", "full luminous production, alive with light, transformed grief into beauty", "EN"), durationSeconds: 300 },
]);

const CURSO_PESO_CHAO = cursoAlbum("curso-peso-chao", "o-peso-e-o-chao", "O Peso e o Chão", "Largar o que carregas", "Caminho de Pedras", [
  { number: 1, title: "Pedras", description: "O peso que carregas", lang: "PT", prompt: cursoPrompt("stones, the weight you carry, burden on shoulders", "heavy, burdened, carrying, weighed down", "heavy deep bass, weighted melody, carrying burden in rhythm", "PT"), durationSeconds: 240 },
  { number: 2, title: "Bent", description: "O corpo sob o peso", lang: "EN", prompt: cursoPrompt("bent under weight, body burdened, compressed by carrying", "bent, compressed, aching, physical weight", "compressed production, bent vocal melody, aching body awareness", "EN"), durationSeconds: 240 },
  { number: 3, title: "Pousar", description: "Largar as pedras no chao", lang: "PT", prompt: cursoPrompt("laying stones down, releasing weight, permission to put it down", "releasing, lighter, exhaling, relief", "stones dropping away in production, lightening melody, exhale vocal", "PT"), durationSeconds: 240 },
  { number: 4, title: "Standing", description: "Erguida, leve, as pedras no chao", lang: "EN", energy: "anthem", prompt: cursoPrompt("standing tall, light, stones on the ground, unburdened", "light, upright, free, weightless joy", "light free melody, standing tall vocal, liberated movement in rhythm", "EN", "anthem"), durationSeconds: 300 },
]);

const CURSO_VOZ_DENTRO = cursoAlbum("curso-voz-dentro", "voz-de-dentro", "Voz de Dentro", "Encontrar a tua voz", "Sala do Eco", [
  { number: 1, title: "Silêncio", description: "A sala vazia antes da voz", lang: "PT", prompt: cursoPrompt("silence, the empty room before the voice comes", "silent, waiting, dark violet, anticipation", "silence, waiting sonic space, violet darkness, anticipation", "PT"), durationSeconds: 240 },
  { number: 2, title: "Echo", description: "O primeiro som que volta", lang: "EN", prompt: cursoPrompt("first echo, the sound that comes back, hearing yourself", "resonant, discovering, golden echo, wonder", "echo textures, resonant return of voice, discovering self-sound", "EN"), durationSeconds: 240 },
  { number: 3, title: "Voz", description: "A voz que sempre esteve la", lang: "PT", prompt: cursoPrompt("the voice that was always there, finding it at last", "clear, strong, authentic, recognition", "clear vocal emerging strong, authentic melody, self-recognition", "PT"), durationSeconds: 240 },
  { number: 4, title: "Sing", description: "A voz que canta por fim", lang: "EN", energy: "anthem", prompt: cursoPrompt("singing at last, voice freed, the full expression", "singing, free, joyful, complete, triumphant", "full voice singing free, joyful vocal resolution, complete expression", "EN", "anthem"), durationSeconds: 300 },
]);

const CURSO_FIO_INVISIVEL = cursoAlbum("curso-fio-invisivel", "o-fio-invisivel", "O Fio Invisível", "A ligação entre todos nós", "Lago dos Reflexos Partilhados", [
  { number: 1, title: "Superficie Opaca", description: "O lago antes de se ver", lang: "PT", prompt: cursoPrompt("opaque lake surface, isolation, no reflection visible", "isolated, still, silver-dark, yearning for connection", "still silver pads, isolated vocal, dark reflective surface", "PT"), durationSeconds: 240 },
  { number: 2, title: "Golden Thread", description: "O primeiro fio que liga", lang: "EN", prompt: cursoPrompt("golden thread connecting, first invisible bond becoming visible", "connecting, delicate, golden discovery", "delicate golden thread melody, connecting textures, emerging bond", "EN"), durationSeconds: 240 },
  { number: 3, title: "Reflexos", description: "As gerações na água", lang: "PT", prompt: cursoPrompt("reflections of generations in water, ancestral connections visible", "ancestral, deep, generational, transparent", "deep ancestral pads, generational vocal layers, transparent water textures", "PT"), durationSeconds: 240 },
  { number: 4, title: "Unity", description: "Reflexos que se fundem num so", lang: "EN", prompt: cursoPrompt("individual reflections merging into one, collective unity", "unified, radiant, collective, whole", "unified harmonies, radiant golden production, collective wholeness", "EN"), durationSeconds: 300 },
]);

const CURSO_ESPELHO_OUTRO = cursoAlbum("curso-espelho-outro", "o-espelho-do-outro", "O Espelho do Outro", "O que o outro revela de ti", "Galeria dos Reflexos Vivos", [
  { number: 1, title: "Galeria Escura", description: "Espelhos que mostram outros", lang: "PT", prompt: cursoPrompt("dark gallery with living mirrors showing others, looking outward never inward", "confused, projecting, emerald-dark, searching", "emerald dark textures, confused seeking melody, outward-looking vocal", "PT"), durationSeconds: 240 },
  { number: 2, title: "Mirror Self", description: "Quando o reflexo e teu", lang: "EN", prompt: cursoPrompt("mirror showing your own reflection mixed with others, partial recognition", "recognizing, integrating, emerald-gold", "recognizing melody, integrating vocal layers, emerald-gold warmth", "EN"), durationSeconds: 240 },
  { number: 3, title: "Integração", description: "O outro como contexto, não identidade", lang: "PT", prompt: cursoPrompt("others as context not identity, seeing clearly through the other", "clear, integrated, peaceful, self-recognized", "clear emerald melody, integrated vocal, peaceful self-recognition", "PT"), durationSeconds: 240 },
  { number: 4, title: "Clear Glass", description: "Ver-se com clareza total", lang: "EN", prompt: cursoPrompt("clear glass, seeing yourself fully, others as background", "clear, whole, emerald peace, complete vision", "clear pristine melody, whole vocal, emerald peace in production", "EN"), durationSeconds: 300 },
]);

const CURSO_SILENCIO_GRITA = cursoAlbum("curso-silencio-grita", "o-silencio-que-grita", "O Silêncio que Grita", "O que nunca foi dito", "Caverna dos Ecos Mudos", [
  { number: 1, title: "Caverna Muda", description: "O silencio total da familia", lang: "PT", prompt: cursoPrompt("silent cavern, unspoken words as shadows on walls, family silence", "heavy, silent, grey-blue, ghostly", "heavy silent pads, ghostly white textures, oppressive stillness", "PT"), durationSeconds: 240 },
  { number: 2, title: "First Word", description: "A primeira palavra que sai", lang: "EN", prompt: cursoPrompt("first word spoken, breaking family silence, echoes emerging", "breaking, brave, fearful yet determined", "breaking silence textures, brave emerging vocal, first echo sound", "EN"), durationSeconds: 240 },
  { number: 3, title: "Ecos Dourados", description: "O silencio transforma-se em voz", lang: "PT", prompt: cursoPrompt("golden echoes filling cavern, silence transformed into resonance", "liberated, resonant, golden-white, powerful", "resonant golden echoes, liberated vocal, powerful cavern acoustics", "PT"), durationSeconds: 240 },
  { number: 4, title: "Resonance", description: "As paredes vibram com a verdade", lang: "EN", prompt: cursoPrompt("walls vibrating with truth, freed words as light, liberation", "vibrant, free, illuminated, truth spoken", "vibrant resonant production, free vocal melody, illuminated truth", "EN"), durationSeconds: 300 },
]);

const CURSO_TEIA = cursoAlbum("curso-teia", "a-teia", "A Teia", "Pertencer sem desaparecer", "Bosque dos Fios Entrelaçados", [
  { number: 1, title: "Fios Presos", description: "A teia que sufoca", lang: "PT", prompt: cursoPrompt("tangled threads trapping, suffocating web of belonging", "trapped, suffocating, dark moss-green, tangled", "tangled dark textures, suffocating rhythm, trapped vocal melody", "PT"), durationSeconds: 240 },
  { number: 2, title: "Cut Free", description: "Cortar sem destruir", lang: "EN", prompt: cursoPrompt("cutting threads without destroying the web, selective freedom", "liberating, careful, green-golden light", "careful cutting textures, liberating vocal, green-golden emerging light", "EN"), durationSeconds: 240 },
  { number: 3, title: "Teia Bonita", description: "A rede que sustenta", lang: "PT", prompt: cursoPrompt("beautiful balanced web connecting without trapping, sustaining network", "balanced, connected, luminous green, belonging", "balanced woven melody, connected vocal harmonies, luminous moss-green", "PT"), durationSeconds: 240 },
  { number: 4, title: "Belong", description: "Pertencer sendo inteira", lang: "EN", prompt: cursoPrompt("belonging without disappearing, whole within the web", "whole, belonging, golden-green, complete", "whole belonging melody, golden-green production, complete connected vocal", "EN"), durationSeconds: 300 },
]);

const CURSO_CHAMA = cursoAlbum("curso-chama", "a-chama", "A Chama", "A raiva como força", "Vulcão Adormecido", [
  { number: 1, title: "Selado", description: "O vulcao que ninguem ve", lang: "PT", prompt: cursoPrompt("sealed dormant volcano, invisible pressure underneath, suppressed rage", "sealed, pressured, dark red, rigid", "sealed pressure bass, rigid rhythm, dark red undercurrent", "PT"), durationSeconds: 240 },
  { number: 2, title: "Crack", description: "A primeira fissura", lang: "EN", prompt: cursoPrompt("cracks revealing lava underneath, first anger acknowledged", "cracking, hot, red-orange, awakening", "cracking textures, hot rising synth, red-orange awakening vocal", "EN"), durationSeconds: 240 },
  { number: 3, title: "Fogo Controlado", description: "A raiva como aliada", lang: "PT", energy: "pulse", flavor: "house", prompt: cursoPrompt("controlled fire as ally, rage channeled not destroyed", "fierce, controlled, powerful, warm light", "fierce controlled rhythm, powerful channeled vocal, warm fierce light", "PT", "pulse", "house"), durationSeconds: 240 },
  { number: 4, title: "Blaze", description: "O vulcao que ilumina", lang: "EN", energy: "anthem", prompt: cursoPrompt("active beautiful volcano illuminating landscape, power embraced", "blazing, beautiful, powerful, red-gold", "blazing powerful production, beautiful fierce vocal, red-gold triumph", "EN", "anthem"), durationSeconds: 300 },
]);

const CURSO_MULHER_MAE = cursoAlbum("curso-mulher-mae", "a-mulher-antes-de-mae", "A Mulher Antes de Mãe", "Quem eras antes do ninho", "Ninho que Pesa", [
  { number: 1, title: "Ninho Pesado", description: "O ninho que engole", lang: "PT", prompt: cursoPrompt("heavy nest consuming the woman, only mother visible, overwhelming ochre", "consumed, heavy, overwhelming, lost identity", "heavy ochre pads, consumed vocal, overwhelming motherhood rhythm", "PT"), durationSeconds: 240 },
  { number: 2, title: "Before", description: "A mulher antes do ninho", lang: "EN", prompt: cursoPrompt("the woman before the nest, remembering who she was", "remembering, yearning, warm ochre, emerging", "remembering melody, yearning vocal, warm ochre emerging identity", "EN"), durationSeconds: 240 },
  { number: 3, title: "Duas Formas", description: "Mae e mulher ao mesmo tempo", lang: "PT", prompt: cursoPrompt("two forms of the same person, mother and woman coexisting", "coexisting, balanced, warm ochre light, dual", "dual melody layers, coexisting vocal, balanced warm ochre", "PT"), durationSeconds: 240 },
  { number: 4, title: "Whole Nest", description: "O ninho com espaço", lang: "EN", energy: "anthem", prompt: cursoPrompt("beautiful nest with space for the whole woman, mother and self", "whole, balanced, golden ochre, complete", "whole balanced melody, golden ochre production, complete woman vocal", "EN", "anthem"), durationSeconds: 300 },
]);

const CURSO_OFICIO_SER = cursoAlbum("curso-oficio-ser", "o-oficio-de-ser", "O Ofício de Ser", "Trabalho com propósito", "Oficina Infinita", [
  { number: 1, title: "Máquinas", description: "A oficina que não para", lang: "PT", prompt: cursoPrompt("dark workshop with machines running nonstop, exhaustion, no window", "exhausted, mechanical, bronze-dark, trapped", "mechanical rhythm, exhausted vocal, bronze-dark trapped production", "PT"), durationSeconds: 240 },
  { number: 2, title: "Pause", description: "A primeira pausa", lang: "EN", prompt: cursoPrompt("machines stopping, first pause, crack of light, straightening up", "pausing, breathing, bronze warming, relief", "pausing rhythm, breathing vocal, bronze warming first light", "EN"), durationSeconds: 240 },
  { number: 3, title: "Ritmo Proprio", description: "Trabalhar sem prisao", lang: "PT", prompt: cursoPrompt("own rhythm workshop, window half-open, purpose without prison", "rhythmic, purposeful, warm bronze, free", "own rhythm melody, purposeful vocal, warm bronze free production", "PT"), durationSeconds: 240 },
  { number: 4, title: "Craft", description: "O oficio como presenca", lang: "EN", prompt: cursoPrompt("workshop with open window, working and pausing, craft as presence", "present, crafted, warm bronze, peaceful", "crafted melody, present vocal, warm bronze peaceful production", "EN"), durationSeconds: 300 },
]);

const CURSO_RELOGIO = cursoAlbum("curso-relogio", "o-relógio-partido", "O Relógio Partido", "Libertar-se do tempo", "Jardim das Estações", [
  { number: 1, title: "Relógio Gigante", description: "Presa no tempo", lang: "PT", prompt: cursoPrompt("giant clock dominating garden, everything accelerated, anguish", "anxious, accelerated, silver-grey, trapped in time", "anxious ticking rhythm, accelerated vocal, silver-grey time pressure", "PT"), durationSeconds: 240 },
  { number: 2, title: "Cracking Time", description: "O tempo a abrandar", lang: "EN", prompt: cursoPrompt("clock cracking, time slowing, some flowers pausing", "slowing, cracking, amber beginning, relief", "slowing rhythm, cracking textures, amber relief emerging", "EN"), durationSeconds: 240 },
  { number: 3, title: "Estações", description: "Todas as estacoes ao mesmo tempo", lang: "PT", prompt: cursoPrompt("broken clock, all seasons coexisting, spring and autumn side by side", "timeless, coexisting, amber-silver, present", "timeless flowing melody, coexisting seasonal textures, amber-silver peace", "PT"), durationSeconds: 240 },
  { number: 4, title: "Present", description: "Sem relógio, com presenca", lang: "EN", prompt: cursoPrompt("no clock, garden in harmony, seated silhouette present, timeless beauty", "present, harmonious, amber peace, timeless", "present harmonious melody, timeless vocal, amber peaceful production", "EN"), durationSeconds: 300 },
]);

const CURSO_COROA = cursoAlbum("curso-coroa", "a-coroa-escondida", "A Coroa Escondida", "O poder que é teu", "Trono Coberto", [
  { number: 1, title: "Trono Coberto", description: "O poder escondido", lang: "PT", prompt: cursoPrompt("covered throne in dark room, silhouette small and turned away, hidden power", "hidden, small, purple-dark, unaware", "hidden dark pads, small diminished vocal, purple-dark concealment", "PT"), durationSeconds: 240 },
  { number: 2, title: "Unveiled", description: "O trono revelado", lang: "EN", prompt: cursoPrompt("cloths slipping off throne, gold and purple revealed, fear and curiosity", "revealing, curious, gold-purple, awakening", "revealing golden textures, curious vocal, gold-purple awakening", "EN"), durationSeconds: 240 },
  { number: 3, title: "Hesitação", description: "Tocar no poder", lang: "PT", prompt: cursoPrompt("standing next to uncovered throne, hesitation, reaching toward power", "hesitant, reaching, golden-purple, brave", "hesitant reaching melody, brave vocal, golden-purple building power", "PT"), durationSeconds: 240 },
  { number: 4, title: "Crown", description: "Sentada no trono, sem permissao", lang: "EN", energy: "anthem", prompt: cursoPrompt("seated on throne, crown on head, without permission, total presence and power", "powerful, crowned, golden-purple, sovereign", "powerful sovereign melody, crowned triumphant vocal, golden-purple majesty", "EN", "anthem"), durationSeconds: 300 },
]);

const CURSO_FOME = cursoAlbum("curso-fome", "a-fome", "A Fome", "O corpo e a fome", "Mesa Vazia", [
  { number: 1, title: "Mesa Vazia", description: "A fome que não é de comida", lang: "PT", prompt: cursoPrompt("enormous empty table, famished silhouette, empty plate, craving and lack", "famished, empty, rosewood-dark, craving", "empty hollow textures, famished vocal, rosewood-dark craving", "PT"), durationSeconds: 240 },
  { number: 2, title: "Hunger", description: "Fome sem nome", lang: "EN", prompt: cursoPrompt("unnamed hunger, conflict between hunger and guilt, hesitant", "conflicted, hesitant, weak rosewood, unnamed desire", "conflicted rhythm, hesitant vocal, weak rosewood guilt textures", "EN"), durationSeconds: 240 },
  { number: 3, title: "Comer em Paz", description: "Sem culpa, com atencao", lang: "PT", prompt: cursoPrompt("eating with attention, no guilt, warm presence, body nourished", "present, guiltless, warm rosy, nourished", "present warm melody, guiltless vocal, rosy nourished production", "PT"), durationSeconds: 240 },
  { number: 4, title: "Feast", description: "Em paz com o prato e com o corpo", lang: "EN", energy: "steady", prompt: cursoPrompt("at peace with the plate, inhabited body, presence, terracotta and porcelain", "peaceful, inhabited, terracotta warmth, complete", "peaceful inhabited melody, complete warm vocal, terracotta porcelain beauty", "EN", "steady"), durationSeconds: 300 },
]);

// ─────────────────────────────────────────────
// ESPIRITUAIS (10 albums — espiritualidade crua, corporal, sem religiao)
// ─────────────────────────────────────────────

const ESPIRITUAL_COLORS: Record<number, string> = {
  1: "#A89070", // Oração Sem Palavras — areia quente
  2: "#6B8E5A", // Sagrado Selvagem — verde floresta
  3: "#C4A87A", // Ritual — dourado terroso
  4: "#B8A0C8", // Graça — lavanda suave
  5: "#4A5A7A", // Silêncio Sagrado — azul noite
  6: "#8A7060", // Entrega — terra escura
  7: "#D4A853", // Mãos Abertas — dourado quente
  8: "#6A8A70", // Raiz e Céu — verde-terra
  9: "#5A8AA0", // Água Viva — azul água
  10: "#9A7A6A", // Amém — terracota suave
  11: "#7A5A50", // Prece — terracota escuro
  12: "#C89A40", // Centelha — âmbar faísca
  13: "#3A4A6A", // Vastidão — azul profundo
  14: "#8A7A6A", // Catedral — pedra quente
  15: "#A09080", // Grão — areia seca
  16: "#5A7A8A", // Mesma Água — azul-cinza rio
  17: "#7A6A8A", // Além do Nome — violeta escuro
  18: "#8AA090", // Respirar — verde-salvia
  19: "#6A6050", // Cinza e Semente — cinza-terra
  20: "#B07A4A", // Chama Última — âmbar fogo
};

function spiritualPrompt(theme: string, emotion: string, production: string, lang: "PT" | "EN", energy: TrackEnergy = "whisper", flavor: TrackFlavor = "organic"): string {
  const langNote = lang === "PT" ? "Lyrics in Portuguese." : "Lyrics in English.";
  return buildPromptWithFlavor(`${ENERGY_STYLES[energy]} ${langNote} Sacred but not religious, body-centred, breath as prayer. ${emotion}. ${production}. Theme: ${theme}.`, flavor);
}

function spiritualAlbum(slug: string, title: string, subtitle: string, color: string, tracks: TrackDef[]): AlbumDef {
  return { slug, title, subtitle, product: "espiritual", color, tracks };
}

const ESP_ORACAO: AlbumDef = spiritualAlbum("espiritual-oracao", "Oração Sem Palavras", "Quando as palavras não chegam, o corpo reza", ESPIRITUAL_COLORS[1], [
  { number: 1, title: "Respira", description: "A oração que vem antes da linguagem", lang: "PT", energy: "raw", prompt: spiritualPrompt("breathing as prayer, exhaustion before language", "exhausted, raw, desperate breath, surrendering", "close-mic breathing, minimal piano, raw vocal, silence as space", "PT", "raw"), durationSeconds: 240, audioUrl: null },
  { number: 2, title: "Hands", description: "Palmas abertas, a receber o nada e o tudo", lang: "EN", energy: "whisper", prompt: spiritualPrompt("open palms receiving nothing and everything", "receptive, open, tender, empty-full", "soft piano, gentle pads, open space, breath textures", "EN", "whisper"), durationSeconds: 240, audioUrl: null },
  { number: 3, title: "De Joelhos", description: "Não submissão — escolher o chão", lang: "PT", energy: "steady", prompt: spiritualPrompt("kneeling by choice, choosing the ground, humility as strength", "grounded, chosen, strong in lowness, dignified", "warm bass, steady rhythm, grounded vocal, acoustic guitar", "PT", "steady"), durationSeconds: 240, audioUrl: null },
  { number: 4, title: "The Space Between Breaths", description: "A pausa onde o sagrado mora", lang: "EN", energy: "whisper", prompt: spiritualPrompt("the gap between breaths where the sacred lives", "suspended, sacred, liminal, infinite pause", "suspended pads, breath sounds, liminal space, barely there percussion", "EN", "whisper"), durationSeconds: 240, audioUrl: null },
  { number: 5, title: "Amém do Corpo", description: "O amém que não se diz — sente-se", lang: "PT", energy: "raw", prompt: spiritualPrompt("the body's own amen, not spoken but felt in bones", "visceral, affirming, bodily truth, physical prayer", "raw close vocal, body percussion, heartbeat bass, minimal", "PT", "raw"), durationSeconds: 270, audioUrl: null },
]);

const ESP_SAGRADO_SELVAGEM: AlbumDef = spiritualAlbum("espiritual-sagrado-selvagem", "Sagrado Selvagem", "O divino na tempestade, na terra, no corpo animal", ESPIRITUAL_COLORS[2], [
  { number: 1, title: "Terra", description: "Pés na lama — o sagrado é raiz", lang: "PT", energy: "steady", flavor: "marrabenta", prompt: spiritualPrompt("feet in mud, sacred is dirt and root", "earthy, grounded, primal, joyful connection to soil", "marrabenta guitar groove, earth percussion, warm grounded vocal", "PT", "steady", "marrabenta"), durationSeconds: 240, audioUrl: null },
  { number: 2, title: "Storm Prayer", description: "Rezar no meio da tempestade, não depois", lang: "EN", energy: "pulse", prompt: spiritualPrompt("praying in the storm, not after it, worship in chaos", "urgent, stormy, fierce, wild prayer", "driving rain textures, urgent rhythm, fierce vocal, storm energy", "EN", "pulse"), durationSeconds: 240, audioUrl: null },
  { number: 3, title: "Bicho", description: "O animal em ti que sabe antes de pensares", lang: "PT", energy: "raw", prompt: spiritualPrompt("the animal self, instinct before thought, wild knowing", "primal, instinctive, raw, untamed", "raw vocal growl, primal percussion, stripped production, animal energy", "PT", "raw"), durationSeconds: 240, audioUrl: null },
  { number: 4, title: "Barefoot", description: "Caminhar sem armadura — pele na terra", lang: "EN", energy: "steady", prompt: spiritualPrompt("walking barefoot, skin on earth, unarmoured presence", "vulnerable, present, connected, bare", "acoustic guitar, walking rhythm, bare production, earth textures", "EN", "steady"), durationSeconds: 240, audioUrl: null },
  { number: 5, title: "Fogo Dentro", description: "O fogo que não destrói — o sagrado em chamas", lang: "PT", energy: "anthem", flavor: "gospel", prompt: spiritualPrompt("the fire within that doesn't destroy, sacred blaze", "blazing, sacred, powerful, transcendent fire", "gospel choir, organ warmth, blazing vocal, fire energy, building power", "PT", "anthem", "gospel"), durationSeconds: 300, audioUrl: null },
]);

const ESP_RITUAL: AlbumDef = spiritualAlbum("espiritual-ritual", "Ritual", "O sagrado no gesto comum — café como cerimónia", ESPIRITUAL_COLORS[3], [
  { number: 1, title: "Manhã", description: "O primeiro gesto do dia, antes do mundo entrar", lang: "PT", energy: "whisper", prompt: spiritualPrompt("first gesture of the day, before the world enters", "dawn, tender, quiet ceremony, waking", "soft morning piano, gentle light textures, quiet vocal, dawn pads", "PT", "whisper"), durationSeconds: 240, audioUrl: null },
  { number: 2, title: "Bread", description: "Partir pão — a comunhão mais simples", lang: "EN", energy: "steady", prompt: spiritualPrompt("breaking bread, simplest communion, nourishment as sacred", "warm, nourishing, communal, simple", "warm acoustic guitar, steady gentle rhythm, nourishing vocal, bread warmth", "EN", "steady"), durationSeconds: 240, audioUrl: null },
  { number: 3, title: "Água nas Mãos", description: "Lavar as mãos — lavar o que passou", lang: "PT", energy: "whisper", prompt: spiritualPrompt("washing hands as ritual, water carrying away what's done", "cleansing, light, flowing, releasing", "water textures, flowing piano, light vocal, cleansing pads", "PT", "whisper"), durationSeconds: 240, audioUrl: null },
  { number: 4, title: "Threshold", description: "Cada porta é passagem — cada entrada, uma escolha", lang: "EN", energy: "steady", prompt: spiritualPrompt("every doorway is a passage, every entrance a choice", "liminal, aware, choosing, conscious entry", "steady walking rhythm, door-like resonance, aware vocal, threshold textures", "EN", "steady"), durationSeconds: 240, audioUrl: null },
  { number: 5, title: "Fecho os Olhos", description: "O ritual de voltar a ti", lang: "PT", energy: "raw", prompt: spiritualPrompt("closing your eyes, the ritual of returning to yourself", "inward, intimate, returning, self-meeting", "raw close vocal, minimal piano, breath sounds, inward silence", "PT", "raw"), durationSeconds: 270, audioUrl: null },
]);

const ESP_GRACA: AlbumDef = spiritualAlbum("espiritual-graca", "Graça", "Receber sem merecer — amolecer", ESPIRITUAL_COLORS[4], [
  { number: 1, title: "Não Mereci", description: "O choque de receber o que não ganhaste", lang: "PT", energy: "raw", prompt: spiritualPrompt("shock of receiving what you didn't earn, undeserved grace", "stunned, overwhelmed, grateful shock, unearned", "raw vocal, sparse piano, stunned silence, emotion breaking through", "PT", "raw"), durationSeconds: 240, audioUrl: null },
  { number: 2, title: "Softening", description: "A armadura cai — não por fraqueza, por prontidão", lang: "EN", energy: "whisper", prompt: spiritualPrompt("armour falling away, not weakness but readiness, softening", "softening, yielding, ready, tender strength", "soft dissolving pads, tender vocal, melting textures, warmth arriving", "EN", "whisper"), durationSeconds: 240, audioUrl: null },
  { number: 3, title: "Cai Sobre Mim", description: "A graça que cai como chuva — tu ficas parada", lang: "PT", energy: "steady", flavor: "gospel", prompt: spiritualPrompt("grace falling like rain, just standing there receiving", "receiving, open, rained upon, standing in grace", "gospel organ warmth, rain textures, steady receiving vocal, choir hum", "PT", "steady", "gospel"), durationSeconds: 270, audioUrl: null },
  { number: 4, title: "Unearned", description: "A beleza do que nunca foi devido", lang: "EN", energy: "whisper", prompt: spiritualPrompt("beauty of what was never owed, unearned gifts", "grateful, humbled, beautiful, undeserved beauty", "gentle piano arpeggios, grateful vocal, light strings, beauty textures", "EN", "whisper"), durationSeconds: 240, audioUrl: null },
]);

const ESP_SILENCIO: AlbumDef = spiritualAlbum("espiritual-silencio", "Silêncio Sagrado", "A plenitude da quietude", ESPIRITUAL_COLORS[5], [
  { number: 1, title: "Cala", description: "A ordem para calar — mas gentil, como o mar depois da onda", lang: "PT", energy: "whisper", prompt: spiritualPrompt("command to be silent, gentle like sea after wave", "hushing, gentle command, settling, ocean calm", "ocean-like pads, gentle shushing textures, settling vocal, wave sounds", "PT", "whisper"), durationSeconds: 240, audioUrl: null },
  { number: 2, title: "Still", description: "Quietude como prática — não paz, disciplina", lang: "EN", energy: "whisper", prompt: spiritualPrompt("stillness as practice, not peace but discipline", "disciplined, still, practiced, held silence", "minimal production, held notes, disciplined vocal, practiced stillness", "EN", "whisper"), durationSeconds: 240, audioUrl: null },
  { number: 3, title: "O Vazio Cheio", description: "O vazio que na verdade está cheio", lang: "PT", energy: "raw", prompt: spiritualPrompt("emptiness that is actually full, paradox of silence", "paradoxical, full-empty, profound, surprising", "raw vocal in empty space, paradox textures, fullness emerging from nothing", "PT", "raw"), durationSeconds: 240, audioUrl: null },
  { number: 4, title: "Listen", description: "O silêncio não é ausência — é outra forma de ouvir", lang: "EN", energy: "steady", prompt: spiritualPrompt("silence as different listening, not absence but attention", "attentive, listening, hearing the unheard, present", "subtle textures emerging from silence, attentive vocal, listening production", "EN", "steady"), durationSeconds: 240, audioUrl: null },
  { number: 5, title: "Catedral Interior", description: "A catedral por dentro — sem paredes, sem tecto", lang: "PT", energy: "whisper", prompt: spiritualPrompt("cathedral inside, no walls, no roof, just infinite space", "vast, interior, sacred space, limitless", "vast reverb, cathedral space, whisper vocal, infinite pads", "PT", "whisper"), durationSeconds: 270, audioUrl: null },
]);

const ESP_ENTREGA: AlbumDef = spiritualAlbum("espiritual-entrega", "Entrega", "Largar o controlo — confiar no que não se vê", ESPIRITUAL_COLORS[6], [
  { number: 1, title: "Segurar", description: "A exaustão de segurar tudo — antes da queda", lang: "PT", energy: "raw", prompt: spiritualPrompt("exhaustion of holding everything, before the fall", "exhausted, gripping, desperate, about to break", "tense raw vocal, gripping textures, exhaustion in production, tension bass", "PT", "raw"), durationSeconds: 240, audioUrl: null },
  { number: 2, title: "Freefall", description: "O momento de largar — não paz, vertigem", lang: "EN", energy: "pulse", prompt: spiritualPrompt("moment of letting go, not peace but vertigo, freefall", "vertiginous, falling, exhilarating terror, released", "falling synth textures, vertigo rhythm, released vocal, freefall production", "EN", "pulse"), durationSeconds: 240, audioUrl: null },
  { number: 3, title: "Mãos Vazias", description: "Mãos vazias — nada para segurar. E chega.", lang: "PT", energy: "steady", prompt: spiritualPrompt("empty hands, nothing to hold, and it's enough", "empty, sufficient, peaceful emptiness, released", "open acoustic guitar, empty-handed vocal, steady lightness, space", "PT", "steady"), durationSeconds: 240, audioUrl: null },
  { number: 4, title: "Trust the Dark", description: "Confiar na escuridão por onde cais", lang: "EN", energy: "whisper", prompt: spiritualPrompt("trusting darkness you're falling through, faith without sight", "trusting, dark, blind faith, surrender", "dark pads, trust textures, whisper vocal, falling through darkness", "EN", "whisper"), durationSeconds: 240, audioUrl: null },
  { number: 5, title: "Rio", description: "Tornar-se o rio — não nadar, fluir", lang: "PT", energy: "steady", prompt: spiritualPrompt("becoming the river, not swimming but flowing", "flowing, surrendered, becoming, river-self", "flowing water textures, river rhythm, becoming vocal, fluid production", "PT", "steady"), durationSeconds: 270, audioUrl: null },
]);

const ESP_MAOS_ABERTAS: AlbumDef = spiritualAlbum("espiritual-maos-abertas", "Mãos Abertas", "Dar sem te perderes — servir como presença", ESPIRITUAL_COLORS[7], [
  { number: 1, title: "Dar", description: "O gesto de dar — simples, não heroico", lang: "PT", energy: "steady", prompt: spiritualPrompt("the gesture of giving, simple not heroic", "simple, generous, warm, grounded giving", "warm steady rhythm, simple vocal, giving textures, acoustic warmth", "PT", "steady"), durationSeconds: 240, audioUrl: null },
  { number: 2, title: "Empty Cup", description: "Não podes dar do vazio — a verdade da depleção", lang: "EN", energy: "raw", prompt: spiritualPrompt("can't pour from empty, truth of depletion", "depleted, honest, empty, needing to receive first", "raw depleted vocal, empty textures, honest production, sparse", "EN", "raw"), durationSeconds: 240, audioUrl: null },
  { number: 3, title: "Servir", description: "Servir sem custar a alma — alegria no dar", lang: "PT", energy: "steady", flavor: "marrabenta", prompt: spiritualPrompt("service that doesn't cost your soul, joy in giving", "joyful, generous, rhythmic, service as dance", "marrabenta joy rhythm, generous vocal, dancing service, warm bass", "PT", "steady", "marrabenta"), durationSeconds: 240, audioUrl: null },
  { number: 4, title: "Open Hands", description: "Mãos abertas — não dar tudo, oferecer", lang: "EN", energy: "whisper", prompt: spiritualPrompt("hands open, not giving away but offering", "offering, gentle, present, open", "gentle open pads, offering vocal, tender production, hands-open space", "EN", "whisper"), durationSeconds: 270, audioUrl: null },
]);

const ESP_RAIZ_CEU: AlbumDef = spiritualAlbum("espiritual-raiz-ceu", "Raiz e Céu", "Pés na terra, cabeça nas estrelas", ESPIRITUAL_COLORS[8], [
  { number: 1, title: "Raiz", description: "Raízes — profundas, escuras, necessárias", lang: "PT", energy: "steady", prompt: spiritualPrompt("roots deep dark necessary, invisible foundation", "deep, rooted, foundational, dark earth", "deep bass, root textures, grounded vocal, earth rhythm", "PT", "steady"), durationSeconds: 240, audioUrl: null },
  { number: 2, title: "Sky Inside", description: "O céu não está acima — está no teu peito", lang: "EN", energy: "whisper", prompt: spiritualPrompt("sky not above but inside your chest, inner vastness", "vast, interior, expansive, sky-inside", "expansive pads, sky textures, whisper vocal, chest resonance", "EN", "whisper"), durationSeconds: 240, audioUrl: null },
  { number: 3, title: "Vertical", description: "A coluna como eixo — entre terra e céu", lang: "PT", energy: "pulse", prompt: spiritualPrompt("spine as axis between earth and heaven, vertical being", "vertical, aligned, energized, axis", "driving vertical rhythm, spine-like bass, aligned vocal, ascending energy", "PT", "pulse"), durationSeconds: 240, audioUrl: null },
  { number: 4, title: "Both", description: "Ser raiz e céu ao mesmo tempo", lang: "EN", energy: "steady", prompt: spiritualPrompt("being root and sky simultaneously, no contradiction", "dual, harmonious, complete, both-at-once", "dual melody layers, harmonious production, complete vocal, root-and-sky", "EN", "steady"), durationSeconds: 240, audioUrl: null },
  { number: 5, title: "Árvore", description: "Tu és a árvore — enraizada e a crescer", lang: "PT", energy: "anthem", prompt: spiritualPrompt("you are the tree, rooted and reaching, growing upward", "majestic, rooted, reaching, tree-strong", "rising anthem production, rooted bass, reaching vocal, tree-strength strings", "PT", "anthem"), durationSeconds: 300, audioUrl: null },
]);

const ESP_AGUA_VIVA: AlbumDef = spiritualAlbum("espiritual-agua-viva", "Água Viva", "Limpeza, renascimento — baptismo sem igreja", ESPIRITUAL_COLORS[9], [
  { number: 1, title: "Fonte", description: "A nascente — onde a água começa, antes de ter nome", lang: "PT", energy: "whisper", prompt: spiritualPrompt("the spring where water begins, before it's named", "emerging, pure, beginning, source", "spring water textures, emerging piano, source vocal, pure beginning", "PT", "whisper"), durationSeconds: 240, audioUrl: null },
  { number: 2, title: "Wash", description: "Lavar — não culpa, apenas deixar a água levar", lang: "EN", energy: "steady", prompt: spiritualPrompt("washing, not guilt, letting water carry away what's done", "cleansing, releasing, flowing away, water taking", "flowing water rhythm, cleansing vocal, releasing textures, steady flow", "EN", "steady"), durationSeconds: 240, audioUrl: null },
  { number: 3, title: "Mergulho", description: "Mergulhar — imersão total, renascimento pela água", lang: "PT", energy: "pulse", prompt: spiritualPrompt("diving under, full immersion, rebirth through water", "submerged, reborn, total immersion, underwater", "underwater textures, diving rhythm, submerged vocal, rebirth building", "PT", "pulse"), durationSeconds: 240, audioUrl: null },
  { number: 4, title: "Surface", description: "Quebrar a superfície — a inspiração do renascido", lang: "EN", energy: "raw", prompt: spiritualPrompt("breaking the surface, gasping, alive, reborn", "gasping, alive, reborn, raw emergence", "surface-breaking textures, gasping vocal, raw alive production, air rushing", "EN", "raw"), durationSeconds: 270, audioUrl: null },
]);

const ESP_AMEM: AlbumDef = spiritualAlbum("espiritual-amem", "Amém", "O 'sim' que dizemos juntas", ESPIRITUAL_COLORS[10], [
  { number: 1, title: "Sozinha Não", description: "O momento em que percebes que não estás só", lang: "PT", energy: "raw", prompt: spiritualPrompt("realizing you're not alone, shock of belonging", "shocked, belonging, raw realization, not-alone", "raw vocal breaking, belonging textures, realization in production, raw", "PT", "raw"), durationSeconds: 240, audioUrl: null },
  { number: 2, title: "Communion", description: "Não pão e vinho — apenas estar na mesma sala com a verdade", lang: "EN", energy: "steady", flavor: "gospel", prompt: spiritualPrompt("not bread and wine, just being in the same room with truth", "communal, truthful, together, shared presence", "gospel warmth, communal vocal, shared rhythm, truth presence", "EN", "steady", "gospel"), durationSeconds: 240, audioUrl: null },
  { number: 3, title: "Nós", description: "'Nós' — o plural que salva, vozes juntas", lang: "PT", energy: "anthem", flavor: "gospel", prompt: spiritualPrompt("we, the plural that saves, voices together", "collective, powerful, together, saving plural", "gospel choir building, anthem vocal, together rhythm, collective power", "PT", "anthem", "gospel"), durationSeconds: 300, audioUrl: null },
  { number: 4, title: "Grão", description: "Um grão — pequeno, parte do todo. O amém é sussurro.", lang: "PT", energy: "raw", prompt: spiritualPrompt("a grain, tiny, part of the whole, amen as whisper not stadium", "tiny, humble, part-of-whole, collective whisper", "minimal raw vocal, grain-like textures, tiny humble production, whisper amen", "PT", "raw"), durationSeconds: 270, audioUrl: null },
]);

// ─────────────────────────────────────────────
// ALBUM 11: PRECE (the raw human cry to something bigger)
// ─────────────────────────────────────────────

const ESP_PRECE: AlbumDef = spiritualAlbum("espiritual-prece", "Prece", "O grito cru ao que não tem nome", ESPIRITUAL_COLORS[11], [
  { number: 1, title: "Pede", description: "O pedido que sai do peito antes da vergonha", lang: "PT", energy: "raw", flavor: "organic", prompt: spiritualPrompt("the raw cry from the chest before shame catches up", "desperate, unfiltered, chest-cracking, first cry", "close-mic raw vocal, solo piano, breath sounds, silence between phrases", "PT", "raw", "organic"), durationSeconds: 240, audioUrl: null },
  { number: 2, title: "Unanswered", description: "When the sky says nothing back", lang: "EN", energy: "whisper", flavor: "organic", prompt: spiritualPrompt("praying into silence, no answer, staying anyway", "lonely, persistent, faith-without-proof, waiting", "sparse pads, breath textures, distant piano, vast empty space", "EN", "whisper", "organic"), durationSeconds: 240, audioUrl: null },
  { number: 3, title: "Desamparo", description: "O lugar onde ninguem chega — e rezas na mesma", lang: "PT", energy: "steady", flavor: "gospel", prompt: spiritualPrompt("helplessness as holy ground, praying from the floor", "abandoned, grounded, humble, still praying", "gospel organ warmth, steady low rhythm, grounded vocal, communal hum", "PT", "steady", "gospel"), durationSeconds: 270, audioUrl: null },
  { number: 4, title: "Bones Know", description: "The body prays in a language the mind forgot", lang: "EN", energy: "pulse", flavor: "organic", prompt: spiritualPrompt("the body remembering prayer the mind forgot, bones as memory", "embodied, pulsing, ancient, cellular memory", "driving heartbeat bass, body percussion, rhythmic vocal, pulse building", "EN", "pulse", "organic"), durationSeconds: 240, audioUrl: null },
  { number: 5, title: "A Ultima Prece", description: "Nao pedir nada — so ficar", lang: "PT", energy: "raw", flavor: "organic", prompt: spiritualPrompt("the last prayer is not asking, just staying, just being present", "surrendered, final, peaceful desperation, presence", "raw vocal fading, minimal piano, long silences, breath as instrument", "PT", "raw", "organic"), durationSeconds: 300, audioUrl: null },
]);

// ─────────────────────────────────────────────
// ALBUM 12: CENTELHA (the divine spark inside)
// ─────────────────────────────────────────────

const ESP_CENTELHA: AlbumDef = spiritualAlbum("espiritual-centelha", "Centelha", "O instante em que algo se acende por dentro", ESPIRITUAL_COLORS[12], [
  { number: 1, title: "Faisca", description: "Antes da chama — o instante antes de perceber", lang: "PT", energy: "whisper", flavor: "organic", prompt: spiritualPrompt("the instant before understanding, the spark before flame", "anticipatory, electric, pre-awakening, on the edge", "quiet tension, rising pads, whisper vocal, tiny percussion sparks", "PT", "whisper", "organic"), durationSeconds: 240, audioUrl: null },
  { number: 2, title: "Lit", description: "The moment the match strikes — something changes forever", lang: "EN", energy: "pulse", flavor: "house", prompt: spiritualPrompt("the match striking, the moment of ignition, irreversible change", "ignited, irreversible, electric, awakened", "house kick building, synth sparks, driving energy, vocal catching fire", "EN", "pulse", "house"), durationSeconds: 240, audioUrl: null },
  { number: 3, title: "Incendio Manso", description: "Arder sem pressa — a transformacao lenta", lang: "PT", energy: "steady", flavor: "marrabenta", prompt: spiritualPrompt("burning slowly, gentle fire, transformation without violence", "warm, patient, transforming, slow burn", "marrabenta guitar groove, warm shaker, dancing flame rhythm, grounded joy", "PT", "steady", "marrabenta"), durationSeconds: 270, audioUrl: null },
  { number: 4, title: "Ainda Brilha", description: "A centelha que sobrevive ao escuro", lang: "PT", energy: "anthem", flavor: "organic", prompt: spiritualPrompt("the spark surviving darkness, still glowing after everything", "resilient, luminous, defiant, still alive", "building anthem vocal, rising strings, layered chorus, triumphant warmth", "PT", "anthem", "organic"), durationSeconds: 300, audioUrl: null },
]);

// ─────────────────────────────────────────────
// ALBUM 13: VASTIDAO (the terrifying and beautiful vastness)
// ─────────────────────────────────────────────

const ESP_VASTIDAO: AlbumDef = spiritualAlbum("espiritual-vastidao", "Vastidão", "Sentir-se pequena e ligada a tudo ao mesmo tempo", ESPIRITUAL_COLORS[13], [
  { number: 1, title: "Oceano", description: "Olhar para algo tao grande que as palavras param", lang: "PT", energy: "whisper", flavor: "organic", prompt: spiritualPrompt("facing the ocean, words stopping, smallness as relief", "oceanic, dissolved, overwhelmed, relieved", "vast pads, ocean textures, distant vocal, immense space", "PT", "whisper", "organic"), durationSeconds: 270, audioUrl: null },
  { number: 2, title: "Terrified and Free", description: "The vertigo of vastness — falling into the infinite", lang: "EN", energy: "raw", flavor: "organic", prompt: spiritualPrompt("vertigo of the infinite, terror and freedom at once", "terrified, liberated, falling, dissolving", "raw vocal with reverb, dissonant piano, vast empty production, vertigo textures", "EN", "raw", "organic"), durationSeconds: 240, audioUrl: null },
  { number: 3, title: "Poeira de Estrelas", description: "Es feita do mesmo material que o universo", lang: "PT", energy: "steady", flavor: "organic", prompt: spiritualPrompt("stardust in the body, the universe in the cells, cosmic belonging", "cosmic, humble, connected, ancient", "warm bass, celestial pads, steady groove, starlight textures", "PT", "steady", "organic"), durationSeconds: 240, audioUrl: null },
  { number: 4, title: "Small", description: "Being small is not a problem — it is the answer", lang: "EN", energy: "whisper", flavor: "organic", prompt: spiritualPrompt("smallness as wisdom, being tiny as liberation, not insignificant but free", "tiny, free, wise, surrendered", "minimal piano, breath space, gentle vocal, intimate vastness", "EN", "whisper", "organic"), durationSeconds: 240, audioUrl: null },
  { number: 5, title: "Cabe Tudo", description: "Dentro do peito cabe o universo inteiro", lang: "PT", energy: "anthem", flavor: "gospel", prompt: spiritualPrompt("the chest containing the entire universe, inner vastness", "expansive, full, overflowing, sacred", "gospel choir rising, anthem vocal, organ swells, universe-in-the-chest", "PT", "anthem", "gospel"), durationSeconds: 300, audioUrl: null },
]);

// ─────────────────────────────────────────────
// ALBUM 14: CATEDRAL (the body as sacred architecture)
// ─────────────────────────────────────────────

const ESP_CATEDRAL: AlbumDef = spiritualAlbum("espiritual-catedral", "Catedral", "O corpo como lugar sagrado — a arquitectura de dentro", ESPIRITUAL_COLORS[14], [
  { number: 1, title: "Nave", description: "O centro do corpo — onde o eco vive", lang: "PT", energy: "whisper", flavor: "organic", prompt: spiritualPrompt("the nave of the body, the centre where the echo lives, inner architecture", "cavernous, sacred, resonant, internal", "reverberant vocal, cathedral pads, resonant bass, acoustic space", "PT", "whisper", "organic"), durationSeconds: 240, audioUrl: null },
  { number: 2, title: "Stained Glass", description: "Light coming through the cracks — not broken, illuminated", lang: "EN", energy: "steady", flavor: "organic", prompt: spiritualPrompt("light through cracks, not broken but illuminated, stained glass body", "luminous, fractured, beautiful, light-through-wounds", "warm steady rhythm, light textures, prismatic pads, gentle revelation", "EN", "steady", "organic"), durationSeconds: 240, audioUrl: null },
  { number: 3, title: "Costelas", description: "As costelas como arcos de catedral — protegem o que e sagrado", lang: "PT", energy: "raw", flavor: "organic", prompt: spiritualPrompt("ribs as cathedral arches, protecting the sacred heart, bone as architecture", "protective, structural, tender, architectural", "raw vocal, minimal production, bone-like percussion, hollow resonance", "PT", "raw", "organic"), durationSeconds: 240, audioUrl: null },
  { number: 4, title: "Hymn of Skin", description: "The skin remembers every touch — a living hymn", lang: "EN", energy: "pulse", flavor: "marrabenta", prompt: spiritualPrompt("skin as hymnal, touch as prayer, the body's memory of every hand", "tactile, remembering, alive, sacred surface", "marrabenta guitar pulse, shaker rhythm, skin percussion, dancing hymn", "EN", "pulse", "marrabenta"), durationSeconds: 240, audioUrl: null },
  { number: 5, title: "Altar", description: "O altar e aqui — dentro de ti, nao num edificio", lang: "PT", energy: "anthem", flavor: "organic", prompt: spiritualPrompt("the altar is inside, not in a building, you are the sacred space", "consecrated, powerful, self-sacred, declared", "anthem vocal rising, layered voices, building drums, declaration of inner sanctity", "PT", "anthem", "organic"), durationSeconds: 300, audioUrl: null },
]);

// ─────────────────────────────────────────────
// ALBUM 15: GRAO (being one grain in the infinite)
// ─────────────────────────────────────────────

const ESP_GRAO: AlbumDef = spiritualAlbum("espiritual-grao", "Grão", "Ser um grão no infinito — a humildade como poder", ESPIRITUAL_COLORS[15], [
  { number: 1, title: "Um", description: "Um — so um. E isso basta.", lang: "PT", energy: "raw", flavor: "organic", prompt: spiritualPrompt("being one, just one, and that being enough", "singular, humble, sufficient, essential", "raw solo vocal, silence, one piano note, breath", "PT", "raw", "organic"), durationSeconds: 240, audioUrl: null },
  { number: 2, title: "Sand", description: "A grain of sand that held the whole beach in its stillness", lang: "EN", energy: "whisper", flavor: "organic", prompt: spiritualPrompt("a grain of sand containing the beach, stillness holding everything", "still, contained, infinite-in-small, patient", "soft pads, sand textures, minimal whisper vocal, gentle percussion", "EN", "whisper", "organic"), durationSeconds: 240, audioUrl: null },
  { number: 3, title: "Pertencer", description: "Nao es o centro — es parte. E isso e melhor.", lang: "PT", energy: "steady", flavor: "organic", prompt: spiritualPrompt("not the centre but part of everything, belonging without importance", "belonging, humble, part-of-whole, relieved", "warm bass groove, communal pads, steady rhythm, grounded vocal", "PT", "steady", "organic"), durationSeconds: 270, audioUrl: null },
  { number: 4, title: "Enough", description: "The radical act of being enough without being everything", lang: "EN", energy: "anthem", flavor: "gospel", prompt: spiritualPrompt("being enough without being everything, sufficiency as revolution", "sufficient, radical, peaceful, declared", "gospel choir building, anthem declaration, organ swells, communal enough", "EN", "anthem", "gospel"), durationSeconds: 300, audioUrl: null },
]);

// ─────────────────────────────────────────────
// ALBUM 16: MESMA AGUA (we are all the same water)
// ─────────────────────────────────────────────

const ESP_MESMA_AGUA: AlbumDef = spiritualAlbum("espiritual-mesma-agua", "Mesma Água", "Somos todas a mesma água — ligadas pelo que corre em nós", ESPIRITUAL_COLORS[16], [
  { number: 1, title: "Uma Só", description: "A gota que percebe que é rio", lang: "PT", energy: "whisper", prompt: spiritualPrompt("a single drop realizing it is the river, shared humanity", "tender, dissolving, belonging, water-one", "soft flowing piano, water textures, whisper vocal, dissolving pads", "PT", "whisper"), durationSeconds: 240, audioUrl: null },
  { number: 2, title: "Same River", description: "O rio que corre em ti corre em todas", lang: "EN", energy: "steady", prompt: spiritualPrompt("the river that runs through you runs through everyone, shared current", "connected, flowing, communal, same-water", "steady flowing rhythm, connected vocal, river bass, communal warmth", "EN", "steady"), durationSeconds: 240, audioUrl: null },
  { number: 3, title: "Sal", description: "Lágrimas e mar — o mesmo sal", lang: "PT", energy: "raw", prompt: spiritualPrompt("tears and ocean share the same salt, grief connects", "raw, salty, oceanic grief, shared tears", "raw vocal, ocean textures, salt-thick production, grief and connection", "PT", "raw"), durationSeconds: 250, audioUrl: null },
  { number: 4, title: "Tributary", description: "Cada vida é um afluente — nenhuma corre sozinha", lang: "EN", energy: "pulse", flavor: "marrabenta", prompt: spiritualPrompt("every life a tributary, none flows alone, rivers converging", "joyful, converging, rhythmic, dancing rivers meeting", "marrabenta guitar, flowing rhythm, joyful converging vocal, river dance", "EN", "pulse", "marrabenta"), durationSeconds: 240, audioUrl: null },
  { number: 5, title: "Desaguar", description: "Onde todas as águas se encontram — o fim que é início", lang: "PT", energy: "anthem", prompt: spiritualPrompt("where all waters meet, estuary, the end that is beginning", "vast, arriving, communal, oceanic gathering", "building anthem, ocean swell, arriving vocal, communal strings, vast", "PT", "anthem"), durationSeconds: 300, audioUrl: null },
]);

// ─────────────────────────────────────────────
// ALBUM 17: ALEM DO NOME (the divine beyond naming)
// ─────────────────────────────────────────────

const ESP_ALEM_NOME: AlbumDef = spiritualAlbum("espiritual-alem-nome", "Além do Nome", "O que não cabe em Deus, universo, energia — o que fica quando os nomes acabam", ESPIRITUAL_COLORS[17], [
  { number: 1, title: "Sem Nome", description: "O que sentes quando os nomes todos falham", lang: "PT", energy: "whisper", prompt: spiritualPrompt("what you feel when every name fails, the nameless sacred", "awed, speechless, nameless, beyond language", "vast quiet pads, speechless vocal, nameless space, beyond-words production", "PT", "whisper"), durationSeconds: 260, audioUrl: null },
  { number: 2, title: "Not God", description: "Não Deus, não universo, não energia — o que resta", lang: "EN", energy: "raw", prompt: spiritualPrompt("not God, not universe, not energy, what remains when all names fail", "stripping, honest, raw negation, arriving at nameless", "stripped raw vocal, negation textures, honest minimal piano, silence", "EN", "raw"), durationSeconds: 240, audioUrl: null },
  { number: 3, title: "O Buraco no Meio", description: "O vazio que nenhum nome tapa — e que não precisa de ser tapado", lang: "PT", energy: "steady", prompt: spiritualPrompt("the hole in the centre no name covers, sacred void, not needing to be filled", "hollow, sacred, accepting, void-as-home", "hollow resonant bass, accepting vocal, void textures, steady grounded rhythm", "PT", "steady"), durationSeconds: 250, audioUrl: null },
  { number: 4, title: "Hum", description: "O som antes da palavra — o hum que tudo contém", lang: "PT", energy: "anthem", flavor: "gospel", prompt: spiritualPrompt("the sound before the word, the hum that contains everything, primordial vibration", "primordial, vibrating, everything-and-nothing, transcendent hum", "gospel choir humming, organ drone, primordial vibration, building to transcendence", "PT", "anthem", "gospel"), durationSeconds: 300, audioUrl: null },
]);

// ─────────────────────────────────────────────
// ALBUM 18: RESPIRAR (breath as the most basic sacred act)
// ─────────────────────────────────────────────

const ESP_RESPIRAR: AlbumDef = spiritualAlbum("espiritual-respirar", "Respirar", "O milagre mecânico — o ar que entra sem pedires", ESPIRITUAL_COLORS[18], [
  { number: 1, title: "Inspira", description: "O ar que entra — receber o mundo", lang: "PT", energy: "whisper", prompt: spiritualPrompt("inhale, receiving the world, air entering the body", "receiving, expanding, gentle, air-as-gift", "breath-synced pads, expanding vocal, inhale textures, gentle piano", "PT", "whisper"), durationSeconds: 240, audioUrl: null },
  { number: 2, title: "Hold", description: "O momento em que seguras — o espaço entre", lang: "EN", energy: "raw", prompt: spiritualPrompt("holding breath, the space between inhale and exhale, suspended", "suspended, held, tense-tender, between", "suspended silence, held vocal, tension textures, between-breaths production", "EN", "raw"), durationSeconds: 230, audioUrl: null },
  { number: 3, title: "Expira", description: "Largar o ar — largar o que já não serves", lang: "PT", energy: "steady", prompt: spiritualPrompt("exhale, releasing what no longer serves, letting go through breath", "releasing, lightening, exhale-as-surrender, letting-go", "exhale textures, releasing vocal, lightening pads, steady falling rhythm", "PT", "steady"), durationSeconds: 240, audioUrl: null },
  { number: 4, title: "Breathless", description: "Quando o ar falta — o corpo que grita para viver", lang: "EN", energy: "pulse", prompt: spiritualPrompt("breathless, when air is missing, the body screaming to live", "urgent, gasping, desperate, alive-through-lack", "urgent driving rhythm, gasping vocal, desperate textures, life-force pulse", "EN", "pulse"), durationSeconds: 240, audioUrl: null },
  { number: 5, title: "Respiro", description: "A respiração que não controlas — o corpo que sabe", lang: "PT", energy: "steady", flavor: "house", prompt: spiritualPrompt("the breath you don't control, the body that knows, automatic sacred", "trusting, automatic, body-knowing, rhythmic breath", "four-on-the-floor breath rhythm, house warmth, trusting vocal, body-knowing groove", "PT", "steady", "house"), durationSeconds: 270, audioUrl: null },
]);

// ─────────────────────────────────────────────
// ALBUM 19: CINZA E SEMENTE (death and rebirth — compost spirituality)
// ─────────────────────────────────────────────

const ESP_CINZA_SEMENTE: AlbumDef = spiritualAlbum("espiritual-cinza-semente", "Cinza e Semente", "O que cresce do que acabou — espiritualidade do composto", ESPIRITUAL_COLORS[19], [
  { number: 1, title: "Queimou", description: "O que ardeu — sem romantizar a perda", lang: "PT", energy: "raw", prompt: spiritualPrompt("what burned down, not romanticizing loss, ash reality", "devastated, honest, ash-covered, raw loss", "raw devastated vocal, ash textures, honest stripped production, burnt", "PT", "raw"), durationSeconds: 250, audioUrl: null },
  { number: 2, title: "Compost", description: "A beleza podre — o que apodrece alimenta", lang: "EN", energy: "steady", prompt: spiritualPrompt("rotting beauty, what decomposes feeds, compost as teacher", "decomposing, nourishing, ugly-beautiful, fertile rot", "earthy bass, decomposing textures, steady organic rhythm, fertile vocal", "EN", "steady"), durationSeconds: 240, audioUrl: null },
  { number: 3, title: "Debaixo", description: "O que cresce no escuro — a semente que não vês", lang: "PT", energy: "whisper", prompt: spiritualPrompt("what grows in the dark, the seed you cannot see, underground faith", "underground, patient, invisible growth, dark faith", "subterranean bass, patient piano, underground vocal, dark growing textures", "PT", "whisper"), durationSeconds: 260, audioUrl: null },
  { number: 4, title: "First Green", description: "O primeiro verde — tão frágil que quase não é", lang: "EN", energy: "anthem", prompt: spiritualPrompt("first green shoot, so fragile it almost isn't, new life from ash", "fragile, emerging, tender-strong, first-life", "building from silence, emerging vocal, tender strings growing, anthem of fragility", "EN", "anthem"), durationSeconds: 280, audioUrl: null },
]);

// ─────────────────────────────────────────────
// ALBUM 20: CHAMA ULTIMA (the eternal flame — what remains)
// ─────────────────────────────────────────────

const ESP_CHAMA_ULTIMA: AlbumDef = spiritualAlbum("espiritual-chama-ultima", "Chama Última", "O que resta quando tudo o resto é tirado", ESPIRITUAL_COLORS[20], [
  { number: 1, title: "Tira Tudo", description: "Tira o nome, o papel, a roupa, a história — o que fica?", lang: "PT", energy: "raw", prompt: spiritualPrompt("strip everything away, name role clothes history, what remains", "stripped, exposed, essential, nothing-left", "raw stripped vocal, removal textures, bare production, essential silence", "PT", "raw"), durationSeconds: 240, audioUrl: null },
  { number: 2, title: "Ember", description: "A brasa que não apaga — pequena mas viva", lang: "EN", energy: "whisper", prompt: spiritualPrompt("the ember that won't die, small but alive, irreducible flame", "glowing, persistent, small-but-alive, ember-warmth", "warm glowing pads, persistent vocal, ember textures, small fire piano", "EN", "whisper"), durationSeconds: 250, audioUrl: null },
  { number: 3, title: "Osso", description: "O osso debaixo da carne — o que és antes de tudo", lang: "PT", energy: "steady", flavor: "marrabenta", prompt: spiritualPrompt("bone beneath flesh, what you are before everything, irreducible self", "essential, bone-deep, irreducible, primal structure", "marrabenta bone rhythm, essential groove, deep vocal, primal structure bass", "PT", "steady", "marrabenta"), durationSeconds: 240, audioUrl: null },
  { number: 4, title: "Still Burning", description: "Depois de tudo — ainda ardes", lang: "EN", energy: "pulse", prompt: spiritualPrompt("after everything, still burning, inextinguishable, refusal to die", "defiant, burning, inextinguishable, fierce-alive", "driving fire rhythm, burning vocal, inextinguishable energy, fierce pulse", "EN", "pulse"), durationSeconds: 240, audioUrl: null },
  { number: 5, title: "Chama", description: "A chama que és — não metáfora, presença", lang: "PT", energy: "anthem", flavor: "gospel", prompt: spiritualPrompt("you are the flame, not metaphor but presence, eternal fire-self", "blazing, present, eternal, flame-as-self", "gospel choir fire, organ blaze, anthem vocal, eternal flame building, transcendent", "PT", "anthem", "gospel"), durationSeconds: 300, audioUrl: null },
]);

// ─────────────────────────────────────────────
// EXPORT
// ─────────────────────────────────────────────

// Apply lyrics from separate files to all album tracks
function applyLyrics(albumDef: AlbumDef): Album {
  return {
    ...albumDef,
    tracks: albumDef.tracks.map((t) => ({
      ...t,
      energy: t.energy || "whisper",
      flavor: t.flavor || "organic",
      lyrics: t.lyrics || getLyrics(albumDef.slug, t.number),
      audioUrl: t.audioUrl ?? null,
    })),
  } as Album;
}

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
  CURSO_PELE_NUA,
  CURSO_LIMITE_SAGRADO,
  CURSO_FLORES_ESCURO,
  CURSO_PESO_CHAO,
  CURSO_VOZ_DENTRO,
  CURSO_FIO_INVISIVEL,
  CURSO_ESPELHO_OUTRO,
  CURSO_SILENCIO_GRITA,
  CURSO_TEIA,
  CURSO_CHAMA,
  CURSO_MULHER_MAE,
  CURSO_OFICIO_SER,
  CURSO_RELOGIO,
  CURSO_COROA,
  CURSO_FOME,
  // Espirituais
  ESP_ORACAO,
  ESP_SAGRADO_SELVAGEM,
  ESP_RITUAL,
  ESP_GRACA,
  ESP_SILENCIO,
  ESP_ENTREGA,
  ESP_MAOS_ABERTAS,
  ESP_RAIZ_CEU,
  ESP_AGUA_VIVA,
  ESP_AMEM,
  ESP_PRECE,
  ESP_CENTELHA,
  ESP_VASTIDAO,
  ESP_CATEDRAL,
  ESP_GRAO,
  ESP_MESMA_AGUA,
  ESP_ALEM_NOME,
  ESP_RESPIRAR,
  ESP_CINZA_SEMENTE,
  ESP_CHAMA_ULTIMA,
].map(applyLyrics);

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

// Labels e cores para a energia de cada faixa (usados na UI)
export const ENERGY_LABELS: Record<TrackEnergy, { label: string; emoji: string; color: string }> = {
  whisper: { label: "Sussurro", emoji: "~", color: "bg-blue-50 text-blue-600" },
  steady: { label: "Constante", emoji: "—", color: "bg-green-50 text-green-600" },
  pulse: { label: "Pulso", emoji: "+", color: "bg-orange-50 text-orange-600" },
  anthem: { label: "Hino", emoji: "!", color: "bg-red-50 text-red-600" },
  raw: { label: "Cru", emoji: "*", color: "bg-purple-50 text-purple-600" },
};

// Labels e cores para o sabor musical (genero) de cada faixa
export const FLAVOR_LABELS: Record<TrackFlavor, { label: string; emoji: string; color: string }> = {
  organic: { label: "Orgânico", emoji: "o", color: "bg-emerald-50 text-emerald-600" },
  marrabenta: { label: "Marrabenta", emoji: "m", color: "bg-amber-50 text-amber-700" },
  house: { label: "House", emoji: "h", color: "bg-pink-50 text-pink-600" },
  gospel: { label: "Gospel", emoji: "g", color: "bg-yellow-50 text-yellow-700" },
};
