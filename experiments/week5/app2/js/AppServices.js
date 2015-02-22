var services = angular.module('appServices', []);

services.factory('favorateService', [
    function () {
        var myFavorites = [];

        var addFavorite = function (item) {
            myFavorites.push(item);
        };

        var getFavorites = function () {
            return myFavorites;
        };

        var removeFavorite = function ($index) {
            myFavorites.splice($index, 1);
        };

        var inFavorite = function (item) {
            var index = myFavorites.indexOf(item);
            console.log(index >= 0);
            return index >= 0;
        };

        return {
            addFavorite: addFavorite,
            getFavorites: getFavorites,
            removeFavorite: removeFavorite,
            inFavorite: inFavorite
        };
    }
]);