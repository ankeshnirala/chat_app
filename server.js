const express = require("express");
const http = require("http");
const body_parser = require("body-parser");
const passport = require("passport");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const mongoose = require("mongoose");
const flash = require("connect-flash");
const validator = require("express-validator");
const socketIO = require("socket.io");

require("./passport/passport-local");
require("./passport/passport-google");
require("./passport/passport-facebook");

const userRoutes = require("./routes/userRoutes");
const adminRoutes = require("./routes/adminRoutes");
const homeRoutes = require("./routes/homeRoutes");
const groupRoutes = require("./routes/groupRoutes");
const { Users } = require("./helpers/UserClass");

const app = express();
const port = 3001;
const options = {
  secret: "qaz+123qaz-321zaq",
  resave: true,
  saveUninitialized: false,
  store: new MongoStore({ mongooseConnection: mongoose.connection }),
};

mongoose.connect("mongodb://localhost/chat-app", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

const server = http.createServer(app);
const io = socketIO(server);

require("./sockets/groupChat")(io, Users);
require("./sockets/friendRequest")(io);

app.use(flash());
app.use(express.json());
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(body_parser.urlencoded({ extended: true }));
app.use(session(options));
app.use(passport.initialize());
app.use(passport.session());
app.use(validator());

app.use("/", userRoutes);
app.use("/", adminRoutes);
app.use("/", homeRoutes);
app.use("/", groupRoutes);

server.listen(port);
console.log("SERVER STARTED ON PORT: ", port);
