var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var morgan = require('morgan');
var Cat = require('./models/cat.js');


// get an instance of the express Router
router = express.Router();

// Bootstrap express
var app = express();


// use morgan to log requests to the console
app.use(morgan('combined'));


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



// check that the connection is open
mongoose.Promise = global.Promise;
mongoose.connection.on("open", function(){
  console.log("Mongodb is connected!!");
});

// connect to Mongo when the app initializes
//  mongo -u testuser -p testpass ds111748.mlab.com:11748/lofocats
mongoose.connect('mongodb://testuser:testpass@ds111748.mlab.com:11748/lofocats');


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
// GET all cats
app.get("/cat_entries", function (req, res) {
	// find all cats
	Cat.find(function(err, cats) {	

		if (err)
			res.send(err);
		
	
		res.json(cats);
	});
});
		

// GET a single cat
app.get('/cat_entries/:id', function (req, res) {
	if (req.params.id) {
		Cat.findOne({ _id: req.params.id }, function (err, cats) {
	res.json(cats);
})
	}
});


// register JSON body parser for POST, UPDATE, DELETES
// support JSON-encoded bodies
app.use(bodyParser.json());
// support encoded bodies
app.use(bodyParser.urlencoded({ extended: true}));

// POST endpoint
app.post('/cat_entries/:id', function (req, res) {
	var Cats = new Cat 

	// set the properties of the cat object to what we get from the inbound request
	// req.body is an array of objects
	Cats.breed = req.body.breed;
    Cats.color = req.body.color;
  	Cats.longitude = req.body.longitude;
  	Cats.latitude = req.body.latitude;
  	Cats.contact_phone = req.body.contact_phone;
  	Cats.contact_email = req.body.contact_email;
  	Cats.event_date = req.body.event_date;
 	Cats.entry_type = req.body_entry_type;
  	Cats.photo_url = req.body.photo_url;

  	console.log('POST body variables: ' + Cats.breed + ' ' + Cats.photo_url);

  	// save the cat and check for errors
  	Cats.save(function(err,Cats) {
  		if (err) {
  			res.send(err);

  		//res.send({ message: 'Cat created!'});
  		res.json(201, Cats)
  		}
  	});
});
	

/* delete a cat 
app.delete('/cat_entries/:id', function(req, res) {
	// check the length of the quote 
	// ensure we don't delete something that is not there
	if(quotes.length <= req.params.id) {
		res.statusCode = 404;
		return res.send('Error 404: No quote found');
	}
	// if quote is new, splice the array to remove the quote, and return true to the client
	// splice method adds/removes items to/from an array
	quotes.splice(req.params.id, 1);
	res.json(true);
});
*/


// set our PORT
var port = process.env.PORT || 8080;

app.listen(port);
console.log('Node server running on ' + port);