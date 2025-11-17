# 🚀 Quick Start Guide

## 快速启动项目

### 方法 1: 使用启动脚本（推荐）

双击运行 `start-project.bat` 文件，它会自动：
1. 启动后端服务器
2. 启动前端应用
3. 在浏览器中打开应用

### 方法 2: 手动启动

**终端 1 - 启动后端：**
```bash
cd Lab-17/Lab-17/nodemon-lab
npm run dev
```

**终端 2 - 启动前端：**
```bash
cd Lab-19/Lab-19/my-portfolio
npm run dev
```

**浏览器访问：**
```
http://localhost:5173
```

---

## 🧪 测试应用功能

### 1️⃣ 作为访客（无需登录）

#### 浏览项目
1. 点击导航栏的 **Projects**
2. 查看 3 个示例项目
3. 点击项目卡片查看详情

#### 阅读博客
1. 点击导航栏的 **Blog**
2. 浏览 3 篇示例博客文章
3. 点击任意文章阅读完整内容
4. 查看文章下方的评论区

#### 发送联系信息
1. 点击导航栏的 **Contact**
2. 填写姓名、邮箱和消息
3. 点击 **Send Message**
4. 查看成功提示

#### 切换主题
1. 点击右上角的主题切换按钮
2. 在深色和浅色主题之间切换

---

### 2️⃣ 作为登录用户

#### 登录账户
1. 点击导航栏的 **Login**
2. 输入测试凭据：
   - **Email**: `admin@test.com`
   - **Password**: `password123`
3. 点击 **Login**
4. 登录成功后会跳转到 Admin Dashboard

#### 管理项目（Admin Dashboard）

**创建新项目：**
1. 在 Admin Dashboard，确保在 **Manage Projects** 标签
2. 填写项目表单：
   - Title: `My New Project`
   - Description: `This is a test project`
   - Image URL: `https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400`
   - Repository URL: `https://github.com/yourusername/project`
   - Live URL: `https://myproject.com`
3. 点击 **Create**
4. 查看右侧列表中的新项目

**编辑项目：**
1. 在项目列表中找到要编辑的项目
2. 点击 **Edit**
3. 修改表单内容
4. 点击 **Update**

**删除项目：**
1. 在项目列表中找到要删除的项目
2. 点击 **Delete**
3. 确认删除

#### 管理博客文章（Admin Dashboard）

**创建新文章：**
1. 切换到 **Manage Blog** 标签
2. 填写文章表单：
   - Title: `My First Blog Post`
   - Content: `This is my first blog post content...`
3. 点击 **Create**
4. 查看右侧列表中的新文章

**编辑文章：**
1. 在文章列表中找到要编辑的文章
2. 点击 **Edit**
3. 修改内容
4. 点击 **Update**

**删除文章：**
1. 在文章列表中找到要删除的文章
2. 点击 **Delete**
3. 确认删除

#### 发表评论

1. 点击导航栏的 **Blog**
2. 点击任意文章进入详情页
3. 滚动到评论区
4. 在文本框中输入评论
5. 点击 **Post Comment**
6. 查看你的评论出现在列表顶部

#### 退出登录
1. 点击导航栏的 **Logout**
2. 自动跳转到首页
3. 注意导航栏变化（显示 Login/Register）

---

### 3️⃣ 注册新用户

1. 点击导航栏的 **Register**
2. 填写注册表单：
   - Username: `testuser`
   - Email: `test@example.com`
   - Password: `password123`
3. 点击 **Register**
4. 自动登录并跳转到 Admin Dashboard

---

## 🔍 测试 API 端点（可选）

### 使用 curl 测试

**获取所有项目：**
```bash
curl http://localhost:3000/api/projects
```

**获取所有博客文章：**
```bash
curl http://localhost:3000/api/blog
```

**注册新用户：**
```bash
curl -X POST http://localhost:3000/api/users/register ^
  -H "Content-Type: application/json" ^
  -d "{\"username\":\"newuser\",\"email\":\"new@test.com\",\"password\":\"pass123\"}"
```

**登录：**
```bash
curl -X POST http://localhost:3000/api/users/login ^
  -H "Content-Type: application/json" ^
  -d "{\"email\":\"admin@test.com\",\"password\":\"password123\"}"
```

---

## 📊 验证功能清单

使用此清单确保所有功能正常工作：

### 公共功能
- [ ] 首页加载正常
- [ ] 项目页面显示所有项目
- [ ] 博客页面显示所有文章
- [ ] 博客详情页显示文章内容和评论
- [ ] 联系表单可以提交
- [ ] 主题切换正常工作
- [ ] 响应式设计在不同屏幕尺寸下正常

### 认证功能
- [ ] 可以注册新用户
- [ ] 可以登录现有用户
- [ ] 登录后显示 Admin 和 Logout 链接
- [ ] 未登录时无法访问 /admin（自动跳转到登录页）
- [ ] 退出登录正常工作

### Admin Dashboard
- [ ] 可以创建新项目
- [ ] 可以编辑现有项目
- [ ] 可以删除项目
- [ ] 可以创建新博客文章
- [ ] 可以编辑现有文章
- [ ] 可以删除文章
- [ ] 标签切换正常工作

### 评论功能
- [ ] 未登录用户看到"Login to post a comment"
- [ ] 登录用户可以发表评论
- [ ] 评论立即显示在列表中
- [ ] 评论显示作者和时间

---

## 🐛 常见问题

### 前端无法连接后端
**问题**: 看到 CORS 错误或网络错误

**解决方案**:
1. 确保后端服务器正在运行（http://localhost:3000）
2. 检查 `Lab-19/Lab-19/my-portfolio/.env` 文件中的 `VITE_API_URL`
3. 重启前端开发服务器

### 登录后立即退出
**问题**: 登录成功但立即被退出

**解决方案**:
1. 打开浏览器开发者工具（F12）
2. 检查 Console 是否有错误
3. 检查 Application > Local Storage 是否保存了 token
4. 清除 localStorage 并重新登录

### 无法创建项目或文章
**问题**: 点击 Create 后没有反应或显示错误

**解决方案**:
1. 确保已登录
2. 检查浏览器 Console 的错误信息
3. 检查后端服务器日志
4. 确保所有必填字段都已填写

### 数据库没有数据
**问题**: 项目和博客列表为空

**解决方案**:
```bash
cd Lab-17/Lab-17/nodemon-lab
node seedData.js
```

---

## 📞 需要帮助？

1. 查看 `PROJECT_COMPLETION_SUMMARY.md` 了解项目概况
2. 查看 `Lab-17/Lab-17/nodemon-lab/README.md` 了解后端 API
3. 查看 `Lab-19/Lab-19/my-portfolio/README_NEW.md` 了解前端应用
4. 检查浏览器开发者工具的 Console 和 Network 标签
5. 检查后端服务器的终端输出

---

## 🎉 享受你的全栈应用！

现在你有一个完整的、功能齐全的全栈 Web 应用程序。

**下一步建议：**
- 自定义样式和颜色
- 添加更多功能
- 部署到云平台（Vercel + Render）
- 添加图片上传功能
- 实现搜索功能
- 添加分页
- 实现用户个人资料页面

祝你编码愉快！🚀

