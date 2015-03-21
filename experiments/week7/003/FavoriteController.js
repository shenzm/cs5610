var favoriteController = angular.module("favoriteController", []);

favoriteController.controller("FavoriteController", ["$scope", "$http",
    function ($scope, $http) {
        $http
            .get("/api/favorites")
            .success(function (response) {
                $scope.businessList = response;
            });
    }
]);
