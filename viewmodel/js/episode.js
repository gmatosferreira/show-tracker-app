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
    prevEpisode = null;
    nextEpisode = null;
    $.getJSON("https://ihc.gmatos.pt/DB/seriesDetails.json", function (json) {
        json.forEach((value, index) => {
            if (value['id'] == series) {
                episodes = value['episodes'];
                return;
            }
        });

        // Sort episodes by season and episode
        episodes.sort(function (a, b) { return a['airedSeason'] == b['airedSeason'] ? a['airedEpisodeNumber'] - b['airedEpisodeNumber'] : a['airedSeason'] - b['airedSeason'] });
        console.log(episodes);

        if (episodes == null) {
            window.history.back();
        }

        // Get episode from episodes list
        episodes.forEach((value, index) => {
            if (value['airedSeason'] == season && value['airedEpisodeNumber'] == episode) {
                episodeInfo = value;
                console.log(episodeInfo);
                // Check if has next and prev
                if (index != 0) {
                    console.log("hasPrevEpisode");
                    prevEpisode = {
                        'season': episodes[index - 1]['airedSeason'],
                        'episode': episodes[index - 1]['airedEpisodeNumber'],
                    };
                }
                if (index < episodes.length - 1) {
                    console.log("hasNextEpisode");
                    nextEpisode = {
                        'season': episodes[index + 1]['airedSeason'],
                        'episode': episodes[index + 1]['airedEpisodeNumber'],
                    };
                }
                return;
            }
        });

        if (episodeInfo == null) {
            window.history.back();
        }

        if (episodeInfo['overview'] == "" || episodeInfo['overview'] == undefined || episodeInfo['overview'] == null)
            episodeInfo['overview'] = "Episode's overview is not available :("

        if (episodeInfo['filename'] == "" || episodeInfo['filename'] == undefined || episodeInfo['filename'] == null)
            episodeInfo['filename'] = 'https://ihc.gmatos.pt/images/notavailableEpisode.jpg'
        else
            episodeInfo['filename'] = 'https://thetvdb.com/banners/' + episodeInfo['filename']

        if (!userWatchingSeriesByEpisode(episodeInfo)) {
            $("#watched").attr('disabled', true);
            $("#watched").text("Start watching this series (on it's page) to mark this episode as seen");
        }


        // Add data to HTML
        $("#episodeInfo h1").text(`S. ${episodeInfo['airedSeason']} Ep. ${episodeInfo['airedEpisodeNumber']} | ${episodeInfo['episodeName']}`);
        $("#episodeInfo img").attr('src', episodeInfo['filename']);
        $("#episodeInfo p").text(episodeInfo['overview']);
        $("#episodeInfo #seriesPage").attr('href', 'series.html?id=' + episodeInfo['seriesId'])
        if (episodeWatched(episodeInfo)) {
            $("#watched").attr('disabled', true);
            $("#watched").text("Watched");
        }

        // Show HTML
        $("#episodeInfo").removeClass("d-none");
        $("#episodeInfo").hide();
        $("#episodeInfo").fadeIn();

        console.log("Prev and next episodes");
        console.log(prevEpisode);
        console.log(nextEpisode);

        if (prevEpisode == null) {
            $("#prevEpisode").attr('disabled', true);
        }
        if (nextEpisode == null) {
            $("#nextEpisode").attr('disabled', true);
        }

    });

    // Mark episode as watched
    $("#watched").click(function () {
        success = markEpisodeWatched(episodeInfo);
        console.log("Return status: " + success);
        window.location.reload();
        console.log(userLogin);
    });

    // Go to next and prev episode
    $("#prevEpisode").click(function(){
        if (prevEpisode!=null) {
            window.location.replace(`episode.html?series=${episodeInfo['seriesId']}&se=${prevEpisode['season']}&ep=${prevEpisode['episode']}`)
        }
    });

    $("#nextEpisode").click(function(){
        if (nextEpisode!=null) {
            window.location.replace(`episode.html?series=${episodeInfo['seriesId']}&se=${nextEpisode['season']}&ep=${nextEpisode['episode']}`)
        }
    });

});