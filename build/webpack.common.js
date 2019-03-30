const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');
module.exports = {
  entry: {
    app: './src/index.js'
  },
  output: {
    filename: 'uni.min.js',
    path: path.resolve(__dirname, '../dist')
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: "css-loader"
        })
      }, {
        test: /\.scss/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: ['css-loader','sass-loader']
        })
      }, {
        test:/\.(png)|(jpg)|(gif)|(woff)|(woff2)|(svg)|(eot)|(ttf)$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: 'fonts/[name].[ext]'
          }
        }]
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin("uni.css"),
  ],
  externals: {
    jquery: 'jQuery'
  },
  devServer: {
    contentBase: './dist'
  }
};
