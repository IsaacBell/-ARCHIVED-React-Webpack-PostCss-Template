const path              = require('path')
const webpack           = require('webpack')
const nodeModulesPath   = path.join(__dirname, 'node_modules')
const styleLintPlugin   = require('stylelint-webpack-plugin');

var atImport            = require('postcss-import');
var webpackPostcssTools = require('webpack-postcss-tools');
var map                 = webpackPostcssTools.makeVarMap('./src/styles/app.css');

module.exports = {
  // devtool: 'cheap-module-eval-source-map',
  devtool: 'eval',

  entry: [
    // For hot style updates
    'webpack/hot/dev-server',
    // The script refreshing the browser on none hot updates
    'webpack-dev-server/client?http://localhost:8080',
    // Application entry point
    './src/index.js'
  ],

  output: {
    path: path.join(__dirname, 'public'),
    filename: 'bundle.js',
    publicPath: '/public/'
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],

  module: {
    preLoaders: [
      {
        test: /\.js$/,
        include: /src/,
        exclude: /node_modules/,
        loaders: ['eslint']
      }
    ],
    loaders: [
      { test: /\.js?$/,
        loader: 'babel-loader',
        exclude: nodeModulesPath },
      { test: /\.png$/,
        loader: 'file' },
      { test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
        loader: 'file'},
      { test: /\.css$/,
        loader: 'style-loader!css-loader!postcss-loader' }
    ]
  },
  resolve: {
    extensions: ['', '.js']
  },
  postcss: [
    atImport({
      path: './src/styles/app.css',
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
    // require('postcss-cssnext')(),
    require('postcss-reporter')(),
    // require('postcss-nested')(),
    require('postcss-responsive-type')()
  ],
  "scripts": {
    "start:dev": "webpack-dev-server --inline --content-base ./public"
  }
}
