var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var morgan = require('morgan');
//var Cat = require('./models/cat.js');


// get an instance of the express Router
//router = express.Router();



/*test the connection and ability to retrieve the collection
var connection = mongoose.connection;
connection.on('error', console.error.bind(console, 'connection error:'));
connection.once('open', function () {

    connection.db.collection("Cats", function(err, collection){
        collection.find({}).toArray(function(err, data){
            console.log(data); // it will print your collection data
        })
    });

});
*/

/* check that the connection is open
mongoose.connection.on("open", function(){
  console.log("mongodb is connected!!");
});
*/

// connect to Mongo when the app initializes
//  mongo -u testuser -p testpass ds111748.mlab.com:11748/lofocats
mongoose.connect('mongodb://testuser:testpass@ds111748.mlab.com:11748/lofocats');

var Schema = mongoose.Schema;
var catSchema = new Schema({
	// ObjectId is the unique ID of this stored object in Mongo
	// defines the fields that are required for a particular user
    
    //id: ObjectId,
    breed: String,
    color: String,
    longitude: Number,
	latitude: Number,
    contact_phone: String,
	contact_email: String,
	event_date: String,
	entry_type: String,
	photo_url: String
});


var Cat = mongoose.model('Cats', catSchema);


// Bootstrap express
var app = express();

// use morgan to log requests to the console
app.use(morgan('combined'));


// all routes will be prefixed with /api
// app.use('/api', router);


/*
// Add a GET test route by calling app.METHOD
// Second parameter to a route is a callback to the code that runs when the URL is retrieved
app.get('/', function(req, res) {
	res.json({message: 'Welcome to the API'})
});
*/

		
// app.get(path, callback)
// callback function takes two arguments: request and response object
app.get('/', function (req, res) {
	Cat.find({}, function (err, cats) {	

		if (err)
			res.send(err);
		
	
		res.send(cats);
	});
});
		


/*
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
*/


// SET our PORT
var port = process.env.PORT || 8080;

app.listen(port);
console.log('Node server running on ' + port);