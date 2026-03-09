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
    texto: "", // ex: "Bem-vinda ao Véu da Ilusão. Aqui não há certo nem errado — há apenas o que achaste que eras..."
  },
  {
    veu: 2,
    nome: "Medo",
    texto: "", // ex: "Chegaste ao Véu do Medo. O medo não é o inimigo. É o guarda que protege o que mais importa..."
  },
  {
    veu: 3,
    nome: "Culpa",
    texto: "",
  },
  {
    veu: 4,
    nome: "Identidade",
    texto: "",
  },
  {
    veu: 5,
    nome: "Controlo",
    texto: "",
  },
  {
    veu: 6,
    nome: "Desejo",
    texto: "",
  },
  {
    veu: 7,
    nome: "Separação",
    texto: "",
  },
];
