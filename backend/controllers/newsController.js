const News = require("../models/newsModel");
const axios = require("axios");
// const DEFAULT_EXPIRE_TIME = 3600;
const PAGE_SIZE = 12;

// const redisClient = require("redis").createClient({
//   url: process.env.REDIS_URL,
//   password: process.env.REDIS_PASSWORD,
// });

// (async () => {
//   await redisClient.connect();
// })();

// redisClient.on("connect", () => console.log("::> Redis Client Connected"));
// redisClient.on("error", (err) => console.log("<:: Redis Client Error", err));

// @desc get daily Feed for Home page
// @route GET /news
// @access Private
const getdailyFeed = async (req, res) => {
  const { data } = await axios.get(
    "https://jsonplaceholder.typicode.com/todos/1"
  );

  res.status(200).json(data);
};
//   });
// };
// @desc get daily Feed for Home page
// @route GET /news/getNewsFeed/:country/:category/:page
// @access Private

const getNewsFeed = async (req, res) => {
  //use redis

  const { country, category, page } = req.params;
  const params = {
    country: country,
    category: category,
    pageSize: PAGE_SIZE,
    page: page,
    apiKey: process.env.NEWS_API_KEY,
  };
  const { data } = await axios.get("https://newsapi.org/v2/top-headlines", {
    params,
  });
  res.status(200).json(data);
};

const getHeadlines = async (req, res) => {
  const { country } = req.params;
  const params = {
    country: country,
    pageSize: 24,
    apiKey: process.env.NEWS_API_KEY,
  };
  // const data = await getOrSetCache(`${country}${category}${page}`, async () => {
  const { data } = await axios.get("https://newsapi.org/v2/top-headlines", {
    params,
  });
  //   });
  //   return data;
  // });
  res.status(200).json(data);
};

// @desc get daily Feed for Home page
// @route GET /news/getNewsFeed
// @access Private
// const getQueryNews = async (req, res) => {
//   const { country, page } = req.params;
//   const data = await getOrSetCache(`${country}${page}`, async () => {
//     const params = {
//       country: country,
//       pageSize: PAGE_SIZE,
//       page: page,
//       apiKey: process.env.NEWS_API_KEY,
//     };
//     const { data } = await axios.get("https://newsapi.org/v2/top-headlines", {
//       params,
//     });
//     return data;
//   });
//   res.status(200).json(data);
// };

// @desc get daily Feed for Home page
// @route GET /news/getNewsFeed
// @access Private
const getQueryNews = async (req, res) => {
  const { query, page } = req.params;

  const params = {
    pageSize: PAGE_SIZE,
    page: page,
    q: query,
    apiKey: process.env.NEWS_API_KEY,
  };
  const { data } = await axios.get("https://newsapi.org/v2/top-headlines", {
    params,
  });

  res.status(200).json(data);
};

const getSavedNews = async (req, res) => {
  const news = await News.find({ subscribedBy: req.user.id });
  res.status(200).json(news);
};

const saveNews = (req, res) => {
  const { author, content, description, ...picked } = req.body;
  picked.subscribedBy = parseInt(req.user.id);
  News.create(picked);
  res.status(200).json({ message: "Added" });
};

const deleteNews = (req, res) => {
  const { url } = req.body;
  //delete where utl = url and subscribedBy = req.user.id
  News.deleteOne({ url: url, subscribedBy: req.user.id }, function (err) {
    if (err) console.log(err);
  });
  res.status(200).json({ message: "Deleted" });
};

function getOrSetCache(key, cb) {
  return new Promise((resolve, reject) => {
    redisClient.get(key, async (err, reply) => {
      if (reply != null) return resolve(JSON.parse(reply));
      if (err) return reject(err);

      const freshDate = await cb();
      redisClient.setex(key, DEFAULT_EXPIRE_TIME, JSON.stringify(freshDate));
      resolve(freshDate);
    });
  });
}

module.exports = {
  getdailyFeed,
  getNewsFeed,
  getHeadlines,
  getQueryNews,
  getSavedNews,
  saveNews,
  deleteNews,
};
