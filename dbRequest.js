var mysql = require('mysql'),
//	mysqlUtilities = require('mysql-utilities'),
	emitter = require('events').EventEmitter;

var dbConfig = require('./dbConfig');

var dbConnect = mysql.createConnection(dbConfig);

// mysqlUtilities.upgrade(dbConnect); 
// mysqlUtilities.introspection(dbConnect);



function showChildren(query) {
	var e = new emitter();
	
	dbConnect.query('SELECT company_id, name, earnings, company_id IN (' +
					'SELECT DISTINCT parent_id from tb_tree) children ' +
					'from tb_tree where parent_id = ' + query.parentId,
		function (err, result) {
			if (err) {
				console.log(err);
				return
			};

			console.log('selected data with parentId = ' + query.parentId);
			e.emit('response', result);
	});
	return e;
};
					
function addNewCompany(query) {
	var e = new emitter();

	dbConnect.query('INSERT INTO tb_tree (name, earnings, parent_id) VALUES ("' 
					+ query.name + '", ' +  query.earnings + ', ' 
					+ query.parentId + ')', 	
		function (err, result){
			if (err) {
				console.log(err);
				return
			};
			console.log('new company added with id = ' + result.insertId);
			e.emit('response', result)
	});
	return e;
}


function deleteCompany(query) {
	var e = new emitter();

	dbConnect.query('DELETE FROM tb_tree where parent_id = ' + query.companyId +
					' OR company_id = ' + query.companyId, 
		function (err, result) {
			if (err) {
				console.log(err);
				return
			};
			console.log('delete company with id = ' + query.companyId +
													' and all childrean');
			e.emit('response')
	});
	return e;
}


exports.showChildren = showChildren;
exports.addNewCompany = addNewCompany;
exports.deleteCompany = deleteCompany;

