const express = require('express');
const router = express.Router();
const medicoController = require('../controllers/medicoController');

router.get('/especialidades', medicoController.especialidades);
router.get('/',       medicoController.index);
router.post('/',      medicoController.crear);
router.get('/:id',    medicoController.show);
router.put('/:id',    medicoController.actualizar);
router.delete('/:id', medicoController.eliminar);

module.exports = router;