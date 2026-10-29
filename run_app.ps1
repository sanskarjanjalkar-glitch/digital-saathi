Write-Host "============================================================" -ForegroundColor DarkYellow
Write-Host "  📖 Launching Digital Saathi (डिजिटल साथी)" -ForegroundColor Green
Write-Host "============================================================" -ForegroundColor DarkYellow

$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Definition
Set-Location $scriptDir

try {
    python server.py
} catch {
    Write-Host "Opening index.html directly..." -ForegroundColor Yellow
    Start-Process "$scriptDir\index.html"
}
