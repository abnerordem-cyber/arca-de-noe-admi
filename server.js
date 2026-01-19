const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname)));

// Arquivo de dados
const arquivoDados = path.join(__dirname, 'dados.json');

// Inicializar arquivo de dados se não existir
function inicializarDados() {
    if (!fs.existsSync(arquivoDados)) {
        const dadosIniciais = [
            {
                id: 1,
                nomeAluno: 'João Silva',
                nomeResponsavel: 'Maria Silva',
                telefone: '(85) 98765-4321',
                email: 'maria.silva@gmail.com',
                turma: 'Maternal I',
                pagamento: 'Pago'
            },
            {
                id: 2,
                nomeAluno: 'Ana Santos',
                nomeResponsavel: 'Pedro Santos',
                telefone: '(85) 99876-5432',
                email: 'pedro.santos@gmail.com',
                turma: 'Maternal II',
                pagamento: 'Não pago'
            },
            {
                id: 3,
                nomeAluno: 'Lucas Costa',
                nomeResponsavel: 'Fernanda Costa',
                telefone: '(85) 98765-5432',
                email: 'fernanda.costa@gmail.com',
                turma: 'Pré I',
                pagamento: 'Pago'
            }
        ];
        fs.writeFileSync(arquivoDados, JSON.stringify(dadosIniciais, null, 2));
    }
}

// Função para ler alunos
function lerAlunos() {
    try {
        const dados = fs.readFileSync(arquivoDados, 'utf-8');
        return JSON.parse(dados);
    } catch (erro) {
        console.error('Erro ao ler dados:', erro);
        return [];
    }
}

// Função para salvar alunos
function salvarAlunos(alunos) {
    try {
        fs.writeFileSync(arquivoDados, JSON.stringify(alunos, null, 2));
        return true;
    } catch (erro) {
        console.error('Erro ao salvar dados:', erro);
        return false;
    }
}

// ===== ROTAS =====

// GET - Obter todos os alunos
app.get('/api/alunos', (req, res) => {
    const alunos = lerAlunos();
    res.json(alunos);
});

// POST - Adicionar novo aluno
app.post('/api/alunos', (req, res) => {
    const alunos = lerAlunos();
    
    const novoAluno = {
        id: Date.now(),
        nomeAluno: req.body.nomeAluno,
        nomeResponsavel: req.body.nomeResponsavel,
        telefone: req.body.telefone,
        email: req.body.email,
        turma: req.body.turma,
        pagamento: req.body.pagamento
    };

    if (!novoAluno.nomeAluno || !novoAluno.nomeResponsavel || !novoAluno.telefone || 
        !novoAluno.email || !novoAluno.turma || !novoAluno.pagamento) {
        return res.status(400).json({ erro: 'Campos obrigatórios faltando' });
    }

    alunos.push(novoAluno);
    
    if (salvarAlunos(alunos)) {
        res.status(201).json({ mensagem: 'Aluno adicionado com sucesso', aluno: novoAluno });
    } else {
        res.status(500).json({ erro: 'Erro ao salvar aluno' });
    }
});

// PUT - Editar aluno
app.put('/api/alunos/:id', (req, res) => {
    const alunos = lerAlunos();
    const id = parseInt(req.params.id);
    const indice = alunos.findIndex(a => a.id === id);

    if (indice === -1) {
        return res.status(404).json({ erro: 'Aluno não encontrado' });
    }

    // Manter dados antigos como base
    const alunoAtualizado = { ...alunos[indice] };

    // Atualizar apenas os campos enviados
    if (req.body.nomeAluno) alunoAtualizado.nomeAluno = req.body.nomeAluno;
    if (req.body.nomeMae) alunoAtualizado.nomeMae = req.body.nomeMae;
    if (req.body.telefone) alunoAtualizado.telefone = req.body.telefone;
    if (req.body.email) alunoAtualizado.email = req.body.email;
    if (req.body.turma) alunoAtualizado.turma = req.body.turma;
    if (req.body.pagamento !== undefined) alunoAtualizado.pagamento = req.body.pagamento;
    if (req.body.mesPagamento !== undefined) alunoAtualizado.mesPagamento = req.body.mesPagamento;

    alunos[indice] = alunoAtualizado;

    if (salvarAlunos(alunos)) {
        res.json({ mensagem: 'Aluno editado com sucesso', aluno: alunos[indice] });
    } else {
        res.status(500).json({ erro: 'Erro ao salvar aluno' });
    }
});

// DELETE - Deletar aluno
app.delete('/api/alunos/:id', (req, res) => {
    const alunos = lerAlunos();
    const id = parseInt(req.params.id);
    const indice = alunos.findIndex(a => a.id === id);

    if (indice === -1) {
        return res.status(404).json({ erro: 'Aluno não encontrado' });
    }

    const alunoDeleted = alunos.splice(indice, 1);

    if (salvarAlunos(alunos)) {
        res.json({ mensagem: 'Aluno deletado com sucesso', aluno: alunoDeleted[0] });
    } else {
        res.status(500).json({ erro: 'Erro ao deletar aluno' });
    }
});

// Inicializar
inicializarDados();

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor Arca de Noé rodando em http://localhost:${PORT}`);
    console.log(`Acesse o site em seu navegador!`);
});
