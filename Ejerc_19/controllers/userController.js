const User = require('../models/user');

const register = (req, res) => {
  const { username, password, email } = req.body;
  
  User.create(username, password, email, (err) => {
    if (err) {
      return res.render('register', { error: 'El usuario o email ya existe' });
    }
    res.redirect('/login');
  });
};

const login = (req, res) => {
  const { username, password } = req.body;

  User.findByUsername(username, (err, results) => {
    if (err || results.length === 0) {
      return res.render('login', { error: 'Usuario no encontrado' });
    }

    const user = results[0];
    const md5password = require('crypto').createHash('md5').update(password).digest('hex');

    if (user.password !== md5password) {
      return res.render('login', { error: 'Contraseña incorrecta' });
    }

    req.session.user = { id: user.id, username: user.username };
    res.redirect('/dashboard');
  });
};

const logout = (req, res) => {
  req.session.destroy();
  res.redirect('/login');
};

module.exports = { register, login, logout };