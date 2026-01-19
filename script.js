// ===== VARIÁVEIS GLOBAIS =====
let alunos = [];
let alunoEmEdicao = null;

// Detectar URL automaticamente (funciona com ngrok e localhost)
const API_URL = window.location.hostname === 'localhost' 
  ? 'http://localhost:3000/api/alunos'
  : window.location.origin + '/api/alunos';

// ===== INICIALIZAÇÃO =====
document.addEventListener('DOMContentLoaded', function() {
    // Mostrar splash screen e depois carregar dados
    exibirSplashScreen();
    carregarAlunos();
});

// ===== SPLASH SCREEN =====
function exibirSplashScreen() {
    const splashScreen = document.getElementById('splashScreen');
    
    if (splashScreen) {
        // A splash screen desaparece após 2 segundos
        setTimeout(() => {
            splashScreen.classList.add('fade-out');
        }, 1500);
    }
}

// ===== API CALLS =====
async function carregarAlunos() {
    try {
        const response = await fetch(API_URL);
        if (response.ok) {
            alunos = await response.json();
        } else {
            console.error('Erro ao carregar alunos');
        }
    } catch (erro) {
        console.error('Erro de conexão com servidor:', erro);
        alert('Erro ao conectar ao servidor. Verifique se o servidor está rodando em http://localhost:3000');
    }
    atualizarDashboard();
    aplicarFiltros();
    atualizarRelatorio();
}

async function salvarAlunoNoServidor(aluno) {
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(aluno)
        });
        return response.ok;
    } catch (erro) {
        console.error('Erro ao salvar aluno:', erro);
        return false;
    }
}

async function editarAlunoNoServidor(id, aluno) {
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(aluno)
        });
        return response.ok;
    } catch (erro) {
        console.error('Erro ao editar aluno:', erro);
        return false;
    }
}

async function deletarAlunoDoServidor(id) {
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'DELETE'
        });
        return response.ok;
    } catch (erro) {
        console.error('Erro ao deletar aluno:', erro);
        return false;
    }
}

// ===== NAVEGAÇÃO =====
function showPage(pageName) {
    // Fechar menu mobile
    fecharMenu();

    // Esconder todas as páginas
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => page.classList.remove('active'));

    // Remover classe active de todos os itens do menu
    const menuItems = document.querySelectorAll('.menu-item');
    menuItems.forEach(item => item.classList.remove('active'));

    // Mostrar página selecionada
    const pageAtual = document.getElementById(pageName);
    if (pageAtual) {
        pageAtual.classList.add('active');

        // Adicionar classe active ao item do menu
        const menuItem = document.querySelector(`[onclick="showPage('${pageName}')"]`);
        if (menuItem) {
            menuItem.classList.add('active');
        }

        // Atualizar título
        const titulo = document.getElementById('page-title');
        const titulos = {
            'dashboard': 'Dashboard',
            'cadastro': 'Cadastrar Aluno',
            'alunos': 'Listar Alunos',
            'relatorio': 'Relatório'
        };
        titulo.textContent = titulos[pageName] || pageName;

        // Atualizar dados da página
        if (pageName === 'dashboard') {
            atualizarDashboard();
        } else if (pageName === 'alunos') {
            aplicarFiltros();
        } else if (pageName === 'relatorio') {
            atualizarRelatorio();
        }
    }
}

// Menu hamburger
function toggleMenu() {
    const sidebar = document.getElementById('sidebar');
    sidebar.classList.toggle('active');
}

function fecharMenu() {
    const sidebar = document.getElementById('sidebar');
    sidebar.classList.remove('active');
}

// ===== ADICIONAR ALUNO =====
async function adicionarAluno(event) {
    event.preventDefault();

    const ano = document.getElementById('ano').value;
    const periodo = document.getElementById('periodo').value;
    const turno = document.getElementById('turno').value;
    const nomeAluno = document.getElementById('nome-aluno').value;
    const dataNasc = document.getElementById('data-nasc').value;
    const idade = document.getElementById('idade').value;
    const naturalidade = document.getElementById('naturalidade').value;
    const nacionalidade = document.getElementById('nacionalidade').value;
    const endereco = document.getElementById('endereco').value;
    const complemento = document.getElementById('complemento').value;
    const bairro = document.getElementById('bairro').value;
    const cidade = document.getElementById('cidade').value;
    const cep = document.getElementById('cep').value;
    const telefone = document.getElementById('telefone').value;
    const celular = document.getElementById('celular').value;
    const email = document.getElementById('email').value;
    const nomeResponsavel = document.getElementById('nome-responsavel').value;
    const nomePai = document.getElementById('nome-pai').value;
    const nomeMae = document.getElementById('nome-mae').value;
    const cpf = document.getElementById('cpf').value;
    const rg = document.getElementById('rg').value;
    const turma = document.getElementById('turma').value;
    const professor = document.getElementById('professor').value;
    const profissao = document.getElementById('profissao').value;
    const estadoCivil = document.getElementById('estado-civil').value;
    const mesPagamento = document.getElementById('mes-pagamento').value;
    const pagamento = document.getElementById('pagamento').value;

    if (!nomeAluno || !nomeResponsavel || !turma || !pagamento) {
        alert('Por favor, preencha os campos obrigatórios (Nome, Responsável, Turma e Pagamento)!');
        return;
    }

    const novoAluno = {
        ano,
        periodo,
        turno,
        nomeAluno,
        dataNasc,
        idade,
        naturalidade,
        nacionalidade,
        endereco,
        complemento,
        bairro,
        cidade,
        cep,
        telefone,
        celular,
        email,
        nomeResponsavel,
        nomePai,
        nomeMae,
        cpf,
        rg,
        turma,
        professor,
        profissao,
        estadoCivil,
        mesPagamento,
        pagamento
    };

    const sucesso = await salvarAlunoNoServidor(novoAluno);
    
    if (sucesso) {
        alert('Aluno adicionado com sucesso!');
        document.getElementById('form-aluno').reset();
        await carregarAlunos();
    } else {
        alert('Erro ao adicionar aluno. Verifique sua conexão.');
    }
}

// ===== EDITAR ALUNO =====
function abrirModalEdicao(id) {
    const aluno = alunos.find(a => a.id === id);
    if (!aluno) return;

    alunoEmEdicao = id;
    document.getElementById('editar-id').value = id;
    document.getElementById('editar-nome-aluno').value = aluno.nomeAluno;
    document.getElementById('editar-nome-responsavel').value = aluno.nomeResponsavel;
    document.getElementById('editar-telefone').value = aluno.telefone;
    document.getElementById('editar-email').value = aluno.email;
    document.getElementById('editar-turma').value = aluno.turma;
    document.getElementById('editar-pagamento').value = aluno.pagamento;

    const modal = document.getElementById('modal-editar');
    modal.classList.add('active');
}

function fecharModal() {
    const modal = document.getElementById('modal-editar');
    modal.classList.remove('active');
    alunoEmEdicao = null;
}

function salvarEdicao(event) {
    event.preventDefault();

    const id = parseInt(document.getElementById('editar-id').value);
    
    const alunoAtualizado = {
        nomeAluno: document.getElementById('editar-nome-aluno').value,
        nomeResponsavel: document.getElementById('editar-nome-responsavel').value,
        telefone: document.getElementById('editar-telefone').value,
        email: document.getElementById('editar-email').value,
        turma: document.getElementById('editar-turma').value,
        pagamento: document.getElementById('editar-pagamento').value
    };

    editarAlunoNoServidor(id, alunoAtualizado).then(sucesso => {
        if (sucesso) {
            alert('Aluno editado com sucesso!');
            fecharModal();
            carregarAlunos();
        } else {
            alert('Erro ao editar aluno. Verifique sua conexão.');
        }
    });
}

// ===== DELETAR ALUNO =====
function deletarAluno(id) {
    const aluno = alunos.find(a => a.id === id);
    if (!aluno) return;

    const confirmar = confirm(`Tem certeza que deseja deletar ${aluno.nomeAluno}? Esta ação não pode ser desfeita!`);
    if (!confirmar) return;

    deletarAlunoDoServidor(id).then(sucesso => {
        if (sucesso) {
            alert('Aluno deletado com sucesso!');
            carregarAlunos();
        } else {
            alert('Erro ao deletar aluno. Verifique sua conexão.');
        }
    });
}

// ===== ALTERNAR STATUS DE PAGAMENTO =====
function alternarPagamento(id) {
    const aluno = alunos.find(a => a.id === id);
    if (!aluno) return;

    const novoPagamento = aluno.pagamento === 'Pago' ? 'Não pago' : 'Pago';
    const alunoAtualizado = { ...aluno, pagamento: novoPagamento };
    
    editarAlunoNoServidor(id, alunoAtualizado).then(sucesso => {
        if (sucesso) {
            carregarAlunos();
        } else {
            alert('Erro ao atualizar pagamento. Verifique sua conexão.');
        }
    });
}

// ===== FILTROS =====
function aplicarFiltros() {
    const filtroPagamento = document.getElementById('filtro-pagamento').value;
    const filtroTurma = document.getElementById('filtro-turma').value;
    const filtroAno = document.getElementById('filtro-ano').value;
    const filtroMes = document.getElementById('filtro-mes').value;
    const buscaNome = document.getElementById('busca-nome').value.toLowerCase();

    const alunosFiltrados = alunos.filter(aluno => {
        let corresponde = true;

        if (filtroPagamento && aluno.pagamento !== filtroPagamento) {
            corresponde = false;
        }

        if (filtroTurma && aluno.turma !== filtroTurma) {
            corresponde = false;
        }

        if (filtroAno && aluno.ano && aluno.ano.toString() !== filtroAno) {
            corresponde = false;
        }

        if (filtroMes && aluno.mesPagamento !== filtroMes) {
            corresponde = false;
        }

        if (buscaNome && !aluno.nomeAluno.toLowerCase().includes(buscaNome)) {
            corresponde = false;
        }

        return corresponde;
    });

    preencherTabela(alunosFiltrados);
}

function limparFiltros() {
    document.getElementById('filtro-pagamento').value = '';
    document.getElementById('filtro-turma').value = '';
    document.getElementById('filtro-ano').value = '';
    document.getElementById('filtro-mes').value = '';
    document.getElementById('busca-nome').value = '';
    aplicarFiltros();
}

// ===== PREENCHER TABELA =====
function preencherTabela(alunosFiltrados) {
    const tabelaBody = document.getElementById('tabela-body');
    const tabelaCards = document.getElementById('tabela-cards');
    const mensagemVazia = document.getElementById('mensagem-vazia');

    if (alunosFiltrados.length === 0) {
        tabelaBody.innerHTML = '';
        tabelaCards.innerHTML = '';
        mensagemVazia.style.display = 'block';
        return;
    }

    mensagemVazia.style.display = 'none';

    // Preencher tabela para desktop
    tabelaBody.innerHTML = alunosFiltrados.map(aluno => `
        <tr>
            <td><strong>${aluno.nomeAluno}</strong></td>
            <td>${aluno.nomeResponsavel}</td>
            <td>${aluno.telefone}</td>
            <td>${aluno.email}</td>
            <td>${aluno.turma}</td>
            <td>
                <span class="status-${aluno.pagamento === 'Pago' ? 'pago' : 'nao-pago'}">
                    ${aluno.pagamento === 'Pago' ? 'Pago' : 'Não pago'}
                </span>
            </td>
            <td>
                <div class="acoes">
                    <button class="btn btn-primary btn-small" onclick="abrirModalEdicao(${aluno.id})">Editar</button>
                    <button class="btn btn-alerta btn-small" onclick="alternarPagamento(${aluno.id})">
                        ${aluno.pagamento === 'Pago' ? 'Marcar não pago' : 'Marcar pago'}
                    </button>
                    <button class="btn btn-danger btn-small" onclick="deletarAluno(${aluno.id})">Deletar</button>
                </div>
            </td>
        </tr>
    `).join('');

    // Preencher cards para mobile
    tabelaCards.innerHTML = alunosFiltrados.map(aluno => `
        <div class="aluno-card">
            <div class="aluno-card-nome">${aluno.nomeAluno}</div>
            <div class="aluno-card-info">
                <span class="aluno-card-label">Responsável:</span>
                <span class="aluno-card-valor">${aluno.nomeResponsavel}</span>
            </div>
            <div class="aluno-card-info">
                <span class="aluno-card-label">Telefone:</span>
                <span class="aluno-card-valor">${aluno.telefone}</span>
            </div>
            <div class="aluno-card-info">
                <span class="aluno-card-label">E-mail:</span>
                <span class="aluno-card-valor">${aluno.email}</span>
            </div>
            <div class="aluno-card-info">
                <span class="aluno-card-label">Turma:</span>
                <span class="aluno-card-valor">${aluno.turma}</span>
            </div>
            <div class="aluno-card-status ${aluno.pagamento === 'Pago' ? 'pago' : 'nao-pago'}">
                ${aluno.pagamento === 'Pago' ? 'PAGO' : 'NÃO PAGO'}
            </div>
            <div class="aluno-card-acoes">
                <button class="btn btn-primary" onclick="abrirModalEdicao(${aluno.id})">Editar</button>
                <button class="btn btn-alerta" onclick="alternarPagamento(${aluno.id})">
                    ${aluno.pagamento === 'Pago' ? 'Marcar não pago' : 'Marcar pago'}
                </button>
                <button class="btn btn-danger" onclick="deletarAluno(${aluno.id})">Deletar</button>
            </div>
        </div>
    `).join('');
}

// ===== DASHBOARD =====
function atualizarDashboard() {
    // Estatísticas gerais
    const totalAlunos = alunos.length;
    const alunosPagos = alunos.filter(a => a.pagamento === 'Pago').length;
    const alunosNaoPagos = alunos.filter(a => a.pagamento === 'Não pago').length;

    document.getElementById('total-alunos').textContent = totalAlunos;
    document.getElementById('alunos-pagos').textContent = alunosPagos;
    document.getElementById('alunos-nao-pagos').textContent = alunosNaoPagos;

    // Acesso rápido por turma
    const turmas = ['Berçário', 'Maternal I', 'Maternal II', 'Pré I', 'Pré II'];
    const turmasRapido = document.getElementById('turmas-rapido');
    
    turmasRapido.innerHTML = turmas.map(turma => {
        const alunosTurma = alunos.filter(a => a.turma === turma);
        const pagosTurma = alunosTurma.filter(a => a.pagamento === 'Pago').length;
        return `
            <div class="turma-card" onclick="filtrarPorTurma('${turma}')">
                <h4>${turma}</h4>
                <p>Total: ${alunosTurma.length}</p>
                <p>Pagos: ${pagosTurma}</p>
            </div>
        `;
    }).join('');

    // Atualizar gráficos
    gerarGraficos();
}

function gerarGraficos() {
    gerarGraficoTurmas();
    gerarGraficoPagamento();
    gerarGraficoAnos();
    gerarGraficoEstadoCivil();
    gerarGraficoPeriodo();
    gerarGraficoPagamentoMes();
}

function gerarGraficoTurmas() {
    const turmas = ['Berçário', 'Maternal I', 'Maternal II', 'Pré I', 'Pré II'];
    const dadosTurmas = turmas.map(turma => alunos.filter(a => a.turma === turma).length);
    
    const ctx = document.getElementById('graficoTurmas');
    if (!ctx) return;
    
    // Destruir gráfico anterior se existir
    if (window.graficoTurmasInstance) {
        window.graficoTurmasInstance.destroy();
    }
    
    window.graficoTurmasInstance = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: turmas,
            datasets: [{
                label: 'Quantidade de Alunos',
                data: dadosTurmas,
                backgroundColor: [
                    '#FF6B35',
                    '#FF8C5A',
                    '#FF9D6F',
                    '#004E89',
                    '#00365D'
                ],
                borderColor: '#ffffff',
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    display: true,
                    labels: {
                        font: { size: 12 }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    max: Math.max(...dadosTurmas) + 2
                }
            }
        }
    });
}

function gerarGraficoPagamento() {
    const alunosPagos = alunos.filter(a => a.pagamento === 'Pago').length;
    const alunosNaoPagos = alunos.filter(a => a.pagamento === 'Não pago').length;
    
    const ctx = document.getElementById('graficoPagamento');
    if (!ctx) return;
    
    // Destruir gráfico anterior se existir
    if (window.graficoPagamentoInstance) {
        window.graficoPagamentoInstance.destroy();
    }
    
    window.graficoPagamentoInstance = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Pagos', 'Não Pagos'],
            datasets: [{
                data: [alunosPagos, alunosNaoPagos],
                backgroundColor: [
                    '#004E89',
                    '#FF6B35'
                ],
                borderColor: '#ffffff',
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    display: true,
                    position: 'bottom',
                    labels: {
                        font: { size: 12 },
                        padding: 15
                    }
                }
            }
        }
    });
}

function gerarGraficoAnos() {
    const anos = [...new Set(alunos.map(a => a.ano))].filter(a => a).sort();
    const dadosAnos = anos.map(ano => alunos.filter(a => a.ano === ano).length);
    
    const ctx = document.getElementById('graficoAnos');
    if (!ctx) return;
    
    if (window.graficoAnosInstance) {
        window.graficoAnosInstance.destroy();
    }
    
    window.graficoAnosInstance = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: anos.map(a => a.toString()),
            datasets: [{
                label: 'Quantidade de Alunos',
                data: dadosAnos,
                backgroundColor: '#004E89',
                borderColor: '#ffffff',
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

function gerarGraficoEstadoCivil() {
    const estadosCivis = [...new Set(alunos.map(a => a.estadoCivil))].filter(a => a);
    const dadosEstados = estadosCivis.map(estado => alunos.filter(a => a.estadoCivil === estado).length);
    
    const ctx = document.getElementById('graficoEstadoCivil');
    if (!ctx) return;
    
    if (window.graficoEstadoCivilInstance) {
        window.graficoEstadoCivilInstance.destroy();
    }
    
    window.graficoEstadoCivilInstance = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: estadosCivis,
            datasets: [{
                data: dadosEstados,
                backgroundColor: [
                    '#FF6B35',
                    '#004E89',
                    '#FF9D6F',
                    '#00365D'
                ],
                borderColor: '#ffffff',
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    display: true,
                    position: 'bottom'
                }
            }
        }
    });
}

function gerarGraficoPeriodo() {
    const periodos = [...new Set(alunos.map(a => a.periodo))].filter(a => a);
    const dadosPeriodos = periodos.map(periodo => alunos.filter(a => a.periodo === periodo).length);
    
    const ctx = document.getElementById('graficoPeriodo');
    if (!ctx) return;
    
    if (window.graficoPeriodoInstance) {
        window.graficoPeriodoInstance.destroy();
    }
    
    window.graficoPeriodoInstance = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: periodos,
            datasets: [{
                label: 'Quantidade de Alunos',
                data: dadosPeriodos,
                backgroundColor: '#FF9D6F',
                borderColor: '#ffffff',
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

function gerarGraficoPagamentoMes() {
    const meses = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
    const mesesNum = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    
    const dadosPagosPorMes = mesesNum.map(mes => alunos.filter(a => a.mesPagamento == mes && a.pagamento === 'Pago').length);
    const dadosNaoPagosPorMes = mesesNum.map(mes => alunos.filter(a => a.mesPagamento == mes && a.pagamento !== 'Pago').length);
    
    const ctx = document.getElementById('graficoPagamentoMes');
    if (!ctx) return;
    
    if (window.graficoPagamentoMesInstance) {
        window.graficoPagamentoMesInstance.destroy();
    }
    
    window.graficoPagamentoMesInstance = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: meses,
            datasets: [
                {
                    label: 'Pagos',
                    data: dadosPagosPorMes,
                    backgroundColor: '#004E89',
                    borderColor: '#ffffff',
                    borderWidth: 1
                },
                {
                    label: 'Não Pagos',
                    data: dadosNaoPagosPorMes,
                    backgroundColor: '#FF6B35',
                    borderColor: '#ffffff',
                    borderWidth: 1
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            scales: {
                x: {
                    stacked: false
                },
                y: {
                    beginAtZero: true,
                    stacked: false
                }
            },
            plugins: {
                legend: {
                    display: true,
                    position: 'top'
                }
            }
        }
    });
}

function filtrarPorTurma(turma) {
    showPage('alunos');
    document.getElementById('filtro-turma').value = turma;
    aplicarFiltros();
}

// ===== RELATÓRIO =====
function atualizarRelatorio() {
    // Resumo de turmas
    const turmas = ['Berçário', 'Maternal I', 'Maternal II', 'Pré I', 'Pré II'];
    const resumoTurmas = document.getElementById('resumo-turmas');
    
    resumoTurmas.innerHTML = turmas.map(turma => {
        const alunosTurma = alunos.filter(a => a.turma === turma);
        const pagosTurma = alunosTurma.filter(a => a.pagamento === 'Pago').length;
        const naoPagosTurma = alunosTurma.length - pagosTurma;
        
        return `
            <div class="relatorio-item">
                <span class="relatorio-label">${turma}</span>
                <span class="relatorio-valor">${alunosTurma.length} alunos (${pagosTurma} pagos / ${naoPagosTurma} não pagos)</span>
            </div>
        `;
    }).join('');
}

// ===== EXPORTAR DADOS =====
function exportarDados() {
    if (alunos.length === 0) {
        alert('Nenhum aluno para exportar!');
        return;
    }

    let texto = '=== RELATÓRIO ARCA DE NOÉ ===\n\n';
    texto += `Data: ${new Date().toLocaleDateString('pt-BR')}\n`;
    texto += `Hora: ${new Date().toLocaleTimeString('pt-BR')}\n\n`;

    // Estatísticas gerais
    texto += '=== ESTATÍSTICAS GERAIS ===\n';
    texto += `Total de Alunos: ${alunos.length}\n`;
    texto += `Alunos que Pagaram: ${alunos.filter(a => a.pagamento === 'Pago').length}\n`;
    texto += `Alunos que Não Pagaram: ${alunos.filter(a => a.pagamento === 'Não pago').length}\n\n`;

    // Dados detalhados
    texto += '=== DETALHES DOS ALUNOS ===\n\n';
    alunos.forEach(aluno => {
        texto += `Nome: ${aluno.nomeAluno}\n`;
        texto += `Responsável: ${aluno.nomeResponsavel}\n`;
        texto += `Telefone: ${aluno.telefone}\n`;
        texto += `E-mail: ${aluno.email}\n`;
        texto += `Turma: ${aluno.turma}\n`;
        texto += `Pagamento: ${aluno.pagamento}\n`;
        texto += '---\n\n';
    });

    // Resumo por turma
    texto += '=== RESUMO POR TURMA ===\n\n';
    const turmas = ['Berçário', 'Maternal I', 'Maternal II', 'Pré I', 'Pré II'];
    turmas.forEach(turma => {
        const alunosTurma = alunos.filter(a => a.turma === turma);
        if (alunosTurma.length > 0) {
            const pagosTurma = alunosTurma.filter(a => a.pagamento === 'Pago').length;
            texto += `${turma}: ${alunosTurma.length} alunos (${pagosTurma} pagos, ${alunosTurma.length - pagosTurma} não pagos)\n`;
        }
    });

    // Criar arquivo
    const elemento = document.createElement('a');
    elemento.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(texto));
    elemento.setAttribute('download', `relatorio_arca_noe_${new Date().toISOString().slice(0, 10)}.txt`);
    elemento.style.display = 'none';
    document.body.appendChild(elemento);
    elemento.click();
    document.body.removeChild(elemento);

    alert('Relatório exportado com sucesso!');
}

// ===== EXPORTAR PARA EXCEL =====
function exportarParaExcel() {
    if (alunos.length === 0) {
        alert('Nenhum aluno para exportar!');
        return;
    }

    let html = '<table border="1"><tr><th>Nome</th><th>Responsável</th><th>Telefone</th><th>Celular</th><th>Email</th><th>Turma</th><th>Ano</th><th>Período</th><th>Pagamento</th><th>Mês Pagamento</th><th>Professor</th><th>CPF</th><th>RG</th></tr>';
    
    alunos.forEach(aluno => {
        html += `<tr>
            <td>${aluno.nomeAluno}</td>
            <td>${aluno.nomeResponsavel}</td>
            <td>${aluno.telefone}</td>
            <td>${aluno.celular || ''}</td>
            <td>${aluno.email}</td>
            <td>${aluno.turma}</td>
            <td>${aluno.ano || ''}</td>
            <td>${aluno.periodo || ''}</td>
            <td>${aluno.pagamento}</td>
            <td>${aluno.mesPagamento || ''}</td>
            <td>${aluno.professor || ''}</td>
            <td>${aluno.cpf || ''}</td>
            <td>${aluno.rg || ''}</td>
        </tr>`;
    });
    html += '</table>';

    const elemento = document.createElement('a');
    const blob = new Blob([html], { type: 'application/vnd.ms-excel;charset=utf-8' });
    elemento.href = URL.createObjectURL(blob);
    elemento.download = `alunos_arca_noe_${new Date().toISOString().slice(0, 10)}.xls`;
    document.body.appendChild(elemento);
    elemento.click();
    document.body.removeChild(elemento);

    alert('Dados exportados para Excel com sucesso!');
}

// ===== EXPORTAR PARA CSV =====
function exportarParaCSV() {
    if (alunos.length === 0) {
        alert('Nenhum aluno para exportar!');
        return;
    }

    let csv = 'Nome,Responsável,Telefone,Celular,Email,Turma,Ano,Período,Turno,Data Nascimento,Idade,Naturalidade,Nacionalidade,Endereço,Bairro,Cidade,CEP,Nome Pai,Nome Mãe,Pagamento,Mês Pagamento,Professor,CPF,RG,Profissão,Estado Civil\n';
    
    alunos.forEach(aluno => {
        csv += `"${aluno.nomeAluno}","${aluno.nomeResponsavel}","${aluno.telefone}","${aluno.celular || ''}","${aluno.email}","${aluno.turma}","${aluno.ano || ''}","${aluno.periodo || ''}","${aluno.turno || ''}","${aluno.dataNasc || ''}","${aluno.idade || ''}","${aluno.naturalidade || ''}","${aluno.nacionalidade || ''}","${aluno.endereco || ''}","${aluno.bairro || ''}","${aluno.cidade || ''}","${aluno.cep || ''}","${aluno.nomePai || ''}","${aluno.nomeMae || ''}","${aluno.pagamento}","${aluno.mesPagamento || ''}","${aluno.professor || ''}","${aluno.cpf || ''}","${aluno.rg || ''}","${aluno.profissao || ''}","${aluno.estadoCivil || ''}"\n`;
    });

    const elemento = document.createElement('a');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    elemento.href = URL.createObjectURL(blob);
    elemento.download = `alunos_arca_noe_${new Date().toISOString().slice(0, 10)}.csv`;
    document.body.appendChild(elemento);
    elemento.click();
    document.body.removeChild(elemento);

    alert('Dados exportados para CSV com sucesso!');
}

// ===== LIMPAR TODOS OS DADOS =====
function limparTodosDados() {
    const confirmar = confirm('ATENÇÃO: Isso deletará TODOS os dados salvos! Tem certeza? Esta ação NÃO pode ser desfeita!');
    if (!confirmar) return;

    const confirmarNovamente = confirm('Tem absoluta certeza? Clique OK para confirmar ou Cancelar para desistir.');
    if (!confirmarNovamente) return;

    // Deletar todos os alunos
    alunos.forEach(aluno => {
        deletarAlunoDoServidor(aluno.id);
    });

    setTimeout(() => {
        alert('Todos os dados foram deletados!');
        carregarAlunos();
    }, 1000);
}

// ===== FECHAR MODAL CLICANDO FORA =====
window.onclick = function(event) {
    const modal = document.getElementById('modal-editar');
    if (event.target === modal) {
        fecharModal();
    }
}

// ===== ESTILO PARA BOTÃO ALERTA =====
const style = document.createElement('style');
style.textContent = `
    .btn-alerta {
        background-color: #FF9800;
    }
    .btn-alerta:hover {
        background-color: #F57C00;
    }
`;
document.head.appendChild(style);
