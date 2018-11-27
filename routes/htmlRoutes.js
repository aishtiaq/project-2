var db = require("../models");

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
   
      res.render("signup");
    
  });
  app.get("/signin", function(req, res) {
   
    res.render("signin");
  
  });

  app.get("/video", function(req, res) {
    console.log(req.query.roomName);
    console.log(req.query.method);
    if(req.session.userId) {  
      db.Users.findOne({ where: { id: req.session.userId } }).then(function(dbUsers) {
        res.render("videochat", {
          Users: dbUsers,
          roomName: req.query.roomName,
          method: req.query.method
        });
      });
    } else {
      res.render("signin");
    }
   
  
  });

  // Load Users page and pass in an Users by id
  app.get("/Users/:id", function(req, res) {
    db.Users.findOne({ where: { id: req.params.id } }).then(function(dbUsers) {
      res.render("Users", {
        Users: dbUsers
      });
    });
  });
  app.get("/dashboard", function(req, res) {
    db.Users.findOne({ where: { id: req.session.userId } }).then(function(dbUsers) {
      res.render("dashboard", {
        Users: dbUsers
      });
    });
    
  
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });

  
};
