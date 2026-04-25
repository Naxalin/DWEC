const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Project = require('../models/project');
const SocialLink = require('../models/social_link');

router.get('/:username', (req, res) => {
  const { username } = req.params;

  User.findByUsername(username, (err, results) => {
    if (err || results.length === 0) {
      return res.status(404).send('Usuario no encontrado');
    }

    const user = results[0];

    Project.getAllByUser(user.id, (err, projects) => {
      if (err) projects = [];

      SocialLink.getAllByUser(user.id, (err, links) => {
        if (err) links = [];

        const isOwner = req.session.user && req.session.user.id === user.id;

        res.render('portfolio', { user, projects, links, isOwner });
      });
    });
  });
});

module.exports = router;