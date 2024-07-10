const path = require('path');

module.exports = {
  parallel: false,
  transpileDependencies: true,
  lintOnSave: false,

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

    // 配置 vue-markdown-loader 处理 .md 文件
    const mdRule = config.module.rule('markdown');
    mdRule
      .test(/\.md$/)
      .use('vue-loader')
      .loader('vue-loader')
      .end()
      .use('vue-markdown-loader')
      .loader('vue-markdown-loader/lib/markdown-compiler')
      .options({
        raw: true,
      });
  },
};
