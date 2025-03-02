import HtmlWebpackPlugin from 'html-webpack-plugin';
import path from 'path';
import AssemblyInfo from './src/js/AssemblyInfo.js'; // Import the class

// Create an instance of AssemblyInfo
const appInfo = new AssemblyInfo();

console.dir(appInfo.getInfo()); // Logs metadata object

export default {
  entry: './src/js/index.js',
  output: {
    path: path.resolve(process.cwd(), './dist'),
    filename: 'index_bundle.js',
    clean: true
  },
  module: {
    rules: [
      {
        test: /\.hbs$/,
        loader: 'handlebars-loader',
        options: {
          partialDirs: path.resolve(process.cwd(), 'src/templates/partials')
        }
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  plugins: [
    // Index View (Home Page)
    new HtmlWebpackPlugin({
      template: './src/templates/index.hbs',
      filename: 'index.html',
      templateParameters: {
        appTitle: appInfo.title,
        pageTitle: appInfo.title,
        version: appInfo.version,
        copyright: appInfo.copyright,
        company: appInfo.company
      },
      title: 'Bootstrap Handlebars Webpack Project',
      minify: process.env.NODE_ENV === 'production'
        ? {
          collapseWhitespace: true,
          removeComments: true,
          removeRedundantAttributes: true,
          useShortDoctype: true
        }
        : false
    }),

    // Main View (New Page)
    new HtmlWebpackPlugin({
      template: './src/templates/main.hbs', // New Handlebars template
      filename: 'main.html', // Generates main.html
      templateParameters: {
        appTitle: appInfo.title,
        pageTitle: "Main View",
        version: appInfo.version,
        copyright: appInfo.copyright,
        company: appInfo.company
      },
      title: 'Main Page',
      minify: process.env.NODE_ENV === 'production'
        ? {
          collapseWhitespace: true,
          removeComments: true,
          removeRedundantAttributes: true,
          useShortDoctype: true
        }
        : false
    })
  ],
  devServer: {
    static: './dist',
    hot: true,
    open: true
  },
  mode: 'development'
};
