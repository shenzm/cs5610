var bookDetailController = angular.module("bookDetailController", ["favoriteService"]);

function formatResult (volume) {
    var authors_list = volume.volumeInfo.authors;
    var category_list = volume.volumeInfo.categories;
    var authors_string = "";
    var categories_string = "";
    var i;
    if(authors_list != null) {
        for(i = 0; i < authors_list.length; i++) {
            authors_string += authors_list[i];
            if (i + 1 < authors_list.length){
                authors_string += ", ";
            }
        }
    }
    if(category_list != null) {
        for(i = 0; i < category_list.length; i++) {
            categories_string += category_list[i];
            if (i + 1 < category_list.length){
                categories_string += " | ";
            }
        }
    }
    volume.volumeInfo.authors_string = authors_string;
    volume.volumeInfo.categories_string = categories_string;
    return volume;
}

bookDetailController.controller("BookDetailController",
    function ($scope, $http, $rootScope, $routeParams, $location, favoriteService) {
        $scope.waitingResult1 = true;
        $scope.waitingResult2 = true;
        $scope.reviews = [];
        $scope.people = [];
        var id = $routeParams.id;

        $http.get('/api/review/' + $routeParams.id)
            .success(function (response){
                $scope.reviews = response;
            }).error(function(response){
                console.log(response);
            });

        $http.get("https://www.googleapis.com/books/v1/volumes/" + id)
            .success(function(response){
                $scope.waitingResult1 = false;
                $scope.volume = formatResult(response);
            }).error(function(response){
                console.log(response);
            });
        //search for people who favorites this volume id
        $http.get("/api/favorites/" + id)
            .success(function(response){
                $scope.waitingResult2 = false;
                console.log(response);
                $scope.people = response;
            }).error(function(response) {
                console.log(response);
            });

        $scope.viewOthersProfile = function (uid) {
            $location.url("/profile_other/" + uid);
        };

        $scope.addFavorite = function (id, volumeInfo) {
            setTimeout(function () {
                $('#pop-hint').popover('show');
            }, 0);
            setTimeout(function () {
                $('#pop-hint').popover('hide');
            }, 1000);
            var volume_sketch = {
                id: id,
                thumbnail: volumeInfo.imageLinks.thumbnail,
                title: volumeInfo.title,
                categories: volumeInfo.categories,
                authors: volumeInfo.authors,
                averageRating: volumeInfo.averageRating,
                ratingsCount: volumeInfo.ratingsCount
            };
            favoriteService.put(volume_sketch).
                success(function (response) {
                    console.log(response);
                }).error(function (err) {
                    if(err == 'Unauthorized')
                        $location.url("/signin");
                });
        };

        $scope.submitReview = function () {
            if ($rootScope.currentUser == null) {
                $location.url("/signin");
            }
            else {
                var review_obj = {
                    book_id : $routeParams.id,
                    user_id : $rootScope.currentUser._id,
                    review_time : Date.now(),
                    content: $scope.reviewContent,
                    user_name: $rootScope.currentUser.username
                };
                $http.post("/api/review", {review: review_obj})
                    .success(function (review) {
                        console.log(review);
                        $http.get('/api/review/' + $routeParams.id)
                            .success(function (response){
                                $scope.reviews = response;
                            }).error(function(response){
                                console.log(response);
                            });
                    });
            }
        };
    }
);