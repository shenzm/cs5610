var businessApp = angular.module("BusinessApp", [
    'ngRoute',
    'homeControllers',
    'favoriteControllers'
]);

businessApp.config(['$routeProvider',
    function ($routeProvider) {
        $routeProvider.
            when('/', {
                templateUrl: 'partials/home.html',
                controller: 'homeCtrl'
            }).
            when('/favorite', {
                templateUrl: 'partials/favorite.html',
                controller: 'favoriteCtrl'
            }).
            when('/partial2', {
                templateUrl: 'partials/partial2.html'
            }).
            otherwise({
                redirectTo: '/'
            });
    }]);