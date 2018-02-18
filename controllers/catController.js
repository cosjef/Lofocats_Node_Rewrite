// Controllers provides the logic used in routes

var express = require('express');
// Bootstrap express
// create express app
var app = express();
var app = express();

// get an instance of the express Router
var router = express.Router();

var bodyParser = require('body-parser');
// Express v4 removed all middleware to be minimalistic, so Express can’t process URL encoded forms
// this lets us get data from a POST
router.use(bodyParser.json());
//support parsing of content-type application/x-www-form-urlencoded
router.use(bodyParser.urlencoded({ extended: true }));

// Controller needs to interact with the data model
var Cat = require('../models/catModel.js');


// Add a GET test route by calling app.METHOD
// app.get(path, callback)
// callback function takes two arguments: request and response object
// get something when calling the root url
router.get('/', function (req, res) {
    //res.send("This is the default / route");
    res.json({ message: "Welcome to the cats API" });
});



router.use((req, res, next) => {
    res.status(200).json({
        message: 'It works!'
    });
});











/*

exports.findById = function(req, res){
var id = req.params.id;
Cat.findOne({'_id':id},function(err, result) {
    return res.send(result);
});
};

exports.add = function(req, res) {
Cat.create(req.body, function (err, cat) {
    if (err) return console.log(err);
    return res.send(cat);
});
};

exports.update = function(req, res) {
var id = req.params.id;
var updates = req.body;

Cat.update({"_id":id}, req.body,
    function (err, numberAffected) {
        if (err) return console.log(err);
        console.log('Updated %d cats', numberAffected);
        return res.send(202);
    });
};

exports.delete = function(req, res){
var id = req.params.id;
Cat.remove({'_id':id},function(result) {
    return res.send(result);
});
};


exports.import = function(req, res){
Cat.create(
    { "breed": "persian", "color": "white", "declawed": "yes", "city": "Boston", "state": "MA","photo_url": "https://vetstreet.brightspotcdn.com/dims4/default/8ab3754/2147483647/thumbnail/645x380/quality/90/?url=https%3A%2F%2Fvetstreet-brightspot.s3.amazonaws.com%2Ff7%2F3b%2Fa9263b9846c7a943e56b9c10f099%2FPersian-AP-0IUWP7-645sm3614.jpg" },
    { "breed": "Maine Coon.","color": "calico", "declawed": "yes","city": "San Francisco","state": "GA","photo_url": "http://cdn1-www.cattime.com/assets/uploads/gallery/maine-coon-cats-and-kittens/maine-coon-cats-and-kittens-1.jpg" },
    { "breed": "Russian Blue", "color": "grey", "declawed": "yes","cit": "Detroit","state": "MI","photo_url": "https://metrouk2.files.wordpress.com/2017/06/57148496.jpg?w=748&h=497&crop=1" },
    { "breed": "Bengal", "color": "black", "declawed": "no","city": "Buffao","state": "NY","photo_url": "https://vetstreet.brightspotcdn.com/dims4/default/4f4dea1/2147483647/crop/0x0%2B0%2B0/resize/645x380/quality/90/?url=https%3A%2F%2Fvetstreet-brightspot.s3.amazonaws.com%2F31%2F1ba400a28511e087a80050568d634f%2Ffile%2FBengal-3-645mk062211.jpg" }
    , function (err) {
        if (err) return console.log(err);
        return res.send(202);
    });
};router.get('/import', Cat.import);
*/

module.exports = router;