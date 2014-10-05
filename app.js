/**
 * Module dependencies.
 */

var express = require('express');
var passport = require('passport');
var user = require('./routes/user');
var cats = require('./routes/cats');
var resta = require('./routes/resta');
var review = require('./routes/review');
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

app.post('/login',passport.authenticate('local'), user.loginPost);

app.get('/logout', user.logout);

app.get('/signup', user.signup);

app.post('/signup', user.signupPost);


app.get('/profile', user.profile);


app.get('/cats/:catname', cats.getCat);

app.post('/cats', cats.createCat);

app.post('/deletecats', cats.deleteCat);


app.get('/resta/:restaname', resta.getResta);

app.get('/resta', resta.getRestas);

app.delete('/resta/:restaname', resta.deleteResta);

app.get('/createresta', resta.createResta);

app.post('/resta', resta.createRestaPost);


app.get('/createreview', review.createReview);

app.post('/createreview', review.createReviewPost);

app.get('/review', review.getReview);

app.delete('/resta/:reviewid', review.deleteReview);

 
var port= process.env.PORT||3000;
app.listen(port,function(){
	console.log('http://127.0.0.1:'+port+'/');
  
  });