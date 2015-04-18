var welcomeController = angular.module("welcomeController", ['ui.bootstrap']);

welcomeController.controller("WelcomeController",
    function ($scope) {
        $scope.myInterval = 4000;
        $scope.slides = [
            {
                "image": "https://s3.amazonaws.com/zhenmins-public-img/book-1.jpg",
                "text": "Lord of the ring"
            },
            {
                "image": "https://s3.amazonaws.com/zhenmins-public-img/book-2.jpg",
                "text": "The Da Vinci Code"
            },
            {
                "image": "https://s3.amazonaws.com/zhenmins-public-img/book-3.jpg",
                "text": "Harry Potter"
            }
        ]
    }
);
