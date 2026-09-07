@echo off
title Mercy Collections - Social Login Guide
color 0B

echo.
echo ========================================
echo   SOCIAL LOGIN SETUP GUIDE
echo ========================================
echo.
echo Your app now supports:
echo   - Google Sign-In
echo   - Facebook Login
echo   - TikTok Login
echo.
echo To enable these features, you need to:
echo   1. Configure providers in Firebase Console
echo   2. Get API keys from each provider
echo.
echo ========================================
echo.
echo Opening setup guide...
echo.

start SOCIAL-LOGIN-SETUP.md

echo.
echo Quick Steps:
echo.
echo 1. GOOGLE (Easiest):
echo    - Go to Firebase Console
echo    - Authentication ^> Sign-in method
echo    - Enable Google provider
echo.
echo 2. FACEBOOK (Medium):
echo    - Create app at developers.facebook.com
echo    - Get App ID and Secret
echo    - Add to Firebase Console
echo.
echo 3. TIKTOK (Advanced):
echo    - Create app at developers.tiktok.com
echo    - Get Client Key and Secret
echo    - Configure in Firebase
echo.
echo ========================================
echo.
echo Full guide opened in your editor!
echo.
pause

