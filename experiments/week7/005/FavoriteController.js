var favoriteController = angular.module("favoriteController", []);

favoriteController.controller("FavoriteController", ["$scope", "$http",
    function ($scope, $http) {
        $http
            .get("/api/favorites")
            .success(function (response) {
                $scope.businessList = response;
            });

        $scope.removeFavorite = function(b) {
            $http
                .delete("/api/favorite/" + b._id)
                .success(function (response) {
                    console.log("Success");
                    $scope.businessList = response;
                });
        };
    }
]);
