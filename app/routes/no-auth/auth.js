'use strict';

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const fusionVariables = require('../../fusion-variables');
const fusionDataAccess = require('../../data/fusion-data-access');
const fusionLogger = require('../../logger');
const auth = require('../../auth');
const logger = fusionLogger.Logger;

module.exports = function (app) {
    // authenticate a user
    app.post(fusionVariables.authApiRoute, function (request, response) {
        fusionDataAccess.findUserByUsername(request.body.username, function (userDocument) {
            if (userDocument) {
                bcrypt.compare(request.body.password, userDocument.password).then(function (hashesMatch) {
                    if (hashesMatch) {
                        // their credentials are correct and we found the user in the database.
                        // create a jwt token for them and return it and 200
                        let payload = {};
                        // TODO: payload.admin = userDocument.admin;
                        payload.username = userDocument.username;

                        let options = {};
                        options.expiresIn = '1d';
                        options.subject = userDocument._id.toString();

                        jwt.sign(payload, auth.secret, options, function(err, token) {
                            if (err) {
                                logger.error(`Error generating token: ${err}`);
                                response.send(500);
                            }
                            else{
                                response.send({token: token});
                            }
                        });
                    } else {
                        response.status(401).send('invalid credentials');
                    }
                });
            } else {
                response.status(401).send('user not found');
            }
        });
    });
};