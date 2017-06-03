/**
 * Created by debsh on 25-05-2017.
 */
(function () {
    angular
        .module('WebAppMaker')
        // declaring the instance by name and we can refer to the services by using the instance
        .service('FlickrService',FlickrService);

    function FlickrService($http,$location) {
        var key = "9003f76ede26566e0797a3b2aa8f7a16";
        var secret = "0ca5c966eac6742a";
        var urlBase = "https://api.flickr.com/services/rest/?method=flickr.photos.search&format=json&api_key=API_KEY&text=TEXT";
        this.searchPhotos = searchPhotos;

        function searchPhotos(searchTerm) {
            var url = urlBase
                        .replace("API_KEY", key)
                        .replace("TEXT", searchTerm);
            return $http.get(url);
        }

    }
})();