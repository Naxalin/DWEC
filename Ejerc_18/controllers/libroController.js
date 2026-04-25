const Libro = require('../models/libro');
const Prestamo = require('../models/prestamo');

exports.getAll = async (req, res) => {
  try {
    const libros = await Libro.getAll();
    res.json(libros);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getById = async (req, res) => {
  try {
    const libro = await Libro.getById(req.params.id);
    if (!libro) return res.status(404).json({ error: 'Libro no encontrado' });
    const prestamo = await Prestamo.getActivo(req.params.id);
    res.json({ libro, prestamo });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getPrestados = async (req, res) => {
  try {
    const libros = await Libro.getPrestados();
    res.json(libros);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getVencidos = async (req, res) => {
  try {
    const prestamos = await Libro.getVencidos();
    res.json(prestamos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getByUsuario = async (req, res) => {
  try {
    const { nombre } = req.query;
    if (!nombre) return res.status(400).json({ error: 'Falta el nombre' });
    const prestamos = await Prestamo.getByUsuario(nombre);
    res.json(prestamos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getFormulario = async (req, res) => {
  try {
    const libro = await Libro.getById(req.params.libro_id);
    if (!libro) return res.status(404).json({ error: 'Libro no encontrado' });
    if (libro.estado === 'Prestado') return res.status(400).json({ error: 'El libro ya está prestado' });
    res.json({ libro });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createPrestamo = async (req, res) => {
  try {
    const { libro_id, nombre_prestatario, fecha_prestamo, fecha_devolucion } = req.body;
    if (!libro_id || !nombre_prestatario || !fecha_prestamo || !fecha_devolucion) {
      return res.status(400).json({ error: 'Faltan campos obligatorios' });
    }
    await Prestamo.create({ libro_id, nombre_prestatario, fecha_prestamo, fecha_devolucion });
    await Libro.updateEstado(libro_id, 'Prestado');
    res.status(201).json({ mensaje: 'Préstamo creado correctamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.devolverPrestamo = async (req, res) => {
  try {
    const { libro_id } = req.params;
    const prestamo = await Prestamo.getActivo(libro_id);
    if (!prestamo) return res.status(404).json({ error: 'No hay préstamo activo para este libro' });
    await Prestamo.registrarDevolucion(prestamo.id);
    await Libro.updateEstado(libro_id, 'Disponible');
    res.json({ mensaje: 'Devolución registrada correctamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};