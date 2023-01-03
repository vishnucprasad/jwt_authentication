'use strict';

const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const apiRouter = require('./routes');
const NotFoundError = require('./errors/notfound.error');

dotenv.config();

function errorHandler(error, req, res, next) {
    res.status(error.status || 500).json(error);
}

function unMatchedRoutesHandler(req, res, next) {
    next(new NotFoundError("Requested URL not found"));
}

function getApp(database) {
    const app = express();

    database.connect();

    app.use(cookieParser());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(cors());

    app.use('/api', apiRouter);

    app.all('*', unMatchedRoutesHandler);

    app.use(errorHandler);

    return app;
}

module.exports = getApp;