'use strict';

const express = require('express');
const { refreshTokenController } = require('../../controllers/token.controller');
const router = express.Router();

router.post('/refresh', refreshTokenController);

module.exports = router;