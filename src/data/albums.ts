/**
 * Albums de Musica — Sete Veus
 *
 * Estilo: World music organica (Aruna Serena / Vozes da Terra)
 * — Instrumentos: kalimba, mbira, kora, djembe, berimbau, cordas, flauta
 * — Vocais: harmonias, cantos, humming, respiracao
 * — Natureza: agua, vento, fogo, terra
 * — Emocional: segue o arco do conteudo
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
// Helpers para prompts musicais
// ─────────────────────────────────────────────

function espelhoPrompt(veu: string, emotion: string, instruments: string): string {
  return `World music, organic, ${emotion}. Style of Aruna Serena, Vozes da Terra. ${instruments}. Soft female vocal harmonics, no lyrics. African-Portuguese fusion. Warm, intimate, meditative. Theme: ${veu}.`;
}

function noPrompt(veu: string, emotion: string, instruments: string): string {
  return `World music, relational, ${emotion}. Style of Aruna Serena, Vozes da Terra. ${instruments}. Two-voice harmony, call and response. African-Portuguese fusion. Intimate, tender. Theme: ${veu}.`;
}

function cursoPrompt(territory: string, emotion: string, instruments: string): string {
  return `World music, transformative, ${emotion}. Style of Aruna Serena, Vozes da Terra. ${instruments}. Soft vocal textures, no lyrics. Organic, grounded, evolving. Territory: ${territory}.`;
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
    { number: 1, title: "Despertar", description: "O momento antes da pergunta", prompt: espelhoPrompt("ilusao, awakening", "dreamy, ethereal, questioning", "kalimba, soft strings, wind chimes"), durationSeconds: 240, audioUrl: null },
    { number: 2, title: "O Casaco que Nunca Escolhi", description: "A vida construida por outros", prompt: espelhoPrompt("inherited life, not mine", "melancholic, gentle tension", "mbira, cello, gentle percussion"), durationSeconds: 240, audioUrl: null },
    { number: 3, title: "Automatismos", description: "Os gestos que se repetem sem pensar", prompt: espelhoPrompt("autopilot, repetition", "hypnotic, circular, slowly awakening", "djembe pattern, kora, humming"), durationSeconds: 240, audioUrl: null },
    { number: 4, title: "A Pergunta do Cafe", description: "Quando foi que eu escolhi isto?", prompt: espelhoPrompt("small question, big shift", "curious, tender, dawning realization", "acoustic guitar, kalimba, breath sounds"), durationSeconds: 240, audioUrl: null },
    { number: 5, title: "Corpo que Sabe", description: "O corpo ja sabia antes da mente", prompt: espelhoPrompt("body wisdom, somatic", "grounding, warm, pulsing", "berimbau, heartbeat rhythm, soft flute"), durationSeconds: 240, audioUrl: null },
    { number: 6, title: "Honestidade Quieta", description: "Ver sem dramatizar", prompt: espelhoPrompt("quiet honesty, soft truth", "peaceful, still, accepting", "solo kora, distant choir, water sounds"), durationSeconds: 240, audioUrl: null },
    { number: 7, title: "O Veu Cai", description: "O primeiro reconhecimento", prompt: espelhoPrompt("veil falling, first sight", "liberating, tender, spacious", "full ensemble, rising harmonics, open resolution"), durationSeconds: 300, audioUrl: null },
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
    { number: 1, title: "Cuidado", description: "A palavra que protege e aprisiona", prompt: espelhoPrompt("caution, protection, cage", "tense, careful, restrained", "muted percussion, low strings, whispered breath"), durationSeconds: 240, audioUrl: null },
    { number: 2, title: "Palavras Medidas", description: "Medir cada silaba antes de falar", prompt: espelhoPrompt("measured words, self-censorship", "contained, precise, anxious undertone", "plucked strings, soft tabla, silence gaps"), durationSeconds: 240, audioUrl: null },
    { number: 3, title: "Paralisia Bonita", description: "A indecisao que parece prudencia", prompt: espelhoPrompt("beautiful paralysis, disguised fear", "frozen, elegant stillness", "sustained drone, kalimba drops, wind"), durationSeconds: 240, audioUrl: null },
    { number: 4, title: "O Estomago Sabe", description: "Quando o corpo fala primeiro", prompt: espelhoPrompt("gut feeling, body alarm", "visceral, uneasy, then softening", "low djembe, berimbau, rising warmth"), durationSeconds: 240, audioUrl: null },
    { number: 5, title: "Mensageiro", description: "O medo como guia, nao inimigo", prompt: espelhoPrompt("fear as messenger, not enemy", "compassionate, understanding, spacious", "kora melody, gentle choir, earth sounds"), durationSeconds: 240, audioUrl: null },
    { number: 6, title: "Ouco-te Mas Vou", description: "Coragem quotidiana", prompt: espelhoPrompt("daily courage, moving forward", "brave, warm, determined", "full rhythm, rising melody, vocal strength"), durationSeconds: 240, audioUrl: null },
    { number: 7, title: "Devagar", description: "Iluminar sem pressa", prompt: espelhoPrompt("slow illumination, gentle seeing", "patient, luminous, at peace", "open harmonics, fading into warmth"), durationSeconds: 300, audioUrl: null },
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
    { number: 1, title: "A Voz Baixa", description: "Devias estar a fazer outra coisa", prompt: espelhoPrompt("inner critic, guilt voice", "heavy, subdued, whispering", "low cello, muted mbira, breath"), durationSeconds: 240, audioUrl: null },
    { number: 2, title: "Virtude Disfarçada", description: "Quando dar e obrigacao invisivel", prompt: espelhoPrompt("disguised duty, false virtue", "burdened, noble sadness", "slow kora, weighted percussion, sighing winds"), durationSeconds: 240, audioUrl: null },
    { number: 3, title: "Alivio ou Alegria", description: "A diferenca entre querer e dever", prompt: espelhoPrompt("relief vs joy, duty vs desire", "contrasting, questioning, tender", "two melodic lines interweaving, kalimba and flute"), durationSeconds: 240, audioUrl: null },
    { number: 4, title: "Heranca", description: "A culpa que nao e tua", prompt: espelhoPrompt("inherited guilt, ancestral weight", "ancient, heavy then releasing", "ancestral percussion, vocal lament, gradual lightening"), durationSeconds: 240, audioUrl: null },
    { number: 5, title: "Merecer", description: "Merecer nao se conquista", prompt: espelhoPrompt("deserving, inherent worth", "warm, affirming, gentle", "warm strings, mbira, heartbeat rhythm"), durationSeconds: 240, audioUrl: null },
    { number: 6, title: "Pousar", description: "Posso pousar isto", prompt: espelhoPrompt("laying down burden, release", "liberating, exhaling, light", "descending melody, open space, bird sounds"), durationSeconds: 240, audioUrl: null },
    { number: 7, title: "Ternura", description: "Desmontar sem te castigar", prompt: espelhoPrompt("tenderness, self-compassion", "gentle, loving, free", "full ensemble, warm resolution, vocal harmonics"), durationSeconds: 300, audioUrl: null },
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
    { number: 1, title: "Mascaras", description: "Os papeis que vestem a pele", prompt: espelhoPrompt("masks, roles, personas", "layered, complex, shifting", "multiple percussion patterns, morphing melody"), durationSeconds: 240, audioUrl: null },
    { number: 2, title: "Quem Es", description: "Quando ninguem te esta a ver", prompt: espelhoPrompt("alone, unmasked, raw", "vulnerable, bare, honest", "solo instrument, silence, breath"), durationSeconds: 240, audioUrl: null },
    { number: 3, title: "Armadura", description: "A certeza que parece forca", prompt: espelhoPrompt("armor, false strength", "rigid, protective, slowly softening", "metallic percussion, then melting into warmth"), durationSeconds: 240, audioUrl: null },
    { number: 4, title: "Espelho Interior", description: "Olhar sem julgar", prompt: espelhoPrompt("inner mirror, self-seeing", "reflective, still water, contemplative", "water sounds, kora reflection, gentle harmonics"), durationSeconds: 240, audioUrl: null },
    { number: 5, title: "Sem Nome", description: "O que sobra quando tiras tudo", prompt: espelhoPrompt("nameless essence, pure being", "minimal, essential, spacious", "single note, silence, breath, distant mbira"), durationSeconds: 240, audioUrl: null },
    { number: 6, title: "Escolher a Mascara", description: "Usar sem colar a pele", prompt: espelhoPrompt("conscious choice, freedom in roles", "playful, light, aware", "rhythmic kalimba, dancing melody, joy"), durationSeconds: 240, audioUrl: null },
    { number: 7, title: "Eu Sem Justificacao", description: "Existir sem provar nada", prompt: espelhoPrompt("existing without proof, pure presence", "peaceful, whole, complete", "open harmonics, grounding bass, vocal peace"), durationSeconds: 300, audioUrl: null },
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
    { number: 1, title: "Segurar", description: "A necessidade de ter tudo no lugar", prompt: espelhoPrompt("holding tight, control", "tense, ordered, gripping", "tight rhythm, precise percussion, contained"), durationSeconds: 240, audioUrl: null },
    { number: 2, title: "Fiavel", description: "A pessoa a quem todos recorrem", prompt: espelhoPrompt("reliable, always available, cost", "noble but exhausted", "steady rhythm, carrying melody, weighted"), durationSeconds: 240, audioUrl: null },
    { number: 3, title: "Tres da Manha", description: "A insonia de repassar tudo", prompt: espelhoPrompt("3am insomnia, mental loops", "restless, circular, dark", "night sounds, repetitive motif, uneasy calm"), durationSeconds: 240, audioUrl: null },
    { number: 4, title: "Ilusao de Seguranca", description: "Se eu controlo, nada de mau acontece", prompt: espelhoPrompt("illusion of safety, false security", "fragile certainty, glass-like", "crystalline sounds, tension, cracking"), durationSeconds: 240, audioUrl: null },
    { number: 5, title: "Confiar", description: "Aceitar que nao controlamos o resultado", prompt: espelhoPrompt("trust, surrender, letting go", "opening, releasing, flowing", "water sounds, flowing kora, loosening rhythm"), durationSeconds: 240, audioUrl: null },
    { number: 6, title: "Largar", description: "O mundo continua quando nao fazes", prompt: espelhoPrompt("letting go, world continues", "relief, surprise, lightness", "open space, bird sounds, free melody"), durationSeconds: 240, audioUrl: null },
    { number: 7, title: "Respirar", description: "Na respiracao, ha liberdade", prompt: espelhoPrompt("breathing, freedom", "free, expansive, peaceful", "breath rhythm, open harmonics, vast soundscape"), durationSeconds: 300, audioUrl: null },
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
    { number: 1, title: "Preencher", description: "Encher o tempo para nao ouvir o vazio", prompt: espelhoPrompt("filling, avoiding emptiness", "busy, scattered, anxious", "fast light percussion, fragmented melody"), durationSeconds: 240, audioUrl: null },
    { number: 2, title: "O Que Falta", description: "O que nao se compra nem se agenda", prompt: espelhoPrompt("what's missing, unnamed longing", "yearning, deep, searching", "searching kora melody, longing vocal, depth"), durationSeconds: 240, audioUrl: null },
    { number: 3, title: "Mais Pequena", description: "Querer menos para nao incomodar", prompt: espelhoPrompt("shrinking, making yourself small", "diminished, quiet, hidden", "soft, small sounds, contained, barely there"), durationSeconds: 240, audioUrl: null },
    { number: 4, title: "A Hora Vazia", description: "Uma hora sem nada", prompt: espelhoPrompt("empty hour, sitting with nothing", "spacious, uncomfortable then peaceful", "silence, then slow emergence of sound, minimal"), durationSeconds: 240, audioUrl: null },
    { number: 5, title: "Esvaziar", description: "Parar de fingir que esta cheia", prompt: espelhoPrompt("emptying, authentic void", "releasing, honest, raw", "descending melody, letting go, breath"), durationSeconds: 240, audioUrl: null },
    { number: 6, title: "Desejo Verdadeiro", description: "O que a tua vida esta a pedir", prompt: espelhoPrompt("true desire, authentic wanting", "warm, deep, knowing", "rich warm tones, grounding bass, gentle fire"), durationSeconds: 240, audioUrl: null },
    { number: 7, title: "Espaco", description: "O vazio nao e ausencia — e espaco", prompt: espelhoPrompt("space, not absence, room for desire", "open, vast, potential", "vast soundscape, open harmonics, possibility"), durationSeconds: 300, audioUrl: null },
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
    { number: 1, title: "Encolher para Caber", description: "Adaptar, moldar, perder a forma", prompt: espelhoPrompt("shrinking to fit, losing shape", "constrained, adapting, diminishing", "compressed sounds, constrained melody, tight"), durationSeconds: 240, audioUrl: null },
    { number: 2, title: "Juntos Mas Sozinhos", description: "A solidao dentro da relacao", prompt: espelhoPrompt("together but alone, relational loneliness", "lonely, disconnected, aching", "two separate melodies, not meeting, sadness"), durationSeconds: 240, audioUrl: null },
    { number: 3, title: "A Pergunta Evitada", description: "Se eu fosse so eu, quem seria?", prompt: espelhoPrompt("avoided question, who am I alone", "brave, trembling, honest", "single voice rising, tentative, courageous"), durationSeconds: 240, audioUrl: null },
    { number: 4, title: "Separar", description: "Criar espaco, nao destruir", prompt: espelhoPrompt("separation as creation, not destruction", "bittersweet, necessary, tender", "melody splitting into two, both beautiful"), durationSeconds: 240, audioUrl: null },
    { number: 5, title: "O Que Fica", description: "So sai o que ja nao servia", prompt: espelhoPrompt("what remains, essential stays", "clear, pure, distilled", "minimal, clear tones, essential beauty"), durationSeconds: 240, audioUrl: null },
    { number: 6, title: "Regresso", description: "O regresso a ti mesma", prompt: espelhoPrompt("homecoming to self, return", "warm, arriving, recognition", "returning melody, home, warmth, recognition"), durationSeconds: 240, audioUrl: null },
    { number: 7, title: "Sete Veus", description: "Sete camadas, sete regressos", prompt: espelhoPrompt("seven veils, seven returns, completion", "complete, whole, at peace, celebratory", "full ensemble, all themes woven, peaceful resolution"), durationSeconds: 300, audioUrl: null },
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
  { number: 1, title: "A Mae que Viu", description: "Helena sempre soube", prompt: noPrompt("mother who always knew", "patient, aching, maternal", "warm cello, mbira, maternal humming"), durationSeconds: 240 },
  { number: 2, title: "Anos de Espera", description: "Esperar que a filha veja", prompt: noPrompt("years of waiting, patient love", "slow, patient, enduring", "sustained drone, patient kora, time passing"), durationSeconds: 240 },
  { number: 3, title: "Duas Mulheres", description: "Mae e filha, frente a frente", prompt: noPrompt("mother daughter, face to face", "raw, vulnerable, brave", "two voices meeting, tentative harmony"), durationSeconds: 240 },
  { number: 4, title: "O Que Nunca Foi Dito", description: "Palavras guardadas uma vida", prompt: noPrompt("unspoken words, lifetime of silence", "heavy, breaking open", "silence breaking, words as melody, release"), durationSeconds: 240 },
  { number: 5, title: "Desatar", description: "O no que se solta", prompt: noPrompt("untying the knot, release", "freeing, tender, relieved", "loosening rhythm, opening melody, relief"), durationSeconds: 300 },
]);

const NO_SILENCIO = noAlbum(2, "no-silencio", "O No do Silencio", "O que o medo calou entre eles", [
  { number: 1, title: "O Que Nao Disse", description: "Rui e Ana e o silencio entre eles", prompt: noPrompt("unsaid words between lovers", "tense, loaded silence, aching", "two instruments in silence, tension, longing"), durationSeconds: 240 },
  { number: 2, title: "Proteger ou Calar", description: "Quando proteger e esconder", prompt: noPrompt("protection as hiding, love as silence", "conflicted, protective, lonely", "guarded melody, restrained percussion"), durationSeconds: 240 },
  { number: 3, title: "A Primeira Palavra", description: "Quebrar o silencio", prompt: noPrompt("breaking silence, first word", "brave, trembling, hopeful", "first note breaking silence, tentative dialogue"), durationSeconds: 240 },
  { number: 4, title: "Ouvir de Verdade", description: "Quando ouvir e mais que escutar", prompt: noPrompt("truly hearing, deep listening", "open, receptive, present", "call and response, deepening, understanding"), durationSeconds: 240 },
  { number: 5, title: "Voz", description: "Encontrar a voz que calaste", prompt: noPrompt("finding voice, speaking truth", "empowered, clear, connected", "two voices in harmony, strength, clarity"), durationSeconds: 300 },
]);

const NO_SACRIFICIO = noAlbum(3, "no-sacrificio", "O No do Sacrificio", "A culpa disfarçada de entrega", [
  { number: 1, title: "Dar Ate Esvaziar", description: "Filipe e Luisa e a entrega sem retorno", prompt: noPrompt("giving until empty, selfless sacrifice", "depleted, noble, exhausted", "diminishing melody, giving away notes"), durationSeconds: 240 },
  { number: 2, title: "Amor ou Divida", description: "Quando amar parece pagar", prompt: noPrompt("love as debt, paying off guilt", "transactional, weighted, sad", "counting rhythm, weighted bass, heaviness"), durationSeconds: 240 },
  { number: 3, title: "Receber", description: "Aprender a receber sem culpa", prompt: noPrompt("learning to receive, accepting grace", "opening, softening, grateful", "receiving melody, warmth flowing in, gratitude"), durationSeconds: 240 },
  { number: 4, title: "Dois Inteiros", description: "Dois que dao por escolha", prompt: noPrompt("two whole people, chosen giving", "balanced, mutual, joyful", "balanced duet, mutual rhythm, wholeness"), durationSeconds: 240 },
  { number: 5, title: "Entrega Verdadeira", description: "Dar sem se perder", prompt: noPrompt("true giving, without losing self", "generous, free, loving", "generous melody, flowing freely, love without cost"), durationSeconds: 300 },
]);

const NO_VERGONHA = noAlbum(4, "no-vergonha", "O No da Vergonha", "A mascara que caiu entre dois estranhos", [
  { number: 1, title: "Dois Estranhos", description: "Vitor e Mariana e o encontro sem mascara", prompt: noPrompt("two strangers, unmasked meeting", "raw, exposed, curious", "two unfamiliar melodies meeting, curiosity"), durationSeconds: 240 },
  { number: 2, title: "Ver e Ser Visto", description: "A vergonha de ser reconhecido", prompt: noPrompt("being seen, shame of recognition", "vulnerable, exposed, trembling", "exposed solo, naked sound, trembling beauty"), durationSeconds: 240 },
  { number: 3, title: "Sem Papeis", description: "Quando os papeis caem entre dois", prompt: noPrompt("roles falling away, authenticity", "liberating, honest, brave", "dropping layers, simplifying, truth emerging"), durationSeconds: 240 },
  { number: 4, title: "Reconhecimento", description: "Eu vejo-te. E tu a mim.", prompt: noPrompt("mutual recognition, seeing each other", "connecting, warm, deep", "two melodies finding harmony, recognition"), durationSeconds: 240 },
  { number: 5, title: "Sem Vergonha", description: "Existir sem pedir desculpa", prompt: noPrompt("shameless existence, unapologetic being", "free, proud, tender", "proud melody, standing tall, tender strength"), durationSeconds: 300 },
]);

const NO_SOLIDAO = noAlbum(5, "no-solidao", "O No da Solidao", "O controlo que isolou quem mais amava", [
  { number: 1, title: "Ilha", description: "Isabel e Pedro e o isolamento do controlo", prompt: noPrompt("island, isolation through control", "isolated, surrounded, lonely", "solo instrument surrounded by silence"), durationSeconds: 240 },
  { number: 2, title: "Segurar o Outro", description: "Quando cuidar e aprisionar", prompt: noPrompt("holding the other, care as cage", "gripping, suffocating love", "tight rhythm around a trapped melody"), durationSeconds: 240 },
  { number: 3, title: "Soltar", description: "Abrir as maos", prompt: noPrompt("releasing grip, opening hands", "releasing, letting flow", "opening rhythm, releasing notes, breathing"), durationSeconds: 240 },
  { number: 4, title: "Lado a Lado", description: "Estar junto sem segurar", prompt: noPrompt("side by side, together without holding", "parallel, peaceful, trusting", "two parallel melodies, respectful space, trust"), durationSeconds: 240 },
  { number: 5, title: "Ponte", description: "A solidao que se transforma em ponte", prompt: noPrompt("solitude becoming bridge, connection", "connecting, transforming, hopeful", "bridge between two melodies, meeting in the middle"), durationSeconds: 300 },
]);

const NO_VAZIO = noAlbum(6, "no-vazio", "O No do Vazio", "O desejo que esvaziou a amizade", [
  { number: 1, title: "Amigas", description: "Lena e Sofia e o que o desejo fez entre elas", prompt: noPrompt("friendship, what desire did to it", "nostalgic, aching, lost", "nostalgic melody, fading harmony, loss"), durationSeconds: 240 },
  { number: 2, title: "O Buraco", description: "O vazio que nenhuma relacao preenche", prompt: noPrompt("void no relationship fills", "empty, echoing, honest", "hollow sounds, echo, vast empty space"), durationSeconds: 240 },
  { number: 3, title: "Sem Preencher", description: "Estar no vazio sem fugir", prompt: noPrompt("sitting with emptiness, not fleeing", "still, present, brave", "minimal, still, present, courageous silence"), durationSeconds: 240 },
  { number: 4, title: "Reencontro", description: "Reencontrar sem exigir", prompt: noPrompt("reunion without demands, free meeting", "reconnecting, open, mature", "two melodies reconnecting, wiser, freer"), durationSeconds: 240 },
  { number: 5, title: "Amizade Verdadeira", description: "O espaco onde o desejo verdadeiro mora", prompt: noPrompt("true friendship, space for authentic desire", "genuine, warm, complete", "warm duet, complete, satisfied, peaceful"), durationSeconds: 300 },
]);

const NO_PERTENCA = noAlbum(7, "no-pertenca", "O No da Pertenca", "A separacao que reinventou o lar", [
  { number: 1, title: "O Lar que Sufocava", description: "Helena T. e Miguel C. e o lar que ja nao cabia", prompt: noPrompt("suffocating home, outgrown space", "claustrophobic, heavy, outgrown", "compressed space, heavy walls, need for air"), durationSeconds: 240 },
  { number: 2, title: "Partir", description: "A coragem de sair para encontrar", prompt: noPrompt("leaving to find, courage of departure", "brave, sad, necessary", "departure melody, brave steps, bittersweet"), durationSeconds: 240 },
  { number: 3, title: "Sozinho", description: "O vazio fertil da solidao", prompt: noPrompt("fertile solitude, alone but growing", "solitary, growing, spacious", "solo instrument growing, expanding, discovering"), durationSeconds: 240 },
  { number: 4, title: "Reinventar", description: "Construir de novo, diferente", prompt: noPrompt("rebuilding, different this time", "creative, hopeful, new", "new construction, different rhythm, hope"), durationSeconds: 240 },
  { number: 5, title: "Pertencer a Ti", description: "Pertencer comeca por dentro", prompt: noPrompt("belonging starts within, self-belonging", "whole, home, complete", "coming home melody, complete, at peace, resolution"), durationSeconds: 300 },
]);

// ─────────────────────────────────────────────
// LIVRO FILOSOFICO (1 album)
// ─────────────────────────────────────────────

const LIVRO_FILOSOFICO: Album = {
  slug: "livro-filosofico",
  title: "Os Sete Veus do Despertar",
  subtitle: "Musica para a travessia filosofica",
  product: "livro",
  color: "#8B5CF6",
  tracks: [
    { number: 1, title: "Introducao — O Convite", description: "O inicio da travessia", prompt: "World music, philosophical, opening. Aruna Serena style. Kora, soft percussion, invitation. Solemn yet warm, beginning of journey.", durationSeconds: 300, audioUrl: null },
    { number: 2, title: "Veu 1 — Ilusao", description: "O veu dourado", prompt: "World music, dreamy, golden. Kalimba, ethereal vocals, questioning. Illusion dissolving slowly.", durationSeconds: 240, audioUrl: null },
    { number: 3, title: "Veu 2 — Medo", description: "O veu verde", prompt: "World music, cautious, green. Muted percussion, careful melody. Fear as protector.", durationSeconds: 240, audioUrl: null },
    { number: 4, title: "Veu 3 — Culpa", description: "O veu rosa", prompt: "World music, weighted, rose. Heavy strings lightening. Guilt releasing.", durationSeconds: 240, audioUrl: null },
    { number: 5, title: "Veu 4 — Identidade", description: "O veu terra", prompt: "World music, grounded, earth. Djembe, berimbau, masks falling. Identity emerging.", durationSeconds: 240, audioUrl: null },
    { number: 6, title: "Veu 5 — Controlo", description: "O veu azul", prompt: "World music, fluid, blue. Water sounds, flowing kora. Control releasing.", durationSeconds: 240, audioUrl: null },
    { number: 7, title: "Veu 6 — Desejo", description: "O veu violeta", prompt: "World music, yearning, violet. Warm tones, searching melody. True desire.", durationSeconds: 240, audioUrl: null },
    { number: 8, title: "Veu 7 — Separacao", description: "O veu lavanda", prompt: "World music, homecoming, lavender. Return melody, wholeness. Coming home to self.", durationSeconds: 240, audioUrl: null },
    { number: 9, title: "Posfacio — O Espelho", description: "O olhar final", prompt: "World music, reflective, complete. Full ensemble, all themes woven. Mirror reflecting wholeness. Peaceful resolution.", durationSeconds: 300, audioUrl: null },
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
  { number: 1, title: "Espelhos Dourados", description: "O territorio onde o dinheiro mora", prompt: cursoPrompt("golden mirrors, money territory", "amber, reflective, honest", "golden kalimba, mirror-like resonance, warm amber"), durationSeconds: 240 },
  { number: 2, title: "O Extracto", description: "Olhar para os numeros sem desviar", prompt: cursoPrompt("bank statement, honest look", "confronting, grounding, brave", "grounding bass, honest melody, counting rhythm"), durationSeconds: 240 },
  { number: 3, title: "Heranca Financeira", description: "O dinheiro da tua familia", prompt: cursoPrompt("family money story, inherited beliefs", "ancestral, complex, untangling", "ancestral drums, inherited melody, untangling"), durationSeconds: 240 },
  { number: 4, title: "Merecer Abundancia", description: "Receber sem culpa", prompt: cursoPrompt("deserving abundance, receiving", "opening, generous, golden", "opening melody, flowing gold, abundance"), durationSeconds: 240 },
  { number: 5, title: "Novo Espelho", description: "O reflexo que escolhes", prompt: cursoPrompt("new mirror, chosen reflection", "clear, chosen, golden peace", "clear golden tones, chosen melody, peace"), durationSeconds: 300 },
]);

const CURSO_SANGUE_SEDA = cursoAlbum("curso-sangue-seda", "sangue-e-seda", "Sangue e Seda", "A tua mae, a tua historia", "Arvore das Raizes Visiveis", [
  { number: 1, title: "Raizes", description: "O que veio antes de ti", prompt: cursoPrompt("roots, what came before", "deep red, silky, ancient", "deep bass, silky strings, root sounds"), durationSeconds: 240 },
  { number: 2, title: "A Mae Interior", description: "A mae que carregas dentro", prompt: cursoPrompt("inner mother, carried within", "maternal, complex, tender", "maternal humming, complex harmony, tenderness"), durationSeconds: 240 },
  { number: 3, title: "Sangue", description: "O que herdaste no sangue", prompt: cursoPrompt("blood inheritance, what runs deep", "visceral, red, pulsing", "heartbeat, deep percussion, blood rhythm"), durationSeconds: 240 },
  { number: 4, title: "Seda", description: "A suavidade que repara", prompt: cursoPrompt("silk, softness that heals", "gentle, silk-like, healing", "silky strings, gentle flow, healing touch"), durationSeconds: 240 },
  { number: 5, title: "Amanhecer", description: "A arvore com raizes reorganizadas", prompt: cursoPrompt("dawn, reorganized roots, new growth", "dawn, growth, reorganized", "dawn melody, new growth, reorganized beauty"), durationSeconds: 300 },
]);

const CURSO_ARTE_INTEIREZA = cursoAlbum("curso-arte-inteireza", "a-arte-da-inteireza", "A Arte da Inteireza", "Amar sem te perderes", "Ponte entre Duas Margens", [
  { number: 1, title: "Desaparecer", description: "O momento em que te perdes no outro", prompt: cursoPrompt("disappearing in the other, losing self", "dissolving, losing shape, violet-water", "dissolving melody, water sounds, losing form"), durationSeconds: 240 },
  { number: 2, title: "Duas Margens", description: "Tu e o outro, separados mas ligados", prompt: cursoPrompt("two shores, connected yet separate", "bridging, space between, respect", "two melodies across water, bridge forming"), durationSeconds: 240 },
  { number: 3, title: "Inteira", description: "Estar completa antes de estar com alguem", prompt: cursoPrompt("whole before together, complete self", "whole, complete, self-possessed", "complete melody, self-contained, beautiful alone"), durationSeconds: 240 },
  { number: 4, title: "A Ponte", description: "Encontrar sem se perder", prompt: cursoPrompt("bridge, meeting without losing", "connected, balanced, harmonious", "balanced duet over bridge, meeting in wholeness"), durationSeconds: 300 },
]);

const CURSO_DEPOIS_FOGO = cursoAlbum("curso-depois-fogo", "depois-do-fogo", "Depois do Fogo", "Recomecar apos a destruicao", "Campo Queimado", [
  { number: 1, title: "Cinzas", description: "O que sobrou depois do fogo", prompt: cursoPrompt("ashes, aftermath of fire", "charcoal grey, devastated, still", "ash-like sounds, silence after fire, stillness"), durationSeconds: 240 },
  { number: 2, title: "Brasa", description: "O que ainda arde por dentro", prompt: cursoPrompt("ember, still burning inside", "orange ember, glowing, alive", "glowing warmth, ember-like pulsing, inner fire"), durationSeconds: 240 },
  { number: 3, title: "Broto", description: "A primeira vida nova", prompt: cursoPrompt("first sprout, new life after fire", "green shoot, fragile, hopeful", "tender new melody, fragile beauty, green growth"), durationSeconds: 240 },
  { number: 4, title: "Diferente", description: "O novo nao e o antigo — e outra coisa", prompt: cursoPrompt("different, not the old but new", "transformed, different, evolved", "transformed melody, new form, evolved beauty"), durationSeconds: 300 },
]);

const CURSO_OLHOS_ABERTOS = cursoAlbum("curso-olhos-abertos", "olhos-abertos", "Olhos Abertos", "Decidir com clareza", "Encruzilhada Infinita", [
  { number: 1, title: "Nevoeiro", description: "Quando nao se ve o caminho", prompt: cursoPrompt("fog, can't see the path", "blue fog, confused, searching", "foggy textures, searching melody, unclear"), durationSeconds: 240 },
  { number: 2, title: "Encruzilhada", description: "Muitos caminhos, nenhuma certeza", prompt: cursoPrompt("crossroads, many paths, no certainty", "multiplicity, indecision, standing still", "multiple melodic fragments, indecision, crossroads"), durationSeconds: 240 },
  { number: 3, title: "Clareza", description: "O nevoeiro que comeca a levantar", prompt: cursoPrompt("fog lifting, clarity emerging", "clearing, emerging vision, white light", "clearing sounds, emerging melody, light"), durationSeconds: 240 },
  { number: 4, title: "O Primeiro Passo", description: "A silhueta da o primeiro passo", prompt: cursoPrompt("first step, chosen direction", "decisive, brave, clear", "decisive rhythm, first step, clear direction"), durationSeconds: 300 },
]);

const CURSO_PELE_LEMBRA = cursoAlbum("curso-pele-lembra", "a-pele-lembra", "A Pele Lembra", "O corpo como territorio", "Corpo-Paisagem", [
  { number: 1, title: "Mapa do Corpo", description: "O corpo como paisagem desconhecida", prompt: cursoPrompt("body map, unknown landscape", "terracotta rose, exploring, somatic", "body percussion, exploring melody, somatic sounds"), durationSeconds: 240 },
  { number: 2, title: "Memorias na Pele", description: "O que a pele guardou", prompt: cursoPrompt("skin memories, stored sensations", "tactile, remembered, stored", "textural sounds, memory melody, touch"), durationSeconds: 240 },
  { number: 3, title: "Habitar", description: "Voltar a viver no corpo", prompt: cursoPrompt("inhabiting the body, coming home to flesh", "embodied, present, inhabited", "grounded rhythm, inhabited melody, present"), durationSeconds: 240 },
  { number: 4, title: "Corpo-Casa", description: "O corpo como lar", prompt: cursoPrompt("body as home, lived in and loved", "home, warm, belonging", "home melody, warm body sounds, belonging"), durationSeconds: 300 },
]);

const CURSO_LIMITE_SAGRADO = cursoAlbum("curso-limite-sagrado", "limite-sagrado", "Limite Sagrado", "Dizer nao sem culpa", "Muralha que Nasce do Chao", [
  { number: 1, title: "Sem Muralha", description: "Viver sem limites, sem proteccao", prompt: cursoPrompt("no walls, unprotected, boundaryless", "exposed, vulnerable, unlimited", "exposed melody, no boundaries, open vulnerability"), durationSeconds: 240 },
  { number: 2, title: "A Muralha de Luz", description: "O limite que nasce de dentro", prompt: cursoPrompt("wall of light, inner boundary", "golden luminous, strong, protecting", "luminous golden sounds, strength, inner wall"), durationSeconds: 240 },
  { number: 3, title: "A Porta", description: "O limite tem porta — tu decides quem entra", prompt: cursoPrompt("door in the wall, chosen entry", "discerning, powerful, chosen", "door opening, selective melody, power of choice"), durationSeconds: 240 },
  { number: 4, title: "Sagrado", description: "O limite como acto de amor", prompt: cursoPrompt("sacred boundary, limit as love", "sacred, loving, complete", "sacred melody, loving boundary, golden peace"), durationSeconds: 300 },
]);

const CURSO_FLORES_ESCURO = cursoAlbum("curso-flores-escuro", "flores-no-escuro", "Flores no Escuro", "Atravessar o luto", "Jardim Subterraneo", [
  { number: 1, title: "Caverna", description: "O escuro total do luto", prompt: cursoPrompt("cave, total darkness of grief", "deep blue, dark, underground", "deep underground sounds, darkness, cave echoes"), durationSeconds: 240 },
  { number: 2, title: "Bioluminescencia", description: "A luz que nasce do escuro", prompt: cursoPrompt("bioluminescence, light born from dark", "bioluminescent blue, magical, emerging", "glowing sounds, emerging light, magical growth"), durationSeconds: 240 },
  { number: 3, title: "Flores", description: "A beleza que cresce no luto", prompt: cursoPrompt("flowers in darkness, beauty in grief", "delicate, beautiful, resilient", "delicate melody, beautiful despite darkness, resilient"), durationSeconds: 240 },
  { number: 4, title: "Jardim", description: "O jardim subterraneo iluminado", prompt: cursoPrompt("illuminated underground garden, transformed grief", "luminous, transformed, alive", "full bioluminescent garden, alive with light, transformed"), durationSeconds: 300 },
]);

const CURSO_PESO_CHAO = cursoAlbum("curso-peso-chao", "o-peso-e-o-chao", "O Peso e o Chao", "Largar o que carregas", "Caminho de Pedras", [
  { number: 1, title: "Pedras", description: "O peso que carregas", prompt: cursoPrompt("stones, weight carried", "grey stone, heavy, burdened", "heavy percussion, weighted melody, carrying stones"), durationSeconds: 240 },
  { number: 2, title: "Curvada", description: "O corpo sob o peso", prompt: cursoPrompt("bent under weight, body burdened", "bent, compressed, aching", "compressed sounds, bent melody, aching body"), durationSeconds: 240 },
  { number: 3, title: "Pousar", description: "Largar as pedras no chao", prompt: cursoPrompt("laying stones down, releasing weight", "releasing, lighter, exhaling", "stones dropping, lightening melody, exhale"), durationSeconds: 240 },
  { number: 4, title: "De Pe", description: "Erguida, leve, as pedras no chao", prompt: cursoPrompt("standing tall, light, stones on ground", "light, upright, free", "light melody, standing tall, free movement"), durationSeconds: 300 },
]);

const CURSO_VOZ_DENTRO = cursoAlbum("curso-voz-dentro", "voz-de-dentro", "Voz de Dentro", "Encontrar a tua voz", "Sala do Eco", [
  { number: 1, title: "Silencio", description: "A sala vazia antes da voz", prompt: cursoPrompt("silence, empty room before voice", "violet dark, silent, waiting", "silence, waiting space, violet darkness"), durationSeconds: 240 },
  { number: 2, title: "Eco", description: "O primeiro som que volta", prompt: cursoPrompt("first echo, sound returning", "golden echo, resonant, discovering", "echo sounds, resonant return, discovering voice"), durationSeconds: 240 },
  { number: 3, title: "Voz", description: "A voz que sempre esteve la", prompt: cursoPrompt("finding voice, always there", "clear, strong, authentic", "clear voice emerging, authentic melody, strength"), durationSeconds: 240 },
  { number: 4, title: "Canto", description: "A voz que canta por fim", prompt: cursoPrompt("singing at last, voice freed", "singing, free, joyful, complete", "full voice singing, free, complete, joyful resolution"), durationSeconds: 300 },
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
