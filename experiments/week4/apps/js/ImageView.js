var initEvents = [
    {
        "eventName": "NEU Spring 2015 Career Fair",
        "time": "2015-02-05T16:00:00.100Z",
        "place": "Cabot Cage",
        "imgUrl": "../../../images/week4/NEU.jpg"
    },
    {
        "eventName": "NFL Super Bowl XLIX",
        "time": "2015-02-01T23:30:00.100Z",
        "place": "University of Phoenix Stadium",
        "imgUrl": "../../../images/week4/NFL.jpg"
    },
    {
        "eventName": "NBA All-Star Game",
        "time": "2015-02-16T01:00:00.100Z",
        "place": "Madison Square Garden",
        "imgUrl": "../../../images/week4/NBA.jpg"
    },
    {
        "eventName": "Hotel Week Boston",
        "time": "2015-02-22T13:00:00.100Z",
        "place": "Greater Boston Convention",
        "imgUrl": "../../../images/week4/HOTEL.jpg"
    }
]

var app = angular.module("ImageView", []);

app.controller("ImageViewController",
function ($scope) {

    $scope.events = initEvents;
    $scope.mainEvent = initEvents[0];

    $scope.setMainEvent = function (e) {
        $scope.mainEvent = e;
    };

});