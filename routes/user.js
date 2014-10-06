var sql_con = require('../mysql_con');

function root(req, res){
	
	if(!req.isAuthenticated()){res.redirect('/login');}
	console.log("/ is requested.");
	res.redirect('/cats/restaurants');
}

function login(req, res){
	
	console.log("/login GET is requsted.");
	res.render('yelp_loginpage');
}

function loginPost(req, res){
	
	console.log("/ligin POST is requested.");
	res.redirect('/');
}

function logout(req, res){
	
	console.log("/logout is requsted.");
	
	var dateObj = new Date();
	var month = dateObj.getUTCMonth() + 1; //months from 1-12
	var day = dateObj.getUTCDate();
	var year = dateObj.getUTCFullYear();
	var date = month + "/" + day + "/" + year;
	
	var qS = "UPDATE `test`.`users` SET `lastlogintime`='" + date + "' WHERE `email`='yinfeiyu43@gmail.com';";
	sql_con.fetchData(qS, function(error, rows){});
	req.logout();
	res.redirect('/');
}

function signup(req, res){
	
	console.log("/signup GET is requsted.");
	res.render('yelp_signuppage');
}

function signupPost(req, res){
	
	console.log("/signup POST is requsted.");
	var email = req.body.email;
	var firstname = req.body.firstname;
	var lastname = req.body.lastname;
	var zipcode = req.body.zipcode;
	var password = req.body.password;
	
	var qS = "INSERT INTO `test`.`users` (`email`, `password`, `firstname`, `lastname`, `zipcode`) VALUES ('" + email + "', '" + password + "', '" + firstname + "', '" + lastname + "', '" + zipcode + "');";
//	console.log(qS);
	sql_con.insert(qS);
	res.redirect('/');
}

function passportAauth(username, password, done){
	
	var qS = "SELECT * FROM test.users where email='" + username + "';";

	sql_con.fetchData(qS, function(error, rows){
		
		if(error){console.log("ERROR: " + error.message);}
//		console.log(rows[0].password);
		if(rows[0].password === password)
		{

//			done(null,{id:username, name: username });
			console.log("In userAuth email is: " + rows[0].email);
			done(null, {email: rows[0].email, firstname: rows[0].firstname, lastname: rows[0].lastname, zipcode: rows[0].zipcode, lastlogintime: rows[0].lastlogintime});
		}
		else
		{

			done(null,null);
		}
	});
}

function serializeUser(user, done){
	
	console.log("In passport.serializeUser: email is " + user.email);
	done(null, user.email);
}

function deserializeUser(email, done){
	
	var qS = "SELECT * FROM test.users where email = '" + email + "';";
	sql_con.fetchData(qS, function(error, rows){

		console.log("In passport.deserializeUser: email is " + rows[0].email);
		done(null, {email: rows[0].email, firstname: rows[0].firstname, lastname: rows[0].lastname, zipcode: rows[0].zipcode, lastlogintime: rows[0].lastlogintime});
	});
}

function profile(req, res){
	
	if(!req.isAuthenticated()){res.redirect('/login');}
	console.log("/profile is requsted.");
	var qS = "select * from `test`.`review` where user = '" + req.user.email + "';";
	
	sql_con.fetchData(qS, function(error, rows){
		
		res.render('yelp_profilepage',{user : req.user, reviewrows: rows});
	});
	
}

module.exports.root = root;
exports.login = login;
exports.loginPost = loginPost;
exports.logout = logout;
exports.signup = signup;
exports.signupPost = signupPost;
exports.passportAauth = passportAauth;
exports.profile = profile;
exports.deserializeUser = deserializeUser;
exports.serializeUser = serializeUser