'use strict';

const express = require('express');
const router = express.Router();
const { signupController, loginController, logoutController, authController } = require('../../controllers/auth.controller');
const isAuthenticated = require('../../middlewares/auth.middleware');

router.get('/', isAuthenticated, authController);
router.post('/signup', signupController);
router.post('/login', loginController);
router.delete('/logout', logoutController);

module.exports = router;