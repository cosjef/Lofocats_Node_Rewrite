var mongoose = require('mongoose');

//   Database stuff
// =============================================================================
// You query JSON with JSON when using MongoDB
// Build the mongodb connection string
//var MONGODB_URI = 'mongodb://localhost:27017/lofocats';
var MONGODB_URI = 'mongodb://heroku_v7rrqxpd:av32e55onb7cjml9pienpgv78k@ds247648.mlab.com:47648/heroku_v7rrqxpd';

// Create the database connection
// DEPRECATED USE OF useMongoClient no longer needed in mongoose 5.x
//mongoose.connect(MONGODB_URI, {
//    useMongoClient: true
//});


// Create the database connection
mongoose.connect(MONGODB_URI);



// get Mongoose to use the global promise library
mongoose.Promise = global.Promise;

// CONNECTION EVENTS
// When successfully connected
mongoose.connection.on('connected', function () {
    console.log('Mongoose default connection open to ' + MONGODB_URI);
});

// If the connection throws an error
mongoose.connection.on('error',function (err) {
    console.log('Mongoose default connection error: ' + err);
});

// When the connection is disconnected
mongoose.connection.on('disconnected', function () {
    console.log('Mongoose default connection disconnected');
});

// If the Node process ends, close the Mongoose connection
process.on('SIGINT', function() {
    mongoose.connection.close(function () {
        console.log('Mongoose default connection disconnected through app termination. CTRL-C, maybe?');
        process.exit(0);
    });
});
// =============================================================================
