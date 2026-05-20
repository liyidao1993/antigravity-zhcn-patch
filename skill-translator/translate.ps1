$ErrorActionPreference = "Stop"
$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Definition
$pluginsDir = Join-Path $env:USERPROFILE ".gemini\config\plugins"
$backupDir = Join-Path $scriptDir "backup"
$dictPath = Join-Path $scriptDir "dictionary.json"

Write-Host "======================================" -ForegroundColor Cyan
Write-Host "  Antigravity Skill Auto-Translator" -ForegroundColor Cyan
Write-Host "======================================" -ForegroundColor Cyan
Write-Host "Loading dictionary..." 

if (-not (Test-Path $dictPath)) {
    Write-Host "ERROR: dictionary.json not found!" -ForegroundColor Red
    exit 1
}

$dict = Get-Content $dictPath -Encoding UTF8 | ConvertFrom-Json
if (-not (Test-Path $pluginsDir)) {
    Write-Host "ERROR: Antigravity plugins directory not found ($pluginsDir)!" -ForegroundColor Red
    exit 1
}

$files = Get-ChildItem -Path $pluginsDir -Filter "SKILL.md" -Recurse
$translatedCount = 0

foreach ($file in $files) {
    $lines = Get-Content $file.FullName -Encoding UTF8
    $newLines = @()
    $inDescription = $false
    $skillName = ""
    $replaced = $false
    $foundName = $false

    foreach ($line in $lines) {
        if ($line -match '^name:\s*(.+)$') {
            $skillName = $matches[1].Trim()
            $foundName = $true
            $newLines += $line
            continue
        }

        if ($line -match '^description:\s*(.*)$') {
            if ($foundName -and $dict.PSObject.Properties[$skillName]) {
                $translation = $dict.PSObject.Properties[$skillName].Value
                $newLines += "description: >"
                $newLines += "  $translation"
                $inDescription = $true
                $replaced = $true
            } else {
                $newLines += $line
            }
            continue
        }

        if ($inDescription) {
            if ($line -match '^\s+' -or $line.Trim() -eq "") {
                continue
            } else {
                $inDescription = $false
                $newLines += $line
            }
        } else {
            $newLines += $line
        }
    }

    if ($replaced) {
        $relativePath = $file.FullName.Substring($pluginsDir.Length + 1)
        $backupPath = Join-Path $backupDir $relativePath
        $backupFileDir = Split-Path $backupPath -Parent
        if (-not (Test-Path $backupFileDir)) {
            New-Item -ItemType Directory -Force -Path $backupFileDir | Out-Null
        }
        if (-not (Test-Path $backupPath)) {
            Copy-Item $file.FullName -Destination $backupPath -Force
        }

        $newContent = $newLines -join "`n"
        Set-Content -Path $file.FullName -Value $newContent -Encoding UTF8
        Write-Host "Translated: $skillName" -ForegroundColor Green
        $translatedCount++
    }
}

Write-Host "`nDone! Translated $translatedCount skills." -ForegroundColor Cyan
Write-Host "Original files are safely backed up in the 'backup' folder." -ForegroundColor DarkGray
Write-Host "Run restore.ps1 to revert changes." -ForegroundColor DarkGray
Read-Host "Press Enter to exit..." | Out-Null
