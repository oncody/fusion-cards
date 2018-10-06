'use strict';

const logger = require('./../logger').Logger;
const ObjectId = require('mongodb').ObjectID;

const DB_OPERATION_SUCCEEDED = 1;

module.exports.insertDocument = function (collection, document, callback) {
    collection.insertOne(document, function (err) {
            if (err) {
                logger.error(`Db insert one document: ${document} into collection: ${collection.s.namespace} error: ${err}`);
            }

            if (callback) {
                callback();
            }
        }
    );
};

module.exports.deleteDocument = function (collection, query, callback) {
    collection.deleteOne(query, function (err, result) {
            if (err) {
                logger.error(`Db deleteOne query: ${query} into collection: ${collection.s.namespace} error: ${err}`);
            }

            if ((result.result.ok !== DB_OPERATION_SUCCEEDED) || (result.result.n !== DB_OPERATION_SUCCEEDED)) {
                logger.error(`Db deleteOne found no matches for query: ${JSON.stringify(query)} into collection: ${collection.s.namespace}`);
            }

            if (callback) {
                callback();
            }
        }
    );
};

module.exports.findAndReplaceDocument = function (collection, replacement, callback) {
    // need to cast id from string to mongo db object id
    let query = {_id: new ObjectId(replacement._id)};

    // right now you have a string version of your id. you could either replace it with an object id or just remove it
    delete replacement._id;
    collection.findOneAndReplace(query, replacement, function (err, result) {
            if (err) {
                logger.error(`Db findOneAndReplace document: ${JSON.stringify(replacement)} into collection: ${collection.s.namespace} error: ${JSON.stringify(err)}`);
            }
            if ((result.ok !== DB_OPERATION_SUCCEEDED) || !result.lastErrorObject.updatedExisting || (result.lastErrorObject.n !== DB_OPERATION_SUCCEEDED)) {
                logger.error(`Db findOneAndReplace found no matches for query: ${JSON.stringify(query)} into collection: ${collection.s.namespace}`);
            }

            if (callback) {
                callback();
            }
        }
    );
};

// might need to call JSON.stringify before
module.exports.findDocument = function (collection, query, callback) {
    collection.findOne(query, function (err, foundDocument) {
        if (err) {
            logger.error(`Db find one document query: ${query} from collection: ${collection.s.namespace} error: ${err}`);
            foundDocument = undefined;
        }

        callback(foundDocument);
    });
};

module.exports.findAllDocuments = function (collection, callback) {
    collection.find().toArray(function (err, items) {
        if (err) {
            logger.error(`Db find all documents from collection: ${collection.s.namespace} error: ${err}`);
            items = [];
        }

        callback(items);
    });
};
