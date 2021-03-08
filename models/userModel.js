const mongoose = require("mongoose");
const bcryptjs = require("bcryptjs");

const userSchema = mongoose.Schema({
  username: { type: String, unique: true },
  full_name: { type: String, unique: false, default: "" },
  email: { type: String, unique: true },
  password: { type: String, default: "" },
  userImage: { type: String, default: "default.png" },
  facebook: { type: String, default: "" },
  fc_token: Array,
  google: { type: String, default: "" },
  google_token: Array,
  sentRequest: [
    {
      username: { type: String, default: "" },
    },
  ],
  request: [
    {
      userId: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
      username: { type: String, default: "" },
    },
  ],
  friendList: [
    {
      friendId: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
      friend_name: { type: String, default: "" },
    },
  ],
  totalRequest: { type: Number, default: 0 },
});

userSchema.methods.encryptPassword = (password) => {
  return bcryptjs.hashSync(password, bcryptjs.genSaltSync(12), null);
};

userSchema.methods.validateUserPassword = (password, userPassword) => {
  return bcryptjs.compareSync(password, userPassword);
};

module.exports = mongoose.model("Users", userSchema);
