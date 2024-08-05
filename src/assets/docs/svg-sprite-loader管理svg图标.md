<!--
title:svg-sprite-loader管理svg图标
date:2024-07-18 02:02:35
tags: -svg -Vue - webpack
categories: -搭建博客 -教程
-->
### 前言
之前写了一个像素图标编辑器，生成svg图标保存在`/icon`路径下使用，就有两个问题：  
```
问题1.如果使用`<img>`标签引入svg图标，则不能使用svg中currentColor属性自定义图标颜色  
问题2.如果使用`<svg>`标签直接引入svg图标，则不方便使用，且代码看上去很不好看  
```
然后就查了资料，选择`svg-sprite-loader`来管理svg图标，这样可以在项目中直接使用svg的文件名来引用图标，非常方便。

### 使用方法
#### 安装svg-sprite-loader依赖
将依赖包安装到devDependencies
```
yarn add -d svg-sprite-loader
```

#### 配置vue.config.js
通过webpack将指定目录下的svg文件进行处理，生成雪碧图，通过`symbolId`获得svg路径，用`<use>`标签绘制出来
```javascript
chainWebpack: (config) => {
    // 清除默认的 svg 处理器
    const svgRule = config.module.rule('svg');
    svgRule.exclude.add(path.resolve('src/icons')).end()

    const iconSvgRule = config.module.rule('icons')
    iconSvgRule
      .test(/\.svg$/)
      .include.add(path.resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()
  },
```
这里遇到一个问题，使用vue3的default配置，总是无法移除默认的svg处理器，导致调用失败，使用上述配置才可以成功。

#### 创建svg组件并调用
写一个简单的svg组件
```html
<template>
  <svg :class="svgClass" aria-hidden="true" :style="svgStyle">
    <use :xlink:href="iconName" />
  </svg>
</template>

<script>
export default {
  props: {
    name: {
      type: String,//文件名
      required: true
    },
    className: {
      type: String,//自定义样式类名
      default: ''
    },
    fill: {
      type: String,//像素填充色
      default: "auto"
    },
    size: {
      type: [Number, String],//自定义图标尺寸
      default: 25
    }
  },
  computed: {
    iconName() {
      return `#icon-${this.name}`;
    },
    svgClass() {
      if (this.className) {
        return 'svg-icon ' + this.className;
      } else {
        return 'svg-icon';
      }
    },
    svgStyle() {
      return {
        width: `${this.size}px`,
        height: `${this.size}px`,
        color: `${this.fill}`
      }
    }

  }
};
</script>

<style scoped>
.svg-icon {
  vertical-align: middle;
  fill: currentColor;
}
</style>

```
然后再需要使用的地方导入组件并引用就行了