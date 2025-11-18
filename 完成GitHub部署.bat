@echo off
echo ========================================
echo GitHub 仓库创建和代码推送
echo ========================================
echo.
echo 第一步：创建 GitHub 仓库
echo.
echo 我会为你打开 GitHub 创建仓库页面
echo 你只需要做 3 个简单操作：
echo.
echo 1. 在 "Repository name" 输入: fullstack-portfolio
echo 2. 选择 "Public"
echo 3. 点击绿色按钮 "Create repository"
echo.
echo 准备好了吗？
pause

echo.
echo 正在打开 GitHub...
start https://github.com/new

echo.
echo ========================================
echo 请在浏览器中完成上述 3 个操作
echo 完成后回到这里按任意键继续...
echo ========================================
pause

echo.
echo ========================================
echo 第二步：推送代码到 GitHub
echo ========================================
echo.
echo 正在推送代码...
echo.
echo 注意：可能会弹出登录窗口，请使用以下信息登录：
echo 邮箱: duonghongnga837@gmail.com
echo 密码: jaUtqbCa123
echo.

"C:\Program Files\Git\bin\git.exe" push -u origin main

if %errorlevel% equ 0 (
    echo.
    echo ========================================
    echo ✅ 成功！代码已推送到 GitHub
    echo ========================================
    echo.
    echo 你的 GitHub 仓库地址：
    echo https://github.com/duonghongnga837/fullstack-portfolio
    echo.
    echo 现在可以：
    echo 1. 访问上面的地址查看你的代码
    echo 2. 继续部署到 Render 和 Vercel
    echo.
) else (
    echo.
    echo ========================================
    echo ❌ 推送失败
    echo ========================================
    echo.
    echo 可能的原因：
    echo 1. 仓库还没创建
    echo 2. 登录失败
    echo 3. 网络问题
    echo.
    echo 请检查后重新运行此脚本
    echo.
)

pause

