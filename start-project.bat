@echo off
echo ========================================
echo   Full-Stack Portfolio Project Launcher
echo ========================================
echo.

echo Starting Backend Server...
start "Backend Server" cmd /k "cd Lab-17\Lab-17\nodemon-lab && npm run dev"

timeout /t 3 /nobreak >nul

echo Starting Frontend Application...
start "Frontend App" cmd /k "cd Lab-19\Lab-19\my-portfolio && npm run dev"

timeout /t 5 /nobreak >nul

echo.
echo ========================================
echo   Both servers are starting...
echo ========================================
echo.
echo Backend:  http://localhost:3000
echo Frontend: http://localhost:5173
echo.
echo Test Credentials:
echo Email: admin@test.com
echo Password: password123
echo.
echo Press any key to open the application in browser...
pause >nul

start http://localhost:5173

echo.
echo Application opened in browser!
echo.
echo To stop the servers, close the terminal windows.
echo.
pause

