const Medico = require('./Medico')();
const Paciente = require('./Paciente')();
const Cita = require('./Cita')();

Cita.belongsTo(Medico, { foreignKey: 'id_medico', as: 'medico' });
Cita.belongsTo(Paciente, { foreignKey: 'id_paciente', as: 'paciente' });

Medico.hasMany(Cita, { foreignKey: 'id_medico', as: 'citas' });
Paciente.hasMany(Cita, { foreignKey: 'id_paciente', as: 'citas' });

module.exports = {};