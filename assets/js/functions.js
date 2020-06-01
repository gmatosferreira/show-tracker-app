function getFeed(seriesWatching, series, seriesDetails, daysAgoMin, daysAgoMax) {
    console.log("getFeed()");
    feed = []

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
            if (s['id'] == sd['id'] && sd['episodes'].length!=s['seen'].length) {
                console.log(s);
                nextEpisode = getNextEpisode(s['seen'], sd['episodes']);
                nextEpisode['id'] = s['id'];
                nextEpisode['banner'] = s['banner'];
                nextEpisode['seriesName'] = s['seriesName'];
                // Only add to feed if lastSeen is between [daysAgoMin, daysAgoMax] days ago
                moment = Date.parse(lastSeenMoment);
                console.log("here")
                console.log(nextEpisode['lastSeen']);
                if (new Date().getTime()-moment>=(daysAgoMin*60*60*24*1000) && new Date().getTime()-moment<=(daysAgoMax*60*60*24*1000)) {
                    feed.push(nextEpisode);
                } else if (daysAgoMin==0 && new Date().getTime()-moment<0 && new Date().getTime()-moment<(daysAgoMax*60*60*24*1000)) {
                    // Special scenario if episode has been seen today (because today-moment can return a negative number)
                    feed.push(nextEpisode);
                } else if (lastSeenMoment==null) {
                    feed.push(nextEpisode);
                }
            }
        });
    });

    // Sort by last watched (most recent first) 
    console.log("New counts");
    feed.sort(function (a, b) { return Date.parse(b['lastSeen']) - Date.parse(a['lastSeen']); });

    console.log("//getFeed()");
    return feed;
}

function getSeriesWatched(seriesWatching, series, seriesDetails) {
    console.log("getSeriesWatched()");
    watched = []

    console.log(seriesWatching);
    console.log(series);
    console.log(seriesDetails);

    // Get series watched ids
    seriesWatchedIds=[]
    seriesDetails.forEach(sd => {
        seriesWatching.forEach(s => {
            if (s['id'] == sd['id']) {
                if(s['seen'].length==sd['episodes'].length) {
                    seriesWatchedIds.push(sd['id']);
                }
            }
        });
    });

    // Get series details given its id
    series['data'].forEach(serie => {
        seriesWatchedIds.forEach(id => {
            if(id==serie['id']) {
                watched.push(serie);
            }
            
        });
    });

    console.log("//getSeriesWatched()");
    return watched;
}

function getNextEpisode(epSeen, epAll) {
    episode = null;
    console.log("\tgetNextEpisode()");

    // Compute last seen
    lastSeasonSeen = -1;
    lastEpisodeSeen = 0;
    lastSeenMoment = null;

    epSeen.forEach(ep => {
        if (ep['season'] > lastSeasonSeen) {
            lastSeasonSeen = ep['season'];
            lastEpisodeSeen = ep['episode'];
            lastSeenMoment = ep['when'];
        } else if (ep['episode'] > lastEpisodeSeen) {
            lastEpisodeSeen = ep['episode'];
            lastSeenMoment = ep['when'];
        }
    });

    // Sort episodes by season and episode
    epAll.sort(function (a, b) { return a['airedSeason'] == b['airedSeason'] ? a['airedEpisodeNumber'] - b['airedEpisodeNumber'] : a['airedSeason'] - b['airedSeason'] });

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
                // If user hasn't seen any episode yet 
            } else if (lastSeasonSeen == -1 && lastEpisodeSeen == 0) {
                if (nextSeason == 0) {
                    nextSeason = ep['airedSeason'];
                    nextEpisode = ep['airedEpisodeNumber'];
                    epName = ep['episodeName'];
                    aired = ep['firstAired'];
                } else if (nextSeason > ep['airedSeason']) {
                    nextSeason = ep['airedSeason'];
                    nextEpisode = ep['airedEpisodeNumber'];
                    epName = ep['episodeName'];
                    aired = ep['firstAired'];
                } else if (nextSeason == ep['airedSeason']) {
                    if (nextEpisode > ep['airedEpisodeNumber']) {
                        nextEpisode = ep['airedEpisodeNumber'];
                        epName = ep['episodeName'];
                        aired = ep['firstAired'];
                    }
                }
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

    episode = { season: nextSeason, episode: nextEpisode, episodeName: epName, aired: aired, future: future, lastSeen: lastSeenMoment }

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
            //"when": (new Date(q.getFullYear(), q.getMonth() + 1, q.getDay())).format('Y-m-d'),
            userLogin['watching']['series'][index]['seen'].push({
                "season": episode['airedSeason'],
                "episode": episode['airedEpisodeNumber'],
                "when": new Date().format('Y-m-d\\TH:i:s'),
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


function userWatchedMovieByID(movieID) {
    console.log("userWatchedMovieByID()");
    userMoviesSeen = null;
    // Get users movies seen list
    userMoviesSeen = userLogin['watched']['movies'];
    console.log(userMoviesSeen);

    // Check if $movie id is in that list
    movie = null;
    userMoviesSeen.forEach(m => {
        if (m['id'] == movieID) {
            movie = m;
        }
    });

    console.log("//userWatchedMovieByID()");
    return !(movie==null);
}


function userWantToSeeMovieByID(movieID) {
    console.log("userWantToSeeMovieByID()");
    userMoviesToSee = null;
    // Get users movies seen list
    userMoviesToSee = userLogin['to see']['movies'];
    console.log(userMoviesToSee);

    // Check if $movie id is in that list
    movie = null;
    userMoviesToSee.forEach(m => {
        if (m['id'] == movieID) {
            movie = m;
        }
    });

    console.log("//userWantToSeeMovieByID()");
    return !(movie==null);
}
