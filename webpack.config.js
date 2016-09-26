const path              = require('path');
const srcPath           = path.join(__dirname, 'src');
const webpack           = require('webpack');
const nodeModulesPath   = path.join(__dirname, 'node_modules');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

var atImport            = require('postcss-import');
var webpackPostcssTools = require('webpack-postcss-tools');
var map                 = webpackPostcssTools.makeVarMap('./src/styles/app.css');

module.exports = {
  // devtool: 'cheap-module-eval-source-map',
  devtool: 'eval',

  entry: [
    // Set up an ES6 environment
    'babel-polyfill',
    // For hot style updates
    'webpack/hot/dev-server',
    // The script refreshing the browser on non-hot updates
    'webpack-dev-server/client?http://localhost:8080',
    // Application entry point
    './src/index'
  ],

  output: {
    path: path.join(__dirname, 'public'),
    filename: 'bundle.js',
    publicPath: '/public/'
  },
  module: {
    preLoaders: [
      {
        test: /\.js$/, include: /src/, loaders: ['eslint']
      }
    ],
    loaders: [
      { test: /\.(png|woff|woff2|eot|ttf|svg)$/,
        loader: 'url-loader?limit=100000' },
      { test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
        loader: 'file'},
      { test: /\.css$/,
        loader: ExtractTextPlugin.extract(
          "style-loader",
          "css?importLoaders=1!postcss-loader") 
        },
      { test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015']
        } 
      }
    ]
  },
  resolve: {
    extensions: ['', '.js', 'css'],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new ExtractTextPlugin("./styles.css")
  ],
  postcss: [
    atImport({
      path: 'src/styles/app.css',
      addDependencyTo: webpack
    }),
    webpackPostcssTools.prependTildesToImports,
    require('postcss-custom-properties')({
        variables: map.vars
    }),
    require('postcss-custom-media')({
        extensions: map.media
    }),
    require('precss')(),
    require('postcss-cssnext')({ browsers: ['> 1%', 'ie >= 8'] }),
    require('postcss-reporter')(),
    require('postcss-responsive-type')(),
    require('postcss-font-magician')()
  ],
  "scripts": {
    "start:dev": "webpack-dev-server --progress --colors --content-base src/"
  },
  devServer: {
    contentBase: "./public"
  }
}
