const { Sequelize } = require('sequelize');
require('dotenv').config();

let sequelize;

const getSequelize = () => {
  if (!sequelize) {
    sequelize = new Sequelize(
      process.env.DB_NAME,
      process.env.DB_USER,
      process.env.DB_PASSWORD,
      {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT || 3306,
        dialect: 'mysql',
        logging: false,
        define: {
          timestamps: false
        }
      }
    );
  }
  return sequelize;
};

const connectMySQL = async () => {
  try {
    const db = getSequelize();
    await db.authenticate();
    console.log('✅ MySQL conectado correctamente');
    return db;
  } catch (error) {
    console.error('❌ Error al conectar MySQL:', error.message);
    return null;
  }
};

module.exports = { getSequelize, connectMySQL };