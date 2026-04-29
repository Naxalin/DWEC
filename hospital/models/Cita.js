const { DataTypes } = require('sequelize');
const { getSequelize } = require('../config/db.mysql');

let Cita = null;

const getCita = () => {
  if (Cita) return Cita;

  const sequelize = getSequelize();

  Cita = sequelize.define('Cita', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    id_medico: { type: DataTypes.INTEGER, allowNull: false },
    id_paciente: { type: DataTypes.INTEGER, allowNull: false },
    fecha_hora: { type: DataTypes.DATE, allowNull: false },
    motivo: { type: DataTypes.STRING(255), allowNull: false },
    estado: {
      type: DataTypes.ENUM('Pendiente', 'Completada', 'Cancelada'),
      allowNull: false,
      defaultValue: 'Pendiente'
    }
  }, { tableName: 'citas', timestamps: false });

  const getMedico = require('./Medico');
  const getPaciente = require('./Paciente');
  const Medico = getMedico();
  const Paciente = getPaciente();

  Cita.belongsTo(Medico, { foreignKey: 'id_medico', as: 'medico' });
  Medico.hasMany(Cita, { foreignKey: 'id_medico', as: 'citas' });

  Cita.belongsTo(Paciente, { foreignKey: 'id_paciente', as: 'paciente' });
  Paciente.hasMany(Cita, { foreignKey: 'id_paciente', as: 'citas' });

  return Cita;
};

module.exports = getCita;