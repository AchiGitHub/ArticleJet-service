const express = require('express');
const router = express.Router();

// Require the controllers WHICH WE DID NOT CREATE YET!!
const tags_controller = require('../controllers/tags.controller');


// a simple test url to check that all of our files are communicating correctly.
router.get('/', tags_controller.get_tags);
router.post('/create', tags_controller.tags_create);

module.exports = router;
