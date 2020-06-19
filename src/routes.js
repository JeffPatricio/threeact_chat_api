import express from 'express';
import path from 'path';
import UserController from './controllers/UserController';
import MessageController from './controllers/MessageController';
const routes = express.Router();

routes.use('/images', express.static(path.resolve(__dirname, '..', 'uploads')));
routes.post('/users', UserController.create);
routes.get('/users/:id', UserController.readEndpoint);
routes.get('/messages/:sessionId', MessageController.index);

export default routes;