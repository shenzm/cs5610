var booksController = angular.module("booksController", ["favoriteService"]);

function formatItem (book) {
    var authors_list = book.volumeInfo.authors;
    var category_list = book.volumeInfo.categories;
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
    book.volumeInfo.authors_string = authors_string;
    book.volumeInfo.categories_string = categories_string;
    return book;
}

function formatItems (book_list) {
    var i;
    for(i=0 ; i < book_list.length; i++) {
        book_list[i] = formatItem(book_list[i]);
    }
    return book_list;
}

function search ($scope, $http, type) {
    $scope.searchResult = null;
    $scope.waitingResult = true;
    $http.get("https://www.googleapis.com/books/v1/volumes", {
        params: {
            q: $scope.currentSearchInput,
            key: "AIzaSyAW4Utg2JUJuAqYpyK-8ttJ9SpbGq3vrPk",
            startIndex: ($scope.currentPage - 1) * 10,
            maxResults: 10
        }
    }).success(function(response){
        $scope.waitingResult = false;
        var items = response.items;
        items = formatItems(items);
        $scope.searchResult = items;
        if(type == "searchBooks"){
            $scope.maxPage = response.totalItems;
        }
    }).error(function(response){
        console.log(response);
    });
}

booksController.controller("BooksController",
    function ($scope, $http, $location, favoriteService) {

        $scope.options = ["Title", "Author", "Publisher", "Subject", "ISBN"];
        var keyword_map = {
            "Title": "intitle:",
            "Author": "inauthor:",
            "Publisher": "inpublisher:",
            "Subject": "subject:",
            "ISBN": "isbn:"
        };

        $scope.searchBooks = function (searchInput, selectionInput) {
            console.log(selectionInput);
            if (selectionInput != null) {
                $scope.currentSearchInput = keyword_map[selectionInput] + searchInput;
            }
            else {
                $scope.currentSearchInput = searchInput;
            }
            $scope.currentPage = 1;
            search($scope, $http, "searchBooks")
        };

        $scope.previousPage = function () {
            $scope.searchResult = null;
            if ($scope.currentPage > 1) {
                $scope.currentPage -= 1;
                search($scope, $http, "previousPage");
            }
        };

        $scope.nextPage = function () {
            $scope.searchResult = null;
            if ($scope.currentPage < $scope.maxPage) {
                $scope.currentPage += 1;
                search($scope, $http, "nextPage");
            }
        };

        $scope.viewDetail = function (id) {
            $location.url("/book_detail/" + id);
        };

        $scope.addFavorite = function (id, volumeInfo, index) {
            setTimeout(function () {
                $('#pop-hint-'+index).popover('show');
            }, 0);
            setTimeout(function () {
                $('#pop-hint-'+index).popover('hide');
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
    }
);