'use strict';

const httpStatusCodes = require('../config/statuscodes.config');
const BaseError = require('./base.error');

class NotFoundError extends BaseError {
    constructor(
        name,
        statusCode = httpStatusCodes.NOT_FOUND,
        description = 'Not found.',
        isOperational = true
    ) {
        super(name, statusCode, isOperational, description);
    };
};

module.exports = NotFoundError;