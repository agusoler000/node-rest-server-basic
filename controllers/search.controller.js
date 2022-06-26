const { response } = require('express');
const { ObjectId } = require('mongoose').Types;
const { User, Category, Product } = require('../models');

const collectionsAllowed = ['users', 'products', 'categories', 'roles'];

const searchUsers = async (term = '', res = response) => {
  const isMongoId = ObjectId.isValid(term);

  if (isMongoId) {
    const user = await User.findById(term);
    const total = await User.countDocuments({ _id: term });
    return res.json({ total, results: user ? [user] : [] });
  }
  const regex = new RegExp(term, 'i');
  const users = await User.find({
    $or: [{ name: regex }, { email: regex }],
    $and: [{ state: true }],
  });
  const count = await User.countDocuments({
    $or: [{ name: regex }, { email: regex }],
    $and: [{ state: true }],
  });
  return res.json({ total: count, results: users ? [users] : [] });
};
const searchCategories = async (term = '', res = response) => {
  const isMongoId = ObjectId.isValid(term);

  if (isMongoId) {
    const categories = await Category.findById(term);
    const total = await Category.countDocuments({ _id: term });
    return res.json({ total, results: categories ? [categories] : [] });
  }
  const regex = new RegExp(term, 'i');
  const categories = await Category.find({ name: regex });
  const count = await User.countDocuments({ name: regex });
  return res.json({ total: count, results: categories ? [categories] : [] });
};
const searchProducts = async (term = '', res = response) => {
  const isMongoId = ObjectId.isValid(term);

  if (isMongoId) {
    const product = await Product.findById(term);
    const total = await Product.countDocuments({ _id: term });
    return res.json({ total, results: product ? [product] : [] });
  }
  const regex = new RegExp(term, 'i');
  const products = await Product.find({
    $or: [{ name: regex }, { description: regex }],
    $and: [{ state: true }],
  });
  const count = await Product.countDocuments({
    $or: [{ name: regex }, { description: regex }],
    $and: [{ state: true }],
  });
  return res.json({ total: count, results: products ? [products] : [] });
};

const search = (req, res = response) => {
  const { collection, term } = req.params;
  if (!collectionsAllowed.includes(collection)) {
    return res.status(400).json({
      msg: `Collections allowed are ${collectionsAllowed}`,
    });
  }

  switch (collection) {
    case 'users':
      searchUsers(term, res);
      break;

    case 'products':
      searchProducts(term, res);
      break;

    case 'categories':
      searchCategories(term, res);
      break;

    // case 'roles':

    //     break;

    default:
      return res.status(500).json({ msg: 'No collection avaiable.' });
  }
};

module.exports = {
  search,
};
