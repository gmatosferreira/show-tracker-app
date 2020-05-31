$(document).ready(function () {

    //Get url params
    params = (new URL(window.location)).searchParams;
    logout = params.get('logout');
    console.log(logout=="true");

    if(logout=="true") {
        $("#logoutSucess").removeClass("d-none");
        $("#logoutSucess").hide();
        $("#logoutSucess").fadeIn();
    }


    // Show one accordion when the other is shown
    $('#collapseLogin').on('show.bs.collapse', function () {
        $('#collapseRegister').collapse('hide');
    });

    $('#collapseRegister').on('show.bs.collapse', function () {
        $('#collapseLogin').collapse('hide');
    });

    // If user is logged in already, redirect to app
    if (localStorage.getItem('login')!=null)
        window.location.replace('feed.html');

    // Load users database
    $.getJSON("https://ihc.gmatos.pt/DB/users.json", function(json) {
        localStorage.setItem('users', JSON.stringify(json));
    });

    // Login
    $("#loginError").removeClass("d-none");
    $("#loginError").hide();
    $("#loginButton").click(function(){
        $("#loginError").fadeOut();
        // Get data from "db"
        
        users = JSON.parse(localStorage.getItem('users'));
        if (users==null) {
            $("#loginError").text("There was an error connecting to the server, try again!");
            $("#loginError").fadeIn();
            return;
        }
        // Validate user data
        if ($("#loginEmail").val().trim()=="" || $("#loginPassword").val().trim()=="") {
            $("#loginError").text("Please enter your data to sign in.");
            $("#loginError").fadeIn();
            return;
        }
        // Check user is registered
        registered = false;
        users.forEach((value, index) => {
            if (value['email'] == $("#loginEmail").val().trim()) {
                if (value['password'] == $("#loginPassword").val().trim()) {
                    registered = true;
                    localStorage.setItem('login', JSON.stringify(value));
                    return;
                }
            }
        });

        if (registered) {
            window.location.replace("feed.html");
        } else {
            $("#loginError").text("The credentials inserted are invalid!");
            $("#loginError").fadeIn();
        }
    });

    // Register
    // TODO
    $("#registerSubmit").click(function(){
        alert("Not implemented yet!");
    });
});