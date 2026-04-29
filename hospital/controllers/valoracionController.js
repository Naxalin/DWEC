const Valoracion = require('../models/Valoracion');
const Medico = require('../models/Medico');
const Paciente = require('../models/Paciente');

const valoracionController = {

  index: async (req, res) => {
    try {
      const { estado, id_medico, puntuacion } = req.query;
      const filtro = {};
      if (estado && estado !== '') filtro.estado = estado;
      if (id_medico && id_medico !== '') filtro.id_medico = parseInt(id_medico);
      if (puntuacion && puntuacion !== '') filtro.puntuacion = parseInt(puntuacion);

      const valoraciones = await Valoracion.find(filtro).sort({ fecha_creacion: -1 });

      const resultado = await Promise.all(valoraciones.map(async (v) => {
        const medico   = await Medico.findByPk(v.id_medico);
        const paciente = v.anonima ? null : await Paciente.findByPk(v.id_paciente);
        return {
          ...v.toObject(),
          nombreMedico:   medico   ? `${medico.nombre} ${medico.apellidos}` : 'Desconocido',
          nombrePaciente: paciente ? `${paciente.nombre} ${paciente.apellidos}` : 'Anónimo'
        };
      }));

      res.json(resultado);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al cargar las valoraciones' });
    }
  },

  show: async (req, res) => {
    try {
      const valoracion = await Valoracion.findById(req.params.id);
      if (!valoracion) return res.status(404).json({ error: 'Valoración no encontrada' });
      const medico   = await Medico.findByPk(valoracion.id_medico);
      const paciente = valoracion.anonima ? null : await Paciente.findByPk(valoracion.id_paciente);
      res.json({ ...valoracion.toObject(), medico, paciente });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al cargar la valoración' });
    }
  },

  crear: async (req, res) => {
    try {
      const { id_cita, id_paciente, id_medico, puntuacion, comentario, anonima, estado } = req.body;

      const datos = {
        id_medico:  parseInt(id_medico),
        puntuacion: parseInt(puntuacion),
        comentario,
        anonima:    anonima === true || anonima === 'true' || anonima === 'on',
        estado:     estado || 'Pendiente'
      };

      if (id_cita && !isNaN(parseInt(id_cita)))         datos.id_cita = parseInt(id_cita);
      if (id_paciente && !isNaN(parseInt(id_paciente))) datos.id_paciente = parseInt(id_paciente);

      const valoracion = await Valoracion.create(datos);
      res.status(201).json(valoracion);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al crear la valoración' });
    }
  },

  actualizar: async (req, res) => {
    try {
      const { puntuacion, comentario, anonima, estado } = req.body;
      const valoracion = await Valoracion.findByIdAndUpdate(
        req.params.id,
        {
          puntuacion: parseInt(puntuacion),
          comentario,
          anonima: anonima === true || anonima === 'true' || anonima === 'on',
          estado
        },
        { new: true }
      );
      if (!valoracion) return res.status(404).json({ error: 'Valoración no encontrada' });
      res.json(valoracion);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al actualizar la valoración' });
    }
  },

  eliminar: async (req, res) => {
    try {
      const valoracion = await Valoracion.findByIdAndDelete(req.params.id);
      if (!valoracion) return res.status(404).json({ error: 'Valoración no encontrada' });
      res.json({ mensaje: 'Valoración eliminada correctamente' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al eliminar la valoración' });
    }
  }

};

module.exports = valoracionController;