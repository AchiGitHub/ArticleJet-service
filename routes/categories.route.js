const express = require('express');
const router = express.Router();

// Require the controllers WHICH WE DID NOT CREATE YET!!
const categories_controller = require('../controllers/categories.controller');


// a simple test url to check that all of our files are communicating correctly.
router.get('/', categories_controller.get_categories);
router.post('/create', categories_controller.categories_create);

module.exports = router;
