var favoriteService = angular.module('favoriteService', ['ngResource']);

favoriteService.factory('favoriteService', function($http) {

    return {
        get : function() {
            return $http.get('/api/favorites');
        },

        put : function(volume_sketch) {
            return $http.put('/api/favorites', {'volume_sketch': volume_sketch});
        }
    }

});