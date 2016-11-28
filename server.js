var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var morgan = require('morgan');
var Cat = require('./models/CatModel');
var app = express();

// use morgan to log requests to the console
app.use(morgan('combined'));

// SET our PORT
var port = process.env.PORT || 8080;

// get an instance of the express Router
var router = express.Router();

// all routes will be prefixed with /api
app.use('/api', router);


// Add a GET test route by calling app.METHOD
// Second parameter to a route is a callback to the code that runs when the URL is retrieved
app.get('/', function(req, res) {
	res.json({message: 'Welcome to the API'})
});


app.get('/cat_entries', function(req, res) {
	res.json({message: 'Welcome to the API'})
});

app.get('/cat_entries/:id', function(req, res) {
	res.json({message: 'Welcome to the API'})
});



// register JSON body parser for POST, UPDATE, DELETES
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));
// USE for POST endpoint


app.listen(port);
console.log('Node server running on ' + port);