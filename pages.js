exports.configure = function(app){
	app.get('/', function(req,res){
		res.render('index',{layout:false});
	});

	app.get('/forum/:id', function(req,res){
		res.render('forum',{layout:false});
	});

	app.get('/topic/:id', function(req,res){
		res.render('topic',{
			layout: false,
			topicId: req.params.id
		});
	});
}