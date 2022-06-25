const { response, request } = require('express');
const bcrypt = require('bcryptjs');
const { post } = require('../routes/user.routes');
const User = require('../models/user');

const userGet = async (req = request, res = response) => {
  const { limit = 5, from = 0 } = req.query;

  const query = { state: true };

  // const users = await User.find(query).skip(Number(from)).limit(limit);

  // const total = await User.countDocuments(query);

  const [total, users] = await Promise.all([
    User.countDocuments(query),
    User.find(query).skip(Number(from)).limit(limit),
  ]);

  res.json({ total, users });
};

const userPost = async (req, res = response) => {
  const { name, email, password, role } = req.body;

  const user = new User({ name, email, password, role });

  //Encript the  password
  const salt = bcrypt.genSaltSync(10);
  user.password = bcrypt.hashSync(password, salt);

  //Saving the new User
  await user.save();
  res.json({ user });
};
const userPut = async (req, res = response) => {
  const { id } = req.params;
  const { _id, password, google, email, ...rest } = req.body;

  // TODO Validation agst ddbbs
  if (password) {
    const salt = bcrypt.genSaltSync(10);
    rest.password = bcrypt.hashSync(password, salt);
  }

  const userDb = await User.findByIdAndUpdate(id, rest);

  res.json({ userDb });
};
const userDelete = async (req, res = response) => {
  const { id } = req.params;
  /** Delete from ddbb
   *  const user = await User.findByIdAndDelete(id);
   *
   * */
  // change flag state
  const user = await User.findByIdAndUpdate(id, { state: false });
  res.json({ user });
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
