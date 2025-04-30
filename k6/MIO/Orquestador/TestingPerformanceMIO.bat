@echo off
echo Iniciando ejecución de scripts k6...

rem Obtener la carpeta actual donde está el .bat
set "BASE_PATH=%~dp0"

rem Definir la ruta de k6.exe (en subcarpeta)
set "K6_PATH=%BASE_PATH%.\k6.exe"

rem Como los scripts están en la misma carpeta que el .bat
rem No necesitas más rutas, solo usar directamente los nombres de los archivos

echo Ejecutando consultaSaldo.js
"%K6_PATH%" run "%BASE_PATH%1-consultaSaldo.js"

echo Ejecutando transferencia.js
"%K6_PATH%" run "%BASE_PATH%2-transferencia.js"

echo Ejecutando ajuste.js
"%K6_PATH%" run "%BASE_PATH%3-ajuste.js"

echo Ejecutando cierreCuenta.js
"%K6_PATH%" run "%BASE_PATH%4-cierreCuenta.js"

echo Todos los scripts han sido ejecutados.
pause
