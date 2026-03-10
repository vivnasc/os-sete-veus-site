/**
 * Intros pessoais de cada véu — texto da Vivianne
 *
 * Preenche o campo `texto` de cada véu com o teu texto.
 * Depois corre: ELEVENLABS_API_KEY=... VOICE_ID=... npx tsx scripts/gerar-intros-veus.ts
 *
 * Guias:
 * - Tom íntimo, quase sussurrado. Como se falaras directamente à leitora.
 * - 3-5 frases. Não mais. A brevidade tem força.
 * - Pode começar com "Bem-vinda..." ou mergulhar directamente no véu.
 */

export type IntroVeu = {
  veu: number;
  nome: string;
  texto: string; // ← preenches aqui
};

export const INTROS_VEUS: IntroVeu[] = [
  {
    veu: 1,
    nome: "Ilusão",
    texto: "Bem-vinda ao Véu da Ilusão. Durante anos viveste uma versão de ti que aprendeste a ser — não a que escolheste. Aqui não vamos destruir nada. Vamos apenas parar, olhar, e perguntar: isto sou eu, ou é o que me ensinaram a ser? Não há pressa. Há apenas este momento, e a tua honestidade.",
  },
  {
    veu: 2,
    nome: "Medo",
    texto: "Chegaste ao Véu do Medo. O medo não é o teu inimigo — é o guarda fiel do que mais te importa. Por baixo de cada medo existe um desejo profundo que ainda não ousaste nomear. Neste véu vamos sentar com ele, sem o afastar. Porque o que resistimos persiste. E o que acolhemos, transforma-se.",
  },
  {
    veu: 3,
    nome: "Culpa",
    texto: "Entraste no Véu da Culpa. A culpa tem uma voz muito particular — suave, persistente, e sempre presente. Aprendemos a usá-la como prova de que somos boas pessoas. Mas culpa não é responsabilidade. É um peso que carregamos em vez de agir. Aqui vamos aprender a diferença — e a pousar o que já não precisas de carregar.",
  },
  {
    veu: 4,
    nome: "Identidade",
    texto: "Chegaste ao Véu da Identidade. Quem és quando não tens papel nenhum a desempenhar? Quando não és mãe, filha, colega, parceira — quando és apenas tu, sozinha numa divisão silenciosa? É uma pergunta que assusta. E é exactamente por isso que vale a pena fazer. A tua identidade real não precisa de aprovação para existir.",
  },
  {
    veu: 5,
    nome: "Controlo",
    texto: "Bem-vinda ao Véu do Controlo. Controlamos porque tivemos medo de confiar. Controlamos porque alguém nos falhou quando mais precisávamos. É uma forma de amor — distorcida, mas nascida do amor. Neste véu vamos olhar para o que tentamos segurar com tanta força, e perguntar: o que aconteceria se eu abrisse a mão?",
  },
  {
    veu: 6,
    nome: "Desejo",
    texto: "Entraste no Véu do Desejo. Fomos ensinadas a ter vergonha do que queremos — a diminuir, a pedir desculpa por ocupar espaço. O desejo não é fraqueza. É direcção. É a bússola que existe dentro de ti antes de qualquer opinião do mundo. Aqui damos-lhe nome, sem julgamento, sem filtro.",
  },
  {
    veu: 7,
    nome: "Separação",
    texto: "Chegaste ao último véu. O Véu da Separação. Separamo-nos das pessoas, dos lugares, das versões de nós mesmas que já não cabem. É doloroso — e é necessário. Não há chegada sem partida. E há uma liberdade extraordinária em perceber que separação não é perda. É o espaço onde algo novo pode finalmente respirar.",
  },
];
