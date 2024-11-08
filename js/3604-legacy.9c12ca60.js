"use strict";(self["webpackChunkaugest"]=self["webpackChunkaugest"]||[]).push([[3604],{93604:function(n,e,o){o.r(e),o.d(e,{default:function(){return A}});var t=o(19812),d=(0,t._)("head",null,null,-1),l=(0,t._)("h3",null,"前言",-1),r=(0,t._)("p",null,"去年12月左右有了自己制作博客的想法，当时使用markdown-it前端解析了md文件，也没怎么去管。最近再看代码的时候感觉特别长，而且在展示本地的博客内容时loading界面时间较长，就想着有没有预加载的可能。问了gpt3.5后推荐了markdown-loader，再百度了一下，大概是在打包的时候，利用webpack将.md的文件预处理成html文件，因此静态访问就不会再loading了。",-1),a=(0,t._)("h3",null,"基本使用",-1),m=(0,t._)("h4",null,"1.添加依赖",-1),u=(0,t._)("pre",null,[(0,t._)("code",{"v-pre":""},"npm install vue-markdown-loader\n")],-1),p=(0,t._)("h4",null,"2.jsconfig.json配置",-1),s=(0,t._)("pre",null,[(0,t._)("code",{"v-pre":""},"configureWebpack: {\n    module: {\n      rules: [\n        {\n          test: /\\.md$/,\n          use: [\n            {\n              loader: 'vue-loader'\n            },\n            {\n              loader: 'vue-markdown-loader/lib/markdown-compiler',\n              options: {\n                raw: true\n              }\n            }\n          ]\n        }\n      ]\n    }\n  }\n")],-1),i=(0,t._)("h4",null,"3.components",-1),c=(0,t._)("p",null,"简单调用",-1),k=(0,t._)("pre",null,[(0,t._)("code",{"v-pre":""},'<template>\n    <div class="markdown-body" ref="markdownRef">\n        <markdowncontent></markdowncontent>\n    </div>\n</template>\n<script>\nimport markdowncontent from \'.md路径\'\nexport default {\n    components:{\n        markdowncontent\n    }\n}\n')],-1),w=(0,t._)("p",null,"以上一个.md的文件就能展示在网页上了",-1),h=(0,t._)("h3",null,"添加动态组件",-1),_=(0,t._)("p",null,"基本使用只能挂载一个固定的.md文件，如果通过传入的文件名作为参数，动态加载组件怎么做呢。gpt让我用import()加载组件，代码改成：",-1),f=(0,t._)("pre",null,[(0,t._)("code",{"v-pre":""},"<template>\n    <div class=\"markdown-body\">\n        <component :is=\"markdownContent\" /> //使用:is动态挂载组件\n    </div>\n</template>\n<script>\n\nimport 'github-markdown-css'; //用这个可以美化.md样式，应用在markdown-body类下\n\nexport default {\n    props:{\n        mdFileName:{\n            type:String,\n            required:true\n        }\n    },\n    data() {\n        return {\n            markdownContent: null,\n        }\n    },\n    created() {\n        var that = this\n        import('@/assets/docs/' + this.mdFileName + '.md').then( async module => {\n            const markdownContent = module.default; // 获取默认导出的组件\n            that.markdownContent = markdownContent;\n        })\n    },\n}\n")],-1),v=(0,t._)("h3",null,"如何制作一个目录",-1),b=(0,t._)("code",null,"querySelectorAll()",-1),g=(0,t._)("pre",null,[(0,t._)("code",{"v-pre":""},"//需将findMarkdownHeadings放在updated中执行\nfindMarkdownHeadings() {\n    // 选择class为'markdown-body'下所有的h1-6元素\n    const headings = document.querySelectorAll('.markdown-body h1, .markdown-body h2, .markdown-body h3, .markdown-body h4, .markdown-body h5, .markdown-body h6');\n\n    // 转换成数组\n    headingsList = Array.from(headings).map(element => {\n    return {\n        level: parseInt(element.tagName[1]), // 提取标题级别\n        content: element.textContent.trim(),// 提取标题内容\n        ele:element //dom对象，用于目录和页面的滚动交互\n        };\n    });\n}\n")],-1);function y(n,e){var o=(0,t.up)("h");return(0,t.wg)(),(0,t.iD)("section",null,[(0,t._)("html",null,[d,(0,t._)("body",null,[l,r,a,m,u,p,s,i,c,k,w,h,_,f,v,(0,t._)("p",null,[(0,t.Uk)("目录的话需要找到页面上的/"),(0,t.Wm)(o,null,{default:(0,t.w5)((function(){return[(0,t.Uk)("标签,使用动态挂载组件的方式之后，我始终找不到最后生成的页面dom。最后只能在upadated里才能找到.md文件挂载渲染成功后的dom。之后就是常规的用"),b,(0,t.Uk)("查找所有h标签")]})),_:1})]),g])])])}var C=o(48998);const q={},x=(0,C.Z)(q,[["render",y]]);var A=x}}]);
//# sourceMappingURL=3604-legacy.9c12ca60.js.map