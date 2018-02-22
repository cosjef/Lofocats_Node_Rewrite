const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");


// import user model
const User = require("../models/user");


router.post('/signup', function (req, res) { 
var user = new User();
User.findOne( { email: req.body.email }, function (err, user) {
    if (user) { console.log("user exists") 
        res.status(409).json({
            message: "User email already exists in database"
       });
    } else { 
        console.log("user doesn't exist") 
        // hash the password for 10 rounds
        bcrypt.hash(req.body.password, 10, (err, hash) => {
        // create a user with a salted and hashed password
            const user = new User ({
                email: req.body.email,
                password: hash
            });
            // save method to store POST data in the database
            user.save(function (err) {
                if (err) {
                    res.send('There was a problem adding the user to the database');
                }
            });
            res.status(200).json( {
                message: "User created successfully!"
            });

            });
                }
            });
   
});


module.exports = router;