'use strict'

const express = require('express');
const app = express();
const config = require('./config/index')

require('./config/mongoose').initMongoose();
require('./config/express').initE(app);
require('./config/routes').initRoutes(app);

app.listen(config.PORT, () => {
    console.log(`API on port ${config.PORT}`)
})