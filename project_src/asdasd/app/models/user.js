var mongoose = require("mongoose");
var bcrypt = require("bcrypt");

var userSchema = new mongoose.Schema({
    email: String, password: String,
    firstname: String, lastname: String,
    username: String, favoriteBooks: [], friends: [],
    img_url: String
}, { collection: 'Users', versionKey: false });

userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
};

userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('Users', userSchema);
