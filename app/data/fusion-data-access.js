'use strict';

const mongoDb = require('mongodb').MongoClient;
const dataAccess = require('./data-access');
const fusionVariables = require('./../fusion-variables');
const logger = require('./../logger').Logger;
const ObjectId = require('mongodb').ObjectID;

const databaseHost = ; //todo;
const databasePort = ; //todo;
const databaseName = ; //todo;
const databaseUrl = ; //todo;


module.exports.openDatabaseConnection = function(callback){
    mongoDb.connect(databaseUrl, function (err, databaseConnection) {
        if (err) {
            throw err;
        }

        let db = databaseConnection.db(databaseName);
        let usersCollection = db.collection(fusionVariables.users);
        let cardsCollection = db.collection(fusionVariables.cards);

        module.exports.insertUser = function (user) {
            dataAccess.insertDocument(usersCollection, user);
        };

        module.exports.deleteCardFromQuery = function (query, callback) {
            dataAccess.deleteDocument(cardsCollection, query, callback);
        };

        module.exports.deleteCardById = function (cardId, callback) {
            dataAccess.deleteDocument(cardsCollection, {_id: new ObjectId(cardId)}, callback);
        };

        module.exports.insertCard = function (card, callback) {
            dataAccess.insertDocument(cardsCollection, card, callback);
        };

        module.exports.findAndReplaceCard = function (card, callback) {
            dataAccess.findAndReplaceDocument(cardsCollection, card, callback);
        };

        module.exports.findAllCards = function (callback) {
            dataAccess.findAllDocuments(cardsCollection, callback);
        };

        module.exports.findCard = function (id, callback) {
            dataAccess.findDocument(cardsCollection, {_id: id}, callback);
        };

        module.exports.findUserByUsername = function (username, callback) {
            dataAccess.findDocument(usersCollection, {username: username}, callback);
        };

        logger.info('Connection established to mongo db: ', databaseUrl);
        callback();
    });
};
