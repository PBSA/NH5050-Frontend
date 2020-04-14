const merge = require('webpack-merge');
const paths = require('./paths');
const common = require('./webpack.config.js');

module.exports = merge(common, {
  mode: 'production',
  output: {
    filename: 'static/js/[name].[chunkhash:8].js',
    chunkFilename: 'static/js/[name].[chunkhash:8].chunk.js',
    publicPath: paths.servedPath,
  },
});
