'use strict';

const jwt = require("jsonwebtoken");
const RefreshToken = require("../models/refreshtoken.model");
const config = require("../config/jwt.config");

const generateTokens = async (user) => {
    try {
        const payload = { _id: user._id, roles: user.roles };

        const accessToken = await jwt.sign(
            payload,
            config.secret,
            { expiresIn: config.jwtExpiration }
        );

        const newRefreshToken = await jwt.sign(
            payload,
            config.secret,
            { expiresIn: config.jwtRefreshExpiration }
        );

        const refreshToken = await RefreshToken.findOne({ userId: user._id });
        if (refreshToken) await refreshToken.remove();

        await new RefreshToken({ userId: user._id, token: newRefreshToken }).save();

        return { accessToken, refreshToken: newRefreshToken };
    } catch (err) {
        return err;
    }
};

const verifyRefreshToken = async (refreshToken) => {
    try {
        const doc = await RefreshToken.findOne({ token: refreshToken });

        if (!doc) {
            return { error: true, message: "Invalid refresh token" };
        }

        const tokenDetails = await jwt.verify(refreshToken, config.secret);

        return {
            tokenDetails,
            error: false,
            message: "Valid refresh token",
        }
    } catch (err) {
        return err;
    }
};

const verifyAccessToken = async (accessToken) => {
    try {
        return await jwt.verify(accessToken, config.secret);
    } catch (err) {
        return err;
    }
};

const refreshToken = async (payload) => {
    return await jwt.sign(
        payload,
        config.secret,
        { expiresIn: config.jwtExpiration }
    );
};

module.exports = {
    generateTokens,
    verifyRefreshToken,
    verifyAccessToken,
    refreshToken
};