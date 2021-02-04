const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/user');
const auth = require('../config/auth');

router.post('/login', ctrl.login);
router.post('/signup', ctrl.signup);

router.use(auth);
router.post('/me', ctrl.me);
router.post('/all', ctrl.all);

router.post('/delete/:id', ctrl.deleteOne);

module.exports = router;