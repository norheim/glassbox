var path = require('path');
var webpack = require('webpack');
var webpackDevMiddleware = require('webpack-dev-middleware');
var webpackHotMiddleware = require('webpack-hot-middleware');
var config = require('./webpack.config');
var app = new require('express')();
var port = 3000;

var http = require('http').Server(app);
var io = require('socket.io')(http);
var socketPort = 3001;

var fs = require('fs')

http.listen(socketPort, function(){
  console.log('listening on *:' + socketPort.toString());
});

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

io.on('connection', function(socket){
  	console.log('a user connected');
  	socket.on('client:sendMessage', function(msg){
  		console.log('message: ' + msg);
  		fs.readFile(path.join(__dirname, 'server.js'), 'utf8', function (err,data) {
	  		if (err) {
	    		return console.log(err);
	  		}
	  		socket.emit('server:sendMessage',data)
		});
  	});
  	socket.on('disconnect', function(){
    	console.log('user disconnected');
  	});
});

if (module.hot) {
  module.hot.accept();
}