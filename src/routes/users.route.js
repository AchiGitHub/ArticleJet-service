const express = require('express');
const router = express.Router();

const users_controller = require('../controllers/users.controller');

router.post('/create', users_controller.create_user);

module.exports = router;