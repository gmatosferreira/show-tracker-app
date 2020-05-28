$(document).ready(function(){

    $('#collapseFriendsActivity').on('show.bs.collapse', function () {
        $("#moreFriendsActivity").text("Show less news");
    });

    $('#collapseFriendsActivity').on('hide.bs.collapse', function () {
        $("#moreFriendsActivity").text("Show more news");
    });

    $('#collapseFriendsList').on('show.bs.collapse', function () {
        $("#moreFriendsList").text("Show less friends");
    });

    $('#collapseFriendsList').on('hide.bs.collapse', function () {
        $("#moreFriendsList").text("Show more friends");
    });


});