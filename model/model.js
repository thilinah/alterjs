var mongoose = require('mongoose');
var model = {};
var UserSchema = mongoose.Schema({
	id: String,
    name: String
});

model.User = mongoose.model('users', UserSchema);

module.exports = model;