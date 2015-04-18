var myApp = angular.module("MyApp", [
    'ngRoute',
    'homeController',
    'signinController',
    'forgetController',
    'registerController',
    'navController',
    'welcomeController',
    'booksController',
    'bookDetailController',
    'profileController',
    'profileEditController',
    'profileOtherController',
    'ui.bootstrap'
]);

myApp.config(['$routeProvider',
    function ($routeProvider) {
        $routeProvider.
            when('/', {
                templateUrl: 'views/home.html',
                controller: 'HomeController'
            }).
            when('/signin', {
                templateUrl: 'views/signin.html',
                controller: 'SigninController'
            }).
            when('/forget', {
                templateUrl: 'views/forget.html',
                controller: 'ForgetController'
            }).
            when('/register', {
                templateUrl: 'views/register.html',
                controller: 'RegisterController'
            }).
            when('/welcome', {
                templateUrl: 'views/welcome.html',
                controller: 'WelcomeController',
                resolve: {
                    loggedin: checkSignedin
                }
            }).
            when('/books', {
                templateUrl: 'views/books.html',
                controller: 'BooksController'
            }).
            when('/book_detail/:id', {
                templateUrl: 'views/book_detail.html',
                controller: 'BookDetailController'
            }).
            when('/profile', {
                templateUrl: 'views/profile.html',
                controller: 'ProfileController',
                // Dependency
                resolve: {
                    loggedin: checkSignedin
                }
            }).
            when('/profile_edit', {
                templateUrl: 'views/profile_edit.html',
                controller: 'ProfileEditController',
                resolve: {
                    loggedin: checkSignedin
                }
            }).
            when('/profile_other/:id', {
                templateUrl: 'views/profile_other.html',
                controller: 'ProfileOtherController',
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
    console.log("checkSignedin");

    $http.get('/loginCheck').success(function(user)
    {
        $rootScope.errorMessage = null;
        if (user !== null){
            $rootScope.currentUser = user;
            deferred.resolve();
        }
        else
        {
            $rootScope.errorMessage = 'You need to log in.';
            console.log("You need to log in");
            deferred.reject();
            $location.url('/signin');
        }
    });

    return deferred.promise;
};