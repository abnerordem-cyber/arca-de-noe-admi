# 🌐 Compartilhar Arca de Noé em Redes Diferentes

Quando os PCs estão em redes diferentes (internet diferente), existem várias soluções:

## ✅ OPÇÃO 1: ngrok (RECOMENDADO - Mais Fácil)

**ngrok** cria uma URL pública que funciona de qualquer lugar do mundo!

### Passo 1: Baixar ngrok
1. Acesse: https://ngrok.com/download
2. Baixe a versão para Windows
3. Extraia o arquivo em uma pasta (ex: `C:\ngrok`)

### Passo 2: Configurar ngrok
1. Acesse: https://ngrok.com (crie conta gratuita)
2. Copie seu **Authtoken** (em Dashboard → Auth)
3. Abra PowerShell na pasta do ngrok (`C:\ngrok`)
4. Execute:
   ```powershell
   .\ngrok.exe config add-authtoken SEU_AUTHTOKEN_AQUI
   ```

### Passo 3: Rodar o servidor e ngrok

**Terminal 1** (seu servidor Node.js):
```powershell
cd c:\Users\ADM\Downloads\escolinha
npm start
```

**Terminal 2** (ngrok):
```powershell
cd C:\ngrok
.\ngrok.exe http 3000
```

Você verá algo como:
```
Forwarding    https://abc123def456.ngrok.io -> http://localhost:3000
```

### Passo 4: Compartilhar a URL
Copie a URL `https://abc123def456.ngrok.io` e compartilhe com qualquer pessoa no mundo!

**Vantagens:**
- ✅ URL pública única
- ✅ Funciona em qualquer rede
- ✅ Sem configurações complicadas
- ✅ Grátis para uso básico

**Desvantagens:**
- URL muda quando reinicia ngrok (versão gratuita)

---

## ✅ OPÇÃO 2: localtunnel (Muito Fácil)

Alternativa mais simples ao ngrok!

### Instalação:
```powershell
npm install -g localtunnel
```

### Uso:
```powershell
lt --port 3000 --subdomain escolinha-arca-noe
```

Você receberá uma URL como:
```
https://escolinha-arca-noe.loca.lt
```

**Vantagens:**
- ✅ Instalação rápida
- ✅ Sem criar conta
- ✅ Funciona em qualquer rede

**Desvantagens:**
- Pode ser instável às vezes

---

## ✅ OPÇÃO 3: Hostname (Recomendado para Rede Corporativa)

Se você tiver acesso ao roteador/admin de TI:

1. Configure uma porta aberta no roteador (port forwarding)
2. Use seu IP público: `http://seu.ip.publico:3000`
3. Compartilhe esse endereço

**Vantagens:**
- ✅ URL fixa
- ✅ Controle total

**Desvantagens:**
- Requer acesso ao roteador
- IP público pode mudar

---

## ✅ OPÇÃO 4: Hospedar Online (Melhor para Produção)

Se quer algo mais permanente, hospede em:

### Railway.app (Grátis e Fácil)
1. Acesse: https://railway.app
2. Conecte seu GitHub ou upload direto
3. Implante o projeto
4. Sua URL: `https://seu-projeto.railway.app`

### Render.com
1. Acesse: https://render.com
2. Crie um novo **Web Service**
3. Conecte com GitHub
4. Deploy automático

### Heroku (Pago agora, mas confiável)
Instruções em: `HOSTING_HEROKU.md`

**Vantagens:**
- ✅ Sempre online
- ✅ URL profissional
- ✅ Escalável

**Desvantagens:**
- Pode ter custo
- Requer mais configuração

---

## 🎯 RECOMENDAÇÃO RÁPIDA

| Situação | Solução |
|----------|---------|
| Teste rápido com amigos | **ngrok** ou **localtunnel** |
| Rede corporativa com admin | **Port forwarding no roteador** |
| Usar sempre, 24/7 | **Railway.app** ou **Render.com** |
| Máximo de controle | **VPS/Servidor dedicado** |

---

## 🚀 CONFIGURAÇÃO NGROK DETALHADA (Passo a Passo)

### 1. Criar conta no ngrok
```
1. Abra https://ngrok.com
2. Clique em "Sign Up"
3. Use seu email
4. Confirme email
5. Faça login
```

### 2. Obter Authtoken
```
1. No dashboard, clique em "Auth" no menu esquerdo
2. Copie seu token (começa com "ngrok_")
```

### 3. Configurar ngrok no Windows
```powershell
# Na pasta C:\ngrok
.\ngrok.exe config add-authtoken ngrok_1234567890abc...

# Confirme que funcionou
.\ngrok.exe -v
```

### 4. Criar arquivo helper (opcional)

Crie arquivo `iniciar.bat` na pasta do projeto:

```batch
@echo off
echo ============================================
echo Iniciando Arca de Noé com ngrok
echo ============================================

REM Inicia o servidor Node.js em background
start "Servidor Node.js" cmd /k npm start

REM Aguarda 3 segundos
timeout /t 3

REM Inicia ngrok
start "ngrok" cmd /k "C:\ngrok\ngrok.exe http 3000"

REM Abre o navegador
timeout /t 2
start http://localhost:3000

echo.
echo Aguarde a URL do ngrok aparecer na janela do ngrok...
echo Ela terá o formato: https://xxxxx.ngrok.io
echo.
pause
```

Duplo-clique em `iniciar.bat` para rodar tudo de uma vez!

---

## 🔐 SEGURANÇA COM NGROK

Para proteger seu servidor público, adicione senha:

```powershell
.\ngrok.exe http -auth "usuario:senha" 3000
```

---

## 💡 DICA: Testar Localmente

Antes de compartilhar, teste acessando de outro PC na MESMA rede:

1. Descubra seu IP local:
   ```powershell
   ipconfig
   ```
   Procure por "IPv4 Address" (ex: 192.168.1.100)

2. Acesse de outro PC:
   ```
   http://192.168.1.100:3000
   ```

Se funcionar, está pronto para compartilhar com ngrok!

---

## ❓ Perguntas Frequentes

**P: ngrok é grátis?**
R: Sim, tem versão gratuita. URL muda quando reinicia.

**P: Posso deixar rodando 24/7?**
R: Com ngrok grátis, sim, mas a URL muda. Com ngrok Pro, URL fica fixa.

**P: É seguro compartilhar assim?**
R: Sim, use a opção de autenticação do ngrok para proteger.

**P: E se a internet cair?**
R: O site fica indisponível. Considere hospedar online para maior confiabilidade.

**P: Quantas pessoas podem acessar ao mesmo tempo?**
R: Ilimitadas (depende da velocidade internet + capacidade servidor).

---

## 🚀 Próximos Passos

1. Escolha a opção que funciona para você
2. Siga os passos acima
3. Teste a URL
4. Compartilhe!

**Dúvidas? Veja os arquivos na pasta do projeto!** 📁
