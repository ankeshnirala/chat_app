$(document).ready(function () {
  const socket = io();

  const groupName = $("#group-name").val();
  const sender = $("#sender").val();

  socket.on("connect", () => {
    const params = {
      sender: sender,
    };

    socket.emit("joinRequest", params, () => {
      console.log("Joined!!");
    });

    socket.on("new-friend-request", (friend) => {
      $("#reload").load(location.href + " #reload");

      $(document).on("click", "#accept_friend", function () {
        const senderId = $("#senderId").val();
        const senderName = $("#senderName").val();

        $.ajax({
          url: "/group/" + groupName,
          type: "POST",
          data: {
            senderId: senderId,
            senderName: senderName,
          },
          success: function () {
            $(this).parent().eq(1).remove();
          },
        });

        $("#reload").load(location.href + " #reload");
      });

      $(document).on("click", "#cancel_friend", function () {
        const user_Id = $("#user_Id").val();

        $.ajax({
          url: "/group/" + groupName,
          type: "POST",
          data: {
            user_Id: user_Id,
          },
          success: function () {
            $(this).parent().eq(1).remove();
          },
        });

        $("#reload").load(location.href + " #reload");
      });
    });

    $("#add_friend").on("submit", (e) => {
      e.preventDefault();
      const receiver = $("#receiverName").val();

      $.ajax({
        url: "/group/" + groupName,
        type: "POST",
        data: {
          receiver: receiver,
        },
        success: function () {
          socket.emit(
            "friend-request",
            {
              receiver: receiver,
              sender: sender,
            },
            function () {
              console.log("Request Sent Successfully!!");
            }
          );
        },
      });
    });
  });

  $("#cancel_friend").on("click", function () {
    const user_Id = $("#user_Id").val();

    $.ajax({
      url: "/group/" + groupName,
      type: "POST",
      data: {
        user_Id: user_Id,
      },
      success: function () {
        $(this).parent().eq(1).remove();
      },
    });

    $("#reload").load(location.href + " #reload");
  });
});
