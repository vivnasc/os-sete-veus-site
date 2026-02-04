/**
 * TRAVESSIA — Motor do Sistema Literário Interativo
 * Os 7 Véus
 */

const Travessia = {
    // Estado actual
    estado: {
        ecrãActual: 'inicio',
        veuActual: null,
        capituloActual: 0,
        passoActual: 0,
        registoTemporario: '',
        audioPlaying: false
    },

    // Dados guardados localmente
    dados: {
        iniciado: false,
        veusProgresso: {},
        diario: [],
        ultimoAcesso: null
    },

    // =========================================
    // INICIALIZAÇÃO
    // =========================================
    init() {
        this.carregarDados();
        this.verificarCheckinPendente();
        this.actualizarMapa();
    },

    carregarDados() {
        const guardado = localStorage.getItem('travessia_dados');
        if (guardado) {
            this.dados = JSON.parse(guardado);
        }
    },

    guardarDados() {
        this.dados.ultimoAcesso = new Date().toISOString();
        localStorage.setItem('travessia_dados', JSON.stringify(this.dados));
    },

    // =========================================
    // NAVEGAÇÃO ENTRE ECRÃS
    // =========================================
    mostrarEcrã(id) {
        document.querySelectorAll('.screen').forEach(screen => {
            screen.classList.remove('active');
        });
        document.getElementById(id).classList.add('active');
        this.estado.ecrãActual = id;
    },

    iniciar() {
        this.dados.iniciado = true;
        this.guardarDados();
        this.mostrarEcrã('mapa');
    },

    voltarMapa() {
        this.mostrarEcrã('mapa');
        this.actualizarMapa();
    },

    // =========================================
    // MAPA E PROGRESSÃO
    // =========================================
    actualizarMapa() {
        const nodes = document.querySelectorAll('.veu-node');
        let completados = 0;

        nodes.forEach(node => {
            const veuId = parseInt(node.dataset.veu);
            const progresso = this.dados.veusProgresso[veuId];

            if (progresso && progresso.completo) {
                node.dataset.estado = 'completo';
                completados++;
            } else if (veuId <= 2 || this.veuDesbloqueado(veuId)) {
                node.dataset.estado = 'disponivel';
            } else {
                node.dataset.estado = 'bloqueado';
            }
        });

        document.getElementById('progressoActual').textContent = completados;
    },

    veuDesbloqueado(veuId) {
        // Lógica de desbloqueio: véu anterior precisa de X dias de prática
        const anterior = this.dados.veusProgresso[veuId - 1];
        if (!anterior) return false;
        return anterior.diasPratica >= 3;
    },

    abrirVeu(veuId) {
        const node = document.querySelector(`[data-veu="${veuId}"]`);
        if (node.dataset.estado === 'bloqueado') {
            return;
        }

        this.estado.veuActual = veuId;

        // Inicializar progresso se não existir
        if (!this.dados.veusProgresso[veuId]) {
            this.dados.veusProgresso[veuId] = {
                capituloActual: 0,
                passoActual: 0,
                completo: false,
                gestoRegistado: null,
                checkins: [],
                diasPratica: 0
            };
            this.guardarDados();
        }

        // Verificar se há check-in pendente
        const progresso = this.dados.veusProgresso[veuId];
        if (progresso.gestoRegistado && this.temCheckinPendente(veuId)) {
            this.mostrarCheckin();
            return;
        }

        // Continuar de onde parou
        this.estado.capituloActual = progresso.capituloActual;
        this.estado.passoActual = progresso.passoActual;
        this.carregarCapitulo();
    },

    // =========================================
    // LEITOR DE CAPÍTULOS
    // =========================================
    carregarCapitulo() {
        const veuId = this.estado.veuActual;
        const conteudo = CONTEUDO[veuId];

        if (!conteudo) {
            console.error('Conteúdo não encontrado para véu:', veuId);
            return;
        }

        const capitulo = conteudo.capitulos[this.estado.capituloActual];
        if (!capitulo) {
            // Véu completo
            this.completarVeu();
            return;
        }

        // Actualizar header
        document.getElementById('leitorVeuNome').textContent = conteudo.nome;
        document.getElementById('leitorCapitulo').textContent = `Capítulo ${this.estado.capituloActual + 1}`;

        // Carregar passo actual
        this.carregarPasso();

        this.mostrarEcrã('leitor');
    },

    carregarPasso() {
        const veuId = this.estado.veuActual;
        const conteudo = CONTEUDO[veuId];
        const capitulo = conteudo.capitulos[this.estado.capituloActual];
        const passo = capitulo.passos[this.estado.passoActual];

        if (!passo) {
            // Fim do capítulo
            this.proximoCapitulo();
            return;
        }

        // Actualizar barra de progresso
        const progressoPercent = ((this.estado.passoActual + 1) / capitulo.passos.length) * 100;
        document.getElementById('progressoCapitulo').style.width = `${progressoPercent}%`;

        // Processar tipo de passo
        switch (passo.tipo) {
            case 'narrativa':
                this.mostrarNarrativa(passo.conteudo);
                break;
            case 'pausa':
                this.mostrarPausa(passo);
                break;
            case 'registo':
                this.mostrarRegisto(passo);
                break;
            case 'compromisso':
                this.mostrarCompromisso();
                break;
            case 'audio':
                this.mostrarAudio(passo);
                break;
            default:
                this.mostrarNarrativa(passo.conteudo || '');
        }
    },

    mostrarNarrativa(html) {
        const container = document.getElementById('leitorConteudo');
        container.innerHTML = `<div class="narrativa">${html}</div>`;
        document.getElementById('btnContinuar').style.display = 'block';
        this.mostrarEcrã('leitor');
    },

    continuar() {
        this.estado.passoActual++;
        this.guardarProgressoActual();
        this.carregarPasso();
    },

    proximoCapitulo() {
        this.estado.capituloActual++;
        this.estado.passoActual = 0;
        this.guardarProgressoActual();
        this.carregarCapitulo();
    },

    guardarProgressoActual() {
        const veuId = this.estado.veuActual;
        this.dados.veusProgresso[veuId].capituloActual = this.estado.capituloActual;
        this.dados.veusProgresso[veuId].passoActual = this.estado.passoActual;
        this.guardarDados();
    },

    completarVeu() {
        const veuId = this.estado.veuActual;
        this.dados.veusProgresso[veuId].completo = true;
        this.guardarDados();
        this.voltarMapa();
    },

    // =========================================
    // PAUSA / REFLEXÃO
    // =========================================
    mostrarPausa(passo) {
        document.getElementById('pausaTexto').textContent = passo.pergunta || 'Pausa para reflexão.';
        document.getElementById('pausaInstrucao').textContent = passo.instrucao || '';
        document.getElementById('btnContinuar').style.display = 'none';
        this.mostrarEcrã('pausa');
    },

    continuarPausa() {
        this.estado.passoActual++;
        this.guardarProgressoActual();
        this.carregarPasso();
    },

    // =========================================
    // REGISTO
    // =========================================
    mostrarRegisto(passo) {
        document.getElementById('registoPergunta').textContent = passo.pergunta || 'O que queres registar?';
        document.getElementById('registoInput').value = '';
        document.getElementById('btnContinuar').style.display = 'none';
        this.mostrarEcrã('registo');
    },

    guardarRegisto() {
        const texto = document.getElementById('registoInput').value.trim();
        if (!texto) {
            document.getElementById('registoInput').focus();
            return;
        }

        const veuId = this.estado.veuActual;
        this.estado.registoTemporario = texto;
        this.dados.veusProgresso[veuId].gestoRegistado = texto;

        // Adicionar ao diário
        this.dados.diario.push({
            data: new Date().toISOString(),
            veuId: veuId,
            tipo: 'gesto',
            texto: texto
        });

        this.guardarDados();

        this.estado.passoActual++;
        this.guardarProgressoActual();
        this.carregarPasso();
    },

    // =========================================
    // COMPROMISSO
    // =========================================
    mostrarCompromisso() {
        const veuId = this.estado.veuActual;
        const gesto = this.dados.veusProgresso[veuId].gestoRegistado || this.estado.registoTemporario;
        document.getElementById('compromissoGesto').textContent = `"${gesto}"`;
        document.getElementById('btnContinuar').style.display = 'none';
        this.mostrarEcrã('compromisso');
    },

    confirmarCompromisso() {
        const veuId = this.estado.veuActual;

        // Registar data do compromisso
        this.dados.veusProgresso[veuId].dataCompromisso = new Date().toISOString();

        this.dados.diario.push({
            data: new Date().toISOString(),
            veuId: veuId,
            tipo: 'compromisso',
            texto: this.dados.veusProgresso[veuId].gestoRegistado
        });

        this.guardarDados();

        this.estado.passoActual++;
        this.guardarProgressoActual();
        this.carregarPasso();
    },

    // =========================================
    // CHECK-IN
    // =========================================
    temCheckinPendente(veuId) {
        const progresso = this.dados.veusProgresso[veuId];
        if (!progresso || !progresso.dataCompromisso) return false;

        const hoje = new Date().toDateString();
        const ultimoCheckin = progresso.checkins[progresso.checkins.length - 1];

        if (ultimoCheckin) {
            const dataUltimo = new Date(ultimoCheckin.data).toDateString();
            if (dataUltimo === hoje) return false;
        }

        return true;
    },

    verificarCheckinPendente() {
        // Verificar se há check-ins pendentes ao iniciar
        for (const veuId in this.dados.veusProgresso) {
            if (this.temCheckinPendente(parseInt(veuId))) {
                // Há check-in pendente - será mostrado quando abrir o véu
                return;
            }
        }
    },

    mostrarCheckin() {
        const veuId = this.estado.veuActual;
        const progresso = this.dados.veusProgresso[veuId];

        document.getElementById('checkinData').textContent = this.formatarData(new Date());
        document.getElementById('checkinGesto').textContent = `"${progresso.gestoRegistado}"`;

        this.mostrarEcrã('checkin');
    },

    registarCheckin(resposta) {
        const veuId = this.estado.veuActual;
        const progresso = this.dados.veusProgresso[veuId];

        const checkin = {
            data: new Date().toISOString(),
            executou: resposta === 'sim'
        };

        progresso.checkins.push(checkin);

        if (!checkin.executou) {
            progresso.diasPratica++;
        }

        this.dados.diario.push({
            data: new Date().toISOString(),
            veuId: veuId,
            tipo: 'checkin',
            executou: checkin.executou
        });

        this.guardarDados();

        // Continuar para o capítulo
        this.carregarCapitulo();
    },

    // =========================================
    // ÁUDIO
    // =========================================
    mostrarAudio(passo) {
        document.getElementById('audioTitulo').textContent = passo.titulo || 'Exercício guiado';
        document.getElementById('audioDuracao').textContent = passo.duracao || '5 minutos';
        document.getElementById('audioEstado').textContent = 'Iniciar';
        document.getElementById('audioCircle').classList.remove('playing');
        this.estado.audioPlaying = false;
        document.getElementById('btnContinuar').style.display = 'none';
        this.mostrarEcrã('audio');
    },

    toggleAudio() {
        // Placeholder - em produção, isto controlaria um ficheiro de áudio real
        this.estado.audioPlaying = !this.estado.audioPlaying;
        const circle = document.getElementById('audioCircle');
        const estado = document.getElementById('audioEstado');

        if (this.estado.audioPlaying) {
            circle.classList.add('playing');
            estado.textContent = 'Pausar';
        } else {
            circle.classList.remove('playing');
            estado.textContent = 'Continuar';
        }
    },

    saltarAudio() {
        this.estado.passoActual++;
        this.guardarProgressoActual();
        this.carregarPasso();
    },

    // =========================================
    // DIÁRIO
    // =========================================
    abrirDiario() {
        this.renderizarDiario();
        this.mostrarEcrã('diario');
    },

    fecharDiario() {
        this.mostrarEcrã('mapa');
    },

    renderizarDiario() {
        const container = document.getElementById('diarioConteudo');

        if (this.dados.diario.length === 0) {
            container.innerHTML = '<p class="diario-vazio">Ainda não há registos.</p>';
            return;
        }

        // Agrupar por gesto
        const gestos = {};
        this.dados.diario.forEach(entrada => {
            if (entrada.tipo === 'gesto') {
                const key = `${entrada.veuId}-${entrada.texto}`;
                gestos[key] = {
                    ...entrada,
                    checkins: []
                };
            }
        });

        // Adicionar check-ins aos gestos
        this.dados.diario.forEach(entrada => {
            if (entrada.tipo === 'checkin') {
                const veuId = entrada.veuId;
                const gesto = this.dados.veusProgresso[veuId]?.gestoRegistado;
                const key = `${veuId}-${gesto}`;
                if (gestos[key]) {
                    gestos[key].checkins.push(entrada);
                }
            }
        });

        let html = '';
        Object.values(gestos).reverse().forEach(gesto => {
            const veuNome = CONTEUDO[gesto.veuId]?.nome || `Véu ${gesto.veuId}`;
            html += `
                <div class="diario-entrada">
                    <div class="diario-entrada-data">${this.formatarData(new Date(gesto.data))}</div>
                    <div class="diario-entrada-veu">${veuNome}</div>
                    <div class="diario-entrada-texto">"${gesto.texto}"</div>
                    ${gesto.checkins.length > 0 ? `
                        <div class="diario-entrada-checkins">
                            ${gesto.checkins.map(c => `
                                <span class="checkin-badge ${c.executou ? 'falha' : 'sucesso'}">
                                    ${this.formatarDataCurta(new Date(c.data))} — ${c.executou ? 'executei' : 'não executei'}
                                </span>
                            `).join('')}
                        </div>
                    ` : ''}
                </div>
            `;
        });

        container.innerHTML = html;
    },

    // =========================================
    // UTILIDADES
    // =========================================
    formatarData(data) {
        const opcoes = { weekday: 'long', day: 'numeric', month: 'long' };
        return data.toLocaleDateString('pt-PT', opcoes);
    },

    formatarDataCurta(data) {
        return data.toLocaleDateString('pt-PT', { day: 'numeric', month: 'short' });
    }
};

// Inicializar quando a página carregar
document.addEventListener('DOMContentLoaded', () => {
    Travessia.init();
});
