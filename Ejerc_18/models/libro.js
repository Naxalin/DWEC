const pool = require('../config/db');

const Libro = {

  async getAll() {
    const [rows] = await pool.query('SELECT * FROM libros ORDER BY titulo');
    return rows;
  },

  async getById(id) {
    const [rows] = await pool.query('SELECT * FROM libros WHERE id = ?', [id]);
    return rows[0] || null;
  },

  async getPrestados() {
    const [rows] = await pool.query(`
      SELECT l.*, p.nombre_prestatario, p.fecha_devolucion
      FROM libros l
      JOIN prestamos p ON l.id = p.libro_id
      WHERE l.estado = 'Prestado' AND p.fecha_entrega IS NULL
      ORDER BY l.titulo
    `);
    return rows;
  },

  async getVencidos() {
    const [rows] = await pool.query(`
      SELECT l.*, p.nombre_prestatario, p.fecha_devolucion
      FROM libros l
      JOIN prestamos p ON l.id = p.libro_id
      WHERE l.estado = 'Prestado'
        AND p.fecha_entrega IS NULL
        AND p.fecha_devolucion < CURDATE()
      ORDER BY p.fecha_devolucion ASC
    `);
    return rows;
  },

  async updateEstado(id, estado) {
    await pool.query('UPDATE libros SET estado = ? WHERE id = ?', [estado, id]);
  },

};

module.exports = Libro;