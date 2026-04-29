const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db.mysql');
const Medico = require('./Medico');
const Paciente = require('./Paciente');

const Cita = sequelize.define('Cita', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  id_medico: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'medicos',
      key: 'id'
    }
  },
  id_paciente: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'pacientes',
      key: 'id'
    }
  },
  fecha_hora: {
    type: DataTypes.DATE,
    allowNull: false
  },
  motivo: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  estado: {
    type: DataTypes.ENUM('Pendiente', 'Completada', 'Cancelada'),
    allowNull: false,
    defaultValue: 'Pendiente'
  }
}, {
  tableName: 'citas',
  timestamps: false
});

Cita.belongsTo(Medico,   { foreignKey: 'id_medico',   as: 'medico' });
Cita.belongsTo(Paciente, { foreignKey: 'id_paciente', as: 'paciente' });
Medico.hasMany(Cita,     { foreignKey: 'id_medico',   as: 'citas' });
Paciente.hasMany(Cita,   { foreignKey: 'id_paciente', as: 'citas' });

module.exports = Cita;