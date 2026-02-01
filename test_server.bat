@echo off
echo ========================================
echo Testing Cadence Backend Server
echo ========================================
echo.
echo Checking .env file...
if exist .env (
    echo [OK] .env file exists
) else (
    echo [ERROR] .env file not found!
    exit /b 1
)
echo.
echo Starting server...
echo.
node server.js
