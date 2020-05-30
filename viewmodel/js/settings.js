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

    $('#collapsePrivacy').on('show.bs.collapse', function () {
        $("#morePrivacy").text("Hide ");
    });

    $('#collapsePrivacy').on('hide.bs.collapse', function () {
        $("#morePrivacy").text("Show ");
    });

    $('#collapseSecurity').on('show.bs.collapse', function () {
        $("#moreSecurity").text("Hide ");
    });

    $('#collapseSecurity').on('hide.bs.collapse', function () {
        $("#moreSecurity").text("Show ");
    });

    $('#collapseHelp').on('show.bs.collapse', function () {
        $("#moreHelp").text("Hide ");
    });

    $('#collapseHelp').on('hide.bs.collapse', function () {
        $("#moreHelp").text("Show ");
    });

    $('#collapseAbout').on('show.bs.collapse', function () {
        $("#moreAbout").text("Hide ");
    });

    $('#collapseAbout').on('hide.bs.collapse', function () {
        $("#moreAbout").text("Show ");
    });
    
});