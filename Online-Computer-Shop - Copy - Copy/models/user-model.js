var db = require('./db');

module.exports={

	// getById: function(id, callback){

	// 	var sql = "select * from userinfo where id=?";
	// 	db.getResults(sql, [id], function(result){

	// 		//console.log(result);
	// 		if(result.length > 0 ){
	// 			callback(result[0]);
	// 		}else{
	// 			callback([]);
	// 		}
	// 	});
	// },
	// validates: function(user, callback){
	// 	var sql = "select * from userinfo where username=? and password=?";

	// 	db.getResults(sql, [user.uname, user.password], function(result){

	// 		if(result.length > 0 ) {
	// 			callback(true);
	// 		}else{
	// 			callback(false);
	// 		}
	// 	});
	// },
	get: function(userId, callback){
		var sql = "select * from userinfo where id=?";
		db.getResults(sql, [userId], function(result){

			if(result.length >0){
				callback(result[0]);
			}else{
				callback([]);
			}
		});
	},
		get1: function(userId, callback){
		var sql = "select * from userinfo where id=?";
		db.getResults(sql, [userId], function(result){

			if(result.length >0){
				callback(result[0]);
			}else{
				callback([]);
			}
		});
	},
	
	validate: function(user, callback){
		var sql = "select * from userinfo where username=? and password=?";

		db.getResults(sql, [user.username, user.password], function(result){

			console.log(result);

			if(result.length > 0 ) {
				callback(result[0]);
			}else{
				callback([]);
			}
		});
	},
	getAll : function(callback){
		var sql = "select * from userinfo";

		db.getResults(sql, [], function(results){

			if(results.length > 0 ) {
				callback(results);
			}else{
				callback([]);
			}
		});
	},
	
	insert : function(user, callback){
		var sql = "insert into userinfo values('', ?, ?, ?, ?, ?)";
		db.execute(sql, [user.name, user.username, user.password, user.email, user.utype], function(status){
			callback(status);
		});
	},
	// update : function(user, callback){
	// 	var sql = "update userinfo set name=?, cname= ?, uname=?, password=?, contact=? where id=?";		
	// 		db.execute(sql, [user.name, user.cname, user.uname, user.password, user.contact, user.id], function(status){
	// 			callback(status);
	// 		});
		
	// },
	delete : function(user, callback){
		var sql = "delete from userinfo where id=?";
		db.execute(sql, [user.id],  function(status){
			callback(status);
		});
	}
}	


