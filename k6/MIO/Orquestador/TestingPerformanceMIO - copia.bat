@echo off
:: Script para ejecutar la colección de Grafana K6 MIO y generar un reporte


echo Iniciando ejecución de scripts k6...

set K6_PATH=C:\Curso\k6\grafana\k6-v0.58.0-windows-amd64\k6-v0.58.0-windows-amd64\k6.exe
set SCRIPT_PATH=C:\Curso\k6\grafana\k6\MIO\Orquestador

echo Ejecutando consultaSaldo.js
%K6_PATH% run %SCRIPT_PATH%\1-consultaSaldo.js

echo Ejecutando transferencia.js
%K6_PATH% run %SCRIPT_PATH%\2-transferencia.js

echo Ejecutando ajuste.js
%K6_PATH% run %SCRIPT_PATH%\3-ajuste.js


echo Todos los scripts han sido ejecutados.
pause
