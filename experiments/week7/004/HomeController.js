var homeController = angular.module("homeController", []);

homeController.controller("HomeController", ["$scope", "$http",
    function ($scope, $http) {
        $http
            .get("/api/restaurants")
            .success(function (response) {
                $scope.businessList = response;
            });

        $scope.addFavorite = function (b) {
            $http
                .get("/api/restaurants/" + b._id)
                .success(function (response) {
                    console.log(response);
                })
        };
    }
]);
