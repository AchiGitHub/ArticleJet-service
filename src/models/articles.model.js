const mongoose = require('mongoose');

let ArticleSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    isDraft: Boolean,
    isActive: Boolean,
    userId: String,
    article: String,
    title: String,
    category: String,
    author: String,
    datePublished: String,
    readDuration: Number,
    tags: Array
});

// Export the model
module.exports = mongoose.model('Articles', ArticleSchema);