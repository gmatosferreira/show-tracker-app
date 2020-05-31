$(document).ready(function(){
    
    // Get keyword to serach for
    params = (new URL(window.location)).searchParams;
    keyword = params.get('q');

    // Search
    $("#searchField").val(keyword);
    $("#searchLabel").text(keyword);

    results = []
    $.getJSON("https://ihc.gmatos.pt/DB/series.json", function(json) {
        json['data'].forEach((value, index) => {
            if (keyword=="" || keyword==null) {
                results.push(value)   
            } else if (value['seriesName'].toLowerCase().includes(keyword.toLowerCase())) {
                results.push(value)   
            }
        });

        results.forEach((value, index) => {
            status = ""
            if(value['status']=='Continuing')
                status = "Em exibição"
            else if(value['status']=='Ended')
            status = "Terminada"
            if (value['overview']==undefined)
                value['overview'] = ""
            $("#searchResults").append(`<article class="style1"> <span class="image"> <img src="https://www.thetvdb.com${value['poster']}" alt="" /> </span> <a href="series.html?id=${value['id']}"><h2>${value['seriesName']}</h2><div class="content"><p>${status}</p><p>${value['overview']}</p></div> </a> </article>`);            
        });

        // Show elements
        $(".loading").fadeOut();
        if(results.length==0) {
            $("#searchZeroResults").removeClass("d-none");
            $("#searchZeroResults").hide();
            setTimeout(function(){
                $("#searchZeroResults").fadeIn();
            }, 500);
        } else {
            $("#searchResults").removeClass("d-none");
            $("#searchResults").hide();
            setTimeout(function(){
                $("#searchResults").fadeIn();
            }, 500);
        }
    });

    resultsM = []
    $.getJSON("https://ihc.gmatos.pt/DB/movies.json", function(json) {
        json['data'].forEach((value, index) => {
            if (keyword=="" || keyword==null) {
                resultsM.push(value)   
            } else if (value['movieName'].toLowerCase().includes(keyword.toLowerCase())) {
                resultsM.push(value)   
            }
        });

        resultsM.forEach((value, index) => {
            genres = value['genres'];
            if (value['overview']==undefined)
                value['overview'] = ""
            console.log(value['image']);
            console.log(genres);
            $("#searchResults").append(`<article class="style1"> <span class="image"> <img src="https://www.thetvdb.com${value['image']}" alt="" /> </span> <a href="movies.html?id=${value['id']}"><h2>${value['movieName']}</h2><div class="content"><p>${genres}</p><p>${value['overview']}</p></div> </a> </article>`);            
        });

        // Show elements
        $(".loading").fadeOut();
        if(resultsM.length==0) {
            $("#searchZeroResults").removeClass("d-none");
            $("#searchZeroResults").hide();
            setTimeout(function(){
                $("#searchZeroResults").fadeIn();
            }, 500);
        } else {
            $("#searchResults").removeClass("d-none");
            $("#searchResults").hide();
            setTimeout(function(){
                $("#searchResults").fadeIn();
            }, 500);
        }
    });

    // Search bar
    $("#searchButton").click(function(){
        window.location.replace("search.html?q="+$("#searchField").val());
    });

    $("#searchField").keyup(function(e){
        if(e.keyCode == 13) {
            window.location.replace("search.html?q="+$("#searchField").val());
        }
    });


});