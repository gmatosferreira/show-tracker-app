

$(document).ready(function () {

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

    // TVDB API
    // Methods

    //  Check if there is a JWT token on the localStorage and if there is check if it is valid (only for 24 hours)
    refreshToken = false;
    now = new Date();

    // TEMPORARY
    //  https://stackoverflow.com/questions/38088869/trying-to-make-a-json-post-request-to-the-tvdb-rest-api-at-https-api-thetvdb-c
    sessionStorage.setItem('TVDBToken', 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1OTE0NzU1NDAsImlkIjoiU2hvdyBUcmFja2VyIiwib3JpZ19pYXQiOjE1OTA4NzA3NDAsInVzZXJpZCI6MjI1MTI5NSwidXNlcm5hbWUiOiJnbWF0b3MifQ.UXElA88kRlLSYKhbEf7GX09Uaqgc9_jihTIyFrMGi95QF3JuqiWa9G6mhVfiFTC7KLdvkG2rvN_4BrLyn5cm92NZtIwZZvqo6M8xbdq0KLbEzSKOf4UeP0vTybofyaTXhjE8vGaB2I5C3rgmE2K7ZWyQtYKc8E_mZ08rjH36hnxUS_1BQYsGj1e7sf2-IwSDJnllLgWO75DYb8vpX-nHayl6EKvycIK7ikCB6YC5NWUWaTxp4bPd7asYtUxmHnmg6AcLADoA4xczaX5HmlhvOGG3qJ6W0MLeS5EHghLpaS1dw5qqNJgCXiRK9r7fVbTZ203Y664VvsTR7L3ygNsRsg');
    sessionStorage.setItem('TVDBTokenExpires', now.getTime());
    // ENDTEMPORARY

    token = sessionStorage.getItem('TVDBToken');

    if (token == null)
        refreshToken = true;
    else if (sessionStorage.getItem('TVDBTokenExpires') == null || now.getTime() - sessionStorage.getItem('TVDBTokenExpires') > 86000000)
        refreshToken = true;

    if (refreshToken) {
        //TODO CALL AJAX METHOD TO CONTACT PROXY
        // https://stackoverflow.com/questions/45535750/tvdb-api-get-ajax-not-working-jquery
        alert("The token is not valid! Ask Gonçalo for it!!");
    }
});