const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const { VueLoaderPlugin } = require('vue-loader');

module.exports = {
  entry: './src/main.js',
  mode: 'development',
  devServer: {
    port: 3002,
    hot: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  },
  output: {
    publicPath: 'http://localhost:3002/',
  },
  resolve: {
    extensions: ['.js', '.vue'],
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [
    new VueLoaderPlugin(),
    new ModuleFederationPlugin({
      name: 'cartMFE',
      filename: 'remoteEntry.js',
      exposes: {
        './CartApp': './src/bootstrap',
      },
      shared: {
        vue: { singleton: true, eager: true },
      },
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
  ],
};