# ✅ Testing Checklist - Sistema de Códigos

## Antes do Deploy

### 1. Database Setup
- [ ] Migration executada no Supabase
- [ ] Tabelas `livro_codes` e `livro_code_requests` criadas
- [ ] Função `generate_unique_livro_code()` existe
- [ ] RLS ativado em ambas as tabelas
- [ ] Políticas RLS criadas corretamente
- [ ] Admin user criado na tabela `user_roles`

**Como verificar:**
```sql
-- 1. Verifica tabelas
SELECT * FROM information_schema.tables
WHERE table_name IN ('livro_codes', 'livro_code_requests');

-- 2. Verifica função
SELECT * FROM pg_proc WHERE proname = 'generate_unique_livro_code';

-- 3. Verifica RLS
SELECT tablename, rowsecurity
FROM pg_tables
WHERE tablename IN ('livro_codes', 'livro_code_requests');

-- 4. Verifica admin
SELECT * FROM user_roles WHERE role = 'admin';
```

---

### 2. Environment Variables
- [ ] `NEXT_PUBLIC_SUPABASE_URL` configurado
- [ ] `NEXT_PUBLIC_SUPABASE_ANON_KEY` configurado
- [ ] `SUPABASE_SERVICE_ROLE_KEY` configurado (para APIs)
- [ ] `.env.local` existe e tem todas as variáveis

**Como verificar:**
```bash
# Em desenvolvimento
cat .env.local

# Em produção (Vercel/Netlify)
# Verifica no dashboard do host
```

---

## Testes Funcionais

### 3. Teste: Pedido de Código (Cliente)

**URL:** `/pedir-codigo`

- [ ] Página carrega sem erros
- [ ] Formulário aparece corretamente
- [ ] Campos obrigatórios validam (nome, email)
- [ ] WhatsApp é opcional
- [ ] Local de compra é opcional
- [ ] Submit funciona
- [ ] Mensagem de sucesso aparece
- [ ] Pedido é criado no Supabase
- [ ] Status do pedido é 'pending'

**Como testar:**
1. Abre navegador anónimo
2. Vai a `/pedir-codigo`
3. Preenche:
   - Nome: "Teste Cliente"
   - Email: "teste@cliente.com"
   - WhatsApp: "+258845243875"
   - Onde comprou: "Teste manual"
4. Clica "Enviar Pedido"
5. Verifica mensagem de sucesso
6. No Supabase, verifica:
   ```sql
   SELECT * FROM livro_code_requests
   WHERE email = 'teste@cliente.com'
   ORDER BY created_at DESC LIMIT 1;
   ```

**Resultado esperado:**
```
✅ Pedido aparece na tabela
✅ Status = 'pending'
✅ Dados corretos
```

---

### 4. Teste: Painel Admin - Pedidos Pendentes

**URL:** `/autora/codigos`

- [ ] Redireciona para login se não autenticado
- [ ] Admin consegue acessar após login
- [ ] Tab "Pedidos Pendentes" carrega
- [ ] Pedidos pendentes aparecem na lista
- [ ] Botão "Aprovar" está visível
- [ ] Botão "Rejeitar" está visível
- [ ] Dados do pedido exibidos corretamente

**Como testar:**
1. Login como admin
2. Vai a `/autora/codigos`
3. Clica tab "Pedidos Pendentes"
4. Verifica se o pedido de teste aparece

**Resultado esperado:**
```
✅ Pedido "Teste Cliente" aparece
✅ Email: teste@cliente.com
✅ Status: Pendente
✅ Botões de ação visíveis
```

---

### 5. Teste: Aprovar Pedido (Admin)

**URL:** `/autora/codigos` → Tab "Pedidos Pendentes"

- [ ] Clica "Aprovar" num pedido
- [ ] Loading state aparece
- [ ] Sucesso: Mensagem de confirmação
- [ ] Código gerado automaticamente (LIVRO-XXXXX)
- [ ] Código é exibido ao admin
- [ ] Pedido sai da lista de pendentes
- [ ] Código aparece em "Todos os Códigos"
- [ ] Status do pedido = 'approved'
- [ ] Código associado ao pedido

**Como testar:**
1. Na lista de pendentes, clica "Aprovar" no pedido teste
2. Aguarda loading
3. Copia o código gerado
4. Vai à tab "Todos os Códigos"
5. Verifica se código aparece

**Resultado esperado:**
```sql
-- Pedido aprovado
SELECT * FROM livro_code_requests
WHERE email = 'teste@cliente.com';
-- status = 'approved'
-- generated_code_id = UUID do código

-- Código criado
SELECT * FROM livro_codes
WHERE email = 'teste@cliente.com';
-- code = 'LIVRO-XXXXX'
-- status = 'unused'
```

---

### 6. Teste: Gerar Código Manual (Admin)

**URL:** `/autora/codigos` → Tab "Gerar Novo"

- [ ] Formulário de geração aparece
- [ ] Campo email é opcional
- [ ] Campo notas é opcional
- [ ] Botão "Gerar Código" funciona
- [ ] Código é gerado (LIVRO-XXXXX)
- [ ] Código é exibido ao admin
- [ ] Código aparece em "Todos os Códigos"
- [ ] created_by = 'admin'

**Como testar:**
1. Tab "Gerar Novo"
2. Preenche:
   - Email: "manual@test.com" (opcional)
   - Notas: "Código de teste manual"
3. Clica "Gerar Código"
4. Copia código gerado
5. Vai à tab "Todos os Códigos"

**Resultado esperado:**
```sql
SELECT * FROM livro_codes
WHERE email = 'manual@test.com';
-- code = 'LIVRO-XXXXX'
-- status = 'unused'
-- created_by = 'admin'
```

---

### 7. Teste: Validar Código (Cliente)

**URL:** `/registar-livro`

**Caso 1: Código válido**
- [ ] Insere código gerado (LIVRO-XXXXX)
- [ ] Sistema valida sem erros
- [ ] Mensagem de sucesso aparece
- [ ] Formulário de registo é desbloqueado
- [ ] Consegue criar conta
- [ ] Código marcado como 'used'
- [ ] used_at é preenchido
- [ ] used_by aponta para user_id

**Caso 2: Código inválido**
- [ ] Insere "LIVRO-99999" (inexistente)
- [ ] Sistema rejeita
- [ ] Mensagem de erro clara
- [ ] Formulário permanece bloqueado

**Caso 3: Código já usado**
- [ ] Insere código que já foi usado
- [ ] Sistema rejeita
- [ ] Mensagem: "Código já foi utilizado"

**Como testar:**
```bash
# 1. Código válido
1. Vai a /registar-livro
2. Insere código gerado no teste anterior
3. Verifica validação OK
4. Completa registo
5. Verifica no Supabase:

SELECT * FROM livro_codes WHERE code = 'LIVRO-XXXXX';
-- status = 'used'
-- used_at = timestamp
-- used_by = user_id

# 2. Código inválido
1. Tenta "LIVRO-99999"
2. Verifica erro

# 3. Código usado
1. Tenta usar o mesmo código novamente
2. Verifica erro "já utilizado"
```

---

### 8. Teste: Lista Todos os Códigos (Admin)

**URL:** `/autora/codigos` → Tab "Todos os Códigos"

- [ ] Lista carrega todos os códigos
- [ ] Códigos ordenados por data (mais recente primeiro)
- [ ] Status correto (unused/used/expired)
- [ ] Filtros funcionam (se implementados)
- [ ] Paginação funciona (se implementado)
- [ ] Dados completos (código, email, status, data)

**Como testar:**
1. Vai à tab "Todos os Códigos"
2. Verifica se os códigos de teste aparecem
3. Confirma status corretos

**Resultado esperado:**
```
✅ Código aprovado (status: used)
✅ Código manual (status: unused)
✅ Datas corretas
✅ Emails corretos
```

---

### 9. Teste: Rejeitar Pedido (Admin)

**URL:** `/autora/codigos` → Tab "Pedidos Pendentes"

- [ ] Cria novo pedido de teste
- [ ] Clica "Rejeitar" no pedido
- [ ] Modal/campo de motivo aparece
- [ ] Insere motivo de rejeição
- [ ] Confirma
- [ ] Pedido sai da lista de pendentes
- [ ] Status = 'rejected'
- [ ] Motivo é salvo

**Como testar:**
1. Cria novo pedido em /pedir-codigo
2. No painel admin, clica "Rejeitar"
3. Insere motivo: "Comprovativo inválido"
4. Confirma
5. Verifica no Supabase:
```sql
SELECT * FROM livro_code_requests
WHERE status = 'rejected'
ORDER BY created_at DESC LIMIT 1;
-- rejection_reason = 'Comprovativo inválido'
```

---

## Testes de UI/UX

### 10. Responsividade
- [ ] `/pedir-codigo` funciona em mobile
- [ ] `/autora/codigos` funciona em tablet
- [ ] Formulários são usáveis em mobile
- [ ] Tabs funcionam em todos os dispositivos
- [ ] Botões são clicáveis em telas pequenas

**Como testar:**
```
1. Abre DevTools (F12)
2. Toggle device toolbar (Ctrl+Shift+M)
3. Testa em:
   - iPhone SE (375px)
   - iPad (768px)
   - Desktop (1920px)
```

---

### 11. Acessibilidade
- [ ] Formulários têm labels corretos
- [ ] Botões têm aria-labels
- [ ] Cores têm contraste adequado
- [ ] Tab navigation funciona
- [ ] Screen reader friendly

**Como testar:**
```
1. Tab através dos formulários
2. Verifica ordem lógica
3. Testa com Lighthouse (Chrome DevTools)
4. Score de acessibilidade > 90
```

---

## Testes de Performance

### 12. Build e Deploy
- [ ] `npm run build` passa sem erros
- [ ] Sem warnings críticos do TypeScript
- [ ] Tamanho do bundle aceitável
- [ ] Imagens otimizadas
- [ ] Lighthouse score > 80

**Como testar:**
```bash
npm run build
npm run start
```

**Lighthouse:**
```
1. Abre Chrome DevTools
2. Tab Lighthouse
3. Testa páginas principais
4. Verifica scores:
   - Performance > 80
   - Accessibility > 90
   - Best Practices > 90
   - SEO > 90
```

---

## Testes de Segurança

### 13. Autenticação e Autorização
- [ ] Não-admins não podem acessar `/autora/codigos`
- [ ] APIs rejeitam requests não autorizados
- [ ] RLS protege dados sensíveis
- [ ] Não há vazamento de dados de outros users

**Como testar:**
```bash
# Testa API sem auth
curl -X POST http://localhost:3000/api/codes/generate \
  -H "Content-Type: application/json" \
  -d '{"email":"hack@test.com"}'

# Resultado esperado: 401 Unauthorized

# Testa acesso admin como user normal
1. Login com conta não-admin
2. Tenta acessar /autora/codigos
3. Deve redirecionar ou mostrar 403
```

---

### 14. Validação de Input
- [ ] Email validado corretamente
- [ ] Código validado (formato LIVRO-XXXXX)
- [ ] SQL injection protegido (via Supabase)
- [ ] XSS protegido (via React)
- [ ] CSRF protegido (se aplicável)

**Como testar:**
```javascript
// Tenta injetar HTML/JS
Input: <script>alert('XSS')</script>
Resultado esperado: Texto escapado

// Tenta SQL injection
Input: ' OR '1'='1
Resultado esperado: Rejeitado/escapado
```

---

## Checklist Final

### Antes de Ir para Produção
- [ ] Todos os testes passaram
- [ ] Migration executada no Supabase produção
- [ ] Environment variables configuradas no host
- [ ] Admin user criado em produção
- [ ] DNS configurado
- [ ] SSL/HTTPS ativo
- [ ] Backup da base de dados configurado
- [ ] Monitoring ativo (Sentry/LogRocket)
- [ ] Google Analytics configurado (se aplicável)

### Documentação
- [ ] DEPLOYMENT.md revisado
- [ ] API_DOCUMENTATION.md atualizado
- [ ] README.md tem instruções claras
- [ ] Variáveis de ambiente documentadas

### Comunicação
- [ ] Email template preparado (para enviar códigos)
- [ ] WhatsApp template preparado
- [ ] Suporte sabe como funciona o sistema
- [ ] FAQs atualizados

---

## Testes Contínuos (Após Deploy)

### Monitoramento Semanal
- [ ] Verifica pedidos pendentes
- [ ] Aprova/rejeita pedidos em < 24h
- [ ] Monitora códigos não utilizados
- [ ] Verifica taxa de conversão (pedido → uso)

### Métricas
- Total de pedidos
- Taxa de aprovação
- Tempo médio de aprovação
- Códigos gerados vs usados
- Emails com código vs registos

---

**Última atualização:** 2025-02-13
**Status:** Pronto para testes
