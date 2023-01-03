'use strict';

const express = require('express');
const router = express.Router();
const authRouter = require('./auth.route');
const tokenRouter = require('./token.route');

router.use('/auth', authRouter);
router.use('/token', tokenRouter);

module.exports = router;