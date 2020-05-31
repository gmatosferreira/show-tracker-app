$(document).ready(function() {
    
    // Search bar
    $("#searchButton").click(function(){
        window.location.replace("search.html?q="+$("#searchField").val());
    });

    $("#searchField").keyup(function(e){
        if(e.keyCode == 13) {
            window.location.replace("search.html?q="+$("#searchField").val());
        }
    });

})