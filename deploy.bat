@echo off
chcp 65001 >nul
echo ========================================
echo 🚀 全栈项目部署脚本
echo ========================================
echo.

REM 设置 Git 路径
set GIT="C:\Program Files\Git\bin\git.exe"

echo 📋 步骤 1: 初始化 Git 仓库
echo ----------------------------------------
%GIT% init
if errorlevel 1 (
    echo ❌ Git 初始化失败
    pause
    exit /b 1
)
echo ✅ Git 仓库初始化成功
echo.

echo 📋 步骤 2: 创建 .gitignore 文件
echo ----------------------------------------
(
echo node_modules/
echo .env
echo .DS_Store
echo dist/
echo build/
echo *.log
echo .vscode/
echo .idea/
) > .gitignore
echo ✅ .gitignore 文件创建成功
echo.

echo 📋 步骤 3: 添加所有文件到 Git
echo ----------------------------------------
%GIT% add .
if errorlevel 1 (
    echo ❌ 添加文件失败
    pause
    exit /b 1
)
echo ✅ 文件添加成功
echo.

echo 📋 步骤 4: 创建初始提交
echo ----------------------------------------
%GIT% commit -m "Initial commit: Full-stack portfolio project"
if errorlevel 1 (
    echo ❌ 提交失败
    pause
    exit /b 1
)
echo ✅ 初始提交成功
echo.

echo 📋 步骤 5: 设置主分支为 main
echo ----------------------------------------
%GIT% branch -M main
echo ✅ 主分支设置成功
echo.

echo ========================================
echo ✅ 本地 Git 仓库准备完成！
echo ========================================
echo.
echo 📝 下一步操作：
echo.
echo 1. 访问 https://github.com/new 创建新仓库
echo 2. 仓库名称建议: my-portfolio-fullstack
echo 3. 选择 Public（公开）
echo 4. 不要勾选任何初始化选项
echo 5. 点击 "Create repository"
echo.
echo 6. 复制仓库 URL（类似：https://github.com/你的用户名/my-portfolio-fullstack.git）
echo.
echo 7. 运行以下命令（替换为你的仓库 URL）：
echo    git remote add origin https://github.com/你的用户名/my-portfolio-fullstack.git
echo    git push -u origin main
echo.
pause

