/**
 * New node file
 */

var mysql = require('mysql');
var poolModule = require('generic-pool');

var poolModule = require('generic-pool');
var pool = poolModule.Pool({
    name     : 'mysql',
    create   : function(callback){
    	
	var connection = mysql.createConnection({
		host : 'localhost',
		user : 'root',
		password : '12345678',
		port : '3306',
		database : 'test'
	});
		connection.connect();
		callback(null, connection);
    },
    
//    create   : function(callback) {
//        var Client = require('mysql').Client;
//        var c = new Client();
//        c.user     = 'root';
//        c.password = '12345678';
//        c.database = 'test';
//        c.connect();
//
//        // parameter order: err, 	
//        // new in 1.0.6
//        callback(null, c);
//    },
    destroy  : function(client) { client.end(); },
    max      : 10,
    // optional. if you set this, make sure to drain() (see step 3)
    min      : 10,
    // specifies how long a resource can stay idle in pool before being removed
    idleTimeoutMillis : 30000,
     // if true, logs via console.log - can also be a function
    log : true
});
function fetchData_gcp(sqlQuery, callback){
	
	pool.acquire(function(err, client) {
		if (err) {
			// handle error - this is generally the err from your
			// factory.create function  
		}
		else {
			client.query(sqlQuery, function(err, rows, fields) {
				// return object back to pool
				callback(err, rows);
				pool.release(client);
			});
		}
	});
}

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

function fetchData_ncp(sqlQuery, callback){
	
	console.log("\nSQL Query::"+sqlQuery);
	
	var con = mysql.createConnection({
		host : 'localhost',
		user : 'root',
		password : '12345678',
		port : '3306',
		database : 'test'
		});
	
	con.query(sqlQuery, function(err, rows, fields) {
		if(err){
			console.log("ERROR: " + err.message);
		}
		else
		{
			callback(err, rows);
		}
		con.end();
	});
	
}

function insert(qS){
	
	var conn = getCon();
	
	var i = conn[1];
	
	console.log("\nSQL Query::" + qS);
	conn[0].query(qS);
	returnCon(i);
}


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
exports.fetchData_ncp = fetchData_ncp;
exports.fetchData_gcp = fetchData_gcp;
exports.insert = insert;
exports.getCon = getCon;
exports.returnCon = returnCon;