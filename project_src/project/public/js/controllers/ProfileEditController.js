var profileEditController = angular.module("profileEditController", ['angularFileUpload']);

profileEditController.controller("ProfileEditController",
    function ($scope, $http, $rootScope, $location, $upload) {
        $scope.note = "Choose a jpeg file";
        $scope.newUser = {
            firstname: $rootScope.currentUser.firstname,
            lastname: $rootScope.currentUser.lastname,
            username: $rootScope.currentUser.username,
            email: $rootScope.currentUser.email,
            img_url: $rootScope.currentUser.img_url || "http://placehold.it/300x300"
        };

        $scope.updateUser = function () {
            $http.post('/api/user/update', {'user_info': $scope.newUser}).success(
                function (user) {
                    console.log("update success !");
                    $location.url("/profile");
                })
        };

        $scope.updatePassword = function () {
            var pwd = $scope.newPassword;
            var pwdConfirm = $scope.newPasswordConfirm;
            if (pwd != pwdConfirm) {
                alert("Two password are not matched!");
            }
            else {
                $http.post("/api/user/update/password", { newpwd: pwd})
                    .success(function (user) {
                        $location.url("/profile");
                    });
            }
        };

        $scope.cancelEdit = function () {
            $location.url("/profile");
        };

        $scope.$watch('files', function () {
            console.log($scope.files);
        });

        $scope.uploadFile = function () {
            var files = $scope.files;
            if (files && files.length) {
                var file = files[0];
                if (file.type != "image/jpeg") {
                    $scope.files = null;
                    $scope.note = "Please change to a jpeg file";
                }
                else {
                    $upload.upload({
                        url: '/api/photo',
                        fields: {'username': $scope.username},
                        file: file
                    }).success(function (data, status, headers, config) {
                        $scope.files = null;
                        $scope.newUser.img_url = data.url;
                    });
                }
            }
        }
    }
);