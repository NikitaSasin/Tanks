const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlPlugin = require('html-webpack-plugin');

module.exports = {
  context: path.resolve(__dirname, 'src'),

  entry: {
    main: './script/main.js',
  },

  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: './dist',
    filename: '[name].js',
  },

  watch: true,

  watchOptions: {
    aggregateTimeout: 100,
  },

  devtool: 'inline-source-map',

  module: {
    rules: [{
      test: /\.js?$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
    },
    {
      test: /\.styl$/,
      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: [
          'css-loader',
          {
            loader: 'stylus-loader',
          },
        ],
      }),
    },
    {
      test: /\.(png|svg|jpg|gif)$/,
      use: [
        {
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'img/',
          },
        },
      ],
    },
    ],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new ExtractTextPlugin('css/common.css'),
    new HtmlPlugin({
      filename: 'index.html',
      template: './index.html',
    }),
  ],

  devServer: {
    host: 'localhost',
    port: 9000,
    hot: true,
    contentBase: path.resolve(__dirname, 'dist'),
  },
};
