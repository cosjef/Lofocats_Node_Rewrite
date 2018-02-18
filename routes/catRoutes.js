// Routes are the predefined URL paths your API responds to.
// Routing refers to determining how an application responds to a client request for a specific endpoint
// Controllers contain handler functions that are executed when the route is matched.
// Routes need to be connected or linked to a controller

//var cat = require('../controllers/catController.js');
var express = require('express');

// get an instance of the express Router
var router = express.Router();

var bodyParser = require('body-parser');
// Express v4 removed all middleware to be minimalistic, so Express can’t process URL encoded forms
// this lets us get data from a POST
router.use(bodyParser.json());
//support parsing of content-type application/x-www-form-urlencoded
router.use(bodyParser.urlencoded({ extended: true }));


// Add a GET test route by calling router.METHOD
// router.get(path, callback)
// callback function takes two arguments: request and response object
// get something when calling the root url for cat endpoint
// if you put /cat here by accident, the request would look like /cat/cat
router.get('/', (req, res,next) => {
    res.status(200).json({
        message: "Handling GET requests to /products"
    });
});


router.post('/', (req, res, next) => {
    res.status(200).json({
        message: "Handling POST requests to /products"
    });
});


router.get('/:catID', (req, res, next) => {
    const id = req.params.catID;
    if (id === 'special') {
        res.status(200).json({
            message:'You discovered the special ID',
            id: id
        });
      } else {
          res.status(200).json({
              message: 'You passed an ID'
          });
      }
});

router.patch('/:catID', (req, res, next) => {
    res.status(200).json({
        message: 'Updated cat!'
    });
});


router.delete('/:catID', (req, res, next) => {
    res.status(200).json({
        message: 'Deleted cat!'
    });
});


// export this router to be used in other files in the application
module.exports = router;