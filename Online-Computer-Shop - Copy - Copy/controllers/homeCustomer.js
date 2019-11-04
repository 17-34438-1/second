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

router.get('/', function(req, res){
	        productModel.getAllP(function(results){
			res.render('homeCustomer/index', {product: results});
		});
	//res.render('homeCustomer/index');
});

module.exports = router;