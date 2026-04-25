const express = require('express');
const router = express.Router();
const { isAuthenticated } = require('../middleware/auth');
const User = require('../models/user');
const Project = require('../models/project');
const SocialLink = require('../models/social_link');
const projectController = require('../controllers/projectController');
const socialLinkController = require('../controllers/socialLinkController');

// Dashboard principal
router.get('/', isAuthenticated, (req, res) => {
  const user_id = req.session.user.id;

  User.findById(user_id, (err, results) => {
    const user = results[0];

    Project.getAllByUser(user_id, (err, projects) => {
      if (err) projects = [];

      SocialLink.getAllByUser(user_id, (err, links) => {
        if (err) links = [];

        res.render('dashboard', { user, projects, links, error: null });
      });
    });
  });
});

// Actualizar perfil
router.post('/profile', isAuthenticated, (req, res) => {
  const { bio, email } = req.body;
  const user_id = req.session.user.id;

  User.update(user_id, bio, email, (err) => {
    res.redirect('/dashboard');
  });
});

// Proyectos
router.post('/projects', isAuthenticated, projectController.create);
router.post('/projects/:id/edit', isAuthenticated, projectController.update);
router.post('/projects/:id/delete', isAuthenticated, projectController.remove);

// Enlaces sociales
router.post('/links', isAuthenticated, socialLinkController.create);
router.post('/links/:id/delete', isAuthenticated, socialLinkController.remove);

module.exports = router;