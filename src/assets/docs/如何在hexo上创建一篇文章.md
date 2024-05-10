---
title: 如何在hexo上创建一篇文章
date: 2023-08-16 11:15:08
tags: Hexo
categories:
    - 搭建博客
---
### 新建文章
使用命令行来新建文章
```powershell
hexo new [layout] <titile>
```
layout 是文章的布局，默认为post，可以先不写。  
title 是文章的标题，也是文件的名字，存储在source/_posts下。  
创建文章
```powershell
[root@localhost blog]# hexo new "如何在hexo上创建一篇文章"
...
INFO  Created: /blog/source/_posts/如何在hexo上创建一篇文章.md
```
这样就在hexo中创建了一篇名为"如何在hexo上创建一篇文章"的文章了  
在MarkDown编辑器上打开就可以编辑了

### Front-matter 设置
Front-matter 是文章最上方以—分隔的区域，用于指定文章的变量设置，举例来说：
```markdown
title: 如何在hexo上创建一篇文章
date: 2020-09-16 19:33:46
tags:
---
```
以下是预先定义的参数，可以在模板中使用这些参数值并加以利用。
| 参数 | 描述 | 默认值 |
|--|--|--|
| layout | 布局 | 无 |
| title | 标题 | 无 |
| date | 建立日期 | 文件建立日期 |
| updated | 更新日期 | 文件更新日期 |
| comments | 开启文章的评论功能 | true |
| tags | 标签 | (不适用于分页） |
| categories | 分类 | （不适用于分页） |
| permalink | 覆盖文章网址 | 无 |
自己设置需要的变量
```markdown
categories:
    - 博客
tags:
    - 创建文章
```
设置好开头后，就可以编写文章内容了  
写完后就可以发布了  
如果文章太长不想让文章全部显示出来，可以在文章中间加 ，就可以在首页显示 上面的内容了，并且会添加一个阅读更多的提示  
如图所示

写完文章后输入

```powershell
hexo g && hexo d
```

就可以发布了  
gitee上没有自动更新的功能（其实是有不过要加钱），所以更新完文章，需要在gitee服务处重新更新下就好了

就可以发布了  
gitee上没有自动更新的功能（其实是有不过要加钱），所以更新完文章，需要在gitee服务处重新更新下就好了

以上一篇文章就发布成功了