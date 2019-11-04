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
	res.render('homeSeller/index');
});

router.get('/', function(req, res){
	
	userModel1.getAll(function(results){
		var data = {
			name: req.session.un,
			uList: results
		};
		res.render('homeSeller/index', data);
	});
});


router.get('/userlist', function(req, res){

	userModel1.getAll(function(results){
	
		var data = {
			name: req.session.un,
			uList: results
		};
		res.render('homeSeller/userlist', data);
	});
});
router.get('/search', function(req, res){

	userModel1.search(req.params.key, function(results){
	
		res.render('homeSeller/search');
	});
});


router.get('/search/:key', function(req, res){

	userModel1.search(req.params.key, function(results){

		res.send(results);
	});
});

router.get('/profile', function(req, res){

	userModel1.get(req.session.uid, function(result){

		if(result != ""){
			res.render('homeSeller/profile', result);
		}else{
			res.redirect('/homeSeller');
		}
	});
});

router.get('/addbook', function(req, res){
	res.render('homeSeller/addbook');
});
router.post("/addbook", function(req, res){

	var user = {
		utitle: req.body.utitle,
		author: req.body.author,
		price: req.body.price
	};

	Model.insert(user, function(status){

		if(status){
			res.redirect('/homeSeller/booklist');
		}else{
			res.redirect('/homeSeller/addbook');
		}
	});
});
router.get('/adduser', function(req, res){
	res.render('homeSeller/adduser');
});
router.post("/adduser", function(req, res){

	var user = {
		uname: req.body.uname,
		password: req.body.password,
		type: req.body.type
	};

	userModel1.insert(user, function(status){

		if(status){
			res.redirect('/homeSeller/userlist');
		}else{
			res.redirect('/homeSeller/adduser');
		}
	});
});

router.get('/edit/:id', function(req, res){

	userModel1.get(req.params.id, function(result){

		if(result != ""){
			res.render('homeSeller/edit', result);
		}else{
			res.redirect('/homeSeller/userlist');
		}
	});
});

router.post("/edit/:id", function(req, res){

	var user = {
		id: req.params.id,
		uname: req.body.uname,
		password: req.body.password,
		type: req.body.type
	};

	userModel1.update(user, function(status){

		if(status){
			res.redirect('/homeSeller/userlist');
		}else{
			res.redirect('/homeSeller/edit:'+req.params.id);
		}
	});
});

router.get('/booklist', function(req, res){

	Model.getAll(function(results){
	
		var data = {
			title: req.session.un,
			uLst: results
		};
		res.render('homeSeller/booklist', data);
	});
});

router.get('/editbook/:id', function(req, res){

	Model.get(req.params.id, function(result){

		if(result != ""){
			res.render('homeSeller/editbook', result);
		}else{
			res.redirect('/homeSeller/booklist');
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
			res.redirect('/homeSeller/booklist');
		}else{
			res.redirect('/homeSeller/editbook:'+req.params.id);
		}
	});
});
router.get('/delete/:id', function(req, res){

	userModel1.get(req.params.id, function(result){

		if(result != ""){
			res.render('homeSeller/delete', result);
		}else{
			res.redirect('/homeSeller/userlist');
		}
	});
});

router.post("/delete/:id", function(req, res){

	var user = {
		id: req.params.id,
		uname: req.body.uname,
		password: req.body.password,
		type: req.body.type
	};

	userModel1.delete(user, function(status){

		if(status){
			res.redirect('/homeSeller/userlist');
		}else{
			res.redirect('/homeSeller/delete:'+req.params.id);
		}
	});
});
router.get('/deletebook/:id', function(req, res){

	Model.get(req.params.id, function(result){

		if(result != ""){
			res.render('homeSeller/deletebook', result);
		}else{
			res.redirect('/homeSeller/booklist');
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
			res.redirect('/homeSeller/booklist');
		}else{
			res.redirect('/homeSeller/deletebook:'+req.params.id);
		}
	});
});
module.exports = router;
