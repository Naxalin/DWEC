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
  }

};

module.exports = pacienteController;