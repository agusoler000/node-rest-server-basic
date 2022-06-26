const jwt = require('jsonwebtoken');

const generateJWT = (uid) => {
  return new Promise((resolve, reject) => {
    const payload = {
      uid,
      today: new Date(),
    };

    jwt.sign(
      payload,
      process.env.SECRETJWTKEY,
      { expiresIn: '4h' },
      (err, token) => {
        if (err) {
          console.log(err);
          reject('The token could not be generated');
        } else {
          resolve(token);
        }
      }
    );
  });
};

module.exports = {
  generateJWT,
};
