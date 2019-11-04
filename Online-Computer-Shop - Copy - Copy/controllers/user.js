var express = require('express');
var userModel = require('./../models/user-model');
var router = express.Router();

router.get('*', function(req, res, next){

	if(req.cookies['username'] != null){
		next();
	}else{
		res.redirect('/login');
	}
});

router.get('/userlist', function(req, res){

		userModel.getAll(function(results){
			res.render('user/index', {user: results});
		});
});


// router.get('/addemp', function(req, res){
// 	res.render('user/addemp');
// });

// router.post('/addemp', function(req, res){

// 	var user = {
// 		name: req.body.name,
// 		cname: req.body.cname,
// 		uname: req.body.uname,
// 		password: req.body.password,
// 		contact: req.body.contact,
// 		utype: 1
// 	};

// 	userModel.insert(user, function(status){
// 		if(status){
// 			res.redirect('/user/userlist');
// 		}else{
// 			res.redirect('/user/addemp');
// 		}
// 	});
// });

// router.get('/edit/:id', function(req, res){

// 	userModel.getById(req.params.id, function(results){
// 		res.render('user/edit', {user: results});		
// 	});

// });

// router.post('/edit/:id', function(req, res){

// 	var user = {
// 		id: req.params.id,
// 		name: req.body.name,
// 		cname: req.body.cname,
// 		uname: req.body.uname,
// 		password: req.body.password,
// 		contact: req.body.contact
// 	};

// 	userModel.update(user, function(status){

// 		if(status){
// 			res.redirect('/user/userlist');
// 		}else{
// 			res.redirect('/user/edit/:req.params.id');
// 		}
// 	});
// });

router.get('/delete/:id', function(req, res){

	var user ={id: req.params.id}

	userModel.delete(user, function(status){
		res.redirect('/user/userlist');;		
	});

});

// router.get('/details/:id', function(req, res){

// 	userModel.getById(req.params.id, function(result){
// 		console.log(result);
// 		res.render('user/details', {user: result});
// 	});
// });

module.exports = router;
