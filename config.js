var express = require('express')
  , stylus = require('stylus');

exports.configure = function(app){
	app.configure(function(){
		app.use(stylus.middleware({src: __dirname+'/public', compile:compile}));
		app.use(express.static(__dirname + '/public'));
		app.set('views', __dirname + '/views');
		app.set('view engine', 'jade');

		function compile(str, path){
			return stylus(str)
				.set('filename', path)
				.use(nib());
		};
	});	
};