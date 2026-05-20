@echo off
chcp 65001 >nul 2>&1
setlocal

echo.
echo ============================================================
echo   Antigravity 汉化补丁 — 还原工具
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
set "BACKUP_DIR=%~dp0backup"

:: ---- 检查备份 ----
if not exist "%BACKUP_DIR%\app.asar" (
    echo [错误] 未找到备份文件：%BACKUP_DIR%\app.asar
    echo 无法还原，可能从未执行过补丁。
    pause
    exit /b 1
)

:: ---- 检查 Antigravity 是否正在运行 ----
tasklist /FI "IMAGENAME eq Antigravity.exe" 2>nul | findstr /I "Antigravity.exe" >nul 2>&1
if %ERRORLEVEL% equ 0 (
    echo [警告] 检测到 Antigravity 正在运行！
    echo 请先关闭 Antigravity 再还原。
    pause
    exit /b 1
)

:: ---- 还原 ----
echo 正在还原原始 app.asar ...
copy /Y "%BACKUP_DIR%\app.asar" "%ASAR_FILE%" >nul
if %ERRORLEVEL% neq 0 (
    echo [错误] 还原失败！
    pause
    exit /b 1
)

echo.
echo ============================================================
echo   还原成功！已恢复原始英文界面。
echo   请重启 Antigravity 查看效果。
echo ============================================================
echo.
pause
