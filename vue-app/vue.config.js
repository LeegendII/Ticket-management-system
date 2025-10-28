module.exports = {
  lintOnSave: false,
  transpileDependencies: [],
  chainWebpack: config => {
    // Disable the progress plugin
    config.plugins.delete('progress');
  }
}