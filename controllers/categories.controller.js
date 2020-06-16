const Categories = require('../models/categories.model');
const mongoose = require('mongoose');

exports.categories_create = function (req, res) {
    console.log(req.body)
    const category = new Categories({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name
    });

    category
        .save()
        .then(result => {
            res.status(201).json({
                message: "Handling POST requests to /categories",
                createdProduct: result
            });
        })
        .catch(error => res.status(400).json({
            message: "Error in creating category",
            errorMessage: error
        }))
};

exports.get_categories = function (req, res) {
    Categories.find()
        .exec()
        .then(data => res.status(200).json(data))
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        })
};