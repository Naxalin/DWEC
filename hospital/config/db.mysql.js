const { Sequelize } = require('sequelize');
require('dotenv').config();
 
const sequelize = new Sequelize(
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
 
const connectMySQL = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ MySQL conectado correctamente');
  } catch (error) {
    console.error('❌ Error al conectar MySQL:', error.message);
    process.exit(1);
  }
};
 
module.exports = { sequelize, connectMySQL };
 