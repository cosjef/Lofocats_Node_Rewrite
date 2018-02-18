var mongoose = require('mongoose');

//   Database stuff
// =============================================================================
// You query JSON with JSON when using MongoDB
// Build the mongodb connection string
var dbUri = 'mongodb://localhost:27017/lofocats';

// Create the database connection
mongoose.connect(dbUri, {useMongoClient: true});

// get Mongoose to use the global promise library
mongoose.Promise = global.Promise;

// CONNECTION EVENTS
// When successfully connected
mongoose.connection.on('connected', function () {
    console.log('Mongoose default connection open to ' + dbUri);
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
        console.log('Mongoose default connection disconnected through app termination');
        process.exit(0);
    });
});
// =============================================================================
