var favoriteControllers = angular.module('favoriteControllers', []);

favoriteControllers.controller('favoriteCtrl', ['$scope', '$http',
    function ($scope, $http, favorateService) {

        $http.get("/api/favorites")
        .success(function (response) {
            $scope.businessList = response;
        });

        $scope.removeFavorite = function (index) {
            $http.delete("/api/favorite/" + index)
            .success(function (response) {
                $scope.businessList = response;
            })
        };

    }
]);