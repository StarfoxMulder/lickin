var express = require("express");
var router = express.Router();
var app = express();
var Article = require("../models/Article.js");
var logger = require("morgan");
var request = require("request");
var cheerio = require("cheerio");

/////  Routes  \\\\\
/////  ======  \\\\\

// router.get("/home", function(req, res){
//   res.render("home", {title: "Home", user: req.user});
// });

router.get("/", function(req,res) {
  res.render("index");
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

router.get('/public', function(req, res){

  Article.find().sort({"scrapeDate":-1}).exec( function(err, found){
    if(err) {
    } else {
      res.render("index",{found : found, title: "Public"});
    }
  });
});

router.get('/home', function(req, res){
  Article.find().sort({"scrapeDate":-1}).exec( function(err, found){
    if(err) {
    } else {
      res.render("home",{found : found, title: "Home"});
    }
  });
});

router.get("/profile", function(req, res){

  Article.find().sort({"saved": -1}).exec( function(err, found){
    if(err) {
    } else {
      console.log(req.user);
      console.log(res);
      res.render("profile",{found : found, user: req.user});
    }
  });
});


router.get("/notes/:id", function(req, res) {

  Article.findOne({"_id": req.params.id}).populate("notes").exec(function(err, article){
      if(err) {
        res.send(err);
      } else {
        res.send(article.notes);
      };
  });

});
// Create a new note or replace an existing note
router.post("/notes/:id", function(req, res) {
  if (res.status != 200) {
    console.log(res);
  }
  var newNote = new Note(req.body);
  // save the new note that gets posted to the Notes collection
  newNote.save(function(err, note){
    if(err) {
      console.log(err);
    } else {
      Article.findOneAndUpdate({"_id" : req.params.id}, {$push: {notes:note}}, {safe: true, upsert: true})
      .exec(function(err, article){
          if(err) {
            console.log(err);
          } else {
            res.redirect(req.originalUrl);
        }
        });
      };
    });
});

router.post("/save/:id", function(req, res) {
  if (res.status != 200){
    console.log(res)
  } else {
    Article.findOneAndUpdate({"_id": req.params.id}, {saved: true})
    .exec(function(err, save) {
      if (err) {
        console.log(err);
      } else {
        res.redirect(req.originalUrl);
      }
    });
  }
});

router.post("/delete/:id", function(req, res) {
  Note.findByIdAndRemove(req.params.id, function(err, data){
    if(err) {
      console.log("delete err: ", err);
    } else {
      // res.redirect();
    }
  });
});

module.exports = router;
