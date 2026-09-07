@echo off
title Mercy Collections - Restart Firebase (Clean)
color 0E

echo.
echo ========================================
echo   CLEAN RESTART - FIREBASE EMULATORS
echo ========================================
echo.
echo This will:
echo   1. Stop any running emulators
echo   2. Clear emulator cache
echo   3. Reinstall function dependencies
echo   4. Start fresh emulators
echo.
pause

echo.
echo [1/4] Stopping any running Firebase processes...
taskkill /F /IM java.exe 2>nul
taskkill /F /IM node.exe 2>nul
timeout /t 2 /nobreak >nul

echo.
echo [2/4] Clearing Firebase cache...
if exist firebase-debug.log del /Q firebase-debug.log
if exist firestore-debug.log del /Q firestore-debug.log
if exist functions\firestore-debug.log del /Q functions\firestore-debug.log
echo Cache cleared!

echo.
echo [3/4] Reinstalling function dependencies...
cd functions
call npm install
cd ..

if %ERRORLEVEL% NEQ 0 (
    color 0C
    echo.
    echo ERROR: Failed to install function dependencies!
    pause
    exit /b 1
)

echo.
echo [4/4] Starting Firebase Emulators...
echo.
echo ========================================
echo.
echo Your emulators will start now.
echo.
echo Visit: http://localhost:5000 (Emulator UI)
echo.
echo Press Ctrl+C to stop when done.
echo.
echo ========================================
echo.

npm run serve

