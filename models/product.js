const { Schema, model } = require('mongoose');

const ProductSchema = Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
  },
  state: {
    type: Boolean,
    default: true,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  price: {
    type: Number,
    default: 0,
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
    required: true,
  },
  description: {
    type: String,
  },
  stock: {
    type: Boolean,
    default: true,
  },
});

module.exports = model('Product', ProductSchema);
