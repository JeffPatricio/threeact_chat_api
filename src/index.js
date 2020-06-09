import server from './app';
import UserController from './controllers/UserController';

const io = require('socket.io').listen(server);

io.on('connection', async (socket) => {
  console.log('New client connected ', socket.id);
  const listUsers = await UserController.index();
  socket.emit('listUsers', listUsers);
});