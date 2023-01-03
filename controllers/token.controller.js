'use strict';

const statusCodes = require('../config/statuscodes.config');
const { verifyRefreshToken, refreshToken } = require('../services/jwt.service');

const refreshTokenController = async (req, res, next) => {
    try {
        const data = await verifyRefreshToken(req.body.refreshToken);

        const payload = { _id: data.tokenDetails._id, roles: data.tokenDetails.roles };

        const accessToken = await refreshToken(payload);

        res.status(statusCodes.OK).json({
            error: false,
            accessToken,
            message: 'Access token refreshed successfully'
        });
    } catch (err) {
        res.status(statusCodes.BAD_REQUEST).json(err);
    }
};

module.exports = { refreshTokenController };