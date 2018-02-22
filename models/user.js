
var mongoose = require('mongoose');

var Schema = mongoose.Schema;


var userSchema = new mongoose.Schema({
    email: { 
        type: String, 
        required: true, 
        unique: true,
        // validate that the email address is in a good format with a regex
        // regex not working 
        // match: /[a - z0 - 9!#$ %& '*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&' * +/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    },
    password: { type: String, required: true }
}, { timestamps: {} });


module.exports = mongoose.model('User', userSchema);