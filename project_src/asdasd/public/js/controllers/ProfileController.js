var profileController = angular.module("profileController", []);

function formatBook (book) {
    var authors_list = book.authors;
    var category_list = book.categories;
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
    book.authors_string = authors_string;
    book.categories_string = categories_string;
    return book;
}

function formatBooks (book_list) {
    var i;
    for(i=0 ; i < book_list.length; i++) {
        book_list[i] = formatBook(book_list[i]);
    }
    return book_list;
}

function getFriendIDs (friends) {
    var i;
    var friendIDs = [];
    for(i=0 ; i < friends.length; i++) {
        friendIDs.push(friends[i].id);
    }
    return friendIDs;
}


profileController.controller("ProfileController",
    function ($scope, $http, $rootScope, $location) {
        var favorites = $rootScope.currentUser.favoriteBooks;
        var friends = $rootScope.currentUser.friends;
        var friendIDs = getFriendIDs(friends);

        $http.post("/api/users", {user_id_list: friendIDs}).success(function (response) {
            $scope.tabs = [
                { title:'Favorites', content: favorites},
                { title:'Friends', content: response }
            ];
        });
        favorites = formatBooks(favorites);

        $scope.viewDetail = function (id) {
            $location.url("/book_detail/" + id);
        };

        $scope.viewOthersProfile = function (uid) {
            console.log("others_id" + uid);
            $location.url("/profile_other/" + uid);
        };

        $scope.removeFavorite = function (id) {
            $http.delete('/api/favorites/' + id)
                .success(function (user) {
                    $rootScope.currentUser = user;
                    favorites = $rootScope.currentUser.favoriteBooks;
                    favorites = formatBooks(favorites);
                    $scope.tabs[0].content = favorites;
                });
        };

        $scope.removeFriends = function (id) {
            $http.delete('/api/friends/' + id)
                .success(function (user) {
                    $rootScope.currentUser = user;
                    friends = $rootScope.currentUser.friends;
                    var friendIDs = getFriendIDs(friends);
                    $http.post("/api/users", {user_id_list: friendIDs})
                        .success(function (response) {
                            $scope.tabs[1].content = response;
                        });
                });
        };

    }
);