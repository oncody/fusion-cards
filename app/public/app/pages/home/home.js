"use strict";

angular.module('fusion').controller('HomeController', function ($scope) {
    $scope.text = 'This is the homeView text from the HomeController.';

    $scope.onButtonClick = function () {
        $scope.text = $scope.text.concat(' Button was clicked');
    };
});