const express = require('express');
const cors = require('cors');
const { dbConection } = require('../database/config.db');

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.usersPath = '/api/users';
    this.authPath = '/api/auth';
    //DDBB Conection
    this.dataBaseConection();
    // Middlewares--
    this.middlewares();
    // Routes of the app
    this.routes();
  }

  middlewares() {
    // Cors
    this.app.use(cors());

    // Lectura y parseo del body

    this.app.use(express.json());

    // Directorio public
    this.app.use(express.static('public'));
  }

  routes() {
    this.app.use(this.authPath, require('../routes/auth.routes'));
    this.app.use(this.usersPath, require('../routes/user.routes'));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log('Corriendo en', this.port);
    });
  }

  async dataBaseConection() {
    await dbConection();
  }
}

module.exports = Server;
