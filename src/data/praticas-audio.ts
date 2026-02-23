// Práticas em áudio por véu
// Cada Espelho tem as suas práticas específicas.
// Novos véus: adicionar a entrada correspondente quando os audios estiverem prontos.

export type PraticaAudio = {
  file: string;
  label: string;
  subtitle: string;
  desc: string;
  color: string;
  icon: string; // HTML entity
};

const praticasPorVeu: Record<string, PraticaAudio[]> = {
  "veu-da-ilusao": [
    {
      file: "/audios/01_PRODUTO 1 - AFIRMAÇÕES-DESPROGRAMAR O VÉU DA ILUSÃO.mp3",
      label: "Afirmações",
      subtitle: "Desprogramar o Véu da Ilusão",
      desc: "Reprograma as crenças que te mantêm presa ao véu. Ouve de manhã, quando o dia ainda é promessa.",
      color: "#c9b896",
      icon: "&#9788;",
    },
    {
      file: "/audios/02_PRODUTO 2 -LIMPEZA- Soltar o Véu da Ilusão.mp3",
      label: "Limpeza",
      subtitle: "Soltar o que já não te serve",
      desc: "Um exercício guiado para soltar padrões antigos. Quando sentires que carregas peso que não é teu.",
      color: "#7a8c6e",
      icon: "&#9672;",
    },
    {
      file: "/audios/03_PRODUTO 3 - ANTES DE DORMIR-O VÉU DA ILUSÃO.mp3",
      label: "Antes de Dormir",
      subtitle: "Suave e restaurador",
      desc: "Para ouvir à noite, quando o dia termina. Deixa o corpo pousar. Deixa a mente aquietar.",
      color: "#8a7b9c",
      icon: "&#9790;",
    },
    {
      file: "/audios/04_PRODUTO 4- ESCRITA GUIADA-O VÉU DA ILUSÃO.mp3",
      label: "Escrita Guiada",
      subtitle: "Explorar o véu com palavras",
      desc: "Pega num caderno e segue a voz. Escreve sem julgar, sem corrigir, sem pensar. Apenas deixa sair.",
      color: "#b07a7a",
      icon: "&#9998;",
    },
  ],
  // Próximos véus — adicionar quando os audios estiverem prontos:
  // "veu-do-medo": [...],
  // "veu-da-culpa": [...],
  // "veu-da-identidade": [...],
  // "veu-do-controlo": [...],
  // "veu-do-desejo": [...],
  // "veu-da-separacao": [...],
};

export function getPraticasParaVeu(slug: string): PraticaAudio[] {
  return praticasPorVeu[slug] || [];
}
