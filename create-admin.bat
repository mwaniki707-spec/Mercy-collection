@echo off
title Mercy Collections - Create Admin User
color 0A
cd /d "%~dp0"

echo.
echo ========================================
echo   CREATE ADMIN USER
echo ========================================
echo.
echo Creating admin account...
echo   Email: admin@mercy.com
echo   Password: password123
echo.

node create-admin.js

pause
