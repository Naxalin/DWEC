const express = require('express');
const router = express.Router();
const valoracionController = require('../controllers/valoracionController');

router.get('/',       valoracionController.index);
router.post('/',      valoracionController.crear);
router.get('/:id',    valoracionController.show);
router.put('/:id',    valoracionController.actualizar);
router.delete('/:id', valoracionController.eliminar);

module.exports = router;