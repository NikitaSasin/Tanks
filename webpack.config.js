const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const ImageminPlugin = require('imagemin-webpack-plugin').default;

module.exports = {
  entry: {
    main: './src/script/main.js',
  },

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
  },

  devtool: 'inline-source-map',

  module: {
    rules: [{
      test: /\.es6$/,
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
  resolve: {
    extensions: ['.js', '.es6'],
  },
  plugins: [
    new UglifyJSPlugin(),
    new CleanWebpackPlugin(['dist']),
    new ExtractTextPlugin('css/common.css'),
    new HtmlPlugin({
      filename: 'index.html',
      template: './src/index.html',
    }),
    new ImageminPlugin({
      pngquant: {
        quality: '95-100',
      },
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],

  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
    hot: true,
  },
};
