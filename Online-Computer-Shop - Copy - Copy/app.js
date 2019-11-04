//DECLARATION
var express  	= require('express');
var ejs  		= require('ejs');
var bodyParse  	= require('body-parser');
var exSession  	= require('express-session');
var cookieParser= require('cookie-parser');
 var homeAdmin  = require('./controllers/homeAdmin');
 var homeCustomer  = require('./controllers/homeCustomer');
  var home  = require('./controllers/home');
    var home1  = require('./controllers/home1');
 var homeSeller  = require('./controllers/homeSeller');
 
 
 var user  		= require('./controllers/user');
 var login  	= require('./controllers/login');
 var logout  	= require('./controllers/logout');
 var registration  	= require('./controllers/registration');
 var product = require('./controllers/product');
var app 		= express();

//CONGIFURATION
app.set('view engine', 'ejs');

//MIDDLEWARE
app.use(bodyParse.urlencoded({extended:false}));
app.use(exSession({secret:"my top secret value", saveUninitialized:true, resave:false}));
app.use(cookieParser());
app.use('/homeAdmin', homeAdmin);
app.use('/homeCustomer', homeCustomer);
app.use('/home', home);
app.use('/home1', home1);
app.use('/homeSeller', homeSeller);
app.use('/registration', registration);
app.use('/product', product);
app.use('/user', user);
app.use('/login', login);
app.use('/logout', logout);
app.use('/assets', express.static('ext'))
//ROUTING
app.get('/', function(req, res){
	res.redirect('/login');
});


//SERVER STARTUP
app.listen(3000, function(){
	console.log('server started at 3000...');
});
