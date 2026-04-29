require('dotenv').config();

const { getSequelize, connectMySQL } = require('./config/db.mysql');
const { connectMongo } = require('./config/db.mongo');

getSequelize();

const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/dashboard',    require('./routes/index'));
app.use('/api/medicos',      require('./routes/medicos'));
app.use('/api/pacientes',    require('./routes/pacientes'));
app.use('/api/citas',        require('./routes/citas'));
app.use('/api/valoraciones', require('./routes/valoraciones'));
app.use('/api/especialidades', require('./routes/especialidades'));

app.use(express.static(path.join(__dirname, 'public')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

connectMySQL().catch(console.error);
connectMongo().catch(console.error);

module.exports = app;