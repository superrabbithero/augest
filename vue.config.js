const { defineConfig } = require('@vue/cli-service')

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
          include: /src\/assets\/svg/, // 只包含这个路径下的 SVG 文件
          use: [
            {
              loader: 'svg-sprite-loader',
              options: {
                symbolId: 'icon-[name]'
              }
            }
          ]
        },
        {
          test: /\.svg$/,
          exclude: /src\/assets\/icons/, // 排除这个路径下的 SVG 文件
          use: [
            {
              loader: 'file-loader',
              options: {
                name: 'assets/[name].[hash:8].[ext]'
              }
            }
          ]
        }
      ]
    }
  }
})
