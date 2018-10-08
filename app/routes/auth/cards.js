'use strict';

const fusionVariables = require('../../fusion-variables');
const fusionDataAccess = require('../../data/fusion-data-access');

const cardsApiRoute = `/${fusionVariables.api}/${fusionVariables.cards}`;

module.exports = function (app) {
    app.get(cardsApiRoute, function (request, response) {
        fusionDataAccess.findAllCards(function (cards) {
            let collection = {};
            collection[fusionVariables.cards] = cards;
            response.send(JSON.stringify(collection));
        });
    });

    app.post(cardsApiRoute, function (request, response) {
        fusionDataAccess.insertCard(request.body);
        response.status(201).send('Card created');
    });

    app.put(cardsApiRoute, function (request, response) {
         fusionDataAccess.findAndReplaceCard(request.body);
        response.status(200).send('Card updated');
    });

    app.delete(`${cardsApiRoute}/:cardId`, function (request, response) {
        fusionDataAccess.deleteCardById(request.params.cardId);
        response.status(200).send('Card deleted');
    });
};
