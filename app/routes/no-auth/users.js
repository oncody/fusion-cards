'use strict';

const bcrypt = require('bcryptjs');
const fusionVariables = require('../../fusion-variables');
const fusionDataAccess = require('../../data/fusion-data-access');
const fusionLogger = require('../../logger');
const logger = fusionLogger.Logger;

const saltRounds = 10;

module.exports = function (app) {
    // handles registration
    app.post(fusionVariables.usersApiRoute, function (request, response) {
        let newUser = {};
        newUser.username = request.body.username;
        newUser.email = request.body.email;

        bcrypt.hash(request.body.password, saltRounds, function (err, hash) {
            if (err) {
                logger.error(`error hashing: ${err}`);
            } else {
                newUser.password = hash;
                fusionDataAccess.insertUser(newUser);
                response.status(201).send('User created');
            }
        });
    });
};