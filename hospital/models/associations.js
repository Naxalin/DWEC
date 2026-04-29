const getMedico = require('./Medico');
const getEspecialidad = require('./Especialidad');
const getCita = require('./Cita');
const getPaciente = require('./Paciente');

module.exports = () => {
  const Medico = getMedico();
  const Especialidad = getEspecialidad();
  const Cita = getCita();
  const Paciente = getPaciente();

  Especialidad.hasMany(Medico, { foreignKey: 'id_especialidad', as: 'medicos' });
  Medico.belongsTo(Especialidad, { foreignKey: 'id_especialidad', as: 'especialidad' });

  Medico.hasMany(Cita, { foreignKey: 'id_medico', as: 'citas' });
  Cita.belongsTo(Medico, { foreignKey: 'id_medico', as: 'medico' });

  Paciente.hasMany(Cita, { foreignKey: 'id_paciente', as: 'citas' });
  Cita.belongsTo(Paciente, { foreignKey: 'id_paciente', as: 'paciente' });
};