require("dotenv").config();
var express = require("express");
var bodyParser = require("body-parser");
var exphbs = require("express-handlebars");
var session = require("express-session");

var db = require("./models");

var app = express();
var http = require("http").Server(app);
var io = require("socket.io")(http);
var PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static("public"));
// Provide access to node_modules folder
app.use('/scripts', express.static(`${__dirname}/node_modules/`));


// Handlebars
app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main"
  })
);
app.set("view engine", "handlebars");
app.use(session({
  secret: 'gw bootcamp',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 60000 }
}))
// Routes
require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);

// usernames which are currently connected to the chat
var usernames = {};

// rooms which are currently available in chat
var rooms = [];
//socket.io
io.on("connection", function (socket) {
  socket.on('adduser', function (username, chatroom) {
    // store the username in the socket session for this client
    socket.username = username;
    // store the room name in the socket session for this client
    socket.room = chatroom;
    // add the client's username to the global list
    usernames[username] = username;
    rooms.push(chatroom);
    // send client to room 1
    socket.join(chatroom);
    // echo to client they've connected
    socket.emit('update message', 'SERVER', 'you have connected to ' + socket.room);
    // echo to room 1 that a person has connected to their room
    socket.broadcast.to(socket.room).emit('update message', 'SERVER', username + ' has connected to this room');

  });
  socket.on("create", function (room) {
    socket.join(room);
    console.log("user created and joined room: " + room);
  });
  socket.on("join", function (room) {
    socket.join(room);
    console.log("user joined room: " + room);
  });
  socket.on("disconnect", function () {
    console.log("user disconnected");
  });
  var room_name = socket.request.headers.referer.split("=")[2];
  socket.on("chat message", function (msg) {
    socket.join(room_name);
    // console.log("message from server: " + msg);
    // console.log("room to emit message: "+room_name);
    // console.log("username is "+socket.username);
    io.in(room_name).emit("update message", socket.username, msg);

  });
  // when the user disconnects.. perform this
	socket.on('disconnect', function(){
		// remove the username from global usernames list
		delete usernames[socket.username];
		
		// echo globally that this client has left
		socket.broadcast.emit('update message', 'SERVER', socket.username + ' has disconnected');
		socket.leave(socket.room);
	});
});

var syncOptions = { force: false };

// If running a test, set syncOptions.force to true
// clearing the `testdb`
if (process.env.NODE_ENV === "test") {
  syncOptions.force = true;
}

// Starting the server, syncing our models ------------------------------------/
db.sequelize.sync(syncOptions).then(function () {
  http.listen(PORT, function () {
    console.log(
      "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
      PORT,
      PORT
    );
  });
});

module.exports = app;
