'use strict';

angular.module('fusion').controller('RegisterController', function ($scope, $http) {
    $scope.register = function () {
        if($scope.form.password !== $scope.form.confirm){
            setError('Passwords do not match');
        } else if($scope.form.password.length < 8){
            setError('Password must be at least 8 characters');
        } else {
            $scope.error = '';
            $http.post('/api/users', $scope.form);
        }
    };

    function setError(str){
        $scope.error = str;
        $scope.form.password = '';
        $scope.form.confirm = '';
    }
});