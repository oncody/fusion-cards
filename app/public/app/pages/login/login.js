'use strict';

angular.module('fusion').controller('LoginController', function ($scope, $http, $window) {
    $scope.login = function () {
        // let form = {};
        // form.username = $scope.form.username;
        // form.password = $scope.form.password;

        $http.post('/api/auth', $scope.form).then(function(response) {
            $window.localStorage.setItem('token', response.data.token);
        });
    };
});