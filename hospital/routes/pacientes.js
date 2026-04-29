const express = require('express');
const router = express.Router();
const pacienteController = require('../controllers/pacienteController');

router.get('/',     pacienteController.index);
router.get('/:id',  pacienteController.show);
router.post('/',    pacienteController.crear);
router.put('/:id',  pacienteController.actualizar);
router.delete('/:id', pacienteController.eliminar);

module.exports = router;