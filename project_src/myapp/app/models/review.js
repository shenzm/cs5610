var mongoose = require("mongoose");

var reviewSchema = new mongoose.Schema({
    user_id: String, book_id: String,
    review_time: Date, content: String,
    user_name: String
}, { collection: 'Reviews', versionKey: false });

module.exports = mongoose.model('Reviews', reviewSchema);
