const { defineConfig } = require('@vue/cli-service')
const path = require('path');
module.exports = defineConfig({
  parallel: false,
  transpileDependencies: true,
  lintOnSave: false,
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
        },
        {
          test: /\.svg$/,
          include: path.resolve(__dirname, 'src/assets/icons/svg'), // 只包含这个路径下的 SVG 文件
          use: [
            {
              loader: 'svg-sprite-loader',
              options: {
                symbolId: 'icon-[name]'
              }
            }
          ]
        }
        
      ]
    }
  },
})
