var registerController = angular.module("registerController", []);

registerController.controller("RegisterController", ["$scope", "$http", "$location",
    function ($scope, $http, $location) {
        var warningsField = null;
        $scope.register = function (user, confirm) {
            if (!user.email || !user.password || !confirm) {}
            else if (user.password != user.password2) {
                warningsField = "password";
                $scope.warnings = ["Two password are not matched!"];
            }
            else {
                console.log(user);
                $http.post("/register", user)
                    .success(function (response){
                        if (response.status == "Error") {
                            warningsField = "error";
                            $scope.warnings = ["Register error, please try again later."];
                        }
                        else if (response.status == "Duplicate") {
                            warningsField = "email";
                            $scope.warnings = ["The Email has been registered, please try another one."];
                        }
                        else {
                            $location.path("/welcome", user);
                        }
                    });
            }
        };
        $scope.clearWarning = function (changedField) {
            if(warningsField == changedField)
                $scope.warnings = null;
        };
    }
]);
