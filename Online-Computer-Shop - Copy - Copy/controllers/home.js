var express = require('express');
var userModel = require('./../models/user-model');
var userModel1 = require('./../models/user-model1');
var productModel = require('./../models/product-model');

var Model= require.main.require('./models/book');
var router = express.Router();


router.get('*', function(req, res, next){

	if(req.cookies['username'] != null){
		next();
	}else{
		res.redirect('/login');
	}
});


router.get('/', function(req, res){
	res.render('home/index');
});

router.get('/', function(req, res){
	
	userModel1.getAll(function(results){
		var data = {
			name: req.session.un,
			uList: results
		};
		res.render('home/index', data);
	});
});


router.get('/userlist', function(req, res){

	userModel1.getAll(function(results){
	
		var data = {
			name: req.session.un,
			uList: results
		};
		res.render('home/userlist', data);
	});
});
router.get('/join', function(req, res){

	userModel1.connection(function(results){
	
		var data = {
			name: req.session.un,
			List: results
		};
		res.render('home/join', data);
	});
});

router.get('/search', function(req, res){

	userModel1.search(req.params.key, function(results){
	
		res.render('home/search');
	});
});


router.get('/search/:key', function(req, res){

	userModel1.search(req.params.key, function(results){

		res.send(results);
	});
});


router.get('/profile', function(req, res){

	userModel.get(req.session.uid, function(result){

		if(result != ""){
			res.render('home/profile', result);
		}else{
			res.redirect('/home');
		}
	});
});


router.get('/addbook', function(req, res){
	res.render('home/addbook');
});
router.post("/addbook", function(req, res){

	var user = {
		utitle: req.body.utitle,
		author: req.body.author,
		price: req.body.price
	};

	Model.insert(user, function(status){

		if(status){
			res.redirect('/home/booklist');
		}else{
			res.redirect('/home/addbook');
		}
	});
});
router.get('/adduser', function(req, res){
	res.render('home/adduser');
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
			res.redirect('/home/userlist');
		}else{
			res.redirect('/home/adduser');
		}
	});
});

router.get('/edit/:id', function(req, res){

	userModel1.get(req.params.id, function(result){

		if(result != ""){
			res.render('home/edit', result);
		}else{
			res.redirect('/home/userlist');
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
			res.redirect('/home/userlist');
		}else{
			res.redirect('/home/edit:'+req.params.id);
		}
	});
});

router.get('/booklist', function(req, res){

	Model.getAll(function(results){
	
		var data = {
			title: req.session.un,
			uLst: results
		};
		res.render('home/booklist', data);
	});
});

router.get('/editbook/:id', function(req, res){

	Model.get(req.params.id, function(result){

		if(result != ""){
			res.render('home/editbook', result);
		}else{
			res.redirect('/home/booklist');
		}
	});
});

router.post("/editbook/:id", function(req, res){

	var user = {
		id: req.params.id,
		utitle: req.body.utitle,
		author: req.body.author,
		price: req.body.price
	};

	Model.update(user, function(status){

		if(status){
			res.redirect('/home/booklist');
		}else{
			res.redirect('/home/editbook:'+req.params.id);
		}
	});
});
router.get('/delete/:id', function(req, res){

	userModel1.get(req.params.id, function(result){

		if(result != ""){
			res.render('home/delete', result);
		}else{
			res.redirect('/home/userlist');
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
			res.redirect('/home/userlist');
		}else{
			res.redirect('/home/delete:'+req.params.id);
		}
	});
});
router.get('/deletebook/:id', function(req, res){

	Model.get(req.params.id, function(result){

		if(result != ""){
			res.render('home/deletebook', result);
		}else{
			res.redirect('/home/booklist');
		}
	});
});
router.post("/deletebook/:id", function(req, res){

	var user = {
		id: req.params.id,
		utitle: req.body.utitle,
		author: req.body.author,
		price: req.body.price
	};

	Model.delete(user, function(status){

		if(status){
			res.redirect('/home/booklist');
		}else{
			res.redirect('/home/deletebook:'+req.params.id);
		}
	});
});

module.exports = router;






