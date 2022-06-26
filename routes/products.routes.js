const { Router } = require('express');
const { check } = require('express-validator');
const {
  addProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} = require('../controllers/products.controller');

const {
  procuctExistsById,
  categoryExistsById,
} = require('../helpers/db-validators');
const {
  validateFields,
  validateJWT,
  hasRole,
  isAdmin,
} = require('../middlewares');

const router = Router();
/**
 * get all products
 */
router.get('/', [], getProducts);
router.post(
  '/',
  [
    validateJWT,
    check('name', 'Name is required').not().isEmpty(),
    check('category', 'Category is required').not().isEmpty(),
    check('category', 'Category is is not correct').isMongoId(),
    check('category').custom(categoryExistsById),
    validateFields,
  ],
  addProduct
);
/**
 * @Param id
 * get by Id -- ID EXISTE product
 */
router.get(
  '/:id',
  [
    check('id', 'The id is not valid').isMongoId(),
    check('id').custom(procuctExistsById),
    validateFields,
  ],
  getProductById
);

/**
 * Private create product- any with a valid token
 */

/**
 * Private udpate product - any with a valid token
 */
router.put(
  '/:id',
  [
    validateJWT,
    check('id', 'The id is not valid').isMongoId(),
    check('id').custom(procuctExistsById),
    validateFields,
  ],
  updateProduct
);
/**
 * Private delete product - only admn
 */
router.delete(
  '/:id',
  [
    validateJWT,
    isAdmin,
    check('id', 'The id is not valid').isMongoId(),
    check('id').custom(procuctExistsById),
    validateFields,
  ],
  deleteProduct
);

module.exports = router;
