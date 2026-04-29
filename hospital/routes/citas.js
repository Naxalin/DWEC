const express = require('express');
const router = express.Router();
const citaController = require('../controllers/citaController');

router.get('/',       citaController.index);
router.post('/',      citaController.crear);
router.get('/:id',    citaController.show);
router.put('/:id',    citaController.actualizar);
router.delete('/:id', citaController.eliminar);

module.exports = router;