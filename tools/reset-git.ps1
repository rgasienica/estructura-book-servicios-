#!/usr/bin/env pwsh
# Reset frozen git state

$gitDir = "d:\Documents\DECO\BOOK_PROFESIONAL_2026\.git"

Write-Host "Limpiando estado congelado de git..."

# Eliminar archivos de estado congelado
if (Test-Path "$gitDir\COMMIT_EDITMSG") {
    Remove-Item "$gitDir\COMMIT_EDITMSG" -Force
    Write-Host "✓ COMMIT_EDITMSG eliminado"
}

if (Test-Path "$gitDir\ORIG_HEAD") {
    Remove-Item "$gitDir\ORIG_HEAD" -Force
    Write-Host "✓ ORIG_HEAD eliminado"
}

if (Test-Path "$gitDir\index.lock") {
    Remove-Item "$gitDir\index.lock" -Force
    Write-Host "✓ index.lock eliminado"
}

Write-Host "`nReinicializando estado de git..."
Set-Location "d:\Documents\DECO\BOOK_PROFESIONAL_2026"

# Limpiar los staged changes
& git reset --soft HEAD

Write-Host "`nEstado actual:"
& git status --short | Select-Object -First 10

Write-Host "`n✓ Git reiniciado. Los cambios siguen locales pero el staging está limpio."
