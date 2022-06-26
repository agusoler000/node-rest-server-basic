const { Router } = require('express');
const { check } = require('express-validator');

const {
  isRoleValid,
  existEmail,
  userExistsById,
} = require('../helpers/db-validators');

const {
  validateFields,
  validateJWT,
  isAdmin,
  hasRole,
} = require('../middlewares');

const {
  userGet,
  userPost,
  userDelete,
  userPatch,
  userPut,
} = require('../controllers/user.controller');

const router = Router();

router.get('/', userGet);
router.put(
  '/:id',
  [
    check('id', 'The id is not valid').isMongoId(),
    check('id').custom(userExistsById),
    validateFields,
  ],
  userPut
);
router.post(
  '/',
  [
    check('name', 'Name is required').not().isEmpty(),
    check(
      'password',
      'Password is required and it have to be longer than 6'
    ).isLength({ min: 6 }),
    check('email', 'The email is not valid').isEmail(),
    check('email').custom(existEmail),
    // check('role', 'This role is not allowed').isIn([
    //   'ADMIN',
    //   'REGULARUSER',
    //   'SUPERUSER',
    // ]),
    check('role').custom(isRoleValid),
    validateFields,
  ],
  userPost
);
router.delete(
  '/:id',
  [
    validateJWT,
    // isAdmin,
    hasRole('ADMIN'),
    check('id', 'The id is not valid').isMongoId(),
    check('id').custom(userExistsById),
    validateFields,
  ],
  userDelete
);
router.patch('/', userPatch);

module.exports = router;
