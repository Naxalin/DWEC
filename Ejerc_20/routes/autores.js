const express = require('express');
const router = express.Router();
const Autor = require('../models/Autor');
const Libro = require('../models/Libro');

router.get('/', async (req, res) => {
  try {
    const filtro = {};
    if (req.query.nacionalidad) {
      filtro.nacionalidad = req.query.nacionalidad;
    }
    const autores = await Autor.find(filtro);
    res.json(autores);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener autores', error: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const autor = await Autor.findOne({ referencia: req.params.id });
    if (!autor) {
      return res.status(404).json({ mensaje: 'Autor no encontrado' });
    }
    res.json(autor);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener el autor', error: error.message });
  }
});

router.get('/:id/libros', async (req, res) => {
  try {
    const autor = await Autor.findOne({ referencia: req.params.id });
    if (!autor) {
      return res.status(404).json({ mensaje: 'Autor no encontrado' });
    }
    const libros = await Libro.find({ autor: req.params.id });
    res.json(libros);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener los libros del autor', error: error.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const autor = new Autor(req.body);
    const autorGuardado = await autor.save();
    res.status(201).json(autorGuardado);
  } catch (error) {
    res.status(400).json({ mensaje: 'Error al crear el autor', error: error.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const autor = await Autor.findOneAndUpdate(
      { referencia: req.params.id },
      req.body,
      { new: true, runValidators: true }
    );
    if (!autor) {
      return res.status(404).json({ mensaje: 'Autor no encontrado' });
    }
    res.json(autor);
  } catch (error) {
    res.status(400).json({ mensaje: 'Error al actualizar el autor', error: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const autor = await Autor.findOneAndDelete({ referencia: req.params.id });
    if (!autor) {
      return res.status(404).json({ mensaje: 'Autor no encontrado' });
    }
    res.json({ mensaje: 'Autor eliminado correctamente', autor });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al eliminar el autor', error: error.message });
  }
});

module.exports = router;