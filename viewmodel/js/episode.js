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
        episodeInfo = null;
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

        // Show data on HTML
        $("#episodeInfo h1").text(episodeInfo['episodeName']);
        $("#episodeInfo img").attr('src', 'https://thetvdb.com/banners/'+episodeInfo['filename']);
        $("#episodeInfo p").text(episodeInfo['overview']);
        $("#episodeInfo").removeClass("d-none");

    });


});