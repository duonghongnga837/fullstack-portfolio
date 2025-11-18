# GitHub 仓库创建脚本
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "创建 GitHub 仓库" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

Write-Host "注意：GitHub 已不再支持密码认证" -ForegroundColor Yellow
Write-Host "我将为你打开 GitHub 创建仓库页面" -ForegroundColor Yellow
Write-Host ""

# 打开浏览器
Start-Process "https://github.com/new"

Write-Host "请在浏览器中完成以下步骤：" -ForegroundColor Cyan
Write-Host ""
Write-Host "1. 登录 GitHub（如果还没登录）" -ForegroundColor White
Write-Host "   邮箱: duonghongnga837@gmail.com" -ForegroundColor Gray
Write-Host "   密码: jaUtqbCa123" -ForegroundColor Gray
Write-Host ""
Write-Host "2. 填写仓库信息：" -ForegroundColor White
Write-Host "   Repository name: fullstack-portfolio" -ForegroundColor Gray
Write-Host "   Description: Full-stack portfolio project with React and Node.js" -ForegroundColor Gray
Write-Host "   选择: Public (公开)" -ForegroundColor Gray
Write-Host "   不要勾选任何选项" -ForegroundColor Gray
Write-Host ""
Write-Host "3. 点击 'Create repository'" -ForegroundColor White
Write-Host ""
Write-Host "4. 创建后，复制仓库地址（类似这样）：" -ForegroundColor White
Write-Host "   https://github.com/duonghongnga837/fullstack-portfolio.git" -ForegroundColor Gray
Write-Host ""

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "完成后，运行 push-to-github.bat 推送代码" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Read-Host "按回车键继续"

