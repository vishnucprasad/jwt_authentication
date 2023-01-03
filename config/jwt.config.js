'use strict';

const jwtConfig = {
    secret: String(process.env.JWT_SECRET),
    jwtExpiration: 600,
    jwtRefreshExpiration: 86400
};

module.exports = jwtConfig;