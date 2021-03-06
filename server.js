var path = require('path');
var webpack = require('webpack');
var webpackDevMiddleware = require('webpack-dev-middleware');
var webpackHotMiddleware = require('webpack-hot-middleware');
var config = require('./webpack.config');
var app = new require('express')();
var port = 3000;
var backend  = require('./app/file-over-socket/file-backend');
var folderToExplore = path.join(__dirname, 'database');
backend.startSocket(app, folderToExplore);

var fs = require('fs')

var compiler = webpack(config);
app.use(webpackDevMiddleware(compiler, { 
		noInfo: true,
		hot: true,
		publicPath: config.output.publicPath
}));

app.use(webpackHotMiddleware(compiler));

app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(port, function(error) {
  if (error) {
    console.error(error);
  } else {
    console.info("==> 🌎  Listening on port %s. Open up http://localhost:%s/ in your browser.", port, port);
  }
});

if (module.hot) {
  module.hot.accept();
}