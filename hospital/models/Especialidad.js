const { DataTypes } = require('sequelize');
const { getSequelize } = require('../config/db.mysql');

const defineEspecialidad = () => {
  const sequelize = getSequelize();

  return sequelize.define('Especialidad', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nombre: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    descripcion: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    tableName: 'especialidades',
    timestamps: false
  });
};

module.exports = defineEspecialidad;