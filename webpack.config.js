const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')

module.exports = {
  entry: './src/js/index.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'index_bundle.js',

    clean: true
  },
  module: {
    rules: [
      {
        test: /\.hbs$/,
        loader: 'handlebars-loader',
        options: {
          partialDirs: path.resolve(__dirname, 'src/templates/partials')
        }
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/templates/index.hbs',
      filename: 'index.html',
      templateParameters: {
        appTitle: 'Meters',
        pageTitle: 'Meters',
        version: '1.0.0'
      },
      title: 'Bootstrap Handlebars Webpack Project',
      minify: process.env.NODE_ENV === 'production' ? {
        collapseWhitespace: true,
        removeComments: true,
        removeRedundantAttributes: true,
        useShortDoctype: true
      } : false
    })
  ],
  devServer: {
    static: './dist',
    hot: true,
    open: true
  },
  mode: 'development'
};
