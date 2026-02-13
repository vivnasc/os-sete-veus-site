# 🌀 Setup: Experiência Digital "Os 7 Véus do Despertar"

## ✨ O QUE FOI CRIADO

Uma experiência digital contemplativa completa para o livro "Os 7 Véus do Despertar", incluindo:

### Páginas Criadas:
1. **Mandala dos 7 Véus** (`/livro`) - Navegação visual interativa
2. **Portal do Véu** (`/livro/veu/[numero]`) - Entrada contemplativa para cada véu
3. **Leitura Contemplativa** (`/livro/veu/[numero]/capitulo/[capitulo]`) - Experiência de leitura com 2 modos
4. **Práticas Contemplativas** (`/livro/veu/[numero]/praticas`) - Exercícios práticos por véu
5. **Transição entre Véus** (`/livro/veu/[numero]/transicao`) - Página de reflexão
6. **Espelho de Consciência** (`/livro/espelho`) - Página final épica com todas as reflexões
7. **Área de Autora** (`/autora/dashboard`) - Dashboard com estatísticas

### Funcionalidades:
- ✅ Sistema de Reflexões/Diário (drawer lateral)
- ✅ Autenticação com Supabase
- ✅ Modo Contemplativo (parágrafo a parágrafo + pausas)
- ✅ Modo Normal (leitura livre)
- ✅ Modo Noturno
- ✅ Progresso de leitura
- ✅ Timer contemplativo
- ✅ Design evolutivo (cores diferentes por véu)

---

## 🚀 PASSOS PARA ATIVAR

### 1. Configurar Supabase

1. Vai ao **Supabase Dashboard**: https://supabase.com/dashboard
2. Abre o projeto existente (já está configurado!)
3. Vai a **SQL Editor**
4. Copia o conteúdo de `supabase-schema.sql`
5. Cola e executa no SQL Editor
6. ✅ Tabelas criadas!

### 2. Verificar Variáveis de Ambiente

Já tens o `.env.local` configurado com:
```
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
```

### 3. Testar Localmente

```bash
npm run dev
```

Depois abre:
- Mandala: http://localhost:3000/livro
- Login: http://localhost:3000/login

### 4. Criar Primeira Conta

1. Vai a `/login`
2. Regista-te com **viv.saraiva@gmail.com** (será automaticamente admin)
3. Ou regista outra conta (será leitor normal)

### 5. Testar Funcionalidades

- ✅ Clica na Mandala
- ✅ Entra num véu
- ✅ Lê um capítulo
- ✅ Clica no botão flutuante 💭 (reflexões)
- ✅ Escreve uma reflexão
- ✅ Vai ao Espelho de Consciência

---

## 📁 ESTRUTURA DE FICHEIROS CRIADOS

```
src/
├── app/
│   ├── api/
│   │   ├── reflexoes/route.ts          # API de reflexões
│   │   └── progresso/route.ts          # API de progresso
│   ├── livro/
│   │   ├── page.tsx                    # Mandala
│   │   ├── veu/[numero]/
│   │   │   ├── page.tsx                # Portal do Véu
│   │   │   ├── capitulo/[capitulo]/
│   │   │   │   └── page.tsx            # Leitura
│   │   │   ├── praticas/page.tsx       # Práticas
│   │   │   └── transicao/page.tsx      # Transição
│   │   └── espelho/page.tsx            # Espelho Final
│   └── autora/
│       └── dashboard/page.tsx          # Dashboard Autora
├── components/
│   └── ReflexoesDrawer.tsx             # Componente de reflexões
└── data/
    └── livro-7-veus.json               # Todo o conteúdo (365 KB)

Extras:
├── supabase-schema.sql                 # SQL para criar tabelas
└── SETUP-EXPERIENCIA-DIGITAL.md        # Este ficheiro
```

---

## 🎨 DESIGN

### Cores por Véu:
1. **Permanência** - Stone (pedra)
2. **Memória** - Amber (âmbar)
3. **Turbilhão** - Sky (céu)
4. **Esforço** - Purple (roxo)
5. **Desolação** - Gray (cinza)
6. **Horizonte** - Indigo (índigo)
7. **Dualidade** - Purple (roxo claro)

### Tipografia:
- **Títulos**: Playfair Display (serif)
- **Corpo**: Inter (sans-serif)
- **Tamanho**: 18-24px (leitura confortável)

---

## 🔐 PERMISSÕES

### Leitor Normal:
- Ler todos os capítulos
- Escrever reflexões
- Ver seu próprio progresso
- Aceder ao Espelho de Consciência

### Autora (viv.saraiva@gmail.com):
- Tudo que leitor normal tem +
- Dashboard com estatísticas
- Ver quantos leitores por véu
- Ver total de reflexões

---

## 🐛 TROUBLESHOOTING

### Erro: "reflexoes table does not exist"
➡️ Executa `supabase-schema.sql` no Supabase SQL Editor

### Reflexões não aparecem
➡️ Verifica se estás autenticado (logged in)

### Mandala não aparece
➡️ Verifica se `src/data/livro-7-veus.json` existe

### Dashboard de autora não acessível
➡️ Verifica se teu email é exatamente `viv.saraiva@gmail.com`

---

## 📊 PRÓXIMOS PASSOS (OPCIONAL)

- [ ] Adicionar áudio guiado (meditações)
- [ ] Exportar reflexões em PDF
- [ ] Partilhar reflexões (opcional)
- [ ] Notificações (email quando novo capítulo)
- [ ] Comunidade (fórum de leitores)

---

## 💚 PRONTO!

A experiência digital está completa e pronta para usar!

**Testa agora:** http://localhost:3000/livro

