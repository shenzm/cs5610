var favoriteControllers = angular.module('favoriteControllers', []);

favoriteControllers.controller('favoriteCtrl', ['$scope', 'favorateService',
    function ($scope, favorateService) {
        $scope.businessList = favorateService.getFavorites();

        $scope.removeFavorite = function (item) {
            favorateService.removeFavorite(item);
            $scope.businessList = favorateService.getFavorites();
        };
    }
]);