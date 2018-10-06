'use strict';

const jwt = require('jsonwebtoken');
const logger = require('./logger').Logger;

module.exports.secret = ;//todo;

module.exports.verify = function (request, response, callback) {
    let options = {};
    options.algorithms = ['HS256'];

    let token = request.headers.authorization;
    if (token) {
        token = token.substring('Bearer '.length);
        jwt.verify(token, module.exports.secret, options, function (err, decoded) {
            if (err) {
                response.status(401).send();
            } else {
                callback();
            }
        });
    } else {
        response.status(401).send();
    }
};