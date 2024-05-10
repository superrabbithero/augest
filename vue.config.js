const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
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
        }
      ]
    }
  }
  // chainWebpack: config => {

  //   config.module.rule('md')
  //     .test(/\.md/)
  //     .use('vue-loader')
  //     .loader('vue-loader')
  //     .end()
  //     .use('vue-markdown-loader')
  //     .loader('vue-markdown-loader/lib/markdown-compiler')
  //     .options({
  //         raw: true
  //     });
  // },
})
