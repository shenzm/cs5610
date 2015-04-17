var favoriteControllers = angular.module('favoriteControllers', []);

favoriteControllers.controller('favoriteCtrl', ['$scope', 'favorateService',
    function ($scope, favorateService) {
        $scope.businessList = favorateService.getFavorites();
    }
]);