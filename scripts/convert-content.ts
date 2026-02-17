/**
 * Script de conversão: texto plano → ficheiro TypeScript de dados
 *
 * Uso:
 *   npx tsx scripts/convert-content.ts <input.txt> <output.ts> <type>
 *
 * Onde <type> é "espelho" ou "no"
 *
 * Formato do ficheiro de entrada (.txt):
 *
 *   TITLE: O Espelho do Medo
 *   SUBTITLE: Quando o medo decide por ti
 *   AUTHOR: Vivianne dos Santos
 *   DEDICATION: Para quem sente medo e mesmo assim avança.
 *
 *   INTRO:
 *   Parágrafo de introdução 1.
 *   Parágrafo de introdução 2.
 *
 *   ---CHAPTER 1---
 *   CHAPTER_TITLE: Parte I
 *   CHAPTER_SUBTITLE: O passo que ficou por dar
 *   COLOR: #8b9b8e
 *   COLOR_BG: #f5f7f5
 *
 *   Primeiro parágrafo do capítulo.
 *
 *   Segundo parágrafo.
 *
 *   ***
 *
 *   Parágrafo após separador.
 *
 *   REFLECTION_PROMPT: O que sentiste ao ler este capítulo?
 *   JOURNAL_QUESTION: Quando foi a última vez que o medo decidiu por ti?
 *   CHECKLIST: Identifica um medo recente | Escreve o que sentes | Dá um passo pequeno
 *
 *   ---CHAPTER 2---
 *   ...etc
 */

import * as fs from "fs";
import * as path from "path";

interface Chapter {
  slug: string;
  number: number;
  title: string;
  subtitle: string;
  accentColor: string;
  accentBg: string;
  content: string[];
  reflection: {
    prompt: string;
    journalQuestion: string;
  };
  checklist: string[];
}

interface BookMeta {
  title: string;
  subtitle: string;
  author: string;
  dedication: string;
  intro: string[];
}

function parseContent(text: string): { meta: BookMeta; chapters: Chapter[] } {
  const lines = text.split("\n");

  // Parse metadata
  const meta: BookMeta = {
    title: "",
    subtitle: "",
    author: "Vivianne dos Santos",
    dedication: "",
    intro: [],
  };

  let i = 0;

  // Parse header fields
  while (i < lines.length && !lines[i].startsWith("INTRO:") && !lines[i].startsWith("---CHAPTER")) {
    const line = lines[i].trim();
    if (line.startsWith("TITLE:")) meta.title = line.replace("TITLE:", "").trim();
    else if (line.startsWith("SUBTITLE:")) meta.subtitle = line.replace("SUBTITLE:", "").trim();
    else if (line.startsWith("AUTHOR:")) meta.author = line.replace("AUTHOR:", "").trim();
    else if (line.startsWith("DEDICATION:")) meta.dedication = line.replace("DEDICATION:", "").trim();
    i++;
  }

  // Parse intro
  if (i < lines.length && lines[i].trim() === "INTRO:") {
    i++;
    while (i < lines.length && !lines[i].startsWith("---CHAPTER")) {
      const line = lines[i].trim();
      if (line) meta.intro.push(line);
      i++;
    }
  }

  // Parse chapters
  const chapters: Chapter[] = [];
  const slugMap: Record<number, string> = {
    1: "parte-i",
    2: "parte-ii",
    3: "parte-iii",
    4: "parte-iv",
    5: "parte-v",
    6: "parte-vi",
    7: "epilogo",
  };

  while (i < lines.length) {
    const chapterMatch = lines[i].match(/---CHAPTER\s+(\d+)---/);
    if (!chapterMatch) {
      i++;
      continue;
    }

    const chapterNum = parseInt(chapterMatch[1]);
    i++;

    // Parse chapter header
    let chapterTitle = `Parte ${toRoman(chapterNum)}`;
    let chapterSubtitle = "";
    let color = "#c9b896";
    let colorBg = "#faf8f4";

    while (i < lines.length && !isContentLine(lines[i]) && !lines[i].startsWith("---CHAPTER")) {
      const line = lines[i].trim();
      if (line.startsWith("CHAPTER_TITLE:")) chapterTitle = line.replace("CHAPTER_TITLE:", "").trim();
      else if (line.startsWith("CHAPTER_SUBTITLE:")) chapterSubtitle = line.replace("CHAPTER_SUBTITLE:", "").trim();
      else if (line.startsWith("COLOR:")) color = line.replace("COLOR:", "").trim();
      else if (line.startsWith("COLOR_BG:")) colorBg = line.replace("COLOR_BG:", "").trim();
      i++;
    }

    // Parse content paragraphs
    const content: string[] = [];
    let reflectionPrompt = "";
    let journalQuestion = "";
    let checklist: string[] = [];

    while (i < lines.length && !lines[i].startsWith("---CHAPTER")) {
      const line = lines[i].trim();

      if (line.startsWith("REFLECTION_PROMPT:")) {
        reflectionPrompt = line.replace("REFLECTION_PROMPT:", "").trim();
      } else if (line.startsWith("JOURNAL_QUESTION:")) {
        journalQuestion = line.replace("JOURNAL_QUESTION:", "").trim();
      } else if (line.startsWith("CHECKLIST:")) {
        checklist = line
          .replace("CHECKLIST:", "")
          .trim()
          .split("|")
          .map((s) => s.trim());
      } else if (line === "***") {
        content.push("***");
      } else if (line) {
        content.push(line);
      }

      i++;
    }

    chapters.push({
      slug: slugMap[chapterNum] || `parte-${toRoman(chapterNum).toLowerCase()}`,
      number: chapterNum,
      title: chapterTitle,
      subtitle: chapterSubtitle,
      accentColor: color,
      accentBg: colorBg,
      content,
      reflection: {
        prompt: reflectionPrompt,
        journalQuestion: journalQuestion,
      },
      checklist,
    });
  }

  return { meta, chapters };
}

function isContentLine(line: string): boolean {
  const trimmed = line.trim();
  return (
    trimmed !== "" &&
    !trimmed.startsWith("CHAPTER_TITLE:") &&
    !trimmed.startsWith("CHAPTER_SUBTITLE:") &&
    !trimmed.startsWith("COLOR:") &&
    !trimmed.startsWith("COLOR_BG:") &&
    !trimmed.startsWith("REFLECTION_PROMPT:") &&
    !trimmed.startsWith("JOURNAL_QUESTION:") &&
    !trimmed.startsWith("CHECKLIST:")
  );
}

function toRoman(num: number): string {
  const map: [number, string][] = [
    [7, "VII"], [6, "VI"], [5, "V"], [4, "IV"],
    [3, "III"], [2, "II"], [1, "I"],
  ];
  for (const [val, rom] of map) {
    if (num === val) return rom;
  }
  return num.toString();
}

function generateTypeScript(meta: BookMeta, chapters: Chapter[], sourceFile: string): string {
  const escapeStr = (s: string) => s.replace(/\\/g, "\\\\").replace(/`/g, "\\`").replace(/\$/g, "\\$");

  let output = `// Auto-generated from ${sourceFile}\n`;
  output += `// Generated at ${new Date().toISOString()}\n\n`;

  output += `export type Chapter = {\n`;
  output += `  slug: string;\n`;
  output += `  number: number;\n`;
  output += `  title: string;\n`;
  output += `  subtitle: string;\n`;
  output += `  accentColor: string;\n`;
  output += `  accentBg: string;\n`;
  output += `  content: string[];\n`;
  output += `  reflection: {\n`;
  output += `    prompt: string;\n`;
  output += `    journalQuestion: string;\n`;
  output += `  };\n`;
  output += `  checklist: string[];\n`;
  output += `};\n\n`;

  output += `export const bookMeta = {\n`;
  output += `  title: \`${escapeStr(meta.title)}\`,\n`;
  output += `  subtitle: \`${escapeStr(meta.subtitle)}\`,\n`;
  output += `  author: \`${escapeStr(meta.author)}\`,\n`;
  output += `  dedication: \`${escapeStr(meta.dedication)}\`,\n`;
  output += `  intro: [\n`;
  for (const para of meta.intro) {
    output += `    \`${escapeStr(para)}\`,\n`;
  }
  output += `  ],\n`;
  output += `};\n\n`;

  output += `export const chapters: Chapter[] = [\n`;
  for (const ch of chapters) {
    output += `  {\n`;
    output += `    slug: "${ch.slug}",\n`;
    output += `    number: ${ch.number},\n`;
    output += `    title: \`${escapeStr(ch.title)}\`,\n`;
    output += `    subtitle: \`${escapeStr(ch.subtitle)}\`,\n`;
    output += `    accentColor: "${ch.accentColor}",\n`;
    output += `    accentBg: "${ch.accentBg}",\n`;
    output += `    content: [\n`;
    for (const para of ch.content) {
      output += `      \`${escapeStr(para)}\`,\n`;
    }
    output += `    ],\n`;
    output += `    reflection: {\n`;
    output += `      prompt: \`${escapeStr(ch.reflection.prompt)}\`,\n`;
    output += `      journalQuestion: \`${escapeStr(ch.reflection.journalQuestion)}\`,\n`;
    output += `    },\n`;
    output += `    checklist: [\n`;
    for (const item of ch.checklist) {
      output += `      \`${escapeStr(item)}\`,\n`;
    }
    output += `    ],\n`;
    output += `  },\n`;
  }
  output += `];\n`;

  return output;
}

function countWords(chapters: Chapter[]): number {
  return chapters.reduce((total, ch) => {
    return total + ch.content.reduce((sum, para) => {
      if (para === "***") return sum;
      return sum + para.split(/\s+/).length;
    }, 0);
  }, 0);
}

// Main
const args = process.argv.slice(2);
if (args.length < 2) {
  console.log(`
Uso: npx tsx scripts/convert-content.ts <input.txt> <output.ts>

Converte texto plano para ficheiro TypeScript de dados.
Ver formato do ficheiro de entrada nos comentários do script.

Exemplo:
  npx tsx scripts/convert-content.ts content/espelho-medo.txt src/data/espelho-medo.ts
`);
  process.exit(1);
}

const [inputFile, outputFile] = args;
const inputPath = path.resolve(inputFile);
const outputPath = path.resolve(outputFile);

if (!fs.existsSync(inputPath)) {
  console.error(`Ficheiro não encontrado: ${inputPath}`);
  process.exit(1);
}

const text = fs.readFileSync(inputPath, "utf-8");
const { meta, chapters } = parseContent(text);
const wordCount = countWords(chapters);

console.log(`\nConversão concluída:`);
console.log(`  Título: ${meta.title}`);
console.log(`  Capítulos: ${chapters.length}`);
console.log(`  Palavras: ${wordCount.toLocaleString()}`);
console.log(`  Intro parágrafos: ${meta.intro.length}`);

for (const ch of chapters) {
  const chWords = ch.content.reduce((sum, p) => p === "***" ? sum : sum + p.split(/\s+/).length, 0);
  console.log(`  Cap ${ch.number} "${ch.subtitle}": ${chWords.toLocaleString()} palavras, ${ch.checklist.length} checklist items`);
}

if (wordCount > 16000) {
  console.log(`\n⚠ AVISO: ${wordCount.toLocaleString()} palavras excedem o limite de 16.000.`);
  console.log(`  Reduzir ${(wordCount - 16000).toLocaleString()} palavras.`);
}

const tsContent = generateTypeScript(meta, chapters, path.basename(inputFile));
fs.writeFileSync(outputPath, tsContent, "utf-8");
console.log(`\nFicheiro gerado: ${outputPath}`);
