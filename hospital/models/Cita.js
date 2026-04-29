const { DataTypes } = require('sequelize');
const { getSequelize } = require('../config/db.mysql');

const defineCita = () => {
  const sequelize = getSequelize();

  return sequelize.define('Cita', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    id_medico: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    id_paciente: {
      type: DataTypes.INTEGER,
      allowNull: false
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
};

module.exports = defineCita;