exports.use = function(app){
	var mysql = require('mysql');
	var mysqlDatabase = 'forum';
	var sio = require('socket.io');
	
	var mysqlClient = mysql.createClient({
		user: 'root',
		password: 'root'
	});
	mysqlClient.query('USE '+mysqlDatabase);
	
	var io = sio.listen(app);
		
	io.sockets.on('connection', function (socket) {
		socket.on('get forumsWithCategories', function(){
			mysqlClient.query("SELECT * from `forums`", function(err,results){
				if(err){
					throw err;
				}
				socket.emit('forumsWithCategories',results);
			});
		});

		socket.on('get forum', function(id){
			mysqlClient.query("SELECT * from `topics` ", function(err,results){
				if(err){
					throw err;
				}
				socket.emit('topics',results);
			});
			
		});
		
		socket.on('get topic', function(id){
			mysqlClient.query("SELECT * from `messages` WHERE topic_id = "+id, function(err,results){
				if(err){
					throw err;
				}
				socket.emit('answers',results);
			});
			
		});
		
		socket.on('new answer',function(body,username,topic_id){
			//save new message
			mysqlClient.query("INSERT INTO `messages` VALUES (null, '"+ body +"','"+ username +"', "+ topic_id +")", function(err){
				if(err){
					throw err;
				}
			});
			//get info about new message
			mysqlClient.query("SELECT * FROM `topics` JOIN `forums` forum ON topics.forum_id = forum.id WHERE topics.id = " + topic_id,function(err, results){
				if(err){
					throw err;
				}
				
				socket.broadcast.emit('new message',{body: body,
						username: username},
						results[0]);
			});
		});

	});

}