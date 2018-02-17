// Routes are the predefined URL paths your API responds to.
var express = require('express');
var bodyParser = require('body-parser');
var Cat = require('../models/catModel.js');

// create variable named app that runs an instance of express
var app = express();

// configure app to use bodyParser
// Express version 4 removed all middleware, so Express can’t process URL encoded forms
// this will let us get the data from a POST
//support parsing of application/json type POST data
app.use(bodyParser.json());
//support parsing of application/x-www-form-urlencoded POST data
app.use(bodyParser.urlencoded({ extended: true }));


// =============================================================================
// The order you place your middleware and routes is very important.
// Everything will happen in the order that they appear.
// Middleware are functions that have access to the request and response objects in our Express application.
// Using next() allows you to get to the second of two functions in a response;passes control to the next handler
// =============================================================================


// Add a GET test route by calling app.METHOD
// app.get(path, callback)
// callback function takes two arguments: request and response object
// get something when calling the root url
app.get('/', function (req, res) {
    //res.send("This is the default / route");
    res.json({message: "Welcome to the cats API"});
});


// POST endpoint
app.post('/cat_entries', function(req, res) {

    // create a new instance our Cat model
    var cat = new Cat(req.body);

    // This prints the JSON document received
    console.log(req.body);

    // req.body is an array of objects from a POST
    // POST parameters are grabbed using req.body.variable_name
    cat.breed = req.body.breed;
    cat.color = req.body.color;
    cat.declawed = req.body.declawed;
    cat.city = req.body.city;
    cat.state = req.body.state;
    cat.photo_url = req.body.photo_url;

    // Mongoose provides a save function that will take a JSON object and store it in the database.
    cat.save(function (err) {
        if (err) {
            res.send("There was a problem adding the cat to the database.");
        }
    });

    res.send({message: 'Cat created!'});

});

// GET all cats
app.get('/cat_entries', function (req, res) {
    // find all cats
    var cat = new Cat(req.body);
    cat.find(function(err, cat) {
        if (err)
            res.send(err);
        res.json(cat);
    });
});



// GET a single cat
app.get('/cat_entries/:id', function (req, res) {
    var cat = new Cat(req.body);
    if (req.params.id) {
        cat.findOne({ _id: req.params.id }, function (err, cats) {
            res.json(cats);
        })
    }
});



/*
// DELETE endpoint to delete a cat
router.delete('/cat_entries/:id', function(req, res) {
    cat.remove({
        _id: req.params.cat_id
    }, function (err, cat) {
        if (err) return res.send(err);
        res.json({ message: 'Cat Succesfully Deleted'});
    });
});
*/


/*
// PUT endpoint to update a cat
// Uses Mongoose to PUT updates for Blog Posts by _id in database
router.put('/cat_entries/:id', function(req, res) {
    cat.findById(req.params.id, function (err, cat) {
        if (err)
            res.send(err);

        cat.contact_email = req.body.contact_email;

         if (req.body.breed) cat.breed = req.body.breed;
         if (req.body.color) cat.color = req.body.color;
         if (req.body.longitude) cat.longitude = req.body.longitude;
         if (req.body.latitude) cat.latitude = req.body.latitude;
         if (req.body.contact_phone) cat.contact_phone = req.body.contact_phone;
         if (req.body.contact_email) cat.contact_email = req.body.contact_email;
         if (req.body.event_date) cat.event_date = req.body.event_date;
         if (req.body.entry_type) cat.entry_type = req.body.entry_type;
         if (req.body.photo_url) cat.photo_url = req.body.photo_url;


        cat.save(function (err) {
            if (err)
                send (err);
            res.json({ message: 'Cat Updated!'});
        });
    });
});
*/



module.exports = app;