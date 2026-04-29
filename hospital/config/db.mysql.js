const { Sequelize } = require('sequelize');
require('dotenv').config();

let sequelize = null;

const getSequelize = () => {
  if (!sequelize) {
    sequelize = new Sequelize(
      process.env.DB_NAME,
      process.env.DB_USER,
      process.env.DB_PASSWORD,
      {
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT || 3306),
        dialect: 'mysql',
        logging: false,
        pool: {
          max: 1,
          min: 0,
          acquire: 30000,
          idle: 10000
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
    console.error('❌ Error MySQL:', error.message);
    return null;
  }
};

module.exports = { getSequelize, connectMySQL };