const { Router } = require('express');
const { check } = require('express-validator');
const {
  addCategory,
  getCategoryById,
  getCategories,
  updateCategory,
  deleteCategory,
} = require('../controllers/categories.controlles');
const { categoryExistsById } = require('../helpers/db-validators');
const {
  validateFields,
  validateJWT,
  hasRole,
  isAdmin,
} = require('../middlewares');

const router = Router();
/**
 * get all categories
 */
router.get('/', [], getCategories);

/**
 * @Param id
 * get by Id -- ID EXISTE CATEGORY
 */
router.get(
  '/:id',
  [
    check('id', 'The id is not valid').isMongoId(),
    check('id').custom(categoryExistsById),
    validateFields,
  ],
  getCategoryById
);

/**
 * Private create category- any with a valid token
 */
router.post(
  '/',
  [
    validateJWT,
    check('name', 'Name is required').not().isEmpty(),
    validateFields,
  ],
  addCategory
);

/**
 * Private udpate category - any with a valid token
 */
router.put(
  '/:id',
  [
    validateJWT,
    check('id', 'The id is not valid').isMongoId(),
    check('id').custom(categoryExistsById),
    check('name', 'Name is required').not().isEmpty(),
    validateFields,
  ],
  updateCategory
);
/**
 * Private delete category - only admn
 */
router.delete(
  '/:id',
  [
    validateJWT,
    isAdmin,
    check('id', 'The id is not valid').isMongoId(),
    check('id').custom(categoryExistsById),
    validateFields,
  ],
  deleteCategory
);

module.exports = router;
