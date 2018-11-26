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

//socket.io
io.on("connection", function(socket) {
  console.log("a user connected");
  socket.on("create", function(room) {
    socket.join(room);
    console.log("user created and joined room: " + room);
  });
  socket.on("join", function(room) {
    socket.join(room);
    console.log("user joined room: " + room);
  });
  socket.on("disconnect", function() {
    console.log("user disconnected");
  });
  var room_name = socket.request.headers.referer.split("=")[2];
  console.log("room name is : "+room_name);
  socket.on("chat message", function(msg) {
    socket.join(room_name);
    console.log("message from server: " + msg);
    console.log("room to emit message: "+room_name);
    
    io.in(room_name).emit("update message", msg);
    
  });
});

var syncOptions = { force: false };

// If running a test, set syncOptions.force to true
// clearing the `testdb`
if (process.env.NODE_ENV === "test") {
  syncOptions.force = true;
}

// Starting the server, syncing our models ------------------------------------/
db.sequelize.sync(syncOptions).then(function() {
  http.listen(PORT, function() {
    console.log(
      "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
      PORT,
      PORT
    );
  });
});

module.exports = app;
