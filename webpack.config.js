const HtmlWebPackPlugin = require("html-webpack-plugin");
const devMode = process.env.NODE_ENV !== 'production' ? true : false;
module.exports = {
  mode: devMode === true ? 'development' : 'production',
  output: {
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        include: /src/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        },
        resolve: { extensions: [".js", ".jsx"] }
      },
      {
        test: /\.(js|jsx)$/,
        use: 'react-hot-loader/webpack',
        include: /node_modules/
      },
      {
        test: /\.(js|jsx)$/,
        enforce: 'pre',
        loader: 'eslint-loader',
        include: '/src'
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          'style-loader',
          // Translates CSS into CommonJS
          'css-loader',
          // Compiles Sass to CSS
          'sass-loader',
        ],
      },
      {
        test: /\.(gif|png|jpe?g|svg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'static/images/[contenthash].[ext]'
            }
          },
          'image-webpack-loader'
        ]
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader"
          }
        ]
      }
    ]
  },
  devtool: 'source-map',
  optimization: {
    splitChunks: {
      cacheGroups: {
        styles: {
          name: 'styles',
          test: /\.css$/,
          chunks: 'all',
          enforce: true,
        },
      },
      chunks: 'all'
    }
  },
  plugins: [
    new HtmlWebPackPlugin({
      inject: true,
      template: "./src/index.html",
      minify: {
        removeComments: devMode ? false : true,
        collapseWhitespace: devMode ? false : true,
        removeRedundantAttributes: devMode ? false : true,
        useShortDoctype: devMode ? false : true,
        removeEmptyAttributes: devMode ? false : true,
        removeStyleLinkTypeAttributes: devMode ? false : true,
        keepClosingSlash: devMode ? false : true,
        minifyJS: devMode ? false : true,
        minifyCSS: devMode ? false : true,
        minifyURLs: devMode ? false : true
      }
    })
  ]
};