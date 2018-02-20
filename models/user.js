
var mongoose = require('mongoose');

var Schema = mongoose.Schema;


var userSchema = new mongoose.Schema({
    email: { type: String, required: true },
    password: { type: String, required: true }
}, { timestamps: {} });


module.exports = mongoose.model('User', userSchema);