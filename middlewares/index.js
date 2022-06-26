const validateFields = require('../middlewares/field-validator');
const validateJWT = require('../middlewares/validate-jwt-middleware');
const validateRoles = require('../middlewares/validate-roles');

module.exports = {
  ...validateFields,
  ...validateJWT,
  ...validateRoles,
};
