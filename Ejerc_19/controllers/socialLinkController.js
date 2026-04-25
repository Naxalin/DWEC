const SocialLink = require('../models/social_link');

const create = (req, res) => {
  const { platform, url } = req.body;
  const user_id = req.session.user.id;

  SocialLink.create(platform, url, user_id, (err) => {
    if (err) return res.redirect('/dashboard');
    res.redirect('/dashboard');
  });
};

const remove = (req, res) => {
  const { id } = req.params;
  const user_id = req.session.user.id;

  SocialLink.delete(id, user_id, (err) => {
    if (err) return res.redirect('/dashboard');
    res.redirect('/dashboard');
  });
};

module.exports = { create, remove };