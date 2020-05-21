$(document).ready(function(){
    
    function headerViewModel(){
        var self = this;

        self.menu = ko.observableArray([
            { name: "Home", url: "index.html"},
            { name: "Feed", url: "feed.html"},
            { name: "Watching", url: "watching.html"},
            { name: "To-See", url: "elements.html"},
            { name: "Movies", url: "elements.html"},
            { name: "Series", url: "elements.html"},
            { name: "Friends", url: "elements.html"},
            { name: "Calendar", url: "elements.html"},
            { name: "Settings", url: "elements.html"},
        ]);
    }

    ko.applyBindings(new headerViewModel(), document.getElementById("menu")); // This makes Knockout get to work
});