(function () {
    angular
        .module('WebAppMaker')
        .controller('FlickrImageSearchController',FlickrImageSearchController);

    function FlickrImageSearchController(FlickrService,$location,$routeParams,widgetService) {
        var model = this;
        model.searchPhotos = searchPhotos;
        model.selectPhoto = selectPhoto;
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
            widgetService
                .findWidgetById(model.widgetId)
                .then(function (widget) {
                    widget.url = "https://farm"+photo.farm+".staticflickr.com/"+photo.server+"/"+photo.id+"_"+photo.secret+"_s.jpg";
                    widgetService
                        .updateWidget(model.widgetId,widget)
                        .then(function () {
                            $location.url('/user/'+model.userId+"/website/"+model.websiteId+"/page/"+model.pageId+"/widget");
                        });
                });
        }


    }
})();