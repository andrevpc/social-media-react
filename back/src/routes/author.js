const express = require('express');
const AuthorController = require('../controller/authorController');
const route = express.Router();

route
    .post('/api/author', AuthorController.create)

module.exports = route;