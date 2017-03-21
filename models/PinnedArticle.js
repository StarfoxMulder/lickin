var mongoose = require("mongoose");
var Schema = mongoose.Schema;

// Creating schema
var PinnedArticleSchema = new Schema({

  title: {
    type: String,
    required: true,
    unique: true
  },
  link: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: false
  },
  source: {
    type: String,
    required: true
  },
  snip: {
    type: String,
    required: false
  },
  order: {
    type: Number,
    required: true
  }
});

// Create the Article model with the ArticleSchema
var PinnedArticle = mongoose.model("Article", ArticleSchema);

// Export the model
module.exports = PinnedArticle;
