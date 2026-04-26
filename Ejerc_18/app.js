require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const path = require('path');
const fs = require('fs');
const libroRoutes = require('./routes/libroRoutes');

const app = express();

const isVercel = process.env.VERCEL === '1';

if (!isVercel) {
  const logDir = path.join(__dirname, 'logs');
  if (!fs.existsSync(logDir)) fs.mkdirSync(logDir);
  const logStream = fs.createWriteStream(
    path.join(logDir, 'access.log'),
    { flags: 'a' }
  );
  app.use(morgan('combined', { stream: logStream }));
} else {
  app.use(morgan('combined'));
}

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', libroRoutes);

app.get('(.*)', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

module.exports = app;