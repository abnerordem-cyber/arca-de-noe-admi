@echo off
REM Script para iniciar Arca de Noé com localtunnel
REM Mais simples que ngrok!

echo.
echo ============================================
echo   Arca de Noé com localtunnel
echo   (Mais simples que ngrok)
echo ============================================
echo.

REM Inicia o servidor Node.js
echo [1/2] Iniciando servidor Node.js...
start "Servidor Arca de Noé" cmd /k npm start

REM Aguarda o servidor iniciar
timeout /t 3 /nobreak

REM Inicia localtunnel
echo [2/2] Iniciando localtunnel...
echo.
echo Aguarde... Você verá a URL no terminal abaixo
echo.

start "localtunnel" cmd /k "lt --port 3000"

REM Abre o navegador
timeout /t 2 /nobreak
start http://localhost:3000

echo.
echo ============================================
echo   Sucesso!
echo ============================================
echo.
echo Procure pela URL no terminal do localtunnel
echo Será algo como: https://escolinha.loca.lt
echo.
echo Compartilhe essa URL!
echo.
pause
