$(document).ready(function () {

    // Get user episodes seen
    seriesWatching = userLogin['watching']['series'];

    console.log(seriesWatching);

    seriesData = null;
    seriesDetailsData = null;
    $.getJSON("https://ihc.gmatos.pt/DB/series.json", function (series) {
        seriesData = series;
        $.getJSON("https://ihc.gmatos.pt/DB/seriesDetails.json", function (seriesDetails) {
            seriesDetailsData = seriesDetails;

            // Get user's feed
            feed = getFeed(seriesWatching, series, seriesDetails, 0, 7);
            console.log(feed);

            // Add content to HTML
            feed.forEach(s => {
                if (!s['future'])
                    $("#feed").append(`<article class="style1"> <span class="image"> <img src="https://www.thetvdb.com${s['banner']}" alt="" /> </span> <a href="episode.html?series=${s['id']}&se=${s['season']}&ep=${s['episode']}"><h2>${s['seriesName']}</h2><h3>S. ${s['season']} Ep. ${s['episode']}</h3><div class="content"><p>${s['episodeName']}</p></div> </a> </article>`);
            });

            // Show HTML
            $("#loadingFeed").fadeOut();
            if ($("#feed").children().length != 0) {
                $("#feed").removeClass("d-none");
                $("#feed").hide();
                setTimeout(function () {
                    $("#feed").fadeIn();
                }, 500);
            } else {
                $("#feedEmpty").removeClass("d-none");
                $("#feedEmpty").hide();
                setTimeout(function () {
                    $("#feedEmpty").fadeIn();
                }, 500);
            }
        });
    });

    // Change feed 
    $("#changeFeed").on('change', function () {
        console.log("#changeFeed");
        // Hide HTMl elements for episodes and show feedback for loading
        $("#feedEmpty").fadeOut();
        $("#feed").fadeOut();
        $("#feed").html('');
        setTimeout(function () {
            $("#loadingFeed").fadeIn();
        }, 500);
        // Determine the request
        switch ($(this).val()) {
            case "watching":
                // Get user's feed
                feed = getFeed(seriesWatching, seriesData, seriesDetailsData, 0, 7);
                console.log(feed);
                // Add content to HTML
                $("#main header h1").text("Currently watching");
                $("#feedEmpty").text("You haven't seen any series in the past 7 days! Maybe it's time to keep up with an old or search for a new one...");
                feed.forEach(s => {
                    $("#feed").append(`<article class="style1"> <span class="image"> <img src="https://www.thetvdb.com${s['banner']}" alt="" /> </span> <a href="episode.html?series=${s['id']}&se=${s['season']}&ep=${s['episode']}"><h2>${s['seriesName']}</h2><h3>S. ${s['season']} Ep. ${s['episode']}</h3><div class="content"><p>${s['episodeName']}</p></div> </a> </article>`);
                });
                break;
            case "suspended":
                // Get user's feed
                feed = getFeed(seriesWatching, seriesData, seriesDetailsData, 7, 99999999);
                console.log(feed);
                // Add content to HTML
                $("#main header h1").text("Not watched in a while");
                $("#feedEmpty").text("You don't have any series not watched for more than 7 days! If you've already seen all your series, maybe it's time to search for a new one...");
                feed.forEach(s => {
                    $("#feed").append(`<article class="style1"> <span class="image"> <img src="https://www.thetvdb.com${s['banner']}" alt="" /> </span> <a href="episode.html?series=${s['id']}&se=${s['season']}&ep=${s['episode']}"><h2>${s['seriesName']}</h2><h3>S. ${s['season']} Ep. ${s['episode']}</h3><div class="content"><p>${s['episodeName']}</p></div> </a> </article>`);
                });
                break;
            case "watched":
                // Add content to HTML
                $("#main header h1").text("Watched");
                $("#feedEmpty").text("It looks like you haven't finished a series yet...");
                break;
        }
        // Show HTML (without timeout doesn't work)
        setTimeout(function () {
            $("#loadingFeed").fadeOut();
            if ($("#feed").children().length != 0) {
                setTimeout(function () {
                    $("#feed").fadeIn();
                }, 500);
            } else {
                setTimeout(function () {
                    if ($("#feedEmpty").hasClass("d-none")) {$("#feedEmpty").removeClass("d-none"), $("#feedEmpty").hide();} 
                    $("#feedEmpty").fadeIn();
                }, 500);
            }
        }, 2000);
    });
})