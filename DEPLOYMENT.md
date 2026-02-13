# 🚀 Guia de Deployment - Sistema de Códigos

## ✅ O Que Foi Implementado (Semana 1 - COMPLETO)

### 1. Renomeação Global
- ✅ "Experiências Digitais" → **"ESPELHOS"** em todo o site
- ✅ Navegação, homepage, páginas de compra atualizadas

### 2. Nova Estrutura de Compra
- ✅ `/comprar` - Landing page com escolha clara
- ✅ `/comprar/livro` - 3 opções (já comprei | físico | digital)
- ✅ `/comprar/espelhos` - Loja completa dinâmica

### 3. Sistema Completo de Códigos
**APIs implementadas:**
- `/api/codes/generate` - Gerar códigos manualmente (admin)
- `/api/codes/validate` - Validar código no registo
- `/api/codes/request` - Pedido público de código
- `/api/codes/approve` - Aprovar/rejeitar pedidos (admin)

**Páginas:**
- `/pedir-codigo` - Formulário público
- `/autora/codigos` - Painel admin com 3 tabs

### 4. Bundle Especial
- ✅ Livro + 1 Espelho (3.500 MZN)
- ✅ Presente em `/comprar/livro` e `/comprar/espelhos`

### 5. Testemunhos
- ✅ Homepage (3 depoimentos com ratings)
- ✅ `/comprar/livro` (3 em grid)
- ✅ `/comprar/espelhos` (3 com animação)

---

## 📋 Próximos Passos para Deploy

### PASSO 1: Executar Migration no Supabase

**A. Via Supabase Dashboard (Recomendado)**

1. Acessa: https://supabase.com/dashboard
2. Seleciona o projeto
3. Vai em **SQL Editor**
4. Copia o conteúdo de: `supabase/migrations/create_livro_codes_table.sql`
5. Cola no editor e clica **RUN**

**B. Via Supabase CLI (Alternativa)**

```bash
# Instala Supabase CLI (se ainda não tiver)
npm install -g supabase

# Login
supabase login

# Link ao projeto
supabase link --project-ref SEU_PROJECT_ID

# Aplica migration
supabase db push
```

### PASSO 2: Verificar Permissões RLS

Após executar a migration, verifica no Supabase Dashboard:

1. **Tabelas criadas:**
   - ✅ `livro_codes`
   - ✅ `livro_code_requests`

2. **RLS ativado:**
   - ✅ Row Level Security enabled em ambas

3. **Políticas criadas:**
   - Admins podem ver/inserir/atualizar códigos
   - Qualquer um pode criar pedido
   - Users veem próprios pedidos

### PASSO 3: Testar o Fluxo

**Teste 1: Pedido de Código (Cliente)**
```
1. Vai a /pedir-codigo
2. Preenche formulário
3. Submete
4. Verifica se aparece no painel /autora/codigos
```

**Teste 2: Aprovar Pedido (Admin)**
```
1. Login como admin
2. Vai a /autora/codigos
3. Tab "Pedidos Pendentes"
4. Aprova pedido → código gerado automaticamente
5. Verifica formato: LIVRO-XXXXX
```

**Teste 3: Gerar Código Manual (Admin)**
```
1. /autora/codigos → Tab "Gerar Novo"
2. Preenche email (opcional)
3. Gera código
4. Verifica em "Todos os Códigos"
```

**Teste 4: Validar Código (Cliente)**
```
1. Vai a /registar-livro
2. Insere código LIVRO-XXXXX
3. Sistema valida
4. Cria conta
5. Código marcado como "usado"
```

---

## 🔧 Configurações Necessárias

### 1. Variáveis de Ambiente (.env.local)

Certifica-te que tens:
```env
NEXT_PUBLIC_SUPABASE_URL=https://SEU_PROJECT.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...
```

### 2. User Roles (Tabela user_roles)

Para que o painel admin funcione, precisas ter a tabela `user_roles`:

```sql
-- Verifica se existe
SELECT * FROM user_roles WHERE user_id = 'TEU_USER_ID';

-- Se não existir, cria admin
INSERT INTO user_roles (user_id, role)
VALUES ('TEU_USER_ID', 'admin');
```

---

## 📧 Integração de Email (Próximo Sprint)

### Sistema Atual
- ✅ Código gerado manualmente
- ⏳ Email enviado manualmente

### Para Automatizar
Integra com Resend/SendGrid/Mailgun:

```typescript
// Exemplo: Quando código é aprovado
await sendEmail({
  to: request.email,
  subject: 'Código de Acesso - Os 7 Véus do Despertar',
  template: 'codigo-gerado',
  data: {
    code: generatedCode,
    name: request.full_name
  }
})
```

---

## 🎯 Sugestões para Semana 2

### Opção A: Automatização de Emails
- [ ] Integrar Resend/SendGrid
- [ ] Template de email bonito
- [ ] Email automático quando código é aprovado
- [ ] Email de confirmação de pedido

### Opção B: Checkout e Pagamentos
- [ ] Integrar M-Pesa API (Moçambique)
- [ ] Integrar PayPal (Internacional)
- [ ] Página de checkout funcional
- [ ] Geração automática de código após pagamento

### Opção C: Experiência do Cliente
- [ ] Dashboard cliente (/meu-livro)
- [ ] Progresso de leitura
- [ ] Sincronização entre dispositivos
- [ ] Download PDF opcional

### Opção D: Analytics e Tracking
- [ ] Google Analytics 4
- [ ] Pixel do Facebook
- [ ] Tracking de conversões
- [ ] Dashboard de métricas (admin)

---

## 🐛 Troubleshooting

### Erro: "Failed to fetch"
**Solução:** Verifica CORS no Supabase (deve permitir teu domínio)

### Erro: "Row level security"
**Solução:** Executa as políticas RLS da migration

### Erro: "Function generate_unique_livro_code does not exist"
**Solução:** Executa a migration completa (inclui a função)

### Código não valida
**Solução:** Verifica se:
1. Código está no formato LIVRO-XXXXX
2. Status é 'unused'
3. Email da request corresponde ao código

---

## 📞 Suporte

Para dúvidas sobre:
- **Código:** Revê `/src/app/api/codes/`
- **Database:** `supabase/migrations/create_livro_codes_table.sql`
- **UI:** `/src/app/autora/codigos/page.tsx` e `/src/app/pedir-codigo/page.tsx`

---

**Última atualização:** 2025-02-13
**Status:** Semana 1 ✅ COMPLETO | Pronto para deploy
