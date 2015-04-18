var fileUploadController = angular.module("fileUploadController", ['angularFileUpload']);

fileUploadController.controller('FileUploadController',
    function($scope, FileUploader) {
        console.log("here");
        $scope.uploader = new FileUploader({
            queueLimit: 1
        });

        $scope.upload = function () {
            console.log("222");
        }
    });