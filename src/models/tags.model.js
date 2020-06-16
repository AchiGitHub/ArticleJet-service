const mongoose = require('mongoose');

let TagsSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String
});


// Export the model
module.exports = mongoose.model('Tags', TagsSchema);