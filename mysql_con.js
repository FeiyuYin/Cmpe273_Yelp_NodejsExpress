/**
 * New node file
 */

var mysql = require('mysql');

var av = [true, true, true, true, true, true, true, true, true, true];

var cons = [];

function getCon(){
	
	if(cons.length === 0){
		
		console.log("Init connection pool.");
		for(var j = 0; j < 10; j ++){
			
			cons[j] = mysql.createConnection({
				host : 'localhost',
				user : 'root',
				password : '12345678',
				port : '3306',
				database : 'test'
				});
		}
	}
	
	while(true){
		for(var i = 0; i < 10; i ++){
		
			if(av[i] === true){
			
				av[i] = false;
				console.log(i + "th connection is leased.");
				var result = [cons[i], i];
				return result;
			}
		}
	}
}

function returnCon(i){
	
	console.log(i + "th connection is returned.");
	av[i] = true;
}


var connection = mysql.createConnection({
	host : 'localhost',
	user : 'root',
	password : '12345678',
	port : '3306',
	database : 'test'
	});


function fetchData(sqlQuery, callback){
	
	console.log("\nSQL Query::"+sqlQuery);
	
	var conn = getCon();
	
	var i = conn[1];
	
	conn[0].query(sqlQuery, function(err, rows, fields) {
		if(err){
			console.log("ERROR: " + err.message);
		}
		else
		{
			callback(err, rows);
		}
	});
	
	returnCon(i);
}

//function fetchData(sqlQuery, callback){
//	
//	console.log("\nSQL Query::"+sqlQuery);
//	
//	connection.query(sqlQuery, function(err, rows, fields) {
//		if(err){
//			console.log("ERROR: " + err.message);
//		}
//		else
//		{
//			callback(err, rows);
//		}
//	});
//	console.log("\nConnection closed..");
//}

function insert(qS){
	
	var conn = getCon();
	
	var i = conn[1];
	
	console.log("\nSQL Query::" + qS);
	conn[0].query(qS);
	returnCon(i);
}

//function insert(qS){
//	
//	console.log("\nSQL Query::" + qS);
//	connection.query(qS);
//}

function query(queryS, con){

	con.query(queryS, function (err, rows, fields) {
		if (err) throw err;
		if(rows.length !== 0){
			
			console.log("DATA: " + rows[0].password);
		}
		else{console.log("Empty data");}
	});
}


exports.query = query;
exports.connection = connection;
exports.fetchData = fetchData;
exports.insert = insert;
exports.getCon = getCon;
exports.returnCon = returnCon;