# 🔐 CRIAR CONTA ADMIN

## ✅ **O QUE JÁ FOI FEITO:**

1. ✅ Página de registo criada: `/registar`
2. ✅ Link adicionado na página de login
3. ✅ API atualizada para aceitar password
4. ✅ UX melhorado (guardar password no browser)

---

## 🚀 **PRÓXIMOS PASSOS:**

### **1. Configurar SERVICE_ROLE_KEY**

A API precisa da **Service Role Key** do Supabase para criar contas.

**Como obter:**
1. Vai a: https://supabase.com/dashboard
2. Abre o projeto **"os-sete-veus"**
3. Menu: **Settings** → **API**
4. Procura: **"service_role key (secret)"**
5. Clica em **"Copy"** (ou **"Reveal"** primeiro)
6. Edita o ficheiro `.env.local`:

```env
SUPABASE_SERVICE_ROLE_KEY=cole_a_tua_key_aqui
```

⚠️ **IMPORTANTE:** NUNCA partilhes esta key! É secreta!

---

### **2. OPÇÃO A: Criar Conta via Interface Web (RECOMENDADO)**

1. **Espera o deploy no Vercel** (2-3 minutos após o push)
2. Vai a: **https://seteecos.com/registar**
3. Preenche:
   - Email: `viv.saraiva@gmail.com`
   - Password: `VanelMiguel12`
4. Clica **"Criar conta"**
5. **SUCESSO!** Conta criada ✅

---

### **3. OPÇÃO B: Criar Conta via Script (Alternativa)**

Se preferires usar script local:

```bash
# 1. Certifica-te que a SERVICE_ROLE_KEY está no .env.local
# 2. Executa:
node -e "
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  { auth: { autoRefreshToken: false, persistSession: false } }
);

(async () => {
  const { data, error } = await supabase.auth.admin.createUser({
    email: 'viv.saraiva@gmail.com',
    password: 'VanelMiguel12',
    email_confirm: true
  });

  if (error) {
    console.error('Erro:', error.message);
  } else {
    console.log('✅ Conta criada com sucesso!');
    console.log('User ID:', data.user.id);
  }
})();
"
```

---

### **4. Tornar a Conta em ADMIN**

Depois de criar a conta, torna-a admin:

**Via Supabase Dashboard:**

1. Vai a: https://supabase.com/dashboard
2. Projeto **"os-sete-veus"**
3. Menu: **Table Editor** → **profiles**
4. Encontra a linha com `email = 'viv.saraiva@gmail.com'`
5. Clica para editar
6. Altera:
   - `is_admin`: `true`
   - `subscription_status`: `active`
7. Clica **"Save"**

**OU via SQL Editor:**

```sql
UPDATE profiles
SET is_admin = true,
    subscription_status = 'active'
WHERE email = 'viv.saraiva@gmail.com';
```

---

### **5. Testar**

1. Vai a: **https://seteecos.com/entrar**
2. Faz login com:
   - Email: `viv.saraiva@gmail.com`
   - Password: `VanelMiguel12`
3. Depois de login, vai a: **https://seteecos.com/admin**
4. **Deves ver o painel admin!** 🎉

---

## ⚡ **ATALHO RÁPIDO:**

Se já tens a SERVICE_ROLE_KEY configurada:

```bash
# Vai direto a /registar e cria a conta
# Depois executa este SQL no Supabase:
UPDATE profiles SET is_admin = true, subscription_status = 'active'
WHERE email = 'viv.saraiva@gmail.com';
```

---

## ❓ **PROBLEMAS?**

**P: "Erro ao criar conta"**
- Verifica se a SERVICE_ROLE_KEY está correta no `.env.local`
- Verifica se o Vercel também tem a variável de ambiente configurada

**P: "Já tens uma conta"**
- A conta já existe! Basta torná-la admin (passo 4)
- Ou reseta a password no Supabase

**P: "Não vejo o painel admin"**
- Verifica se `is_admin = true` na tabela `profiles`
- Verifica se estás logado com viv.saraiva@gmail.com

---

## 🎯 **PRÓXIMOS PASSOS:**

Depois de teres acesso admin:
1. Acede ao painel admin
2. Cria conteúdo
3. Gere links especiais
4. Confirma pagamentos

---

**Made with ❤️ by Claude Code**
