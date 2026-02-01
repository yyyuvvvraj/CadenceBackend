@echo off
echo ========================================
echo Fixing Git Secret Exposure Issue
echo ========================================
echo.

echo Step 1: Removing 'env' file from git tracking...
git rm --cached env
if %errorlevel% neq 0 (
    echo Note: env file may already be removed or not tracked
)

echo.
echo Step 2: Checking git status...
git status

echo.
echo Step 3: Creating a new commit to remove the env file...
git add .gitignore
git commit -m "Remove env file from tracking and add to .gitignore"

echo.
echo Step 4: Amending the previous commit to remove secrets...
echo WARNING: This will rewrite git history!
echo.
set /p confirm="Do you want to continue? (y/n): "
if /i "%confirm%"=="y" (
    git commit --amend --no-edit
    echo.
    echo Step 5: Force pushing to remote...
    echo This will overwrite the remote branch!
    git push origin Shlok --force
) else (
    echo Operation cancelled.
    echo.
    echo Alternative: You can push the removal commit normally:
    echo   git push origin Shlok
)

echo.
echo Done!
pause
