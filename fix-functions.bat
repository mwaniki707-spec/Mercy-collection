@echo off
title Mercy Collections - Fix Functions
color 0A

echo.
echo ========================================
echo   FIX FIREBASE FUNCTIONS
echo ========================================
echo.
echo This will reinstall function dependencies
echo and clear any cached data.
echo.
pause

echo.
echo Navigating to functions folder...
cd functions

echo.
echo Removing old dependencies...
if exist node_modules rmdir /S /Q node_modules
if exist package-lock.json del /Q package-lock.json

echo.
echo Installing fresh dependencies...
call npm install

if %ERRORLEVEL% EQU 0 (
    color 0A
    echo.
    echo ========================================
    echo   SUCCESS! Functions fixed.
    echo ========================================
    echo.
    echo Now restart Firebase emulators:
    echo   1. Close any running Firebase terminal
    echo   2. Run "restart-firebase.bat"
    echo      OR run "start-firebase.bat"
    echo.
) else (
    color 0C
    echo.
    echo ========================================
    echo   ERROR! Installation failed.
    echo ========================================
    echo.
    echo Check your internet connection.
    echo.
)

cd ..
pause

