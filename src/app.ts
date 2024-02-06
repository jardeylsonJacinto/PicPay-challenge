import bodyParser from 'body-parser';
import express from 'express';
import merchantRoutes from './routes/merchantRoutes';
import userRoutes from './routes/userRoutes';

require('dotenv').config();

class App {
  app: express.Application;
  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
  }
  middlewares() {
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use(bodyParser.json());
  }
  routes() {
    this.app.use('/user', userRoutes);
    this.app.use('/merchant', merchantRoutes);
  }
}

export default new App().app;
