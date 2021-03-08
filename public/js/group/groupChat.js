$(document).ready(function () {
  const socket = io();

  const groupName = $("#group-name").val();
  const sender = $("#sender").val();

  socket.on("connect", () => {
    console.log("User Connected!!");

    const params = {
      room: groupName,
      name: sender,
    };

    socket.emit("join", params, () => {
      console.log("User has joined this channel!!");
    });
  });

  socket.on("new-message", (newMessage) => {
    const template = $("#message-template").html();
    const message = Mustache.render(template, {
      text: newMessage.text,
      sender: newMessage.sender,
    });

    $("#messages").append(message);
  });

  socket.on("user-list", (users) => {
    const ol = $("<ol></ol>");
    users.forEach((user) => {
      ol.append(
        "<p><a id='val' data-toggle='modal' data-target='#myModal'>" +
          user +
          "</p>"
      );
    });

    $(document).on("click", "#val", function () {
      $("#name").text("@" + $(this).text());
      $("#receiverName").val($(this).text());

      $("#nameLink").attr("href", "/profile/" + $(this).text());
    });

    $("#numValue").text("(" + users.length + ")");
    $("#users").html(ol);
  });

  $("#message-form").on("submit", (e) => {
    e.preventDefault();

    const msg = $("#msg").val();

    socket.emit(
      "create-message",
      { text: msg, room: groupName, sender: sender },
      function () {
        $("#msg").val("");
      }
    );
  });
});
