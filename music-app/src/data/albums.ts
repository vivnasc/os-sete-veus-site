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
 * 47 albums:
 * - 7 Espelhos (1 por veu)
 * - 7 Nos (1 por veu)
 * - 1 Livro filosofico
 * - 20 Cursos (1 por curso)
 * - 10 Espirituais (coleccao Espiritual — mix albums, espiritualidade crua, corporal, sem religiao)
 * - 22 Vida (a vida inteira — do acordar ao adormecer)
 */

// Modo vocal — solo (Loranne só, default) ou duet (Loranne + voz masculina)
// No dueto, Loranne é SEMPRE predominante: refrões, versos principais, abertura e fecho.
// A voz masculina entra nos versos alternados, bridges, harmonizações, ou respostas.
export type VocalMode = "solo" | "duet";

export type AlbumTrack = {
  number: number;
  title: string;
  description: string;
  lang: "PT" | "EN";
  energy: TrackEnergy;
  flavor: TrackFlavor | null;
  vocalMode: VocalMode;
  prompt: string;
  lyrics: string;
  durationSeconds: number;
  audioUrl: string | null;
};

// Internal type for track definitions (lyrics applied at export via applyLyrics)
// energy defaults to "whisper" if omitted — retrocompativel com todas as faixas existentes
// flavor defaults to null if omitted (no flavor modifier)
// vocalMode defaults to "solo" if omitted
type TrackDef = Omit<AlbumTrack, "lyrics" | "energy" | "flavor" | "vocalMode"> & { lyrics?: string; energy?: TrackEnergy; flavor?: TrackFlavor | null; vocalMode?: VocalMode };
type AlbumDef = Omit<Album, "tracks"> & { tracks: TrackDef[] };

// Lyrics are stored in separate files to keep this file manageable
import { ESPELHO_LYRICS } from "./lyrics-espelhos";
import { NO_LYRICS } from "./lyrics-nos";
import { LIVRO_LYRICS, CURSO_LYRICS } from "./lyrics-livro-cursos";
import { ESPIRITUAL_LYRICS } from "./lyrics-espirituais";
import { VIDA_LYRICS } from "./lyrics-vida";
import { COSMIC_LYRICS } from "./lyrics-cosmic";
import { ROMANCE_LYRICS } from "./lyrics-romance";

const ALL_LYRICS: Record<string, string> = {
  ...ESPELHO_LYRICS,
  ...NO_LYRICS,
  ...LIVRO_LYRICS,
  ...CURSO_LYRICS,
  ...ESPIRITUAL_LYRICS,
  ...VIDA_LYRICS,
  ...COSMIC_LYRICS,
  ...ROMANCE_LYRICS,
};

function getLyrics(albumSlug: string, trackNumber: number): string {
  return ALL_LYRICS[`${albumSlug}/${trackNumber}`] || "";
}

export type Album = {
  slug: string;
  title: string;
  subtitle: string;
  product: "espelho" | "no" | "livro" | "curso" | "espiritual" | "vida" | "cosmic" | "romance";
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
// afrobeat: afrobeat/afropop — ritmo africano que o Suno gera bem
// bossa: bossa nova — suave, intimo, brasileiro/lusofono
// jazz: jazz contemporaneo — intimo, improvisado, noturno
// folk: folk acustico — guitarra, voz crua, terroso
// house: house/dance, four-on-the-floor, como "Nada Me Faltara"
// gospel: gospel/espiritual, coral, como um hino de igreja
export type TrackFlavor = "organic" | "marrabenta" | "afrobeat" | "bossa" | "jazz" | "folk" | "house" | "gospel";

const ENERGY_STYLES: Record<TrackEnergy, string> = {
  whisper: "Contemporary organic-electronic, AwakeSoul. Warm female vocals with poetic lyrics. Soft synth pads, piano, subtle percussion, strings. Intimate, contemplative, transformative. No autotune. Clean vocal production.",
  steady: "Contemporary organic-electronic. Warm female vocals with poetic lyrics. Mid-tempo groove, grounded rhythm, acoustic guitar, warm bass, light percussion, piano accents. Walking pace, present, embodied. No autotune. Clean vocal production.",
  pulse: "Contemporary pop-electronic, empowering. Strong female vocals with conviction. Driving beat, rhythmic synths, bass-forward, claps, energy builds. Upbeat, momentum, forward motion. Great for running or driving. No autotune. Clean vocal production.",
  anthem: "Contemporary empowerment anthem. Powerful female vocals, declarative, full-chested. Big chorus, layered vocals, driving drums, rising strings, synth stabs. Bold, celebratory, unstoppable. Stadium energy meets intimacy. No autotune. Clean vocal production.",
  raw: "Stripped-back emotional. Raw female vocals, close-mic, imperfect beauty. Minimal production — solo piano or guitar, breath sounds, silence as instrument. Vulnerable, unpolished, real. No autotune. Clean vocal production.",
};

// ─────────────────────────────────────────────
// Voz masculina — identidade vocal coerente
// ─────────────────────────────────────────────
// A voz masculina é UMA personagem vocal constante (como Loranne é a feminina).
// Características fixas: barítono quente, ligeiramente rouco, poético, íntimo.
// Nunca grita. Nunca domina. Canta com Loranne, nunca sobre ela.
// Loranne: refrões, versos principais, abertura/fecho.
// Voz masculina: versos alternados, bridges, harmonizações de resposta, backing low harmonies.
//
// Referências sonoras: Hozier (intimidade), James Blake (vulnerabilidade electrónica),
// Salvador Sobral (suavidade poética), Bon Iver (textura quente).
// ─────────────────────────────────────────────

const MALE_VOCAL_IDENTITY = "Warm baritone male vocal, slightly husky, poetic and intimate. Same male voice throughout — consistent tone, never aggressive, never dominant. Sings in dialogue with the lead female vocal, entering on alternate verses, bridges, or low harmonies. Female vocal is ALWAYS predominant — she leads every chorus and opens/closes the song. Male vocal adds depth, never competes. No autotune. Clean vocal production.";

const ENERGY_STYLES_DUET: Record<TrackEnergy, string> = {
  whisper: `Contemporary organic-electronic, AwakeSoul. Warm female vocals leading with poetic lyrics, warm baritone male vocal entering on bridges and low harmonies. ${MALE_VOCAL_IDENTITY} Soft synth pads, piano, subtle percussion, strings. Intimate, contemplative, transformative.`,
  steady: `Contemporary organic-electronic. Warm female vocals leading with poetic lyrics, warm baritone male vocal on alternate verses and harmonies. ${MALE_VOCAL_IDENTITY} Mid-tempo groove, grounded rhythm, acoustic guitar, warm bass, light percussion, piano accents. Walking pace, present, embodied.`,
  pulse: `Contemporary pop-electronic, empowering. Strong female vocals leading with conviction, warm baritone male vocal responding on verses and bridges. ${MALE_VOCAL_IDENTITY} Driving beat, rhythmic synths, bass-forward, claps, energy builds. Upbeat, momentum, forward motion.`,
  anthem: `Contemporary empowerment anthem. Powerful female vocals leading, declarative, full-chested. Warm baritone male vocal in call-and-response and bridge sections. ${MALE_VOCAL_IDENTITY} Big chorus, layered vocals, driving drums, rising strings, synth stabs. Bold, celebratory, unstoppable.`,
  raw: `Stripped-back emotional. Raw female vocals leading, close-mic, imperfect beauty. Warm baritone male vocal on alternate verses, raw and exposed. ${MALE_VOCAL_IDENTITY} Minimal production — solo piano or guitar, breath sounds, silence as instrument. Vulnerable, unpolished, real.`,
};

// Modificadores de sabor — só aplicados quando o sabor não é"organic"
const FLAVOR_MODIFIERS: Record<TrackFlavor, string> = {
  organic: "",
  marrabenta: "Marrabenta Mozambican groove, Neyma style, guitar-driven danceable rhythm, shaker percussion, warm bass, joyful and grounded.",
  afrobeat: "Afrobeat influence, Afropop groove, syncopated guitar, talking drum patterns, warm bass groove, danceable West African feel, joyful and grounded.",
  bossa: "Bossa nova influence, gentle nylon guitar, soft brushed drums, warm upright bass, intimate Brazilian feel, swaying rhythm, velvet vocal tone.",
  jazz: "Contemporary jazz influence, Rhodes piano, walking bass, brushed cymbals, smoky intimate club feel, improvised phrasing, late-night warmth.",
  folk: "Acoustic folk influence, fingerpicked guitar, warm earthy tone, stomps and claps, storytelling vocal, campfire intimacy, raw and grounded.",
  house: "House music influence, four-on-the-floor kick, deep bass, hi-hat groove, synth stabs, club warmth, dance-floor energy, infectious rhythmic drive.",
  gospel: "Gospel-inspired, choir harmonies, hand claps, organ warmth, uplifting spiritual energy, community singing feel, call-and-response vocals, celebratory, transcendent.",
};

function buildPromptWithFlavor(basePrompt: string, flavor: TrackFlavor | null): string {
  if (!flavor) return basePrompt;
  const mod = FLAVOR_MODIFIERS[flavor];
  // Flavor goes FIRST so it's not cut off by style condensing (200 char limit)
  return mod ? `${mod} ${basePrompt}` : basePrompt;
}

// Retrocompatibilidade: BASE_STYLE = whisper (o default anterior)
const BASE_STYLE = ENERGY_STYLES.whisper;

function cosmicPrompt(theme: string, emotion: string, production: string, lang: "PT" | "EN", energy: TrackEnergy = "whisper", flavor: TrackFlavor | null = null): string {
  const langNote = lang === "PT" ? "Lyrics in Portuguese." : "Lyrics in English.";
  return buildPromptWithFlavor(`${ENERGY_STYLES[energy]} ${langNote} Cosmic, vast, ethereal but grounded. Body as portal to the infinite. ${emotion}. ${production}. Theme: ${theme}.`, flavor);
}

function romancePrompt(theme: string, emotion: string, production: string, lang: "PT" | "EN", energy: TrackEnergy = "whisper", flavor: TrackFlavor | null = null): string {
  const langNote = lang === "PT" ? "Lyrics in Portuguese." : "Lyrics in English.";
  return buildPromptWithFlavor(`${ENERGY_STYLES[energy]} ${langNote} Intimate, raw, body-centred. Love as lived experience — specific, sensory, no clichés. ${emotion}. ${production}. Theme: ${theme}.`, flavor);
}

function espelhoPrompt(theme: string, emotion: string, production: string, lang: "PT" | "EN", energy: TrackEnergy = "whisper", flavor: TrackFlavor | null = null): string {
  const langNote = lang === "PT" ? "Lyrics in Portuguese." : "Lyrics in English.";
  return buildPromptWithFlavor(`${ENERGY_STYLES[energy]} ${langNote} ${emotion}. ${production}. Theme: ${theme}.`, flavor);
}

function noPrompt(theme: string, emotion: string, production: string, lang: "PT" | "EN", energy: TrackEnergy = "whisper", flavor: TrackFlavor | null = null): string {
  const langNote = lang === "PT" ? "Lyrics in Portuguese." : "Lyrics in English.";
  return buildPromptWithFlavor(`${ENERGY_STYLES[energy]} ${langNote} Duet energy, two vocal textures in dialogue. ${emotion}. ${production}. Theme: ${theme}.`, flavor);
}

function cursoPrompt(theme: string, emotion: string, production: string, lang: "PT" | "EN", energy: TrackEnergy = "whisper", flavor: TrackFlavor | null = null): string {
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
    { number: 4, title: "O Estômago Sabe", description: "Quando o corpo fala primeiro", lang: "PT", energy: "pulse", flavor: "afrobeat", prompt: espelhoPrompt("gut feeling, body alarm, visceral knowledge", "visceral, urgent, body-driven", "low bass pulse, driving organic percussion, rising intensity, body-felt", "PT", "pulse", "afrobeat"), durationSeconds: 240, audioUrl: null },
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
  { number: 3, title: "Duas Mulheres", description: "Mae e filha, frente a frente", lang: "PT", energy: "raw", flavor: "folk", prompt: noPrompt("two women face to face, mother and daughter, raw meeting", "raw, vulnerable, brave, painfully honest", "two vocal textures meeting, tentative harmony, stripped production", "PT", "raw", "folk"), durationSeconds: 240 },
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
  { number: 3, title: "Herança Financeira", description: "O dinheiro da tua familia", lang: "PT", energy: "steady", flavor: "jazz", prompt: cursoPrompt("family money story, inherited beliefs about wealth", "ancestral, complex, untangling patterns", "deep pad, ancestral vocal texture, untangling melodic lines", "PT", "steady", "jazz"), durationSeconds: 240 },
  { number: 4, title: "Abundance", description: "Receber sem culpa", lang: "EN", prompt: cursoPrompt("deserving abundance, receiving without guilt", "opening, generous, golden, permission", "opening warm melody, flowing golden textures, abundance feeling", "EN"), durationSeconds: 240 },
  { number: 5, title: "Novo Espelho", description: "O reflexo que escolhes", lang: "PT", energy: "anthem", prompt: cursoPrompt("new mirror, the reflection you choose", "clear, chosen, golden peace, resolution", "clear golden tones, chosen vocal melody, peaceful resolution", "PT", "anthem"), durationSeconds: 300 },
]);

const CURSO_SANGUE_SEDA = cursoAlbum("curso-sangue-seda", "sangue-e-seda", "Sangue e Seda", "A tua mãe, a tua história", "Árvore das Raízes Visíveis", [
  { number: 1, title: "Raizes", description: "O que veio antes de ti", lang: "PT", energy: "steady", flavor: "folk", prompt: cursoPrompt("roots, what came before you, ancestral ground", "deep red, ancient, grounding", "deep bass, rich strings, root-like grounding sounds", "PT", "steady", "folk"), durationSeconds: 240 },
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
  { number: 1, title: "Mapa do Corpo", description: "O corpo como paisagem desconhecida", lang: "PT", energy: "steady", flavor: "bossa", prompt: cursoPrompt("body map, the body as unknown landscape to explore", "exploratory, somatic, discovering, curious", "body-percussion-like textures, exploring melody, somatic awareness", "PT", "steady", "bossa"), durationSeconds: 240 },
  { number: 2, title: "Skin Memory", description: "O que a pele guardou", lang: "EN", prompt: cursoPrompt("skin memory, what the body stored and kept", "tactile, remembered, stored sensations surfacing", "textural intimate sounds, memory-like melody, touch and warmth", "EN"), durationSeconds: 240 },
  { number: 3, title: "Habitar", description: "Voltar a viver no corpo", lang: "PT", energy: "steady", flavor: "bossa", prompt: cursoPrompt("inhabiting, returning to live in the body again", "embodied, present, grounded, arrived", "grounded rhythm, inhabited vocal, fully present production", "PT", "steady", "bossa"), durationSeconds: 240 },
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
// Tracks inlined from source albums — no ESP_* source albums, no pick() helper
// ─────────────────────────────────────────────

// Duet modifier — appended to prompt when vocalMode = "duet"
const DUET_MODIFIER = "Male and female vocal duet. Female voice dominant (lead), warm deep male voice on verses marked [Male] or [Both]. Natural chemistry, two perspectives, intimate dialogue. Not a backing vocal — a real second voice with weight.";

function spiritualPrompt(theme: string, emotion: string, production: string, lang: "PT" | "EN", energy: TrackEnergy = "whisper", flavor: TrackFlavor | null = null, vocal: VocalMode = "solo"): string {
  const langNote = lang === "PT" ? "Lyrics in Portuguese." : "Lyrics in English.";
  const duetNote = vocal === "duet" ? ` ${DUET_MODIFIER}` : "";
  return buildPromptWithFlavor(`${ENERGY_STYLES[energy]} ${langNote} Sacred but not religious, body-centred, breath as prayer.${duetNote} ${emotion}. ${production}. Theme: ${theme}.`, flavor);
}

const TRAVESSIA: AlbumDef = { slug: "travessia", title: "Travessia", subtitle: "Do amanhecer ao escuro — o dia inteiro da alma", product: "espiritual", color: "#c9a96e", tracks: [
  { number: 1, title: "Manhã", description: "O primeiro gesto do dia, antes do mundo entrar", lang: "PT", energy: "whisper", prompt: spiritualPrompt("first gesture of the day, before the world enters", "dawn, tender, quiet ceremony, waking", "soft morning piano, gentle light textures, quiet vocal, dawn pads", "PT", "whisper"), durationSeconds: 240, audioUrl: null },
  { number: 2, title: "The Space Between Breaths", description: "A pausa onde o sagrado mora", lang: "EN", energy: "whisper", prompt: spiritualPrompt("the gap between breaths where the sacred lives", "suspended, sacred, liminal, infinite pause", "suspended pads, breath sounds, liminal space, barely there percussion", "EN", "whisper"), durationSeconds: 240, audioUrl: null },
  { number: 3, title: "Terra", description: "Pés na lama — o sagrado é raiz", lang: "PT", energy: "steady", flavor: "marrabenta", prompt: spiritualPrompt("feet in mud, sacred is dirt and root", "earthy, grounded, primal, joyful connection to soil", "warm acoustic guitar groove, earth percussion, warm grounded vocal", "PT", "steady", "marrabenta"), durationSeconds: 240, audioUrl: null },
  { number: 4, title: "Holy Rage", description: "Anger as fuel, not poison — the fire that says NO", lang: "EN", energy: "raw", prompt: spiritualPrompt("sacred anger, righteous rage that protects, the fire that says NO", "fierce, righteous, burning, protective fury", "raw fierce vocal, aggressive drums, fire textures, righteous energy", "EN", "raw"), durationSeconds: 250, audioUrl: null },
  { number: 5, title: "Mergulho", description: "Mergulhar — imersão total, renascimento pela água", lang: "PT", energy: "pulse", prompt: spiritualPrompt("diving under, full immersion, rebirth through water", "submerged, reborn, total immersion, underwater", "underwater textures, diving rhythm, submerged vocal, rebirth building", "PT", "pulse"), durationSeconds: 240, audioUrl: null },
  { number: 6, title: "As Que Vieram Antes", description: "As mulheres que vieram antes de ti — a sabedoria nos teus ossos", lang: "PT", energy: "anthem", flavor: "gospel", prompt: spiritualPrompt("ancestors, the women who came before you, their wisdom in your bones", "ancestral, powerful, inherited strength, lineage", "gospel choir building, ancestral drums, anthem vocal, lineage power", "PT", "anthem", "gospel"), durationSeconds: 300, audioUrl: null },
  { number: 7, title: "Still", description: "Quietude como prática — não paz, disciplina", lang: "EN", energy: "whisper", prompt: spiritualPrompt("stillness as practice, not peace but discipline", "disciplined, still, practiced, held silence", "minimal production, held notes, disciplined vocal, practiced stillness", "EN", "whisper"), durationSeconds: 240, audioUrl: null },
  { number: 8, title: "Queimou", description: "O que ardeu — sem romantizar a perda", lang: "PT", energy: "raw", prompt: spiritualPrompt("what burned down, not romanticizing loss, ash reality", "devastated, honest, ash-covered, raw loss", "raw devastated vocal, ash textures, honest stripped production, burnt", "PT", "raw"), durationSeconds: 250, audioUrl: null },
  { number: 9, title: "First Green", description: "O primeiro verde — tão frágil que quase não é", lang: "EN", energy: "anthem", prompt: spiritualPrompt("first green shoot, so fragile it almost isn't, new life from ash", "fragile, emerging, tender-strong, first-life", "building from silence, emerging vocal, tender strings growing, anthem of fragility", "EN", "anthem"), durationSeconds: 280, audioUrl: null },
  { number: 10, title: "Respira", description: "A oração que vem antes da linguagem", lang: "PT", energy: "raw", prompt: spiritualPrompt("breathing as prayer, exhaustion before language", "exhausted, raw, desperate breath, surrendering", "close-mic breathing, minimal piano, raw vocal, silence as space", "PT", "raw"), durationSeconds: 240, audioUrl: null },
  { number: 11, title: "Dark Moon", description: "Sacred darkness — what grows when you stop fighting the dark", lang: "EN", energy: "whisper", prompt: spiritualPrompt("sacred darkness, the night as teacher, moon cycles, the body's tides", "dark, receptive, lunar, restful darkness", "dark ambient pads, lunar textures, whisper vocal, night sounds", "EN", "whisper"), durationSeconds: 260, audioUrl: null },
]};

const HUMUS: AlbumDef = { slug: "humus", title: "Húmus", subtitle: "O que cai se transforma — o fértil debaixo da cinza", product: "espiritual", color: "#8b7355", tracks: [
  { number: 1, title: "Fazer a Cama", description: "Alisar o caos da noite — o primeiro gesto de intenção", lang: "PT", energy: "whisper", prompt: spiritualPrompt("making the bed as sacred act, smoothing chaos into order each morning", "gentle, intentional, morning order, quiet ceremony", "soft piano, gentle textures, whisper vocal, morning light pads", "PT", "whisper"), durationSeconds: 240, audioUrl: null },
  { number: 2, title: "Barefoot", description: "Caminhar sem armadura — pele na terra", lang: "EN", energy: "steady", prompt: spiritualPrompt("walking barefoot, skin on earth, unarmoured presence", "vulnerable, present, connected, bare", "acoustic guitar, walking rhythm, bare production, earth textures", "EN", "steady"), durationSeconds: 240, audioUrl: null },
  { number: 3, title: "Sal", description: "Lágrimas e mar — o mesmo sal", lang: "PT", energy: "raw", prompt: spiritualPrompt("tears and ocean share the same salt, grief connects", "raw, salty, oceanic grief, shared tears", "raw vocal, ocean textures, salt-thick production, grief and connection", "PT", "raw"), durationSeconds: 250, audioUrl: null },
  { number: 4, title: "Trust the Dark", description: "Confiar na escuridão por onde cais", lang: "EN", energy: "whisper", prompt: spiritualPrompt("trusting darkness you're falling through, faith without sight", "trusting, dark, blind faith, surrender", "dark pads, trust textures, whisper vocal, falling through darkness", "EN", "whisper"), durationSeconds: 240, audioUrl: null },
  { number: 5, title: "Vertical", description: "A coluna como eixo — entre terra e céu", lang: "PT", energy: "pulse", prompt: spiritualPrompt("spine as axis between earth and heaven, vertical being", "vertical, aligned, energized, axis", "driving vertical rhythm, spine-like bass, aligned vocal, ascending energy", "PT", "pulse"), durationSeconds: 240, audioUrl: null },
  { number: 6, title: "Empty Cup", description: "Não podes dar do vazio — a verdade da depleção", lang: "EN", energy: "raw", prompt: spiritualPrompt("can't pour from empty, truth of depletion", "depleted, honest, empty, needing to receive first", "raw depleted vocal, empty textures, honest production, sparse", "EN", "raw"), durationSeconds: 240, audioUrl: null },
  { number: 7, title: "Cai Sobre Mim", description: "A graça que cai como chuva — tu ficas parada", lang: "PT", energy: "steady", flavor: "gospel", prompt: spiritualPrompt("grace falling like rain, just standing there receiving", "receiving, open, rained upon, standing in grace", "gospel organ warmth, rain textures, steady receiving vocal, choir hum", "PT", "steady", "gospel"), durationSeconds: 270, audioUrl: null },
  { number: 8, title: "Compost", description: "A beleza podre — o que apodrece alimenta", lang: "EN", energy: "steady", prompt: spiritualPrompt("rotting beauty, what decomposes feeds, compost as teacher", "decomposing, nourishing, ugly-beautiful, fertile rot", "earthy bass, decomposing textures, steady organic rhythm, fertile vocal", "EN", "steady"), durationSeconds: 240, audioUrl: null },
  { number: 9, title: "Chama", description: "A chama que és — não metáfora, presença", lang: "PT", energy: "anthem", flavor: "gospel", prompt: spiritualPrompt("you are the flame, not metaphor but presence, eternal fire-self", "blazing, present, eternal, flame-as-self", "gospel choir fire, organ blaze, anthem vocal, eternal flame building, transcendent", "PT", "anthem", "gospel"), durationSeconds: 300, audioUrl: null },
  { number: 10, title: "Debaixo", description: "O que cresce no escuro — a semente que não vês", lang: "PT", energy: "whisper", prompt: spiritualPrompt("what grows in the dark, the seed you cannot see, underground faith", "underground, patient, invisible growth, dark faith", "subterranean bass, patient piano, underground vocal, dark growing textures", "PT", "whisper"), durationSeconds: 260, audioUrl: null },
]};

const FOLEGO: AlbumDef = { slug: "folego", title: "Fôlego", subtitle: "Entre o inspirar e o expirar — tudo o que cabe num sopro", product: "espiritual", color: "#7a9b8e", tracks: [
  { number: 1, title: "Inspira", description: "O ar que entra — receber o mundo", lang: "PT", energy: "whisper", prompt: spiritualPrompt("inhale, receiving the world, air entering the body", "receiving, expanding, gentle, air-as-gift", "breath-synced pads, expanding vocal, inhale textures, gentle piano", "PT", "whisper"), durationSeconds: 240, audioUrl: null },
  { number: 2, title: "Threshold", description: "Cada porta é passagem — cada entrada, uma escolha", lang: "EN", energy: "steady", prompt: spiritualPrompt("every doorway is a passage, every entrance a choice", "liminal, aware, choosing, conscious entry", "steady walking rhythm, door-like resonance, aware vocal, threshold textures", "EN", "steady"), durationSeconds: 240, audioUrl: null },
  { number: 3, title: "Bicho", description: "O animal em ti que sabe antes de pensares", lang: "PT", energy: "raw", prompt: spiritualPrompt("the animal self, instinct before thought, wild knowing", "primal, instinctive, raw, untamed", "raw vocal growl, primal percussion, stripped production, animal energy", "PT", "raw"), durationSeconds: 240, audioUrl: null },
  { number: 4, title: "Storm Prayer", description: "Rezar no meio da tempestade, não depois", lang: "EN", energy: "pulse", vocalMode: "duet", prompt: spiritualPrompt("praying in the storm, not after it, worship in chaos", "urgent, stormy, fierce, wild prayer", "driving rain textures, urgent rhythm, fierce vocal, storm energy", "EN", "pulse", "organic", "duet"), durationSeconds: 240, audioUrl: null },
  { number: 5, title: "Mãos Vazias", description: "Mãos vazias — nada para segurar. E chega.", lang: "PT", energy: "steady", prompt: spiritualPrompt("empty hands, nothing to hold, and it's enough", "empty, sufficient, peaceful emptiness, released", "open acoustic guitar, empty-handed vocal, steady lightness, space", "PT", "steady"), durationSeconds: 240, audioUrl: null },
  { number: 6, title: "Unanswered", description: "When the sky says nothing back", lang: "EN", energy: "whisper", flavor: "organic", prompt: spiritualPrompt("praying into silence, no answer, staying anyway", "lonely, persistent, faith-without-proof, waiting", "sparse pads, breath textures, distant piano, vast empty space", "EN", "whisper", "organic"), durationSeconds: 240, audioUrl: null },
  { number: 7, title: "Dança", description: "O corpo em movimento como oração — pés na terra, quadris que rezam", lang: "PT", energy: "pulse", flavor: "marrabenta", prompt: spiritualPrompt("dance as prayer, body moving without thinking, feet on earth, hips remembering", "ecstatic, grounded, rhythmic prayer, body-led worship", "acoustic guitar driving, body percussion, ecstatic vocal, dance-prayer rhythm", "PT", "pulse", "marrabenta"), durationSeconds: 260, audioUrl: null },
  { number: 8, title: "Ember", description: "A brasa que não apaga — pequena mas viva", lang: "EN", energy: "whisper", prompt: spiritualPrompt("the ember that won't die, small but alive, irreducible flame", "glowing, persistent, small-but-alive, ember-warmth", "warm glowing pads, persistent vocal, ember textures, small fire piano", "EN", "whisper"), durationSeconds: 250, audioUrl: null },
  { number: 9, title: "Hum", description: "O som antes da palavra — o hum que tudo contém", lang: "PT", energy: "anthem", flavor: "gospel", prompt: spiritualPrompt("the sound before the word, the hum that contains everything, primordial vibration", "primordial, vibrating, everything-and-nothing, transcendent hum", "gospel choir humming, organ drone, primordial vibration, building to transcendence", "PT", "anthem", "gospel"), durationSeconds: 300, audioUrl: null },
  { number: 10, title: "Expira", description: "Largar o ar — largar o que já não serves", lang: "PT", energy: "steady", prompt: spiritualPrompt("exhale, releasing what no longer serves, letting go through breath", "releasing, lightening, exhale-as-surrender, letting-go", "exhale textures, releasing vocal, lightening pads, steady falling rhythm", "PT", "steady"), durationSeconds: 240, audioUrl: null },
]};

const DEMORA: AlbumDef = { slug: "demora", title: "Demora", subtitle: "A coragem de ficar — devagar, devagar", product: "espiritual", color: "#6b8a7a", tracks: [
  { number: 1, title: "A Testemunha", description: "A parte de ti que observa sem julgar — o céu que vê a tempestade", lang: "PT", energy: "steady", prompt: spiritualPrompt("the witness, the part that watches without judging, consciousness itself", "observing, still, witnessing, sky-mind", "steady grounded bass, observing vocal, witness textures, still presence", "PT", "steady"), durationSeconds: 250, audioUrl: null },
  { number: 2, title: "Softening", description: "A armadura cai — não por fraqueza, por prontidão", lang: "EN", energy: "whisper", prompt: spiritualPrompt("armour falling away, not weakness but readiness, softening", "softening, yielding, ready, tender strength", "soft dissolving pads, tender vocal, melting textures, warmth arriving", "EN", "whisper"), durationSeconds: 240, audioUrl: null },
  { number: 3, title: "O Vazio Cheio", description: "O vazio que na verdade está cheio", lang: "PT", energy: "raw", prompt: spiritualPrompt("emptiness that is actually full, paradox of silence", "paradoxical, full-empty, profound, surprising", "raw vocal in empty space, paradox textures, fullness emerging from nothing", "PT", "raw"), durationSeconds: 240, audioUrl: null },
  { number: 4, title: "Walking", description: "Not arriving — just the way. Each step a prayer.", lang: "EN", energy: "steady", prompt: spiritualPrompt("walking as meditation, not going somewhere but being in the going", "meditative, grounded, rhythmic, step-prayer", "walking rhythm, steady acoustic guitar, meditative vocal, ground textures", "EN", "steady"), durationSeconds: 240, audioUrl: null },
  { number: 5, title: "Pede", description: "O pedido que sai do peito antes da vergonha", lang: "PT", energy: "raw", flavor: "organic", prompt: spiritualPrompt("the raw cry from the chest before shame catches up", "desperate, unfiltered, chest-cracking, first cry", "close-mic raw vocal, solo piano, breath sounds, silence between phrases", "PT", "raw", "organic"), durationSeconds: 240, audioUrl: null },
  { number: 6, title: "Hands", description: "Palmas abertas, a receber o nada e o tudo", lang: "EN", energy: "whisper", prompt: spiritualPrompt("open palms receiving nothing and everything", "receptive, open, tender, empty-full", "soft piano, gentle pads, open space, breath textures", "EN", "whisper"), durationSeconds: 240, audioUrl: null },
  { number: 7, title: "Incendio Manso", description: "Arder sem pressa — a transformacao lenta", lang: "PT", energy: "steady", flavor: "jazz", prompt: spiritualPrompt("burning slowly, gentle fire, transformation without violence", "warm, patient, transforming, slow burn", "warm acoustic guitar groove, warm shaker, dancing flame rhythm, grounded joy", "PT", "steady", "jazz"), durationSeconds: 270, audioUrl: null },
  { number: 8, title: "Breathless", description: "Quando o ar falta — o corpo que grita para viver", lang: "EN", energy: "pulse", prompt: spiritualPrompt("breathless, when air is missing, the body screaming to live", "urgent, gasping, desperate, alive-through-lack", "urgent driving rhythm, gasping vocal, desperate textures, life-force pulse", "EN", "pulse"), durationSeconds: 240, audioUrl: null },
  { number: 9, title: "Árvore", description: "Tu és a árvore — enraizada e a crescer", lang: "PT", energy: "anthem", prompt: spiritualPrompt("you are the tree, rooted and reaching, growing upward", "majestic, rooted, reaching, tree-strong", "rising anthem production, rooted bass, reaching vocal, tree-strength strings", "PT", "anthem"), durationSeconds: 300, audioUrl: null },
  { number: 10, title: "Wash", description: "Lavar — não culpa, apenas deixar a água levar", lang: "EN", energy: "steady", prompt: spiritualPrompt("washing, not guilt, letting water carry away what's done", "cleansing, releasing, flowing away, water taking", "flowing water rhythm, cleansing vocal, releasing textures, steady flow", "EN", "steady"), durationSeconds: 240, audioUrl: null },
  { number: 11, title: "Fecho os Olhos", description: "O ritual de voltar a ti", lang: "PT", energy: "raw", prompt: spiritualPrompt("closing your eyes, the ritual of returning to yourself", "inward, intimate, returning, self-meeting", "raw close vocal, minimal piano, breath sounds, inward silence", "PT", "raw"), durationSeconds: 270, audioUrl: null },
]};

const CORPO_CELESTE: AlbumDef = { slug: "corpo-celeste", title: "Corpo Celeste", subtitle: "A pele feita de estrelas — o universo que respira em ti", product: "espiritual", color: "#8aaaca", tracks: [
  { number: 1, title: "Oceano", description: "Olhar para algo tao grande que as palavras param", lang: "PT", energy: "whisper", flavor: "organic", prompt: spiritualPrompt("facing the ocean, words stopping, smallness as relief", "oceanic, dissolved, overwhelmed, relieved", "vast pads, ocean textures, distant vocal, immense space", "PT", "whisper", "organic"), durationSeconds: 270, audioUrl: null },
  { number: 2, title: "Stained Glass", description: "Light coming through the cracks — not broken, illuminated", lang: "EN", energy: "steady", flavor: "organic", prompt: spiritualPrompt("light through cracks, not broken but illuminated, stained glass body", "luminous, fractured, beautiful, light-through-wounds", "warm steady rhythm, light textures, prismatic pads, gentle revelation", "EN", "steady", "organic"), durationSeconds: 240, audioUrl: null },
  { number: 3, title: "Costelas", description: "As costelas como arcos de catedral — protegem o que e sagrado", lang: "PT", energy: "raw", flavor: "organic", prompt: spiritualPrompt("ribs as cathedral arches, protecting the sacred heart, bone as architecture", "protective, structural, tender, architectural", "raw vocal, minimal production, bone-like percussion, hollow resonance", "PT", "raw", "organic"), durationSeconds: 240, audioUrl: null },
  { number: 4, title: "Hymn of Skin", description: "The skin remembers every touch — a living hymn", lang: "EN", energy: "pulse", flavor: "marrabenta", prompt: spiritualPrompt("skin as hymnal, touch as prayer, the body's memory of every hand", "tactile, remembering, alive, sacred surface", "acoustic guitar pulse, shaker rhythm, skin percussion, dancing hymn", "EN", "pulse", "marrabenta"), durationSeconds: 240, audioUrl: null },
  { number: 5, title: "Poeira de Estrelas", description: "Es feita do mesmo material que o universo", lang: "PT", energy: "steady", flavor: "organic", prompt: spiritualPrompt("stardust in the body, the universe in the cells, cosmic belonging", "cosmic, humble, connected, ancient", "warm bass, celestial pads, steady groove, starlight textures", "PT", "steady", "organic"), durationSeconds: 240, audioUrl: null },
  { number: 6, title: "Terrified and Free", description: "The vertigo of vastness — falling into the infinite", lang: "EN", energy: "raw", flavor: "organic", prompt: spiritualPrompt("vertigo of the infinite, terror and freedom at once", "terrified, liberated, falling, dissolving", "raw vocal with reverb, dissonant piano, vast empty production, vertigo textures", "EN", "raw", "organic"), durationSeconds: 240, audioUrl: null },
  { number: 7, title: "Sangue e Lua", description: "O corpo que sangra e volta — ciclos, marés, estações na carne", lang: "PT", energy: "steady", prompt: spiritualPrompt("menstruation, tides, seasons in the flesh, the sacred in what bleeds and returns", "cyclical, lunar, embodied, rhythmic blood", "steady lunar rhythm, tidal bass, embodied vocal, cycle textures", "PT", "steady"), durationSeconds: 260, audioUrl: null },
  { number: 8, title: "Small", description: "Being small is not a problem — it is the answer", lang: "EN", energy: "whisper", flavor: "organic", prompt: spiritualPrompt("smallness as wisdom, being tiny as liberation, not insignificant but free", "tiny, free, wise, surrendered", "minimal piano, breath space, gentle vocal, intimate vastness", "EN", "whisper", "organic"), durationSeconds: 240, audioUrl: null },
  { number: 9, title: "Cabe Tudo", description: "Dentro do peito cabe o universo inteiro", lang: "PT", energy: "anthem", flavor: "gospel", prompt: spiritualPrompt("the chest containing the entire universe, inner vastness", "expansive, full, overflowing, sacred", "gospel choir rising, anthem vocal, organ swells, universe-in-the-chest", "PT", "anthem", "gospel"), durationSeconds: 300, audioUrl: null },
  { number: 10, title: "The Mirror", description: "Looking at yourself — really looking. Not fixing. Just seeing.", lang: "EN", energy: "raw", prompt: spiritualPrompt("looking at yourself in the mirror, really looking, not fixing, the courage of your own face", "raw, honest, unflinching, self-meeting", "raw close vocal, mirror silence, honest minimal production, bare", "EN", "raw"), durationSeconds: 240, audioUrl: null },
]};

const CORRENTEZA: AlbumDef = { slug: "correnteza", title: "Correnteza", subtitle: "O que corre em ti já correu em todas", product: "espiritual", color: "#5a8a9b", tracks: [
  { number: 1, title: "Fonte", description: "A nascente — onde a água começa, antes de ter nome", lang: "PT", energy: "whisper", prompt: spiritualPrompt("the spring where water begins, before it's named", "emerging, pure, beginning, source", "spring water textures, emerging piano, source vocal, pure beginning", "PT", "whisper"), durationSeconds: 240, audioUrl: null },
  { number: 2, title: "Same River", description: "O rio que corre em ti corre em todas", lang: "EN", energy: "steady", prompt: spiritualPrompt("the river that runs through you runs through everyone, shared current", "connected, flowing, communal, same-water", "steady flowing rhythm, connected vocal, river bass, communal warmth", "EN", "steady"), durationSeconds: 240, audioUrl: null },
  { number: 3, title: "Não Mereci", description: "O choque de receber o que não ganhaste", lang: "PT", energy: "raw", prompt: spiritualPrompt("shock of receiving what you didn't earn, undeserved grace", "stunned, overwhelmed, grateful shock, unearned", "raw vocal, sparse piano, stunned silence, emotion breaking through", "PT", "raw"), durationSeconds: 240, audioUrl: null },
  { number: 4, title: "Freefall", description: "O momento de largar — não paz, vertigem", lang: "EN", energy: "pulse", prompt: spiritualPrompt("moment of letting go, not peace but vertigo, freefall", "vertiginous, falling, exhilarating terror, released", "falling synth textures, vertigo rhythm, released vocal, freefall production", "EN", "pulse"), durationSeconds: 240, audioUrl: null },
  { number: 5, title: "Dar", description: "O gesto de dar — simples, não heroico", lang: "PT", energy: "steady", prompt: spiritualPrompt("the gesture of giving, simple not heroic", "simple, generous, warm, grounded giving", "warm steady rhythm, simple vocal, giving textures, acoustic warmth", "PT", "steady"), durationSeconds: 240, audioUrl: null },
  { number: 6, title: "Communion", description: "Não pão e vinho — apenas estar na mesma sala com a verdade", lang: "EN", energy: "steady", flavor: "gospel", prompt: spiritualPrompt("not bread and wine, just being in the same room with truth", "communal, truthful, together, shared presence", "gospel warmth, communal vocal, shared rhythm, truth presence", "EN", "steady", "gospel"), durationSeconds: 240, audioUrl: null },
  { number: 7, title: "Uma Só", description: "A gota que percebe que é rio", lang: "PT", energy: "whisper", prompt: spiritualPrompt("a single drop realizing it is the river, shared humanity", "tender, dissolving, belonging, water-one", "soft flowing piano, water textures, whisper vocal, dissolving pads", "PT", "whisper"), durationSeconds: 240, audioUrl: null },
  { number: 8, title: "Tributary", description: "Cada vida é um afluente — nenhuma corre sozinha", lang: "EN", energy: "pulse", flavor: "marrabenta", prompt: spiritualPrompt("every life a tributary, none flows alone, rivers converging", "joyful, converging, rhythmic, dancing rivers meeting", "warm acoustic guitar, flowing rhythm, joyful converging vocal, river dance", "EN", "pulse", "marrabenta"), durationSeconds: 240, audioUrl: null },
  { number: 9, title: "Desaguar", description: "Onde todas as águas se encontram — o fim que é início", lang: "PT", energy: "anthem", prompt: spiritualPrompt("where all waters meet, estuary, the end that is beginning", "vast, arriving, communal, oceanic gathering", "building anthem, ocean swell, arriving vocal, communal strings, vast", "PT", "anthem"), durationSeconds: 300, audioUrl: null },
  { number: 10, title: "Água nas Mãos", description: "Lavar as mãos — lavar o que passou", lang: "PT", energy: "whisper", prompt: spiritualPrompt("washing hands as ritual, water carrying away what's done", "cleansing, light, flowing, releasing", "water textures, flowing piano, light vocal, cleansing pads", "PT", "whisper"), durationSeconds: 240, audioUrl: null },
]};

const O_QUE_RESTA: AlbumDef = { slug: "o-que-resta", title: "O Que Resta", subtitle: "Quando se tira tudo — o essencial não se veste", product: "espiritual", color: "#c4745a", tracks: [
  { number: 1, title: "Nave", description: "O centro do corpo — onde o eco vive", lang: "PT", energy: "whisper", flavor: "organic", prompt: spiritualPrompt("the nave of the body, the centre where the echo lives, inner architecture", "cavernous, sacred, resonant, internal", "reverberant vocal, cathedral pads, resonant bass, acoustic space", "PT", "whisper", "organic"), durationSeconds: 240, audioUrl: null },
  { number: 2, title: "Listen", description: "O silêncio não é ausência — é outra forma de ouvir", lang: "EN", energy: "steady", prompt: spiritualPrompt("silence as different listening, not absence but attention", "attentive, listening, hearing the unheard, present", "subtle textures emerging from silence, attentive vocal, listening production", "EN", "steady"), durationSeconds: 240, audioUrl: null },
  { number: 3, title: "Tira Tudo", description: "Tira o nome, o papel, a roupa, a história — o que fica?", lang: "PT", energy: "raw", prompt: spiritualPrompt("strip everything away, name role clothes history, what remains", "stripped, exposed, essential, nothing-left", "raw stripped vocal, removal textures, bare production, essential silence", "PT", "raw"), durationSeconds: 240, audioUrl: null },
  { number: 4, title: "Lit", description: "The moment the match strikes — something changes forever", lang: "EN", energy: "pulse", flavor: "house", prompt: spiritualPrompt("the match striking, the moment of ignition, irreversible change", "ignited, irreversible, electric, awakened", "house kick building, synth sparks, driving energy, vocal catching fire", "EN", "pulse", "house"), durationSeconds: 240, audioUrl: null },
  { number: 5, title: "Faisca", description: "Antes da chama — o instante antes de perceber", lang: "PT", energy: "whisper", flavor: "organic", prompt: spiritualPrompt("the instant before understanding, the spark before flame", "anticipatory, electric, pre-awakening, on the edge", "quiet tension, rising pads, whisper vocal, tiny percussion sparks", "PT", "whisper", "organic"), durationSeconds: 240, audioUrl: null },
  { number: 6, title: "Still Burning", description: "Depois de tudo — ainda ardes", lang: "EN", energy: "pulse", prompt: spiritualPrompt("after everything, still burning, inextinguishable, refusal to die", "defiant, burning, inextinguishable, fierce-alive", "driving fire rhythm, burning vocal, inextinguishable energy, fierce pulse", "EN", "pulse"), durationSeconds: 240, audioUrl: null },
  { number: 7, title: "Osso", description: "O osso debaixo da carne — o que és antes de tudo", lang: "PT", energy: "steady", flavor: "marrabenta", prompt: spiritualPrompt("bone beneath flesh, what you are before everything, irreducible self", "essential, bone-deep, irreducible, primal structure", "deep organic bone rhythm, essential groove, deep vocal, primal structure bass", "PT", "steady", "marrabenta"), durationSeconds: 240, audioUrl: null },
  { number: 8, title: "Not God", description: "Não Deus, não universo, não energia — o que resta", lang: "EN", energy: "raw", prompt: spiritualPrompt("not God, not universe, not energy, what remains when all names fail", "stripping, honest, raw negation, arriving at nameless", "stripped raw vocal, negation textures, honest minimal piano, silence", "EN", "raw"), durationSeconds: 240, audioUrl: null },
  { number: 9, title: "Altar", description: "O altar e aqui — dentro de ti, nao num edificio", lang: "PT", energy: "anthem", flavor: "organic", prompt: spiritualPrompt("the altar is inside, not in a building, you are the sacred space", "consecrated, powerful, self-sacred, declared", "anthem vocal rising, layered voices, building drums, declaration of inner sanctity", "PT", "anthem", "organic"), durationSeconds: 300, audioUrl: null },
  { number: 10, title: "Cala", description: "A ordem para calar — mas gentil, como o mar depois da onda", lang: "PT", energy: "whisper", prompt: spiritualPrompt("command to be silent, gentle like sea after wave", "hushing, gentle command, settling, ocean calm", "ocean-like pads, gentle shushing textures, settling vocal, wave sounds", "PT", "whisper"), durationSeconds: 240, audioUrl: null },
  { number: 11, title: "Unearned", description: "A beleza do que nunca foi devido", lang: "EN", energy: "whisper", prompt: spiritualPrompt("beauty of what was never owed, unearned gifts", "grateful, humbled, beautiful, undeserved beauty", "gentle piano arpeggios, grateful vocal, light strings, beauty textures", "EN", "whisper"), durationSeconds: 240, audioUrl: null },
]};

const LIMIAR: AlbumDef = { slug: "limiar", title: "Limiar", subtitle: "Entre a raiz e o céu — o lugar onde tudo muda", product: "espiritual", color: "#ab9375", tracks: [
  { number: 1, title: "Raiz", description: "Raízes — profundas, escuras, necessárias", lang: "PT", energy: "steady", prompt: spiritualPrompt("roots deep dark necessary, invisible foundation", "deep, rooted, foundational, dark earth", "deep bass, root textures, grounded vocal, earth rhythm", "PT", "steady"), durationSeconds: 240, audioUrl: null },
  { number: 2, title: "Both", description: "Ser raiz e céu ao mesmo tempo", lang: "EN", energy: "steady", prompt: spiritualPrompt("being root and sky simultaneously, no contradiction", "dual, harmonious, complete, both-at-once", "dual melody layers, harmonious production, complete vocal, root-and-sky", "EN", "steady"), durationSeconds: 240, audioUrl: null },
  { number: 3, title: "Segurar", description: "A exaustão de segurar tudo — antes da queda", lang: "PT", energy: "raw", prompt: spiritualPrompt("exhaustion of holding everything, before the fall", "exhausted, gripping, desperate, about to break", "tense raw vocal, gripping textures, exhaustion in production, tension bass", "PT", "raw"), durationSeconds: 240, audioUrl: null },
  { number: 4, title: "Surface", description: "Quebrar a superfície — a inspiração do renascido", lang: "EN", energy: "raw", prompt: spiritualPrompt("breaking the surface, gasping, alive, reborn", "gasping, alive, reborn, raw emergence", "surface-breaking textures, gasping vocal, raw alive production, air rushing", "EN", "raw"), durationSeconds: 270, audioUrl: null },
  { number: 5, title: "Rio", description: "Tornar-se o rio — não nadar, fluir", lang: "PT", energy: "steady", prompt: spiritualPrompt("becoming the river, not swimming but flowing", "flowing, surrendered, becoming, river-self", "flowing water textures, river rhythm, becoming vocal, fluid production", "PT", "steady"), durationSeconds: 270, audioUrl: null },
  { number: 6, title: "Open Hands", description: "Mãos abertas — não dar tudo, oferecer", lang: "EN", energy: "whisper", prompt: spiritualPrompt("hands open, not giving away but offering", "offering, gentle, present, open", "gentle open pads, offering vocal, tender production, hands-open space", "EN", "whisper"), durationSeconds: 270, audioUrl: null },
  { number: 7, title: "Chuva", description: "Ficar na chuva de braços abertos — baptismo sem igreja", lang: "PT", energy: "anthem", prompt: spiritualPrompt("standing in rain with arms open, letting it wash, rain as baptism without church", "open, washed, baptismal, receiving rain", "building rain textures, anthem vocal, baptismal swell, open sky production", "PT", "anthem"), durationSeconds: 280, audioUrl: null },
  { number: 8, title: "Sky Inside", description: "O céu não está acima — está no teu peito", lang: "EN", energy: "whisper", prompt: spiritualPrompt("sky not above but inside your chest, inner vastness", "vast, interior, expansive, sky-inside", "expansive pads, sky textures, whisper vocal, chest resonance", "EN", "whisper"), durationSeconds: 240, audioUrl: null },
  { number: 9, title: "De Joelhos", description: "Não submissão — escolher o chão", lang: "PT", energy: "steady", prompt: spiritualPrompt("kneeling by choice, choosing the ground, humility as strength", "grounded, chosen, strong in lowness, dignified", "warm bass, steady rhythm, grounded vocal, acoustic guitar", "PT", "steady"), durationSeconds: 240, audioUrl: null },
  { number: 10, title: "Alquimia", description: "A cozinha como laboratório — mãos que transformam o cru", lang: "PT", energy: "steady", flavor: "bossa", prompt: spiritualPrompt("cooking as alchemy, hands transforming raw into nourishment, kitchen as sacred lab", "warm, transformative, nourishing, kitchen ceremony", "warm acoustic guitar, kitchen rhythms, warm vocal, spice textures", "PT", "steady", "bossa"), durationSeconds: 250, audioUrl: null },
]};

const O_CIRCULO: AlbumDef = { slug: "o-circulo", title: "O Círculo", subtitle: "Não estás sozinha — a dor tem eco, o eco tem nome", product: "espiritual", color: "#baaacc", tracks: [
  { number: 1, title: "Sem Nome", description: "O que sentes quando os nomes todos falham", lang: "PT", energy: "whisper", prompt: spiritualPrompt("what you feel when every name fails, the nameless sacred", "awed, speechless, nameless, beyond language", "vast quiet pads, speechless vocal, nameless space, beyond-words production", "PT", "whisper"), durationSeconds: 260, audioUrl: null },
  { number: 2, title: "Bones Know", description: "The body prays in a language the mind forgot", lang: "EN", energy: "pulse", flavor: "organic", prompt: spiritualPrompt("the body remembering prayer the mind forgot, bones as memory", "embodied, pulsing, ancient, cellular memory", "driving heartbeat bass, body percussion, rhythmic vocal, pulse building", "EN", "pulse", "organic"), durationSeconds: 240, audioUrl: null },
  { number: 3, title: "Desamparo", description: "O lugar onde ninguem chega — e rezas na mesma", lang: "PT", energy: "steady", flavor: "gospel", prompt: spiritualPrompt("helplessness as holy ground, praying from the floor", "abandoned, grounded, humble, still praying", "gospel organ warmth, steady low rhythm, grounded vocal, communal hum", "PT", "steady", "gospel"), durationSeconds: 270, audioUrl: null },
  { number: 4, title: "Bread", description: "Partir pão — a comunhão mais simples", lang: "EN", energy: "steady", prompt: spiritualPrompt("breaking bread, simplest communion, nourishment as sacred", "warm, nourishing, communal, simple", "warm acoustic guitar, steady gentle rhythm, nourishing vocal, bread warmth", "EN", "steady"), durationSeconds: 240, audioUrl: null },
  { number: 5, title: "Sozinha Não", description: "O momento em que percebes que não estás só", lang: "PT", energy: "raw", prompt: spiritualPrompt("realizing you're not alone, shock of belonging", "shocked, belonging, raw realization, not-alone", "raw vocal breaking, belonging textures, realization in production, raw", "PT", "raw"), durationSeconds: 240, audioUrl: null },
  { number: 6, title: "Enough", description: "The radical act of being enough without being everything", lang: "EN", energy: "anthem", flavor: "gospel", prompt: spiritualPrompt("being enough without being everything, sufficiency as revolution", "sufficient, radical, peaceful, declared", "gospel choir building, anthem declaration, organ swells, communal enough", "EN", "anthem", "gospel"), durationSeconds: 300, audioUrl: null },
  { number: 7, title: "Um", description: "Um — so um. E isso basta.", lang: "PT", energy: "raw", flavor: "organic", prompt: spiritualPrompt("being one, just one, and that being enough", "singular, humble, sufficient, essential", "raw solo vocal, silence, one piano note, breath", "PT", "raw", "organic"), durationSeconds: 240, audioUrl: null },
  { number: 8, title: "Sand", description: "A grain of sand that held the whole beach in its stillness", lang: "EN", energy: "whisper", flavor: "organic", prompt: spiritualPrompt("a grain of sand containing the beach, stillness holding everything", "still, contained, infinite-in-small, patient", "soft pads, sand textures, minimal whisper vocal, gentle percussion", "EN", "whisper", "organic"), durationSeconds: 240, audioUrl: null },
  { number: 9, title: "Nós", description: "'Nós' — o plural que salva, vozes juntas", lang: "PT", energy: "anthem", flavor: "gospel", prompt: spiritualPrompt("we, the plural that saves, voices together", "collective, powerful, together, saving plural", "gospel choir building, anthem vocal, together rhythm, collective power", "PT", "anthem", "gospel"), durationSeconds: 300, audioUrl: null },
  { number: 10, title: "A Ultima Prece", description: "Nao pedir nada — so ficar", lang: "PT", energy: "raw", flavor: "organic", prompt: spiritualPrompt("the last prayer is not asking, just staying, just being present", "surrendered, final, peaceful desperation, presence", "raw vocal fading, minimal piano, long silences, breath as instrument", "PT", "raw", "organic"), durationSeconds: 300, audioUrl: null },
]};

const O_GESTO: AlbumDef = { slug: "o-gesto", title: "O Gesto", subtitle: "O sagrado que vive no quotidiano — no osso, no grão, no gesto", product: "espiritual", color: "#c08aaa", tracks: [
  { number: 1, title: "Catedral Interior", description: "A catedral por dentro — sem paredes, sem tecto", lang: "PT", energy: "whisper", prompt: spiritualPrompt("cathedral inside, no walls, no roof, just infinite space", "vast, interior, sacred space, limitless", "vast reverb, cathedral space, whisper vocal, infinite pads", "PT", "whisper"), durationSeconds: 270, audioUrl: null },
  { number: 2, title: "Hold", description: "O momento em que seguras — o espaço entre", lang: "EN", energy: "raw", prompt: spiritualPrompt("holding breath, the space between inhale and exhale, suspended", "suspended, held, tense-tender, between", "suspended silence, held vocal, tension textures, between-breaths production", "EN", "raw"), durationSeconds: 230, audioUrl: null },
  { number: 3, title: "Amém do Corpo", description: "O amém que não se diz — sente-se", lang: "PT", energy: "raw", prompt: spiritualPrompt("the body's own amen, not spoken but felt in bones", "visceral, affirming, bodily truth, physical prayer", "raw close vocal, body percussion, heartbeat bass, minimal", "PT", "raw"), durationSeconds: 270, audioUrl: null },
  { number: 4, title: "Fogo Dentro", description: "O fogo que não destrói — o sagrado em chamas", lang: "PT", energy: "anthem", flavor: "gospel", prompt: spiritualPrompt("the fire within that doesn't destroy, sacred blaze", "blazing, sacred, powerful, transcendent fire", "gospel choir, organ warmth, blazing vocal, fire energy, building power", "PT", "anthem", "gospel"), durationSeconds: 300, audioUrl: null },
  { number: 5, title: "Servir", description: "Servir sem custar a alma — alegria no dar", lang: "PT", energy: "steady", flavor: "marrabenta", prompt: spiritualPrompt("service that doesn't cost your soul, joy in giving", "joyful, generous, rhythmic, service as dance", "joyful organic rhythm, generous vocal, dancing service, warm bass", "PT", "steady", "marrabenta"), durationSeconds: 240, audioUrl: null },
  { number: 6, title: "Grão", description: "Um grão — pequeno, parte do todo. O amém é sussurro.", lang: "PT", energy: "raw", prompt: spiritualPrompt("a grain, tiny, part of the whole, amen as whisper not stadium", "tiny, humble, part-of-whole, collective whisper", "minimal raw vocal, grain-like textures, tiny humble production, whisper amen", "PT", "raw"), durationSeconds: 270, audioUrl: null },
  { number: 7, title: "Ainda Brilha", description: "A centelha que sobrevive ao escuro", lang: "PT", energy: "anthem", flavor: "organic", prompt: spiritualPrompt("the spark surviving darkness, still glowing after everything", "resilient, luminous, defiant, still alive", "building anthem vocal, rising strings, layered chorus, triumphant warmth", "PT", "anthem", "organic"), durationSeconds: 300, audioUrl: null },
  { number: 8, title: "Pertencer", description: "Nao es o centro — es parte. E isso e melhor.", lang: "PT", energy: "steady", flavor: "organic", prompt: spiritualPrompt("not the centre but part of everything, belonging without importance", "belonging, humble, part-of-whole, relieved", "warm bass groove, communal pads, steady rhythm, grounded vocal", "PT", "steady", "organic"), durationSeconds: 270, audioUrl: null },
  { number: 9, title: "O Buraco no Meio", description: "O vazio que nenhum nome tapa — e que não precisa de ser tapado", lang: "PT", energy: "steady", prompt: spiritualPrompt("the hole in the centre no name covers, sacred void, not needing to be filled", "hollow, sacred, accepting, void-as-home", "hollow resonant bass, accepting vocal, void textures, steady grounded rhythm", "PT", "steady"), durationSeconds: 250, audioUrl: null },
  { number: 10, title: "Respiro", description: "A respiração que não controlas — o corpo que sabe", lang: "PT", energy: "steady", flavor: "house", prompt: spiritualPrompt("the breath you don't control, the body that knows, automatic sacred", "trusting, automatic, body-knowing, rhythmic breath", "four-on-the-floor breath rhythm, house warmth, trusting vocal, body-knowing groove", "PT", "steady", "house"), durationSeconds: 270, audioUrl: null },
  { number: 11, title: "Despir o Dia", description: "Remover a roupa, remover o dia — o corpo devolve-se", lang: "PT", energy: "whisper", prompt: spiritualPrompt("undressing at end of day, removing clothes removing the day, unmasking", "releasing, evening, undressing, returning to self", "soft evening piano, releasing pads, whisper vocal, night arriving", "PT", "whisper"), durationSeconds: 250, audioUrl: null },
]};


// VIDA (22 albums)
// A vida inteira — do acordar ao adormecer,
// do treino ao banho, da raiva ao amor.
// Uma mulher pode viver um dia inteiro
// e nunca sair do universo da Loranne.
// ─────────────────────────────────────────────

function vidaPrompt(theme: string, emotion: string, production: string, lang: "PT" | "EN", energy: TrackEnergy = "whisper", flavor: TrackFlavor | null = null): string {
  const langNote = lang === "PT" ? "Lyrics in Portuguese." : "Lyrics in English.";
  return buildPromptWithFlavor(`${ENERGY_STYLES[energy]} ${langNote} Music for living — the soundtrack of a body moving through a real day. Not about feelings, inside them. ${emotion}. ${production}. Theme: ${theme}.`, flavor);
}

function vidaPromptDuet(theme: string, emotion: string, production: string, lang: "PT" | "EN", energy: TrackEnergy = "whisper", flavor: TrackFlavor | null = null): string {
  const langNote = lang === "PT" ? "Lyrics in Portuguese." : "Lyrics in English.";
  return buildPromptWithFlavor(`${ENERGY_STYLES_DUET[energy]} ${langNote} Music for living — duet energy, two voices sharing the same moment. Female vocal leads, male vocal responds and deepens. ${emotion}. ${production}. Theme: ${theme}.`, flavor);
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
  { number: 3, title: "Suor Sagrado", description: "O suor lava o que as palavras não conseguem.", lang: "PT", energy: "pulse", flavor: "marrabenta", prompt: vidaPrompt("sweat dripping from the jaw, shirt soaked, muscles burning with holy fire, the body purifying itself through effort", "sacred exertion, the cleansing power of hard physical work, almost ritualistic", "warm acoustic guitar patterns driving the rhythm, timbila-style wooden percussion, heavy bass groove, call-and-response vocal shouts, shakers and rattles building intensity, polyrhythmic layers stacking", "PT", "pulse", "marrabenta"), durationSeconds: 240 },
  { number: 4, title: "Breathless", description: "Os pulmões ardem e o corpo agradece.", lang: "EN", energy: "anthem", prompt: vidaPrompt("lungs on fire at peak effort, chest heaving, heart pounding in the ears, the beautiful violence of pushing past comfort into the red zone", "triumphant breathlessness, the ecstasy of maximum effort where pain becomes pleasure", "massive anthemic drums with stadium energy, distorted bass drops, soaring strings over a relentless beat, breath samples chopped rhythmically, epic build-and-release dynamics, choir-like synth swells", "EN", "anthem"), durationSeconds: 240 },
  { number: 5, title: "Mais Uma", description: "A voz que diz mais uma quando o corpo diz basta.", lang: "PT", energy: "pulse", flavor: "house", prompt: vidaPrompt("one more rep with shaking arms, one more hill with burning quads, the internal voice that refuses to let you quit, teeth gritted, hands gripping", "stubborn defiance against your own limits, the addictive edge of pushing through", "driving house beat with aggressive bassline, percussive vocal stabs repeating like a mantra, snare rolls building tension, acid synth lines cutting through, relentless four-to-the-floor energy with Portuguese crowd chants", "PT", "pulse", "house"), durationSeconds: 240 },
  { number: 6, title: "The Wall", description: "O muro aparece. Tu não paras.", lang: "EN", energy: "raw", vocalMode: "duet", prompt: vidaPromptDuet("hitting the wall at kilometre thirty, legs like concrete, vision narrowing, the body screaming stop while something deeper says keep going — his voice is the deeper thing, the grit underneath her exhaustion", "gritty defiance, raw survival instinct, ugly beautiful perseverance when everything wants to quit. Male vocal raw and close, almost spoken, like an internal voice of resistance", "stripped-back heavy drums with industrial edge, distorted bass like dragging chains, minimal arrangement that feels like depleted energy. Female vocal leads the struggle, male vocal enters on second verse almost whispered, raw and gravelly, then both voices on final chorus — hers soaring over his low drone", "EN", "raw"), durationSeconds: 240 },
  { number: 7, title: "Descarga", description: "A explosão de quem deu tudo e soltou.", lang: "PT", energy: "anthem", flavor: "marrabenta", prompt: vidaPrompt("the explosive release after maximum effort, arms thrown wide, scream of victory, the body emptied and electric, every cell vibrating", "volcanic release, pure cathartic joy, the roar after the finish line, triumphant and primal", "warm acoustic guitar erupting into full celebration, massive drum break with timbila and djembe, brass section blaring triumphant melodies, call-and-response chanting building to euphoric peak, bass shaking the floor", "PT", "anthem", "marrabenta"), durationSeconds: 240 },
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
  { number: 3, title: "Mãos Ocupadas", description: "Mãos que trabalham enquanto a mente descansa.", lang: "PT", energy: "steady", flavor: "folk", prompt: vidaPrompt("hands kneading dough or sanding wood or typing or sewing, the mind freed by the occupation of the fingers", "industrious calm, the meditative peace of hands that know their craft, rhythmic and grounded", "warm acoustic guitar pattern steady and hypnotic, light timbila percussion creating a work rhythm, acoustic bass walking steadily, hand claps like tools hitting surfaces", "PT", "steady", "folk"), durationSeconds: 240 },
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
  { number: 6, title: "Daybreak", description: "O dia começa no corpo e o corpo quer mover-se.", lang: "EN", energy: "steady", flavor: "jazz", prompt: vidaPrompt("the body beginning to want movement, shoulders rolling, neck stretching, the first real energy arriving in the legs, the morning air hitting the face", "joyful readiness to begin, the body's morning appetite for life, optimistic and physical and real", "warm acoustic guitar bright as morning sun, light hand percussion like the body waking up piece by piece, walking bass line with optimistic intervals, shakers like dew shaking off leaves", "EN", "steady", "jazz"), durationSeconds: 300 },
]);

const VIDA_PAO_SAL = vidaAlbum("vida-pao-sal", "O Pão e o Sal", "casa, cozinha, presença doméstica", "#C9B896", [
  { number: 1, title: "A Mesa Posta", description: "Pôr a mesa como quem prepara uma cerimónia.", lang: "PT", energy: "steady", prompt: vidaPrompt("placing plates one by one on the table, the cloth straightened, glasses aligned, cutlery laid in its proper place", "quiet ceremony in the ordinary, the dignity of domestic preparation, love expressed through placement and order", "gentle acoustic guitar with warm nylon strings, soft hand percussion like plates being set down rhythmically, upright bass walking at the pace of setting a table", "PT", "steady"), durationSeconds: 240 },
  { number: 2, title: "Simmer", description: "O borbulhar gentil da paciência.", lang: "EN", prompt: vidaPrompt("a pot on low heat with the lid slightly ajar, the gentle rhythmic bubbling of something that cannot be rushed, steam rising in slow spirals", "patient anticipation, the meditative quality of slow cooking, trusting the process, warm and unhurried", "soft bubbling textures layered as percussion, warm pad like steam filling a room, very gentle brush work on a snare, muted trumpet playing a melody so slow it almost stops", "EN"), durationSeconds: 240 },
  { number: 3, title: "Tempero", description: "O pequeno gesto que muda tudo.", lang: "PT", energy: "steady", flavor: "bossa", prompt: vidaPrompt("a pinch of salt between thumb and forefinger, the twist of the pepper mill, a squeeze of lemon that transforms everything", "playful precision, the joy of the small thing that changes everything, the cook's quiet confidence", "bright warm acoustic guitar with a playful melodic line, light timbila percussion dancing, hand claps syncopated and alive, acoustic bass grooving with warmth", "PT", "steady", "bossa"), durationSeconds: 240 },
  { number: 4, title: "Flour Hands", description: "Mãos na farinha, mente em silêncio.", lang: "EN", energy: "steady", prompt: vidaPrompt("hands deep in flour and dough, kneading with the heel of the palm, the rhythmic push and fold and turn, white dust on forearms", "absorbed domestic meditation, the ancient satisfaction of hands shaping something that will feed someone, grounded and timeless", "soft rhythmic pattern like kneading, gentle brush percussion, warm acoustic piano playing simple folk-like melody, upright bass keeping the rhythm of hands working", "EN", "steady"), durationSeconds: 240 },
  { number: 5, title: "Cheiro de Casa", description: "O cheiro que é casa, antes de ser lugar.", lang: "PT", prompt: vidaPrompt("the specific smell that means home — bread baking or coffee brewing or onions softening in oil — the smell that lives in the walls", "deep belonging through the nose, the emotion that smell carries more honestly than words, nostalgia that is also presence", "extremely warm and enveloping pad like a smell filling a room, solo acoustic guitar played close-mic, soft humming voice without words", "PT"), durationSeconds: 240 },
  { number: 6, title: "Sunday Meal", description: "A mesa de domingo onde todos cabem.", lang: "EN", energy: "steady", flavor: "gospel", prompt: vidaPrompt("the long table on Sunday with too many chairs squeezed in, plates passed hand to hand, voices overlapping, someone laughing with their mouth full", "warm abundance, the noisy sacred of family at table, generous and imperfect and full of life", "gospel-influenced piano with rich warm chords, soft organ pad underneath, gentle handclaps and tambourine, bass guitar walking with Sunday ease, choir-like vocal harmonies", "EN", "steady", "gospel"), durationSeconds: 300 },
]);

const VIDA_DERIVA = vidaAlbum("vida-deriva", "Deriva", "estrada, viagem, caminhar", "#6B8E8A", [
  { number: 1, title: "A Porta", description: "Fechar a porta e deixar tudo para trás.", lang: "PT", energy: "steady", prompt: vidaPrompt("the sound of the door closing behind you, keys in pocket, the bag on your shoulder, turning away from the familiar and toward the road", "the clean break of departure, the slight ache and slight thrill of leaving, a door closing as a beginning", "a single percussive sound like a door closing to start, then walking bass establishing steady forward motion, gentle acoustic guitar strumming, brushed drums at walking pace", "PT", "steady"), durationSeconds: 240 },
  { number: 2, title: "Open Road", description: "A estrada esticada à frente como uma promessa.", lang: "EN", energy: "pulse", prompt: vidaPrompt("the road stretching ahead with nothing on it but light and distance, foot pressing the accelerator or the stride lengthening, the horizon pulling forward", "expansive freedom, the pulse of movement with no destination more important than the movement itself, open and accelerating", "driving rhythmic guitar riff with open road energy, bass drum like a heartbeat at highway speed, shimmering cymbals like sunlight on tarmac, bass guitar pushing forward", "EN", "pulse"), durationSeconds: 240 },
  { number: 3, title: "Paisagem", description: "A paisagem passa como pensamentos soltos.", lang: "PT", energy: "steady", prompt: vidaPrompt("landscape scrolling past the window — fields becoming hills becoming towns becoming fields again — thoughts loosened by movement drifting like clouds", "gentle detachment, the meditative quality of watching the world move while you sit still", "gentle repetitive guitar pattern like landscape repeating, soft train-like rhythm in the percussion, ambient pads changing colour slowly like scenery shifting, melodica playing a wandering melody", "PT", "steady"), durationSeconds: 240 },
  { number: 4, title: "Miles", description: "A meditação dos quilómetros acumulados.", lang: "EN", energy: "steady", prompt: vidaPrompt("the meditation of accumulated miles, the odometer turning over, the body settling into the rhythm of sustained travel", "patient accumulation, the zen of long-distance travel, each mile adding to something you cannot name but can feel", "steady hypnotic groove with bass and drums locked in for the long haul, electric piano playing sparse chords at wide intervals, pedal steel guitar adding lonesome colour", "EN", "steady"), durationSeconds: 240 },
  { number: 5, title: "Janela Aberta", description: "O vento pela janela aberta e a liberdade no cabelo.", lang: "PT", energy: "pulse", flavor: "bossa", prompt: vidaPrompt("the window rolled down and the wind hitting the face and pulling the hair, the car filling with outside air, shouting something into the wind that nobody can hear", "wild joy, the childlike freedom of wind on skin, the ecstasy of movement and air and not caring", "warm acoustic guitar riff bright and joyful with wind energy, driving percussion with shakers like rushing air, bass guitar bouncing with road rhythm", "PT", "pulse", "bossa"), durationSeconds: 240 },
  { number: 6, title: "Stranger's Town", description: "Chegar a um lugar onde ninguém te conhece.", lang: "EN", energy: "steady", prompt: vidaPrompt("stepping out in a town where nobody knows your name, unfamiliar street signs and different light and the smell of someone else's ordinary life", "curious anonymity, the lightness of being unknown, the world fresh because you have no history with it", "muted trumpet playing a melody like exploring a new street, gentle brushed drums, walking bass at the pace of wandering without a map, ambient textures of an unfamiliar place", "EN", "steady"), durationSeconds: 240 },
  { number: 7, title: "O Regresso", description: "Voltar a casa diferente de quando saíste.", lang: "PT", prompt: vidaPrompt("the familiar road appearing again but looking different because you are different, the door opening to a home that is the same but you are not", "bittersweet return, the quiet transformation that travel leaves in the bones, home recognizable but seen with new eyes", "gentle acoustic guitar returning to the opening melody but with subtle harmonic changes, soft piano joining, sounds of home fading in — a kettle, a familiar creak", "PT"), durationSeconds: 300 },
]);

const VIDA_CORPO_A_CORPO = vidaAlbum("vida-corpo-a-corpo", "Corpo a Corpo", "intimidade, proximidade", "#9B4A5A", [
  { number: 1, title: "Aproximar", description: "Aproximar milímetro a milímetro.", lang: "PT", prompt: vidaPrompt("moving closer millimetre by millimetre across a couch or a bed, the magnetic pull of another body, the electric charge in the shrinking distance", "aching anticipation, the exquisite tension of almost-touching, desire held in suspension", "barely-there bass pulse like a heartbeat heard through someone else's chest, soft Rhodes piano with tremolo, breathy pad textures that swell and recede, the gentlest possible brush on a cymbal", "PT"), durationSeconds: 240 },
  { number: 2, title: "Skin", description: "A pele como primeira e última língua.", lang: "EN", energy: "raw", vocalMode: "duet", prompt: vidaPromptDuet("skin meeting skin for the first time — the shock of warmth, two nervous systems reorganizing around the point of contact, fingertips reading another body like braille. Her perspective, then his — the same touch felt from both sides", "raw vulnerability of first touch, skin as the most honest organ, desire stripped of everything decorative. Male vocal enters second verse — his experience of the same touch, awed and trembling", "raw textured bass with analogue warmth, sparse percussion like a body shifting on sheets, distorted guitar played so softly it becomes a whisper. Female vocal opens — her skin, her shock. Male vocal second verse — his skin answering. Both voices in the bridge, breath overlapping, not harmonising but coexisting", "EN", "raw"), durationSeconds: 240 },
  { number: 3, title: "O Espaço Entre", description: "O espaço carregado entre dois corpos a ponto de se tocarem.", lang: "PT", prompt: vidaPrompt("the charged space between two bodies that are about to touch but haven't yet, the electricity in the gap, the unbearable sweetness of the last centimetre", "suspended desire, the space between as more charged than the contact itself, time stretching and thickening like honey", "tension-building pad with slow harmonic movement, extremely subtle bass throb barely felt in the chest, high-pitched tones like nerve endings firing, silence used as tension", "PT"), durationSeconds: 240 },
  { number: 4, title: "Breath to Breath", description: "Partilhar o ar entre duas bocas.", lang: "EN", energy: "steady", vocalMode: "duet", prompt: vidaPromptDuet("breathing into each other's mouths, foreheads touching, sharing the same air so that your exhale becomes their inhale — two voices literally sharing breath", "tender shared breathing, the intimacy of exchanged air. Two voices synchronising without trying — her inhale, his exhale, then reversed", "two breath-like pads breathing in counterpoint, gentle heartbeat bass pulse steady and warm, soft piano chords appearing on the exhale. Female vocal breathes a phrase, male vocal completes it on the next breath. Voices never overlap — they alternate like actual shared breathing, until the final moment when they sustain one note together", "EN", "steady"), durationSeconds: 240 },
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
  { number: 3, title: "O Punho", description: "A mão fechada dentro do bolso onde ninguém vê.", lang: "PT", energy: "pulse", flavor: "afrobeat", prompt: vidaPrompt("The fist inside the coat pocket — nails pressing crescents into the palm. The body vibrating at a frequency no one else can hear", "Compressed rage seeking any exit — tense, rhythmic, physical. A pressure cooker with the valve sealed", "African-influenced percussion — timbila patterns accelerating subtly. Slapped bass, aggressive and funky. Staccato brass stabs — short, punchy. Vocal percussive, words spat out", "PT", "pulse", "afrobeat"), durationSeconds: 240 },
  { number: 4, title: "Red", description: "When the body fills with fire and the edges of vision blur.", lang: "EN", energy: "raw", vocalMode: "duet", prompt: vidaPromptDuet("Vision narrowing to a tunnel — the flush rising from chest to neck to face. Hands shaking from the sheer voltage of anger. His rage is the same rage — different body, same fire", "Explosive and primal — the moment before the eruption, held one beat too long. Male vocal carries the controlled burn in verse two — deeper, chest-voice, barely contained", "Heavy distorted guitar riff — simple, repetitive, relentless. Double kick drum driving hard. Industrial textures — metal on metal. Female vocal verse one — her red. Male vocal verse two — his red, lower, more guttural. Both voices collide in the bridge, not harmonising but burning side by side. She takes the final word", "EN", "raw"), durationSeconds: 240 },
  { number: 5, title: "Dizer", description: "A boca que finalmente abre e deixa sair tudo.", lang: "PT", energy: "anthem", prompt: vidaPrompt("The mouth opening wide — the first word that was swallowed years ago finally leaving the body. Standing in the kitchen and saying the unsayable", "Triumphant fury — not calm, not polite, but righteous and necessary. The exhilaration of voice reclaimed", "Full band explosion — horns blazing, drums crashing, bass driving forward. Choir of women's voices raw and unpolished. Guitar solo that wails. Vocal belted, no restraint", "PT", "anthem"), durationSeconds: 240 },
  { number: 6, title: "The Cooling", description: "Rage settling into something clear and sharp as glass.", lang: "EN", energy: "steady", prompt: vidaPrompt("The breath slowing after the shout — the hands unclenching, the jaw releasing. The strange lucidity that follows fury, like a landscape after wildfire", "Crystalline calm — not the absence of anger but its transformation into clarity. The cold beauty of seeing everything clearly", "Glass marimba and vibraphone — cool, metallic, precise. Upright bass pizzicato, measured. Brushed drums almost not there. Vocal low and clear, spoken-sung", "EN", "steady"), durationSeconds: 300 },
]);

const VIDA_ANCORA = vidaAlbum("vida-ancora", "Âncora", "ansiedade, pânico, precisar de chão", "#6B5A4A", [
  { number: 1, title: "O Aperto", description: "O peito que fecha e o chão que desaparece.", lang: "PT", energy: "raw", prompt: vidaPrompt("The chest constricting — ribs closing inward like a cage shrinking. The floor tilting beneath the feet, hands reaching for the wall, cold sweat", "Suffocating vertigo — the terror of losing the ground, of the body betraying itself. The loneliness of panic", "Heartbeat kick drum — irregular, too fast, arrhythmic. High-pitched strings trembling, dissonant. Breathing recorded close, hyperventilating. Piano notes scattered like objects falling", "PT", "raw"), durationSeconds: 240 },
  { number: 2, title: "Ground", description: "The moment your feet remember the earth is still there.", lang: "EN", energy: "steady", prompt: vidaPrompt("Bare feet pressing into the floor — feeling the cold tile, the texture of wood grain, the solidity. The weight dropping from the chest through the legs into the soles", "Anchoring relief — the first moment of stability after the vertigo, tentative but real. The gratitude of feeling something solid", "Deep bass note — sustained, unwavering, a foundation tone. Djembe heartbeat, slow and regular. Acoustic guitar in open D tuning, simple pattern repeating like a mantra", "EN", "steady"), durationSeconds: 240 },
  { number: 3, title: "Cinco Sentidos", description: "Cinco coisas que vejo, quatro que toco, três que ouço.", lang: "PT", energy: "steady", prompt: vidaPrompt("Eyes scanning the room deliberately — the blue of the curtain, the crack in the ceiling. Fingers touching the fabric of the chair, the cool metal of a ring", "Methodical tenderness — the patience of re-entering reality one sense at a time. The beauty of the mundane as the only anchor you have", "Five distinct instrument entries, one at a time — bell, scratched guiro, wooden flute, silence with breath, bass note. Each layer remains, building gently. Marimba providing steady ground", "PT", "steady"), durationSeconds: 240 },
  { number: 4, title: "Here", description: "Just here. Just now. Nothing else required.", lang: "EN", prompt: vidaPrompt("The body finally still — not frozen, but resting in one place, one moment. The awareness of the chair holding your weight, the air entering without effort", "Profound simplicity — the radical act of being exactly where you are and needing nothing else. Peace as the absence of resistance", "Singing bowl resonance — one strike, long decay. Field recording of a quiet room — clock, distant traffic. Almost no melody — just presence in sound. Warm pad like the room itself breathing", "EN"), durationSeconds: 240 },
  { number: 5, title: "Pedra no Bolso", description: "Uma pedra lisa no bolso — o chão que levas contigo.", lang: "PT", energy: "steady", flavor: "folk", prompt: vidaPrompt("The thumb rubbing the smooth stone inside the pocket — the weight of it, the warmth it absorbs from the body. Walking through a crowd with this secret anchor", "Grounded warmth — the comfort of a talisman, the body calmed by something it can touch. The wisdom of carrying your own ground", "Timbila marimba — warm, wooden, warm organic groove that feels like steady walking. Shaker like stones in a pouch. Bass guitar round, thumb-plucked. Vocal conversational and close", "PT", "steady", "folk"), durationSeconds: 240 },
  { number: 6, title: "Solid", description: "The ground is back. You are standing. It holds.", lang: "EN", energy: "steady", prompt: vidaPrompt("Standing with both feet planted, weight even, shoulders back — not bracing but resting in the body's own architecture. The floor trustworthy again", "Quiet triumph — the steady confidence of having survived the shaking and found stillness. Solidity as an emotional state", "Upright bass arco — one long rich resonant note that sustains. Drums with steady four-on-the-floor kick. Rhodes piano chords warm and stable. Cello joining for the final verse", "EN", "steady"), durationSeconds: 300 },
]);

const VIDA_COMPANHIA_PROPRIA = vidaAlbum("vida-companhia-propria", "Companhia Própria", "solidão escolhida, estar só sem estar perdida", "#7A7A8B", [
  { number: 1, title: "Mesa para Uma", description: "Uma mesa, uma cadeira, nenhuma pena — só paz.", lang: "PT", energy: "steady", prompt: vidaPrompt("Sitting at a restaurant table alone — the waiter placing one menu, one glass. The posture of someone who chose this, the settled spine of the sovereign", "Dignified contentment — the quiet power of a woman comfortable in her own company. Not defiance, not sadness, just satisfaction", "Bossa nova guitar — gentle, syncopated, the sound of someone dining alone and liking it. Light brush on snare. Soft double bass. Vocal warm and unhurried", "PT", "steady"), durationSeconds: 240 },
  { number: 2, title: "My Own Weather", description: "Being your own climate — rain, sun, wind, all yours.", lang: "EN", prompt: vidaPrompt("The internal weather system — a calm front moving through the chest, clouds clearing without anyone else's intervention", "Self-contained serenity — the atmospheric independence of someone who generates her own warmth, her own storms, her own clearing", "Ambient synth pads — shifting slowly like weather systems. Wind chimes, real not synthetic. Soft rain texture fading in and out. Vocal airy and spacious", "EN"), durationSeconds: 240 },
  { number: 3, title: "O Silêncio Escolhido", description: "O silêncio que escolheste não é o silêncio que te impuseram.", lang: "PT", prompt: vidaPrompt("The phone turned face-down — the decision to not reply, not scroll, not fill the silence. The room quiet because you made it so", "Expansive stillness — silence as sovereignty, not deprivation. The deep peace of distinguishing between suppression and sufficiency", "Almost nothing — a single note on a kora, plucked and left to resonate. Long silences that are part of the composition. Vocal so quiet it's almost thought", "PT"), durationSeconds: 240 },
  { number: 4, title: "Whole Room", description: "Filling the space with just your presence, and it is full.", lang: "EN", energy: "steady", prompt: vidaPrompt("Walking through your own apartment barefoot — touching the walls, sitting in the centre of the room. The space full of you — your books, your scent", "Expansive presence — the sensation of taking up space without apology, of being enough to fill a room", "Warm Rhodes piano — full chords, jazzy and lush. Soft kick drum and brushed hi-hat. Fretless bass smooth and round. Vocal confident and centred. Strings intimate, not cinematic", "EN", "steady"), durationSeconds: 240 },
  { number: 5, title: "Jantar Sozinha", description: "Vela acesa, prato feito com cuidado, toda presente.", lang: "PT", energy: "steady", flavor: "jazz", prompt: vidaPrompt("Lighting a candle for a meal cooked just for yourself — the flame reflected in the wine glass, eating slowly, no screen, no distraction", "Celebratory solitude — the warmth of self-honouring, the revolutionary act of treating yourself as a guest worth cooking for", "warm rhythmic groove — timbila and guitar interweaving, festive but intimate. Shakers and light hand drums. Bass guitar groovy. Vocal playful and close", "PT", "steady", "jazz"), durationSeconds: 240 },
  { number: 6, title: "Enough", description: "The word lands in the chest and stays: you are enough.", lang: "EN", energy: "raw", prompt: vidaPrompt("Sitting on the edge of the bed — the sudden understanding that hits the sternum. The tears that come not from sadness but from finally believing it", "Breakthrough tenderness — the raw emotion of self-acceptance arriving unannounced. The vulnerability of letting the truth in", "Solo piano — rich, full, Chopin-like but modern. Vocal entering raw and unadorned. Cello joins in the second half, a duet. Crescendo that resolves into silence", "EN", "raw"), durationSeconds: 300 },
]);

const VIDA_PORCELANA = vidaAlbum("vida-porcelana", "Porcelana", "ritual, autocuidado, cuidar do corpo", "#D4C4B0", [
  { number: 1, title: "A Água Quente", description: "A primeira gentileza do dia é a água quente na pele cansada.", lang: "PT", prompt: vidaPrompt("Hot water hitting the back of the neck — the head dropping forward, shoulders surrendering to warmth. Steam rising like a cocoon", "Surrendering warmth — the body being held by heat, the first act of kindness in a day that may have had none", "Water sounds — shower, bathtub, the intimacy of indoor water. Soft synth pad like steam. Kalimba slow and sparse. No drums — the rhythm is the water itself", "PT"), durationSeconds: 240 },
  { number: 2, title: "Ceremony", description: "The small daily ritual no one sees but the body remembers.", lang: "EN", prompt: vidaPrompt("The sequence of small acts — opening the jar, the scent rising, the slow application. The mirror, the brush, each gesture deliberate and unhurried", "Sacred mundanity — the elevation of routine into ritual, the body as altar. The quiet devotion of taking care of yourself", "Music box melody — delicate, slightly detuned, nostalgic. Soft pizzicato strings. Gentle finger snaps keeping a slow time. Glass harmonica tones ethereal and fragile", "EN"), durationSeconds: 240 },
  { number: 3, title: "Creme na Pele", description: "Mãos na própria pele — o toque que cuida sem pedir nada.", lang: "PT", energy: "steady", prompt: vidaPrompt("Hands smoothing cream along the forearm — the slow circle on the elbow, the attention given to the knuckles. The body touched by its own hands with intention", "Sensual tenderness — the body tended by itself, the quiet revolution of a woman who touches herself with care", "Nylon guitar, fingerpicked in a bossa nova rhythm. Light congas hand-played. Fretless bass humming. Flute — wooden, breathy, like skin on skin", "PT", "steady"), durationSeconds: 240 },
  { number: 4, title: "The Mirror", description: "Looking without flinching, seeing without cruelty.", lang: "EN", energy: "raw", prompt: vidaPrompt("Standing before the mirror — not the quick glance but the real look. The eyes meeting their own reflection and choosing to be kind, the whole self witnessed", "Courageous vulnerability — the bravery of looking at yourself without the filter of self-hatred", "Solo vocal first — unaccompanied, exposed. Piano enters gently, supporting without leading. Strings swell tender not triumphant. A single mirror-like reverb effect on the vocal", "EN", "raw"), durationSeconds: 240 },
  { number: 5, title: "Cabelo Solto", description: "Soltar o cabelo é soltar o dia, a máscara, o esforço.", lang: "PT", prompt: vidaPrompt("The elastic band pulled from the hair — the weight falling around the shoulders, the scalp tingling with relief. Shaking the head slowly", "Liberation in miniature — the small freedom that signals the end of performing. The sensuality of letting down", "Harp arpeggios — cascading downward like hair falling. Soft wind sound. Vocal breathy and free. Light tambourine. Ambient pad — warm, evening-coloured", "PT"), durationSeconds: 240 },
  { number: 6, title: "Tender", description: "The word becomes a practice: be tender with yourself.", lang: "EN", prompt: vidaPrompt("The hand on your own cheek — the gesture you'd give a child, given to yourself. The word 'tender' placed on the tongue like medicine", "Radical gentleness — tenderness not as weakness but as the most advanced form of strength. The ache of being kind to yourself", "Lullaby piano — simple melody. Soft strings, legato, never louder than the voice. Vocal vulnerable and unguarded. A single oboe line in the bridge, plaintive and beautiful", "EN"), durationSeconds: 300 },
]);

const VIDA_RESCALDO = vidaAlbum("vida-rescaldo", "Rescaldo", "pós-conflito, depois da tempestade", "#8B7A6A", [
  { number: 1, title: "A Manhã Seguinte", description: "A luz frágil que entra na manhã depois da guerra.", lang: "PT", prompt: vidaPrompt("The grey light through the curtain — the body stiff from sleeping tensed, the pillow damp. The kettle as an act of faith, the cup held with both hands", "Fragile dawn — the tentative light after darkness, not yet hope but the end of night. The vulnerability of morning", "Ambient morning texture — distant birds, a kettle. Solo acoustic guitar, fingerpicked, hesitant. Vocal barely audible, morning-rough. Soft cello drone warm but uncertain", "PT"), durationSeconds: 240 },
  { number: 2, title: "Ash", description: "What is left in the ashes is still warm enough to mean something.", lang: "EN", energy: "raw", prompt: vidaPrompt("Fingers sifting through ash — finding the outline of what was, the shape still holding even though the substance burned", "Desolate beauty — the stark honesty of aftermath. The paradox of destruction revealing the essential", "Bowed vibraphone — haunting, metallic. Sparse electronics, glitchy. Vocal raw and close, single take. Low piano notes widely spaced like footsteps in ash", "EN", "raw"), durationSeconds: 240 },
  { number: 3, title: "Desculpa Muda", description: "O pedido de desculpa que não precisa de palavras para chegar.", lang: "PT", energy: "steady", prompt: vidaPrompt("The cup of coffee placed on the table without a word — the hand that finds the other hand in bed before dawn. The blanket pulled over sleeping shoulders", "Tender repair — the language of apology spoken by hands, not mouths. The courage of the first gesture after the silence", "Gentle acoustic guitar and soft accordion — a valsa lenta. Light brushed snare. Bass warm and low. Vocal gentle and careful. A melodica in the background, childlike", "PT", "steady"), durationSeconds: 240 },
  { number: 4, title: "Rebuild", description: "Stone by stone, the bridge comes back — different from before.", lang: "EN", energy: "steady", vocalMode: "duet", prompt: vidaPromptDuet("Hands lifting stone — two people on opposite sides of a river, each laying stones from their end, the bridge meeting in the middle. His hands, her hands, the same stone", "Determined tenderness — the stubborn hope of repair, the choice to rebuild when walking away would be easier. Two voices building trust note by note", "Building layers — starts with a single hand drum, adds bass, adds guitar, adds keys, adds strings. Female vocal starts alone from one bank, male vocal enters from the other — separate melodies that approach, tentatively harmonise, then lock together at the bridge (both musical and metaphorical). She leads the final chorus, he holds the low harmony beneath", "EN", "steady"), durationSeconds: 240 },
  { number: 5, title: "A Cicatriz", description: "A cicatriz não é castigo — é prova de que sobreviveste.", lang: "PT", energy: "raw", prompt: vidaPrompt("The finger tracing the raised line of scar tissue — the body's record of what happened, both wound and healing, both memory of pain and evidence of repair", "Fierce tenderness — the pride that comes from surviving. The reclamation of the scar from shame to honour", "Solo vocal — powerful, exposed. Fado influence in the vocal line. Portuguese guitar bright and piercing. Cello sawing long notes. Percussion only in the final chorus — full, defiant", "PT", "raw"), durationSeconds: 240 },
  { number: 6, title: "New Bridge", description: "A new bridge, not the old one rebuilt — something that was never here before.", lang: "EN", energy: "steady", vocalMode: "duet", prompt: vidaPromptDuet("Walking across something new — the wood still pale, the railing still smooth. Two people standing in the middle, knowing this was chosen, not inherited. His hand on the railing, her feet on the boards", "Hopeful solidity — the quiet confidence of something built with intention. Two voices that chose to be here, not two voices that had to be", "Full band — acoustic guitar, bass, drums, piano, strings — warm and complete. Female vocal carries the verse and chorus. Male vocal enters on verse two — steady, grateful. Both voices walk the melody together in the final chorus, her voice slightly above his. Trumpet playing the last note — golden, open. The ending holds, doesn't fade", "EN", "steady"), durationSeconds: 300 },
]);

const VIDA_OFERENDA = vidaAlbum("vida-oferenda", "Oferenda", "gratidão, o sagrado sem igreja", "#B8960B", [
  { number: 1, title: "Obrigada", description: "A palavra mais simples, dita a sério, com o corpo todo.", lang: "PT", prompt: vidaPrompt("The head bowing slightly — not in submission but in recognition. The word leaving the mouth and meaning everything — thank you to the morning, to the body, to the bread", "Reverent simplicity — the weight of a word when it is truly meant, the body as the organ of gratitude", "Solo voice and mbira — the most stripped-down arrangement. Each mbira note a small offering. Silence between phrases. A single deep bell at the beginning and end", "PT"), durationSeconds: 240 },
  { number: 2, title: "The List", description: "The list that surprises you with how long it turns out to be.", lang: "EN", energy: "steady", prompt: vidaPrompt("Pen on paper — writing what you're grateful for and the list growing beyond the page. The coffee, the friend, the bus that came, the body that woke up", "Accumulating wonder — the surprise of abundance when you start counting, the shift from scarcity to plenty by noticing", "Acoustic guitar strumming — upbeat folk feel. Tambourine and hand claps. Bass bouncing lightly. Vocal energetic, listing, each item a celebration. Glockenspiel adding sparkle", "EN", "steady"), durationSeconds: 240 },
  { number: 3, title: "Mãos no Peito", description: "As mãos no peito sentem o que lá está — e é tanto.", lang: "PT", energy: "steady", flavor: "gospel", prompt: vidaPrompt("Both hands placed flat on the sternum — feeling the heartbeat through the palms. Eyes closing, breath deepening, discovering what the heart holds", "Sacred intimacy — the body as temple without needing a temple. The overwhelming fullness of what lives inside when you finally stop to feel it", "Gospel piano — rich chords, call and response. Hammond organ swelling. Choir of women's voices — not a church choir but a kitchen choir. Clapping on the off-beat", "PT", "steady", "gospel"), durationSeconds: 240 },
  { number: 4, title: "Grace", description: "Grace before the meal of being alive — no god required.", lang: "EN", prompt: vidaPrompt("The pause before eating — hands in lap, eyes on the plate. The recognition that this food came from somewhere, that this moment is not automatic but miraculous", "Hushed reverence — the sacred without religion, gratitude without performance. The intimate holiness of a meal eaten in awareness", "Fingerpicked classical guitar — Bach-like arpeggios. Vocal close and quiet, spoken-sung. Soft harmonics on the guitar. Ambient room tone — the sound of a kitchen at peace", "EN"), durationSeconds: 240 },
  { number: 5, title: "O Que Tenho", description: "O que tenho agora, neste instante, já é tanto.", lang: "PT", energy: "steady", flavor: "folk", prompt: vidaPrompt("Looking around the room and seeing it as if for the first time — the chair, the window, the light, the hands in your lap. The inventory of the present", "Joyful recognition — the celebration of what is, not what could be, the party of the present. African warmth of gratitude that dances", "Full warm organic — timbila leading, electric guitar in the Mozambican style. Bass driving. Shakers, djembe, congas. Vocal joyful and rhythmic. Brass adding celebration", "PT", "steady", "folk"), durationSeconds: 240 },
  { number: 6, title: "Offering", description: "Palms open to the day — not asking, not holding, just offering.", lang: "EN", energy: "raw", prompt: vidaPrompt("Standing in the doorway at dawn — the body offered to the new day like bread placed on a table. Palms turned upward, fingers open", "Transcendent vulnerability — the raw beauty of offering yourself to life without conditions. The tears of gratitude so deep it cannot be contained", "Building from silence to fullness — first breath, then a sustained vocal note, then piano, then strings, then full ensemble. The crescendo is the offering itself", "EN", "raw"), durationSeconds: 300 },
]);

const VIDA_LINHAGEM = vidaAlbum("vida-linhagem", "Linhagem", "herança, sangue, o que vive em ti antes de ti", "#7A4A3A", [
  { number: 1, title: "A Avó", description: "A avó que vive nas tuas mãos, os gestos dela nos teus.", lang: "PT", energy: "steady", flavor: "bossa", prompt: vidaPrompt("Hands kneading dough the way hers did, wrists turning at the same angle. Fingers that reach for herbs with a grip you never learned — it was already there", "Deep ancestral warmth, the ache of recognition when your body does something you never chose. Tenderness layered with time", "warm organic guitar with a grandmother's patience, unhurried circular picking. Timbila-like wooden percussion, warm upright bass, a single mbira threading through like memory", "PT", "steady", "bossa"), durationSeconds: 240 },
  { number: 2, title: "Blood Memory", description: "What the blood remembers that the mind forgot.", lang: "EN", energy: "raw", vocalMode: "duet", prompt: vidaPromptDuet("A pulse in the wrist that carries information older than language. The body flinching at a smell it has never encountered in this lifetime. The male voice is the ancestor — the father, the grandfather, the blood that speaks through her", "Primal and unsettling, the vertigo of feeling something you cannot explain. Male vocal is the older voice in the blood — deep, ancestral, almost chanted", "Deep sub-bass rumble like underground rivers, distorted cello bowing against the grain. Tribal hand drums close and dry. Female vocal leads — present, questioning. Male vocal enters like a memory surfacing — deeper, older, almost spoken word, the voice of lineage. He sings the bridge as if from another time. She answers, recognising. Both voices overlap in the final phrase — blood meeting blood", "EN", "raw"), durationSeconds: 240 },
  { number: 3, title: "Herança", description: "A herança que nada tem a ver com dinheiro.", lang: "PT", energy: "steady", prompt: vidaPrompt("The way you hold a cup with both hands, the way you stand at a window watching rain. Posture passed down like furniture — the straightened spine, the tilted head", "Bittersweet abundance, the weight of gifts you didn't ask for but cannot return. Gratitude tangled with grief", "Warm nylon guitar fingerpicking in open tuning, cello playing long sustained notes. Soft hand percussion like tapping a wooden table, ambient room tone, intimate recording", "PT", "steady"), durationSeconds: 240 },
  { number: 4, title: "Mother's Hands", description: "As mãos da tua mãe, agora as tuas mãos.", lang: "EN", prompt: vidaPrompt("Catching your reflection and seeing her hands arranging flowers, folding cloth. The shock of your own knuckles becoming hers, veins rising in the same pattern", "Intimate devastation, the moment you become the woman you watched. Whispered tenderness, the unbearable softness of continuity", "Solo piano with extreme delicacy, sustain pedal letting notes bleed. A single voice humming beneath, almost inaudible, like a lullaby half-remembered in sleep", "EN"), durationSeconds: 240 },
  { number: 5, title: "O Que Trouxeste", description: "O que carregaste contigo, por escolha ou não.", lang: "PT", energy: "pulse", flavor: "folk", prompt: vidaPrompt("Shoulders that carry bundles wrapped in cloth, feet that know a road they've never walked. The habits that arrived with you — counting money, locking doors twice", "Determined forward motion carrying heavy things, the refusal to put them down because they are yours. Pride mixed with exhaustion", "warm rhythmic groove driving forward, bass guitar locked in with shaker and djembe. Call-and-response vocals, electric guitar with bright Mozambican tone, building energy", "PT", "pulse", "folk"), durationSeconds: 240 },
  { number: 6, title: "Roots Alive", description: "Raízes como coisas vivas que crescem, não relíquias.", lang: "EN", energy: "steady", prompt: vidaPrompt("Roots pushing through concrete, cracking pavement to reach water. The living pulse underground — not dead history but active growth, tendrils reaching, feeding the trunk", "Vital and defiant, the unstoppable force of origin refusing to be decorative. Alive with purpose, fierce green energy", "Layered organic percussion building from soil-like textures to full rhythm, acoustic bass with deep resonance. Kalimba and balafon trading phrases, strings swelling underneath", "EN", "steady"), durationSeconds: 300 },
]);

const VIDA_MARE_VIVA = vidaAlbum("vida-mare-viva", "Maré Viva", "ciclos, encher e esvaziar, impermanência", "#3A6B7A", [
  { number: 1, title: "Encher", description: "A maré que entra, enchendo devagar.", lang: "PT", energy: "steady", prompt: vidaPrompt("Water creeping over sand, filling footprints one by one. The slow insistent arrival of fullness — lungs expanding, a room filling with afternoon light", "Gradual inevitability, the calm confidence of something that always comes. Swelling warmth, the body accepting what approaches", "Rising synth pads like water levels climbing, gentle hand percussion mimicking lapping waves. Acoustic guitar arpeggios slowly adding notes, bass deepening measure by measure", "PT", "steady"), durationSeconds: 240 },
  { number: 2, title: "High Tide", description: "Plenitude no pico, tudo a transbordar.", lang: "EN", energy: "pulse", prompt: vidaPrompt("Standing chest-deep in warm water, every pore open, the body completely held. The peak moment when the glass is full to the meniscus, trembling but not spilling", "Ecstatic fullness, the almost-too-much of total abundance. Vibrating at capacity, the thrill of being completely filled with life", "Full band at peak intensity, driving bass line, percussion layered thick. Brass stabs and keys washing over, gospel-influenced backing vocals surging", "EN", "pulse"), durationSeconds: 240 },
  { number: 3, title: "A Pausa no Topo", description: "O instante imóvel no topo, antes da descida.", lang: "PT", prompt: vidaPrompt("The held breath at the peak of a wave, that suspended millisecond where water forgets gravity. Complete stillness, the body weightless between rising and falling", "Exquisite suspension, the beauty of the pause that knows what comes next. Serene vertigo", "A single sustained note on a bowed vibraphone, silence between sparse piano chords. Breath sounds amplified, the faintest shimmer of a cymbal being touched, not struck", "PT"), durationSeconds: 240 },
  { number: 4, title: "Ebb", description: "Recuar, esvaziar, largar.", lang: "EN", prompt: vidaPrompt("Water pulling back over pebbles, the sound of retreat, sand darkening as moisture leaves. The slow emptying of a room after everyone goes home", "Melancholic release, the dignity of letting go without grasping. Quiet courage in the retreat", "Descending melodic phrases on nylon guitar, each repetition losing a note. Soft brush drums fading, bass notes spacing further apart, reverb trails lengthening", "EN"), durationSeconds: 240 },
  { number: 5, title: "Vazio Fértil", description: "O vazio fértil da maré baixa, o esvaziamento necessário.", lang: "PT", energy: "raw", prompt: vidaPrompt("The exposed seabed at low tide — shells, creatures, the hidden architecture revealed. Empty hands turned upward, the silence louder than what was", "Fierce vulnerability, the raw power of standing in your own emptiness without filling it. Ache that transforms into spaciousness", "Sparse arrangement with long silences, detuned piano with damper removed. Field recording of wind through an empty structure, a single drum struck and left to decay fully", "PT", "raw"), durationSeconds: 240 },
  { number: 6, title: "Turn", description: "O momento invisível em que a maré vira.", lang: "EN", energy: "steady", prompt: vidaPrompt("The imperceptible instant where outgoing water hesitates and begins to return. The pivot point — the exhale that becomes inhale, the grief that softens", "Mysterious transition, the magic of reversal happening between two heartbeats. Quiet awe at the precision of cycles", "Subtle key change over eight bars, bass note shifting by a semitone. Reversed cymbal swells, guitar harmonics, the melody inverting — descending phrases becoming ascending", "EN", "steady"), durationSeconds: 240 },
  { number: 7, title: "Volta", description: "Tudo volta, nada se perde de verdade.", lang: "PT", energy: "steady", flavor: "bossa", prompt: vidaPrompt("Water returning to fill the same footprints, the same coves. The daughter becoming the mother becoming the grandmother — the same song in a new mouth", "Triumphant return, the deep relief of cycles completing. Joyful certainty — lived proof that what leaves comes back changed and whole", "warm organic guitar riff that circles back to its opening phrase, bass and percussion in a revolving groove. Choral voices joining one by one, timbila driving home", "PT", "steady", "bossa"), durationSeconds: 300 },
]);

const VIDA_DESCALCA = vidaAlbum("vida-descalca", "Descalça", "celebrar, dançar, alegria sem razão", "#D4A853", [
  { number: 1, title: "Tira os Sapatos", description: "Tira os sapatos, o chão é teu.", lang: "PT", energy: "pulse", flavor: "marrabenta", prompt: vidaPrompt("Kicking shoes off at the door, toes spreading on cool tile, the liberation of bare soles. Feet finding the ground — heel, arch, ball, toes", "Playful defiance, the giddy freedom of removing what was never comfortable. Mischievous joy", "warm organic guitar bouncing with infectious energy, shaker and djembe, bass guitar walking with swagger, call-and-response vocals laughing, handclaps on the offbeat", "PT", "pulse", "marrabenta"), durationSeconds: 240 },
  { number: 2, title: "Kitchen Floor", description: "A dançar no chão da cozinha à meia-noite.", lang: "EN", energy: "pulse", flavor: "house", prompt: vidaPrompt("Bare feet on kitchen linoleum at midnight, the fridge humming, spinning alone with a glass of wine. Hips moving before the brain decides", "Uninhibited midnight joy, the secret ecstasy of dancing for absolutely no one. Delicious solitude", "Deep house four-on-the-floor with warm analog bass, filtered Rhodes shimmering, minimal vocal chops, hi-hats with swing, the groove of a 2am kitchen", "EN", "pulse", "house"), durationSeconds: 240 },
  { number: 3, title: "Sem Razão", description: "Celebrar sem razão nenhuma.", lang: "PT", energy: "anthem", flavor: "jazz", prompt: vidaPrompt("Arms thrown open on an ordinary Tuesday, laughing at the ceiling for no reason. The body erupting because the sun came through the window", "Unreasonable explosive happiness, the kind that embarrasses sensible people. Wild gratitude for nothing in particular", "Full warm organic at festival energy, horns punching, guitar riffing with abandon, massed vocals, timbila and drums pushing the tempo, pure celebration", "PT", "anthem", "jazz"), durationSeconds: 240 },
  { number: 4, title: "Joy", description: "Alegria pura, explosiva, sem desculpa.", lang: "EN", energy: "anthem", flavor: "gospel", vocalMode: "duet", prompt: vidaPromptDuet("The full-body shout of people who have been quiet for too long, lungs open, throats free. Jumping with both feet leaving the ground — her joy ignites his", "Explosive unapologetic rapture, sacred wildness, the holy yes. Male vocal joins the celebration — not adding energy but catching fire from hers", "Gospel choir at full power with organ swells and Hammond grinding, tambourines shaking, drums crashing, brass blazing. Female vocal leads the anthem — she owns the room. Male vocal enters at the bridge with a joyful shout, warm baritone cutting through the choir. Both voices on the final chorus — her soaring above, him grounding below, pure collective euphoria", "EN", "anthem", "gospel"), durationSeconds: 240 },
  { number: 5, title: "O Corpo Sabe", description: "O corpo sabe celebrar antes da mente concordar.", lang: "PT", energy: "pulse", flavor: "marrabenta", prompt: vidaPrompt("Hips swaying before the thought forms, feet tapping before the ear fully hears. The body's ancient knowledge of celebration — how to stomp, how to let the spine become a wave", "Instinctive physical intelligence, the body leading and the mind gratefully following. Rhythm over reason", "warm organic groove that makes stillness impossible, interlocking guitar patterns with bass and percussion. Body percussion — chest slaps, thigh hits, foot stamps", "PT", "pulse", "marrabenta"), durationSeconds: 240 },
  { number: 6, title: "Barefoot", description: "Descalça e sem limites, a dança final.", lang: "EN", energy: "anthem", flavor: "house", prompt: vidaPrompt("Every surface is a dance floor — grass, sand, concrete, kitchen tile. The final freedom of feet that remembered what shoes made them forget", "Limitless celebration, euphoric liberation, dancing as the most honest prayer, barefoot as the most honest state", "Anthemic house build with soaring synth chords, four-on-the-floor relentlessly upward, gospel vocal samples over the drop, warm acoustic guitar woven in, pure euphoric release", "EN", "anthem", "house"), durationSeconds: 300 },
]);

const VIDA_BRASA_LENTA = vidaAlbum("vida-brasa-lenta", "Brasa Lenta", "força quieta, paciência como poder", "#A85A3A", [
  { number: 1, title: "Paciência", description: "Paciência não como espera, mas como força.", lang: "PT", energy: "steady", prompt: vidaPrompt("Hands folded in the lap, not idle but holding — the way a woman holds a decision that isn't ready yet. The long exhale, shoulders settling", "Quiet monumental strength, the power that doesn't need to announce itself. Deep patience from knowing, not passivity", "Slow-building acoustic arrangement, fingerpicked guitar with deliberate spaces. Upright bass playing whole notes, brushed snare barely touching the skin, warm Rhodes that sustains", "PT", "steady"), durationSeconds: 240 },
  { number: 2, title: "Slow Burn", description: "O fogo que não precisa de pressa.", lang: "EN", energy: "steady", prompt: vidaPrompt("Coals glowing orange in the dark, no flame visible but heat radiating steadily. The slow warming of a room from a fire lit hours ago — not dramatic, just constant", "Smouldering persistence, the beauty of heat that doesn't need to be seen. Steady unwavering warmth, the confidence of a fire that will outlast the night", "Warm analog synth bass pulsing slowly, electric guitar with volume swells creating long glowing tones. Brushed drums at a walking pace, organ sustained like heat", "EN", "steady"), durationSeconds: 240 },
  { number: 3, title: "O Tempo Certo", description: "O tempo certo, não o tempo rápido.", lang: "PT", energy: "steady", flavor: "bossa", prompt: vidaPrompt("Bread rising in a cloth-covered bowl, the yeast working at its own pace. The farmer who plants knowing the harvest is months away, hands in soil without urgency", "Unhurried wisdom, the deep knowing that rushing ruins what patience perfects. Grounded trust in timing", "warm organic at a deliberately relaxed tempo, guitar picking a melody that takes its time. Timbila keeping unhurried pulse, bass walking slowly, the groove of a Sunday afternoon", "PT", "steady", "bossa"), durationSeconds: 240 },
  { number: 4, title: "Roots Hold", description: "As raízes seguram a árvore nas tempestades, força invisível.", lang: "EN", energy: "raw", prompt: vidaPrompt("The tree bending in wind but not breaking, the invisible grip beneath the soil. Knuckles white on a steering wheel during a storm, jaw set, eyes forward", "Fierce underground determination, the raw power of holding on when everything shakes. Gritty resilience, the beauty of absolute refusal", "Distorted bass guitar holding a low pedal tone through chaos, drums hitting hard and irregular like storm gusts. Raw electric guitar with feedback and sustain, visceral", "EN", "raw"), durationSeconds: 240 },
  { number: 5, title: "Constância", description: "Constância, o poder de aparecer outra vez.", lang: "PT", energy: "steady", prompt: vidaPrompt("The same hands opening the same door every morning. Sitting down to the work again — not inspired, not motivated, just present, the hands beginning", "Noble ordinariness, the quiet heroism of showing up without applause. The unsexy power of again and again and again", "Repetitive guitar figure that gains depth with each cycle, bass locking into the same phrase with micro-variations. Brushed drums in a patient loop, piano adding one note per repetition", "PT", "steady"), durationSeconds: 240 },
  { number: 6, title: "Embers", description: "As brasas brilham mais tempo e aquecem mais que as chamas.", lang: "EN", prompt: vidaPrompt("The last glow in the fireplace at 3am, the heat that warms the room long after the flames have died. Hands held over coals, radiant warmth without performance", "Profound quiet warmth, the tenderness of what remains after the spectacle. The love that stays", "Solo piano with extreme sustain, notes ringing into each other like heat spreading. Distant cello harmonics, the faintest brush of a cymbal, everything at the lowest dynamic possible", "EN"), durationSeconds: 300 },
]);

const VIDA_RAIZ_MUDA = vidaAlbum("vida-raiz-muda", "Raiz Muda", "crescimento invisível, o que muda no escuro", "#4A6B3A", [
  { number: 1, title: "Debaixo da Terra", description: "No subsolo onde ninguém vê, o trabalho verdadeiro.", lang: "PT", prompt: vidaPrompt("Soil pressing on all sides, the damp darkness where seeds split open in private. The body curled in bed doing the invisible work of healing", "Sacred hiddenness, the intimacy of transformation that happens only in the dark. Quiet trust in the unseen", "Sub-bass frequencies felt more than heard, sparse piano notes like water drops in a cave. Field recording of underground sounds — earth settling, water through stone", "PT"), durationSeconds: 240 },
  { number: 2, title: "Before the Bloom", description: "O longo tempo paciente antes de qualquer coisa aparecer.", lang: "EN", energy: "steady", prompt: vidaPrompt("The long winter of a bulb in frozen ground, alive but showing nothing. Months of invisible root-building, energy stored in darkness waiting for a signal only the body knows", "Patient anticipation without anxiety, the calm of trusting a process you cannot see. Slow-building hope", "Gradually layering — starting with a single plucked string, adding elements every sixteen bars. Guitar, then bass, then soft percussion, then a distant flute — each layer a season", "EN", "steady"), durationSeconds: 240 },
  { number: 3, title: "Escuro Fértil", description: "A escuridão necessária, fértil e não assustadora.", lang: "PT", energy: "raw", prompt: vidaPrompt("Compost — the beautiful rot that makes new life possible, hands deep in dark rich earth. The necessary breakdown, the body surrendering its old form", "Fierce embrace of darkness as creative force, the raw power of decomposition as genesis. Unapologetic about the ugly stage", "Detuned cello playing low and rough, distorted acoustic guitar, sounds of organic decay and regeneration. Irregular percussion, deep bass drones, raw vocal textures", "PT", "raw"), durationSeconds: 240 },
  { number: 4, title: "Patience of Seeds", description: "As sementes não consultam o calendário.", lang: "EN", prompt: vidaPrompt("A seed in dry soil waiting for rain that may take months, no anxiety in its waiting. Complete surrender to timing — no alarm clock, no deadline", "Absolute unhurried presence, the wisdom of organisms that have no concept of late. Serene certainty without a timeline", "Minimal arrangement with enormous space, a single mbira note repeating at irregular intervals. Silence as the primary instrument, soft breath sounds, a distant drone that barely shifts", "EN"), durationSeconds: 240 },
  { number: 5, title: "A Primeira Folha", description: "A primeira folha a romper o solo, triunfo silencioso.", lang: "PT", energy: "steady", flavor: "folk", prompt: vidaPrompt("The crack in the soil where green pushes through, the tiny impossible leaf that moved earth. The first visible sign after months of darkness — small, fragile, triumphant", "Quiet triumph, the private joy of emergence after long patience. Tender victory, vulnerability of showing yourself for the first time", "warm organic guitar entering with a bright clean melody after a long sparse intro, like sunlight breaking through. Timbila and gentle percussion building, bass rising", "PT", "steady", "folk"), durationSeconds: 240 },
  { number: 6, title: "Becoming", description: "A tornar-te no que já eras, devagar.", lang: "EN", energy: "steady", prompt: vidaPrompt("The slow unfurling of what was always coiled inside — not transformation but revelation. A woman recognizing herself in the mirror, the face she was always growing toward", "Peaceful inevitability, the deep relief of arriving at yourself. The feeling of a puzzle completing not with the last piece but with the realization it was complete all along", "Full warm arrangement like sunrise, acoustic guitar and strings building together. Soft vocal harmonies layered like leaves opening, bass grounding, the final chord sustained and open — still becoming", "EN", "steady"), durationSeconds: 300 },
]);

const VIDA_RESSONANCIA = vidaAlbum("vida-ressonancia", "Ressonância", "despertar colectivo, quando uma acorda muitas sentem", "#8B5CF6", [
  { number: 1, title: "Uma Nota", description: "Uma nota, uma mulher, o princípio.", lang: "PT", prompt: vidaPrompt("A single voice in an empty room, one woman humming with her eyes closed. The vibration starting in the chest, travelling through the throat, touching the walls", "Solitary courage, the vulnerability of being the first sound in the silence. The sacred smallness of one voice before it knows others will follow", "A single unaccompanied female voice singing one sustained note, recorded close with room reverb. Nothing else for the first minute — then the faintest sympathetic resonance", "PT"), durationSeconds: 240 },
  { number: 2, title: "Ripple", description: "A ondulação que alcança margens que nunca vês.", lang: "EN", energy: "steady", prompt: vidaPrompt("A stone dropped in still water, the concentric circles reaching further than the eye can follow. One woman's decision to speak rippling through a family, a community", "Expanding awareness, the wonder of realizing your small action travelled further than you knew. Quiet awe at interconnection", "Delay-heavy guitar creating rippling patterns across the stereo field, each note spawning echoes. Bass providing centre while everything else radiates, soft percussion like water drops", "EN", "steady"), durationSeconds: 240 },
  { number: 3, title: "Duas Vozes", description: "Duas vozes a encontrarem-se no escuro.", lang: "PT", energy: "steady", flavor: "jazz", prompt: vidaPrompt("Two women discovering they carry the same wound, the shock of recognition across a table. Two voices finding the same note by accident", "The electric relief of being seen, the warmth of 'you too?' between strangers. Doubled strength", "Two acoustic guitars in warm organic style, playing independently then finding each other's rhythm. Two vocal lines weaving, timbila holding the centre", "PT", "steady", "jazz"), durationSeconds: 240 },
  { number: 4, title: "The Circle", description: "O círculo que acolhe todos os que entram.", lang: "EN", energy: "pulse", flavor: "gospel", vocalMode: "duet", prompt: vidaPromptDuet("People standing in a circle, shoulders touching, breathing together without instruction. Bodies forming a shape with no hierarchy, everyone facing the centre. The circle is for all — his voice proves it", "Sacred belonging, the overwhelming emotion of being held by many at once. Male vocal enters the circle as one more voice — not leading, belonging", "Gospel choir building from unison to full harmony, organ chords swelling. Handclaps and tambourine driving a collective heartbeat. Female vocal opens the circle and leads the chorus. Male vocal enters on verse two — one voice among many, warm baritone grounding the higher harmonies. Both voices lead the final call-and-response, she calls, he responds, then reversed", "EN", "pulse", "gospel"), durationSeconds: 240 },
  { number: 5, title: "Chamada", description: "A chamada que atravessa paredes e acorda as outras.", lang: "PT", energy: "anthem", prompt: vidaPrompt("A voice calling through walls, the sound that wakes you at dawn not with alarm but with invitation. The call that travels through closed doors and sleeping houses", "Urgent compassion, the fierce tenderness of one who has woken and cannot bear to let others sleep. Rising call to action", "Building from solo voice to full ensemble, horns entering with a melodic call, drums escalating. Choral voices answering in waves, electric guitar cutting through, doubling in power", "PT", "anthem"), durationSeconds: 240 },
  { number: 6, title: "We Breathe", description: "Respirar juntas, erguer juntas, um só pulmão.", lang: "EN", energy: "anthem", flavor: "gospel", prompt: vidaPrompt("A room full of women breathing in unison, fifty lungs expanding as one. Rising together — not marching but swelling, like a tide made of people", "Overwhelming unity, the dissolution of isolation into shared breath. Triumphant communion, the holy power of many bodies choosing the same rhythm", "Full gospel choir at maximum power, Hammond organ screaming, drums driving an anthem rhythm. Brass blazing, bass guitar locked with kick drum, a hundred voices refusing to be quiet", "EN", "anthem", "gospel"), durationSeconds: 240 },
  { number: 7, title: "Todas", description: "Todas nós, o sim colectivo que faz tremer o chão.", lang: "PT", energy: "anthem", flavor: "marrabenta", prompt: vidaPrompt("Every woman who ever swallowed her voice now opening her mouth at once. Feet stamping in unison — not soldiers but dancers, the thunderous yes of the collective body", "Seismic collective power, the earth-shaking force of women who stopped being quiet at the same moment. Ecstatic defiant unity", "Full warm organic orchestra with massed choir, every instrument at peak energy. Timbila and drums driving a rhythm that demands dancing, brass and guitar in celebration, final sustained note held by all voices", "PT", "anthem", "marrabenta"), durationSeconds: 300 },
]);

const VIDA_PENUMBRA = vidaAlbum("vida-penumbra", "Penumbra", "o limiar, o espaço entre", "#4A5A7A", [
  { number: 1, title: "Nem Noite", description: "Nem noite, ainda não.", lang: "PT", prompt: vidaPrompt("The last blue before black, the sky holding its breath between colours. Standing in a room where the light switch is off but the window still gives enough", "Liminal suspension, the delicate uncertainty of almost-dark. Hushed anticipation, the tenderness of a world that hasn't committed to night", "A single sustained synth pad in a minor key, barely audible. Solo piano playing fragments that never resolve, long reverb tails dissolving into silence", "PT"), durationSeconds: 240 },
  { number: 2, title: "Nor Day", description: "Nem dia, ainda não.", lang: "EN", prompt: vidaPrompt("The first grey before dawn, the birds still silent. Eyes open in bed before the alarm — the world exists but hasn't started, everything possible, nothing decided", "Pre-dawn stillness, the exquisite neutrality of the moment before the world chooses a colour. Suspended possibility", "Ambient wash of filtered white noise, a bowed glass harmonica creating ethereal tones. No rhythm, no pulse — only texture and tone, a world that hasn't begun its day", "EN"), durationSeconds: 240 },
  { number: 3, title: "O Limiar", description: "De pé no limiar, ambas as portas abertas.", lang: "PT", energy: "steady", prompt: vidaPrompt("Standing in a doorframe with one foot in each room, the body split between two temperatures. The hallway between sleeping and waking, both visible, neither chosen", "Balanced tension without anxiety, the dignified pause of someone who will not be rushed. Sovereign stillness at the crossroads", "Two musical ideas alternating — a warm acoustic phrase and a cooler electronic texture, trading every four bars. Bass holding a pedal note between both worlds, soft percussion marking time", "PT", "steady"), durationSeconds: 240 },
  { number: 4, title: "Threshold", description: "A borda onde te encontras antes de escolher.", lang: "EN", prompt: vidaPrompt("Toes curled over the edge of a diving board, the water far below. The doorstep of someone you haven't visited in years — hand raised to knock, breath held", "Exquisite hesitation, the beauty of the almost, the sacred pause before commitment. Intimate vertigo at your own edge", "Sparse piano with notes at the very edge of silence. Bowed double bass creating a drone like standing at a height, distant choral pad breathing in and out, no resolution", "EN"), durationSeconds: 240 },
  { number: 5, title: "Suspensa", description: "Suspensa entre dois estados, segura no meio.", lang: "PT", energy: "raw", prompt: vidaPrompt("The body at the top of a jump — gravity paused, lungs full, the split second of weightlessness. Hanging between sleep and waking, belonging to neither state", "Raw suspension, the intensity of being held in limbo. Vulnerable floating, the ache of not landing, the freedom of not having to choose", "Dissonant strings holding unresolved chords, raw bowed cello against high violin harmonics. Breath sounds amplified and distorted, percussion that starts and stops abruptly", "PT", "raw"), durationSeconds: 240 },
  { number: 6, title: "The In-Between", description: "O espaço entre, que contém toda a possibilidade.", lang: "EN", prompt: vidaPrompt("The space between two heartbeats where everything exists — every choice, every path, every version of yourself. The gap between exhale and inhale", "Vast quiet possibility, the paradox of emptiness that contains everything. Peaceful infinity, the surrender to not-knowing as the most spacious place", "Extended silence broken by single piano notes at unpredictable intervals. Ambient pad shifting between major and minor, the faintest heartbeat underneath, ending in open silence that feels like a beginning", "EN"), durationSeconds: 300 },
]);



// Apply lyrics from separate files to all album tracks
function applyLyrics(albumDef: AlbumDef): Album {
  return {
    ...albumDef,
    tracks: albumDef.tracks.map((t) => ({
      ...t,
      energy: t.energy || "whisper",
      flavor: t.flavor ?? null,
      vocalMode: t.vocalMode || "solo",
      lyrics: t.lyrics || getLyrics(albumDef.slug, t.number),
      audioUrl: t.audioUrl ?? null,
    })),
  } as Album;
}

// ─────────────────────────────────────────────
// COSMIC
// ─────────────────────────────────────────────

const COSMIC_VIAGEM: AlbumDef = {
  slug: "cosmic-viagem",
  title: "Viagem",
  subtitle: "O corpo como portal cósmico. Todas as noites volto a casa.",
  product: "cosmic",
  color: "#1a0533",
  tracks: [
    { number: 1, title: "Voltar a Casa", description: "Viagem astral — o regresso nocturno", lang: "PT", energy: "whisper", prompt: cosmicPrompt("astral travel, leaving the body at night, returning home to the infinite", "ethereal, floating, peaceful detachment", "soft ambient pads, reverb-drenched piano, distant choir, breath textures", "PT", "whisper"), durationSeconds: 240, audioUrl: null },
    { number: 2, title: "Weightless", description: "Flutuar sem corpo, a leveza de sair", lang: "EN", energy: "whisper", prompt: cosmicPrompt("weightlessness, leaving the body behind, floating without gravity", "light, ascending, free, dissolving", "ambient synth layers, no drums, floating vocal, spacious reverb", "EN", "whisper"), durationSeconds: 240, audioUrl: null },
    { number: 3, title: "Anterior", description: "O lugar antes do nome e da dor", lang: "PT", energy: "steady", prompt: cosmicPrompt("before birth, before name, ancestral cosmic memory", "ancient, vast, primal, wondering", "deep bass drone, subtle percussion, warm vocal, ancestral textures", "PT", "steady"), durationSeconds: 240, audioUrl: null },
    { number: 4, title: "The Cord", description: "O fio que te puxa de volta ao corpo", lang: "EN", energy: "steady", prompt: cosmicPrompt("the silver cord between body and soul, being pulled back to flesh", "tension between freedom and gravity, bittersweet return", "pulsing bass, elastic textures, grounded drums, yearning vocal", "EN", "steady"), durationSeconds: 240, audioUrl: null },
    { number: 5, title: "Sem Pele", description: "Existir sem fronteiras", lang: "PT", energy: "raw", prompt: cosmicPrompt("dissolving boundaries, no skin, no edges, merging with everything", "vast, vulnerable, ecstatic dissolution", "minimal, spacious, raw vocal close-mic, subtle drone, silence as instrument", "PT", "raw"), durationSeconds: 240, audioUrl: null },
    { number: 6, title: "Stardust", description: "Somos feitos de estrelas mortas", lang: "EN", energy: "steady", prompt: cosmicPrompt("we are made of dead stars, atoms that travelled billions of years", "wonder, humility, cosmic perspective, borrowed body", "warm acoustic guitar, gentle strings, contemplative vocal, cosmic warmth", "EN", "steady"), durationSeconds: 240, audioUrl: null },
    { number: 7, title: "A Maré de Dentro", description: "O oceano interior que sobe quando ficas quieta", lang: "PT", energy: "whisper", prompt: cosmicPrompt("inner ocean, internal tide that rises at night, emotions as water", "deep, tidal, surrendering, fluid", "water-like textures, soft piano, swelling pads, intimate vocal", "PT", "whisper"), durationSeconds: 240, audioUrl: null },
    { number: 8, title: "Eclipse", description: "Quando a sombra e a luz se encontram em ti", lang: "EN", energy: "pulse", prompt: cosmicPrompt("eclipse, shadow meeting light inside, totality, honesty of darkness", "dramatic, honest, powerful, brief truth", "building drums, dramatic strings, powerful vocal, light and shadow dynamics", "EN", "pulse"), durationSeconds: 240, audioUrl: null },
    { number: 9, title: "Frequência", description: "Vibrar na mesma nota que o universo", lang: "PT", energy: "steady", flavor: "afrobeat", prompt: cosmicPrompt("cosmic frequency, vibrating with the universe, the hum beneath everything", "resonant, connected, rhythmic, alive", "deep bass pulse, organic percussion, warm vocal, rhythmic groove", "PT", "steady", "afrobeat"), durationSeconds: 240, audioUrl: null },
    { number: 10, title: "Home Is Not a Place", description: "Casa não é sítio — é estado", lang: "EN", energy: "anthem", prompt: cosmicPrompt("home as vibration not location, belonging everywhere and nowhere", "declarative, free, powerful, settled", "building anthem, piano to full band, choir, powerful vocal declaration", "EN", "anthem"), durationSeconds: 300, audioUrl: null },
  ],
};

const ROMANCE_PELE: AlbumDef = {
  slug: "cosmic-romance",
  title: "Pele",
  subtitle: "A linguagem mais antiga. Toque, intimidade, pele contra pele.",
  product: "romance",
  color: "#2e0a1a",
  tracks: [
    { number: 1, title: "Chega Mais Perto", description: "Mais perto que a pele permite", lang: "PT", energy: "whisper", prompt: romancePrompt("intimacy, getting closer than skin allows, sacred closeness", "intimate, warm, vulnerable, magnetic", "soft ambient, close-mic vocal, gentle piano, breath sounds, warmth", "PT", "whisper"), durationSeconds: 240, audioUrl: null },
    { number: 2, title: "Skin on Skin", description: "A linguagem mais antiga", lang: "EN", energy: "steady", prompt: romancePrompt("touch as language, skin reading skin, body memory of touch", "sensual, reverent, tender, electric", "warm bass, gentle rhythm, intimate vocal, tactile textures", "EN", "steady"), durationSeconds: 240, audioUrl: null },
    { number: 3, title: "Depois de Ti", description: "O quarto depois de alguém partir", lang: "PT", energy: "whisper", prompt: romancePrompt("the room after a lover leaves, warmth remaining, body memory", "longing, warm, bittersweet, sensory", "solo piano, spacious reverb, nostalgic vocal, morning light", "PT", "whisper"), durationSeconds: 240, audioUrl: null },
    { number: 4, title: "Stay", description: "Fica — não para sempre, só fica", lang: "EN", energy: "steady", prompt: romancePrompt("asking someone to stay, not forever but now, ordinary love", "vulnerable, honest, unhurried, warm", "acoustic guitar, gentle build, honest vocal, warm production", "EN", "steady"), durationSeconds: 240, audioUrl: null },
    { number: 5, title: "Dança Comigo", description: "Dançar na cozinha com a luz do frigorífico", lang: "PT", energy: "steady", flavor: "bossa", prompt: romancePrompt("dancing in the kitchen, barefoot, imperfect love, ordinary magic", "playful, warm, grounded, joyful", "bossa rhythm, warm guitar, playful vocal, kitchen intimacy", "PT", "steady", "bossa"), durationSeconds: 240, audioUrl: null },
    { number: 6, title: "Let Me Hold You", description: "Segurar sem consertar", lang: "EN", energy: "whisper", prompt: romancePrompt("holding someone without trying to fix them, gravity-like love", "tender, protective, vast, patient", "ambient pads, gentle vocal, spacious, gravity-like bass", "EN", "whisper"), durationSeconds: 240, audioUrl: null },
    { number: 7, title: "Vê-me", description: "Ser vista por inteiro — incluindo o escuro", lang: "PT", energy: "raw", prompt: romancePrompt("being truly seen by a lover, all of you including the dark parts", "raw, brave, exposed, intimate", "minimal, raw vocal close-mic, solo piano, vulnerability", "PT", "raw"), durationSeconds: 240, audioUrl: null },
    { number: 8, title: "This Thing Between Us", description: "O amor que não pediu licença", lang: "EN", energy: "pulse", prompt: romancePrompt("unexpected love, the chaos of falling, no plan no permission", "electric, chaotic, unapologetic, alive", "driving beat, urgent vocal, building energy, unstoppable", "EN", "pulse"), durationSeconds: 240, audioUrl: null },
    { number: 9, title: "Terça-Feira", description: "Amar o ordinário em alguém", lang: "PT", energy: "steady", prompt: romancePrompt("loving the ordinary in someone, Tuesday love, imperfect details", "warm, amused, tender, domestic", "warm acoustic, gentle groove, smiling vocal, intimate", "PT", "steady"), durationSeconds: 240, audioUrl: null },
    { number: 10, title: "Grow Old With Me", description: "O amor que ninguém escreve músicas sobre", lang: "EN", energy: "anthem", prompt: romancePrompt("growing old together, ordinary love as revolution, choosing each other daily", "triumphant, peaceful, warm, eternal", "building from piano to full arrangement, anthem of quiet love", "EN", "anthem"), durationSeconds: 300, audioUrl: null },
  ],
};

const ROMANCE_CARTA: AlbumDef = {
  slug: "romance-carta",
  title: "Carta",
  subtitle: "Palavras que ficaram no corpo. Cartas que nunca foram enviadas.",
  product: "romance",
  color: "#1a1008",
  tracks: [
    { number: 1, title: "Carta Que Não Enviei", description: "Uma carta escrita mas nunca enviada", lang: "PT", energy: "whisper", prompt: romancePrompt("a love letter written but never sent, words trapped in the body", "aching, intimate, unfinished, tender", "solo piano, spacious reverb, breathy vocal, paper texture", "PT", "whisper"), durationSeconds: 240, audioUrl: null },
    { number: 2, title: "Dear You", description: "Escrever a quem nunca vai ler", lang: "EN", energy: "steady", prompt: romancePrompt("writing to someone who will never read it, letters as ritual", "honest, resigned, warm, intimate", "acoustic guitar, gentle rhythm, honest vocal, warm production", "EN", "steady"), durationSeconds: 240, audioUrl: null },
    { number: 3, title: "Tinta no Corpo", description: "Palavras escritas na pele em vez de papel", lang: "PT", energy: "steady", prompt: romancePrompt("words written on skin instead of paper, the body as letter", "sensual, poetic, embodied, deliberate", "warm bass, gentle groove, close-mic vocal, tactile textures", "PT", "steady"), durationSeconds: 240, audioUrl: null },
    { number: 4, title: "Between the Lines", description: "O que vive entre as palavras escritas", lang: "EN", energy: "whisper", prompt: romancePrompt("what lives between written words, the spaces that say everything", "subtle, yearning, intelligent, patient", "ambient pads, soft piano, intimate vocal, space as instrument", "EN", "whisper"), durationSeconds: 240, audioUrl: null },
    { number: 5, title: "Última Página", description: "A última página de uma história de amor", lang: "PT", energy: "raw", prompt: romancePrompt("the last page of a love story, ending that still bleeds", "raw, brave, final, bittersweet", "minimal piano, raw vocal close-mic, silence, vulnerability", "PT", "raw"), durationSeconds: 240, audioUrl: null },
    { number: 6, title: "Unsent", description: "O arquivo de mensagens nunca enviadas", lang: "EN", energy: "steady", prompt: romancePrompt("archive of unsent messages, the drafts folder of the heart", "wry, tender, self-aware, aching", "gentle rhythm, warm guitar, conversational vocal, intimate", "EN", "steady"), durationSeconds: 240, audioUrl: null },
    { number: 7, title: "Caligrafia", description: "Letra de mão tão íntima como impressão digital", lang: "PT", energy: "whisper", flavor: "bossa", prompt: romancePrompt("handwriting as intimate as fingerprints, penmanship as love act", "delicate, precise, warm, nostalgic", "bossa rhythm, nylon guitar, breathy vocal, vintage warmth", "PT", "whisper", "bossa"), durationSeconds: 240, audioUrl: null },
    { number: 8, title: "Read Me", description: "Pedir para ser lida como uma carta", lang: "EN", energy: "pulse", prompt: romancePrompt("asking to be read like a letter, body as text, desire to be understood", "urgent, vulnerable, electric, brave", "driving beat, urgent vocal, building energy, plea as anthem", "EN", "pulse"), durationSeconds: 240, audioUrl: null },
    { number: 9, title: "Post Scriptum", description: "O que vem depois do fim", lang: "PT", energy: "steady", prompt: romancePrompt("what comes after the ending, the PS that changes everything", "hopeful, surprising, warm, wise", "warm acoustic, gentle build, smiling vocal, light returning", "PT", "steady"), durationSeconds: 240, audioUrl: null },
    { number: 10, title: "Love Letter to No One", description: "Uma carta de amor ao amor que ainda não veio", lang: "EN", energy: "anthem", prompt: romancePrompt("love letter to future love, writing to someone you havent met yet", "hopeful, vast, open, triumphant", "building from piano to full arrangement, anthem of hope and patience", "EN", "anthem"), durationSeconds: 300, audioUrl: null },
  ],
};

const ROMANCE_SAUDADE: AlbumDef = {
  slug: "romance-saudade",
  title: "Saudade",
  subtitle: "A distância que se sente no corpo. Falta que pesa como presença.",
  product: "romance",
  color: "#0a1a2e",
  tracks: [
    { number: 1, title: "Saudade Tem Corpo", description: "A saudade mora no corpo", lang: "PT", energy: "whisper", prompt: romancePrompt("saudade as physical sensation, longing that lives in the body", "aching, embodied, heavy, tender", "soft piano, spacious reverb, breathy vocal, weight in the low end", "PT", "whisper"), durationSeconds: 240, audioUrl: null },
    { number: 2, title: "The Shape of Gone", description: "A forma que alguém deixa quando parte", lang: "EN", energy: "steady", prompt: romancePrompt("the shape someone leaves when they go, absence as presence", "melancholy, tender, observant, still", "gentle rhythm, warm strings, intimate vocal, empty spaces", "EN", "steady"), durationSeconds: 240, audioUrl: null },
    { number: 3, title: "Cheiro Que Ficou", description: "O cheiro que ficou depois de partires", lang: "PT", energy: "steady", prompt: romancePrompt("the scent that stayed after you left, smell as memory trigger", "sensory, nostalgic, bittersweet, vivid", "warm bass, gentle groove, close-mic vocal, sensory textures", "PT", "steady"), durationSeconds: 240, audioUrl: null },
    { number: 4, title: "Phantom", description: "Membro fantasma do amor", lang: "EN", energy: "whisper", prompt: romancePrompt("phantom limb of love, feeling someone who isnt there anymore", "haunting, disoriented, tender, ghostly", "ambient pads, distant piano, ethereal vocal, ghost-like textures", "EN", "whisper"), durationSeconds: 240, audioUrl: null },
    { number: 5, title: "Três da Manhã", description: "As 3 da manhã — a pior hora para ter saudades", lang: "PT", energy: "raw", prompt: romancePrompt("3am longing, insomnia of missing, the worst hour to be alone", "raw, exposed, sleepless, desperate", "minimal piano, raw vocal close-mic, silence, night sounds", "PT", "raw"), durationSeconds: 240, audioUrl: null },
    { number: 6, title: "Still Here", description: "Ainda presente na cadeira vazia", lang: "EN", energy: "steady", prompt: romancePrompt("still present in the empty chair, absence that refuses to leave", "stubborn, warm, patient, melancholy", "acoustic guitar, gentle rhythm, warm vocal, domestic space", "EN", "steady"), durationSeconds: 240, audioUrl: null },
    { number: 7, title: "Metade", description: "Andar pelo mundo como metade", lang: "PT", energy: "steady", flavor: "marrabenta", prompt: romancePrompt("walking through the world as half, incompleteness as identity", "restless, yearning, grounded, warm", "marrabenta guitar groove, warm bass, yearning vocal, movement", "PT", "steady", "marrabenta"), durationSeconds: 240, audioUrl: null },
    { number: 8, title: "The Distance", description: "A distância como peso físico", lang: "EN", energy: "whisper", prompt: romancePrompt("distance as physical weight, miles measured in the chest", "heavy, patient, vast, devoted", "spacious pads, deep bass, intimate vocal, vast production", "EN", "whisper"), durationSeconds: 240, audioUrl: null },
    { number: 9, title: "Volta", description: "Volta — não é pedido, é oração", lang: "PT", energy: "raw", prompt: romancePrompt("come back, not a plea but a prayer, surrender to longing", "raw, surrendered, brave, devotional", "solo piano, raw vocal, breath sounds, cathedral reverb", "PT", "raw"), durationSeconds: 240, audioUrl: null },
    { number: 10, title: "Home Was You", description: "Casa nunca foi um lugar", lang: "EN", energy: "anthem", prompt: romancePrompt("home was never a place but a person, displacement after love", "triumphant, aching, vast, declared", "building from gentle to full, anthem of belonging, powerful vocal", "EN", "anthem"), durationSeconds: 300, audioUrl: null },
  ],
};

const ROMANCE_FOGO_LENTO: AlbumDef = {
  slug: "romance-fogo-lento",
  title: "Fogo Lento",
  subtitle: "O desejo que não arde — transforma. Paixão lenta, sem pressa.",
  product: "romance",
  color: "#2e1a0a",
  tracks: [
    { number: 1, title: "Fogo Lento", description: "Fogo lento que não queima — transforma", lang: "PT", energy: "whisper", prompt: romancePrompt("slow fire that doesnt burn but transforms, patient desire", "smouldering, patient, magnetic, warm", "soft ambient, warm bass, breathy vocal, ember-like textures", "PT", "whisper"), durationSeconds: 240, audioUrl: null },
    { number: 2, title: "Slow Burn", description: "A antecipação é a coisa", lang: "EN", energy: "steady", prompt: romancePrompt("the anticipation is the thing, desire as slow build", "building, teasing, electric, patient", "gentle groove building slowly, warm layers, intimate vocal", "EN", "steady"), durationSeconds: 240, audioUrl: null },
    { number: 3, title: "Demora", description: "Não tenhas pressa — temos a noite toda", lang: "PT", energy: "steady", flavor: "bossa", prompt: romancePrompt("take your time, we have all night, slowness as devotion", "unhurried, sensual, warm, present", "bossa rhythm, nylon guitar, warm vocal, candlelight intimacy", "PT", "steady", "bossa"), durationSeconds: 240, audioUrl: null },
    { number: 4, title: "Gravity", description: "Ser puxada para alguém — inevitável", lang: "EN", energy: "pulse", prompt: romancePrompt("being pulled towards someone, inevitable attraction, gravity of desire", "magnetic, urgent, unstoppable, alive", "driving bass, building rhythm, passionate vocal, gravitational pull", "EN", "pulse"), durationSeconds: 240, audioUrl: null },
    { number: 5, title: "Toca-me Devagar", description: "Toca-me devagar, quero lembrar", lang: "PT", energy: "raw", prompt: romancePrompt("touch me slowly I want to remember every second, presence as desire", "raw, present, exposed, devotional", "minimal, close-mic vocal, solo piano, breath and silence", "PT", "raw"), durationSeconds: 240, audioUrl: null },
    { number: 6, title: "Closer", description: "Aproximar sem nunca chegar", lang: "EN", energy: "whisper", prompt: romancePrompt("getting closer but never arriving, desire as infinite approach", "teasing, yearning, suspended, electric", "ambient pads, gentle pulse, whispered vocal, suspended tension", "EN", "whisper"), durationSeconds: 240, audioUrl: null },
    { number: 7, title: "Suor", description: "O suor como comunhão", lang: "PT", energy: "pulse", flavor: "afrobeat", prompt: romancePrompt("sweat as communion, bodies in rhythm, physical love as prayer", "driving, embodied, primal, sacred", "afrobeat groove, driving percussion, powerful vocal, body rhythm", "PT", "pulse", "afrobeat"), durationSeconds: 240, audioUrl: null },
    { number: 8, title: "Unravel", description: "Desfazer-se nas mãos de alguém", lang: "EN", energy: "steady", prompt: romancePrompt("coming undone in someones hands, surrender as strength", "vulnerable, trusting, warm, dissolving", "warm layers, gentle rhythm, intimate vocal, unravelling textures", "EN", "steady"), durationSeconds: 240, audioUrl: null },
    { number: 9, title: "Madrugada", description: "A hora entre o desejo e o sono", lang: "PT", energy: "whisper", prompt: romancePrompt("the hour between desire and sleep, 4am tenderness after love", "drowsy, satisfied, warm, golden", "soft ambient, gentle piano, sleepy vocal, golden hour", "PT", "whisper"), durationSeconds: 240, audioUrl: null },
    { number: 10, title: "Burn With Me", description: "Arder juntos — não até às cinzas, até à luz", lang: "EN", energy: "anthem", prompt: romancePrompt("burn together not to ashes but to light, passion as transformation", "triumphant, passionate, luminous, declared", "building from intimate to full, anthem of desire, powerful vocal, rising", "EN", "anthem"), durationSeconds: 300, audioUrl: null },
  ],
};

const ROMANCE_NINHO: AlbumDef = {
  slug: "romance-ninho",
  title: "Ninho",
  subtitle: "Amor doméstico. Construir casa com alguém, tijolo a tijolo.",
  product: "romance",
  color: "#1a0a08",
  tracks: [
    { number: 1, title: "Ninho", description: "Construir um ninho a partir do nada", lang: "PT", energy: "whisper", prompt: romancePrompt("building a nest from scratch, first home together, sacred domesticity", "tender, hopeful, warm, grounded", "soft piano, warm acoustic, gentle vocal, home sounds", "PT", "whisper"), durationSeconds: 240, audioUrl: null },
    { number: 2, title: "Sunday", description: "A santidade de um domingo preguiçoso a dois", lang: "EN", energy: "steady", prompt: romancePrompt("lazy Sunday together, the holiness of doing nothing side by side", "peaceful, warm, amused, unhurried", "warm acoustic, gentle groove, smiling vocal, Sunday morning light", "EN", "steady"), durationSeconds: 240, audioUrl: null },
    { number: 3, title: "Café da Manhã", description: "Fazer o pequeno-almoço como linguagem de amor", lang: "PT", energy: "steady", flavor: "bossa", prompt: romancePrompt("making breakfast as love language, coffee ritual, kitchen as temple", "warm, playful, domestic, rhythmic", "bossa rhythm, warm guitar, playful vocal, kitchen sounds", "PT", "steady", "bossa"), durationSeconds: 240, audioUrl: null },
    { number: 4, title: "Small Things", description: "O amor mora nas coisas pequenas", lang: "EN", energy: "whisper", prompt: romancePrompt("love lives in the small things, details as devotion", "delicate, observant, warm, grateful", "gentle piano, soft strings, intimate vocal, domestic warmth", "EN", "whisper"), durationSeconds: 240, audioUrl: null },
    { number: 5, title: "Chave", description: "Dar a chave da casa a alguém", lang: "PT", energy: "steady", prompt: romancePrompt("giving someone a key to your house, trust as a physical object", "vulnerable, decisive, warm, brave", "warm bass, acoustic guitar, honest vocal, key-turn moment", "PT", "steady"), durationSeconds: 240, audioUrl: null },
    { number: 6, title: "The Argument", description: "Discutir e ficar — isso é amor", lang: "EN", energy: "raw", prompt: romancePrompt("fighting and staying, the argument as proof of commitment", "raw, honest, frustrated, loving", "raw vocal, sparse piano, tension and release, real emotion", "EN", "raw"), durationSeconds: 240, audioUrl: null },
    { number: 7, title: "Silêncio a Dois", description: "O silêncio confortável entre duas pessoas", lang: "PT", energy: "whisper", prompt: romancePrompt("comfortable silence between two, not needing to fill the space", "peaceful, intimate, mature, golden", "minimal piano, spacious, gentle vocal, silence as instrument", "PT", "whisper"), durationSeconds: 240, audioUrl: null },
    { number: 8, title: "Dishes", description: "Lavar a loiça juntos como intimidade", lang: "EN", energy: "steady", flavor: "folk", prompt: romancePrompt("doing dishes together as intimacy, mundane tasks as love", "amused, warm, grounded, real", "folk guitar, warm rhythm, conversational vocal, domestic charm", "EN", "steady", "folk"), durationSeconds: 240, audioUrl: null },
    { number: 9, title: "Envelhecer", description: "Envelhecer juntos — a canção de amor que ninguém escreve", lang: "PT", energy: "steady", prompt: romancePrompt("growing old together, wrinkles as love map, unsexy love song", "tender, wise, amused, eternal", "warm acoustic, gentle build, wise vocal, time passing gently", "PT", "steady"), durationSeconds: 240, audioUrl: null },
    { number: 10, title: "Build This", description: "Vamos construir algo que ninguém vê", lang: "EN", energy: "anthem", prompt: romancePrompt("lets build something invisible, a life together, brick by brick", "triumphant, committed, vast, declared", "building from intimate to full, anthem of partnership, powerful vocal", "EN", "anthem"), durationSeconds: 300, audioUrl: null },
  ],
};

const COSMIC_ORBITA: AlbumDef = {
  slug: "cosmic-orbita",
  title: "Órbita",
  subtitle: "As forças invisíveis que nos movem. Ciclos, hábitos, gravidade.",
  product: "cosmic",
  color: "#1a0a2e",
  tracks: [
    { number: 1, title: "Ciclo", description: "Repetir os mesmos erros como planetas na mesma rota", lang: "PT", energy: "steady", prompt: cosmicPrompt("repeating patterns, orbiting the same mistakes, cycles as planetary motion", "circular, restless, self-aware, resigned", "circular melodic motif, steady rhythm, warm vocal, looping textures", "PT", "steady"), durationSeconds: 240, audioUrl: null },
    { number: 2, title: "Pull", description: "Ser puxada por algo que não se vê", lang: "EN", energy: "steady", prompt: cosmicPrompt("invisible pull, being drawn by forces you cannot name", "magnetic, yearning, surrendering, curious", "deep bass pull, warm strings, intimate vocal, building tension", "EN", "steady"), durationSeconds: 240, audioUrl: null },
    { number: 3, title: "Lua", description: "A lua como metáfora das marés internas", lang: "PT", energy: "whisper", prompt: cosmicPrompt("the moon controlling inner tides, menstrual cycles, emotional rhythms", "tidal, feminine, ancient, surrendered", "soft piano, tidal swells, intimate vocal, moonlit production", "PT", "whisper"), durationSeconds: 240, audioUrl: null },
    { number: 4, title: "The Same Door", description: "Entrar sempre pela mesma porta", lang: "EN", energy: "steady", prompt: cosmicPrompt("always choosing the same door, same patterns in love, inherited orbits", "wry, honest, compassionate, self-aware", "acoustic guitar, walking rhythm, conversational vocal, warm", "EN", "steady"), durationSeconds: 240, audioUrl: null },
    { number: 5, title: "Rota", description: "A rota que o corpo segue sem a mente saber", lang: "PT", energy: "pulse", prompt: cosmicPrompt("the body's secret route, feet that know the way, body GPS", "driven, embodied, unstoppable, honest", "driving rhythm, bass-forward, determined vocal, forward motion", "PT", "pulse"), durationSeconds: 240, audioUrl: null },
    { number: 6, title: "Tides", description: "Marés internas que sobem e descem sem controlo", lang: "EN", energy: "whisper", prompt: cosmicPrompt("internal tides, emotional swelling and emptying, trusting the rhythm", "fluid, patient, trusting, cyclical", "swelling pads, tidal dynamics, patient vocal, wave-like production", "EN", "whisper"), durationSeconds: 240, audioUrl: null },
    { number: 7, title: "Repetição", description: "A beleza e o terror de repetir", lang: "PT", energy: "steady", prompt: cosmicPrompt("repetition as cosmic patience, the universe repeating until we hear", "patient, spiralling, deepening, hopeful", "looping motif that evolves, layered vocal, building warmth", "PT", "steady"), durationSeconds: 240, audioUrl: null },
    { number: 8, title: "Orbit", description: "Orbitar alguém como um planeta orbita o sol", lang: "EN", energy: "raw", prompt: cosmicPrompt("orbiting someone you love from a distance, devotion without contact", "lonely, devoted, accepting, vast", "sparse, spacious, raw vocal, distant piano, orbital atmosphere", "EN", "raw"), durationSeconds: 240, audioUrl: null },
    { number: 9, title: "O Que Me Puxa", description: "A força invisível, a gravidade do que não resolvi", lang: "PT", energy: "raw", prompt: cosmicPrompt("the invisible pull of unresolved grief, gravity of what was never mourned", "heavy, surrendering, brave, descending", "minimal, deep bass, raw close-mic vocal, descent into stillness", "PT", "raw"), durationSeconds: 240, audioUrl: null },
    { number: 10, title: "Return", description: "Voltar sempre ao mesmo ponto, mas diferente", lang: "EN", energy: "anthem", prompt: cosmicPrompt("returning to the same place but changed, spiral not circle", "wise, triumphant, peaceful, arrived", "building from minimal to full, anthemic climax, powerful vocal, resolution", "EN", "anthem"), durationSeconds: 300, audioUrl: null },
  ],
};

const COSMIC_POEIRA: AlbumDef = {
  slug: "cosmic-poeira",
  title: "Poeira",
  subtitle: "Somos matéria antiga. Tudo o que sou já foi outra coisa.",
  product: "cosmic",
  color: "#1a1008",
  tracks: [
    { number: 1, title: "Carbono", description: "O carbono que já foi sol, já foi folha, agora é eu", lang: "PT", energy: "steady", prompt: cosmicPrompt("carbon cycle, atoms that were stars now forming a human body", "wondering, ancient, grateful, vast", "deep warm bass, steady rhythm, contemplative vocal, organic textures", "PT", "steady"), durationSeconds: 240, audioUrl: null },
    { number: 2, title: "Borrowed", description: "O corpo como empréstimo temporário", lang: "EN", energy: "whisper", prompt: cosmicPrompt("the body as a temporary loan from the universe, every cell borrowed", "humble, grateful, impermanent, tender", "soft piano, spacious reverb, gentle vocal, delicate production", "EN", "whisper"), durationSeconds: 240, audioUrl: null },
    { number: 3, title: "Cinza", description: "A cinza como fertilidade, não como fim", lang: "PT", energy: "steady", prompt: cosmicPrompt("ash as fertility, destruction as preparation for new life", "hopeful, grounded, earthy, resilient", "warm acoustic, earthy percussion, strong vocal, organic warmth", "PT", "steady"), durationSeconds: 240, audioUrl: null },
    { number: 4, title: "The River Was Here", description: "Este vale foi rio, este osso foi pedra", lang: "EN", energy: "steady", prompt: cosmicPrompt("geological memory, this valley was a river, everything was something else", "ancient, patient, geological, vast", "flowing textures, patient rhythm, storytelling vocal, water sounds", "EN", "steady"), durationSeconds: 240, audioUrl: null },
    { number: 5, title: "Herança de Estrelas", description: "Herdar matéria de supernovas", lang: "PT", energy: "anthem", prompt: cosmicPrompt("inheriting matter from supernovas, iron in blood from dying stars", "triumphant, cosmic, connected, awed", "building anthem, strings, powerful vocal, cosmic grandeur", "PT", "anthem"), durationSeconds: 270, audioUrl: null },
    { number: 6, title: "Compost", description: "A decomposição como acto sagrado", lang: "EN", energy: "steady", prompt: cosmicPrompt("decomposition as sacred creation, compost as holy process", "earthy, humble, accepting, cyclical", "organic textures, warm bass, grounded vocal, earth-toned production", "EN", "steady"), durationSeconds: 240, audioUrl: null },
    { number: 7, title: "Argila", description: "Ser moldada e remoldada, nunca a forma final", lang: "PT", energy: "raw", prompt: cosmicPrompt("being shaped like clay, never the final form, imperfection as gold", "vulnerable, accepting, evolving, beautiful", "minimal piano, raw vocal, spacious, kintsugi tenderness", "PT", "raw"), durationSeconds: 240, audioUrl: null },
    { number: 8, title: "Bones Remember", description: "Os ossos guardam memória de outras vidas", lang: "EN", energy: "whisper", prompt: cosmicPrompt("bones carrying memory from past lives, the body remembering what the mind forgot", "haunting, ancestral, deep, somatic", "deep drone, bone-like percussion, intimate vocal, ancient textures", "EN", "whisper"), durationSeconds: 240, audioUrl: null },
    { number: 9, title: "Devolver", description: "Devolver ao universo o que foi emprestado", lang: "PT", energy: "whisper", prompt: cosmicPrompt("returning borrowed atoms to the universe, death as returning a library book", "peaceful, grateful, accepting, open", "soft piano, gentle strings, peaceful vocal, release", "PT", "whisper"), durationSeconds: 240, audioUrl: null },
    { number: 10, title: "Dust", description: "Poeira que dançou, que amou, que bastou", lang: "EN", energy: "steady", prompt: cosmicPrompt("dust as identity, humility as amazement, being dust that can open its eyes", "humble, amused, profound, grounded", "warm production, gentle groove, honest vocal, earned simplicity", "EN", "steady"), durationSeconds: 240, audioUrl: null },
  ],
};

const COSMIC_VASTO: AlbumDef = {
  slug: "cosmic-vasto",
  title: "Vasto",
  subtitle: "O medo e a beleza de ser pequena. A vertigem de existir.",
  product: "cosmic",
  color: "#0a0a2e",
  tracks: [
    { number: 1, title: "Vertigem", description: "A vertigem de existir, de olhar para cima", lang: "PT", energy: "steady", prompt: cosmicPrompt("vertigo of existing, looking up at infinite sky", "dizzy, awed, humbled, alive", "swirling textures, building intensity, breathless vocal, cosmic vertigo", "PT", "steady"), durationSeconds: 240, audioUrl: null },
    { number: 2, title: "Small", description: "A beleza de ser pequena, o alívio de não importar", lang: "EN", energy: "whisper", prompt: cosmicPrompt("the beauty of being small, relief of insignificance", "relieved, free, peaceful, amused", "gentle, spacious, soft vocal, minimalist, freedom", "EN", "whisper"), durationSeconds: 240, audioUrl: null },
    { number: 3, title: "Céu Aberto", description: "Deitar no chão e olhar para o céu até desaparecer", lang: "PT", energy: "whisper", prompt: cosmicPrompt("lying on the ground looking up until you disappear into the sky", "vast, dissolving, peaceful, childlike", "ambient pads, open space, gentle vocal, sky-wide production", "PT", "whisper"), durationSeconds: 240, audioUrl: null },
    { number: 4, title: "Infinite Tuesday", description: "O infinito numa terça-feira normal", lang: "EN", energy: "steady", prompt: cosmicPrompt("infinity appearing in the mundane, cosmic experience while peeling an orange", "wry, surprised, ordinary-sacred, warm", "acoustic guitar, conversational vocal, warm, kitchen-cosmic", "EN", "steady"), durationSeconds: 240, audioUrl: null },
    { number: 5, title: "Humilde", description: "A humildade como libertação", lang: "PT", energy: "steady", prompt: cosmicPrompt("humility as freedom not weakness, being exactly the right size", "grounded, dignified, free, honest", "earthy rhythm, grounded bass, strong vocal, rooted production", "PT", "steady"), durationSeconds: 240, audioUrl: null },
    { number: 6, title: "The View From Here", description: "A vista do sítio mais pequeno do universo", lang: "EN", energy: "whisper", prompt: cosmicPrompt("seeing earth from space, perspective that makes everything kind", "cosmic perspective, gentle, compassionate, vast", "spacious ambient, distant vocal, cosmic reverb, gentle wonder", "EN", "whisper"), durationSeconds: 240, audioUrl: null },
    { number: 7, title: "Grão", description: "Um grão de areia que é o universo inteiro", lang: "PT", energy: "raw", prompt: cosmicPrompt("a grain of sand containing the universe, small is complete", "simple, profound, still, accepting", "minimal, raw vocal, single instrument, vast silence", "PT", "raw"), durationSeconds: 240, audioUrl: null },
    { number: 8, title: "Overwhelm", description: "Ser esmagada pela beleza, não pela dor", lang: "EN", energy: "anthem", prompt: cosmicPrompt("overwhelmed by beauty not pain, crying from grace", "overwhelmed, cracked open, grateful, raw", "building from quiet to powerful, swelling strings, cathartic vocal", "EN", "anthem"), durationSeconds: 270, audioUrl: null },
    { number: 9, title: "Respiro", description: "Uma respiração que contém tudo", lang: "PT", energy: "whisper", prompt: cosmicPrompt("one breath containing everything, breathing as proof of deserving to exist", "meditative, present, grateful, universal", "breath textures, minimal piano, meditative vocal, silence", "PT", "whisper"), durationSeconds: 240, audioUrl: null },
    { number: 10, title: "Vast", description: "Vasta por dentro, pequena por fora", lang: "EN", energy: "steady", prompt: cosmicPrompt("vast on the inside, small on the outside, inner universe", "vast, contained, powerful, quiet", "deep production, expansive pads, intimate vocal, inner cosmos", "EN", "steady"), durationSeconds: 240, audioUrl: null },
  ],
};

const COSMIC_SINAL: AlbumDef = {
  slug: "cosmic-sinal",
  title: "Sinal",
  subtitle: "Mensagens que não vêm em palavras. O corpo sabe primeiro.",
  product: "cosmic",
  color: "#1a0a20",
  tracks: [
    { number: 1, title: "Arrepio", description: "O arrepio que não tem causa — o corpo a avisar", lang: "PT", energy: "whisper", prompt: cosmicPrompt("goosebumps without cause, the body receiving signals", "alert, mysterious, somatic, trusting", "subtle textures, shiver sounds, intimate vocal, mysterious warmth", "PT", "whisper"), durationSeconds: 240, audioUrl: null },
    { number: 2, title: "The Dream That Repeats", description: "O sonho que se repete todas as noites", lang: "EN", energy: "whisper", prompt: cosmicPrompt("recurring dream, the message you refuse to read, the door you never open", "haunting, patient, insistent, dreamlike", "dreamy reverb, soft piano, ethereal vocal, nocturnal textures", "EN", "whisper"), durationSeconds: 240, audioUrl: null },
    { number: 3, title: "Onze Onze", description: "Ver sempre o mesmo número — sinais no relógio", lang: "PT", energy: "steady", prompt: cosmicPrompt("seeing 11:11 everywhere, signs in numbers, synchronicity", "curious, alert, connected, wondering", "steady pulse, clockwork textures, warm vocal, pattern-like rhythm", "PT", "steady"), durationSeconds: 240, audioUrl: null },
    { number: 4, title: "Gut", description: "O estômago que sabe antes da cabeça", lang: "EN", energy: "steady", prompt: cosmicPrompt("gut feeling, the brain in the belly, intuition as neuroscience", "visceral, grounded, knowing, primal", "deep bass, gut-like pulse, grounded vocal, body-centred production", "EN", "steady"), durationSeconds: 240, audioUrl: null },
    { number: 5, title: "Pressentimento", description: "Sentir antes de saber — o corpo como antena", lang: "PT", energy: "raw", prompt: cosmicPrompt("premonition, feeling before knowing, the body as antenna", "alert, ancestral, raw, trusting", "minimal, raw vocal, sparse production, tension and release", "PT", "raw"), durationSeconds: 240, audioUrl: null },
    { number: 6, title: "Birds", description: "Os pássaros como mensageiros", lang: "EN", energy: "steady", prompt: cosmicPrompt("birds as messengers, reading flight patterns, signs in nature", "observant, ancient, outdoor, wise", "natural textures, gentle rhythm, storytelling vocal, organic", "EN", "steady"), durationSeconds: 240, audioUrl: null },
    { number: 7, title: "O Cheiro", description: "O cheiro que aparece do nada e traz uma pessoa", lang: "PT", energy: "whisper", prompt: cosmicPrompt("phantom smell of a dead loved one, perfume appearing from nowhere", "haunting, tender, grieving, comforted", "soft piano, nostalgic warmth, emotional vocal, gentle grief", "PT", "whisper"), durationSeconds: 240, audioUrl: null },
    { number: 8, title: "Déjà Vu", description: "Já vivi isto — o tempo dobrado", lang: "EN", energy: "steady", prompt: cosmicPrompt("déjà vu, time folding, the glitch where the loop shows", "disorienting, curious, mind-bending, playful", "looping elements, glitch textures, intriguing vocal, time-bent production", "EN", "steady"), durationSeconds: 240, audioUrl: null },
    { number: 9, title: "A Voz", description: "A voz interior que fala baixo mas nunca mente", lang: "PT", energy: "raw", prompt: cosmicPrompt("inner voice, the quiet truth that speaks only once, intuition", "still, honest, powerful, intimate", "silence as instrument, raw vocal, minimal piano, profound stillness", "PT", "raw"), durationSeconds: 240, audioUrl: null },
    { number: 10, title: "Signs", description: "Todos os sinais que ignoramos e os que seguimos", lang: "EN", energy: "anthem", prompt: cosmicPrompt("signs everywhere, the universe in conversation, learning to notice", "open, grateful, declarative, awake", "building anthem, full arrangement, powerful vocal, awakening", "EN", "anthem"), durationSeconds: 300, audioUrl: null },
  ],
};

const COSMIC_ETER: AlbumDef = {
  slug: "cosmic-eter",
  title: "Éter",
  subtitle: "O invisível que se sente. O que vive entre os corpos, entre as palavras.",
  product: "cosmic",
  color: "#0a1628",
  tracks: [
    { number: 1, title: "Entre", description: "O espaço entre duas pessoas numa sala", lang: "PT", energy: "whisper", prompt: cosmicPrompt("the space between two people in a room, the invisible field", "tense, electric, intimate, unnamed", "soft ambient pads, subtle tension strings, close-mic vocal, breath sounds", "PT", "whisper"), durationSeconds: 240, audioUrl: null },
    { number: 2, title: "The Pause", description: "A pausa entre duas notas de música", lang: "EN", energy: "whisper", prompt: cosmicPrompt("the pause between two musical notes, sacred silence", "still, suspended, holy emptiness", "piano with long silences, reverb, spacious production, minimal", "EN", "whisper"), durationSeconds: 240, audioUrl: null },
    { number: 3, title: "Invisível", description: "O que não se vê mas se sente na pele", lang: "PT", energy: "steady", prompt: cosmicPrompt("the invisible felt on the skin, goosebumps without cause", "mysterious, somatic, knowing, electric", "warm bass, subtle percussion, intimate vocal, mysterious textures", "PT", "steady"), durationSeconds: 240, audioUrl: null },
    { number: 4, title: "Thin Air", description: "Respirar algo que não tem nome", lang: "EN", energy: "whisper", prompt: cosmicPrompt("breathing something nameless, the substance between things", "ethereal, wondering, childlike awe", "airy synths, breath textures, floating vocal, spacious", "EN", "whisper"), durationSeconds: 240, audioUrl: null },
    { number: 5, title: "O Que Fica", description: "Quando a sala esvazia, o que permanece", lang: "PT", energy: "raw", prompt: cosmicPrompt("what remains when everyone leaves, the warmth in empty chairs", "tender, melancholic, grateful, present", "solo piano, raw vocal, minimal, silence as instrument", "PT", "raw"), durationSeconds: 240, audioUrl: null },
    { number: 6, title: "Gravity Between", description: "A gravidade entre dois corpos que se atraem", lang: "EN", energy: "steady", prompt: cosmicPrompt("gravitational pull between two bodies, attraction as physics", "magnetic, yearning, physical, inevitable", "deep bass pulse, warm strings, building tension, embodied vocal", "EN", "steady"), durationSeconds: 240, audioUrl: null },
    { number: 7, title: "Tecido", description: "O tecido invisível que liga tudo", lang: "PT", energy: "steady", prompt: cosmicPrompt("invisible fabric connecting everything, quantum field as thread", "connected, vast, tender, woven", "layered textures, warm pads, organic percussion, weaving vocal lines", "PT", "steady"), durationSeconds: 240, audioUrl: null },
    { number: 8, title: "The Space You Left", description: "O espaço que alguém deixou quando partiu", lang: "EN", energy: "raw", prompt: cosmicPrompt("the shape of someone's absence, living in the space they left", "grief, tenderness, presence in absence", "sparse piano, raw vocal, silence, achingly minimal", "EN", "raw"), durationSeconds: 240, audioUrl: null },
    { number: 9, title: "Quase", description: "Quase tocar, quase dizer, quase ser", lang: "PT", energy: "pulse", prompt: cosmicPrompt("almost touching, almost saying, the weight of almost", "urgent, restless, brave, decisive", "building rhythm, driving pulse, determined vocal, momentum", "PT", "pulse"), durationSeconds: 240, audioUrl: null },
    { number: 10, title: "Ether", description: "O éter como elemento, como presença", lang: "EN", energy: "whisper", prompt: cosmicPrompt("ether as the fifth element, the substance of space itself", "ancient, scientific, mystical, humming", "deep drone, ethereal pads, choir textures, contemplative vocal", "EN", "whisper"), durationSeconds: 300, audioUrl: null },
  ],
};

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
  // Espirituais (10 albums)
  TRAVESSIA,
  HUMUS,
  FOLEGO,
  DEMORA,
  CORPO_CELESTE,
  CORRENTEZA,
  O_QUE_RESTA,
  LIMIAR,
  O_CIRCULO,
  O_GESTO,
  // Vida
  VIDA_SANGUE_ACESO,
  VIDA_SILENCIO_FERTIL,
  VIDA_O_TEAR,
  VIDA_RENDICAO,
  VIDA_LUZ_CRUA,
  VIDA_PAO_SAL,
  VIDA_DERIVA,
  VIDA_CORPO_A_CORPO,
  VIDA_DILUVIO_MANSO,
  VIDA_LAVA_QUIETA,
  VIDA_ANCORA,
  VIDA_COMPANHIA_PROPRIA,
  VIDA_PORCELANA,
  VIDA_RESCALDO,
  VIDA_OFERENDA,
  VIDA_LINHAGEM,
  VIDA_MARE_VIVA,
  VIDA_DESCALCA,
  VIDA_BRASA_LENTA,
  VIDA_RAIZ_MUDA,
  VIDA_RESSONANCIA,
  VIDA_PENUMBRA,
  // Cosmic
  COSMIC_VIAGEM,
  // Romance
  ROMANCE_PELE,
  ROMANCE_CARTA,
  ROMANCE_SAUDADE,
  ROMANCE_FOGO_LENTO,
  ROMANCE_NINHO,
  COSMIC_POEIRA,
  COSMIC_VASTO,
  COSMIC_SINAL,
  COSMIC_ETER,
  COSMIC_ORBITA,
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
  marrabenta: { label: "Marrabenta", emoji: "m", color: "bg-orange-50 text-orange-700" },
  afrobeat: { label: "Afrobeat", emoji: "a", color: "bg-amber-50 text-amber-700" },
  bossa: { label: "Bossa Nova", emoji: "b", color: "bg-cyan-50 text-cyan-700" },
  jazz: { label: "Jazz", emoji: "j", color: "bg-indigo-50 text-indigo-600" },
  folk: { label: "Folk", emoji: "f", color: "bg-stone-50 text-stone-600" },
  house: { label: "House", emoji: "h", color: "bg-pink-50 text-pink-600" },
  gospel: { label: "Gospel", emoji: "g", color: "bg-yellow-50 text-yellow-700" },
};
