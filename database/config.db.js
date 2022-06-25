const mongoose = require('mongoose');

const dbConection = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_CNN);

    console.log('DDBB online');
  } catch (error) {
    console.log(error);
    throw new Error('Error while trying to inizialite the bbdd');
  }
};

module.exports = {
  dbConection,
};
