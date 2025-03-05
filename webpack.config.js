/**
 * @file Webpack Configuration
 * @module webpack.config
 * @description Configuration file for Webpack bundling and development server setup.
 *
 * @requires html-webpack-plugin
 * @requires path
 * @requires url
 */

import HtmlWebpackPlugin from 'html-webpack-plugin'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export default {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[contenthash].js',
    clean: true
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/, // Support JS & JSX
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        }
      },
      {
        test: /\.(sa|sc|c)ss$/, // Supports CSS, SCSS, and SASS
        use: [
          'style-loader',
          'css-loader'
          // 'sass-loader' // Uncomment if using SCSS/SASS
        ]
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i, // Handles image imports
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 8 * 1024 // Inline images < 8KB for better performance
          }
        },
        generator: {
          filename: 'assets/[name].[hash][ext]' // Cache busting
        }
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx'], // Auto-resolve JS & JSX imports
    alias: {
      '@components': path.resolve(__dirname, 'src/components'), // Cleaner imports
      '@styles': path.resolve(__dirname, 'src/styles')
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html', // Injects JS into HTML
      filename: 'index.html'
    })
  ],
  devServer: {
    static: './dist',
    hot: true,
    open: true,
    historyApiFallback: true // Enables React Router support
  },
  mode: process.env.NODE_ENV || 'development', // Dynamically set mode (dev/prod)
  devtool: process.env.NODE_ENV === 'production' ? false : 'source-map' // Source maps only in dev
}
