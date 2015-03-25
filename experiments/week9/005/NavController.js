var navController = angular.module("navController", []);

navController.controller("NavController", ["$scope", "$http", "$location", "$rootScope",
    function ($scope, $http, $location, $rootScope) {
        $scope.signout = function() {
            $http.post("/signout")
                .success(function(){
                    $rootScope.currentUser = null;
                    $location.url("/home");
                });
        }
    }
]);