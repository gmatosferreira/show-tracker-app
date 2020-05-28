$(document).ready(function(){

    $('#collapseAccount').on('show.bs.collapse', function () {
        $("#moreAccount").text("Hide");
    });

    $('#collapseAccount').on('hide.bs.collapse', function () {
        $("#moreAccount").text("Show");
    });

    $('#collapseNotifications').on('show.bs.collapse', function () {
        $("#moreNotifications").text("Hide ");
    });

    $('#collapseNotifications').on('hide.bs.collapse', function () {
        $("#moreNotifications").text("Show ");
    });


});