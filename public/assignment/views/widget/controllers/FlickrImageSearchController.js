(function () {
    angular
        .module('WebAppMaker')
        .controller('FlickrImageSearchController',FlickrImageSearchController);

    function FlickrImageSearchController(currentUser,FlickrService,$location,$routeParams,widgetService) {
        var model = this;
        model.searchPhotos = searchPhotos;
        model.selectPhoto = selectPhoto;
        model.websiteId = $routeParams.websiteId;
        model.widgetId = $routeParams.widgetId;
        model.userId = currentUser._id;
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
            widgetService
                .findWidgetById(model.widgetId)
                .then(function (widget) {
                    widget.url = "https://farm"+photo.farm+".staticflickr.com/"+photo.server+"/"+photo.id+"_"+photo.secret+"_s.jpg";
                    widgetService
                        .updateWidget(model.pageId,model.widgetId,widget)
                        .then(function () {
                            $location.url("/website/"+model.websiteId+"/page/"+model.pageId+"/widget");
                        });
                });
        }


    }
})();