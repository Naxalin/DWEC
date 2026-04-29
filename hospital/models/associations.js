const Medico = require('./Medico');
const Especialidad = require('./Especialidad');

Especialidad.hasMany(Medico, { foreignKey: 'id_especialidad', as: 'medicos' });
Medico.belongsTo(Especialidad, { foreignKey: 'id_especialidad', as: 'especialidad' });

module.exports = {};