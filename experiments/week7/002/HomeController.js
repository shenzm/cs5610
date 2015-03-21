var homeController = angular.module("homeController", []);

homeController.controller("HomeController", ["$scope", "$http",
    function ($scope, $http) {
        $http
            .get("/api/restaurants")
            .success(function (response) {
                $scope.businessList = response;
            });
    }
]);
