# 🚀 Arca de Noé - Sistema de Administração Escolar

Um site simples, funcional e responsivo para administração de uma escolinha infantil.

## 📋 Funcionalidades

- 📊 Dashboard com estatísticas em tempo real
- ➕ Cadastro de alunos com validação
- 👥 Listagem com filtros avançados
- 📝 Edição de dados dos alunos
- 🗑️ Exclusão de alunos com confirmação
- 💳 Controle de pagamentos
- 📈 Relatórios por turma
- 💾 Dados compartilhados entre todos os usuários (sincronizado com servidor)

## 🛠️ Como Instalar e Rodar

### Pré-requisitos
- Node.js instalado (https://nodejs.org/)
- npm (vem com Node.js)

### Passos

1. **Abra o terminal/PowerShell** na pasta do projeto
   ```
   cd c:\Users\ADM\Downloads\escolinha
   ```

2. **Instale as dependências**
   ```
   npm install
   ```

3. **Inicie o servidor**
   ```
   npm start
   ```

   Você verá uma mensagem como:
   ```
   🎉 Servidor Arca de Noé rodando em http://localhost:3000
   Acesse o site em seu navegador!
   ```

4. **Abra o navegador** e acesse:
   ```
   http://localhost:3000
   ```

## 🎨 Design

- **Cores principais**: Branco, Laranja e Azul
- **Responsivo**: Funciona em celular, tablet e computador
- **Interface intuitiva**: Fácil de usar para qualquer pessoa

## 📱 Como Usar

### Dashboard
- Visualize o total de alunos
- Veja quantos pagaram e não pagaram
- Acesse rápido cada turma clicando nos cards

### Cadastro de Alunos
- Preencha o formulário com os dados do aluno
- Clique em "Salvar Aluno"
- Os dados são sincronizados com todos os usuários conectados

### Listar Alunos
- Use os filtros para encontrar alunos específicos
- Clique em "Editar" para modificar dados
- Clique em "Marcar Pago/Não Pago" para alterar status de pagamento
- Clique em "Deletar" para remover um aluno

### Relatório
- Veja resumos por turma
- Exporte os dados em arquivo TXT

## 💾 Dados Persistentes

Os dados são salvos em um arquivo `dados.json` no servidor. Todos os usuários que acessarem o site verão as mesmas informações em tempo real.

## 📝 Estrutura do Projeto

```
escolinha/
├── index.html      # Página principal
├── styles.css      # Estilos e design responsivo
├── script.js       # Lógica da aplicação
├── server.js       # Servidor Node.js
├── package.json    # Dependências do projeto
├── dados.json      # Arquivo de armazenamento de dados (gerado automaticamente)
└── README.md       # Este arquivo
```

## 🚀 Dicas

- O servidor salva os dados automaticamente no arquivo `dados.json`
- Para compartilhar o site com outras pessoas, elas precisam acessar o IP/domínio do seu computador na porta 3000
- Se o servidor parar, você pode reiniciar com `npm start`
- Para parar o servidor, pressione `Ctrl + C` no terminal

## ⚠️ Importante

- Sempre faça backup dos dados em `dados.json` se tiver informações importantes
- O botão "Limpar Dados" deleta todos os alunos permanentemente
- Cuidado ao usar em produção - considere usar um banco de dados robusto

## 📧 Suporte

Em caso de dúvidas, verifique:
1. Se o servidor está rodando (deve mostrar a mensagem de sucesso)
2. Se você está acessando em `http://localhost:3000`
3. Se as dependências foram instaladas com `npm install`

Aproveite o sistema! 🎉
