const express = require('express');
const routes = require('./src/routes');
const cors = require('cors');

const app = express();

require('./startup/db')();

require('./startup/routes')(app);

app.use(cors({
    origin: '*'
}));

routes(app);

const port = 8080;

app.listen(port, () => console.log(`Acesse: http://localhost:${port}/`));