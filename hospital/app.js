require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');

const { sequelize } = require('./config/db.mysql');
const { connectMongo } = require('./config/db.mongo');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas API
app.use('/api/dashboard',    require('./routes/index'));
app.use('/api/medicos',      require('./routes/medicos'));
app.use('/api/pacientes',    require('./routes/pacientes'));
app.use('/api/citas',        require('./routes/citas'));
app.use('/api/valoraciones', require('./routes/valoraciones'));
app.use('/api/especialidades', require('./routes/especialidades'));
// Frontend estático
app.use(express.static(path.join(__dirname, 'public')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const PORT = process.env.PORT || 3000;

async function start() {
  try {
    await sequelize.authenticate();
    console.log('MySQL conectado');
    await connectMongo();
    app.listen(PORT, () => console.log(`Servidor en http://localhost:${PORT}`));
  } catch (err) {
    console.error('Error al arrancar:', err.message);
    process.exit(1);
  }
}

start();