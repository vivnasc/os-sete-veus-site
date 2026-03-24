# Escola dos Veus — Estado da Producao

**Ultima actualizacao:** 2026-03-24
**Actualizado por:** Claude Code

> Este ficheiro e a referencia unica de continuidade entre sessoes.
> Qualquer sessao nova DEVE ler este ficheiro antes de trabalhar na producao dos cursos.
> Actualizar SEMPRE este ficheiro no final de cada sessao de trabalho.

---

## Resumo do Estado

| Componente | Estado | Detalhe |
|-----------|--------|---------|
| Estrutura dos 20 cursos | COMPLETO | `src/data/courses.ts` — 20 cursos, 160 modulos, 480 sub-aulas |
| Guidelines de producao | COMPLETO | `src/data/course-guidelines.ts` — 706 linhas |
| Territorios visuais | COMPLETO | `src/data/territorios.ts` — 10 territorios mapeados |
| Admin de producao (UI) | COMPLETO | `/admin/cursos/producao/` — audio, imagem, video |
| APIs de producao | COMPLETO | 6 API routes (audio, imagem, video, LoRA, test, assets) |
| Imagens de referencia | PARCIAL | ~60 imagens em `CURSOS/imagens/` |
| **Scripts das aulas** | **NAO INICIADO** | 0/480 scripts escritos |
| **Manuais (PDF)** | **NAO INICIADO** | 0/20 manuais escritos |
| **Cadernos exercicios** | **NAO INICIADO** | 0/160 cadernos escritos |
| **Scripts YouTube** | **NAO INICIADO** | 0/~50 scripts (so titulos existem) |
| Audios (ElevenLabs) | NAO INICIADO | Depende dos scripts |
| Visuais (ThinkDiffusion) | NAO INICIADO | Depende do LoRA + scripts |
| LoRA treinado | NAO INICIADO | Infra pronta, modelo nao treinado |
| PDFs gerados | NAO INICIADO | Pipeline nao implementado |
| Tabelas Supabase cursos | NAO EXISTE | Falta `course_content`, `course_assets` |

---

## Pipeline de Producao — Ordem Obrigatoria

```
FASE 1: CONTEUDO (onde estamos)
  1.1 Scripts das aulas (480 sub-aulas)
  1.2 Manuais (20, um por curso)
  1.3 Cadernos de exercicios (160, 8 por curso)
  1.4 Scripts YouTube (2-3 por curso)

FASE 2: AUDIO
  2.1 Gerar audios via ElevenLabs (480 audios de aulas)
  2.2 Gerar audios YouTube (40-60 audios)
  2.3 QA e aprovacao pela Vivianne

FASE 3: VISUAIS
  3.1 Treinar LoRA com estilo Mundo dos Veus
  3.2 Gerar biblioteca de assets (~100 imagens base)
  3.3 Gerar imagens por aula
  3.4 Gerar clips video (Wan 2.1)

FASE 4: MONTAGEM
  4.1 Juntar audio + visuais + texto animado
  4.2 Gerar PDFs dos manuais e cadernos
  4.3 QA e aprovacao final

FASE 5: PUBLICACAO
  5.1 Upload para Supabase Storage
  5.2 Activar na plataforma
  5.3 Lancamento
```

**REGRA: Nao avancar para a Fase 2 sem ter scripts aprovados.**

---

## Curso Prioritario: Ouro Proprio

O primeiro curso a ser produzido e o **Ouro Proprio** (slug: `ouro-proprio`).
Razao: porta universal — dinheiro e o tema mais activador.

### Progresso do Ouro Proprio

| Modulo | Titulo | Scripts | Manual | Caderno | Audio | Visual |
|--------|--------|---------|--------|---------|-------|--------|
| 1 | O Extracto como Espelho | — | — | — | — | — |
| 2 | A Heranca Financeira Emocional | — | — | — | — | — |
| 3 | A Vergonha do Dinheiro | — | — | — | — | — |
| 4 | Cobrar, Receber, Merecer | — | — | — | — | — |
| 5 | Gastar em Ti | — | — | — | — | — |
| 6 | Dinheiro e Relacoes | — | — | — | — | — |
| 7 | Ganhar Mais Nao Resolve | — | — | — | — | — |
| 8 | Dinheiro como Liberdade | — | — | — | — | — |

Legenda: — = nao iniciado | DRAFT = rascunho | APROVADO = Vivianne aprovou | PRODUZIDO = asset gerado

---

## Proxima Accao (para a proxima sessao)

**FASE 1.1 — Escrever os scripts do Ouro Proprio**

Comecar pelo Modulo 1, Sub-aula A: "O medo de olhar"

Cada script deve ter estas seccoes (ver `course-guidelines.ts`):
1. `pergunta_inicial` — Pergunta forte, reconhecivel no corpo
2. `situacao_humana` — Cenario real, concreto (terca-feira, supermercado...)
3. `revelacao_padrao` — O que esta por baixo, sem jargao
4. `gesto_consciencia` — Algo pequeno, praticavel, ligado ao corpo
5. `frase_final` — Uma frase que fica, cabe num post-it

**Onde guardar:** Criar ficheiro `src/data/course-scripts/ouro-proprio.ts`
Estrutura:
```typescript
export const OURO_PROPRIO_SCRIPTS = {
  m1a: {
    perguntaInicial: "...",
    situacaoHumana: "...",
    revelacaoPadrao: "...",
    gestoCosciencia: "...",
    fraseFinal: "...",
    status: "draft" | "approved" | "produced"
  },
  m1b: { ... },
  // ...
}
```

**Tom de referencia:**
- Calmo, proximo, filosofico
- Fala a "tu"
- Usa o corpo como referencia
- Faz perguntas que ficam
- Nunca diz "veu", "espelho" ou "no" como conceito
- Vida real, nao teoria espiritual — e terca-feira, nao transcendencia
- Frases proibidas: ver `course-guidelines.ts` → TONE_GUIDELINES.forbidden

---

## Onde Guardar Conteudo

```
src/data/course-scripts/
  ouro-proprio.ts          ← scripts das 24 sub-aulas
  limite-sagrado.ts        ← (futuro)
  arte-inteireza.ts        ← (futuro)
  ...

src/data/course-manuals/
  ouro-proprio.ts          ← conteudo do manual (8 capitulos)
  ...

src/data/course-workbooks/
  ouro-proprio.ts          ← conteudo dos 8 cadernos
  ...

src/data/course-youtube/
  ouro-proprio.ts          ← scripts dos 2-3 hooks YouTube
  ...
```

---

## Ficheiros Chave (referencia rapida)

| Ficheiro | Contem |
|----------|--------|
| `src/data/courses.ts` | Estrutura dos 20 cursos (modulos, sub-aulas, titulos) |
| `src/data/course-guidelines.ts` | Guidelines de producao (tom, estrutura, visual) |
| `src/data/territorios.ts` | 10 territorios visuais |
| `src/types/course.ts` | Types TypeScript dos cursos |
| `CLAUDE.md` | Arquitectura tecnica completa do projecto |
| `CURSOS/PRODUCAO-STATUS.md` | **ESTE FICHEIRO** — estado da producao |

---

## Decisoes Tomadas

1. **Ordem de lancamento:** Ouro Proprio → Limite Sagrado → A Arte da Inteireza → restantes
2. **Formato dos scripts:** TypeScript em `src/data/course-scripts/` (permite import directo na plataforma)
3. **Pipeline:** Conteudo primeiro, producao depois (nao produzir video sem script aprovado)
4. **Voz:** Clone ElevenLabs da Vivianne (ja configurado)
5. **Visuais:** ThinkDiffusion + LoRA (infra pronta, modelo por treinar)

---

## Decisoes Pendentes

1. **Pseudonimo da instrutora** — deve funcionar em PT e EN, soar a educadora/guia
2. **Ferramenta de montagem de video** — Wan 2.1 vs CapCut vs ffmpeg
3. **Preco dos cursos** — ainda nao definido
4. **Calendario de lancamento exacto** — depende da velocidade de producao

---

## Instrucoes para Sessoes Futuras

1. Ler este ficheiro (`CURSOS/PRODUCAO-STATUS.md`)
2. Ler `src/data/course-guidelines.ts` para tom e estrutura
3. Verificar a "Proxima Accao" acima
4. Trabalhar na accao indicada
5. **Actualizar este ficheiro** no final da sessao com o progresso feito
6. Commit e push das alteracoes

**IMPORTANTE:** Nao saltar fases. Nao comecar a gerar audios ou visuais sem scripts aprovados.
