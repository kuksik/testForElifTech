	var url = require('url');

var dbRequest = require('./dbRequest');

module.exports = function(app) {

	app.get('/', function(req, res) {
		console.log('request from: "' + (url.parse(req.url, true)).pathname + '"');

		var e = dbRequest.select(0, 0)

		e.on('render', function(data) {
			res.render('template', {list: data, layerNum: 0} );
		})
	});

	app.get('/showNext', function(req, res) {
		
		layerNum = (url.parse(req.url, true)).query.layer ;
		parentId = (url.parse(req.url, true)).query.parent;

		console.log('request from: "' + (url.parse(req.url, true)).pathname + '"');
		
		var e = dbRequest.select(layerNum, parentId);

		e.on('render', function(data, warning) {
			res.render('table', {list: data, layerNum: layerNum} );
		})

		e.on('warning', function() {
			res.render('table', {warning: 'this company have not children'} );
		})
	})
}