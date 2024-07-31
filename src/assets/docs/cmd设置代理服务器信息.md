<!--
title:cmd设置代理服务器信息
date:2024-07-31 03:06:17
tags:- cmd
-->
#### 问题简述
cmd使用npm、git等请求地址慢或访问不到，挂了代理只有作用不到，需要另外给cmd指定端口设置代理服务器  

#### windows在终端（cmd）中设置代理服务器
1. 设置HTTP代理：
```
	set http_proxy=http://127.0.0.1:<port>
```
2. 设置HTTPS代理：
```
	set https_proxy=http://127.0.0.1:<port>
```