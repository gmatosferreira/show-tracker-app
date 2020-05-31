function getFeed(seriesWatching, series, seriesDetails) {
    console.log("getFeed()");
    feed = []

    // Get series data
    series['data'].forEach(serie => {
        seriesWatching.forEach((sw, index) => {
            if (serie['id'] == sw['id']) {
                userData['watching']['series'][index]['banner'] = serie['banner'];
            }
        });
    });
    console.log(seriesWatching);

    // Get data on each series the user is watching
    console.log(series);
    seriesWatching.forEach(s => {
        series['data'].forEach(serie => {
            if (s['id'] == serie['id']) {
                s['banner'] = serie['image'];
                s['seriesName'] = serie['seriesName'];
            }
        });
    });
    console.log(seriesWatching);

    // Get next episode to see data
    console.log(seriesDetails);
    seriesDetails.forEach(sd => {
        seriesWatching.forEach(s => {
            if (s['id'] == sd['id']) {
                nextEpisode = getNextEpisode(s['seen'], sd['episodes']);
                nextEpisode['id'] = s['id'];
                nextEpisode['banner'] = s['banner'];
                nextEpisode['seriesName'] = s['seriesName'];
                feed.push(nextEpisode);
            }
        });
    });

    console.log("//getFeed()");
    return feed;
}

function getNextEpisode(epSeen, epAll) {
    episode = null;
    console.log("\tgetNextEpisode()");

    // Compute last seen
    lastSeasonSeen = 0;
    lastEpisodeSeen = 0;

    epSeen.forEach(ep => {
        if (ep['season'] > lastSeasonSeen) {
            lastSeasonSeen = ep['season'];
            lastEpisodeSeen = ep['episode'];
        } else if (ep['episode']>lastEpisodeSeen){
            lastEpisodeSeen = ep['episode'];
        }
    });

    // Find next to see
    nextSeason = 0;
    nextEpisode = 9999;
    aired = null;
    epName = null;
    finished = false;
    epAll.forEach(ep => {
        if (!finished) {
            // If current season
            if (ep['airedSeason']==lastSeasonSeen && ep['airedEpisodeNumber']==lastEpisodeSeen+1) {
                nextSeason = ep['airedSeason'];
                nextEpisode = ep['airedEpisodeNumber'];
                aired = ep['firstAired'];
                epName = ep['episodeName'];
                finished = true;
            // If next season
            } else if (ep['airedSeason']==lastSeasonSeen+1 && ep['airedEpisodeNumber']<nextEpisode) {
                nextSeason = ep['airedSeason'];
                nextEpisode = ep['airedEpisodeNumber'];
                epName = ep['episodeName'];
                aired = ep['firstAired'];
            }
        }
    });

    // Check if premiere is in the future
    air = Date.parse(aired);
    q = new Date();
    today = new Date(q.getFullYear(),q.getMonth()+1,q.getDay())
    future = false;
    if (air>today) {
        future = true;
    }

    episode = {season: nextSeason, episode: nextEpisode, episodeName: epName, aired: aired, future: future}

    console.log("\t//getNextEpisode()");
    return episode;
}