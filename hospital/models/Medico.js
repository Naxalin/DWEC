const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db.mysql');
const Especialidad = require('./Especialidad');

const Medico = sequelize.define('Medico', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  id_especialidad: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'especialidades',
      key: 'id'
    }
  },
  nombre: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  apellidos: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  email: {
    type: DataTypes.STRING(150),
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  telefono: {
    type: DataTypes.STRING(20),
    allowNull: true
  },
  estado: {
    type: DataTypes.ENUM('Activo', 'Inactivo'),
    allowNull: false,
    defaultValue: 'Activo'
  }
}, {
  tableName: 'medicos',
  timestamps: false
});

Medico.belongsTo(Especialidad, { foreignKey: 'id_especialidad', as: 'especialidad' });
Especialidad.hasMany(Medico, { foreignKey: 'id_especialidad', as: 'medicos' });

module.exports = Medico;