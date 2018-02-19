// ========================================================================
// Mongoose is what we will use to interact with a MongoDB instance.
// Mongoose is the ORM for MongoDB
// Requiring the Mongoose module which will communicate with Mongo for us
// ========================================================================

var mongoose = require('mongoose');

// Mongoose schema definition
var Schema = mongoose.Schema;

// Adding timestamps to your Schema automatically generates createdAt and updatedAt dates for you
// A Schema defines the structure of any documents that will be stored in your MongoDB collection
// 1 schema = 1 file (do not have multiple schemas in one file)
var catSchema = new mongoose.Schema( {
	// ObjectId will be added as a unique ID of this stored object in MongoDB
	// define the fields for a cat
    breed: String,
    color: { type: String, required: true, message: 'Enter a color' },
	declawed: Boolean,
    city: String,
	state: String,
	photo_url: String
}, { timestamps: {} });


// =============================================================================
// Mongoose model definition
// the schema is useless so far
// we need to create a model using it
// ties a Mongo collection to the schema defined above
// models represent documents which can be saved and retrieved from our database
// A Model is an object that gives you easy access to a named collection
// models are defined by passing a Schema instance to mongoose.model
// Cat is the name of the collection in the database
// Mongoose also creates a MongoDB collection called 'Cat' for these documents
// Compile a 'Cat' model using the catSchema as the structure.
// make this model publicly available to our Node application
// something else can access the model
// any file requiring this model file will have access to the Cats object
// compile our schema into a model


// export the schema wrapped into a model
// first argument is the name of the model as you want to use it internally
// first argument naming convention is to use an uppercase starting character
// second argument is the schema you want to use for the model
module.exports = mongoose.model('Cat', catSchema);

