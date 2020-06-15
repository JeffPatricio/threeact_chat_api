import server from './app';
import UserController from './controllers/UserController';
import MessageController from './controllers/MessageController';
const io = require('socket.io').listen(server);

io.on('connection', async (socket) => {

  const { id_user } = socket.handshake.query;

  socket.join('general');
  socket.join('messages/0');
  socket.join(`messages/${id_user}`);

  await UserController.setOnline(id_user);

  const listUsers = await UserController.index(id_user);
  socket.emit('listUsers', listUsers);

  const userLogged = await UserController.read(id_user);
  socket.to('general').emit('logonUser', userLogged[0]);

  socket.on('sendMessage', async (data) => {
    const messageCreated = await MessageController.create(data);
    if (messageCreated) io.in(`messages/${data.id_receiver}`).emit('newMessage', messageCreated);
  });

  socket.on('disconnect', async () => {
    socket.to('general').emit('logoffUser', { ...userLogged[0], online: false });
    await UserController.setOffline(id_user);
  });

});
