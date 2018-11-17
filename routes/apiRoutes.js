var db = require("../models");

module.exports = function(app) {
  // Get all Users
  app.post("/api/signin", function(req, res) {
    db.Users.findAll({
      where : {
        username: req.body.username,
        password: req.body.password
      }
    }).then(function(dbUsers) {
      // res.json(dbUsers);
      if(dbUsers) {
        req.session.userId = dbUsers[0].id;
        req.session.user= dbUsers[0];
        console.log(dbUsers[0].id);
        
        return res.redirect("/dashboard");
      }
    });
  });

  // Create a new Users
  app.post("/api/Users", function(req, res) {
    console.log ("in api post");
    console.log(req.body);
    db.Users.create(req.body).then(function(dbUsers) {
      res.json(dbUsers);
    });
  });

  // Delete an Users by id
  app.delete("/api/Users/:id", function(req, res) {
    db.Users.destroy({ where: { id: req.params.id } }).then(function(dbUsers) {
      res.json(dbUsers);
    });
  });
};
