#!/usr/bin/env bash
# Verifica se há notas de revisão pendentes no Supabase.
# Usado como hook de início de sessão do Claude Code.

set -euo pipefail

# Carregar variáveis de ambiente
if [ -f .env.local ]; then
  export $(grep -v '^#' .env.local | xargs)
fi

SUPABASE_URL="${NEXT_PUBLIC_SUPABASE_URL:-https://tdytdamtfillqyklgrmb.supabase.co}"
SERVICE_KEY="${SUPABASE_SERVICE_ROLE_KEY:-}"

if [ -z "$SERVICE_KEY" ]; then
  exit 0
fi

# Query pendentes
RESPONSE=$(curl -s \
  "${SUPABASE_URL}/rest/v1/revision_proposals?status=eq.pending&select=id,book_title,note" \
  -H "apikey: ${SERVICE_KEY}" \
  -H "Authorization: Bearer ${SERVICE_KEY}" \
  -H "Content-Type: application/json" \
  2>/dev/null || echo "[]")

COUNT=$(echo "$RESPONSE" | python3 -c "import sys,json; print(len(json.load(sys.stdin)))" 2>/dev/null || echo "0")

if [ "$COUNT" -gt 0 ]; then
  echo "📌 Tens ${COUNT} nota(s) de revisão pendente(s) da Vivianne."
  echo "   Corre: npx tsx scripts/apply-proposals.ts"
  echo ""
  echo "$RESPONSE" | python3 -c "
import sys, json
notes = json.load(sys.stdin)
books = {}
for n in notes:
    b = n.get('book_title', '?')
    books[b] = books.get(b, 0) + 1
for book, count in books.items():
    print(f'   - {book}: {count} nota(s)')
" 2>/dev/null || true
fi
