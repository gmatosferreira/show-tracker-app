$(document).ready(function(){
    
    // Get keyword to serach for
    params = (new URL(window.location)).searchParams;
    id = params.get('id');
    console.log(id);

    if (id == null || id == "")
        window.history.back();

        
    // Get movie data
    movie = null;
    genres = null;
    $.getJSON("https://ihc.gmatos.pt/DB/movies.json", function(json) {
        json['data'].forEach((value, index) => {
            if (value['id']==id) {
                movie = value;
                genres = value['genres']
                console.log(movie);
                console.log(genres);
            }
        });

        if (movie==null)
            window.history.back();

        // Add content to HTML
        $("#movieData h1").text(movie['movieName']);
        $("#movieData img").attr('src', 'https://www.thetvdb.com'+movie['banner']);
        if (movie['overview']==null)
            movie['overview'] = "Sinopse não disponível";
        $("#movieData p").text(movie['overview']);
        $("#movieData #genres").text(genres);
        
        // Show HTML
        $("#main").removeClass("d-none");
        $("#main").hide();
        $("#main").fadeIn();

    });


    // Want to see button
    $("#wantToSeeMovie").click(function () {
        console.log("#wantToSee");
        console.log(movie);
        if (userWatchedMovieByID(movie['id'])) {
            // Some error might have happened, just reload
        } else {
            // Add series to watched list
            userLogin['watched']['movies'].push({
                "id": movie['id'],
                "seen": []
            });
            localStorage.setItem('login', JSON.stringify(userLogin));
        }
        window.location.reload();
    });

});