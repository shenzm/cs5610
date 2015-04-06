var profileController = angular.module("profileController", []);

profileController.controller("ProfileController",
    function ($scope) {
        $scope.tabs = [
            { title:'Dynamic Title 1', content:'Dynamic content 1' },
            { title:'Dynamic Title 2', content:'Dynamic content 2' }
        ];
    }
);