$(document).ready(function () {

    // Get keyword to serach for
    // Ex: <domain>/episode.html?series=268592&se=1&ep=1
    params = (new URL(window.location)).searchParams;
    series = params.get('series');
    season = params.get('se');
    episode = params.get('ep');

    if (series == null || series == "" || season == null || season == "" || episode == null || episode == "")
        window.history.back();

    // Get episodes data
    episodes = null;
    episodeInfo = null;
    $.getJSON("https://ihc.gmatos.pt/DB/seriesDetails.json", function (json) {
        json.forEach((value, index) => {
            if (value['id'] == series) {
                episodes = value['episodes'];
                return;
            }
        });

        if (episodes == null) {
            window.history.back();
        }

        // Get episode from episodes list
        episodes.forEach((value, index) => {
            if (value['airedSeason']==season && value['airedEpisodeNumber']==episode) {
                episodeInfo = value;
                console.log(episodeInfo);
                return;
            }
        });

        if (episodeInfo == null) {
            window.history.back();
        }

        if (episodeInfo['overview']=="" || episodeInfo['overview']==undefined || episodeInfo['overview']==null)
            episodeInfo['overview'] = "Episode's overview is not available :("

        if (episodeInfo['filename']=="" || episodeInfo['filename']==undefined || episodeInfo['filename']==null)
            episodeInfo['filename'] = 'https://ihc.gmatos.pt/images/notavailableEpisode.jpg'
        else
            episodeInfo['filename'] = 'https://thetvdb.com/banners/'+episodeInfo['filename']

        if(!userWatchingSeriesByEpisode(episodeInfo)) {
            $("#watched").attr('disabled', true);
            $("#watched").text("Add this series to your watchlist to mark this episode as seen");
        }
            

        // Add data to HTML
        $("#episodeInfo h1").text(`S. ${episodeInfo['airedSeason']} Ep. ${episodeInfo['airedEpisodeNumber']} | ${episodeInfo['episodeName']}`);
        $("#episodeInfo img").attr('src', episodeInfo['filename']);
        $("#episodeInfo p").text(episodeInfo['overview']);
        $("#episodeInfo a").attr('href', 'series.html?id='+episodeInfo['seriesId'])
        if(episodeWatched(episodeInfo)) {
            $("#watched").attr('disabled', true);
            $("#watched").text("Watched");
        }
        
        // Show HTML
        $("#episodeInfo").removeClass("d-none");
        $("#episodeInfo").hide();
        $("#episodeInfo").fadeIn();

    });

    // Mark episode as watched
    $("#watched").click(function(){      
        success = markEpisodeWatched(episodeInfo);  
        console.log("Return status: "+success);
        window.location.reload();
        console.log(userLogin);
    });

});