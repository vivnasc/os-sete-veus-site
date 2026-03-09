# Scripts de Geração de Áudio — ElevenLabs

Precisas de: `ELEVENLABS_API_KEY` e `VOICE_ID` (ID do teu clone de voz).

O `VOICE_ID` encontras em ElevenLabs → Voices → o teu clone → copia o ID.

---

## Audiobook (narração completa dos capítulos)

```bash
ELEVENLABS_API_KEY=sk_... VOICE_ID=... npx tsx scripts/gerar-audiobook.ts
```

Gera: `scripts/output/audiobook/<livro>/cap-<n>.mp3`

Livros: Espelho da Ilusão, Espelho do Medo, Nó da Herança, Nó do Silêncio.

Capítulos longos são divididos em partes (`cap-1-parte-1.mp3`, `cap-1-parte-2.mp3`).
Se um ficheiro já existe é saltado — podes correr o script várias vezes sem duplicar.

---

## Citações (clips para redes sociais)

```bash
ELEVENLABS_API_KEY=sk_... VOICE_ID=... npx tsx scripts/gerar-citacoes.ts
```

Gera: `scripts/output/citacoes/citacao-<n>-veu<v>.mp3`

Clips curtos prontos para pôr por cima de vídeo no Reels/TikTok.

---

## Reflexões (perguntas de cada capítulo)

```bash
ELEVENLABS_API_KEY=sk_... VOICE_ID=... npx tsx scripts/gerar-reflexoes.ts
```

Gera: `scripts/output/reflexoes/<livro>/cap-<n>-reflexao.mp3`

A pergunta de reflexão de cada capítulo narrada — ideal no final do capítulo áudio.

---

## Correr tudo de uma vez

```bash
export ELEVENLABS_API_KEY=sk_...
export VOICE_ID=...
npx tsx scripts/gerar-audiobook.ts
npx tsx scripts/gerar-citacoes.ts
npx tsx scripts/gerar-reflexoes.ts
```
