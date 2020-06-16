const Tags = require('../models/tags.model');
const mongoose = require('mongoose');

exports.tags_create = function (req, res) {
    console.log(req.body)
    const tags = new Tags({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name
    });

    tags
        .save()
        .then(result => {
            res.status(201).json({
                message: "Handling POST requests to /tags",
                createdProduct: result
            });
        })
        .catch(error => res.status(400).json({
            message: "Error in creating tags",
            errorMessage: error
        }))
};

exports.get_tags = function (req, res) {
    Tags.find()
        .exec()
        .then(data => res.status(200).json(data))
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        })
};