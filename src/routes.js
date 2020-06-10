import express from 'express';
import path from 'path';
import UserController from './controllers/UserController';
const routes = express.Router();

routes.use('/images', express.static(path.resolve(__dirname, '..', 'uploads')));
routes.post('/users', UserController.create);

export default routes;