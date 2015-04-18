var signinController = angular.module("signinController", []);

signinController.controller("SigninController", ["$scope", "$http", "$location",
    function ($scope, $http, $location) {
        $scope.signin = function (user) {
            $http.post("/login", user)
                .success(function (response) {
                    if (response.status == "Error") {
                        $scope.warnings = ["Error happerns, try agina later!"]
                    }
                    else if (response.status == "Warning") {
                        $scope.warnings = [response.message];
                    }
                    else {
                        $location.path("/profile", response);
                    }
                })
                .error(function (err) {
                    $scope.warnings = ["Wrong Username or Password"];
                    console.log(err);
                })
        };
        $scope.clearWarning = function () {
            $scope.warnings = null;
        };
    }
]);
