<!--
title:vue3中使用highlight.js
date:2024-08-02 03:30:58
tags : - vue - highlightjs
-->
### 安装依赖
vue中需要同时安装`highlight.js`和`@highlightjs/vue-plugin`两个依赖
```
yarn add highlight.js
yarn add @highlightjs/vue-plugin

npm install highlight.js
npm install @highlightjs/vue-plugin 
```
官方文档:<https://highlightjs.org/>

### 如何使用
#### main.js全局申明
首先做好如下关键引用
```
import hljs from "highlight.js/lib/core";
import hljsVuePlugin from "@highlightjs/vue-plugin";
import "highlight.js/lib/common";
```
引入highlight.js的官方主题，因为我的项目想要动态改变dark和light样式因此把css抄出来做了成了css变量
```
import "highlight.js/styles/atom-one-dark.css"

```
引入语言，之后就可以在`<highlightjs>`中指定`language`属性来对应不同的语言
```
import javascript from "highlight.js/lib/languages/javascript"; 
import html from "highlight.js/lib/languages/vbscript-html"
hljs.registerLanguage("javascript", javascript);
hljs.registerLanguage("html", html);
```
最后做好全局引用 
```
app.use(hljsVuePlugin)
```
#### 使用\<highlightjs\>标签
使用方式如下：
```
<highlightjs language="html" code="<div class=&quot;className&quot; id=&quot;id&quot;></div>"></highlightjs>
```
效果：
<highlightjs language="html" code="<div class=&quot;className&quot; id=&quot;id&quot;></div>"></highlightjs>