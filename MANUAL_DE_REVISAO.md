# Manual de Revisão — BOOKs

**Metodologia de revisão para ficção literária assistida por IA.**
Construído a partir da revisão real de cinco manuscritos: Sal, A Frequência Certa, Teias Soltas, O Que Ficou por Dizer, O Peso do Badamo.

---

## I. Princípios Fundadores

### 1. Cortar, nunca reescrever

A revisão retira o que está a mais. Não adiciona frases novas, não reformula, não "melhora". A voz da autora é sagrada — o revisor é um podador, não um jardineiro.

Se uma passagem não funciona e não pode ser simplesmente cortada, marca-se para reavaliação humana. Nunca se substitui por texto novo.

### 2. Mostrar substitui explicar

Se o leitor já sentiu, o narrador não precisa de confirmar. A regra de ouro de cada corte:

> *A frase seguinte acrescenta informação nova ou confirma o que a cena já fez?*
> Se confirma — eliminar.

Isto aplica-se a sobre-explicações, processamento emocional, e manifestos filosóficos.

### 3. O silêncio é mais forte que a explicação

Um capítulo que termina em "Não chorou. Mas os olhos molharam." é mais forte do que seis linhas a explicar o que as lágrimas significam. Os melhores cortes desta revisão foram sempre os que deixaram o silêncio trabalhar.

### 4. O diálogo não se toca

Diálogos de personagens nunca são alterados sem autorização explícita da autora. A revisão trabalha à volta dos diálogos — corta o que vem antes ou depois, mas as palavras das personagens são invioláveis.

### 5. Os objectos simbólicos são sagrados

Cada livro tem objectos que reaparecem com carga narrativa: o terceiro pilar, as pedras, a mancha cinzenta, as flores azuis, as chávenas, a capulana, o sal. Nunca remover, alterar ou reduzir descrições destes objectos sem confirmação.

### 6. Português europeu sempre

Todo o texto segue o Acordo Ortográfico de 1990 (AO90) em português europeu. Nunca converter para português do Brasil. Manter "telemóvel", "autocarro", "chávena", "ecrã", etc.

---

## II. Controlo de Versões

### Regra fundamental: uma versão é uma fotografia

Uma vez criada, não se toca. Cada versão congela o estado do manuscrito naquela fase.

| Versão | Quando se cria | O que contém |
|---|---|---|
| `_COMPLETO` | Após terminar todos os capítulos | Compilação crua, sem revisão |
| `_REVISTO` | Após cortes estruturais | Sem sobre-explicações, manifestos, redundâncias |
| `_LIMPO` | Após limpeza de vícios mecânicos | Sem tiques IA, padrões repetidos |
| `_FINAL` | Pronto para impressão | Ortografia verificada, nomes consistentes |

**Como avançar de versão:**
```
cp LIVRO_REVISTO.md LIVRO_LIMPO.md
```
A partir daí, só o LIMPO é editado. O REVISTO fica intocado.

**Erro a evitar:** Aplicar correcções (ortográficas, renomeação de personagens, vícios mecânicos) a TODAS as versões ao mesmo tempo. Resultado: versões indistinguíveis, histórico perdido. Só se edita a versão activa.

### Commits

Um commit, uma acção, um ficheiro.

Bom: `Corrigir 'Exactas' → 'Exatas' em cap-09 LIMPO`
Mau: `Corrigir inconsistências ortográficas em FrequenciaCerta` (tocou 4 ficheiros)

### Expansão: congelar antes de expandir

Antes de iniciar múltiplas passagens de expansão, guardar a versão curta como ponto de referência. Oito commits de "expansion" sem versão intermédia congelada tornam impossível comparar o antes e o depois.

---

## III. Vícios de Escrita IA — Catálogo e Método de Detecção

Estes padrões apareceram em **todos** os manuscritos deste repositório. São previsíveis, repetitivos, e detectáveis por varredura. A revisão deve procurá-los sistematicamente.

### 1. Sobre-explicações após cenas fortes

O narrador explica o que o leitor já sentiu. A cena mostra, e depois o texto confirma.

**Como detectar:** Procurar construções "Não era X. Era Y.", "Não era X. Não era Y. Era Z." logo após um gesto, diálogo ou acção que já comunicou a mesma ideia.

**Como cortar:** Eliminar o bloco explicativo inteiro. Se a cena está bem construída, a explicação é sempre redundante. Testar lendo a cena sem o bloco — se funciona, o bloco sai.

### 2. Processamento emocional do narrador

Blocos onde a personagem "percebe", "sente", "regista" o que acabou de acontecer — roubando ao leitor o trabalho de sentir.

**Como detectar:** Procurar "percebeu", "sentiu", "registou", "compreendeu" nos parágrafos imediatamente após diálogos fortes ou momentos de tensão. Procurar também "A pergunta ficou. Como ficam as perguntas que..." e construções similares.

**Como cortar:** Eliminar o parágrafo de processamento. Deixar o diálogo ou acção respirar sozinho. O leitor faz o trabalho emocional — não precisa que a personagem lhe mostre como.

### 3. Etiquetas mecânicas de pensamento

**Como detectar:** Procurar "Pensou:", "E pensou:", "Pensou no que dizer", "Pensou na frase".

**Como cortar:** Remover a etiqueta e deixar o pensamento directo. Em vez de *"Pensou: isto não vai acabar bem"*, apenas *"Isto não vai acabar bem."*

### 4. "E" mecânico no início de frase

Frases que começam com "E" sem necessidade rítmica — muleta de transição.

**Como decidir:** Retirar o "E" e ler em voz alta. Se funciona igual ou melhor, retirar. Nem todos os "E" iniciais são maus — alguns têm cadência intencional. A diferença é se acrescenta ritmo ou se é hábito.

### 5. Manifestos e explicações sistémicas

Personagens que deveriam agir passam a explicar o sistema, o mundo, a filosofia. Acontece especialmente em diálogos de personagens com autoridade (professores, terapeutas, figuras parentais).

**Como detectar:** Falas de personagens com mais de 3-4 linhas que explicam "como o mundo funciona". Procurar padrões tipo "o sistema foi desenhado para...", "o problema é que a sociedade...", "eu trabalho com X crianças e cada uma...".

**Como cortar:** Manter a afirmação forte sobre a personagem concreta. Cortar a justificação sistémica. A afirmação "O Ivo está só dentro. Completamente. E isso assusta." não precisa de preâmbulo sobre como o sistema educativo funciona.

### 6. Fórmulas corporais repetidas

Tiques em momentos emocionais. Individualmente são boas — em massa são mecânicas.

**Inventário de fórmulas recorrentes:**
- "O peito fez aquela coisa"
- "A garganta fechou"
- "Os olhos molharam"
- "O corpo soube antes da mente"
- "como se" + metáfora elaborada
- "O estômago apertou"
- "As mãos tremeram"

**Método:** Contar por capítulo. Até 2 por capítulo é natural. Acima de 3 é padrão mecânico — reduzir ou substituir por acção concreta.

**Atenção ao "como se":** Contar separadamente. Se > 3 por capítulo, reduzir. Manter apenas os que trazem imagem nova.

### 7. Narrador-professor

O narrador eleva-se acima da personagem e fala como se estivesse a dar uma aula sobre ela.

**Como detectar:** Procurar superlativos ("era exactamente o tipo de criança que..."), diagnósticos ("o que a tornava diferente era..."), prolepses ("o que Sena ainda não sabia era que..."), quebras de 4.ª parede, aforismos, e teses sobre a condição humana.

**Como cortar:** O narrador deve estar ao nível da personagem, não acima. Cortar ensaios, diagnósticos inseridos na narração, e qualquer frase que soe a introdução de artigo académico.

**Cuidado com o excesso de corte:** Algumas passagens que parecem narrador-professor têm força própria e servem o ritmo. Se há dúvida, manter e marcar para reavaliação — é mais fácil cortar depois do que reescrever.

### 8. Finais de capítulo uniformes

Capítulos que terminam todos com frases grandiosas, aforísticas, a tentar fechar com um laço poético ("soaring endings").

**Método:** Ler os últimos parágrafos de todos os capítulos seguidos. Se todos terminam com a mesma cadência — frase curta, poética, redonda — variar. Alguns capítulos devem terminar em seco, em silêncio, no meio de um gesto, a meio de uma acção.

### 9. Travessões narrativos em excesso

Incisas entre travessões usadas como muleta rítmica.

**Método:** Contar por capítulo. Se > 5, reduzir. Converter em vírgulas, frases separadas, ou simplesmente eliminar a incisa quando não acrescenta.

### 10. Dependência do verbo "olhar"

"Olhou", "olhar", "olhos" como descrição visual por defeito.

**Método:** Contar por capítulo. Se > 4 ocorrências, substituir por acções concretas, gestos, ou eliminar quando o contexto já implica a direcção do olhar. Atenção a não substituir por sinónimos clínicos ("fitou", "perscrutou") — muitas vezes basta eliminar.

### 11. Repetição de informação entre capítulos

Revelações, memórias ou explicações que aparecem num capítulo e voltam a ser processadas noutro posterior.

**Método:** Na leitura integral, anotar revelações e verificar se reaparecem. Se uma revelação já teve impacto no cap. 14, não precisa de ser reprocessada no cap. 19. Manter apenas referências breves — cortar blocos de reprocessamento.

---

## IV. Metodologia de Revisão — As Cinco Fases

### Fase 1: Diagnóstico (sem editar)

Ler o manuscrito completo. Criar `NOTAS_REVISAO_[LIVRO].md` **antes de tocar no texto**. Registar:

- Capítulos que arrastam ou perdem ritmo
- Momentos onde se perde interesse
- Repetições de informação entre capítulos
- Personagens que desaparecem ou mudam de comportamento sem razão
- Problemas de cronologia ou continuidade
- Saturação lexical (palavras repetidas com frequência anormal)
- Inconsistências de voz narrativa

O ficheiro de notas é obrigatório. Revisões sem notas perdem o raciocínio — ficam registadas apenas nos commits, sem justificação.

### Fase 2: Cortes estruturais (→ _REVISTO)

Copiar `_COMPLETO` para `_REVISTO`. Trabalhar só no REVISTO.

**O que cortar:**
- Sobre-explicações após cenas fortes (vício #1)
- Processamento emocional redundante (vício #2)
- Manifestos e discursos expositivos (vício #5)
- Material repetido entre capítulos (vício #11)
- Narrador-professor: ensaios, diagnósticos, teses, superlativos (vício #7)

**Técnica de corte cirúrgico:**
1. Identificar o bloco a cortar
2. Ler o texto antes e depois do bloco, ignorando-o
3. Se a transição funciona e o sentido se mantém — cortar
4. Se fica um salto abrupto — manter e marcar para reavaliação
5. Nunca adicionar frases de ligação — se o corte precisa de cola, talvez não deva ser feito

**Princípio de cautela:** Se há dúvida, manter. É mais fácil cortar numa passagem posterior do que reescrever o que foi eliminado.

### Fase 3: Limpeza mecânica (→ _LIMPO)

Copiar `_REVISTO` para `_LIMPO`. Trabalhar só no LIMPO.

**Varredura sistemática por padrão.** Fazer uma passagem completa para cada vício, na seguinte ordem:

| Passagem | O que procurar | Limiar |
|---|---|---|
| 1 | "Pensou" / "E pensou" — etiquetas mecânicas | Eliminar todas |
| 2 | "percebeu" / "sentiu" após diálogos | Avaliar caso a caso |
| 3 | "como se" por capítulo | Reduzir se > 3 |
| 4 | Fórmulas corporais por capítulo | Reduzir se > 2 |
| 5 | "E" no início de parágrafo | Testar sem ele |
| 6 | "Não era X. Era Y." | Eliminar se a cena já mostrou |
| 7 | Travessões narrativos por capítulo | Reduzir se > 5 |
| 8 | "olhou/olhar/olhos" por capítulo | Substituir ou eliminar se > 4 |
| 9 | Finais de capítulo | Variar se uniformes |

**Importante:** Fazer uma passagem de cada vez, não todas juntas. A tentação de corrigir tudo numa leitura leva a cortes precipitados.

### Fase 4: Ortografia e consistência (→ _FINAL)

Copiar `_LIMPO` para `_FINAL`. Trabalhar só no FINAL.

**Checklist AO90:**
- Formas pré-acordo: acção→ação, direcção→direção, exacto→exato, óptimo→ótimo, etc.
- "Porquê" em perguntas indirectas → "porque é que"
- Clichés: "um misto de" → reformular com imagem concreta
- Verificar consistência: se "acção" aparece no cap. 3 mas "ação" no cap. 7, uniformizar

**Checklist de consistência:**
- Nomes de personagens iguais em todo o manuscrito
- Numeração de capítulos sem saltos
- Factos internos (número de irmãos, idades, datas) coerentes
- Contagem final de palavras

### Fase 5: Validação final

Antes de declarar o FINAL pronto:

- [ ] Todos os capítulos presentes e na ordem correcta
- [ ] Nomes de personagens consistentes
- [ ] Contagem de palavras registada
- [ ] Leitura do primeiro e último parágrafos de cada capítulo (continuidade)
- [ ] Ficheiros anteriores (_COMPLETO, _REVISTO, _LIMPO) intocados
- [ ] Ficheiro de notas completo com justificação de cada fase

---

## V. Revisão Assistida por IA — Regras e Limites

### O que a IA pode fazer

- **Varreduras de padrão:** contar ocorrências de vícios mecânicos por capítulo (como se, olhou, travessões, fórmulas corporais)
- **Listagens para revisão humana:** listar candidatos a corte com contexto, sem executar
- **Verificação ortográfica:** detectar formas pré-AO90, inconsistências de nomes
- **Compilação:** juntar capítulos individuais num ficheiro único
- **Contagem de palavras**
- **Detecção de repetições entre capítulos:** cruzar revelações e informação repetida

### O que a IA não deve fazer

- Reescrever frases da autora
- Adicionar texto novo ao manuscrito
- Decidir sozinha o que cortar — deve propor e esperar aprovação
- Alterar pontuação ou cadência sem instrução explícita
- Tocar em diálogos de personagens
- Aplicar correcções em massa a múltiplas versões
- Eliminar ou alterar objectos simbólicos

### Fluxo de trabalho IA

1. **Varredura** — A IA faz a passagem e lista ocorrências num ficheiro de notas
2. **Proposta** — A IA apresenta os candidatos a corte com contexto (linhas antes e depois)
3. **Aprovação** — A autora revê e aprova, rejeita ou modifica cada proposta
4. **Execução** — Só após aprovação, a IA aplica os cortes ao ficheiro da versão activa
5. **Verificação** — A IA confirma que o texto resultante mantém coerência

### Um ficheiro por vez

Nunca aplicar a mesma correcção a COMPLETO, REVISTO, LIMPO e FINAL ao mesmo tempo. Uma correcção ortográfica no FINAL não deve ser retroactivamente aplicada ao COMPLETO — porque o COMPLETO é uma fotografia do manuscrito antes da revisão.

---

## VI. Estrutura de Ficheiros

### Modelo
```
NomeDoLivro/
├── cap-01-titulo.md          # Capítulos individuais (fonte de verdade)
├── cap-02-titulo.md
├── ...
├── NOTAS_REVISAO_[LIVRO].md  # Notas de cada fase de revisão
├── LIVRO_COMPLETO.md         # Compilação crua (congelada)
├── LIVRO_REVISTO.md          # Após cortes estruturais (congelada)
├── LIVRO_LIMPO.md            # Após limpeza mecânica (congelada)
└── LIVRO_FINAL.md            # Pronto para impressão
```

Os capítulos individuais são a **fonte de verdade**. As versões compiladas são fotografias de momentos do processo. Após editar capítulos individuais, recompilar a versão activa para manter sincronia.

---

## VII. Armadilhas Conhecidas

Erros cometidos durante a revisão destes manuscritos. Cada um custou tempo e trabalho a reparar.

1. **Editar todas as versões ao mesmo tempo.** As versões tornam-se indistinguíveis e o histórico de evolução perde-se.

2. **Commits genéricos que tocam múltiplos ficheiros.** Impossível rastrear o que mudou onde. Um commit deve tocar um ficheiro.

3. **Não criar ficheiro de notas antes de editar.** O raciocínio por trás dos cortes fica perdido. Meses depois, ninguém sabe porque é que aquela passagem foi cortada.

4. **Renomear personagens em versões antigas.** As versões antigas devem reflectir o estado real da escrita naquela fase — incluindo os nomes antigos.

5. **Múltiplas expansões sem congelar versão intermédia.** Sem ponto de referência, é impossível avaliar o que a expansão acrescentou de bom ou de mau.

6. **Editar capítulos individuais e esquecer de recompilar.** O ficheiro compilado fica desactualizado, criando confusão sobre qual é a versão correcta.

7. **Cortar em excesso numa primeira passagem.** Passagens com força própria foram eliminadas por parecerem narrador-professor. Depois tiveram de ser restauradas. Regra: na dúvida, manter.

8. **Não documentar as revisões.** O processo ficou registado apenas nos commits do git. Um manual de metodologia deve ser criado e actualizado desde o início.

---

*Este manual deve ser lido antes de iniciar qualquer revisão. Actualizar com novas lições à medida que surjam.*
