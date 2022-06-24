const { response, request } = require('express');
const { post } = require('../routes/user.routes');

const userGet = (req = request, res = response) => {
  const query = req.query;
  res.json({ msg: 'method get -controller', query });
};

const userPost = (req, res = response) => {
  const { nombre, edad } = req.body;

  res.json({ msg: 'method Post-controller', nombre, edad });
};
const userPut = (req, res = response) => {
  const { id } = req.params;
  res.json({ msg: 'method Put-controller', id });
};
const userDelete = (req, res = response) => {
  res.json({ msg: 'method Delete-controller' });
};
const userPatch = (req, res = response) => {
  res.json({ msg: 'method  Patch-controller' });
};

module.exports = {
  userGet,
  userPost,
  userPut,
  userDelete,
  userPatch,
};
