$ErrorActionPreference = "Stop"
$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Definition
$pluginsDir = Join-Path $env:USERPROFILE ".gemini\config\plugins"
$backupDir = Join-Path $scriptDir "backup"

Write-Host "======================================" -ForegroundColor Cyan
Write-Host "  Antigravity Skill Restore Tool" -ForegroundColor Cyan
Write-Host "======================================" -ForegroundColor Cyan

if (-not (Test-Path $backupDir)) {
    Write-Host "Backup directory not found. Nothing to restore." -ForegroundColor Yellow
    Read-Host "Press Enter to exit..." | Out-Null
    exit 0
}

$files = Get-ChildItem -Path $backupDir -File -Recurse
$restoredCount = 0

foreach ($file in $files) {
    $relativePath = $file.FullName.Substring($backupDir.Length + 1)
    $targetPath = Join-Path $pluginsDir $relativePath
    
    if (Test-Path $targetPath) {
        Copy-Item $file.FullName -Destination $targetPath -Force
        Write-Host "Restored: $relativePath" -ForegroundColor Green
        $restoredCount++
    }
}

Write-Host "`nDone! Restored $restoredCount original English skill descriptions." -ForegroundColor Cyan
Read-Host "Press Enter to exit..." | Out-Null
