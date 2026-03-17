/**
 * Script para ler notas de revisão pendentes do Supabase.
 *
 * A Vivianne marca parágrafos com notas (ex: "tom pesado", "simplificar").
 * O Claude Code lê estas notas, reescreve o texto, e aplica.
 *
 * Uso:
 *   npx tsx scripts/apply-proposals.ts              # lista notas pendentes
 *   npx tsx scripts/apply-proposals.ts --mark-done  # marca todas como aplicadas
 *
 * Requer: NEXT_PUBLIC_SUPABASE_URL e SUPABASE_SERVICE_ROLE_KEY no .env.local
 */

import { createClient } from "@supabase/supabase-js";

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

type Annotation = {
  id: string;
  book_slug: string;
  book_title: string;
  chapter_slug: string;
  chapter_title: string;
  paragraph_index: number;
  original_text: string;
  note: string;
  status: string;
  created_at: string;
};

async function fetchPending(): Promise<Annotation[]> {
  const { data, error } = await supabase
    .from("revision_proposals")
    .select("*")
    .eq("status", "pending")
    .order("book_slug")
    .order("chapter_slug")
    .order("paragraph_index");

  if (error) {
    console.error("Erro ao buscar notas:", error.message);
    process.exit(1);
  }
  return (data || []) as Annotation[];
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
  const markDone = process.argv.includes("--mark-done");

  console.log("Buscando notas de revisão pendentes...\n");
  const annotations = await fetchPending();

  if (annotations.length === 0) {
    console.log("Nenhuma nota pendente.");
    return;
  }

  console.log(`${annotations.length} nota(s) pendente(s):\n`);

  // Agrupar por livro
  const byBook = new Map<string, Annotation[]>();
  for (const a of annotations) {
    const list = byBook.get(a.book_slug) || [];
    list.push(a);
    byBook.set(a.book_slug, list);
  }

  for (const [bookSlug, notes] of byBook) {
    const filePath = BOOK_FILE_MAP[bookSlug];
    console.log(`━━━ ${notes[0].book_title} (${bookSlug}) ━━━`);
    console.log(`    Ficheiro: ${filePath || "DESCONHECIDO"}`);
    console.log(`    ${notes.length} nota(s)\n`);

    for (const a of notes) {
      console.log(`  📌 ${a.chapter_title} — Parágrafo ${a.paragraph_index + 1}`);
      console.log(`     Nota: "${a.note}"`);
      console.log(`     Texto: "${a.original_text.slice(0, 100)}${a.original_text.length > 100 ? "..." : ""}"`);
      console.log(`     ID: ${a.id}`);
      console.log();
    }
  }

  if (markDone) {
    const allIds = annotations.map((a) => a.id);
    console.log(`Marcando ${allIds.length} nota(s) como aplicadas...`);
    await markApplied(allIds);
    console.log("Feito.");
  } else {
    console.log("─────────────────────────────────────────");
    console.log("O Claude Code lê estas notas, reescreve os parágrafos,");
    console.log("e depois corre: npx tsx scripts/apply-proposals.ts --mark-done");
  }
}

main().catch(console.error);
