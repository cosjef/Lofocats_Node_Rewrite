var express = require('express');
var mongoose = require('mongoose');
var morgan = require('morgan');
var jwt = require('jsonwebtoken');
const routes = require('./routes/routes.js');


// get an instance of the express Router
router = express.Router();

// create a mini express app with just the routing stuff
var router = express.Router();

// Bootstrap express
var app = express();

// use morgan to log requests to the console
app.use(morgan('combined'));

// register our routes
//  connect all routes to our application
//  apply the routes to our application
app.use('/', routes);

// prefixed all routes with a version number
// app.use('/1', router);



//   Database stuff
// =============================================================================
// You query JSON with JSON when using Mongo
// Build the mongodb connection string
var dbUri = 'mongodb://localhost:27017/lofocats';

// Create the database connection
mongoose.connect(dbUri, {useMongoClient: true});

// get Mongoose to use the global promise library
mongoose.Promise = global.Promise;

// CONNECTION EVENTS
// When successfully connected
mongoose.connection.on('connected', function () {
	console.log('Mongoose default connection open to ' + dbUri);
});

// If the connection throws an error
mongoose.connection.on('error',function (err) {
	console.log('Mongoose default connection error: ' + err);
});

// When the connection is disconnected
mongoose.connection.on('disconnected', function () {
	console.log('Mongoose default connection disconnected');
});

// If the Node process ends, close the Mongoose connection
process.on('SIGINT', function() {
	mongoose.connection.close(function () {
		console.log('Mongoose default connection disconnected through app termination');
		process.exit(0);
	});
});
// =============================================================================


// set our server PORT
var port = process.env.PORT || 3000;

// start the server
app.listen(port);
console.log('Node server running on ' + port);