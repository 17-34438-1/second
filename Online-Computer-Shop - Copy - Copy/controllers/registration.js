var express = require('express');
var userModel = require('./../models/user-model');

var router = express.Router();

router.get('/', function(req, res){
	res.render('registration/index');
});

router.post('/', function(req, res){

	var user = {
		name: req.body.name,
		username: req.body.username,
		password: req.body.password,
		email: req.body.email,
		utype: req.body.utype
	};

	userModel.insert(user, function(status){
		if(status){
			res.redirect('/login');
		}else
		{
			document.alert("registration failed");
		}
	});
});



router.get('/registrationAdmin', function(req, res){
	res.render('registration/registrationAdmin');
});

router.get('/registrationCustomer', function(req, res){
	res.render('registration/registrationCustomer');
});
router.get('/registrationSeller', function(req, res){
	res.render('registration/registrationSeller');
});
module.exports = router;