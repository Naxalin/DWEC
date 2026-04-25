const express = require('express');
const router = express.Router();
const libroController = require('../controllers/libroController');

router.get('/libros', libroController.getAll);
router.get('/libro/:id', libroController.getById);
router.get('/prestados', libroController.getPrestados);
router.get('/vencidos', libroController.getVencidos);
router.get('/prestamos/usuario', libroController.getByUsuario);
router.get('/prestamo/formulario/:libro_id', libroController.getFormulario);
router.post('/prestamo/nuevo', libroController.createPrestamo);
router.post('/prestamo/devolver/:libro_id', libroController.devolverPrestamo);

module.exports = router;