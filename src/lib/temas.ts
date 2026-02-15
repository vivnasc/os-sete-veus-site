// Thematic detection for Ecos community
// Detects emotional/philosophical themes in reflection text

const TEMA_PATTERNS: Record<string, RegExp[]> = {
  automatismo: [
    /automátic/i, /rotina/i, /sempre igual/i, /sem pensar/i, /piloto automático/i,
    /mecânic/i, /repetir/i, /hábito/i, /costume/i, /funcionar/i, /máquina/i,
  ],
  vulnerabilidade: [
    /vulnera/i, /medo/i, /fragilidade/i, /chorar/i, /lágrima/i, /dor/i,
    /ferida/i, /expor/i, /vergonha/i, /desproteg/i, /frágil/i,
  ],
  desejo: [
    /desejo/i, /quero/i, /anseio/i, /falta/i, /vontade/i, /sonho/i,
    /ambição/i, /mais/i, /busca/i, /procur/i, /necessidade/i,
  ],
  relacoes: [
    /relação/i, /relações/i, /amor/i, /família/i, /amig/i, /parceiro/i,
    /marido/i, /filh/i, /mãe/i, /pai/i, /sozinha/i, /solidão/i,
    /pertencer/i, /ligação/i, /conexão/i,
  ],
  despertar: [
    /despertar/i, /acordar/i, /consciência/i, /perceb/i, /clareza/i,
    /verdade/i, /autêntic/i, /descobr/i, /compreend/i, /libertar/i,
    /escolher/i, /escolha/i,
  ],
  identidade: [
    /quem sou/i, /identidade/i, /papel/i, /máscara/i, /persona/i,
    /fingir/i, /aparência/i, /imagem/i, /espelho/i, /reflexo/i,
  ],
  controlo: [
    /control/i, /segurar/i, /largar/i, /agarrar/i, /perder/i,
    /certeza/i, /segurança/i, /planear/i, /manter/i, /ordem/i,
  ],
  culpa: [
    /culpa/i, /remorso/i, /arrependimento/i, /errar/i, /falhar/i,
    /não devia/i, /egoís/i, /merecer/i, /perdão/i, /perdoar/i,
  ],
  presenca: [
    /presença/i, /presente/i, /agora/i, /momento/i, /aqui/i,
    /silêncio/i, /respirar/i, /pausa/i, /calma/i, /paz/i, /estar/i,
  ],
  impermanencia: [
    /impermanên/i, /mudar/i, /mudança/i, /passageiro/i, /tempo/i,
    /passar/i, /acabar/i, /terminar/i, /fluir/i, /transformar/i,
  ],
};

export function detectarTemas(texto: string): string[] {
  const temas: string[] = [];

  for (const [tema, patterns] of Object.entries(TEMA_PATTERNS)) {
    const matches = patterns.filter((p) => p.test(texto)).length;
    // Require at least 2 pattern matches for a theme, or 1 for short texts
    if (matches >= 2 || (texto.length < 100 && matches >= 1)) {
      temas.push(tema);
    }
  }

  return temas;
}

export const TEMA_LABELS: Record<string, string> = {
  automatismo: 'Automatismo',
  vulnerabilidade: 'Vulnerabilidade',
  desejo: 'Desejo',
  relacoes: 'Relações',
  despertar: 'Despertar',
  identidade: 'Identidade',
  controlo: 'Controlo',
  culpa: 'Culpa',
  presenca: 'Presença',
  impermanencia: 'Impermanência',
};

export const TEMA_COLORS: Record<string, string> = {
  automatismo: '#a09a90',
  vulnerabilidade: '#c08aaa',
  desejo: '#c9b896',
  relacoes: '#8aaaca',
  despertar: '#9aac8e',
  identidade: '#baaacc',
  controlo: '#ab9375',
  culpa: '#8b9b8e',
  presenca: '#7a8c6e',
  impermanencia: '#c9b896',
};

export const VEU_NAMES: Record<number, string> = {
  1: 'Permanência',
  2: 'Memória',
  3: 'Turbilhão',
  4: 'Esforço',
  5: 'Desolação',
  6: 'Horizonte',
  7: 'Dualidade',
};

export const VEU_COLORS: Record<number, string> = {
  1: '#c9b896',
  2: '#8b9b8e',
  3: '#c08aaa',
  4: '#8aaaca',
  5: '#9aac8e',
  6: '#ab9375',
  7: '#baaacc',
};
