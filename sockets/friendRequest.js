module.exports = (io) => {
  io.on("connection", (socket) => {
    socket.on("joinRequest", (myReq, callback) => {
      socket.join(myReq.sender);

      callback();
    });

    socket.on("friend-request", (requestData, callback) => {
      io.to(requestData.receiver).emit("new-friend-request", {
        from: requestData.sender,
        to: requestData.receiver,
      });

      callback();
    });
  });
};
