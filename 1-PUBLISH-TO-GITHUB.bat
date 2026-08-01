@echo off
setlocal
title Chegutu Community FC - Publish to GitHub
color 0A
cd /d "%~dp0"

echo.
echo  ============================================================
echo    CHEGUTU COMMUNITY FC - PUBLISH THE WEBSITE TO GITHUB
echo  ============================================================
echo.
echo   You do not need to type any commands.
echo   Just follow what appears on screen.
echo.
echo   A browser window will open and show you a code to paste.
echo   That is normal - it is how GitHub checks it is really you.
echo.
pause

echo.
echo  [1/4] Checking that the GitHub tool is installed...
where gh >nul 2>&1
if errorlevel 1 (
  color 0C
  echo.
  echo   GitHub CLI is not installed on this computer.
  echo.
  echo   Download it here, install it, then run this file again:
  echo       https://cli.github.com
  echo.
  pause
  exit /b 1
)
echo        Found it.

REM An invalid token in the environment blocks the browser login, so clear it here.
set "GITHUB_TOKEN="
set "GH_TOKEN="

echo.
echo  [2/4] Signing you in to GitHub...
echo        Choose:  GitHub.com  -  HTTPS  -  Login with a web browser
echo.
gh auth status >nul 2>&1
if errorlevel 1 (
  gh auth login --hostname github.com --git-protocol https --web
  if errorlevel 1 (
    color 0C
    echo.
    echo   Sign-in did not complete. Run this file again to retry.
    pause
    exit /b 1
  )
) else (
  echo        Already signed in.
)

echo.
echo  [3/4] Creating the repository and uploading the website...
echo        This uploads about 75 MB, so give it a few minutes.
echo.
gh repo create chegutu-community-fc --public --source=. --remote=origin --push --description "Official website of Chegutu Community Football Club - Chegutu, Mashonaland West, Zimbabwe"
if errorlevel 1 (
  echo.
  echo   The repository may already exist. Trying a plain upload instead...
  git push -u origin main
  if errorlevel 1 (
    color 0C
    echo.
    echo   Upload failed. Take a screenshot of this window and send it over.
    pause
    exit /b 1
  )
)

echo.
echo  [4/4] Done.
color 0A
echo.
echo  ============================================================
echo    THE WEBSITE IS NOW ON GITHUB
echo  ============================================================
echo.
echo    Check it here:
echo        https://github.com/micaiaheagle?tab=repositories
echo.
echo    NEXT STEP: double-click  2-PUBLISH-TO-VERCEL.bat
echo.
pause
