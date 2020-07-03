const Users = require('../models/users.model');
const mongoose = require('mongoose');

exports.create_user = function (req, res) {
    const users = new Users({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        email: req.body.email
    });

    users
        .save()
        .then(result => {
            res.status(201).json({
                message: "Handling POST requests to /users",
                createdUser: result
            });
        })
        .catch(error => res.status(400).json({
            message: "Error in creating user",
            errorMessage: error
        }))
};