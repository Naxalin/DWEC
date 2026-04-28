require('dotenv').config();
const express = require('express');
const connectDB = require('./config/database');

const app = express();

connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.json({
    mensaje: '📚 API REST Biblioteca',
    version: '1.0.0',
    endpoints: {
      autores: {
        'GET /api/autores': 'Obtener todos los autores',
        'GET /api/autores?nacionalidad=Española': 'Filtrar autores por nacionalidad',
        'GET /api/autores/:id': 'Obtener un autor por referencia',
        'GET /api/autores/:id/libros': 'Obtener los libros de un autor',
        'POST /api/autores': 'Crear un nuevo autor',
        'PUT /api/autores/:id': 'Actualizar un autor',
        'DELETE /api/autores/:id': 'Eliminar un autor',
      },
      libros: {
        'GET /api/libros': 'Obtener todos los libros',
        'GET /api/libros?sort=titulo': 'Obtener libros ordenados por título',
        'GET /api/libros/:id': 'Obtener un libro por referencia',
        'POST /api/libros': 'Crear un nuevo libro',
        'PUT /api/libros/:id': 'Actualizar un libro',
        'DELETE /api/libros/:id': 'Eliminar un libro',
      },
    },
  });
});

app.use('/api/autores', require('./routes/autores'));
app.use('/api/libros', require('./routes/libros'));

app.use((req, res) => {
  res.status(404).json({ mensaje: 'Ruta no encontrada' });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ mensaje: 'Error interno del servidor', error: err.message });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});

module.exports = app;
