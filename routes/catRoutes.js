// Routes are the predefined URL paths your API responds to.
// Routing refers to determining how an application responds to a client request for a specific endpoint
// Controllers contain handler functions that are executed when the route is matched.
// Routes need to be connected or linked to a controller

var express = require('express');

// get an instance of the express Router
var router = express.Router();

// bring in the JWT middleware to check JWT authentication
const checkAuth = require('../config/check-auth');

//import the controller for cat in the route file
const catController = require('../controllers/catController');

var bodyParser = require('body-parser');
// Express v4 removed all middleware to be minimalistic, so Express can’t process URL encoded forms
// this lets us get data from a POST
// enable parsing of content-type application/x-www-form-urlencoded
// "true" allows you to parse extended, rich POST bodies
router.use(bodyParser.urlencoded({ extended: true }));
// extract JSON data from a request
router.use(bodyParser.json());

// add caching
const apicache = require('apicache');
const cache = apicache.middleware;

// =======================================================================================================================
// Routes are listed below
// =======================================================================================================================

// Handle incoming POST requests to /cat
router.post('/', catController.cat_create_cat);
router.get('/:id', catController.get_one_cat);
router.put('/:id', catController.update_a_cat);
router.get('/', catController.get_all_cats);
//router.get('/', cache('5 minutes'), catController.get_all_cats);
router.delete('/:id', catController.delete_a_cat);
router.post('/import', catController.import_cats);


// export this router to be used in other files in the application
module.exports = router;