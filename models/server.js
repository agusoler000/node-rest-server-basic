const express = require('express');
const cors = require('cors');

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.usersPath = '/api/users';

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
    this.app.use(this.usersPath, require('../routes/user.routes'));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log('Corriendo en', this.port);
    });
  }
}

module.exports = Server;
