var app = angular.module("routeApp", ['ngRoute']);

app.config(['$routeProvider',
  function ($routeProvider) {
      $routeProvider.
        when('/', {
            templateUrl: 'partials/home.html'
        }).
        when('/partial1', {
            templateUrl: 'partials/partial1.html'
        }).
        when('/partial2', {
            templateUrl: 'partials/partial2.html'
        }).
        otherwise({
            redirectTo: '/'
        });
  }]);