@echo off
title Digital Saathi - Senior Smartphone & Safety Platform
echo ============================================================
echo   📖 Launching Digital Saathi on http://localhost:8000
echo ============================================================
cd /d "%~dp0"
python server.py
if %ERRORLEVEL% NEQ 0 (
    echo Python server encountered an error. Opening index.html directly in browser...
    start index.html
)
pause
