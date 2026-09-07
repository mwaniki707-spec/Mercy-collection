@echo off
title Mercy Collections - Add Sample Listings
color 0D
cd /d "%~dp0"

echo.
echo ========================================
echo   ADD SAMPLE DRESS LISTINGS
echo ========================================
echo.
echo This will add 12 beautiful sample dresses
echo to your Firestore database.
echo.
echo Each dress includes:
echo   - High-quality images
echo   - Available sizes (S/M/L/XL or numeric)
echo   - Prices and stock levels
echo   - Professional descriptions
echo.
echo IMPORTANT: Firebase Emulators must be running!
echo If not, run "start-firebase.bat" first.
echo.
pause

echo.
echo Adding sample dresses...
echo.

node seed-data.js

if %ERRORLEVEL% EQU 0 (
    color 0A
    echo.
    echo ========================================
    echo   SUCCESS!
    echo ========================================
    echo.
    echo Sample dresses have been added!
    echo.
    echo Features included:
    echo   ✓ 12 beautiful dresses
    echo   ✓ Size selection enabled
    echo   ✓ WhatsApp ordering ready
    echo   ✓ Professional descriptions
    echo.
    echo Visit http://localhost:3000 to see them!
    echo.
) else (
    color 0C
    echo.
    echo ========================================
    echo   ERROR!
    echo ========================================
    echo.
    echo Make sure Firebase Emulators are running.
    echo Run "start-firebase.bat" first.
    echo.
)

pause

