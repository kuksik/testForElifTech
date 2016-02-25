var express = require('express'),
	emitter = require('events').EventEmitter;

var router =  require('./router');

var app = express();


app.set('view engine', 'jade');
app.set('views', './views');

app.use(express.static('./public')); 


module.exports =  function() {
    router(app);      
    var server = app.listen(9999);
    console.log('server started')
};