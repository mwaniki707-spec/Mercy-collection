@echo off
title Create Admin User - Mercy Collections
color 0B
cd /d "%~dp0"

echo.
echo ========================================
echo   CREATE SAMPLE ADMIN USER
echo ========================================
echo.
echo This script will create an admin account with:
echo   Email: admin@mercy.com
echo   Password: password123
echo.
echo ========================================
echo.

node create-admin.js

pause
