'use strict';

const dotenv = require('dotenv');
const logger = require('./config/logger.config');
const database = require('./config/database.config');
const getApp = require('./app');

dotenv.config();

const port = process.env.PORT;

const app = getApp(database);

const server = app.listen(port, () => logger.info(`Server is running on port ${port}`))
    .on("error", (error) => logger.error(`Port ${error.port} is already in use`));

const exitHandler = () => {
    if (server) {
        server.close(() => {
            logger.info('Server closed');
            process.exit(1);
        });
    } else {
        process.exit(1);
    }
};

const unexpectedErrorHandler = (error) => {
    logger.error(error);
    exitHandler();
};

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);

process.on('SIGINT', () => {
    logger.info('SIGINT received');
    database.close();
    if (server) {
        server.close();
    }
});

process.on('SIGTERM', () => {
    logger.info('SIGTERM received');
    database.close();
    if (server) {
        server.close();
    }
});