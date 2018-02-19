// Routes are the predefined URL paths your API responds to.
// Routing refers to determining how an application responds to a client request for a specific endpoint
// Controllers contain handler functions that are executed when the route is matched.
// Routes need to be connected or linked to a controller


var express = require('express');

// get an instance of the express Router
var router = express.Router();

// bring in the Cat model
const Cat = require('../models/catModel');

// need mongoose to be able to create new model object
var mongoose = require('mongoose');


var bodyParser = require('body-parser');
// Express v4 removed all middleware to be minimalistic, so Express can’t process URL encoded forms
// this lets us get data from a POST
// enable parsing of content-type application/x-www-form-urlencoded
// "true" allows you to parse extended, rich POST bodies
router.use(bodyParser.urlencoded({ extended: true }));
// extract JSON data from a request
router.use(bodyParser.json());

// =======================================================================================================================
// Routes are listed below
// router.get(path, callback)
// Add a GET test route by calling router.METHOD
// callback function takes two arguments: request and response object
// =======================================================================================================================

// get all cats in database
// get something when calling the root url for cat endpoint
// if you put /cat here by accident instead of /, the request would look like /cat/cat
router.get('/', (req, res,next) => {
    // find without arguments returns everything
    //const cat = new Cat;
    Cat.find()
    .exec()
    .then(Cats => {
        console.log(Cat);
        res.status(200).json(Cats);
})
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });



router.post('/', (req, res, next) => {
    // store the data in the database
    // create a new instance of the cat model    
    const cat = new Cat( {
        breed: req.body.breed,
        color: req.body.color,
        declawed: req.body.declawed,
        city: req.body.city,
        state: req.body.state,
        photo_url: req.body.photo_url
    });
    console.log(cat);
    // save method stores the POST data in the database
    cat.save(function (err) {
        if (err) {
            res.send('There was a problem adding the cat to the database');
        }
    });
     res.status(200).json({
        message: "Handling POST requests to /cat",
        createdCat: cat
    });
});


// GET a single cat
router.get('/:id', function (req, res) {
    var cat = new Cat();
    // console.log(cat);
    // console.log(req.params.id);
    if (req.params.id) {
        // findById is a convenience method on the model that's provided by Mongoose to find a document by its _id
        Cat.findById( {_id: req.params.id}, function (err, cat) {
                if (err) {
                    res.status(500).send(err)
                }
                if (cat) {
                    res.status(200).send(cat)
                } else {
                    res.status(404).send("No cat found with that ID")
                }
            
        })
    }
 });
});



router.put('/:id', function (req, res) {
    Cat.findOne({ _id: req.params.id }, function (err, cat) {
        if (err) {
            return res.send(err);
        }

        for (prop in req.body) {
            cat[prop] = req.body[prop];
        }

        // save the cat
        cat.save(function (err) {
            if (err) {
                return res.send(err);
            }

            // res.json( { message: 'Cat updated!' } );
            res.json({ message: "Cat with ID " + req.params.id + " updated." });

        });
    });
});



// export this router to be used in other files in the application
module.exports = router;