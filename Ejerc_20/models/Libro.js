const mongoose = require('mongoose');

const libroSchema = new mongoose.Schema(
  {
    referencia: {
      type: String,
      unique: true,
      trim: true,
    },
    titulo: {
      type: String,
      required: true,
      trim: true,
    },
    genero: {
      type: String,
      trim: true,
    },
    anyoPublicacion: {
      type: Number,
    },
    autor: {
      type: String,
      required: true,
      trim: true,
    },
    imagenUrl: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = mongoose.model('Libro', libroSchema, 'libros');