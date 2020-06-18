const mongoose = require('mongoose');

let CategoriesSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    imageURL: String
});


// Export the model
module.exports = mongoose.model('Categories', CategoriesSchema);