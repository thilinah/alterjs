var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var rconsole = require('winston');

var config = require('./config');
var routes = require('./routes/index');
var mongodb = require('./routes/mongodb');
var users = require('./routes/users');

var expressHbs = require('express-handlebars');

var app = express();

// view engine setup
app.engine('hbs', expressHbs({extname:'hbs', defaultLayout:'main.hbs'}));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


//Set logging

var log = new (winston.Logger)({
	transports: 
		[
		 	new (winston.transports.Console)(),
		 	new (winston.transports.File)({ filename: config.log })
	    ]
});

log.level = config.logLevel;

app.set('log',log);


app.use(function (req, res, next) {
	var db = req.app.get('db');
	var log = req.app.get('log');
	
	log.log('info',db);
	if(db == null){
		log.log('info',"Not connected to DB, creating a connection now");
		var dbUrl = 'mongodb://@127.0.0.1:27017/test';
		
		var MongoClient = require('mongodb').MongoClient;

		// Connect to the db
		MongoClient.connect(dbUrl, function(err, db) {
			 if(err) {console.log("Error: DB Connection");}
			 req.app.set('db',db);
			 req.db = db;
			 next();
		});
	
		
	}else{
		log.log('info',"Already connceted to DB, reuse");
		req.db = db;
		next();
	}
	
});




app.use('/', routes);
app.use('/simple', routes);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
