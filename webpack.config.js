const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',
  entry: ['./src/assets/js/main.js', './src/main.js'],
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
        test: /\.html$/i,
        loader: 'html-loader',
        options: {
          interpolate: true
        }
      },
      {
        test: /\.vue$/,
        use: 'vue-loader'
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
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 8000
  },
  resolve: {
    alias: {
      'lib': path.resolve(__dirname, 'src/assets/js/lib'),
      'modules': path.resolve(__dirname, 'src/modules')
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/layout/index.html',
      filename: 'index.html'
    }),
    new webpack.optimize.AggressiveMergingPlugin(),
    new webpack.optimize.MinChunkSizePlugin({ minChunkSize: 10000 }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ]
}
