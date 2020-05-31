$(document).ready(function () {

    // Get series data
    results = []
    $.getJSON("https://ihc.gmatos.pt/DB/series.json", function (json) {
        console.log("Accessed json");
        json['data'].forEach((value, index) => {
            results.push(value);
        });

        if (results.length == 0) {
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
                        results.sort(function (a, b) { return (a['seriesName'].toLowerCase() < b['seriesName'].toLowerCase()) ? -1 : (a['seriesName'].toLowerCase() > b['seriesName'].toLowerCase()) ? 1 : 0 });
                    } else {
                        results.sort(function (a, b) { return (a['seriesName'].toLowerCase() < b['seriesName'].toLowerCase()) ? 1 : (a['seriesName'].toLowerCase() > b['seriesName'].toLowerCase()) ? -1 : 0 });
                    }
                    break;
                case "premiere":
                    if ($("#reverseSort").children("i").hasClass("fa-arrow-up")) {
                        results.sort(function (a, b) { return Date.parse(a['firstAired']) - Date.parse(b['firstAired']); });
                    } else {
                        results.sort(function (a, b) { return Date.parse(b['firstAired']) - Date.parse(a['firstAired']); });
                    }
                    break;
            }

            // Add resorted series to HTML
            results.forEach((value, index) => {
                status = ""
                if (value['status'] == 'Continuing')
                    status = "Em exibição"
                else if (value['status'] == 'Ended')
                    status = "Terminada"
                if (value['overview'] == undefined)
                    value['overview'] = ""
                $("#list").append(`<article class="style1"> <span class="image"> <img src="https://www.thetvdb.com${value['poster']}" alt="" /> </span> <a href="series.html?id=${value['id']}"><h2>${value['seriesName']}</h2><div class="content"><p>${status}</p><p>${value['overview']}</p></div> </a> </article>`);
            });

            console.log(results);

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