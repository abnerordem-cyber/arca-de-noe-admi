@echo off
REM Script para iniciar Arca de Noé com ngrok
REM Coloque este arquivo na pasta: c:\Users\ADM\Downloads\escolinha

echo.
echo ============================================
echo   Arca de Noé - Sistema de Administração
echo   Iniciando com ngrok...
echo ============================================
echo.

REM Verificar se ngrok está instalado
if not exist "C:\ngrok\ngrok.exe" (
    echo ERRO: ngrok não encontrado em C:\ngrok\ngrok.exe
    echo.
    echo Baixe ngrok em: https://ngrok.com/download
    echo Extraia em: C:\ngrok
    echo.
    pause
    exit /b 1
)

REM Inicia o servidor Node.js
echo [1/3] Iniciando servidor Node.js...
start "Servidor Arca de Noé" cmd /k npm start

REM Aguarda o servidor iniciar
timeout /t 3 /nobreak

REM Inicia ngrok
echo [2/3] Iniciando ngrok...
start "ngrok - Arca de Noé" cmd /k "C:\ngrok\ngrok.exe http 3000"

REM Aguarda ngrok iniciar
timeout /t 3 /nobreak

REM Abre o navegador
echo [3/3] Abrindo navegador...
timeout /t 1 /nobreak
start http://localhost:3000

echo.
echo ============================================
echo   Sucesso!
echo ============================================
echo.
echo Servidor rodando em: http://localhost:3000
echo.
echo Procure a URL do ngrok na janela que abriu
echo Será algo como: https://xxxxx.ngrok.io
echo.
echo Compartilhe essa URL com outras pessoas!
echo.
pause
