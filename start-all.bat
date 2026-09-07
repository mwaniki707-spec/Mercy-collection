@echo off
title Mercy Collections - Launcher
color 0D

:: Ensure script runs from its own directory
cd /d "%~dp0"

echo.
echo ========================================
echo   MERCY COLLECTIONS - FULL STACK
echo ========================================
echo.
echo Stopping any existing Firebase emulator processes...
taskkill /F /IM java.exe 2>nul
timeout /t 1 /nobreak > nul

echo.
echo Starting both Next.js and Firebase...
echo.
echo Opening 2 terminal windows:
echo   1. Next.js Dev Server (port 3000)
echo   2. Firebase Emulators (port 5000)
echo.
echo ========================================
echo.

REM Start Firebase Emulators in a new window
start "Mercy Collections - Firebase Emulators" cmd /k "cd /d "%~dp0" && color 0E && npm run serve"

REM Wait 3 seconds for Firebase to initialize
timeout /t 3 /nobreak > nul

REM Start Next.js in a new window
start "Mercy Collections - Next.js Dev Server" cmd /k "cd /d "%~dp0" && color 0B && npm run dev"

echo.
echo Both servers are starting!
echo.
echo Visit your website at: http://localhost:3000
echo.
echo This window can be closed.
echo.
pause
exit

