var sql_con = require('../mysql_con');
var url = require("url");
var querystring = require("querystring");

function getCat(req, res){
	
	console.log("/resta/:restaname is requested");
	var catName = req.params.catname;
//	var restaName = querystring.parse(url.parse(req.url).query)["restaname"];
	console.log("Requested resta is " + catName);
	var qS = "SELECT * FROM test.elements where cat = '" + catName + "';";
	sql_con.fetchData(qS, function(error, rows){
		
		if(error){
			
			console.log("ERROR: " + error.message);
			res.send(error);
		}
		res.json(rows);
	});
}

function createCat(req, res){
	
	var catName = req.body.catname;
	
	var qS = "INSERT INTO `test`.`cats` (`name`) VALUES ('" + catName + "');";
	
	sql_con.insert(qS);
	
	res.redirect('/');
	
}

function deleteCat(req, res){
	
	var deleteName = req.body.deletename;
	
	var qS = "DELETE FROM `test`.`cats` WHERE `name`='"+ deleteName + "';";
	sql_con.fetchData(qS, function(error, rows){
		
		if(error){
			
			console.log("ERROR: " + error.message);
			res.send(error);
		}
		
		res.redirect('/');
	});
}

exports.getCat = getCat;
exports.createCat = createCat;
exports.deleteCat = deleteCat;