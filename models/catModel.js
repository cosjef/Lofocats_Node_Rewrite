var mongoose = require('mongoose');
var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;
 
var CatSchema = new Schema({
	// ObjectId is the unique ID of this stored object in Mongo
	// defines the fields that are required for a particular user
    id : ObjectId,
    breed : String,
    color : String,
    longitude : Number,
	latitutde : Number,
    contact_phone : String,
	contact_email : String,
	event_date	: String,
	entry_type : String,
	photo_url : String
});

// lets something else access this
// users is the name of the collection in the database
// tie the collection to the schema defined above 
var CatModel = mongoose.model('Cat', CatSchema);

// make this model publicly available  
// any file requiring this file will have access to the UserModel object
module.exports = CatModel;

// module.exports = mongoose.model('Cat', CatSchema);