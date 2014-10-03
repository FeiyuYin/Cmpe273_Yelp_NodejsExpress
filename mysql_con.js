/**
 * New node file
 */

var mysql = require('mysql');
var connection = mysql.createConnection({
	host : 'localhost',
	user : 'root',
	password : '12345678',
	port : '3306',
	database : 'test'
	});

//connection.query('USE test', function (err) {
//	if (err) throw err;
//	connection.query('CREATE TABLE IF NOT EXISTS customer('
//	+ 'id INT NOT NULL AUTO_INCREMENT,'
//	+ 'PRIMARY KEY(id),'
//	+ 'name VARCHAR(30)'
//	+ ')', function (err) {
//	if (err) throw err;
//	});
//	console.log("I am here");
//	});
// 

function fetchData(sqlQuery, callback){
	
	console.log("\nSQL Query::"+sqlQuery);
	
//	var connection=getConnection();
	
	connection.query(sqlQuery, function(err, rows, fields) {
		if(err){
			console.log("ERROR: " + err.message);
		}
		else
		{	
			callback(err, rows);
		}
	});
	console.log("\nConnection closed..");
//	connection.end();
}

function insert(qS){
	
	console.log("\nSQL Query::" + qS);
	connection.query(qS);
}

function query(queryS, con){

	con.query(queryS, function (err, rows, fields) {
		if (err) throw err;
		if(rows.length !== 0){
			
			console.log("DATA: " + rows[0].password);
//			return rows;
		}
		else{console.log("Empty data");}
	});
}

//function insertAndQuery(){
//var mysql      = require('mysql');
//
//var connection = mysql.createConnection({
//	host     : 'localhost',
//	user     : '',
//	password : '',
//	port: '3306',
//	database: 'test'
//});
//	 
//	connection.connect();
//	var sql = 'INSERT INTO MAN VALUES(1,"PRADYUMNA")';
//	connection.query(sql, function(err, results) {
//		if (err) {
//            console.log("ERROR: " + err.message);
//        }
//		console.log(results);
//		sql = 'SELECT * FROM USER';
//		connection.query(sql, function(err, rows, fields){
//				if(rows.length!==0){
//					console.log("DATA: " + rows[0].data.toString());
//				}
//		});
//		 
//	});
//}
//module.exports = query;
//exports.connection = connection;
exports.query = query;
exports.connection = connection;
exports.fetchData = fetchData;
exports.insert = insert;