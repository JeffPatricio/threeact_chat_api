import server from './app';
import UserController from './controllers/UserController';

const io = require("socket.io").listen(server);

io.on("connection", async (socket) => {
  const { id } = socket;
  console.log(`Client ${id} connected`);
  
  socket.join("general");
  
  const listUsers = await UserController.index();
  socket.emit('listUsers', listUsers);

  socket.on("sendMessage", (data) => {
    socket.broadcast.to(data.to).emit("sendMessage", data);
    console.log(data);
  });

  socket.on("disconnect", () => {
    console.log(`Client ${id} disconnected`);
  });
});
