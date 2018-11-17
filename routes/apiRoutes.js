var db = require("../models");
const bcrypt = require('bcrypt');

module.exports = function(app) {
  // Get all Users
  app.post("/api/signin", function(req, res1) {

    
    db.Users.findAll({
      where : {
        username: req.body.username
      }
    }).then(function(dbUsers) {
      // res.json(dbUsers);
      console.log(req.body.password);
      console.log(dbUsers);
      if(dbUsers) {
        console.log("in db users");
        console.log(dbUsers[0].password);

        bcrypt.compare(req.body.password, dbUsers[0].password).then(function(res) {
          console.log("in compare");
          if(res === true) {  
            req.session.userId = dbUsers[0].id;
            req.session.user= dbUsers[0];
            console.log(dbUsers[0].id);
        
            res1.redirect("/dashboard");
            return true;
          }
          return false;
        });
        
      }
    });
  });

  // Create a new Users
  app.post("/api/Users", function(req, res) {
    console.log ("in api post");
    console.log(req.body);
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(req.body.password, salt);
    req.body.password=hash;
    console.log(hash);
    console.log("saving user");
    db.Users.create(req.body).then(function(dbUsers) {
      console.log("in create");
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
