const { response } = require('express');

const isAdmin = (req, res = response, next) => {
  if (!req.user) {
    res.status(500).json({
      msg: 'The role cannot be verified because the user cannot be found in the Token',
    });
  }
  const { role, name } = req.user;
  if (role !== 'ADMIN') {
    return res.status(401).json({
      msg: `The user ${name} is not allowed to do this operation.`,
    });
  }
  next();
};

const hasRole = (...roles) => {
  return (req, res = response, next) => {
    if (!req.user) {
      res.status(500).json({
        msg: 'The role cannot be verified because the user cannot be found in the Token',
      });
    }

    if (!roles.includes(req.user.role)) {
      return res
        .status(401)
        .json({ msg: `This user does not have any of these roles: ${roles}` });
    }
    next();
  };
};

module.exports = { isAdmin, hasRole };
