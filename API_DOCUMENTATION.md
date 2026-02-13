# 📚 API Documentation - Sistema de Códigos

## Índice
1. [Visão Geral](#visão-geral)
2. [Autenticação](#autenticação)
3. [Endpoints](#endpoints)
4. [Schemas](#schemas)
5. [Fluxos de Trabalho](#fluxos-de-trabalho)

---

## Visão Geral

Sistema de gestão de códigos de acesso para o livro digital "Os 7 Véus do Despertar".

**Base URL:** `https://teu-dominio.com/api/codes`

**Formatos suportados:** JSON

---

## Autenticação

### Público (sem auth)
- `POST /api/codes/request` - Qualquer pessoa pode pedir código

### Autenticado
- `POST /api/codes/validate` - Requer sessão válida (Supabase Auth)

### Admin
- `POST /api/codes/generate` - Requer role 'admin'
- `POST /api/codes/approve` - Requer role 'admin'

**Verificação de admin:**
```typescript
const { data: userRole } = await supabase
  .from('user_roles')
  .select('role')
  .eq('user_id', user.id)
  .single()

if (userRole?.role !== 'admin') {
  return Response 403 Forbidden
}
```

---

## Endpoints

### 1. POST /api/codes/generate
Gera um novo código de acesso (admin only).

**Request:**
```json
{
  "email": "cliente@email.com",  // opcional
  "notes": "Cliente VIP"          // opcional
}
```

**Response 200:**
```json
{
  "code": "LIVRO-A3F9K",
  "email": "cliente@email.com",
  "status": "unused",
  "generated_at": "2025-02-13T10:30:00Z",
  "created_by": "admin"
}
```

**Erros:**
- `401` - Não autenticado
- `403` - Não é admin
- `500` - Erro ao gerar código

---

### 2. POST /api/codes/validate
Valida se um código existe e está disponível.

**Request:**
```json
{
  "code": "LIVRO-A3F9K"
}
```

**Response 200 (código válido):**
```json
{
  "valid": true,
  "code": "LIVRO-A3F9K",
  "message": "Código válido e disponível"
}
```

**Response 200 (código inválido):**
```json
{
  "valid": false,
  "message": "Código não encontrado"
}
```

**Response 200 (código já usado):**
```json
{
  "valid": false,
  "message": "Código já foi utilizado"
}
```

**Erros:**
- `400` - Código não fornecido
- `500` - Erro no servidor

---

### 3. POST /api/codes/request
Cliente pede um código de acesso (público).

**Request:**
```json
{
  "full_name": "Maria Silva",
  "email": "maria@email.com",
  "whatsapp": "+258845243875",
  "purchase_location": "Livraria Académica, Maputo"
}
```

**Response 200:**
```json
{
  "success": true,
  "message": "Pedido recebido com sucesso! Entraremos em contacto em até 24h.",
  "request_id": "uuid-do-pedido"
}
```

**Erros:**
- `400` - Campos obrigatórios em falta
- `500` - Erro ao criar pedido

**Campos obrigatórios:**
- `full_name`
- `email`

**Campos opcionais:**
- `whatsapp`
- `purchase_location`
- `proof_url` (futuramente: upload de comprovativo)

---

### 4. POST /api/codes/approve
Aprova ou rejeita pedido de código (admin only).

**Request (Aprovar):**
```json
{
  "request_id": "uuid-do-pedido",
  "action": "approve"
}
```

**Response 200:**
```json
{
  "success": true,
  "code": "LIVRO-B7H2M",
  "message": "Pedido aprovado e código gerado",
  "request": {
    "id": "uuid",
    "full_name": "Maria Silva",
    "email": "maria@email.com",
    "status": "approved"
  }
}
```

**Request (Rejeitar):**
```json
{
  "request_id": "uuid-do-pedido",
  "action": "reject",
  "reason": "Comprovativo inválido"
}
```

**Response 200:**
```json
{
  "success": true,
  "message": "Pedido rejeitado",
  "request": {
    "id": "uuid",
    "status": "rejected",
    "rejection_reason": "Comprovativo inválido"
  }
}
```

**Erros:**
- `400` - request_id ou action em falta
- `401` - Não autenticado
- `403` - Não é admin
- `404` - Pedido não encontrado
- `500` - Erro ao processar

---

## Schemas

### livro_codes
```typescript
{
  id: UUID,
  code: string,              // LIVRO-XXXXX
  email: string | null,
  status: 'unused' | 'used' | 'expired',
  generated_at: timestamp,
  used_at: timestamp | null,
  used_by: UUID | null,      // referência a auth.users
  created_by: string,        // 'auto' | 'admin' | 'manual'
  notes: string | null,
  created_at: timestamp,
  updated_at: timestamp
}
```

### livro_code_requests
```typescript
{
  id: UUID,
  full_name: string,
  email: string,
  whatsapp: string | null,
  purchase_location: string | null,
  proof_url: string | null,
  status: 'pending' | 'approved' | 'rejected',
  generated_code_id: UUID | null,
  created_at: timestamp,
  updated_at: timestamp,
  reviewed_at: timestamp | null,
  reviewed_by: UUID | null,
  rejection_reason: string | null
}
```

---

## Fluxos de Trabalho

### Fluxo 1: Cliente Compra Físico
```mermaid
Cliente compra livro físico
    ↓
Vai a /pedir-codigo
    ↓
Preenche formulário (nome, email, whatsapp, onde comprou)
    ↓
POST /api/codes/request
    ↓
Pedido criado com status 'pending'
    ↓
Admin recebe notificação (manual por enquanto)
```

### Fluxo 2: Admin Aprova Pedido
```mermaid
Admin acessa /autora/codigos
    ↓
Tab "Pedidos Pendentes"
    ↓
Clica "Aprovar" no pedido
    ↓
POST /api/codes/approve { action: 'approve' }
    ↓
Sistema gera código automaticamente (LIVRO-XXXXX)
    ↓
Código associado ao pedido
    ↓
Admin copia código e envia por email/WhatsApp (manual)
```

### Fluxo 3: Cliente Usa Código
```mermaid
Cliente recebe código
    ↓
Vai a /registar-livro
    ↓
Insere código + preenche dados
    ↓
POST /api/codes/validate (verifica se válido)
    ↓
Se válido → Cria conta + marca código como 'used'
    ↓
Redirect para /livro (acesso digital)
```

### Fluxo 4: Admin Gera Código Manual
```mermaid
Admin acessa /autora/codigos
    ↓
Tab "Gerar Novo"
    ↓
Preenche email (opcional) + notas
    ↓
POST /api/codes/generate
    ↓
Código gerado (LIVRO-XXXXX)
    ↓
Admin copia e envia ao cliente
```

---

## Exemplos de Uso

### JavaScript/TypeScript

```typescript
// 1. Cliente pede código
const requestCode = async () => {
  const response = await fetch('/api/codes/request', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      full_name: 'Maria Silva',
      email: 'maria@email.com',
      whatsapp: '+258845243875',
      purchase_location: 'Livraria Académica'
    })
  })

  const data = await response.json()
  console.log(data.message)
}

// 2. Validar código
const validateCode = async (code: string) => {
  const response = await fetch('/api/codes/validate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ code })
  })

  const data = await response.json()
  return data.valid
}

// 3. Admin aprova pedido
const approveRequest = async (requestId: string) => {
  const response = await fetch('/api/codes/approve', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      request_id: requestId,
      action: 'approve'
    })
  })

  const data = await response.json()
  console.log('Código gerado:', data.code)
}
```

---

## Rate Limiting (Futuro)

Recomendações:
- `/api/codes/request`: 3 pedidos por IP por hora
- `/api/codes/validate`: 10 validações por minuto
- `/api/codes/generate`: Sem limite (admin)
- `/api/codes/approve`: Sem limite (admin)

---

## Webhooks (Futuro)

Eventos para integração:
- `code.generated` - Código criado
- `code.used` - Código utilizado
- `request.created` - Novo pedido
- `request.approved` - Pedido aprovado
- `request.rejected` - Pedido rejeitado

---

**Versão:** 1.0.0
**Última atualização:** 2025-02-13
