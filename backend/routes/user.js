const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/user');

router.post('/', ctrl.me);

module.exports = router;