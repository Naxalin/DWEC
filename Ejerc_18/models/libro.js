const db = require('../../config/db');

const Libro = {

  getAll: () => {
    return db.query('SELECT * FROM libros ORDER BY titulo');
  },


  getById: (id) => {
    return db.query('SELECT * FROM libros WHERE id = ?', [id]);
  },

  // Solo los prestados
  getPrestados: () => {
    return db.query(`
      SELECT l.*, p.nombre_prestatario, p.fecha_devolucion
      FROM libros l
      JOIN prestamos p ON l.id = p.libro_id
      WHERE l.estado = 'Prestado' AND p.fecha_entrega IS NULL
      ORDER BY l.titulo
    `);
  },

  getVencidos: () => {
    return db.query(`
      SELECT l.*, p.nombre_prestatario, p.fecha_devolucion
      FROM libros l
      JOIN prestamos p ON l.id = p.libro_id
      WHERE l.estado = 'Prestado'
        AND p.fecha_entrega IS NULL
        AND p.fecha_devolucion < CURDATE()
      ORDER BY p.fecha_devolucion ASC
    `);
  },

  updateEstado: (id, estado) => {
    return db.query('UPDATE libros SET estado = ? WHERE id = ?', [estado, id]);
  },
};

module.exports = Libro;