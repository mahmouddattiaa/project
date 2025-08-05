@echo off
echo Setting up iScore Email Server...
echo.

cd email-server

echo Installing dependencies...
call npm install

echo.
echo Creating .env file from template...
if not exist .env (
    copy .env.example .env
    echo.
    echo ⚠️  IMPORTANT: Please edit the .env file and add your Gmail app password
    echo    1. Open email-server\.env
    echo    2. Replace "your-gmail-app-password-here" with your actual Gmail app password
    echo    3. Save the file
    echo.
) else (
    echo .env file already exists
)

echo.
echo Setup complete! To start the server:
echo   cd email-server
echo   npm start
echo.
echo Don't forget to:
echo   1. Set up Gmail app password in .env file
echo   2. Make sure PDF reports are in assets/report/ folder
echo.
pause
