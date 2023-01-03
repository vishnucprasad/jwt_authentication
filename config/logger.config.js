'use strict';

const { format, transports, createLogger } = require('winston');

const consoleTransport = new transports.Console({ json: false, timestamp: true });
const debugFileTransport = new transports.File({ filename: __dirname + '/../logs/debug.log', json: false });
const exceptionFileTransport = new transports.File({ filename: __dirname + '/../logs/exceptions.log', json: false });

const options = {
    format: format.combine(
        format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        format.json(),
    ),
    transports: [
        consoleTransport,
        debugFileTransport,
    ],
    exceptionHandlers: [
        consoleTransport,
        exceptionFileTransport
    ],
    exitOnError: false,
};

const logger = new createLogger(options);

module.exports = logger;