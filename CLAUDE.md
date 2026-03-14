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

## Plataforma de Cursos — Orientacoes de Desenvolvimento

### Mudanca de Paradigma

O seteveus.space deixa de ser um site sobre os livros com uma seccao de cursos. Passa a ser uma **plataforma de transformacao** onde os cursos sao o produto principal e os livros, espelhos e nos sao o universo/contexto por tras. Quando alguem entra em seteveus.space, a primeira coisa que ve sao os cursos — a oferta principal. A filosofia (veus, espelhos, nos) e a profundidade para quem quer ir mais fundo, nao o ponto de entrada.

### Direccao Criativa

**Principio fundador:** Os veus, espelhos e nos NAO sao temas de curso. Sao a lente invisivel. Os cursos sao sobre a vida real — temas concretos que as pessoas enfrentam — ensinados com a sabedoria dos veus como fundacao que nunca e nomeada. A pessoa nunca ouve a palavra "veu." Sente-o nos exercicios, no corpo, nas perguntas que nunca lhe fizeram.

**Publico:** Para todos, com voz feminina. A voz nasce da experiencia feminina mas nao exclui. Os temas sao humanos. A linguagem dirige-se a "ti", nao a "mulheres."

**Voz da marca:** Educacional com calor. Presenca compassiva. "Vejo-te, e ha mais para ti." Nunca "ve como estas presa." Os cinco pilares: o mundo convida, o corpo lembra, fissura nao diagnostico, presenca compassiva nao disseccao, densidade que deixa respirar.

**Diferencial:**
1. **O corpo como porta de entrada, nao a mente.** Estes cursos comecam pelo corpo — onde sentes isto?
2. **Exercicios que sao experiencias, nao tarefas.** Mudam algo em tempo real.
3. **Vida real, nao teoria espiritual.** Dinheiro, maes, sexo, cansaco. Nao e transcendencia — e terca-feira.
4. **Honestidade sem brutalidade.** A amiga que sabe mais do que diz e diz so o suficiente.
5. **Filosofia invisivel.** Os veus dao profundidade sem jargao.

**Nota legal:** Os cursos nao sao terapia, tratamento ou aconselhamento clinico. Cada curso inclui disclaimer: "Este curso nao substitui acompanhamento psicologico ou psiquiatrico."

---

### Nova Hierarquia do Site

#### Homepage (seteveus.space)
A landing page principal apresenta os 10 cursos como oferta central. Nao e uma pagina "sobre" — e uma pagina de accao.

**Estrutura sugerida da homepage:**
1. Hero — frase de impacto + CTA para explorar cursos
2. Os 10 cursos — grid/cards com titulo-marca, subtitulo, e imagem
3. Como funciona — formato breve (videos curtos, manual, exercicios)
4. Diferencial — o que torna isto diferente (corpo como entrada, vida real, etc.)
5. Preview gratuito — CTA para o modulo 1 gratuito de qualquer curso
6. Universo Sete Veus — link para Espelhos, Nos, Livro, Podcast (secundario)

#### Navegacao Principal (nova)

```
CURSOS    UNIVERSO    PODCAST    LIVRO    SOBRE    MINHA AREA
```

- **CURSOS** → catalogo dos 10 cursos (e tambem a homepage ou link directo dela)
- **UNIVERSO** → dropdown ou pagina com: Espelhos, Nos, Ecos (a filosofia por tras)
- **PODCAST** → mantem
- **LIVRO** → livro fisico, mantem
- **SOBRE** → sobre a marca/pseudonimo
- **MINHA AREA** → dashboard do aluno (login, progresso, certificados, materiais)

#### Fluxo do Utilizador

```
Homepage (ve cursos)
  → Clica num curso (landing page com modulos, promessa, preview)
    → Preview gratuito (modulo 1 sem pagar, com login)
      → Compra (Stripe checkout)
        → Dashboard do curso (progresso, videos, materiais)
          → Certificado (ao completar 100%)
```

Quem quer profundidade: Homepage → UNIVERSO → Espelhos / Nos / Ecos

---

### Os 10 Cursos

Cada curso e autonomo. A pessoa escolhe o que precisa. Nao ha sequencia obrigatoria.

| # | Titulo (marca) | Subtitulo | Lente Invisivel |
|---|---------------|-----------|-----------------|
| 1 | **Ouro Proprio** | A relacao com dinheiro como espelho de ti | Veu da Ilusao, Medo, Culpa |
| 2 | **Sangue e Seda** | A heranca invisivel entre maes e filhas | Veu do Silencio, Medo, Heranca |
| 3 | **A Arte da Inteireza** | Amar sem te perderes no outro | Veu do Medo, Entrega, Ilusao |
| 4 | **Depois do Fogo** | Quando a vida te pede para comecar de novo | Veu do Medo, Ilusao, Despertar |
| 5 | **Olhos Abertos** | Decidir a partir de clareza, nao de medo | Veu do Medo, Ilusao |
| 6 | **A Pele Lembra** | Aprender a ouvir o corpo antes de a mente racionalizar | Veu do Silencio |
| 7 | **Limite Sagrado** | Limites, o preco de agradar, a culpa da recusa | Veu do Medo, Culpa, Ilusao |
| 8 | **Flores no Escuro** | As perdas que nao sao morte mas doem como se fossem | Veu do Silencio, Medo |
| 9 | **O Peso e o Chao** | Quando descansar nao resolve | Veu do Medo, Silencio, Entrega |
| 10 | **Voz de Dentro** | Dizer o que precisas de dizer a quem mais importa | Veu do Silencio, Medo |

---

### Formato por Curso

**Estrutura:**
- **8 modulos** por curso (Sangue e Seda tem 9)
- **2-3 sub-aulas** por modulo (cada sub-aula = 1 video curto)
- **~20-24 videos curtos** por curso (duracao variavel)
- **1 manual completo PDF** por curso (cobre todos os modulos)
- **8 cadernos de exercicios** por curso (1 por modulo, com journal prompts e exercicios praticos)
- **2-3 videos YouTube** por curso (gratuitos, ganchos de marketing, embedados no site)

**Acesso:**
- **Modulo 1: gratuito** (preview/marketing — todas as sub-aulas do modulo 1 acessiveis sem pagamento, requer login)
- **Modulos 2-8: pagos** (acesso apos compra via Stripe)
- **Manual PDF: pago** (incluido na compra do curso)
- **Cadernos de exercicios: pagos** (incluidos na compra, 1 por modulo)
- **Videos YouTube: gratuitos** (marketing, porta de entrada)

**Producao:**
Cada video de sub-aula e produzido no HeyGen com avatar AI (rosto da Vivianne, sob pseudonimo novo). Versoes PT e EN separadas (mesmo avatar, lip-sync por lingua).

**Entrega:**
Avatar AI (HeyGen Creator, $29/mes) com o rosto da Vivianne, sob pseudonimo novo (por definir, separado de Len Maro, Zihva, Ren Savaro, Vivianne dos Santos). Zero exposicao pessoal directa.

---

### Paginas do Curso (detalhe)

#### Landing page do curso (/cursos/[slug])
- Titulo-marca + subtitulo
- Promessa (o que levas deste curso)
- Arco emocional (a jornada em 2-3 frases)
- Lista dos 8 modulos (titulos visiveis, sub-aulas colapsaveis)
- Modulo 1 marcado como GRATUITO
- O que inclui: X videos + manual + 8 cadernos de exercicios
- CTA: "Comeca pelo Modulo 1 (gratis)" + "Inscreve-te no curso completo"
- Preco
- Diferencial (1-2 frases)

#### Dashboard do aluno (/cursos/[slug]/dashboard)
- Barra de progresso geral
- 8 modulos com progresso individual
- Sub-aulas com checkmarks (concluida/por fazer)
- "Continua de onde paraste" (retomar ultimo video)
- Acesso ao manual PDF
- Acesso aos cadernos de exercicios (1 por modulo)
- Certificado (aparece quando 100%)

#### Sub-aula (/cursos/[slug]/modulo/[n]/[sub])
- Player de video
- Titulo da sub-aula
- Botao "Marcar como concluida"
- Navegacao: anterior / proxima sub-aula
- Link para o caderno de exercicios do modulo

#### Minha Area (/conta)
- Cursos inscritos (com progresso de cada um)
- Certificados obtidos
- Materiais descarregados
- Dados da conta

---

### Stack & Arquitectura Tecnica — Cursos

**Infra:** Supabase (existente) + Stripe + YouTube

#### Schema Supabase (Cursos)

- **courses** — id, title, slug, description, language ('pt'/'en'), price_cents, currency, stripe_price_id, cover_url, is_published, created_at
- **modules** — id, course_id (FK), title, description, sort_order, is_free (true para modulo 1)
- **lessons** — id, module_id (FK), title, type ('video_protected'|'pdf_manual'|'pdf_exercises'), content_url, duration_min, sort_order, is_preview
- **enrollments** — id, user_id (FK→auth.users), course_id (FK), stripe_payment_id, enrolled_at, completed_at, certificate_url
- **lesson_progress** — id, user_id (FK), lesson_id (FK), status ('not_started'|'in_progress'|'completed'), completed_at, last_position_sec

RLS em todas as tabelas.

#### Edge Functions (Cursos)

- **create-checkout** — cria Stripe Checkout Session
- **handle-webhook** — recebe checkout.session.completed, cria enrollment
- **get-lesson-content** — verifica enrollment (ou is_free para modulo 1), gera signed URL
- **update-progress** — actualiza lesson_progress, calcula %, dispara certificado se 100%
- **generate-certificate** — gera PDF do certificado, armazena no Storage

#### Funcionalidades obrigatorias

1. Autenticacao/login — Supabase Auth
2. Pagamento — Stripe Checkout, webhook cria enrollment
3. Progresso — tracking por sub-aula, retomar videos
4. Certificado — PDF automatico ao completar 100%, codigo de verificacao publico
5. Preview — Modulo 1 acessivel sem compra (requer login mas nao pagamento)

#### URLs (Cursos)

- `/cursos` — catalogo
- `/cursos/[slug]` — landing page (ex: /cursos/ouro-proprio)
- `/cursos/[slug]/dashboard` — dashboard (progresso, modulos, materiais)
- `/cursos/[slug]/modulo/[n]/[sub]` — sub-aula com player de video
- `/verificar/[codigo]` — verificacao publica de certificados
- `/conta` — perfil, cursos inscritos, certificados

#### Notas tecnicas

- Stripe nao suporta MZN — USD como base, equivalente MZN na landing page
- Videos no Supabase Storage bucket privado, signed URLs com expiracao de 2h
- Videos YouTube embedados no site (apenas ganchos de marketing)
- Cada sub-aula = 1 video curto (duracao variavel, nao fixa)

#### Design (Cursos)

Manter a paleta actual do seteveus.space (tons neutros, quentes) mas dar destaque visual aos cursos. Cada curso pode ter uma cor ou elemento visual proprio mantendo a coerencia da marca. Paleta de referencia: violeta #8B5CF6, dourado #C9A96E. Fundo escuro para as paginas de curso/dashboard. A homepage pode manter o tom actual do site mas com os cursos como foco visual.

---

### Catalogo Completo dos 10 Cursos

#### CURSO 1 — Ouro Proprio
**Subtitulo:** A relacao com dinheiro como espelho de ti
**Promessa:** Vais perceber o que realmente dizes quando dizes "nao tenho dinheiro", "nao mereco cobrar isto", ou "se tiver demasiado, alguem vai sofrer." Vais mudar a conversa interna — e a conta bancaria vai reflectir isso.
**Arco Emocional:** Comeca pelo desconforto de olhar para numeros. Passa pela descoberta dos padroes herdados. Atravessa a vergonha, a culpa de querer mais, o medo de perder. Chega a reconstrucao: separar valor pessoal de valor monetario. Termina com direccao: o que quero que o dinheiro financie na minha vida?

| Modulo | Titulo | Sub-aulas |
|--------|--------|-----------|
| 1 | O Extracto como Espelho | A) O medo de olhar, B) Ler o extracto como um diario, C) O corpo e o dinheiro |
| 2 | A Heranca Financeira Emocional | A) Os scripts de infancia, B) O que viste vs. o que ouviste, C) Reescrever os scripts |
| 3 | A Vergonha do Dinheiro | A) Vergonha de nao ter, B) Vergonha de querer mais, C) Dinheiro e dignidade |
| 4 | Cobrar, Receber, Merecer | A) O desconto automatico, B) A ligacao cobrar-merecer, C) Receber sem devolver imediatamente |
| 5 | Gastar em Ti | A) A hierarquia dos gastos, B) Culpa e prazer, C) O investimento em ti como acto politico |
| 6 | Dinheiro e Relacoes | A) Quem paga, manda?, B) Dependencia financeira e medo, C) A conversa sobre dinheiro que evitas |
| 7 | Ganhar Mais Nao Resolve | A) O buraco que o dinheiro nao enche, B) Sabotagem financeira, C) Suficiente: quando e suficiente? |
| 8 | Dinheiro como Liberdade | A) De sobrevivencia a direccao, B) O mapa do futuro que queres financiar, C) Liberdade, nao acumulacao |

**Lente invisivel:** Veu da Ilusao (dinheiro e racional, pobreza e nobre, pedir e fraqueza). Veu do Medo (medo de ter, medo de perder, medo de cobrar). Veu da Culpa (culpa de querer mais, culpa de gastar em si).
**YouTube:** "Porque sentes culpa quando gastas dinheiro em ti mesma?" (6 min) | "3 frases sobre dinheiro que a tua mae te ensinou sem saber" (7 min) | "O teste do preco: diz o teu valor em voz alta" (5 min)

#### CURSO 2 — Sangue e Seda
**Subtitulo:** A heranca invisivel entre maes e filhas
**Promessa:** Vais aprender a ver a tua mae como mulher — nao como heroina nem como vila. E vais aprender a devolver-lhe o que e dela sem deixar de a amar.
**Arco Emocional:** Comeca na idealizacao ou na raiva. Passa pela diferenciacao: onde acabo eu e comeca ela? Atravessa a heranca nao-dita, a culpa de crescer, a lealdade que prende. Chega ao lugar mais livre: ver a mae como mulher inteira e escolher o que levas.

| Modulo | Titulo | Sub-aulas |
|--------|--------|-----------|
| 1 | A Mae que Carregas | A) A mae-personagem vs. a mae-pessoa, B) Memoria ou interpretacao? |
| 2 | A Heranca que Nao Pediste | A) O que herdaste sem saber, B) Repeticao e oposicao: ambas sao heranca, C) Escolher o que mantens |
| 3 | A Culpa de Crescer | A) Crescer como traicao, B) A lealdade invisivel, C) Ser livre sem abandonar |
| 4 | A Raiva Sagrada | A) A raiva que nunca te permitiste, B) Raiva vs. rejeicao, C) O que fazer com a raiva |
| 5 | O Silencio entre Mae e Filha | A) O que nunca foi dito, B) O silencio como proteccao, C) Quebrar o silencio sem destruir |
| 6 | O Corpo da Mae, o Corpo da Filha | A) O que a mae te ensinou sobre o teu corpo, B) O corpo como territorio herdado |
| 7 | Quando a Mae Nao Foi Suficiente | A) A mae que nao pode, B) Lamentar sem culpar, C) A mae interior |
| 8 | Ser Filha e Ser Mae ao Mesmo Tempo | A) O loop geracional, B) Interromper o padrao, C) A materia que passas adiante |
| 9 | Ver a Mulher, Nao So a Mae | A) A mae antes de ti, B) Ver sem perdoar (se nao quiseres), C) A despedida da filha que precisava |

**Nota:** 9 modulos porque esta relacao merece profundidade, nao solucoes rapidas.
**Lente invisivel:** Veu do Silencio (o nao-dito entre mae e filha), Veu do Medo (medo de trair ao crescer), Veu da Heranca (a transmissao geracional nao-verbal).
**YouTube:** "3 sinais de que estas a repetir a vida da tua mae sem saber" (8 min) | "Porque discutir com a tua mae te faz sentir como se tivesses 12 anos" (6 min) | "A diferenca entre perdoar e compreender" (7 min)

#### CURSO 3 — A Arte da Inteireza
**Subtitulo:** Amar sem te perderes no outro
**Promessa:** Vais aprender a estar presente numa relacao sem te dissolveres nela. Amor nao e fusao — e dois corpos inteiros que escolhem proximidade.
**Arco Emocional:** Comeca pelo reconhecimento: em que momento deixas de te sentir? Passa pelos padroes. Atravessa a dor de relacoes passadas onde te perdeste. Reconstroi a imagem do que e estar com alguem sem abandonar o centro. Termina com a pratica diaria de presenca relacional.

| Modulo | Titulo | Sub-aulas |
|--------|--------|-----------|
| 1 | O Momento em que Desapareces | A) O ponto de mutacao, B) Os sinais no corpo, C) O tanto faz que nao e tanto faz |
| 2 | O Modelo de Amor que Absorveste | A) Amor como sacrificio, B) Amor como salvacao, C) Amor como fusao |
| 3 | Atrair o Mesmo Padrao | A) A repeticao nao e azar, B) O familiar confundido com amor, C) Interromper o ciclo |
| 4 | Ter Necessidades Nao e Ser Carente | A) A arma da palavra "carente", B) Nomear o que precisas, C) Pedir sem pedir desculpa |
| 5 | Os Limites Dentro do Amor | A) Limites nao sao muros, B) O medo de perder ao limitar, C) Limites praticos |
| 6 | Solidao vs. Solitude | A) O medo de ficar sozinha, B) Aprender a estar contigo, C) A relacao contigo como fundacao |
| 7 | O Sexo como Termometro | A) Desejo autentico vs. desejo performativo, B) Prazer como direito, C) Falar sobre sexo sem vergonha |
| 8 | Dois Corpos Inteiros | A) A imagem do amor saudavel, B) O espaco entre os dois, C) Ficar de forma diferente ou sair de forma inteira |

**Lente invisivel:** Veu do Medo (medo do abandono), Veu da Entrega (confundir entrega com submissao), Veu da Ilusao (a fantasia de que amor = fusao).
**YouTube:** "5 sinais de que estas a desaparecer numa relacao" (7 min) | "Porque atrais sempre o mesmo tipo de pessoa" (8 min) | "A diferenca entre estar disponivel e nao ter vida propria" (6 min)

#### CURSO 4 — Depois do Fogo
**Subtitulo:** Quando a vida te pede para comecar de novo
**Promessa:** Vais aprender que recomecar nao e voltar a estaca zero — e comecar a partir de tudo o que ja viveste.
**Arco Emocional:** Comeca no luto do que acabou. Passa pelo vazio entre o fim e o inicio. Reconstroi identidade fora dos papeis que desempenhaste. Atravessa o medo do desconhecido. Termina com os primeiros passos a partir de onde estas.

| Modulo | Titulo | Sub-aulas |
|--------|--------|-----------|
| 1 | Chorar o que Acabou | A) A permissao de acabar de acabar, B) O elogio funebre ao que foi, C) O corpo no luto |
| 2 | O Vazio que Assusta | A) O espaco entre o fim e o inicio, B) O vazio como solo, C) A diferenca entre pausa e paralisia |
| 3 | Quem Sou Eu Sem Aquilo? | A) Identidade ligada a papeis, B) Os papeis que te definiram, C) Reconstruir identidade |
| 4 | O Medo do Desconhecido | A) Porque o conhecido doi menos que o incerto, B) O corpo no medo, C) Avancar com medo |
| 5 | O Peso das Opinioes | A) O que os outros esperam de ti, B) A vergonha do "falhanho", C) Recomecar em silencio |
| 6 | Recomecar aos 30, 40, 50 | A) A mentira do "tarde demais", B) A sabedoria que a idade traz ao recomeco, C) O corpo que ja viveu |
| 7 | O Dinheiro do Recomeco | A) A inseguranca financeira, B) Comecar com pouco, C) O minimo viavel emocional |
| 8 | Comecar a Partir de Aqui | A) Nao apagar — integrar, B) Os primeiros passos, C) A mulher que ja recomecou |

**Lente invisivel:** Veu do Medo (medo do desconhecido), Veu da Ilusao (recomecar = apagar), Veu do Despertar (o recomeco como nascimento).
**YouTube:** "Porque recomecar da mais medo do que ficar" (7 min) | "A mentira do 'voltar a estaca zero'" (6 min) | "Como saber se e cedo ou tarde demais" (8 min)

#### CURSO 5 — Olhos Abertos
**Subtitulo:** Decidir a partir de clareza, nao de medo
**Promessa:** Vais distinguir decisoes do medo das da clareza — e confiar no teu processo, mesmo sem certezas.
**Arco Emocional:** Comeca na paralisia. Passa pelas vozes que nao sao tuas. Aprende a ouvir o corpo. Desmonta falsas dicotomias. Termina a viver com a escolha sem remorso.

| Modulo | Titulo | Sub-aulas |
|--------|--------|-----------|
| 1 | A Paralisia e o que Ela Protege | A) Nao decidir e decidir, B) A ilusao de manter todas as opcoes abertas, C) O custo real da indecisao |
| 2 | A Voz que Nao e Tua | A) Quem fala quando "decides", B) O "devias" como alarme, C) Encontrar a tua voz no ruido |
| 3 | Decidir com o Corpo | A) O corpo sabe primeiro, B) Calibrar o sim e o nao corporal, C) Integrar corpo e mente |
| 4 | Falsas Dicotomias | A) Ou isto ou aquilo, B) A pressao de urgencia artificial, C) Decidir por fases |
| 5 | O Medo de Errar | A) Errar e humano, B) O erro como informacao, C) A decisao imperfeita vs. a indecisao perfeita |
| 6 | Decidir por Ti (Nao por Todos) | A) A mulher que decide por todos e nada por si, B) Culpa de priorizar, C) O "egoismo" saudavel |
| 7 | Decisoes Irrevogaveis e Revogaveis | A) A maioria e revogavel, B) As poucas irrevogaveis, C) Decidir sem garantias |
| 8 | Viver com a Escolha | A) O remorso como habito, B) Cada sim implica um nao, C) A paz da decisao tomada |

**Lente invisivel:** Veu do Medo (paralisia), Veu da Ilusao (a fantasia da escolha "certa"), sabedoria do corpo.
**YouTube:** "Porque decides por todos e nada por ti" (6 min) | "O mito da decisao perfeita" (7 min) | "Exercicio de 2 minutos para saber o que queres" (5 min)

#### CURSO 6 — A Pele Lembra
**Subtitulo:** Aprender a ouvir o corpo antes de a mente racionalizar
**Promessa:** Vais reconectar-te com a inteligencia do teu corpo — que sempre soube antes de ti.
**Arco Emocional:** Comeca pela desconexao. Aprende literacia corporal. Passa pelos sintomas como linguagem. Calibra o sim e o nao do corpo. Aprende a habitar, nao so usar. Termina com o corpo como primeiro conselheiro.

| Modulo | Titulo | Sub-aulas |
|--------|--------|-----------|
| 1 | O Corpo que Ignoras | A) Decadas a calar o corpo, B) A desconexao como norma, C) O body scan como primeiro passo |
| 2 | Sintomas como Linguagem | A) A enxaqueca antes do Natal, B) A insonia da conversa evitada, C) Ler sintomas como frases |
| 3 | A Memoria do Corpo | A) O corpo guarda o que a mente esquece, B) Triggers corporais, C) Honrar sem reviver |
| 4 | O Sim e o Nao do Corpo | A) Expansao vs. contratura, B) Calibrar no quotidiano, C) Confiar na bussola |
| 5 | O Corpo e as Emocoes | A) Onde vivem as emocoes no corpo, B) Emocoes suprimidas, C) Dar espaco sem explodir |
| 6 | O Corpo e a Alimentacao | A) Comer para calar, B) Fome fisica vs. fome emocional, C) Ouvir o corpo a mesa |
| 7 | O Corpo e o Descanso | A) Descanso real vs. distraccao, B) O que o TEU corpo precisa para descansar, C) Parar sem culpa |
| 8 | Habitar (Nao So Usar) o Corpo | A) O corpo como ferramenta vs. o corpo como casa, B) Presenca corporalizada, C) O corpo como conselheiro |

**Lente invisivel:** Veu do Silencio (o silencio imposto ao corpo, que o corpo quebra por sintomas). "O corpo lembra" e a essencia.
**YouTube:** "O teu corpo esta a tentar dizer-te algo" (7 min) | "Porque ficas doente nas ferias" (6 min) | "Reconectar com o corpo em 3 minutos" (5 min)

#### CURSO 7 — Limite Sagrado
**Subtitulo:** Limites, o preco de agradar, a culpa da recusa
**Promessa:** Vais dizer nao sem te sentires ma pessoa. Cada nao ao que nao e teu e um sim ao que e.
**Arco Emocional:** Comeca pela arqueologia: de onde vem a incapacidade de recusar? Passa pelo custo real de dizer sim a tudo. Treina o nao. Termina com o nao como espaco para o sim.

| Modulo | Titulo | Sub-aulas |
|--------|--------|-----------|
| 1 | A Boa Menina que Cresceu | A) O software de infancia, B) O preco de ser "boa", C) Actualizar o sistema |
| 2 | O Preco do Sim Automatico | A) Contabilizar o custo, B) Os ultimos 7 dias, C) O corpo do sim falso |
| 3 | A Culpa de Recusar | A) De onde vem a culpa, B) Culpa vs. responsabilidade, C) Atravessar a culpa |
| 4 | A Diferenca entre Ser Amada e Ser Util | A) Quando confundes ser util com ser amada, B) O valor alem da utilidade, C) Relacoes transaccionais |
| 5 | Nao Sem Desculpa | A) A anatomia da justificacao, B) O nao curto, C) O desconforto do silencio depois |
| 6 | Limites no Trabalho | A) A mulher que faz tudo no escritorio, B) Dizer nao ao chefe, C) Promocao pelo sim vs. respeito pelo nao |
| 7 | Limites com Familia | A) A familia como teste maximo, B) A chantagem emocional, C) Amar com limites |
| 8 | O Nao como Espaco para o Sim | A) O que cabe quando largas, B) O sim autentico, C) Celebrar o nao |

**Lente invisivel:** Veu do Medo (medo da rejeicao), Veu da Culpa (culpa de recusar), Veu da Ilusao (agradar e amor).
**YouTube:** "Porque dizer nao te faz sentir culpada" (7 min) | "A diferenca entre ser amada e ser util" (8 min) | "Treino de 7 dias para a mulher que diz sim a tudo" (6 min)

#### CURSO 8 — Flores no Escuro
**Subtitulo:** As perdas que nao sao morte mas doem como se fossem
**Promessa:** Vais fazer luto das perdas que ninguem valida: a amizade que acabou, o filho que nao veio, o futuro que imaginavas.
**Arco Emocional:** Comeca pelo reconhecimento. Passa pela permissao de chorar o que nao tem funeral. Localiza o luto no corpo. Integra a perda na paisagem de quem es.

| Modulo | Titulo | Sub-aulas |
|--------|--------|-----------|
| 1 | As Perdas que Nao Tem Funeral | A) Nomear o inomeavel, B) Porque ninguem valida, C) Dar peso ao que pesa |
| 2 | A Permissao que Ninguem Te Deu | A) As frases que calam, B) A unica permissao que precisas, C) Chorar sem horario |
| 3 | O Luto que Vive no Corpo | A) Garganta fechada, peito apertado, B) Localizar a perda, C) Dar espaco ao que esta preso |
| 4 | Luto de Relacoes que Nao Acabaram | A) A relacao que mudou, B) Chorar o que era enquanto estas no que e, C) Aceitar a versao actual |
| 5 | Luto de Versoes de Ti | A) A mulher que eras, B) A mulher que nunca foste, C) Honrar sem prender |
| 6 | Luto e Culpa | A) A culpa do sobrevivente, B) A culpa de sentir alivio, C) Libertar a culpa sem negar a perda |
| 7 | Rituais de Encerramento | A) Porque os rituais importam, B) Rituais simples, C) O ritual como corpo em accao |
| 8 | Carregar Sem Ser Esmagada | A) Superar e violencia, B) A perda como paisagem, C) Viver com e nao apesar de |

**Lente invisivel:** Veu do Silencio (luto silenciado, dor sem permissao), Veu do Medo (medo de abrir a ferida).
**YouTube:** "As perdas que ninguem te deixou chorar" (8 min) | "Porque 'segue em frente' e o pior conselho" (6 min) | "Como honrar o que perdeste sem te afogares nele" (7 min)

#### CURSO 9 — O Peso e o Chao
**Subtitulo:** Quando descansar nao resolve
**Promessa:** Vais perceber que o que te falta nao e ferias — e pores coisas no chao.
**Arco Emocional:** Comeca pelo inventario do peso. Passa pelo que carregas que nao e teu. Distingue tipos de cansaco. Termina com a pratica de largar.

| Modulo | Titulo | Sub-aulas |
|--------|--------|-----------|
| 1 | O Inventario do Peso | A) O que carregas, B) O que escolheste vs. o que te caiu em cima, C) O peso normalizado |
| 2 | A Carga Mental Invisivel | A) O trabalho que ninguem ve, B) O CEO emocional da familia, C) Tornar visivel para negociar |
| 3 | A Mulher que Segura Tudo | A) Quem segura a mulher que segura tudo?, B) O mito da mulher forte, C) Pedir ajuda como acto de coragem |
| 4 | Tipos de Cansaco | A) Cansaco fisico, B) Cansaco emocional, C) Cansaco existencial |
| 5 | O Falso Descanso | A) Scroll nao e descanso, B) Vinho nao e descanso, C) Descanso real |
| 6 | A Exaustao como Mensagem | A) O corpo em greve, B) Burn-out nao e fraqueza, C) Ouvir antes de colapsar |
| 7 | Largar Sem Culpa | A) O medo de que tudo desmorone, B) Largar nao e abandonar, C) O teste de largar |
| 8 | Por no Chao | A) A arte de por no chao, B) O que fica e o que vai, C) Viver mais leve |

**Lente invisivel:** Veu do Medo (se eu parar, tudo desmorona), Veu do Silencio (a exaustao feminina silenciada), Veu da Entrega (confundir entrega com esgotamento).
**YouTube:** "Porque estas sempre cansada e ferias nao resolvem" (7 min) | "A carga mental invisivel" (8 min) | "Como largar sem culpa: o exercicio do papel no chao" (5 min)

#### CURSO 10 — Voz de Dentro
**Subtitulo:** Dizer o que precisas de dizer a quem mais importa
**Promessa:** Vais ter a conversa que adias ha meses — nao como confronto, mas como verdade dita com cuidado.
**Arco Emocional:** Comeca por identificar a conversa. Passa pela preparacao. Aprende a comecar. Aprende a sustentar. Prepara-te para o depois.

| Modulo | Titulo | Sub-aulas |
|--------|--------|-----------|
| 1 | A Conversa que Vive em Ti | A) O loop mental, B) Porque evitas, C) O custo do silencio |
| 2 | O que Queres Dizer vs. O que Queres que Aconteca | A) Separar as duas coisas, B) Ter a conversa sem depender do resultado, C) Abdicar do controlo do desfecho |
| 3 | As Palavras que Ajudam e as que Destroem | A) "Tu sempre" e "Tu nunca", B) O tom conta mais que as palavras, C) A verdade dita com corpo |
| 4 | Comecar a Conversa | A) A primeira frase, B) Comecar sem acusar, C) O timing |
| 5 | Sustentar a Conversa | A) Quando o outro reage mal, B) Ouvir sem desistir, C) Pausar sem fugir |
| 6 | Conversas com Parceiros | A) O nao-dito no casamento, B) Intimidade e verdade, C) Conversas sobre sexo, dinheiro, futuro |
| 7 | Conversas com Pais | A) Falar com quem te criou, B) Quando nao vale a pena, C) Falar para ti, nao para ele |
| 8 | O Depois | A) O silencio pos-conversa, B) O alivio inesperado, C) A relacao depois da verdade |

**Lente invisivel:** Veu do Silencio (silencio como falsa proteccao, silencio geracional, silencio corrosivo), Veu do Medo (medo de dizer, medo do depois).
**YouTube:** "A conversa que ensaias no chuveiro" (7 min) | "Porque o silencio doi mais que a verdade" (6 min) | "Como comecar sem as 3 palavras que arruinam tudo" (8 min)
