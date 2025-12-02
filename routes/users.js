var express = require('express');
var router = express.Router();
var dataService = require("../data/dataService");

//POST /users/login
router.post("/login", function(req, res, next) {
  const username = req.body.username;
  const password = req.body.password;

  console.log("LOGIN INTENT:", username);

  if (dataService.validateUser(username, password)) {
    req.session.isLogged = true;
    req.session.username = username;
    console.log("SESSION USER:", req.session.username);
    res.redirect("/");
  } else {
    res.render("login", { error: "User does not exist" });
  }
});

module.exports = router;
