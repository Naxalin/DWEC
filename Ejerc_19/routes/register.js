const express = require('express');
const router = express.Router();
const { register } = require('../controllers/userController');

router.get('/', (req, res) => res.render('register', { error: null }));
router.post('/', register);

module.exports = router;