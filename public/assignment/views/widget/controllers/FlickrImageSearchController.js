(function () {
    angular
        .module('WebAppMaker')
        .controller('FlickrImageSearchController',FlickrImageSearchController);

    function FlickrImageSearchController(FlickrService,$location,$routeParams,widgetService) {
        var model = this;
        model.searchPhotos = searchPhotos;
        model.selectPhoto = selectPhoto;
        model.websiteId = $routeParams.websiteId;
        model.widgetId = $routeParams.widgetId;
        model.userId = $routeParams.userId;
        model.pageId = $routeParams.pageId;

        function searchPhotos(searchText) {
            FlickrService
                .searchPhotos(searchText)
                .then(function(response) {
                    data = response.data.replace("jsonFlickrApi(","");
                    data = data.substring(0,data.length - 1);
                    data = JSON.parse(data);
                    model.photos = data.photos;
                });

        }
        
        function selectPhoto(photo) {
            var url = "https://farm" + photo.farm + ".staticflickr.com/" + photo.server;
            url += "/" + photo.id + "_" + photo.secret + "_b.jpg";
            widget =  {'_id': model.widgetId,
                'name': '',
                'text': '',
                'url': url,
                'widgetType': 'IMAGE',
                'pageId': model.pageId,
                'width': ''};
            widgetService
                .updateWidget(model.widgetId, widget)
                .then(function (){
                    $location.url('/user/' + model.userId + '/website/' + model.websiteId + '/page/' + model.pageId + '/widget/' + model.widgetId);
                });
        }


    }
})();