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


exports.user_login = (req, res, next) => {
    User.findOne({ email: req.body.email }, function (err, user) {
        if (err) return res.status(500).send('Error on the server.');
        if (!user) return res.status(404).send('No user found.');

        var passwordIsValid = bcrypt.compare(req.body.password, user.password);
        //console.log('Password from request: ' + req.body.password);
        //console.log('Encrypted password:' + user.password);
        if (!passwordIsValid) return res.status(401).send({ auth: false, token: null, message: 'password not matching' });

        // sign JWT with RSA-SHA 256
        // get private key
        var fs = require("fs");
        // call the private key
        // original, working code
        // const cert = fs.readFileSync('jwtRS256.key.private');
        //console.log('JWT environment variable: ' + process.env.JWT_PRIVATE_KEY);
        const cert = fs.readFileSync(process.env.JWT_PRIVATE_KEY);
        // call JWT and use the sign method

        const token = jwt.sign(
            {
                email: user.email,
                userId: user._id,
                issuer: 'Costa Technologies, LLC'
                
            },
            cert, { algorithm: 'RS256' }
        );
        console.log(token);
        res.status(200).send({ auth: true, token: token });
    });
};



// Sign up a new user
// Working code. Jeff rewrite to use RS256 instead of HMAC
exports.user_signup = function (req, res) {
    var user = new User();
    User.findOne({ email: req.body.email }, function (err, user) {
        if (user) {
            //console.log("user exists")
            res.status(409).json({
                message: "User email already exists in database"
            });
        } else {
            // hash the password for 10 rounds
            bcrypt.hash(req.body.password, 10, (err, hash) => {
                // create a user with a salted and hashed password
                const user = new User({
                    email: req.body.email,
                    password: hash
                });
                user.save(function (err) {
                    if (err) {
                        res.send('There was a problem adding the user to the database');
                    }
                });
                res.status(200).json({
                    message: "User created successfully!",
                    
                });

            });
        }
    });

};






// Delete a user
exports.delete_user = (req, res, next) => {
    const id = req.params.id;
    console.log('User ID is :' + req.params.id);
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



