@echo off
cd /d "C:\Users\fran\Desktop\kode pagina\v0-kode-website-build-main"

echo.
echo ========================================
echo ACTUALIZACIÓN DE CATÁLOGO - GIT COMMIT
echo ========================================
echo.

echo Estado del repositorio:
git status --short
echo.

echo Agregando cambios...
git add .
echo Hecho!
echo.

echo Creando commit...
git commit -m "Actualización de catálogo: nuevos productos y lista de precios fija" -m "Co-authored-by: Copilot <223556219+Copilot@users.noreply.github.com>"
echo.

echo Verificando commit:
git log --oneline -1
echo.

echo Haciendo push...
git push
echo.

echo ========================================
echo ✓ COMPLETADO EXITOSAMENTE
echo ========================================
echo.
echo El catálogo ha sido actualizado en el repositorio.
echo Pressione cualquier tecla para salir...
pause >nul
