<!--
title: iconpark改变颜色
date: 2023-09-01 15:16:45
tags: - Vue - iconpark
categories:
    - 建站日志
-->
### 前言(被自己蠢死)
我想实现鼠标上移改变iconpark图标的颜色，然后百度资料少得可怜，基本上是将fill值设置为变量，再写改变颜色的方法。然后哇擦嘞，在这样写了很久之后，突然忘记设置fill，我发现如果不设置fill会默认读css里的color！！！为什么网上没人说啊！！！

![](https://gitee.com/huangding1996/imghost/raw/master/photo/fd987dd78e.gif)

#### iconpark改变图标颜色
最简单的方法就是不要设置fill! 不要设置fill! 不要设置fill!
```HTML
<check-one theme="outline" size="22"/>
```
不设置fill的话就会默认check-one的color
这样就可以通过伪类修改hover、acitve等样式了