const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  filenameHashing: false,
  devServer: {
    proxy: process.env.VUE_APP_API_BASE_URL,
  }
})
