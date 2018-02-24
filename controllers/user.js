// Controllers provide the logic used in routes

// bring in some helpers
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

// Get Mongoose ready
const mongoose = require("mongoose");

// bring in the Cat model
// the controller needs to access the model
const Cat = require('../models/user');

// import user model
const User = require("../models/user");

exports.create_user = (req, res, next) => {
    // see if we have a user
    // find gives us an array
    User.find({ email: req.body.email })
        .exec()
        // then block is where we find our user
        .then(user => {
            // we have no user because length is less than one
            if (user.length < 1) {
                // return a 401 Unauthorized
                return res.status(401).json({
                    message: "Auth failed"
                });
            }
            // reverse the bcrypt hash
            bcrypt.compare(req.body.password, user[0].password, (err, result) => {
                if (err) {
                    return res.status(401).json({
                        message: "Auth failed"
                    });
                }
                // if true and the password is the correct one
                if (result) {
                    //// sign with RSA SHA256
                    // var cert = fs.readFileSync('private.key');  // get private key
                    // var token = jwt.sign({ foo: 'bar' }, cert, { algorithm: 'RS256' });
                    //
                    // call JWT and use the sign method
                    const token = jwt.sign({
                        email: user[0].email,
                        userId: user[0]._id
                    }, process.env.JWT_KEY,
                        {
                            expiresIn: "1h"
                        }
                    );
                    return res.status(200).json({
                        message: 'Auth successful',
                        token: token
                    });
                }
                res.status(401).json({
                    message: 'Auth failed'
                });
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });

};

// Sign up a new user
exports.signup_user = function (req, res) {
    var user = new User();
    User.findOne({ email: req.body.email }, function (err, user) {
        if (user) {
            console.log("user exists")
            res.status(409).json({
                message: "User email already exists in database"
            });
        } else {
            console.log("user doesn't exist")
            // hash the password for 10 rounds
            bcrypt.hash(req.body.password, 10, (err, hash) => {
                // create a user with a salted and hashed password
                const user = new User({
                    email: req.body.email,
                    password: hash
                });
                // save method to store POST data in the database
                user.save(function (err) {
                    if (err) {
                        res.send('There was a problem adding the user to the database');
                    }
                });
                res.status(200).json({
                    message: "User created successfully!"
                });

            });
        }
    });

};

// Delete a user
exports.delete_user = (req, res, next) => {
    const id = req.params.id;
    User.findByIdAndRemove({ _id: req.params.id }, function (err, response) {

        if (err) {
            res.status(500).send(err)
            //console.log(err);
        }
        if (response) {
            // res.status(200).json(response);
            res.json({ message: "User with ID " + req.params.id + " deleted." });
        } else {
            res.status(404).send("Could not find user to delete")
        }
    })
};
