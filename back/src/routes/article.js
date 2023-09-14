const express = require('express');
const ArticleController = require('../controller/articleController');
const route = express.Router();

route
    .post('/api/article/', ArticleController.create)

module.exports = route;