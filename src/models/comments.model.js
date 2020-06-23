const mongoose = require('mongoose');

let CommentsSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    articleId: String,
    createTime: Date,
    username: String,
    comment: String
});


// Export the model
module.exports = mongoose.model('Comments', CommentsSchema);