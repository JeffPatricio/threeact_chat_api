import server from './app';

const io = require('socket.io').listen(server);

io.on("connection", (socket) => {
  console.log("New client connected ", socket.id);
});