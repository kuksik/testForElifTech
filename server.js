var express = require('express'),
	emitter = require('events').EventEmitter,
	url = require('url');


var router =  require('./router');

var app = express();


app.set('view engine', 'jade');
app.set('views', './views');

app.use(express.static('./public')); 

app.use(function (req, res, next) {
	console.log('request from: ' +  (url.parse(req.url, true)).pathname)
	next()
});


module.exports =  function() {
    router(app);      
    var server = app.listen(9999);
    console.log('server started')
};