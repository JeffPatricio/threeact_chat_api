import express from 'express';
const routes = express.Router();

routes.get('/', (_, res) => res.json({ success: true, message: 'Server running' }));

export default routes;