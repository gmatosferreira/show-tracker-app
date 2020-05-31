$(document).ready(function(){
    
    // Get keyword to serach for
    params = (new URL(window.location)).searchParams;
    id = params.get('id');

    if (id==null || id=="")
        window.history.back();
    
    // Get series data
    series = null;
    $.getJSON("https://ihc.gmatos.pt/DB/series.json", function(json) {
        json['data'].forEach((value, index) => {
            if (value['id']==id) {
                series = value;
                console.log(series);
            }
        });

        if (series==null)
            window.history.back();

        // Add content to HTML
        $("#episodeData h1").text(series['seriesName']);
        $("#episodeData img").attr('src', 'https://www.thetvdb.com'+series['banner']);
        if (series['overview']==null)
            series['overview'] = "Sinopse não disponível";
        $("#episodeData p").text(series['overview']);
        
        // Show HTML
        $("#main").removeClass("d-none");
        $("#main").hide();
        $("#main").fadeIn();
    });

    // Get episodes data
    episodes = null;
    $.getJSON("https://ihc.gmatos.pt/DB/seriesDetails.json", function(json) {
        json.forEach((value, index) => {
            if (value['id']==id) {
                episodes = value['episodes'];
                console.log(episodes);
            }
        });

        if (episodes==null) {
            $("episodesError").removeClass("d-none");
            return;
        } 

        season = 0;
        html = ""
        episodes.forEach((value, index) => {
            if(value['airedSeason']>season) {
                if(season!=0)
                    html += `</div></section>`;
                season = value['airedSeason'];
                html += `<h2 class="small mt-5">Season ${season}</h2>`;
                html += `<section class="card"><div class="card-body row mx-0">`;
            }
            if (value['filename']=="" || value['filename']==undefined || value['filename']==null)
                value['filename'] = 'https://ihc.gmatos.pt/images/notavailableEpisode.jpg'
            else
                value['filename'] = 'https://thetvdb.com/banners/'+value['filename']
            html += `<div class="col-4 p-4"><a href="episode.html?series=${id}&se=${season}&ep=${value['airedEpisodeNumber']}"><img class="w-100" src="${value['filename']}" alt=""></a><a href="episode.html?series=${id}&se=${season}&ep=${value['airedEpisodeNumber']}"><h2 class="m-0 text-center">Episode ${value['airedEpisodeNumber']}</h2></a><p class="small text-center">Aired on ${value['firstAired']}</p></div>`;
        });      
        
        // Add content to HTML
        $("#episodes").append(html);

        // Show HTML
        $(".loading").fadeOut();
        $("#episodes").removeClass("d-none");
        $("#episodes").hide();
        setTimeout(function(){
            $("#episodes").fadeIn();
        }, 500);
    });


});