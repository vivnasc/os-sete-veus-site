/**
 * Intros pessoais de cada Espelho — voz da Vivianne
 *
 * Tom: Da Confrontação ao Convite (GUIA VOZ VIVIANNE)
 * — Presença compassiva, não dissecação
 * — Cena reconhecível + convite + porta aberta
 * — Sensorial, não clínico
 */

export type IntroVeu = {
  veu: number;
  nome: string;
  texto: string;
};

export const INTROS_VEUS: IntroVeu[] = [
  {
    veu: 1,
    nome: "Ilusão",
    texto: "A manhã em que a Sara percebeu que não sabia o que queria para o pequeno-almoço — esse momento mínimo, quase invisível. É pequeno assim que começa. Bem-vinda ao Espelho da Ilusão. Não trazes nada para provar. Trazes apenas o que reconheces.",
  },
  {
    veu: 2,
    nome: "Medo",
    texto: "O Rui olhava para o telefone antes de falar — não para organizar as palavras, mas para ter a certeza de que eram as certas. O corpo lembra esse peso. Bem-vinda ao Espelho do Medo. Não resolvemos aqui. Iluminamos. E às vezes isso é suficiente para respirar de outra forma.",
  },
  {
    veu: 3,
    nome: "Culpa",
    texto: "O Filipe dizia sempre que estava bem. E acreditava nisso — até ao dia em que não conseguiu dizer porquê. Bem-vinda ao Espelho da Culpa. Lê devagar. O que parece ser sobre ele, talvez seja sobre o que guardas em ti.",
  },
  {
    veu: 4,
    nome: "Identidade",
    texto: "Há uma versão de ti que é eficiente, disponível, que sabe o que os outros precisam. E depois, quando a porta fecha — quem fica? Bem-vinda ao Espelho da Identidade. Não há resposta errada aqui. Há apenas o que é teu.",
  },
  {
    veu: 5,
    nome: "Controlo",
    texto: "A Isabel organizava tudo porque amava tudo. Reconheces esse impulso — segurar com força o que é precioso? Bem-vinda ao Espelho do Controlo. Olhamos para isso juntas, com calma. Sem bisturi.",
  },
  {
    veu: 6,
    nome: "Desejo",
    texto: "Há coisas que a Lena queria e nunca disse. Não por cobardia — por hábito de se tornar mais pequena. Bem-vinda ao Espelho do Desejo. Aqui damos nome ao que ficou em silêncio. Ao teu ritmo. Sem pressa.",
  },
  {
    veu: 7,
    nome: "Separação",
    texto: "Bem-vinda ao último espelho. A Helena e o Miguel separaram-se — e foi nessa separação que cada um respirou pela primeira vez de outra forma. Talvez separar não seja perder. Talvez seja o início de algo que ainda não tem nome.",
  },
];
