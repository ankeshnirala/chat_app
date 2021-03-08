const club = require("./../models/clubModels");
const users = require("./../models/userModel");

exports.groupPage = async (req, res) => {
  const name = req.params.name;
  const groupResult = await users
    .findOne({ username: req.user.username })
    .populate("request.userId");

  res.render("groupChat/group", {
    title: "Chat App | Group",
    data: groupResult,
    groupName: name,
    user: req.user,
  });
};

exports.postPage = async (req, res) => {
  let updateResult1, updateResult2;

  if (req.body.receiver) {
    updateResult1 = await users.updateOne(
      {
        username: req.body.receiver,
        "request.userId": { $ne: req.user._id },
        "friendList.friendId": { $ne: req.user._id },
      },
      {
        $push: {
          request: {
            userId: req.user._id,
            username: req.user.username,
          },
        },
        $inc: { totalRequest: 1 },
      }
    );
  }

  if (req.body.receiver) {
    updateResult2 = await users.updateOne(
      {
        username: req.user.username,
        "sentRequest.username": { $ne: req.body.receiver },
      },
      {
        $push: {
          sentRequest: {
            username: req.body.receiver,
          },
        },
      }
    );
  }

  // update sender details
  if (req.body.senderId) {
    await users.updateOne(
      {
        _id: req.user._id,
        "friendList.friendId": { $ne: req.body.senderId },
      },
      {
        $push: {
          friendList: {
            friendId: req.body.senderId,
            friendName: req.body.senderName,
          },
        },
        $pull: {
          request: {
            userId: req.body.senderId,
            username: req.body.senderName,
          },
        },
        $inc: { totalRequest: -1 },
      }
    );
  }

  // update receiver details
  if (req.body.senderId) {
    await users.updateOne(
      {
        _id: req.body.senderId,
        "friendList.friendId": { $ne: req.user._id },
      },
      {
        $push: {
          friendList: {
            friendId: req.user._id,
            friendName: req.user.username,
          },
        },
        $pull: {
          sentRequest: {
            username: req.user.username,
          },
        },
      }
    );
  }

  // if friend cancel request
  if (req.body.user_Id) {
    await users.updateOne(
      {
        _id: req.user._id,
        "request.userId": { $eq: req.body.user_Id },
      },
      {
        $pull: {
          request: {
            userId: req.body.user_Id,
          },
        },
        $inc: { totalRequest: -1 },
      }
    );
  }

  if (req.body.user_Id) {
    await users.updateOne(
      {
        _id: req.user._id,
        "sentRequest.username": { $eq: req.user.username },
      },
      {
        $pull: {
          sentRequest: {
            username: req.user.username,
          },
        },
      }
    );
  }

  res.redirect("/group/" + req.params.name);
};
