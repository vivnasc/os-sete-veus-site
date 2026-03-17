/**
 * Script para ler propostas de revisão pendentes do Supabase
 * e gerar instruções para aplicar nos ficheiros de dados.
 *
 * Uso:
 *   npx tsx scripts/apply-proposals.ts          # lista propostas pendentes
 *   npx tsx scripts/apply-proposals.ts --apply   # aplica e marca como applied
 *
 * Requer: NEXT_PUBLIC_SUPABASE_URL e SUPABASE_SERVICE_ROLE_KEY no .env.local
 */

import { createClient } from "@supabase/supabase-js";
import * as fs from "fs";
import * as path from "path";

const SUPABASE_URL =
  process.env.NEXT_PUBLIC_SUPABASE_URL ||
  "https://tdytdamtfillqyklgrmb.supabase.co";
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SERVICE_KEY) {
  console.error("SUPABASE_SERVICE_ROLE_KEY not set. Add it to .env.local");
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SERVICE_KEY, {
  auth: { autoRefreshToken: false, persistSession: false },
});

// Mapeamento de book_slug → ficheiro de dados
const BOOK_FILE_MAP: Record<string, string> = {
  // Espelhos
  "veu-da-ilusao": "src/data/ebook.ts",
  "veu-do-medo": "src/data/espelho-medo.ts",
  "veu-da-culpa": "src/data/espelho-culpa.ts",
  "veu-da-identidade": "src/data/espelho-identidade.ts",
  "veu-do-controlo": "src/data/espelho-controlo.ts",
  "veu-do-desejo": "src/data/espelho-desejo.ts",
  "veu-da-separacao": "src/data/espelho-separacao.ts",
  // Nós
  "no-da-heranca": "src/data/no-heranca.ts",
  "no-do-silencio": "src/data/no-silencio.ts",
  "no-do-sacrificio": "src/data/no-sacrificio.ts",
  "no-da-vergonha": "src/data/no-vergonha.ts",
  "no-da-solidao": "src/data/no-solidao.ts",
  "no-do-vazio": "src/data/no-vazio.ts",
  "no-da-pertenca": "src/data/no-pertenca.ts",
};

type Proposal = {
  id: string;
  book_slug: string;
  book_title: string;
  chapter_slug: string;
  chapter_title: string;
  paragraph_index: number;
  original_text: string;
  proposed_text: string;
  note: string;
  status: string;
  created_at: string;
};

async function fetchPending(): Promise<Proposal[]> {
  const { data, error } = await supabase
    .from("revision_proposals")
    .select("*")
    .eq("status", "pending")
    .order("book_slug")
    .order("chapter_slug")
    .order("paragraph_index");

  if (error) {
    console.error("Erro ao buscar propostas:", error.message);
    process.exit(1);
  }
  return (data || []) as Proposal[];
}

function applyToFile(
  filePath: string,
  original: string,
  replacement: string
): boolean {
  const fullPath = path.join(process.cwd(), filePath);
  if (!fs.existsSync(fullPath)) {
    console.error(`  Ficheiro não encontrado: ${filePath}`);
    return false;
  }

  const content = fs.readFileSync(fullPath, "utf-8");

  // Escape the original for string matching inside TS template literals
  // The content array uses regular strings, so we search for the exact text
  if (!content.includes(original)) {
    // Try with escaped quotes
    const escaped = original.replace(/"/g, '\\"');
    if (!content.includes(escaped)) {
      console.error(`  Texto original não encontrado no ficheiro`);
      console.error(`  Primeiros 80 chars: "${original.slice(0, 80)}..."`);
      return false;
    }
    const updated = content.replace(escaped, replacement.replace(/"/g, '\\"'));
    fs.writeFileSync(fullPath, updated, "utf-8");
    return true;
  }

  const updated = content.replace(original, replacement);
  fs.writeFileSync(fullPath, updated, "utf-8");
  return true;
}

async function markApplied(ids: string[]) {
  const { error } = await supabase
    .from("revision_proposals")
    .update({
      status: "applied",
      applied_at: new Date().toISOString(),
    })
    .in("id", ids);

  if (error) {
    console.error("Erro ao marcar como aplicadas:", error.message);
  }
}

async function main() {
  const doApply = process.argv.includes("--apply");

  console.log("Buscando propostas pendentes...\n");
  const proposals = await fetchPending();

  if (proposals.length === 0) {
    console.log("Nenhuma proposta pendente.");
    return;
  }

  console.log(`${proposals.length} proposta(s) pendente(s):\n`);

  // Agrupar por livro
  const byBook = new Map<string, Proposal[]>();
  for (const p of proposals) {
    const list = byBook.get(p.book_slug) || [];
    list.push(p);
    byBook.set(p.book_slug, list);
  }

  const appliedIds: string[] = [];

  for (const [bookSlug, props] of byBook) {
    const filePath = BOOK_FILE_MAP[bookSlug];
    console.log(`━━━ ${props[0].book_title} (${bookSlug}) ━━━`);
    console.log(`    Ficheiro: ${filePath || "DESCONHECIDO"}`);
    console.log(`    ${props.length} proposta(s)\n`);

    for (const p of props) {
      console.log(`  ${p.chapter_title} — Parágrafo ${p.paragraph_index + 1}`);
      if (p.note) console.log(`  Nota: ${p.note}`);
      console.log(`  Original:  "${p.original_text.slice(0, 60)}..."`);
      console.log(`  Proposta:  "${p.proposed_text.slice(0, 60)}..."`);

      if (doApply && filePath) {
        const success = applyToFile(filePath, p.original_text, p.proposed_text);
        if (success) {
          console.log(`  ✓ Aplicada`);
          appliedIds.push(p.id);
        } else {
          console.log(`  ✗ Falhou — aplicar manualmente`);
        }
      }
      console.log();
    }
  }

  if (doApply && appliedIds.length > 0) {
    console.log(`Marcando ${appliedIds.length} proposta(s) como aplicadas...`);
    await markApplied(appliedIds);
    console.log("Feito.");
  } else if (!doApply) {
    console.log("─────────────────────────────────────────");
    console.log("Para aplicar: npx tsx scripts/apply-proposals.ts --apply");
  }
}

main().catch(console.error);
