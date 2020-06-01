$(document).ready(function () {

    // Get movies data
    resultsM = []
    $.getJSON("https://ihc.gmatos.pt/DB/movies.json", function (json) {
        console.log("Accessed movies data in json");
        json['data'].forEach((value, index) => {
            resultsM.push(value);
        });

        if (resultsM.length == 0) {
            $("#listZeroResults").removeClass("d-none");
            $("#listZeroResults").hide();
            setTimeout(function () {
                $("#listZeroResults").fadeIn();
            }, 500);
        } else {
            reSort();
        }


    });

    // Search bar
    $("#searchButton").click(function () {
        window.location.replace("search.html?q=" + $("#searchField").val());
    });

    $("#searchField").keyup(function (e) {
        if (e.keyCode == 13) {
            window.location.replace("search.html?q=" + $("#searchField").val());
        }
    });

    // Change sort
    $("#sortBy").on('change', function () {
        if ($("#list").children().length > 0) {
            reSort();
        }
    });

    // Reverse sort
    $("#reverseSort").click(function () {
        console.log("#reverseSort");
        if ($("#list").children().length > 0) {
            if ($(this).children("i").hasClass("fa-arrow-up")) {
                $(this).html(`descending <i class="fas fa-arrow-down"></i>`);
                reSort();
            } else {
                $(this).html(`ascending <i class="fas fa-arrow-up"></i>`);
                reSort();
            }
        }
    });

    function reSort() {
        // Hide HTML and resort array
        $("#list").fadeOut();
        setTimeout(function () {
            $(".loading").fadeIn();
            $("#list").html('');

            // Get value to sort by
            filterBy = $("#sortBy").val();

            // Sort array
            switch (filterBy) {
                case "name":
                    if ($("#reverseSort").children("i").hasClass("fa-arrow-up")) {
                        resultsM.sort(function (a, b) { return (a['movieName'].toLowerCase() < b['movieName'].toLowerCase()) ? -1 : (a['movieName'].toLowerCase() > b['movieName'].toLowerCase()) ? 1 : 0 });
                    } else {
                        resultsM.sort(function (a, b) { return (a['movieName'].toLowerCase() < b['movieName'].toLowerCase()) ? 1 : (a['movieName'].toLowerCase() > b['movieName'].toLowerCase()) ? -1 : 0 });
                    }
                    break;
                case "release":
                    if ($("#reverseSort").children("i").hasClass("fa-arrow-up")) {
                        resultsM.sort(function (a, b) { return Date.parse(a['releaseDate']) - Date.parse(b['releaseDate']); });
                    } else {
                        resultsM.sort(function (a, b) { return Date.parse(b['releaseDate']) - Date.parse(a['releaseDate']); });
                    }
                    break;
            }

            // Add resorted series to HTML
            resultsM.forEach((value, index) => {
                genres = value['genres'];
                if (value['overview'] == undefined)
                    value['overview'] = ""
                console.log(genres);
                $("#list").append(`<article class="style1"> <span class="image"> <img src="https://www.thetvdb.com${value['image']}" alt="" /> </span> <a href="movies.html?id=${value['id']}"><h2>${value['movieName']}</h2><div class="content"><p>${genres}</p><p>${value['overview']}</p></div> </a> </article>`);
            });

            console.log(resultsM);

            // Show elements
            $(".loading").fadeOut();
            $("#list").removeClass("d-none");
            $("#list").hide();
            setTimeout(function () {
                $("#list").fadeIn();
            }, 500);

        }, 500);
    }

});