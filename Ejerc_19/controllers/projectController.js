const Project = require('../models/project');

const create = (req, res) => {
  const { title, description, repo_url, live_url } = req.body;
  const user_id = req.session.user.id;

  Project.create(title, description, repo_url, live_url, user_id, (err) => {
    if (err) return res.redirect('/dashboard');
    res.redirect('/dashboard');
  });
};

const update = (req, res) => {
  const { title, description, repo_url, live_url } = req.body;
  const { id } = req.params;
  const user_id = req.session.user.id;

  Project.update(id, title, description, repo_url, live_url, user_id, (err) => {
    if (err) return res.redirect('/dashboard');
    res.redirect('/dashboard');
  });
};

const remove = (req, res) => {
  const { id } = req.params;
  const user_id = req.session.user.id;

  Project.delete(id, user_id, (err) => {
    if (err) return res.redirect('/dashboard');
    res.redirect('/dashboard');
  });
};

module.exports = { create, update, remove };