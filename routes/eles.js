var sql_con = require('../mysql_con');
var url = require("url");
var querystring = require("querystring");

function getEle(req, res){
	
	if(!req.isAuthenticated()){res.redirect('/login');}
	
	console.log("/elemets/:elename is requested");
	
	var eleName = req.params.elename;
	
	var qS = "SELECT * FROM test.elements where name = '" + eleName + "';";
	
	sql_con.fetchData(qS, function(error, rows){
		
		var qS2 = "select * from test.review where element = '" + eleName + "'";
		
		sql_con.fetchData(qS2, function(error, reviewRows){
			
			res.render('yelp_elementpage', {isAuthenticated: req.isAuthenticated(), user: req.user, element: rows[0], reviewrows: reviewRows});
		});
		
		
	});
	
	
}

function createEle(req, res){}

function deleteEle(req, res){}

exports.getEle = getEle;
exports.createEle = createEle;
exports.deleteEle = deleteEle;