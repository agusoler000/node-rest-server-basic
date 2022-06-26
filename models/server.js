const express = require('express');
const cors = require('cors');
const { dbConection } = require('../database/config.db');

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;

    this.paths = {
      auth: '/api/auth',
      user: '/api/users',
      categories: '/api/categories',
      products: '/api/products',
      search: '/api/search',
    };

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
    this.app.use(this.paths.auth, require('../routes/auth.routes'));
    this.app.use(this.paths.user, require('../routes/user.routes'));
    this.app.use(this.paths.products, require('../routes/products.routes'));
    this.app.use(this.paths.search, require('../routes/search.routes'));
    this.app.use(this.paths.categories, require('../routes/categories.routes'));
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
