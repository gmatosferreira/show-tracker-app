

$(document).ready(function () {

    // Global functionalities

    //  Go back btn
    $(".return").click(function(){
        window.history.back();
    });

    //  Close div
    $(".closeDiv").click(function(){
        $(this).closest('section').fadeOut();
    });

    // Menu
    function headerViewModel() {
        var self = this;


        self.username = ko.observable();
        if(localStorage.getItem('login')!=null) {
            self.username(JSON.parse(localStorage.getItem('login'))['name']);
        }

        self.menu = ko.observableArray([
            { name: "Feed", url: "feed.html"},
            { name: "Watching", url: "watching.html"},
            { name: "To-See", url: "elements.html"},
            { name: "Movies", url: "moviesList.html"},
            { name: "Series", url: "seriesList.html"},
            { name: "Friends", url: "friends.html"},
            { name: "Calendar", url: "calendar.html"},
            { name: "Settings", url: "settings.html"},
        ]);
    }

    // index.html doesn't have #menu
    if (document.getElementById("menu")!=null) {
        ko.applyBindings(new headerViewModel(), document.getElementById("menu")); // This makes Knockout get to work
    
        // Check if user is logged in
        if(localStorage.getItem('login')==null)
            window.location.replace("index.html"); 
    }

    // User data
    userLogin = null;
    if(localStorage.getItem('login')!=null)
        userLogin = JSON.parse(localStorage.getItem('login'));
    
    console.log("userLogin");
    console.log(userLogin);
    console.log("//userLogin");

    // User log out
    $("#logout").click(function(){
        localStorage.removeItem('login');
        window.location.replace('index.html?logout=true');
    });
});