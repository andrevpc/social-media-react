const express = require('express');
const ArticleController = require('../controller/articleController');
const route = express.Router();

route
    .get('/api/article/:page', ArticleController.getAll)
    .post('/api/article/', ArticleController.create)
    .post('/api/article/like/:articleId', ArticleController.likeArticle)
    .post('/api/article/unlike/:articleId', ArticleController.unlikeArticle)

module.exports = route;