const HtmlWebpackPlugin = require('html-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const path = require('path');
const {
  CleanWebpackPlugin
} = require('clean-webpack-plugin');
const webpackConfig = {
  mode: "development",
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'bundle.[hash:8].js'
  },
  module: {
    rules: [{
      test: /\.vue$/,
      loader: 'vue-loader'
    },
    {
      test: /\.css$/,
      use: [
        process.env.NODE_ENV !== 'production' ?
          'vue-style-loader' :
          MiniCssExtractPlugin.loader,
        "css-loader",
      ]
    },
    {
      test: /\.js$/,
      exclude: /node_modules/,
      loader: "babel-loader"
    },
    {
      test: /\.scss$/,
      use: [
        process.env.NODE_ENV !== 'production' ?
          'vue-style-loader' :
          MiniCssExtractPlugin.loader,
        "css-loader",
        "sass-loader",
      ]
    },
    {
      test: /\.(png|woff|woff2|svg|ttf|eot)$/,
      use: {
        loader: 'url-loader',
        options: {
          limit: 100000,  //这里要足够大这样所有的字体图标都会打包到css中
        }
      }
    }
    ]
  },
  resolve:{
    alias:{
      Server:path.resolve(__dirname,'../src/server'),
      Front:path.resolve(__dirname,'../src/front'),
      Config:path.resolve(__dirname,'../src/config'),
      Router:path.resolve(__dirname,'../src/router'),
    },
    extensions: [".js", ".vue"],
    mainFiles: ["index"]
  },
  devServer: {
    clientLogLevel: "none",
    contentBase: path.join(__dirname, "../dist"),
    compress: true,
    port: 9000,
    hot: true,
    quiet: true,
    //代理
    proxy: {
      "/api": {
        target: "http://localhost:3001",
        pathRewrite: {
          "^/api": ""
        },
        changeOrigin: true
      }
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'src/index.html',
      inject: 'body',
    }),
    new CleanWebpackPlugin(),
    new FriendlyErrorsWebpackPlugin({
      compilationSuccessInfo: {
        messages: ['项目启动于 http://localhost:9000'],
        notes: ['ctrl+单击 链接访问']
      },
      clearConsole: true,
    }),
    new VueLoaderPlugin(),
    new MiniCssExtractPlugin()
  ]
};
module.exports = webpackConfig