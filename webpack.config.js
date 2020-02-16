const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',
  entry: ['./src/assets/js/main.js', './src/main.js', './src/assets/css/main.css'],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'assets/js/[name].js',
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
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: __dirname + '/dist/assets',
              hmr: process.env.NODE_ENV === 'development',
              reloadAll: true,
            },
          },
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              config: {
                path: __dirname + '/postcss.config.js'
              }
            }
          }
        ]
      }
    ]
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist/layout'),
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
      filename: 'layout/index.html'
    }),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // all options are optional
      filename: 'assets/css/[name].css',
      chunkFilename: '[id].css',
      ignoreOrder: false, // Enable to remove warnings about conflicting order
    }),
    new webpack.optimize.AggressiveMergingPlugin(),
    new webpack.optimize.MinChunkSizePlugin({ minChunkSize: 10000 }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ]
}
