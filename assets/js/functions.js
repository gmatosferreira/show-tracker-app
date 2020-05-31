function getFeed(seriesWatching, series, seriesDetails) {
    console.log("getFeed()");
    feed = []

    // Get series data
    /*series['data'].forEach(serie => {
        seriesWatching.forEach((sw, index) => {
            if (serie['id'] == sw['id']) {
                userLogin['watching']['series'][index]['banner'] = serie['banner'];
            }
        });
    });*/
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
        } else if (ep['episode'] > lastEpisodeSeen) {
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
            if (ep['airedSeason'] == lastSeasonSeen && ep['airedEpisodeNumber'] == lastEpisodeSeen + 1) {
                nextSeason = ep['airedSeason'];
                nextEpisode = ep['airedEpisodeNumber'];
                aired = ep['firstAired'];
                epName = ep['episodeName'];
                finished = true;
                // If next season
            } else if (ep['airedSeason'] == lastSeasonSeen + 1 && ep['airedEpisodeNumber'] < nextEpisode) {
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
    today = new Date(q.getFullYear(), q.getMonth() + 1, q.getDay());
    future = false;
    if (air > today) {
        future = true;
    }

    episode = { season: nextSeason, episode: nextEpisode, episodeName: epName, aired: aired, future: future }

    console.log("\t//getNextEpisode()");
    return episode;
}

function episodeWatched(episode) {
    watched = false;
    console.log("episodeWatched()");

    // Get users series seen list
    userSeriesSeen = userLogin['watching']['series'];
    console.log(userSeriesSeen);

    // Check if $episode id is in that list
    episodeSeriesSeen = null;
    userSeriesSeen.forEach(s => {
        if (s['id'] == episode['seriesId']) {
            episodeSeriesSeen = s;
        }
    });

    if (episodeSeriesSeen == null) {
        return false;
    }

    // If series in the seen list, check if episode has already been seen
    console.log(episodeSeriesSeen);
    episodeSeriesSeen['seen'].forEach(epSeen => {
        if (epSeen['season'] == episode['airedSeason']) {
            if (epSeen['episode'] == episode['airedEpisodeNumber']) {
                watched = true;
            }
        }
    });

    console.log("//episodeWatched()");
    return watched;
}

function markEpisodeWatched(episode) {
    watched = false;
    q = new Date();
    watched = false;
    console.log("markEpisodeWatched()");

    // Get users series seen list
    userSeriesSeen = userLogin['watching']['series'];
    console.log(userSeriesSeen);

    // Find series in that list and add episode as seen
    userSeriesSeen.forEach((s, index) => {
        if (s['id'] == episode['seriesId']) {
            console.log(userLogin['watching']['series'][index]);
            userLogin['watching']['series'][index]['seen'].push({
                "season": episode['airedSeason'],
                "episode": episode['airedEpisodeNumber'],
                "when": (new Date(q.getFullYear(), q.getMonth() + 1, q.getDay())).format('Y-m-d'),
            });
            watched = true;
            return;
        }
    });

    localStorage.setItem('login', JSON.stringify(userLogin));

    console.log("//markEpisodeWatched()");
    return watched;
}

// Check if user has series in it's watching list given an episode
function userWatchingSeriesByEpisode(episode) {
    console.log("userWatchingSeries()");

    return userWatchingSeriesById(episode['seriesId']);
}

function userWatchingSeriesById(seriesId) {
    console.log("userWatchingSeriesById()");

    // Get users series seen list
    userSeriesSeen = userLogin['watching']['series'];
    console.log(userSeriesSeen);

    // Check if $episode id is in that list
    series = null;
    userSeriesSeen.forEach(s => {
        if (s['id'] == seriesId) {
            series = s;
        }
    });

    console.log("//userWatchingSeriesById()");
    return !(series==null);
}