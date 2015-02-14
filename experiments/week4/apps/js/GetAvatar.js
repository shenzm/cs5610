var app = angular.module("GetAvatar", []);

app.controller("GetAvatarController",
function ($scope, $http) {
    var apiKey = '';
    var npUrl = 'http://www.myapifilms.com/imdb?title=avatar&format=JSONP&limit=3';

    $scope.getAvatar = function () {
        $http({
            method: 'JSONP',
            url: npUrl + '&callback=JSON_CALLBACK'
        }).success(function (data) {
            var movies = data;
            $scope.movies = movies;
            console.log("Hello");
        }).error(function (data, status, headers, config) {
            alert("Error finding movie");
        });
    };
});

// Survive minification 
// app.controller("GetAvatarController", ["$scope", function(){}]);