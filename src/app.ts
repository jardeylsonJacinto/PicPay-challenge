import express from 'express';
import router from './routes/userRoutes';
require('dotenv').config();

class App {
  app: express.Application;
  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
  }
  middlewares() {
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
  }
  routes() {
    this.app.use('/', router);
  }
}

export default new App().app;
