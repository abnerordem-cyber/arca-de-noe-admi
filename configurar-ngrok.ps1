Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "   Arca de Noe - Configuracao ngrok" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

Write-Host "Siga estes passos:" -ForegroundColor Yellow
Write-Host "1. Acesse: https://dashboard.ngrok.com/auth"
Write-Host "2. Copie seu Authtoken (comeca com 'ngrok_')"
Write-Host ""

$authtoken = Read-Host "Cole seu Authtoken aqui"

if ($authtoken -eq "") {
    Write-Host "Erro: Token nao fornecido!" -ForegroundColor Red
    exit
}

Write-Host ""
Write-Host "Configurando ngrok..." -ForegroundColor Yellow

$ngrokPath = "C:\ngrok\ngrok.exe"

if (-not (Test-Path $ngrokPath)) {
    Write-Host "Erro: ngrok nao encontrado em C:\ngrok" -ForegroundColor Red
    Write-Host "Baixe em: https://ngrok.com/download" -ForegroundColor Cyan
    exit
}

& $ngrokPath config add-authtoken $authtoken

Write-Host ""
Write-Host "Iniciando ngrok..." -ForegroundColor Yellow
Write-Host ""
Write-Host "Sua URL publica aparecera abaixo:" -ForegroundColor Cyan
Write-Host "(Procure por 'Forwarding' - copie o link https://)" -ForegroundColor Cyan
Write-Host ""

& $ngrokPath http 3000
