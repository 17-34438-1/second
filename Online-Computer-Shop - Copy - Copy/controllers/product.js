var express = require('express');
var userModel = require('./../models/user-model');
var productModel = require('./../models/product-model');
var router = express.Router();

router.get('*', function(req, res, next){

	if(req.cookies['username'] != null){
		next();
	}else{
		res.redirect('/login');
	}
});

router.get('/productlist', function(req, res){
		productModel.getAllP(function(results){
			res.render('product/index', {product: results});
		});
});


router.get('/add', function(req, res){
	res.render('product/add');
});

router.post('/add', function(req, res){

	var product = {
		authorname: req.body.authorname,
		booktype: req.body.booktype,
	price: req.body.price,
		pages: req.body.pages
	};

	productModel.insert(product, function(status){
		if(status){
			res.redirect('/product/productlist');
		}else{
			res.redirect('/product/add');
		}
	});
});

router.get('/edit/:id', function(req, res){

	productModel.getById(req.params.id, function(results){
		res.render('product/edit', {product: results});		
	});

});

router.post('/edit/:id', function(req, res){

	var product = {
		id: req.params.id,
		authorname: req.body.authorname,
		booktype: req.body.booktype,
		price: req.body.price,
		pages: req.body.pages
	};

	productModel.update(product, function(status){

		if(status){
			res.redirect('/product/productlist');
		}else{
			res.redirect('/product/edit/:req.params.id');
		}
	});
});

router.get('/delete/:id', function(req, res){

	var product ={id: req.params.id}

	productModel.delete(product, function(status){
		res.redirect('/product/productlist');;		
	});

});

// router.get('/details/:id', function(req, res){

// 	userModel.getById(req.params.id, function(result){
// 		console.log(result);
// 		res.render('user/details', {user: result});
// 	});
// });

module.exports = router;
