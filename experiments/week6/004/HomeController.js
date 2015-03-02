var homeControllers = angular.module('homeControllers', [
    'appServices'
]);

homeControllers.controller('homeCtrl', ['$scope', '$http', 'favorateService',
    function ($scope, $http, favorateService) {

        $http.get("/api/businessList")
        .success(function (response) {
            $scope.businessList = response;
        });

        $scope.addFavorite = function (b) {
            favorateService.addFavorite(b);
        };
        $scope.inFavorite = function (b) {
            return favorateService.inFavorite(b);
        };
    }
]);