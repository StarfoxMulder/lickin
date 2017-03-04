var express = require("express");
var router = express.Router();
var app = express();
var Article = require("../models/Article.js");
var logger = require("morgan");
var request = require("request");
var cheerio = require("cheerio");
var uncl = "UNC Lineberger";
var cri = "Cancer Research Institute";
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
  }); //End of Lineberger

  request("http://www.cancerresearch.org/news-publications/our-blog", function(error, response, html) {

    var $ = cheerio.load(html);

    $("ul.storyList").children("li").each(function(i, element) {

      var result = {};

      result.title = $(this).children("div.storySummary").children("h3").children("a").text();
      result.link = "http://www.cancerresearch.org/news-publications/our-blog" + $(this).children("div.storySummary").children("h3").children("a").attr("href");
      result.image = "http://www.cancerresearch.org/news-publications/our-blog" + $(this).children("div.storyImage").children("a").children("img").attr("src");
      result.snip = $(this).children("div.storySummary").children("div").children("p").text();
      result.source = cri;
      result.scrapeDate = Date.now();

      var entry = new Article(result);

      entry.save(function(err, doc) {

        if (err) {
        }
        else {
        }
      });
    });
  }); //End of Cancer Research Institute

  request("http://www.cancerresearch.org/news-publications/our-blog", function(error, response, html) {

    var $ = cheerio.load(html);

    $("ul.storyList").children("li").each(function(i, element) {

      var result = {};

      result.title = $(this).children("div.storySummary").children("h3").children("a").text();
      result.link = "http://www.cancerresearch.org/news-publications/our-blog" + $(this).children("div.storySummary").children("h3").children("a").attr("href");
      result.image = "http://www.cancerresearch.org/news-publications/our-blog" + $(this).children("div.storyImage").children("a").children("img").attr("src");
      result.snip = $(this).children("div.storySummary").children("div").children("p").text();
      result.source = cri;
      result.scrapeDate = Date.now();

      var entry = new Article(result);

      entry.save(function(err, doc) {

        if (err) {
        }
        else {
        }
      });
    });
  }); //End of Cancer Research Institute

} //End of articleSearch
