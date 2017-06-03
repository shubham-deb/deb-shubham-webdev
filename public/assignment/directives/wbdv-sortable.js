(function () {
    angular
        .module('wbdvDirectives',['WebAppMaker'])
        .directive('wbdvSortable',wbdvSortable);

    function wbdvSortable($http,$routeParams) {
        function linkFunction(scope,element) {
            var pageId = $routeParams.pageId;
            $(element).sortable({
                axis:"y",
                distance:30,
                cursor: "move",
                start:function( event, ui ) {
                    $(this).attr('data-previndex', ui.item.index());
                },
                update: function( event, ui ) {
                    var oldIndex = $(this).attr('data-previndex');
                    var newindex = ui.item.index();
                    var url = "/api/page/"+pageId+"/widget?initial="+oldIndex+"&final="+newindex;
                    $http
                        .put(url)
                        .then(function (response) {
                                return response.data;
                        })
                }
            });

        }
        return {
            link:linkFunction
        }
    }
})();