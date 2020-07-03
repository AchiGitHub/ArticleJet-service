const mongoose = require('mongoose');

let UserSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    email: String
});


// Export the model
module.exports = mongoose.model('Users', UserSchema);