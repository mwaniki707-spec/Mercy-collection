@echo off
title Mercy Collections - Next.js Dev Server
color 0B
cd /d "%~dp0"

echo.
echo ========================================
echo   MERCY COLLECTIONS - NEXT.JS SERVER
echo ========================================
echo.
echo Starting Next.js development server...
echo.
echo Your website will be available at:
echo   http://localhost:3000
echo.
echo Press Ctrl+C to stop the server
echo.
echo ========================================
echo.

npm run dev

