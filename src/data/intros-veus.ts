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
    texto: "Bem-vinda ao Espelho da Ilusão. A Sara não é uma personagem — é um reflexo. Durante anos viveu uma versão de si que aprendeu a ser, não a que escolheu. Enquanto lês, não perguntes o que ela sente. Pergunta o que reconheces em ti. Este espelho só mostra o que já está lá.",
  },
  {
    veu: 2,
    nome: "Medo",
    texto: "Entraste no Espelho do Medo. O Rui tem medo de ocupar espaço — de ser demasiado, de não ser suficiente. Talvez reconheças esse peso. Neste espelho não vamos resolver o medo. Vamos apenas iluminá-lo. Porque o que vemos de frente já não nos persegue da mesma forma.",
  },
  {
    veu: 3,
    nome: "Culpa",
    texto: "Chegaste ao Espelho da Culpa. O Filipe entregou-se ao ponto de se perder — e chamou a isso amor. Luísa aceitou, e chamou a isso gratidão. A culpa disfarça-se tão bem de virtude que raramente a reconhecemos. Lê devagar. O que parece ser sobre eles, é sobre o que guardas em ti.",
  },
  {
    veu: 4,
    nome: "Identidade",
    texto: "Bem-vinda ao Espelho da Identidade. O Vítor usava máscaras tão antigas que já não sabia a diferença entre a máscara e o rosto. Neste espelho vamos sentar com a pergunta que mais assusta: quem és quando ninguém está a ver? Não há resposta errada. Há apenas honestidade — e essa já é um começo.",
  },
  {
    veu: 5,
    nome: "Controlo",
    texto: "Entraste no Espelho do Controlo. A Isabel amava tanto que tentou proteger tudo — e foi afastando quem mais amava sem perceber. Reconheces esse padrão? O controlo não nasce da força. Nasce do medo de perder o que é precioso. Aqui vamos olhar para esse medo com gentileza.",
  },
  {
    veu: 6,
    nome: "Desejo",
    texto: "Chegaste ao Espelho do Desejo. A Lena e a Sofia partilhavam tudo — até que o desejo não dito de uma começou a esvaziar a outra. Fomos ensinadas a ter vergonha do que queremos. Neste espelho o desejo não é o vilão. É a pista. Lê com atenção ao que em ti também ficou por dizer.",
  },
  {
    veu: 7,
    nome: "Separação",
    texto: "Chegaste ao último espelho. O Espelho da Separação. A Helena e o Miguel separaram-se — e foi nessa separação que cada um encontrou finalmente o caminho de volta a si. Separar não é falhar. É por vezes o acto de amor mais honesto que existe. Este espelho é sobre recomeços. E sobre a coragem de os deixar acontecer.",
  },
];
