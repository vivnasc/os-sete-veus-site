# 🚀 SETUP DO SISTEMA DE PAGAMENTOS

Este documento explica como configurar o sistema de acessos e pagamentos do **Os Sete Véus**.

---

## 📋 CHECKLIST RÁPIDO

- [ ] 1. Executar SQL no Supabase
- [ ] 2. Configurar .env.local
- [ ] 3. Adicionar dados bancários
- [ ] 4. Testar o sistema
- [ ] 5. Deploy para produção

---

## 1️⃣ EXECUTAR SQL NO SUPABASE

### **Opção A: Manual (Recomendado)**

1. Abre: https://supabase.com/dashboard
2. Seleciona o projeto "os-sete-veus"
3. Menu lateral → **SQL Editor**
4. Clica em **"+ New query"**
5. Abre o arquivo `supabase-schema.sql` (na raiz do projeto)
6. Copia **TODO** o conteúdo
7. Cola no SQL Editor
8. Clica em **"RUN"** ou pressiona `Ctrl+Enter`
9. Aguarda 10-30 segundos
10. Se aparecer "Success. No rows returned" → **SUCESSO!** ✅

### **Opção B: Script Automático**

```bash
node setup-database.js
```

Este script mostra instruções detalhadas.

---

## 2️⃣ CONFIGURAR .env.local

O arquivo `.env.local` já foi criado, mas precisa da tua **service role key**.

### Como obter a Service Role Key:

1. Vai a: https://supabase.com/dashboard
2. Abre o teu projeto
3. **Settings** → **API**
4. Procura por **"service_role key (secret)"**
5. Clica em **"Copy"**
6. Edita `.env.local`:

```env
SUPABASE_SERVICE_ROLE_KEY=cole_a_tua_key_aqui
```

⚠️ **NUNCA** partilhes esta key! É secreta!

---

## 3️⃣ ADICIONAR DADOS BANCÁRIOS

### MPesa (Já Configurado ✅)

Número: **+258 845 243 875**

### Transferência Bancária

Edita o arquivo:
```
src/app/pagamento/bank_transfer/page.tsx
```

Linhas 118-132:
```tsx
<div>
  <p className="text-xs text-brown-500">Banco</p>
  <p className="font-sans text-lg font-medium text-brown-900">
    [Adiciona o nome do teu banco aqui]
  </p>
</div>
// ...
<div>
  <p className="text-xs text-brown-500">NIB / IBAN</p>
  <p className="font-mono text-lg font-medium text-brown-900">
    [Adiciona o teu NIB/IBAN aqui]
  </p>
</div>
```

Substitui pelos teus dados reais.

---

## 4️⃣ TESTAR O SISTEMA

### Como Admin (viv.saraiva@gmail.com)

1. Vai a: https://seteveus.space/admin
2. Faz login com: `viv.saraiva@gmail.com`
3. Verás o painel admin

### Criar Link Especial (Livro Físico)

1. No admin, clica em **"Links Especiais"**
2. Preenche:
   - **Notas**: "João Silva - compra 15/02"
   - **Máx usos**: 1
   - **Expira em**: 30 dias
3. Clica **"Criar Link Especial"**
4. Copia o link gerado
5. Envia ao cliente via email/WhatsApp

### Cliente Usa o Link

1. Cliente abre o link: `https://seteveus.space/registar-livro?code=xxxxx`
2. Insere o email
3. Recebe magic link no email
4. Clica no magic link
5. Faz login → **TEM ACESSO GRATUITO!** 🎉

### Compra da Coleção

1. Cliente vai a: https://seteveus.space/comprar-colecao
2. Insere email
3. Escolhe método de pagamento:
   - **PayPal** (em desenvolvimento)
   - **MPesa** (ativo)
   - **Transferência Bancária** (ativo)
4. Paga via MPesa/Transferência
5. Insere número de transação
6. Sistema notifica admin (tu)
7. Tu confirmas no painel admin
8. Cliente recebe acesso automático! 🎊

---

## 5️⃣ DEPLOY PARA PRODUÇÃO

```bash
git add -A
git commit -m "Configurar dados bancários"
git push
```

O Vercel faz deploy automático!

---

## 📱 CONTACTOS

- **Email**: viv.saraiva@gmail.com
- **WhatsApp**: wa.me/258845243875

---

## 🔐 SEGURANÇA

- ✅ RLS (Row Level Security) ativado
- ✅ Service Role Key secreta
- ✅ Apenas admin vê todos os pagamentos
- ✅ Clientes veem só os seus dados

---

## 🎯 FUNCIONALIDADES

### ✅ IMPLEMENTADAS:

- [x] Sistema de 3 níveis de acesso
- [x] Admin: viv.saraiva@gmail.com
- [x] Livro Físico: links especiais gratuitos
- [x] Coleção Os 7 Véus: pagamento
- [x] Pagamento MPesa (confirmação manual)
- [x] Pagamento Transferência (confirmação manual)
- [x] Painel admin completo
- [x] Criar links especiais
- [x] Confirmar/rejeitar pagamentos

### 🔄 EM DESENVOLVIMENTO:

- [ ] Integração PayPal completa
- [ ] Notificações por email
- [ ] Notificações por WhatsApp
- [ ] Webhooks automáticos

---

## ❓ FAQ

**P: Como sei que o SQL foi executado com sucesso?**
R: No Supabase SQL Editor, verás "Success. No rows returned" ou "Success".

**P: Posso executar o SQL várias vezes?**
R: Sim! O SQL tem proteções (`IF NOT EXISTS`, `ON CONFLICT DO NOTHING`) que evitam duplicações.

**P: Como adiciono mais admins?**
R: Edita `src/app/api/payment/confirm/route.ts` linha 8:
```ts
const ADMIN_EMAIL = "viv.saraiva@gmail.com";
```

**P: Posso mudar o preço da coleção?**
R: Sim! No Supabase, edita a tabela `access_types`:
```sql
UPDATE access_types
SET price_mzn = 3000, price_usd = 60
WHERE code = 'colecao-sete-veus';
```

---

## 🎉 PRONTO!

Sistema configurado! Qualquer dúvida, contacta via WhatsApp: wa.me/258845243875

**Made with ❤️ by Claude Code**
