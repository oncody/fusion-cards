'use strict';

const winston = require('winston');

module.exports.Logger = new winston.Logger({
    transports: [
        new (winston.transports.Console)({
            colorize: true,
            level: 'info',
            handleExceptions: true,
            json: false
        })
        // ,new winston.transports.File({
        //     level: 'info',
        //     filename: 'fusion-log.log',
        //     handleExceptions: true,
        //     json: false,
        //     maxsize: 5242880, //5MB
        //     maxFiles: 5,
        //     colorize: true
        // })
    ],
    exitOnError: false
});

module.exports.stream = {
    write: function(message){
        module.exports.Logger.info(message);
    }
};