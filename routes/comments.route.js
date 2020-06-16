const express = require('express');
const router = express.Router();

// Require the controllers WHICH WE DID NOT CREATE YET!!
const comments_controller = require('../controllers/comments.controller');


// a simple test url to check that all of our files are communicating correctly.
router.get('/:articleId', comments_controller.get_comments_for_article);
router.post('/add', comments_controller.add_comment);

module.exports = router;
