$(document).ready(function(){
    
    // Get keyword to serach for
    params = (new URL(window.location)).searchParams;
    keyword = params.get('q');

    // Search
    $("#searchZeroResults").hide();
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
            $("#searchResults").append(`<article class="style1"> <span class="image"> <img src="https://www.thetvdb.com${value['poster']}" alt="" /> </span> <a href="episode.html?id=${value['id']}"><h2>${value['seriesName']}</h2><div class="content"><p>${status}</p><p>${value['overview']}</p></div> </a> </article>`);            
        });

        if(results.length==0) {
            $("#searchZeroResults").fadeIn();
        }
    });


});