// const IO = io();

// IO.on("connection", (socket) => {
//   console.log("User Connected!!");
// });

module.exports = function (io, Users) {
  const users = new Users();

  io.on("connection", (socket) => {
    console.log("User Connected!!");

    socket.on("join", (params, callback) => {
      socket.join(params.room);

      users.setUser(socket.id, params.name, params.room);
      io.to(params.room).emit("user-list", users.getUsers(params.room));

      callback();
    });

    socket.on("create-message", (message, callback) => {
      io.to(message.room).emit("new-message", {
        text: message.text,
        room: message.room,
        sender: message.sender,
      });

      callback();
    });

    socket.on("disconnect", () => {
      const user = users.removeUser(socket.id);

      if (user) {
        io.to(user.room).emit("user-list", users.getUsers(user.room));
      }
    });
  });
};
