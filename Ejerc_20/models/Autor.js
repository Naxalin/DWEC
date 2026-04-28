const mongoose = require('mongoose');

const autorSchema = new mongoose.Schema(
  {
    referencia: {
      type: String,
      unique: true,
      trim: true,
    },
    nombre: {
      type: String,
      required: [true, 'El nombre del autor es obligatorio'],
      trim: true,
    },
    nacionalidad: {
      type: String,
      trim: true,
    },
    fechaNacimiento: {
      type: Date,
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

module.exports = mongoose.model('Autor', autorSchema, 'autores');