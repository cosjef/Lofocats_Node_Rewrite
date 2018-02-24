const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");


// import user model
//const User = require("../models/user");

//import the controller for cat in the route file
const user = require('../controllers/user');

// =======================================================================================================================
// Routes are listed below
// =======================================================================================================================
router.post('/login', user.create_user);
router.post('/:signup', user.signup_user);
router.delete('/:id', user.delete_user);


module.exports = router;