---
title: Butterfly外挂css和js
date: 2023-08-21 17:26:42
tags: 
	- 教程
	- Hexo
	- butterfly
categories:
  - 搭建博客
---
## 自定义博客主题中元素的样式
### 提要
在markdown编辑博客时发现一些word中的样式，如改变字体颜色、字体、字号、背景颜色等无法灵活实现，因此在md文本中添加了`<font>`的类名来修改文档中文字的样式。因为md文本文件中添加的`<style>`样式只能作用在当前文件中，所以需要进行统一设置。以下就是挂载自定义css的办法（不建议修改源码），同样可以添加自定义js代码。

### 挂载办法
在butterfly的配置文件中找到以下代码
```YAML
# Inject
# Insert the code to head (before '</head>' tag) and the bottom (before '</body>' tag)
# 插入代码到头部 </head> 之前 和 底部 </body> 之前
inject:
  head:
    - <link rel="stylesheet" href="css文件路径"> 
  bottom:
    - <script src="js文件路径"></script>
```
通常在head中挂载css代码，在bottom中挂载js代码。
css代码通常放在`\butterfly\source\css`目录下，js代码通常放在`\butterfly\source\js`目录下

### 案例：实现修改md中文字颜色
#### 使用md语法直接上色
一种简单的办法是在需要的文字上直接使用md语法套上颜色
```
$\color{#fff}{上色文字}$
```
使用过程中发现这种语法在别的md编辑器上可以生效，但是hexo部署后\$\color后的所有文字的截断了（反正不好用就没深究原因），于是改用了```<font>```标签
```
  我是<font face="黑体">黑体</font>
  我是<font color=darkred>暗红色</font>
  我是<font color= #871F78>紫色</font>
  我是<font size=5>尺寸5</font>
  我是<font face="黑体" color=lightgreen size=10>黑体，绿色，尺寸为10</font>
```
效果是这样的：
>我是<font face="宋体">宋体</font>
>我是<font color=darkred>暗红色</font>
>我是<font color= #871F78>紫色</font>
>我是<font size=5>尺寸5</font>
>我是<font face="黑体" color=lightgreen size=10>黑体，绿色，尺寸为10</font>

用的时候就会发现还是很麻烦，每次都要记颜色代码而且不能自定义背景颜色，使用css外挂就能轻松实现自定义的统一样式。

#### 使用css外挂实现
在`\butterfly\source\css`创建`mystyle.css`文件，写一个类`.c-orange`用于将标记文字变为橘黄色
```css
.c-orange{
  color: #FF7F50
}
```
然后在butterfly的主题配置文件中引用，方法上面讲过了这里直接贴配置结果。
```YAML
inject:
  head:
    - <link rel="stylesheet" href="/css/mystyle.css"> 
  bottom:
    # - <script src="xxxx"></script>
```
最后在md中直接套标签和类就行了
```markdown
这个<font class="c-orange">橙色</font>就是标记出来的文字
```
结果是这样的：
>这个<font class="c-orange">橙色</font>就是标记出来的文字

以上。


![](https://picx.zhimg.com/80/v2-a531ac583d5ff36571063131ddb70453_720w.webp?source=1940ef5c)