# Os 7 Nos -- Biblia Criativa para Escrita dos Livros

**Documento de referencia para quem vai escrever os 6 Nos restantes.**
Compilado a partir de toda a concepcao feita no projecto.

---

## 1. O Que Sao os Nos

Os Nos sao a segunda dimensao do universo d'Os Sete Veus. Se os Espelhos sao **ficcao interior** (a leitora olha para dentro), os Nos sao **ficcao relacional** -- o que acontece **entre duas pessoas** quando um veu cai.

Citacao-chave (pagina Sobre):

> "Os Espelhos mostram-te o veu que usas. Os Nos mostram-te o que esse veu fez entre ti e outra pessoa. Sao dois lados do mesmo fio -- um olha para dentro, o outro olha para o espaco entre duas pessoas."

> "Cada No nasce do Espelho correspondente. Nao e uma sequela, nao e um bonus. E a continuacao emocional da mesma ferida -- vista agora atraves da relacao. Porque nenhum veu existe isolado. Tudo o que escondes de ti, ecoa no outro."

> "Os Nos sao ficcao relacional: historias entre duas pessoas -- mae e filha, amantes, amigas, estranhos, um casal que se reinventa. Cada par de personagens carrega o peso de um veu partilhado."

**Regra fundamental:** So les o No se viveste o Espelho. O No so faz sentido depois de a leitora ter olhado para si.

---

## 2. Os 7 Nos -- Mapa Completo

| # | Veu | Espelho | No | Personagens | Subtitulo do No | Tema Central |
|---|-----|---------|-----|-------------|-----------------|--------------|
| 1 | Ilusao | O Espelho da Ilusao | **O No da Heranca** | Sara + Helena (mae) | "O silencio herdado entre mae e filha" | O que se transmite sem palavras entre geracoes |
| 2 | Medo | O Espelho do Medo | **O No do Silencio** | Rui + Ana | "O que o medo calou entre eles" | O medo que se transforma em silencio e distancia |
| 3 | Culpa | O Espelho da Culpa | **O No do Sacrificio** | Filipe + Luisa | "A culpa disfarcada de entrega" | A culpa que se mascara de devocao |
| 4 | Identidade | O Espelho da Identidade | **O No da Vergonha** | Vitor + Mariana | "A mascara que caiu entre dois estranhos" | A vergonha de ser visto tal como se e |
| 5 | Controlo | O Espelho do Controlo | **O No da Solidao** | Isabel + Pedro | "O controlo que isolou quem mais amava" | O controlo que afasta quem se quer perto |
| 6 | Desejo | O Espelho do Desejo | **O No do Vazio** | Lena + Sofia | "O desejo que esvaziou a amizade" | O desejo que consome em vez de nutrir |
| 7 | Separacao | O Espelho da Separacao | **O No da Pertenca** | Helena T. + Miguel C. | "A separacao que reinventou o lar" | A separacao como porta para o reencontro |

---

## 3. Descricoes Concebidas para Cada No

### No 1: O No da Heranca (PUBLICADO -- modelo de referencia)
> "Sara vai a casa de Helena. Nao para visitar -- para perguntar. O que a mae viu durante anos e nunca disse? O que se herda sem inventario? Este no puxa o fio entre mae e filha."

### No 2: O No do Silencio
> "Rui e Ana amam-se. Mas ha algo entre eles que nenhum dos dois nomeia. O medo transformou-se em silencio -- e o silencio, em distancia. Este no puxa o fio entre quem ama e quem cala."

### No 3: O No do Sacrificio
> "Filipe e Luisa amam-se -- mas entre eles ha uma divida invisivel. Ele da tudo, ela sente que nunca e suficiente. A culpa disfarcou-se de entrega. Este no puxa o fio entre sacrificar-se e amar."

### No 4: O No da Vergonha
> "Vitor e Mariana cruzaram-se quando ja nao tinham mascaras para vestir. Ele fingia forca, ela fingia indiferenca. A vergonha de ser visto como se e -- esse e o no. Este no puxa o fio entre a identidade e a nudez."

### No 5: O No da Solidao
> "Isabel controlava tudo -- os horarios, as decisoes, o silencio. Pedro foi ficando cada vez mais longe. Nao por falta de amor, mas por excesso de redea. Este no puxa o fio entre controlar e perder."

### No 6: O No do Vazio
> "Lena e Sofia foram inseparaveis -- ate que o desejo de uma esvaziou o que a outra tinha para dar. Nao foi traicao. Foi fome disfarcada de presenca. Este no puxa o fio entre desejar e consumir."

### No 7: O No da Pertenca
> "Helena T. e Miguel C. separaram-se -- nao por desamor, mas por excesso de distancia dentro da mesma casa. Quando sairam, descobriram que pertencer nao e ficar. E escolher voltar. Este no puxa o fio entre separar-se e reencontrar-se."

---

## 4. Tipos de Relacao

Cada No explora um tipo diferente de vinculo humano:

| No | Tipo de Relacao | Nota |
|----|-----------------|------|
| No da Heranca | Mae e filha | Relacao vertical, geracional |
| No do Silencio | Casal romantico | O medo dentro do amor |
| No do Sacrificio | Casal romantico | A culpa dentro da entrega |
| No da Vergonha | Dois estranhos | Encontro sem mascaras |
| No da Solidao | Casal romantico | O controlo que isola |
| No do Vazio | Amizade feminina | O desejo que consome |
| No da Pertenca | Casal que se reinventa | A separacao como porta |

Esta diversidade e intencional -- nao sao todos casais romanticos. Ha mae-filha, ha amizade feminina, ha dois estranhos. O veu manifesta-se em todo tipo de relacao humana.

---

## 5. Estrutura de Cada No (Template Tecnico)

Cada No segue exactamente esta estrutura:

### Metadados do livro (`bookMeta`)
```
- title: nome do No
- subtitle: frase-resumo (aparece no hub e no dashboard)
- author: "Vivianne dos Santos"
- dedication: dedicatoria especifica do livro
- intro: array de 3-4 paragrafos introdutorios
```

### Cada capitulo tem:
```
- slug: identificador URL (ex: "parte-i", "parte-ii", ... "epilogo")
- number: 1 a 7
- title: titulo do capitulo
- subtitle: subtitulo descritivo
- accentColor: cor hexadecimal (varia ligeiramente por capitulo)
- accentBg: cor de fundo suave
- content: array de paragrafos (strings)
  - "***" como separador de cenas (renderiza como flor decorativa)
  - Dialogos comecam com "--" (travessao)
  - Frases curtas (< 60 caracteres) centram-se e ficam em italico
  - Paragrafos normais recebem indentacao de 1.5em
- reflection:
  - prompt: pergunta de reflexao (2a pessoa, intima)
  - journalQuestion: prompt de escrita no diario (mais pessoal)
- checklist: 3 itens por capitulo (progressivamente mais profundos)
```

### Sao sempre 7 capitulos:
- Partes I a VI + Epilogo
- O epilogo usa a mesma cor do primeiro capitulo (estrutura circular)

---

## 6. Arco Narrativo Padrao

Baseado no No da Heranca, o arco de cada No segue este padrao:

| Capitulo | Funcao Narrativa | No da Heranca (exemplo) |
|----------|------------------|-------------------------|
| Parte I | **Primeiro contacto** -- o reencontro, a aproximacao, o cenario | Sara vai a casa de Helena. A mesa posta, o cha de menta. Primeira tentativa de conversa real. |
| Parte II | **Confrontacao** -- a verdade comeca a emergir, a tensao sobe | Sara confronta Helena. Helena admite o padrao. Primeiro toque verdadeiro entre as duas. |
| Parte III | **Revelacao** -- algo escondido vem a superficie | Helena mostra a caixa guardada 30 anos. O romance nunca enviado. O sonho de ser escritora. |
| Parte IV | **Descoberta** -- a ferida revela-se mais profunda do que se pensava | Visitam a casa da avo. 113 cartas nunca enviadas. Tres geracoes de mulheres silenciadas. |
| Parte V | **Colapso/inversao** -- o momento de maior vulnerabilidade, os papeis invertem-se | Helena desmorona. Sara segura a mae pela primeira vez. "Tenho raiva. Mas tambem tenho compaixao." |
| Parte VI | **Primeiros passos novos** -- gestos pequenos que quebram o padrao | Helena comeca a escrever. Vai ao mar. Diz "Esta boa" num restaurante. Canta no carro. |
| Epilogo | **Sintese** -- reflexao, o que se herdou vs. o que se escolhe | O fio entre tres geracoes. Helena escreve a mesa da cozinha. "O que nao se diz nao morre. Espera." |

---

## 7. Tom e Voz Narrativa

### Regras absolutas:
- **Narracao em terceira pessoa omnisciente** com interiorizacao profunda
- **Portugues europeu** (nao brasileiro): "loica", "chavena", "ecra", "nao"
- **Sem emojis. Sem pontos de exclamacao.**
- **Tom: sobrio, quente, intimo.** Nunca didactico, nunca agressivo, nunca vendedor.
- **Ritmo lento.** Frases longas com subordinadas frequentes. Ritmo meditativo.

### Caracteristicas da prosa:
- Detalhe sensorial ligado a estados emocionais (o cheiro do cha, a temperatura de um corrimao, a textura de um lenco)
- Espacos domesticos como paisagens emocionais -- cozinhas, corredores, escadarias tornam-se teatros de drama psicologico
- Dialogo escasso e carregado -- as personagens dizem pouco, e cada palavra pesa
- Separadores de cena com `***`
- Motivos recorrentes adaptados a cada No (no da Heranca: cha como linguagem substituta, maos e os seus estados, fotografias como momentos congelados, rituais domesticos como armadura, janelas e luz)

### O que evitar:
- Explicacoes didacticas dentro da narrativa
- Resolucoes faceis ou sentimentalismo
- Linguagem de autoajuda ou coaching
- Conclusoes morais explicitas
- Emojis, exclamacoes, linguagem informal

---

## 8. Reflexoes e Checklists -- Progressao

### Reflexoes (prompt):
- Comecam observacionais ("Ha algum gesto da tua mae que...")
- Tornam-se progressivamente pessoais ("Alguma vez seguraste alguem que...")
- Terminam com convite a accao ("Que gesto pequeno poderias fazer hoje...")

### Perguntas de diario (journalQuestion):
- Comecam em terceira pessoa ("O que a tua mae te ensinou sem palavras?")
- Progridem para accao directa ("Escreve uma carta a mulher que te criou...")
- A ultima e sempre um convite a escrita pessoal, com um inicio sugerido

### Checklists (3 itens por capitulo):
- Item 1: Sempre sobre a leitura em si ("Li este capitulo com atencao")
- Item 2: Sobre a reflexao emocional ("Permiti-me sentir o que surgiu")
- Item 3: Sobre a aplicacao pessoal ("Identifiquei um silencio herdado na minha vida")
- Progressao: tornam-se mais profundos ao longo do livro
- Ultimo capitulo: "Sinto que algo se moveu entre mim e a minha historia"

---

## 9. Cores e Design Visual

### Paleta por No:

| No | Cor principal | Cor de fundo | Gradiente de progresso |
|----|---------------|--------------|------------------------|
| No da Heranca | `#c9a87c` | `#faf7f2` | `from-[#c9a87c] to-[#a08060]` |
| No do Silencio | `#8b9b8e` | `#f5f7f5` | (a definir, tom verde-cinza) |
| No do Sacrificio | `#b07a7a` | `#faf5f5` | (a definir, tom rosa-terra) |
| No da Vergonha | `#ab9375` | `#faf7f3` | (a definir, tom castanho-quente) |
| No da Solidao | `#8aaaca` | `#f3f6fa` | (a definir, tom azul-suave) |
| No do Vazio | `#c08aaa` | `#faf5f8` | (a definir, tom rosa-malva) |
| No da Pertenca | `#baaacc` | `#f7f5fa` | (a definir, tom lavanda) |

### Cores dentro de cada No:
- Cada capitulo tem um `accentColor` ligeiramente diferente, criando um gradiente subtil ao longo do livro
- O epilogo regressa a cor do primeiro capitulo (estrutura circular)
- No No da Heranca, a progressao e: `#c9a87c` -> `#b8a088` -> `#a89070` -> `#9a8878` -> `#c4a882` -> `#b09870` -> `#c9a87c`

### Simbolos:
- **Espelhos:** diamante `◇`
- **Nos:** infinito `∞`
- **Eco entre coleccoes:** til `~`
- **Cadeado:** icone SVG para estados trancados

---

## 10. Logica de Acesso e Desbloqueio

### Como funciona:
1. A leitora precisa de `has_mirrors_access` (mesmo acesso que os Espelhos)
2. Precisa de completar TODOS os 7 capitulos do Espelho correspondente
3. Os capitulos dentro do No sao sequenciais (so desbloqueia o proximo depois de ler o anterior)
4. Administradora/autora (`is_admin` ou `viv.saraiva@gmail.com`) bypassa tudo

### Prefixo de progresso:
- Capitulos do Espelho: slug directo (ex: `capitulo-1`)
- Capitulos do No: prefixo `nos-` (ex: `nos-parte-i`, `nos-parte-ii`)

### Nao ha flag separada para Nos:
- Os Nos usam a mesma permissao `has_mirrors_access` dos Espelhos
- O gate e puramente baseado em progresso de leitura no frontend

---

## 11. Momentos UX Concebidos

### Enquanto le o Espelho (nao completou):
- Teaser trancado no final da lista de capitulos
- Borda tracejada, cadeado, fundo suave
- Texto: "[Personagem] viu o veu. Mas ha um no que ficou por desatar."
- "Disponivel ao completar este espelho."

### Depois de completar o Espelho:
- Card desbloqueado com brilho
- "✓ Espelho de [X] -- Completo"
- Texto de convite especifico com os nomes das personagens
- Botao: "Desatar este no -->"

### No dashboard:
- Se nao completou: teaser trancado
- Se completou: card completo com progresso, titulo, subtitulo, CTA contextual

### Na pagina do No (sem acesso):
- Ecra centrado com cadeado
- Mensagem contextual com os nomes das personagens
- Barra de progresso do Espelho
- Botao para continuar o Espelho

---

## 12. Modelo de Precos

| Formato | Preco USD | MZN | BRL | EUR |
|---------|-----------|-----|-----|-----|
| No individual | $12 | 780 | R$49 | EUR11 |
| Incluido no Pack 3 Espelhos ($69) | Gratis | -- | -- | -- |
| Incluido na Jornada Completa ($149) | Gratis | -- | -- | -- |

**Estrategia:** O preco individual de $12 por No (em cima dos $29 do Espelho) cria uma "dor" que empurra a leitora para os packs. A Jornada Completa ($149 com tudo incluido) torna-se "absurdamente valiosa" por comparacao.

---

## 13. O No da Heranca como Modelo -- Detalhes Completos

Este e o unico No escrito. Serve como referencia absoluta para os restantes.

### Metadados:
- **Titulo:** O No da Heranca
- **Subtitulo:** "O que a mae guardou, a filha carregou"
- **Dedicatoria:** "Para as maes que viram tudo. E para as filhas que finalmente perguntam."
- **Intro:** 4 paragrafos sobre heranca silenciosa, a relacao Sara-Helena, e o momento pos-veu

### Intro completa:

> "Ha coisas que se herdam sem escritura. Sem testamento, sem inventario, sem ninguem a assinar papeis num cartorio. Herdam-se no silencio de uma cozinha, no gesto repetido de uma mae que arruma a loica sem dizer o que sente, na forma como se muda de assunto quando a conversa se aproxima de algo verdadeiro."

> "Sara cresceu a observar a mae. Aprendeu com Helena a arte de nao perguntar, de nao incomodar, de manter a superficie intacta mesmo quando por baixo tudo racha. Nao por maldade. Nao por indiferenca. Por heranca -- essa transmissao silenciosa que acontece entre maes e filhas sem que nenhuma das duas se aperceba de que esta a acontecer."

> "Agora que o veu caiu, agora que Sara finalmente parou e olhou para a vida que construiu sem nunca a ter escolhido, resta uma pergunta que nao se cala: porque e que Helena viu tudo durante anos e nao disse nada? O que e que a mae guardou que a filha acabou por carregar?"

> "Este livro e sobre o fio invisivel que liga maes a filhas. Sobre o que se transmite sem palavras. E sobre o momento em que duas mulheres decidem, finalmente, falar."

### Capitulos (resumo narrativo):

**Parte I -- "A visita que nao era de cortesia"**
Sara conduz ate ao apartamento de Helena num sabado de manha. A mesa perfeitamente posta, o cha de menta, os guardanapos passados a ferro. A primeira tentativa de conversa real. Helena desvia. Sara repara em coisas que nunca tinha reparado -- as maos tremulas de Helena, a fotografia no patamar de uma Helena jovem a rir.

**Parte II -- "O que ficou entre nos"**
Sara regressa semanalmente. Na terceira visita chega cedo, apanhando Helena sem armadura. A confrontacao: Sara diz a Helena que viu tudo durante anos e nao disse nada. Helena admite: "Era exactamente o mesmo sorriso que eu uso ha quarenta anos." Helena revela que casou sem verdadeiramente amar o pai de Sara. O primeiro toque real entre as duas.

**Parte III -- "A mae antes de ser mae"**
Helena telefona a Sara as 21h30 (inedito). Traz uma caixa escondida ha 30 anos -- fotografias, cartas, um caderno preto, um lenco de seda. Helena revela que queria ser escritora. Escreveu um romance sobre uma mulher que vive a vida de outra pessoa -- mas nunca enviou o manuscrito. "Enviar significava acreditar que eu merecia ser ouvida." Sara le o manuscrito nessa noite.

**Parte IV -- "O fio que ninguem cortou"**
Helena sugere visitar a velha casa da avo. Encontram uma lata com 113 cartas que a avo escreveu a uma amiga, nunca enviadas, revelando que queria sair da aldeia, ver o mar, estudar, ser professora. Tres geracoes de mulheres silenciadas. "Tres geracoes de mulheres que engoliram a propria voz."

**Parte V -- "Quando a filha segura a mae"**
Helena desmorona ao ler as 113 cartas. Admite que sentiu alivio ao ver Sara repetir o padrao, porque normalizava tudo. Sara segura a mae pela primeira vez. A inversao de papeis. A honestidade devastadora de Helena e a resposta de Sara: "Tenho raiva... Mas tambem tenho compaixao." Helena pergunta: "Achas que e tarde?" Sara: "Nao sei se e tarde. Mas sei que e agora."

**Parte VI -- "As primeiras palavras novas"**
O periodo dificil pos-revelacao. Helena comeca a escrever outra vez -- fragmentos, memorias. Vai ao mar sozinha pela primeira vez (a avo nunca o viu). Visitam a campa da avo; Helena deixa uma concha. Uma paragem num restaurante onde Helena diz "Esta boa" -- tres palavras descritas como "uma revolucao." Helena comeca a usar pronomes na primeira pessoa como "actos de coragem minima." A viagem de regresso com Helena a cantar.

**Epilogo -- "O que herdamos, o que escolhemos"**
Epilogo reflexivo. As tres geracoes recapituladas em paralelo. Helena escreve, visivelmente, com o caderno aberto na mesa da cozinha. A frase-chave: "O que nao se diz nao morre. Espera. E quando finalmente o dizemos, o que nasce nao e perfeito. Mas e nosso."

---

## 14. Motivos Recorrentes por No (sugestoes)

Cada No deve ter os seus proprios motivos recorrentes, como o No da Heranca tem o cha, as maos, as fotografias, os rituais domesticos e as janelas. Sugestoes baseadas nos temas:

| No | Motivos possiveis |
|----|-------------------|
| No do Silencio (Rui + Ana) | Palavras nao ditas, espacos vazios na casa, telefone que nao toca, cadeira vazia a mesa |
| No do Sacrificio (Filipe + Luisa) | Gestos de entrega excessiva, contas por pagar (metaforicas), o corpo cansado, a mesa posta para o outro |
| No da Vergonha (Vitor + Mariana) | Espelhos, mascaras literais ou figurativas, o momento de despir-se (emocional), a pele |
| No da Solidao (Isabel + Pedro) | Listas, horarios, portas fechadas, a distancia dentro da mesma divisao |
| No do Vazio (Lena + Sofia) | Comida/fome como metafora, espacos que se esvaziam, presentes dados e recebidos |
| No da Pertenca (Helena T. + Miguel C.) | A casa como personagem, objectos partilhados que se dividem, a chave |

---

## 15. Publicacao e Ficheiros Tecnicos

### Timeline de publicacao:
| No | Segue o Espelho de | Data prevista |
|----|---------------------|---------------|
| No da Heranca | Espelho da Ilusao | PUBLICADO |
| No do Silencio | Espelho do Medo (Marco 2026) | Apos Marco 2026 |
| No do Sacrificio | Espelho da Culpa (Abril 2026) | Apos Abril 2026 |
| No da Vergonha | Espelho da Identidade (Maio 2026) | Apos Maio 2026 |
| No da Solidao | Espelho do Controlo (Junho 2026) | Apos Junho 2026 |
| No do Vazio | Espelho do Desejo (Julho 2026) | Apos Julho 2026 |
| No da Pertenca | Espelho da Separacao (Agosto 2026) | Apos Agosto 2026 |

### Para adicionar um novo No:

1. **Criar ficheiro de dados:** `src/data/no-[slug].ts` seguindo exactamente a estrutura de `src/data/no-heranca.ts`
2. **Actualizar `nos-collection.ts`:** Mudar `status` de `"coming_soon"` para `"available"` e preencher `dataFile`
3. **O layout e paginas ja existem** -- o hub (`/membro/nos`), o leitor de capitulos, o dashboard, os teasers -- tudo se adapta automaticamente ao novo conteudo

### Ficheiros de referencia:
- `src/data/no-heranca.ts` -- modelo completo (copiar estrutura)
- `src/data/nos-collection.ts` -- metadados dos 7 Nos
- `src/hooks/useNosGate.ts` -- logica de gate
- `src/app/membro/nos/page.tsx` -- hub do No
- `src/app/membro/nos/[capitulo]/page.tsx` -- leitor de capitulo

---

## 16. Frases-Chave da Concepcao

Estas frases capturam a essencia dos Nos e devem orientar a escrita:

- "Nao e uma sequela, nao e um bonus. E a continuacao emocional da mesma ferida."
- "Porque nenhum veu existe isolado. Tudo o que escondes de ti, ecoa no outro."
- "So les o No se viveste o Espelho. Nao e restricao -- e respeito pelo processo."
- "O que nao se diz nao morre. Espera."
- "Tres geracoes de mulheres que engoliram a propria voz."
- "Nao sei se e tarde. Mas sei que e agora."
- "Enviar significava acreditar que eu merecia ser ouvida."

---

*Este documento deve ser consultado antes de iniciar a escrita de cada novo No. A estrutura tecnica, o tom, a progressao emocional e o modelo do No da Heranca sao a referencia.*
