var msTrackerApp = angular.module("MSTrackerApp", [
    'ngRoute',
    'signinController'
]);

msTrackerApp.config(['$routeProvider', '$httpProvider',
    function ($routeProvider, $httpProvider) {
        $routeProvider.
            when('/', {
                templateUrl: 'partials/home.html'
            }).
            when('/signin', {
                templateUrl: 'partials/signin.html',
                controller: 'SigninController'
            }).
            when('/profile', {
                templateUrl: 'partials/profile.html',
                // Dependency
                resolve: {
                    loggedin: checkSignedin
                }
            }).
            otherwise({
                redirectTo: '/'
            });
    }]);

var checkSignedin = function($q, $timeout, $http, $location, $rootScope)
{
    //$q - asynchronous communication to server
    var deferred = $q.defer();

    $http.get('/signedin').success(function(user)
    {
        $rootScope.errorMessage = null;
        // User is Authenticated
        if (user !== '0'){
            $rootScope.currentUser = user;
            deferred.resolve();
        }
        // User is Not Authenticated
        else
        {
            $rootScope.errorMessage = 'You need to log in.';
            deferred.reject();
            $location.url('/signin');
        }
    });

    return deferred.promise;
};