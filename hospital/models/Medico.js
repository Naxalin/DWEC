const { DataTypes } = require('sequelize');
const { getSequelize } = require('../config/db.mysql');

let Medico = null;

const getMedico = () => {
  if (Medico) return Medico;

  const sequelize = getSequelize();

  Medico = sequelize.define('Medico', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    id_especialidad: { type: DataTypes.INTEGER, allowNull: false },
    nombre: { type: DataTypes.STRING(100), allowNull: false },
    apellidos: { type: DataTypes.STRING(100), allowNull: false },
    email: { type: DataTypes.STRING(150), allowNull: false, unique: true, validate: { isEmail: true } },
    telefono: { type: DataTypes.STRING(20), allowNull: true },
    estado: { type: DataTypes.ENUM('Activo', 'Inactivo'), allowNull: false, defaultValue: 'Activo' }
  }, { tableName: 'medicos', timestamps: false });

  const getEspecialidad = require('./Especialidad');
  const Especialidad = getEspecialidad();

  Medico.belongsTo(Especialidad, { foreignKey: 'id_especialidad', as: 'especialidad' });
  Especialidad.hasMany(Medico, { foreignKey: 'id_especialidad', as: 'medicos' });

  return Medico;
};

module.exports = getMedico;