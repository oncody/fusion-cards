'use strict';

// load all routes
module.exports = function (app) {
    require('./auth')(app);
    require('./users')(app);
    require('./root')(app);
};