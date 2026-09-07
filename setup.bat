@echo off
title Mercy Collections - Setup
color 0A

echo.
echo ========================================
echo   MERCY COLLECTIONS - SETUP
echo ========================================
echo.
echo Installing project dependencies...
echo.

npm install

if %ERRORLEVEL% NEQ 0 (
    color 0C
    echo.
    echo ========================================
    echo   ERROR: Installation failed!
    echo ========================================
    echo.
    echo Please check your internet connection
    echo and ensure Node.js is properly installed.
    echo.
    pause
    exit /b 1
)

color 0A
echo.
echo ========================================
echo   SUCCESS! Dependencies installed.
echo ========================================
echo.
echo Next steps:
echo   1. Run "start-dev.bat" to start Next.js
echo   2. Run "start-firebase.bat" to start Firebase Emulators
echo   3. Or run "start-all.bat" to start both!
echo.
pause

