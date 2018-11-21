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
   
    res.render("videochat");
  
  });

  app.get("/chat", function(req, res) {
    db.Users.findOne({ where: { id: req.session.userId } }).then(function(dbUsers) {
      console.log(dbUsers);
      res.render("chatroom", {
        Users: dbUsers
      });
    });
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
    console.log("in dashboard route");
    db.Users.findOne({ where: { id: req.session.userId } }).then(function(dbUsers) {
      console.log(dbUsers);
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
