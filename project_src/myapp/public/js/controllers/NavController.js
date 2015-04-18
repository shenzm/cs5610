var navController = angular.module("navController", ["authService"]);

navController.controller("NavController", ["$scope", "$http", "$location", "$rootScope", "$resource", "authService",
    function ($scope, $http, $location, $rootScope, $resource, authService) {
        var resource = authService.loggedIn();
        var loggedInUser = resource.check(
            function () {
                if(!loggedInUser["_id"]) {
                    console.log("Not logged in");
                    $rootScope.currentUser = null;
                }
                else {
                    console.log("Already logged in");
                    $rootScope.currentUser = loggedInUser;
                }
            }
        );

        $scope.signout = function() {
            $http.post("/signout")
                .success(function(){
                    $rootScope.currentUser = null;
                    console.log("logout");
                    $location.url("/");
                });
        }
    }
]);