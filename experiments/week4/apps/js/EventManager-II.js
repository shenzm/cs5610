var initEvents = [
    { "eventName": "NFL Super Bowl XLIX", "time": "2015-02-01T23:30:00.100Z", "place": "University of Phoenix Stadium" },
    { "eventName": "NBA All-Star Game", "time": "2015-02-16T01:00:00.100Z", "place": "Madison Square Garden" },
    { "eventName": "NBA All-Star Saturday Night", "time": "2015-02-14T01:00:00.100Z", "place": "Barclays Center" },
    { "eventName": "NEU Spring 2015 Career Fair", "time": "2015-02-05T16:00:00.100Z", "place": "Cabot Cage" },
    { "eventName": "NEU Amazon Hiring Talk", "time": "2015-01-13T20:00:00.100Z", "place": "West Village H" },
    { "eventName": "NEU Microsoft Hiring Talk", "time": "2015-01-15T20:30:00.100Z", "place": "Richards Hall" },
    { "eventName": "NEU Global Leaders Forum", "time": "2015-03-04T20:00:00.100Z", "place": "FENWAY CENTER" },
    { "eventName": "CCIS COOP Expo", "time": "2015-02-12T20:00:00.100Z", "place": "West Village H" },
    { "eventName": "2015 Boston Wine Expo", "time": "2015-02-15T14:00:00.100Z", "place": "Seaport Hotel" },
    { "eventName": "Community Day at the MFA", "time": "2015-02-21T15:00:00.100Z", "place": "Museum of Fine Arts" },
    { "eventName": "Hotel Week Boston", "time": "2015-02-22T13:00:00.100Z", "place": "Greater Boston Convention" }
]

var app = angular.module("EventManager", []);

app.controller("EventManagerController",
function ($scope, $http) {

    for (var i = 0; i < initEvents.length; i++) {
        initEvents[i].time = new Date(initEvents[i].time);
    }

    $scope.events = initEvents;

    $scope.addEvent = function (event) {
        newEvent = { eventName: event.eventName, time: event.time, place: event.place };
        $scope.events.push(newEvent);
    };

    $scope.removeEvent = function (event) {
        var index = curEvents.indexOf(event);
        $scope.events.splice(index, 1);
    };
});