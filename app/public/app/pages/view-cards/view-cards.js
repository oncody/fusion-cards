'use strict';

angular.module('fusion').controller('ViewCardsController', ['$scope', '$http', '$interval'
    , function ($scope, $http, $interval) {

        $scope.cardsPerPage = 24;
        $scope.currentPageNumber = 1;
        $scope.cardOffset = 0;
        $scope.totalPages = 1;

        $scope.properties = {};
        $scope.properties.type = ['entity', 'spell'];
        $scope.properties.element = ['earth', 'fire', 'wind', 'water', 'light', 'dark', 'rogue', 'warrior', 'wizard', 'marauder', 'titan', 'cleric', 'psion', 'necromancer', 'raider'];
        $scope.properties.set = ['alpha', 'beta', 'future', 'never'];
        $scope.properties.strength = ['unplayable', 'weak', 'balanced', 'strong', 'overpowered'];
        $scope.properties.rarity = ['common', 'rare', 'incredible', 'extraordinary'];
        $scope.properties.cost = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

        $scope.allCards = [];
        $scope.visibleCards = [];

        $scope.filters = {};

        for (let property in $scope.properties) {
            $scope.filters[property] = [];
        }


        $scope.fetchCards = function () {
            $http.get('/api/cards')
                .then(function (response) {
                    $scope.allCards = response.data.cards;
                    watchCards();
                    refreshVisibleCards();
                });
        };

        $scope.fetchCards();
        $interval($scope.fetchCards, 5000);

        $scope.nextPage = function () {
            if ($scope.currentPageNumber < $scope.totalPages) {
                $scope.currentPageNumber++;
                $scope.cardOffset += $scope.cardsPerPage;
            }
        };

        $scope.previousPage = function () {
            if ($scope.currentPageNumber > 1) {
                $scope.currentPageNumber--;
                $scope.cardOffset -= $scope.cardsPerPage;
            }
        };

        $scope.toggleFilter = function (filter, value) {
            let index = $scope.filters[filter].indexOf(value);
            if (index === -1) {
                $scope.filters[filter].push(value);
            } else {
                $scope.filters[filter].splice(index, 1);
            }

            refreshVisibleCards();
        };

        function shouldDisplayCard(card) {
            for (let filter in $scope.filters) {
                if ($scope.filters[filter].length === 0){
                    continue;
                }

                if(filter === 'element'){
                    let elementFound = false;
                    for(let elementFilter of $scope.filters[filter]){
                        if(card.tech.hasOwnProperty(elementFilter)){
                            elementFound = true;
                        }
                    }

                    if(!elementFound){
                        return false;
                    }
                } else {
                     if ($scope.filters[filter].indexOf(card[filter]) === -1) {
                        return false;
                    }
                }

            }

            return true;
        }

        function refreshVisibleCards() {
            $scope.visibleCards = [];
            $scope.allCards.forEach(function (card) {
                if (shouldDisplayCard(card)) {
                    $scope.visibleCards.push(card);
                }
            });

            $scope.totalPages = Math.ceil($scope.visibleCards.length / $scope.cardsPerPage);
        }

        function watchCards() {
            for (let i = 0; i < $scope.allCards.length; i++) {
                $scope.$watch(`allCards[${i}]`, function (newCard, oldCard) {
                    if (newCard && oldCard && (newCard._id === oldCard._id) && (newCard !== oldCard)) {
                        $http.put('/api/cards', newCard).then(refreshVisibleCards);
                    }
                }, true);
            }
        }
    }]);
