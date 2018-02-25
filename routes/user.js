const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

// Routes need to point to controllers

// import the checkAuth helper 
const checkAuth = require('../config/check-auth');

//import the controller for cat in the route file
const user = require('../controllers/user');

// ===================================================
// Routes are listed below
// ===================================================
router.post('/login', user.user_login);
router.post('/:signup', user.user_signup);
router.delete('/:id', checkAuth, user.delete_user);


module.exports = router;