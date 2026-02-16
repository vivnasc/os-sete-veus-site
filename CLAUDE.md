# Os Sete Véus — Visão Completa do Projecto

## Autora
**Vivianne dos Santos** — economista, escritora, moçambicana.
Email: viv.saraiva@gmail.com

---

## A Arquitectura: Espelhos, Nós e Ecos

Cada véu tem **três dimensões**:

### 1. Espelhos (Ficção Interior)
Histórias onde a leitora se reconhece. Cada espelho revela um véu.
- São 7 livros, um por véu
- Estrutura: 7 capítulos + reflexões + checklist por capítulo
- Leitura sequencial (desbloqueia capítulo a capítulo)

### 2. Nós (Ficção Relacional)
O que se passa **entre duas pessoas** quando um véu cai.
- São 7 livros, um por véu (par do Espelho correspondente)
- **Regra fundamental: Só lês o Nó se viveste o Espelho**
- O Nó é continuação emocional, não upsell
- Desbloqueia ao completar TODOS os capítulos do Espelho correspondente

### 3. Ecos (Comunidade)
Onde as vozes se encontram. Partilhas, reflexões, ressonâncias.
- Comunidade em `/comunidade`
- Integrada na experiência de leitura

---

## Os 7 Véus

| # | Véu | Espelho | Nó | Personagens Nó | Tema |
|---|-----|---------|-----|---------------|------|
| 1 | Ilusão | O Espelho da Ilusão | O Nó da Herança | Sara + Helena (mãe) | O silêncio herdado entre mãe e filha |
| 2 | Medo | O Espelho do Medo | O Nó do Silêncio | Rui + Ana | O que o medo calou entre eles |
| 3 | Culpa | O Espelho da Culpa | O Nó do Sacrifício | Filipe + Luísa | A culpa disfarçada de entrega |
| 4 | Identidade | O Espelho da Identidade | O Nó da Vergonha | Vítor + Mariana | A máscara que caiu entre dois estranhos |
| 5 | Controlo | O Espelho do Controlo | O Nó da Solidão | Isabel + Pedro | O controlo que isolou quem mais amava |
| 6 | Desejo | O Espelho do Desejo | O Nó do Vazio | Lena + Sofia | O desejo que esvaziou a amizade |
| 7 | Separação | O Espelho da Separação | O Nó da Pertença | Helena T. + Miguel C. | A separação que reinventou o lar |

---

## Modelo de Preços

### Espelhos
- Individual: **$29** USD / 1885 MZN / R$119 / €27
- Pack 3 Espelhos: **$69** (18% desconto)
- Jornada Completa (7 Espelhos): **$149** (27% desconto)

### Nós
- Individual: **$12** USD / 780 MZN / R$49 / €11
- **Pack 3 Espelhos ($69) → 3 Nós incluídos**
- **Jornada Completa ($149) → Nós completo incluído**

### Lógica de upgrade
- Espelho individual ($29) + Nó individual ($12) = $41
- Quem começa com individual sente a dor de pagar $12 por nó → empurra para upgrade
- A Jornada Completa torna-se absurdamente valiosa

---

## O Momento Mágico (UX do Nó)

### Enquanto lê o Espelho (não completou):
- Aparece teaser trancado no final da lista de capítulos
- Cadeado + "Sara viu o véu. Mas há um nó que ficou por desatar."
- "Disponível ao completar este espelho."

### Depois de completar o Espelho:
- Cadeado desaparece, card brilha
- "✓ Espelho da Ilusão — Completo"
- "A mãe sempre viu. Esperou anos. Agora que Sara acordou, Helena tem algo para lhe dizer."
- Botão: "Desatar este nó →"

### No dashboard do membro:
- Se Espelho não completo: teaser trancado
- Se Espelho completo: card desbloqueado com progresso

---

## Estado Actual (Fevereiro 2026)

### Publicado:
- **Espelho da Ilusão** — disponível, completo (7 capítulos)
- **Nó da Herança** — disponível, completo (depende de completar Espelho da Ilusão)
- **Os 7 Véus do Despertar** — livro filosófico

### Em breve:
- Espelho do Medo — Março 2026
- Espelho da Culpa — Abril 2026
- Espelho da Identidade — Junho 2026
- Espelho do Controlo — Agosto 2026
- Espelho do Desejo — Outubro 2026
- Espelho da Separação — Dezembro 2026

### Nós restantes:
- Ainda não escritos (escrevem-se à medida que os Espelhos são publicados)

---

## Estrutura de Acessos (Supabase)

- `has_book_access` — acesso ao livro filosófico (Os 7 Véus)
- `has_mirrors_access` — acesso aos Espelhos (e Nós desbloqueáveis)
- `has_audiobook_access` — acesso ao audiobook
- `is_admin` — acesso total

### Lógica do Nó:
- Requer `has_mirrors_access` (mesmo que o Espelhos)
- Mas também requer **todos os capítulos do Espelho lidos** (gate no frontend)
- Admin/autora bypassa o gate

---

## Ficheiros Chave

### Dados
- `src/data/ebook.ts` — Espelho da Ilusão (capítulos + conteúdo)
- `src/data/no-heranca.ts` — Nó da Herança (capítulos + conteúdo)
- `src/data/nos-collection.ts` — metadados dos 7 Nós + preços
- `src/data/experiences.ts` — metadados dos 7 Espelhos + preços

### Páginas de leitura
- `src/app/membro/leitura/page.tsx` — hub do Espelho (com teaser do Nó)
- `src/app/membro/leitura/[capitulo]/page.tsx` — leitor de capítulo do Espelho
- `src/app/membro/nos/page.tsx` — hub do Nó (com gate do Espelho)
- `src/app/membro/nos/[capitulo]/page.tsx` — leitor de capítulo do Nó

### Dashboard e navegação
- `src/app/membro/page.tsx` — dashboard do membro
- `src/app/sobre/page.tsx` — página da autora (ambas colecções)
- `src/components/Header.tsx` — navegação principal

### Controlo de acesso
- `src/components/AuthProvider.tsx` — Profile type + auth
- `src/hooks/useAccess.ts` — hook de verificação de acessos

---

## Princípios de Design

- **Devagar.** Sem pressa. Ao ritmo da leitora.
- **Sem emojis.** Tom sóbrio, quente, íntimo.
- **Cores por véu.** Cada véu tem a sua paleta.
- **Ecos entre colecções.** Espelhos e Nós ligam-se visualmente com o símbolo ~
- **Nunca upsell agressivo.** Tudo é continuação natural, convite gentil.
- **Mobile-first.** A maioria das leitoras lê no telemóvel.
