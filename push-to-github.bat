@echo off
echo ========================================
echo 推送代码到 GitHub
echo ========================================
echo.

REM 设置 Git 路径
set GIT="C:\Program Files\Git\bin\git.exe"

REM 添加远程仓库
echo [1/3] 添加远程仓库...
%GIT% remote add origin https://github.com/duonghongnga837/fullstack-portfolio.git
if errorlevel 1 (
    echo 远程仓库可能已存在，尝试更新...
    %GIT% remote set-url origin https://github.com/duonghongnga837/fullstack-portfolio.git
)

REM 重命名分支为 main
echo [2/3] 重命名分支为 main...
%GIT% branch -M main

REM 推送代码
echo [3/3] 推送代码到 GitHub...
echo.
echo 注意：可能会要求你登录 GitHub
echo 用户名: duonghongnga837@gmail.com
echo 密码: jaUtqbCa123
echo.
%GIT% push -u origin main

echo.
echo ========================================
echo 完成！
echo ========================================
pause

