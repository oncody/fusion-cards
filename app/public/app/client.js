'use strict';

// Declare app level module which depends on views, and components
// angular.module('fusion', more args) will create the app
const app = angular.module('fusion', ['ngRoute']);

app.config(function ($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'pages/home/home.html',
            controller: 'HomeController'
        })
        .when('/login', {
            templateUrl: 'pages/login/login.html',
            controller: 'LoginController'
        })
        .when('/register', {
            templateUrl: 'pages/register/register.html',
            controller: 'RegisterController'
        })
        .when('/view-cards', {
            templateUrl: 'pages/view-cards/view-cards.html',
            controller: 'ViewCardsController'
        })
        .when('/new-card', {
            templateUrl: 'pages/new-card/new-card.html',
            controller: 'NewCardController'
        })
        .otherwise({
            redirectTo: '/'
        });
})
/*    .config(['$locationProvider', '$routeProvider', function ($locationProvider, $routeProvider) {
 $locationProvider.hashPrefix('!');

 $routeProvider.otherwise({redirectTo: '/view1'});
 }])*/
;

app.config(function ($httpProvider) {
    $httpProvider.interceptors.push(function ($window, $q, $location) {
        return {
            request: function (request) {
                let token = $window.localStorage.getItem('token');
                if (token) {
                    request.headers.Authorization = 'Bearer ' + token;
                }
                return request;
            },
            requestError: function (request) {
                return $q.reject(request)
            },
            responseError: function (response) {
                if (response.status === 401) {
                    if ($window.localStorage.getItem('token')) {
                        $window.localStorage.removeItem('token');
                    }
                    $window.location = '#/login';
                }
                return $q.reject(response)
            },
            response: function (response) {
                return response;
            }
        };
    });
});