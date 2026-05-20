@echo off
setlocal

echo ============================================================
echo   Antigravity Localization Patch
echo ============================================================
echo.

set "ASAR_FILE="
if exist "%~dp0resources\app.asar" (
    set "ASAR_FILE=%~dp0resources\app.asar"
) else if exist "%~dp0..\resources\app.asar" (
    set "ASAR_FILE=%~dp0..\resources\app.asar"
)

if "%ASAR_FILE%"=="" (
    echo [ERROR] Cannot find Antigravity resources.
    echo Please copy this patch program directly into your Antigravity installation folder and run it again.
    pause
    exit /b 1
)
set "PATCH_DIR=%~dp0"
set "BACKUP_DIR=%PATCH_DIR%backup"
set "PATCH_FILES=%PATCH_DIR%patch-files"
set "TEMP_EXTRACT=%PATCH_DIR%_temp_extract"

if not exist "%ASAR_FILE%" (
    echo [ERROR] Cannot find Antigravity at %ASAR_FILE%
    pause
    exit /b 1
)

echo Checking if Antigravity is running...
tasklist /FI "IMAGENAME eq Antigravity.exe" 2>nul | find /I "Antigravity.exe" >nul
if "%ERRORLEVEL%"=="0" (
    echo.
    echo ============================================================
    echo [ACTION REQUIRED]
    echo Antigravity is currently running. The patch cannot be applied
    echo while the file is locked.
    echo.
    echo PLEASE CLOSE THE ANTIGRAVITY WINDOW NOW.
    echo This script will wait for it to close, apply the patch,
    echo and then automatically restart Antigravity for you.
    echo ============================================================
    echo.
    echo Waiting for Antigravity to close...
)

:WAITLOOP
tasklist /FI "IMAGENAME eq Antigravity.exe" 2>nul | find /I "Antigravity.exe" >nul
if "%ERRORLEVEL%"=="0" (
    timeout /t 2 /nobreak >nul
    goto WAITLOOP
)

echo.
echo Antigravity is closed. Proceeding with patch...
echo.

if not exist "%BACKUP_DIR%" mkdir "%BACKUP_DIR%"
if not exist "%BACKUP_DIR%\app.asar" (
    echo [1/5] Backing up original app.asar...
    copy /Y "%ASAR_FILE%" "%BACKUP_DIR%\app.asar" >nul
) else (
    echo [1/5] Backup already exists.
)

if exist "%TEMP_EXTRACT%" rmdir /S /Q "%TEMP_EXTRACT%" >nul 2>&1

echo [2/5] Extracting app.asar...
call npx -y @electron/asar extract "%ASAR_FILE%" "%TEMP_EXTRACT%" >nul 2>&1

echo [3/5] Copying translated files...
copy /Y "%PATCH_FILES%\main.js"           "%TEMP_EXTRACT%\dist\main.js"           >nul
copy /Y "%PATCH_FILES%\menu.js"           "%TEMP_EXTRACT%\dist\menu.js"           >nul
copy /Y "%PATCH_FILES%\tray.js"           "%TEMP_EXTRACT%\dist\tray.js"           >nul
copy /Y "%PATCH_FILES%\updater.js"        "%TEMP_EXTRACT%\dist\updater.js"        >nul
copy /Y "%PATCH_FILES%\loadingOverlay.js" "%TEMP_EXTRACT%\dist\loadingOverlay.js" >nul
copy /Y "%PATCH_FILES%\ipcHandlers.js"    "%TEMP_EXTRACT%\dist\ipcHandlers.js"    >nul
copy /Y "%PATCH_FILES%\utils.js"          "%TEMP_EXTRACT%\dist\utils.js"          >nul
copy /Y "%PATCH_FILES%\zhcn.js"           "%TEMP_EXTRACT%\dist\zhcn.js"           >nul
copy /Y "%PATCH_FILES%\ideInstall\wizardHtml.js" "%TEMP_EXTRACT%\dist\ideInstall\wizardHtml.js" >nul

echo [4/5] Repacking app.asar...
call npx -y @electron/asar pack "%TEMP_EXTRACT%" "%ASAR_FILE%" >nul 2>&1
if "%ERRORLEVEL%" neq "0" (
    echo [ERROR] Pack failed! Restoring backup...
    copy /Y "%BACKUP_DIR%\app.asar" "%ASAR_FILE%" >nul
    pause
    exit /b 1
)

echo [5/5] Cleaning up...
rmdir /S /Q "%TEMP_EXTRACT%" >nul 2>&1

echo.
echo ============================================================
echo   Patch applied successfully!
echo   You can now close this window and start Antigravity manually.
echo ============================================================
echo.

pause
