const getMedico = require('../models/Medico');
const getPaciente = require('../models/Paciente');
const getCita = require('../models/Cita');
const Valoracion = require('../models/Valoracion');
const { Op } = require('sequelize');

const dashboardController = {

  index: async (req, res) => {
    try {
      const Medico = getMedico();
      const Paciente = getPaciente();
      const Cita = getCita();

      const hoy = new Date();
      const inicioDia = new Date(hoy.getFullYear(), hoy.getMonth(), hoy.getDate(), 0, 0, 0);
      const finDia    = new Date(hoy.getFullYear(), hoy.getMonth(), hoy.getDate(), 23, 59, 59);

      const totalMedicos   = await Medico.count({ where: { estado: 'Activo' } });
      const totalPacientes = await Paciente.count();
      const totalCitas     = await Cita.count();

      const citasHoy = await Cita.count({
        where: { fecha_hora: { [Op.between]: [inicioDia, finDia] } }
      });

      const citasPendientes  = await Cita.count({ where: { estado: 'Pendiente' } });
      const citasCompletadas = await Cita.count({ where: { estado: 'Completada' } });
      const citasCanceladas  = await Cita.count({ where: { estado: 'Cancelada' } });

      const ultimasCitas = await Cita.findAll({
        limit: 5,
        order: [['fecha_hora', 'DESC']],
        include: ['medico', 'paciente']
      });

      const totalValoraciones      = await Valoracion.countDocuments();
      const valoracionesPendientes = await Valoracion.countDocuments({ estado: 'Pendiente' });

      let mediaValoraciones = 'N/A';
      if (totalValoraciones > 0) {
        const mediaResult = await Valoracion.aggregate([
          { $group: { _id: null, media: { $avg: '$puntuacion' } } }
        ]);
        if (mediaResult.length > 0) mediaValoraciones = mediaResult[0].media.toFixed(1);
      }

      res.json({
        totalMedicos,
        totalPacientes,
        totalCitas,
        citasHoy,
        citasPendientes,
        citasCompletadas,
        citasCanceladas,
        ultimasCitas,
        totalValoraciones,
        valoracionesPendientes,
        mediaValoraciones
      });

    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al cargar el dashboard' });
    }
  }

};

module.exports = dashboardController;