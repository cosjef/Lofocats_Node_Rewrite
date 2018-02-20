const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");


// import user model
const User = require("../models/user");




// Two routes: signup and signin
// create a new user
// overall path is /user/signup
router.post('/signup', (req, res, next) => {
    // hash the password for 10 rounds
    bcrypt.hash(req.body.password, 10, (err, hash) => {
        // create a user with a salted and hashed password
        const user = new User ({
            email: req.body.email,
            password: hash 
        });
        console.log(user);
    // save method stores the POST data in the database
    user.save(function (err) {
        if (err) {
            res.send('There was a problem adding the user to the database');
        }
    });
    res.status(200).json({
        message: "User created successfully!"
    });
});
});



module.exports = router;