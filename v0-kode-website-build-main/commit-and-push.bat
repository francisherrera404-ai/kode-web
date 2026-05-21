@echo off
setlocal enabledelayedexpansion

REM Cambiar al directorio del proyecto
cd /d "C:\Users\fran\Desktop\kode pagina\v0-kode-website-build-main"

REM Verificar estado
echo.
echo ===== GIT STATUS =====
git status --short

echo.
echo ===== GIT LOG (últimos 5 commits) =====
git log --oneline -5

echo.
echo ===== AGREGANDO CAMBIOS =====
git add .

echo.
echo ===== CREANDO COMMIT =====
git commit -m "Actualización de catálogo: nuevos productos y lista de precios fija" -m "Co-authored-by: Copilot <223556219+Copilot@users.noreply.github.com>"

echo.
echo ===== VERIFICANDO COMMIT =====
git log --oneline -1

echo.
echo ===== HACIENDO PUSH =====
git push

echo.
echo ===== COMPLETADO =====
echo Commit y push realizados exitosamente.

pause
