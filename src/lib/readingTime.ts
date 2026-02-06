const WORDS_PER_MINUTE = 200; // Portuguese reading speed

export function getReadingTime(content: string[]): number {
  const wordCount = content.reduce((total, paragraph) => {
    if (paragraph === "***") return total;
    return total + paragraph.split(/\s+/).filter(Boolean).length;
  }, 0);

  return Math.max(1, Math.ceil(wordCount / WORDS_PER_MINUTE));
}

export function formatReadingTime(minutes: number): string {
  if (minutes < 2) return "1 min de leitura";
  return `${minutes} min de leitura`;
}
