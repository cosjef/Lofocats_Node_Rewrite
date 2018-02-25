var db = require('./config/database');
var app = require('./app');
require('dotenv').config({ silent: true })


// get the environment variable
// if it is not set, use server PORT 3000
var port = process.env.PORT || 3000;

// start the server
var server = app.listen(port, function () {
    // print the JWT
    //console.log(process.env.JWT_KEY)
    console.log('Express server running on ' + port);
});
