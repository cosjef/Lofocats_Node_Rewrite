var db = require('./config/database');
var app = require('./app');


// get the environment variable
// if it is not set, use server PORT 3000
var port = process.env.PORT || 3000;

// start the server
var server = app.listen(port, function () {
    console.log('Express server running on ' + port);
});
