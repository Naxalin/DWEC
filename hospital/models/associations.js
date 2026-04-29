const getMedico = require('./Medico');
const getEspecialidad = require('./Especialidad');
const getCita = require('./Cita');

module.exports = (sequelize) => {

  const Medico = getMedico();
  const Especialidad = getEspecialidad();
  const Cita = getCita();

  Especialidad.hasMany(Medico, { foreignKey: 'id_especialidad', as: 'medicos' });
  Medico.belongsTo(Especialidad, { foreignKey: 'id_especialidad', as: 'especialidad' });

  Medico.hasMany(Cita, { foreignKey: 'id_medico', as: 'citas' });
  Cita.belongsTo(Medico, { foreignKey: 'id_medico', as: 'medico' });
};