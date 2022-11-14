
const router = require('express').Router();

const {getdailyFeed, getNewsFeed, getHeadlines, getQueryNews,getSavedNews, saveNews, deleteNews} = require('../controllers/newsController');

router.get('/', getdailyFeed)

router.get('/getHeadlines/:country', getHeadlines)

router.get('/getNewsFeed/:country/:category/:page', getNewsFeed)


router.get('/getQueryFeed/:query/:page', getQueryNews)


router.get('/getSaved', getSavedNews)

router.post('/saveNews', saveNews)

router.delete('/deleteNews', deleteNews)

module.exports = router;