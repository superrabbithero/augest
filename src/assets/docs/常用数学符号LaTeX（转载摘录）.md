<!--
title:常用数学符号LaTeX（转载摘录）
date:2024-07-23 03:00:05
tags: - LaTeX - repost
-->

### 原文
CSDN [常用数学符号的 LaTeX 表示方法（附代码）](https://blog.csdn.net/fengmaomao1991/article/details/118960496)
-敬礼

### 用到的公式(备忘)
#### 指数和下标
用^和_后加相应字符
```
E = MC^{2},a_{1}
```  

<span class="output line-center">$$E = MC^{2},a_{1}$$</span>

#### 根号
平方根号: \sqrt  
n次方根：\sqrt[n]  
方根：\surd  

```
\sqrt{x}
\sqrt[3]{x}
\surd[x^{2}+y^{2}]
```


<span class="output line-center">$$\\sqrt{1},\\sqrt[3]{x},\\surd[x^{2}+y^{2}]$$</span>

#### 分数
分数（fraction）使用\frac{…}{…} 排版
```
\frac{1}{2}
```
<span class="output line-center">$$\\frac{1}{2}$$</span>

<style >
.output.line-center {
	width: 100%;
	display:flex;
    justify-content: center;
}
	
</style>