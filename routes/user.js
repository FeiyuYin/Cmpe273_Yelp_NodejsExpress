

var sql_con = require('../mysql_con');

function root(req, res){
	console.log("/ is requested.");
	res.render('yelp_homepage',{
		isAuthenticated : req.isAuthenticated(),
		user: req.user
	});
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
			done(null, {email: rows[0].email, firstname: rows[0].firstname, lastname: rows[0].lastname, zipcode: rows[0].zipcode});
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
		done(null, {email: rows[0].email, firstname: rows[0].firstname, lastname: rows[0].lastname, zipcode: rows[0].zipcode});
	});
}

function profile(req, res){
	
	console.log("/profile is requsted.");
//	var user = req.user;
//	typeof user;
//	console.log(req.user.email);
	res.render('profile',{user : req.user});
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