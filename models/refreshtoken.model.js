'use strict';

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const RefershTokenSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        required: true
    },
    token: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 86400
    },
});

const RefreshToken = mongoose.model("RefershToken", RefershTokenSchema);

module.exports = RefreshToken;