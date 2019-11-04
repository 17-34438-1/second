var express = require('express');
var userModel = require('./../models/user-model');
var userModel1 = require('./../models/user-model1');
var productModel = require('./../models/product-model');

var Model= require.main.require('./models/book');
var router = express.Router();


//ROUTES

router.get('*', function(req, res, next){

	if(req.cookies['username'] != null){
		next();
	}else{
		res.redirect('/login');
	}
});


router.get('/', function(req, res){
	res.render('home1/indexx');
});

router.get('/', function(req, res){
	
	userModel1.getAll(function(results){
		var data = {
			name: req.session.un,
			uList: results
		};
		res.render('home1/indexx', data);
	});
});

router.get('/profile1', function(req, res){

	userModel.get(req.session.uid, function(result){

		if(result != ""){
			res.render('home1/profile1', result);
		}else{
			res.redirect('/home1');
		}
	});
});
router.get('/profile1', function(req, res){

	userModel.get1(req.session.uid, function(result){

		if(result != ""){
			res.render('home1/profile1', result);
		}else{
			res.redirect('/home1');
		}
	});
});
router.get('/search1', function(req, res){

	Model.search1(req.params.key, function(results){
	
		res.render('home1/search1');
	});
});


router.get('/search1/:key', function(req, res){

	Model.search1(req.params.key, function(results){

		res.send(results);
	});
});
module.exports = router;






