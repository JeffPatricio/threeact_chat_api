import server from "./app";

const io = require("socket.io").listen(server);

io.on("connection", (socket) => {
  const { id } = socket;
  console.log(`Client ${id} connected`);

  socket.join("general");

  socket.on("sendMessage", (data) => {
    socket.broadcast.to(data.to).emit("sendMessage", data);
    console.log(data);
  });

  socket.on("disconnect", () => {
    console.log(`Client ${id} disconnected`);
  });
});
