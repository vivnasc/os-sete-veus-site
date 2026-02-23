# Plano de Correcao — Os Sete Veus

## Visao Geral

14 correcoes organizadas em 4 fases por ordem de prioridade.
Cada item inclui: ficheiros afectados, o que mudar, e como testar.

M-Pesa continua manual (sem API por agora).

---

## FASE 1 — SEGURANCA (Critico, fazer primeiro)

### 1.1 Mover MailerLite token para variavel de ambiente

**Ficheiro:** `src/app/api/subscribe/route.ts`
- Remover token JWT hardcoded (linhas 7-8)
- Substituir por `process.env.MAILERLITE_API_TOKEN`
- Adicionar fallback com erro claro se nao configurado

**Apos deploy:** Rodar o token no dashboard do MailerLite (o actual esta exposto no git).

---

### 1.2 Remover default do ADMIN_SEED_KEY

**Ficheiro:** `src/app/api/admin/seed-comunidade/route.ts`
- Linha 4: remover `|| 'seed-sete-veus-2025'`
- Se `ADMIN_SEED_KEY` nao estiver definido, retornar 500 com mensagem "Seed key not configured"
- Impede execucao acidental em producao

---

### 1.3 Centralizar emails de admin numa unica constante

**Ficheiros afectados:**
- `src/app/api/payment/confirm/route.ts` (linha 5)
- `src/hooks/useAccess.ts` (linha 17)
- `src/hooks/useNosGate.ts` (linha 26)
- `src/app/api/create-account/route.ts` (linha 5)

**Accao:**
- Criar `src/lib/constants.ts` com:
  ```ts
  export const ADMIN_EMAILS = ["viv.saraiva@gmail.com"];
  ```
- Importar esta constante em todos os ficheiros acima
- Um unico local para actualizar se o email mudar

---

### 1.4 Mover Supabase URL e Anon Key para variaveis de ambiente

**Ficheiros afectados:**
- `src/lib/supabase-server.ts` (linhas 5-7)
- `src/app/api/subscribe/route.ts` (linhas 3-5)
- `src/app/api/referral/route.ts` (linhas 3-5)

**Accao:**
- Substituir valores hardcoded por `process.env.NEXT_PUBLIC_SUPABASE_URL` e `process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY`
- Estas sao chaves publicas (anon key), mas e boa pratica nao as ter no codigo-fonte
- Adicionar verificacao: se nao existirem, throw com mensagem clara

---

## FASE 2 — LOGICA DE NEGOCIO (Critico, pagamentos nao funcionam sem isto)

### 2.1 Corrigir: pagamento confirmado deve actualizar perfil

**Ficheiro:** `src/app/api/payment/confirm/route.ts`

**Problema:** Apos confirmar pagamento, cria registo em `purchases` mas NUNCA actualiza `has_mirrors_access` no perfil. Cliente paga mas nao recebe acesso.

**Accao:** Apos o insert em `purchases` (linha ~100), adicionar:

```ts
// Determinar que flag actualizar baseado no access_type_code
const accessFlagMap: Record<string, string> = {
  "experiencia-veu-ilusao": "has_mirrors_access",
  "experiencia-veu-medo": "has_mirrors_access",
  "experiencia-veu-culpa": "has_mirrors_access",
  "experiencia-veu-identidade": "has_mirrors_access",
  "experiencia-veu-controlo": "has_mirrors_access",
  "experiencia-veu-desejo": "has_mirrors_access",
  "experiencia-veu-separacao": "has_mirrors_access",
  "pack-3-espelhos": "has_mirrors_access",
  "jornada-completa": "has_mirrors_access",
  "livro-codigo": "has_book_access",
};

const flagToUpdate = accessFlagMap[payment.access_type_code];
if (flagToUpdate) {
  await supabaseAdmin
    .from("profiles")
    .update({ [flagToUpdate]: true })
    .eq("id", payment.user_id);
}
```

Mover este mapeamento para `src/lib/constants.ts` para reutilizacao.

---

### 2.2 Popular `purchased_products` no perfil apos pagamento

**Ficheiro:** `src/app/api/payment/confirm/route.ts`

**Problema:** O hook `useNosGate` verifica `purchased_products` para saber se o Nos esta incluido (pack/jornada). Mas nenhum endpoint actualiza este campo.

**Accao:** Apos actualizar a flag, tambem actualizar `purchased_products`:

```ts
// Buscar perfil actual
const { data: currentProfile } = await supabaseAdmin
  .from("profiles")
  .select("purchased_products")
  .eq("id", payment.user_id)
  .single();

const currentProducts = currentProfile?.purchased_products || [];
const newProduct = {
  type: payment.access_type_code,
  date: new Date().toISOString(),
  code: payment.access_type_code,
};

// Evitar duplicados
const alreadyExists = currentProducts.some(
  (p: any) => p.type === newProduct.type
);

if (!alreadyExists) {
  await supabaseAdmin
    .from("profiles")
    .update({
      purchased_products: [...currentProducts, newProduct],
    })
    .eq("id", payment.user_id);
}
```

---

### 2.3 Criar mapeamento central de access_type_code

**Ficheiro novo:** Adicionar ao `src/lib/constants.ts`

```ts
export const ACCESS_FLAG_MAP: Record<string, string> = {
  "experiencia-veu-ilusao": "has_mirrors_access",
  "experiencia-veu-medo": "has_mirrors_access",
  // ... todos os espelhos
  "pack-3-espelhos": "has_mirrors_access",
  "jornada-completa": "has_mirrors_access",
  "livro-codigo": "has_book_access",
};

// Produtos incluidos em packs (para purchased_products)
export const PACK_INCLUDES: Record<string, string[]> = {
  "pack-3-espelhos": [
    "experiencia-veu-ilusao",
    "experiencia-veu-medo",
    "experiencia-veu-culpa",
  ],
  "jornada-completa": [
    "experiencia-veu-ilusao",
    "experiencia-veu-medo",
    "experiencia-veu-culpa",
    "experiencia-veu-identidade",
    "experiencia-veu-controlo",
    "experiencia-veu-desejo",
    "experiencia-veu-separacao",
  ],
};
```

Importar e usar em `payment/confirm/route.ts` e `useNosGate.ts`.

---

### 2.4 Corrigir desconto no Pack 3

**Ficheiro:** `src/data/experiences.ts` (linha ~32)

**Problema:** Pack 3 diz "18% desconto" mas o calculo real e ~21% (3x$29=$87, pack=$69, economia=$18, 18/87=20.7%).

**Accao:** Actualizar `savingsPercent` de 18 para 21 na definicao do Pack 3.
O desconto da Jornada (27%) esta correcto (~26.6%, arredondado).

---

## FASE 3 — UX E LIMPEZA (Importante, melhorar experiencia)

### 3.1 Remover pagina /login duplicada, redirecionar para /entrar

**Ficheiro:** `src/app/login/page.tsx`

**Accao:**
- Substituir todo o conteudo por um redirect:
  ```tsx
  import { redirect } from "next/navigation";
  export default function LoginRedirect() {
    redirect("/entrar");
  }
  ```
- Manter o ficheiro para nao partir links existentes (bookmarks, emails antigos)

---

### 3.2 Corrigir links mortos

**Ficheiros:**
- `src/app/livros/edicao-fisica/page.tsx` (linhas 209, 232): links para `/experiencia` que nao existe
  - Substituir por `/comprar/espelhos`
- Verificar se `/acesso-digital/page.tsx` esta linkado em algum lado; se nao, remover

---

### 3.3 PayPal: mostrar mensagem clara em vez de stub

**Ficheiro:** `src/app/pagamento/paypal/page.tsx`

**Accao:** Em vez de stub vazio, mostrar mensagem:
- "Pagamento por PayPal ainda nao disponivel."
- "Por favor escolha M-Pesa ou transferencia bancaria."
- Link de volta para `/comprar/espelhos`

Ou: remover PayPal como opcao de pagamento ate estar implementado.

---

### 3.4 Packs "Em breve" — adicionar opcao de notificacao

**Ficheiro:** `src/app/comprar/espelhos/page.tsx`

**Accao:** Nos botoes desactivados de Pack 3 e Jornada Completa, adicionar link:
- "Queres saber quando estiver disponivel?" -> link para `/subscribe` ou modal simples com campo de email
- Reutilizar o endpoint `/api/subscribe` existente com tag especial (ex: "waitlist-pack3")

---

## FASE 4 — MELHORIAS (Medio prazo, apos lançamento)

### 4.1 Rate limiting basico nos endpoints publicos

**Endpoints prioritarios:**
- `POST /api/codes/redeem`
- `POST /api/codes/request`
- `POST /api/create-account`
- `POST /api/upload-proof`

**Accao:** Instalar `next-rate-limit` ou implementar rate limiting simples baseado em IP usando um Map em memoria:
- Limite: 5 pedidos por minuto por IP para endpoints criticos
- Retornar 429 Too Many Requests quando excedido

---

### 4.2 Emails de confirmacao ao cliente

**Ficheiro:** `src/app/api/payment/confirm/route.ts` (substituir TODOs nas linhas 103-107)

**Accao:** Integrar com Resend (ou outro servico de email):
- Email apos pagamento confirmado: "O teu acesso esta activo. Podes comecar a ler aqui: [link]"
- Email apos resgate de codigo: "Bem-vinda. O teu livro espera por ti."

Requer: configurar conta Resend + `RESEND_API_KEY` no .env

---

### 4.3 Waitlist / notificacao para novos Espelhos

**Ficheiro:** `src/app/api/email-sequence/route.ts` (ja existe, vazio)

**Accao:** Implementar sistema simples:
- Guardar email + produto desejado na tabela `waitlist`
- Quando Espelho do Medo for publicado (marco 2026), enviar email a toda a lista
- Pode integrar com MailerLite usando tags/segmentos

---

### 4.4 Endpoint /api/codes/validate — resolver ou remover

**Ficheiro:** `src/app/api/codes/validate/route.ts`

**Problema:** Marca codigo como usado mas NAO concede acesso. Funcionalidade orfã.

**Accao:**
- Se e usado em algum fluxo do frontend, corrigir para tambem conceder acesso (como redeem faz)
- Se nao e usado, remover para evitar confusao

---

## Resumo de Ficheiros a Criar/Modificar

### Criar:
- `src/lib/constants.ts` — ADMIN_EMAILS, ACCESS_FLAG_MAP, PACK_INCLUDES

### Modificar:
| Ficheiro | Fase | Mudanca |
|----------|------|---------|
| `src/app/api/subscribe/route.ts` | 1.1 | Mover token para env |
| `src/app/api/admin/seed-comunidade/route.ts` | 1.2 | Remover default key |
| `src/app/api/payment/confirm/route.ts` | 1.3, 2.1, 2.2 | Centralizar email, actualizar perfil |
| `src/hooks/useAccess.ts` | 1.3 | Importar ADMIN_EMAILS |
| `src/hooks/useNosGate.ts` | 1.3 | Importar ADMIN_EMAILS |
| `src/app/api/create-account/route.ts` | 1.3 | Importar ADMIN_EMAILS |
| `src/lib/supabase-server.ts` | 1.4 | Mover URL/key para env |
| `src/app/api/referral/route.ts` | 1.4 | Mover URL/key para env |
| `src/data/experiences.ts` | 2.4 | Corrigir percentagem desconto |
| `src/app/login/page.tsx` | 3.1 | Redirect para /entrar |
| `src/app/livros/edicao-fisica/page.tsx` | 3.2 | Corrigir links |
| `src/app/pagamento/paypal/page.tsx` | 3.3 | Mensagem clara |

---

## Ordem de Execucao

1. Criar `src/lib/constants.ts`
2. Fase 1 (seguranca) — todos os items
3. Fase 2 (logica de negocio) — items 2.1, 2.2, 2.3, 2.4
4. Fase 3 (UX) — items 3.1, 3.2, 3.3, 3.4
5. Fase 4 — items individuais conforme disponibilidade

Tempo estimado para Fases 1-3: uma sessao de trabalho.
Fase 4 requer decisoes sobre servicos externos (Resend, rate limiting).
