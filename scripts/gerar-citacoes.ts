/**
 * Gerar Áudios de Citações — clips para redes sociais
 *
 * Uso:
 *   ELEVENLABS_API_KEY=sk_... VOICE_ID=... npx tsx scripts/gerar-citacoes.ts
 *
 * Output: scripts/output/citacoes/citacao-<n>-veu<v>.mp3
 *
 * Cada ficheiro é um clip curto pronto para pôr por cima de vídeo
 * no Reels/TikTok.
 */

import * as fs from "fs";
import * as path from "path";

const API_KEY = process.env.ELEVENLABS_API_KEY || "";
const VOICE_ID = process.env.VOICE_ID || "";
const PAUSE_MS = 1500;

if (!API_KEY || !VOICE_ID) {
  console.error(
    "Uso: ELEVENLABS_API_KEY=sk_... VOICE_ID=... npx tsx scripts/gerar-citacoes.ts"
  );
  process.exit(1);
}

import { ALL_CITACOES } from "../src/data/citacoes-partilha";

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
          stability: 0.55,
          similarity_boost: 0.8,
          style: 0.15,
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

async function main() {
  const dir = "scripts/output/citacoes";
  fs.mkdirSync(dir, { recursive: true });

  console.log(`\n── Citações (${ALL_CITACOES.length} total) ──\n`);

  let gerados = 0;
  let saltados = 0;

  for (let i = 0; i < ALL_CITACOES.length; i++) {
    const c = ALL_CITACOES[i];
    const n = String(i + 1).padStart(3, "0");
    const ficheiro = path.join(dir, `citacao-${n}-veu${c.veu}-${c.fonte}.mp3`);

    if (fs.existsSync(ficheiro)) {
      console.log(`  [ok] citacao-${n} — já existe`);
      saltados++;
      continue;
    }

    const preview = c.texto.slice(0, 60) + (c.texto.length > 60 ? "..." : "");
    process.stdout.write(`  ${n} "${preview}"... `);

    try {
      const audio = await gerarAudio(c.texto);
      fs.writeFileSync(ficheiro, audio);
      console.log(`✓`);
      gerados++;
      await sleep(PAUSE_MS);
    } catch (err) {
      console.error(`✗ ${(err as Error).message}`);
    }
  }

  console.log(`\nConcluído. ${gerados} gerados, ${saltados} saltados.`);
  console.log(`Ficheiros em: scripts/output/citacoes/`);
}

main().catch(console.error);
