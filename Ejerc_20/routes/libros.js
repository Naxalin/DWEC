const express = require('express');
const router = express.Router();
const Libro = require('../models/Libro');

router.get('/', async (req, res) => {
  try {
    let query = Libro.find();
    if (req.query.sort) {
      query = query.sort({ [req.query.sort]: 1 });
    }
    const libros = await query;
    res.json(libros);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener libros', error: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const libro = await Libro.findOne({ referencia: req.params.id });
    if (!libro) {
      return res.status(404).json({ mensaje: 'Libro no encontrado' });
    }
    res.json(libro);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener el libro', error: error.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const libro = new Libro(req.body);
    const libroGuardado = await libro.save();
    res.status(201).json(libroGuardado);
  } catch (error) {
    res.status(400).json({ mensaje: 'Error al crear el libro', error: error.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const libro = await Libro.findOneAndUpdate(
      { referencia: req.params.id },
      req.body,
      { new: true, runValidators: true }
    );
    if (!libro) {
      return res.status(404).json({ mensaje: 'Libro no encontrado' });
    }
    res.json(libro);
  } catch (error) {
    res.status(400).json({ mensaje: 'Error al actualizar el libro', error: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const libro = await Libro.findOneAndDelete({ referencia: req.params.id });
    if (!libro) {
      return res.status(404).json({ mensaje: 'Libro no encontrado' });
    }
    res.json({ mensaje: 'Libro eliminado correctamente', libro });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al eliminar el libro', error: error.message });
  }
});

module.exports = router;