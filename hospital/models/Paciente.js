const { DataTypes } = require('sequelize');
const { getSequelize } = require('../config/db.mysql');

let Paciente = null;

const getPaciente = () => {
  if (Paciente) return Paciente;

  const sequelize = getSequelize();

  Paciente = sequelize.define('Paciente', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
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
      validate: { isEmail: true }
    },
    telefono: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    fecha_nacimiento: {
      type: DataTypes.DATEONLY,
      allowNull: true
    }
  }, {
    tableName: 'pacientes',
    timestamps: false
  });

  return Paciente;
};

module.exports = getPaciente;