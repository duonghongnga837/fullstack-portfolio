# 使用 GitHub API 创建仓库
$username = "duonghongnga837"
$email = "duonghongnga837@gmail.com"
$password = "jaUtqbCa123"
$repoName = "fullstack-portfolio"

Write-Host "正在尝试创建 GitHub 仓库..." -ForegroundColor Cyan

# 方法1: 尝试使用基本认证（可能不支持）
try {
    $pair = "${email}:${password}"
    $bytes = [System.Text.Encoding]::ASCII.GetBytes($pair)
    $base64 = [System.Convert]::ToBase64String($bytes)
    
    $headers = @{
        Authorization = "Basic $base64"
        Accept = "application/vnd.github.v3+json"
    }
    
    $body = @{
        name = $repoName
        description = "Full-stack portfolio project with React and Node.js"
        private = $false
    } | ConvertTo-Json
    
    $response = Invoke-RestMethod -Uri "https://api.github.com/user/repos" -Method Post -Headers $headers -Body $body -ContentType "application/json"
    
    Write-Host "✅ 仓库创建成功！" -ForegroundColor Green
    Write-Host "仓库地址: $($response.html_url)" -ForegroundColor Green
    exit 0
    
} catch {
    Write-Host "基本认证失败（预期中）" -ForegroundColor Yellow
    Write-Host "错误: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host ""
Write-Host "GitHub 已不再支持密码认证。" -ForegroundColor Yellow
Write-Host "我需要你帮忙完成一个简单的操作..." -ForegroundColor Yellow
Write-Host ""
Write-Host "请访问: https://github.com/new" -ForegroundColor Cyan
Write-Host "然后:" -ForegroundColor White
Write-Host "1. 仓库名称填写: fullstack-portfolio" -ForegroundColor White
Write-Host "2. 选择 Public" -ForegroundColor White
Write-Host "3. 不要勾选任何选项" -ForegroundColor White
Write-Host "4. 点击 Create repository" -ForegroundColor White
Write-Host ""
Write-Host "完成后按回车继续..." -ForegroundColor Green
Read-Host

