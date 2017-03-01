var express = require("express");
var router = express.Router();
var app = express();
var Article = require("../models/Article.js");
var logger = require("morgan");
var request = require("request");
var helper = require("helpers.js");

/////  Routes  \\\\\
/////  ======  \\\\\

// router.get("/home", function(req, res){
//   res.render("home", {title: "Home", user: req.user});
// });

router.get("/", function(req,res) {
  helper.articleSearch();
  res.render("index");
});

router.get("/news", function(req,res) {
  Article.find().sort({"scrapeDate":-1}).exec( function(err, found){
    if(err) {
    } else {
      res.render("news",{found : found});
    }
  });
});

router.get("/events", function(req,res) {
  res.render("events");
});

router.get("/donate", function(req,res) {
  res.render("donate");
});

router.post("/register", function(req, res) {
  console.log("req.body.userName == "+req.body.userName);
  console.log("req.body.email == "+req.body.email);
  console.log("req.body.password == "+req.body.password);
  User.register(new User({
    userName: req.body.userName,
    email: req.body.email,
    password: req.body.password
  }))
});

module.exports = router;

