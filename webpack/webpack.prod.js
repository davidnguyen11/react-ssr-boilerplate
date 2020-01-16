const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const TerserJSPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = merge(common, {
  mode: 'production',
  output: {
    filename: '[name]-[hash].js',
    publicPath: '/static/dist/',
    path: path.resolve(__dirname, '../dist'),
    chunkFilename: '[id]-[chunkhash].js'
  },
  optimization: {
    minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})]
  },
  plugins: [
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // all options are optional
      filename: '[name]-[hash].css',
      chunkFilename: '[id]-[chunkhash].css',
      ignoreOrder: false // Enable to remove warnings about conflicting order
    })
  ]
});
