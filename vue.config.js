const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  lintOnSave: false,

  transpileDependencies: [
    'vuetify'
  ],
  devServer: {
    host: '0.0.0.0',
  }
})
