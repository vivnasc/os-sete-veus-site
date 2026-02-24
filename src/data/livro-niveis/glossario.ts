import type { GlossarioEntry } from './types'

export const glossario: GlossarioEntry[] = [
  {
    termo: 'Ubuntu',
    definicao: 'Filosofia africana que reconhece que o ser humano so existe em relacao com os outros. "Eu sou porque nos somos."',
    exemplo: 'Quando sentes que a tua identidade se forma no olhar dos outros — nao como dependencia, mas como pertenca — estas a viver o espirito do Ubuntu.',
    veus_relacionados: [1, 2, 3, 4, 5, 6, 7],
  },
  {
    termo: 'persona',
    definicao: 'Conceito de Carl Gustav Jung para a mascara social que usamos para interagir com o mundo. Nao e falsidade — e ferramenta. O problema surge quando a confundimos com essencia.',
    veus_relacionados: [1, 2, 3, 4],
  },
  {
    termo: 'anatta',
    definicao: 'Ensinamento budista do "nao-eu": nao existe entidade permanente, apenas fenomenos transitorios que chamamos "eu" por conveniencia.',
    veus_relacionados: [1, 3],
  },
  {
    termo: 'Atman',
    definicao: 'No Hinduismo, o autentico Eu — nao o ego pessoal, mas a presenca silenciosa que testemunha as transformacoes sem se prender a nenhuma.',
    veus_relacionados: [1, 7],
  },
  {
    termo: 'Brahman',
    definicao: 'No Hinduismo, a realidade ultima, o Todo. O Atman (eu autentico) reconhece-se como Brahman — a centelha individual reconhece-se como parte do infinito.',
    veus_relacionados: [1, 7],
  },
  {
    termo: 'Self',
    definicao: 'Na psicologia de Jung, o centro mais profundo da psique — aquilo que somos para alem das mascaras e dos papeis. Nao confundir com o ego.',
    veus_relacionados: [1, 2, 7],
  },
  {
    termo: 'Sankofa',
    definicao: 'Conceito akan (Gana) que ensina: "para avancar, e preciso regressar e resgatar o que ficou esquecido." Simbolizado por um passaro que olha para tras.',
    veus_relacionados: [1, 2],
  },
  {
    termo: 'fana',
    definicao: 'No sufismo, a dissolucao do ego — a centelha limitada extingue-se para que a chama maior se revele. Nao e aniquilacao, e regresso ao Amado.',
    exemplo: 'Rumi descrevia o fana como o momento em que a gota de agua se reconhece como oceano.',
    veus_relacionados: [1, 2, 5, 7],
  },
  {
    termo: 'Ein Sof',
    definicao: 'Na Cabala judaica, o Infinito sem forma — a fonte de toda a luz. A alma e descrita como lampada onde essa luz se acende.',
    veus_relacionados: [1, 6],
  },
  {
    termo: 'bhakti',
    definicao: 'No Hinduismo, devocao amorosa — caminho espiritual onde o amor e a entrega do coracao sao a via de unificacao com o divino.',
    veus_relacionados: [1, 7],
  },
  {
    termo: 'noite escura',
    definicao: 'Expressao de Joao da Cruz para o despojamento de todas as segurancas ate que o eu se torne permeavel ao misterio. Nao e depressao — e travessia.',
    exemplo: 'Quando sentes que tudo o que te sustentava caiu e ainda nao surgiu nada novo — esse intervalo e a noite escura. Nao e fim, e passagem.',
    veus_relacionados: [1, 2, 5],
  },
  {
    termo: 'samsara',
    definicao: 'No Budismo e Hinduismo, o ciclo de repeticao — nascimento, morte, renascimento. Metaforicamente, os padroes mentais que repetimos sem perceber.',
    exemplo: 'Quando percebes que estas a repetir o mesmo padrao numa relacao nova — atracao, desilusao, fuga — estas a ver o samsara em accao.',
    veus_relacionados: [1, 2, 3],
  },
  {
    termo: 'vacuidade',
    definicao: 'No Budismo, reconhecer que o eu e apenas fluxo — a paz nasce quando nao nos agarramos a nenhuma forma. Nao e o "nada", e a liberdade da fixacao.',
    veus_relacionados: [1, 2, 3, 4, 5],
  },
  {
    termo: 'veu',
    definicao: 'Neste livro, cada veu e uma camada de crenca ou ilusao que cobre a visao. Dissolver um veu nao e destruir — e revelar o que estava por baixo.',
    veus_relacionados: [1, 2, 3, 4, 5, 6, 7],
  },
  {
    termo: 'despertar',
    definicao: 'Nao e uma chegada, e um processo gradual de dissolucao das camadas que cobrem a consciencia. Nao e explosao — e erosao lenta que revela o que sempre esteve la.',
    veus_relacionados: [1, 2, 3, 4, 5, 6, 7],
  },
  {
    termo: 'identidade',
    definicao: 'Neste contexto, nao e essencia fixa mas fluxo em movimento. O que julgamos solido revela-se correnteza — nenhuma definicao nos contem por completo.',
    veus_relacionados: [1, 2, 3, 4, 5],
  },
  {
    termo: 'Taoismo',
    definicao: 'Tradicao filosofica e espiritual chinesa fundada por Laozi. Ensina que o Tao (o Caminho) nao pode ser nomeado nem fixado — tudo flui e se transforma.',
    veus_relacionados: [1, 4],
  },
  {
    termo: 'existencialismo',
    definicao: 'Corrente filosofica (Sartre, Heidegger) que afirma: "a existencia precede a essencia." Nao nascemos com destino tracado — somos escolhas em criacao constante.',
    veus_relacionados: [1, 2, 4],
  },
  // Novos termos — veus 2-7
  {
    termo: 'crianca interior',
    definicao: 'Reconhecimento de que impressoes emocionais da infancia ficam inscritas no corpo e continuam a influenciar decisoes, relacoes e reaccoes adultas. Nao e metafora infantil — e memoria viva.',
    exemplo: 'Quando reages com intensidade desproporcional a algo pequeno — essa reaccao vem de uma memoria inscrita no corpo, talvez da infancia.',
    veus_relacionados: [2],
  },
  {
    termo: 'karma',
    definicao: 'Neste livro, nao e tribunal divino. E ressonancia: o que emitimos ecoa de volta. Nao como castigo, mas como espelho que revela o nosso estado interior.',
    veus_relacionados: [2],
  },
  {
    termo: 'spiritual bypassing',
    definicao: 'Usar praticas espirituais para evitar confrontar emocoes dificeis. Parece evolucao, mas e fuga disfaracada de serenidade. O termo foi criado por John Welwood.',
    exemplo: 'Dizer "tudo acontece por uma razao" para nao sentir a dor de uma perda — isso e spiritual bypassing.',
    veus_relacionados: [3, 4],
  },
  {
    termo: 'codependencia',
    definicao: 'Padrao relacional onde quem da precisa de ser necessario e quem recebe precisa de ser cuidado. Ambos ficam presos num gesto que ja nao e livre.',
    veus_relacionados: [4],
  },
  {
    termo: 'matrix humana',
    definicao: 'A rede de expectativas, metas e narrativas de "chegada" que a mente constroi. Cada conquista parece oferecer repouso, mas gera uma nova meta. A matrix humana e a ilusao de que ha um ponto final.',
    veus_relacionados: [6],
  },
  {
    termo: 'matrix divina',
    definicao: 'O campo infinito que se revela quando a matrix humana se dissolve. Nao e oposto da matrix humana — e o que resta quando a ilusao do fim cai. Um fluxo continuo, sem chegada, sem conclusao.',
    veus_relacionados: [6],
  },
  {
    termo: 'intuicao',
    definicao: 'A voz quase imperceptivel que surge no espaco entre pensamentos. Nao exige prova, logica ou explicacao. E saber sem saber como se sabe.',
    veus_relacionados: [6],
  },
  {
    termo: 'guardiao do limiar',
    definicao: 'Figura mitica que testa a prontidao de quem quer atravessar para um novo nivel de consciencia. Nao testa com obstaculos, mas com a pergunta: consegues caminhar sem precisar de chegar?',
    veus_relacionados: [7],
  },
  {
    termo: 'dualidade',
    definicao: 'A separacao entre eu e mundo, espirito e materia, dentro e fora. O ultimo veu. Quando cai, resta apenas o centro indiviso — onde tudo e um so.',
    veus_relacionados: [7],
  },
  {
    termo: 'desolacao',
    definicao: 'Nao e ausencia de vida, mas o campo silencioso onde a alma germina sem testemunhas. O vazio que antecede o renascimento — fertil, nao esteril.',
    veus_relacionados: [5],
  },
]
