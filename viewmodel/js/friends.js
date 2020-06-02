$(document).ready(function () {

    // Collapses
    $('#collapseFriendsActivity').on('show.bs.collapse', function () {
        $("#moreFriendsActivity").text("Show less news");
        $('btn[data-target="#collapseFriendsActivity"]').removeClass("primary");
    });

    $('#collapseFriendsActivity').on('hide.bs.collapse', function () {
        $("#moreFriendsActivity").text("Show more news");
        $('btn[data-target="#collapseFriendsActivity"]').addClass("primary");
    });

    $('#collapseFriendsList').on('show.bs.collapse', function () {
        $("#moreFriendsList").text("Show less friends");
        $('btn[data-target="#collapseFriendsList"]').removeClass("primary");
    });

    $('#collapseFriendsList').on('hide.bs.collapse', function () {
        $("#moreFriendsList").text("Show more friends");
        $('btn[data-target="#collapseFriendsList"]').addClass("primary");
    });

    // Search bar
    $("#searchButton").click(function () {
        alert("This searchbar is not working yet! Sorry :(");
    });

    $("#searchField").keyup(function (e) {
        if (e.keyCode == 13) {
            alert("This searchbar is not working yet! Sorry :(");
        }
    });


});