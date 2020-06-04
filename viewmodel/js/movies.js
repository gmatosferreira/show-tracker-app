$(document).ready(function(){
    
    // Get keyword to serach for
    params = (new URL(window.location)).searchParams;
    id = params.get('id');
    console.log(id);

    if (id == null || id == "")
        window.history.back();

        
    // Get movie data
    movie = null;
    mymov = null;
    genres = null;
    $.getJSON("https://ihc.gmatos.pt/DB/movies.json", function(json) {
        json['data'].forEach((value, index) => {
            if (value['id']==id) {
                movie = value;
                mymov = value;
                genres = value['genres']
                console.log(movie);
                console.log(genres);
                console.log(mymov);
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
        movieId = movie['id']
        if (userWatchedMovieByID(movieId)) {
            $("#watchedMovie").attr('disabled', true);
            $("#watchedMovie").text('This movie is in your watched list :)');
        }
        if (userWantToSeeMovieByID(movieId)) {
            $("#toSeeMovie").attr('disabled', true);
            $("#toSeeMovie").text('This movie is already in your want to see list :)');
        }

    });


    // Watched button
    $("#watchedMovie").click(function () {
        console.log("#watchedMovie");
        console.log(mymov);
        movieId = mymov['id'];
        if (userWatchedMovieByID(movieId)) {
            // Some error might have happened, just reload
        } else {
            // Add series to watched list
            userLogin['watched']['movies'].push({
                "id": movieId,
                "when": new Date().format('Y-m-d\\TH:i:s'),
            });
            localStorage.setItem('login', JSON.stringify(userLogin));
        }
        window.location.reload();
    });

    // Want to see button
    $("#toSeeMovie").click(function () {
        console.log("#toSeeMovie");
        console.log(mymov);
        movieId = mymov['id'];
        if (userWantToSeeMovieByID(movieId)) {
            // Some error might have happened, just reload
        } else {
            // Add series to watched list
            userLogin['to see']['movies'].push({
                "id": movieId,
            });
            localStorage.setItem('login', JSON.stringify(userLogin));
        }
        window.location.reload();
    });

});