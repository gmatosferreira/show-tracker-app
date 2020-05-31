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

    seriesWatching = userLogin['watching']['series'];

    console.log(seriesWatching);

    $.getJSON("https://ihc.gmatos.pt/DB/series.json", function(series) {
        $.getJSON("https://ihc.gmatos.pt/DB/seriesDetails.json", function(seriesDetails) {
            
            // Get user's feed
            feed = getFeed(seriesWatching, series, seriesDetails)
            console.log(feed);

            // Add content to HTML
            feed.forEach(s => {
                if (!s['future'])
                    $("#feed").append(`<article class="style1"> <span class="image"> <img src="https://www.thetvdb.com${s['banner']}" alt="" /> </span> <a href="episode.html?series=${s['id']}&se=${s['season']}&ep=${s['episode']}"><h2>${s['seriesName']}</h2><h3>S. ${s['season']} Ep. ${s['episode']}</h3><div class="content"><p>${s['episodeName']}</p></div> </a> </article>`);
            });

            // Show HTML
            $("#loadingFeed").fadeOut();
            if ($("#feed").children().length!=0) {
                $("#feed").removeClass("d-none");   
                $("#feed").hide();   
                setTimeout(function(){
                    $("#feed").fadeIn();   
                }, 500);    
            } else {
                $("#feedEmpty").removeClass("d-none");   
                $("#feedEmpty").hide();   
                setTimeout(function(){
                    $("#feedEmpty").fadeIn();   
                }, 500); 
            }
        });
    });
})