var businessList = [
    { name: 'Giacomo’s Ristorante', category: 'Italian', price: '20', rating: '4.0' },
    { name: 'The Salty Pig', category: 'Italian', price: '40', rating: '4.5' },
    { name: 'Locale', category: 'Italian', price: '15', rating: '4.5' }
];

var homeControllers = angular.module('homeControllers', [
    'appServices'
]);

homeControllers.controller('homeCtrl', ['$scope', 'favorateService',
    function ($scope, favorateService) {
        $scope.businessList = businessList;
        $scope.addFavorite = function (b) {
            favorateService.addFavorite(b);
        };
        $scope.inFavorite = function (b) {
            return favorateService.inFavorite(b);
        };
    }
]);