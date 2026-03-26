/**
 * Script para gerar o PDF do manual e guardar num ficheiro.
 * Uso: npx tsx scripts/test-manual-pdf.tsx
 */

import * as React from "react";
import { renderToBuffer } from "@react-pdf/renderer";
import { writeFileSync } from "fs";

// Force non-production to use local fonts
(process.env as Record<string, string>).NODE_ENV = "development";

import { ManualPDF } from "../src/lib/pdf/manual-template";
import { OURO_PROPRIO_MANUAL } from "../src/data/course-manuals/ouro-proprio";

async function main() {
  const studentName = "Vivianne dos Santos";

  console.log("A gerar PDF...");

  const element = React.createElement(ManualPDF, {
    manual: OURO_PROPRIO_MANUAL,
    studentName,
  });

  const buffer = await renderToBuffer(element as any);

  const path = "CURSOS/Ouro-Proprio_Manual_PREVIEW.pdf";
  writeFileSync(path, buffer);

  console.log(`PDF gerado: ${path}`);
  console.log(`Tamanho: ${(buffer.length / 1024).toFixed(0)} KB`);
}

main().catch(console.error);
