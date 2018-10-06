'use strict';

angular.module('fusion').controller('NewCardController', function ($scope, $http, $timeout) {
        $scope.types = ['entity', 'spell'];
        $scope.elements = ['earth', 'fire', 'wind', 'water', 'light', 'dark', 'rogue', 'warrior', 'wizard', 'marauder', 'titan', 'cleric', 'psion', 'necromancer', 'raider'];
        $scope.rarities = ['common', 'rare', 'incredible', 'extraordinary'];
        $scope.sets = ['alpha', 'beta', 'future', 'never'];
        $scope.strengths = ['unplayable', 'weak', 'balanced', 'strong', 'overpowered'];

        $scope.form = {};
        $scope.form.element = 'earth';
        $scope.form.tech = 0;

        $scope.card = {};
        $scope.card.type = 'spell';
        $scope.card.cost = '0';

        $scope.postCard = function () {
            $scope.card.tech = {};
            $scope.card.tech[$scope.form.element] = $scope.form.tech;
            $http.post('/api/cards', $scope.card);
            $scope.notes = `${$scope.card.name} created`;
            $timeout(clearNotes, 3000);
        };

        function clearNotes(){
            $scope.notes = '';
        }

        $scope.formatCard = function () {
            if ($scope.card.type === 'spell') {
                if ($scope.card.damage)
                    delete $scope.card.damage;

                if ($scope.card.health)
                    delete $scope.card.health;
            }
        };
    });