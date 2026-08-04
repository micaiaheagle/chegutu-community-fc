@echo off
setlocal
title Chegutu Community FC - Publish to Vercel
color 0B
cd /d "%~dp0"

echo.
echo  ============================================================
echo    CHEGUTU COMMUNITY FC - PUT THE WEBSITE LIVE ON VERCEL
echo  ============================================================
echo.
echo   You do not need to type any commands.
echo.
echo   Vercel will ask for your email address, then send you a
echo   confirmation email. Click the link in that email and come
echo   back to this window.
echo.
echo   This works whether or not you did the GitHub step first.
echo.
pause

echo.
echo  [1/3] Checking that Node.js is installed...
where npx >nul 2>&1
if errorlevel 1 (
  color 0C
  echo.
  echo   Node.js is not installed on this computer.
  echo.
  echo   Download it here, install it, then run this file again:
  echo       https://nodejs.org      ^(choose the LTS version^)
  echo.
  pause
  exit /b 1
)
echo        Found it.

echo.
echo  [2/3] Signing you in to Vercel...
echo        Enter your email when asked, then check your inbox.
echo.
call npx --yes vercel@latest login
if errorlevel 1 (
  color 0C
  echo.
  echo   Sign-in did not complete. Run this file again to retry.
  pause
  exit /b 1
)

echo.
echo  [3/3] Uploading and going live...
echo        When it asks questions, pressing ENTER for each one is fine.
echo        Say NO if it asks about linking to an existing project.
echo.
call npx --yes vercel@latest --prod --yes
if errorlevel 1 (
  color 0C
  echo.
  echo   Deploy failed. Take a screenshot of this window and send it over.
  pause
  exit /b 1
)

color 0B
echo.
echo  ============================================================
echo    THE WEBSITE IS LIVE
echo  ============================================================
echo.
echo    The address is printed just above, ending in .vercel.app
echo    Copy it into a browser to see the site.
echo.
echo    To use ccfc-zw.com instead:
echo      vercel.com  -  your project  -  Settings  -  Domains
echo.
echo    IMPORTANT: contact forms need one more step on Vercel.
echo    See the "contact forms" section of DEPLOY.md.
echo.
pause
