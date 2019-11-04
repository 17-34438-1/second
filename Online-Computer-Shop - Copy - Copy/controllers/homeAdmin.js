var express = require('express');
var userModel = require('./../models/user-model');
var userModel1 = require('./../models/user-model1');
var productModel = require('./../models/product-model');

var Model= require.main.require('./models/book');
var router = express.Router();


router.get('/', function(req, res){
	res.render('homeAdmin/index');
});

router.get('/', function(req, res){
	
	userModel1.getAll(function(results){
		var data = {
			name: req.session.un,
			uLit: results
		};
		res.render('homeAdmin/index', data);
	});
});
router.get('/profile', function(req, res){

	userModel.get(req.session.uid, function(result){

		if(result != ""){
			res.render('homeAdmin/profile', result);
		}else{
			res.redirect('/homeAdmin');
		}
	});
});
router.get('/adduser', function(req, res){
	res.render('homeAdmin/adduser');
});
router.post("/adduser", function(req, res){

	var user = {
		name: req.body.name,
		username: req.body.username,
		password: req.body.password,
		email: req.body.email,
		utype: req.body.utype
	};

	userModel1.insert(user, function(status){

		if(status){
			res.redirect('/user/userlist');
		}else{
			res.redirect('/homeAdmin/adduser');
		}
	});
});


router.get('/edit/:id', function(req, res){

	userModel1.get(req.params.id, function(result){

		if(result != ""){
			res.render('homeAdmin/edit', result);
		}else{
			res.redirect('/homeAdmin/userlist');
		}
	});
});

router.post("/edit/:id", function(req, res){

	var user = {
		id: req.params.id,
			name: req.body.name,
				username: req.body.username,
		password: req.body.password,
			email: req.body.email,
		utype: req.body.utype
	};

	userModel1.update(user, function(status){

		if(status){
			res.redirect('/homeAdmin/userlist');
		}else{
			res.redirect('/homeAdmin/edit:'+req.params.id);
		}
	});
});

router.get('/delete/:id', function(req, res){

	userModel1.get(req.params.id, function(result){

		if(result != ""){
			res.render('homeAdmin/delete', result);
		}else{
			res.redirect('/homeAdmin/userlist');
		}
	});
});
router.post("/delete/:id", function(req, res){

	var user = {
		id: req.params.id,
		name: req.body.name,
		username: req.body.username,
		password: req.body.password,
		email: req.body.email,
		utype: req.body.utype
	};

	userModel1.delete(user, function(status){

		if(status){
			res.redirect('/homeadmin/userlist');
		}else{
			res.redirect('/homeAdmin/delete:'+req.params.id);
		}
	});
});

router.get('/search', function(req, res){

	userModel1.search(req.params.key, function(results){
	
		res.render('homeAdmin/search');
	});
});


router.get('/search/:key', function(req, res){

	userModel1.search(req.params.key, function(results){

		res.send(results);
	});
});
router.get('/join', function(req, res){

	userModel1.connection(function(results){
	
		var data = {
			name: req.session.un,
			List: results
		};
		res.render('homeAdmin/join', data);
	});
});


module.exports = router;