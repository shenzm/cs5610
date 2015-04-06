var welcomeController = angular.module("welcomeController", ['ui.bootstrap']);

welcomeController.controller("WelcomeController",
    function ($scope) {
        $scope.myInterval = 4000;
        $scope.slides = [
            {
                "image": "https://s3.amazonaws.com/zhenmins-public-img/welcome-food1.jpg",
                "text": "Sesame chicken"
            },
            {
                "image": "https://s3.amazonaws.com/zhenmins-public-img/welcome-food2.jpg",
                "text": "Dallas Filet"
            },
            {
                "image": "https://s3.amazonaws.com/zhenmins-public-img/welcome-food3.jpg",
                "text": "Thin Crust Pizza"
            }
        ]
    }
);
