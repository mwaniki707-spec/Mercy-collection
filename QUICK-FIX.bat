@echo off
title Mercy Collections - QUICK FIX
color 0D

echo.
echo ========================================
echo   QUICK FIX - FIREBASE FUNCTIONS ERROR
echo ========================================
echo.
echo This will:
echo   1. Stop Firebase emulators
echo   2. Fix function dependencies
echo   3. Restart emulators
echo.
echo IMPORTANT: Close any Firebase terminal windows first!
echo.
pause

echo.
echo [1/3] Stopping Firebase processes...
taskkill /F /IM java.exe 2>nul
timeout /t 2 /nobreak >nul
echo Done!

echo.
echo [2/3] Fixing function dependencies...
cd functions

echo   - Removing old dependencies...
if exist node_modules rmdir /S /Q node_modules
if exist package-lock.json del /Q package-lock.json

echo   - Installing fresh dependencies...
call npm install --silent

if %ERRORLEVEL% NEQ 0 (
    color 0C
    echo.
    echo ERROR: Failed to install dependencies!
    echo Check your internet connection.
    pause
    exit /b 1
)

cd ..

echo   - Clearing cache files...
if exist firebase-debug.log del /Q firebase-debug.log
if exist firestore-debug.log del /Q firestore-debug.log
if exist functions\firestore-debug.log del /Q functions\firestore-debug.log

echo Done!

color 0A
echo.
echo ========================================
echo   SUCCESS! Functions are fixed.
echo ========================================
echo.
echo [3/3] Starting Firebase Emulators...
echo.
pause

color 0E
npm run serve

