$(document).ready(function(){
    
    // Get keyword to serach for
    params = (new URL(window.location)).searchParams;
    id = params.get('id');

    if (id==null || id=="")
        window.history.back();
    
    // Get movie data
    movie = null;
    $.getJSON("https://ihc.gmatos.pt/DB/movies.json", function(json) {
        json['data'].forEach((value, index) => {
            if (value['id']==id) {
                movie = value;
                console.log(movie);
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
        
        // Show HTML
        $("#main").removeClass("d-none");
        $("#main").hide();
        $("#main").fadeIn();
    });

});