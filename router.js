var url = require('url');

var dbRequest = require('./dbRequest');

module.exports = function(app) {

	app.get('/', function (req, res) {

		var e = dbRequest.showChildren({parentId: 0});
		
		e.on('response', function(data) {
			res.render('template', {list: data} );
		});
	});

	app.get('/showChildren', function (req, res) {
		
		var query = JSON.parse( (url.parse(req.url, true)).query.query );
		
		var e = dbRequest.showChildren(query);

		e.on('response', function(data) {
			
			res.render('list', {
				oneRow: false,
				list: data,
				parentIdOfList: query.parentId		 
			});

		});
	});

	app.get('/addNewCompany', function (req, res) {
		
		var query = JSON.parse( (url.parse(req.url, true)).query.query );

		var e = dbRequest.addNewCompany(query);

		e.on('response', function (data) {
			
			query.company_id = data.insertId;

			res.status(201);
			res.render('list', {
				oneRow: true,
				list: query
			});
		});
	});

	app.get('/editCompany', function(req, res) {

		var query = JSON.parse( (url.parse(req.url, true)).query.query );

		var e = dbRequest.editCompany(query);

		e.on('response', function (data) {
			res.status(201);
			res.render('list', {
				oneRow: true,
				list: query
			});
		});
		// res.status(200);
		// res.end('ok');

	});

	app.get('/deleteCompany', function (req, res) {
			
			var query = JSON.parse( (url.parse(req.url, true)).query.query );

			var e = dbRequest.deleteCompany(query);

			res.status(200);
			res.end();

	});
};
