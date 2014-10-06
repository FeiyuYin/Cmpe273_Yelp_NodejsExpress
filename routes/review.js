var sql_con = require('../mysql_con');
var url = require("url");
var querystring = require("querystring");


// to be done
function createReview(req, res){
	
	if(!req.isAuthenticated()){res.redirect('/login');}
	
	var eleName = req.params.elename;
	
	res.render('yelp_writereviewpage', {isAuthenticated: req.isAuthenticated(), user: req.user, elename: eleName});
}

function createReviewPost(req, res){
	
	if(!req.isAuthenticated()){res.redirect('/login');}

	var dateObj = new Date();
	var month = dateObj.getUTCMonth() + 1; //months from 1-12
	var day = dateObj.getUTCDate();
	var year = dateObj.getUTCFullYear();
	var date = month + "/" + day + "/" + year;
	
	var elename = req.body.elename;
	var comment = req.body.comment;
	var rating = req.body.rating;
	console.log(comment);
	
	var qS = "INSERT INTO `test`.`review` (`user`, `element`, `rate`, `comment`, `date`) VALUES ('" + req.user.email + "', '" + elename + "', '" + rating + "', '" + comment + "', '" + date + "');";

	sql_con.insert(qS);
	
	var qS2 = "select * from `test`.`elements` where name = '" + elename + "';";
	
	sql_con.fetchData(qS2, function(error, rows){
		
		var aRa = parseInt(rows[0].rate);
		var numRe = parseInt(rows[0].reviews);
		var newARa = (aRa*numRe + parseInt(rating))/(numRe + 1);
		newARa = Math.floor( newARa );
		
		var qS3 = "UPDATE `test`.`elements` SET `rate`='" + newARa.toString() + "', `reviews`='" + (numRe + 1).toString() + "' WHERE `name`='" + elename + "';";
		
		sql_con.fetchData(qS3, function(error, rows){});
	});
	res.redirect('/elements/' + elename);
}

function getReview(req, res){}

function deleteReview(req, res){}

exports.createReview = createReview;
exports.createReviewPost = createReviewPost;
exports.getReview = getReview;
exports.deleteReview = deleteReview;