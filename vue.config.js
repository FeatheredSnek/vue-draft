const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  publicPath: '',
  pages: {
    index: {
      entry: 'src/main.ts',
      title: 'vueDraft'
    }
  },
  transpileDependencies: true,
  css: {
    loaderOptions: {
      sass: {
        additionalData: `
          @import "@/styles/variables.scss";
          @import "@/styles/mixins.scss";
        `
      }
    }
  }
});
