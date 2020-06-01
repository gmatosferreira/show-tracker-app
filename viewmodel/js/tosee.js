$(document).ready(function() {

    // Reload once to update series episodes seen
    
    // Search bar
    $("#searchButton").click(function(){
        window.location.replace("search.html?q="+$("#searchField").val());
    });

    $("#searchField").keyup(function(e){
        if(e.keyCode == 13) {
            window.location.replace("search.html?q="+$("#searchField").val());
        }
    });

    // Get user episodes seen
    console.log(userLogin);

    moviesToSeeList = userLogin['to see']['movies'];
    moviesSeenList = userLogin['watched']['movies'];

    console.log(moviesToSeeList);
    console.log(moviesSeenList);

    $.getJSON("https://ihc.gmatos.pt/DB/movies.json", function(movies) {
        console.log(movies);
            // Get movies data
        resultsM = []
        movies['data'].forEach((value, index) => {
            resultsM.push(value);
        });
        console.log(resultsM);

        moviesToSeeList.forEach(mts => {
            resultsM.forEach(m =>{
                if(mts['id'] == m['id']){
                    genres = m['genres'];
                    $("#moviesToSee").append(`<article class="style1"> <span class="image"> <img src="https://www.thetvdb.com${m['image']}" alt="" /> </span> <a href="movies.html?id=${m['id']}"><h2>${m['movieName']}</h2><div class="content"><p>${genres}</p><p>${m['overview']}</p></div> </a> </article>`); 
                }
            });
        });
        moviesSeenList.forEach(ms => {
            resultsM.forEach(m =>{
                if(ms['id'] == m['id']){
                    genres = m['genres'];
                    $("#moviesSeen").append(`<article class="style1"> <span class="image"> <img src="https://www.thetvdb.com${m['image']}" alt="" /> </span> <a href="movies.html?id=${m['id']}"><h2>${m['movieName']}</h2><div class="content"><p>${genres}</p><p>${m['overview']}</p><p>${ms['when']}</p></div> </a> </article>`); 
                }
            });
        });

            // Show HTML
            $("#loadingFeed").fadeOut();
            if ($("#moviesToSee").children().length!=0) {
                $("#moviesToSee").removeClass("d-none");   
                $("#moviesToSee").hide();   
                setTimeout(function(){
                    $("#moviesToSee").fadeIn();   
                }, 500);    
            } else {
                $("#feedEmpty").removeClass("d-none");   
                $("#feedEmpty").hide();   
                setTimeout(function(){
                    $("#feedEmpty").fadeIn();   
                }, 500); 
            }
            if ($("#moviesSeen").children().length!=0) {
                $("#moviesSeen").removeClass("d-none");   
                $("#moviesSeen").hide();   
                setTimeout(function(){
                    $("#moviesSeen").fadeIn();   
                }, 500);    
            } else {
                $("#feedEmpty").removeClass("d-none");   
                $("#feedEmpty").hide();   
                setTimeout(function(){
                    $("#feedEmpty").fadeIn();   
                }, 500); 
            }
    });
})