const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',
  entry: './src/assets/js/main.js',
  output: {
    path: path.join(__dirname, 'dist/assets'),
    filename: '[name].js',
    chunkFilename: '[name]-[id].js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader'
      },
      {
        test: /\.css$/,
        use: [
          { loader: 'css-loader' },
          { loader: 'sass-loader' }
        ]
      }
    ]
  },
  resolve: {
    alias: {
      'lib': path.resolve(__dirname, 'src/assets/js/lib'),
      'modules': path.resolve(__dirname, 'src/modules')
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/layout/index.html'
    })
  ]
}
