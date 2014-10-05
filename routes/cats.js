var sql_con = require('../mysql_con');
var url = require("url");
var querystring = require("querystring");

function getCat(req, res){
	
	if(!req.isAuthenticated()){res.redirect('/login');}
	console.log("/cat/:catname is requested");
	var catName = req.params.catname;
	
	var catList = ['restaurants', 'shopping', 'nightlife', 'coffee', 'food', 'auto', 'homeservices', 'health', 'localservice', 'arts', 'pets'];
	
	var qS = "SELECT * FROM test.cats;";
	
	sql_con.fetchData(qS, function(error, rows){

		console.log("In get cats");
		for(var i = 0; i < rows.length; i ++){
			
			if(catList.indexOf(rows[i].name) >= 0){
				
				catList.splice(catList.indexOf(rows[i].name), 1);
			}
		}
		
			var qS2 = "SELECT * FROM test.elements where cat = '" + catName + "';";
			
			sql_con.fetchData(qS2, function(error, eleRows){

//			console.log(rows[0].name);
				console.log("In get cats");
				
				res.render('yelp_homepage',{
				isAuthenticated : req.isAuthenticated(),
				user: req.user,
				rows: rows,
				catList: catList,
				elerows: eleRows
			});
			});
	

		});
}

function createCat(req, res){
	
	if(!req.isAuthenticated()){res.redirect('/login');}
	var catName = req.body.catname;
	
	var qS = "INSERT INTO `test`.`cats` (`name`) VALUES ('" + catName + "');";
	
	sql_con.insert(qS);
	
	res.redirect('/');
	
}

function deleteCat(req, res){
	
	if(!req.isAuthenticated()){res.redirect('/login');}
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