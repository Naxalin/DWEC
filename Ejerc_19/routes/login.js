const express = require('express');
const router = express.Router();
const { login, logout } = require('../controllers/userController');

router.get('/', (req, res) => res.render('login', { error: null }));
router.post('/', login);
router.get('/logout', logout);

module.exports = router;