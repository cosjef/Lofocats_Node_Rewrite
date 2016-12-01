// Mongoose import
var mongoose = require('mongoose')

 // Mongoose schema definition
var Schema = mongoose.Schema;

var catSchema = new Schema({
	// ObjectId is the unique ID of this stored object in Mongo
	// defines the fields that are required for a particular user
    
    //id: ObjectId,
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
module.exports = mongoose.model('cat', catSchema);