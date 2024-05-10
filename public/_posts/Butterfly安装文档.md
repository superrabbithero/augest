---
title: Butterfly安装文档
date: 2023-08-16 14:04:16
tags:
  - 教程
  - Hexo
  - 主題
  - butterfly
cover: https://jsd.012700.xyz/gh/jerryc127/CDN/img/butterfly-docs-01-cover.png
categories:
  - 搭建博客
---

### 安装
#### gitee安装
稳定版【建议】
在你的 Hexo 根目錄裏
```powershell
git clone -b master https://gitee.com/immyw/hexo-theme-butterfly.git themes/butterfly
```
测试版

> 測試版可能存在Bugs，追求穩定的請安裝穩定版

如果想要安裝比較新的dev分支，可以
```powershell
git clone -b dev https://gitee.com/immyw/hexo-theme-butterfly.git themes/butterfly
```
#### 应用主题
修改 Hexo 根目錄下的 `_config.yml`，把主題改為 `butterfly`
```YAML
theme: butterfly
```
#### 安装插件
如果你沒有 pug 以及 stylus 的渲染器，請下載安裝：
```powershell
npm install hexo-renderer-pug hexo-renderer-stylus --save
```
#### 建议升级

> 升級完成後，請到 Github 的 Releases 界面 或者 文檔七 查看新版的更新內容。
> 裏面有標注 _config 文件的變更內容（如有），請根據實際情況更新你的配置內容。
為了減少升級主題後帶來的不便，請使用以下方法（建議，可以不做）。

在 hexo 的根目錄創建一個文件 `_config.butterfly.yml`，並把主題目錄的 `_config.yml` 內容複製到 `_config.butterfly.yml` 去。( 注意: 複製的是主題的 `_config.yml` ，而不是 hexo 的 `_config.yml`)

> 注意： 不要把主題目錄的 _config.yml 刪掉

> 注意： 以後只需要在 _config.butterfly.yml 進行配置就行。
如果使用了 _config.butterfly.yml， 配置主題的 _config.yml 將不會有效果。

Hexo會自動合併主題中的 `_config.yml` 和 `_config.butterfly.yml` 裏的配置，如果存在同名配置，會使用 `_config.butterfly.yml` 的配置，其優先度較高。


原作者: Jerry
文章連結: https://butterfly.js.org/posts/21cfbf15/
