const Comments = require('../models/comments.model');
const mongoose = require('mongoose');

exports.add_comment = function (req, res) {
    const comment = new Comments({
        _id: new mongoose.Types.ObjectId(),
        articleId: req.body.articleId,
        commentTime: req.body.createTime,
        commentor: req.body.username,
        comment: req.body.comment
    });

    comment
        .save()
        .then(result => {
            res.status(201).json({
                message: "Handling POST requests to /comments",
                data: result
            });
        })
        .catch(error => res.status(400).json({
            message: "Error in adding comment",
            errorMessage: error
        }))
};

exports.get_comments_for_article = function (req, res, next) {
    const id = req.params.articleId;
    Comments.find({ articleId: id })
        .exec()
        .then(doc => {
            if (doc) {
                res.status(200).json(doc);
            } else {
                res
                    .status(404)
                    .json({ message: "No valid entry found for provided ID" });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        });
};