const mongoose = require("mongoose");

const newsScheme = new mongoose.Schema({
  source: Object,
  author: String,
  title: String,
  url: String,
  urlToImage: String,
  publishedAt: String,
  subscribedBy: String,

});

module.exports = mongoose.model("news", newsScheme);
