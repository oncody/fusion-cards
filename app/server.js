'use strict';

// Required Dependencies
const express = require('express');
const favicon = require('serve-favicon');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const app = express();
const fusionLogger = require('./logger');
const logger = fusionLogger.Logger;
const stream = fusionLogger.stream;
const moment = require('moment');
const jwt = require('express-jwt');
const auth = require('./auth');
const path = require('path');
const _ = require('lodash');

const fusionVariables = require('./fusion-variables');
const fusionData = require('./data/fusion-data-access');
const publicPath = 'public';

const port = 8081;

//const cors = require('cors');
// app.use(cors());

// configure express
app.use(morgan('combined', {stream: stream}));
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, `${publicPath}/app`)));
app.use(express.static(path.join(__dirname, publicPath)));

app.use(jwt({secret: auth.secret}).unless({path: [fusionVariables.usersApiRoute, fusionVariables.authApiRoute, '/']}));



// initialize all routes. this will load index.js
fusionData.openDatabaseConnection(function () {
    require('./routes/auth')(app);
    require('./routes/no-auth')(app);

    app.listen(port, function () {
        logger.info('App listening on port: ', port);
    });
});


// catch 404 and forward to error handler
/*app.use(function (req, res, next) {
 var err = new Error('Not Found');
 err.status = 404;
 next(err);
 });*/

// error handler
/*app.use(function (err, req, res, next) {
 // set locals, only providing error in development
 res.locals.message = err.message;
 res.locals.error = req.app.get('env') === 'development' ? err : {};

 // render the error page
 res.status(err.status || 500);
 res.render('error');
 });*/

module.exports = app;
