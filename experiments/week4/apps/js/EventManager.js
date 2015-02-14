var app = angular.module("EventManager", []);

app.controller("EventManagerController",
function ($scope) {
    initTimes = [
        new Date(2015, 11, 12, 1, 30, 0),
        new Date(2015, 11, 14, 2, 0, 0),
        new Date(2015, 11, 15, 3, 30, 0),
        new Date(2015, 11, 16, 4, 0, 0)
    ];
    new Date(2015, 11, 16, 4, 0, 0)
    curEvents = [
        { eventName: "NBA All-Star Game", time: initTimes[0], place: "Foo Bar" },
        { eventName: "Coop Reflection", time: initTimes[1], place: "Student Center" },
        { eventName: "Amazon Hiring Event", time: initTimes[2], place: "Richards Hall" },
        { eventName: "Intern Orientation", time: initTimes[3], place: "Student Center" }
    ];
    $scope.events = curEvents;
    $scope.addEvent = function (event) {
        newEvent = { eventName: event.eventName, time: event.time, place: event.place };
        curEvents.push(newEvent);
    };
    $scope.removeEvent = function (event) {
        var index = curEvents.indexOf(event);
        curEvents.splice(index, 1);
    };
});