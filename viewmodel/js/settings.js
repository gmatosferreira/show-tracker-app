$(document).ready(function () {


    // Search bar
    $("#searchButton").click(function () {
        search();
    });

    $("#searchField").keyup(function (e) {
        search();
    });

    function search() {
        $("#searchZeroResults").fadeOut();

        keyword = $("#searchField").val();
        console.log("//Search by " + keyword);

        // Check what titles match

        results = 0;
        $("#settingTopics>h3").each(function (index) {
            console.log($(this.text));
            console.log($(this).next().next());
            if ($(this).text().toLowerCase().includes(keyword.toLowerCase())) {
                $(this).fadeIn();
                $(this).next().fadeIn();
                $(this).next().next().fadeIn();
                results += 1;
            } else if (keyword == null || keyword == "") {
                $(this).fadeIn();
                $(this).next().fadeIn();
                $(this).next().next().fadeIn();
                results += 1;
            } else {
                $(this).fadeOut();
                $(this).next().fadeOut();
                $(this).next().next().fadeOut();
            }
        });

        // Show feedback in case results are empty
        console.log(results);
        if(results==0) {
            $("#searchZeroResults").removeClass("d-none");
            $("#searchZeroResults").hide();
            setTimeout(function(){
                $("#searchZeroResults").fadeIn();
            }, 500);
        }
    }

    // Add content to HTML
    $("#userName").text(userLogin['email']);
    $("#userId").text(userLogin['username']);
    $("#userEmail").text(userLogin['name']);

    // Accordions
    $('#collapseAccount').on('show.bs.collapse', function () {
        $("#moreAccount").text("Hide");
        $('btn[data-target="#collapseAccount"]').removeClass("primary");
    });

    $('#collapseAccount').on('hide.bs.collapse', function () {
        $("#moreAccount").text("Show");
        $('btn[data-target="#collapseAccount"]').addClass("primary");
    });

    $('#collapseNotifications').on('show.bs.collapse', function () {
        $("#moreNotifications").text("Hide ");
        $('btn[data-target="#collapseNotifications"]').removeClass("primary");
    });

    $('#collapseNotifications').on('hide.bs.collapse', function () {
        $("#moreNotifications").text("Show ");
        $('btn[data-target="#collapseNotifications"]').addClass("primary");
    });

    $('#collapsePrivacy').on('show.bs.collapse', function () {
        $("#morePrivacy").text("Hide ");
        $('btn[data-target="#collapsePrivacy"]').removeClass("primary");
    });

    $('#collapsePrivacy').on('hide.bs.collapse', function () {
        $("#morePrivacy").text("Show ");
        $('btn[data-target="#collapsePrivacy"]').addClass("primary");
    });

    $('#collapseSecurity').on('show.bs.collapse', function () {
        $("#moreSecurity").text("Hide ");
        $('btn[data-target="#collapseSecurity"]').removeClass("primary");
    });

    $('#collapseSecurity').on('hide.bs.collapse', function () {
        $("#moreSecurity").text("Show ");
        $('btn[data-target="#collapseSecurity"]').addClass("primary");
    });

    $('#collapseHelp').on('show.bs.collapse', function () {
        $("#moreHelp").text("Hide ");
        $('btn[data-target="#collapseHelp"]').removeClass("primary");
    });

    $('#collapseHelp').on('hide.bs.collapse', function () {
        $("#moreHelp").text("Show ");
        $('btn[data-target="#collapseHelp"]').addClass("primary");
    });

    $('#collapseAbout').on('show.bs.collapse', function () {
        $("#moreAbout").text("Hide ");
        $('btn[data-target="#collapseAbout"]').removeClass("primary");
    });

    $('#collapseAbout').on('hide.bs.collapse', function () {
        $("#moreAbout").text("Show ");
        $('btn[data-target="#collapseAbout"]').addClass("primary");
    });

    // Want to see button
    $("#SendBttn").click(function () {
        $("#SendBttn").attr('disabled', true);
        $("#SendBttn").text('Message sent!');
    });

    // Functionality not implemented yet
    $(".notImplemented").click(function () {
        alert("Sorry, but this functionality is not implemented yet! :(");
    });

    // Add notification
    $("#addNotification").click(function () {
        n = $('input[name="time"]').val();
        timespan = $('input[name="timeRef"]:checked').val();
        console.log(timespan);

        $("#addNotificarionError").fadeOut();

        if (n == "" || timespan == "") {
            $("#addNotificarionError").text("Please fill all the fields!");
            $("#addNotificarionError").removeClass("d-none");
            $("#addNotificarionError").hide();
            $("#addNotificarionError").fadeIn();
            return;
        }

        console.log("Form valid! Processing it...");

        timespantext = "";
        switch (timespan) {
            case "hours":
                timespantext = "hours";
                break;
            case "days":
                timespantext = "days";
                break;
            case "weeks":
                timespantext = "weeks";
                break;
        }

        // Validate n
        if (n < 1) {
            $("#addNotificarionError").text(`Please add a valid number of ${timespantext} (greater than 0)`);
            $("#addNotificarionError").removeClass("d-none");
            $("#addNotificarionError").hide();
            $("#addNotificarionError").fadeIn();
            return;
        }

        // If n==1, timespantext must be singular
        if (n == 1) {
            timespantext = timespantext.slice(0, -1);
        }

        // Add new episode alert
        $("#episodeAlerts").data("counter", $("#episodeAlerts").data("counter") + 1);
        counter = $("#episodeAlerts").data("counter");
        $("#episodeAlerts").append(`<input type="checkbox" id="notif${counter}" name="notif${counter}" value="" checked> <label for="notif${counter}">${n} ${timespantext} before</label><br>`);

        // Hide form
        $("#addNotif").fadeOut();

    });

});