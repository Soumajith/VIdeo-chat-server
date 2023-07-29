const { Server } = require("socket.io");
const io = new Server(8000, {
  cors: true,
});

const emailToSocketIdJoin = new Map();
const socketIdToEmailJoin = new Map();

io.on("connection", (socket) => {
  console.log(`Socket connected`, socket.id);
  socket.on("room:join", (data) => {
    const { email, room } = data;
    emailToSocketIdJoin.set(email, socket.id);
    socketIdToEmailJoin.set(socket.id, email);
    io.to(socket.id).emit("room:join", data);
  });
});
