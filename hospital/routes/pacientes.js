const express = require('express');
const router = express.Router();
const pacienteController = require('../controllers/pacienteController');

router.get('/',    pacienteController.index);
router.get('/:id', pacienteController.show);

module.exports = router;