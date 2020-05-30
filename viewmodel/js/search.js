$(document).ready(function(){
    
    // Get keyword to serach for
    params = (new URL(window.location)).searchParams;
    keyword = params.get('q');

    // Validate keyword
    if (keyword=="" || keyword==null) {
        window.location.replace("index.html");
    }

    // Search
    baseUri = 'https://tvdbapiproxy.leonekmi.fr/search/series?name='+keyword;
    ajaxHelper(baseUri, 'GET').done(function (data) {
        alert("Done");
        console.log(data);
    });


});