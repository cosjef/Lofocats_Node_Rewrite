// spins up Express application

var express = require('express');
// Bootstrap express
// create express app
var app = express();

var mongoose = require('mongoose');
var morgan = require('morgan');
var db = require('./config/database');
const bodyParser = require("body-parser");
var catRoutes = require('./routes/catRoutes');
var userRoutes = require('./routes/user');

// get an instance of the express Router
var router = express.Router();

// use morgan to log requests to the console
// app.use(morgan('combined'));
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// =======================================================================================================================
// The order you place your middleware and routes is very important; everything will happen in the order that they appear.
// middleware are functions that have access to the request and response objects in an Express application.
// middleware allows you to define a stack of actions that you should flow through.
// middleware are the functions that sits in the middle between the initial client request and and final intended route
// middleware functions are functions that have access to the request object (req), the response object (res) and the next middleware function in the request-response cycle
// router is a sub-package of express that lets you conveniently handle different routes
// use is a method that sets up middleware
// Middleware is a piece of code, a function in Node.js, that acts as a bridge between some parts of your code.
// When a request reaches an endpoint, the router has an option to pass the request on to the next middleware function in line
// an incoming request has to go through app.use and what we pass to it
// you can add layers to the middleware stack by calling .use
// use is a method to configure the middleware used by the routes of the Express HTTP server object
// Middleware function is executed when the base path matches.
// middleware happens on every request - it does something before the request is processed
// app.use() mounts the middleware function to a specified path
// app.use('/cat_entries', CatController);
// =======================================================================================================================

/*
// append CORS headers to incoming request to prevent CORS errors
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
// check the presence of the OPTIONS method from the web browser
if (req.method === 'OPTIONS') {
    // tell the browser what verbs they can send
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
    // provide the answer to the browser
    return res.status(200).json({});
    }
    // call next() to ensure we don't block requests and move to other routes
    // continue doing what we were doing and go to the route
    next();
});
*/

// routes which should handle requests
// This is middleware
// every request is funneled through here
// the first argument acts as a URL filter: requests that start with /cats will be handled by catRoutes
// any request starting with /cats will be forwarded to the catRoutes file
app.use("/cats", catRoutes);
app.use("/user", userRoutes);

// Error handler to handle any requests that get past the routes above
// Used when no route was able to handle the request
// If you reach this line, it means no route was able to handle the request
app.use((req, res, next) => {
    // Error object is available by default
    const error = new Error('Route not found');
    error.status = 404;
    next(error);
})

// Handle errors thrown anywhere else (besides routes) in the app
// Throw a 500 error and some additional detail
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});


module.exports = app;