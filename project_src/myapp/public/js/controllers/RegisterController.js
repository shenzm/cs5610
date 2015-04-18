var registerController = angular.module("registerController", []);

registerController.controller("RegisterController", ["$scope", "$http", "$location",
    function ($scope, $http, $location) {
        var warningsField = null;
        $scope.register = function (user, confirm) {
            if (!user.email || !user.password || !user.username ||
                !user.firstname || !user.lastname || !confirm) {
                // HTML5 will remaind user these fields are required
            }
            else {
                $scope.warnings = null;
                // HTML5 doesn't cover this valiation
                if (user.password != user.passwordConfirm) {
                    warningsField = "password";
                    $scope.warnings = ["Two password are not matched!"];
                }
                else {
                    $http.post("/register", { newUser: user })
                        // Send register request
                        .success(function (response) {
                            if (response.status == "Warning") {
                                warningsField = "email";
                                $scope.warnings = [response.message];
                            }
                            else {
                                $location.path("/welcome", response.user);
                            }
                        })
                        .error(function (err) {
                            console.log(err);
                            $scope.warnings = ["Register error, please try again later."];
                        });
                }
            }
        };
        $scope.clearWarning = function (changedField) {
            if(warningsField == changedField)
                $scope.warnings = null;
        };
    }
]);
