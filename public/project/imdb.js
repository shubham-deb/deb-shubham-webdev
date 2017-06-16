(function () {
    $(init);
    function init() {
        $('#searchMovie').click(searchMovie);
        var movieTitle = $('#movieTitle');
        var API_KEY = "8b4a101400c25efdf094f6b9b8081675";
        var table = $('#results');
        var tbody = table.find("tbody");

        var poster_path = "";

        function searchMovie() {
            var title = movieTitle.val();
            var results = 1;
            var configUrl = {
                "async": true,
                "crossDomain": true,
                "url": "https://api.themoviedb.org/3/configuration?api_key="+API_KEY,
                "method": "GET",
                "headers": {},
                "data": "{}"
            };
            var movieUrl = {
                "async": true,
                "crossDomain": true,
                "url": "https://api.themoviedb.org/3/search/movie?query="+title+
                        "&include_adult=false&page="+results+"&language=en-US&api_key="+API_KEY,
                "method": "GET",
                "headers": {},
                "data": "{}"
            };

            $.ajax(configUrl).done(function (configs) {
                var baseURL = configs.images.secure_base_url+"";
                var size = configs.images.poster_sizes[1];
                poster_path = baseURL + size;
            });

            $.ajax(movieUrl).done(function (movies) {
                tbody.empty();

                for(var m in movies.results){
                    var movie = movies.results[m];
                    // console.log(movie);
                    var title = movie.title;
                    var poster = poster_path+movie.poster_path;
                    var plot = movie.overview;

                    var tr = $("<tr>");

                    var titletd = $("<td>").append(title);
                    var plottd = $("<td>").append(plot);
                    var img = $("<img>").attr("src",poster);
                    var postertd = $("<td>").append(img);

                    tr.append(titletd);
                    tr.append(plottd);
                    tr.append(postertd);

                    tbody.append(tr);
                }
            });
        }
    }
})();