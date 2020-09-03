const Likes = require('../models/likes.model');
const mongoose = require('mongoose');

exports.add_like = function (req, res) {
    const likes = new Likes({
        _id: new mongoose.Types.ObjectId(),
        articleId: req.body.articleId,
        userId: req.body.userId
    });

    likes
        .save()
        .then(result => {
            res.status(201).json({
                message: "added user like to article"
            });
        })
        .catch(error => res.status(400).json({
            message: "Error in adding like",
            errorMessage: error
        }))
};

exports.get_likes_for_article = function (req, res, next) {
    const id = req.params.articleId;
    Likes.find({ articleId: id })
        .exec()
        .then(doc => {
            if (doc) {
                res.status(200).json({likes: doc.length});
            } else {
                res
                    .status(404)
                    .json({likes: 0});
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        });
};

exports.get_user_like_for_article = function (req, res, next) {
    const articleId = req.params.articleId;
    const userId = req.params.userId;
    Likes.find({ articleId: articleId, userId: userId })
        .exec()
        .then(doc => {
            if (doc.length !== 0) {
                res.status(200).json({liked: true});
            } else {
                res
                    .status(404)
                    .json({liked: false});
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        });
};

exports.remove_like = function (req, res, next) {
    const articleId = req.params.articleId;
    const userId = req.params.userId;
    Likes.remove({ articleId: articleId, userId: userId })
        .exec()
        .then(result => {
            res.status(200).json(result);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
};