/**
 * Gerar Intros Pessoais dos Véus
 *
 * Preenche src/data/intros-veus.ts com os teus textos, depois:
 *   ELEVENLABS_API_KEY=sk_... VOICE_ID=... npx tsx scripts/gerar-intros-veus.ts
 *
 * Output: scripts/output/intros/veu-<n>-<nome>.mp3
 */

import * as fs from "fs";
import * as path from "path";

const API_KEY = process.env.ELEVENLABS_API_KEY || "";
const VOICE_ID = process.env.VOICE_ID || "";

if (!API_KEY || !VOICE_ID) {
  console.error(
    "Uso: ELEVENLABS_API_KEY=sk_... VOICE_ID=... npx tsx scripts/gerar-intros-veus.ts"
  );
  process.exit(1);
}

import { INTROS_VEUS } from "../src/data/intros-veus";

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
          stability: 0.65,
          similarity_boost: 0.8,
          style: 0.1,
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

async function main() {
  const dir = "scripts/output/intros";
  fs.mkdirSync(dir, { recursive: true });

  const porPreencher = INTROS_VEUS.filter((v) => !v.texto.trim());
  if (porPreencher.length > 0) {
    console.warn(
      `Aviso: ${porPreencher.length} véu(s) sem texto: ${porPreencher.map((v) => `Véu ${v.veu} (${v.nome})`).join(", ")}`
    );
    console.warn(`Edita src/data/intros-veus.ts para os preencher.\n`);
  }

  const comTexto = INTROS_VEUS.filter((v) => v.texto.trim());
  if (comTexto.length === 0) {
    console.error("Nenhum véu com texto. Preenche src/data/intros-veus.ts.");
    process.exit(1);
  }

  console.log(`\n── Intros dos Véus (${comTexto.length} com texto) ──\n`);

  let gerados = 0;
  let saltados = 0;

  for (const intro of comTexto) {
    const nome = intro.nome.toLowerCase().replace(/\s/g, "-");
    const ficheiro = path.join(dir, `veu-${intro.veu}-${nome}.mp3`);

    if (fs.existsSync(ficheiro)) {
      console.log(`  [ok] veu-${intro.veu} — já existe`);
      saltados++;
      continue;
    }

    process.stdout.write(`  Véu ${intro.veu} — ${intro.nome} (${intro.texto.length} chars)... `);

    try {
      const audio = await gerarAudio(intro.texto);
      fs.writeFileSync(ficheiro, audio);
      console.log(`✓ (${(audio.length / 1024).toFixed(0)}KB)`);
      gerados++;
      await new Promise((r) => setTimeout(r, 1500));
    } catch (err) {
      console.error(`✗ ${(err as Error).message}`);
    }
  }

  console.log(`\nConcluído. ${gerados} gerados, ${saltados} saltados.`);
  console.log(`Ficheiros em: scripts/output/intros/`);
}

main().catch(console.error);
