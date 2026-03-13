/**
 * Roteiros extra para shorts/reels — Os Sete Espelhos
 * Foco: Lancamento Espelho do Medo (Marco 2026) + novos angulos
 *
 * Tom: Voz da Vivianne — calma, sensorial, nunca clinica
 * Formato: narracao corrida, 15-35s, pronto para ElevenLabs
 * Estimativa total: ~15.000 caracteres (~25 clips)
 */

export type ShortVoz = {
  id: string;
  nome: string;
  ficheiro: string;
  texto: string;
  categoria: "lancamento-medo" | "hook-curto" | "testemunho" | "convite" | "antes-depois";
};

export const SHORTS_EXTRA: ShortVoz[] = [
  // ── LANCAMENTO ESPELHO DO MEDO (Marco 2026) ──────────────────────────────

  {
    id: "short-medo-lancamento-1",
    nome: "Medo — o novo Espelho chega em Marco",
    ficheiro: "short-medo-lancamento-anuncio.mp3",
    categoria: "lancamento-medo",
    texto:
      "Março. O segundo Espelho abre. O Espelho do Medo. A historia de Rui — um homem que fez tudo certo. Carreira. Familia. Estabilidade. E que, num dia banal, percebeu que nao se mexia ha anos. Nao por falta de opcoes. Por excesso de calculo. Se o primeiro Espelho te fez perguntar — este vai-te fazer sentir. Disponivel em Marco em seteveus.space.",
  },
  {
    id: "short-medo-lancamento-2",
    nome: "Medo — Rui acordou 3 minutos antes",
    ficheiro: "short-medo-rui-acordou.mp3",
    categoria: "lancamento-medo",
    texto:
      "Rui acordou tres minutos antes do despertador. Como sempre. O corpo ja nem registava a antecipacao como conquista. Apenas como mecanismo. Ana dormia ao lado. O ombro nu a poucos centimetros da sua mao. A mao nao se moveu. Nao por recusa. Simplesmente nao houve impulso. O Espelho do Medo — quando ver nao e suficiente para partir.",
  },
  {
    id: "short-medo-lancamento-3",
    nome: "Medo — paralisia lucida",
    ficheiro: "short-medo-paralisia-lucida.mp3",
    categoria: "lancamento-medo",
    texto:
      "Ha um nome para isto: paralisia lucida. Ves tudo. Compreendes tudo. E nao te mexes. Nao porque nao saibas. Porque calcular o risco ja se tornou mais natural do que agir. Rui vive assim ha anos. Talvez tu tambem. O Espelho do Medo — Marco 2026. seteveus.space.",
  },
  {
    id: "short-medo-lancamento-4",
    nome: "Medo — o corpo como instrumento",
    ficheiro: "short-medo-corpo-instrumento.mp3",
    categoria: "lancamento-medo",
    texto:
      "Rui trata o corpo como instrumento. Alimenta. Exercita. Descansa. Mantém. Mas ha muito que nao o habita. O corpo funciona. Ele assiste. Se reconheces isto — o segundo Espelho e para ti. Espelho do Medo. Disponivel em Marco.",
  },
  {
    id: "short-medo-lancamento-5",
    nome: "Medo — e se não for medo?",
    ficheiro: "short-medo-e-se-nao-for.mp3",
    categoria: "lancamento-medo",
    texto:
      "E se o que chamas de prudencia for medo? E se o que chamas de estabilidade for imobilidade? E se a vida que construiste para nao falhar... te impedir de viver? O Espelho do Medo faz estas perguntas. Nao para te assustar. Para te libertar. Marco 2026. seteveus.space.",
  },

  // ── HOOKS CURTOS (15-20s — formato stories/TikTok) ────────────────────────

  {
    id: "short-hook-tanto-faz",
    nome: "Quando tanto faz e a resposta mais frequente",
    ficheiro: "short-hook-tanto-faz.mp3",
    categoria: "hook-curto",
    texto:
      "Quando tanto faz e a tua resposta mais frequente — nao e descontraccao. E desistencia disfarçada de flexibilidade. Ha uma historia sobre isso. Espelho da Ilusao. seteveus.space.",
  },
  {
    id: "short-hook-bem-automatico",
    nome: "Dizes bem antes de verificar",
    ficheiro: "short-hook-bem-automatico.mp3",
    categoria: "hook-curto",
    texto:
      "Alguem te pergunta como estas. Dizes bem. Antes de verificar. A resposta sai antes do sentir. E ninguem nota. Nem tu. Ate ao dia em que notas. Seteveus.space.",
  },
  {
    id: "short-hook-vida-quase-tua",
    nome: "A vida e quase tua",
    ficheiro: "short-hook-vida-quase-tua.mp3",
    categoria: "hook-curto",
    texto:
      "Ha um tipo de desconforto que nao tem nome. Nao e tristeza. Nao e crise. E a sensacao de que a tua vida e quase tua. Quase. Reconheces? seteveus.space.",
  },
  {
    id: "short-hook-nao-e-depressao",
    nome: "Nao e depressao, nao e ingratidao",
    ficheiro: "short-hook-nao-depressao.mp3",
    categoria: "hook-curto",
    texto:
      "Nao e depressao. Nao e ingratidao. E algo mais subtil. A sensacao de que a vida funciona — mas nao e tua. Se isto faz sentido, ha uma historia que precisas de ler. seteveus.space.",
  },
  {
    id: "short-hook-choras-so",
    nome: "Choras so quando ninguem ve",
    ficheiro: "short-hook-choras-so.mp3",
    categoria: "hook-curto",
    texto:
      "Choras so quando ninguem ve. Nao porque seja fraqueza. Porque aprendeste que as tuas emocoes incomodam. E se nao incomodassem? seteveus.space.",
  },
  {
    id: "short-hook-pedes-desculpa",
    nome: "Pedes desculpa por existir",
    ficheiro: "short-hook-pedes-desculpa.mp3",
    categoria: "hook-curto",
    texto:
      "Pedes desculpa antes de pedir. Pedes desculpa por sentir. Pedes desculpa por ocupar espaco. Quando e que o teu espaco deixou de ser teu? seteveus.space.",
  },

  // ── TESTEMUNHOS FICCIONADOS (voz da leitora, 20-25s) ──────────────────────

  {
    id: "short-test-janela",
    nome: "Testemunho — a janela fechada",
    ficheiro: "short-testemunho-janela.mp3",
    categoria: "testemunho",
    texto:
      "Via, mas nao sentia. Registava, mas nao participava. Como quem assiste a um espectaculo por tras de uma janela fechada. Li esta frase no Espelho da Ilusao. E parei. Porque era exactamente assim. Ate ao dia em que abri a janela. seteveus.space.",
  },
  {
    id: "short-test-diario",
    nome: "Testemunho — o diario mudou tudo",
    ficheiro: "short-testemunho-diario.mp3",
    categoria: "testemunho",
    texto:
      "Nao era o livro que me mudou. Era o diario. Depois de cada capitulo, ha um espaco para escreveres o que sentiste. So tu les. So tu decides. Escrevi coisas que nunca tinha dito em voz alta. E isso mudou tudo. seteveus.space.",
  },
  {
    id: "short-test-reconheco-me",
    nome: "Testemunho — reconheco-me",
    ficheiro: "short-testemunho-reconheco.mp3",
    categoria: "testemunho",
    texto:
      "Na comunidade, nao ha nomes. Nao ha perfis. Alguem escreveu o que eu sentia. E eu carreguei em reconheco-me. E isso bastou. Nao precisei de explicar. Nao precisei de me expor. So saber que nao era a unica. seteveus.space.",
  },

  // ── CONVITES GENTIS (CTA suave, 15-20s) ──────────────────────────────────

  {
    id: "short-convite-ritmo",
    nome: "Convite — ao teu ritmo",
    ficheiro: "short-convite-ritmo.mp3",
    categoria: "convite",
    texto:
      "Nao tens de ler tudo de uma vez. Nao tens de perceber tudo agora. Capitulo a capitulo. Ao teu ritmo. Com um diario que so tu les. E uma comunidade que desaparece. Comeca quando quiseres. seteveus.space.",
  },
  {
    id: "short-convite-3-min",
    nome: "Convite — 3 minutos, 7 perguntas",
    ficheiro: "short-convite-3-min.mp3",
    categoria: "convite",
    texto:
      "Tres minutos. Sete perguntas. Qual veu e o teu? Ha um teste gratuito que te diz por onde comecar. Sem email. Sem compromisso. So curiosidade. seteveus.space.",
  },
  {
    id: "short-convite-presente",
    nome: "Convite — para quem conheces",
    ficheiro: "short-convite-presente.mp3",
    categoria: "convite",
    texto:
      "Conheces alguem que vive no automatico? Que diz estou bem sem verificar? Que cuida de todos menos de si? Nao lhe digas que precisa de mudar. Envia-lhe isto. seteveus.space.",
  },

  // ── ANTES/DEPOIS (transformacao subtil, 25-30s) ───────────────────────────

  {
    id: "short-antes-depois-pausa",
    nome: "Antes/Depois — a pausa",
    ficheiro: "short-antes-depois-pausa.mp3",
    categoria: "antes-depois",
    texto:
      "Antes: decidia em dois segundos. Depois: faco uma pausa. Pequena. Quase invisivel. Mas nessa pausa cabe uma pergunta: isto e meu ou e automatico? Nao e uma transformacao. E um gesto minimo. E o gesto minimo muda tudo. Espelho da Ilusao. seteveus.space.",
  },
  {
    id: "short-antes-depois-mesa",
    nome: "Antes/Depois — as lagrimas a mesa",
    ficheiro: "short-antes-depois-mesa.mp3",
    categoria: "antes-depois",
    texto:
      "Antes: chorava so quando ninguem via. Depois: deixei as lagrimas virem a mesa. Alguem perguntou. Disse que nao estava bem. O mundo nao acabou. Nao e dramatico. Nao e terapia. E so isto: deixar de fingir. E perceber que se sobrevive. seteveus.space.",
  },
  {
    id: "short-antes-depois-nao",
    nome: "Antes/Depois — disse nao",
    ficheiro: "short-antes-depois-nao.mp3",
    categoria: "antes-depois",
    texto:
      "Antes: dizia sim a tudo porque dizer nao parecia egoismo. Depois: disse nao. Uma vez. Sem justificar. A pessoa ficou surpreendida. Eu tambem. Mas nao me senti culpada. Pela primeira vez. seteveus.space.",
  },
];

export function getShortsCharCount() {
  const total = SHORTS_EXTRA.reduce((sum, s) => sum + s.texto.length, 0);
  const porCategoria = SHORTS_EXTRA.reduce((acc, s) => {
    acc[s.categoria] = (acc[s.categoria] || 0) + s.texto.length;
    return acc;
  }, {} as Record<string, number>);
  return { total, porCategoria, count: SHORTS_EXTRA.length };
}
