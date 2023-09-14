const bodyParser = require('body-parser');
const article = require('./article');
const author = require('./author');
const user = require('./user')

module.exports = (app) => {
    app.use(
        bodyParser.json(),
        article,
        author,
        user
    )
}