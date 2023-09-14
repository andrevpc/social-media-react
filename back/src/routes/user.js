const express = require('express');
const UserController = require('../controller/userController');
const route = express.Router();

route
    .post('/api/register', UserController.register)
    .post('/api/login', UserController.login)

module.exports = route;