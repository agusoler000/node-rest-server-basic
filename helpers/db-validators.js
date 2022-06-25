const Role = require('../models/role');
const User = require('../models/user');

const isRoleValid = async (role = '') => {
  const roleExists = await Role.findOne({ role });
  if (!roleExists) {
    throw new Error(`This role (${role}) is not allowed or it does not exist`);
  }
};

const existEmail = async (email = '') => {
  const existEmail = await User.findOne({ email });
  if (existEmail) {
    throw new Error(`This email (${email}) is already in use`);
  }
};
const userExistsById = async (id) => {
  const user = await User.findById(id);
  if (!user) {
    throw new Error(`The user with ${id} id doesn't exist.`);
  }
};
module.exports = {
  isRoleValid,
  existEmail,
  userExistsById,
};
