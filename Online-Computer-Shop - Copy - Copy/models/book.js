var db = require('./db');
module.exports = {
	get: function(userId, callback){
		var sql = "select * from books where id=?";
		db.getResults(sql, [userId], function(result){

			if(result.length >0){
				callback(result[0]);
			}else{
				callback([]);
			}
		});
	},
	

	search1: function(key, callback){
		var sql = "select * from books where author like '%"+key+"%'";
		db.getResults(sql, [], function(result){
			
			
			if(result.length > 0){
				callback(result);
			}else{
				callback([]);
			}
		});
	},
	
	
	getAll: function(callback){
		var sql = "select * from books";
		db.getResults(sql, [], function(results){
			callback(results);
		});
	},
	validate: function(user, callback){
		var sql = "select * from books where title=? and author=? and price=?";
		db.getResults(sql, [user.utitle, user.author, user.price], function(result){

			if(result.length > 0 ){
				callback(result[0]);
			}else{
				callback([]);
			}
		})
	},
	insert: function(user, callback){
		var sql = "insert into books values(null, ?, ?, ?)"
		db.execute(sql, [user.utitle, user.author, user.price], function(success){
			callback(success);
		});
	},
	update: function(user, callback){
		var sql = "update books set title=?, author=?, price=? where id=?";
		db.execute(sql, [user.utitle, user.author, user.price, user.id], function(status){
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});
	},
	delete: function(user, callback){
		var sql = "delete from books where id=?";
		db.execute(sql, [user.id], function(status){
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});
	}
}
