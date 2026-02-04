/**
 * CONTEÚDO NARRATIVO — Os 7 Véus
 * Histórias dos personagens e passos interactivos
 */

const CONTEUDO = {

    // =========================================
    // VÉU 1 — ILUSÃO (Sara)
    // =========================================
    1: {
        id: 1,
        nome: 'O Véu da Ilusão',
        personagem: 'Sara',
        resumo: 'A vida que parece certa mas não é sua',

        capitulos: [
            {
                titulo: 'A Casa Perfeita',
                passos: [
                    {
                        tipo: 'narrativa',
                        conteudo: `
                            <p>Sara acorda às seis e quarenta e cinco.</p>
                            <p>O despertador não tocou. Nunca toca. O corpo sabe. Há quinze anos que o corpo sabe.</p>
                            <p>Levanta-se devagar, para não acordar o marido. Vai à casa de banho, lava a cara, olha para o espelho. O espelho mostra uma mulher de quarenta e três anos com olheiras discretas e cabelo bem tratado.</p>
                            <p>Não mostra mais nada.</p>
                        `
                    },
                    {
                        tipo: 'narrativa',
                        conteudo: `
                            <p>A cozinha ainda está escura. Sara gosta deste momento. Os dez minutos antes de os filhos acordarem. Os dez minutos em que a casa é só dela.</p>
                            <p>Prepara o café. Prepara as lancheiras. Verifica os horários no frigorífico — Matilde tem natação, Tomás tem explicações.</p>
                            <p>Tudo está no sítio certo.</p>
                            <p class="destaque">Tudo está sempre no sítio certo.</p>
                        `
                    },
                    {
                        tipo: 'narrativa',
                        conteudo: `
                            <p>Às sete e quinze, o marido desce. Beija-a na testa. Pergunta se ela dormiu bem. Ela diz que sim.</p>
                            <p>É mentira, mas não é bem mentira. É o que se diz. É o que ela diz há quinze anos.</p>
                            <p>Às sete e trinta, as crianças descem. Comem. Reclamam. Esquecem-se dos casacos. Sara lembra. Sara resolve. Sara sorri.</p>
                            <p>Às oito e dez, a casa está vazia.</p>
                        `
                    },
                    {
                        tipo: 'narrativa',
                        conteudo: `
                            <p>Sara senta-se à mesa da cozinha. O café já está frio. Ela bebe-o assim mesmo.</p>
                            <p>Olha para a janela. O jardim está bem cuidado. A vizinha passa com o cão. Acena. Sara acena de volta.</p>
                            <p>E depois fica ali.</p>
                            <p>Não sabe quanto tempo. Talvez cinco minutos. Talvez vinte.</p>
                            <p>Não está a pensar em nada.</p>
                            <p>Está apenas ali, sentada, com um café frio na mão, a olhar para um jardim que não lhe diz nada.</p>
                        `
                    },
                    {
                        tipo: 'pausa',
                        pergunta: 'Há algum momento no teu dia assim?',
                        instrucao: 'Um momento em que tudo está "bem" mas tu não estás presente.'
                    },
                    {
                        tipo: 'narrativa',
                        conteudo: `
                            <p>Às nove, Sara veste-se. Roupa discreta. Profissional. Adequada.</p>
                            <p>Trabalha em casa três dias por semana. Hoje é um desses dias. Abre o portátil. Responde a e-mails. Participa numa reunião onde diz as coisas certas nos momentos certos.</p>
                            <p>Ninguém percebe que ela não está ali.</p>
                            <p>Nem ela percebe.</p>
                            <p class="destaque">A ilusão não é acreditar em algo falso. É viver algo vazio como se fosse cheio.</p>
                        `
                    },
                    {
                        tipo: 'narrativa',
                        conteudo: `
                            <p>Ao almoço, Sara come uma salada em frente ao computador. Vê uma publicação de uma amiga nas redes sociais. A amiga está em Bali. Parece feliz.</p>
                            <p>Sara pensa: "Eu também devia viajar mais."</p>
                            <p>Mas não pensa realmente. É um pensamento automático. Um pensamento que surge e desaparece sem deixar marca.</p>
                            <p>Ela não quer ir a Bali.</p>
                            <p>Ela não sabe o que quer.</p>
                        `
                    },
                    {
                        tipo: 'pausa',
                        pergunta: 'Que desejos tens que não são teus?',
                        instrucao: 'Pensa em algo que "devias" querer mas que, na verdade, não te interessa.'
                    },
                    {
                        tipo: 'registo',
                        pergunta: 'Que gesto fazes hoje para manter uma ilusão?',
                        instrucao: 'Um gesto que mantém a aparência de uma vida que não sentes como tua.'
                    },
                    {
                        tipo: 'compromisso'
                    },
                    {
                        tipo: 'narrativa',
                        conteudo: `
                            <p>A tarde passa.</p>
                            <p>Os filhos voltam. O marido volta. O jantar é preparado. A mesa é posta. As conversas são tidas.</p>
                            <p>Sara sorri quando é suposto sorrir. Pergunta como foi o dia. Ouve as respostas. Responde às perguntas.</p>
                            <p>Às onze da noite, deita-se.</p>
                            <p>O marido adormece primeiro. Sara fica a olhar para o tecto.</p>
                            <p>E pensa:</p>
                            <p class="destaque">"Amanhã vai ser igual."</p>
                            <p>Não é um pensamento triste. Não é um pensamento feliz. É apenas um facto.</p>
                            <p>E é esse facto que a assusta.</p>
                        `
                    },
                    {
                        tipo: 'narrativa',
                        conteudo: `
                            <p class="separador">· · ·</p>
                            <p>Este é o Véu da Ilusão.</p>
                            <p>Não é uma mentira que alguém te contou.</p>
                            <p>É uma vida que construíste sem perceber que não era tua.</p>
                            <p>Uma vida "correcta" que não te pertence.</p>
                        `
                    }
                ]
            }
        ]
    },

    // =========================================
    // VÉU 2 — MEDO (Rui)
    // =========================================
    2: {
        id: 2,
        nome: 'O Véu do Medo',
        personagem: 'Rui',
        resumo: 'A paralisia disfarçada de responsabilidade',

        capitulos: [
            {
                titulo: 'As Seis e Um Minuto',
                passos: [
                    {
                        tipo: 'narrativa',
                        conteudo: `
                            <p>Rui olha para o relógio. São seis da tarde.</p>
                            <p>O escritório está a esvaziar. Os colegas levantam-se, despedem-se, saem. "Até amanhã." "Bom fim de semana." "Vemo-nos segunda."</p>
                            <p>Rui acena. Sorri. Diz as palavras certas.</p>
                            <p>Não se levanta.</p>
                        `
                    },
                    {
                        tipo: 'narrativa',
                        conteudo: `
                            <p>Não há trabalho urgente. Não há nada que precise de ser feito agora. O e-mail que está a escrever pode esperar até amanhã. Ele sabe disso.</p>
                            <p>Mas continua sentado.</p>
                            <p>Os dedos movem-se no teclado. Escrevem palavras que não interessam. Respondem a coisas que não são importantes.</p>
                            <p>Às seis e quinze, o escritório está quase vazio.</p>
                            <p>Rui continua ali.</p>
                        `
                    },
                    {
                        tipo: 'narrativa',
                        conteudo: `
                            <p>Não é por gostar do trabalho. Não é por ser dedicado. Não é por ambição.</p>
                            <p>É medo.</p>
                            <p>Medo de quê?</p>
                            <p>Ele não sabe exactamente. O medo não se explica. Apenas está lá, um peso no peito, uma voz que diz: "Fica mais um pouco. Não vás ainda. Ainda não é altura."</p>
                            <p class="destaque">Medo de parecer dispensável. Medo do silêncio em casa. Medo de si mesmo sem ocupação.</p>
                        `
                    },
                    {
                        tipo: 'pausa',
                        pergunta: 'Conheces este medo?',
                        instrucao: 'O medo que não tem nome. Que não se justifica. Que apenas manda.'
                    },
                    {
                        tipo: 'narrativa',
                        conteudo: `
                            <p>Às seis e trinta, Rui levanta-se.</p>
                            <p>Não porque decidiu. Porque já não conseguia ficar mais tempo sentado a fingir que trabalhava.</p>
                            <p>Desce. Vai para o carro. Liga o motor.</p>
                            <p>E fica ali mais cinco minutos.</p>
                            <p>A olhar para o volante. A respirar. A adiar.</p>
                        `
                    },
                    {
                        tipo: 'narrativa',
                        conteudo: `
                            <p>A caminho de casa, Rui pensa nas coisas que não fez hoje.</p>
                            <p>Não ligou ao pai. Há duas semanas que não liga. Não é por falta de tempo. É por medo. Medo de quê? De ouvir a voz cansada. De não ter nada para dizer. De perceber que a relação é feita de silêncios.</p>
                            <p>Não falou com a mulher sobre as férias. Ela perguntou ontem. Ele disse "vemos isso depois". Não é por falta de opinião. É por medo. Medo de escolher mal. Medo de gastar dinheiro. Medo de se comprometer com algo.</p>
                            <p>Não disse ao chefe que precisa de ajuda no projecto. Não é por orgulho. É por medo. Medo de parecer incompetente. Medo de se tornar substituível.</p>
                        `
                    },
                    {
                        tipo: 'narrativa',
                        conteudo: `
                            <p>Rui estaciona. Olha para a casa. As luzes estão acesas.</p>
                            <p>Lá dentro, a mulher e os filhos esperam. Ou talvez não esperem. Talvez já estejam habituados a que ele chegue tarde.</p>
                            <p>Ele sabe que devia ter saído às seis.</p>
                            <p>Ele sabe que podia ter ligado ao pai no carro.</p>
                            <p>Ele sabe que podia ter falado das férias.</p>
                            <p class="destaque">Saber não muda nada. O medo não se resolve com saber.</p>
                        `
                    },
                    {
                        tipo: 'pausa',
                        pergunta: 'Onde obedeces ao medo?',
                        instrucao: 'Não perguntes "porque tenho medo". Pergunta "onde obedeço ao medo".'
                    },
                    {
                        tipo: 'registo',
                        pergunta: 'Que gesto fazes hoje apenas por medo?',
                        instrucao: 'Sê concreto. Um gesto específico. Algo que acontece hoje.'
                    },
                    {
                        tipo: 'compromisso'
                    },
                    {
                        tipo: 'audio',
                        titulo: 'Sustentar o desconforto',
                        duracao: '5 minutos',
                        descricao: 'Um exercício para estar com o medo sem agir sobre ele.'
                    },
                    {
                        tipo: 'narrativa',
                        conteudo: `
                            <p>Rui entra em casa.</p>
                            <p>A mulher pergunta como foi o dia. Ele diz que foi normal. Os filhos mostram desenhos. Ele elogia. O jantar é servido. Ele come.</p>
                            <p>Tudo igual ao dia anterior. Tudo igual ao dia seguinte.</p>
                            <p>Às dez da noite, Rui está sentado no sofá. A televisão está ligada. Ele não está a ver.</p>
                            <p>Está a pensar no momento em que não se levantou às seis.</p>
                            <p>No momento em que o medo mandou e ele obedeceu.</p>
                        `
                    },
                    {
                        tipo: 'narrativa',
                        conteudo: `
                            <p class="separador">· · ·</p>
                            <p>Este é o Véu do Medo.</p>
                            <p>Não é cobardia. Não é fraqueza. Não é falta de coragem.</p>
                            <p>É obediência automática a algo que não questionas.</p>
                            <p>O medo manda. Tu executas. Sem pensar. Sem escolher.</p>
                            <p class="destaque">Transmutar não é deixar de ter medo. É deixar de obedecer.</p>
                        `
                    }
                ]
            },
            {
                titulo: 'O Dia Seguinte',
                passos: [
                    {
                        tipo: 'narrativa',
                        conteudo: `
                            <p>São seis da tarde.</p>
                            <p>O escritório está a esvaziar. Os mesmos colegas. As mesmas despedidas. O mesmo momento.</p>
                            <p>Rui olha para o relógio.</p>
                            <p>Sente o medo. O mesmo medo de ontem. O peso no peito. A voz que diz para ficar.</p>
                            <p>Mas hoje, algo é diferente.</p>
                        `
                    },
                    {
                        tipo: 'narrativa',
                        conteudo: `
                            <p>Hoje, Rui não pergunta "porque tenho medo".</p>
                            <p>Hoje, Rui sabe onde obedece.</p>
                            <p>Levanta-se.</p>
                            <p>O medo não desaparece. Está lá. Completo. Presente.</p>
                            <p>Mas Rui não obedece.</p>
                        `
                    },
                    {
                        tipo: 'narrativa',
                        conteudo: `
                            <p>Desce as escadas. O coração bate mais rápido. As mãos estão ligeiramente húmidas.</p>
                            <p>O medo diz: "Volta. Ainda podes voltar. Ninguém viu."</p>
                            <p>Rui continua a descer.</p>
                            <p>Chega ao carro. Liga o motor. Às seis e três minutos, está a sair do parque.</p>
                            <p>Três minutos. Não é uma revolução. Não é uma transformação. É apenas três minutos.</p>
                            <p class="destaque">Mas são três minutos de não-obediência.</p>
                        `
                    },
                    {
                        tipo: 'narrativa',
                        conteudo: `
                            <p>A caminho de casa, o medo continua.</p>
                            <p>"Devias ter ficado. Devias ter verificado os e-mails. Devias ter mostrado dedicação."</p>
                            <p>Rui ouve. Não discute. Não tenta convencer-se de que fez bem. Não procura argumentos.</p>
                            <p>Apenas conduz.</p>
                            <p>O medo fala. Rui não responde.</p>
                        `
                    },
                    {
                        tipo: 'pausa',
                        pergunta: 'O que muda quando não obedeces?',
                        instrucao: 'Não muda o medo. Muda a relação de poder.'
                    },
                    {
                        tipo: 'narrativa',
                        conteudo: `
                            <p>Rui chega a casa às seis e vinte.</p>
                            <p>A mulher está na cozinha. Olha para ele com surpresa. "Chegaste cedo."</p>
                            <p>"Sim."</p>
                            <p>Ela não pergunta porquê. Ele não explica.</p>
                            <p>Os filhos ainda não jantaram. Rui senta-se com eles. Ajuda com os trabalhos de casa. Ouve uma história sobre um colega de escola.</p>
                            <p>Nada de extraordinário acontece.</p>
                            <p>Apenas uma noite normal. Uma noite vinte minutos mais longa.</p>
                        `
                    },
                    {
                        tipo: 'narrativa',
                        conteudo: `
                            <p>Às dez da noite, Rui está sentado no mesmo sofá. A mesma televisão está ligada.</p>
                            <p>Mas algo é diferente.</p>
                            <p>Não é felicidade. Não é orgulho. Não é libertação.</p>
                            <p>É apenas isto: hoje, o medo mandou e ele não executou.</p>
                            <p>O medo ainda existe. A vida não mudou. Amanhã vai ser difícil outra vez.</p>
                            <p class="destaque">Mas hoje, por uma vez, o medo não governou.</p>
                            <p>E isso é transmutação.</p>
                        `
                    },
                    {
                        tipo: 'narrativa',
                        conteudo: `
                            <p class="separador">· · ·</p>
                            <p>Transmutar não é vencer o medo.</p>
                            <p>Não é eliminá-lo.</p>
                            <p>Não é curá-lo.</p>
                            <p>É retirar-lhe autoridade.</p>
                            <p>Um gesto de cada vez.</p>
                            <p>Um dia de cada vez.</p>
                            <p>Sem promessas.</p>
                            <p>Sem garantias.</p>
                            <p>Apenas não-obediência.</p>
                        `
                    }
                ]
            }
        ]
    },

    // =========================================
    // VÉUS 3-7 — PLACEHOLDER
    // =========================================
    3: {
        id: 3,
        nome: 'O Véu do Desejo',
        personagem: 'Miguel',
        resumo: 'A busca que nunca satisfaz',
        capitulos: []
    },

    4: {
        id: 4,
        nome: 'O Véu do Controlo',
        personagem: 'Ana',
        resumo: 'A necessidade de gerir tudo',
        capitulos: []
    },

    5: {
        id: 5,
        nome: 'O Véu da Culpa',
        personagem: 'Teresa',
        resumo: 'O peso do que devia ter sido',
        capitulos: []
    },

    6: {
        id: 6,
        nome: 'O Véu da Identidade',
        personagem: 'João',
        resumo: 'As máscaras que usamos',
        capitulos: []
    },

    7: {
        id: 7,
        nome: 'O Véu da Separação',
        personagem: 'Marta',
        resumo: 'A ilusão de estar só',
        capitulos: []
    }
};
