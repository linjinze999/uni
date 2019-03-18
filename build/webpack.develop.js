const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'production',
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist'
  },
  output: {
    filename: 'uni.min.js',
    path: path.resolve(__dirname, '../docs/.vuepress/public/assets/js/')
  }
});
