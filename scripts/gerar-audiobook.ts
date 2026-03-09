/**
 * Gerar Audiobook — Espelhos e Nós publicados
 *
 * Uso:
 *   ELEVENLABS_API_KEY=sk_... VOICE_ID=... npx tsx scripts/gerar-audiobook.ts
 *
 * Output: scripts/output/audiobook/<livro>/cap-<n>-parte-<p>.mp3
 *
 * Cada capítulo é dividido em partes de ~4500 chars (limite da API).
 * Para unir as partes num único ficheiro usa Audacity ou o script
 * de concatenação que podes pedir.
 */

import * as fs from "fs";
import * as path from "path";

// ── Configuração ──────────────────────────────────────────────
const API_KEY = process.env.ELEVENLABS_API_KEY || "";
const VOICE_ID = process.env.VOICE_ID || "";
const MAX_CHARS = 4500;
const PAUSE_MS = 2000; // pausa entre chamadas para evitar rate limit

if (!API_KEY || !VOICE_ID) {
  console.error("Falta ELEVENLABS_API_KEY ou VOICE_ID.");
  console.error(
    "Uso: ELEVENLABS_API_KEY=sk_... VOICE_ID=... npx tsx scripts/gerar-audiobook.ts"
  );
  process.exit(1);
}

// ── Imports dos dados ─────────────────────────────────────────
import { chapters as ilusaoChapters } from "../src/data/ebook";
import { chapters as medoChapters } from "../src/data/espelho-medo";
import { chapters as herancaChapters } from "../src/data/no-heranca";
import { chapters as silencioChapters } from "../src/data/no-silencio";

const LIVROS = [
  { slug: "espelho-ilusao", titulo: "Espelho da Ilusão", chapters: ilusaoChapters },
  { slug: "espelho-medo", titulo: "Espelho do Medo", chapters: medoChapters },
  { slug: "no-heranca", titulo: "Nó da Herança", chapters: herancaChapters },
  { slug: "no-silencio", titulo: "Nó do Silêncio", chapters: silencioChapters },
];

// ── Helpers ───────────────────────────────────────────────────

function chunkTexto(paragrafos: string[]): string[] {
  const chunks: string[] = [];
  let atual = "";

  for (const p of paragrafos) {
    if (p === "***") continue; // ignora separadores de cena
    const bloco = atual ? atual + "\n\n" + p : p;
    if (bloco.length > MAX_CHARS) {
      if (atual) chunks.push(atual.trim());
      // parágrafo maior que MAX_CHARS: divide a meio
      if (p.length > MAX_CHARS) {
        const meio = p.lastIndexOf(" ", MAX_CHARS);
        chunks.push(p.slice(0, meio).trim());
        atual = p.slice(meio + 1).trim();
      } else {
        atual = p;
      }
    } else {
      atual = bloco;
    }
  }
  if (atual.trim()) chunks.push(atual.trim());
  return chunks;
}

async function gerarAudio(texto: string): Promise<Buffer> {
  const res = await fetch(
    `https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}`,
    {
      method: "POST",
      headers: {
        "xi-api-key": API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text: texto,
        model_id: "eleven_multilingual_v2",
        voice_settings: {
          stability: 0.5,
          similarity_boost: 0.8,
          style: 0.2,
        },
      }),
    }
  );

  if (!res.ok) {
    const erro = await res.text();
    throw new Error(`ElevenLabs ${res.status}: ${erro}`);
  }

  return Buffer.from(await res.arrayBuffer());
}

async function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

// ── Main ──────────────────────────────────────────────────────

async function main() {
  let totalGerados = 0;
  let totalIgnorados = 0;

  for (const livro of LIVROS) {
    const dir = path.join("scripts/output/audiobook", livro.slug);
    fs.mkdirSync(dir, { recursive: true });

    console.log(`\n── ${livro.titulo} (${livro.chapters.length} capítulos) ──`);

    for (const cap of livro.chapters) {
      const chunks = chunkTexto(cap.content);

      for (let i = 0; i < chunks.length; i++) {
        const sufixo = chunks.length > 1 ? `-parte-${i + 1}` : "";
        const ficheiro = path.join(dir, `cap-${cap.number}${sufixo}.mp3`);

        if (fs.existsSync(ficheiro)) {
          console.log(`  [ok] cap-${cap.number}${sufixo} — já existe, a saltar`);
          totalIgnorados++;
          continue;
        }

        const chars = chunks[i].length;
        process.stdout.write(
          `  Capítulo ${cap.number}${sufixo} (${chars} chars)... `
        );

        try {
          const audio = await gerarAudio(chunks[i]);
          fs.writeFileSync(ficheiro, audio);
          console.log(`✓ (${(audio.length / 1024).toFixed(0)}KB)`);
          totalGerados++;
          await sleep(PAUSE_MS);
        } catch (err) {
          console.error(`✗ ${(err as Error).message}`);
        }
      }
    }
  }

  console.log(
    `\nConcluído. ${totalGerados} gerados, ${totalIgnorados} saltados.`
  );
  console.log(`Ficheiros em: scripts/output/audiobook/`);
}

main().catch(console.error);
