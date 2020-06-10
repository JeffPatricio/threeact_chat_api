import server from './app';
import UserController from './controllers/UserController';
import MessageController from './controllers/MessageController';
const io = require('socket.io').listen(server);

io.on('connection', async (socket) => {

  const { id_user } = socket.handshake.query;

  socket.join('messages/0');
  socket.join(`messages/${id_user}`);

  const listUsers = await UserController.index();
  socket.emit('listUsers', listUsers);

  socket.on('sendMessage', async (data) => {
    const messageCreated = await MessageController.create(data);
    if (messageCreated) socket.to(`messages/${data.id_receiver}`).emit('newMessage', messageCreated);
  });

});
