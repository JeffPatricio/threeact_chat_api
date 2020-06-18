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
  const usersFiltered = listUsers.filter(user => `${user.id}` !== `${id_user}`);

  for (let i = 0; i < usersFiltered.length; i++) {
    const count = await MessageController.countNotRead(usersFiltered[i].id, id_user);
    usersFiltered[i].notReadCount = count[0]['count(*)'];
  }

  socket.emit('listUsers', usersFiltered);
  const userLogged = await UserController.read(id_user);
  socket.to('general').emit('logonUser', id_user);

  socket.on('sendMessage', async (data) => {
    const messageCreated = await MessageController.create(data);
    if (messageCreated && data.id_receiver == 0) io.in('messages/0').emit('newMessage', messageCreated);
    if (messageCreated && data.id_receiver != 0) {
      socket.to(`messages/${data.id_receiver}`).emit('newMessage', messageCreated);
      socket.emit('newMessage', messageCreated);
    }
  });

  socket.on('readMessages', async ({ id_sender }) => {
    await MessageController.markRead(id_sender, id_user);
  });

  socket.on('disconnect', async () => {
    socket.to('general').emit('logoffUser', id_user);
    await UserController.setOffline(id_user);
  });
});
