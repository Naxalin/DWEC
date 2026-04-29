const mongoose = require('mongoose');
const valoracionSchema = new mongoose.Schema({
  id_cita:     { type: Number, required: false },
  id_paciente: { type: Number, required: false },
  id_medico:   { type: Number, required: [true, 'El médico es obligatorio'] },
  puntuacion:  { type: Number, required: [true, 'La puntuación es obligatoria'], min: 1, max: 5 },
  comentario:  { type: String, required: [true, 'El comentario es obligatorio'], trim: true },
  anonima:     { type: Boolean, default: false },
  estado:      { type: String, enum: ['Publicada', 'Pendiente', 'Ocultada'], default: 'Pendiente' },
  fecha_creacion: { type: Date, default: Date.now }
});
module.exports = mongoose.model('Valoracion', valoracionSchema);
