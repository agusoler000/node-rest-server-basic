const { response } = require('express');
const bcrypt = require('bcryptjs');

const User = require('../models/user');
const { use } = require('../routes/auth.routes');
const { generateJWT } = require('../helpers/generate-jwt');

const login = async (req, res = response) => {
  try {
    const { email, password } = req.body;

    // Verify if email exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        msg: 'An user with this email does not exist.',
      });
    }
    // State = true

    if (user.state === false) {
      return res.status(400).json({
        msg: 'User has been deleted',
      });
    }

    // verify password

    const isPasswordValid = bcrypt.compareSync(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({
        msg: 'Password incorrect',
      });
    }

    // Generate JWT

    const token = await generateJWT(user.id);

    res.json({
      user,
      token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: 'Something went wrong',
    });
  }
};

module.exports = {
  login,
};
