const pool = require('../config/db');

const Prestamo = {

  async getByLibroId(libroId) {
    const [rows] = await pool.query(
      'SELECT * FROM prestamos WHERE libro_id = ? ORDER BY fecha_prestamo DESC',
      [libroId]
    );
    return rows;
  },

  async getActivo(libroId) {
    const [rows] = await pool.query(
      'SELECT * FROM prestamos WHERE libro_id = ? AND fecha_entrega IS NULL',
      [libroId]
    );
    return rows[0] || null;
  },

  async getByUsuario(nombre) {
    const [rows] = await pool.query(`
      SELECT p.*, l.titulo, l.autor
      FROM prestamos p
      JOIN libros l ON l.id = p.libro_id
      WHERE p.nombre_prestatario LIKE ?
      ORDER BY p.fecha_prestamo DESC
    `, [`%${nombre}%`]);
    return rows;
  },

  async create({ libro_id, nombre_prestatario, fecha_prestamo, fecha_devolucion }) {
    const [result] = await pool.query(
      'INSERT INTO prestamos (libro_id, nombre_prestatario, fecha_prestamo, fecha_devolucion) VALUES (?, ?, ?, ?)',
      [libro_id, nombre_prestatario, fecha_prestamo, fecha_devolucion]
    );
    return result.insertId;
  },

  async registrarDevolucion(id) {
    await pool.query(
      'UPDATE prestamos SET fecha_entrega = CURDATE() WHERE id = ?',
      [id]
    );
  },

};

module.exports = Prestamo;