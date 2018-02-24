// Controllers provide the logic used in routes

// Get Mongoose ready
const mongoose = require("mongoose");

// bring in the Cat model
// the controller needs to access the model
const Cat = require('../models/catModel');


// router.get(path, callback)
// Add a route by calling router.METHOD
// callback function takes two arguments: request and response object

// export, then give it a name, then start the route
// exports.name_you_create = (req, res, next) => 
exports.cat_create_cat = (req, res, next) => {
    // store the data in the database
    // create a new instance of the cat model    
    const cat = new Cat({
        breed: req.body.breed,
        color: req.body.color,
        declawed: req.body.declawed,
        city: req.body.city,
        state: req.body.state,
        photo_url: req.body.photo_url
    });
    // console.log(cat);
    // save method stores the POST data in the database
    cat.save(function (err) {
        if (err) {
            res.send('There was a problem adding the cat to the database');
        }
    });
    res.status(200).json({
        message: "Cat created successfully!"
        //createdCat: cat
    });
};

// GET a single cat
exports.get_one_cat = (req, res) => {
    var cat = new Cat();
    // console.log(cat);
    // console.log(req.params.id);
    if (req.params.id) {
        // findById is a convenience method on the model that's provided by Mongoose to find a document by its _id
        Cat.findById({ _id: req.params.id }, function (err, cat) {
            if (err) {
                res.status(500).send(err)
            }
            if (cat) {
                res.status(200).send(cat)
            } else {
                res.status(404).send("No cat found with that ID")
            }

        });
    }
};

// Update a single cat
exports.update_a_cat = function (req, res) {
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
};

// get all cats in database
// get something when calling the root url for cat endpoint
// if you put /cat as the root here by accident instead of /, the resulting request would look like /cat/cat
exports.get_all_cats = function (req, res) {
    Cat.find(function (err, cats) {
        if (err) {
            res.send(err);
        }
        res.json(cats);

    });
};

// Delete a cat
exports.delete_a_cat = function (req, res, next) {
        const id = req.params.id;
        Cat.findByIdAndRemove({ _id: req.params.id }, function (err, response) {

            if (err) {
                res.status(500).send(err)
                //console.log(err);
            }
            if (response) {
                // res.status(200).json(response);
                res.json({ message: "Cat with ID " + req.params.id + " deleted." });
            } else {
                res.status(404).send("Could not find cat to delete")
            }
        })
    };

// Import a set of cats into the database
exports.import_cats = function (req, res) {
    Cat.create(
        { "breed": "persian", "color": "white", "declawed": "yes", "city": "Boston", "state": "MA", "photo_url": "https://vetstreet.brightspotcdn.com/dims4/default/8ab3754/2147483647/thumbnail/645x380/quality/90/?url=https%3A%2F%2Fvetstreet-brightspot.s3.amazonaws.com%2Ff7%2F3b%2Fa9263b9846c7a943e56b9c10f099%2FPersian-AP-0IUWP7-645sm3614.jpg" },
        { "breed": "Maine Coon.", "color": "calico", "declawed": "yes", "city": "San Francisco", "state": "GA", "photo_url": "http://cdn1-www.cattime.com/assets/uploads/gallery/maine-coon-cats-and-kittens/maine-coon-cats-and-kittens-1.jpg" },
        { "breed": "Russian Blue", "color": "grey", "declawed": "yes", "cit": "Detroit", "state": "MI", "photo_url": "https://metrouk2.files.wordpress.com/2017/06/57148496.jpg?w=748&h=497&crop=1" },
        { "breed": "Bengal", "color": "black", "declawed": "no", "city": "Buffao", "state": "NY", "photo_url": "https://vetstreet.brightspotcdn.com/dims4/default/4f4dea1/2147483647/crop/0x0%2B0%2B0/resize/645x380/quality/90/?url=https%3A%2F%2Fvetstreet-brightspot.s3.amazonaws.com%2F31%2F1ba400a28511e087a80050568d634f%2Ffile%2FBengal-3-645mk062211.jpg" }
        , function (err) {
            if (err) return console.log(err);
            res.status(202).send("Cats added to database");
        });
}; 
