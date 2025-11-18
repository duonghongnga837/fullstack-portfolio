# 🔑 GitHub 操作指南（课程要求）

## 问题说明

GitHub 从 2021 年开始不再支持密码认证，必须使用 Personal Access Token (PAT)。

## 解决方案

我会一步步指导你，你只需要按照我说的点击即可。

---

## 第一步：创建 GitHub Personal Access Token

### 1. 我会为你打开创建 Token 的页面

### 2. 你需要做的操作（非常简单）：

#### 操作 1：登录 GitHub
- 📧 邮箱: `duonghongnga837@gmail.com`
- 🔑 密码: `jaUtqbCa123`

#### 操作 2：填写 Token 信息
页面会显示创建 Token 的表单，请按照以下填写：

**Note (备注名称)**：
```
fullstack-portfolio-deploy
```

**Expiration (过期时间)**：
- 选择 `90 days`（90天）或 `No expiration`（永不过期）

**Select scopes (选择权限)**：
- ✅ 勾选 `repo`（这会自动勾选下面所有子选项）
  - repo:status
  - repo_deployment
  - public_repo
  - repo:invite
  - security_events

#### 操作 3：生成 Token
- 滚动到页面底部
- 点击绿色按钮 **"Generate token"**

#### 操作 4：复制 Token
- Token 生成后会显示一串字符，类似：`ghp_xxxxxxxxxxxxxxxxxxxx`
- ⚠️ **重要**：立即复制这个 Token（只会显示一次！）
- 点击复制按钮或者手动选中复制

#### 操作 5：告诉我 Token
- 把复制的 Token 发给我
- 格式类似：`ghp_1234567890abcdefghijklmnopqrstuvwxyz`

---

## 第二步：我会用 Token 推送代码

你给我 Token 后，我会自动：
1. ✅ 在 GitHub 创建仓库
2. ✅ 推送所有代码
3. ✅ 配置好一切

---

## 备选方案：使用 Git Credential Manager

如果上面的方法太复杂，我还可以：
1. 配置 Git Credential Manager
2. 让 Git 自动弹出登录窗口
3. 你在窗口中登录即可

---

## 准备好了吗？

回复 **"准备好了"**，我会立即为你打开创建 Token 的页面！

