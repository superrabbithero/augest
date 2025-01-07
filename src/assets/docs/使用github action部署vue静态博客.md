<!--
title:使用github action部署vue静态博客
date:2025-01-07 16:37:56
tags: -github
-->

## **前言**
之前将博客部署到github Pages是另外起了一个仓库，每次改动之后部署都需要手动build之后再push dist文件夹。之后发现了可以再代码仓库里配置action，就能做到每次push新代码后都能自动打包部署非常方便。

## **改造开始**
### 1.**配置Github Pages**
1. 创建一个新的分支用于部署(网上一般都新建`gh-pages`分支)。
2. 配置仓库的Pages,把source设置为`GitHub Actions`或者`gh-pages`分支。

### 2.**创建GitHub Actions配置文件**
1. 在项目根目录下创建 `.github/workflows/deploy.yml` 文件。
2. 添加以下内容（适用于 Vue 项目）：
   ```yaml
   # .github/workflows/auto-deploy.yml

    name: auto deploy 🚀

    on:
    # 监听push操作
    push:
        branches:
        - main # 这里只配置了main分支，所以只有推送main分支才会触发以下任务
    pull_request:

    # 这个选项可以使你手动在 Action tab 页面触发工作流
    # workflow_dispatch:

    permissions:
    # 允许对仓库的内容进行写操作。包括创建、修改和删除文件、目录以及提交更改等
    # 这里只配置了push，所以只有推送main分支才会触发以下任务 
    contents: write
    # 允许管理 GitHub Pages 服务并对其进行写操作
    pages: write


    jobs:
    # 任务ID
    build-and-deploy:
        # 运行环境
        # runs-on: macos-latest
        # runs-on: windows-latest
        runs-on: ubuntu-latest
        concurrency:
        group: ${{ github.workflow }}-${{ github.ref }}
        
        # 步骤
        steps:
        # 官方action，将代码拉取到虚拟机
        - name: Checkout
            uses: actions/checkout@v3

        # 建一个名为setup-node的步骤（安装指定版本的Node.js）
        - name: setup-node 
            # 使用setup-node@v3这个action
            uses: actions/setup-node@v3
            # 指定某个action 可能需要输入的参数
            with:
            node-version: '20.x'

        # 安装 pnpm
        - name: Install yarn
            run: npm install yarn -g

        # 安装依赖  
        - name: Install dependencies
            run: yarn install
        # 打包
        - name: Build application 🔧
            run: npm run build

        # 部署 https://github.com/JamesIves/github-pages-deploy-action
        - name: Deploy 🚀
            uses: JamesIves/github-pages-deploy-action@v4
            if: github.ref == 'refs/heads/main'
            with:
                token: ${{ secrets.GITHUB_TOKEN }}
                branch: gh-pages  # default: gh-pages
                folder: dist
                clean: true # Automatically remove deleted files from the deploy branch
                # commit-message: ${{ github.event.head_commit.message }} # default: `Deploying to gh-pages from @ 3238feb 🚀`
                # commit-message: "deploy: ${{ github.sha }} (${{ github.event.head_commit.message }}) 🚀 "
   ```

### 3. **确保项目结构正确**

1. **设置 `vue.config.js`**:
   如果项目存放在一个子路径下，例如 `https://username.github.io/repo-name/`，需要设置 `publicPath`：

   ```javascript
   module.exports = {
     publicPath: process.env.NODE_ENV === 'production' ? '/repo-name/' : '/',
   };
   ```

   如果是主路径 `https://username.github.io/`，设置为：

   ```javascript
   module.exports = {
     publicPath: '/',
   };
   ```


### 4. **提交代码并触发部署**

1. 提交代码到 `main` 分支：

   ```bash
   git add .
   git commit -m "Set up GitHub Actions for deployment"
   git push origin main
   ```

2. Actions 会自动触发部署流程。



### 5. **查看部署结果**

1. 等待 Actions 执行完成，确保没有错误。
2. 打开 GitHub Pages 的 URL 查看结果，例如：
    ```
    https://username.github.io/repo-name/
    ```



### 注意事项
1. 如果项目路径不正确，检查 `vue.config.js` 中的 `publicPath` 配置。
2. 默认情况下，`GitHub_TOKEN` 有权限推送到仓库。如果需要自定义权限，可以创建个人访问令牌（PAT）并添加到仓库 `Settings > Secrets and variables > Actions` 中，命名为 `GH_TOKEN`，然后修改配置：
   ```yaml
   with:
     token: ${{ secrets.GH_TOKEN }}
   ```
