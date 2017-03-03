var express = require("express");
var router = express.Router();
var app = express();
var Article = require("../models/Article.js");
var logger = require("morgan");
var request = require("request");
var cheerio = require("cheerio");
// var helper = require("../public/helpers.js");

/////  Routes  \\\\\
/////  ======  \\\\\


router.get("/", function(req,res) {
  articleSearch();
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

function articleSearch() {
  console.log("is articleSearch registering anywhere?");

  request("https://unclineberger.org/newsroom", function(error, response, html) {

    var $ = cheerio.load(html);

    $("dd.portletItem").each(function(i, element) {

      var result = {};

      result.title = $(this).children("a").children("span").text();
      result.link = $(this).children("a").attr("href");
      result.image = $(this).children("a").children("div").children("img").attr("src");
      result.snip = $(this).children("a").attr("title")
      result.source = uncl;
      result.scrapeDate = Date.now();

      var entry = new Article(result);

      entry.save(function(err, doc) {

        if (err) {
        }
        else {
        }
      });
    });

  }); //End of (first unique scrape target)

} //End of articleSearch
