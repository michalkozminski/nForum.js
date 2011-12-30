var express = require('express')
	, stylus = require('stylus')
	, nib = require('nib')
	, config = require('./config.js')
	, pages = require('./pages.js')
	, socketio = require('./socketio.js');

var app = express.createServer();

config.configure(app);

pages.configure(app);

app.listen(3001, function(){
	var addr = app.address();
	console.log('wystartowałem na porcie:'+addr.port+' kurwa');
});

socketio.use(app);