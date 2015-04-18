var authService = angular.module('authService', ['ngResource']);

authService.factory('authService',
    function($resource) {
        var authService = {};
        authService.loggedIn = function () {
            return $resource('/loginCheck', null, {
                'check': { method: 'GET' }
            })
        };
        return authService;
    }
);
