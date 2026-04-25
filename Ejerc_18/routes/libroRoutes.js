const express = require('express');
const router = express.Router();
const libroController = require('../controllers/libroController');

router.get('/', libroController.index);
router.get('/libro/:id', libroController.detalle);
router.get('/prestados', libroController.prestados);
router.get('/vencidos', libroController.vencidos);
router.get('/prestamos/usuario', libroController.usuario);
router.get('/prestamo/formulario/:libro_id', libroController.formulario);
router.post('/prestamo/nuevo', libroController.nuevoPrestamo);
router.post('/prestamo/devolver/:libro_id', libroController.devolver);

module.exports = router;