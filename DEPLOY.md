# Firebase 部署指南

## 📋 前置步骤

### 1. 登录 Firebase
```bash
firebase login
```
这会打开浏览器，让你登录 Google 账号并授权 Firebase CLI。

### 2. 创建 Firebase 项目
访问 https://console.firebase.google.com/
- 点击"添加项目"
- 输入项目名称（例如：portfolio-nav）
- 其他选项可以暂时不勾选，直接创建

### 3. 初始化 Firebase
```bash
firebase init hosting
```
配置选项：
- ? Select a default Firebase project for this directory: 选择你刚创建的项目
- ? What do you want to use as your public directory? dist
- ? Configure as a single-page app? Yes
- ? Set up automatic builds with GitHub? No

## 🚀 部署

### 方式一：手动部署
```bash
# 构建项目
npm run build

# 部署到 Firebase
firebase deploy
```

### 方式二：一键部署（推荐）
创建 deploy.sh 脚本：
```bash
#!/bin/bash
npm run build && firebase deploy
```

然后运行：
```bash
chmod +x deploy.sh
./deploy.sh
```

## 🌐 访问你的网站

部署成功后，Firebase 会显示你的网站 URL：
- 默认格式: https://your-project-id.web.app
- 也可以使用: https://your-project-id.firebaseapp.com

## 🔄 更新网站

每次修改代码后，只需：
```bash
npm run build
firebase deploy
```

## 💡 提示
- Firebase 免费版每月有 10GB 流量
- 静态托管完全免费
- 自动提供 HTTPS
- 全球 CDN 加速

## 🔗 自定义域名
1. 在 Firebase Console 中，进入 Hosting 设置
2. 点击"添加自定义域名"
3. 按照提示配置 DNS 记录
4. Firebase 会自动提供 SSL 证书
