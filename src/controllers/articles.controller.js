const Articles = require('../models/articles.model');
const mongoose = require('mongoose');

exports.add_article = function (req, res) {
    const article = new Articles({
        _id: new mongoose.Types.ObjectId(),
        isDraft: req.body.isDraft,
        isActive: req.body.isActive,
        userId: req.body.userId,
        article: req.body.article,
        title: req.body.title,
        category: req.body.category,
        author: req.body.author,
        datePublished: req.body.datePublished,
        readDuration: req.body.readDuration,
        tags: req.body.tags,
        subHeader: req.body.subHeader
    });
    article
        .save()
        .then(result => {
            res.status(201).json({
                message: "Handling POST requests to /articles",
                createdProduct: result
            });
        })
        .catch(error => res.status(400).json({
            message: "Error in creating tags",
            errorMessage: error
        }))
};

exports.getArticles = function (req, res) {
    Articles.find()
        .exec()
        .then(data => res.status(200).json(data))
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        })
};

exports.get_user_articles = function (req, res, next) {
    const id = req.params.userId;
    Articles.find({ userId: id })
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

exports.edit_article = function (req, res, next) {
    const id = req.body.id;
    console.log("exports.edit_article -> id", id)
    const updateOps = {};

    Articles.findOneAndUpdate(
        { _id: id },
        {
            $set: {
                isDraft: req.body.isDraft,
                isActive: req.body.isActive,
                userId: req.body.userId,
                article: req.body.article,
                title: req.body.title,
                category: req.body.category,
                author: req.body.author,
                datePublished: req.body.datePublished,
                readDuration: req.body.readDuration,
                tags: req.body.tags,
                subHeader: req.body.subHeader
            }
        },
        {
            upsert: true
        }
    )
        .then(result => {
            console.log(result);
            res.status(200).json(result);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
}

exports.delete_article = function (req, res, next) {
    const id = req.params.articleId;
    Articles.remove({ _id: id })
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

exports.get_articles_by_category = function (req, res, next) {
    const category = req.body.category;
    Articles.find({ category: category })
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

exports.get_articles_by_tags = function (req, res, next) {
    const tags = req.body.tags;
    Articles.find({ tags: { $all: tags } })
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

exports.get_acticles_paginated = async (req, res) => {
    // destructure page and limit and set default values
    const { page = 1, limit = 10 } = req.query;
  
    try {
      // execute query with page and limit values
      const articles = await Articles.find()
        .limit(limit * 1)
        .skip((page - 1) * limit)
        .exec();
  
      // get total documents in the Posts collection 
      const count = await Articles.countDocuments();
  
      // return response with posts, total pages, and current page
      res.json({
        articles,
        totalPages: Math.ceil(count / limit),
        currentPage: page
      });
    } catch (err) {
      console.error(err.message);
    }
};

exports.get_acticles_paginated_by_category = async (req, res) => {
    // const category = req.body.category;
    // destructure page and limit and set default values
    const { page = 1, limit = 10, category } = req.query;
  
    try {
      // execute query with page and limit values
      const articles = await Articles.find({ category: category })
        .limit(limit * 1)
        .skip((page - 1) * limit)
        .exec();
  
      // get total documents in the Posts collection 
      const count = await Articles.countDocuments();
  
      // return response with posts, total pages, and current page
      res.json({
        articles,
        totalPages: Math.ceil(count / limit),
        currentPage: page
      });
    } catch (err) {
      console.error(err.message);
    }
};

exports.get_acticles_paginated_by_tags = async (req, res) => {
    const tags = req.body.tags;
    // destructure page and limit and set default values
    const { page = 1, limit = 10 } = req.query;
  
    try {
      // execute query with page and limit values
      const articles = await Articles.find({ tags: { $all: tags } })
        .limit(limit * 1)
        .skip((page - 1) * limit)
        .exec();
  
      // get total documents in the Posts collection 
      const count = await Articles.countDocuments();
  
      // return response with posts, total pages, and current page
      res.json({
        articles,
        totalPages: Math.ceil(count / limit),
        currentPage: page
      });
    } catch (err) {
      console.error(err.message);
    }
};