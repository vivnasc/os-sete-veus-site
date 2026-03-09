# Scripts de Geração de Áudio — ElevenLabs

Precisas de: `ELEVENLABS_API_KEY` e `VOICE_ID` (ID do teu clone de voz).
O `VOICE_ID` encontras em ElevenLabs → Voices → clone → copia o ID.

---

## B — Citações (clips para redes sociais)

```bash
ELEVENLABS_API_KEY=sk_... VOICE_ID=... npx tsx scripts/gerar-citacoes.ts
```

Gera: `scripts/output/citacoes/citacao-<n>-veu<v>.mp3`

51 clips curtos prontos para Reels/TikTok. Ficheiros existentes são saltados.

---

## C — Reflexões (perguntas de cada capítulo)

```bash
ELEVENLABS_API_KEY=sk_... VOICE_ID=... npx tsx scripts/gerar-reflexoes.ts
```

Gera: `scripts/output/reflexoes/<livro>/cap-<n>-reflexao.mp3`

A pergunta de reflexão de cada capítulo, narrada pela tua voz.
Todos os 4 livros publicados (Espelho Ilusão, Espelho Medo, Nó Herança, Nó Silêncio).

---

## D — Intros pessoais dos véus

**Passo 1:** Preenche os textos em `src/data/intros-veus.ts`

**Passo 2:**
```bash
ELEVENLABS_API_KEY=sk_... VOICE_ID=... npx tsx scripts/gerar-intros-veus.ts
```

Gera: `scripts/output/intros/veu-<n>-<nome>.mp3`

Podes correr parcialmente (preenches só os véus que já tens texto)
e re-correr quando tiveres os restantes.

---

## Correr tudo de uma vez

```bash
export ELEVENLABS_API_KEY=sk_...
export VOICE_ID=...
npx tsx scripts/gerar-citacoes.ts
npx tsx scripts/gerar-reflexoes.ts
npx tsx scripts/gerar-intros-veus.ts  # só depois de preencher intros-veus.ts
```
