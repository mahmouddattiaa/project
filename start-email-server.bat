@echo off
echo Testing Email Server Connection...
echo.

cd /d "d:\Personal Project\iscore mobile app\project\email-server"

echo Starting email server...
start "Email Server" cmd /k "npm start"

echo.
echo Server should be starting in a new window.
echo After updating your Gmail app password in .env file:
echo 1. Close the server (Ctrl+C in the server window)
echo 2. Restart it with: npm start
echo 3. Test your app's email functionality
echo.
pause
