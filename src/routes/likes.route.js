const express = require('express');
const router = express.Router();

const likes_controller = require('../controllers/likes.controller');

router.post('/add', likes_controller.add_like);
router.get('/:articleId', likes_controller.get_likes_for_article)
router.get('/:articleId/:userId', likes_controller.get_user_like_for_article)
router.delete('/:articleId/:userId', likes_controller.remove_like)

module.exports = router;