const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = (env, argv) => {
  const isDev = argv.mode === 'development';
  return {
    entry: path.join(__dirname, 'src/index.js'),
    output: {
      path: path.join(__dirname, 'dist'),
      publicPath: '/',
      filename: 'bundle.[hash].js',
    },
    module: {
      rules: [
        {
          test: /\.js$/u,
          exclude: /node_modules/u,
          use: {
            loader: 'babel-loader',
          },
        },
        {
          test: /\.s[ac]ss$/ui,
          use: [
            !isDev ? MiniCssExtractPlugin.loader : 'style-loader',
            'css-loader',
            'sass-loader',
          ],
        },
        {
          test: /\.(png|jpe?g|gif)$/ui,
          use: {
            loader: 'file-loader',
          },
        },
        {
          test: /\.md$/ui,
          use: 'raw-loader',
        },
      ],
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: isDev ? '[name].css' : '[name].[hash].css',
        chunkFilename: isDev ? '[id].css' : '[id].[hash].css',
      }),
      new HtmlWebpackPlugin({
        template: path.join(__dirname, 'public/index.html'),
      }),
    ],
    devServer: {
      contentBase: [path.join(__dirname, 'dist'), path.join(__dirname, 'public')],
      historyApiFallback: true,
      compress: true,
      port: 8585,
    },
    devtool: isDev && 'eval-source-map',
    optimization: {
      minimize: !isDev,
      minimizer: [new TerserPlugin()],
    },
  };
};
