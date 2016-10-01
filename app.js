var express = require('express');
var app = express();
var volleyball = require('volleyball');
var bodyParser = require('body-parser');
var nunjucks = require('nunjucks');
var db = require('./models');
var routes = require('./routes/triproutes');
// logging middleware
app.use(volleyball);
app.use(routes);
// body-parsing middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// nunjucks boilerplate
nunjucks.configure('views', { noCache: true });
app.engine('html', nunjucks.render);
app.set('view engine', 'html');

// statically serve public folder
app.use('/bootstrap', express.static(__dirname + '/node_modules/bootstrap/dist'));
app.use('/jquery', express.static(__dirname + '/node_modules/jquery/dist'));
app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res, next){
	res.render('index');
});

// not found middleware
app.use(function(req, res, next){
	var err = new Error('Not Found');
	err.status = 404;
	console.error(err);
	next(err);
});

// error-handling middleware
app.use(function(err, req, res, next){
	res.status(err.status || 500);
	console.error(err);
	res.render('error', {err: err});
});

db.sync()
.then(function(){
	console.log("synced with db");
	app.listen(3000, function(){
		console.log("app is listening on port 3000...")
	});
})
.catch(console.error);