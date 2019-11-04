var express = require('express');
var db = require('./db');

	//var router = express.Router();
module.exports = {

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

	search: function(key, callback){
		var sql = "select * from userinfo where username like '%"+key+"%'";
		db.getResults(sql, [], function(result){
			
			
			if(result.length > 0){
				callback(result);
			}else{
				callback([]);
			}
		});
	},
	
	getAll: function(callback){
		var sql = "select * from userinfo";
		db.getResults(sql, [], function(results){
			callback(results);
		});
	},
	
	connection: function(callback){
		var sql = "SELECT t.id,t.authorname,t.booktype, ti.username,ti.password,ti.type FROM productinfo AS t JOIN user AS ti ON t.id= ti.u_id";
		db.getResults(sql, [], function(results){
			callback(results);
		});
	},
	validate: function(user, callback){
		var sql = "select * from userinfo where username=? and password=?";
		db.getResults(sql, [user.uname, user.password], function(result){

			if(result.length > 0 ){
				callback(result[0]);
			}else{
				callback([]);
			}
		});
	},
	insert: function(user, callback){
		var sql = "insert into userinfo values('', ?, ?, ?, ?, ?)";
		db.execute(sql, [user.name, user.username, user.password, user.email, user.utype], function(status){
			callback(status);
		});
	},

	update: function(user, callback){
		var sql = "update userinfo set name =?,username=?, password=?, email=?,utype=? where id=?";
		db.execute(sql, [user.name,user.username, user.password,user.email, user.utype, user.id], function(status){
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});
	},
	delete: function(user, callback){
		var sql = "delete from userinfo where id=?";
		db.execute(sql, [user.id], function(status){
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});
	}
}