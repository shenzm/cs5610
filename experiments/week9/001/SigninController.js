var signinController = angular.module("signinController", []);

signinController.controller("SigninController", ["$scope", "$http", "$location",
    function ($scope, $http, $location) {
        $scope.signin = function (user) {
            console.log(user);
            $http.post("/signin", user)
                .success(function (response) {
                    console.log(response);
                    $location.path("/profile", user);
                });
        }
    }
]);
