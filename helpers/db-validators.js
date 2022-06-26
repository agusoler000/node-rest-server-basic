const { Category, Role, User, Product } = require('../models');

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
const categoryExistsById = async (id) => {
  const category = await Category.findById(id);
  if (!category) {
    throw new Error(`The category with ${id} id doesn't exist.`);
  }
};
const procuctExistsById = async (id) => {
  const procuct = await Product.findById(id);
  if (!procuct) {
    throw new Error(`The procuct with ${id} id doesn't exist.`);
  }
};
module.exports = {
  isRoleValid,
  existEmail,
  userExistsById,
  categoryExistsById,
  procuctExistsById,
};
