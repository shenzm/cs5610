var forgetController = angular.module("forgetController", []);

forgetController.controller("ForgetController", ["$scope", "$http", "$location",
    function ($scope, $http, $location) {

        $scope.resetPassword = function (email) {
            var hint = "If success, page will br automatically redirected to login page ...";
            $scope.warnings = [hint];
            $http.post("/forget", { email: email} )
                .success(function (response) {
                    if (response.status == "Error") {
                        $scope.warnings = ["Error happerns, try agina later!"]
                    }
                    else if (response.status == "Warning") {
                        $scope.warnings = [response.message];
                    }
                    else if (response.status == "Success") {
                        $location.path("/signin", response);
                    }
                })
                .error(function (err) {
                    $scope.warnings = ["API not provided"];
                    console.log(err);
                })
        };
    }
]);
