const express = require('express');
const article = require('../src/routes/article');

module.exports = function (app) {
    app
        .use(express.json())
        .use('/api/article', article)
}