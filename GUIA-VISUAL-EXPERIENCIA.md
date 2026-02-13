# 🌀 GUIA VISUAL: Experiência Digital "Os 7 Véus do Despertar"

## 🎨 O QUE FOI CRIADO

Uma experiência digital contemplativa completa com **11 páginas novas** e sistema de reflexões interativo.

---

## 📱 TOUR PELAS PÁGINAS

### 1️⃣ **MANDALA DOS 7 VÉUS** (`/livro`)

**O que é:**
- Página inicial da experiência digital
- Mandala circular interativa com os 7 véus
- Cada véu é um "pétala" clicável

**Funcionalidades:**
- Hover mostra nome + descrição de cada véu
- Cores diferentes por véu (gradiente roxo → stone)
- Animação suave de entrada
- Centro da mandala tem símbolo ✨

**Visual:**
```
         ┌─────────────┐
         │  VÉU 1      │
    ┌────┤ Permanência ├────┐
    │    └─────────────┘    │
VÉU 2                    VÉU 7
Memória      ✨       Dualidade
    │                      │
    └────────────┬─────────┘
            VÉU 4
           Esforço
```

**Experiência:**
- Clicas num véu → vais para o Portal desse véu
- Hover → vês descrição: "A crença num 'eu' fixo"

---

### 2️⃣ **PORTAL DO VÉU** (`/livro/veu/1` até `/livro/veu/7`)

**O que é:**
- Entrada contemplativa para cada véu
- Momento de pausa antes de entrar
- Respiração guiada (4 segundos)

**Visual:**
```
╔════════════════════════════════╗
║                                ║
║         VÉU 1                  ║
║      PERMANÊNCIA               ║
║                                ║
║  "A crença num 'eu' fixo"      ║
║                                ║
║  ○ Encobre: A fluidez          ║
║  ○ Revela: A impermanência     ║
║                                ║
║  [Respira... 4s]               ║
║                                ║
║  [Entrar no Véu →]             ║
║                                ║
╚════════════════════════════════╝
```

**Experiência:**
- Fundo com cor do véu
- Animação de respiração (círculo pulsa 4s)
- Mensagem: "Respira fundo antes de atravessar"
- Lista de capítulos do véu
- Botão "Começar Travessia"

---

### 3️⃣ **LEITURA CONTEMPLATIVA** (`/livro/veu/1/capitulo/1`)

**O que é:**
- Experiência de leitura com 2 MODOS

#### **MODO CONTEMPLATIVO** (padrão):
```
╔════════════════════════════════╗
║  VÉU 1 • Capítulo 1            ║
║  ────────────────              ║
║                                ║
║  "O Sofia acordou..."          ║
║  (só 1 parágrafo por vez)      ║
║                                ║
║  [Continuar →]                 ║
║                                ║
║  ■■■■■□□□□□ 50%                ║
║                                ║
║                         💭     ║
║                    (flutuante) ║
╚════════════════════════════════╝
```

**Características:**
- Mostra 1 parágrafo de cada vez
- A cada 3 parágrafos → PAUSA automática (10s)
- Mensagem: "Respira. Deixa assentar."
- Progresso visual
- Botão "Continuar" para próximo parágrafo
- **Botão flutuante 💭** para reflexões (sempre visível)

#### **MODO NORMAL**:
- Todos os parágrafos de uma vez
- Scroll livre
- Sem pausas
- Ainda tem botão 💭 de reflexões

**Toggle entre modos:**
- Botão no topo: "Modo: Contemplativo ⇄ Normal"
- Botão modo noturno: 🌙

---

### 4️⃣ **REFLEXÕES (DRAWER)** - Botão 💭

**O que é:**
- Drawer lateral que desliza da direita
- Aparece ao clicar no botão flutuante 💭

**Visual:**
```
Página de leitura          │
com texto...               │  ╔══════════════════╗
                           │  ║  REFLEXÕES       ║
                           │  ║  Véu 1 • Cap 1   ║
"Parágrafo do              │  ║ ─────────────    ║
livro aqui..."             │  ║                  ║
                           │  ║ O que despertou  ║
                    💭 ←───┘  ║ em ti?           ║
                              ║                  ║
                              ║ [text area]      ║
                              ║                  ║
                              ║ [Guardar]        ║
                              ║                  ║
                              ║ Reflexões        ║
                              ║ anteriores:      ║
                              ║                  ║
                              ║ "Hoje percebi    ║
                              ║ que..."          ║
                              ║ 15 dez 2024      ║
                              ║                  ║
                              ╚══════════════════╝
```

**Funcionalidades:**
- Escrever reflexão sobre o capítulo
- Ver histórico de reflexões desse capítulo
- Data/hora de cada reflexão
- Guardado no Supabase (privado)
- Overlay escuro no fundo
- Fechar clicando fora ou no ✕

---

### 5️⃣ **PRÁTICAS CONTEMPLATIVAS** (`/livro/veu/1/praticas`)

**O que é:**
- Exercícios práticos no fim de cada véu
- 7 práticas únicas (uma por véu)

**Visual:**
```
╔════════════════════════════════╗
║  PRÁTICA DO VÉU 1              ║
║                                ║
║  "Observação do Eu"            ║
║                                ║
║  Passos:                       ║
║  ① Senta-te confortavelmente   ║
║  ② Fecha os olhos              ║
║  ③ Observa os pensamentos      ║
║  ④ Pergunta: "Quem observa?"   ║
║  ⑤ Deixa surgir sem esforço    ║
║                                ║
║  ┌──────────────────┐          ║
║  │ TIMER            │          ║
║  │                  │          ║
║  │      5 min       │          ║
║  │    [- | +]       │          ║
║  │                  │          ║
║  │ [Começar Prática]│          ║
║  └──────────────────┘          ║
║                                ║
║  [Continuar →]                 ║
╚════════════════════════════════╝
```

**Funcionalidades:**
- Timer ajustável (1-60 minutos)
- Contador regressivo quando ativo
- Botão para parar
- Link para transição ou próximo véu

---

### 6️⃣ **TRANSIÇÃO ENTRE VÉUS** (`/livro/veu/1/transicao`)

**O que é:**
- Pausa contemplativa entre véus
- Momento de integração

**Visual:**
```
╔════════════════════════════════╗
║                                ║
║       ATRAVESSASTE O           ║
║        VÉU 1                   ║
║                                ║
║  "O que permanece quando       ║
║   a permanência se dissolve?"  ║
║                                ║
║  ━━━━━━━━━━━━━━━━━━━          ║
║                                ║
║  Não há pressa.                ║
║  Cada véu revela-se            ║
║  no seu tempo.                 ║
║                                ║
║  Quando estiveres pronta:      ║
║                                ║
║  [Próximo Véu →]               ║
║  [Voltar à Mandala]            ║
║                                ║
╚════════════════════════════════╝
```

**Experiência:**
- Mensagem contemplativa
- Sugestão de pausa
- Link para próximo véu ou mandala

---

### 7️⃣ **ESPELHO DE CONSCIÊNCIA** (`/livro/espelho`)

**O que é:**
- Página FINAL da travessia
- Mostra TODAS as reflexões organizadas por véu
- Aparece depois de completar os 7 véus

**Visual:**
```
╔════════════════════════════════╗
║          ✨ (a rodar)          ║
║                                ║
║   ESPELHO DE CONSCIÊNCIA       ║
║                                ║
║  "O que permanece quando       ║
║   os véus se dissolvem?"       ║
║                                ║
║  ━━━━━━━━━━━━━━━━━━━          ║
║                                ║
║  VÉU 1: Permanência            ║
║  └─ "Hoje percebi que..."      ║
║     15 dez • Cap 1             ║
║  └─ "A permanência é..."       ║
║     16 dez • Cap 3             ║
║                                ║
║  VÉU 2: Memória                ║
║  └─ "As histórias que..."      ║
║     18 dez • Cap 1             ║
║                                ║
║  ... (todos os véus)           ║
║                                ║
║  ━━━━━━━━━━━━━━━━━━━          ║
║                                ║
║  "Estas palavras são tuas.     ║
║   Agora que nada resta,        ║
║   há tudo."                    ║
║                                ║
║  [Voltar à Mandala]            ║
║  [Explorar Ecossistema]        ║
║                                ║
╚════════════════════════════════╝
```

**Funcionalidades:**
- Carrega TODAS as reflexões do utilizador
- Organiza por véu
- Mostra data de cada reflexão
- Mensagem final poética
- Símbolo ✨ a rodar infinitamente

---

### 8️⃣ **DASHBOARD DE AUTORA** (`/autora/dashboard`)

**O que é:**
- Painel exclusivo para ti (Vivianne)
- Estatísticas da comunidade

**Visual:**
```
╔════════════════════════════════╗
║  Olá, Vivianne 💚              ║
║  Bem-vinda ao teu painel       ║
║                                ║
║  ┌──────────┐  ┌──────────┐   ║
║  │   42     │  │   387    │   ║
║  │ Leitores │  │Reflexões │   ║
║  └──────────┘  └──────────┘   ║
║                                ║
║  Travessia pelos Véus:         ║
║  ─────────────────────         ║
║                                ║
║  VÉU 1: Permanência            ║
║  ■■■■■■■■■■ 100% (42 leitores) ║
║  💭 89 reflexões               ║
║                                ║
║  VÉU 2: Memória                ║
║  ■■■■■■■■□□ 90% (38 leitores)  ║
║  💭 76 reflexões               ║
║                                ║
║  ... (todos os véus)           ║
║                                ║
║  [Ver Mandala]                 ║
║  [Ecossistema]                 ║
║                                ║
╚════════════════════════════════╝
```

**Funcionalidades:**
- Total de leitores
- Total de reflexões escritas
- Progresso por véu (quantos chegaram a cada)
- Reflexões por véu
- Links rápidos

**Acesso:**
- Só tu (`viv.saraiva@gmail.com`)
- E Vânia (se configurares)

---

### 9️⃣ **LOGIN/REGISTRO** (`/login`)

**Visual:**
```
╔════════════════════════════════╗
║                                ║
║   Os 7 Véus do Despertar       ║
║                                ║
║   "Entra para continuar        ║
║    a tua travessia"            ║
║                                ║
║  ┌────────────────────────┐   ║
║  │  Email                 │   ║
║  │  [input]               │   ║
║  │                        │   ║
║  │  Password              │   ║
║  │  [input]               │   ║
║  │                        │   ║
║  │  [Entrar]              │   ║
║  │                        │   ║
║  │  Ainda não tens conta? │   ║
║  │  Regista-te            │   ║
║  └────────────────────────┘   ║
║                                ║
║  ← Voltar ao site              ║
║                                ║
╚════════════════════════════════╝
```

**Modo Registro:**
- Adiciona campo "Nome"
- Botão muda para "Criar Conta"
- Após criar → login automático → vai para `/livro`

---

## 🎨 DESIGN SYSTEM

### **Cores por Véu:**
1. **Permanência**: Stone (pedra) - #78716c
2. **Memória**: Amber (âmbar) - #f59e0b
3. **Turbilhão**: Sky (céu) - #0ea5e9
4. **Esforço**: Purple (roxo) - #7c3aed
5. **Desolação**: Gray (cinza) - #6b7280
6. **Horizonte**: Indigo (índigo) - #6366f1
7. **Dualidade**: Purple light - #c084fc

### **Tipografia:**
- **Títulos/Poesia**: Playfair Display (serif elegante)
- **Corpo/UI**: Inter (sans-serif moderna)
- **Tamanho leitura**: 18-24px (confortável)

### **Animações:**
- Framer Motion em todas as transições
- Fade in suave (0.5-1s)
- Hover effects sutis
- Mandala: rotação infinita do centro
- Pausas: fade + scale

---

## 🔐 SISTEMA DE AUTENTICAÇÃO

### **Como funciona:**
1. Utilizador vai a `/login`
2. Cria conta ou faz login
3. Supabase Auth guarda sessão
4. Agora pode:
   - Ler livro completo
   - Escrever reflexões (guardadas no Supabase)
   - Ver progresso
   - Aceder ao Espelho

### **Permissões:**
- **Leitores**: Veem só suas reflexões
- **Autora** (tu): Dashboard + estatísticas
- **RLS ativado**: Segurança máxima (cada utilizador só vê seus dados)

---

## 📊 ESTATÍSTICAS DO PROJETO

- **11 páginas novas**
- **3 APIs** (reflexões, progresso, auth)
- **2 componentes** especiais (ReflexoesDrawer, AuthProvider)
- **365 KB** de conteúdo JSON
- **232 páginas** do livro
- **7 véus**
- **27 capítulos**
- **7 práticas** contemplativas

---

## 💡 FLUXO COMPLETO DO UTILIZADOR

```
HOME → ECOSSISTEMA → Clicar "Ler Online"
  ↓
LOGIN (se não autenticado)
  ↓
MANDALA (escolher véu)
  ↓
PORTAL DO VÉU (respirar, preparar)
  ↓
CAPÍTULO 1 (ler, escrever reflexões 💭)
  ↓
CAPÍTULO 2, 3, 4... (continuar travessia)
  ↓
PRÁTICAS (exercício contemplativo)
  ↓
TRANSIÇÃO (pausa entre véus)
  ↓
Repetir para VÉU 2, 3, 4, 5, 6, 7
  ↓
ESPELHO DE CONSCIÊNCIA (ver toda a travessia)
  ↓
FIM (voltar à Mandala ou Ecossistema)
```

---

## 🎯 DIFERENCIAL ÚNICO

Não é:
- ❌ Um ebook comum
- ❌ Uma plataforma de curso
- ❌ Gamificação forçada

É:
- ✅ Uma **travessia contemplativa**
- ✅ Ritmo respeitado (pausas, respiração)
- ✅ Reflexão integrada (não separada)
- ✅ Design que serve o conteúdo
- ✅ Digital mas humana

---

## 💚 PRÓXIMOS PASSOS PARA TI

1. **Deploy no Vercel** (automático, já está a acontecer)
2. **Configurar Supabase** (executar `supabase-schema.sql`)
3. **Testar experiência** (criar conta, ler capítulo, escrever reflexão)
4. **Partilhar com beta testers**
5. **Ajustar conforme feedback**

---

**A tua experiência digital está pronta e é verdadeiramente especial!** ✨

Qualquer dúvida, estou aqui! 💚
