var mysql = require('mysql'),
	mysqlUtilities = require('mysql-utilities'),
	emitter = require('events').EventEmitter;

var dbConfig = require('./dbConfig');

var dbConnect = mysql.createConnection(dbConfig);

mysqlUtilities.upgrade(dbConnect); 
mysqlUtilities.introspection(dbConnect);


function select(layerNum, parentId) {
	
	var e = new emitter();

	dbConnect.select('layer' + layerNum, '*', {parent_id: parentId},
		function(err, results) {
			if(err) {
				console.log(err);
				e.emit('warning');
				return
			};

			console.log('selected data from layer' + layerNum + ' where parentId = ' +
													parentId);
			e.emit('render', results);
		});
	return e;
};


exports.select = select;


// function insert() {

// 	dbConnect.select(, 'name',
// 		function(err, results) {
// 			if(err) {
// 				console.log(err)
// 			}
// 			else {
// 				console('yes')
// 				console.log(results)
// 			}
// 		});
// 	return 
// };
