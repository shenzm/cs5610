var profileOtherController = angular.module("profileOtherController", []);

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

profileOtherController.controller("ProfileOtherController",
    function ($scope, $http, $rootScope, $location, $routeParams) {
        $scope.viewDetail = function (id) {
            $location.url("/book_detail/" + id);
        };

        $scope.viewOthersProfile = function (uid) {
            $location.url("/profile_other/" + uid);
        };

        $scope.addFriend = function (user) {
            if (user._id == $rootScope.currentUser._id) {
                return;
            }
            setTimeout(function () {
                $('#pop-hint').popover('show');
            }, 0);
            setTimeout(function () {
                $('#pop-hint').popover('hide');
            }, 1000);
            var user_sketch = {
                id: user._id,
                thumbnail: user.thumbnail,
                username: user.username,
                email: user.email,
                firstname: user.firstname,
                lastname: user.lastname,
                img_url: user.img_url
            };
            $http.put('/api/friends', {'user_sketch': user_sketch}).success(function (response) {
                console.log("addFriend: " + response);
            });
        };

        var user_id = $routeParams.id;
        $http.get('/api/user/public/' + user_id).success(function (user) {
            $scope.otherUser = user;
            var favorites = user.favoriteBooks;
            var friends = user.friends;
            var friendIDs = getFriendIDs(friends);
            favorites = formatBooks(favorites);
            $http.post("/api/users", {user_id_list: friendIDs}).success(function (response) {
                $scope.tabs = [
                    { title:'Favorites', content: favorites},
                    { title:'Friends', content: response }
                ];
            });
        });
    }
);