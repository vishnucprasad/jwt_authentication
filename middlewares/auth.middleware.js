'use strict';

const { TokenExpiredError } = require("jsonwebtoken");
const statusCodes = require("../config/statuscodes.config");
const { verifyAccessToken } = require("../services/jwt.service");

const isAuthenticated = async (req, res, next) => {
    const tokenDetails = await verifyAccessToken(req.headers.authorization.split(" ")[1]);
    if (!tokenDetails || tokenDetails instanceof TokenExpiredError) {
        res.status(statusCodes.UNAUTHORIZED).json({ error: true, message: "Unauthorized" });
    }

    req.decoded = tokenDetails;
    return next();
};

module.exports = isAuthenticated;