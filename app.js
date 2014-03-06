
/**
 * Module dependencies.
 */
 
require( './models/offer'); //for mongoose. Require this first!!!

var express = require('express')
  , routes = require('./routes')
  , http = require('http')
  , path = require('path')
  , mongoose = require('mongoose');

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3333); // Sets the port number
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(require('stylus').middleware(__dirname + '/public'));
  app.use(express.static(path.join(__dirname, 'public')));
});

//connect to mongoose db
mongoose.connect( 'mongodb://localhost/dinex_db' );

app.configure('development', function(){
  app.use(express.errorHandler());
});

// Specifies Routes
app.get('/', routes.splash);
app.post( '/create', routes.create );

// Specifies address on localhost
http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
