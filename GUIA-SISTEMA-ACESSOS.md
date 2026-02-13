# 🔐 GUIA: Sistema de Controlo de Acessos

## 📋 O QUE FOI IMPLEMENTADO

Sistema completo para gerir acessos de utilizadores a diferentes produtos:
- ✅ Livro Digital
- ✅ Espelhos Contemplativos
- ✅ Audiobook

---

## 🗄️ ESTRUTURA DE BASE DE DADOS

### Tabela `profiles` (campos novos):

```sql
profiles:
  - has_book_access: boolean          -- Acesso ao livro digital
  - has_mirrors_access: boolean       -- Acesso aos espelhos
  - has_audiobook_access: boolean     -- Acesso ao audiobook
  - purchased_products: jsonb         -- Histórico de compras
```

### Exemplo `purchased_products`:
```json
[
  {
    "type": "livro",
    "date": "2024-01-15T10:30:00Z",
    "code": "LIVRO-ABC123"
  },
  {
    "type": "espelhos",
    "date": "2024-02-01T14:20:00Z"
  }
]
```

---

## 🚀 COMO USAR

### 1️⃣ **Hook `useAccess`** (em qualquer componente)

```typescript
import { useAccess } from "@/hooks/useAccess";

function MinhaPagina() {
  const { hasBookAccess, hasMirrorsAccess, isAdmin } = useAccess();

  if (!hasBookAccess) {
    return <p>Precisas de comprar o livro!</p>;
  }

  return <ConteudoDoLivro />;
}
```

### 2️⃣ **Componente `AccessGuard`** (proteger páginas inteiras)

```typescript
import { AccessGuard } from "@/components/AccessGuard";

export default function LivroPage() {
  return (
    <AccessGuard requiredAccess="book">
      {/* Só aparece se user tiver acesso ao livro */}
      <ConteudoDoLivro />
    </AccessGuard>
  );
}
```

**Opções de `requiredAccess`:**
- `"book"` - Livro digital
- `"mirrors"` - Espelhos
- `"audiobook"` - Audiobook
- `"any"` - Qualquer produto

### 3️⃣ **Custom Fallback** (mensagem personalizada)

```typescript
<AccessGuard
  requiredAccess="mirrors"
  fallback={
    <div>
      <h1>Espelhos Contemplativos</h1>
      <p>Adquire os espelhos para desbloquear!</p>
      <button>Comprar Agora</button>
    </div>
  }
>
  <EspelhosContent />
</AccessGuard>
```

---

## 🎯 EXEMPLOS PRÁTICOS

### Proteger Rota `/livro/*`

```typescript
// src/app/livro/page.tsx
import { AccessGuard } from "@/components/AccessGuard";

export default function LivroPage() {
  return (
    <AccessGuard requiredAccess="book">
      <MandalaVeus />
    </AccessGuard>
  );
}
```

### Proteger Rota `/livro/espelho`

```typescript
// src/app/livro/espelho/page.tsx
import { AccessGuard } from "@/components/AccessGuard";

export default function EspelhoPage() {
  return (
    <AccessGuard requiredAccess="mirrors">
      <EspelhosContent />
    </AccessGuard>
  );
}
```

### Mostrar Conteúdo Condicional

```typescript
function DashboardMembro() {
  const { hasBookAccess, hasMirrorsAccess } = useAccess();

  return (
    <div>
      <h1>Minha Área</h1>

      {hasBookAccess && (
        <section>
          <h2>📖 Livro Digital</h2>
          <Link href="/livro">Ler agora</Link>
        </section>
      )}

      {hasMirrorsAccess && (
        <section>
          <h2>🪞 Espelhos</h2>
          <Link href="/livro/espelho">Aceder espelhos</Link>
        </section>
      )}

      {!hasBookAccess && !hasMirrorsAccess && (
        <section>
          <h2>Ainda não tens produtos</h2>
          <Link href="/comprar">Ver opções</Link>
        </section>
      )}
    </div>
  );
}
```

---

## 🔄 CONCESSÃO AUTOMÁTICA DE ACESSO

Quando um código é usado, o acesso é concedido **automaticamente** via trigger SQL:

```sql
-- Trigger: trigger_grant_access_on_code_use
-- Quando livro_codes.used_by_email é preenchido,
-- automaticamente seta has_book_access = true no perfil
```

**Fluxo:**
1. User usa código `LIVRO-ABC123`
2. Sistema preenche `livro_codes.used_by_email`
3. Trigger SQL atualiza `profiles.has_book_access = true`
4. User pode aceder imediatamente ao livro

---

## 🛠️ CONCEDER ACESSO MANUALMENTE (Admin)

### Via Supabase Dashboard:
1. Ir para `Table Editor > profiles`
2. Encontrar user por email
3. Editar campos:
   - `has_book_access` → `true`
   - `has_mirrors_access` → `true`
   - `has_audiobook_access` → `true`

### Via SQL:
```sql
UPDATE profiles
SET
  has_book_access = true,
  has_mirrors_access = true
WHERE email = 'user@example.com';
```

---

## 📊 VERIFICAR ACESSOS DE UM USER

```sql
SELECT
  email,
  has_book_access,
  has_mirrors_access,
  has_audiobook_access,
  purchased_products
FROM profiles
WHERE email = 'viv.saraiva@gmail.com';
```

---

## ⚙️ SETUP (IMPORTANTE!)

### 1. Executar Migration no Supabase

Vai ao **Supabase Dashboard** → **SQL Editor** e executa:

```bash
supabase/migrations/add_access_control_to_profiles.sql
```

### 2. Verificar se Admin Tem Acessos

```sql
SELECT * FROM profiles WHERE is_admin = true;
```

Deves ver:
```
has_book_access: true
has_mirrors_access: true
has_audiobook_access: true
```

---

## 🎓 CONCEITOS

### Admin vs User Normal

| Campo | Admin | User Normal |
|-------|-------|-------------|
| `is_admin` | `true` | `false` |
| Acesso automático a tudo? | ✅ Sim | ❌ Não |
| Vê painel `/autora/*`? | ✅ Sim | ❌ Não |
| Precisa comprar produtos? | ❌ Não | ✅ Sim |

### Múltiplos Produtos

Um user pode ter:
- ✅ Só livro
- ✅ Só espelhos
- ✅ Livro + Espelhos (Bundle)
- ✅ Tudo (Admin)

---

## 🧪 TESTAR

### 1. Login como Admin
```
Email: viv.saraiva@gmail.com
```
→ Deve ter acesso a tudo

### 2. Login como User Normal (teste)
- Criar conta nova
- Verificar que **NÃO** tem acessos
- Conceder acesso manual via SQL
- Verificar que agora **TEM** acessos

### 3. Usar Código
1. Gerar código em `/autora/codigos`
2. Login com outra conta
3. Usar código
4. Verificar que `has_book_access` ficou `true`

---

## 📝 PRÓXIMOS PASSOS (OPCIONAL)

- [ ] Integração com pagamentos (M-Pesa/PayPal) para conceder acesso automaticamente após compra
- [ ] Expiração de acessos (subscriptions)
- [ ] Histórico de acessos (logs)
- [ ] Notificações quando acesso é concedido

---

## ✅ PRONTO!

Agora tens um sistema completo de controlo de acessos! 🎉

**Qualquer dúvida, verifica:**
- `/src/hooks/useAccess.ts` - Hook principal
- `/src/components/AccessGuard.tsx` - Componente de proteção
- `/supabase/migrations/add_access_control_to_profiles.sql` - SQL
