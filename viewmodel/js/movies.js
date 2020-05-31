$(document).ready(function(){
    
    // Get keyword to serach for
    params = (new URL(window.location)).searchParams;
    id = params.get('id');
    console.log(id);
    params += id;

        
    // Get movie data
    movie = null;
    genres = null;
    html = "";
    $.getJSON("https://ihc.gmatos.pt/DB/movies.json", function(json) {
        json['data'].forEach((value, index) => {
            if (value['id']==id) {
                movie = value;
                genres = value['genres']
                console.log(movie);
                console.log(genres);
            }
        });

        genres.forEach((value, index) => {
            html += `<h2 class="small mt-5">Genres ${genres}</h2>`;
            html += `<section class="card"><div class="card-body row mx-0">`;
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


        $("#main").append(html);
    });

});