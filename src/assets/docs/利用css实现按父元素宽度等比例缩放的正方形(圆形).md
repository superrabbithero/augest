<!--
title:利用css实现按父元素宽度等比例缩放的正方形(圆形)
date:2024-07-18 02:17:21
tags: -CSS -Vue
categories: -搭建博客 -教程
-->

### 问题描述
在制作前面的项目时，进场需要绘制一下正方形的div,但是实现方式总是简单的指定宽度和高度，无法自适应父元素的宽度。  
想要绘制一个和父元素一起同比例放大、缩小的正方形

### 实现
通过元素的`width`、`padding-top`来制作正方形。
```html
<div class="parent">
	<div class="child">
		<div class="rect"></div>
	</div>
</div>
```
```css
  .child{
	width: 10%;
	padding-top: 10%;
	position: relative;
	...
  }
  .rect{
	position: absolute;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	...
  }
```

<div class="parent">
	<div class="child">
		<div class="rect"></div>
	</div>
</div>
<style>
.parent{
	width: 100%;
}
.child{
	width: 10%;
	padding-top: 10%;
	position: relative;
}
.rect{
	position: absolute;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	border:1px solid #000;
}
</style>