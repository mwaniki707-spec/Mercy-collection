@echo off
title Mercy Collections - Create Admin (Alternative Method)
color 0A

echo.
echo ========================================
echo   CREATE ADMIN USER (API METHOD)
echo ========================================
echo.
echo This will create an admin account using
echo the Next.js API route instead of Cloud Functions.
echo.
echo Admin credentials:
echo   Email: admin@mercy.com
echo   Password: password123
echo.
echo IMPORTANT: Make sure Next.js is running!
echo If not, run "start-dev.bat" first.
echo.
pause

echo.
echo Creating admin user...
echo.

start http://localhost:3000/api/create-admin

echo.
echo Browser opened!
echo.
echo You should see a JSON response with:
echo   "success": true
echo.
echo Then you can sign in at:
echo   http://localhost:3000/auth
echo.
pause

