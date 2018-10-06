'use strict';

const path = require('path');
const express = require('express');

const publicPath = '/../../public';

module.exports = function (app) {
    app.get('/', function (request, response) {
        response.status(200).sendFile(path.join(__dirname + `${publicPath}/app/index.html`));
    });
};