@echo off
if exist env (
    ren env .env
    echo File renamed successfully
) else (
    echo env file not found
)
if exist .env (
    echo .env file exists
    type .env
) else (
    echo .env file does not exist
)
