const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/user');

router.post('/me', ctrl.me);
router.post('/signup', ctrl.signup);
router.post('/delete/:id', ctrl.deleteOne);

module.exports = router;