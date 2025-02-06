<!--
title:使用android studio查看并修改本地数据库
date:2025-01-21 00:42:56
tags: -android studio -sqlite3
categories: -测试 -教程
-->
### 方式一：通过Device Explorer导出本地数据库
- 选择Device Explorer工具，连接模拟器或者真机，在文件管理目录中找到项目对应的目录
`data>data>com.uni.xuecestupad>databases`
然后找到需要导出db文件，右键导出。

![](https://superrabbithero-imgs.oss-cn-beijing.aliyuncs.com/blog/20250121084902.png)

- 使用自己熟悉的支持sqlite数据库工具查询即可。
也可以命令行查询
```
	sqlite3 uni_db.db  #打开db文件
	.tables #查看所有表
	.select * from t_uni_notebook;  #查询语句
```

---

### 方式二：通过App Inspection检查
- 打开`View > Tool Windows > App Inspection`

![](https://superrabbithero-imgs.oss-cn-beijing.aliyuncs.com/blog/20250121085714.png)

- 在App Inspection中找到需要检查的app进程，然后选择Database Inspector，选择新增query窗口，选择需要查询的数据库进行查询

![](https://superrabbithero-imgs.oss-cn-beijing.aliyuncs.com/blog/20250121085951.png)