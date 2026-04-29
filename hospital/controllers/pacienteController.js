const getPaciente = require('../models/Paciente');
const { Op } = require('sequelize');

const pacienteController = {

  index: async (req, res) => {
    try {
      const Paciente = getPaciente();
      const { buscar } = req.query;
      const where = {};
      if (buscar && buscar !== '') {
        where[Op.or] = [
          { nombre:    { [Op.like]: `%${buscar}%` } },
          { apellidos: { [Op.like]: `%${buscar}%` } },
          { email:     { [Op.like]: `%${buscar}%` } }
        ];
      }
      const pacientes = await Paciente.findAll({ where, order: [['apellidos', 'ASC']] });
      res.json(pacientes);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al cargar los pacientes' });
    }
  },

  show: async (req, res) => {
    try {
      const Paciente = getPaciente();
      const paciente = await Paciente.findByPk(req.params.id, {
        include: [{ association: 'citas', include: ['medico'] }]
      });
      if (!paciente) return res.status(404).json({ error: 'Paciente no encontrado' });
      res.json(paciente);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al cargar el paciente' });
    }
  },

  crear: async (req, res) => {
    try {
      const Paciente = getPaciente();
      const { nombre, apellidos, email, telefono, fecha_nacimiento } = req.body;
      const paciente = await Paciente.create({ nombre, apellidos, email, telefono, fecha_nacimiento });
      res.status(201).json(paciente);
    } catch (error) {
      console.error(error);
      const msg = error.name === 'SequelizeUniqueConstraintError' ? 'Ya existe un paciente con ese email' : 'Error al crear el paciente';
      res.status(500).json({ error: msg });
    }
  },

  actualizar: async (req, res) => {
    try {
      const Paciente = getPaciente();
      const paciente = await Paciente.findByPk(req.params.id);
      if (!paciente) return res.status(404).json({ error: 'Paciente no encontrado' });
      const { nombre, apellidos, email, telefono, fecha_nacimiento } = req.body;
      await paciente.update({ nombre, apellidos, email, telefono, fecha_nacimiento });
      res.json(paciente);
    } catch (error) {
      console.error(error);
      const msg = error.name === 'SequelizeUniqueConstraintError' ? 'Ya existe un paciente con ese email' : 'Error al actualizar el paciente';
      res.status(500).json({ error: msg });
    }
  },

  eliminar: async (req, res) => {
    try {
      const Paciente = getPaciente();
      const getCita = require('../models/Cita');
      const Cita = getCita();
      const paciente = await Paciente.findByPk(req.params.id);
      if (!paciente) return res.status(404).json({ error: 'Paciente no encontrado' });
      await Cita.destroy({ where: { id_paciente: req.params.id } });
      await paciente.destroy();
      res.json({ mensaje: 'Paciente eliminado correctamente' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al eliminar el paciente' });
    }
  }

};

module.exports = pacienteController;