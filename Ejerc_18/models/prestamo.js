const pool = require('../config/db');

const Prestamo = {
  getByLibroId: (libro_id) => {
    return db.query(`
      SELECT * FROM prestamos
      WHERE libro_id = ?
      ORDER BY fecha_prestamo DESC
    `, [libro_id]);
  },

  getActivo: (libro_id) => {
    return db.query(`
      SELECT * FROM prestamos
      WHERE libro_id = ? AND fecha_entrega IS NULL
      LIMIT 1
    `, [libro_id]);
  },

  getByUsuario: (nombre) => {
    return db.query(`
      SELECT p.*, l.titulo, l.autor
      FROM prestamos p
      JOIN libros l ON p.libro_id = l.id
      WHERE p.nombre_prestatario = ? AND p.fecha_entrega IS NULL
      ORDER BY p.fecha_devolucion ASC
    `, [nombre]);
  },

  create: (libro_id, nombre_prestatario, fecha_prestamo, fecha_devolucion) => {
    return db.query(`
      INSERT INTO prestamos (libro_id, nombre_prestatario, fecha_prestamo, fecha_devolucion)
      VALUES (?, ?, ?, ?)
    `, [libro_id, nombre_prestatario, fecha_prestamo, fecha_devolucion]);
  },

  registrarDevolucion: (libro_id) => {
    return db.query(`
      UPDATE prestamos
      SET fecha_entrega = CURDATE()
      WHERE libro_id = ? AND fecha_entrega IS NULL
    `, [libro_id]);
  },
};

module.exports = Prestamo;