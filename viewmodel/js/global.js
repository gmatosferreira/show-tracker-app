

$(document).ready(function () {

    $(".return").click(function(){
        window.history.back();
    });

    // Menu
    function headerViewModel() {
        var self = this;

        self.menu = ko.observableArray([
            { name: "Feed", url: "index.html"},
            { name: "Watching", url: "watching.html"},
            { name: "To-See", url: "elements.html"},
            { name: "Movies", url: "movies.html"},
            { name: "Series", url: "elements.html"},
            { name: "Friends", url: "friends.html"},
            { name: "Calendar", url: "calendar.html"},
            { name: "Settings", url: "settings.html"},
        ]);
    }

    ko.applyBindings(new headerViewModel(), document.getElementById("menu")); // This makes Knockout get to work
    
});