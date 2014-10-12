/**
 * Module dependencies.
 */

var express = require('express');
var passport = require('passport');
//var poolModule = require('generic-pool');
var user = require('./routes/user');
var cats = require('./routes/cats');
var eles = require('./routes/eles');
var review = require('./routes/review');
var con = require('./mysql_con');
var passportlocal = require('passport-local');
var bodyParser= require('body-parser');
var cookieParser =require('cookie-parser');
var expressSession = require('express-session');
var app = express();
app.set('view engine','ejs');
app.use(bodyParser.urlencoded({extended : false}));
app.use(cookieParser());
app.use(expressSession({
	secret: process.env.SESSION_SECRET||'secret',
    resave: false,
    saveUninitialized : false

}));

app.use(passport.initialize());
app.use(passport.session());
 
passport.use(new passportlocal.Strategy(user.passportAauth));

passport.serializeUser(user.serializeUser);

passport.deserializeUser(user.deserializeUser);


app.get('/', user.root);

app.get('/login', user.login);

app.get('/loginfail', user.loginfail);

app.post('/login',passport.authenticate('local', {failureRedirect: '/loginfail'}), user.loginPost);

app.get('/logout', user.logout);

app.get('/signup', user.signup);

app.get('/signupfail', user.signupfail);

app.post('/signup', user.signupPost);


app.get('/profile', user.profile);


app.get('/cats/:catname', cats.getCat);

app.post('/cats', cats.createCat);

app.post('/deletecats', cats.deleteCat);


app.get('/elements/:elename', eles.getEle);

app.post('/elements', eles.createEle);

app.post('/deleteeles', eles.deleteEle);


app.get('/createreview/:elename', review.createReview);

app.post('/createreview', review.createReviewPost);

app.get('/review', review.getReview);

//app.delete('/resta/:reviewid', review.deleteReview);


app.get('/test_cp', user.test_cp);
app.get('/test_ncp', user.test_ncp);
app.get('/test_gcp', user.test_gcp);

 
var port= process.env.PORT||3000;
app.listen(port,function(){
	console.log('http://127.0.0.1:'+port+'/');
  
  });