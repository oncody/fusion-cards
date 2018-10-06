'use strict';

angular.module('fusion').controller('IndexController', ['$scope', '$http', '$window'
    , function ($scope, $http, $window) {
        $scope.isLoggedIn = function () {
            return $window.localStorage.getItem('token');
        };

        $scope.logout = function () {
            $window.localStorage.removeItem('token');
        }
    }]);
