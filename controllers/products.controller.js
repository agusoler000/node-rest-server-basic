const { response, request } = require('express');
const { Product } = require('../models');

const getProducts = async (req = request, res = response) => {
  try {
    const { limit = 5 } = req.query;
    const query = { state: true };
    const [products, total] = await Promise.all([
      Product.find(query).limit(limit).populate('user').populate('category'),
      Product.countDocuments(query),
    ]);
    res.status(201).json({
      total,
      products,
    });
  } catch (error) {
    res.status(400).json({
      msg: 'Error getting  products',
      error,
    });
  }
};

const getProductById = async (req = request, res = response) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id)
      .populate('user')
      .populate('category');
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({
      msg: 'Error getting  the product by id',
      error,
    });
  }
};

const updateProduct = async (req = request, res = response) => {
  try {
    const { id } = req.params;
    const { user, state, ...rest } = req.body;
    rest.user = req.user._id;
    const productUpdate = await Product.findByIdAndUpdate(id, rest, {
      new: true,
    });

    res.status(201).json(productUpdate);
  } catch (error) {
    res.status(400).json({
      msg: 'Error updating the product',
      error,
    });
  }
};

const deleteProduct = async (req = request, res = response) => {
  try {
    const { id } = req.params;
    const productUpdate = await Product.findByIdAndUpdate(
      id,
      { state: false },
      {
        new: true,
      }
    );

    res.status(201).json(productUpdate);
  } catch (error) {
    res.status(400).json({
      msg: 'Error updating the product',
      error,
    });
  }
};

const addProduct = async (req = request, res = response) => {
  try {
    const { name, price, description, stock, category } = req.body;

    const productDb = await Product.findOne({ name });
    if (productDb) {
      return res.status(400).json({
        mgs: `Product ${productDb.name} already exists`,
      });
    }

    const data = {
      name,
      price,
      description,
      stock,
      category,
      user: req.user._id,
    };
    const product = new Product(data);
    product.save();
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({
      msg: 'Error creating the product',
      error,
    });
  }
};

module.exports = {
  addProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
