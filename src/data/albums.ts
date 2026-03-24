/**
 * Álbuns de Música — Sete Véus
 *
 * Estilo: Contemporâneo orgânico-electrónico (AwakeSoul / Loranne / Vozes da Nova Terra)
 * — Produção: electrónica orgânica, pads, synths quentes, piano, cordas, percussão suave
 * — Voz: feminina, com letra, poética, íntima
 * — Língua: PT e EN (indicado por faixa)
 * — Universal: sem caixa étnica, instrumentação varia conforme o tema
 * — Tom: íntimo, transformativo, poético, contemplativo
 *
 * 67 albums:
 * - 7 Espelhos (1 por veu)
 * - 7 Nós (1 por véu)
 * - 1 Livro filosófico
 * - 20 Cursos (1 por curso)
 * - 10 Espirituais (espiritualidade universal, sem religião)
 * - 22 Vida (a vida inteira — do acordar ao adormecer)
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
// energy defaults to "whisper" if omitted — retrocompatível com todas as faixas existentes
// flavor defaults to "organic" if omitted
type TrackDef = Omit<AlbumTrack, "lyrics" | "energy" | "flavor"> & { lyrics?: string; energy?: TrackEnergy; flavor?: TrackFlavor };
type AlbumDef = Omit<Album, "tracks"> & { tracks: TrackDef[] };

// Lyrics are stored in separate files to keep this file manageable
import { ESPELHO_LYRICS } from "./lyrics-espelhos";
import { NO_LYRICS } from "./lyrics-nos";
import { LIVRO_LYRICS, CURSO_LYRICS } from "./lyrics-livro-cursos";
import { ESPIRITUAL_LYRICS } from "./lyrics-espirituais";
import { VIDA_LYRICS } from "./lyrics-vida";

const ALL_LYRICS: Record<string, string> = {
  ...ESPELHO_LYRICS,
  ...NO_LYRICS,
  ...LIVRO_LYRICS,
  ...CURSO_LYRICS,
  ...ESPIRITUAL_LYRICS,
  ...VIDA_LYRICS,
};

function getLyrics(albumSlug: string, trackNumber: number): string {
  return ALL_LYRICS[`${albumSlug}/${trackNumber}`] || "";
}

export type Album = {
  slug: string;
  title: string;
  subtitle: string;
  product: "espelho" | "no" | "livro" | "curso" | "espiritual" | "vida";
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
// whisper: íntimo, contemplativo (o que já existia)
// steady: médio, grounded, walking pace
// pulse: energético, rítmico, para correr/carro
// anthem: declarativo, forte, hino de afirmação
// raw: cru, emocional, sem filtro
export type TrackEnergy = "whisper" | "steady" | "pulse" | "anthem" | "raw";

// Sabor musical — género específico (segunda dimensão além da energia)
// organic: o som base Loranne (default)
// marrabenta: marrabenta moçambicana, estilo Neyma — ritmo específico, não "africano" genérico
// house: house/dance, four-on-the-floor, como "Nada Me Faltará"
// gospel: gospel/espiritual, coral, como um hino de igreja
export type TrackFlavor = "organic" | "marrabenta" | "house" | "gospel";

const ENERGY_STYLES: Record<TrackEnergy, string> = {
  whisper: "Contemporary organic-electronic, AwakeSoul. Warm female vocals with poetic lyrics. Soft synth pads, piano, subtle percussion, strings. Intimate, contemplative, transformative. No autotune. Clean vocal production.",
  steady: "Contemporary organic-electronic. Warm female vocals with poetic lyrics. Mid-tempo groove, grounded rhythm, acoustic guitar, warm bass, light percussion, piano accents. Walking pace, present, embodied. No autotune. Clean vocal production.",
  pulse: "Contemporary pop-electronic, empowering. Strong female vocals with conviction. Driving beat, rhythmic synths, bass-forward, claps, energy builds. Upbeat, momentum, forward motion. Great for running or driving. No autotune. Clean vocal production.",
  anthem: "Contemporary empowerment anthem. Powerful female vocals, declarative, full-chested. Big chorus, layered vocals, driving drums, rising strings, synth stabs. Bold, celebratory, unstoppable. Stadium energy meets intimacy. No autotune. Clean vocal production.",
  raw: "Stripped-back emotional. Raw female vocals, close-mic, imperfect beauty. Minimal production — solo piano or guitar, breath sounds, silence as instrument. Vulnerable, unpolished, real. No autotune. Clean vocal production.",
};

// Modificadores de sabor — só aplicados quando o sabor não é "organic"
const FLAVOR_MODIFIERS: Record<TrackFlavor, string> = {
  organic: "",
  marrabenta: "Marrabenta moçambicana, estilo Neyma. Guitar-driven groove, shaker percussion, warm bass rhythm, danceable Mozambican feel, joyful and grounded.",
  house: "House music influence, four-on-the-floor kick, deep bass, hi-hat groove, synth stabs, club warmth, dance-floor energy, infectious rhythmic drive.",
  gospel: "Gospel-inspired, choir harmonies, hand claps, organ warmth, uplifting spiritual energy, community singing feel, call-and-response vocals, celebratory, transcendent.",
};

function buildPromptWithFlavor(basePrompt: string, flavor: TrackFlavor): string {
  const mod = FLAVOR_MODIFIERS[flavor];
  return mod ? `${basePrompt} ${mod}` : basePrompt;
}

// Retrocompatibilidade: BASE_STYLE = whisper (o default anterior)
// Nota: prompts Suno são em inglês — acentuação PT só nos títulos/descrições visíveis
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
    { number: 2, title: "The Coat I Never Chose", description: "A vida construída por outros", lang: "EN", energy: "steady", prompt: espelhoPrompt("inherited life, wearing someone else's choices", "melancholic, gentle tension, realization", "piano arpeggios, warm synth bass, subtle strings, walking rhythm", "EN", "steady"), durationSeconds: 240, audioUrl: null },
    { number: 3, title: "Automatismos", description: "Os gestos que se repetem sem pensar", lang: "PT", energy: "pulse", flavor: "house", prompt: espelhoPrompt("autopilot, repetition, mechanical living", "hypnotic, circular, building urgency", "looping piano motif, electronic pulse, driving beat, vocal layers building", "PT", "pulse", "house"), durationSeconds: 240, audioUrl: null },
    { number: 4, title: "A Pergunta do Café", description: "Quando foi que eu escolhi isto?", lang: "PT", energy: "raw", prompt: espelhoPrompt("small question over morning coffee that changes everything", "curious, tender, dawning realization", "acoustic guitar, intimate vocal close-mic, minimal, breath sounds", "PT", "raw"), durationSeconds: 240, audioUrl: null },
    { number: 5, title: "The Body Knows", description: "O corpo já sabia antes da mente", lang: "EN", energy: "steady", flavor: "marrabenta", prompt: espelhoPrompt("body wisdom, somatic truth, the body knew first", "grounding, warm, pulsing with life", "heartbeat rhythm, warm bass, organic percussion, breath sounds woven in", "EN", "steady", "marrabenta"), durationSeconds: 240, audioUrl: null },
    { number: 6, title: "Honestidade Quieta", description: "Ver sem dramatizar", lang: "PT", energy: "whisper", prompt: espelhoPrompt("quiet honesty, seeing without drama, soft truth", "peaceful, still, accepting", "solo piano, distant choir pad, water-like textures, spacious", "PT", "whisper"), durationSeconds: 240, audioUrl: null },
    { number: 7, title: "O Véu Cai", description: "O primeiro reconhecimento", lang: "PT", energy: "anthem", flavor: "gospel", prompt: espelhoPrompt("the veil falls, first sight of truth, liberation", "liberating, powerful, cathartic, declarative", "full arrangement, rising strings, driving drums, vocal crescendo, triumphant release", "PT", "anthem", "gospel"), durationSeconds: 300, audioUrl: null },
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
    { number: 3, title: "Paralisia Bonita", description: "A indecisão que parece prudência", lang: "PT", energy: "raw", prompt: espelhoPrompt("beautiful paralysis, indecision disguised as wisdom", "frozen, aching beauty, painfully honest", "solo piano, single notes dropping into silence, wind textures", "PT", "raw"), durationSeconds: 240, audioUrl: null },
    { number: 4, title: "O Estômago Sabe", description: "Quando o corpo fala primeiro", lang: "PT", energy: "pulse", flavor: "marrabenta", prompt: espelhoPrompt("gut feeling, body alarm, visceral knowledge", "visceral, urgent, body-driven", "low bass pulse, driving organic percussion, rising intensity, body-felt", "PT", "pulse", "marrabenta"), durationSeconds: 240, audioUrl: null },
    { number: 5, title: "Messenger", description: "O medo como guia, não inimigo", lang: "EN", energy: "steady", prompt: espelhoPrompt("fear as messenger not enemy, reframing fear", "compassionate, understanding, spacious, wise", "warm melody over pad, gentle choir texture, earth-like grounding", "EN", "steady"), durationSeconds: 240, audioUrl: null },
    { number: 6, title: "Ouço-te Mas Vou", description: "Coragem quotidiana", lang: "PT", energy: "anthem", flavor: "house", prompt: espelhoPrompt("I hear you but I'm going, daily courage, moving forward", "brave, determined, empowering, declarative", "full rhythm, driving drums, rising vocal melody, powerful chorus, strength", "PT", "anthem", "house"), durationSeconds: 240, audioUrl: null },
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
    { number: 2, title: "Disguised Virtue", description: "Quando dar é obrigação invisível", lang: "EN", energy: "steady", prompt: espelhoPrompt("giving as invisible obligation, false virtue, duty as love", "burdened, building awareness", "slow strings, walking rhythm, weighted bass, sighing pad textures", "EN", "steady"), durationSeconds: 240, audioUrl: null },
    { number: 3, title: "Alívio ou Alegria", description: "A diferença entre querer e dever", lang: "PT", energy: "pulse", prompt: espelhoPrompt("relief vs joy, duty vs desire, learning the difference", "contrasting, energetic questioning", "two melodic lines competing, driving piano, rhythmic vocal, building momentum", "PT", "pulse"), durationSeconds: 240, audioUrl: null },
    { number: 4, title: "Herança", description: "A culpa que não é tua", lang: "PT", energy: "whisper", prompt: espelhoPrompt("inherited guilt, ancestral weight, not yours to carry", "ancient, heavy then slowly releasing", "deep pad, ancestral-feeling vocal, gradual lightening of texture", "PT", "whisper"), durationSeconds: 240, audioUrl: null },
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
    { number: 1, title: "Máscaras", description: "Os papéis que vestem a pele", lang: "PT", energy: "steady", prompt: espelhoPrompt("masks, roles, personas, wearing different skins", "layered, complex, shifting textures", "morphing synth textures, multiple vocal layers, walking rhythm", "PT", "steady"), durationSeconds: 240, audioUrl: null },
    { number: 2, title: "Who Are You", description: "Quando ninguém te está a ver", lang: "EN", energy: "raw", prompt: espelhoPrompt("who are you when nobody is watching, unmasked and raw", "vulnerable, bare, honest, intimate", "solo vocal with minimal piano, silence, breath, raw", "EN", "raw"), durationSeconds: 240, audioUrl: null },
    { number: 3, title: "Armadura", description: "A certeza que parece força", lang: "PT", energy: "pulse", flavor: "house", prompt: espelhoPrompt("armor, certainty that looks like strength, false protection", "rigid, building energy, breaking through", "crystalline synth, driving percussion, tension building to release", "PT", "pulse", "house"), durationSeconds: 240, audioUrl: null },
    { number: 4, title: "Espelho Interior", description: "Olhar sem julgar", lang: "PT", energy: "whisper", prompt: espelhoPrompt("inner mirror, looking without judging, self-seeing", "reflective, still water, contemplative", "water-like textures, reflective piano, gentle harmonics", "PT", "whisper"), durationSeconds: 240, audioUrl: null },
    { number: 5, title: "Nameless", description: "O que sobra quando tiras tudo", lang: "EN", energy: "raw", prompt: espelhoPrompt("what remains when you strip everything away, nameless essence", "minimal, essential, spacious, pure being", "single sustained note, silence, breath, then gentle emergence", "EN", "raw"), durationSeconds: 240, audioUrl: null },
    { number: 6, title: "Escolher a Máscara", description: "Usar sem colar à pele", lang: "PT", energy: "pulse", prompt: espelhoPrompt("choosing the mask consciously, wearing without fusing", "playful, energetic, free, joyful", "rhythmic piano, dancing melody, driving beat, lightness and joy", "PT", "pulse"), durationSeconds: 240, audioUrl: null },
    { number: 7, title: "Eu Sem Justificação", description: "Existir sem provar nada", lang: "PT", energy: "anthem", flavor: "gospel", prompt: espelhoPrompt("existing without justification, being without proving", "sovereign, powerful, complete, declarative", "full arrangement, layered vocals, driving drums, grounding bass, triumphant", "PT", "anthem", "gospel"), durationSeconds: 300, audioUrl: null },
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
    { number: 3, title: "Três da Manhã", description: "A insónia de repassar tudo", lang: "PT", energy: "raw", prompt: espelhoPrompt("3am insomnia, replaying everything, mental loops", "restless, circular, dark, painfully honest", "night textures, solo piano, repetitive motif, uneasy silence", "PT", "raw"), durationSeconds: 240, audioUrl: null },
    { number: 4, title: "Ilusão de Segurança", description: "Se eu controlo, nada de mau acontece", lang: "PT", energy: "whisper", prompt: espelhoPrompt("illusion of safety, if I control nothing bad happens", "fragile certainty, glass-like, about to crack", "crystalline sounds, building tension, moment before breaking", "PT", "whisper"), durationSeconds: 240, audioUrl: null },
    { number: 5, title: "Trust", description: "Aceitar que não controlamos o resultado", lang: "EN", energy: "steady", prompt: espelhoPrompt("trust, accepting we don't control the outcome, surrender", "opening, releasing, flowing like water", "flowing piano melody, loosening rhythm, water textures", "EN", "steady"), durationSeconds: 240, audioUrl: null },
    { number: 6, title: "Largar", description: "O mundo continua quando não fazes", lang: "PT", energy: "anthem", prompt: espelhoPrompt("letting go, the world continues when you stop doing", "relief, triumphant, lightness, liberation", "full arrangement, bright textures, driving chorus, free vocal melody", "PT", "anthem"), durationSeconds: 240, audioUrl: null },
    { number: 7, title: "Respirar", description: "Na respiração, há liberdade", lang: "PT", energy: "whisper", prompt: espelhoPrompt("breathing, in breath there is freedom", "free, expansive, peaceful, infinite", "breath-synced rhythm, open harmonics, vast warm soundscape", "PT", "whisper"), durationSeconds: 300, audioUrl: null },
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
    { number: 5, title: "Empty", description: "Parar de fingir que está cheia", lang: "EN", energy: "raw", prompt: espelhoPrompt("stop pretending you're full, honest emptying", "releasing, honest, raw, courageous vulnerability", "descending melody, stripping layers, raw vocal", "EN", "raw"), durationSeconds: 240, audioUrl: null },
    { number: 6, title: "Desejo Verdadeiro", description: "O que a tua vida está a pedir", lang: "PT", energy: "anthem", prompt: espelhoPrompt("true desire, what your life is asking of you", "warm, powerful, knowing, declarative", "rich warm synth, driving drums, layered vocals, empowering build", "PT", "anthem"), durationSeconds: 240, audioUrl: null },
    { number: 7, title: "Espaço", description: "O vazio não é ausência — é espaço", lang: "PT", energy: "whisper", prompt: espelhoPrompt("space, emptiness is not absence, it is room", "open, vast, potential, full of possibility", "vast soundscape, open harmonics, voice floating in space, possibility", "PT", "whisper"), durationSeconds: 300, audioUrl: null },
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
    { number: 3, title: "A Pergunta Evitada", description: "Se eu fosse so eu, quem seria?", lang: "PT", energy: "steady", prompt: espelhoPrompt("the avoided question: who would I be if I were just me?", "brave, building, honest, gathering courage", "single voice rising, tentative piano, walking rhythm, courage building", "PT", "steady"), durationSeconds: 240, audioUrl: null },
    { number: 4, title: "Separar", description: "Criar espaço, não destruir", lang: "PT", energy: "pulse", flavor: "house", prompt: espelhoPrompt("separating to create space, not to destroy", "bittersweet, determined, forward momentum", "driving rhythm, melody splitting into two lines, both beautiful, energy", "PT", "pulse", "house"), durationSeconds: 240, audioUrl: null },
    { number: 5, title: "What Remains", description: "Só sai o que já não servia", lang: "EN", energy: "whisper", prompt: espelhoPrompt("what remains after letting go, only what no longer served leaves", "clear, pure, distilled, essential", "minimal clear tones, essential beauty, purified sound", "EN", "whisper"), durationSeconds: 240, audioUrl: null },
    { number: 6, title: "Regresso", description: "O regresso a ti mesma", lang: "PT", energy: "steady", prompt: espelhoPrompt("homecoming, the return to yourself", "warm, arriving, recognition, coming home", "returning melody, warmth rising, walking rhythm, recognition in the voice", "PT", "steady"), durationSeconds: 240, audioUrl: null },
    { number: 7, title: "Sete Véus", description: "Sete camadas, sete regressos", lang: "PT", energy: "anthem", flavor: "gospel", prompt: espelhoPrompt("seven veils, seven layers, seven returns, completion", "complete, whole, celebratory, triumphant, full circle", "full arrangement, driving drums, layered vocals, all themes woven, triumphant crescendo", "PT", "anthem", "gospel"), durationSeconds: 300, audioUrl: null },
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
  { number: 1, title: "A Mãe que Viu", description: "Helena sempre soube", lang: "PT", energy: "whisper", prompt: noPrompt("mother who always saw, patient knowing", "patient, aching, maternal, waiting love", "warm cello-like synth, maternal vocal texture, gentle humming layer", "PT", "whisper"), durationSeconds: 240 },
  { number: 2, title: "Years of Waiting", description: "Esperar que a filha veja", lang: "EN", energy: "steady", prompt: noPrompt("years of waiting for your daughter to see, patient love", "slow, patient, enduring, building", "sustained pad, patient piano, walking rhythm, time passing", "EN", "steady"), durationSeconds: 240 },
  { number: 3, title: "Duas Mulheres", description: "Mãe e filha, frente a frente", lang: "PT", energy: "raw", flavor: "marrabenta", prompt: noPrompt("two women face to face, mother and daughter, raw meeting", "raw, vulnerable, brave, painfully honest", "two vocal textures meeting, tentative harmony, stripped production", "PT", "raw", "marrabenta"), durationSeconds: 240 },
  { number: 4, title: "O Que Nunca Foi Dito", description: "Palavras guardadas uma vida", lang: "PT", energy: "pulse", flavor: "house", prompt: noPrompt("words kept a lifetime, what was never said, breaking silence", "heavy, breaking open, cathartic, urgent", "silence breaking into driving melody, words as rhythm, emotional momentum", "PT", "pulse", "house"), durationSeconds: 240 },
  { number: 5, title: "Desatar", description: "O nó que se solta", lang: "PT", energy: "anthem", flavor: "gospel", prompt: noPrompt("untying the knot, the bond that loosens, freedom together", "freeing, triumphant, relieved, declarative", "full arrangement, driving rhythm, layered vocals, triumphant release", "PT", "anthem", "gospel"), durationSeconds: 300 },
]);

const NO_SILENCIO = noAlbum(2, "no-silencio", "O Nó do Silêncio", "O que o medo calou entre eles", [
  { number: 1, title: "O Que Não Disse", description: "Rui e Ana e o silêncio entre eles", lang: "PT", energy: "raw", prompt: noPrompt("what was never said between lovers, loaded silence", "tense, painfully honest, aching", "solo voice, two melodic lines in silence, tension in gaps", "PT", "raw"), durationSeconds: 240 },
  { number: 2, title: "Protect or Hide", description: "Quando proteger é esconder", lang: "EN", energy: "steady", prompt: noPrompt("protecting as hiding, love expressed as silence", "conflicted, protective, walking pace", "guarded vocal melody, mid-tempo rhythm, emotional walls", "EN", "steady"), durationSeconds: 240 },
  { number: 3, title: "A Primeira Palavra", description: "Quebrar o silêncio", lang: "PT", energy: "whisper", prompt: noPrompt("the first word that breaks the silence, brave beginning", "brave, trembling, hopeful, cracking open", "first note breaking silence, tentative vocal dialogue emerging", "PT", "whisper"), durationSeconds: 240 },
  { number: 4, title: "Ouvir de Verdade", description: "Quando ouvir é mais que escutar", lang: "PT", energy: "pulse", prompt: noPrompt("truly hearing, listening deeper than words", "open, energetic, present, understanding building", "call and response vocal, driving rhythm, deepening harmony", "PT", "pulse"), durationSeconds: 240 },
  { number: 5, title: "Voice", description: "Encontrar a voz que calaste", lang: "EN", energy: "anthem", flavor: "gospel", prompt: noPrompt("finding the voice you silenced, speaking truth at last", "empowered, declarative, liberated, triumphant", "two voices in powerful harmony, driving drums, liberation", "EN", "anthem", "gospel"), durationSeconds: 300 },
]);

const NO_SACRIFICIO = noAlbum(3, "no-sacrificio", "O Nó do Sacrifício", "A culpa disfarçada de entrega", [
  { number: 1, title: "Dar Até Esvaziar", description: "Filipe e Luísa e a entrega sem retorno", lang: "PT", energy: "steady", prompt: noPrompt("giving until empty, sacrifice without return", "depleted, noble, exhausted", "diminishing melody, walking rhythm, notes being given away", "PT", "steady"), durationSeconds: 240 },
  { number: 2, title: "Love or Debt", description: "Quando amar parece pagar", lang: "EN", energy: "pulse", prompt: noPrompt("love as debt, paying off guilt through giving", "transactional, driving, urgent realization", "counting rhythmic pattern, driving beat, weighted bass", "EN", "pulse"), durationSeconds: 240 },
  { number: 3, title: "Receber", description: "Aprender a receber sem culpa", lang: "PT", energy: "whisper", prompt: noPrompt("learning to receive without guilt, accepting grace", "opening, softening, grateful, permission", "warmth flowing in, receiving melody, gratitude in voice", "PT", "whisper"), durationSeconds: 240 },
  { number: 4, title: "Dois Inteiros", description: "Dois que dão por escolha", lang: "PT", energy: "pulse", prompt: noPrompt("two whole people giving by choice, not obligation", "balanced, joyful, energetic, equal", "balanced duet, driving mutual rhythm, wholeness in harmony", "PT", "pulse"), durationSeconds: 240 },
  { number: 5, title: "True Giving", description: "Dar sem se perder", lang: "EN", energy: "anthem", prompt: noPrompt("true giving without losing yourself, generous freedom", "generous, powerful, loving, declarative", "generous flowing melody, layered vocals, triumphant chorus", "EN", "anthem"), durationSeconds: 300 },
]);

const NO_VERGONHA = noAlbum(4, "no-vergonha", "O Nó da Vergonha", "A máscara que caiu entre dois estranhos", [
  { number: 1, title: "Dois Estranhos", description: "Vítor e Mariana e o encontro sem máscara", lang: "PT", energy: "steady", prompt: noPrompt("two strangers meeting unmasked, raw encounter", "raw, exposed, curious, electric", "two unfamiliar melodic textures meeting, walking rhythm, curiosity", "PT", "steady"), durationSeconds: 240 },
  { number: 2, title: "Seen", description: "A vergonha de ser reconhecido", lang: "EN", energy: "raw", prompt: noPrompt("being truly seen, the shame of being recognized", "vulnerable, exposed, trembling, naked beauty", "exposed solo vocal, stripped production, trembling beauty", "EN", "raw"), durationSeconds: 240 },
  { number: 3, title: "Sem Papéis", description: "Quando os papéis caem entre dois", lang: "PT", energy: "pulse", prompt: noPrompt("roles falling away between two people, authenticity emerging", "liberating, energetic, brave, momentum", "driving rhythm, layers dropping away, simplifying to truth", "PT", "pulse"), durationSeconds: 240 },
  { number: 4, title: "Reconhecimento", description: "Eu vejo-te. E tu a mim.", lang: "PT", energy: "whisper", prompt: noPrompt("I see you and you see me, mutual recognition", "connecting, warm, deep, intimate", "two melodies finding harmony, recognition, warmth building", "PT", "whisper"), durationSeconds: 240 },
  { number: 5, title: "Unapologetic", description: "Existir sem pedir desculpa", lang: "EN", energy: "anthem", prompt: noPrompt("existing without apology, unapologetic being", "free, proud, powerful, sovereign", "proud melody, driving drums, layered vocal strength, triumphant", "EN", "anthem"), durationSeconds: 300 },
]);

const NO_SOLIDAO = noAlbum(5, "no-solidao", "O Nó da Solidão", "O controlo que isolou quem mais amava", [
  { number: 1, title: "Ilha", description: "Isabel e Pedro e o isolamento do controlo", lang: "PT", energy: "raw", prompt: noPrompt("island, isolation through control, surrounded but alone", "isolated, painfully honest, lonely", "solo vocal surrounded by empty space, island of sound", "PT", "raw"), durationSeconds: 240 },
  { number: 2, title: "Holding Too Tight", description: "Quando cuidar e aprisionar", lang: "EN", energy: "pulse", flavor: "house", prompt: noPrompt("holding too tight, when caring becomes a cage", "gripping, urgent, suffocating energy", "tight driving rhythm around a trapped melody, tension", "EN", "pulse", "house"), durationSeconds: 240 },
  { number: 3, title: "Soltar", description: "Abrir as mãos", lang: "PT", energy: "whisper", prompt: noPrompt("releasing, opening hands, letting go of grip", "releasing, letting flow, exhaling control", "opening rhythm, releasing notes into space, breathing room", "PT", "whisper"), durationSeconds: 240 },
  { number: 4, title: "Lado a Lado", description: "Estar junto sem segurar", lang: "PT", energy: "steady", prompt: noPrompt("side by side, together without holding, respectful closeness", "parallel, peaceful, trusting, walking together", "two parallel melodies, walking rhythm, respectful space, trust", "PT", "steady"), durationSeconds: 240 },
  { number: 5, title: "Bridge", description: "A solidão que se transforma em ponte", lang: "EN", energy: "anthem", prompt: noPrompt("solitude becoming a bridge, loneliness transformed to connection", "connecting, triumphant, hopeful, powerful", "bridge melody connecting voices, driving drums, triumphant hope", "EN", "anthem"), durationSeconds: 300 },
]);

const NO_VAZIO = noAlbum(6, "no-vazio", "O Nó do Vazio", "O desejo que esvaziou a amizade", [
  { number: 1, title: "Amigas", description: "Lena e Sofia e o que o desejo fez entre elas", lang: "PT", energy: "whisper", prompt: noPrompt("friends, what desire did to the friendship", "nostalgic, aching, lost, bittersweet", "nostalgic melody, fading harmony, sense of loss", "PT", "whisper"), durationSeconds: 240 },
  { number: 2, title: "The Hole", description: "O vazio que nenhuma relação preenche", lang: "EN", energy: "raw", prompt: noPrompt("the void no relationship fills, inner emptiness", "empty, echoing, painfully honest", "solo vocal, hollow reverb textures, vast empty sonic space", "EN", "raw"), durationSeconds: 240 },
  { number: 3, title: "Sem Preencher", description: "Estar no vazio sem fugir", lang: "PT", energy: "steady", prompt: noPrompt("sitting with emptiness without fleeing, staying present", "still, present, building courage", "minimal but grounded production, walking rhythm, still vocal", "PT", "steady"), durationSeconds: 240 },
  { number: 4, title: "Reencontro", description: "Reencontrar sem exigir", lang: "PT", energy: "pulse", prompt: noPrompt("reunion without demands, meeting again freely", "reconnecting, energetic, joyful, wiser", "two driving melodies reconnecting, rhythmic joy, maturity", "PT", "pulse"), durationSeconds: 240 },
  { number: 5, title: "True Friendship", description: "O espaco onde o desejo verdadeiro mora", lang: "EN", energy: "anthem", prompt: noPrompt("true friendship, the space where authentic desire lives", "genuine, powerful, complete, celebratory", "warm duet, layered vocals, driving chorus, triumphant peace", "EN", "anthem"), durationSeconds: 300 },
]);

const NO_PERTENCA = noAlbum(7, "no-pertenca", "O Nó da Pertença", "A separação que reinventou o lar", [
  { number: 1, title: "O Lar que Sufocava", description: "Helena T. e Miguel C. e o lar que já não cabia", lang: "PT", energy: "pulse", flavor: "house", prompt: noPrompt("the home that suffocated, outgrown space", "claustrophobic, driving urgency, needing air", "compressed production, driving beat, heavy textures, need for space", "PT", "pulse", "house"), durationSeconds: 240 },
  { number: 2, title: "Leaving", description: "A coragem de sair para encontrar", lang: "EN", energy: "raw", prompt: noPrompt("courage to leave in order to find, necessary departure", "brave, painfully honest, bittersweet", "solo departure melody, brave vocal, stripped production", "EN", "raw"), durationSeconds: 240 },
  { number: 3, title: "Sozinho", description: "O vazio fértil da solidão", lang: "PT", energy: "whisper", prompt: noPrompt("fertile solitude, alone but growing, discovering self", "solitary, growing, spacious, self-discovery", "solo vocal growing and expanding, discovering new range", "PT", "whisper"), durationSeconds: 240 },
  { number: 4, title: "Reinventar", description: "Construir de novo, diferente", lang: "PT", energy: "steady", prompt: noPrompt("rebuilding different this time, reinvention", "creative, hopeful, new, building", "new melodic construction, walking rhythm, hope in newness", "PT", "steady"), durationSeconds: 240 },
  { number: 5, title: "Belonging", description: "Pertencer começa por dentro", lang: "EN", energy: "anthem", prompt: noPrompt("belonging starts within, self-belonging is home", "whole, powerful, complete, triumphant peace", "coming home melody, layered vocals, driving drums, triumphant resolution", "EN", "anthem"), durationSeconds: 300 },
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
    { number: 1, title: "O Convite", description: "O início da travessia interior", lang: "PT", prompt: `${BASE_STYLE} Lyrics in Portuguese. Opening, solemn yet warm, philosophical invitation. Piano, soft strings, spacious reverb. Beginning of a deep journey inward. A cartography of consciousness.`, durationSeconds: 300, audioUrl: null },
    { number: 2, title: "Permanence", description: "Encobre a impermanência da vida, fazendo-nos acreditar num eu fixo e imutável", lang: "EN", prompt: `${BASE_STYLE} Lyrics in English. Theme: permanence as illusion, the fixed self dissolving. Ethereal pads, soft vocal questioning what we cling to. Gentle dissolution of certainty. Tender, not dramatic.`, durationSeconds: 240, audioUrl: null },
    { number: 3, title: "Memória", description: "Encobre a liberdade do presente, mantendo-nos presos às histórias do passado", lang: "PT", prompt: `${BASE_STYLE} Lyrics in Portuguese. Theme: memory as prison, stories of the past holding us captive. Nostalgic melody slowly loosening, freeing from old narratives. Piano with reverb-heavy textures, time stretching.`, durationSeconds: 240, audioUrl: null },
    { number: 4, title: "Whirlwind", description: "Encobre o silêncio do ser, confundindo-nos com pensamentos e emoções que se agitam sem cessar", lang: "EN", prompt: `${BASE_STYLE} Lyrics in English. Theme: the whirlwind of thoughts and emotions hiding inner silence. Agitated textures gradually stilling. Building electronic layers that strip back to reveal quiet. Contemplative resolution.`, durationSeconds: 240, audioUrl: null },
    { number: 5, title: "Esforço", description: "Encobre o repouso interior, fazendo-nos acreditar que a plenitude depende da busca incessante", lang: "PT", energy: "pulse", prompt: `${ENERGY_STYLES.pulse} Lyrics in Portuguese. Theme: effort as veil, the belief that fullness requires endless striving. Busy, driven rhythm slowly releasing into rest. The beauty of stopping.`, durationSeconds: 240, audioUrl: null },
    { number: 6, title: "Desolation", description: "Encobre a fertilidade do vazio, fazendo-o parecer abandono e ameaça", lang: "EN", prompt: `${BASE_STYLE} Lyrics in English. Theme: desolation hiding fertile emptiness, void that appears as threat but holds possibility. Deep, spacious, transforming emptiness into openness. Minimal then blooming.`, durationSeconds: 240, audioUrl: null },
    { number: 7, title: "Horizonte", description: "Encobre a infinitude da consciência, sugerindo um destino final, uma chegada definitiva", lang: "PT", prompt: `${BASE_STYLE} Lyrics in Portuguese. Theme: the horizon as illusion of a final destination, when consciousness is infinite. Expansive, dissolving edges, no arrival only deepening. Vast warm soundscape, vocal reaching beyond.`, durationSeconds: 240, audioUrl: null },
    { number: 8, title: "Duality", description: "Encobre a unidade do real, mantendo a ilusão de que estamos separados", lang: "EN", prompt: `${BASE_STYLE} Lyrics in English. Theme: duality veiling unity, the illusion that we are separate. Two melodic lines merging into one. Separation dissolving. Resolution into oneness. Warm, complete.`, durationSeconds: 240, audioUrl: null },
    { number: 9, title: "O Espelho", description: "O olhar final — tudo o que atravessaste já lá estava", lang: "PT", energy: "anthem", prompt: `${ENERGY_STYLES.anthem} Lyrics in Portuguese. Closing. All seven themes woven together. Full arrangement, vocal crescendo. The mirror reflects wholeness that was always there. Peaceful, triumphant, complete resolution.`, durationSeconds: 300, audioUrl: null },
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
  { number: 1, title: "Espelhos Dourados", description: "O território onde o dinheiro mora", lang: "PT", prompt: cursoPrompt("golden mirrors, the territory where money lives", "amber, reflective, honest confrontation", "golden piano tones, mirror-like reverb, warm amber pads", "PT"), durationSeconds: 240 },
  { number: 2, title: "The Statement", description: "Olhar para os números sem desviar", lang: "EN", prompt: cursoPrompt("looking at the numbers without flinching, honest accounting", "confronting, grounding, brave, unflinching", "grounding bass, honest vocal melody, precise rhythm", "EN"), durationSeconds: 240 },
  { number: 3, title: "Herança Financeira", description: "O dinheiro da tua família", lang: "PT", energy: "steady", flavor: "marrabenta", prompt: cursoPrompt("family money story, inherited beliefs about wealth", "ancestral, complex, untangling patterns", "deep pad, ancestral vocal texture, untangling melodic lines", "PT", "steady", "marrabenta"), durationSeconds: 240 },
  { number: 4, title: "Abundance", description: "Receber sem culpa", lang: "EN", prompt: cursoPrompt("deserving abundance, receiving without guilt", "opening, generous, golden, permission", "opening warm melody, flowing golden textures, abundance feeling", "EN"), durationSeconds: 240 },
  { number: 5, title: "Novo Espelho", description: "O reflexo que escolhes", lang: "PT", energy: "anthem", prompt: cursoPrompt("new mirror, the reflection you choose", "clear, chosen, golden peace, resolution", "clear golden tones, chosen vocal melody, peaceful resolution", "PT", "anthem"), durationSeconds: 300 },
]);

const CURSO_SANGUE_SEDA = cursoAlbum("curso-sangue-seda", "sangue-e-seda", "Sangue e Seda", "A tua mãe, a tua história", "Árvore das Raízes Visíveis", [
  { number: 1, title: "Raízes", description: "O que veio antes de ti", lang: "PT", energy: "steady", flavor: "marrabenta", prompt: cursoPrompt("roots, what came before you, ancestral ground", "deep red, ancient, grounding", "deep bass, rich strings, root-like grounding sounds", "PT", "steady", "marrabenta"), durationSeconds: 240 },
  { number: 2, title: "The Inner Mother", description: "A mãe que carregas dentro", lang: "EN", prompt: cursoPrompt("the inner mother, the one you carry within", "maternal, complex, tender, layered", "maternal vocal humming, complex layered harmony, tenderness", "EN"), durationSeconds: 240 },
  { number: 3, title: "Sangue", description: "O que herdaste no sangue", lang: "PT", energy: "pulse", flavor: "marrabenta", prompt: cursoPrompt("blood inheritance, what runs deep in your veins", "visceral, pulsing, deep connection", "heartbeat rhythm, deep organic percussion, blood-pulse bass", "PT", "pulse", "marrabenta"), durationSeconds: 240 },
  { number: 4, title: "Silk", description: "A suavidade que repara", lang: "EN", prompt: cursoPrompt("silk, the softness that heals, tenderness as medicine", "gentle, silk-like, healing, soft touch", "silky strings, gentle flowing melody, healing vocal texture", "EN"), durationSeconds: 240 },
  { number: 5, title: "Amanhecer", description: "A árvore com raízes reorganizadas", lang: "PT", energy: "anthem", prompt: cursoPrompt("dawn, reorganized roots, new growth from old ground", "dawn, growing, reorganized, fresh start", "dawn-like rising melody, new growth textures, reorganized beauty", "PT", "anthem"), durationSeconds: 300 },
]);

const CURSO_ARTE_INTEIREZA = cursoAlbum("curso-arte-inteireza", "a-arte-da-inteireza", "A Arte da Inteireza", "Amar sem te perderes", "Ponte entre Duas Margens", [
  { number: 1, title: "Desaparecer", description: "O momento em que te perdes no outro", lang: "PT", prompt: cursoPrompt("disappearing in the other, losing yourself in love", "dissolving, losing shape, merging", "dissolving melody, water-like textures, losing form beautifully", "PT"), durationSeconds: 240 },
  { number: 2, title: "Two Shores", description: "Tu e o outro, separados mas ligados", lang: "EN", prompt: cursoPrompt("two shores, connected yet separate, space between", "bridging, respectful space, seeing across", "two melodic lines across sonic space, bridge slowly forming", "EN"), durationSeconds: 240 },
  { number: 3, title: "Inteira", description: "Estar completa antes de estar com alguém", lang: "PT", prompt: cursoPrompt("whole before together, complete in yourself first", "whole, complete, self-possessed, sovereign", "complete self-contained melody, beautiful alone, full vocal", "PT"), durationSeconds: 240 },
  { number: 4, title: "The Bridge", description: "Encontrar sem se perder", lang: "EN", energy: "anthem", prompt: cursoPrompt("the bridge, meeting without losing yourself", "connected, balanced, harmonious, mature love", "balanced duet over bridge of sound, meeting in wholeness", "EN", "anthem"), durationSeconds: 300 },
]);

const CURSO_DEPOIS_FOGO = cursoAlbum("curso-depois-fogo", "depois-do-fogo", "Depois do Fogo", "Recomeçar após a destruição", "Campo Queimado", [
  { number: 1, title: "Cinzas", description: "O que sobrou depois do fogo", lang: "PT", prompt: cursoPrompt("ashes, what remains after fire, aftermath", "charcoal grey, devastated, still, quiet devastation", "ash-like textures, silence after destruction, still production", "PT"), durationSeconds: 240 },
  { number: 2, title: "Ember", description: "O que ainda arde por dentro", lang: "EN", prompt: cursoPrompt("ember still burning inside, inner fire surviving", "glowing, alive beneath ashes, stubborn warmth", "glowing warm synth, ember-like pulsing, inner fire texture", "EN"), durationSeconds: 240 },
  { number: 3, title: "Broto", description: "A primeira vida nova", lang: "PT", prompt: cursoPrompt("first sprout, new life after devastation, fragile hope", "green, fragile, hopeful, tender emergence", "tender new melody, fragile beautiful vocal, green growth sounds", "PT"), durationSeconds: 240 },
  { number: 4, title: "Different", description: "O novo não é o antigo — é outra coisa", lang: "EN", energy: "pulse", prompt: cursoPrompt("the new is not the old, it is something else entirely", "transformed, different, evolved, acceptance of change", "transformed melody, new form, evolved beauty, resolution", "EN", "pulse"), durationSeconds: 300 },
]);

const CURSO_OLHOS_ABERTOS = cursoAlbum("curso-olhos-abertos", "olhos-abertos", "Olhos Abertos", "Decidir com clareza", "Encruzilhada Infinita", [
  { number: 1, title: "Nevoeiro", description: "Quando não se vê o caminho", lang: "PT", prompt: cursoPrompt("fog, when you can't see the path ahead", "foggy, confused, searching, disoriented", "foggy reverb textures, searching melody, unclear direction", "PT"), durationSeconds: 240 },
  { number: 2, title: "Crossroads", description: "Muitos caminhos, nenhuma certeza", lang: "EN", prompt: cursoPrompt("crossroads, many paths, no certainty, standing still", "multiplicity, indecision, paralysis of choice", "multiple melodic fragments competing, indecision in rhythm", "EN"), durationSeconds: 240 },
  { number: 3, title: "Clareza", description: "O nevoeiro que começa a levantar", lang: "PT", prompt: cursoPrompt("clarity, fog beginning to lift, seeing through", "clearing, emerging vision, light coming through", "clearing textures, emerging vocal melody, light building", "PT"), durationSeconds: 240 },
  { number: 4, title: "First Step", description: "A silhueta dá o primeiro passo", lang: "EN", energy: "pulse", prompt: cursoPrompt("the first step, choosing a direction, walking forward", "decisive, brave, clear, momentum", "decisive rhythm beginning, first clear step, direction found", "EN", "pulse"), durationSeconds: 300 },
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
  { number: 4, title: "Sacred", description: "O limite como ato de amor", lang: "EN", energy: "anthem", prompt: cursoPrompt("sacred boundary, limit as an act of love", "sacred, loving, complete, holy protection", "sacred vocal melody, loving boundary in production, golden peace", "EN", "anthem"), durationSeconds: 300 },
]);

const CURSO_FLORES_ESCURO = cursoAlbum("curso-flores-escuro", "flores-no-escuro", "Flores no Escuro", "Atravessar o luto", "Jardim Subterrâneo", [
  { number: 1, title: "Caverna", description: "O escuro total do luto", lang: "PT", prompt: cursoPrompt("cave, total darkness of grief, underground", "deep, dark, underground, grief's depth", "deep underground textures, darkness in production, cave-like reverb", "PT"), durationSeconds: 240 },
  { number: 2, title: "Glow", description: "A luz que nasce do escuro", lang: "EN", prompt: cursoPrompt("bioluminescence, light born from darkness itself", "magical, emerging, glowing from within", "glowing synth textures, emerging light, magical organic growth", "EN"), durationSeconds: 240 },
  { number: 3, title: "Flores", description: "A beleza que cresce no luto", lang: "PT", prompt: cursoPrompt("flowers growing in grief, beauty from darkness", "delicate, beautiful, resilient, life despite", "delicate melody, beautiful despite darkness, resilient vocal", "PT"), durationSeconds: 240 },
  { number: 4, title: "Garden", description: "O jardim subterrâneo iluminado", lang: "EN", prompt: cursoPrompt("underground garden illuminated, grief transformed to beauty", "luminous, transformed, alive, grief become garden", "full luminous production, alive with light, transformed grief into beauty", "EN"), durationSeconds: 300 },
]);

const CURSO_PESO_CHAO = cursoAlbum("curso-peso-chao", "o-peso-e-o-chao", "O Peso e o Chão", "Largar o que carregas", "Caminho de Pedras", [
  { number: 1, title: "Pedras", description: "O peso que carregas", lang: "PT", prompt: cursoPrompt("stones, the weight you carry, burden on shoulders", "heavy, burdened, carrying, weighed down", "heavy deep bass, weighted melody, carrying burden in rhythm", "PT"), durationSeconds: 240 },
  { number: 2, title: "Bent", description: "O corpo sob o peso", lang: "EN", prompt: cursoPrompt("bent under weight, body burdened, compressed by carrying", "bent, compressed, aching, physical weight", "compressed production, bent vocal melody, aching body awareness", "EN"), durationSeconds: 240 },
  { number: 3, title: "Pousar", description: "Largar as pedras no chão", lang: "PT", prompt: cursoPrompt("laying stones down, releasing weight, permission to put it down", "releasing, lighter, exhaling, relief", "stones dropping away in production, lightening melody, exhale vocal", "PT"), durationSeconds: 240 },
  { number: 4, title: "Standing", description: "Erguida, leve, as pedras no chão", lang: "EN", energy: "anthem", prompt: cursoPrompt("standing tall, light, stones on the ground, unburdened", "light, upright, free, weightless joy", "light free melody, standing tall vocal, liberated movement in rhythm", "EN", "anthem"), durationSeconds: 300 },
]);

const CURSO_VOZ_DENTRO = cursoAlbum("curso-voz-dentro", "voz-de-dentro", "Voz de Dentro", "Encontrar a tua voz", "Sala do Eco", [
  { number: 1, title: "Silêncio", description: "A sala vazia antes da voz", lang: "PT", prompt: cursoPrompt("silence, the empty room before the voice comes", "silent, waiting, dark violet, anticipation", "silence, waiting sonic space, violet darkness, anticipation", "PT"), durationSeconds: 240 },
  { number: 2, title: "Echo", description: "O primeiro som que volta", lang: "EN", prompt: cursoPrompt("first echo, the sound that comes back, hearing yourself", "resonant, discovering, golden echo, wonder", "echo textures, resonant return of voice, discovering self-sound", "EN"), durationSeconds: 240 },
  { number: 3, title: "Voz", description: "A voz que sempre esteve lá", lang: "PT", prompt: cursoPrompt("the voice that was always there, finding it at last", "clear, strong, authentic, recognition", "clear vocal emerging strong, authentic melody, self-recognition", "PT"), durationSeconds: 240 },
  { number: 4, title: "Sing", description: "A voz que canta por fim", lang: "EN", energy: "anthem", prompt: cursoPrompt("singing at last, voice freed, the full expression", "singing, free, joyful, complete, triumphant", "full voice singing free, joyful vocal resolution, complete expression", "EN", "anthem"), durationSeconds: 300 },
]);

const CURSO_FIO_INVISIVEL = cursoAlbum("curso-fio-invisivel", "o-fio-invisivel", "O Fio Invisível", "A ligação entre todos nós", "Lago dos Reflexos Partilhados", [
  { number: 1, title: "Superfície Opaca", description: "O lago antes de se ver", lang: "PT", prompt: cursoPrompt("opaque lake surface, isolation, no reflection visible", "isolated, still, silver-dark, yearning for connection", "still silver pads, isolated vocal, dark reflective surface", "PT"), durationSeconds: 240 },
  { number: 2, title: "Golden Thread", description: "O primeiro fio que liga", lang: "EN", prompt: cursoPrompt("golden thread connecting, first invisible bond becoming visible", "connecting, delicate, golden discovery", "delicate golden thread melody, connecting textures, emerging bond", "EN"), durationSeconds: 240 },
  { number: 3, title: "Reflexos", description: "As gerações na água", lang: "PT", prompt: cursoPrompt("reflections of generations in water, ancestral connections visible", "ancestral, deep, generational, transparent", "deep ancestral pads, generational vocal layers, transparent water textures", "PT"), durationSeconds: 240 },
  { number: 4, title: "Unity", description: "Reflexos que se fundem num só", lang: "EN", prompt: cursoPrompt("individual reflections merging into one, collective unity", "unified, radiant, collective, whole", "unified harmonies, radiant golden production, collective wholeness", "EN"), durationSeconds: 300 },
]);

const CURSO_ESPELHO_OUTRO = cursoAlbum("curso-espelho-outro", "o-espelho-do-outro", "O Espelho do Outro", "O que o outro revela de ti", "Galeria dos Reflexos Vivos", [
  { number: 1, title: "Galeria Escura", description: "Espelhos que mostram outros", lang: "PT", prompt: cursoPrompt("dark gallery with living mirrors showing others, looking outward never inward", "confused, projecting, emerald-dark, searching", "emerald dark textures, confused seeking melody, outward-looking vocal", "PT"), durationSeconds: 240 },
  { number: 2, title: "Mirror Self", description: "Quando o reflexo é teu", lang: "EN", prompt: cursoPrompt("mirror showing your own reflection mixed with others, partial recognition", "recognizing, integrating, emerald-gold", "recognizing melody, integrating vocal layers, emerald-gold warmth", "EN"), durationSeconds: 240 },
  { number: 3, title: "Integração", description: "O outro como contexto, não identidade", lang: "PT", prompt: cursoPrompt("others as context not identity, seeing clearly through the other", "clear, integrated, peaceful, self-recognized", "clear emerald melody, integrated vocal, peaceful self-recognition", "PT"), durationSeconds: 240 },
  { number: 4, title: "Clear Glass", description: "Ver-se com clareza total", lang: "EN", prompt: cursoPrompt("clear glass, seeing yourself fully, others as background", "clear, whole, emerald peace, complete vision", "clear pristine melody, whole vocal, emerald peace in production", "EN"), durationSeconds: 300 },
]);

const CURSO_SILENCIO_GRITA = cursoAlbum("curso-silencio-grita", "o-silencio-que-grita", "O Silêncio que Grita", "O que nunca foi dito", "Caverna dos Ecos Mudos", [
  { number: 1, title: "Caverna Muda", description: "O silêncio total da família", lang: "PT", prompt: cursoPrompt("silent cavern, unspoken words as shadows on walls, family silence", "heavy, silent, grey-blue, ghostly", "heavy silent pads, ghostly white textures, oppressive stillness", "PT"), durationSeconds: 240 },
  { number: 2, title: "First Word", description: "A primeira palavra que sai", lang: "EN", prompt: cursoPrompt("first word spoken, breaking family silence, echoes emerging", "breaking, brave, fearful yet determined", "breaking silence textures, brave emerging vocal, first echo sound", "EN"), durationSeconds: 240 },
  { number: 3, title: "Ecos Dourados", description: "O silêncio transforma-se em voz", lang: "PT", prompt: cursoPrompt("golden echoes filling cavern, silence transformed into resonance", "liberated, resonant, golden-white, powerful", "resonant golden echoes, liberated vocal, powerful cavern acoustics", "PT"), durationSeconds: 240 },
  { number: 4, title: "Resonance", description: "As paredes vibram com a verdade", lang: "EN", prompt: cursoPrompt("walls vibrating with truth, freed words as light, liberation", "vibrant, free, illuminated, truth spoken", "vibrant resonant production, free vocal melody, illuminated truth", "EN"), durationSeconds: 300 },
]);

const CURSO_TEIA = cursoAlbum("curso-teia", "a-teia", "A Teia", "Pertencer sem desaparecer", "Bosque dos Fios Entrelaçados", [
  { number: 1, title: "Fios Presos", description: "A teia que sufoca", lang: "PT", prompt: cursoPrompt("tangled threads trapping, suffocating web of belonging", "trapped, suffocating, dark moss-green, tangled", "tangled dark textures, suffocating rhythm, trapped vocal melody", "PT"), durationSeconds: 240 },
  { number: 2, title: "Cut Free", description: "Cortar sem destruir", lang: "EN", prompt: cursoPrompt("cutting threads without destroying the web, selective freedom", "liberating, careful, green-golden light", "careful cutting textures, liberating vocal, green-golden emerging light", "EN"), durationSeconds: 240 },
  { number: 3, title: "Teia Bonita", description: "A rede que sustenta", lang: "PT", prompt: cursoPrompt("beautiful balanced web connecting without trapping, sustaining network", "balanced, connected, luminous green, belonging", "balanced woven melody, connected vocal harmonies, luminous moss-green", "PT"), durationSeconds: 240 },
  { number: 4, title: "Belong", description: "Pertencer sendo inteira", lang: "EN", prompt: cursoPrompt("belonging without disappearing, whole within the web", "whole, belonging, golden-green, complete", "whole belonging melody, golden-green production, complete connected vocal", "EN"), durationSeconds: 300 },
]);

const CURSO_CHAMA = cursoAlbum("curso-chama", "a-chama", "A Chama", "A raiva como força", "Vulcão Adormecido", [
  { number: 1, title: "Selado", description: "O vulcão que ninguém vê", lang: "PT", prompt: cursoPrompt("sealed dormant volcano, invisible pressure underneath, suppressed rage", "sealed, pressured, dark red, rigid", "sealed pressure bass, rigid rhythm, dark red undercurrent", "PT"), durationSeconds: 240 },
  { number: 2, title: "Crack", description: "A primeira fissura", lang: "EN", prompt: cursoPrompt("cracks revealing lava underneath, first anger acknowledged", "cracking, hot, red-orange, awakening", "cracking textures, hot rising synth, red-orange awakening vocal", "EN"), durationSeconds: 240 },
  { number: 3, title: "Fogo Controlado", description: "A raiva como aliada", lang: "PT", energy: "pulse", flavor: "house", prompt: cursoPrompt("controlled fire as ally, rage channeled not destroyed", "fierce, controlled, powerful, warm light", "fierce controlled rhythm, powerful channeled vocal, warm fierce light", "PT", "pulse", "house"), durationSeconds: 240 },
  { number: 4, title: "Blaze", description: "O vulcão que ilumina", lang: "EN", energy: "anthem", prompt: cursoPrompt("active beautiful volcano illuminating landscape, power embraced", "blazing, beautiful, powerful, red-gold", "blazing powerful production, beautiful fierce vocal, red-gold triumph", "EN", "anthem"), durationSeconds: 300 },
]);

const CURSO_MULHER_MAE = cursoAlbum("curso-mulher-mae", "a-mulher-antes-de-mae", "A Mulher Antes de Mãe", "Quem eras antes do ninho", "Ninho que Pesa", [
  { number: 1, title: "Ninho Pesado", description: "O ninho que engole", lang: "PT", prompt: cursoPrompt("heavy nest consuming the woman, only mother visible, overwhelming ochre", "consumed, heavy, overwhelming, lost identity", "heavy ochre pads, consumed vocal, overwhelming motherhood rhythm", "PT"), durationSeconds: 240 },
  { number: 2, title: "Before", description: "A mulher antes do ninho", lang: "EN", prompt: cursoPrompt("the woman before the nest, remembering who she was", "remembering, yearning, warm ochre, emerging", "remembering melody, yearning vocal, warm ochre emerging identity", "EN"), durationSeconds: 240 },
  { number: 3, title: "Duas Formas", description: "Mãe e mulher ao mesmo tempo", lang: "PT", prompt: cursoPrompt("two forms of the same person, mother and woman coexisting", "coexisting, balanced, warm ochre light, dual", "dual melody layers, coexisting vocal, balanced warm ochre", "PT"), durationSeconds: 240 },
  { number: 4, title: "Whole Nest", description: "O ninho com espaço", lang: "EN", energy: "anthem", prompt: cursoPrompt("beautiful nest with space for the whole woman, mother and self", "whole, balanced, golden ochre, complete", "whole balanced melody, golden ochre production, complete woman vocal", "EN", "anthem"), durationSeconds: 300 },
]);

const CURSO_OFICIO_SER = cursoAlbum("curso-oficio-ser", "o-oficio-de-ser", "O Ofício de Ser", "Trabalho com propósito", "Oficina Infinita", [
  { number: 1, title: "Máquinas", description: "A oficina que não para", lang: "PT", prompt: cursoPrompt("dark workshop with machines running nonstop, exhaustion, no window", "exhausted, mechanical, bronze-dark, trapped", "mechanical rhythm, exhausted vocal, bronze-dark trapped production", "PT"), durationSeconds: 240 },
  { number: 2, title: "Pause", description: "A primeira pausa", lang: "EN", prompt: cursoPrompt("machines stopping, first pause, crack of light, straightening up", "pausing, breathing, bronze warming, relief", "pausing rhythm, breathing vocal, bronze warming first light", "EN"), durationSeconds: 240 },
  { number: 3, title: "Ritmo Próprio", description: "Trabalhar sem prisão", lang: "PT", prompt: cursoPrompt("own rhythm workshop, window half-open, purpose without prison", "rhythmic, purposeful, warm bronze, free", "own rhythm melody, purposeful vocal, warm bronze free production", "PT"), durationSeconds: 240 },
  { number: 4, title: "Craft", description: "O ofício como presença", lang: "EN", prompt: cursoPrompt("workshop with open window, working and pausing, craft as presence", "present, crafted, warm bronze, peaceful", "crafted melody, present vocal, warm bronze peaceful production", "EN"), durationSeconds: 300 },
]);

const CURSO_RELOGIO = cursoAlbum("curso-relogio", "o-relogio-partido", "O Relógio Partido", "Libertar-se do tempo", "Jardim das Estações", [
  { number: 1, title: "Relógio Gigante", description: "Presa no tempo", lang: "PT", prompt: cursoPrompt("giant clock dominating garden, everything accelerated, anguish", "anxious, accelerated, silver-grey, trapped in time", "anxious ticking rhythm, accelerated vocal, silver-grey time pressure", "PT"), durationSeconds: 240 },
  { number: 2, title: "Cracking Time", description: "O tempo a abrandar", lang: "EN", prompt: cursoPrompt("clock cracking, time slowing, some flowers pausing", "slowing, cracking, amber beginning, relief", "slowing rhythm, cracking textures, amber relief emerging", "EN"), durationSeconds: 240 },
  { number: 3, title: "Estações", description: "Todas as estações ao mesmo tempo", lang: "PT", prompt: cursoPrompt("broken clock, all seasons coexisting, spring and autumn side by side", "timeless, coexisting, amber-silver, present", "timeless flowing melody, coexisting seasonal textures, amber-silver peace", "PT"), durationSeconds: 240 },
  { number: 4, title: "Present", description: "Sem relógio, com presença", lang: "EN", prompt: cursoPrompt("no clock, garden in harmony, seated silhouette present, timeless beauty", "present, harmonious, amber peace, timeless", "present harmonious melody, timeless vocal, amber peaceful production", "EN"), durationSeconds: 300 },
]);

const CURSO_COROA = cursoAlbum("curso-coroa", "a-coroa-escondida", "A Coroa Escondida", "O poder que é teu", "Trono Coberto", [
  { number: 1, title: "Trono Coberto", description: "O poder escondido", lang: "PT", prompt: cursoPrompt("covered throne in dark room, silhouette small and turned away, hidden power", "hidden, small, purple-dark, unaware", "hidden dark pads, small diminished vocal, purple-dark concealment", "PT"), durationSeconds: 240 },
  { number: 2, title: "Unveiled", description: "O trono revelado", lang: "EN", prompt: cursoPrompt("cloths slipping off throne, gold and purple revealed, fear and curiosity", "revealing, curious, gold-purple, awakening", "revealing golden textures, curious vocal, gold-purple awakening", "EN"), durationSeconds: 240 },
  { number: 3, title: "Hesitação", description: "Tocar no poder", lang: "PT", prompt: cursoPrompt("standing next to uncovered throne, hesitation, reaching toward power", "hesitant, reaching, golden-purple, brave", "hesitant reaching melody, brave vocal, golden-purple building power", "PT"), durationSeconds: 240 },
  { number: 4, title: "Crown", description: "Sentada no trono, sem permissão", lang: "EN", energy: "anthem", prompt: cursoPrompt("seated on throne, crown on head, without permission, total presence and power", "powerful, crowned, golden-purple, sovereign", "powerful sovereign melody, crowned triumphant vocal, golden-purple majesty", "EN", "anthem"), durationSeconds: 300 },
]);

const CURSO_FOME = cursoAlbum("curso-fome", "a-fome", "A Fome", "O corpo e a fome", "Mesa Vazia", [
  { number: 1, title: "Mesa Vazia", description: "A fome que não é de comida", lang: "PT", prompt: cursoPrompt("enormous empty table, famished silhouette, empty plate, craving and lack", "famished, empty, rosewood-dark, craving", "empty hollow textures, famished vocal, rosewood-dark craving", "PT"), durationSeconds: 240 },
  { number: 2, title: "Hunger", description: "Fome sem nome", lang: "EN", prompt: cursoPrompt("unnamed hunger, conflict between hunger and guilt, hesitant", "conflicted, hesitant, weak rosewood, unnamed desire", "conflicted rhythm, hesitant vocal, weak rosewood guilt textures", "EN"), durationSeconds: 240 },
  { number: 3, title: "Comer em Paz", description: "Sem culpa, com atenção", lang: "PT", prompt: cursoPrompt("eating with attention, no guilt, warm presence, body nourished", "present, guiltless, warm rosy, nourished", "present warm melody, guiltless vocal, rosy nourished production", "PT"), durationSeconds: 240 },
  { number: 4, title: "Feast", description: "Em paz com o prato e com o corpo", lang: "EN", energy: "steady", prompt: cursoPrompt("at peace with the plate, inhabited body, presence, terracotta and porcelain", "peaceful, inhabited, terracotta warmth, complete", "peaceful inhabited melody, complete warm vocal, terracotta porcelain beauty", "EN", "steady"), durationSeconds: 300 },
]);

// ─────────────────────────────────────────────
// ESPIRITUAIS (10 albums)
// Espiritualidade universal — sem religião,
// centelha divina, oração, expansão, amor
// ─────────────────────────────────────────────

function espiritualPrompt(theme: string, emotion: string, production: string, lang: "PT" | "EN", energy: TrackEnergy = "whisper", flavor: TrackFlavor = "organic"): string {
  const langNote = lang === "PT" ? "Lyrics in Portuguese." : "Lyrics in English.";
  return buildPromptWithFlavor(`${ENERGY_STYLES[energy]} ${langNote} Soul music — not worship, not religion. The raw sacred that lives in every human chest. Spiritual without denomination, intimate with the infinite. ${emotion}. ${production}. Theme: ${theme}.`, flavor);
}

function espiritualAlbum(
  slug: string,
  title: string,
  subtitle: string,
  color: string,
  tracks: Omit<TrackDef, "audioUrl" | "lyrics">[]
): AlbumDef {
  return {
    slug,
    title,
    subtitle,
    product: "espiritual",
    color,
    tracks: tracks.map((t) => ({ ...t, audioUrl: null })),
  };
}

const ESPIRITUAL_PRECE = espiritualAlbum("espiritual-prece", "Prece sem Nome", "A oração que não pertence a nenhuma religião", "#D4A853", [
  { number: 1, title: "Antes da Palavra", description: "O silêncio antes da prece", lang: "PT", prompt: espiritualPrompt("silence before prayer, the space before words reach the divine, the held breath before speaking to something vast", "sacred stillness, reverent, the body preparing to ask", "deep silence with breath, single sustained note, vast reverb, sacred space, silence as presence not absence", "PT"), durationSeconds: 240 },
  { number: 2, title: "Unnamed Prayer", description: "A prece que não tem dono", lang: "EN", prompt: espiritualPrompt("prayer without religion, universal plea, the human animal speaking to the infinite with no script", "humble, vast, intimate, surrendering, a child talking to the sky", "solo voice in cathedral space, minimal piano, vastness, echo as the divine responding", "EN"), durationSeconds: 240 },
  { number: 3, title: "Joelhos", description: "Ajoelhar sem templo", lang: "PT", energy: "raw", prompt: espiritualPrompt("kneeling without a temple, prayer as raw human need, the knees that bend because the soul is too heavy to stand", "raw, vulnerable, bare, pleading and peaceful, body-prayer", "raw close-mic vocal, breath as rhythm, piano single notes, silence between phrases longer than the phrases", "PT", "raw"), durationSeconds: 240 },
  { number: 4, title: "The Answer", description: "A resposta que vem em silêncio", lang: "EN", prompt: espiritualPrompt("the answer comes in silence, divine response felt not heard, the moment you stop asking and feel held", "receiving, peaceful, grateful, cradled by something nameless", "gentle pads opening like arms, warmth arriving, vocal softening into gratitude, no percussion — only breath and held notes", "EN"), durationSeconds: 240 },
  { number: 5, title: "Amém sem Deus", description: "Um amém que é de todos", lang: "PT", energy: "steady", flavor: "gospel", prompt: espiritualPrompt("amen without denomination, universal blessing, sacred yes — not a shout but a warm exhale of the collective", "warm, communal, gentle power, a room full of people breathing together", "gospel warmth without stadium energy, organ warmth, hummed voices gathering, communal amen as shared breath not triumph", "PT", "steady", "gospel"), durationSeconds: 300 },
]);

const ESPIRITUAL_CENTELHA = espiritualAlbum("espiritual-centelha", "A Centelha", "A fagulha divina que vive em cada ser", "#F5C842", [
  { number: 1, title: "Fagulha", description: "O primeiro instante de consciência", lang: "PT", prompt: espiritualPrompt("first spark of consciousness, the divine ember that wakes before the mind does, a candle lit in the dark of the body", "awakening, tiny, miraculous, first light, something ancient stirring", "single bright note expanding, tiny spark growing, cosmic birth sound, warmth arriving from inside not outside", "PT"), durationSeconds: 240 },
  { number: 2, title: "Divine Fragment", description: "Um pedaço do todo em cada um", lang: "EN", prompt: espiritualPrompt("a fragment of the divine in every being, the ocean in the drop, holographic wholeness in a single cell", "wonder, awe at smallness containing everything, sacred humility", "warm expanding harmony, each note containing the whole chord, fractal beauty, intimate not grand", "EN"), durationSeconds: 240 },
  { number: 3, title: "Reconhecer", description: "Ver a centelha no outro", lang: "PT", energy: "steady", flavor: "marrabenta", prompt: espiritualPrompt("seeing the divine spark in another person, namaste without words, the moment eyes meet and both know", "tender recognition, warmth of seeing, the body softening in someone's presence", "warm rhythmic base, two melodies recognizing each other, Mozambican warmth, gentle percussion like heartbeats syncing", "PT", "steady", "marrabenta"), durationSeconds: 240 },
  { number: 4, title: "Same Fire", description: "O mesmo fogo em todos", lang: "EN", energy: "pulse", prompt: espiritualPrompt("the same fire burns in all of us, universal divinity, not worship but recognition — the same flame in seven billion chests", "alive, pulsing, communal fire, burning together, not triumphant but true", "fire-like pulse, layered vocals building like flames, communal energy that rises from the ground not the sky", "EN", "pulse"), durationSeconds: 300 },
]);

const ESPIRITUAL_VASTIDAO = espiritualAlbum("espiritual-vastidao", "Vastidão", "O universo que vive dentro de ti", "#1A1A4E", [
  { number: 1, title: "Cosmos Interior", description: "O universo cabe no peito", lang: "PT", prompt: espiritualPrompt("inner cosmos, the universe lives inside your chest, you contain galaxies and don't know it", "vast, infinite, intimate enormity, cosmic awe living in a human ribcage", "deep space pads, cosmic reverb, heartbeat as celestial rhythm, intimate not cinematic", "PT"), durationSeconds: 240 },
  { number: 2, title: "Stardust", description: "Somos feitos de estrelas", lang: "EN", energy: "steady", prompt: espiritualPrompt("we are made of stardust, cosmic origin, the iron in your blood was forged in a dying star", "wonder, scientific awe, belonging to the cosmos, body as astronomy", "shimmering high textures, warm bass of gravity, stardust melody, wonder without grandiosity", "EN", "steady"), durationSeconds: 240 },
  { number: 3, title: "Infinito Pequeno", description: "O infinito no grão de areia", lang: "PT", energy: "raw", prompt: espiritualPrompt("infinity in a grain of sand, the enormous in the tiny, Blake's eternity in an hour", "microscopic wonder, sacred detail, the tears that come from looking too closely at anything", "minimal intimate production, vast reverb on small sounds, infinity in a single note, breath as cosmos", "PT", "raw"), durationSeconds: 240 },
  { number: 4, title: "Expansion", description: "Expandir como o universo expande", lang: "EN", energy: "pulse", prompt: espiritualPrompt("expanding like the universe expands, your personal expansion mirrors the cosmic, growing beyond your own skin", "expanding, growing, limitless, joyful vastness, the body opening", "ever-expanding production, layers adding organically, rhythm widening like a heartbeat accelerating with awe", "EN", "pulse"), durationSeconds: 240 },
  { number: 5, title: "Sem Margem", description: "Onde tu acabas o todo começa", lang: "PT", prompt: espiritualPrompt("where you end the whole begins, no edge between self and universe, dissolving into everything", "borderless, dissolved, oceanic, the relief of losing the edge of yourself", "dissolving boundaries in sound, melody becoming harmony becoming silence becoming everything, whispered not declared", "PT"), durationSeconds: 300 },
]);

const ESPIRITUAL_MAOS_ABERTAS = espiritualAlbum("espiritual-maos-abertas", "Mãos Abertas", "O amor que se dá sem esperar volta", "#C9A96E", [
  { number: 1, title: "Dar", description: "O gesto mais antigo", lang: "PT", energy: "steady", prompt: espiritualPrompt("giving, the oldest gesture, open hands offering — not charity but overflow, the body moving toward another body", "generous, warm, ancient, the hands that open before the mind decides", "warm open chords, generous melody flowing outward, walking pace of someone carrying food to a neighbor", "PT", "steady"), durationSeconds: 240 },
  { number: 2, title: "The Stranger", description: "Amar quem não conheces", lang: "EN", prompt: espiritualPrompt("loving a stranger, compassion without reason, the irrational tenderness for someone you will never see again", "tender, undefended, brave, the softness that has no explanation", "open warm production, unguarded vocal, the sound of walking toward someone you don't know, gentle and uncertain", "EN"), durationSeconds: 240 },
  { number: 3, title: "Próximo", description: "Quem é o meu próximo", lang: "PT", energy: "steady", flavor: "marrabenta", prompt: espiritualPrompt("who is my neighbor, Ubuntu — I am because you are, the Mozambican knowing that no one is alone", "communal, warm, Mozambican warmth, the body that leans toward other bodies", "communal rhythm, warm bass, neighborly melody, Mozambican generosity, the sound of a shared meal", "PT", "steady", "marrabenta"), durationSeconds: 240 },
  { number: 4, title: "Overflow", description: "Quando o copo transborda para os outros", lang: "EN", energy: "pulse", flavor: "house", prompt: espiritualPrompt("when the cup overflows to others, abundance shared, love that multiplies by giving away", "overflowing, joyful, generous, the body that can't contain its own warmth", "flowing production building, cup overflowing textures, shared joy rhythm, dance of abundance", "EN", "pulse", "house"), durationSeconds: 240 },
  { number: 5, title: "Servir", description: "Servir como forma de orar", lang: "PT", energy: "steady", flavor: "gospel", prompt: espiritualPrompt("service as prayer, serving others as the truest form of kneeling, hands in the earth as hands in prayer", "devoted, humble, grounded power, the sacred dignity of useful hands", "gospel warmth without triumph, choir layers like many hands working, devoted vocal, sacred work as worship — steady not soaring", "PT", "steady", "gospel"), durationSeconds: 300 },
]);

const ESPIRITUAL_CATEDRAL = espiritualAlbum("espiritual-catedral", "A Catedral Interior", "O templo que não precisa de paredes", "#8B5CF6", [
  { number: 1, title: "Sem Tecto", description: "O sagrado sem edifício", lang: "PT", prompt: espiritualPrompt("sacred without building, holiness without walls, prayer under open sky — God lives where the roof leaks", "open, free, wild holiness, the sacred that needs no permission", "open air reverb, no walls in the production, sky-like pads, wind as choir", "PT"), durationSeconds: 240 },
  { number: 2, title: "Inner Altar", description: "O altar que carregas contigo", lang: "EN", energy: "raw", prompt: espiritualPrompt("inner altar, the sacred space you carry everywhere, the altar is your sternum, the candle is your breath", "centered, intimate, stripped to essence, portable sacred", "raw close-mic vocal, minimal piano, the sound of a body sitting still and finding its own cathedral", "EN", "raw"), durationSeconds: 240 },
  { number: 3, title: "Ritual Diário", description: "O café como sacramento", lang: "PT", energy: "steady", prompt: espiritualPrompt("daily ritual as sacrament, morning coffee as communion, the sacred hidden in the ordinary — cup, steam, light on the table", "intimate, ordinary-sacred, domestic holiness, the kitchen as temple", "gentle walking rhythm, kitchen warmth elevated, minimal piano, steam and breath, the sacred mundane", "PT", "steady"), durationSeconds: 240 },
  { number: 4, title: "Sanctuary", description: "O corpo como santuário", lang: "EN", prompt: espiritualPrompt("body as sanctuary, flesh as temple, embodied divinity — not transcendence but incarnation, the divine chose a body", "embodied, intimate, sacred, reverent toward skin and bone and breath", "heartbeat and breath as sacred instruments, warm pads cradling the vocal, intimate not rising — the body is already holy", "EN"), durationSeconds: 300 },
]);

const ESPIRITUAL_GRAO = espiritualAlbum("espiritual-grao", "O Grão de Luz", "O divino escondido no quotidiano", "#E8D5A3", [
  { number: 1, title: "Ordinário", description: "A santidade da terça-feira", lang: "PT", energy: "steady", prompt: espiritualPrompt("holiness of Tuesday, divinity in the ordinary — the sacred hides in routines, not in revelations", "mundane beauty, everyday sacred, the quiet miracle of doing the same thing again", "gentle domestic rhythm, simple piano with the warmth of a kitchen, everyday sounds made beautiful", "PT", "steady"), durationSeconds: 240 },
  { number: 2, title: "Small Light", description: "A luz no gesto mais simples", lang: "EN", prompt: espiritualPrompt("light in the simplest gesture, holding a cup, touching a hand, the divine mundane — God in the detail", "gentle, precise, luminous small things, the tears that come from paying attention", "precise gentle melody, each note a small light, warm attention in production, whispered and delicate", "EN"), durationSeconds: 240 },
  { number: 3, title: "Milagre Quieto", description: "Os milagres que ninguém nota", lang: "PT", energy: "raw", prompt: espiritualPrompt("quiet miracles nobody notices — heartbeat, breath, sunrise again, the fact that you woke up at all", "subtle wonder, gratitude for breathing, the miracle of being alive right now", "raw minimal vocal, breath sounds, heartbeat, wonder at existence, close-mic intimacy", "PT", "raw"), durationSeconds: 240 },
  { number: 4, title: "Sacred Ground", description: "Cada chão é terra santa", lang: "EN", energy: "steady", flavor: "marrabenta", prompt: espiritualPrompt("every ground is holy ground, sacred earth wherever you stand — the Mozambican red soil, the kitchen floor, the hospital corridor", "grounded, holy, Mozambican earth, the feet that know the ground is sacred", "earthy Mozambican rhythm, grounded bass, holy ground melody, the body that dances because the earth is alive", "EN", "steady", "marrabenta"), durationSeconds: 240 },
  { number: 5, title: "Grão", description: "Um grão de luz basta", lang: "PT", energy: "raw", prompt: espiritualPrompt("one grain of light is enough — small divinity, sufficient, a mustard seed, not a cathedral", "sufficient, whole, tiny and luminous, the peace of knowing that a grain is enough", "raw single voice, minimal piano, a single note that contains everything, no crescendo — the grain stays a grain and that is the miracle", "PT", "raw"), durationSeconds: 300 },
]);

const ESPIRITUAL_MESMA_AGUA = espiritualAlbum("espiritual-mesma-agua", "A Mesma Água", "Somos todos o mesmo rio", "#5B8FA8", [
  { number: 1, title: "Nascente", description: "A fonte comum", lang: "PT", prompt: espiritualPrompt("common source, the spring where all water begins — before religion, before language, there was this", "pure, original, primal oneness, the innocence of the first drop", "water-like textures, pure source tone, spring emerging from silence, delicate and ancient", "PT"), durationSeconds: 240 },
  { number: 2, title: "Tributaries", description: "Rios diferentes, mesma água", lang: "EN", energy: "pulse", prompt: espiritualPrompt("different rivers same water, tributaries of one source — every culture a different river, every river the same rain", "diverse, flowing, converging, beautifully different yet same, the joy of convergence", "multiple melodic streams flowing together, diverse rhythms converging into one current, momentum of water finding water", "EN", "pulse"), durationSeconds: 240 },
  { number: 3, title: "Tu em Mim", description: "Eu existo em ti, tu existes em mim", lang: "PT", energy: "steady", flavor: "marrabenta", prompt: espiritualPrompt("I exist in you, you exist in me — Ubuntu, interbeing, the Mozambican knowing that a person is a person through other people", "Ubuntu, interconnected, mutual, held by each other, the warmth of being woven", "warm communal rhythm, call-and-response melody, Mozambican Ubuntu feeling, two voices becoming one", "PT", "steady", "marrabenta"), durationSeconds: 240 },
  { number: 4, title: "Ocean", description: "O oceano que somos juntos", lang: "EN", energy: "anthem", prompt: espiritualPrompt("the ocean we are together, all drops becoming sea — not losing yourself but finding the bigger self", "oceanic, vast, communal, the overwhelming relief of not being alone", "ocean-wave production, massive communal vocal, all-becoming-one crescendo, the anthem of dissolution into love", "EN", "anthem"), durationSeconds: 300 },
]);

const ESPIRITUAL_ALEM_NOME = espiritualAlbum("espiritual-alem-nome", "Além do Nome", "O sagrado que não cabe em nenhum nome", "#9B7EC8", [
  { number: 1, title: "Todos os Nomes", description: "Deus, Alá, Brahman, Universo — todos tentam", lang: "PT", prompt: espiritualPrompt("all names for God — Deus, Allah, Brahman, Universe, Love — every religion tries, none captures, all point at the same silence", "vast, humbling, beyond language, tender respect for every tradition's attempt", "layered whispered names becoming melody, respectful of all traditions, voices in many languages dissolving into one hum", "PT"), durationSeconds: 240 },
  { number: 2, title: "Unnameable", description: "O que não cabe em palavra", lang: "EN", energy: "raw", prompt: espiritualPrompt("the unnameable, what no word contains — the moment you stop naming and start feeling, divine beyond language", "beyond words, vast silence, wordless knowing, the relief of giving up the dictionary", "wordless vocal melody, beyond-language textures, raw voice without words, silence as the truest name", "EN", "raw"), durationSeconds: 240 },
  { number: 3, title: "Mistério", description: "Não saber é a verdadeira fé", lang: "PT", prompt: espiritualPrompt("not knowing as true faith, mystery as home — the comfort of admitting you don't know and finding peace there", "humble, surrendered, comfortable in mystery, the deep peace of unanswered questions", "whispered vocal in vast space, comfort in not-knowing, mystery as beauty, no resolution in the harmony", "PT"), durationSeconds: 240 },
  { number: 4, title: "Presence", description: "O que fica quando largas todos os nomes", lang: "EN", energy: "steady", flavor: "gospel", prompt: espiritualPrompt("what remains when you drop all names — pure presence, raw divinity, the warm nothing that holds everything", "pure, present, beyond all form, the luminous emptiness that is actually full", "layers stripping away to warm vocal, gospel tenderness not triumph, presence as the quiet answer, steady and grounded", "EN", "steady", "gospel"), durationSeconds: 300 },
]);

const ESPIRITUAL_RESPIRAR = espiritualAlbum("espiritual-respirar", "Respirar o Todo", "Cada inspiração é uma oração", "#7BA68B", [
  { number: 1, title: "Inspirar", description: "Receber o mundo inteiro", lang: "PT", prompt: espiritualPrompt("inhale — receiving the whole world in one breath, the lungs as prayer bowls, the ribs opening like a church door", "receiving, opening, expanding, the sacred intake of being alive", "breath-in texture, expanding pads, receiving everything in one inhale, the body as instrument of the divine", "PT"), durationSeconds: 240 },
  { number: 2, title: "Exhale", description: "Devolver-se ao todo", lang: "EN", prompt: espiritualPrompt("exhale — giving yourself back to everything, dissolving into the whole, the generosity of letting go of the air", "releasing, dissolving, giving, the surrender of breath returning to the room", "exhale textures, melody releasing, dissolving self into wholeness, whispered and falling gently", "EN"), durationSeconds: 240 },
  { number: 3, title: "Entre Dois Sopros", description: "O espaço entre respirações", lang: "PT", energy: "raw", prompt: espiritualPrompt("the space between breaths — the gap where eternity lives, the pause that is more alive than any breath", "still, eternal, timeless, the gap between moments where you are most yourself", "silence between notes, stillness, eternity in the pause, close-mic capturing the absence of breath as its own music", "PT", "raw"), durationSeconds: 240 },
  { number: 4, title: "One Breath", description: "Uma só respiração em todos os pulmões", lang: "EN", energy: "steady", prompt: espiritualPrompt("one breath in all lungs — universal breathing, synchronized life, every chest rising together right now across the planet", "synchronized, communal, alive together, the intimacy of sharing air", "gentle communal rhythm, synchronized breathing textures, steady pulse of collective lungs, warm not driving", "EN", "steady"), durationSeconds: 240 },
  { number: 5, title: "Sopro", description: "O sopro que nos criou a todos", lang: "PT", energy: "anthem", prompt: espiritualPrompt("the breath that created all of us — the first divine exhale, creation as a sigh, the universe born from a single breath", "creative, primordial, magnificent, the origin-breath that became everything", "creation-like building, from silence to full symphony, the first breath becoming stars and rivers and you", "PT", "anthem"), durationSeconds: 300 },
]);

const ESPIRITUAL_ENTREGA = espiritualAlbum("espiritual-entrega", "A Entrega", "Largar o controlo e confiar no que não se vê", "#C4745A", [
  { number: 1, title: "Segurar", description: "O cansaço de controlar tudo", lang: "PT", energy: "raw", prompt: espiritualPrompt("exhaustion of controlling everything — the white knuckles, the jaw clenched at night, the body that forgot how to soften", "exhausted, gripping, heavy, the raw fatigue of never letting go", "tense held textures, gripping rhythm, exhausted vocal, close-mic capturing the strain in the breath", "PT", "raw"), durationSeconds: 240 },
  { number: 2, title: "Freefall", description: "Cair sem rede", lang: "EN", energy: "raw", prompt: espiritualPrompt("freefall — falling without a net, the terrifying beauty of trusting the unknown, the stomach dropping and the heart opening", "falling, surrendering, terrified and free, the vertigo of letting go", "falling melody, no ground in production, raw vocal in descent, the sound of gravity as prayer", "EN", "raw"), durationSeconds: 240 },
  { number: 3, title: "Confiança", description: "Confiar no que não se vê", lang: "PT", energy: "steady", prompt: espiritualPrompt("trusting what you cannot see — faith beyond evidence, the body relaxing into mystery, the hands opening", "trusting, grounded in mystery, held by invisible hands, the warmth of not needing to know", "warm grounded bass, steady trusting melody, held by unseen warmth, the sound of hands unclenching", "PT", "steady"), durationSeconds: 240 },
  { number: 4, title: "Carried", description: "Ser carregada pelo que é maior", lang: "EN", prompt: espiritualPrompt("being carried by something greater — surrendered to grace, the exhausted child finally picked up, no more walking", "carried, surrendered, peaceful, the deep rest of being held by what you cannot name", "gentle pads carrying the vocal like arms, whispered gospel warmth, surrendered to larger harmony, cradled", "EN"), durationSeconds: 240 },
  { number: 5, title: "Rio Abaixo", description: "Deixar o rio levar", lang: "PT", energy: "steady", prompt: espiritualPrompt("letting the river carry you — downstream surrender, trust as liberation, the body floating, the mind finally quiet", "free, surrendered, flowing with life, the peace of not swimming upstream anymore", "flowing river production, water textures, surrendered vocal floating on warm current, steady and peaceful not triumphant", "PT", "steady"), durationSeconds: 300 },
]);

// ─────────────────────────────────────────────
// VIDA (22 albums)
// A vida inteira — do acordar ao adormecer,
// do treino ao banho, da raiva ao amor.
// Uma mulher pode viver um dia inteiro
// e nunca sair do universo da Loranne.
// ─────────────────────────────────────────────

function vidaPrompt(theme: string, emotion: string, production: string, lang: "PT" | "EN", energy: TrackEnergy = "whisper", flavor: TrackFlavor = "organic"): string {
  const langNote = lang === "PT" ? "Lyrics in Portuguese." : "Lyrics in English.";
  return buildPromptWithFlavor(`${ENERGY_STYLES[energy]} ${langNote} Music for living — the soundtrack of a body moving through a real day. Not about feelings, inside them. ${emotion}. ${production}. Theme: ${theme}.`, flavor);
}

function vidaAlbum(
  slug: string,
  title: string,
  subtitle: string,
  color: string,
  tracks: Omit<TrackDef, "audioUrl" | "lyrics">[]
): AlbumDef {
  return {
    slug,
    title,
    subtitle,
    product: "vida",
    color,
    tracks: tracks.map((t) => ({ ...t, audioUrl: null })),
  };
}

// --- VIDA: CORPO E PRESENÇA (albums 1-8) ---

const VIDA_SANGUE_ACESO = vidaAlbum("vida-sangue-aceso", "Sangue Aceso", "treino, corpo em fogo", "#E04A2F", [
  { number: 1, title: "O Primeiro Passo", description: "O corpo resiste, mas o pé decide por ti.", lang: "PT", energy: "pulse", prompt: vidaPrompt("the first step off the couch when every muscle says no, feet hitting pavement, knees creaking awake, the body heavy but moving", "reluctant determination building into stubborn fire, the grunt of beginning", "deep kick drum like a heartbeat waking up, sparse percussion building layer by layer, raw bass guitar riff, claps entering one by one, breath sounds woven into the rhythm", "PT", "pulse"), durationSeconds: 240 },
  { number: 2, title: "Ignite", description: "O momento em que o corpo apanha fogo e não quer parar.", lang: "EN", energy: "anthem", flavor: "house", prompt: vidaPrompt("the moment momentum takes over and the body stops resisting, legs pumping, arms swinging, sweat beginning to form on the forehead", "euphoric acceleration, the joy of a body that remembers it was built to move", "four-on-the-floor house beat at 124 bpm, soaring synth pads, punchy sidechained bass, anthemic vocal chops, hi-hats driving forward, hands-in-the-air breakdown with piano stabs", "EN", "anthem", "house"), durationSeconds: 240 },
  { number: 3, title: "Suor Sagrado", description: "O suor lava o que as palavras não conseguem.", lang: "PT", energy: "pulse", flavor: "marrabenta", prompt: vidaPrompt("sweat dripping from the jaw, shirt soaked, muscles burning with holy fire, the body purifying itself through effort", "sacred exertion, the cleansing power of hard physical work, almost ritualistic", "marrabenta guitar patterns driving the rhythm, timbila-style wooden percussion, heavy bass groove, call-and-response vocal shouts, shakers and rattles building intensity, polyrhythmic layers stacking", "PT", "pulse", "marrabenta"), durationSeconds: 240 },
  { number: 4, title: "Breathless", description: "Os pulmões ardem e o corpo agradece.", lang: "EN", energy: "anthem", prompt: vidaPrompt("lungs on fire at peak effort, chest heaving, heart pounding in the ears, the beautiful violence of pushing past comfort into the red zone", "triumphant breathlessness, the ecstasy of maximum effort where pain becomes pleasure", "massive anthemic drums with stadium energy, distorted bass drops, soaring strings over a relentless beat, breath samples chopped rhythmically, epic build-and-release dynamics, choir-like synth swells", "EN", "anthem"), durationSeconds: 240 },
  { number: 5, title: "Mais Uma", description: "A voz que diz mais uma quando o corpo diz basta.", lang: "PT", energy: "pulse", flavor: "house", prompt: vidaPrompt("one more rep with shaking arms, one more hill with burning quads, the internal voice that refuses to let you quit, teeth gritted, hands gripping", "stubborn defiance against your own limits, the addictive edge of pushing through", "driving house beat with aggressive bassline, percussive vocal stabs repeating like a mantra, snare rolls building tension, acid synth lines cutting through, relentless four-to-the-floor energy with Portuguese crowd chants", "PT", "pulse", "house"), durationSeconds: 240 },
  { number: 6, title: "The Wall", description: "O muro aparece. Tu não paras.", lang: "EN", energy: "raw", prompt: vidaPrompt("hitting the wall at kilometre thirty, legs like concrete, vision narrowing, the body screaming stop while something deeper says keep going", "gritty defiance, raw survival instinct, ugly beautiful perseverance when everything wants to quit", "stripped-back heavy drums with industrial edge, distorted bass like dragging chains, minimal arrangement that feels like depleted energy, raw vocal textures almost spoken, sparse piano notes like footsteps on empty road", "EN", "raw"), durationSeconds: 240 },
  { number: 7, title: "Descarga", description: "A explosão de quem deu tudo e soltou.", lang: "PT", energy: "anthem", flavor: "marrabenta", prompt: vidaPrompt("the explosive release after maximum effort, arms thrown wide, scream of victory, the body emptied and electric, every cell vibrating", "volcanic release, pure cathartic joy, the roar after the finish line, triumphant and primal", "marrabenta guitar erupting into full celebration, massive drum break with timbila and djembe, brass section blaring triumphant melodies, call-and-response chanting building to euphoric peak, bass shaking the floor", "PT", "anthem", "marrabenta"), durationSeconds: 240 },
  { number: 8, title: "Cool Down", description: "O corpo arrefece, grato por cada gota.", lang: "EN", energy: "steady", prompt: vidaPrompt("walking slowly after the run, steam rising from shoulders in cold air, heart rate descending step by step, endorphins flooding like warm honey through every limb", "deep physical gratitude, the warm glow of a body that was fully used, peaceful exhaustion", "gentle downtempo beat, warm Rhodes piano chords, soft bass plucks, ambient pads like cooling mist, subtle vinyl crackle, acoustic guitar arpeggios floating over a slow groove", "EN", "steady"), durationSeconds: 300 },
]);

const VIDA_SILENCIO_FERTIL = vidaAlbum("vida-silencio-fertil", "Silêncio Fértil", "meditação, pausa", "#4A6B5A", [
  { number: 1, title: "Sentar", description: "O acto de sentar e chegar aqui.", lang: "PT", prompt: vidaPrompt("the physical act of sitting down on the cushion, spine straightening, hips settling into the floor, shoulders dropping away from the ears", "the quiet courage of choosing to stop, the first moment of arriving in the present", "single sustained singing bowl tone, almost imperceptible drone underneath, sparse plucked kora notes like thoughts settling, vast silence between sounds", "PT"), durationSeconds: 240 },
  { number: 2, title: "Still Water", description: "A mente depois das ondas.", lang: "EN", prompt: vidaPrompt("the surface of a mind after the ripples stop, thoughts slowing like leaves settling to the bottom of a pond, the body becoming transparent", "profound calm, the surprise of inner stillness, water finding its own level without effort", "glass-like ambient tones shimmering at the edges, deep sub-bass barely felt more than heard, reversed piano notes dissolving into silence, field recording of actual still water", "EN"), durationSeconds: 240 },
  { number: 3, title: "O Corpo Respira", description: "Só a respiração. Só o corpo. Mais nada.", lang: "PT", energy: "raw", prompt: vidaPrompt("the ribs expanding and contracting, the belly rising and falling, air entering cool through the nostrils and leaving warm, the entire universe reduced to this one miracle repeating", "raw intimacy with the body's most basic function, stripped of everything except breath and presence", "actual breath recordings layered and harmonized, single low cello drone following the rhythm of breathing, no percussion, no melody, just texture and air and resonance", "PT", "raw"), durationSeconds: 240 },
  { number: 4, title: "Between Thoughts", description: "O espaço entre dois pensamentos onde vive a paz.", lang: "EN", prompt: vidaPrompt("the tiny gap between one thought ending and the next beginning, that fraction of a second where the mind is genuinely empty", "delicate wonder at the spaces inside the mind, the peace that exists in not-thinking, weightless and infinite", "extremely sparse arrangement with long silences as compositional element, single high-pitched crystal bowl, occasional soft piano note appearing and disappearing like a thought", "EN"), durationSeconds: 240 },
  { number: 5, title: "Vazio Cheio", description: "O vazio que afinal está cheio.", lang: "PT", prompt: vidaPrompt("sitting in what you thought was emptiness and discovering it is full, the paradox of nothing containing everything, the body hollow like a bell", "awe at the fullness of emptiness, the gentle shock of presence without content, spacious and complete", "deep harmonic drone that seems to contain all frequencies, Tibetan singing bowls layered at different pitches, very slow evolving pad that breathes", "PT"), durationSeconds: 240 },
  { number: 6, title: "The Bell", description: "O sino que te chama de volta.", lang: "EN", energy: "steady", prompt: vidaPrompt("a meditation bell ringing through the fog of deep stillness, the vibration entering the chest before the ears, calling you gently back", "gentle authority, the compassionate interruption that says you can come back now, steady and clear", "actual meditation bell recorded close with full resonance and decay, gentle steady pulse emerging underneath like a heartbeat returning, warm pad slowly rising, soft hand drum keeping time", "EN", "steady"), durationSeconds: 240 },
  { number: 7, title: "Nenhum Lugar", description: "Lugar nenhum para ir. Nada para consertar.", lang: "PT", energy: "raw", prompt: vidaPrompt("the radical permission of having nowhere to go and nothing to fix, the body relaxed beyond relaxation, no agenda no urgency no improvement needed", "profound release from the tyranny of productivity, raw acceptance of being exactly here and exactly enough", "almost nothing — a single low drone barely audible, occasional silence lasting ten or fifteen seconds, a single plucked string that appears once and is not repeated, the sound of not trying", "PT", "raw"), durationSeconds: 240 },
  { number: 8, title: "Return", description: "Voltar ao mundo, devagar, com os olhos novos.", lang: "EN", prompt: vidaPrompt("fingers beginning to move, eyelids fluttering open to a room that looks different now, standing up with legs that feel new, the doorknob cold and real in your hand", "tender re-engagement with the world, carrying stillness into movement, gentle and unhurried", "sounds of a room gradually fading in — birdsong, distant traffic — gentle acoustic guitar entering like morning light, soft brushed snare like footsteps, warm bass notes grounding the return", "EN"), durationSeconds: 300 },
]);

const VIDA_O_TEAR = vidaAlbum("vida-o-tear", "O Tear", "foco, trabalho, criação", "#8B7355", [
  { number: 1, title: "O Fio", description: "O fio da concentração que não se pode partir.", lang: "PT", energy: "steady", prompt: vidaPrompt("the single thread of concentration pulled taut between the hands, eyes narrowing, the world falling away at the edges, fingers finding their rhythm", "quiet intensity, the focused pleasure of attention narrowing to a single point, unbreakable and fluid", "repetitive minimalist piano pattern like Steve Reich, gentle pulse underneath, soft Rhodes chords cycling, subtle click-track like a loom mechanism, warm analog synth bass holding steady", "PT", "steady"), durationSeconds: 240 },
  { number: 2, title: "Undercurrent", description: "A corrente invisível debaixo do pensamento.", lang: "EN", energy: "steady", prompt: vidaPrompt("the deep flow state running beneath conscious thought like an underground river, hands moving before the mind decides", "effortless momentum, the feeling of being carried by something deeper than intention, smooth and inevitable", "warm sub-bass current flowing continuously, muted electric guitar arpeggios cycling hypnotically, brushed drums at low volume keeping perfect time, ambient textures like water heard through walls", "EN", "steady"), durationSeconds: 240 },
  { number: 3, title: "Mãos Ocupadas", description: "Mãos que trabalham enquanto a mente descansa.", lang: "PT", energy: "steady", flavor: "marrabenta", prompt: vidaPrompt("hands kneading dough or sanding wood or typing or sewing, the mind freed by the occupation of the fingers", "industrious calm, the meditative peace of hands that know their craft, rhythmic and grounded", "marrabenta guitar pattern steady and hypnotic, light timbila percussion creating a work rhythm, acoustic bass walking steadily, hand claps like tools hitting surfaces", "PT", "steady", "marrabenta"), durationSeconds: 240 },
  { number: 4, title: "The Loom", description: "O ritmo de quem tece sem pensar.", lang: "EN", prompt: vidaPrompt("the rhythmic back-and-forth of a loom shuttle, thread crossing thread in a pattern that builds without rushing", "meditative precision, the trance of repetitive creation, whispering concentration", "soft mechanical rhythms like a loom clicking, layered polyrhythmic patterns at very low volume, dulcimer or hammered strings, gentle drone underneath like the hum of a workshop", "EN"), durationSeconds: 240 },
  { number: 5, title: "Tinta e Papel", description: "A tinta encontra o papel e o mundo pára.", lang: "PT", energy: "steady", prompt: vidaPrompt("the moment ink touches paper or fingers touch keys, the scratch of pen on rough surface, words appearing one after another like footprints in snow", "absorbed creation, the intimacy of making something from nothing, the writer's quiet fever", "solo piano with jazz voicings, gentle and unhurried, soft upright bass pizzicato, vinyl warmth and analog tape hiss, occasional typewriter click woven into rhythm", "PT", "steady"), durationSeconds: 240 },
  { number: 6, title: "Rhythm of Making", description: "O momento em que a criação toma conta.", lang: "EN", energy: "pulse", prompt: vidaPrompt("the acceleration when creation takes over and you become the instrument, hands moving faster than thought, time disappearing completely", "creative urgency that feels like joy, the pulse of something wanting to be born through your hands, unstoppable", "driving rhythmic foundation with layered percussion building momentum, syncopated bass guitar locked in with drums, marimba and vibraphone creating melodic momentum, handclaps accelerating", "EN", "pulse"), durationSeconds: 240 },
  { number: 7, title: "A Peça Pronta", description: "O silêncio de quem terminou e contempla.", lang: "PT", energy: "steady", prompt: vidaPrompt("stepping back from the finished work, hands still warm from making, looking at what exists now that didn't exist before, tools laid down, surface cleared", "gentle pride without ego, the calm after creation, the deep breath of something finished and released", "warm closing chord progression on piano, soft strings entering like afternoon light, gentle brushed cymbal shimmer, acoustic guitar final arpeggios, everything settling and resolving", "PT", "steady"), durationSeconds: 300 },
]);

const VIDA_RENDICAO = vidaAlbum("vida-rendicao", "Rendição", "adormecer, largar o dia", "#2D2D4E", [
  { number: 1, title: "Desligar", description: "Desligar o dia como quem desliga uma luz.", lang: "PT", prompt: vidaPrompt("the phone placed face-down on the nightstand, the lamp clicking off, the last screen disappearing, the room going dark", "gentle surrender, the relief of choosing to stop receiving the world, the first letting go", "soft descending piano notes like lights going off one by one, warm analog pad fading in from darkness, very slow tempo, distant reverb creating the feeling of a large dark room", "PT"), durationSeconds: 240 },
  { number: 2, title: "Heavy Lids", description: "As pálpebras descem e o corpo pede.", lang: "EN", prompt: vidaPrompt("eyelids becoming heavy as stone, the micro-muscles of the face releasing one by one, jaw unclenching, forehead smoothing", "deep physical fatigue asking for rest, the body's honest request to stop seeing, heavy and warm", "extremely slow tempo with long sustaining pads, muffled bass like hearing through a pillow, gentle detuned piano notes sinking lower and lower, sounds becoming softer and further away", "EN"), durationSeconds: 240 },
  { number: 3, title: "A Última Contagem", description: "Contar para trás até não haver números.", lang: "PT", prompt: vidaPrompt("counting backwards from ten, each number heavier than the last, the spaces between numbers growing longer, forgetting what comes after seven", "the dissolving edge of consciousness, numbers becoming meaningless as the mind loosens its grip on order", "sparse notes descending in pitch with each phrase, increasing reverb and delay as if falling into a well, soft granular synthesis textures like dissolving thoughts", "PT"), durationSeconds: 240 },
  { number: 4, title: "Drift", description: "A fronteira entre acordado e a dormir.", lang: "EN", prompt: vidaPrompt("the hypnagogic edge where reality loosens and faces appear behind closed eyes, the body twitching once as it crosses the border", "floating between two states of being, neither here nor there, the sweet confusion of almost-sleep", "ambient textures that shift and morph unpredictably like hypnagogic imagery, reversed sounds appearing and disappearing, pitch-shifted whispers that are not quite words", "EN"), durationSeconds: 240 },
  { number: 5, title: "O Peso Bom", description: "A gravidade boa de quem adormece.", lang: "PT", prompt: vidaPrompt("the body becoming heavier than the mattress, sinking into the bed as if the bed is swallowing you gently, limbs too heavy to move", "absolute physical surrender, the luxurious heaviness of a body that has permission to be completely still and held", "deep low-frequency warmth like being wrapped in bass, barely perceptible slow breathing rhythm, cello drone at the lowest register, no percussion of any kind", "PT"), durationSeconds: 240 },
  { number: 6, title: "Dissolve", description: "Dissolver-se na noite como sal na água.", lang: "EN", prompt: vidaPrompt("the boundaries of the body becoming unclear, not knowing where skin ends and sheets begin, the self dissolving like ink in dark water", "ego dissolving peacefully, the relief of not being anyone for a while, merging with darkness", "granular ambient textures breaking apart and recombining, sounds that seem to come from inside the head rather than outside, extreme reverb creating infinite dark space", "EN"), durationSeconds: 240 },
  { number: 7, title: "Noite Boa", description: "O último sussurro antes do silêncio.", lang: "PT", prompt: vidaPrompt("the last conscious whisper to yourself before sleep takes you completely, goodnight to your own tired body, goodnight to your hands and feet and worried mind", "intimate self-compassion at the edge of sleep, the softest goodbye to today, barely there and infinitely gentle", "single music box note repeated slowly and growing quieter, the softest possible pad like a held breath, silence as the primary instrument with tiny sounds floating in it like dust in moonlight", "PT"), durationSeconds: 300 },
]);

const VIDA_LUZ_CRUA = vidaAlbum("vida-luz-crua", "Luz Crua", "manhã, primeiro gesto", "#E8C170", [
  { number: 1, title: "Antes dos Olhos", description: "Antes de abrir os olhos, ainda no escuro.", lang: "PT", prompt: vidaPrompt("the moment before opening your eyes, still in the warm dark behind the eyelids, awareness returning before sight", "the tender reluctance of returning to consciousness, the last moment of pure being before doing begins", "near-silence with a single sustained tone barely audible, field recording of early morning room ambience — distant birdsong muffled through glass, the softest possible drone growing like pre-dawn light", "PT"), durationSeconds: 240 },
  { number: 2, title: "First Sound", description: "O primeiro som do dia entra e o mundo recomeça.", lang: "EN", prompt: vidaPrompt("the first sound that enters consciousness — a bird outside the window, a pipe creaking, rain on glass — the world announcing it continued while you were gone", "gentle surprise at the world still being here, the innocence of first hearing, morning ears fresh and undefended", "actual field recordings of dawn sounds — birdsong, wind, distant bells — layered with the gentlest finger-picked acoustic guitar, soft harmonica breathing in and out, no drums", "EN"), durationSeconds: 240 },
  { number: 3, title: "Pés no Chão", description: "Pés no chão frio e o corpo chega.", lang: "PT", energy: "steady", prompt: vidaPrompt("feet touching cold floor for the first time today, the shock of contact that pulls you fully into the body, standing up and feeling gravity", "grounded arrival in the physical, the honest jolt of cold floor on warm feet, the body remembering it has weight", "warm upright bass establishing ground, soft brushed snare like bare feet on wooden floor, Rhodes piano chords simple as morning light, gentle steady tempo like walking to the bathroom", "PT", "steady"), durationSeconds: 240 },
  { number: 4, title: "The Kettle", description: "A chaleira ferve e o ritual começa.", lang: "EN", energy: "steady", prompt: vidaPrompt("filling the kettle and hearing the water change pitch as it rises, the click of the switch, the slow building of the boil, steam curling, the first sip", "domestic ritual as meditation, the sacred ordinary of making tea or coffee, unhurried and complete in itself", "gentle percolating rhythmic texture like water heating, warm marimba notes in a simple repeating pattern, soft bass pulse steady as a morning routine", "EN", "steady"), durationSeconds: 240 },
  { number: 5, title: "Intenção", description: "Dirigir o dia sem forçar, só apontar.", lang: "PT", energy: "steady", prompt: vidaPrompt("standing at the window with the warm cup, looking at the day ahead not as a list but as a direction, setting intention the way you set a compass", "quiet purposefulness without pressure, the dignity of choosing a direction, calm and clear like morning air", "gentle piano melody that moves forward with clear direction, soft strings providing warmth underneath, light percussion with purpose, acoustic guitar adding harmonic colour", "PT", "steady"), durationSeconds: 240 },
  { number: 6, title: "Daybreak", description: "O dia começa no corpo e o corpo quer mover-se.", lang: "EN", energy: "steady", flavor: "marrabenta", prompt: vidaPrompt("the body beginning to want movement, shoulders rolling, neck stretching, the first real energy arriving in the legs, the morning air hitting the face", "joyful readiness to begin, the body's morning appetite for life, optimistic and physical and real", "marrabenta guitar bright as morning sun, light hand percussion like the body waking up piece by piece, walking bass line with optimistic intervals, shakers like dew shaking off leaves", "EN", "steady", "marrabenta"), durationSeconds: 300 },
]);

const VIDA_PAO_SAL = vidaAlbum("vida-pao-sal", "O Pão e o Sal", "casa, cozinha, presença doméstica", "#C9B896", [
  { number: 1, title: "A Mesa Posta", description: "Pôr a mesa como quem prepara uma cerimónia.", lang: "PT", energy: "steady", prompt: vidaPrompt("placing plates one by one on the table, the cloth straightened, glasses aligned, cutlery laid in its proper place", "quiet ceremony in the ordinary, the dignity of domestic preparation, love expressed through placement and order", "gentle acoustic guitar with warm nylon strings, soft hand percussion like plates being set down rhythmically, upright bass walking at the pace of setting a table", "PT", "steady"), durationSeconds: 240 },
  { number: 2, title: "Simmer", description: "O borbulhar gentil da paciência.", lang: "EN", prompt: vidaPrompt("a pot on low heat with the lid slightly ajar, the gentle rhythmic bubbling of something that cannot be rushed, steam rising in slow spirals", "patient anticipation, the meditative quality of slow cooking, trusting the process, warm and unhurried", "soft bubbling textures layered as percussion, warm pad like steam filling a room, very gentle brush work on a snare, muted trumpet playing a melody so slow it almost stops", "EN"), durationSeconds: 240 },
  { number: 3, title: "Tempero", description: "O pequeno gesto que muda tudo.", lang: "PT", energy: "steady", flavor: "marrabenta", prompt: vidaPrompt("a pinch of salt between thumb and forefinger, the twist of the pepper mill, a squeeze of lemon that transforms everything", "playful precision, the joy of the small thing that changes everything, the cook's quiet confidence", "bright marrabenta guitar with a playful melodic line, light timbila percussion dancing, hand claps syncopated and alive, acoustic bass grooving with warmth", "PT", "steady", "marrabenta"), durationSeconds: 240 },
  { number: 4, title: "Flour Hands", description: "Mãos na farinha, mente em silêncio.", lang: "EN", energy: "steady", prompt: vidaPrompt("hands deep in flour and dough, kneading with the heel of the palm, the rhythmic push and fold and turn, white dust on forearms", "absorbed domestic meditation, the ancient satisfaction of hands shaping something that will feed someone, grounded and timeless", "soft rhythmic pattern like kneading, gentle brush percussion, warm acoustic piano playing simple folk-like melody, upright bass keeping the rhythm of hands working", "EN", "steady"), durationSeconds: 240 },
  { number: 5, title: "Cheiro de Casa", description: "O cheiro que é casa, antes de ser lugar.", lang: "PT", prompt: vidaPrompt("the specific smell that means home — bread baking or coffee brewing or onions softening in oil — the smell that lives in the walls", "deep belonging through the nose, the emotion that smell carries more honestly than words, nostalgia that is also presence", "extremely warm and enveloping pad like a smell filling a room, solo acoustic guitar played close-mic, soft humming voice without words", "PT"), durationSeconds: 240 },
  { number: 6, title: "Sunday Meal", description: "A mesa de domingo onde todos cabem.", lang: "EN", energy: "steady", flavor: "gospel", prompt: vidaPrompt("the long table on Sunday with too many chairs squeezed in, plates passed hand to hand, voices overlapping, someone laughing with their mouth full", "warm abundance, the noisy sacred of family at table, generous and imperfect and full of life", "gospel-influenced piano with rich warm chords, soft organ pad underneath, gentle handclaps and tambourine, bass guitar walking with Sunday ease, choir-like vocal harmonies", "EN", "steady", "gospel"), durationSeconds: 300 },
]);

const VIDA_DERIVA = vidaAlbum("vida-deriva", "Deriva", "estrada, viagem, caminhar", "#6B8E8A", [
  { number: 1, title: "A Porta", description: "Fechar a porta e deixar tudo para trás.", lang: "PT", energy: "steady", prompt: vidaPrompt("the sound of the door closing behind you, keys in pocket, the bag on your shoulder, turning away from the familiar and toward the road", "the clean break of departure, the slight ache and slight thrill of leaving, a door closing as a beginning", "a single percussive sound like a door closing to start, then walking bass establishing steady forward motion, gentle acoustic guitar strumming, brushed drums at walking pace", "PT", "steady"), durationSeconds: 240 },
  { number: 2, title: "Open Road", description: "A estrada esticada à frente como uma promessa.", lang: "EN", energy: "pulse", prompt: vidaPrompt("the road stretching ahead with nothing on it but light and distance, foot pressing the accelerator or the stride lengthening, the horizon pulling forward", "expansive freedom, the pulse of movement with no destination more important than the movement itself, open and accelerating", "driving rhythmic guitar riff with open road energy, bass drum like a heartbeat at highway speed, shimmering cymbals like sunlight on tarmac, bass guitar pushing forward", "EN", "pulse"), durationSeconds: 240 },
  { number: 3, title: "Paisagem", description: "A paisagem passa como pensamentos soltos.", lang: "PT", energy: "steady", prompt: vidaPrompt("landscape scrolling past the window — fields becoming hills becoming towns becoming fields again — thoughts loosened by movement drifting like clouds", "gentle detachment, the meditative quality of watching the world move while you sit still", "gentle repetitive guitar pattern like landscape repeating, soft train-like rhythm in the percussion, ambient pads changing colour slowly like scenery shifting, melodica playing a wandering melody", "PT", "steady"), durationSeconds: 240 },
  { number: 4, title: "Miles", description: "A meditação dos quilómetros acumulados.", lang: "EN", energy: "steady", prompt: vidaPrompt("the meditation of accumulated miles, the odometer turning over, the body settling into the rhythm of sustained travel", "patient accumulation, the zen of long-distance travel, each mile adding to something you cannot name but can feel", "steady hypnotic groove with bass and drums locked in for the long haul, electric piano playing sparse chords at wide intervals, pedal steel guitar adding lonesome colour", "EN", "steady"), durationSeconds: 240 },
  { number: 5, title: "Janela Aberta", description: "O vento pela janela aberta e a liberdade no cabelo.", lang: "PT", energy: "pulse", flavor: "marrabenta", prompt: vidaPrompt("the window rolled down and the wind hitting the face and pulling the hair, the car filling with outside air, shouting something into the wind that nobody can hear", "wild joy, the childlike freedom of wind on skin, the ecstasy of movement and air and not caring", "marrabenta guitar riff bright and joyful with wind energy, driving percussion with shakers like rushing air, bass guitar bouncing with road rhythm", "PT", "pulse", "marrabenta"), durationSeconds: 240 },
  { number: 6, title: "Stranger's Town", description: "Chegar a um lugar onde ninguém te conhece.", lang: "EN", energy: "steady", prompt: vidaPrompt("stepping out in a town where nobody knows your name, unfamiliar street signs and different light and the smell of someone else's ordinary life", "curious anonymity, the lightness of being unknown, the world fresh because you have no history with it", "muted trumpet playing a melody like exploring a new street, gentle brushed drums, walking bass at the pace of wandering without a map, ambient textures of an unfamiliar place", "EN", "steady"), durationSeconds: 240 },
  { number: 7, title: "O Regresso", description: "Voltar a casa diferente de quando saíste.", lang: "PT", prompt: vidaPrompt("the familiar road appearing again but looking different because you are different, the door opening to a home that is the same but you are not", "bittersweet return, the quiet transformation that travel leaves in the bones, home recognizable but seen with new eyes", "gentle acoustic guitar returning to the opening melody but with subtle harmonic changes, soft piano joining, sounds of home fading in — a kettle, a familiar creak", "PT"), durationSeconds: 300 },
]);

const VIDA_CORPO_A_CORPO = vidaAlbum("vida-corpo-a-corpo", "Corpo a Corpo", "intimidade, proximidade", "#9B4A5A", [
  { number: 1, title: "Aproximar", description: "Aproximar milímetro a milímetro.", lang: "PT", prompt: vidaPrompt("moving closer millimetre by millimetre across a couch or a bed, the magnetic pull of another body, the electric charge in the shrinking distance", "aching anticipation, the exquisite tension of almost-touching, desire held in suspension", "barely-there bass pulse like a heartbeat heard through someone else's chest, soft Rhodes piano with tremolo, breathy pad textures that swell and recede, the gentlest possible brush on a cymbal", "PT"), durationSeconds: 240 },
  { number: 2, title: "Skin", description: "A pele como primeira e última língua.", lang: "EN", energy: "raw", prompt: vidaPrompt("skin meeting skin for the first time — the shock of warmth, the entire nervous system reorganizing around the point of contact, fingertips reading another body like braille", "raw vulnerability of first touch, skin as the most honest organ, desire stripped of everything decorative, primal and trembling", "raw textured bass with analogue warmth, sparse percussion like a body shifting on sheets, distorted guitar played so softly it becomes a whisper, vocal textures — breath, sigh", "EN", "raw"), durationSeconds: 240 },
  { number: 3, title: "O Espaço Entre", description: "O espaço carregado entre dois corpos a ponto de se tocarem.", lang: "PT", prompt: vidaPrompt("the charged space between two bodies that are about to touch but haven't yet, the electricity in the gap, the unbearable sweetness of the last centimetre", "suspended desire, the space between as more charged than the contact itself, time stretching and thickening like honey", "tension-building pad with slow harmonic movement, extremely subtle bass throb barely felt in the chest, high-pitched tones like nerve endings firing, silence used as tension", "PT"), durationSeconds: 240 },
  { number: 4, title: "Breath to Breath", description: "Partilhar o ar entre duas bocas.", lang: "EN", energy: "steady", prompt: vidaPrompt("breathing into each other's mouths, foreheads touching, sharing the same air so that your exhale becomes their inhale", "tender shared breathing, the intimacy of exchanged air, the rhythm of two bodies synchronizing without trying", "two breath-like pads breathing in counterpoint, gentle heartbeat bass pulse steady and warm, soft piano chords appearing on the exhale, the subtlest brush pattern", "EN", "steady"), durationSeconds: 240 },
  { number: 5, title: "Entrega de Pele", description: "Dar-se através da pele, sem reservas.", lang: "PT", energy: "raw", prompt: vidaPrompt("giving yourself completely through the body, the moment when self-consciousness dissolves and there is only sensation and response", "total surrender through the physical, raw vulnerability without performance, the body's deepest honesty, unguarded and generous", "deep warm bass with slow movement like a body in rhythm, raw vocal textures — not words but sounds, analogue synth warmth, percussion organic and unpredictable", "PT", "raw"), durationSeconds: 240 },
  { number: 6, title: "After", description: "O silêncio entre dois corpos depois, terno e infinito.", lang: "EN", prompt: vidaPrompt("the silence between two bodies after, lying still, skin cooling, the room returning, a hand resting on a chest feeling the heartbeat slow", "infinite tenderness in aftermath, the holy quiet after intimacy, two nervous systems settling back into their own borders gently", "extremely sparse — a single piano note held with the sustain pedal, the softest possible string pad, breath sounds fading, a lullaby-like melody appearing in the last moments", "EN"), durationSeconds: 300 },
]);

const VIDA_DILUVIO_MANSO = vidaAlbum("vida-diluvio-manso", "Dilúvio Manso", "chorar, luto, desabar", "#5A6B8B", [
  { number: 1, title: "Permissão", description: "A licença que ninguém te deu para desabar.", lang: "PT", energy: "raw", prompt: vidaPrompt("The body giving way — knees buckling on the bathroom floor, hands gripping the edge of the sink. The shudder that starts in the belly and rises through the throat", "Devastatingly open, like a wound breathing for the first time. The terrible relief of surrender — not defeat, but the exhaustion of pretending", "Solo cello, bowed slow and rough, close-miked so you hear the rosin bite. Sparse piano — single notes with long decay, reverb like an empty cathedral. Breath sounds, unpolished vocal that cracks", "PT", "raw"), durationSeconds: 240 },
  { number: 2, title: "The Dam", description: "When what you held back finally floods through.", lang: "EN", energy: "raw", prompt: vidaPrompt("The crack spreading across concrete — water finding every fissure, unstoppable. Years of held breath released in one violent exhale", "Cathartic rupture — the terrifying freedom of total collapse. The overwhelming force of everything felt at once", "Building drums — starts with a single heartbeat kick, layers until it's a flood of percussion. Distorted bass that rumbles like structural failure. Vocals that start whispered and end shouted", "EN", "raw"), durationSeconds: 240 },
  { number: 3, title: "Salgado", description: "O sal das lágrimas é o mesmo sal do mar.", lang: "PT", prompt: vidaPrompt("Tears drying on cheeks — the tightness of salt on skin, the taste on lips. The ocean inside the body, the same mineral composition as grief and as the sea", "Gentle and ancient, like being rocked by something older than your pain. The strange comfort of realising your tears are made of the same thing as the ocean", "Soft fado-influenced guitar, nylon strings, fingerpicked with space between notes. Field recording of distant waves underneath. Vocal intimate and close, almost spoken", "PT"), durationSeconds: 240 },
  { number: 4, title: "Carry", description: "The weight of grief worn like a second skeleton.", lang: "EN", energy: "steady", prompt: vidaPrompt("Heavy footsteps on gravel — the body leaning forward because the chest is too full. Carrying grocery bags with shaking hands, the mundane continuation of life", "Weighted and dignified — grief not as weakness but as labour. The stubborn persistence of getting through the day while carrying something invisible", "Deep upright bass walking a slow blues line. Brushed snare like dragging feet. Pedal steel guitar, long notes that bend like the body under weight. Gospel organ muted underneath", "EN", "steady"), durationSeconds: 240 },
  { number: 5, title: "A Falta", description: "A ausência que pesa mais do que a presença jamais pesou.", lang: "PT", energy: "raw", prompt: vidaPrompt("The empty chair at the table — the phantom limb of someone gone. Reaching for a phone to call someone who will never answer again", "A hollowness that echoes, absence as a physical presence in the room. The paradox of missing — how nothing can be so heavy", "Prepared piano — felt between the strings, muted and ghostly. A mbira played slow, each note a small bell for the missing. Vocal that leaves gaps, unfinished phrases", "PT", "raw"), durationSeconds: 240 },
  { number: 6, title: "Rain Inside", description: "The weather no one else can see, necessary and cleansing.", lang: "EN", prompt: vidaPrompt("Rain falling behind the eyes — the internal downpour that softens everything it touches. Sitting still while the body weeps from the inside, not dramatic, just persistent", "Cleansing and inevitable, like monsoon after drought. The quiet recognition that this rain is not destruction — it is what will make something grow", "Rain stick and water sounds woven into the rhythm. Soft kalimba melody, circular, meditative. Ambient pads like clouds — gray but luminous. Whispered vocal layered in reverb", "EN"), durationSeconds: 240 },
  { number: 7, title: "Depois do Choro", description: "A leveza estranha que vem quando o corpo já chorou tudo.", lang: "PT", energy: "steady", prompt: vidaPrompt("The face washed clean — puffy eyes, but lighter behind them. The strange hunger that comes after deep crying, the body asking for bread, for water", "Post-storm clarity — the exhausted peace of having nothing left to hold. Fragile but real lightness, like the sky after heavy rain", "Acoustic guitar, open tuning, fingerpicked gently. Flute — wooden, warm, a single melody that rises. Light hand percussion like a heartbeat returning to normal", "PT", "steady"), durationSeconds: 300 },
]);

const VIDA_LAVA_QUIETA = vidaAlbum("vida-lava-quieta", "Lava Quieta", "raiva contida, fogo por dentro", "#8B3A2A", [
  { number: 1, title: "Engolir", description: "O grito que desce de volta para o estômago.", lang: "PT", energy: "raw", prompt: vidaPrompt("The throat closing around words — the jaw clenching so hard the teeth ache. Swallowing fire, feeling it burn all the way down", "Suffocating intensity — the violence of silence when silence is not peace but a cage. The internal scream bouncing off the ribcage", "Distorted bass clarinet, low and growling, played with too much air. Tight compressed drums — kick drum like a punch to the gut. Dissonant strings, short stabs", "PT", "raw"), durationSeconds: 240 },
  { number: 2, title: "Smolder", description: "The slow burn beneath a still surface, patient and dangerous.", lang: "EN", energy: "steady", prompt: vidaPrompt("Embers glowing beneath ash — the surface cool, the interior incandescent. The smile held steady while the hands tremble under the table", "Controlled danger — a predator lying still, energy coiled and waiting. The terrifying composure of someone who has been burning for years", "Low-tuned electric guitar, clean tone with subtle overdrive that builds. Ride cymbal ticking like a clock. Synth bass that pulses like a slow heartbeat. Vocal steady, almost too calm", "EN", "steady"), durationSeconds: 240 },
  { number: 3, title: "O Punho", description: "A mão fechada dentro do bolso onde ninguém vê.", lang: "PT", energy: "pulse", flavor: "marrabenta", prompt: vidaPrompt("The fist inside the coat pocket — nails pressing crescents into the palm. The body vibrating at a frequency no one else can hear", "Compressed rage seeking any exit — tense, rhythmic, physical. A pressure cooker with the valve sealed", "Marrabenta-influenced percussion — timbila patterns accelerating subtly. Slapped bass, aggressive and funky. Staccato brass stabs — short, punchy. Vocal percussive, words spat out", "PT", "pulse", "marrabenta"), durationSeconds: 240 },
  { number: 4, title: "Red", description: "When the body fills with fire and the edges of vision blur.", lang: "EN", energy: "raw", prompt: vidaPrompt("Vision narrowing to a tunnel — the flush rising from chest to neck to face. Hands shaking from the sheer voltage of anger", "Explosive and primal — the moment before the eruption, held one beat too long. Red as a physical experience, a temperature, a frequency", "Heavy distorted guitar riff — simple, repetitive, relentless. Double kick drum driving hard. Industrial textures — metal on metal, feedback sculpted into melody", "EN", "raw"), durationSeconds: 240 },
  { number: 5, title: "Dizer", description: "A boca que finalmente abre e deixa sair tudo.", lang: "PT", energy: "anthem", prompt: vidaPrompt("The mouth opening wide — the first word that was swallowed years ago finally leaving the body. Standing in the kitchen and saying the unsayable", "Triumphant fury — not calm, not polite, but righteous and necessary. The exhilaration of voice reclaimed", "Full band explosion — horns blazing, drums crashing, bass driving forward. Choir of women's voices raw and unpolished. Guitar solo that wails. Vocal belted, no restraint", "PT", "anthem"), durationSeconds: 240 },
  { number: 6, title: "The Cooling", description: "Rage settling into something clear and sharp as glass.", lang: "EN", energy: "steady", prompt: vidaPrompt("The breath slowing after the shout — the hands unclenching, the jaw releasing. The strange lucidity that follows fury, like a landscape after wildfire", "Crystalline calm — not the absence of anger but its transformation into clarity. The cold beauty of seeing everything clearly", "Glass marimba and vibraphone — cool, metallic, precise. Upright bass pizzicato, measured. Brushed drums almost not there. Vocal low and clear, spoken-sung", "EN", "steady"), durationSeconds: 300 },
]);

const VIDA_ANCORA = vidaAlbum("vida-ancora", "Âncora", "ansiedade, pânico, precisar de chão", "#6B5A4A", [
  { number: 1, title: "O Aperto", description: "O peito que fecha e o chão que desaparece.", lang: "PT", energy: "raw", prompt: vidaPrompt("The chest constricting — ribs closing inward like a cage shrinking. The floor tilting beneath the feet, hands reaching for the wall, cold sweat", "Suffocating vertigo — the terror of losing the ground, of the body betraying itself. The loneliness of panic", "Heartbeat kick drum — irregular, too fast, arrhythmic. High-pitched strings trembling, dissonant. Breathing recorded close, hyperventilating. Piano notes scattered like objects falling", "PT", "raw"), durationSeconds: 240 },
  { number: 2, title: "Ground", description: "The moment your feet remember the earth is still there.", lang: "EN", energy: "steady", prompt: vidaPrompt("Bare feet pressing into the floor — feeling the cold tile, the texture of wood grain, the solidity. The weight dropping from the chest through the legs into the soles", "Anchoring relief — the first moment of stability after the vertigo, tentative but real. The gratitude of feeling something solid", "Deep bass note — sustained, unwavering, a foundation tone. Djembe heartbeat, slow and regular. Acoustic guitar in open D tuning, simple pattern repeating like a mantra", "EN", "steady"), durationSeconds: 240 },
  { number: 3, title: "Cinco Sentidos", description: "Cinco coisas que vejo, quatro que toco, três que ouço.", lang: "PT", energy: "steady", prompt: vidaPrompt("Eyes scanning the room deliberately — the blue of the curtain, the crack in the ceiling. Fingers touching the fabric of the chair, the cool metal of a ring", "Methodical tenderness — the patience of re-entering reality one sense at a time. The beauty of the mundane as the only anchor you have", "Five distinct instrument entries, one at a time — bell, scratched guiro, wooden flute, silence with breath, bass note. Each layer remains, building gently. Marimba providing steady ground", "PT", "steady"), durationSeconds: 240 },
  { number: 4, title: "Here", description: "Just here. Just now. Nothing else required.", lang: "EN", prompt: vidaPrompt("The body finally still — not frozen, but resting in one place, one moment. The awareness of the chair holding your weight, the air entering without effort", "Profound simplicity — the radical act of being exactly where you are and needing nothing else. Peace as the absence of resistance", "Singing bowl resonance — one strike, long decay. Field recording of a quiet room — clock, distant traffic. Almost no melody — just presence in sound. Warm pad like the room itself breathing", "EN"), durationSeconds: 240 },
  { number: 5, title: "Pedra no Bolso", description: "Uma pedra lisa no bolso — o chão que levas contigo.", lang: "PT", energy: "steady", flavor: "marrabenta", prompt: vidaPrompt("The thumb rubbing the smooth stone inside the pocket — the weight of it, the warmth it absorbs from the body. Walking through a crowd with this secret anchor", "Grounded warmth — the comfort of a talisman, the body calmed by something it can touch. The wisdom of carrying your own ground", "Timbila marimba — warm, wooden, marrabenta groove that feels like steady walking. Shaker like stones in a pouch. Bass guitar round, thumb-plucked. Vocal conversational and close", "PT", "steady", "marrabenta"), durationSeconds: 240 },
  { number: 6, title: "Solid", description: "The ground is back. You are standing. It holds.", lang: "EN", energy: "steady", prompt: vidaPrompt("Standing with both feet planted, weight even, shoulders back — not bracing but resting in the body's own architecture. The floor trustworthy again", "Quiet triumph — the steady confidence of having survived the shaking and found stillness. Solidity as an emotional state", "Upright bass arco — one long rich resonant note that sustains. Drums with steady four-on-the-floor kick. Rhodes piano chords warm and stable. Cello joining for the final verse", "EN", "steady"), durationSeconds: 300 },
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
  ESPIRITUAL_PRECE,
  ESPIRITUAL_CENTELHA,
  ESPIRITUAL_VASTIDAO,
  ESPIRITUAL_MAOS_ABERTAS,
  ESPIRITUAL_CATEDRAL,
  ESPIRITUAL_GRAO,
  ESPIRITUAL_MESMA_AGUA,
  ESPIRITUAL_ALEM_NOME,
  ESPIRITUAL_RESPIRAR,
  ESPIRITUAL_ENTREGA,
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
