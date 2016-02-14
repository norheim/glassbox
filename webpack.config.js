var path = require('path');
var webpack = require('webpack');

var BUILD_DIR = path.resolve(__dirname, 'build');
var APP_DIR = path.resolve(__dirname, 'app');

var config = {
  entry: [
    path.join('webpack','hot','dev-server'),
    path.join(APP_DIR, 'index.jsx')
  ],
  output: {
    path: BUILD_DIR,
    publicPath: __dirname,
    filename: 'bundle.js'
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  module : {
    loaders : [
      {
        test : /\.jsx?/,
        include : APP_DIR,
        exclude: /node_modules/,
        loader : 'babel-loader',
        query: {
          presets: ['react', 'stage-2', 'es2015'],
          plugins: ['transform-runtime']
        }
      }
    ]
  }
};
module.exports = config;
/*resolve: {
    alias: {
      'react-ace':  path.join(__dirname, '/node_modules/react-ace/src', 'ace.jsx')
    }
},*/
