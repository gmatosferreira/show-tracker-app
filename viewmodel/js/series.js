$(document).ready(function(){
    
    // Get keyword to serach for
    params = (new URL(window.location)).searchParams;
    id = params.get('id');

    if (id==null || id=="")
        window.history.back();
    
    // Get series data
    series = null;
    $.getJSON("https://ihc.gmatos.pt/DB/series.json", function(json) {
        json['data'].forEach((value, index) => {
            if (value['id']==id) {
                series = value;
                console.log(series);
            }
        });

        if (series==null)
            window.history.back();

        $("#main h1").text(series['seriesName']);
        $("#main img").attr('src', 'https://www.thetvdb.com'+series['banner']);
        if (series['overview']==null)
            series['overview'] = "Sinopse não disponível";
        $("#main p").text(series['overview']);
        $("#main").removeClass("d-none");
    });


});