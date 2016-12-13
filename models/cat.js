// Mongoose import into the app
var mongoose = require('mongoose')

 // Mongoose schema definition
// var Schema = mongoose.Schema;

var CatSchema = new mongoose.Schema({
	// ObjectId is the unique ID of this stored object in Mongo
	// defines the fields that are required for a particular user
 
    breed: String,
    color: String,
    longitude: Number,
	latitude: Number,
    contact_phone: String,
	contact_email: String,
	event_date: String,
	entry_type: String,
	photo_url: String
});

/*
// lets something else access this model
// lofocats_model is the name of the collection in the database
// ties the collection to the schema defined above 
var CatModel = mongoose.model('lofocats_model', CatSchema);

// make this model publicly available  
// any file requiring this file will have access to the CatModel object
module.exports = CatModel;
*/

// Mongoose model definition
// Compile a 'Cat' model using the catSchema as the structure.
// Mongoose also creates a MongoDB collection called 'Cats' for these documents
//    module.exports = mongoose.model('Cats', catSchema);


//mongoose.model('cats', catSchema);
module.exports = mongoose.model('Cat', CatSchema);


// var cat = mongoose.model('Cat', CatSchema);
// module.exports = cat;