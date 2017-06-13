(function () {
    angular
        .module('wbdvDirectives',['WebAppMaker'])
        .directive('wbdvSortable',wbdvSortable);

    function wbdvSortable(widgetService,$routeParams,$location) {
        function linkFunction(scope,element) {
            var pageId = $routeParams.pageId+"";
            var userId = $routeParams.userId;
            var websiteId  = $routeParams.websiteId;
            $(element).sortable({
                axis:"y",
                distance:30,
                cursor: "move",
                start:function( event, ui ) {
                    $(this).attr('data-previndex', ui.item.index());
                },
                update: function( event, ui ) {
                    var oldIndex = ""+$(this).attr('data-previndex');
                    var newIndex = ""+ui.item.index();
                    var url = "/page/"+pageId+"/widget?initial="+oldIndex+"&final="+newIndex;
                    widgetService.updateWidgetPosition(pageId,oldIndex,newIndex);
                        // .then(function (response) {
                        //     console.log(response);
                        //     $location.url("/user/"+userId+"/website/"+websiteId+"/page/"+pageId+"/widget");
                        // });
                }
            });

        }
        return {
            link:linkFunction
        }
    }
})();