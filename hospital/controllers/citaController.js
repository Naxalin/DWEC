const getCita = require('../models/Cita');
const getMedico = require('../models/Medico');
const getPaciente = require('../models/Paciente');
const { Op } = require('sequelize');

const citaController = {

  index: async (req, res) => {
    try {
      const Cita = getCita();
      const { estado, id_medico, fecha } = req.query;
      const where = {};
      if (estado && estado !== '') where.estado = estado;
      if (id_medico && id_medico !== '') where.id_medico = id_medico;
      if (fecha && fecha !== '') {
        const dia = new Date(fecha);
        const inicioDia = new Date(dia.getFullYear(), dia.getMonth(), dia.getDate(), 0, 0, 0);
        const finDia    = new Date(dia.getFullYear(), dia.getMonth(), dia.getDate(), 23, 59, 59);
        where.fecha_hora = { [Op.between]: [inicioDia, finDia] };
      }
      const citas = await Cita.findAll({ where, include: ['medico', 'paciente'], order: [['fecha_hora', 'DESC']] });
      res.json(citas);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al cargar las citas' });
    }
  },

  show: async (req, res) => {
    try {
      const Cita = getCita();
      const cita = await Cita.findByPk(req.params.id, { include: ['medico', 'paciente'] });
      if (!cita) return res.status(404).json({ error: 'Cita no encontrada' });
      res.json(cita);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al cargar la cita' });
    }
  },

  crear: async (req, res) => {
    try {
      const Cita = getCita();
      const { id_medico, id_paciente, fecha_hora, motivo, estado } = req.body;
      const cita = await Cita.create({ id_medico, id_paciente, fecha_hora, motivo, estado: estado || 'Pendiente' });
      res.status(201).json(cita);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al crear la cita' });
    }
  },

  actualizar: async (req, res) => {
    try {
      const Cita = getCita();
      const cita = await Cita.findByPk(req.params.id);
      if (!cita) return res.status(404).json({ error: 'Cita no encontrada' });
      const { id_medico, id_paciente, fecha_hora, motivo, estado } = req.body;
      await cita.update({ id_medico, id_paciente, fecha_hora, motivo, estado });
      res.json(cita);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al actualizar la cita' });
    }
  },

  eliminar: async (req, res) => {
    try {
      const Cita = getCita();
      const cita = await Cita.findByPk(req.params.id);
      if (!cita) return res.status(404).json({ error: 'Cita no encontrada' });
      await cita.destroy();
      res.json({ mensaje: 'Cita eliminada correctamente' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al eliminar la cita' });
    }
  }

};

module.exports = citaController;