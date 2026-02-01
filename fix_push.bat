@echo off
echo Fixing GitHub Push Error...

REM 1. Remove env from cache (just in case)
git rm --cached env 2>nul

REM 2. Ensure .gitignore has env
findstr /C:"env" .gitignore >nul
if %errorlevel% neq 0 (
    echo env >> .gitignore
    echo .env >> .gitignore
)

REM 3. Soft reset the last commit to unstaging area
REM This assumes the secret was committed in the most recent commit
git reset --soft HEAD~1

REM 4. Add files again (respecting .gitignore, so 'env' won't be added)
git add .

REM 5. Commit clean state
git commit -m "Fix: Remove exposed credentials and update config"

REM 6. Force push to overwrite the bad commit on remote
git push origin Shlok --force

echo Done! Try pushing again if this failed.
