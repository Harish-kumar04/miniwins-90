@echo off
echo ========================================
echo MiniWins 90 - Setup Script
echo ========================================
echo.

echo [1/3] Installing dependencies...
call npm install

echo.
echo [2/3] Setup complete!
echo.

echo [3/3] Starting development server...
echo.
echo The app will open at: http://localhost:5173
echo.
echo Press Ctrl+C to stop the server
echo.

call npm run dev
