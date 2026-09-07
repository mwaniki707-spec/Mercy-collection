@echo off
title Mercy Collections - Firebase Emulators
color 0E
cd /d "%~dp0"

echo.
echo ========================================
echo   MERCY COLLECTIONS - FIREBASE EMULATORS
echo ========================================
echo.
echo Starting Firebase Emulators...
echo.
echo Emulator UI will be available at:
echo   http://localhost:5000
echo.
echo Services:
echo   - Auth:      http://localhost:9099
echo   - Firestore: http://localhost:8085
echo   - Functions: http://localhost:5001
echo   - Storage:   http://localhost:9199
echo.
echo Press Ctrl+C to stop the emulators
echo.
echo ========================================
echo.

npm run serve

