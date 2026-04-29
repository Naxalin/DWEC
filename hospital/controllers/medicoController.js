const Medico = require('../models/Medico');
const Especialidad = require('../models/Especialidad');
const Cita = require('../models/Cita');
const { Op } = require('sequelize');

const medicoController = {

  index: async (req, res) => {
    try {
      const { especialidad, estado, buscar } = req.query;
      const where = {};

      if (estado) where.estado = estado;
      if (especialidad) where.id_especialidad = especialidad;

      if (buscar) {
        where[Op.or] = [
          { nombre: { [Op.like]: `%${buscar}%` } },
          { apellidos: { [Op.like]: `%${buscar}%` } },
          { email: { [Op.like]: `%${buscar}%` } }
        ];
      }

      const medicos = await Medico.findAll({
        where,
        include: ['especialidad'],
        order: [['apellidos', 'ASC']]
      });

      res.json(medicos);

    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al cargar los médicos' });
    }
  },

  show: async (req, res) => {
    try {
      const medico = await Medico.findByPk(req.params.id, {
        include: ['especialidad', { association: 'citas', include: ['paciente'] }]
      });

      if (!medico) {
        return res.status(404).json({ error: 'Médico no encontrado' });
      }

      res.json(medico);

    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al cargar el médico' });
    }
  },

  crear: async (req, res) => {
    try {
      const medico = await Medico.create(req.body);
      res.status(201).json(medico);

    } catch (error) {
      console.error(error);

      const msg =
        error.name === 'SequelizeUniqueConstraintError'
          ? 'Ya existe un médico con ese email'
          : 'Error al crear el médico';

      res.status(500).json({ error: msg });
    }
  },

  actualizar: async (req, res) => {
    try {
      const medico = await Medico.findByPk(req.params.id);

      if (!medico) {
        return res.status(404).json({ error: 'Médico no encontrado' });
      }

      await medico.update(req.body);

      res.json(medico);

    } catch (error) {
      console.error(error);

      const msg =
        error.name === 'SequelizeUniqueConstraintError'
          ? 'Ya existe un médico con ese email'
          : 'Error al actualizar el médico';

      res.status(500).json({ error: msg });
    }
  },

  eliminar: async (req, res) => {
    try {
      const medico = await Medico.findByPk(req.params.id);

      if (!medico) {
        return res.status(404).json({ error: 'Médico no encontrado' });
      }

      await Cita.destroy({ where: { id_medico: req.params.id } });
      await medico.destroy();

      res.json({ mensaje: 'Médico eliminado correctamente' });

    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al eliminar el médico' });
    }
  },

  especialidades: async (req, res) => {
    try {
      const especialidades = await Especialidad.findAll({
        order: [['nombre', 'ASC']]
      });

      res.json(especialidades);

    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al cargar las especialidades' });
    }
  }
};

module.exports = medicoController;