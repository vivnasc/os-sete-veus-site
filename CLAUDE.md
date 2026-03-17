# Os Sete Véus — Visão Completa do Projecto

## Descricao

Plataforma digital de leitura transformativa criada por Vivianne dos Santos. Oferece livros digitais (Espelhos e Nós) com leitura sequencial desbloqueável, diário reflexivo, comunidade anónima (Ecos) e painel de administração. O utilizador final é a leitora que procura autoconhecimento; a coach Vivianne gere tudo via painel admin (HUB-CONTROLO).

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
- Espelho da Identidade — Maio 2026
- Espelho do Controlo — Junho 2026
- Espelho do Desejo — Julho 2026
- Espelho da Separação — Agosto 2026

### Nós restantes:
- Ainda não escritos (escrevem-se à medida que os Espelhos são publicados)

---

## Supabase

- **Auth:** Supabase Auth com magic links (email OTP)
- **Storage bucket:** `proof-photos` (comprovativos de compra, publico, max 5MB, JPG/PNG/WebP/HEIC)
- **RLS:** Activo em todas as tabelas
- **Env vars:** `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`

### Estrutura de Acessos

- `has_book_access` — acesso ao livro filosófico (Os 7 Véus do Despertar) + comunidade
- `has_mirrors_access` — acesso aos Espelhos (e Nós desbloqueáveis) — produto separado, comprado
- `has_audiobook_access` — acesso ao audiobook
- `has_early_access` — acesso antecipado (7 dias antes do lancamento de novos Espelhos)
- `is_admin` — acesso total

### Código do livro físico (LIVRO-XXXXX):
- Concede **apenas** `has_book_access` (livro filosófico + comunidade)
- Espelhos e Nós são produtos separados que se compram

### Lógica do Nó:
- Requer `has_mirrors_access` (mesmo que os Espelhos)
- Mas também requer **todos os capítulos do Espelho lidos** (gate no frontend)
- Admin/autora bypassa o gate

---

## Tabelas

### profiles
**Fonte:** `create-profiles-table.sql` + migracoes posteriores
**Para que serve:** Perfil do utilizador — flags de acesso, estado da subscricao, produtos comprados.

| Coluna | Tipo | Nullable | Default | Notas |
|--------|------|----------|---------|-------|
| id | uuid | nao | — | PK, FK → auth.users(id) ON DELETE CASCADE |
| email | text | sim | — | UNIQUE |
| is_admin | boolean | sim | false | Admin bypassa todos os gates |
| subscription_status | text | sim | 'inactive' | 'inactive', 'active', 'cancelled' |
| has_book_access | boolean | sim | false | Acesso ao livro filosofico + comunidade |
| has_mirrors_access | boolean | sim | false | Acesso aos Espelhos e Nos |
| has_audiobook_access | boolean | sim | false | Acesso ao audiobook |
| has_early_access | boolean | sim | — | Acesso antecipado (7 dias antes do lancamento) |
| purchased_products | jsonb | sim | '[]'::jsonb | Array de {type, date, code?} |
| created_at | timestamptz | sim | NOW() | |
| updated_at | timestamptz | sim | NOW() | Trigger automatico |

**RLS:** Users veem/editam o proprio perfil. Admins veem todos. Service role pode inserir.

---

### reading_progress
**Fonte:** `supabase-reader-tables.sql`
**Para que serve:** Registo de capitulos lidos (Espelhos e Nos). Usado para desbloquear capitulos seguintes e gate dos Nos.

| Coluna | Tipo | Nullable | Default | Notas |
|--------|------|----------|---------|-------|
| id | uuid | nao | gen_random_uuid() | PK |
| user_id | uuid | sim | — | FK → auth.users(id) ON DELETE CASCADE |
| chapter_slug | text | nao | — | Slug do capitulo (ex: "cap-1") |
| completed | boolean | sim | false | |
| created_at | timestamptz | sim | NOW() | |
| updated_at | timestamptz | sim | NOW() | |

**Constraint:** UNIQUE(user_id, chapter_slug)

---

### checklist_progress
**Fonte:** `supabase-reader-tables.sql`
**Para que serve:** Estado dos itens de checklist por capitulo. Cada capitulo tem N itens que a leitora marca.

| Coluna | Tipo | Nullable | Default | Notas |
|--------|------|----------|---------|-------|
| id | uuid | nao | gen_random_uuid() | PK |
| user_id | uuid | sim | — | FK → auth.users(id) ON DELETE CASCADE |
| chapter_slug | text | nao | — | |
| item_index | int | nao | — | Indice do item no checklist |
| checked | boolean | sim | false | |
| checked_at | timestamptz | sim | — | |

**Constraint:** UNIQUE(user_id, chapter_slug, item_index)

---

### journal_entries
**Fonte:** `supabase-reader-tables.sql`
**Para que serve:** Diario pessoal da leitora por capitulo. Texto livre de reflexao.

| Coluna | Tipo | Nullable | Default | Notas |
|--------|------|----------|---------|-------|
| id | uuid | nao | gen_random_uuid() | PK |
| user_id | uuid | sim | — | FK → auth.users(id) ON DELETE CASCADE |
| chapter_slug | text | nao | — | |
| content | text | sim | '' | Texto livre |
| created_at | timestamptz | sim | NOW() | |
| updated_at | timestamptz | sim | NOW() | |

**Constraint:** UNIQUE(user_id, chapter_slug)

---

### referrals
**Fonte:** `supabase-reader-tables.sql`
**Para que serve:** Registo de partilhas/referrals feitas pelas leitoras nas redes sociais.

| Coluna | Tipo | Nullable | Default | Notas |
|--------|------|----------|---------|-------|
| id | uuid | nao | gen_random_uuid() | PK |
| user_id | uuid | sim | — | FK → auth.users(id) ON DELETE CASCADE |
| platform | text | nao | — | Rede social (ex: "whatsapp", "instagram") |
| referral_code | text | nao | — | Codigo de referral |
| shared_at | timestamptz | sim | NOW() | |

---

### livro_codes
**Fonte:** `supabase/migrations/create_livro_codes_table.sql`
**Para que serve:** Codigos LIVRO-XXXXX para acesso ao livro filosofico digital. Gerados pelo admin ou automaticamente.

| Coluna | Tipo | Nullable | Default | Notas |
|--------|------|----------|---------|-------|
| id | uuid | nao | gen_random_uuid() | PK |
| code | varchar(20) | nao | — | UNIQUE, formato LIVRO-XXXXX |
| email | varchar(255) | sim | — | Email destinatario (opcional) |
| status | varchar(20) | sim | 'unused' | CHECK: 'unused', 'used', 'expired' |
| generated_at | timestamptz | sim | NOW() | |
| used_at | timestamptz | sim | — | Quando foi usado |
| used_by | uuid | sim | — | FK → auth.users(id) |
| created_by | varchar(50) | sim | 'auto' | 'auto', 'admin', 'manual' |
| notes | text | sim | — | |
| created_at | timestamptz | sim | NOW() | |
| updated_at | timestamptz | sim | NOW() | Trigger automatico |

**RLS:** Apenas admins (via user_roles) podem ver, inserir e actualizar.

---

### livro_code_requests
**Fonte:** `supabase/migrations/create_livro_codes_table.sql`
**Para que serve:** Pedidos de codigo por clientes que compraram o livro fisico. Admin revê e aprova/rejeita.

| Coluna | Tipo | Nullable | Default | Notas |
|--------|------|----------|---------|-------|
| id | uuid | nao | gen_random_uuid() | PK |
| full_name | varchar(255) | nao | — | |
| email | varchar(255) | nao | — | |
| whatsapp | varchar(50) | sim | — | |
| purchase_location | text | sim | — | Onde comprou (livraria, evento) |
| proof_url | text | sim | — | URL da foto do comprovativo (Storage) |
| status | varchar(20) | sim | 'pending' | CHECK: 'pending', 'approved', 'rejected' |
| generated_code_id | uuid | sim | — | FK → livro_codes(id) |
| created_at | timestamptz | sim | NOW() | |
| updated_at | timestamptz | sim | NOW() | Trigger automatico |
| reviewed_at | timestamptz | sim | — | |
| reviewed_by | uuid | sim | — | FK → auth.users(id) |
| rejection_reason | text | sim | — | |

**RLS:** Qualquer um pode criar. Users veem os proprios. Admins veem todos e actualizam.

---

### payments *(schema inferido do codigo)*
**Fonte:** inferido de `src/app/api/payment/` + `src/app/admin/pagamentos/page.tsx`
**Para que serve:** Registos de pagamento (transferencia bancaria, MPesa, PayPal). Admin confirma ou rejeita manualmente.

| Coluna | Tipo | Nullable | Default | Notas |
|--------|------|----------|---------|-------|
| id | uuid | nao | gen_random_uuid() | PK |
| user_id | uuid | nao | — | FK → auth.users(id) |
| user_email | text | nao | — | Email do cliente |
| user_phone | text | sim | — | Telefone do cliente |
| access_type_code | text | nao | — | Codigo do produto (ex: "experiencia-veu-ilusao") |
| payment_method | text | nao | — | 'bank_transfer', 'mpesa', 'paypal' |
| amount | numeric | nao | — | Valor |
| currency | text | sim | 'MZN' | 'MZN', 'USD', 'BRL', 'EUR' |
| status | text | sim | 'pending' | 'pending', 'confirmed', 'rejected' |
| transaction_id | text | sim | — | Numero de transacao bancaria |
| mpesa_reference | text | sim | — | Referencia MPesa |
| notes | text | sim | — | Notas adicionais |
| confirmed_by | uuid | sim | — | FK → auth.users(id) (admin que confirmou) |
| confirmed_at | timestamptz | sim | — | |
| rejection_reason | text | sim | — | |
| created_at | timestamptz | sim | NOW() | |

---

### purchases *(schema inferido do codigo)*
**Fonte:** inferido de `src/app/api/payment/confirm/route.ts` + `src/app/api/special-link/validate/route.ts` + `src/app/api/codes/redeem/route.ts`
**Para que serve:** Registo definitivo de acessos concedidos. Criado apos confirmacao de pagamento, uso de codigo, ou link especial.

| Coluna | Tipo | Nullable | Default | Notas |
|--------|------|----------|---------|-------|
| id | uuid | nao | gen_random_uuid() | PK |
| user_id | uuid | nao | — | FK → auth.users(id) |
| product | text | nao | — | Codigo do produto |
| access_type_code | text | nao | — | Codigo do tipo de acesso |
| granted_via | text | nao | — | 'payment', 'livro_code', 'special_link' |
| granted_at | timestamptz | sim | — | |
| created_at | timestamptz | sim | NOW() | |

---

### access_types *(schema inferido do codigo)*
**Fonte:** inferido de `src/app/api/payment/create/route.ts`
**Para que serve:** Tabela de referencia com os tipos de acesso/produtos disponiveis e se sao pagos.

| Coluna | Tipo | Nullable | Default | Notas |
|--------|------|----------|---------|-------|
| code | varchar | nao | — | PK (ex: "experiencia-veu-ilusao", "livro-codigo") |
| is_paid | boolean | nao | — | Se requer pagamento |

**Nota:** Possivelmente tem mais colunas (nome, descricao, preco). Verificar com query abaixo.

---

### special_links *(schema inferido do codigo)*
**Fonte:** inferido de `src/app/admin/links-especiais/page.tsx` + `src/app/api/special-link/`
**Para que serve:** Links especiais de acesso directo (livro fisico, presentes). O admin cria, partilha URL, cliente regista-se com ele.

| Coluna | Tipo | Nullable | Default | Notas |
|--------|------|----------|---------|-------|
| id | uuid | nao | gen_random_uuid() | PK |
| code | text | nao | — | UNIQUE, nanoid(16) |
| access_type_code | text | nao | — | Tipo de acesso concedido |
| is_active | boolean | sim | true | |
| is_used | boolean | sim | false | |
| max_uses | int | sim | 1 | Maximo de utilizacoes |
| current_uses | int | sim | 0 | Contador de utilizacoes |
| expires_at | timestamptz | sim | — | Null = nunca expira |
| used_by | uuid | sim | — | FK → auth.users(id) (ultimo utilizador) |
| used_at | timestamptz | sim | — | |
| created_by | uuid | sim | — | FK → auth.users(id) (admin) |
| notes | text | sim | — | |
| created_at | timestamptz | sim | NOW() | |

---

### admin_notifications *(schema inferido do codigo)*
**Fonte:** inferido de `src/lib/notify-admin.ts`
**Para que serve:** Notificacoes internas para o painel admin. Cada evento importante gera uma notificacao.

| Coluna | Tipo | Nullable | Default | Notas |
|--------|------|----------|---------|-------|
| id | uuid | nao | gen_random_uuid() | PK |
| type | text | nao | — | 'payment_proof', 'payment_created', 'code_request', 'code_redeemed', 'special_link_used', 'new_member', 'general' |
| title | text | nao | — | |
| message | text | nao | — | |
| details | jsonb | sim | '{}' | Dados extras (chave-valor) |
| read | boolean | sim | false | Se a admin ja leu |
| created_at | timestamptz | sim | NOW() | |

---

### notifications_sent *(schema inferido do codigo)*
**Fonte:** inferido de `src/app/api/cron/notify-launch/route.ts`
**Para que serve:** Registo de notificacoes de lancamento enviadas (evita duplicados).

| Coluna | Tipo | Nullable | Default | Notas |
|--------|------|----------|---------|-------|
| id | uuid | nao | gen_random_uuid() | PK |
| slug | text | nao | — | Slug do espelho |
| type | text | nao | — | 'early_access', 'public_launch' |
| sent_at | timestamptz | nao | — | |
| recipients | int | sim | — | Numero de destinatarios |

---

### publish_log *(schema inferido do codigo)*
**Fonte:** inferido de `src/app/api/cron/publish/route.ts`
**Para que serve:** Log de publicacoes automaticas de espelhos (cron diario).

| Coluna | Tipo | Nullable | Default | Notas |
|--------|------|----------|---------|-------|
| id | uuid | nao | gen_random_uuid() | PK |
| type | text | nao | — | 'espelho_published' |
| slug | text | nao | — | Slug do espelho |
| title | text | sim | — | Titulo do espelho |
| published_at | timestamptz | nao | — | |

---

### user_roles *(schema inferido do codigo)*
**Fonte:** inferido de RLS policies em `create_livro_codes_table.sql` + `src/app/api/codes/generate/route.ts`
**Para que serve:** Tabela de roles de utilizadores. Usada nas RLS policies para verificar admin.

| Coluna | Tipo | Nullable | Default | Notas |
|--------|------|----------|---------|-------|
| user_id | uuid | nao | — | FK → auth.users(id) |
| role | text | nao | — | 'admin' (possivelmente outros) |

**Nota:** Possivelmente tem id e created_at. Verificar com query abaixo.

---

### waitlist *(schema inferido do codigo)*
**Fonte:** inferido de `src/components/WaitlistForm.tsx`
**Para que serve:** Lista de espera para lancamento dos Espelhos (captura de leads).

| Coluna | Tipo | Nullable | Default | Notas |
|--------|------|----------|---------|-------|
| email | text | nao | — | UNIQUE (usado em onConflict) |
| source | text | sim | — | Ex: "experiencias" |

---

### newsletter *(schema inferido do codigo)*
**Fonte:** inferido de `src/components/WaitlistForm.tsx` (fallback)
**Para que serve:** Tabela de newsletter (fallback se waitlist falha).

| Coluna | Tipo | Nullable | Default | Notas |
|--------|------|----------|---------|-------|
| email | text | nao | — | UNIQUE (usado em onConflict) |
| source | text | sim | — | Ex: "waitlist-experiencias" |

---

### reflexoes
**Fonte:** `supabase-schema-ecos.sql`
**Para que serve:** Reflexoes pessoais da leitora por capitulo/veu. Base para criacao de ecos.

| Coluna | Tipo | Nullable | Default | Notas |
|--------|------|----------|---------|-------|
| id | uuid | nao | gen_random_uuid() | PK |
| user_id | uuid | nao | — | FK → auth.users(id) ON DELETE CASCADE |
| veu_numero | int | nao | — | CHECK: 1-7 |
| capitulo | int | nao | — | |
| conteudo | text | nao | — | |
| created_at | timestamptz | sim | NOW() | |
| updated_at | timestamptz | sim | NOW() | |

---

### progresso
**Fonte:** `supabase-schema-ecos.sql`
**Para que serve:** Progresso por veu/capitulo (usado na comunidade, complementar a reading_progress).

| Coluna | Tipo | Nullable | Default | Notas |
|--------|------|----------|---------|-------|
| id | uuid | nao | gen_random_uuid() | PK |
| user_id | uuid | nao | — | FK → auth.users(id) ON DELETE CASCADE |
| veu_numero | int | nao | — | CHECK: 1-7 |
| capitulo_numero | int | nao | — | |
| completado | boolean | sim | false | |
| last_read_at | timestamptz | sim | NOW() | |

**Constraint:** UNIQUE(user_id, veu_numero, capitulo_numero)

---

### ecos
**Fonte:** `supabase-schema-ecos.sql`
**Para que serve:** Reflexoes partilhadas anonimamente na comunidade. Impermanentes (expiram em 30 dias).

| Coluna | Tipo | Nullable | Default | Notas |
|--------|------|----------|---------|-------|
| id | uuid | nao | gen_random_uuid() | PK |
| user_id | uuid | nao | — | FK → auth.users(id) ON DELETE CASCADE |
| reflexao_id | uuid | sim | — | FK → reflexoes(id) ON DELETE SET NULL |
| veu_numero | int | nao | — | CHECK: 1-7 |
| capitulo | int | sim | — | |
| conteudo | text | nao | — | |
| temas | text[] | sim | '{}' | Tags/temas do eco |
| expires_at | timestamptz | nao | NOW() + 30 dias | Impermanencia |
| created_at | timestamptz | nao | NOW() | |

**RLS:** Autenticados veem ecos nao expirados. Users inserem/apagam os proprios.
**Indices:** veu_numero, expires_at, temas (GIN).

---

### reconhecimentos
**Fonte:** `supabase-schema-ecos.sql`
**Para que serve:** "Reconheco-me" silenciosos — equivalente a um like, mas mais intimo.

| Coluna | Tipo | Nullable | Default | Notas |
|--------|------|----------|---------|-------|
| id | uuid | nao | gen_random_uuid() | PK |
| eco_id | uuid | nao | — | FK → ecos(id) ON DELETE CASCADE |
| user_id | uuid | nao | — | FK → auth.users(id) ON DELETE CASCADE |
| created_at | timestamptz | nao | NOW() | |

**Constraint:** UNIQUE(eco_id, user_id)

---

### sussurros
**Fonte:** `supabase-schema-ecos.sql`
**Para que serve:** Mensagens efemeras de uma so via. Um sussurro em resposta a um eco. Expira apos 7 dias ou apos ser lido.

| Coluna | Tipo | Nullable | Default | Notas |
|--------|------|----------|---------|-------|
| id | uuid | nao | gen_random_uuid() | PK |
| eco_id | uuid | nao | — | FK → ecos(id) ON DELETE CASCADE |
| from_user_id | uuid | nao | — | FK → auth.users(id) ON DELETE CASCADE |
| to_user_id | uuid | nao | — | FK → auth.users(id) ON DELETE CASCADE |
| conteudo | text | nao | — | CHECK: max 100 caracteres |
| lido | boolean | sim | false | |
| expires_at | timestamptz | nao | NOW() + 7 dias | |
| created_at | timestamptz | nao | NOW() | |

---

### marcas
**Fonte:** `supabase-schema-ecos.sql`
**Para que serve:** Frases deixadas ao completar um veu. Uma por veu por pessoa. Expira em 90 dias.

| Coluna | Tipo | Nullable | Default | Notas |
|--------|------|----------|---------|-------|
| id | uuid | nao | gen_random_uuid() | PK |
| user_id | uuid | nao | — | FK → auth.users(id) ON DELETE CASCADE |
| veu_numero | int | nao | — | CHECK: 1-7 |
| conteudo | text | nao | — | CHECK: max 200 caracteres |
| expires_at | timestamptz | nao | NOW() + 90 dias | |
| created_at | timestamptz | nao | NOW() | |

**Constraint:** UNIQUE(user_id, veu_numero)

---

### circulos
**Fonte:** `supabase-schema-ecos.sql`
**Para que serve:** Grupos temporarios por veu (max 7 membros). Circulos de espelho. Expiram em 14 dias.

| Coluna | Tipo | Nullable | Default | Notas |
|--------|------|----------|---------|-------|
| id | uuid | nao | gen_random_uuid() | PK |
| veu_numero | int | nao | — | CHECK: 1-7 |
| max_membros | int | sim | 7 | |
| activo | boolean | sim | true | |
| expires_at | timestamptz | nao | NOW() + 14 dias | |
| created_at | timestamptz | nao | NOW() | |

---

### circulo_membros
**Fonte:** `supabase-schema-ecos.sql`
**Para que serve:** Membros de cada circulo. Nome sombra anonimo atribuido.

| Coluna | Tipo | Nullable | Default | Notas |
|--------|------|----------|---------|-------|
| id | uuid | nao | gen_random_uuid() | PK |
| circulo_id | uuid | nao | — | FK → circulos(id) ON DELETE CASCADE |
| user_id | uuid | nao | — | FK → auth.users(id) ON DELETE CASCADE |
| sombra_nome | text | nao | — | Pseudonimo anonimo (cor do veu + numero) |
| joined_at | timestamptz | nao | NOW() | |

**Constraint:** UNIQUE(circulo_id, user_id)

---

### circulo_fragmentos
**Fonte:** `supabase-schema-ecos.sql`
**Para que serve:** Fragmentos anonimos partilhados dentro de um circulo. Nao sao mensagens — sao reflexoes.

| Coluna | Tipo | Nullable | Default | Notas |
|--------|------|----------|---------|-------|
| id | uuid | nao | gen_random_uuid() | PK |
| circulo_id | uuid | nao | — | FK → circulos(id) ON DELETE CASCADE |
| user_id | uuid | nao | — | FK → auth.users(id) ON DELETE CASCADE |
| conteudo | text | nao | — | CHECK: max 300 caracteres |
| created_at | timestamptz | nao | NOW() | |

---

### fogueiras
**Fonte:** `supabase-schema-ecos.sql`
**Para que serve:** Sessoes de contemplacao colectiva agendadas pela autora. Tempo limitado.

| Coluna | Tipo | Nullable | Default | Notas |
|--------|------|----------|---------|-------|
| id | uuid | nao | gen_random_uuid() | PK |
| titulo | text | nao | — | |
| descricao | text | sim | — | |
| starts_at | timestamptz | nao | — | Inicio agendado |
| ends_at | timestamptz | nao | — | Fim agendado |
| activa | boolean | sim | false | |
| frase_abertura | text | sim | — | Frase da Vivianne no inicio |
| frase_fecho | text | sim | — | Frase da Vivianne no fim |
| created_at | timestamptz | nao | NOW() | |

---

### fogueira_faiscas
**Fonte:** `supabase-schema-ecos.sql`
**Para que serve:** Reflexoes anonimas partilhadas durante uma fogueira. Max 200 caracteres.

| Coluna | Tipo | Nullable | Default | Notas |
|--------|------|----------|---------|-------|
| id | uuid | nao | gen_random_uuid() | PK |
| fogueira_id | uuid | nao | — | FK → fogueiras(id) ON DELETE CASCADE |
| user_id | uuid | nao | — | FK → auth.users(id) ON DELETE CASCADE |
| conteudo | text | nao | — | CHECK: max 200 caracteres |
| created_at | timestamptz | nao | NOW() | |

---

### diario_espelho
**Fonte:** `supabase-schema-novas-features.sql`
**Para que serve:** Interaccoes IA do journal — pares reflexao/pergunta para sintese mensal.

| Coluna | Tipo | Nullable | Default | Notas |
|--------|------|----------|---------|-------|
| id | uuid | nao | gen_random_uuid() | PK |
| user_id | uuid | nao | — | FK → auth.users(id) ON DELETE CASCADE |
| reflexao | text | nao | — | Texto da reflexao da leitora |
| pergunta_espelho | text | nao | — | Pergunta gerada pela IA |
| veu_numero | int | sim | — | |
| created_at | timestamptz | sim | NOW() | |

**RLS:** Users leem e inserem os proprios.

---

### ecos_guardados
**Fonte:** `supabase-schema-novas-features.sql`
**Para que serve:** Coleccao pessoal de ecos que tocaram a leitora (bookmark de ecos).

| Coluna | Tipo | Nullable | Default | Notas |
|--------|------|----------|---------|-------|
| id | uuid | nao | gen_random_uuid() | PK |
| user_id | uuid | nao | — | FK → auth.users(id) ON DELETE CASCADE |
| eco_id | uuid | nao | — | Sem FK constraint (independente da tabela ecos) |
| created_at | timestamptz | sim | NOW() | |

**Constraint:** UNIQUE(user_id, eco_id)
**RLS:** Users leem, inserem e apagam os proprios.

---

### Relacoes entre tabelas

**Perfis e Auth:**
- profiles.id → auth.users(id)

**Leitura:**
- reading_progress.user_id → auth.users(id)
- checklist_progress.user_id → auth.users(id)
- journal_entries.user_id → auth.users(id)
- referrals.user_id → auth.users(id)
- progresso.user_id → auth.users(id)
- reflexoes.user_id → auth.users(id)
- diario_espelho.user_id → auth.users(id)

**Codigos e acessos:**
- livro_codes.used_by → auth.users(id)
- livro_code_requests.generated_code_id → livro_codes(id)
- livro_code_requests.reviewed_by → auth.users(id)
- purchases.user_id → auth.users(id)
- payments.user_id → auth.users(id)
- payments.confirmed_by → auth.users(id)
- special_links.used_by → auth.users(id)
- special_links.created_by → auth.users(id)

**Comunidade (Ecos):**
- ecos.user_id → auth.users(id)
- ecos.reflexao_id → reflexoes(id)
- reconhecimentos.eco_id → ecos(id)
- reconhecimentos.user_id → auth.users(id)
- sussurros.eco_id → ecos(id)
- sussurros.from_user_id → auth.users(id)
- sussurros.to_user_id → auth.users(id)
- marcas.user_id → auth.users(id)
- ecos_guardados.user_id → auth.users(id)

**Circulos:**
- circulo_membros.circulo_id → circulos(id)
- circulo_membros.user_id → auth.users(id)
- circulo_fragmentos.circulo_id → circulos(id)
- circulo_fragmentos.user_id → auth.users(id)

**Fogueiras:**
- fogueira_faiscas.fogueira_id → fogueiras(id)
- fogueira_faiscas.user_id → auth.users(id)

---

## Views

### mare_consciencia
**Fonte:** `supabase-schema-ecos.sql`
**Para que serve:** Agregacao anonima de temas dos ecos activos para visualizacao da "mare de consciencia".

```sql
SELECT
    unnest(temas) AS tema,
    veu_numero,
    COUNT(*) AS intensidade,
    DATE_TRUNC('hour', created_at) AS periodo
FROM public.ecos
WHERE expires_at > now()
GROUP BY tema, veu_numero, periodo
ORDER BY periodo DESC, intensidade DESC;
```

---

## Funcoes RPC (SQL)

### generate_unique_livro_code()
**Retorno:** VARCHAR(20)
**Para que serve:** Gera codigo unico LIVRO-XXXXX verificando colisoes. Nota: o codigo JS em `codes/generate/route.ts` tambem gera codigos sem usar esta funcao.

### update_updated_at_column()
**Retorno:** TRIGGER
**Para que serve:** Trigger function para actualizar automaticamente `updated_at`. Usada em: profiles, livro_codes, livro_code_requests.

---

## Real-time Subscriptions

Nenhuma subscricao realtime (.channel() / .on()) encontrada no codigo actual. A comunidade (ecos) usa fetch normal.

---

## Storage (Supabase Storage)

### Bucket: proof-photos
**Para que serve:** Armazenar comprovativos de compra (fotos de recibos, fotos do livro fisico).
- **Publico:** sim
- **Max tamanho:** 5MB
- **Tipos:** image/jpeg, image/png, image/webp, image/heic
- **Naming:** `comprovativo-{timestamp}-{random}.{ext}`
- **Usado em:** `src/app/api/upload-proof/route.ts`

---

## Constantes e Mapeamentos

### ACCESS_FLAG_MAP (`src/lib/constants.ts`)
Mapeia `access_type_code` → flag no perfil:

| access_type_code | Flag no profiles |
|-----------------|-----------------|
| experiencia-veu-ilusao | has_mirrors_access |
| experiencia-veu-medo | has_mirrors_access |
| experiencia-veu-culpa | has_mirrors_access |
| experiencia-veu-identidade | has_mirrors_access |
| experiencia-veu-controlo | has_mirrors_access |
| experiencia-veu-desejo | has_mirrors_access |
| experiencia-veu-separacao | has_mirrors_access |
| pack-3-espelhos | has_mirrors_access |
| jornada-completa | has_mirrors_access |
| livro-codigo | has_book_access |

### ADMIN_EMAILS (`src/lib/constants.ts`)
- `viv.saraiva@gmail.com`

---

## Fluxos importantes para a Coach (HUB-CONTROLO)

### Dados por cliente
A Vivianne precisa de ver por cada cliente:
- **Perfil:** email, flags de acesso (book, mirrors, audiobook, early_access), subscription_status
- **Produtos comprados:** purchased_products (JSONB array no profiles)
- **Progresso de leitura:** reading_progress (capitulos completados por espelho/no)
- **Checklist:** checklist_progress (itens marcados por capitulo)
- **Diario:** journal_entries (texto de reflexao por capitulo)
- **Pagamentos:** payments (historico completo, status pendentes)
- **Codigos usados:** livro_codes filtrado por used_by (codigo e data de uso)
- **Actividade comunidade:** ecos criados, reconhecimentos dados, sussurros enviados
- **Diario IA:** diario_espelho (pares reflexao/pergunta)
- **Referrals:** plataformas partilhadas

### Eventos que devem gerar alerta
- **Novo pagamento criado** (payments.status = 'pending') — precisa de confirmacao manual
- **Comprovativo enviado** (payment com transaction_id/mpesa_reference) — pronto para rever
- **Novo pedido de codigo** (livro_code_requests.status = 'pending') — precisa de aprovacao
- **Codigo resgatado** (livro_codes.status changed to 'used') — novo membro
- **Link especial usado** (special_links.current_uses incrementado) — acesso concedido
- **Novo membro registado** — notificacao via admin_notifications
- **Inactividade** (leitora nao lê ha X dias) — calculado a partir de reading_progress.updated_at
- **Espelho completado** (todos os 7 capitulos de um espelho completados) — potencial para No
- **Veu completado** (marca deixada em marcas) — celebracao

### KPIs para o dashboard
- **Clientes activos:** profiles com has_book_access=true OR has_mirrors_access=true
- **Leitoras esta semana:** COUNT DISTINCT user_id de reading_progress WHERE updated_at > 7 dias
- **Capitulos lidos esta semana:** COUNT de reading_progress WHERE completed=true AND updated_at > 7 dias
- **Receita pendente:** SUM(amount) de payments WHERE status='pending'
- **Receita confirmada:** SUM(amount) de payments WHERE status='confirmed' (por periodo)
- **Codigos pendentes:** COUNT de livro_code_requests WHERE status='pending'
- **Pagamentos pendentes:** COUNT de payments WHERE status='pending'
- **Ecos activos:** COUNT de ecos WHERE expires_at > now()
- **Leitoras na comunidade:** COUNT DISTINCT user_id de ecos WHERE expires_at > now()
- **Fogueiras agendadas:** COUNT de fogueiras WHERE starts_at > now()
- **Taxa de conclusao por espelho:** reading_progress completados / total leitoras com acesso
- **Progressao entre veus:** quantas leitoras completaram veu 1, 2, 3...
- **Conversao waitlist → membro:** emails em waitlist que existem em profiles

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

### Admin
- `src/app/admin/page.tsx` — dashboard admin
- `src/app/admin/pagamentos/page.tsx` — gestao de pagamentos
- `src/app/admin/links-especiais/page.tsx` — gestao de links especiais

### API Routes
- `src/app/api/payment/create/route.ts` — criar pagamento
- `src/app/api/payment/confirm/route.ts` — confirmar/rejeitar pagamento (admin)
- `src/app/api/payment/submit-proof/route.ts` — submeter comprovativo
- `src/app/api/codes/generate/route.ts` — gerar codigo LIVRO-XXXXX (admin)
- `src/app/api/codes/redeem/route.ts` — resgatar codigo
- `src/app/api/codes/request/route.ts` — pedir codigo (livro fisico)
- `src/app/api/special-link/create/route.ts` — criar link especial (admin)
- `src/app/api/special-link/validate/route.ts` — validar e activar link especial
- `src/app/api/upload-proof/route.ts` — upload de comprovativo
- `src/app/api/mare/route.ts` — dados anonimos da mare de consciencia
- `src/app/api/cron/publish/route.ts` — publicacao automatica de espelhos
- `src/app/api/cron/notify-launch/route.ts` — notificacoes de lancamento

### Controlo de acesso
- `src/components/AuthProvider.tsx` — Profile type + auth context
- `src/hooks/useAccess.ts` — hook de verificação de acessos
- `src/lib/constants.ts` — ACCESS_FLAG_MAP, ALL_PRODUCTS, ADMIN_EMAILS
- `src/lib/notify-admin.ts` — sistema de notificacoes para admin (Supabase + webhook WhatsApp)
- `src/lib/supabase.ts` — cliente Supabase (browser)
- `src/lib/supabase-server.ts` — cliente Supabase (server/admin)
- `src/lib/publish.ts` — logica de publicacao automatica por data

### Schema SQL
- `create-profiles-table.sql` — tabela profiles (schema base)
- `supabase-reader-tables.sql` — reading_progress, checklist_progress, journal_entries, referrals
- `supabase/migrations/create_livro_codes_table.sql` — livro_codes, livro_code_requests, user_roles (RLS), funcoes SQL
- `supabase-schema-ecos.sql` — ecos, reconhecimentos, sussurros, marcas, circulos, circulo_membros, circulo_fragmentos, fogueiras, fogueira_faiscas, view mare_consciencia
- `supabase-schema-novas-features.sql` — diario_espelho, ecos_guardados

---

## Principios de Design

- **Devagar.** Sem pressa. Ao ritmo da leitora.
- **Sem emojis.** Tom sóbrio, quente, íntimo.
- **Cores por véu.** Cada véu tem a sua paleta.
- **Ecos entre colecções.** Espelhos e Nós ligam-se visualmente com o símbolo ~
- **Nunca upsell agressivo.** Tudo é continuação natural, convite gentil.
- **Mobile-first.** A maioria das leitoras lê no telemóvel.

---

## Queries SQL para validar schema (tabelas inferidas)

As tabelas marcadas como "inferido do codigo" podem ser validadas correndo no Supabase SQL Editor:

```sql
-- Listar todas as tabelas publicas
SELECT table_name FROM information_schema.tables WHERE table_schema = 'public' ORDER BY table_name;

-- Schema de cada tabela inferida
SELECT column_name, data_type, is_nullable, column_default FROM information_schema.columns WHERE table_name = 'payments' ORDER BY ordinal_position;
SELECT column_name, data_type, is_nullable, column_default FROM information_schema.columns WHERE table_name = 'purchases' ORDER BY ordinal_position;
SELECT column_name, data_type, is_nullable, column_default FROM information_schema.columns WHERE table_name = 'access_types' ORDER BY ordinal_position;
SELECT column_name, data_type, is_nullable, column_default FROM information_schema.columns WHERE table_name = 'special_links' ORDER BY ordinal_position;
SELECT column_name, data_type, is_nullable, column_default FROM information_schema.columns WHERE table_name = 'admin_notifications' ORDER BY ordinal_position;
SELECT column_name, data_type, is_nullable, column_default FROM information_schema.columns WHERE table_name = 'notifications_sent' ORDER BY ordinal_position;
SELECT column_name, data_type, is_nullable, column_default FROM information_schema.columns WHERE table_name = 'publish_log' ORDER BY ordinal_position;
SELECT column_name, data_type, is_nullable, column_default FROM information_schema.columns WHERE table_name = 'user_roles' ORDER BY ordinal_position;
SELECT column_name, data_type, is_nullable, column_default FROM information_schema.columns WHERE table_name = 'waitlist' ORDER BY ordinal_position;
SELECT column_name, data_type, is_nullable, column_default FROM information_schema.columns WHERE table_name = 'newsletter' ORDER BY ordinal_position;
SELECT column_name, data_type, is_nullable, column_default FROM information_schema.columns WHERE table_name = 'profiles' ORDER BY ordinal_position;

-- Foreign keys
SELECT tc.table_name, kcu.column_name, ccu.table_name AS fk_table, ccu.column_name AS fk_column
FROM information_schema.table_constraints tc
JOIN information_schema.key_column_usage kcu ON tc.constraint_name = kcu.constraint_name
JOIN information_schema.constraint_column_usage ccu ON ccu.constraint_name = tc.constraint_name
WHERE tc.constraint_type = 'FOREIGN KEY' ORDER BY tc.table_name;
```

---

## A Escola dos Veus — Documento Consolidado

**Este documento substitui TODOS os prompts adicionais anteriores (producao, reestruturacao, fluxo, mascote, piloto). E a referencia unica para tudo o que nao e arquitectura tecnica nem catalogo de cursos.**

### 1. Manifesto

**Porque existe:** Porque ha coisas que toda a gente sente e quase ninguem diz. O aperto no estomago quando olhas para a conta bancaria. A culpa que aparece quando dizes nao. A conversa que ensaias no chuveiro ha meses. O cansaco que nao passa com ferias. O amor que te faz desaparecer. A raiva da tua mae que te faz sentir ma filha. A perda que ninguem te deixou chorar. A decisao que adias porque o medo e mais alto que a clareza. Tudo isto vive no corpo. Tudo isto tem um padrao. Tudo isto pode ser visto — se alguem te ajudar a olhar. A Escola dos Veus existe para isso.

**O que e:** Nao e terapia. Nao e coaching. Nao e espiritualidade. E um lugar onde entras para ver o que sempre esteve la mas nunca foi nomeado. Cada curso e um territorio — uma zona da tua vida que precisas de atravessar com mais clareza. Os temas sao a vida real. O metodo e o corpo. A voz e de quem ja esteve onde tu estas.

**O que nos torna diferentes:**
1. Comecamos pelo corpo, nao pela mente.
2. Os exercicios sao experiencias, nao tarefas.
3. Vida real, nao teoria espiritual. Nao e transcendencia — e terca-feira.
4. Honestidade sem brutalidade. "Vejo-te, e ha mais para ti."
5. Filosofia invisivel. Os veus dao profundidade sem jargao.

**Para quem e:** Para todos, com voz feminina. Para quem sente que carrega algo que nao sabe nomear. Para quem quer perceber — nao ser consertada.

**Frase:** Ve o que estava invisivel.

**Nota legal:** Cada curso inclui: "Este curso nao substitui acompanhamento psicologico ou psiquiatrico."

### 2. Identidade

- **Nome da escola:** Sete Veus (ou A Escola dos Veus)
- **Frase:** Ve o que estava invisivel.
- **Pseudonimo da instrutora:** [Por definir — deve funcionar em PT e EN, soar a educadora/guia, ser separado de Len Maro, Zihva, Ren Savaro, Vivianne dos Santos.]
- **Tom verbal:** Calmo, proximo, filosofico. Nao e coach. Nao e terapeuta. E a guia que ja esteve onde tu estas. Fala a "tu". Usa o corpo como referencia. Faz perguntas que ficam. Usa silencio como ferramenta. Nunca diz "veu", "espelho" ou "no" como conceito.
- **Tom visual:** Escuro, quente, poetico. Nunca clean/corporate. Nunca wellness/lotus.

### 3. O Mundo dos Veus — Universo Visual

O Mundo dos Veus e a representacao visual do mundo interno de uma pessoa. Nao e um planeta nem uma fantasia. Cada territorio e uma zona emocional. Quando a aluna entra num curso, entra numa parte de si mesma que ainda nao tinha visitado.

**Constantes visuais (aplicam-se a TODOS os videos e materiais):**

**O Ceu:** Azul-marinho profundo (#1A1A2E). O momento antes do amanhecer. Nunca dia pleno, nunca noite total. Muda dentro de cada curso: modulos 1-2 mais escuro, modulos 7-8 quase amanhecer (mas nunca chega — o amanhecer e da aluna).

**A Silhueta:** Sem rosto. Sem raca. Sem idade. Terracota (#C4745A) com brilho dourado (#C9A96E). Sempre a mesma "pessoa" — a aluna projecta-se nela. Vocabulario corporal fixo:
- De pe, imovel = presenca
- Curvada = peso, medo
- Sentada = reflexao
- Maos no peito = auto-conexao
- Maos abertas = recepcao
- A caminhar = avanco
- De costas = contemplacao
- Mao estendida = coragem

**A Paleta Mestre:**
- Fundo: #1A1A2E (azul-marinho)
- Silhueta: #C4745A (terracota) + #C9A96E (dourado)
- Acentos: #8B5CF6 (violeta)
- Texto: #F5F0E6 (creme)
- Luz: #D4A853 (dourado quente)

**Tipografia:** Uma unica fonte serifada elegante (Playfair Display ou Cormorant Garamond). Texto em creme sobre fundo escuro. Fade suave in/out.

**Transicoes:** Dissolve lento entre cenas. Ecra escuro com respiracao entre sub-aulas. Nunca corte seco, nunca wipe, nunca zoom brusco.

**Som:** Voz clone ElevenLabs da Vivianne. Musica ambiente subtil, quase inaudivel — textura, nao melodia. Silencio intencional entre seccoes.

**Abertura de cada video:** O ceu do mundo. Camara desce ao territorio. Nome do curso + modulo + sub-aula em texto creme. Fade.

**Fecho de cada video:** Territorio dissolve-se no ceu. Frase final no ecra. Fade para escuro. Logo Sete Veus. Silencio.

#### Os 10 Territorios

| # | Territorio | Curso | Cor Propria | Transformacao |
|---|-----------|-------|-------------|---------------|
| 1 | A Casa dos Espelhos Dourados | Ouro Proprio | Ambar | Espelhos cobertos → descobertos, reflexos distorcidos → claros |
| 2 | A Arvore das Raizes Visiveis | Sangue e Seda | Vermelho escuro, seda | Raizes emaranhadas → reorganizadas, amanhecer atras da arvore |
| 3 | A Ponte entre Duas Margens | A Arte da Inteireza | Violeta agua | Rio sem ponte → ponte completa, duas silhuetas inteiras com espaco |
| 4 | O Campo Queimado | Depois do Fogo | Cinza carvao, laranja brasa, verde broto | Destruicao → vida nova, diferente do que era |
| 5 | A Encruzilhada Infinita | Olhos Abertos | Azul nevoeiro, branco | Nevoeiro total → parcialmente claro, silhueta da o primeiro passo |
| 6 | O Corpo-Paisagem | Pele Nua | Terracota rosado | Paisagem desconhecida → reconhecida e habitada |
| 7 | A Muralha que Nasce do Chao | Limite Sagrado | Dourado luminoso | Sem limite → muralha de luz, com porta que a silhueta abre |
| 8 | O Jardim Subterraneo | Flores no Escuro | Azul profundo + bioluminescentes | Caverna escura → iluminada pela luz das proprias flores |
| 9 | O Caminho de Pedras | O Peso e o Chao | Cinza pedra | Curvada sob peso → de pe, leve, pedras no chao |
| 10 | A Sala do Eco | Voz de Dentro | Violeta escuro, dourado eco | Silencio/sombra → voz/luz |
| 11 | O Lago dos Reflexos Partilhados | O Fio Invisivel | Azul-prata, fios dourados | Superficie opaca → transparente, reflexos individuais fundem-se num so |
| 12 | A Galeria dos Reflexos Vivos | O Espelho do Outro | Verde-esmeralda, dourado reflexo | Espelhos que mostram outros → espelhos que mostram a propria silhueta |
| 13 | A Caverna dos Ecos Mudos | O Silencio que Grita | Cinza-azulado, branco fantasma | Caverna silenciosa com ecos presos → caverna com ecos libertados como luz |
| 14 | O Bosque dos Fios Entrelacados | A Teia | Verde-musgo, dourado fio | Fios emaranhados que prendem → teia organizada que sustenta |
| 15 | O Vulcao Adormecido | Brasa Viva | Vermelho-fogo, negro lava | Vulcao selado e escuro → vulcao com lava controlada que ilumina |
| 16 | O Ninho que Pesa | Antes do Ninho | Ocre quente, branco ovo | Ninho que engole a silhueta → ninho com espaco para a silhueta inteira |
| 17 | A Oficina Infinita | Maos Cansadas | Bronze, castanho quente | Oficina frenetica sem pausa → oficina com ritmo proprio e janela aberta |
| 18 | O Jardim das Estacoes | Estacoes Partidas | Prateado, ambar outonal | Relogio gigante que aprisiona → relogio partido, jardim com todas as estacoes |
| 19 | O Trono Coberto | Ouro e Sombra | Dourado real, purpura | Trono coberto por panos → trono descoberto, silhueta sentada de coroa |
| 20 | A Mesa Vazia | Pao e Silencio | Terracota rosado, branco porcelana | Mesa vazia com silhueta faminta → mesa com comida e silhueta em paz |

**Conexoes entre territorios:**
- Casa dos Espelhos reflecte brevemente a Arvore (dinheiro vem da familia)
- Campo Queimado tem a Encruzilhada ao longe (recomecar implica decidir)
- Jardim Subterraneo tem flores da cor da Sala do Eco (luto e silencio ligados)
- Corpo-Paisagem tem o mesmo rio da Ponte (corpo e relacoes conectados)
- Lago dos Reflexos Partilhados reflecte todos os outros territorios na sua superficie (a dualidade contem tudo)
- Casa dos Espelhos Dourados e a Galeria dos Reflexos Vivos sao versoes uma da outra (um olha para dentro, outro olha atraves do outro)
- Sala do Eco e a Caverna dos Ecos Mudos sao complementares (voz propria vs. voz familiar)
- Arvore das Raizes Visiveis partilha raizes com a Caverna dos Ecos Mudos (heranca materna e silencio familiar)
- Ponte entre Duas Margens e o Bosque dos Fios Entrelacados partilham o tema da ligacao (intima vs. colectiva)
- Lago dos Reflexos Partilhados reflecte o Bosque (conexao individual vs. conexao colectiva)
- Vulcao Adormecido fornece fogo a Muralha de Limite Sagrado (sem raiva nao ha limites)
- Vulcao Adormecido fornece fogo ao Trono Coberto (raiva como combustivel do poder)
- Ninho que Pesa partilha raizes com a Arvore das Raizes Visiveis (ser filha e ser mae)
- Oficina Infinita reflecte-se na Casa dos Espelhos Dourados (dinheiro e trabalho como espelhos de identidade)
- Jardim das Estacoes partilha estacoes com o Campo Queimado (recomecos e tempo ligados)
- Trono Coberto complementa Muralha de Limite Sagrado (limites protegem, poder ocupa)
- Mesa Vazia partilha territorio corporal com Corpo-Paisagem (alimentacao e sexualidade como linguagens do corpo)

Quem faz um curso nao precisa de notar. Quem faz varios sente a coerencia.

### 4. Formato dos Cursos

**Estrutura por curso:**
- 8 modulos (modulo 1 gratuito)
- 2-3 sub-aulas por modulo (cada sub-aula = 1 video curto, duracao variavel)
- ~20-24 videos por curso
- 1 manual completo PDF (~40 paginas)
- 8 cadernos de exercicios PDF (~5 paginas cada)
- 2-3 videos YouTube (ganchos gratuitos)
- Certificado automatico ao completar 100%
- Versoes PT e EN separadas

**Ordem de lancamento recomendada:**
1. Ouro Proprio (porta universal — dinheiro e o tema mais activador)
2. Limite Sagrado (ponte natural a partir do dinheiro)
3. A Arte da Inteireza (relacoes — tema com grande procura)
4. Restantes por decisao da Vivianne

**Calendario:** 1 video por semana. 1 curso lancado a cada 2-3 meses.

### 5. Formato do Manual (1 por curso)

```
CAPA — titulo, subtitulo, ilustracao do territorio, logo
ANTES DE COMECARES — o que e, o que nao e, "o teu ritmo e o ritmo certo"
MAPA DO CURSO — 8 modulos com check boxes, paisagem no estado inicial
8 CAPITULOS (4 paginas cada):
  - Titulo + ilustracao do territorio naquele estagio
  - Resumo do modulo (complementa videos, nao repete)
  - 3-5 perguntas de reflexao
  - Espaco para escrever ("As tuas palavras")
DEPOIS DE TERMINARES — reconhecimento, convite para outros cursos
CONTRACAPA — logo, frase, URL
```

Design: paleta do territorio, fundo escuro, texto creme, tipografia serifada.

### 6. Formato do Caderno de Exercicios (8 por curso)

```
CAPA — curso, modulo, ilustracao do territorio naquele estagio
O EXERCICIO PRINCIPAL — titulo, instrucoes (max 5 passos), tom de convite
ESPACO PARA FAZER — estruturado conforme o exercicio (linhas, mapa, carta, silhueta corporal)
REFLEXAO — 3 perguntas de aprofundamento + espaco
REGISTO — tabela: o que notei | onde senti | o que quero lembrar
PONTE — 1 frase que liga ao proximo modulo
```

Design: mesma paleta do manual, mais leve, espacos reais de escrita, imprimivel.

### 7. Estrutura Padrao de Cada Video-Aula

Todos os videos seguem o mesmo esqueleto:

1. **ABERTURA (10-15 seg)** — Ceu do Mundo dos Veus → camara desce ao territorio → titulo
2. **PERGUNTA INICIAL (15-30 seg)** — Gancho. Pergunta forte que activa algo na aluna.
3. **SITUACAO HUMANA (2-3 min)** — Descricao de algo concreto e reconhecivel. A aluna pensa "isto sou eu."
4. **REVELACAO DO PADRAO (2-3 min)** — O que esta por baixo. O que nunca foi nomeado. A lente invisivel dos veus actua aqui.
5. **GESTO DE CONSCIENCIA (1-2 min)** — Algo pequeno que a aluna pode fazer. Nao uma revolucao — um gesto.
6. **FRASE FINAL (15-30 seg)** — Fica. Leva para o chuveiro, para a cama, para o carro.
7. **FECHO (10-15 seg)** — Territorio dissolve no ceu → logo Sete Veus → silencio

### 8. Producao dos Videos

**O que e definido e nao muda:**
- **Voz:** Clone ElevenLabs da Vivianne. Sistema ja funciona.
- **Estilo:** Animacao mista — paisagens do Mundo dos Veus + silhuetas + motion graphics + texto animado. Tipo School of Life mas com universo visual proprio.
- **Zero camara. Zero gravacao. Zero exposicao pessoal.**

**O que o Claude Code faz:**
1. Gera os scripts de todas as sub-aulas (a partir do catalogo)
2. Gera os audios via ElevenLabs (sistema ja existe)
3. Gera as imagens dos territorios e silhuetas via ComfyUI API (ThinkDiffusion)
4. Armazena tudo no Supabase (audios, imagens, materiais)
5. Constroi a plataforma web (landing pages, dashboard, player, pagamento)
6. Gera os manuais e cadernos de exercicios em PDF

**O que o Claude Code NAO faz:** Montar video final. A montagem (juntar clips animados + audio + texto animado) requer ferramenta de video.

**Ferramenta de montagem:** Pendente. Opcoes: Wan 2.1 dentro do ThinkDiffusion (se gerar videos suficientemente longos), CapCut/DaVinci Resolve (montagem manual), ffmpeg via Claude Code (montagem programatica basica). Solucao a definir apos teste do primeiro piloto.

**Pipeline de producao por video:**
```
Claude Code: gera script → gera audio (ElevenLabs) → envia prompts ao ComfyUI (ThinkDiffusion) via API
  - Paisagem do territorio (modulo correcto, estagio correcto)
  - Silhueta na pose adequada (via ControlNet)
  - Elementos simbolicos
  ↓
ThinkDiffusion: gera imagens e/ou videos animados (Wan 2.1)
  ↓
Claude Code: recebe assets e armazena no Supabase
  ↓
Vivianne: aprova script, audio e imagens
  ↓
Montagem final do video (juntar clips + audio + texto)
  ↓
Vivianne: aprova video final
  ↓
Upload: Supabase Storage → disponivel na plataforma
```

### 9. Biblioteca de Assets Visuais

O Claude Code gera e armazena no Supabase:

**Personagens (silhuetas em ~15 poses):** De pe, sentada, curvada, maos no peito, maos abertas, a caminhar, de costas, mao estendida, duas silhuetas juntas, duas separadas, adulta + crianca, rodeada de outras figuras, a segurar peso, a soltar algo, a abrir porta/veu.

**Cenarios (10 territorios x 4 estagios = 40 paisagens):** Cada territorio em 4 variacoes: modulos 1-2 (fechado), 3-4 (primeiros sinais), 5-6 (transformacao), 7-8 (aberto).

**Elementos simbolicos:** Espelhos, panos/veus, moedas, arvore, raizes, fios de seda, ponte de luz, rio, cinzas, brotos, nevoeiro, caminhos, mapa corporal, flores bioluminescentes, pedras, muralha de luz, paredes de eco, porta.

Com ~80-100 imagens base, todos os videos podem ser montados.

**Imagens de referencia para treinar o LoRA (15-20 aprovadas pela Vivianne):**

Paisagens (8-10):
1. Sala escura com espelhos cobertos, luz dourada (Ouro Proprio)
2. Arvore com raizes expostas, fios vermelhos (Sangue e Seda)
3. Rio violeta com duas margens (A Arte da Inteireza)
4. Campo queimado com brotos verdes (Depois do Fogo)
5. Encruzilhada em nevoeiro (Olhos Abertos)
6. Paisagem que sugere formas corporais (Pele Nua)
7. Espaco aberto com linha de luz no chao (Limite Sagrado)
8. Caverna com flores bioluminescentes (Flores no Escuro)
9. Caminho com pedras empilhadas (O Peso e o Chao)
10. Sala circular com eco visual (Voz de Dentro)

Silhuetas (5-7): De pe postura aberta, sentada reflexiva, curvada sob peso, maos no peito, a caminhar, duas silhuetas juntas, adulta + crianca. Todas sem rosto. Todas na paleta mestre. Todas no estilo editorial/poetico.

### 9b. ThinkDiffusion — Ferramenta de Producao Visual

**Decisao:** O ThinkDiffusion (thinkdiffusion.com) e a ferramenta de producao visual da Escola dos Veus. Substitui Midjourney, ChatGPT/DALL-E, e qualquer outra ferramenta de geracao de imagem e video mencionada anteriormente.

**Porque o ThinkDiffusion:**
1. **Consistencia visual:** Permite treinar um modelo LoRA com o estilo do Mundo dos Veus. Uma vez treinado, todas as imagens manteem o mesmo estilo.
2. **Controlo de poses:** Com ControlNet (OpenPose), define-se a postura exacta da silhueta em cada cena.
3. **Geracao de video:** Com Wan 2.1 integrado, gera video cinematico a partir de imagem ou texto — na mesma plataforma.
4. **API via ComfyUI:** O ComfyUI dentro do ThinkDiffusion tem API integrada. O Claude Code pode ligar-se programaticamente — enviar prompts, receber imagens/videos, armazenar no Supabase. Pipeline automatizavel.

**Setup inicial (fazer uma vez):**
1. Criar conta no ThinkDiffusion (Hobby $0.99/hora para testar, Pro $19.99/mes se adoptar)
2. Treinar modelo LoRA com o estilo do Mundo dos Veus (Kohya, 15-20 imagens de referencia aprovadas)
3. Configurar workflows ComfyUI: geracao de paisagem, geracao de silhueta (ControlNet), geracao de video (Wan 2.1), composicao (paisagem + silhueta + elementos)
4. Testar API: Claude Code liga-se ao ComfyUI via API, enviar prompt da primeira cena do Ouro Proprio → receber imagem → validar estilo

**O que o Claude Code precisa de fazer:**
1. Investigar a API do ComfyUI (docs.comfy.org)
2. Criar script de integracao — enviar prompts ao ComfyUI via API, receber imagens, armazenar no Supabase
3. Criar os workflows ComfyUI — ou fornecer templates que a Vivianne carrega no ThinkDiffusion
4. Integrar no pipeline existente — script → audio (ElevenLabs) → visuais (ThinkDiffusion/ComfyUI) → Supabase

### 10. Sistema de Entrada (YouTube)

Cada curso tem 2-3 videos YouTube gratuitos como porta de entrada. Sao ganchos emocionais que terminam sempre com convite para o curso completo. Cada gancho termina com: "Se isto te tocou, o curso completo esta em seteveus.space."

### 11. Volumes e Custos

**Materiais por curso:** 20-24 video-aulas, 1 manual PDF (~40 pag), 8 cadernos exercicios (~5 pag cada), 2-3 videos YouTube, ~10 imagens do territorio.

**Total (10 cursos x 2 linguas):** ~400-480 videos, 20 manuais, 160 cadernos, 40-60 videos YouTube.

**Custos mensais estimados:**

| Servico | Custo |
|---------|-------|
| ElevenLabs | ~$5-22/mes |
| ThinkDiffusion Pro | $19.99/mes (ou Hobby $0.99/hora) |
| Supabase Pro | $25/mes (ja tem) |
| Stripe | 2.9% + $0.30/tx |
| **TOTAL fixo** | **~$50-67/mes** |

**Custos ThinkDiffusion por producao:**

| Item | Custo | Frequencia |
|------|-------|------------|
| Treino LoRA | 2-4 horas GPU ($2-4) | Uma vez |
| Geracao de biblioteca (~100 imagens) | 5-10 horas ($5-10) | Uma vez |
| Geracao por video-aula (~6 imagens + animacao) | 1-2 horas ($1-2) | Por video |
| **Custo estimado Ouro Proprio completo (~24 videos)** | **~$30-50** | **Uma vez** |

### 12. Ficheiros de Referencia

O Claude Code trabalha com estes documentos:
1. **CLAUDE.md** — arquitectura tecnica (schema, Edge Functions, stack) + orientacoes consolidadas
2. **src/data/courses.ts** — 10 cursos completos com modulos, sub-aulas, descricoes (catalogo em codigo)
3. **CURSOS/ESCOLA DOS VEUS CONSOLIDADO.pdf** — documento original consolidado (manifesto, universo visual, site, formatos, producao, pipeline)
4. **CURSOS/ADENDA THINKDIFFUSION.pdf** — adenda sobre ThinkDiffusion como ferramenta de producao visual

Estes documentos substituem todos os prompts adicionais anteriores.
