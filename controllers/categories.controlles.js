const { response, request } = require('express');
const { Category } = require('../models');

/**
 * Paged - total - populate
 */
const getCategories = async (req = request, res = response) => {
  try {
    const { limit = 5 } = req.query;
    const query = { state: true };
    const [count, categories] = await Promise.all([
      Category.countDocuments(query),
      Category.find(query).limit(limit),
    ]);

    res.status(201).json({
      categories,
      count,
    });
  } catch (error) {
    res.status(400).json({
      msg: 'Error getting categories',
      error,
    });
  }
};
/**
 * Populate
 */
const getCategoryById = async (req = request, res = response) => {
  const { id } = req.params;

  const category = await Category.findById(id).populate('user');
  if (!category) {
    return res.status(400).json({
      mgs: `Category with id: ${id} does not exists`,
    });
  }

  res.status(200).json({
    category,
  });
};
/**
 * The name
 */
const updateCategory = async (req = request, res = response) => {
  try {
    const { id } = req.params;
    let { state, user, ...body } = req.body;
    body.name = body.name.toUpperCase();

    body.user = req.user._id;
    const categoryDB = await Category.findById(id);

    if (!categoryDB) {
      return res.status(400).json({
        msg: 'The category does not exist',
      });
    }
    if (categoryDB.name === body.name) {
      return res.status(400).json({
        msg: 'The name is the same',
      });
    }

    const categoryUpdate = await Category.findByIdAndUpdate(id, body, {
      new: true,
    });

    res.status(200).json(categoryUpdate);
  } catch (error) {
    res.status(400).json({
      msg: 'Error updating the category',
      error,
    });
  }
};
/**
 * State to false
 */
const deleteCategory = async (req = request, res = response) => {
  const { id } = req.params;

  const deleteCategory = await Category.findByIdAndUpdate(id, { state: false });
  res.status(200).json({ msg: 'deleted', deleteCategory });
};

const addCategory = async (req, res = response) => {
  const name = req.body.name.toUpperCase();

  const categoryDB = await Category.findOne({ name });
  if (categoryDB) {
    return res.status(400).json({
      mgs: `Category ${categoryDB.name} already exists`,
    });
  }

  // Generate data for saving

  const data = {
    name,
    user: req.user._id,
  };

  const category = new Category(data);
  await category.save();

  res.status(201).json(category);
};

module.exports = {
  addCategory,
  getCategoryById,
  getCategories,
  updateCategory,
  deleteCategory,
};
