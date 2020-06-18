const express = require('express');
const router = express.Router();

// Require the controllers WHICH WE DID NOT CREATE YET!!
const articles_controller = require('../controllers/articles.controller');


// a simple test url to check that all of our files are communicating correctly.
router.get('/', articles_controller.getArticles);
router.post('/add', articles_controller.add_article);
router.get('/user/articles/:userId', articles_controller.get_user_articles);
router.put('/user/article/edit', articles_controller.edit_article);
router.delete('/:articleId', articles_controller.delete_article);
router.post('/all/by-category', articles_controller.get_articles_by_category);
router.post('/all/by-tags', articles_controller.get_articles_by_tags);

router.get('/all', articles_controller.get_acticles_paginated);

router.get('/all/sort/by-category', articles_controller.get_acticles_paginated_by_category);
router.get('/all/sort/by-tags', articles_controller.get_acticles_paginated_by_tags);

router.post('/all/by-tags-and-category', articles_controller.get_articles_by_tags_and_category);

module.exports = router;
