const { Router } = require('express');
const { check } = require('express-validator');

const { login, googleSignIn } = require('../controllers/auth.controller');
const { validateFields } = require('../middlewares/field-validator');

const router = Router();

router.post(
  '/login',
  [
    check('email', 'Email is required').isEmail(),
    check('password', 'Password is required').not().isEmpty(),
    validateFields,
  ],
  login
);
router.post(
  '/google',
  [check('id_token', 'Id token is required').not().isEmpty(), validateFields],
  googleSignIn
);

module.exports = router;
