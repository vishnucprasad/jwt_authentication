'use strict';

const mongoose = require("mongoose");
const logger = require("./logger.config");

mongoose.Promise = global.Promise;
mongoose.set('strictQuery', false);

const connect = () => {
    const mongoUri = `${process.env.MONGO_URI}`;
    const options = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    };

    // Connecting to mongoose
    mongoose.connect(mongoUri, options);

    // Event on mongoose connected
    mongoose.connection.on("connected", () => {
        logger.info(`mongoose connected to ${mongoUri}`);
    });

    // Event on mongoose connection error
    mongoose.connection.on("error", (err) => {
        logger.info(`mongoose connecton error : ${err}`);
    });

    // Event on mongoose disconnected
    mongoose.connection.on("disconnected", (err) => {
        logger.info("mongoose disconnected");
    });
};

const close = () => {
    mongoose.connection.close(() => {
        logger.info("mongoose disconnected through app termination");
        process.exit(0);
    });
};

module.exports = { connect, close };