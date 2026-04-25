require('dotenv').config();
const express = require('express');
const session = require('express-session');
const app = express();

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(session({
  secret: process.env.SESSION_SECRET || 'secreto123',
  resave: false,
  saveUninitialized: false
}));

// Motor de vistas
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

// Rutas
app.use('/register', require('./routes/register'));
app.use('/login', require('./routes/login'));
app.use('/portfolio', require('./routes/portfolio'));
app.use('/dashboard', require('./routes/dashboard'));

// Ruta raíz
app.get('/', (req, res) => res.redirect('/login'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));

module.exports = app;