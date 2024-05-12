### 前言
去年12月左右有了自己制作博客的想法，当时使用markdown-it前端解析了md文件，也没怎么去管。最近再看代码的时候感觉特别长，而且在展示本地的博客内容时loading界面时间较长，就想着有没有预加载的可能。问了gpt3.5后推荐了markdown-loader，再百度了一下，大概是在打包的时候，利用webpack将.md的文件预处理成html文件，因此静态访问就不会再loading了。

### 基本使用
#### 1.添加依赖
```
npm install vue-markdown-loader
```
#### 2.jsconfig.json配置
```
configureWebpack: {
    module: {
      rules: [
        {
          test: /\.md$/,
          use: [
            {
              loader: 'vue-loader'
            },
            {
              loader: 'vue-markdown-loader/lib/markdown-compiler',
              options: {
                raw: true
              }
            }
          ]
        }
      ]
    }
  }
```

#### 3.components
简单调用
```
<template>
    <div class="markdown-body" ref="markdownRef">
        <markdowncontent></markdowncontent>
    </div>
</template>
<script>
import markdowncontent from '.md路径'
export default {
    components:{
        markdowncontent
    }
}
```

以上一个.md的文件就能展示在网页上了

### 添加动态组件
基本使用只能挂载一个固定的.md文件，如果通过传入的文件名作为参数，动态加载组件怎么做呢。gpt让我用import()加载组件，代码改成：
```
<template>
    <div class="markdown-body">
        <component :is="markdownContent" /> //使用:is动态挂载组件
    </div>
</template>
<script>

import 'github-markdown-css'; //用这个可以美化.md样式，应用在markdown-body类下

export default {
    props:{
        mdFileName:{
            type:String,
            required:true
        }
    },
    data() {
        return {
            markdownContent: null,
        }
    },
    created() {
        var that = this
        import('@/assets/docs/' + this.mdFileName + '.md').then( async module => {
            const markdownContent = module.default; // 获取默认导出的组件
            that.markdownContent = markdownContent;
        })
    },
}
```

### 如何制作一个目录
目录的话需要找到页面上的/<h/>标签,使用动态挂载组件的方式之后，我始终找不到最后生成的页面dom。最后只能在upadated里才能找到.md文件挂载渲染成功后的dom。之后就是常规的用`querySelectorAll()`查找所有h标签
```
//需将findMarkdownHeadings放在updated中执行
findMarkdownHeadings() {
    // 选择class为'markdown-body'下所有的h1-6元素
    const headings = document.querySelectorAll('.markdown-body h1, .markdown-body h2, .markdown-body h3, .markdown-body h4, .markdown-body h5, .markdown-body h6');

    // 转换成数组
    headingsList = Array.from(headings).map(element => {
    return {
        level: parseInt(element.tagName[1]), // 提取标题级别
        content: element.textContent.trim(),// 提取标题内容
        ele:element //dom对象，用于目录和页面的滚动交互
        };
    });
}
```