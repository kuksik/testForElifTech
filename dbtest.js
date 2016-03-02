var mysql = require('mysql');
var emitter = require('events').EventEmitter;

var dbConfig = require('./dbConfig');

var dbConnect = mysql.createConnection(dbConfig);



function reqursion(parent_id) {


	dbConnect.query('CALL pro'
		, function(err, res) {
		if (err) {
			console.log(err)
			return
		}
		if (res) {
			console.log(res)
		}
	});
};

reqursion()