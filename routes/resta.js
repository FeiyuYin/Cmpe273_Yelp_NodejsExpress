var sql_con = require('../mysql_con');
var url = require("url");
var querystring = require("querystring");

function getResta(req, res){
	
	console.log("/resta/:restaname is requested");
	var restaName = req.params.restaname;
//	var restaName = querystring.parse(url.parse(req.url).query)["restaname"];
	console.log("Requested resta is " + restaName);
	var qS = "SELECT * FROM test.resta where restaname = '" + restaName + "';";
	sql_con.fetchData(qS, function(error, rows){
		
		if(error){
			
			console.log("ERROR: " + error.message);
			res.send(error);
		}
		res.json(rows);
	});
	
}

function getRestas(req, res){
	
	console.log("/resta is requested");
	var qS = "SELECT * FROM test.resta;";
	sql_con.fetchData(qS, function(error, rows){
		
		if(error){
			
			console.log("ERROR: " + error.message);
			res.send(error);
		}
		
		res.json(rows);
	});
}

function deleteResta(req, res){
	
	
}

function createResta(req, res){
	
	
}


exports.getResta = getResta;
exports.getRestas = getRestas;
exports.deleteResta = deleteResta;
exports.createResta = createResta;