import HtmlWebpackPlugin from 'html-webpack-plugin'
import path from 'path'

export default {
  entry: './src/index.js',
  output: {
    path: path.resolve(process.cwd(), './dist'),
    filename: 'index_bundle.js',
    clean: true
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/, // Add JSX support
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        }
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i, // ✅ Add support for images
        type: 'asset/resource',
        generator: {
          filename: 'assets/[name][ext]' // Saves images in dist/assets/
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html', // ✅ Use HTML instead of HBS
      filename: 'index.html'
    })
  ],
  devServer: {
    static: './dist',
    hot: true,
    open: true
  },
  resolve: {
    extensions: ['.js', '.jsx'] // Allow importing JSX files
  },
  mode: 'development'
}