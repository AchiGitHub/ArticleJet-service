const mongoose = require('mongoose');

let LikesSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    articleId: String,
    userId: String
});


// Export the model
module.exports = mongoose.model('Likes', LikesSchema);