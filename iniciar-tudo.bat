@echo off
REM Script simples para iniciar tudo

echo.
echo ========================================
echo   Iniciando Arca de Noe
echo ========================================
echo.

REM Iniciar servidor Node.js
echo [1] Iniciando servidor...
start "Servidor Arca de Noe" cmd /k npm start

REM Aguardar
timeout /t 3 /nobreak

REM Iniciar ngrok
echo [2] Iniciando ngrok...
start "ngrok Arca de Noe" cmd /k "ngrok http 3000"

REM Aguardar
timeout /t 3 /nobreak

REM Abrir navegador
echo [3] Abrindo navegador...
start http://localhost:3000

echo.
echo ========================================
echo   Iniciado!
echo ========================================
echo.
echo Procure a URL do ngrok na janela ngrok
echo (algo como: https://xxxxx.ngrok.io)
echo.
pause
