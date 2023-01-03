'use strict';

const bcrypt = require('bcrypt');
const statusCodes = require('../config/statuscodes.config');
const RefreshToken = require('../models/refreshtoken.model');
const User = require('../models/user.model');
const { generateTokens } = require('../services/jwt.service');

const authController = async (req, res, next) => {
    try {
        const tokenDetails = req.decoded;

        const user = await User.findById(tokenDetails._id);

        res.status(statusCodes.OK).json({ error: false, user });
    } catch (err) {
        res.status(statusCodes.INTERNAL_SERVER_ERROR).json({
            error: true,
            message: 'Internal Server Error'
        });
    }
};

const signupController = async (req, res, next) => {
    try {
        const user = await User.findOne({ email: req.body.email });

        if (user) {
            return res.status(statusCodes.BAD_REQUEST).json({
                error: true,
                message: 'User with this email already exists'
            });
        }

        const salt = await bcrypt.genSalt(Number(process.env.SALT));
        const hashPassword = await bcrypt.hashSync(req.body.password, salt);

        await new User({ ...req.body, password: hashPassword }).save();

        res.status(statusCodes.CREATED).json({
            error: false,
            message: 'Account created successfully'
        });
    } catch (err) {
        res.status(statusCodes.INTERNAL_SERVER_ERROR).json({
            error: true,
            message: 'Internal server error'
        });
    }
}

const loginController = async (req, res, next) => {
    try {
        const user = await User.findOne({ email: req.body.email });

        if (!user) {
            return res.status(statusCodes.UNAUTHORIZED).json({
                error: true,
                message: 'Invalid email id'
            });
        }

        const verifiedPassword = await bcrypt.compare(
            req.body.password,
            user.password
        );

        if (!verifiedPassword) {
            return res.status(statusCoedes.UNAUTHORIZED).json({
                error: true,
                message: 'Invalid password'
            });
        }

        const { accessToken, refreshToken } = await generateTokens(user);

        res.status(statusCodes.OK).json({
            error: false,
            accessToken,
            refreshToken,
            message: 'Logged in successfully'
        });
    } catch (err) {
        res.status(statusCodes.INTERNAL_SERVER_ERROR).json({
            error: true,
            message: 'Internal server error'
        });
    }
}

const logoutController = async (req, res, next) => {
    try {
        const refreshToken = await RefreshToken.findOne({ token: req.body.refreshToken });

        if (!refreshToken) {
            return res.status(statusCodes.OK).json({
                error: false,
                message: "Logged out successfully"
            });
        }

        await RefreshToken.remove();

        res.status(statusCodes.OK).json({
            error: false,
            message: "Logged out successfully"
        });
    } catch (err) {
        res.status(statusCodes.INTERNAL_SERVER_ERROR).json({
            error: true,
            message: "Internal server error"
        });
    }
};

module.exports = {
    authController,
    signupController,
    loginController,
    logoutController
};