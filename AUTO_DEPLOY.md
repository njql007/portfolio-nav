# 自动部署到 Firebase Hosting 配置指南

## 📋 已完成的工作

✅ 创建了 GitHub Actions 工作流文件：
- `.github/workflows/firebase-hosting-merge.yml` - 主分支合并时自动部署
- `.github/workflows/firebase-hosting-pull.yml` - PR 时自动预览

## 🔧 需要你完成的配置步骤

### 方法 1：使用 Firebase CI Token（推荐）

#### 1. 生成 Firebase CI Token
在终端运行：
```bash
firebase login:ci
```

这会：
1. 打开浏览器让你登录 Google
2. 生成一个 CI token
3. 复制这个 token（格式类似：`1//0xxxxx...`）

#### 2. 添加 GitHub Secret
1. 访问你的 GitHub 仓库设置
2. 进入 Settings → Secrets and variables → Actions
3. 点击 "New repository secret"
4. Name: `FIREBASE_SERVICE_ACCOUNT_PORTFOLIO_NAV`
5. Secret: 粘贴刚才的 CI token
6. 点击 "Add secret"

### 方法 2：使用 Service Account（更正式）

#### 1. 生成 Service Account Key
访问 Firebase Console：
```
https://console.firebase.google.com/project/portfolio-nav/settings/serviceaccounts/admin
```

1. 点击 "Generate new private key"
2. 下载 JSON 文件
3. 打开 JSON 文件，复制全部内容

#### 2. 添加 GitHub Secret
同样的步骤，但 Secret 的值是整个 JSON 的内容

---

## 🚀 配置完成后

当你推送代码到 `main` 分支时：
1. GitHub Actions 自动触发
2. 安装依赖并构建项目
3. 自动部署到 Firebase Hosting
4. 几分钟后你的网站就会更新！

## 🔍 监控部署

访问 GitHub Actions 页面查看部署状态：
```
https://github.com/njql007/portfolio-nav/actions
```

## 📝 工作流程

```
你推送代码
    ↓
GitHub 接收推送
    ↓
GitHub Actions 触发
    ↓
构建项目 (npm run build)
    ↓
部署到 Firebase
    ↓
网站更新完成！
```

## ❓ 需要帮助？

如果你完成了 Firebase token 的生成，告诉我，我会帮你提交配置文件并测试自动部署！
