const { getSequelize } = require('../config/db.mysql');

const sequelize = getSequelize();

const Medico = require('./Medico')(sequelize);
const Especialidad = require('./Especialidad')(sequelize);
const Cita = require('./Cita')(sequelize);

Especialidad.hasMany(Medico, { foreignKey: 'id_especialidad', as: 'medicos' });
Medico.belongsTo(Especialidad, { foreignKey: 'id_especialidad', as: 'especialidad' });

Medico.hasMany(Cita, { foreignKey: 'id_medico', as: 'citas' });
Cita.belongsTo(Medico, { foreignKey: 'id_medico', as: 'medico' });

module.exports = {
  sequelize,
  Medico,
  Especialidad,
  Cita
};